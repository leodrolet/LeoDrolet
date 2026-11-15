#!/usr/bin/env node
/* ============================================================
   scripts/seo/report.mjs — Génère SEO_REPORT.md à partir des données locales :
     seo-data/gsc/*.json (npm run seo:gsc), seo-data/ga4/*.json (npm run seo:ga),
     seo-data/pagespeed/history.csv (npm run seo:speed).
   Compare la période courante à la précédente quand les données existent.
   N'attribue jamais une variation à une modification : il signale seulement
   les changements du journal (SEO_IMPLEMENTATION_LOG.md) survenus dans la période.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const D = (...p) => path.join(ROOT, "seo-data", ...p);
const latest = (dir, n = 1) => fs.existsSync(D(dir)) ? fs.readdirSync(D(dir)).filter((f) => f.endsWith(".json")).sort().slice(-n) : [];
const load = (dir, f) => JSON.parse(fs.readFileSync(D(dir, f), "utf8"));
const pct = (a, b) => (b ? `${a >= b ? "+" : ""}${(((a - b) / b) * 100).toFixed(0)} %` : "n/d");
const n1 = (x) => (x == null ? "n/d" : Number(x).toFixed(1));
const L = [];
const today = new Date().toISOString().slice(0, 10);

L.push(`# Rapport SEO — Novio Studio`, "", `Généré le ${today} par \`npm run seo:report\`. Les chiffres viennent directement des API Google ; aucune donnée n'est estimée.`, "");

// ── Search Console ──
const g = latest("gsc");
L.push("## 1. Google Search Console", "");
if (!g.length) {
  L.push("_Aucune donnée : Search Console n'est pas encore connectée (voir SEO_SETUP.md), ou `npm run seo:gsc` n'a pas été lancé._", "");
} else {
  const d = load("gsc", g[0]); const c = d.current.totals, p = d.previous.totals;
  L.push(`Période : ${d.periods.current.join(" → ")} (comparée à ${d.periods.previous.join(" → ")}).`, "",
    "| Indicateur | Période | Précédente | Variation |", "|---|---|---|---|",
    `| Clics | ${c.clicks} | ${p.clicks} | ${pct(c.clicks, p.clicks)} |`,
    `| Impressions | ${c.impressions} | ${p.impressions} | ${pct(c.impressions, p.impressions)} |`,
    `| CTR | ${(c.ctr * 100).toFixed(1)} % | ${(p.ctr * 100).toFixed(1)} % | |`,
    `| Position moyenne | ${n1(c.position)} | ${n1(p.position)} | |`, "");
  const prevQ = new Map(d.previous.queries.map((r) => [r.keys[0], r]));
  const curQ = new Map(d.current.queries.map((r) => [r.keys[0], r]));
  L.push("### Requêtes principales", "", "| Requête | Clics | Impr. | CTR | Position | Position préc. |", "|---|---|---|---|---|---|",
    ...d.current.queries.slice(0, 25).map((r) => { const q = prevQ.get(r.keys[0]); return `| ${r.keys[0]} | ${r.clicks} | ${r.impressions} | ${(r.ctr * 100).toFixed(1)} % | ${n1(r.position)} | ${q ? n1(q.position) : "nouvelle"} |`; }), "");
  const gained = [...curQ.keys()].filter((k) => !prevQ.has(k));
  const lost = [...prevQ.keys()].filter((k) => !curQ.has(k));
  L.push(`### Mots-clés gagnés (${gained.length}) et perdus (${lost.length})`, "",
    `- Gagnés : ${gained.slice(0, 30).join(", ") || "aucun"}`, `- Perdus : ${lost.slice(0, 30).join(", ") || "aucun"}`, "");
  const opp = d.current.queries.filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 10).sort((a, b) => b.impressions - a.impressions).slice(0, 15);
  L.push("### Opportunités (position 5 à 20, au moins 10 impressions)", "", opp.length
    ? ["| Requête | Impr. | Position |", "|---|---|---|", ...opp.map((r) => `| ${r.keys[0]} | ${r.impressions} | ${n1(r.position)} |`)].join("\n")
    : "_Aucune pour l'instant._", "");
  L.push("### Pages", "", "| Page | Clics | Impr. | Position |", "|---|---|---|---|",
    ...d.current.pages.slice(0, 20).map((r) => `| ${r.keys[0].replace("https://noviostudio.online", "") || "/"} | ${r.clicks} | ${r.impressions} | ${n1(r.position)} |`), "");
  if (d.inspection) {
    L.push("### Indexation (URL du sitemap)", "", "| URL | Verdict | État | Dernière exploration |", "|---|---|---|---|",
      ...d.inspection.map((i) => `| ${i.url.replace("https://noviostudio.online", "") || "/"} | ${i.verdict || i.error || ""} | ${i.coverage || ""} | ${i.lastCrawl ? i.lastCrawl.slice(0, 10) : ""} |`), "");
  }
  if (d.sitemaps?.length) L.push("### Sitemaps", "", ...d.sitemaps.map((s) => `- ${s.path} : dernier téléchargement ${s.lastDownloaded || "n/d"}, erreurs ${s.errors || 0}, avertissements ${s.warnings || 0}`), "");
}

// ── GA4 ──
const a = latest("ga4");
L.push("## 2. Google Analytics 4 (28 jours)", "");
if (!a.length) {
  L.push("_Aucune donnée : GA4 n'est pas encore configuré ou `npm run seo:ga` n'a pas été lancé. Rappel : GA4 ne mesure que les visiteurs qui ont accepté le bandeau de consentement._", "");
} else {
  const d = load("ga4", a[0]);
  const by = (rows, r) => rows.filter((x) => x.dateRange === r);
  const t = by(d.totals, "current")[0] || {}, tp = by(d.totals, "previous")[0] || {};
  L.push("| Indicateur | 28 j | 28 j précédents | Variation |", "|---|---|---|---|",
    ...[["Utilisateurs", "totalUsers"], ["Sessions", "sessions"], ["Sessions engagées", "engagedSessions"], ["Événements clés (conversions)", "keyEvents"]]
      .map(([l, k]) => `| ${l} | ${t[k] ?? 0} | ${tp[k] ?? 0} | ${pct(t[k] ?? 0, tp[k] ?? 0)} |`), "");
  L.push("### Canaux", "", "| Canal | Sessions | Événements clés |", "|---|---|---|", ...by(d.channels, "current").map((r) => `| ${r.sessionDefaultChannelGroup} | ${r.sessions} | ${r.keyEvents} |`), "");
  L.push("### Pages d'entrée", "", "| Page | Sessions | Taux d'engagement | Événements clés |", "|---|---|---|---|", ...by(d.landingPages, "current").slice(0, 15).map((r) => `| ${r.landingPagePlusQueryString} | ${r.sessions} | ${(r.engagementRate * 100).toFixed(0)} % | ${r.keyEvents} |`), "");
  L.push("### Événements", "", "| Événement | Nombre |", "|---|---|", ...by(d.events, "current").map((r) => `| ${r.eventName} | ${r.eventCount} |`), "");
  L.push("### Provenance", "", "| Pays | Ville | Utilisateurs |", "|---|---|---|", ...by(d.geo, "current").slice(0, 15).map((r) => `| ${r.country} | ${r.city} | ${r.totalUsers} |`), "");
}

// ── PageSpeed ──
L.push("## 3. Performance (PageSpeed / Lighthouse)", "");
const hist = D("pagespeed", "history.csv");
if (!fs.existsSync(hist)) L.push("_Aucune mesure : lancez `npm run seo:speed`._", "");
else {
  const rows = fs.readFileSync(hist, "utf8").trim().split("\n").slice(1).map((l) => l.split(","));
  const runs = [...new Set(rows.map((r) => `${r[0]}|${r[1]}`))];
  const last = runs[runs.length - 1], prev = runs.length > 1 ? runs[runs.length - 2] : null;
  const pick = (run) => rows.filter((r) => `${r[0]}|${r[1]}` === run);
  L.push(`Dernière mesure : ${last.replace("|", " · ")}${prev ? ` — comparée à ${prev.replace("|", " · ")}` : ""}.`, "",
    "| Page | Appareil | Perf | Access. | Bonnes prat. | SEO | LCP | CLS | Perf (préc.) | LCP (préc.) |", "|---|---|---|---|---|---|---|---|---|---|",
    ...pick(last).map((r) => { const q = prev && pick(prev).find((x) => x[3] === r[3] && x[4] === r[4]);
      return `| ${r[3]} | ${r[4]} | ${r[5]} | ${r[6]} | ${r[7]} | ${r[8]} | ${(r[9] / 1000).toFixed(1)} s | ${r[10]} | ${q ? q[5] : "n/d"} | ${q ? (q[9] / 1000).toFixed(1) + " s" : "n/d"} |`; }), "",
    "Mesures de laboratoire : elles varient d'une exécution à l'autre et selon l'environnement (local ou production). Seules les données terrain (CrUX) reflètent les vrais visiteurs.", "");
}

// ── Changements de la période ──
L.push("## 4. Modifications du site pendant la période", "", "Voir `SEO_IMPLEMENTATION_LOG.md`. Une variation des indicateurs ci-dessus n'est attribuée à une modification que si les données le démontrent (par exemple : une page nouvellement indexée qui reçoit des impressions sur sa requête cible). Le SEO réagit en semaines, et le trafic varie aussi selon la saison et la concurrence.", "");

fs.writeFileSync(path.join(ROOT, "SEO_REPORT.md"), L.join("\n"));
console.log("SEO_REPORT.md généré.");
