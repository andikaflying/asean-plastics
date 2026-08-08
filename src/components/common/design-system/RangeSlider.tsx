'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
};

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  minLabel = 'Minimum value',
  maxLabel = 'Maximum value',
  className,
}: RangeSliderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onValueChange([next[0] ?? min, next[1] ?? max])}
        className="relative flex h-4 w-full touch-none items-center"
      >
        <SliderPrimitive.Track className="bg-grey-300 relative h-1 grow rounded-full">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-green-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={minLabel}
          className="block size-4 rounded-full border-2 border-white bg-green-500 shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        />
        <SliderPrimitive.Thumb
          aria-label={maxLabel}
          className="block size-4 rounded-full border-2 border-white bg-green-500 shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        />
      </SliderPrimitive.Root>
      <div className="text-grey-500 flex justify-between text-sm">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
