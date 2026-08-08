import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ContainerProps = {
  children?: ReactNode;
  className?: string;
};

export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[76.375rem] px-4 sm:px-6 lg:px-[4.5rem]', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
