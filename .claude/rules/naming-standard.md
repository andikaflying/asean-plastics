---
description: Frontend naming conventions for variables, components, files, folders, CSS, i18n, and Mapbox modules in this boilerplate.
alwaysApply: true
---

# Naming Standards (Boilerplate)

You must follow rules at **naming-standard.md**. Summary for agents:

## Must follow

- **Variables / functions**: camelCase, verb+noun for functions (`fetchUsers`, `handleSubmit`)
- **Booleans**: prefix `is`, `has`, `can`, `should` — never `flag`, `data`, `x`
- **Components**: PascalCase (`UserCard`), folder `UserCard/index.tsx`
- **Folders & routes**: kebab-case (`map-controls/`, `[locale]/user-management/`)
- **Utility files**: kebab-case (`format-date.ts`, `api-client.ts`)
- **SCSS**: BEM — `.block__element--modifier` (e.g. `.header__nav`)
- **Tailwind customs**: `@utility` in `public/styles/tailwind-customs/`, kebab-case names
- **Constants / env**: SCREAMING_SNAKE_CASE (`DEFAULT_MAP_ZOOM`, `NEXT_PUBLIC_MAPBOX_TOKEN`)
- **Event handlers**: `handleClick`, `handleSubmit`
- **React state**: `[users, setUsers]`, `[isLoading, setIsLoading]`
- **Hooks**: `use` + PascalCase (`useLocalizedHref`, `useMap`)
- **Intlayer**: colocate `{name}.content.ts`, key in kebab-case (`header-content`)
- **Imports**: always `@/` alias, never deep `../../..` paths

## Project paths

```
src/app/[locale]/          → pages & layouts
src/app/components/        → PascalCase feature folders
src/app/hooks/             → use*.ts hooks
src/lib/mapbox/            → MapProvider, utils
src/context/               → MapContext, useMap()
public/styles/components/  → BEM SCSS by feature
public/styles/tailwind-customs/ → @utility classes
```

## Before completing a task

Run through the checklist in `naming-standard.md` §16. Reject vague names (`data`, `thing`, `process`, `Card1`).
