export type FacetOption = {
  label: string;
  value: string;
};

export const RESOURCE_TYPE_OPTIONS: FacetOption[] = [
  { label: 'Policy Brief', value: 'policy-brief' },
  { label: 'Academic Paper', value: 'academic-paper' },
  { label: 'Report', value: 'report' },
  { label: 'Multimedia', value: 'multimedia' },
  { label: 'Technical Guide', value: 'technical-guide' },
  { label: 'Case Study', value: 'case-study' },
  { label: 'Data Report', value: 'data-report' },
  { label: 'Toolkit', value: 'toolkit' },
  { label: 'Research Report', value: 'research-report' },
  { label: 'Policy Analysis', value: 'policy-analysis' },
];

export const THEMATIC_AREA_OPTIONS: FacetOption[] = [
  { label: 'Microplastics', value: 'microplastics' },
  { label: 'EPR', value: 'epr' },
  { label: 'Circular Economy', value: 'circular-economy' },
  { label: 'Recycling', value: 'recycling' },
  { label: 'Marine Biodiversity', value: 'marine-biodiversity' },
];

export const GEOGRAPHY_OPTIONS: FacetOption[] = [
  { label: 'Regional (ASEAN-wide)', value: 'regional' },
  { label: 'Indonesia', value: 'indonesia' },
  { label: 'Malaysia', value: 'malaysia' },
  { label: 'Philippines', value: 'philippines' },
  { label: 'Thailand', value: 'thailand' },
  { label: 'Vietnam', value: 'vietnam' },
];

export const FORMAT_TYPE_OPTIONS: FacetOption[] = [
  { label: 'PDF', value: 'PDF' },
  { label: 'XLSX', value: 'XLSX' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Web', value: 'WEB' },
];

export const LANGUAGE_OPTIONS: FacetOption[] = [
  { label: 'English', value: 'english' },
  { label: 'Bahasa Indonesia', value: 'bahasa-indonesia' },
  { label: 'Thai', value: 'thai' },
  { label: 'Vietnamese', value: 'vietnamese' },
];

export const SORT_OPTIONS: FacetOption[] = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Title (A–Z)', value: 'title-asc' },
];

export const PUBLICATION_YEAR_MIN = 2020;
export const PUBLICATION_YEAR_MAX = 2025;
export const RESOURCES_PER_PAGE = 6;
export const RESOURCE_KEYWORD_TAG_LIMIT = 3;

export function getFacetLabel(options: FacetOption[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
