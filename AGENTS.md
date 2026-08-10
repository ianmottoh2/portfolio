# AGENTS.md

Next.js 16 (App Router) + React 19 portfolio site for Septian Mottoh, generated from Google AI Studio. It is a fully static, client-rendered site.

## Commands

- `npm run dev` — dev server on port 3000 (`-H 0.0.0.0`). Use **npm**: `bun` is not installed and there is no `bun.lock`; `package-lock.json` is the real lockfile.
- `npm run lint` — typecheck only (`tsc --noEmit`). There is no ESLint.
- `npm run build` — `next build` (also typechecks).
- `npm run clean` — removes `dist` and `.next`.

## Architecture

- App Router with React Server Components by default: `src/app/page.tsx` is a Server Component that renders the client shell `src/App.tsx` and passes the four tab views (`HomeSection`, `PortfolioSection`, `AboutSection`, `ContactSection`) in as server-rendered children.
- `src/App.tsx` (`'use client'`) is the interactive shell: it owns the `activeTab` state and the CV modal, wraps everything in `NavigationProvider`, and renders the active tab's child. `HomeSection` / `PortfolioSection` / `AboutSection` / `ExperienceTimeline` are **Server Components** (no directive).
- Interactive islands that stay `'use client'`: `Navbar`, `Footer`, `GlassCard`, `HeroSection`, `ProjectCard`, `ProjectGallery`, `PortfolioExplorer`, `SkillsSection`, `PerformanceImpactDemo`, `ContactSection`, the modals, the background (`AuraBackground`), and the navigation helpers (`NavigationContext`, `TabButton`, `OpenCVButton`).
- `ProjectModal` and `CVModal` are loaded via `next/dynamic` with `ssr: false` — `ProjectModal` from `ProjectGallery`/`PortfolioExplorer`, `CVModal` from `src/App.tsx`. Keep them dynamic.
- The page background is `AuraBackground`: a raw Three.js fullscreen-quad fragment shader (WebGL, original GLSL with Ashima simplex-noise fbm), mounted once in `src/app/layout.tsx` via the client wrapper `AuraBackgroundDynamic` (`next/dynamic` + `ssr: false` so the three.js chunk (~130KB) stays out of the initial bundle). It caps DPR at 1.5, pauses via IntersectionObserver/`visibilitychange`, and disposes its context on unmount. The wrapper renders an instant static CSS-gradient placeholder so the background never appears as flat black while the chunk hydrates. `NoiseBackground.tsx` (the earlier CSS/SVG alternative) is kept but **not mounted** — swap the import in `layout.tsx` to revert. `AuraBackground` renders a static gradient (no WebGL context) when `prefers-reduced-motion` is set or WebGL is unavailable.
- Cross-boundary navigation (tab switching + CV modal) flows through `NavigationContext` (`useNavigation()`), so server-rendered sections can host client buttons (`TabButton`, `OpenCVButton`). Client-to-client (App → Navbar/Footer) still uses plain props.
- `src/data/portfolioData.ts` is the single source of truth for all portfolio content (projects, experience, skills, personal info). `src/types.ts` defines the shapes.
- Styling: Tailwind v4 via `@tailwindcss/postcss` + glassmorphism utility classes defined in `src/app/globals.css`. **`src/index.css` is an orphaned duplicate and is never imported — edit `globals.css` instead.**
- `AuraBackground.tsx` imports `three` directly (named imports: `WebGLRenderer`, `OrthographicCamera`, `Scene`, `PlaneGeometry`, `ShaderMaterial`, etc.); `HeroScene.tsx` (the R3F/drei canvas, `import * as THREE`) is orphaned/unmounted. `next.config.ts` transpiles the three packages.

## Gotchas

- tsconfig maps `@/*` → project root (not `src/*`). The codebase only uses relative imports — don't introduce `@/` imports expecting them to point at `src/`.
- `@google/genai`, `express`, and `dotenv` are installed but **unused** (left over from the AI Studio template). There is no Gemini/API code; `GEMINI_API_KEY` / `.env.local` are NOT required to run.
- `tsconfig.json` has `strict: false` and `noEmit: true`.
- `metadata.json` and the empty `assets/` dir are AI Studio deployment leftovers — both are untracked and safe to ignore. Images are unoptimized (`next.config.ts`).
