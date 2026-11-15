#!/usr/bin/env node
// Build : Babel (JSX → dist/), bundle + minification JS/CSS, puis génération
// des pages HTML PRÉ-RENDUES (react-dom/server) depuis src/page.template.html,
// avec données structurées JSON-LD par page et sitemap.xml.
//
// Variables d'environnement facultatives :
//   GA_MEASUREMENT_ID=G-XXXXXXX   active GA4 (chargé seulement après consentement)

process.env.NODE_ENV = "production";
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const SITE = "https://noviostudio.online";
const TODAY = new Date().toISOString().slice(0, 10);

// Ordre de chargement — un composant ne peut lire window.X que si X est chargé avant.
const FILES = [
  ["icons",        "src/components/icons.jsx"],       // BENEFIT_ICONS, ArrowIcon
  ["Analytics",    "src/components/Analytics.jsx"],   // track, ConsentBanner, installTracking
  ["Services",     "src/components/Services.jsx"],    // SectionHead
  ["Nav",          "src/components/Nav.jsx"],         // Nav, Brand
  ["Hero",         "src/components/Hero.jsx"],        // Hero + maquette
  ["Pricing",      "src/components/Pricing.jsx"],     // Pricing, SubscriptionModel, PLANS
  ["Portfolio",    "src/components/Portfolio.jsx"],   // Realisations, CompareAgency
  ["About",        "src/components/About.jsx"],
  ["FAQ",          "src/components/FAQ.jsx"],         // FAQ, FAQ_WEB, FAQ_ABO
  ["Footer",       "src/components/Footer.jsx"],      // FinalCTA, Footer
  ["pages",        "src/components/pages.jsx"],       // pages + StaticPage
  ["app",          "src/app.jsx"],                    // App (+ hydratation côté client)
];

// 1. Compiler le JSX
execSync(`npx babel ${FILES.map(([, s]) => s).join(" ")} --out-dir dist`, { stdio: "inherit" });

// 2. Bundle (IIFE par fichier)
const bundle = FILES.map(([key]) => {
  const code = fs.readFileSync(`dist/${key}.js`, "utf8");
  return `/* === ${key} === */\n(function(){\n${code}\n})();`;
}).join("\n\n");
fs.writeFileSync("dist/bundle.js", bundle);

// 3-4. Minification
execSync("npx terser dist/bundle.js --compress --mangle --output dist/bundle.min.js", { stdio: "inherit" });
execSync("npx cleancss -o dist/styles.min.css src/styles.css", { stdio: "inherit" });

// Version d'assets = empreinte du bundle (plus besoin de la bumper à la main)
const V = crypto.createHash("md5").update(fs.readFileSync("dist/bundle.min.js")).digest("hex").slice(0, 8);
const CSS = fs.readFileSync("dist/styles.min.css", "utf8");

// ── Pré-rendu : exécute le bundle dans un bac à sable Node, puis renderToString ──
const runBundle = (pathname) => {
  const sandbox = {
    React,
    ReactDOM: { createRoot() { return { render() {} }; }, hydrateRoot() {} },
    console, URLSearchParams, setTimeout, clearTimeout, Event: class {},
    location: { pathname, search: "", hash: "", hostname: "noviostudio.online" },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(bundle, sandbox, { filename: "bundle.js" });
  return sandbox;
};
// Typographie française : espace insécable avant « : ; ? ! » et après « « » (texte seulement, pas les balises)
const frTypo = (html) => html.replace(/>([^<]+)</g, (m, t) => ">" + t.replace(/ ([:;?!»])/g, "\u00a0$1").replace(/« /g, "«\u00a0") + "<");

const prerender = (p) => {
  const win = runBundle(p.path);
  return ReactDOMServer.renderToString(React.createElement(win.App, {
    page: p.page, lang: p.lang, staticHtml: p.staticHtml ? (p.lang === "fr" ? frTypo(p.staticHtml) : p.staticHtml) : null, staticAfter: p.after || "cta",
  }));
};
const WIN = runBundle("/"); // données partagées (FAQ) pour le JSON-LD

// ── Contenu statique (content/) ──
const EN = require("./content/en.js");
// Brouillons (draft: true) exclus : ni page, ni sitemap, ni liste du blogue. PREVIEW_DRAFTS=1 pour les inclure en local.
const ARTICLES = require("./content/blog.js").filter((a) => !a.draft || process.env.PREVIEW_DRAFTS === "1");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const frDate = (iso) => new Intl.DateTimeFormat("fr-CA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T12:00:00Z"));
const readMinutes = (html) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

const crumbsHtml = (items) => `<nav class="crumbs" aria-label="Fil d'Ariane"><ol>${items.map(([href, label], i) =>
  i === items.length - 1 ? `<li><span aria-current="page">${esc(label)}</span></li>` : `<li><a href="${href}">${esc(label)}</a></li>`).join("")}</ol></nav>`;

const blogIndexHtml = () => `
<header class="page-head">
  <div class="container">
    ${crumbsHtml([["/", "Accueil"], ["/blogue", "Blogue"]])}
    <h1 class="page-head__title">Conseils Web pour les entreprises d'ici.</h1>
    <p class="page-head__sub">Des réponses claires aux questions que se posent les entrepreneurs de Gatineau, d'Ottawa et de l'Outaouais : prix d'un site, visibilité sur Google, présence en ligne.</p>
  </div>
</header>
<div class="container">
  <ul class="posts">
    ${ARTICLES.map((a) => `<li><a class="post-card" href="/blogue/${a.slug}">
      <h2 class="post-card__t">${esc(a.title)}</h2>
      <p class="post-card__d">${esc(a.dek)}</p>
      <span class="post-card__m"><time datetime="${a.date}">${frDate(a.date)}</time> · ${a.minutes} min de lecture</span>
    </a></li>`).join("\n    ")}
  </ul>
</div>`;

const articleHtml = (a) => {
  const rel = (a.related || []).map((s) => ARTICLES.find((x) => x.slug === s)).filter(Boolean);
  return `
<article>
  <header class="page-head">
    <div class="container--narrow">
      ${crumbsHtml([["/", "Accueil"], ["/blogue", "Blogue"], [`/blogue/${a.slug}`, a.title]])}
      <h1 class="page-head__title">${esc(a.title)}</h1>
      <p class="page-head__sub">${esc(a.dek)}</p>
      <p class="article__meta">Par <a class="link" href="/#studio">Léo Drolet</a>, Novio Studio · <time datetime="${a.date}">${frDate(a.date)}</time>${a.updated !== a.date ? ` · mis à jour le <time datetime="${a.updated}">${frDate(a.updated)}</time>` : ""} · ${a.minutes} min de lecture</p>
    </div>
  </header>
  <div class="container--narrow prose">
${a.body}
  </div>
</article>
${rel.length ? `<aside class="related" aria-labelledby="related-title"><div class="container--narrow">
  <h2 class="related__h" id="related-title">À lire aussi</h2>
  <ul class="posts">${rel.map((r) => `<li><a class="post-card" href="/blogue/${r.slug}"><h3 class="post-card__t">${esc(r.title)}</h3><p class="post-card__d">${esc(r.dek)}</p></a></li>`).join("")}</ul>
</div></aside>` : ""}`;
};

ARTICLES.forEach((a) => {
  a.body = fs.readFileSync(`content/blogue/${a.slug}.html`, "utf8").trim();
  a.minutes = readMinutes(a.body);
});

// ── Réalisations (content/realisations.js) ──
// Pages générées UNIQUEMENT s'il existe au moins un projet réel publié.
const PROJECTS = require("./content/realisations.js").filter((r) => r.published === true);
PROJECTS.forEach((r) => {
  const missing = ["slug", "date", "problem", "solution"].filter((k) => !r[k])
    .concat(!r.client || !r.client.name ? ["client.name"] : []);
  if (missing.length) throw new Error(`Réalisation « ${r.slug || "?"} » incomplète : ${missing.join(", ")}`);
  if (!r.consent) throw new Error(`Réalisation « ${r.slug} » : accord écrit du client (consent) manquant`);
  (r.results || []).forEach((x) => {
    if (!x.source || !x.period) throw new Error(`Réalisation « ${r.slug} » : résultat sans source ni période (${x.label})`);
  });
});
const projectTitle = (r) => `${r.client.name}, ${r.client.trade.toLowerCase()} à ${r.client.city}`;

const realisationsIndexHtml = () => `
<header class="page-head">
  <div class="container">
    ${crumbsHtml([["/", "Accueil"], ["/realisations", "Réalisations"]])}
    <h1 class="page-head__title">Réalisations : des sites Web pour des entreprises d'ici.</h1>
    <p class="page-head__sub">Des projets réels, présentés avec l'accord de chaque client : la situation de départ, le site conçu et ce qui a changé.</p>
  </div>
</header>
<div class="container">
  <ul class="posts">
    ${PROJECTS.map((r) => `<li><a class="post-card" href="/realisations/${r.slug}">
      <h2 class="post-card__t">${esc(projectTitle(r))}</h2>
      <p class="post-card__d">${esc(r.client.description || r.solution)}</p>
      <span class="post-card__m">Forfait ${esc(r.plan || "")} · mis en ligne le <time datetime="${r.date}">${frDate(r.date)}</time></span>
    </a></li>`).join("\n    ")}
  </ul>
</div>`;

const realisationHtml = (r) => `
<article>
  <header class="page-head">
    <div class="container--narrow">
      ${crumbsHtml([["/", "Accueil"], ["/realisations", "Réalisations"], [`/realisations/${r.slug}`, r.client.name]])}
      <h1 class="page-head__title">${esc(projectTitle(r))}</h1>
      <p class="page-head__sub">${esc(r.client.description || "")}</p>
      <p class="article__meta">Forfait ${esc(r.plan || "")} · mis en ligne le <time datetime="${r.date}">${frDate(r.date)}</time>${r.client.url ? ` · <a class="link" href="${esc(r.client.url)}" rel="noopener">Voir le site</a>` : ""}</p>
    </div>
  </header>
  <div class="container--narrow prose">
    <h2>Le point de départ</h2>
    <p>${esc(r.problem)}</p>
    <h2>Ce qui a été conçu</h2>
    <p>${esc(r.solution)}</p>
    ${(r.features || []).length ? `<h3>Fonctionnalités</h3>\n    <ul>${r.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    ${(r.screenshots || []).map((i) => `<figure><img src="${esc(i.src)}" width="${i.width}" height="${i.height}" alt="${esc(i.alt)}" loading="lazy" decoding="async" /></figure>`).join("\n    ")}
    ${(r.results || []).length ? `<h2>Résultats mesurés</h2>
    <table><thead><tr><th scope="col">Indicateur</th><th scope="col">Valeur</th><th scope="col">Période</th><th scope="col">Source</th></tr></thead><tbody>${r.results.map((x) => `<tr><td>${esc(x.label)}</td><td>${esc(x.value)}</td><td>${esc(x.period)}</td><td>${esc(x.source)}</td></tr>`).join("")}</tbody></table>` : ""}
    ${r.testimonial && r.testimonial.quote ? `<blockquote class="callout"><p>« ${esc(r.testimonial.quote)} »</p><p>${esc(r.testimonial.name)}, ${esc(r.testimonial.role)}</p></blockquote>` : ""}
    <p>Vous avez un projet semblable ? Consultez nos <a href="/tarifs">tarifs</a> ou <a href="/contact">demandez une soumission</a>.</p>
  </div>
</article>`;

// ── Pages ──
const FR_EN = { fr: "/", en: "/en" }; // seule paire traduite (hreflang)
const PAGES = [
  {
    file: "index.html", path: "/", page: "home", lang: "fr", type: "WebPage", alternates: FR_EN,
    title: "Création de site Web à Gatineau, par abonnement | Novio Studio",
    desc: "Création de sites Web professionnels pour les PME de Gatineau, d'Ottawa et de l'Outaouais : conception, hébergement et maintenance inclus, dès 129 $/mois.",
    ogTitle: "Création de site Web à Gatineau, par abonnement | Novio Studio",
    ogDesc: "Novio Studio conçoit, héberge et entretient le site de votre entreprise. Gatineau, Ottawa et Outaouais, dès 129 $/mois.",
    priority: "1.0", changefreq: "monthly", lastmod: "2026-11-15",
  },
  {
    file: "site-web.html", path: "/site-web", page: "site-web", lang: "fr", type: "WebPage",
    crumbs: [["/", "Accueil"], ["/site-web", "Sites Web"]], faq: "FAQ_WEB",
    title: "Conception de sites Web pour PME et entrepreneurs | Novio Studio",
    desc: "Sites Web d'entreprise clairs, rapides, adaptés au mobile et optimisés pour Google, conçus, hébergés et entretenus pour les PME de l'Outaouais. Dès 129 $/mois.",
    ogTitle: "Des sites Web d'entreprise conçus pour attirer des clients | Novio Studio",
    ogDesc: "Un site professionnel tout inclus, dès 129 $/mois. Pensé pour les entrepreneurs de Gatineau, d'Ottawa et de l'Outaouais.",
    priority: "0.9", changefreq: "monthly", lastmod: "2026-11-15",
  },
  {
    file: "tarifs.html", path: "/tarifs", page: "tarifs", lang: "fr", type: "WebPage",
    crumbs: [["/", "Accueil"], ["/tarifs", "Tarifs"]], faq: "FAQ_ABO",
    title: "Prix d'un site Web : forfaits dès 129 $/mois | Novio Studio Gatineau",
    desc: "Prix transparents : Croissance 129 $/mois, Premium 199 $/mois, 200 $ de frais de départ. Création, hébergement, sécurité, maintenance, SEO et modifications inclus.",
    ogTitle: "Tarifs : sites Web dès 129 $/mois | Novio Studio",
    ogDesc: "Croissance 129 $/mois · Premium 199 $/mois. Un site professionnel hébergé, entretenu et optimisé, sans investissement initial important.",
    priority: "0.9", changefreq: "monthly", lastmod: "2026-11-15",
  },
  {
    file: "contact.html", path: "/contact", page: "contact", lang: "fr", type: "ContactPage",
    crumbs: [["/", "Accueil"], ["/contact", "Contact"]],
    title: "Demander une soumission pour un site Web | Novio Studio Gatineau",
    desc: "Soumission gratuite pour le site Web de votre entreprise à Gatineau, Ottawa ou en Outaouais : formulaire, courriel ou téléphone. Réponse en moins de 24 h.",
    ogTitle: "Demander une soumission | Novio Studio",
    ogDesc: "Premier appel de 15 minutes, gratuit et sans engagement. Réponse en moins de 24 h.",
    priority: "0.8", changefreq: "yearly", lastmod: "2026-11-15",
  },
  {
    file: "en.html", path: "/en", page: "static", lang: "en", type: "WebPage", alternates: FR_EN,
    staticHtml: EN.html, after: "contact", faqData: EN.faq,
    title: "Small Business Website Design, Ottawa & Gatineau | Novio Studio",
    desc: "Professional websites for small businesses in Ottawa and Gatineau, designed, hosted and maintained for a fixed monthly price from $129/month. Edits included.",
    ogTitle: "Small Business Website Design in Ottawa & Gatineau | Novio Studio",
    ogDesc: "Your business website designed, hosted and maintained for a fixed monthly price, from $129/month.",
    priority: "0.9", changefreq: "monthly", lastmod: "2026-11-15",
  },
  {
    file: "blogue.html", path: "/blogue", page: "static", lang: "fr", type: "CollectionPage",
    staticHtml: blogIndexHtml(), crumbs: [["/", "Accueil"], ["/blogue", "Blogue"]],
    title: "Blogue : conseils Web pour PME de Gatineau et d'Ottawa | Novio Studio",
    desc: "Conseils pratiques pour les entrepreneurs : prix d'un site Web, visibilité sur Google, référencement local, site Web ou réseaux sociaux. Par Novio Studio, Gatineau.",
    ogTitle: "Blogue Novio Studio : conseils Web pour les entreprises d'ici",
    ogDesc: "Prix d'un site Web, visibilité sur Google, référencement local : des réponses claires pour les entrepreneurs.",
    priority: "0.6", changefreq: "weekly", lastmod: ARTICLES.map((a) => a.updated).sort().pop(),
  },
  ...ARTICLES.map((a) => ({
    file: `blogue/${a.slug}.html`, path: `/blogue/${a.slug}`, page: "static", lang: "fr", type: "WebPage",
    ogType: "article", article: a, staticHtml: articleHtml(a),
    crumbs: [["/", "Accueil"], ["/blogue", "Blogue"], [`/blogue/${a.slug}`, a.title]],
    title: a.metaTitle, desc: a.desc, ogTitle: a.title, ogDesc: a.desc,
    priority: "0.6", changefreq: "yearly", lastmod: a.updated,
  })),
  ...(PROJECTS.length ? [
    {
      file: "realisations.html", path: "/realisations", page: "static", lang: "fr", type: "CollectionPage",
      staticHtml: realisationsIndexHtml(), crumbs: [["/", "Accueil"], ["/realisations", "Réalisations"]],
      title: "Réalisations : sites Web d'entreprises de l'Outaouais | Novio Studio",
      desc: "Projets réels de Novio Studio : sites Web conçus pour des entrepreneurs de Gatineau, d'Ottawa et de l'Outaouais, présentés avec l'accord de chaque client.",
      ogTitle: "Réalisations | Novio Studio", ogDesc: "Des sites Web conçus pour des entreprises d'ici, présentés avec l'accord de chaque client.",
      priority: "0.8", changefreq: "monthly", lastmod: PROJECTS.map((r) => r.date).sort().pop(),
    },
    ...PROJECTS.map((r) => ({
      file: `realisations/${r.slug}.html`, path: `/realisations/${r.slug}`, page: "static", lang: "fr", type: "WebPage",
      staticHtml: realisationHtml(r),
      crumbs: [["/", "Accueil"], ["/realisations", "Réalisations"], [`/realisations/${r.slug}`, r.client.name]],
      title: `Site Web de ${r.client.name} (${r.client.trade}, ${r.client.city}) | Novio Studio`.slice(0, 90),
      desc: `${r.client.trade} à ${r.client.city} : ${r.solution}`.slice(0, 160),
      ogTitle: projectTitle(r), ogDesc: (r.client.description || r.solution).slice(0, 160),
      priority: "0.7", changefreq: "yearly", lastmod: r.date,
    })),
  ] : []),
];

// ── Données structurées (schema.org, @graph par page) ──
const ID = { biz: `${SITE}/#business`, site: `${SITE}/#website`, leo: `${SITE}/#leo` };
const offer = (name, price, desc, itemName) => ({
  "@type": "Offer", name, description: desc, url: `${SITE}/tarifs`, priceCurrency: "CAD", price,
  priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "CAD", unitCode: "MON", billingDuration: "P1M" },
  itemOffered: { "@type": "Service", name: itemName, serviceType: "Création de site Web" },
});
const BUSINESS = {
  "@type": "ProfessionalService", "@id": ID.biz, name: "Novio Studio", url: `${SITE}/`,
  description: "Studio de création de sites Web à Gatineau. Sites professionnels par abonnement mensuel pour les PME et entrepreneurs de Gatineau, d'Ottawa et de l'Outaouais : conception, hébergement, maintenance et optimisation inclus.",
  image: `${SITE}/og-image.jpg`, logo: `${SITE}/apple-touch-icon.png`,
  telephone: "+18736554684", email: "leo_drolet@noviostudio.online",
  address: { "@type": "PostalAddress", addressLocality: "Gatineau", addressRegion: "QC", addressCountry: "CA" },
  areaServed: [
    { "@type": "City", name: "Gatineau" }, { "@type": "City", name: "Ottawa" },
    { "@type": "AdministrativeArea", name: "Outaouais" },
  ],
  founder: { "@id": ID.leo }, priceRange: "$$", openingHours: "Mo-Fr 09:00-18:00",
  knowsLanguage: ["fr-CA", "en-CA"],
  makesOffer: [
    offer("Forfait Croissance", "129", "Site Web de 5 à 10 pages, hébergement, gestion du nom de domaine, sécurité et sauvegardes, maintenance, 1 h de modifications par mois, SEO de base, formulaire de contact, statistiques et support technique. Frais de départ uniques de 200 $.", "Site Web professionnel par abonnement, Croissance"),
    offer("Forfait Premium", "199", "Site Web entièrement personnalisé, tout le forfait Croissance, jusqu'à 2 h de modifications par mois, SEO avancé, intégrations externes, automatisations personnalisées et support prioritaire. Frais de départ uniques de 200 $.", "Site Web professionnel par abonnement, Premium"),
  ],
};
const PERSON = {
  "@type": "Person", "@id": ID.leo, name: "Léo Drolet", jobTitle: "Fondateur et concepteur Web",
  worksFor: { "@id": ID.biz }, image: `${SITE}/assets/leo.jpg`, url: `${SITE}/#studio`,
};
const WEBSITE = {
  "@type": "WebSite", "@id": ID.site, url: `${SITE}/`, name: "Novio Studio",
  inLanguage: ["fr-CA", "en-CA"], publisher: { "@id": ID.biz },
};
const LOCALE = { fr: "fr-CA", en: "en-CA" };
const url = (p) => SITE + (p.path === "/" ? "/" : p.path);

const jsonLd = (p) => {
  const u = url(p);
  const graph = [];
  if (p.path === "/" || p.path === "/en") graph.push(BUSINESS, PERSON, WEBSITE);
  const webpage = {
    "@type": p.type, "@id": `${u}#webpage`, url: u, name: p.title, description: p.desc,
    inLanguage: LOCALE[p.lang], isPartOf: { "@id": ID.site }, about: { "@id": ID.biz },
  };
  if (p.crumbs) {
    webpage.breadcrumb = { "@id": `${u}#breadcrumb` };
    graph.push({
      "@type": "BreadcrumbList", "@id": `${u}#breadcrumb`,
      itemListElement: p.crumbs.map(([h, n], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: SITE + (h === "/" ? "/" : h) })),
    });
  }
  graph.push(webpage);
  const faq = p.faqData || (p.faq && WIN[p.faq]);
  if (faq) {
    graph.push({
      "@type": "FAQPage", "@id": `${u}#faq`, inLanguage: LOCALE[p.lang], isPartOf: { "@id": `${u}#webpage` },
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  if (p.article) {
    const a = p.article;
    graph.push({
      "@type": "BlogPosting", "@id": `${u}#article`, headline: a.title, description: a.desc,
      datePublished: a.date, dateModified: a.updated, inLanguage: "fr-CA",
      author: { "@type": "Person", "@id": ID.leo, name: "Léo Drolet", url: `${SITE}/#studio` },
      publisher: { "@id": ID.biz }, image: `${SITE}/og-image.jpg`,
      mainEntityOfPage: { "@id": `${u}#webpage` }, isPartOf: { "@id": `${SITE}/blogue#webpage` },
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
};

// ── Génération ──
const GA_ID = (process.env.GA_MEASUREMENT_ID || "").trim();
if (GA_ID && !/^G-[A-Z0-9]{4,}$/.test(GA_ID)) throw new Error(`GA_MEASUREMENT_ID invalide : ${GA_ID}`);
const TEMPLATE = fs.readFileSync("src/page.template.html", "utf8");

const render = (p) => {
  const alternates = p.alternates
    ? Object.entries(p.alternates).map(([l, h]) => `<link rel="alternate" hreflang="${LOCALE[l]}" href="${SITE}${h}" />`).join("\n")
      + `\n<link rel="alternate" hreflang="x-default" href="${SITE}/" />`
    : "";
  const vars = {
    HTML_LANG: LOCALE[p.lang], TITLE: esc(p.title), DESC: esc(p.desc), ROBOTS: "index, follow, max-image-preview:large",
    GA_META: GA_ID ? `<meta name="ga-id" content="${GA_ID}" />` : "",
    CANONICAL: url(p), ALTERNATES: alternates, OG_TYPE: p.ogType || "website",
    OG_TITLE: esc(p.ogTitle), OG_DESC: esc(p.ogDesc), OG_LOCALE: LOCALE[p.lang].replace("-", "_"),
    OG_IMAGE_ALT: p.lang === "en" ? "Novio Studio, small business websites in Ottawa and Gatineau" : "Novio Studio, création de sites Web par abonnement à Gatineau",
    JSONLD: jsonLd(p), CSS,
    SKIP: p.lang === "en" ? "Skip to content" : "Aller au contenu",
    ROOT_ATTRS: `data-page="${p.page}" data-lang="${p.lang}"${p.after ? ` data-after="${p.after}"` : ""}`,
    APP_HTML: prerender(p), V,
  };
  return TEMPLATE.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
};

PAGES.forEach((p) => {
  fs.mkdirSync(path.dirname(p.file), { recursive: true });
  fs.writeFileSync(p.file, render(p));
});

// ── sitemap.xml ──
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.map((p) => `  <url>
    <loc>${url(p)}</loc>
    <lastmod>${p.lastmod || TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${p.alternates ? "\n" + Object.entries(p.alternates).map(([l, h]) => `    <xhtml:link rel="alternate" hreflang="${LOCALE[l]}" href="${SITE}${h}" />`).join("\n") + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />` : ""}
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync("sitemap.xml", sitemap);

const jsSize = fs.statSync("dist/bundle.min.js").size;
console.log(`Build complete → bundle: ${(jsSize / 1024).toFixed(1)}KB  CSS (inline): ${(CSS.length / 1024).toFixed(1)}KB  v=${V}${GA_ID ? "  GA4: " + GA_ID : "  GA4: off"}`);
console.log(`Pages (${PAGES.length}): ${PAGES.map((p) => p.path).join("  ")}`);
