# CONTENT_CALENDAR — 6 mois (décembre 2026 à mai 2027)

Rythme : **2 articles par mois**, publiés dans `/blogue`. Chaque article :
- répond à une intention de recherche précise (colonne « Requête cible ») ;
- ne contient **aucune statistique, citation ou étude de cas inventée** ; les faits renvoient à une source officielle ou à l'expérience réelle de Novio Studio ;
- contient au moins 2 liens internes (une page d'offre + un autre article) et un appel à l'action vers `/contact` ;
- est relu par vous avant publication.

## Déjà publiés (branche `seo-optimisation`, 15 nov. 2026)

| Article | Requête cible | Intention | Liens internes |
|---|---|---|---|
| Combien coûte un site Web pour une PME au Québec ? | combien coûte un site web | I / C | /tarifs, /site-web, /contact |
| Comment être trouvé sur Google quand on est une entreprise locale | être trouvé sur Google, référencement local | I | /tarifs, /contact |
| Site Web ou réseaux sociaux : que choisir pour une PME ? | site web ou réseaux sociaux | I | /tarifs, /site-web, article coût, /contact |

## Calendrier

| Mois | Article | Requête cible | Intention | Sources ou matière nécessaires | Liens internes |
|---|---|---|---|---|---|
| Déc. 2026 | Les 7 erreurs qui font perdre des clients sur un site d'entreprise | erreurs site web entreprise | I | Consignes Google (Search Central), web.dev ; observations concrètes (formulaire caché, pas de numéro cliquable, site non mobile) | /site-web, article Google |
| Déc. 2026 | Site Web par abonnement ou achat unique : comment choisir ? | site web par abonnement | C | Vos propres conditions (à confirmer : annulation, propriété du domaine) | /tarifs, article coût |
| Janv. 2027 | Créer sa fiche Google Business Profile : guide pas à pas pour les entrepreneurs | créer fiche Google entreprise | I | Aide officielle Google Business Profile ; captures d'écran réelles de l'interface | article Google, /contact |
| Janv. 2027 | Ce qu'un site d'entrepreneur en construction doit absolument contenir | site web entrepreneur construction | C | Exigences RBQ (afficher le numéro de licence : vérifier sur rbq.gouv.qc.ca), questions réelles de vos clients | /site-web, futur cas client |
| Févr. 2027 | Loi 25 : ce que votre site Web doit afficher (politique de confidentialité, témoins) | loi 25 site web | I | Commission d'accès à l'information (cai.gouv.qc.ca) ; **pas de conseil juridique**, renvoyer à la CAI | /site-web, /contact |
| Févr. 2027 | Wix, WordPress ou site sur mesure : quelle option pour une PME ? | wix ou wordpress pour PME | C | Documentation officielle de chaque plateforme ; pas de comparaison chiffrée non sourcée | /site-web, /tarifs |
| Mars 2027 | Comment obtenir plus d'avis Google (sans enfreindre les règles) | obtenir des avis Google | I | Règles Google sur les avis (support.google.com/business/answer/3474122, contributionpolicy/answer/7400114) | article Google |
| Mars 2027 | **Étude de cas n°1** : le site de [premier client] | — (marque, local) | C | **Uniquement si** un client réel accepte, avec ses vrais résultats ou sans résultats | /site-web, /tarifs |
| Avr. 2027 | Nom de domaine .ca ou .com : comment choisir et le protéger | nom de domaine .ca ou .com | I | Règles officielles de l'ACEI / CIRA (cira.ca) pour le .ca (exigences de présence canadienne) | article coût |
| Avr. 2027 | Que mettre sur la page d'accueil d'un site d'entreprise de services ? | page d'accueil site web entreprise | I | Expérience de conception ; exemples de structure (sans faux clients) | /site-web |
| Mai 2027 | Small business websites in Ottawa: monthly plan or one-time build? (EN) | website monthly plan Ottawa | C | Version anglaise adaptée de l'article de décembre | /en |
| Mai 2027 | Google Search Console pour les entrepreneurs : lire les 4 chiffres qui comptent | google search console débutant | I | Aide officielle Search Console ; captures d'écran réelles | article Google, /tarifs |

## Processus de publication

1. Rédiger le fragment HTML dans `content/blogue/<slug>.html` (mêmes conventions que les articles existants : `<h2>`, `<h3>`, listes, `.callout`, section « Sources »).
2. Ajouter l'entrée dans `content/blog.js` (titre, `metaTitle` de 70 caractères au maximum, description de 150 à 160, chapeau, dates, articles liés).
3. `npm run build` : la page, la liste du blogue, le JSON-LD `BlogPosting` et le sitemap sont générés automatiquement.
4. Vérifier localement, faire relire, déployer, puis demander l'indexation de l'URL dans Search Console.
5. Un mois après : vérifier dans `SEO_REPORT.md` si l'article reçoit des impressions sur sa requête cible ; enrichir ou réorienter sinon.

## Idées en réserve (selon les données Search Console)

- Questions réelles posées par des prospects (à noter après chaque appel découverte : c'est la meilleure source de sujets).
- Versions anglaises des articles qui fonctionnent en français.
- Pages métiers (couvreur, plombier, paysagiste, rénovateur) dès qu'un projet réel peut les illustrer.
