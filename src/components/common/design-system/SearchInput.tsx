import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/utils/cn';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isLabelHidden?: boolean;
  className?: string;
  inputClassName?: string;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { label, isLabelHidden = true, className, inputClassName, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <LabelPrimitive.Root
        htmlFor={inputId}
        className={cn('text-text-primary text-sm font-semibold', isLabelHidden && 'sr-only')}
      >
        {label}
      </LabelPrimitive.Root>
      <div className="relative">
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-grey-500 pointer-events-none absolute top-1/2 -translate-y-1/2"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={ref}
          id={inputId}
          type="search"
          className={cn(
            'placeholder:text-md text-text-primary placeholder:text-grey-500 h-12 w-full rounded-lg bg-white pr-4 pl-10 text-base',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
            inputClassName,
          )}
          {...rest}
        />
      </div>
    </div>
  );
});
