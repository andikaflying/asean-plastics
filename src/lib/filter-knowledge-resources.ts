import { RESOURCES_PER_PAGE } from '@/constants/knowledge-hub';
import type {
  KnowledgeResource,
  ResourceListQuery,
  ResourceListResponse,
} from '@/types/knowledge-resource';

function matchesKeywordSearch(resource: KnowledgeResource, query: string): boolean {
  if (!query) return true;

  const haystack = [resource.title, resource.source, ...resource.keywords].join(' ').toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function matchesFacet(selected: string[], resourceValues: string[]): boolean {
  if (selected.length === 0) return true;
  return resourceValues.some((value) => selected.includes(value));
}

function matchesSingleValueFacet(selected: string[], resourceValue: string): boolean {
  if (selected.length === 0) return true;
  return selected.includes(resourceValue);
}

function sortResources(
  resources: KnowledgeResource[],
  sort: ResourceListQuery['sort'],
): KnowledgeResource[] {
  const sorted = [...resources];

  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'latest':
    default:
      return sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
}

/**
 * Pure filter/sort/paginate over the fixture rows — no I/O, so it is
 * unit-testable and shared as-is by the Route Handler.
 */
export function filterKnowledgeResources(
  resources: KnowledgeResource[],
  query: ResourceListQuery,
): ResourceListResponse {
  const featured = resources.filter((resource) => resource.isFeatured);

  const matched = resources
    .filter((resource) => !resource.isFeatured)
    .filter((resource) => matchesKeywordSearch(resource, query.q))
    .filter((resource) => matchesSingleValueFacet(query.type, resource.type))
    .filter((resource) => matchesFacet(query.theme, resource.thematicAreas))
    .filter((resource) => matchesFacet(query.geo, resource.geographies))
    .filter((resource) => matchesSingleValueFacet(query.format, resource.format))
    .filter((resource) => matchesSingleValueFacet(query.lang, resource.language))
    .filter(
      (resource) =>
        resource.publicationYear >= query.yearFrom && resource.publicationYear <= query.yearTo,
    );

  const sorted = sortResources(matched, query.sort);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / RESOURCES_PER_PAGE));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * RESOURCES_PER_PAGE;
  const data = sorted.slice(start, start + RESOURCES_PER_PAGE);

  return { data, total, page, perPage: RESOURCES_PER_PAGE, totalPages, featured };
}
