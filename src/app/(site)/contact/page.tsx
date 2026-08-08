import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { ContactHero } from '@/components/features/contact/ContactHero';
import { ContactIntro } from '@/components/features/contact/ContactIntro';
import { ContactForm } from '@/components/features/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | ASEAN Plastics Knowledge Platform',
  description:
    "We'd love to hear from you — whether it's a question, partnership idea, or feedback on the platform.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Container className="py-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[495fr_598fr] lg:gap-[8.0625rem]">
          <ContactIntro />
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
