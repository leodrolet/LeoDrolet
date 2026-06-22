#!/usr/bin/env node
// Build script: Babel compile JSX → dist/, bundle + minify JS, minify CSS,
// puis génère les pages HTML (multi-pages) depuis src/page.template.html.

const { execSync } = require("child_process");
const fs = require("fs");

// Version d'assets — bumper à chaque build pour casser le cache navigateur (Vercel).
const ASSET_V = "41";

// Ordre de chargement — les composants dépendent de effects (useReveal, etc.)
// pages dépend de TOUS les composants de section → chargé juste avant app.
// Format : [clé-dans-bundle, chemin-source-jsx]
const FILES = [
  ["effects",      "src/effects.jsx"],
  // Composants (src/components/) — Babel les compile dans dist/ directement
  ["icons",        "src/components/icons.jsx"],
  ["Nav",          "src/components/Nav.jsx"],
  ["Hero",         "src/components/Hero.jsx"],
  ["Marquee",      "src/components/Marquee.jsx"],
  ["Services",     "src/components/Services.jsx"],   // exporte aussi SectionHead, BenefitItem
  ["Portfolio",    "src/components/Portfolio.jsx"],  // exporte FoundersSlots, CompareAgency, ScoreCard
  ["Automation",   "src/components/Automation.jsx"], // dépend de CompareSlider + BenefitItem
  ["About",        "src/components/About.jsx"],
  ["FAQ",          "src/components/FAQ.jsx"],         // exporte FAQ, FAQ_WEB, FAQ_IA
  ["Footer",       "src/components/Footer.jsx"],      // exporte aussi FinalCTA
  ["cinema",       "src/cinema.jsx"],                 // ScrollProgress, Manifesto, Specs
  ["pages",        "src/components/pages.jsx"],        // en-têtes + composition des pages
  ["app",          "src/app.jsx"],                     // routeur (data-page)
];

const srcPaths = FILES.map(([, src]) => src).join(" ");

// 1. Compiler tout le JSX vers dist/
execSync(`npx babel ${srcPaths} --out-dir dist`, { stdio: "inherit" });

// 2. Construire le bundle (IIFEs pour éviter les conflits de const entre fichiers)
const bundle = FILES.map(([key]) => {
  const code = fs.readFileSync(`dist/${key}.js`, "utf8");
  return `/* === ${key} === */\n(function(){\n${code}\n})();`;
}).join("\n\n");
fs.writeFileSync("dist/bundle.js", bundle);

// 3. Minifier JS
execSync("npx terser dist/bundle.js --compress --mangle --output dist/bundle.min.js", { stdio: "inherit" });

// 4. Minifier CSS
execSync("npx cleancss -o dist/styles.min.css src/styles.css", { stdio: "inherit" });

// 5. Générer les pages HTML depuis le template
const TEMPLATE = fs.readFileSync("src/page.template.html", "utf8");
const PAGES = [
  {
    file: "index.html", page: "home", canonical: "https://novio.studio/",
    title: "Novio Studio — Sites web & automatisation IA pour entrepreneurs | Gatineau · Ottawa · Outaouais",
    desc: "Studio web à Gatineau pour couvreurs, plombiers, techniciens HVAC, paysagistes et rénovateurs. Des sites qui génèrent des appels et des automatisations IA qui ne laissent passer aucun lead. Dès 1 500 $.",
    ogTitle: "Novio Studio — Sites web & automatisation IA | Gatineau Ottawa",
    ogDesc: "Des sites qui font sonner le téléphone et des automatisations IA qui captent chaque lead. Studio web à Gatineau, dès 1 500 $.",
  },
  {
    file: "site-web.html", page: "site-web", canonical: "https://novio.studio/site-web",
    title: "Sites web sur mesure pour entrepreneurs — Novio Studio | Gatineau Ottawa",
    desc: "Un site rapide, sur mesure, livré en 2 à 3 semaines. Forfait dès 1 500 $ + hébergement 250 $/mois, sans engagement. Pour les PME de l'Outaouais qui veulent plus d'appels et de soumissions.",
    ogTitle: "Sites web qui font sonner le téléphone — Novio Studio",
    ogDesc: "Site sur mesure livré en 2–3 semaines, dès 1 500 $. Pensé pour les entrepreneurs de l'Outaouais.",
  },
  {
    file: "automatisation.html", page: "automatisation", canonical: "https://novio.studio/automatisation",
    title: "Automatisation IA pour entrepreneurs — Novio Studio | 250 $/mois",
    desc: "Réponse aux appels manqués, chatbot de qualification, relance des soumissions, avis Google automatiques. 250 $/mois par automatisation, sans frais d'installation. Aucun lead ne passe entre les craques.",
    ogTitle: "Automatisation IA pour contractors — Novio Studio",
    ogDesc: "Appels manqués, relances, avis Google : des automatisations à 250 $/mois sans installation qui captent chaque lead.",
  },
  {
    file: "contact.html", page: "contact", canonical: "https://novio.studio/contact",
    title: "Contact — Novio Studio | Gatineau · Ottawa · Outaouais",
    desc: "Parle directement avec Léo. Premier appel de 15 minutes, gratuit. Calendly, courriel ou téléphone — réponse en moins de 24 heures, sans jargon.",
    ogTitle: "Contact — Novio Studio",
    ogDesc: "Premier appel de 15 minutes, gratuit. On parle chiffres, pas jargon. Réponse en moins de 24 h.",
  },
];

const fill = (tpl, p) => tpl
  .split("{{TITLE}}").join(p.title)
  .split("{{DESC}}").join(p.desc)
  .split("{{OG_TITLE}}").join(p.ogTitle)
  .split("{{OG_DESC}}").join(p.ogDesc)
  .split("{{CANONICAL}}").join(p.canonical)
  .split("{{DATA_PAGE}}").join(p.page)
  .split("{{V}}").join(ASSET_V);

PAGES.forEach((p) => fs.writeFileSync(p.file, fill(TEMPLATE, p)));

const jsSize  = fs.statSync("dist/bundle.min.js").size;
const cssSize = fs.statSync("dist/styles.min.css").size;
console.log(`Build complete → bundle: ${(jsSize/1024).toFixed(1)}KB  CSS: ${(cssSize/1024).toFixed(1)}KB  · pages: ${PAGES.map(p => p.file).join(", ")}`);
