import type { TrainingCourse } from '@/types/training';

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'community-waste-audits',
    title: 'Conducting Community Waste Audits',
    category: 'Waste Management',
    image: { src: '/images/home/course-waste-management.webp', width: 700, height: 525 },
    durationMinutes: 135,
    href: '/training',
  },
  {
    id: 'epr-frameworks',
    title: 'Designing EPR Frameworks for Plastic Packaging',
    category: 'Policy Design',
    image: { src: '/images/home/course-policy-design.webp', width: 700, height: 467 },
    durationMinutes: 135,
    href: '/training',
  },
  {
    id: 'circular-business-models',
    title: 'Circular Business Models for SMEs',
    category: 'Circular Economy',
    image: { src: '/images/home/course-circular-economy.webp', width: 700, height: 580 },
    durationMinutes: 135,
    href: '/training',
  },
  {
    id: 'monitoring-microplastics',
    title: 'Monitoring Microplastics in Coastal Waters',
    category: 'Marine Science',
    image: { src: '/images/home/course-marine-science.webp', width: 700, height: 467 },
    durationMinutes: 135,
    href: '/training',
  },
  {
    id: 'mobilizing-communities',
    title: 'Mobilizing Communities for Beach Cleanups',
    category: 'Community Engagement',
    image: { src: '/images/home/course-waste-management.webp', width: 700, height: 525 },
    durationMinutes: 135,
    href: '/training',
  },
];
