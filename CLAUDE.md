# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build → dist/
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

Always run `npm run build` after making changes to confirm no TypeScript/JSX errors before considering a task done. There are no tests.

## Architecture

Single-page React app (Vite + TypeScript + Tailwind). No backend, no router, no state management library. The entire site is one scrollable page rendered in `App.tsx`.

**Section order in `App.tsx`:**
Hero → WhyLandingPage → BeforeAfter → About → Services → Process → Pricing → ContactForm → FinalCTA → Footer

**Key conventions:**

- `glass` utility class = `bg-white/5 backdrop-blur-xl border border-white/5` (defined in `index.css`)
- `text-gradient` = orange-to-red gradient text (defined in `index.css`)
- Theme tokens in `tailwind.config.cjs`: `primary` (#0a0a0a), `secondary` (#171717), `accent` (#f97316 — orange)
- All navigation links are `href="#section-id"` anchors; smooth scrolling is handled globally in `App.tsx` via `smoothScrollTo()` from `src/components/utils.ts`

**Parallax (Hero.tsx):** Multi-layer mouse parallax implemented in vanilla JS inside `useEffect`. Background blobs follow cursor (positive factor), text layers move opposite (negative factor). Disabled on touch devices via `window.matchMedia('(hover: none)')`.

**Animated counter (Hero.tsx):** `IntersectionObserver` on the stats grid triggers a `requestAnimationFrame` count-up for the `+150%` stat. Fires once, then disconnects.

**Form (ContactForm.tsx):** Controlled inputs, validation runs only on submit (not on blur). Submits JSON to Formspree (`https://formspree.io/f/xykvgwnz`). The left sidebar panel updates live as the user types (name, company, project type → dynamic price lookup via `priceMap`).

**Pricing (Pricing.tsx):** Plans defined in a `plans` array at the top of the file. Prices also appear in `ContactForm.tsx` in the `priceMap` object — update both when changing prices.

**Deployment:** Vercel. Config in `vercel.json` (includes security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`).
