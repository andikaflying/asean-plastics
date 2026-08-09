import type { Opportunity } from '@/types/opportunity';

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'asean-marine-debris-solutions-forum',
    title: 'ASEAN Marine Debris Solutions Forum 2025',
    kind: 'Conference',
    image: { src: '/images/home/opportunity-forum.webp', width: 700, height: 468 },
    date: '10–11 Sep 2025',
    location: 'Bangkok, Thailand',
    href: '/opportunities',
  },
  {
    id: 'innovation-fund-plastic-waste-reduction',
    title: 'Innovation Fund for Plastic Waste Reduction in Coastal Communities',
    kind: 'Grant Call',
    image: { src: '/images/home/opportunity-grant.webp', width: 700, height: 525 },
    date: 'Deadline: 30 Sep 2025',
    location: 'ASEAN-wide',
    href: '/opportunities',
  },
  {
    id: 'national-epr-readiness-workshop',
    title: 'National EPR Readiness Assessment Workshop',
    kind: 'Workshop',
    image: { src: '/images/home/opportunity-workshop.webp', width: 700, height: 467 },
    date: '15 Oct 2025',
    location: 'Manila, Philippines',
    href: '/opportunities',
  },
];
