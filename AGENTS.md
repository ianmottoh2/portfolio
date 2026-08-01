# AGENTS.md

Next.js 16 (App Router) + React 19 portfolio site for Septian Mottoh, generated from Google AI Studio. It is a fully static, client-rendered site.

## Commands

- `npm run dev` — dev server on port 3000 (`-H 0.0.0.0`). Use **npm**: `bun` is not installed and there is no `bun.lock`; `package-lock.json` is the real lockfile.
- `npm run lint` — typecheck only (`tsc --noEmit`). There is no ESLint.
- `npm run build` — `next build` (also typechecks).
- `npm run clean` — removes `dist` and `.next`.

## Architecture

- Entrypoint: `src/app/page.tsx` → `src/App.tsx` (everything is `'use client'`). There is no server-side code, API routes, or SSR data fetching.
- `src/data/portfolioData.ts` is the single source of truth for all portfolio content (projects, experience, skills, personal info). `src/types.ts` defines the shapes.
- `ProjectModal` and `CVModal` are loaded via `next/dynamic` with `ssr: false` in `src/App.tsx` — keep them dynamic.
- Styling: Tailwind v4 via `@tailwindcss/postcss` + glassmorphism utility classes defined in `src/app/globals.css`. **`src/index.css` is an orphaned duplicate and is never imported — edit `globals.css` instead.**
- `HeroScene.tsx` uses `@react-three/fiber` + `@react-three/drei` and wraps the canvas in its own error boundary; `next.config.ts` transpiles the three packages.

## Gotchas

- tsconfig maps `@/*` → project root (not `src/*`). The codebase only uses relative imports — don't introduce `@/` imports expecting them to point at `src/`.
- `@google/genai`, `express`, and `dotenv` are installed but **unused** (left over from the AI Studio template). There is no Gemini/API code; `GEMINI_API_KEY` / `.env.local` are NOT required to run.
- `tsconfig.json` has `strict: false` and `noEmit: true`.
- `metadata.json` and the empty `assets/` dir are AI Studio deployment leftovers — both are untracked and safe to ignore. Images are unoptimized (`next.config.ts`).
