/* ============================================================
   scripts/seo/google-auth.mjs — OAuth Google en LECTURE SEULE.
   Portées : Search Console (webmasters.readonly) et Analytics (analytics.readonly).

   Fichiers locaux (dossier .secrets/, ignoré par Git et par Vercel, chmod 600) :
     .secrets/google-oauth-client.json  identifiant OAuth « Application de bureau »
                                        téléchargé depuis Google Cloud Console
     .secrets/google-oauth-token.json   jeton de rafraîchissement (créé par `npm run seo:auth`)
   Rien n'est jamais affiché dans la console.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import crypto from "node:crypto";
import { execFile } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const DIR = path.join(ROOT, ".secrets");
const CLIENT = path.join(DIR, "google-oauth-client.json");
const TOKEN = path.join(DIR, "google-oauth-token.json");
export const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

const fail = (msg) => { console.error(msg); process.exit(2); };

const readClient = () => {
  if (!fs.existsSync(CLIENT)) fail(
    "Identifiant OAuth introuvable : .secrets/google-oauth-client.json\n" +
    "→ Voir SEO_SETUP.md, section « Connexion Google », étapes 1 à 4.");
  const j = JSON.parse(fs.readFileSync(CLIENT, "utf8"));
  const c = j.installed || j.web;
  if (!c || !c.client_id || !c.client_secret) fail("Fichier OAuth invalide (type « Application de bureau » attendu).");
  return c;
};

// Flux « loopback » (application de bureau) avec PKCE.
export const authorize = async () => {
  const c = readClient();
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
  const state = crypto.randomBytes(16).toString("hex");
  const server = http.createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const redirect = `http://127.0.0.1:${server.address().port}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
    client_id: c.client_id, redirect_uri: redirect, response_type: "code", scope: SCOPES.join(" "),
    access_type: "offline", prompt: "consent", state, code_challenge: challenge, code_challenge_method: "S256",
  });
  console.log("Ouverture du navigateur pour autoriser l'accès en lecture seule…\nSi rien ne s'ouvre, copiez cette adresse :\n" + url + "\n");
  execFile("open", [url], () => {});
  const code = await new Promise((resolve, reject) => {
    server.on("request", (req, res) => {
      const q = new URL(req.url, redirect).searchParams;
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      if (q.get("state") !== state || !q.get("code")) {
        res.end("<p>Autorisation refusée ou invalide. Vous pouvez fermer cet onglet.</p>");
        return reject(new Error(q.get("error") || "état invalide"));
      }
      res.end("<p>Autorisation reçue. Vous pouvez fermer cet onglet et revenir au terminal.</p>");
      resolve(q.get("code"));
    });
  }).finally(() => server.close());
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: c.client_id, client_secret: c.client_secret, redirect_uri: redirect, grant_type: "authorization_code", code_verifier: verifier }),
  });
  const t = await res.json();
  if (!t.refresh_token) fail("Google n'a pas renvoyé de jeton de rafraîchissement (" + (t.error || "inconnu") + ").");
  fs.mkdirSync(DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(TOKEN, JSON.stringify({ refresh_token: t.refresh_token, scope: t.scope, created: new Date().toISOString() }), { mode: 0o600 });
  console.log("Connexion enregistrée dans .secrets/google-oauth-token.json (portées : " + t.scope + ").");
};

// Jeton d'accès à courte durée, obtenu à partir du jeton de rafraîchissement.
export const accessToken = async () => {
  const c = readClient();
  if (!fs.existsSync(TOKEN)) fail("Pas encore connecté à Google → lancez `npm run seo:auth`.");
  const { refresh_token } = JSON.parse(fs.readFileSync(TOKEN, "utf8"));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: c.client_id, client_secret: c.client_secret, refresh_token, grant_type: "refresh_token" }),
  });
  const t = await res.json();
  if (!t.access_token) fail("Échec du rafraîchissement (" + (t.error || "inconnu") + "). Relancez `npm run seo:auth`.");
  return t.access_token;
};

export const gapi = async (token, url, body) => {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${res.status} ${j.error?.message || res.statusText}`);
  return j;
};

if (process.argv[1] && process.argv[1].endsWith("google-auth.mjs")) {
  authorize().catch((e) => fail("Échec de l'autorisation : " + e.message));
}
