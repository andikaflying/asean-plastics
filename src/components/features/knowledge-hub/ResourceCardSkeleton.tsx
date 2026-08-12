import { Card } from '@/components/common/design-system/Card';
import { Skeleton } from '@/components/common/design-system/Skeleton';
import { cn } from '@/utils/cn';

type ResourceCardSkeletonProps = {
  className?: string;
};

export function ResourceCardSkeleton({ className }: ResourceCardSkeletonProps) {
  return (
    <Card
      className={cn(
        'bg-cream min-h-[18rem] justify-between gap-6 md:h-[23.125rem] md:max-h-[23.125rem] md:gap-8 md:py-8',
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:gap-[3.25rem]">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3.5 w-px" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3.5 w-px" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>
    </Card>
  );
}
