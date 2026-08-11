import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { type OfferPillarId } from '@/constants/homepage';
import type { OfferPillar } from '@/types/homepage';
import { cn } from '@/utils/cn';

export const OFFERCARD_CONTAINER_CLASSNAME: Record<OfferPillarId, string> = {
  'knowledge-hub': 'px-[1.625rem]',
  partnerships: '',
  training: '',
};

export const OFFERCARD_TEXT_CONTAINER_CLASSNAME: Record<OfferPillarId, string> = {
  'knowledge-hub': '',
  partnerships: 'gap-3 mt-[0.125rem]',
  training: '',
};

export const OFFERCARD_HEADER_CLASSNAME: Record<OfferPillarId, string> = {
  'knowledge-hub': 'text-[1.875rem] tracking-[0.6px]',
  partnerships: 'tracking-[-0.0625rem]',
  training: 'tracking-[-0.0625rem]',
};

export const OFFERCARD_DESCRIPTION_CLASSNAME: Record<OfferPillarId, string> = {
  'knowledge-hub': 'lg:w-[13.75rem] w-full',
  partnerships: '',
  training: '',
};

type OfferCardProps = {
  pillar: OfferPillar;
  className?: string;
  textContainerClassName?: string;
  headerClassName?: string;
  descriptionClassName?: string;
};

export function OfferCard({
  pillar,
  className,
  textContainerClassName,
  headerClassName,
  descriptionClassName,
}: OfferCardProps) {
  return (
    <div
      className={cn(
        'border-grey-300 group flex h-full flex-col gap-4 rounded-lg border px-5 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10',
        "hover:bg-white hover:bg-[image:url('/images/box-blocks.png')] hover:bg-bottom hover:bg-no-repeat", //hover bg condition
        className,
      )}
    >
      <Image src={pillar.icon.src} alt="" width={pillar.icon.width} height={pillar.icon.height} />
      <div className={cn('flex flex-col gap-2', textContainerClassName)}>
        <Typography
          as="h3"
          size="2xl"
          weight="bold"
          className={cn('text-text-primary group-hover:text-blue-500', headerClassName)}
        >
          {pillar.title}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="medium"
          className={cn('text-text-primary group-hover:text-blue-500', descriptionClassName)}
        >
          {pillar.description}
        </Typography>
      </div>
      {pillar.href && pillar.ctaLabel && (
        <Link
          href={pillar.href}
          className="text-base font-bold tracking-[0.02em] text-blue-500 uppercase hover:underline"
        >
          {pillar.ctaLabel}
        </Link>
      )}
    </div>
  );
}
