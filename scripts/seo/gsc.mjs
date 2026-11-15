#!/usr/bin/env node
/* ============================================================
   scripts/seo/gsc.mjs — Données Google Search Console (lecture seule).
   Récupère, pour les 28 derniers jours complets ET les 28 jours précédents :
     totaux (clics, impressions, CTR, position), requêtes, pages, pays, appareils ;
   l'état des sitemaps ; l'inspection d'indexation des URL du sitemap.
   Sortie : seo-data/gsc/<date>.json
   Propriété : variable GSC_SITE_URL (défaut : sc-domain:noviostudio.online)
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { accessToken, gapi } from "./google-auth.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const SITE = process.env.GSC_SITE_URL || "sc-domain:noviostudio.online";
const API = "https://www.googleapis.com/webmasters/v3/sites/" + encodeURIComponent(SITE);
const day = (d) => d.toISOString().slice(0, 10);
const shift = (d, n) => { const x = new Date(d); x.setUTCDate(x.getUTCDate() + n); return x; };

// Les données GSC ont environ 2-3 jours de retard
const end = shift(new Date(), -3), start = shift(end, -27);
const pEnd = shift(start, -1), pStart = shift(pEnd, -27);
const PERIODS = { current: [day(start), day(end)], previous: [day(pStart), day(pEnd)] };

const token = await accessToken();
const query = (range, dimensions, rowLimit = 1000) =>
  gapi(token, API + "/searchAnalytics/query", { startDate: range[0], endDate: range[1], dimensions, rowLimit, dataState: "final" })
    .then((j) => (j.rows || []).map((r) => ({ keys: r.keys, clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })));

const out = { fetchedAt: new Date().toISOString(), site: SITE, periods: PERIODS };
try {
  for (const [name, range] of Object.entries(PERIODS)) {
    const [totals, queries, pages, countries, devices] = await Promise.all([
      query(range, []), query(range, ["query"]), query(range, ["page"]), query(range, ["country"], 50), query(range, ["device"]),
    ]);
    out[name] = { totals: totals[0] || { clicks: 0, impressions: 0, ctr: 0, position: null }, queries, pages, countries, devices };
  }
  out.sitemaps = (await gapi(token, API + "/sitemaps")).sitemap || [];
  // Inspection d'indexation (quota : 2 000/jour) — URL du sitemap local
  const urls = [...fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  out.inspection = [];
  for (const u of urls) {
    try {
      const r = await gapi(token, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", { inspectionUrl: u, siteUrl: SITE, languageCode: "fr-CA" });
      const s = r.inspectionResult?.indexStatusResult || {};
      out.inspection.push({ url: u, verdict: s.verdict, coverage: s.coverageState, lastCrawl: s.lastCrawlTime, googleCanonical: s.googleCanonical, robots: s.robotsTxtState, fetch: s.pageFetchState });
    } catch (e) { out.inspection.push({ url: u, error: e.message }); }
  }
} catch (e) {
  console.error("Erreur Search Console : " + e.message + "\n(Le compte autorisé a-t-il accès à la propriété " + SITE + " ?)");
  process.exit(1);
}

const dir = path.join(ROOT, "seo-data", "gsc");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${day(new Date())}.json`);
fs.writeFileSync(file, JSON.stringify(out, null, 2));
const t = out.current.totals, p = out.previous.totals;
console.log(`Search Console ${PERIODS.current.join(" → ")} : ${t.clicks} clics (avant : ${p.clicks}), ${t.impressions} impressions (avant : ${p.impressions}), position moy. ${t.position ? t.position.toFixed(1) : "n/d"}`);
console.log(`Indexées : ${out.inspection.filter((i) => i.verdict === "PASS").length}/${out.inspection.length} URL du sitemap · ${path.relative(ROOT, file)}`);
