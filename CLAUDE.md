# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run build    # Compile JSX → dist/, bundle+minify JS/CSS, generate HTML pages
npm run watch    # Babel watch mode for the JSX sources
```

Always run `npm run build` after changes to confirm no JSX errors. There are no tests.
Quick checks: `node --check dist/bundle.min.js`, and serve locally with `python3 -m http.server`
(note: locally `/contact` 404s — use `contact.html`; Vercel's `cleanUrls` handles it in prod).

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
4. `PAGES` + `src/page.template.html` produce `index.html`, `site-web.html`, `tarifs.html`,
   `contact.html` (per-page title/description/OG). Bump `ASSET_V` when JS/CSS change.

### Routing
- Each HTML file sets `<div id="root" data-page="...">`. `src/app.jsx` renders `Nav`, then
  `<main id="contenu">` with `HomePage | SiteWebPage | PricingPage | ContactPage`, then `Footer`.
- `vercel.json`: `cleanUrls`, `redirects` (`/automatisation` → `/tarifs`, 301) and security `headers`
  (strict CSP: `script-src 'self'`, no inline scripts or inline event handlers anywhere).
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
  (tokens in `:root` of `styles.css`). One font: Geist (400/500/600). Copy uses **vous**.
- **No scroll-triggered animation, parallax, marquee, glow, decorative badges or emoji.**
  Motion only on interactions (hover/focus/open), and `prefers-reduced-motion` is respected.
- **Never invent data**: no fake testimonials, clients, logos, stats, counters or results.
- Reuse: `.container`, `.section`, `.shead`, `.btn--primary/--secondary/--sm/--lg/--block`, `.link`,
  `.input`, `.field`.

### Contact form
`ContactSection` / `ProjectForm` post to Formspree (`FORMSPREE` = `https://formspree.io/f/mdaronva`):
AJAX with idle/submitting/success/error states, honeypot `_gotcha`, plan radio (`interet`), and
`_subject` including the chosen plan. Email + phone are the other channels.
