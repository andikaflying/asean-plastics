'use client';

import dynamic from 'next/dynamic';
import { PIXEL_BLAST_SETTINGS } from '@/constants/pixel-blast';

// `ssr: false` must live inside a Client Component in the app router — this
// shim exists only to hold that boundary. The canvas is client-only anyway
// (no meaningful SSR output) and shouldn't block the homepage's first paint.
const PixelBlastBackground = dynamic(
  () => import('./PixelBlastBackground').then((mod) => mod.PixelBlastBackground),
  { ssr: false },
);

type PixelBlastBackgroundLoaderProps = {
  className?: string;
};

export function PixelBlastBackgroundLoader({ className }: PixelBlastBackgroundLoaderProps) {
  return <PixelBlastBackground settings={PIXEL_BLAST_SETTINGS} className={className} />;
}
