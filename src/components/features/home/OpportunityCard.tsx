import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import type { Opportunity } from '@/types/opportunity';
import { cn } from '@/utils/cn';

type OpportunityCardProps = {
  opportunity: Opportunity;
  isHighlighted?: boolean;
};

export function OpportunityCard({ opportunity, isHighlighted = false }: OpportunityCardProps) {
  return (
    <Link href={opportunity.href} className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="relative aspect-[387/258] w-full shrink-0 overflow-hidden rounded-lg lg:w-[24.1875rem]">
        <Image
          src={opportunity.image.src}
          alt=""
          fill
          sizes="24rem"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div
        className={cn(
          'flex h-full min-w-0 flex-1 flex-col justify-between gap-6 border-t-2 py-4',
          isHighlighted ? 'border-blue-500' : 'border-grey-200',
        )}
      >
        <div className="flex flex-col gap-2">
          <Typography
            as="span"
            size="sm"
            weight="bold"
            className={cn(
              'tracking-[0.2em] uppercase',
              isHighlighted ? 'text-blue-500' : 'text-grey-500',
            )}
          >
            {opportunity.kind}
          </Typography>
          <Typography
            as="h3"
            size="xl"
            weight="semibold"
            className={cn('tracking-[0px]', isHighlighted && 'text-blue-500')}
          >
            {opportunity.title}
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Image src="/icons/calendar.svg" alt="" width={16} height={16} aria-hidden="true" />
            <Typography
              as="span"
              size="base"
              weight="medium"
              className={cn(isHighlighted && 'text-blue-500')}
            >
              {opportunity.date}
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/icons/pin.svg" alt="" width={16} height={16} aria-hidden="true" />
            <Typography
              as="span"
              size="base"
              weight="medium"
              className={cn(isHighlighted && 'text-blue-500')}
            >
              {opportunity.location}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
