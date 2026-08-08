'use client';

import { type ReactNode, useId } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/utils/cn';

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
  label: ReactNode;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  name,
  value,
  disabled = false,
  className,
}: CheckboxProps) {
  const inputId = useId();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <CheckboxPrimitive.Root
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onCheckedChange={(state) => onCheckedChange(state === true)}
        disabled={disabled}
        className={cn(
          'border-grey-300 flex size-6 shrink-0 items-center justify-center rounded border bg-white data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        <CheckboxPrimitive.Indicator>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2.5 7.5L5.5 10.5L11.5 3.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label htmlFor={inputId} className="text-text-primary cursor-pointer text-base">
        {label}
      </label>
    </div>
  );
}
