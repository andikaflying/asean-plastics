import { Typography } from '@/components/common/design-system/Typography';
import {
  OfferCard,
  OFFERCARD_CONTAINER_CLASSNAME,
  OFFERCARD_DESCRIPTION_CLASSNAME,
  OFFERCARD_HEADER_CLASSNAME,
  OFFERCARD_TEXT_CONTAINER_CLASSNAME,
} from './OfferCard';
import { OFFER_PILLARS } from '@/constants/homepage';
import Image from 'next/image';

function AccentMark() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-[0px] left-[0.75rem] -z-10 -ml-6 inline-block h-7 w-6 shrink-0"
    >
      <Image
        src="/icons/accent-square-1.svg"
        alt=""
        width={14}
        height={14}
        className="absolute top-[51%] right-[90%]"
      />
      <Image
        src="/icons/accent-square-2.svg"
        alt=""
        width={15}
        height={14}
        className="absolute top-0 left-[0%]"
      />
    </span>
  );
}

export function WhatWeOffer() {
  return (
    <div className="flex flex-col gap-[4.5rem] lg:flex-row lg:items-start">
      <div className="mt-2 flex flex-col gap-4 lg:w-[15.25rem] lg:shrink-0">
        <Typography as="h2" size="display" className="relative tracking-[-0.0375rem]">
          <AccentMark />
          What We Offer
        </Typography>
        <Typography as="p" size="md" weight="medium" color="muted">
          Discover what the platform offers
        </Typography>
      </div>
      <div className="mt-[0.375rem] grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFER_PILLARS.map((pillar) => {
          return (
            <OfferCard
              key={pillar.id}
              pillar={pillar}
              isHighlighted={pillar.id === 'partnerships'}
              className={OFFERCARD_CONTAINER_CLASSNAME[pillar.id]}
              textContainerClassName={OFFERCARD_TEXT_CONTAINER_CLASSNAME[pillar.id]}
              headerClassName={OFFERCARD_HEADER_CLASSNAME[pillar.id]}
              descriptionClassName={OFFERCARD_DESCRIPTION_CLASSNAME[pillar.id]}
            />
          );
        })}
      </div>
    </div>
  );
}
