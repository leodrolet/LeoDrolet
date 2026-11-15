#!/usr/bin/env node
/* ============================================================
   scripts/seo/ga4.mjs — Données Google Analytics 4 (Data API, lecture seule).
   28 derniers jours vs 28 jours précédents : utilisateurs, sessions,
   engagement, sources de trafic, pages, événements (conversions), pays/villes.
   Sortie : seo-data/ga4/<date>.json
   Requiert : GA4_PROPERTY_ID (identifiant numérique de la propriété, pas le G-XXXX)
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { accessToken, gapi } from "./google-auth.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const PROP = (process.env.GA4_PROPERTY_ID || "").trim();
if (!/^\d+$/.test(PROP)) { console.error("GA4_PROPERTY_ID manquant ou invalide (identifiant numérique de la propriété GA4)."); process.exit(2); }
const API = `https://analyticsdata.googleapis.com/v1beta/properties/${PROP}:runReport`;
const RANGES = [{ startDate: "28daysAgo", endDate: "yesterday", name: "current" }, { startDate: "56daysAgo", endDate: "29daysAgo", name: "previous" }];

const token = await accessToken();
const report = async (dimensions, metrics, limit = 50) => {
  const j = await gapi(token, API, {
    dateRanges: RANGES, dimensions: dimensions.map((name) => ({ name })), metrics: metrics.map((name) => ({ name })), limit,
  });
  const dn = (j.dimensionHeaders || []).map((h) => h.name), mn = (j.metricHeaders || []).map((h) => h.name);
  return (j.rows || []).map((r) => {
    const o = {};
    r.dimensionValues.forEach((v, i) => { o[dn[i]] = v.value; });
    r.metricValues.forEach((v, i) => { o[mn[i]] = Number(v.value); });
    return o;
  });
};

const out = { fetchedAt: new Date().toISOString(), property: PROP };
try {
  out.totals = await report([], ["totalUsers", "newUsers", "sessions", "engagedSessions", "engagementRate", "userEngagementDuration", "keyEvents"]);
  out.channels = await report(["sessionDefaultChannelGroup"], ["sessions", "engagedSessions", "keyEvents"]);
  out.sources = await report(["sessionSource", "sessionMedium"], ["sessions", "keyEvents"]);
  out.landingPages = await report(["landingPagePlusQueryString"], ["sessions", "engagementRate", "keyEvents"]);
  out.pages = await report(["pagePath"], ["screenPageViews", "userEngagementDuration", "keyEvents"]);
  out.events = await report(["eventName"], ["eventCount", "totalUsers"]);
  out.geo = await report(["country", "city"], ["totalUsers", "sessions", "keyEvents"]);
  out.devices = await report(["deviceCategory"], ["sessions", "engagementRate"]);
} catch (e) {
  console.error("Erreur GA4 : " + e.message);
  process.exit(1);
}
const dir = path.join(ROOT, "seo-data", "ga4");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${new Date().toISOString().slice(0, 10)}.json`);
fs.writeFileSync(file, JSON.stringify(out, null, 2));
const cur = out.totals.find((r) => r.dateRange === "current") || {};
console.log(`GA4 (28 j) : ${cur.totalUsers ?? 0} utilisateurs, ${cur.sessions ?? 0} sessions, ${cur.keyEvents ?? 0} événements clés · ${path.relative(ROOT, file)}`);
