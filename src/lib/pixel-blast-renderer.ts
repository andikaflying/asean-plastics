/**
 * Raw WebGL2 port of React Bits' PixelBlast fragment shader
 * (https://reactbits.dev/backgrounds/pixel-blast), stripped of the three.js +
 * postprocessing dependency it ships with upstream. The shader is copied verbatim;
 * only the host glue (context setup, uniform upload, animation loop) is rewritten.
 *
 * Fixes two upstream defects rather than reproducing them:
 * - `autoPauseOffscreen` is dead code upstream (the visibility flag is never written).
 *   Here `setPaused()` actually cancels the rAF loop.
 * - No `prefers-reduced-motion` support upstream. Here the caller decides via
 *   `renderOnce()` + never calling `setPaused(false)`.
 */

export type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

export type PixelBlastRendererOptions = {
  variant: PixelBlastVariant;
  color: string;
  pixelSize: number;
  patternScale: number;
  patternDensity: number;
  edgeFade: number;
  speed: number;
  hasRipples: boolean;
  pixelJitter?: number;
  rippleSpeed?: number;
  rippleThickness?: number;
  rippleIntensity?: number;
};

export type PixelBlastRenderer = {
  destroy: () => void;
  resize: () => void;
  addRipple: (x: number, y: number) => void;
  setPaused: (isPaused: boolean) => void;
  renderOnce: () => void;
};

const MAX_CLICKS = 10;
const MAX_DEVICE_PIXEL_RATIO = 1.5;

const SHAPE_TYPE_BY_VARIANT: Record<PixelBlastVariant, number> = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3,
};

// Fullscreen triangle via gl_VertexID — no attribute buffers needed, the
// fragment shader reads gl_FragCoord directly.
const VERTEX_SHADER_SOURCE = `#version 300 es
void main() {
  vec2 position = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}
`;

// Copied verbatim from React Bits' PixelBlast.tsx FRAGMENT_SRC (Bayer8 dithering,
// 5-octave FBM over 3D value noise, four shape masks, ripple ring accumulation,
// edge fade, sRGB conversion) — only the `#version` header was added for WebGL2.
const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;

  // sRGB gamma correction - convert linear to sRGB for accurate color output
  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`;

function srgbChannelToLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}

/** uColor is consumed by the shader as linear light (it re-applies the sRGB OETF
 *  itself before output), matching three.js Color's default sRGB-working-space
 *  behaviour upstream — so hex input must be linearized here first. */
function hexToLinearRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  return [srgbChannelToLinear(r), srgbChannelToLinear(g), srgbChannelToLinear(b)];
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createPixelBlastRenderer(
  canvas: HTMLCanvasElement,
  options: PixelBlastRendererOptions,
): PixelBlastRenderer | null {
  const glContext = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  if (!glContext) return null;
  // Nested closures below outlive this check, so TS can't retain the narrowing on
  // `glContext` across them — rebind to a const whose type is already non-null.
  const gl: WebGL2RenderingContext = glContext;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const uniformLocations = {
    uResolution: gl.getUniformLocation(program, 'uResolution'),
    uTime: gl.getUniformLocation(program, 'uTime'),
    uColor: gl.getUniformLocation(program, 'uColor'),
    uPixelSize: gl.getUniformLocation(program, 'uPixelSize'),
    uScale: gl.getUniformLocation(program, 'uScale'),
    uDensity: gl.getUniformLocation(program, 'uDensity'),
    uPixelJitter: gl.getUniformLocation(program, 'uPixelJitter'),
    uShapeType: gl.getUniformLocation(program, 'uShapeType'),
    uEnableRipples: gl.getUniformLocation(program, 'uEnableRipples'),
    uRippleSpeed: gl.getUniformLocation(program, 'uRippleSpeed'),
    uRippleThickness: gl.getUniformLocation(program, 'uRippleThickness'),
    uRippleIntensity: gl.getUniformLocation(program, 'uRippleIntensity'),
    uEdgeFade: gl.getUniformLocation(program, 'uEdgeFade'),
    uClickPos: gl.getUniformLocation(program, 'uClickPos'),
    uClickTimes: gl.getUniformLocation(program, 'uClickTimes'),
  };

  const [colorR, colorG, colorB] = hexToLinearRgb(options.color);
  gl.uniform3f(uniformLocations.uColor, colorR, colorG, colorB);
  gl.uniform1f(uniformLocations.uScale, options.patternScale);
  gl.uniform1f(uniformLocations.uDensity, options.patternDensity);
  gl.uniform1f(uniformLocations.uPixelJitter, options.pixelJitter ?? 0);
  gl.uniform1i(uniformLocations.uShapeType, SHAPE_TYPE_BY_VARIANT[options.variant]);
  gl.uniform1i(uniformLocations.uEnableRipples, options.hasRipples ? 1 : 0);
  gl.uniform1f(uniformLocations.uRippleSpeed, options.rippleSpeed ?? 0.3);
  gl.uniform1f(uniformLocations.uRippleThickness, options.rippleThickness ?? 0.1);
  gl.uniform1f(uniformLocations.uRippleIntensity, options.rippleIntensity ?? 1);
  gl.uniform1f(uniformLocations.uEdgeFade, options.edgeFade);

  // Ring buffer of the last MAX_CLICKS ripple origins. x < 0 marks a slot as
  // unused (the shader skips it). Only ever written by index, then uploaded in
  // bulk via gl.uniform*fv — so noUncheckedIndexedAccess never sees a read here.
  const clickPositions = new Float32Array(MAX_CLICKS * 2).fill(-1);
  const clickTimes = new Float32Array(MAX_CLICKS);
  let nextClickIndex = 0;

  const timeOffset = Math.random() * 1000;
  let elapsedSeconds = 0;
  let currentUTime = timeOffset;
  let lastFrameAt = 0;
  let rafId = 0;
  let isDestroyed = false;

  function resize(): void {
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
    const width = Math.max(1, Math.round(canvas.clientWidth * devicePixelRatio));
    const height = Math.max(1, Math.round(canvas.clientHeight * devicePixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniformLocations.uResolution, width, height);
    gl.uniform1f(uniformLocations.uPixelSize, options.pixelSize * devicePixelRatio);
  }

  function draw(): void {
    currentUTime = timeOffset + elapsedSeconds * options.speed;
    gl.uniform1f(uniformLocations.uTime, currentUTime);
    gl.uniform2fv(uniformLocations.uClickPos, clickPositions);
    gl.uniform1fv(uniformLocations.uClickTimes, clickTimes);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function animate(now: number): void {
    if (isDestroyed) return;
    if (lastFrameAt !== 0) {
      elapsedSeconds += (now - lastFrameAt) / 1000;
    }
    lastFrameAt = now;
    draw();
    rafId = requestAnimationFrame(animate);
  }

  function setPaused(isPaused: boolean): void {
    if (isPaused) {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      // Force a delta reset on resume so the paused duration isn't counted as elapsed time.
      lastFrameAt = 0;
    } else if (rafId === 0 && !isDestroyed) {
      rafId = requestAnimationFrame(animate);
    }
  }

  function addRipple(x: number, y: number): void {
    const index = nextClickIndex;
    clickPositions[index * 2] = x;
    clickPositions[index * 2 + 1] = y;
    clickTimes[index] = currentUTime;
    nextClickIndex = (index + 1) % MAX_CLICKS;
  }

  function renderOnce(): void {
    draw();
  }

  function destroy(): void {
    isDestroyed = true;
    if (rafId !== 0) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    gl.deleteProgram(program);
  }

  resize();
  renderOnce();

  return { destroy, resize, addRipple, setPaused, renderOnce };
}
