'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { SearchInput } from '@/components/common/design-system/SearchInput';
import { Select } from '@/components/common/design-system/Select';
import { SORT_OPTIONS } from '@/constants/knowledge-hub';
import { useKnowledgeHubUrl } from '@/hooks/useKnowledgeHubUrl';
import type { ResourceSortOrder } from '@/types/knowledge-resource';

const SEARCH_DEBOUNCE_MS = 2000;

function SortIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 4v16m0 0-4-4m4 4 4-4M17 20V4m0 0 4 4m-4-4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResourceToolbar() {
  const { query, updateQuery } = useKnowledgeHubUrl();
  const [searchValue, setSearchValue] = useState(query.q);
  const [committedSearchQuery, setCommittedSearchQuery] = useState(query.q);

  // Adjusting state during render (not in an effect) when the URL's `q`
  // changes from outside this component — e.g. a chip removal or RESET.
  if (query.q !== committedSearchQuery) {
    setCommittedSearchQuery(query.q);
    setSearchValue(query.q);
  }

  useEffect(() => {
    if (searchValue === query.q) return undefined;

    const timeout = setTimeout(() => {
      updateQuery({ q: searchValue, page: 1 });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
    // Only the debounce timer should reset when the typed value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  function handleSortChange(value: string) {
    updateQuery({ sort: value as ResourceSortOrder, page: 1 });
  }

  return (
    <div className="bg-cream-secondary">
      <Container className="flex flex-col gap-4 py-4 md:h-20 md:flex-row md:items-center md:justify-between md:py-0">
        <SearchInput
          label="Search by keyword"
          placeholder="Search by keyword..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="md:max-w-xl md:flex-1"
          inputClassName="bg-transparent"
        />
        <Select
          startIcon={<SortIcon />}
          options={[...SORT_OPTIONS]}
          value={query.sort}
          onValueChange={handleSortChange}
          className="bg-transparent md:w-[9.375rem]"
        />
      </Container>
    </div>
  );
}
