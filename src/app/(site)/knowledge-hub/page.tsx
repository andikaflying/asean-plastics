import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { KnowledgeHubHero } from '@/components/features/knowledge-hub/KnowledgeHubHero';
import { FeaturedResources } from '@/components/features/knowledge-hub/FeaturedResources';
import { ResourceToolbar } from '@/components/features/knowledge-hub/ResourceToolbar';
import { KnowledgeHubFilters } from '@/components/features/knowledge-hub/KnowledgeHubFilters';
import { ResourceGrid } from '@/components/features/knowledge-hub/ResourceGrid';
import { ShareResearchCta } from '@/components/features/knowledge-hub/ShareResearchCta';
import { getQueryClient } from '@/lib/query-client';
import {
  toURLSearchParams,
  parseKnowledgeHubSearchParams,
  hasActiveKnowledgeHubFilters,
} from '@/lib/knowledge-hub-params';
import { fetchKnowledgeResources } from '@/services/knowledge-resources';
import { KNOWLEDGE_RESOURCE_KEYS } from '@/constants/query-keys';
import type { NextSearchParams } from '@/lib/knowledge-hub-params';

export const metadata: Metadata = {
  title: 'Knowledge Hub | ASEAN Plastics Knowledge Platform',
  description:
    'Discover research, policy tools, and practical guides tackling plastic pollution across Southeast Asia.',
};

type KnowledgeHubPageProps = {
  searchParams: Promise<NextSearchParams>;
};

export default async function KnowledgeHubPage({ searchParams }: KnowledgeHubPageProps) {
  const query = parseKnowledgeHubSearchParams(toURLSearchParams(await searchParams));

  const queryClient = getQueryClient();
  const data = await fetchKnowledgeResources(query);
  queryClient.setQueryData(KNOWLEDGE_RESOURCE_KEYS.list(query), data);

  const showFeatured = query.page === 1 && !hasActiveKnowledgeHubFilters(query);

  return (
    <>
      <KnowledgeHubHero />
      {showFeatured && (
        <FeaturedResources resources={data.featured} className="-mt-16 pb-4 lg:-mt-[20.5rem]" />
      )}
      <ResourceToolbar />
      <Container className="py-8 lg:py-12">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[18rem_1fr] lg:items-start lg:gap-x-32">
          <KnowledgeHubFilters />
          <ResourceGrid />
        </div>
      </Container>
      <ShareResearchCta />
    </>
  );
}
