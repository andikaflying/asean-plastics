'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createPixelBlastRenderer,
  type PixelBlastRendererOptions,
} from '@/lib/pixel-blast-renderer';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type PixelBlastBackgroundProps = {
  settings: PixelBlastRendererOptions;
  className?: string;
};

export function PixelBlastBackground({ settings, className }: PixelBlastBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isWebglSupported, setIsWebglSupported] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const renderer = createPixelBlastRenderer(canvas, settings);
    if (!renderer) {
      setIsWebglSupported(false);
      return;
    }

    if (prefersReducedMotion) {
      renderer.renderOnce();
    } else {
      renderer.setPaused(false);
    }

    const resizeObserver = new ResizeObserver(() => {
      renderer.resize();
      renderer.renderOnce();
    });
    resizeObserver.observe(wrapper);

    // Fix for upstream's dead `autoPauseOffscreen`: actually stop the rAF loop
    // once the hero scrolls out of view.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry || prefersReducedMotion) return;
        renderer.setPaused(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(wrapper);

    const handleVisibilityChange = () => {
      if (prefersReducedMotion) return;
      renderer.setPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Canvas is pointer-events-none so ripples are driven by the hero wrapper
    // that contains it, letting clicks on foreground content still register.
    const heroWrapper = wrapper.parentElement;
    const handlePointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (rect.height - (event.clientY - rect.top)) * scaleY;
      renderer.addRipple(x, y);
    };
    heroWrapper?.addEventListener('pointerdown', handlePointerDown);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      heroWrapper?.removeEventListener('pointerdown', handlePointerDown);
      renderer.destroy();
    };
  }, [settings, prefersReducedMotion]);

  if (!isWebglSupported) return null;

  return (
    <div ref={wrapperRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none block h-full w-full"
      />
    </div>
  );
}
