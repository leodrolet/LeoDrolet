# SEO_AUDIT — Novio Studio (noviostudio.online)

Audit réalisé le 15 novembre 2026 sur le dépôt (`main`, commit `6e2d9f9`) et sur la production. Point de restauration : tag Git `pre-seo-2026-11-15`. Les corrections sont sur la branche `seo-optimisation` (non déployée).

**Limites de l'audit.** Aucune donnée Search Console ni Analytics n'était accessible (voir SEO_SETUP.md). Les constats viennent donc du code, du HTML servi en production, de Lighthouse 12.8.2 (exécuté en local contre la production, l'API PageSpeed refusant les appels sans clé) et d'une recherche manuelle des résultats Google. Aucun volume de recherche n'a pu être vérifié.

---

## 1. Inventaire du projet

| Élément | Constat |
|---|---|
| Technologie | Site statique multipage. JSX compilé par Babel, un bundle (`dist/bundle.min.js`), React 18.3.1 auto-hébergé, une feuille de style. Pas de framework ni de routeur. |
| Hébergement | Vercel (`cleanUrls`, en-têtes de sécurité, CSP stricte). DNS chez Cloudflare. |
| Pages indexables | 4 : `/`, `/site-web`, `/tarifs`, `/contact`. Redirection 301 `/automatisation` → `/tarifs`. |
| Offre | Abonnement : Croissance 129 $/mois, Premium 199 $/mois, 200 $ de frais de départ. Cible : entrepreneurs de services (couvreurs, plombiers, CVC, paysagistes, rénovateurs) en Outaouais. |
| Mesure d'audience | **Aucune** sur la production (ni GA, ni Cloudflare Analytics), alors que la politique de confidentialité annonçait Cloudflare Web Analytics. |
| Code mort | `src/sections.jsx`, `src/tweaks.jsx`, `src/tweaks-panel.jsx` et anciens fichiers dans `dist/` non utilisés par le build. Non supprimés (aucune autorisation demandée) ; ils ne sont pas chargés par le site. |

## 2. Problèmes identifiés

Échelles : **Criticité** (Critique / Élevée / Moyenne / Faible), **Impact SEO** (Fort / Moyen / Faible), **Difficulté** (Facile / Moyenne / Difficile), **Priorité** (P0 = immédiat … P3 = plus tard). Statut au 15 nov. 2026.

| # | Problème | Criticité | Impact | Difficulté | Priorité | Statut |
|---|---|---|---|---|---|---|
| 1 | **Contenu rendu uniquement en JavaScript.** Le HTML servi ne contenait qu'un `<div id="root">` vide et un bloc `<noscript>` résumé. Google doit exécuter le JS (deuxième vague d'indexation, plus lente et moins fiable) ; Bing, les aperçus de réseaux sociaux et les outils d'IA ne voyaient presque rien. | Critique | Fort | Moyenne | P0 | **Corrigé** : pré-rendu au build (`react-dom/server`) puis hydratation. |
| 2 | **Trop peu de pages pour se positionner.** 4 pages, aucune page de contenu, aucune page en anglais malgré le marché d'Ottawa. | Élevée | Fort | Moyenne | P0 | **Partiel** : page `/en`, blogue et 3 articles ajoutés ; calendrier éditorial pour la suite. |
| 3 | **Mots-clés principaux absents des H1.** Accueil : « Un site Web professionnel, par abonnement. » (ni « création », ni ville). | Élevée | Moyen | Facile | P0 | **Corrigé** : « Création de sites Web à Gatineau, par abonnement. » ; H1 de `/site-web` et `/tarifs` revus. |
| 4 | **Title de l'accueil trop long** (95 caractères, tronqué dans Google) et descriptions orientées métiers plutôt que requêtes. | Moyenne | Moyen | Facile | P0 | **Corrigé** : titles de 55 à 70 caractères, descriptions de 150 à 165. |
| 5 | **`www.noviostudio.online` renvoie une erreur 526** (proxy Cloudflare, certificat invalide). Perte des visiteurs qui tapent « www » et signal de qualité négatif. | Élevée | Moyen | Facile | P0 | **À faire par vous** (SEO_SETUP.md, étape 8). |
| 6 | **Aucune mesure** (GA4 absent) : impossible de savoir d'où viennent les demandes. | Élevée | Indirect | Facile | P0 | **Prêt** : GA4 avec consentement et événements de conversion ; reste à créer la propriété (étape 6). |
| 7 | **Search Console non connectée** à nos outils ; propriété à confirmer. | Élevée | Indirect | Facile | P0 | **À faire par vous** (étapes 1 à 5). |
| 8 | **Politique de confidentialité inexacte** (Cloudflare Analytics décrit mais non installé). Risque Loi 25 et perte de confiance. | Moyenne | Faible | Facile | P1 | **Corrigé** : politique réécrite (GA4 seulement avec accord, retrait possible). |
| 9 | **Police chargée depuis Google Fonts**, ressource bloquante (Lighthouse : environ 1,7 s d'économie possible sur mobile). LCP mobile 2,5 s sur 3 pages sur 4. | Moyenne | Moyen | Facile | P1 | **Corrigé** : Geist auto-hébergée et préchargée, CSS intégrée au HTML. |
| 10 | **Données structurées limitées** : un seul bloc `LocalBusiness` identique sur toutes les pages ; pas de fil d'Ariane, de FAQ, de `WebSite` ni d'article. | Moyenne | Moyen | Facile | P1 | **Corrigé** : `@graph` par page (ProfessionalService, Person, WebSite, WebPage, BreadcrumbList, FAQPage, BlogPosting). |
| 11 | **Sitemap écrit à la main**, dates figées, pas d'alternatives linguistiques. | Faible | Faible | Facile | P1 | **Corrigé** : sitemap généré au build, avec `hreflang` pour `/` et `/en`. |
| 12 | **Accessibilité : en-tête de tableau manquant** dans le tableau des forfaits (règle `td-has-header`). | Faible | Faible | Facile | P2 | **Corrigé** (`<th scope="col">`). |
| 13 | **Aucune preuve sociale** : portfolio « en construction », aucun avis. Freine la conversion et la notoriété locale. | Élevée | Moyen | Difficile (dépend des clients) | P1 | **Non corrigeable par du code** : rien n'a été inventé. Stratégie d'avis dans LOCAL_SEO_STRATEGY.md. |
| 14 | **Aucune fiche Google Business Profile** liée au site (non vérifiable sans accès). | Élevée | Fort (pack local) | Facile | P0 | **À faire par vous** : fiche prête dans LOCAL_SEO_STRATEGY.md. |
| 15 | **Aucun backlink connu**, aucun profil `sameAs`. | Élevée | Fort | Moyenne | P1 | Plan dans BACKLINK_STRATEGY.md. |
| 16 | **Conditions d'abonnement à confirmer** (dépassement d'heures, annulation) : réponses volontairement vagues dans la FAQ. | Moyenne | Faible (conversion) | Facile (décision) | P2 | **À confirmer par vous.** |
| 17 | `openingHours` (lun.-ven. 9 h-18 h) déclaré dans le schéma sans être affiché sur le site. | Faible | Faible | Facile | P2 | Conservé ; **à confirmer** ou à retirer. |
| 18 | Lien d'ancrage des boutons « Voir les forfaits » (`#forfaits`) et liens internes peu nombreux vers le contenu. | Faible | Faible | Facile | P2 | **Amélioré** : lien « Blogue » dans le menu et le pied de page, maillage depuis les articles. |

## 3. Constats par thème

### Indexabilité et exploration
- `robots.txt` correct (tout autorisé, sitemap déclaré). Aucune balise `noindex` sur les pages publiques ; `noindex` sur 404 et 500 (correct).
- Canonical présentes et cohérentes avec `cleanUrls`. Redirection `http → https` en 308 (correct).
- **Avant :** contenu absent du HTML (problème n°1). **Après :** chaque page contient son texte complet, ses titres et ses liens dans le HTML initial.

### Balises et structure
| Page | H1 avant | H1 après |
|---|---|---|
| `/` | Un site Web professionnel, par abonnement. | Création de sites Web à Gatineau, par abonnement. |
| `/site-web` | Des sites conçus pour attirer des clients. | Des sites Web d'entreprise conçus pour attirer des clients. |
| `/tarifs` | Des tarifs simples et transparents. | Prix d'un site Web : des tarifs simples et transparents. |
| `/contact` | Parlons de votre projet. | Inchangé (page de conversion). |

Hiérarchie H2/H3 déjà propre (un H2 par section, H3 pour les éléments). Un seul H1 par page sur les 9 pages (vérifié au build).

### Images
Deux images seulement : portrait (`leo.webp` 78 Ko avec repli JPEG, `alt` descriptif, dimensions déclarées, chargement différé) et image Open Graph (56 Ko). La maquette du hero est en HTML/CSS (aucune image). Rien à corriger.

### Performance (Lighthouse, avant)
| Page | Mobile | Desktop | LCP mobile |
|---|---|---|---|
| `/` | 94 | 99 | 2,5 s |
| `/site-web` | 99 | 100 | 1,6 s |
| `/tarifs` | 94 | 99 | 2,5 s |
| `/contact` | 94 | 100 | 2,5 s |

Cause principale : premier affichage dépendant du JS + police Google bloquante. Accessibilité, bonnes pratiques et SEO déjà à 100. Résultats après correction : voir SEO_REPORT.md (100 partout en local ; à reconfirmer en production).

### Sécurité et confiance
En-têtes solides (HSTS preload, CSP, X-Frame-Options, Referrer-Policy). La CSP a été adaptée : Google Fonts retiré, domaines GA4 autorisés, ajout de `form-action`, `base-uri` et `object-src`.

### Duplication
Pas de contenu dupliqué entre pages, mais la FAQ « abonnement » est répétée sur `/` et `/tarifs` : le balisage `FAQPage` n'est placé que sur `/tarifs`, comme le recommande Google pour du contenu répété.

### Concurrence observée (recherche manuelle, non géolocalisée)
- « création site web Gatineau » et « agence web Gatineau » : résultats dominés par des **annuaires** (hellodarwin, Clutch, Canpages) et des pages « ville » d'agences extérieures (digitad, h1site), plus une agence locale (Tonik Web Studio).
- « website design Ottawa » : **très concurrentiel** (agences établies, annuaires DesignRush, Clutch, UpCity).
- « site web par abonnement Québec » : **créneau peu occupé**, une seule offre comparable visible. C'est l'angle le plus réaliste à court terme.

## 4. Opportunités

1. **Abonnement** : positionner Novio Studio sur « site web par abonnement », « site web mensuel », « site web sans frais initiaux » (Québec, Gatineau).
2. **Métiers** : pages de services par métier (« site web pour couvreur », etc.) quand un premier projet réel peut illustrer chacune ; requêtes peu concurrentielles et très qualifiées.
3. **Local** : Google Business Profile (zone desservie, adresse masquée), annuaires gratuits et Chambre de commerce de Gatineau.
4. **Ottawa anglophone** : la page `/en` donne une base ; la concurrence impose de miser sur la longue traîne (« small business website monthly plan Ottawa », « website for contractors Ottawa »).
5. **Contenu** : questions de prix et de visibilité locale, où les résultats actuels sont surtout des articles génériques ou étrangers.

## 5. Plan d'exécution priorisé

| Priorité | Action | Responsable | Statut |
|---|---|---|---|
| P0 | Pré-rendu, titles, H1, schéma, sitemap, performance | Claude | Fait (branche `seo-optimisation`) |
| P0 | Relire et **déployer** la branche | **Vous** | En attente |
| P0 | Corriger `www` (526) | **Vous** (ou moi avec accord) | En attente |
| P0 | Search Console : validation, sitemap, connexion OAuth | **Vous** | En attente |
| P0 | Créer la fiche Google Business Profile | **Vous** | En attente (contenu prêt) |
| P1 | GA4 : propriété, `GA_MEASUREMENT_ID` dans Vercel, événements clés | **Vous** | Code prêt |
| P1 | Annuaires gratuits et Chambre de commerce | **Vous** | Liste prête (BACKLINK_STRATEGY.md) |
| P1 | Premier client : demander l'autorisation de le présenter + un avis | **Vous** | — |
| P2 | Publier 2 articles par mois (CONTENT_CALENDAR.md) | Claude + validation | Calendrier prêt |
| P2 | Confirmer les conditions d'abonnement et les heures d'ouverture | **Vous** | — |
| P3 | Pages métiers et page « Réalisations » quand des projets réels existent | Claude | Plus tard |
