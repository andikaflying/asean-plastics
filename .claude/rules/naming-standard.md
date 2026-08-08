---
description: Frontend naming conventions for variables, components, files, and folders in this Next.js + Tailwind project.
alwaysApply: true
---

# Naming Standards

## Must follow

- **Variables / functions**: camelCase, verb+noun for functions (`fetchNewsArticle`, `handleSubmit`)
- **Booleans**: prefix `is`, `has`, `can`, `should` — never `flag`, `data`, `x` (`isLoading`, `isMobileNavOpen`)
- **Components**: PascalCase, one component per file (`Button.tsx`, `NewsHero.tsx`)
- **Folders & routes**: kebab-case (`design-system/`, `news/[slug]/`)
- **Utility files**: kebab-case (`format-date.ts`, `get-base-url.ts`)
- **Tailwind tokens**: defined in `src/styles/theme.css` under `@theme`, kebab-case token names (`--color-blue-500`, `--text-lg`)
- **Constants / env**: SCREAMING_SNAKE_CASE (`NEWS_KEYS`, `NEXT_PUBLIC_SITE_URL`)
- **Event handlers**: `handleClick`, `handleSubmit`, `handleCopyLink`
- **React state**: `[items, setItems]`, `[isLoading, setIsLoading]`
- **Hooks**: `use` + PascalCase (`useNewsArticle`)
- **Types**: PascalCase, avoid names that collide with imported library types (e.g. not `Image` — clashes with `next/image`)
- **Imports**: use the `@/` alias across folders; a sibling in the same directory may use `./`; never `../` to reach a parent or cousin folder

## Project paths

```
src/app/(site)/            → pages & layouts sharing header/footer
src/app/api/                → mock API route handlers
src/components/common/design-system/  → design system primitives (Button, Typography, ...)
src/components/layout/      → Header, Footer, Container
src/components/features/    → domain-specific composites, grouped by feature
src/hooks/                  → use*.ts hooks
src/lib/                    → framework/runtime glue (query client, base URL, mock request)
src/services/                → data-fetching functions per domain
src/utils/                  → pure helpers (cn, format-date)
src/types/                  → shared TypeScript types
src/constants/               → shared constants (nav items, query keys)
src/styles/                  → theme.css (@theme tokens)
```

## Before completing a task

- No vague names (`data`, `thing`, `process`, `Card1`)
- Booleans carry `is`/`has`/`can`/`should`
- Functions are verb+noun
- No new type/name shadows an imported library identifier
- No relative import crosses out of the current folder (`../`)
- Check `src/lib`, `src/utils`, `src/types`, `src/constants` before adding a new shared helper — don't duplicate
