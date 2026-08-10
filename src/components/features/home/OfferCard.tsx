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
  'knowledge-hub': 'w-[13.75rem]',
  partnerships: '',
  training: '',
};

type OfferCardProps = {
  pillar: OfferPillar;
  isHighlighted?: boolean;
  className?: string;
  textContainerClassName?: string;
  headerClassName?: string;
  descriptionClassName?: string;
};

export function OfferCard({
  pillar,
  isHighlighted = false,
  className,
  textContainerClassName,
  headerClassName,
  descriptionClassName,
}: OfferCardProps) {
  return (
    <div
      className={cn(
        'border-grey-300 flex h-full flex-col gap-6 rounded-lg border px-8 py-10',
        isHighlighted && 'bg-white',
        className,
      )}
    >
      <Image src={pillar.icon.src} alt="" width={pillar.icon.width} height={pillar.icon.height} />
      <div className={cn('flex flex-col gap-2', textContainerClassName)}>
        <Typography
          as="h3"
          size="2xl"
          weight="bold"
          className={cn(isHighlighted ? 'text-blue-500' : 'text-text-primary', headerClassName)}
        >
          {pillar.title}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="medium"
          className={cn(
            isHighlighted ? 'text-blue-500' : 'text-text-primary',
            descriptionClassName,
          )}
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
