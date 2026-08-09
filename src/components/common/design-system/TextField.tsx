import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/utils/cn';
import { Typography } from './Typography';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  isRequired?: boolean;
  className?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, isRequired = false, className, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <LabelPrimitive.Root
          htmlFor={inputId}
          className={cn('text-text-primary text-sm font-semibold')}
        >
          {label}
          {isRequired && (
            <span aria-hidden="true" className="text-danger">
              {' '}
              *
            </span>
          )}
        </LabelPrimitive.Root>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        aria-required={isRequired}
        className={cn(
          'bg-grey-100 text-text-primary placeholder:text-md placeholder:text-grey-500 h-12 rounded-lg px-4 py-2 text-base',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'outline-danger outline outline-1',
          className,
        )}
        {...rest}
      />
      {error && (
        <Typography as="p" id={errorId} size="sm" color="danger" role="alert">
          {error}
        </Typography>
      )}
    </div>
  );
});
