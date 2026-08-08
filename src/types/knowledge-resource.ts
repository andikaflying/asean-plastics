export type ResourceFormat = 'PDF' | 'XLSX' | 'VIDEO' | 'WEB';

export type ResourceAccess = {
  kind: 'download' | 'external';
  url: string;
};

export type KnowledgeResource = {
  id: string;
  slug: string;
  title: string;
  type: string;
  format: ResourceFormat;
  publicationYear: number;
  publishedAt: string;
  keywords: string[];
  thematicAreas: string[];
  geographies: string[];
  language: string;
  source: string;
  access: ResourceAccess;
  isFeatured: boolean;
};

export type ResourceSortOrder = 'latest' | 'oldest' | 'title-asc';

export type ResourceListQuery = {
  q: string;
  type: string[];
  theme: string[];
  geo: string[];
  format: string[];
  lang: string[];
  yearFrom: number;
  yearTo: number;
  sort: ResourceSortOrder;
  page: number;
};

export type ResourceListResponse = {
  data: KnowledgeResource[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  featured: KnowledgeResource[];
};
