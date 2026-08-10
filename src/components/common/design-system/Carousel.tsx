'use client';

import { type ReactNode, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { IconButton } from './IconButton';
import { cn } from '@/utils/cn';

const TONE_ARROW_ICONS = {
  light: { prev: '/icons/chevron-left-white.svg', next: '/icons/chevron-right-white.svg' },
  dark: { prev: '/icons/chevron-left-blue.svg', next: '/icons/chevron-right-blue.svg' },
} as const;

type CarouselTone = keyof typeof TONE_ARROW_ICONS;

type CarouselProps = {
  ariaLabel: string;
  tone?: CarouselTone;
  className?: string;
  viewportClassName?: string;
  slideClassName?: string;
  directionClassName?: string;
  children: ReactNode[];
};

export function Carousel({
  ariaLabel,
  tone = 'dark',
  className,
  viewportClassName,
  slideClassName,
  directionClassName,
  children,
}: CarouselProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: false,
    containScroll: 'trimSnaps',
    duration: prefersReducedMotion ? 0 : 25,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // One-time sync read of Embla's imperative API right after it attaches, mirroring Embla's own React usage guide.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSelect();
    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  const arrowIcons = TONE_ARROW_ICONS[tone];
  const arrowVariant = tone === 'light' ? 'ghost' : 'outline';
  const arrowClassName = tone === 'light' ? 'border border-white hover:bg-white/10' : undefined;

  return (
    <div className={cn('flex flex-col gap-6', className)} role="region" aria-label={ariaLabel}>
      <div className={cn('flex items-center gap-3', directionClassName)}>
        <IconButton
          aria-label="Previous"
          variant={arrowVariant}
          className={arrowClassName}
          disabled={!canScrollPrev}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <Image src={arrowIcons.prev} alt="" width={24} height={24} aria-hidden="true" />
        </IconButton>
        <IconButton
          aria-label="Next"
          variant={arrowVariant}
          className={arrowClassName}
          disabled={!canScrollNext}
          onClick={() => emblaApi?.scrollNext()}
        >
          <Image src={arrowIcons.next} alt="" width={24} height={24} aria-hidden="true" />
        </IconButton>
      </div>

      <div className={cn('overflow-hidden', viewportClassName)} ref={emblaRef}>
        <div className="flex gap-8">
          {children.map((child, index) => (
            <div
              key={index}
              className={cn('min-w-0 shrink-0 grow-0', slideClassName)}
              role="group"
              aria-roledescription="slide"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
