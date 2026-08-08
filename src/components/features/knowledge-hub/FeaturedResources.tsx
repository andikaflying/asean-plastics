import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';
import { ResourceCard } from './ResourceCard';
import type { KnowledgeResource } from '@/types/knowledge-resource';
import { cn } from '@/utils/cn';

function PinIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v6.5M12 8.5 6 12l6 2.5m0-6 6 3.5-6 2.5m0 0V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
          size="lg"
          weight="semibold"
          color="inherit"
          className="tracking-wide uppercase"
        >
          Featured
        </Typography>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} isFeatured />
        ))}
      </div>
    </Container>
  );
}
