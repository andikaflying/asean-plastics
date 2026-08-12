import { PixelBlastRendererOptions } from '@/lib/pixel-blast-renderer';

/** Tuning for the homepage hero's animated backdrop (see `PixelBlastBackground`). */
export const PIXEL_BLAST_SETTINGS: PixelBlastRendererOptions = {
  variant: 'square',
  color: '#dbe6f9',
  pixelSize: 50,
  patternScale: 2,
  patternDensity: 1,
  edgeFade: 0.55,
  speed: 0.4,
  hasRipples: true,
};
