import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { HomeHero } from '@/components/features/home/HomeHero';
import { HomeIntro } from '@/components/features/home/HomeIntro';
import { WhatWeOffer } from '@/components/features/home/WhatWeOffer';
import { KnowledgeHubSection } from '@/components/features/home/KnowledgeHubSection';
import { PartnershipsSection } from '@/components/features/home/PartnershipsSection';
import { TrainingSection } from '@/components/features/home/TrainingSection';
import { OpportunitiesSection } from '@/components/features/home/OpportunitiesSection';
import { NewsSection } from '@/components/features/home/NewsSection';

export const metadata: Metadata = {
  title: 'ASEAN Plastics Knowledge Platform',
  description:
    'Uniting Southeast Asia to end marine plastic pollution through shared research, hands-on training, and cross-border collaboration.',
};

export default function HomePage() {
  return (
    <>
      <div className="to-surface relative isolate overflow-hidden bg-gradient-to-b from-blue-100 via-blue-100/30">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 -z-10 h-[51rem] w-[64%] rounded-bl-[1rem] bg-blue-500"
        />
        <div className="pt-24 pb-8 lg:pt-26 lg:pb-12">
          <HomeHero />
          <HomeIntro />
        </div>
      </div>
      <Section tone="cream" className="lg:pb-10">
        <WhatWeOffer />
      </Section>
      <KnowledgeHubSection />
      <PartnershipsSection />
      <TrainingSection />
      <Section tone="cream" className="py-24">
        <OpportunitiesSection />
      </Section>
      <Container className="py-16 lg:py-24">
        <NewsSection />
      </Container>
    </>
  );
}
