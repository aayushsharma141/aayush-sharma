# Copilot instructions for this repository

This project is a Vite + React + TypeScript site scaffolded with shadcn-ui and Tailwind. The goal of these notes is to give an AI coding agent immediate, actionable context so edits are safe and consistent.

- **Project entry & routing**: App bootstraps in `src/main.tsx` → `src/App.tsx`. Routing is handled by `react-router-dom` in `App.tsx` via `AnimatedRoutes` and `PageTransition`. Example paths: `/`, `/about-us`, `/services`, `/gallery`, `/blog`, `/contact-us`, `/portfolio/:slug`.

- **Path alias**: imports use the `@/` alias (maps to `src/` via `tsconfig.json`). Use `@/components`, `@/pages`, `@/lib`, etc.

- **Key folders**:
  - `src/components/` — UI and feature components (look under `ui/` for primitives like `button.tsx`, `toaster`, `sonner`).
  - `src/pages/` — route pages (Index, AboutPage, ServicesPage, ProjectPage).
  - `src/hooks/` — custom hooks (`use-mobile`, `use-parallax`, etc.).
  - `src/lib/` — helpers (e.g. `cn` in `src/lib/utils.ts` wraps `clsx` + `tailwind-merge`).
  - `src/data/` — static data such as `projects.ts` used by galleries/project pages.

- **Styling & conventions**:
  - Tailwind classes are used heavily; prefer utility-first changes over custom CSS where possible.
  - Use `cn(...)` from `src/lib/utils.ts` to compose class names — it resolves clsx + tailwind-merge conflicts.
  - Component files mostly use default exports and React function components.

- **Animation & UI libraries**: Framer Motion (`AnimatePresence`, `motion`) is used for route and UI animations. Radix + shadcn UI primitives are in `src/components/ui`. GSAP is also a dependency for some effects.

- **Data fetching & state**: `@tanstack/react-query` is configured in `App.tsx` via a global `QueryClientProvider`. For new data needs prefer react-query for caching/fetching patterns.

- **Common patterns to preserve**:
  - Page-level transitions are wrapped with `PageTransition` — keep this wrapper when replacing page content to preserve animation behavior.
  - Navbar links and redirects: `Nav` uses redirects (`/about` → `/about-us`, `/contact` → `/contact-us`) — maintain existing redirects when adding routes.
  - Toasts: `Toaster` and `Sonner` are mounted globally in `App.tsx`; use provided UI primitives rather than adding ad-hoc toasts.

- **Developer workflow & commands**:
  - Install: `npm i`
  - Dev: `npm run dev` (starts Vite dev server)
  - Build: `npm run build` (also `npm run build:dev` available)
  - Preview production build: `npm run preview`
  - Lint: `npm run lint`

- **When changing imports or moving files**:
  - Update `@/` imports and ensure `tsconfig.app.json`/`tsconfig.json` path mapping remains correct.
  - Run `npm run dev` locally to catch Vite import/alias errors quickly.

- **Files to check for cross-impact** (examples):
  - `src/App.tsx` — global providers, routing, toasters
  - `src/main.tsx` — entry point
  - `src/components/Navbar.tsx` — navigation patterns, external links (WhatsApp), mobile menu behavior
  - `src/lib/utils.ts` — `cn()` helper used pervasively
  - `src/data/projects.ts` — canonical project list used by `ProjectPage`

- **Avoid**: changing global providers (QueryClientProvider, TooltipProvider, HelmetProvider) or removing the `BrowserRouter` wrapper unless you update all dependent components and test routing/scroll behavior.

If any section is unclear or you'd like the agent to follow stricter rules (naming, commit message style, or test coverage requirements), tell me which constraints to add and I will update this file.
