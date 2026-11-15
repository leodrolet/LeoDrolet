#!/usr/bin/env node
/* ============================================================
   scripts/seo/pagespeed.mjs — Tests de performance relançables.
   Teste toutes les pages du sitemap, en mobile et en desktop.

   Usage :
     npm run seo:speed                       # production (noviostudio.online)
     npm run seo:speed -- --base http://localhost:5055   # build local (npx serve)
     npm run seo:speed -- --only /,/tarifs   # quelques pages seulement

   Source des mesures :
     · PSI_API_KEY défini → API PageSpeed Insights v5 (Lighthouse de Google
       + données terrain CrUX quand elles existent)
     · sinon → Lighthouse local (npx lighthouse, Chrome installé requis)

   Sorties (seo-data/pagespeed/) :
     · <date>/summary.json et <date>/summary.md
     · history.csv (une ligne par page × appareil × exécution)
   Aucune clé n'est écrite sur disque ni affichée.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const BASE = (opt("--base", "https://noviostudio.online")).replace(/\/$/, "");
const ONLY = opt("--only", "");
const KEY = process.env.PSI_API_KEY || "";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const OUT = path.join(ROOT, "seo-data", "pagespeed");
const DATE = new Date().toISOString().slice(0, 10);

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
let paths = [...sitemap.matchAll(/<loc>https:\/\/noviostudio\.online([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
if (ONLY) paths = paths.filter((p) => ONLY.split(",").includes(p));

const CATS = ["performance", "accessibility", "best-practices", "seo"];

const summarize = (lhr, field) => {
  const a = lhr.audits;
  const s = (k) => (lhr.categories[k] ? Math.round(lhr.categories[k].score * 100) : null);
  return {
    performance: s("performance"), accessibility: s("accessibility"), bestPractices: s("best-practices"), seo: s("seo"),
    lcp_ms: Math.round(a["largest-contentful-paint"]?.numericValue ?? NaN),
    fcp_ms: Math.round(a["first-contentful-paint"]?.numericValue ?? NaN),
    cls: Number((a["cumulative-layout-shift"]?.numericValue ?? NaN).toFixed(3)),
    tbt_ms: Math.round(a["total-blocking-time"]?.numericValue ?? NaN),
    si_ms: Math.round(a["speed-index"]?.numericValue ?? NaN),
    failing: Object.entries(a)
      .filter(([, v]) => v.score !== null && v.score < 0.9 && ["binary", "numeric", "metricSavings"].includes(v.scoreDisplayMode))
      .map(([k]) => k),
    // Données terrain (vrais utilisateurs Chrome, 28 jours) — seulement via l'API et si le trafic suffit
    field: field || null,
  };
};

const viaPSI = async (url, strategy) => {
  const q = new URLSearchParams({ url, strategy, key: KEY });
  CATS.forEach((c) => q.append("category", c));
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`);
  const j = await res.json();
  if (j.error) throw new Error(j.error.message);
  const m = j.loadingExperience?.metrics;
  const field = m && j.loadingExperience.id === url ? {
    category: j.loadingExperience.overall_category,
    lcp_p75: m.LARGEST_CONTENTFUL_PAINT_MS?.percentile, inp_p75: m.INTERACTION_TO_NEXT_PAINT?.percentile,
    cls_p75: m.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,
  } : null;
  return summarize(j.lighthouseResult, field);
};

const viaLocal = (url, strategy) => {
  const tmp = path.join(os.tmpdir(), `lh-${process.pid}-${strategy}.json`);
  const flags = [ "-y", "lighthouse@12.8.2", url, "--quiet", "--output=json", `--output-path=${tmp}`,
    "--chrome-flags=--headless=new", `--only-categories=${CATS.join(",")}` ];
  if (strategy === "desktop") flags.push("--preset=desktop");
  execFileSync("npx", flags, { stdio: ["ignore", "ignore", "inherit"] });
  const lhr = JSON.parse(fs.readFileSync(tmp, "utf8"));
  fs.unlinkSync(tmp);
  return summarize(lhr, null);
};

const results = [];
console.log(`Source : ${KEY ? "API PageSpeed Insights" : "Lighthouse local"} · base ${BASE} · ${paths.length} page(s)`);
for (const p of paths) {
  for (const strategy of ["mobile", "desktop"]) {
    const url = BASE + p;
    try {
      const r = KEY ? await viaPSI(url, strategy) : viaLocal(url, strategy);
      results.push({ path: p, strategy, ...r });
      console.log(`${strategy.padEnd(7)} ${p.padEnd(52)} perf ${r.performance}  a11y ${r.accessibility}  bp ${r.bestPractices}  seo ${r.seo}  LCP ${r.lcp_ms}ms  CLS ${r.cls}  TBT ${r.tbt_ms}ms`);
    } catch (e) {
      results.push({ path: p, strategy, error: String(e.message || e) });
      console.log(`${strategy.padEnd(7)} ${p.padEnd(52)} ERREUR ${e.message || e}`);
    }
  }
}

const dir = path.join(OUT, DATE);
fs.mkdirSync(dir, { recursive: true });
const meta = { date: DATE, base: BASE, source: KEY ? "psi-api" : "lighthouse-local", results };
fs.writeFileSync(path.join(dir, "summary.json"), JSON.stringify(meta, null, 2));
const md = [`# PageSpeed — ${DATE}`, "", `Base : ${BASE} · Source : ${meta.source}`, "",
  "| Page | Appareil | Perf | Access. | Bonnes prat. | SEO | LCP | CLS | TBT | Terrain (CrUX) |", "|---|---|---|---|---|---|---|---|---|---|",
  ...results.map((r) => r.error ? `| ${r.path} | ${r.strategy} | erreur : ${r.error} | | | | | | | |`
    : `| ${r.path} | ${r.strategy} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${(r.lcp_ms / 1000).toFixed(1)} s | ${r.cls} | ${r.tbt_ms} ms | ${r.field ? r.field.category : "n/d"} |`),
  "", "Note : Lighthouse est une mesure de labo (une exécution simulée). Les Core Web Vitals qui comptent pour Google sont les données terrain (CrUX), disponibles seulement via l'API et lorsque le site a assez de trafic.", ""].join("\n");
fs.writeFileSync(path.join(dir, "summary.md"), md);
const hist = path.join(OUT, "history.csv");
if (!fs.existsSync(hist)) fs.writeFileSync(hist, "date,base,source,path,strategy,performance,accessibility,best_practices,seo,lcp_ms,cls,tbt_ms,field_category\n");
fs.appendFileSync(hist, results.filter((r) => !r.error).map((r) =>
  [DATE, BASE, meta.source, r.path, r.strategy, r.performance, r.accessibility, r.bestPractices, r.seo, r.lcp_ms, r.cls, r.tbt_ms, r.field?.category || ""].join(",")).join("\n") + "\n");
console.log(`\nRésumé : ${path.relative(ROOT, path.join(dir, "summary.md"))}`);
