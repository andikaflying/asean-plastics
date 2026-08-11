import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';
import { OpportunityCard } from './OpportunityCard';
import { OPPORTUNITIES } from '@/constants/opportunities';
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

export function OpportunitiesSection() {
  return (
    <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <div className="flex flex-col gap-3 sm:gap-4 lg:w-96 lg:shrink-0">
        <Typography
          as="h2"
          size="display"
          className="lg:text-display relative text-2xl tracking-[-0.05rem] sm:text-3xl sm:tracking-[-0.1rem] lg:tracking-[-0.125rem]"
        >
          <AccentMark />
          Opportunities
        </Typography>
        <Typography as="p" size="md" weight="medium" className="lg:text-md text-sm sm:text-base">
          From conferences and grant calls to job openings and volunteer roles — find your next
          opportunity to contribute to the fight against marine plastic pollution in Southeast Asia.
        </Typography>
        <Link href="/opportunities" className={getButtonClassNames('primary', 'self-start')}>
          See all
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-8 lg:gap-14">
        {OPPORTUNITIES.map((opportunity, index) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            isHighlighted={index === 1}
          />
        ))}
      </div>
    </div>
  );
}
