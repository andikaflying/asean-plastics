import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type TagProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
};

export function Tag({ className, children, onRemove, removeLabel, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        'text-text-primary border-radius-sm inline-flex h-6 items-center gap-1 bg-yellow-100 px-2 text-xs',
        className,
      )}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? 'Remove filter'}
          className="hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </span>
  );
}
