import { Typography } from '@/components/common/design-system/Typography';
import { OfferCard } from './OfferCard';
import { OFFER_PILLARS } from '@/constants/homepage';

export function WhatWeOffer() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex flex-col gap-4 lg:w-72 lg:shrink-0">
        <Typography as="h2" size="display">
          What We Offer
        </Typography>
        <Typography as="p" size="md" weight="medium" color="muted">
          Discover what the platform offers
        </Typography>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFER_PILLARS.map((pillar) => (
          <OfferCard key={pillar.id} pillar={pillar} isHighlighted={pillar.id === 'partnerships'} />
        ))}
      </div>
    </div>
  );
}
