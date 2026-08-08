import type { ResourceListQuery } from '@/types/knowledge-resource';

const NEWS = 'news';
const DETAIL = 'detail';
const CONTACT = 'contact';
const KNOWLEDGE_RESOURCES = 'knowledge-resources';

export const NEWS_KEYS = {
  all: [NEWS],
  detail: (slug: string) => [NEWS, DETAIL, slug] as const,
};

export const CONTACT_KEYS = {
  submit: [CONTACT] as const,
};

export const KNOWLEDGE_RESOURCE_KEYS = {
  all: [KNOWLEDGE_RESOURCES],
  list: (query: ResourceListQuery) => [KNOWLEDGE_RESOURCES, query] as const,
};
