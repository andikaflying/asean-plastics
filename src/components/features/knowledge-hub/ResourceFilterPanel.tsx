'use client';

import { useState } from 'react';
import { Typography } from '@/components/common/design-system/Typography';
import { Button } from '@/components/common/design-system/Button';
import { Tag } from '@/components/common/design-system/Tag';
import { Checkbox } from '@/components/common/design-system/Checkbox';
import { Accordion, AccordionItem } from '@/components/common/design-system/Accordion';
import { RangeSlider } from '@/components/common/design-system/RangeSlider';
import { TextField } from '@/components/common/design-system/TextField';
import {
  RESOURCE_TYPE_OPTIONS,
  THEMATIC_AREA_OPTIONS,
  GEOGRAPHY_OPTIONS,
  FORMAT_TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
  PUBLICATION_YEAR_MIN,
  PUBLICATION_YEAR_MAX,
  getFacetLabel,
  type FacetOption,
} from '@/constants/knowledge-hub';
import { hasActiveKnowledgeHubFilters } from '@/lib/knowledge-hub-params';
import { useKnowledgeHubUrl } from '@/hooks/useKnowledgeHubUrl';
import type { ResourceListQuery } from '@/types/knowledge-resource';

type FacetKey = 'type' | 'theme' | 'geo' | 'format' | 'lang';

type FilterDraft = Pick<ResourceListQuery, FacetKey | 'yearFrom' | 'yearTo'>;

function draftFromQuery(query: ResourceListQuery): FilterDraft {
  return {
    type: query.type,
    theme: query.theme,
    geo: query.geo,
    format: query.format,
    lang: query.lang,
    yearFrom: query.yearFrom,
    yearTo: query.yearTo,
  };
}

function isSameFacetSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedB = [...b].sort();
  return [...a].sort().every((value, index) => value === sortedB[index]);
}

function isDraftEqualToQuery(draft: FilterDraft, query: ResourceListQuery): boolean {
  return (
    isSameFacetSet(draft.type, query.type) &&
    isSameFacetSet(draft.theme, query.theme) &&
    isSameFacetSet(draft.geo, query.geo) &&
    isSameFacetSet(draft.format, query.format) &&
    isSameFacetSet(draft.lang, query.lang) &&
    draft.yearFrom === query.yearFrom &&
    draft.yearTo === query.yearTo
  );
}

function toggleFacetValue(values: string[], value: string, isChecked: boolean): string[] {
  return isChecked ? [...values, value] : values.filter((existing) => existing !== value);
}

function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string, isChecked: boolean) => void;
}) {
  return (
    <fieldset className="contents">
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onCheckedChange={(isChecked) => onToggle(option.value, isChecked)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function ResourceFilterPanel() {
  const { query, updateQuery } = useKnowledgeHubUrl();
  const [draft, setDraft] = useState<FilterDraft>(() => draftFromQuery(query));
  const [committedQuery, setCommittedQuery] = useState(query);
  // Groups with an active selection start expanded (matches the filtered
  // Figma frame); with nothing selected every group starts collapsed
  // (matches the default frame).
  const [openGroups, setOpenGroups] = useState<string[]>(() =>
    (['type', 'theme', 'geo', 'format', 'lang'] as const).filter((key) => query[key].length > 0),
  );

  // Adjusting state during render (not in an effect) when the URL changes
  // from outside this panel — e.g. a chip removal, RESET, or the browser
  // back/forward button.
  if (query !== committedQuery) {
    setCommittedQuery(query);
    setDraft(draftFromQuery(query));
  }

  const hasDraftChanges = !isDraftEqualToQuery(draft, query);
  const hasAnythingToClear = hasActiveKnowledgeHubFilters(query) || hasDraftChanges;

  function handleFacetToggle(key: FacetKey, value: string, isChecked: boolean) {
    setDraft((current) => ({
      ...current,
      [key]: toggleFacetValue(current[key], value, isChecked),
    }));
  }

  function handleApply() {
    updateQuery({ ...draft, page: 1 });
  }

  function handleReset() {
    updateQuery({
      q: '',
      type: [],
      theme: [],
      geo: [],
      format: [],
      lang: [],
      yearFrom: PUBLICATION_YEAR_MIN,
      yearTo: PUBLICATION_YEAR_MAX,
      page: 1,
    });
  }

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [
    ...(query.q
      ? [{ key: 'q', label: `"${query.q}"`, onRemove: () => updateQuery({ q: '', page: 1 }) }]
      : []),
    ...buildFacetChips('type', query.type, RESOURCE_TYPE_OPTIONS, updateQuery),
    ...buildFacetChips('theme', query.theme, THEMATIC_AREA_OPTIONS, updateQuery),
    ...buildFacetChips('geo', query.geo, GEOGRAPHY_OPTIONS, updateQuery),
    ...buildFacetChips('format', query.format, FORMAT_TYPE_OPTIONS, updateQuery),
    ...buildFacetChips('lang', query.lang, LANGUAGE_OPTIONS, updateQuery),
    ...(query.yearFrom !== PUBLICATION_YEAR_MIN || query.yearTo !== PUBLICATION_YEAR_MAX
      ? [
          {
            key: 'year',
            label: `${query.yearFrom}–${query.yearTo}`,
            onRemove: () =>
              updateQuery({
                yearFrom: PUBLICATION_YEAR_MIN,
                yearTo: PUBLICATION_YEAR_MAX,
                page: 1,
              }),
          },
        ]
      : []),
  ];

  return (
    <aside aria-label="Filters" className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography as="h2" size="md" weight="semibold">
          Filter
        </Typography>
        {hasAnythingToClear && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-semibold text-blue-500 uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Reset
          </button>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-live="polite">
          {activeChips.map((chip) => (
            <Tag key={chip.key} onRemove={chip.onRemove} removeLabel={`Remove ${chip.label}`}>
              {chip.label}
            </Tag>
          ))}
        </div>
      )}

      <Accordion value={openGroups} onValueChange={setOpenGroups} className="border-t-grey-200">
        <AccordionItem value="type" title="Type">
          <CheckboxGroup
            legend="Type"
            options={RESOURCE_TYPE_OPTIONS}
            selected={draft.type}
            onToggle={(value, isChecked) => handleFacetToggle('type', value, isChecked)}
          />
        </AccordionItem>
        <AccordionItem value="theme" title="Thematic Area">
          <CheckboxGroup
            legend="Thematic Area"
            options={THEMATIC_AREA_OPTIONS}
            selected={draft.theme}
            onToggle={(value, isChecked) => handleFacetToggle('theme', value, isChecked)}
          />
        </AccordionItem>
        <AccordionItem value="geo" title="Geographical Coverage">
          <CheckboxGroup
            legend="Geographical Coverage"
            options={GEOGRAPHY_OPTIONS}
            selected={draft.geo}
            onToggle={(value, isChecked) => handleFacetToggle('geo', value, isChecked)}
          />
        </AccordionItem>
        <AccordionItem value="year" title="Publication Year">
          <div className="flex flex-col gap-4">
            <RangeSlider
              min={PUBLICATION_YEAR_MIN}
              max={PUBLICATION_YEAR_MAX}
              value={[draft.yearFrom, draft.yearTo]}
              onValueChange={([yearFrom, yearTo]) =>
                setDraft((current) => ({ ...current, yearFrom, yearTo }))
              }
              minLabel="From publication year"
              maxLabel="To publication year"
            />
            <div className="flex items-center gap-3">
              <TextField
                label="From year"

                type="number"
                min={PUBLICATION_YEAR_MIN}
                max={draft.yearTo}
                value={draft.yearFrom}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, yearFrom: Number(event.target.value) }))
                }
              />
              <span aria-hidden="true" className="bg-grey-300 h-px w-2" />
              <TextField
                label="To year"
                type="number"
                min={draft.yearFrom}
                max={PUBLICATION_YEAR_MAX}
                value={draft.yearTo}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, yearTo: Number(event.target.value) }))
                }
              />
            </div>
          </div>
        </AccordionItem>
        <AccordionItem value="format" title="Format Type">
          <CheckboxGroup
            legend="Format Type"
            options={FORMAT_TYPE_OPTIONS}
            selected={draft.format}
            onToggle={(value, isChecked) => handleFacetToggle('format', value, isChecked)}
          />
        </AccordionItem>
        <AccordionItem value="lang" title="Language">
          <CheckboxGroup
            legend="Language"
            options={LANGUAGE_OPTIONS}
            selected={draft.lang}
            onToggle={(value, isChecked) => handleFacetToggle('lang', value, isChecked)}
          />
        </AccordionItem>
      </Accordion>

      {hasDraftChanges && (
        <Button type="button" variant="primary" onClick={handleApply} className="w-full">
          Apply
        </Button>
      )}
    </aside>
  );
}

function buildFacetChips(
  key: FacetKey,
  values: string[],
  options: FacetOption[],
  updateQuery: (patch: Partial<ResourceListQuery>) => void,
): { key: string; label: string; onRemove: () => void }[] {
  return values.map((value) => ({
    key: `${key}-${value}`,
    label: getFacetLabel(options, value),
    onRemove: () =>
      updateQuery({ [key]: values.filter((existing) => existing !== value), page: 1 }),
  }));
}
