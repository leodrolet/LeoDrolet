# KEYWORD_STRATEGY — Novio Studio

Version du 15 novembre 2026.

## Sources et limites

- **Volumes de recherche : non disponibles.** Aucun outil de volume n'était accessible (Google Keyword Planner demande un compte Google Ads ; Semrush et Ahrefs sont payants). Aucun chiffre de volume n'apparaît donc dans ce document. Les colonnes « Volume » et « Difficulté » contiennent une **appréciation qualitative**, clairement indiquée comme telle.
- **Concurrence :** observée par recherche manuelle le 15 novembre 2026 (outil non géolocalisé, donc sans le pack local de Google Maps). Voir SEO_AUDIT.md, section « Concurrence observée ».
- **Search Console :** pas encore connectée. Dès qu'elle le sera, `npm run seo:report` listera les requêtes réelles ; ce document devra alors être révisé à partir de ces données.

Légende de l'intention : **T** = transactionnelle (cherche un fournisseur), **C** = commerciale (compare, cherche un prix), **I** = informationnelle (cherche une réponse).

## 1. Mot-clé principal par page

| Page | Mot-clé principal | Mots-clés secondaires | Intention | Priorité |
|---|---|---|---|---|
| `/` | création site web Gatineau | création de site Web Outaouais, site web par abonnement, concepteur site web Gatineau, site web professionnel PME Gatineau | T | P0 |
| `/site-web` | conception site web PME | site web pour entrepreneur, site web d'entreprise, site web pour entreprise de services, site web rapide et optimisé Google | T / C | P0 |
| `/tarifs` | prix site web | prix création site web Québec, combien coûte un site web, site web mensuel, site web sans frais initiaux | C | P0 |
| `/contact` | soumission site web Gatineau | devis site web, estimation site web | T | P1 |
| `/en` | small business website design Ottawa | website design Ottawa, web design Gatineau, affordable website design, monthly website plan, website for contractors Ottawa | T | P1 |
| `/blogue/combien-coute-un-site-web-pme-quebec` | combien coûte un site web | prix d'un site web au Québec, coût site web PME, site web achat ou abonnement | I / C | P1 |
| `/blogue/etre-trouve-sur-google-entreprise-locale` | être trouvé sur Google | référencement local Gatineau, apparaître sur Google Maps, fiche Google entreprise | I | P1 |
| `/blogue/site-web-ou-reseaux-sociaux` | site web ou réseaux sociaux | site web ou page Facebook entreprise, avoir un site web est-ce nécessaire | I | P2 |

## 2. Univers de mots-clés

### A. Local, français (cœur de cible)
| Mot-clé | Intention | Volume (appréciation) | Concurrence observée | Pertinence | Page |
|---|---|---|---|---|---|
| création site web Gatineau | T | Faible à moyen | Annuaires + agences externes | Très forte | `/` |
| agence web Gatineau | T | Faible à moyen | Annuaires (Clutch, hellodarwin), digitad | Moyenne (Novio n'est pas une agence ; l'accueil le dit) | `/` |
| concepteur site web Gatineau | T | Faible | Peu de pages dédiées | Très forte | `/` |
| création site web Outaouais | T | Faible | Faible | Très forte | `/` |
| développeur web Gatineau / freelance | T | Faible | Plateformes de freelance | Forte | `/` (section « Un humain, pas une agence ») |
| création site web Ottawa (fr) | T | Faible | Annuaires | Forte | `/` (mention Ottawa) ; page dédiée **non créée** tant qu'il n'y a pas de contenu propre à Ottawa |

### B. Offre (différenciation)
| Mot-clé | Intention | Volume (appréciation) | Concurrence observée | Pertinence | Page |
|---|---|---|---|---|---|
| site web par abonnement | T / C | Faible | **Très faible** (une seule offre visible) | Très forte | `/`, `/tarifs` |
| site web mensuel / site web à payer par mois | C | Faible | Faible | Très forte | `/tarifs` |
| site web sans frais initiaux | C | Faible | Faible | Forte | `/tarifs` |
| hébergement et maintenance site web inclus | C | Faible | Moyenne | Forte | `/site-web` |

### C. Prix (commercial)
| Mot-clé | Intention | Volume (appréciation) | Concurrence observée | Pertinence | Page |
|---|---|---|---|---|---|
| prix création site web | C | Moyen | Articles, annuaires | Forte | `/tarifs` + article coût |
| combien coûte un site web Québec | I / C | Moyen | Articles d'agences, hellodarwin | Forte | article coût |
| prix site web PME | C | Faible à moyen | Moyenne | Forte | article coût |

### D. Métiers (longue traîne, très qualifiée)
| Mot-clé | Intention | Volume (appréciation) | Concurrence observée | Pertinence | Page |
|---|---|---|---|---|---|
| site web pour entrepreneur en construction | C | Faible | Articles génériques, non locaux | Très forte | **À créer** quand un projet réel l'illustre |
| site web couvreur / plombier / paysagiste | C | Faible | Faible | Très forte | **À créer** (même condition) |
| site web pour rénovateur | C | Faible | Faible | Très forte | **À créer** |

Pourquoi attendre : une page métier sans exemple ni connaissance propre au métier serait du contenu « pour Google » (exclu par la mission). Elle devient utile dès qu'elle peut montrer un vrai projet, les besoins propres au métier et les questions que ces clients posent.

### E. Anglais (Ottawa, Canada)
| Mot-clé | Intention | Volume (appréciation) | Concurrence observée | Pertinence | Page |
|---|---|---|---|---|---|
| website design Ottawa | T | Moyen à élevé | **Très forte** (agences, DesignRush, Clutch) | Forte | `/en` (objectif à long terme) |
| web development Ottawa small business | T | Faible à moyen | Annuaires | Forte | `/en` |
| small business website design Ottawa | T | Faible à moyen | Forte | Très forte | `/en` |
| affordable website design Ottawa / Canada | C | Moyen | Forte, nationale | Moyenne | `/en` |
| website monthly plan / website subscription Canada | C | Faible | Moyenne | Très forte | `/en` |
| website for contractors Ottawa | C | Faible | Faible | Très forte | `/en` ; page dédiée plus tard |

### F. Informationnel (blogue)
Voir CONTENT_CALENDAR.md : chaque article vise une question précise (prix, visibilité locale, choix de plateforme, erreurs fréquentes, Loi 25 pour les sites de PME, etc.).

## 3. Règles d'optimisation appliquées

- Un mot-clé principal par page, jamais deux pages sur la même requête (pas de cannibalisation entre `/` et `/tarifs` : « création » d'un côté, « prix » de l'autre).
- Mot-clé principal dans le `title`, le H1, la meta description et le premier paragraphe, **formulé naturellement**.
- Pas de bourrage de mots-clés ni de pages « ville » interchangeables.
- Le français reste la langue principale ; `/en` n'est pas une traduction mot à mot mais la version anglaise de l'accueil (lien `hreflang`).

## 4. Objectifs mesurables (à 6 mois, à valider avec les premières données)

Ces objectifs sont des cibles de travail, pas des promesses de classement.
1. Les 9 URL du sitemap sont indexées (Search Console, inspection d'URL).
2. Novio Studio reçoit des impressions sur au moins 5 des 8 mots-clés principaux du tableau 1.
3. Première page (positions 1 à 10) sur au moins une requête « abonnement » et une requête « Gatineau ».
4. Au moins une demande de soumission par mois attribuée à la recherche organique (événement `generate_lead`, canal « Organic Search » dans GA4).

## 5. Révision

Tous les mois, après `npm run seo:all` :
- ajouter les requêtes réelles qui génèrent des impressions ;
- traiter en priorité les requêtes en position 5 à 20 (section « Opportunités » du rapport) en enrichissant la page qui ressort ;
- créer un contenu seulement pour une intention qui n'a pas encore de page.
