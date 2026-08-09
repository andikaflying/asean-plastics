import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';
import { OpportunityCard } from './OpportunityCard';
import { OPPORTUNITIES } from '@/constants/opportunities';

export function OpportunitiesSection() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
      <div className="flex flex-col gap-4 lg:w-96 lg:shrink-0">
        <Typography as="h2" size="display">
          Opportunities
        </Typography>
        <Typography as="p" size="md" weight="medium">
          From conferences and grant calls to job openings and volunteer roles — find your next
          opportunity to contribute to the fight against marine plastic pollution in Southeast Asia.
        </Typography>
        <Link href="/opportunities" className={getButtonClassNames('primary', 'self-start')}>
          See all
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-14">
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
