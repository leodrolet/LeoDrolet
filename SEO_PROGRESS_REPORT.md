# SEO_PROGRESS_REPORT — Novio Studio

Rapport du 15 novembre 2026. Aucune donnée de trafic n'est disponible (Search Console et GA4 non connectés) : ce rapport décrit l'état technique et le travail réalisé, sans aucun chiffre estimé.

## 1. État initial (vérifié le 15 nov.)

- **Chantier SEO du 15 nov. : en production** (`main` = commit `2cf6975`, déploiement Vercel READY). Pré-rendu, titles, H1, `/en`, blogue de 3 articles, JSON-LD, sitemap, police auto-hébergée : en ligne.
- `www.noviostudio.online` : **erreur 526**. Cause identifiée : proxy Cloudflare actif sur `www` et domaine absent du projet Vercel.
- GA4 : **inactif** en production (aucune balise, aucun témoin).
- Search Console, clé PageSpeed, Google Business Profile : **non configurés**.
- Avis Google, portfolio public, backlinks significatifs : **aucun**.

## 2. Actions effectuées

| Mission | Réalisé | Livrable |
|---|---|---|
| 1. Technique et analytics | Audit complet (production + code) ; cause du 526 établie avec les données Vercel ; correction préparée pas à pas ; 4 corrections locales (barre oblique finale, fragments `/content`, `noindex` sur les sources, title trop long) ; nouveau contrôle `npm run seo:check` ; revue du consentement et des 5 événements GA4 | SEO_TECHNICAL_REPORT.md |
| 2. SEO local | Admissibilité GBP vérifiée dans les consignes de Google, décision ramenée à une question factuelle ; fiche complète FR et EN ; bloc NAP officiel ; 8 inscriptions avec liens et conditions vérifiées | LOCAL_SEO_EXECUTION.md |
| 3. Confiance et portfolio | Audit des éléments de confiance ; 7 objections et réponses manquantes ; structure `/realisations` qui ne se publie qu'avec un projet réel et approuvé ; modèles d'avis et processus de témoignages | CONFIANCE_ET_PORTFOLIO.md, `content/realisations.js`, `build.js` |
| 4. Contenu | 4 articles complets (environ 1 000 à 1 300 mots chacun), sources officielles (RBQ, CMMTQ, Loi 25, Google), maillage interne, enregistrés comme brouillons non publiés | CONTENT_DRAFTS.md, `content/blogue/*.html`, `content/blog.js` |
| 5. Backlinks | 15 opportunités priorisées, vérifiées (site, coût, contact) ; 5 modèles de courriels | BACKLINK_PROSPECTS.md |
| Plan | 30 jours, 23 actions avec responsable, effort, délai, dépendance et indicateur | SEO_30_DAY_ACTION_PLAN.md |

Toutes les modifications de code sont sur la branche locale `seo-30-jours`. **Rien n'a été poussé, déployé, publié, ni envoyé à quiconque.** Aucun réglage DNS ou Vercel n'a été modifié.

## 3. Résultats vérifiés

| Vérification | Résultat |
|---|---|
| Build reproductible | Empreinte du bundle identique à la production avant et après modifications |
| `npm run seo:check` (9 URL) | 0 erreur, 0 avertissement |
| Brouillons | Absents du build normal ; 4 pages valides avec `PREVIEW_DRAFTS=1` |
| Structure Réalisations | Génère les pages avec un projet de test ; refuse un résultat sans source |
| Redirections en production | `/blog`, `/index`, `/automatisation`, `*.html` → OK |
| Faits des articles | Vérifiés sur rbq.gouv.qc.ca, documents de la CMMTQ, quebec.ca (Loi 25), support.google.com |

## 4. Actions bloquées (votre intervention)

| Action | Ce qu'il faut | Où sont les instructions |
|---|---|---|
| Corriger `www` | Vos comptes Vercel et Cloudflare (10 min) | SEO_TECHNICAL_REPORT.md, 4.1 |
| Déployer la branche | Votre relecture et votre accord | SEO_TECHNICAL_REPORT.md, 4.2 |
| Activer GA4 | Un ID de mesure de votre compte | SEO_TECHNICAL_REPORT.md, 4.3 |
| Search Console, clé PageSpeed | Votre compte Google | SEO_SETUP.md, étapes 1 à 5 et 7 |
| Google Business Profile | Confirmer que vous rencontrez vos clients en personne | LOCAL_SEO_EXECUTION.md, section 2 |
| Article 4 et FAQ | Taxes, engagement, annulation, dépassement, heures | CONFIANCE_ET_PORTFOLIO.md, section 6 |
| Inscriptions et prises de contact | Vos comptes ; votre accord pour chaque envoi | LOCAL_SEO_EXECUTION.md, BACKLINK_PROSPECTS.md |

## 5. Prochaines étapes
Voir SEO_30_DAY_ACTION_PLAN.md. Les trois actions qui débloquent tout le reste : **corriger `www`, déployer la branche, connecter Search Console et GA4** (semaine 1, environ 1 h au total de votre côté).

## 6. Mesures à surveiller (à partir de la connexion des outils)

| Mesure | Outil | Fréquence | Ce qui compte |
|---|---|---|---|
| Pages indexées / pages du sitemap | Search Console (Pages) | Hebdomadaire le 1er mois | Toutes les URL publiées indexées |
| Impressions et clics organiques | Search Console (Performances) | Mensuelle | Croissance d'un mois à l'autre, par page |
| Requêtes en positions 5 à 20 | `npm run seo:report` | Mensuelle | Pages à enrichir en priorité |
| Demandes de soumission (`generate_lead`) | GA4 | Mensuelle | Par source (organique, fiche Google, direct) |
| Appels (`click_phone`) | GA4 + statistiques de la fiche Google | Mensuelle | Idem |
| Taux de conversion | GA4 : `generate_lead` / sessions | Mensuelle | Évolution, pas une valeur absolue (beaucoup de visiteurs refusent la mesure) |
| Visibilité locale | Statistiques de la fiche Google | Mensuelle | Vues, appels, clics vers le site |
| Avis | Fiche Google | À chaque projet | Avis réels, réponses en 48 h |
| Liens et citations | Tableaux de suivi (LOCAL_SEO_EXECUTION.md, BACKLINK_PROSPECTS.md) ; Search Console (Liens) | Mensuelle | Qualité et pertinence, pas le nombre |
| Performance réelle | `npm run seo:speed` (avec clé : données terrain CrUX) | Mensuelle | Signaux Web essentiels « Bons » |

Rappel : GA4 ne compte que les visiteurs qui acceptent la mesure (Loi 25). Les chiffres GA4 sont donc un minimum ; les demandes réellement reçues (Formspree, téléphone) restent la référence.
