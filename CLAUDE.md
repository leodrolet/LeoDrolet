# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run build    # Compile JSX → dist/, bundle+minify JS/CSS, generate HTML pages
npm run watch    # Babel watch mode for the JSX sources
```

Always run `npm run build` after changes to confirm no JSX errors. There are no tests.
Serve locally with clean URLs: `npx serve . -l 5055` (cleanUrls on by default), then check the
browser console: **any hydration error (React #418/#423) means the prerendered HTML and the first
client render differ** — never read `window.location`, `localStorage` or the date during render;
do it in `useEffect`.

SEO tooling (see SEO_SETUP.md): `npm run seo:speed` (Lighthouse/PSI on every sitemap URL),
`seo:auth` / `seo:gsc` / `seo:ga` (read-only Google OAuth, secrets in `.secrets/`, never in Git),
`seo:report` (regenerates SEO_REPORT.md). Strategy docs: SEO_*.md, KEYWORD_STRATEGY.md, etc.

## Architecture

**Static multi-page site. No framework, no bundler-router, no TypeScript, no Tailwind, no animation library.**
JSX is compiled by Babel and concatenated into a single `dist/bundle.min.js`. Components are
plain functions that **self-register on `window`** and read their dependencies back off `window`.
Styling is one hand-written file, `src/styles.css` (CSS custom properties).

### Build pipeline (`build.js`)
1. `FILES` lists every JSX source **in load order** (a component can only use `window.X` if X's
   file appears earlier). Babel compiles each to `dist/<key>.js`.
2. Each compiled file is wrapped in an IIFE and concatenated → `dist/bundle.js` → `dist/bundle.min.js`.
3. `src/styles.css` → `dist/styles.min.css`.
4. **Prerender**: the bundle runs in a Node `vm` sandbox (stubbed `window.location`), and each page
   in `PAGES` is rendered with `react-dom/server` into `src/page.template.html` (CSS inlined,
   per-page title/description/canonical/hreflang/JSON-LD `@graph`). The client `hydrateRoot`s it.
5. `sitemap.xml` is generated from `PAGES`. Asset version = bundle hash (no manual bump).
6. `GA_MEASUREMENT_ID` env var (Vercel) adds `<meta name="ga-id">`; GA4 then loads **only after
   consent** (`Analytics.jsx`, Loi 25). Events: `generate_lead`, `click_phone`, `click_email`,
   `cta_quote_click`, `form_error` — never send personal data.

### Routing
- Each HTML file sets `<div id="root" data-page="..." data-lang="fr|en">`. `src/app.jsx` renders
  `Nav`, then `<main id="contenu">` with `HomePage | SiteWebPage | PricingPage | ContactPage`, or
  `StaticPage` for content pages, then `Footer` and `ConsentBanner`.
- **Static content pages** (`/en`, `/blogue`, `/blogue/<slug>`): their main content is an HTML
  fragment built from `content/` (`en.js`, `blog.js` + `blogue/<slug>.html`) and injected with
  `dangerouslySetInnerHTML`; on the client it is re-read from `[data-static-body]` before hydration,
  so the blog never bloats the JS bundle. New article = HTML fragment + entry in `content/blog.js`.
- `Nav`, `Footer`, `FinalCTA`, `ContactSection`/`ProjectForm` take `lang` ("fr" | "en").
- `vercel.json`: `cleanUrls`, `redirects` (`/automatisation` → `/tarifs`, 301) and security `headers`
  (strict CSP: `script-src 'self'` + googletagmanager for GA4, no inline scripts or inline event
  handlers anywhere; JSON-LD data blocks are fine). Asset URLs are absolute (`/dist`, `/vendor`, `/assets`).
  **Do not reintroduce `routes`**: with it, Vercel ignored `headers` (no CSP/HSTS were served).

### Key files
- `src/components/icons.jsx` — `BENEFIT_ICONS` (Lucide-style SVGs) + `ArrowIcon` for buttons.
- `src/components/Services.jsx` — shared `SectionHead({ id, title, lead })`.
- `src/components/Nav.jsx` — sticky header + mobile menu (menu is rendered *outside* `<header>`,
  because the header's `backdrop-filter` would trap `position: fixed`). Exports `Brand`.
- `src/components/Hero.jsx` — home hero + static desktop/phone mockup of a clearly-labelled
  demo site ("Rénovations Exemple"). Not a client project.
- `src/components/Pricing.jsx` — the **only offer**: `PLANS` (Croissance 129 $/mois, recommended;
  Premium 199 $/mois), `SETUP_FEE` (200 $, one-time), comparison table `Pricing`, and
  `SubscriptionModel` (3 points). CTAs → `/contact?forfait=<slug>#formulaire`.
- `src/components/Portfolio.jsx` — `Realisations` (honest: portfolio in construction, 4 founder
  slots) and `CompareAgency` (no unverified market figures).
- `src/components/FAQ.jsx` — native `<details>` accordion; `FAQ_ABO` (home, /tarifs), `FAQ_WEB`
  (/site-web). `SUBSCRIPTION_TERMS` holds contract answers (overage, cancellation, build time)
  still **to be confirmed by the owner** — never invent terms.
- `src/components/Footer.jsx` — `FinalCTA`, footer, accessible legal dialogs (privacy, mentions).
- `src/components/pages.jsx` — `PageHeader`, `Process`, `SiteFeatures`, `ContactSection` (Formspree
  form), `Testimonials` (renders **only** real entries; bracketed placeholders are skipped), and
  the page compositions.

### Design rules (owner's brief — keep them)
- Palette: orange `#FF6A00`, black `#0B0B0D`, anthracite `#19191D`, off-white `#F5F5F5`, grey `#A1A1AA`
  (tokens in `:root` of `styles.css`). One font: Geist (400/500/600), **self-hosted** in
  `vendor/fonts/` (no Google Fonts). Copy uses **vous**. French typography: non-breaking space
  before `: ; ? !` (automatic for `content/` fragments, use `\u00a0` in JSX).
- **No scroll-triggered animation, parallax, marquee, glow, decorative badges or emoji.**
  Motion only on interactions (hover/focus/open), and `prefers-reduced-motion` is respected.
- **Never invent data**: no fake testimonials, clients, logos, stats, counters or results.
- Reuse: `.container`, `.section`, `.shead`, `.btn--primary/--secondary/--sm/--lg/--block`, `.link`,
  `.input`, `.field`.

### Contact form
`ContactSection` / `ProjectForm` post to Formspree (`FORMSPREE` = `https://formspree.io/f/mdaronva`):
AJAX with idle/submitting/success/error states, honeypot `_gotcha`, plan radio (`interet`), and
`_subject` including the chosen plan. Email + phone are the other channels.
