import { cn } from '@/utils/cn';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('bg-grey-200 block h-4 w-full animate-pulse rounded', className)}
    />
  );
}
