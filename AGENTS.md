<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ASEAN Plastic Campaign

## Core Architecture

Impelement this standard convention for this repository. There are concerns that you need to pay attention :

1. Project Structure
2. Variable Naming
3. Theme & Tokens
4. Performance
5. Utility

It will be explained below for the details.

## Project Structure

Implement structure, like this :

```
src/
├── app/
│   ├── (site)/            # shared header/footer layout group
│   │   ├── page.tsx                    # Homepage
│   │   ├── knowledge-hub/page.tsx      # default + filtered states
│   │   ├── news/[slug]/page.tsx        # News Detail
│   │   ├── contact/page.tsx
│   │   └── [...placeholder]/page.tsx   # undesigned nav items
│   └── api/                            # Mock API route handlers
├── components/
│   ├── common/design-system/      # design system
│   ├── layout/            # Header, Footer, Container, Section
│   └── features/          # domain-specific composites
├── services/  hooks/  lib/  utils/  types/  constants/  styles/  mock/
```

## Variable Naming

Must refer to `.claude/rules/naming-standard.md`

### Theme & tokens

`src/styles/theme.css` — the `@theme` block:

```css
@theme {
  --text-6xl: 4.5rem; /* 72px */
  --text-lg: 1.5rem; /* 24px */
  --text-4xl: 3.5rem; /* 56px */
  --text-md: 1.125rem; /* 18px */
  --text-3xl: 2.5rem; /* 40px */
  --text-base: 1rem; /* 16px */
  --text-2xl: 2rem; /* 32px */
  --text-sm: 0.875rem; /* 14px */
  --text-xl: 1.75rem; /* 28px */
  --text-xs: 0.75rem; /* 12px */
  --font-sans: var(--font-dm-sans), system-ui, sans-serif;
  --color-blue-500: #2e5aa7; /* …full 100–900 ramps… */
}
```

Each `--text-*` gets a matching `--text-*--line-height` from the Figma measurements
(e.g. `28px → 38px`, `18px → 30px`). Sizes in `rem` so they scale with user font settings;
`px` reserved for things that must not scale (1px borders, icon boxes).

Tailwind v4's `--spacing` base is already `0.25rem`, so `p-4` = 16px — the multiple-of-4 rule
is enforced by using scale utilities and never arbitrary values. Preflight sets
`box-sizing: border-box` globally; keep it.

Standard Tailwind breakpoints only: `sm 640 / md 768 / lg 1024 / xl 1280`. Desktop comp is
1366 wide with a 1222px content area and 72px gutters → `Container` = `max-w-[76.375rem]`
with responsive padding.

## Performance

Use subagents like `.claude/agents/bundle-analyzer.md`, `.claude/agents/code-reviewer.md`, `.claude/agents/search-agent.md`, `.claude/agents/security-reviewer.md`

## Utility

Please read if the function or variable is already exist or not in `src/lib`, `src/utils`, `src/types`, `src/constants`. Try to not DRY.

If the function or variable is global or might be global then you can create in `src/lib`, `src/utils`, `src/types`, `src/constants`
