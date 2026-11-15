# SEO_SETUP — Connexions Google et outils de suivi

Ce document liste **ce que vous devez faire vous-même** pour connecter les outils Google. Rien de tout cela ne demande de partager un mot de passe : vous autorisez l'accès dans votre propre navigateur, et toutes les autorisations sont en **lecture seule**.

État au 15 novembre 2026 :

| Outil | État | Ce qui manque |
|---|---|---|
| Serveur MCP Google (Search Console, GA4) | **Aucun installé** (vérifié dans la liste des outils MCP de la session) | Étapes ci-dessous |
| Google Search Console | **Non connecté** | Propriété validée + identifiant OAuth (étapes 1 à 5) |
| Google Analytics 4 | **Non installé sur le site** (aucune balise sur la production) | Créer la propriété, ajouter l'ID dans Vercel (étape 6) |
| PageSpeed Insights API | **Quota épuisé sans clé** (appel anonyme refusé : « Quota exceeded ») | Clé API (étape 7). En attendant, `npm run seo:speed` utilise Lighthouse en local |
| `www.noviostudio.online` | **Erreur 526** (certificat invalide côté Cloudflare) | Étape 8 |

---

## Étape 1 — Valider la propriété Search Console

1. Allez sur <https://search.google.com/search-console> avec le compte Google de Novio Studio.
2. Ajoutez une propriété de type **Domaine** : `noviostudio.online`.
3. Google affiche un enregistrement **TXT**. Ajoutez-le dans **Cloudflare → DNS** (votre DNS est chez Cloudflare), puis cliquez sur « Valider ».
4. Dans **Sitemaps**, soumettez `https://noviostudio.online/sitemap.xml` (après le déploiement de la branche `seo-optimisation`).

Si une propriété existe déjà sous forme « Préfixe d'URL » (`https://noviostudio.online/`), indiquez-la avec la variable `GSC_SITE_URL=https://noviostudio.online/`.

## Étape 2 — Créer un projet Google Cloud (gratuit)

1. <https://console.cloud.google.com/> → **Nouveau projet** (ex. `novio-seo`).
2. **API et services → Bibliothèque**, activez :
   - Google Search Console API
   - Google Analytics Data API
   - Google Analytics Admin API (utile au serveur MCP officiel)
   - PageSpeed Insights API

## Étape 3 — Écran de consentement OAuth

**API et services → Écran de consentement OAuth** : type **Externe**, nom `Novio SEO (local)`, votre courriel. Dans **Utilisateurs test**, ajoutez votre propre adresse Google. Laissez l'application en mode « Test » : elle ne sert qu'à vous.

## Étape 4 — Identifiant OAuth « Application de bureau »

1. **Identifiants → Créer des identifiants → ID client OAuth → Application de bureau**.
2. Téléchargez le JSON et enregistrez-le exactement ici :
   `~/Site_web/Mon-site-web/.secrets/google-oauth-client.json`
3. Le dossier `.secrets/` est ignoré par Git **et** par Vercel. Vérification : `git check-ignore .secrets/google-oauth-client.json` doit afficher le chemin.

## Étape 5 — Autoriser l'accès (lecture seule)

```bash
cd ~/Site_web/Mon-site-web
npm run seo:auth      # ouvre Google : acceptez les 2 portées en lecture seule
npm run seo:gsc       # récupère requêtes, impressions, clics, CTR, positions, indexation
```

Portées demandées : `webmasters.readonly` et `analytics.readonly`. Aucune permission Google n'est modifiée. Le jeton est enregistré dans `.secrets/` (permissions 600). Pour révoquer : <https://myaccount.google.com/permissions>.

## Étape 6 — Google Analytics 4

1. <https://analytics.google.com/> → **Administration → Créer une propriété** (`Novio Studio`, fuseau America/Toronto, devise CAD) → flux **Web** `https://noviostudio.online`.
2. Copiez l'**ID de mesure** (`G-XXXXXXXXXX`).
3. Dans **Vercel → projet → Settings → Environment Variables**, ajoutez `GA_MEASUREMENT_ID = G-XXXXXXXXXX` (Production), puis redéployez. Le build insère l'ID ; le site affiche alors un bandeau de consentement et **ne charge GA qu'après acceptation** (Loi 25).
4. Dans GA4 → **Administration → Événements clés**, marquez comme événements clés : `generate_lead` (formulaire envoyé), `click_phone`, `click_email`. `cta_quote_click` peut rester un événement simple.
5. Recommandé : **Administration → Collecte de données → Signaux Google : désactivé** ; **Conservation des données : 14 mois**.
6. Pour `npm run seo:ga`, notez l'**ID de propriété** numérique (Administration → Détails de la propriété) et lancez :
   ```bash
   GA4_PROPERTY_ID=123456789 npm run seo:ga
   ```

### Serveur MCP officiel Google Analytics (optionnel)

Après l'étape 5, `.secrets/google-adc.json` contient vos identifiants au format « Application Default Credentials » : pas besoin d'installer gcloud.

```bash
claude mcp add analytics-mcp --scope user \
  -e "GOOGLE_APPLICATION_CREDENTIALS=/Users/leodrolet/Site_web/Mon-site-web/.secrets/google-adc.json" \
  -e "GOOGLE_CLOUD_PROJECT=<id-du-projet-cloud>" \
  -- uvx --from analytics-mcp google-analytics-mcp
```

Il expose en lecture seule `run_report`, `run_realtime_report`, `run_funnel_report`, `run_conversions_report`, `get_account_summaries`, etc. (source : <https://developers.google.com/analytics/devguides/MCP>). Si Google exige un projet de quota, relancez `GOOGLE_CLOUD_PROJECT=<id> npm run seo:auth`.

## Étape 7 — Clé PageSpeed Insights

1. Google Cloud → **Identifiants → Créer une clé API**. Restreignez-la à « PageSpeed Insights API ».
2. Rangez-la dans votre coffre `keys` (Trousseau macOS) plutôt que dans un fichier :
   ```bash
   keys add novio-site/PSI_API_KEY
   PSI_API_KEY="$(keys get novio-site/PSI_API_KEY)" npm run seo:speed
   ```
   Avec la clé, le script utilise l'API officielle et récupère aussi les **données terrain (CrUX)** quand le site a assez de trafic.

## Étape 8 — Corriger `www.noviostudio.online` (erreur 526)

Constat : `www.noviostudio.online` passe par le proxy Cloudflare (nuage orange) et renvoie **526 Invalid SSL certificate**. Les visiteurs qui tapent « www » voient une page d'erreur.

Correction recommandée (à faire par vous, ou par moi avec votre accord) :
1. **Vercel → Settings → Domains** : ajoutez `www.noviostudio.online` avec redirection **308 vers `noviostudio.online`**.
2. **Cloudflare → DNS** : enregistrement `www` en **CNAME `cname.vercel-dns.com`**, **proxy désactivé** (nuage gris, « DNS only »).
3. Vérifiez : `curl -sI https://www.noviostudio.online` doit renvoyer `308` vers `https://noviostudio.online/`.

## Routine mensuelle

```bash
npm run seo:all       # Search Console + GA4 + PageSpeed + génération de SEO_REPORT.md
```
(`GA4_PROPERTY_ID` et `PSI_API_KEY` doivent être définis dans l'environnement.)
