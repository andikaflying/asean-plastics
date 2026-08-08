const NEWS = 'news';
const DETAIL = 'detail';

export const NEWS_KEYS = {
  all: [NEWS],
  detail: (slug: string) => [NEWS, DETAIL, slug] as const,
};
