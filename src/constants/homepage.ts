import type { HeroSlide, OfferPillar } from '@/types/homepage';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'cleaner-seas',
    image: { src: '/images/home/hero-banner.webp', width: 1400, height: 934 },
    title: 'Knowledge & Partnerships for Cleaner Seas',
    subtitle:
      'Uniting Southeast Asia to end marine plastic pollution through shared research, hands-on training, and cross-border collaboration',
  },
  {
    id: 'shared-research',
    image: { src: '/images/home/hero-banner.webp', width: 1400, height: 934 },
    title: 'Evidence That Moves Policy Forward',
    subtitle:
      'A growing library of vetted research and data helping ASEAN Member States design smarter plastics policy',
  },
  {
    id: 'cross-border-training',
    image: { src: '/images/home/hero-banner.webp', width: 1400, height: 934 },
    title: 'Skills Built for Southeast Asia',
    subtitle:
      'Hands-on training programmes equipping practitioners to run waste audits and design circular solutions',
  },
];

export const OFFER_PILLARS: OfferPillar[] = [
  {
    id: 'knowledge-hub',
    title: 'Knowledge Hub',
    description:
      'Browse peer-reviewed studies, policy briefs, and field guides curated for the ASEAN context. From microplastics data to circular economy frameworks — find the evidence you need to drive smarter decisions.',
    icon: { src: '/icons/offer-knowledge.svg', width: 48, height: 48 },
    href: '/knowledge-hub',
  },
  {
    id: 'partnerships',
    title: 'Partnerships',
    description:
      'Connect with governments, NGOs, research institutions, and private-sector innovators working to reduce plastic waste across the region. Map your allies, share lessons, and co-create scalable solutions.',
    icon: { src: '/icons/offer-partnership.svg', width: 48, height: 48 },
    href: '/partnerships',
    ctaLabel: "Let's explore",
  },
  {
    id: 'training',
    title: 'Training',
    description:
      "Enroll in self-paced courses designed by regional experts. Build skills in waste auditing, policy design, community engagement, and more — all tailored to Southeast Asia's unique challenges.",
    icon: { src: '/icons/offer-training.svg', width: 48, height: 48 },
    href: '/training',
  },
];
