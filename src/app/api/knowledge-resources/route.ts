import { NextResponse, type NextRequest } from 'next/server';
import knowledgeResourcesFixture from '@/mock/knowledge-resources.json';
import type { KnowledgeResource } from '@/types/knowledge-resource';
import { applyMockRequestBehavior } from '@/lib/mock-request';
import { parseKnowledgeHubSearchParams } from '@/lib/knowledge-hub-params';
import { filterKnowledgeResources } from '@/lib/filter-knowledge-resources';

export async function GET(request: NextRequest) {
  const mockResponse = await applyMockRequestBehavior(request);
  if (mockResponse) return mockResponse;

  const query = parseKnowledgeHubSearchParams(request.nextUrl.searchParams);
  const response = filterKnowledgeResources(
    knowledgeResourcesFixture as KnowledgeResource[],
    query,
  );

  return NextResponse.json(response);
}
