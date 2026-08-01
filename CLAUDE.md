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
   (`index.html`, `site-web.html`, `automatisation.html`, `tarifs.html`, `contact.html`). Bump `ASSET_V` to bust
   the browser cache when JS/CSS change.

### Routing (multi-page)
- Each HTML file sets `<main id="root" data-page="...">`. `src/app.jsx` reads `data-page` and renders
  the matching page component (`HomePage | SiteWebPage | AutomationPage | PricingPage | ContactPage`), wrapped by
  the shared `ScrollProgress` + `Nav` + `Footer`.
- `vercel.json` has `cleanUrls: true` → `/site-web` serves `site-web.html`. Nav uses **real links**
  (`/`, `/site-web`, `/automatisation`, `/contact`), with active state from `location.pathname`.
- Pages and their sections live in `src/components/pages.jsx` (incl. `Testimonials`, a home section
  currently holding clearly-marked placeholders — real quotes to be filled in). Section components are
  reused across pages (e.g. `Services`, `FAQ`, `FoundersSlots`, `CompareAgency`).

### Key files
- `src/effects.jsx` — shared hooks: `useReveal` (IntersectionObserver fade-in), `useMagnetic`,
  `useClock`, etc.
- `src/cinema.jsx` — `ScrollProgress`, `WhyNovio`, `Specs` (the editorial "by the numbers" grid).
- `src/components/Services.jsx` — web **Forfaits** (1 500 $ + 250 $/mois). Exports `SectionHead`,
  `BenefitItem`.
- `src/components/AutoIA.jsx` — the **Automatisation IA** page ("Novio AI"): hero + animated chat demo,
  8 feature cards + animated stats, "vendredi soir" scenario, Pack Croissance, its own FAQ + `FinalCTA`.
  `AutomationPage` (in `pages.jsx`) renders it. **AI automations = 250 $/mois, no install fee.**
- `src/components/Portfolio.jsx` — exports `FoundersSlots` (founder slots gallery) and `CompareAgency`
  (Novio vs agency comparator, built on the reusable `CompareSlider`).
- `src/components/FAQ.jsx` — generic `FAQ({items,title})` + dataset `FAQ_WEB`.
- `src/components/icons.jsx` — `BENEFIT_ICONS` SVG set (add new icons here).

### Conventions
- CSS variables in `:root` (see inline critical CSS in `src/page.template.html` and `src/styles.css`):
  `--bg`, `--ink`, `--ink-2`, `--accent` (#ff5b2e), `--gutter`, etc. Reuse them — do not hardcode colors.
- Reuse existing classes: `.section`, `.section-head`/`.section-title`, `.plan-card`, `.specs`/`.spec`,
  `.cslider`, `.faq`, `.field` (form inputs), `.btn`/`.btn-accent`.
- Keep it dependency-light to preserve the 100/100 Lighthouse target. React + Framer Motion are
  self-hosted in `vendor/` (CSP is `script-src 'self'`).

### Contact form
`src/components/pages.jsx` → `ContactSection` posts to Formspree via the `FORMSPREE` constant
(live endpoint `https://formspree.io/f/mdaronva`). It's an AJAX form with idle/submitting/success/error
states and a honeypot anti-spam field. Email + phone are the other live channels.

**Deployment:** Vercel (`vercel.json` — `cleanUrls`, caching, and a strict CSP incl. `connect-src`
allowing `formspree.io`). `sitemap.xml` lists all four routes.
