# SEO_IMPLEMENTATION_LOG

Journal des modifications SEO. Une ligne par changement, avec sa vérification. Ne jamais attribuer une évolution du trafic à une ligne de ce journal sans preuve dans les données (voir SEO_REPORT.md).

- **Point de restauration :** tag `pre-seo-2026-11-15` (= `main` au commit `6e2d9f9`).
- **Branche de travail :** `seo-optimisation`. **Non fusionnée, non déployée** : la production n'a pas été modifiée.
- Retour arrière complet : `git switch main` (rien n'a été modifié sur `main`).

## 15 novembre 2026

### Technique
| # | Modification | Fichiers | Vérification |
|---|---|---|---|
| 1 | **Pré-rendu HTML au build** : le bundle est exécuté dans un bac à sable Node, chaque page est rendue avec `react-dom/server`, puis hydratée côté navigateur (`hydrateRoot`). Le contenu complet est dans le HTML initial. | `build.js`, `src/app.jsx`, `src/page.template.html`, `package.json` (react, react-dom 18.3.1 en dépendances de dev, même version que `vendor/`) | 9 pages générées ; 0 erreur ni avertissement d'hydratation dans la console (Playwright : `/`, `/contact?forfait=premium`, `/en`, article, `/tarifs`) ; menu mobile fonctionnel |
| 2 | Présélection du forfait (`?forfait=`) lue **après** le montage, pour que le HTML pré-rendu reste identique à l'hydratation | `src/components/pages.jsx` | `/contact?forfait=premium` coche « Premium », sans erreur |
| 3 | Police Geist **auto-hébergée** (latin + latin-ext, variable 400 à 600) et préchargée ; Google Fonts retiré | `vendor/fonts/`, `src/styles.css`, template, `404.html`, `500.html` | Plus aucune requête vers fonts.googleapis.com |
| 4 | **CSS intégrée** au HTML (30 Ko non compressés) : plus aucune ressource bloquant l'affichage | `build.js`, template | Lighthouse : `render-blocking-resources` réussi |
| 5 | Chemins d'assets absolus (`/dist/…`, `/vendor/…`, `/assets/…`) pour les pages en sous-dossier | template, `About.jsx` | Articles `/blogue/…` affichés correctement |
| 6 | Version d'assets = empreinte du bundle (plus de `ASSET_V` à incrémenter à la main) | `build.js` | — |
| 7 | **JSON-LD par page** (`@graph`) : ProfessionalService + Person + WebSite (accueil, /en), WebPage/ContactPage/CollectionPage, BreadcrumbList, FAQPage (`/tarifs`, `/site-web`, `/en` ; pas sur l'accueil, pour ne pas baliser deux fois la même FAQ), BlogPosting (articles) | `build.js` | JSON valide sur les 9 pages (analyse automatique) ; à revalider avec le test des résultats enrichis de Google après déploiement |
| 8 | **Sitemap généré** au build : 9 URL, `lastmod` par page, `hreflang` fr-CA / en-CA / x-default pour `/` et `/en` | `build.js`, `sitemap.xml` | `xmllint` OK |
| 9 | `hreflang` dans le `<head>` de `/` et `/en` ; `og:locale` par langue ; `<html lang>` par page | template, `build.js` | — |
| 10 | Accessibilité : coin du tableau des forfaits en `<th scope="col">` (règle `td-has-header`) | `Pricing.jsx` | Lighthouse accessibilité 100 |
| 11 | CSP : Google Fonts retiré ; domaines GA4 autorisés ; ajout de `form-action`, `base-uri 'self'`, `object-src 'none'` ; cache d'un an pour les polices ; redirections `/index` → `/` et `/blog` → `/blogue` | `vercel.json` | À vérifier sur l'aperçu Vercel (en-têtes servis) |
| 12 | Typographie française : espaces insécables avant « : ; ? ! » dans le contenu statique et le H1 de `/tarifs` | `build.js`, `pages.jsx` | Plus de « : » rejeté en début de ligne |

### Contenu et balises
| # | Modification | Avant → après |
|---|---|---|
| 13 | Title accueil | « Novio Studio — Sites web par abonnement pour entrepreneurs \| Gatineau · Ottawa · Outaouais » (95 car.) → « Création de site Web à Gatineau, par abonnement \| Novio Studio » |
| 14 | H1 accueil | « Un site Web professionnel, par abonnement. » → « Création de sites Web à Gatineau, par abonnement. » (même mise en forme, accent orange conservé) |
| 15 | Texte d'introduction accueil | Ajout de « site Web professionnel » et d'Ottawa (zone réellement desservie) |
| 16 | `/site-web` | Title « Conception de sites Web pour PME et entrepreneurs » ; H1 « Des sites Web d'entreprise conçus pour attirer des clients. » |
| 17 | `/tarifs` | Title « Prix d'un site Web : forfaits dès 129 $/mois » ; H1 « Prix d'un site Web : des tarifs simples et transparents. » |
| 18 | `/contact` | Title « Demander une soumission pour un site Web » |
| 19 | Descriptions | Réécrites pour les 4 pages (150 à 165 caractères), centrées sur la requête et l'offre |
| 20 | **Page `/en`** (nouvelle) : version anglaise de l'offre pour Ottawa (avantages, tableau des forfaits, étapes, présentation de Léo, FAQ, formulaire en anglais). Mêmes offres et conditions que le site français ; aucune donnée ajoutée | `content/en.js`, `pages.jsx` (formulaire bilingue), `Nav.jsx`, `Footer.jsx` |
| 21 | **Blogue `/blogue`** + 3 articles sourcés : coût d'un site Web, être trouvé sur Google, site Web ou réseaux sociaux. Aucune statistique inventée ; sources officielles Google et web.dev citées | `content/blog.js`, `content/blogue/*.html` |
| 22 | Navigation : lien « Blogue » et lien de langue « EN » / « FR » (en-tête, menu mobile, pied de page) | `Nav.jsx`, `Footer.jsx` |

### Mesure et conversion
| # | Modification | Détail |
|---|---|---|
| 23 | **GA4 optionnel, conforme à la Loi 25** : rien n'est chargé tant que `GA_MEASUREMENT_ID` n'est pas défini au build ET que le visiteur n'a pas accepté. Signaux Google et personnalisation publicitaire désactivés. Retrait du consentement depuis le pied de page (efface les témoins `_ga`) | `Analytics.jsx`, `Footer.jsx`, `build.js` ; testé avec un ID factice : bandeau affiché, GA chargé seulement après « Accepter », choix mémorisé |
| 24 | Événements de conversion, **sans donnée personnelle** : `generate_lead` (formulaire envoyé : forfait + langue), `form_error`, `click_phone`, `click_email`, `cta_quote_click` (zone de la page + forfait) | Vérifié dans `dataLayer` (`click_phone` avec `zone`) |
| 25 | **Politique de confidentialité corrigée** : la mention de Cloudflare Web Analytics (non installé) est remplacée par la description exacte de GA4 avec consentement ; mentions légales mises à jour | `Footer.jsx` |

### Analyse de conversion (phase 8)
Constats, sans modification supplémentaire du design :
- Les appels à l'action sont clairs et cohérents (« Demander une soumission » partout, forfait présélectionné depuis le tableau, téléphone cliquable, réponse en moins de 24 h). Rien à changer.
- **Frein principal : l'absence de preuve sociale** (portfolio « en construction », aucun avis). Ne peut pas être corrigé honnêtement par du code ; voir LOCAL_SEO_STRATEGY.md, section Avis, et CONTENT_CALENDAR.md (étude de cas n°1).
- Les conditions d'abonnement (dépassement d'heures, annulation) restent vagues dans la FAQ : à préciser pour lever une objection fréquente.
- Les articles se terminent par l'appel à l'action final et renvoient vers `/tarifs`, `/site-web` et `/contact`.
- Les visiteurs anglophones ont désormais un parcours complet (page + formulaire en anglais, objet de courriel marqué « EN »).

### Outils
| # | Outil | Commande |
|---|---|---|
| 26 | Tests PageSpeed relançables (toutes les pages du sitemap, mobile et desktop ; API PSI si `PSI_API_KEY`, sinon Lighthouse local) ; historique `seo-data/pagespeed/history.csv` | `npm run seo:speed` |
| 27 | OAuth Google en lecture seule (secrets dans `.secrets/`, ignoré par Git et Vercel) | `npm run seo:auth` |
| 28 | Extraction Search Console (28 j vs 28 j précédents, requêtes, pages, sitemaps, inspection d'indexation) | `npm run seo:gsc` |
| 29 | Extraction GA4 (utilisateurs, sessions, canaux, pages d'entrée, événements, géographie) | `npm run seo:ga` |
| 30 | Génération de SEO_REPORT.md avec comparaison des périodes | `npm run seo:report` (ou `npm run seo:all`) |

Les scripts `seo:auth`, `seo:gsc` et `seo:ga` **n'ont pas pu être testés contre les API réelles** (aucun accès Google n'est encore configuré). Seuls la syntaxe et le comportement sans identifiants ont été vérifiés.

### Résultats mesurés
Lighthouse 12.8.2, 15 nov. 2026 : 100 / 100 / 100 / 100 sur les 9 pages, mobile et desktop, **en local**. Avant (production) : performance mobile de 94 à 99, LCP mobile 2,5 s sur 3 pages. Conditions de mesure différentes : à confirmer en production après déploiement.

## En attente de votre part
1. Relire la branche `seo-optimisation` (aperçu Vercel), puis autoriser la fusion et le déploiement.
2. Corriger `www` (SEO_SETUP.md, étape 8).
3. Search Console, GA4, clé PageSpeed (SEO_SETUP.md, étapes 1 à 7).
4. Fiche Google Business Profile (LOCAL_SEO_STRATEGY.md).
5. Confirmer : heures d'ouverture, conditions d'annulation et de dépassement, service en anglais.
