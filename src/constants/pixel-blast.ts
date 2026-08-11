import { PixelBlastRendererOptions } from '@/lib/pixel-blast-renderer';

/** Tuning for the homepage hero's animated backdrop (see `PixelBlastBackground`). */
export const PIXEL_BLAST_SETTINGS: PixelBlastRendererOptions = {
  variant: 'square', // echoes the site's block motif (hero-blocks.svg, box-blocks.png)
  color: '#85a0d0', // blue-300 from theme.css — tuned against the PNG it replaces
  pixelSize: 50,
  patternScale: 2,
  patternDensity: 1,
  edgeFade: 0.55,
  speed: 0.4,
  enableRipples: true,
};
