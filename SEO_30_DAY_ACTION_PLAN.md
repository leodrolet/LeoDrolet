# SEO_30_DAY_ACTION_PLAN — 16 novembre au 15 décembre 2026

Responsables : **L** = Léo (action dans vos comptes ou décision) ; **C** = Claude (travail dans le projet, sur votre demande). Effort = temps actif estimé, pas un délai d'attente. Aucune action ne promet une position sur Google.

## Semaine 1 (16 au 22 nov.) — Rendre le site mesurable et accessible

| # | Action | Priorité | Resp. | Effort | Délai | Dépend de | Indicateur de réussite |
|---|---|---|---|---|---|---|---|
| 1.1 | Corriger `www` : ajouter le domaine dans Vercel (308), CNAME DNS only dans Cloudflare (SEO_TECHNICAL_REPORT.md, 4.1) | Critique | L | 10 min | 17 nov. | — | `curl -sI https://www.noviostudio.online` → 308 vers `https://noviostudio.online/` |
| 1.2 | Relire la branche `seo-30-jours`, pousser l'aperçu, puis fusionner dans `main` | Critique | L (C prépare) | 20 min | 18 nov. | — | `/site-web/` → 308 ; `/content/blogue/…` → 301 ; `npm run seo:check` : 0 erreur |
| 1.3 | Créer la propriété Search Console (type Domaine, TXT dans Cloudflare) et soumettre le sitemap | Critique | L | 20 min | 18 nov. | 1.2 | Sitemap « Opération effectuée », 9 URL découvertes |
| 1.4 | Demander l'indexation des 9 URL (inspection d'URL) | Élevée | L | 15 min | 19 nov. | 1.3 | Inspection : « L'URL est sur Google » pour chaque page dans les 2 à 3 semaines |
| 1.5 | Créer GA4, ajouter `GA_MEASUREMENT_ID` dans Vercel, redéployer | Critique | L | 20 min | 19 nov. | 1.2 | Temps réel GA4 : votre visite et `click_phone` visibles après « Accepter » |
| 1.6 | Marquer `generate_lead`, `click_phone`, `click_email` comme événements clés | Élevée | L | 5 min | 19 nov. | 1.5 | Les 3 événements apparaissent dans « Événements clés » |
| 1.7 | Clé API PageSpeed, puis `npm run seo:speed` en production | Moyenne | L | 15 min | 20 nov. | 1.2 | `history.csv` contient une mesure de production pour les 9 URL |
| 1.8 | Répondre aux 5 décisions : heures, taxes, annulation, dépassement, admissibilité GBP | Élevée | L | 30 min | 21 nov. | — | Réponses écrites ; C met à jour FAQ, JSON-LD et article 4 |
| 1.9 | Clutch, YP.ca, 411.ca avec le bloc NAP (LOCAL_SEO_EXECUTION.md, section 4) | Élevée | L | 45 min | 22 nov. | — | 3 fiches créées, URL notées dans le tableau de suivi |

## Semaine 2 (23 au 29 nov.) — Visibilité locale et premier contenu

| # | Action | Priorité | Resp. | Effort | Délai | Dépend de | Indicateur de réussite |
|---|---|---|---|---|---|---|---|
| 2.1 | Créer Google Business Profile (si admissible), lancer la validation | Très élevée | L | 45 min + validation | 24 nov. | 1.8 | Fiche en cours de validation ou validée |
| 2.2 | Relire et publier l'article couvreur | Élevée | L relit, C publie | 30 min | 24 nov. | 1.2 | Page en ligne, sitemap à 10 URL, indexation demandée |
| 2.3 | Mettre à jour FAQ, `/tarifs` et JSON-LD selon les décisions 1.8 | Élevée | C | 1 h | 26 nov. | 1.8 | Plus aucune réponse « précisées dans votre entente » sans détail |
| 2.4 | Courriels LABoite (Cégep) et CJEO (BACKLINK_PROSPECTS.md, modèle A) | Moyenne | L | 30 min | 27 nov. | — | 2 courriels envoyés |
| 2.5 | Bing Places (importation depuis Google) | Moyenne | L | 15 min | 29 nov. | 2.1 validée | Fiche Bing validée |

## Semaine 3 (30 nov. au 6 déc.) — Contenu et réseau

| # | Action | Priorité | Resp. | Effort | Délai | Dépend de | Indicateur de réussite |
|---|---|---|---|---|---|---|---|
| 3.1 | Publier l'article plombier | Élevée | L relit, C publie | 30 min | 1er déc. | 2.2 | En ligne et soumis à l'indexation |
| 3.2 | Première publication sur la fiche Google + demande d'avis à toute personne qui a déjà travaillé avec vous (si applicable) | Moyenne | L | 20 min | 2 déc. | 2.1 | Publication en ligne ; demandes envoyées selon les règles |
| 3.3 | Décision : **une** adhésion (CCG, RGA ou Ottawa Board of Trade) | Moyenne | L | 30 min | 5 déc. | — | Décision prise, budget noté |
| 3.4 | Premier relevé Search Console (`npm run seo:gsc`) | Élevée | L | 10 min | 6 déc. | 1.3 + 2 semaines | Rapport : pages indexées, premières impressions |

## Semaine 4 (7 au 15 déc.) — Conversion et bilan

| # | Action | Priorité | Resp. | Effort | Délai | Dépend de | Indicateur de réussite |
|---|---|---|---|---|---|---|---|
| 4.1 | Publier l'article « plus de demandes de soumission » | Élevée | L relit, C publie | 30 min | 8 déc. | 3.1 | En ligne et soumis |
| 4.2 | Compléter l'article 4 (129 $/mois) avec les réponses 1.8, puis publier | Élevée | C, L valide | 45 min | 15 déc. | 1.8 | Aucun marqueur « À CONFIRMER » restant |
| 4.3 | Proposition de présentation à l'APCHQ (modèle D) | Moyenne | L | 20 min | 10 déc. | 2.2, 3.1 | Courriel envoyé |
| 4.4 | Si un premier client est livré : fiche de collecte d'étude de cas, demande d'avis, demande de mention en pied de page | Très élevée | L | 1 h | dès la livraison | Client réel | Accord écrit obtenu ; projet ajouté à `realisations.js` |
| 4.5 | Bilan : `npm run seo:all`, mise à jour de SEO_REPORT.md et SEO_PROGRESS_REPORT.md | Élevée | L lance, C analyse | 30 min | 15 déc. | 1.3, 1.5 | Rapport avec données réelles (indexation, impressions, événements) |

## Ce qui n'est pas dans ces 30 jours (volontairement)
- Pages « ville » (Hull, Aylmer…) : pas de pages satellites interchangeables.
- Pages métiers dédiées : quand un projet réel pourra les illustrer.
- Publicité payante, achat de liens, annuaires payants.
- Refonte du formulaire : attendre 4 à 6 semaines de données GA4.

## Indicateurs à 30 jours (réalistes)
Le SEO réagit en semaines ; à 30 jours, on mesure surtout que **les fondations fonctionnent** :
- `www` redirige en 308, aucune erreur 526.
- Search Console connectée, sitemap traité, la majorité des URL indexées.
- GA4 actif, événements visibles en Temps réel.
- 3 à 6 citations locales créées avec le même NAP.
- 3 nouveaux articles publiés (le 4e quand les conditions seront confirmées).
- Premières impressions Search Console sur des requêtes de marque et de service (aucun objectif chiffré : pas de données de départ).
