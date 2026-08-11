'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { IconButton } from '@/components/common/design-system/IconButton';
import { Typography } from '@/components/common/design-system/Typography';
import { HERO_SLIDES } from '@/constants/homepage';
import { cn } from '@/utils/cn';

const HERO_IMAGE_SIZES =
  '(min-width: 1280px) 76.375rem, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)';

export function HomeHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 }, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleDotClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    // One-time sync read of Embla's imperative API right after it attaches, mirroring Embla's own React usage guide.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSelect();
    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div
      className="relative isolate rounded-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage highlights"
    >
      {/* The slides are clipped by `maskImage`, which also clips any box-shadow they paint.
          A `filter: drop-shadow` on this wrapper traces the masked silhouette instead of a
          rectangle, so the shadow follows the notched hero shape. */}
      <div
        className="mt-10 lg:mt-0"
        style={{
          filter:
            'drop-shadow(0 1px 2px rgba(13, 25, 47, 0.12)) drop-shadow(0 18px 36px rgba(13, 25, 47, 0.22))',
        }}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === selectedIndex;

              return (
                <div
                  key={slide.id}
                  className="relative h-[22rem] w-full shrink-0 grow-0 basis-full sm:h-[28rem] lg:h-[39.875rem]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${HERO_SLIDES.length}`}
                  // Fade stacks every slide on top of each other, so without this a screen
                  // reader would announce all four headlines as one run-on block.
                  aria-hidden={!isActive}
                  style={{ maskImage: 'url(/icons/hero-mask.svg)', maskSize: '100% 100%' }}
                >
                  <Image
                    src={slide.image.src}
                    alt=""
                    fill
                    priority={index === 0}
                    quality={90}
                    sizes={HERO_IMAGE_SIZES}
                    className="object-cover"
                  />
                  {/* Navy-tinted scrim rather than flat black — keeps the photo's colour
                      instead of greying it out, while holding contrast under the headline. */}
                  <div className="absolute inset-0 bg-blue-900/25" aria-hidden="true" />
                  {/* Vignette: clear through the middle, darkening to the edges so the eye
                      settles on the centred copy and the frame reads as depth, not haze. */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_38%,rgba(13,25,47,0.5)_100%)]"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col items-center justify-center gap-3 px-10 py-8 text-center sm:gap-4 sm:px-8 sm:py-12 lg:px-10 lg:py-17">
                    <Typography
                      as={index === 0 ? 'h1' : 'p'}
                      size="5xl"
                      color="inherit"
                      className="text-2xl text-white uppercase drop-shadow-[0_1px_3px_rgba(13,25,47,0.55)] lg:text-5xl lg:leading-[5.375rem]"
                    >
                      {slide.title}
                    </Typography>
                    <Typography
                      as="p"
                      size="xl"
                      weight="semibold"
                      color="inherit"
                      className="sm:text-md max-w-2xl text-base text-white drop-shadow-[0_1px_3px_rgba(13,25,47,0.55)] lg:text-xl"
                    >
                      {slide.subtitle}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute right-[-0.125rem] bottom-[-3.125rem] flex items-center">
        <div className="mr-6 flex items-center">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === selectedIndex}
              className="group flex items-center px-0.5 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span
                className={cn(
                  'h-1 w-4 rounded-full bg-blue-500 transition-opacity lg:bg-blue-100',
                  index === selectedIndex
                    ? 'opacity-100'
                    : 'opacity-20 group-hover:opacity-60 group-focus-visible:opacity-60',
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <IconButton
            aria-label="Previous slide"
            variant="ghost"
            className="border border-black text-black hover:bg-white/10 lg:border-white lg:text-white"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <Image
              src="/icons/chevron-left-white.svg"
              alt=""
              width={24}
              height={24}
              className="brightness-0 lg:brightness-100"
              aria-hidden="true"
            />
          </IconButton>
          <IconButton
            aria-label="Next slide"
            variant="ghost"
            className="border border-black text-black hover:bg-white/10 lg:border-white lg:text-white"
            onClick={() => emblaApi?.scrollNext()}
          >
            <Image
              src="/icons/chevron-right-white.svg"
              alt=""
              width={24}
              height={24}
              className="brightness-0 lg:brightness-100"
              aria-hidden="true"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
