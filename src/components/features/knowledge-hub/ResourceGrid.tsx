'use client';

import { CircularProgress } from '@/components/common/design-system/CircularProgress';
import { ErrorState } from '@/components/common/design-system/ErrorState';
import { EmptyState } from '@/components/common/design-system/EmptyState';
import { Pagination } from '@/components/common/design-system/Pagination';
import { Typography } from '@/components/common/design-system/Typography';
import { ResourceCard } from './ResourceCard';
import { useKnowledgeResources } from '@/hooks/useKnowledgeResources';
import { useKnowledgeHubUrl } from '@/hooks/useKnowledgeHubUrl';
import { hasActiveKnowledgeHubFilters } from '@/lib/knowledge-hub-params';

export function ResourceGrid() {
  const { query, buildHref, updateQuery } = useKnowledgeHubUrl();
  const { data, isPending, isError, refetch, isFetching } = useKnowledgeResources(query);

  if (isPending) {
    return (
      <div aria-busy="true" className="flex flex-col items-center gap-4 py-24">
        <CircularProgress size="lg" label="Loading resources" />
        <Typography as="p" size="base" color="muted">
          Loading resources…
        </Typography>
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography as="p" size="base" color="muted" aria-live="polite">
          {isFetching
            ? 'Updating results…'
            : `${data.total} result${data.total === 1 ? '' : 's'} found`}
        </Typography>
      </div>

      {data.data.length === 0 ? (
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
        <div className="grid gap-6 md:grid-cols-2" aria-busy={isFetching}>
          {data.data.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        getHref={(page) => buildHref({ page })}
        className="pt-4"
      />
    </div>
  );
}
