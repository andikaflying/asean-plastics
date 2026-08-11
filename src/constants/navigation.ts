export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Knowledge Hub', href: '/knowledge-hub' },
  { label: 'Partnerships', href: '/#' },
  { label: 'Training', href: '/#' },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: 'Opportunities', href: '/#' },
  { label: 'News', href: '/news/turning-the-tide-asean-marine-plastic-response' },
  { label: 'About', href: '/#' },
  { label: 'Contact Us', href: '/contact' },
];

export const ALL_NAV_ITEMS: NavItem[] = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS];
