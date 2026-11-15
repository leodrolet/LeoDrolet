# CONFIANCE_ET_PORTFOLIO — Audit, objections, réalisations et avis

Version du 15 novembre 2026. Aucun projet, témoignage, avis ou résultat n'a été créé.

## 1. Éléments de confiance présents sur le site (audit du 15 nov.)

| Élément | Où | Évaluation |
|---|---|---|
| Prix publiés, frais de départ clairs (200 $, une fois) | /tarifs, accueil, FAQ, JSON-LD | **Fort.** Rare dans le secteur ; c'est votre meilleur argument de confiance |
| Le fondateur nommé, avec photo et présentation | Accueil (section studio) | **Fort.** « Vous parlez à la personne qui fait le travail » |
| Téléphone et courriel visibles et cliquables | En-tête mobile, pied de page, /contact | Bon |
| Délai de réponse annoncé (« moins de 24 h ») | /contact, FAQ, appel final | Bon, si tenu |
| Processus en 3 étapes après la demande | /contact | Bon : réduit l'incertitude |
| Domaine au nom du client | FAQ | **Fort** pour un abonnement |
| Politique de confidentialité conforme (Loi 25) et mentions légales | Pied de page | Bon |
| Maquette « Rénovations Exemple » clairement identifiée comme démonstration | Accueil | Honnête ; à garder ainsi |
| Portfolio | Accueil, « en construction, 4 places fondateur » | **Faible** : aucune preuve de travail livré |
| Avis clients | Aucun | **Absent** (le composant Testimonials n'affiche rien, à juste titre) |
| Conditions d'abonnement (annulation, dépassement, engagement) | FAQ | **Vagues** : renvoient à « l'entente de service » |
| Taxes | Nulle part | **Absent** : « 129 $/mois » sans mention « taxes en sus » ou « taxes incluses » |
| Identité légale (NEQ, nom légal) | Mentions légales | À vérifier : un numéro d'entreprise visible rassure les clients prudents |

## 2. Objections probables d'un entrepreneur qui découvre Novio Studio

| Objection | Réponse actuelle du site | Ce qui manque | Action proposée |
|---|---|---|---|
| « Avez-vous déjà fait des sites pour des gens comme moi ? » | Portfolio en construction | Un seul projet réel suffit à changer la perception | Priorité n° 1 : livrer et documenter le premier projet (section 3) |
| « Si j'arrête de payer, je perds mon site ? » | « Modalités précisées dans votre entente » | Une réponse claire en une phrase | **Vous** fixez la règle (récupération du contenu ? du site ? à quel prix ?), je l'écris dans la FAQ et l'article 4 |
| « Suis-je engagé pour un an ? » | Non précisé | Durée d'engagement | Idem |
| « Les taxes sont-elles incluses ? » | Non précisé | Mention fiscale | Idem. Si vous n'êtes pas inscrit aux taxes (petit fournisseur), vérifiez votre situation auprès de Revenu Québec ou d'un comptable avant d'écrire quoi que ce soit |
| « Une seule personne : que se passe-t-il si vous êtes malade ou partez ? » | Rien | Plan de continuité | Une phrase honnête : sauvegardes, accès au domaine au nom du client, documentation remise |
| « 1 h de modifications, c'est quoi concrètement ? » | FAQ générale | Exemples | Trois exemples concrets dans la FAQ (changer un prix, ajouter 5 photos, nouvelle page de service = environ X) — à chiffrer par vous |
| « Étudiant : est-ce sérieux ? » | Non abordé | — | Ne pas le cacher ni le mettre en avant : la preuve viendra des projets livrés et des avis |

## 3. Page /realisations : décision et structure

**Décision :** pas de page /realisations publiée tant qu'il n'y a pas au moins un projet réel. Une page vide ou remplie de « places disponibles » serait du contenu mince pour Google et n'apporte aucune preuve au visiteur. La section actuelle de l'accueil (« portfolio en construction ») reste honnête et suffit.

**Ce qui est prêt dans le projet :**
- `content/realisations.js` : liste vide, avec le modèle documenté de chaque projet (présentation du client, problème initial, solution, fonctionnalités, résultats vérifiables, captures d'écran, témoignage facultatif) et la preuve de l'accord du client (`consent`, non affichée).
- `build.js` : dès qu'un projet a `published: true`, le build génère `/realisations` (liste) et `/realisations/<slug>` (étude de cas), avec fil d'Ariane, données structurées et entrée dans le sitemap.
- Garde-fous : le build **échoue** si un projet publié n'a pas d'accord écrit, de client, de problème ou de solution, ou si un résultat n'a pas de source et de période.

**À faire au premier projet publié :** ajouter un lien « Réalisations » dans le menu et remplacer la section « places fondateur » de l'accueil par les vrais projets (modification de `Portfolio.jsx`, 15 minutes).

### Fiche de collecte d'une étude de cas (à remplir avec le client)

1. Nom de l'entreprise, métier, ville, site Web.
2. Situation avant : pas de site, ancien site, page Facebook seulement ? Qu'est-ce qui posait problème ? (citer le client si possible)
3. Objectif du client.
4. Ce qui a été conçu : pages, fonctionnalités, choix importants.
5. Captures d'écran : accueil (ordinateur et téléphone), une page de service, le formulaire.
6. Résultats **mesurés** seulement, avec source et période : demandes reçues par le formulaire (Formspree / GA4), appels depuis le site (`click_phone`), impressions et clics (Search Console). Si rien n'est encore mesurable : aucun résultat, et c'est correct.
7. Témoignage : citation exacte, approuvée par écrit, nom et rôle.
8. Accord écrit pour publier : nom de l'entreprise, captures, citation. Conserver le courriel.

## 4. Demande d'avis Google (modèles)

Règles Google : demander à **tous** les clients (pas seulement aux satisfaits), aucune récompense, aucun rabais, aucun avis rédigé à la place du client.

### Courriel — à la mise en ligne

**Objet :** Votre site est en ligne

> Bonjour [prénom],
>
> Votre site est en ligne : [adresse du site]. Merci de votre confiance.
>
> Si vous avez deux minutes, un avis sur Google m'aiderait beaucoup : c'est ainsi que d'autres entrepreneurs de la région trouvent Novio Studio. Voici le lien direct : [lien d'avis de la fiche Google]
>
> Et pour toute modification, écrivez-moi simplement.
>
> Léo

### Texto — relance unique, 7 jours plus tard (si aucun avis)

> Bonjour [prénom], c'est Léo de Novio Studio. Petit rappel, sans obligation : si vous avez un moment pour un avis Google sur votre expérience, voici le lien : [lien]. Merci !

### Réponse à un avis (dans les 48 h)
- Positif : remercier par le prénom, mentionner un détail réel du projet, une phrase.
- Négatif : remercier, reconnaître le problème sans se défendre, proposer de régler la situation en privé (téléphone), puis revenir répondre une fois réglé.

## 5. Processus de collecte de témoignages authentiques

1. **À 30 jours de la mise en ligne**, appel ou courriel : « Qu'est-ce qui a changé pour vous depuis le nouveau site ? » Notez la réponse mot pour mot.
2. Si le client dit quelque chose d'utile, envoyez-lui **la citation exacte** que vous aimeriez publier, avec l'endroit où elle apparaîtra (site, fiche Google, Clutch).
3. Publiez seulement après son accord écrit (courriel). Conservez-le.
4. Ajoutez le témoignage dans `TESTIMONIALS` (`src/components/pages.jsx`) : le composant ne montre que les entrées réelles.
5. Ne modifiez jamais le sens d'une citation. Une correction d'orthographe se fait avec l'accord du client.

## 6. Clarté des forfaits et des conditions : modifications proposées (attendent vos réponses)

| Sujet | Texte actuel | Texte proposé (à compléter par vous) |
|---|---|---|
| Taxes | — | Sous les prix : « Taxes en sus. » ou « Taxes incluses. » |
| Annulation | « précisées dans votre entente » | « Sans engagement après [durée]. Préavis de [X] jours. À l'annulation, [ce que le client récupère]. » |
| Dépassement | « estimation claire » | « Au-delà des heures incluses : [tarif] $ l'heure, toujours sur approbation. » |
| Frais de départ | 200 $, une fois | Ajouter ce qu'ils couvrent (« mise en place, prise de besoins, configuration du domaine ») si c'est exact |

Dès que vous me donnez ces quatre réponses, je mets à jour la FAQ, `SUBSCRIPTION_TERMS`, la page /tarifs et l'article 4, et je retire les marqueurs « À CONFIRMER ».

## 7. Formulaire et appels à l'action
Vérifiés sur /contact en production : formulaire court (forfait, nom, téléphone facultatif, courriel, projet, consentement), message de succès et d'erreur, pot de miel antipourriel, téléphone et courriel en alternative, forfait présélectionné depuis /tarifs. **Aucun changement recommandé** pour l'instant : sans données GA4, toute modification serait une supposition. Après 4 à 6 semaines de mesure : comparer `cta_quote_click` (intention) et `generate_lead` (envoi) ; un écart important signalerait un frein dans le formulaire.
