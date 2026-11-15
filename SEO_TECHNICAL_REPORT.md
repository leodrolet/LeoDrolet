# SEO_TECHNICAL_REPORT — Novio Studio

Audit et corrections du 15 novembre 2026. Branche de travail : `seo-30-jours` (locale, **non poussée, non déployée**). La production n'a pas été modifiée.

## 0. Point de départ vérifié

| Élément | Constat | Source de la vérification |
|---|---|---|
| Version en production | `main` au commit `2cf6975` (« mesure Lighthouse en production après déploiement »), déploiement Vercel `dpl_9B863i7NNqBMuWRHKTBGcsHMcfZa`, état READY | API Vercel (liste des déploiements du projet `leo-drolet`) |
| Chantier SEO du 15 nov. | **Il est en ligne.** `main` = `origin/main` = `origin/seo-optimisation`. La mention « non fusionnée, non déployée » de SEO_IMPLEMENTATION_LOG.md était périmée (corrigée dans ce journal) | `git rev-parse`, API Vercel |
| Domaines du projet Vercel | `noviostudio.online` et `leo-drolet.vercel.app` seulement. **`www.noviostudio.online` n'est pas attaché au projet** | API Vercel (domaines du projet) |
| DNS | Serveurs de noms Cloudflare (`jillian` / `lex.ns.cloudflare.com`) | API Vercel (configuration de domaine) |
| En-têtes de sécurité | CSP, HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` servis en production | Requête sur `/sitemap.xml` et `/tarifs.html` |
| GA4 en production | **Inactif** : aucune balise `ga-id`, `dataLayer` et `gtag` absents, aucun témoin `_ga` | Navigateur intégré, page `/blogue` en production |

Limite : depuis mon environnement, les requêtes directes vers `noviostudio.online` (curl) sont bloquées par le pare-feu sortant. Les vérifications de production ont été faites par l'API Vercel et par le navigateur intégré de votre ordinateur. Le test `http://` → `https://` et le test de `www` en direct sont donc à faire par vous (commandes à la section 4).

## 1. Problèmes trouvés

| # | Problème | Gravité | Statut |
|---|---|---|---|
| T1 | **`www.noviostudio.online` : erreur 526.** Cause exacte : l'enregistrement `www` passe par le proxy Cloudflare (Vercel voit les IP Cloudflare `104.21.24.30` et `172.67.216.128`, aucun CNAME), et `www` n'est pas ajouté au projet Vercel. Vercel ne délivre donc aucun certificat pour `www` ; Cloudflare, en mode SSL strict, refuse le certificat de l'origine et affiche 526 | Critique | **Correction préparée, attend votre intervention** (section 4.1) |
| T2 | `/site-web/` (barre oblique finale) répond 200 avec le contenu de `/site-web` : URL en double. La balise canonical limite le risque, mais une redirection est plus propre | Faible | **Corrigé localement** : `"trailingSlash": false` dans `vercel.json` (redirection 308 vers l'URL sans barre oblique) |
| T3 | Les fragments d'articles sont accessibles publiquement : `/content/blogue/<slug>` répond 200, sans balise canonical ni `<title>`. Google pourrait les indexer comme doublons partiels des articles | Moyenne | **Corrigé localement** : redirection 301 de `/content/blogue/<slug>` (avec ou sans `.html`) vers `/blogue/<slug>` |
| T4 | Les sources du site sont servies publiquement (`/build.js`, `/src/app.jsx`, `/scripts/…`, `/content/en.js`) car le dossier de sortie Vercel est la racine du dépôt. Rien de secret (vérifié : aucune clé dans ces fichiers), mais ce sont des URL indexables sans valeur | Faible | **Corrigé localement** : en-tête `X-Robots-Tag: noindex, nofollow` sur `/src`, `/scripts`, `/content`, `/seo-data`, `build.js`, `babel.config.json`, `package*.json`. Les fichiers restent servis (le build Vercel en a besoin) |
| T5 | Title de `/blogue/site-web-ou-reseaux-sociaux` : 71 caractères (risque de troncature) | Faible | **Corrigé** : 56 caractères |
| T6 | JSON-LD : `openingHours: "Mo-Fr 09:00-18:00"` est déclaré alors que vos heures n'ont jamais été confirmées (SEO_IMPLEMENTATION_LOG, « En attente ») | Moyenne | **À confirmer par vous** : soit vous confirmez ces heures (et les mettez à l'identique dans Google Business Profile), soit je retire la ligne de `build.js` |
| T7 | Aucun contrôle automatique des balises après chaque build | Moyenne | **Ajouté** : `npm run seo:check` (section 3) |
| T8 | Les variables d'environnement Vercel ne sont pas lisibles avec l'accès actuel (API : 403). Impossible de confirmer que `GA_MEASUREMENT_ID` est absent ou mal nommé | Info | Le résultat en production (aucune balise GA) indique qu'il n'est pas défini, ou qu'il l'a été sans redéploiement |

Aucun problème trouvé sur : sitemap, robots.txt, canonical, H1, hreflang, données structurées (validité), liens internes, page 404 (statut 404 et `noindex`), redirections `/blog`, `/index`, `/automatisation`, `*.html` → URL propres.

## 2. Corrections effectuées (branche `seo-30-jours`, commit `475549f` et suivants)

| Fichier | Modification |
|---|---|
| `vercel.json` | `trailingSlash: false` ; 2 redirections `/content/blogue/:slug(.html)` → `/blogue/:slug` ; 2 règles d'en-têtes `X-Robots-Tag` (T3, T4). CSP, HSTS et redirections existantes inchangées |
| `scripts/seo/check-pages.mjs` + `package.json` | Nouveau contrôle `npm run seo:check` (sans dépendance) |
| `content/blog.js` | Title T5 ; 4 articles ajoutés avec `draft: true` (non publiés) |
| `build.js` | Les brouillons sont exclus du build, du sitemap et de la liste du blogue (`PREVIEW_DRAFTS=1` pour les prévisualiser en local) ; génération de `/realisations` **uniquement** s'il existe un projet réel publié (voir CONFIANCE_ET_PORTFOLIO.md) |
| `content/realisations.js` | Structure vide documentée (aucun contenu fictif) |
| `content/blogue/*.html` | 4 brouillons d'articles (voir CONTENT_DRAFTS.md) |

Aucune dépendance ajoutée. Aucune modification du design, des textes publiés (sauf le title T5) ni des fonctionnalités.

## 3. Tests réalisés

| Test | Résultat |
|---|---|
| `npm run build` sur `main` avant toute modification | OK, 9 pages, empreinte `3c281940` identique à la production (build reproductible) |
| `npm run build` après modifications | OK, 9 pages, mêmes empreintes de bundle (le JavaScript n'a pas changé) |
| `npm run seo:check` (9 URL) | **0 erreur, 0 avertissement** : 1 seul H1 par page, canonical = URL du sitemap, title ≤ 70 caractères, description 150 à 165, hreflang réciproques `/` ↔ `/en` avec `x-default`, JSON-LD valide, aucun lien interne cassé |
| Build avec `PREVIEW_DRAFTS=1` (copie temporaire) | 13 pages, 0 erreur ; les 4 brouillons ont H1, BreadcrumbList et BlogPosting |
| Build avec un projet fictif de test dans `realisations.js` (copie temporaire, supprimée) | `/realisations` et la page du projet générées et ajoutées au sitemap ; un résultat sans source fait **échouer** le build, comme prévu |
| Production, navigateur intégré | `/blog` → `/blogue` (redirigé), `/tarifs.html` → `/tarifs`, `/index` et `/automatisation` redirigés ; `/site-web/` et `/blogue/` = 200 (T2) ; `/content/blogue/…` = 200 sans canonical (T3) ; `/src/app.jsx` = 200 (T4) ; `/package.json` = 404 ; page inexistante = 404 `noindex` |
| Production, API Vercel | `sitemap.xml` 200, 9 URL, `lastmod` et hreflang corrects ; en-têtes de sécurité présents |
| GA4 (revue de code de `Analytics.jsx` et `pages.jsx`) | Rien n'est chargé sans **les deux** conditions : ID défini au build et clic sur « Accepter ». Signaux Google et personnalisation publicitaire désactivés. Retrait du consentement : GA coupé et témoins `_ga*` effacés |

### Événements GA4 implémentés (vérifiés dans le code)

| Événement | Déclencheur | Paramètres (aucune donnée personnelle) |
|---|---|---|
| `generate_lead` | Formulaire envoyé avec succès (réponse Formspree OK) | `form`, `plan`, `lang` |
| `form_error` | Échec d'envoi ou erreur réseau | `form`, `lang` |
| `click_phone` | Clic sur un lien `tel:` | `zone` (en-tête, pied de page, section) |
| `click_email` | Clic sur un lien `mailto:` | `zone` |
| `cta_quote_click` | Clic vers `/contact`, `#contact` ou `#formulaire` | `zone`, `plan` |

Ces événements ne peuvent être vus dans GA4 qu'après l'activation (section 4.3), et seulement pour les visiteurs qui acceptent la mesure.

## 4. Actions qui nécessitent votre intervention

### 4.1 Corriger `www` (erreur 526) — environ 10 minutes

**Ordre important : Vercel d'abord, Cloudflare ensuite.**

1. **Vercel** → <https://vercel.com/leo-drolet-s-projects/leo-drolet/settings/domains>
   - Cliquez **Add Domain**, saisissez `www.noviostudio.online`.
   - Choisissez **Redirect to Another Domain** → `noviostudio.online`, code **308 Permanent Redirect**.
   - Vercel affiche l'enregistrement DNS attendu. Il recommande actuellement, pour votre projet, le CNAME `7f91f438dae8d5de.vercel-dns-017.com` (premier choix) ; `cname.vercel-dns.com` (deuxième choix) fonctionne aussi. Utilisez celui que l'écran affiche.
2. **Cloudflare** → <https://dash.cloudflare.com> → `noviostudio.online` → **DNS** → **Records**
   - S'il existe déjà un enregistrement `A`, `AAAA` ou `CNAME` nommé `www`, cliquez **Edit** (ou supprimez-le s'il est de type `A`/`AAAA`).
   - Valeurs à saisir :
     - Type : `CNAME`
     - Name : `www`
     - Target : `7f91f438dae8d5de.vercel-dns-017.com` (ou la valeur affichée par Vercel)
     - Proxy status : **DNS only** (nuage gris)
     - TTL : Auto
   - **Save**.
3. Attendez que Vercel affiche « Valid Configuration » pour `www` (quelques minutes ; le certificat est émis automatiquement).
4. Vérification (Terminal) :
   ```bash
   curl -sI https://www.noviostudio.online | head -3     # attendu : HTTP/2 308 + location: https://noviostudio.online/
   curl -sI http://noviostudio.online | head -3          # attendu : redirection vers https://
   curl -sI https://noviostudio.online/site-web/ | head -3   # après déploiement : 308 vers /site-web
   ```

Je ne modifie pas ces réglages moi-même sans votre autorisation explicite. Si vous préférez que je le fasse par l'API Vercel (ajout du domaine), dites-le ; la partie Cloudflare reste dans votre compte.

### 4.2 Relire et déployer la branche `seo-30-jours`

```bash
cd ~/Site_web/Mon-site-web
git log --oneline main..seo-30-jours      # ce qui a changé
git diff main..seo-30-jours -- vercel.json
npm run build && npm run seo:check
git push origin seo-30-jours              # crée un aperçu Vercel (pas la production)
```
Après vérification de l'aperçu : fusion dans `main` (déploiement en production). Les 4 articles **ne seront pas publiés** par ce déploiement (`draft: true`).

### 4.3 Activer GA4 (SEO_SETUP.md, étape 6)

1. <https://analytics.google.com/> → Administration → Créer une propriété « Novio Studio », fuseau America/Toronto, devise CAD → flux Web `https://noviostudio.online`.
2. Copiez l'ID de mesure (`G-…`). **Je ne l'invente pas : il vient de votre compte.**
3. <https://vercel.com/leo-drolet-s-projects/leo-drolet/settings/environment-variables> → **Add** : Key `GA_MEASUREMENT_ID`, Value `G-…`, Environment **Production** (et Preview si vous voulez tester sur l'aperçu) → Save.
4. Redéployez (Deployments → dernier déploiement de production → **Redeploy**). Le build vérifie le format de l'ID et refuse un ID invalide.
5. Vérification : ouvrez le site en navigation privée → le bandeau apparaît ; « Accepter » → GA4 → Rapports → **Temps réel** montre votre visite. Cliquez le téléphone : `click_phone` apparaît dans le Temps réel.
6. GA4 → Administration → **Événements clés** : marquez `generate_lead`, `click_phone`, `click_email`.

### 4.4 Search Console et clé PageSpeed
Inchangé : SEO_SETUP.md, étapes 1 à 5 et 7. Après validation de la propriété, soumettez `https://noviostudio.online/sitemap.xml` et demandez l'indexation des 9 URL (inspection d'URL).

### 4.5 Décision sur les heures (T6)
Répondez simplement : « heures confirmées : … » ou « retire les heures ».

## 5. Problèmes non résolus

| Problème | Raison |
|---|---|
| `www` en 526 | Nécessite vos comptes Vercel et Cloudflare (4.1) |
| GA4 inactif | Nécessite un ID de mesure de votre compte (4.3) |
| Search Console non connectée | Nécessite la validation de propriété dans votre compte (SEO_SETUP.md) |
| Mesure PageSpeed en production | Clé API absente et production inaccessible depuis mon environnement : à lancer chez vous avec `npm run seo:speed` |
| Test HTTP → HTTPS | Non testable depuis mon environnement ; commande à la section 4.1 |
