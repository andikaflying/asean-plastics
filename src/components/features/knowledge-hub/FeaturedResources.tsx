import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';
import { ResourceCard } from './ResourceCard';
import type { KnowledgeResource } from '@/types/knowledge-resource';
import { cn } from '@/utils/cn';

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none">
      <path
        d="M10.6945 11.0227L12.1087 13.4722L11.5911 15.404L6.76146 14.1099L5.20854 19.9055L3.9838 20.6126L3.27669 19.3879L4.82961 13.5923L-2.35438e-05 12.2982L0.517615 10.3664L2.9671 8.95215L4.77884 2.19067L3.81291 1.93185L4.33055 -5.36442e-07L13.9898 2.58819L13.4722 4.52004L12.5062 4.26122L10.6945 11.0227ZM3.2705 11.104L9.35584 12.7346L8.54266 11.3261L10.5744 3.74358L6.71069 2.70831L4.67896 10.2908L3.2705 11.104Z"
        fill="white"
      />
    </svg>
  );
}

type FeaturedResourcesProps = {
  resources: KnowledgeResource[];
  className?: string;
};

export function FeaturedResources({ resources, className }: FeaturedResourcesProps) {
  if (resources.length === 0) return null;

  return (
    <Container className={cn('relative z-10 flex flex-col gap-6 py-8', className)}>
      <div className="flex items-center gap-2 text-white">
        <PinIcon />
        <Typography
          as="h2"
          size="small-heading"
          weight="semibold"
          color="inherit"
          className="tracking-wide uppercase"
        >
          Featured
        </Typography>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            isFeatured
            cardClassName="bg-cream md:py-8 "
            labelClassName="text-primary"
            titleClassName="text-primary"
          />
        ))}
      </div>
    </Container>
  );
}
