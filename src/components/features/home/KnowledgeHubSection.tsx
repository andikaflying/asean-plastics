import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import knowledgeResources from '@/mock/knowledge-resources.json';
import type { KnowledgeResource } from '@/types/knowledge-resource';
import { ResourceCard } from './ResourceCard';

const FEATURED_RESOURCE_COUNT = 6;

export function KnowledgeHubSection() {
  const resources = (knowledgeResources as KnowledgeResource[]).slice(0, FEATURED_RESOURCE_COUNT);

  return (
    <Section
      tone="blue"
      isBleed
      className="bg-[image:url('/images/blue-container-blocks.png')] bg-top-right bg-no-repeat"
    >
      <Container className="flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          title="Knowledge Hub"
          tone="light"
          description="Explore the newest reports, policy toolkits, case studies, and data sets — each vetted and organized to help you advance plastics circularity across ASEAN."
          cta={{ label: 'Explore all resources', href: '/knowledge-hub' }}
          className="relative lg:flex-col"
          titleClassName="max-w-[18.5rem]"
          textContainerClassName="ml-1 lg:gap-6"
          descriptionClassName="max-w-[37.5rem]"
        />
        <Carousel
          ariaLabel="Featured knowledge resources"
          tone="light"
          className="mt-2"
          viewportClassName="mt-9"
        >
          {resources.map((resource) => (
            <div key={resource.id} className="h-full max-h-[25.625rem] w-[19.5rem] sm:w-[24.5rem]">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
