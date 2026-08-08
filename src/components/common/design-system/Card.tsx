import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

type CardProps = ComponentPropsWithoutRef<'div'>;

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'border-grey-200 flex flex-col gap-6 rounded-xl border bg-white px-6 py-8',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
