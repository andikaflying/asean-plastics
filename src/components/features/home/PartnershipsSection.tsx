import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { PartnerCard } from './PartnerCard';
import { PARTNERS } from '@/constants/partners';

export function PartnershipsSection() {
  return (
    <Section tone="white" isBleed className="pb-16 lg:pb-25">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          title="Partnerships"
          description="Meet the organizations driving change — from multinational agencies to grassroots innovators. Browse by sector, country, or focus area to find collaborators aligned with your mission."
          cta={{ label: 'View all partners', href: '/partnerships' }}
          textContainerClassName="mt-6"
          descriptionClassName="max-w-[592px]"
          ctaClassName="w-fit lg:absolute lg:right-0 lg:bottom-[-6rem]"
        />
        <Carousel ariaLabel="Featured partners" tone="dark" viewportClassName="mt-8">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="w-[17.625rem]">
              <PartnerCard partner={partner} />
            </div>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
