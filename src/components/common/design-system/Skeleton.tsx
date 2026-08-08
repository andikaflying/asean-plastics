import { cn } from '@/utils/cn';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-grey-200 animate-pulse rounded-lg motion-reduce:animate-none', className)}
    />
  );
}
