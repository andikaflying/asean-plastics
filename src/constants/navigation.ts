export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Knowledge Hub', href: '/knowledge-hub' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Training', href: '/training' },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export const ALL_NAV_ITEMS: NavItem[] = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS];
