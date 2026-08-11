import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import type { Opportunity } from '@/types/opportunity';

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Link href={opportunity.href} className="group flex flex-col gap-8 lg:flex-row lg:items-start">
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
      <div className="border-grey-200 flex h-full min-w-0 flex-1 flex-col justify-between gap-6 border-t-2 py-4 group-hover:border-blue-500 group-hover:bg-white group-hover:bg-[image:url('/images/box-blocks.png')] group-hover:bg-bottom group-hover:bg-no-repeat">
        <div className="flex flex-col gap-2">
          <Typography
            as="span"
            size="sm"
            weight="bold"
            className="text-grey-500 tracking-[0.2em] uppercase group-hover:text-blue-500"
          >
            {opportunity.kind}
          </Typography>
          <Typography
            as="h3"
            size="xl"
            weight="semibold"
            className="tracking-[0px] group-hover:text-blue-500"
          >
            {opportunity.title}
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Image src="/icons/calendar.svg" alt="" width={16} height={16} aria-hidden="true" />
            <Typography as="span" size="base" weight="medium" className="group-hover:text-blue-500">
              {opportunity.date}
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/icons/pin.svg" alt="" width={16} height={16} aria-hidden="true" />
            <Typography as="span" size="base" weight="medium" className="group-hover:text-blue-500">
              {opportunity.location}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
