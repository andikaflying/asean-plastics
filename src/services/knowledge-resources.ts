import { getBaseUrl } from '@/lib/get-base-url';
import { serializeKnowledgeHubQuery } from '@/lib/knowledge-hub-params';
import type { ResourceListQuery, ResourceListResponse } from '@/types/knowledge-resource';

export async function fetchKnowledgeResources(
  query: ResourceListQuery,
  options?: { signal?: AbortSignal },
): Promise<ResourceListResponse> {
  const queryString = serializeKnowledgeHubQuery(query);
  const url = `${getBaseUrl()}/api/knowledge-resources${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    signal: options?.signal,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load knowledge resources');
  }

  return response.json() as Promise<ResourceListResponse>;
}
