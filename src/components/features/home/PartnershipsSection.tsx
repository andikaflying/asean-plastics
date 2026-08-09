import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { PartnerCard } from './PartnerCard';
import { PARTNERS } from '@/constants/partners';

export function PartnershipsSection() {
  return (
    <Section tone="white" isBleed>
      <div className="mx-auto flex w-full max-w-[76.375rem] flex-col gap-12 px-4 sm:px-6 lg:px-[4.5rem]">
        <SectionHeading
          title="Partnerships"
          description="Meet the organizations driving change — from multinational agencies to grassroots innovators. Browse by sector, country, or focus area to find collaborators aligned with your mission."
          cta={{ label: 'View all partners', href: '/partnerships' }}
        />
        <Carousel ariaLabel="Featured partners" tone="dark">
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
