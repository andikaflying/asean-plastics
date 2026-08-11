'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { IconButton } from '@/components/common/design-system/IconButton';
import { Typography } from '@/components/common/design-system/Typography';
import { HERO_SLIDES } from '@/constants/homepage';
import { cn } from '@/utils/cn';

export function HomeHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

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
      <div className="mt-10 overflow-hidden lg:mt-0" ref={emblaRef}>
        <div className="flex">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative h-[22rem] w-full shrink-0 grow-0 basis-full sm:h-[28rem] lg:h-[39.875rem]"
              role="group"
              aria-roledescription="slide"
              style={{ maskImage: 'url(/icons/hero-mask.svg)', maskSize: '100% 100%' }}
            >
              <Image
                src={slide.image.src}
                alt=""
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 76rem, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
              <div className="relative flex h-full flex-col items-center justify-center gap-3 px-10 py-8 text-center sm:gap-4 sm:px-8 sm:py-12 lg:px-10 lg:py-17">
                <Typography
                  as={index === 0 ? 'h1' : 'p'}
                  size="5xl"
                  color="inherit"
                  className="text-3xl text-white uppercase drop-shadow-[0_0_5px_rgba(0,0,0,0.65)] lg:text-5xl lg:leading-[5.375rem]"
                >
                  {slide.title}
                </Typography>
                <Typography
                  as="p"
                  size="xl"
                  weight="semibold"
                  color="inherit"
                  className="sm:text-md max-w-2xl text-base text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.65)] lg:text-xl"
                >
                  {slide.subtitle}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[-0.125rem] bottom-[-3.125rem] flex items-center">
        <div className="mr-6 flex items-center gap-1" aria-hidden="true">
          {HERO_SLIDES.map((slide, index) => (
            <span
              key={slide.id}
              className={cn(
                'h-1 w-4 rounded-full bg-blue-100 transition-opacity',
                index === selectedIndex ? 'opacity-100' : 'opacity-20',
              )}
            />
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
