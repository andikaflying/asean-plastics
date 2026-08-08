const NEWS = 'news';
const DETAIL = 'detail';
const CONTACT = 'contact';
const SUBMIT = 'submit';

export const NEWS_KEYS = {
  all: [NEWS],
  detail: (slug: string) => [NEWS, DETAIL, slug] as const,
};

export const CONTACT_KEYS = {
  submit: [CONTACT, SUBMIT] as const,
};
