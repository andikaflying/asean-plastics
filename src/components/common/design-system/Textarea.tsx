import { type TextareaHTMLAttributes, forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/utils/cn';
import { Typography } from './Typography';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  isRequired?: boolean;
  maxLength?: number;
  className?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, isRequired = false, maxLength, className, id, value, ...rest },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;
  const counterId = `${textareaId}-counter`;
  const currentLength = value === 'string' ? value.length : 0;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <LabelPrimitive.Root
          htmlFor={textareaId}
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
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(error && errorId, maxLength && counterId) || undefined}
          aria-required={isRequired}
          className={cn(
            'bg-grey-100 text-text-primary placeholder:text-md placeholder:text-grey-500 h-[12.5rem] w-full resize-none rounded-lg p-4 text-base',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'outline-danger outline outline-1',
            className,
          )}
          {...rest}
        />
        <Typography
          as="span"
          id={counterId}
          size="sm"
          weight="bold"
          className="text-grey-300 pointer-events-none absolute right-[0.5625rem] bottom-[1rem]"
          aria-live="polite"
        >
          {currentLength}/{maxLength}
        </Typography>
      </div>
      {error && (
        <Typography as="p" id={errorId} size="sm" color="danger" role="alert">
          {error}
        </Typography>
      )}
    </div>
  );
});
