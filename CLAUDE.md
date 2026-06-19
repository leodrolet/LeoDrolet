# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run build    # Compile JSX → dist/, bundle+minify JS/CSS, generate HTML pages
npm run watch    # Babel watch mode for the JSX sources
```

Always run `npm run build` after changes to confirm no JSX errors. There are no tests.
Quick checks: `node --check dist/bundle.min.js`, and serve locally with `python3 -m http.server`.

## Architecture

**Static multi-page site. No framework, no bundler-router, no TypeScript, no Tailwind.**
JSX is compiled by Babel and concatenated into a single `dist/bundle.min.js`. Components are
plain functions that **self-register on `window`** (e.g. `window.Hero = Hero`) and read their
dependencies back off `window`. Styling is one hand-written file, `src/styles.css`
(CSS custom properties, no utility framework).

### Build pipeline (`build.js`)
1. `FILES` lists every JSX source **in load order** (a component can only use `window.X` if X's
   file appears earlier). Babel compiles each to `dist/<key>.js`.
2. Each compiled file is wrapped in an IIFE and concatenated → `dist/bundle.js` → minified
   `dist/bundle.min.js`. The IIFE wrapping avoids `const` collisions between files.
3. `src/styles.css` → `dist/styles.min.css`.
4. **HTML generation:** `PAGES` + `src/page.template.html` produce one real `.html` file per route
   (`index.html`, `site-web.html`, `automatisation.html`, `contact.html`). Bump `ASSET_V` to bust
   the browser cache when JS/CSS change.

### Routing (multi-page)
- Each HTML file sets `<main id="root" data-page="...">`. `src/app.jsx` reads `data-page` and renders
  the matching page component (`HomePage | SiteWebPage | AutomationPage | ContactPage`), wrapped by
  the shared `ScrollProgress` + `Nav` + `Footer`.
- `vercel.json` has `cleanUrls: true` → `/site-web` serves `site-web.html`. Nav uses **real links**
  (`/`, `/site-web`, `/automatisation`, `/contact`), with active state from `location.pathname`.
- Pages and their sections live in `src/components/pages.jsx`. Section components are reused across
  pages (e.g. `Services`, `Automation`, `FAQ`, `FoundersSlots`, `CompareAgency`).

### Key files
- `src/effects.jsx` — shared hooks: `useReveal` (IntersectionObserver fade-in), `useMagnetic`,
  `useClock`, etc.
- `src/cinema.jsx` — `ScrollProgress`, `Manifesto`, `Specs` (the editorial "by the numbers" grid).
- `src/components/Services.jsx` — web **Forfaits** (1 500 $ + 250 $/mois). Exports `SectionHead`,
  `BenefitItem`.
- `src/components/Automation.jsx` — the 4 AI automations. **All AI products = 250 $/mois, no install
  fee.** Takes `lead` prop (false = skip its own title when a `PageHeader` already provides it).
- `src/components/Portfolio.jsx` — exports `FoundersSlots` (founder slots gallery) and `CompareAgency`
  (Novio vs agency comparator, built on the reusable `CompareSlider`).
- `src/components/FAQ.jsx` — generic `FAQ({items,title})` + datasets `FAQ_WEB`, `FAQ_IA`.
- `src/components/icons.jsx` — `BENEFIT_ICONS` SVG set (add new icons here).

### Conventions
- CSS variables in `:root` (see inline critical CSS in `src/page.template.html` and `src/styles.css`):
  `--bg`, `--ink`, `--ink-2`, `--accent` (#ff5b2e), `--gutter`, etc. Reuse them — do not hardcode colors.
- Reuse existing classes: `.section`, `.section-head`/`.section-title`, `.plan-card`, `.specs`/`.spec`,
  `.cslider`, `.faq`, `.field` (form inputs), `.btn`/`.btn-accent`.
- Keep it dependency-light to preserve the 100/100 Lighthouse target. React + Framer Motion are
  self-hosted in `vendor/` (CSP is `script-src 'self'`).

### Contact form
`src/components/pages.jsx` → `ContactSection` posts to Formspree (`FORMSPREE` constant, currently a
**placeholder `…/REMPLACER`** — replace with the real form id before relying on it). A previous
(stale) version of this file referenced `xykvgwnz`; verify it's actually this site's form before using.
Calendly + email + phone are the live channels.

**Deployment:** Vercel (`vercel.json` — `cleanUrls`, caching, and a strict CSP incl. `connect-src`
allowing `formspree.io`). `sitemap.xml` lists all four routes.
