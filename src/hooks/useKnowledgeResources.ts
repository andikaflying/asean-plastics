'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchKnowledgeResources } from '@/services/knowledge-resources';
import { KNOWLEDGE_RESOURCE_KEYS } from '@/constants/query-keys';
import type { ResourceListQuery } from '@/types/knowledge-resource';

export function useKnowledgeResources(query: ResourceListQuery) {
  return useQuery({
    queryKey: KNOWLEDGE_RESOURCE_KEYS.list(query),
    queryFn: () => fetchKnowledgeResources(query),
    placeholderData: keepPreviousData,
  });
}
