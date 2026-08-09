import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { ResourceCard } from '@/components/features/knowledge-hub/ResourceCard';
import knowledgeResources from '@/mock/knowledge-resources.json';
import type { KnowledgeResource } from '@/types/knowledge-resource';

const FEATURED_RESOURCE_COUNT = 6;

export function KnowledgeHubSection() {
  const resources = (knowledgeResources as KnowledgeResource[]).slice(0, FEATURED_RESOURCE_COUNT);

  return (
    <Section tone="blue" isBleed>
      <div className="mx-auto flex w-full max-w-[76.375rem] flex-col gap-12 px-4 sm:px-6 lg:px-[4.5rem]">
        <SectionHeading
          title="Knowledge Hub"
          tone="light"
          description="Explore the newest reports, policy toolkits, case studies, and data sets — each vetted and organized to help you advance plastics circularity across ASEAN."
          cta={{ label: 'Explore all resources', href: '/knowledge-hub' }}
        />
        <Carousel ariaLabel="Featured knowledge resources" tone="light">
          {resources.map((resource) => (
            <div key={resource.id} className="w-[19.5rem] sm:w-[24.5rem]">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
