'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  parseKnowledgeHubSearchParams,
  serializeKnowledgeHubQuery,
} from '@/lib/knowledge-hub-params';
import type { ResourceListQuery } from '@/types/knowledge-resource';

/**
 * Single client-side entry point for reading/writing the Knowledge Hub URL
 * contract — keeps `router.push` calls and query serialization out of every
 * component that needs to filter, sort, paginate or clear.
 */
export function useKnowledgeHubUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useMemo(
    () => parseKnowledgeHubSearchParams(new URLSearchParams(searchParams)),
    [searchParams],
  );

  const buildHref = useCallback(
    (patch: Partial<ResourceListQuery>) => {
      const nextQuery: ResourceListQuery = { ...query, ...patch };
      const queryString = serializeKnowledgeHubQuery(nextQuery);
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, query],
  );

  const updateQuery = useCallback(
    (patch: Partial<ResourceListQuery>) => {
      router.push(buildHref(patch), { scroll: false });
    },
    [router, buildHref],
  );

  return { query, buildHref, updateQuery };
}
