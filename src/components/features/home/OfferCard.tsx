import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import type { OfferPillar } from '@/types/homepage';
import { cn } from '@/utils/cn';

type OfferCardProps = {
  pillar: OfferPillar;
  isHighlighted?: boolean;
};

export function OfferCard({ pillar, isHighlighted = false }: OfferCardProps) {
  return (
    <div
      className={cn(
        'border-grey-300 flex h-full flex-col gap-6 rounded-lg border px-8 py-10',
        isHighlighted && 'bg-white',
      )}
    >
      <Image src={pillar.icon.src} alt="" width={pillar.icon.width} height={pillar.icon.height} />
      <div className="flex flex-col gap-2">
        <Typography
          as="h3"
          size="2xl"
          weight="bold"
          className={cn(isHighlighted ? 'text-blue-500' : 'text-text-primary')}
        >
          {pillar.title}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="medium"
          className={cn(isHighlighted ? 'text-blue-500' : 'text-text-primary')}
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
