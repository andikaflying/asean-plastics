import type { Partner } from '@/types/partner';

export const PARTNERS: Partner[] = [
  {
    id: 'ecopak-solutions',
    name: 'EcoPak Solutions',
    sector: 'Private Sector',
    country: 'Indonesia',
    logo: { src: '/images/home/partner-ecopak.svg', width: 76, height: 69 },
    themes: ['Microplastic', 'Health Impact', 'Circular Economy'],
  },
  {
    id: 'chulalongkorn-environmental-research-center',
    name: 'Chulalongkorn Environmental Research Center',
    sector: 'Research Institute',
    country: 'Thailand',
    logo: { src: '/images/home/partner-chulalongkorn.svg', width: 132, height: 94 },
    themes: ['Microplastic', 'Health Impact', 'Circular Economy'],
  },
  {
    id: 'ocean-conservancy-sea',
    name: 'Ocean Conservancy SEA',
    sector: 'International Organization',
    country: 'Singapore',
    logo: { src: '/images/home/partner-ocean-conservancy.svg', width: 167, height: 52 },
    themes: ['Microplastic', 'Health Impact', 'Circular Economy'],
  },
  {
    id: 'undp-plastic-initiative',
    name: 'UNDP Plastic Initiative',
    sector: 'International Organization',
    country: 'Singapore',
    logo: { src: '/images/home/partner-undp.svg', width: 163, height: 50 },
    themes: ['Microplastic', 'Health Impact', 'Circular Economy'],
  },
  {
    id: 'asean-circular-plastics-alliance',
    name: 'ASEAN Circular Plastics Alliance',
    sector: 'Alliance & Coalition',
    country: 'Malaysia',
    logo: { src: '/images/home/partner-asean-alliance.svg', width: 146, height: 33 },
    themes: ['Microplastic', 'Health Impact', 'Circular Economy'],
  },
];
