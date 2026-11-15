#!/usr/bin/env node
/* ============================================================
   scripts/seo/check-pages.mjs — Contrôle SEO technique des pages générées.
   Sans dépendance. À lancer après `npm run build` :
     npm run seo:check

   Vérifie, pour chaque URL du sitemap.xml :
     · le fichier HTML existe ; <html lang> ; un seul <h1>
     · <title> (≤ 70 car.) et meta description (120 à 165 car.)
     · canonical absolu = URL du sitemap ; robots indexable
     · hreflang réciproques (fr-CA ↔ en-CA + x-default)
     · JSON-LD valide (JSON.parse) et types présents
     · liens internes (href="/…") qui pointent vers une page existante
   Vérifie aussi robots.txt (référence au sitemap) et vercel.json.
   Code de sortie 1 si une erreur bloquante est trouvée.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://noviostudio.online";
const ROOT = process.cwd();
const errors = [];
const warnings = [];
const err = (p, m) => errors.push(`${p} : ${m}`);
const warn = (p, m) => warnings.push(`${p} : ${m}`);

const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : null; };

// Chemin d'URL → fichier (cleanUrls de Vercel)
const fileFor = (p) => {
  const clean = p.split(/[?#]/)[0].replace(/\/$/, "");
  if (clean === "") return "index.html";
  const rel = clean.slice(1);
  for (const c of [`${rel}.html`, path.join(rel, "index.html"), rel]) {
    if (fs.existsSync(path.join(ROOT, c)) && fs.statSync(path.join(ROOT, c)).isFile()) return c;
  }
  return null;
};

// ── sitemap ──
const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) err("sitemap.xml", "aucune URL");

// ── redirections déclarées (pour ne pas signaler un lien redirigé comme cassé) ──
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
const redirected = new Set((vercel.redirects || []).map((r) => r.source));
if (vercel.routes) err("vercel.json", "« routes » présent : Vercel ignorerait « headers » (voir CLAUDE.md)");
if (vercel.cleanUrls !== true) warn("vercel.json", "cleanUrls n'est pas activé");

// ── robots.txt ──
const robots = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) err("robots.txt", "ligne Sitemap absente ou incorrecte");
if (/Disallow:\s*\/\s*$/m.test(robots)) err("robots.txt", "« Disallow: / » bloque tout le site");

const hreflangs = {};
const rows = [];

for (const u of urls) {
  if (!u.startsWith(SITE)) { err(u, "URL hors domaine canonique"); continue; }
  const p = u.slice(SITE.length) || "/";
  const f = fileFor(p);
  if (!f) { err(p, "aucun fichier HTML généré"); continue; }
  const html = fs.readFileSync(path.join(ROOT, f), "utf8");

  const lang = attr(html, /<html lang="([^"]+)"/);
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const robotsMeta = attr(html, /<meta name="robots" content="([^"]+)"/);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;

  if (!lang) err(p, "<html lang> absent");
  if (!title) err(p, "<title> absent"); else if (title.length > 70) warn(p, `title de ${title.length} caractères (> 70, risque de troncature)`);
  if (!desc) err(p, "meta description absente"); else if (desc.length < 120 || desc.length > 165) warn(p, `description de ${desc.length} caractères (cible 120 à 165)`);
  if (canonical !== u) err(p, `canonical « ${canonical} » ≠ URL du sitemap « ${u} »`);
  if (robotsMeta && /noindex/.test(robotsMeta)) err(p, "page du sitemap marquée noindex");
  if (h1 !== 1) err(p, `${h1} balise(s) <h1> (1 attendue)`);

  // hreflang
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  if (alts.length) {
    hreflangs[u] = Object.fromEntries(alts);
    if (!alts.some(([, h]) => h === u)) err(p, "hreflang sans auto-référence");
    if (!alts.some(([l]) => l === "x-default")) warn(p, "hreflang sans x-default");
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  if (!blocks.length) err(p, "aucun JSON-LD");
  for (const b of blocks) {
    try {
      const j = JSON.parse(b);
      (j["@graph"] || [j]).forEach((n) => types.push(n["@type"]));
      (j["@graph"] || []).forEach((n) => { if (n.url && !String(n.url).startsWith(SITE)) err(p, `JSON-LD : url hors domaine (${n.url})`); });
    } catch (e) { err(p, `JSON-LD invalide : ${e.message}`); }
  }

  // Liens internes
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => decode(m[1]));
  for (const h of new Set(hrefs)) {
    if (/^\/(dist|vendor|assets)\//.test(h) || /\.(ico|png|jpg|woff2|css|js|xml)(\?|$)/.test(h)) {
      const asset = h.split("?")[0].slice(1);
      if (!fs.existsSync(path.join(ROOT, asset))) err(p, `ressource introuvable : ${h}`);
      continue;
    }
    const base = h.split(/[?#]/)[0] || "/";
    if (redirected.has(base)) { warn(p, `lien vers une URL redirigée : ${h}`); continue; }
    if (!fileFor(base)) err(p, `lien interne cassé : ${h}`);
  }

  rows.push({ p, lang, title: title ? title.length : 0, desc: desc ? desc.length : 0, h1, types: types.join(", ") });
}

// Réciprocité hreflang
for (const [u, map] of Object.entries(hreflangs)) {
  for (const [l, target] of Object.entries(map)) {
    if (l === "x-default" || target === u) continue;
    const back = hreflangs[target];
    if (!back || !Object.values(back).includes(u)) err(u, `hreflang ${l} → ${target} sans lien de retour`);
  }
}

// ── Sortie ──
console.log(`\nContrôle SEO : ${urls.length} URL du sitemap\n`);
console.log("| Page | lang | title | desc | h1 | JSON-LD |");
console.log("|---|---|---|---|---|---|");
rows.forEach((r) => console.log(`| ${r.p} | ${r.lang} | ${r.title} | ${r.desc} | ${r.h1} | ${r.types} |`));
console.log("");
warnings.forEach((w) => console.log(`AVERTISSEMENT  ${w}`));
errors.forEach((e) => console.log(`ERREUR         ${e}`));
console.log(`\n${errors.length} erreur(s), ${warnings.length} avertissement(s).`);
process.exit(errors.length ? 1 : 0);
