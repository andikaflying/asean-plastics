import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { CircularProgress } from './CircularProgress';

const VARIANT_CLASSES = {
  primary: 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-100',
  secondary: 'border border-transparent bg-blue-500 text-white hover:bg-blue-600',
  ghost: 'border border-transparent text-blue-500 bg-transparent hover:bg-blue-100',
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASSES;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
};

/** Shared visual styling for anything that must look like a Button but render as another element (e.g. a `Link`). */
export function getButtonClassNames(variant: ButtonVariant = 'primary', className?: string) {
  return cn(
    'inline-flex min-w-[6.25rem] items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-bold tracking-[0.02em] uppercase transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT_CLASSES[variant],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', isLoading = false, disabled, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={getButtonClassNames(variant, className)}
      {...rest}
    >
      {isLoading && <CircularProgress size="sm" />}
      {children}
    </button>
  );
});
