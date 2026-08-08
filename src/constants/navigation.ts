export type NavItem = {
  label: string;
  href: string;
};

export const LEFT_NAV: NavItem[] = [
  { label: 'Knowledge Hub', href: '/knowledge-hub' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Training', href: '/training' },
];

export const RIGHT_NAV: NavItem[] = [
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export const ALL_NAV: NavItem[] = [...LEFT_NAV, ...RIGHT_NAV];
