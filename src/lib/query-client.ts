import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';
import { cache } from 'react';

const STALE_TIME = 60 * 1000;

export const getQueryClient = cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        shouldRedactErrors: () => false,
      },
    },
  });
});
