import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[76.375rem]', className)} {...rest}>
      {children}
    </div>
  );
}
