import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { PartnerCard } from './PartnerCard';
import { PARTNERS } from '@/constants/partners';

export function PartnershipsSection() {
  return (
    <Section tone="white" isBleed className="pb-25">
      <div className="mx-auto flex w-full max-w-[76.375rem] flex-col gap-12">
        <SectionHeading
          title="Partnerships"
          description="Meet the organizations driving change — from multinational agencies to grassroots innovators. Browse by sector, country, or focus area to find collaborators aligned with your mission."
          cta={{ label: 'View all partners', href: '/partnerships' }}
          textContainerClassName="mt-6"
          descriptionClassName="max-w-[592px]"
          ctaClassName="absolute bottom-[-6rem] right-0"
        />
        <Carousel ariaLabel="Featured partners" tone="dark" viewportClassName="mt-8">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="w-[17.625rem]">
              <PartnerCard partner={partner} />
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
