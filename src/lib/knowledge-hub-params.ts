import { z } from 'zod';
import {
  PUBLICATION_YEAR_MAX,
  PUBLICATION_YEAR_MIN,
  SORT_OPTIONS,
} from '@/constants/knowledge-hub';
import type { ResourceListQuery, ResourceSortOrder } from '@/types/knowledge-resource';

const SORT_VALUES = SORT_OPTIONS.map((option) => option.value) as [
  ResourceSortOrder,
  ...ResourceSortOrder[],
];

const YEAR_SCHEMA = z.coerce
  .number()
  .int()
  .catch(PUBLICATION_YEAR_MIN)
  .transform((year) => Math.min(Math.max(year, PUBLICATION_YEAR_MIN), PUBLICATION_YEAR_MAX));

const PAGE_SCHEMA = z.coerce.number().int().min(1).catch(1);

/**
 * Next.js Server Component `searchParams` is a plain record, while the
 * Route Handler and `useSearchParams()` both hand back a URLSearchParams —
 * normalising to one shape keeps the parser below the single source of truth.
 */
export type NextSearchParams = Record<string, string | string[] | undefined>;

export function toURLSearchParams(searchParams: NextSearchParams): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }

  return params;
}

function parseCsvParam(searchParams: URLSearchParams, key: string): string[] {
  const raw = searchParams.get(key);
  return raw ? raw.split(',').filter(Boolean) : [];
}

export function parseKnowledgeHubSearchParams(searchParams: URLSearchParams): ResourceListQuery {
  const sortResult = z.enum(SORT_VALUES).catch('latest').safeParse(searchParams.get('sort'));
  const yearFrom = YEAR_SCHEMA.parse(searchParams.get('yearFrom') ?? PUBLICATION_YEAR_MIN);
  const yearToRaw = YEAR_SCHEMA.parse(searchParams.get('yearTo') ?? PUBLICATION_YEAR_MAX);

  return {
    q: searchParams.get('q')?.trim() ?? '',
    type: parseCsvParam(searchParams, 'type'),
    theme: parseCsvParam(searchParams, 'theme'),
    geo: parseCsvParam(searchParams, 'geo'),
    format: parseCsvParam(searchParams, 'format'),
    lang: parseCsvParam(searchParams, 'lang'),
    yearFrom: Math.min(yearFrom, yearToRaw),
    yearTo: Math.max(yearFrom, yearToRaw),
    sort: sortResult.success ? sortResult.data : 'latest',
    page: PAGE_SCHEMA.parse(searchParams.get('page') ?? 1),
  };
}

const CSV_KEYS = [
  'type',
  'theme',
  'geo',
  'format',
  'lang',
] as const satisfies readonly (keyof ResourceListQuery)[];

/** Serializes a query back to a URL search string, omitting default/empty values. */
export function serializeKnowledgeHubQuery(query: Partial<ResourceListQuery>): string {
  const params = new URLSearchParams();

  if (query.q) params.set('q', query.q);
  for (const key of CSV_KEYS) {
    const values = query[key];
    if (values && values.length > 0) params.set(key, values.join(','));
  }
  if (query.yearFrom !== undefined && query.yearFrom !== PUBLICATION_YEAR_MIN) {
    params.set('yearFrom', String(query.yearFrom));
  }
  if (query.yearTo !== undefined && query.yearTo !== PUBLICATION_YEAR_MAX) {
    params.set('yearTo', String(query.yearTo));
  }
  if (query.sort && query.sort !== 'latest') params.set('sort', query.sort);
  if (query.page !== undefined && query.page > 1) params.set('page', String(query.page));

  return params.toString();
}

export function hasActiveKnowledgeHubFilters(query: ResourceListQuery): boolean {
  return (
    query.q.length > 0 ||
    query.type.length > 0 ||
    query.theme.length > 0 ||
    query.geo.length > 0 ||
    query.format.length > 0 ||
    query.lang.length > 0 ||
    query.yearFrom !== PUBLICATION_YEAR_MIN ||
    query.yearTo !== PUBLICATION_YEAR_MAX
  );
}
