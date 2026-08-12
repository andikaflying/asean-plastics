'use client';

import { ErrorState } from '@/components/common/design-system/ErrorState';
import { EmptyState } from '@/components/common/design-system/EmptyState';
import { Pagination } from '@/components/common/design-system/Pagination';
import { ResourceCard } from './ResourceCard';
import { ResourceCardSkeleton } from './ResourceCardSkeleton';
import { useKnowledgeResources } from '@/hooks/useKnowledgeResources';
import { useKnowledgeHubUrl } from '@/hooks/useKnowledgeHubUrl';
import { hasActiveKnowledgeHubFilters } from '@/lib/knowledge-hub-params';
import { RESOURCES_PER_PAGE } from '@/constants/knowledge-hub';

function ResourceGridSkeleton({ count }: { count: number }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading resources"
      className="grid gap-6 md:grid-cols-2"
    >
      {Array.from({ length: count }, (_, index) => (
        <ResourceCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ResourceGrid() {
  const { query, buildHref, updateQuery } = useKnowledgeHubUrl();
  const { data, isPending, isError, refetch, isFetching } = useKnowledgeResources(query);

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <ResourceGridSkeleton count={RESOURCES_PER_PAGE} />
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-6">
      {isFetching ? (
        <ResourceGridSkeleton count={data.data.length || RESOURCES_PER_PAGE} />
      ) : data.data.length === 0 ? (
        <EmptyState
          title="No results found"
          message="Try adjusting your search or filters to find what you're looking for."
          actionLabel={hasActiveKnowledgeHubFilters(query) || query.q ? 'Reset filters' : undefined}
          onAction={
            hasActiveKnowledgeHubFilters(query) || query.q
              ? () =>
                  updateQuery({
                    q: '',
                    type: [],
                    theme: [],
                    geo: [],
                    format: [],
                    lang: [],
                    page: 1,
                  })
              : undefined
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {data.data.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              cardClassName="bg-cream md:py-8"
              labelClassName="text-primary"
              titleClassName="text-primary"
            />
          ))}
        </div>
      )}

      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        getHref={(page) => buildHref({ page })}
        className="pt-8"
      />
    </div>
  );
}
