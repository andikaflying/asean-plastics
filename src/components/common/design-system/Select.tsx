import { useId } from 'react';
import Image from 'next/image';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/utils/cn';
import { Typography } from './Typography';

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  error?: string;
  isRequired?: boolean;
  hideLabel?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Select({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onValueChange,
  onBlur,
  name,
  error,
  isRequired = false,
  hideLabel = false,
  disabled = false,
  className,
}: SelectProps) {
  const generatedId = useId();
  const triggerId = generatedId;
  const errorId = `${triggerId}-error`;

  return (
    <div className="flex flex-col gap-2">
      <LabelPrimitive.Root
        htmlFor={triggerId}
        className={cn('text-text-primary text-sm font-semibold', hideLabel && 'sr-only')}
      >
        {label}
        {isRequired && (
          <span aria-hidden="true" className="text-danger">
            {' '}
            *
          </span>
        )}
      </LabelPrimitive.Root>
      <SelectPrimitive.Root
        name={name}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          id={triggerId}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          aria-required={isRequired}
          className={cn(
            'bg-grey-100 text-text-primary data-[placeholder]:text-md data-[placeholder]:text-grey-500 flex h-12 w-full items-center justify-between rounded-lg py-2 pr-2 pl-4 text-base',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'outline-danger outline outline-1',
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <Image src="/icons/select-arrow.svg" alt="" width={11} height={6} aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="border-grey-200 overflow-hidden rounded-lg border bg-white shadow-lg">
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="text-text-primary cursor-pointer rounded-md px-3 py-2 text-base outline-none data-[highlighted]:bg-blue-100 data-[state=checked]:font-semibold"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <Typography as="p" id={errorId} size="sm" color="danger" role="alert">
          {error}
        </Typography>
      )}
    </div>
  );
}
