# CONTENT_DRAFTS — 4 articles SEO, prêts à réviser

Version du 15 novembre 2026. **Aucun article n'est publié.** Chaque article existe dans le projet sous deux formes :
- le corps : `content/blogue/<slug>.html` (source de vérité ; ce document est généré à partir de ces fichiers) ;
- les métadonnées : `content/blog.js`, avec `draft: true`. Tant que `draft: true` est présent, le build n'en tient pas compte (ni page, ni sitemap, ni liste du blogue).

Prévisualiser en local :
```bash
PREVIEW_DRAFTS=1 npm run build && npx serve . -l 5055   # puis http://localhost:5055/blogue
npm run build                                            # IMPORTANT : rebuild normal avant tout commit
```

Publier un article (après votre validation) : retirer `draft: true` de son entrée dans `content/blog.js`, ajuster `date` et `updated` au jour réel, `npm run build && npm run seo:check`, déployer, puis demander l'indexation de l'URL dans Search Console.

## Choix éditoriaux

- **Pas de répétition** avec les 3 articles existants : l'article « coût d'un site pour une PME » couvre les postes de coût en général ; l'article couvreur traite de ce qu'un site de *toiture* doit contenir (dont la licence RBQ) et renvoie vers le guide général pour le détail des coûts.
- **Aucune statistique, fourchette de prix du marché ou étude inventée.** Les seuls chiffres sont vos propres tarifs. Les faits externes (RBQ, CMMTQ, Loi 25, Google) renvoient à des sources officielles listées en fin d'article.
- **Article 4 : 12 marqueurs [À CONFIRMER].** Taxes, engagement, annulation, sort du site après annulation, tarif de dépassement, renouvellement du domaine, contenu (textes et photos), définition exacte du « SEO de base », outil de statistiques, ce que couvrent les frais de départ, éléments hors forfait. Je ne les invente pas : l'article ne peut pas être publié tant qu'ils ne sont pas remplacés.
- **Version anglaise :** recommandée **seulement pour l'article 4** (le marché d'Ottawa compare les offres par abonnement), et seulement **après** vos réponses aux points à confirmer, pour ne pas traduire des trous. Les articles couvreur et plombier reposent sur des obligations propres au Québec (RBQ, CMMTQ) : une traduction directe n'aiderait pas un entrepreneur ontarien. L'article 3 pourra être adapté plus tard si Search Console montre une demande anglophone.
- **Calendrier proposé :** une publication par semaine (dates dans `blog.js`), ce qui laisse le temps de relire chaque texte.

## Récapitulatif

| # | Slug (URL) | Mot-clé | H1 | Title (car.) | Meta description (car.) | Publication prévue |
|---|---|---|---|---|---|---|
| 1 | `/blogue/prix-site-web-couvreur-quebec` | site web couvreur | Combien coûte un site Web pour un couvreur au Québec ? | Prix d'un site Web pour couvreur au Québec : le guide complet (61) | Ce qu'un site de couvreur doit contenir (licence RBQ, services, zone, photos), ce qui fait varier son prix et les questions à poser avant de signer une offre. (158) | 2026-11-24 |
| 2 | `/blogue/site-web-plombier` | site web plombier | Pourquoi votre entreprise de plomberie a besoin d'un site Web | Site Web pour plombier : pourquoi en avoir un et quoi y mettre (62) | Être trouvé au moment d'une urgence, prouver vos qualifications (RBQ, CMMTQ) et faciliter l'appel sur mobile : ce qu'un site de plombier doit contenir. (151) | 2026-12-01 |
| 3 | `/blogue/plus-de-demandes-de-soumission-site-web` | site web entrepreneur | Comment obtenir plus de demandes de soumission grâce à son site Web | Site Web d'entrepreneur : obtenir plus de demandes de soumission (64) | Message clair, formulaire court, téléphone cliquable, preuves vérifiables, vitesse et mesure : les points à corriger pour que votre site génère des soumissions. (160) | 2026-12-08 |
| 4 | `/blogue/site-web-129-par-mois-inclus` | site web par abonnement | Site Web à 129 $/mois : qu'est-ce qui est réellement inclus ? | Site Web par abonnement à 129 $/mois : ce qui est vraiment inclus (65) | Le détail du forfait Croissance de Novio Studio : création, hébergement, domaine, sécurité, maintenance, modifications et SEO, et ce qui n'est pas inclus. (154) | 2026-12-15 |

---

# Article 1 — Combien coûte un site Web pour un couvreur au Québec ?

- **URL :** `/blogue/prix-site-web-couvreur-quebec`
- **Mot-clé principal :** site web couvreur
- **Title :** Prix d'un site Web pour couvreur au Québec : le guide complet
- **Meta description :** Ce qu'un site de couvreur doit contenir (licence RBQ, services, zone, photos), ce qui fait varier son prix et les questions à poser avant de signer une offre.
- **Chapeau :** Ce dont un site de couvreur a vraiment besoin, ce qui fait varier son prix et comment comparer deux soumissions sans mauvaise surprise.
- **Longueur :** environ 1270 mots
- **Liens internes :** /blogue/combien-coute-un-site-web-pme-quebec, /contact, /site-web, /tarifs
- **Articles liés :** combien-coute-un-site-web-pme-quebec, plus-de-demandes-de-soumission-site-web

## H1 : Combien coûte un site Web pour un couvreur au Québec ?

Vous êtes couvreur et vous vous demandez combien coûte un site Web pour votre entreprise ? La réponse dépend moins du métier que de ce que le site doit accomplir : être trouvé quand un propriétaire cherche un couvreur dans votre secteur, inspirer confiance en quelques secondes et transformer cette visite en demande de soumission. Ce guide explique ce dont un site de couvreur a réellement besoin, ce qui fait varier le prix, et comment comparer deux offres sans vous faire surprendre.

> **En bref :** un site de couvreur efficace n'a pas besoin d'être gros. Cinq à huit pages bien construites suffisent souvent. Le prix varie surtout selon le niveau de personnalisation, le contenu à produire (textes, photos) et ce qui est inclus après la mise en ligne : hébergement, sécurité, mises à jour et modifications.

## Ce qu'un site de couvreur doit contenir

Avant de parler de prix, il faut savoir ce qu'on achète. Pour une entreprise de toiture, les éléments essentiels sont assez clairs.

### Votre numéro de licence RBQ, bien visible

Ce n'est pas un détail de présentation : la Loi sur le bâtiment oblige l'entrepreneur à indiquer son numéro de licence dans toute forme de publicité, et la Régie du bâtiment du Québec précise que cela comprend le site Web de l'entreprise, sous la forme « Licence RBQ : XXXX-XXXX-XX ». C'est aussi un élément de confiance : la RBQ invite les consommateurs à vérifier la licence d'un entrepreneur dans son registre avant de lui confier des travaux. Un site qui affiche clairement ce numéro, dans le pied de page de chaque page, facilite cette vérification.

### Une page par service

Réfection complète, réparation de fuite, bardeaux d'asphalte, toiture plate (membrane élastomère, TPO), déneigement de toiture, inspection : chaque service mérite sa propre page. Quelqu'un qui cherche « réparation de toiture » ne cherche pas la même chose que quelqu'un qui planifie un remplacement complet. Une page dédiée répond précisément à sa question et donne à Google une raison claire de la montrer.

### Votre zone desservie

Indiquez les secteurs où vous travaillez réellement : Gatineau (Hull, Aylmer, Gatineau, Buckingham, Masson-Angers), Cantley, Chelsea, Val-des-Monts, ou Ottawa si vous y travaillez aussi. Une simple liste claire, sur la page de contact et dans le pied de page, évite les appels hors secteur et aide les clients de votre zone à se reconnaître.

### Des photos de vos vrais chantiers

Une toiture avant et après les travaux vaut mieux qu'une longue description. Les photos de banques d'images, elles, se reconnaissent vite et n'apportent aucune preuve. Prenez l'habitude de photographier vos chantiers (avec l'accord de vos clients) : c'est la matière la plus utile pour votre site.

### Une demande de soumission simple

Un formulaire court (nom, téléphone, adresse ou secteur, type de travaux, description) et un numéro de téléphone cliquable sur mobile. Si le client peut joindre une photo de sa toiture, vous gagnez souvent un aller-retour avant même la première visite.

### Les réponses aux questions qu'on vous pose toujours

Combien de temps durent les travaux ? Travaillez-vous l'hiver ? Offrez-vous une garantie, et laquelle ? Que se passe-t-il en cas de pluie ? Une courte foire aux questions, rédigée avec vos propres réponses, rassure le client et vous fait gagner du temps au téléphone.

## Ce qui fait varier le prix

  - **Le nombre de pages.** Un site de 5 à 8 pages (accueil, services, réalisations, zone desservie, à propos, contact) demande beaucoup moins de travail qu'un site de 30 pages.
  - **Le niveau de personnalisation.** Un gabarit adapté à vos couleurs coûte moins cher qu'un design conçu de zéro pour votre entreprise.
  - **Le contenu.** Si vous fournissez vos textes et vos photos, le prix baisse. S'il faut rédiger chaque page de service ou organiser une séance photo, il augmente.
  - **Les fonctionnalités.** Prise de rendez-vous en ligne, téléversement de photos dans le formulaire, version anglaise pour vos clients d'Ottawa : chacune ajoute du travail.
  - **Ce qui est inclus après la mise en ligne.** C'est souvent là que se cache la vraie différence entre deux soumissions.

## Le coût qu'on oublie : après la mise en ligne

Un site Web n'est pas une enseigne qu'on pose une fois pour toutes. Pour rester en ligne et sécuritaire, il faut payer chaque année le nom de domaine et l'hébergement, maintenir le certificat de sécurité (HTTPS), faire des sauvegardes et appliquer les mises à jour. Il faut aussi pouvoir le modifier : ajouter un service, changer vos photos au printemps, mettre à jour une garantie.

Selon le fournisseur, ces éléments sont inclus, facturés à part ou laissés à votre charge. Un site peu cher au départ peut donc coûter plus cher sur trois ans qu'une offre en apparence plus élevée. Notre guide sur [le coût d'un site Web pour une PME au Québec](/blogue/combien-coute-un-site-web-pme-quebec) détaille chacun de ces postes.

## Achat unique ou abonnement : que choisir quand on est couvreur ?

Les deux formules existent. Avec un **achat unique**, vous payez la conception d'avance, puis l'hébergement, la maintenance et les modifications à part. Avec un **abonnement**, les frais de départ sont réduits et un montant fixe chaque mois couvre la technique et une partie des modifications.

Pour une entreprise de toiture, la question pratique est souvent celle-ci : qui va s'occuper du site pendant la haute saison, quand vous êtes sur les toits du matin au soir ? Si personne à l'interne ne peut s'en charger, une formule où la maintenance et les modifications sont prises en charge a du sens. Si vous avez déjà quelqu'un pour gérer la technique, un achat unique peut être plus logique.

## Un exemple concret : les tarifs de Novio Studio

Pour illustrer, voici nos propres tarifs, tels qu'ils sont publiés sur la page [Tarifs](/tarifs) :

  - **Croissance, 129 $ par mois :** site de 5 à 10 pages, hébergement, gestion du nom de domaine, sécurité et sauvegardes, maintenance, 1 h de modifications par mois, SEO de base, formulaire de contact et statistiques.
  - **Premium, 199 $ par mois :** design entièrement personnalisé, jusqu'à 2 h de modifications par mois, SEO avancé, intégrations et automatisations, support prioritaire.
  - **Frais de départ :** 200 $, une seule fois.

Pour la plupart des couvreurs, le forfait Croissance couvre l'essentiel décrit plus haut : les pages de services, la zone desservie, les réalisations et la demande de soumission. Le détail de ce que comprend chaque site est sur la page [Sites Web](/site-web).

## Les questions à poser avant de signer

1. Combien de pages sont incluses, et puis-je ajouter une page de service plus tard ?
2. Qui rédige les textes et fournit les photos ?
3. Mon numéro de licence RBQ sera-t-il affiché sur chaque page ?
4. Qu'est-ce qui est inclus après la mise en ligne : hébergement, sécurité, sauvegardes, mises à jour ?
5. Combien coûte une modification, et en combien de temps est-elle faite ?
6. Le nom de domaine sera-t-il enregistré à mon nom ?
7. Quelles sont les conditions si je veux arrêter ou changer de fournisseur ?

## En résumé

Le prix d'un site de couvreur dépend de ce qu'il doit faire et de ce qui est inclus une fois en ligne. Commencez par la liste des services, de la zone desservie et des photos de vos chantiers, puis comparez les offres sur leur coût total, pas seulement sur le prix du premier jour. Si vous voulez une estimation claire pour votre entreprise de toiture, [décrivez-nous votre projet](/contact) : le premier appel de 15 minutes est gratuit et sans engagement.

## Sources

  - Régie du bâtiment du Québec, [Afficher votre licence](https://www.rbq.gouv.qc.ca/vous-etes/entrepreneur/vos-obligations/la-licence/afficher-votre-licence/)
  - Régie du bâtiment du Québec, [Vérifiez si votre entrepreneur a une licence de la RBQ](https://www.rbq.gouv.qc.ca/salle-de-presse/les-nouvelles/nouvelles-detail/item/2026-02-09-verifiez-si-votre-entrepreneur-a-une-licence-de-la-rbq/)
  - Google Search Central, [Guide de démarrage du SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr)

---

# Article 2 — Pourquoi votre entreprise de plomberie a besoin d'un site Web

- **URL :** `/blogue/site-web-plombier`
- **Mot-clé principal :** site web plombier
- **Title :** Site Web pour plombier : pourquoi en avoir un et quoi y mettre
- **Meta description :** Être trouvé au moment d'une urgence, prouver vos qualifications (RBQ, CMMTQ) et faciliter l'appel sur mobile : ce qu'un site de plombier doit contenir.
- **Chapeau :** Être trouvé au bon moment, prouver que vous êtes qualifié et rendre l'appel immédiat : ce qu'un site apporte à une entreprise de plomberie.
- **Longueur :** environ 1032 mots
- **Liens internes :** /blogue/combien-coute-un-site-web-pme-quebec, /blogue/etre-trouve-sur-google-entreprise-locale, /blogue/site-web-ou-reseaux-sociaux, /contact, /tarifs
- **Articles liés :** etre-trouve-sur-google-entreprise-locale, plus-de-demandes-de-soumission-site-web

## H1 : Pourquoi votre entreprise de plomberie a besoin d'un site Web

Un dégât d'eau ne prévient pas. Quand un propriétaire découvre une fuite sous l'évier ou un chauffe-eau qui coule, il prend son téléphone et cherche un plombier, souvent dans la minute qui suit. Ce qu'il trouve à ce moment-là décide de qui il appelle. Votre entreprise de plomberie fonctionne peut-être très bien grâce au bouche-à-oreille, mais voici pourquoi un site Web bien construit reste un outil de travail, et ce qu'il doit contenir.

> **En bref :** un site de plombier sert à trois choses : être trouvé au moment où quelqu'un a besoin de vous, prouver en quelques secondes que vous êtes un entrepreneur qualifié, et rendre l'appel ou la demande de soumission aussi simple que possible sur un téléphone.

## 1. Être trouvé au moment où le client a besoin de vous

Les appels en plomberie partent souvent d'un problème précis : un drain bouché, un chauffe-eau à remplacer, une rénovation de salle de bain. Le client cherche ce problème, dans son secteur. Pour apparaître, il faut des pages qui y répondent clairement.

Votre fiche Google Business Profile est la première pièce, et votre site en est le complément naturel : Google indique lui-même que des informations complètes et un site qui décrit bien vos services aident votre établissement à ressortir dans les recherches locales. Une page Facebook peut montrer votre quotidien, mais elle répond mal à une recherche comme « remplacement chauffe-eau Gatineau ». Nous comparons les deux outils dans [Site Web ou réseaux sociaux : que choisir pour une PME ?](/blogue/site-web-ou-reseaux-sociaux)

### Une page par service important

  - Débouchage de drains et de toilettes
  - Chauffe-eau : réparation et remplacement
  - Plomberie de salle de bain et de cuisine (rénovation)
  - Recherche et réparation de fuites
  - Entrée d'eau, clapet antiretour, pompe de puisard
  - Service d'urgence, si vous l'offrez réellement

Chaque page explique ce que vous faites, dans quels cas faire appel à vous, et comment se passe une intervention. N'inventez pas de service : une page d'urgence 24 h sur 24 pour une entreprise qui ne répond pas la nuit fera plus de tort que de bien.

## 2. Prouver que vous êtes un entrepreneur qualifié

En plomberie, la confiance passe d'abord par la qualification. Au Québec, l'adhésion à la Corporation des maîtres mécaniciens en tuyauterie du Québec (CMMTQ) est obligatoire pour les entrepreneurs en construction spécialisés en plomberie et en chauffage, et la CMMTQ poursuit ceux qui annoncent ces services sans en être membres, y compris par un site Web ou une page Facebook. Votre site est l'endroit idéal pour montrer clairement que vous êtes en règle.

  - **Votre numéro de licence RBQ**, sous la forme exigée (« Licence RBQ : XXXX-XXXX-XX »). La Régie du bâtiment du Québec précise qu'il doit figurer sur le site Web de l'entreprise.
  - **Votre appartenance à la CMMTQ**, mentionnée en texte. Avant d'utiliser un logo d'organisme, vérifiez auprès de celui-ci les règles d'utilisation.
  - **Votre adresse d'affaires ou votre zone desservie, vos heures et un vrai numéro de téléphone.**
  - **Une page « À propos »** avec votre nom, votre photo ou celle de l'équipe, et depuis quand vous exercez.

## 3. Rendre l'appel facile, surtout sur mobile

La personne qui cherche un plombier est souvent debout dans sa salle de bain, téléphone à la main. Le site doit lui permettre d'agir sans effort :

  - un numéro de téléphone **cliquable**, visible en haut de chaque page ;
  - un formulaire court (nom, téléphone, secteur, description du problème), qui fonctionne bien au pouce ;
  - des pages qui chargent rapidement, même sur une connexion cellulaire faible ;
  - des heures de service et un délai de réponse honnêtes.

La vitesse et l'affichage mobile ne sont pas qu'une question de confort : Google mesure l'expérience réelle des visiteurs avec les Signaux Web essentiels (Core Web Vitals). Notre guide [Comment être trouvé sur Google quand on est une entreprise locale](/blogue/etre-trouve-sur-google-entreprise-locale) explique ces bases.

## 4. Répondre aux questions avant le premier appel

Vos clients posent souvent les mêmes questions : facturez-vous le déplacement ? Quels secteurs desservez-vous ? Combien de temps prend le remplacement d'un chauffe-eau ? Offrez-vous une garantie sur vos travaux ? Une courte foire aux questions, avec vos réponses réelles, filtre les demandes et vous fait gagner du temps. Les clients qui appellent savent déjà à quoi s'attendre.

## 5. Montrer votre travail, honnêtement

Des photos de vos installations (avec l'accord des clients), avant et après une rénovation, ou une simple description de projets récents : tout ce qui est vrai rassure. Les avis Google de vos clients satisfaits sont précieux aussi ; demandez-les systématiquement après une intervention, sans rien offrir en échange, comme l'exigent les règles de Google.

## Ce qu'un site de plombier n'a pas besoin d'avoir

Pas besoin de 40 pages, d'animations ou d'un blogue publié chaque semaine pour commencer. Un site de 5 à 10 pages, clair, rapide et à jour, fait l'essentiel du travail. Ce qui compte, c'est qu'il reste exact : vos heures, vos services et vos coordonnées doivent toujours correspondre à la réalité.

## Combien ça coûte, et qui s'en occupe ?

Le prix dépend surtout du nombre de pages, du niveau de personnalisation et de ce qui est inclus après la mise en ligne. Notre article [Combien coûte un site Web pour une PME au Québec ?](/blogue/combien-coute-un-site-web-pme-quebec) vous aide à comparer les offres. Chez Novio Studio, le site est conçu, hébergé et entretenu pour un prix fixe : 129 $ par mois avec le forfait Croissance, 199 $ avec Premium, plus 200 $ de frais de départ (voir nos [tarifs](/tarifs)). Vous m'écrivez ce qui doit changer, je m'en occupe : vous gardez vos mains sur les tuyaux.

## En résumé

Un site de plombier efficace répond à une recherche précise, prouve votre qualification (licence RBQ et CMMTQ) et rend l'appel immédiat sur mobile. Si vous voulez savoir ce que cela donnerait pour votre entreprise, [demandez une soumission](/contact) : le premier appel de 15 minutes est gratuit et sans engagement.

## Sources

  - Régie du bâtiment du Québec, [Afficher votre licence](https://www.rbq.gouv.qc.ca/vous-etes/entrepreneur/vos-obligations/la-licence/afficher-votre-licence/)
  - Corporation des maîtres mécaniciens en tuyauterie du Québec, [cmmtq.org](https://www.cmmtq.org/) (adhésion obligatoire et liste des condamnations publiée par la Corporation)
  - Google, [Conseils pour améliorer votre classement local sur Google](https://support.google.com/business/answer/7091?hl=fr)
  - Google, [Contenus interdits et réglementés (avis)](https://support.google.com/contributionpolicy/answer/7400114?hl=fr)
  - web.dev, [Signaux Web essentiels (Core Web Vitals)](https://web.dev/articles/vitals?hl=fr)

---

# Article 3 — Comment obtenir plus de demandes de soumission grâce à son site Web

- **URL :** `/blogue/plus-de-demandes-de-soumission-site-web`
- **Mot-clé principal :** site web entrepreneur
- **Title :** Site Web d'entrepreneur : obtenir plus de demandes de soumission
- **Meta description :** Message clair, formulaire court, téléphone cliquable, preuves vérifiables, vitesse et mesure : les points à corriger pour que votre site génère des soumissions.
- **Chapeau :** Neuf points à vérifier, dans l'ordre où ils comptent, pour que votre site d'entrepreneur transforme plus de visites en demandes de soumission.
- **Longueur :** environ 1029 mots
- **Liens internes :** /blogue/site-web-ou-reseaux-sociaux, /contact, /site-web, /tarifs
- **Articles liés :** etre-trouve-sur-google-entreprise-locale, site-web-plombier

## H1 : Comment obtenir plus de demandes de soumission grâce à son site Web

Votre site Web reçoit des visites, mais le téléphone ne sonne pas plus qu'avant ? C'est fréquent chez les entrepreneurs : le site existe, il est même joli, mais il ne pousse pas le visiteur à passer à l'action. Bonne nouvelle : les causes sont souvent simples et se corrigent sans tout refaire. Voici les points à vérifier, dans l'ordre où ils comptent le plus, pour transformer davantage de visites en demandes de soumission.

> **En bref :** un visiteur demande une soumission quand il comprend tout de suite ce que vous faites et où, qu'il vous fait confiance, et que le contact est facile. Le reste (couleurs, animations, nombre de pages) compte beaucoup moins.

## 1. Dire en une phrase ce que vous faites, et où

En haut de la page d'accueil, le visiteur doit lire, sans défiler, ce que vous faites et dans quel secteur : « Réfection de toitures résidentielles à Gatineau et dans les Collines », plutôt que « Votre satisfaction, notre priorité ». Un slogan vague oblige le visiteur à chercher, et beaucoup ne cherchent pas. La même phrase, bien formulée, aide aussi Google à comprendre votre page.

## 2. Un seul appel à l'action, répété au bon endroit

Choisissez l'action principale que vous voulez obtenir, par exemple « Demander une soumission », et gardez exactement la même formulation partout : en haut de la page, après la présentation de chaque service et à la fin de chaque page. Ajoutez le téléphone comme deuxième option. Trop de boutons différents (« Contactez-nous », « En savoir plus », « Obtenir un prix », « Écrivez-nous ») diluent l'attention.

## 3. Un formulaire court qui pose les bonnes questions

Chaque champ supplémentaire est une raison d'abandonner. Pour une première demande, l'essentiel tient en quelques champs :

  - nom ;
  - téléphone ou courriel (au moins un des deux) ;
  - secteur ou ville ;
  - type de travaux (une liste de choix simple) ;
  - description libre, facultative au besoin.

Le reste se règle au téléphone. Après l'envoi, affichez un message clair : la demande est reçue, et vous répondez dans tel délai. Si un champ est mal rempli, dites précisément lequel et pourquoi.

Si votre formulaire recueille des renseignements personnels (et c'est le cas), la Loi 25 exige qu'une politique de confidentialité rédigée en termes simples et clairs soit publiée sur votre site. Un lien vers celle-ci près du formulaire rassure aussi le visiteur.

## 4. Le téléphone cliquable, partout

Sur mobile, un numéro de téléphone doit se composer d'un seul toucher. Placez-le dans l'en-tête de chaque page et dans le pied de page. Pour beaucoup de clients en entretien ou en rénovation, l'appel reste le moyen le plus naturel de demander un prix.

## 5. Des preuves, pas des promesses

« Travail de qualité » et « service exceptionnel » ne convainquent personne : tout le monde l'écrit. Ce qui rassure vraiment, ce sont des éléments vérifiables :

  - **votre numéro de licence RBQ**, que la loi vous oblige d'ailleurs à afficher sur votre site Web, et vos autres qualifications réelles (par exemple l'adhésion à la CMMTQ pour la plomberie) ;
  - **des photos de vos propres chantiers**, idéalement avant et après ;
  - **des avis Google authentiques**, avec un lien vers votre fiche ;
  - **votre nom et votre visage** : une page « À propos » où l'on voit qui viendra chez soi ;
  - **vos garanties**, décrites précisément.

Ne publiez jamais de faux avis ou de photos de banque présentées comme vos réalisations : en plus d'être trompeur, un faux avis contrevient aux règles de Google, qui peut le retirer.

## 6. Une page par service

Quelqu'un qui cherche « agrandissement de maison » n'a pas envie de lire une page générale qui mélange tout. Une page par service répond à sa question précise, montre des exemples de ce service et se termine par la demande de soumission. C'est aussi ce qui permet à Google de vous montrer pour plusieurs recherches différentes.

## 7. Un site rapide et lisible sur téléphone

Si la page met plusieurs secondes à s'afficher sur un cellulaire, une partie des visiteurs repart avant même de voir votre offre. Les Signaux Web essentiels de Google mesurent précisément cela : la vitesse d'affichage, la réactivité et la stabilité de la page. Des images trop lourdes et des extensions inutiles sont les causes les plus courantes de lenteur.

## 8. Répondre vite, et le dire

Le site fait venir la demande ; c'est votre réponse qui la transforme en contrat. Si vous répondez en moins de 24 h, écrivez-le. Si c'est plutôt 48 h en haute saison, écrivez-le aussi. Une promesse tenue vaut mieux qu'une promesse impressionnante.

## 9. Mesurer ce qui fonctionne

Sans mesure, impossible de savoir si une modification aide. Deux outils gratuits suffisent pour commencer :

  - **Google Search Console**, pour voir sur quelles recherches votre site apparaît et combien de personnes cliquent ;
  - **Google Analytics 4**, pour compter les demandes envoyées, les clics sur le téléphone et les pages d'où elles viennent (avec le consentement des visiteurs, comme l'exige la Loi 25).

Regardez ces chiffres une fois par mois. Une page de service qui reçoit des visites mais aucune demande est la première à améliorer.

## Par où commencer ?

1. Réécrivez la première phrase de votre page d'accueil.
2. Uniformisez votre bouton principal et rendez le téléphone cliquable.
3. Raccourcissez votre formulaire.
4. Ajoutez votre licence RBQ et de vraies photos de chantiers.
5. Demandez un avis Google à vos trois derniers clients satisfaits.

Si vous préférez qu'on s'en occupe, c'est exactement ce que comprennent nos [sites Web pour entrepreneurs](/site-web) : conception, hébergement, entretien et modifications chaque mois, dès 129 $ par mois (voir les [tarifs](/tarifs)). Vous vous demandez d'abord si votre entreprise a besoin d'un site ? Lisez [Site Web ou réseaux sociaux](/blogue/site-web-ou-reseaux-sociaux). Sinon, [parlez-nous de votre projet](/contact) : le premier appel de 15 minutes est gratuit.

## Sources

  - Régie du bâtiment du Québec, [Afficher votre licence](https://www.rbq.gouv.qc.ca/vous-etes/entrepreneur/vos-obligations/la-licence/afficher-votre-licence/)
  - Gouvernement du Québec, [Loi 25 : entrée en vigueur de dispositions qui rehaussent la protection de la vie privée](https://www.quebec.ca/nouvelles/actualites/details/loi-25-entree-en-vigueur-de-dispositions-qui-rehaussent-la-protection-de-la-vie-privee-des-quebecois-50719) ; Commission d'accès à l'information, [cai.gouv.qc.ca](https://www.cai.gouv.qc.ca/)
  - Google, [Contenus interdits et réglementés (avis)](https://support.google.com/contributionpolicy/answer/7400114?hl=fr)
  - web.dev, [Signaux Web essentiels (Core Web Vitals)](https://web.dev/articles/vitals?hl=fr)
  - Google Search Central, [Guide de démarrage du SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr)

---

# Article 4 — Site Web à 129 $/mois : qu'est-ce qui est réellement inclus ?

- **URL :** `/blogue/site-web-129-par-mois-inclus`
- **Mot-clé principal :** site web par abonnement
- **Title :** Site Web par abonnement à 129 $/mois : ce qui est vraiment inclus
- **Meta description :** Le détail du forfait Croissance de Novio Studio : création, hébergement, domaine, sécurité, maintenance, modifications et SEO, et ce qui n'est pas inclus.
- **Chapeau :** Le forfait Croissance de Novio Studio expliqué ligne par ligne : ce qui est inclus, ce qui ne l'est pas et les conditions à connaître avant de signer.
- **Longueur :** environ 1141 mots
- **Liens internes :** /blogue/combien-coute-un-site-web-pme-quebec, /contact, /site-web, /tarifs
- **Articles liés :** combien-coute-un-site-web-pme-quebec, site-web-ou-reseaux-sociaux

## H1 : Site Web à 129 $/mois : qu'est-ce qui est réellement inclus ?

Un site Web professionnel pour 129 $ par mois : l'offre est simple à lire, mais on a raison de se demander ce qu'elle contient vraiment, et ce qu'elle ne contient pas. Voici le détail complet du forfait Croissance de Novio Studio, ligne par ligne, avec ce qui est inclus, ce qui ne l'est pas et les conditions à connaître avant de signer. Le but : que vous puissiez le comparer honnêtement à n'importe quelle autre offre.

> **En bref :** 200 $ de frais de départ, une seule fois, puis 129 $ par mois. Ce prix comprend la création d'un site de 5 à 10 pages, son hébergement, la gestion du nom de domaine, la sécurité, les sauvegardes, la maintenance, 1 h de modifications par mois, le SEO de base, un formulaire de contact et les statistiques de fréquentation. [À CONFIRMER : taxes en sus ou incluses.]

## Comment fonctionne un site Web par abonnement

Avec un achat unique, vous payez la conception d'avance, souvent plusieurs milliers de dollars, puis l'hébergement, la maintenance et chaque modification à part. Avec un abonnement, l'investissement de départ est réduit et un prix fixe chaque mois couvre la création, la technique et une partie des modifications. Vous savez d'avance ce que le site vous coûtera chaque mois.

Ce n'est pas la meilleure formule pour tout le monde. Si vous avez déjà un développeur à l'interne, ou si vous préférez tout payer une fois et gérer la technique vous-même, un achat unique peut être plus logique. Nous comparons les deux formules dans [Combien coûte un site Web pour une PME au Québec ?](/blogue/combien-coute-un-site-web-pme-quebec)

## Ce qui est inclus dans les 129 $ par mois

### La création du site, de 5 à 10 pages

Une entreprise de services a rarement besoin de plus : accueil, une page par service principal, réalisations, à propos, zone desservie et contact. Le site est conçu pour être lisible sur téléphone, rapide à charger et clair sur ce que vous faites et où. [À CONFIRMER : qui rédige les textes et fournit les photos, et ce qui est prévu si le client n'en a pas.]

### L'hébergement et le nom de domaine

L'hébergement, c'est le serveur qui rend votre site accessible jour et nuit. Il est inclus. La gestion technique du nom de domaine (par exemple *votreentreprise.ca*) l'est aussi, et le domaine reste enregistré à votre nom : il vous appartient. [À CONFIRMER : le renouvellement annuel du domaine est-il compris dans les 129 $ ?]

### La sécurité et les sauvegardes

Le certificat HTTPS (le cadenas dans la barre d'adresse), les mises à jour de sécurité et des copies de secours du site sont inclus. Vous n'avez rien à surveiller.

### La maintenance

Un site vieillit : liens qui se brisent, formulaires qui cessent de fonctionner, composants à mettre à jour. La maintenance couvre ces corrections et ces mises à jour techniques, sans facture séparée.

### 1 heure de modifications par mois

C'est ce qui garde votre site à jour : changer un prix, ajouter un service, remplacer des photos au printemps, publier une nouvelle réalisation. Vous m'écrivez ce qui doit changer, je m'en occupe. Si une demande risque de dépasser l'heure incluse, je vous préviens avant et vous recevez une estimation claire ; rien n'est fait sans votre accord. [À CONFIRMER : tarif horaire du travail supplémentaire et report éventuel des heures non utilisées.]

### Le SEO de base

Le SEO (optimisation pour les moteurs de recherche) de base, ce sont les fondations qui permettent à Google de comprendre et de bien présenter votre site. [À CONFIRMER : liste exacte. Proposition : un titre et une description uniques pour chaque page, une structure de titres claire, un fichier sitemap, des données structurées décrivant votre entreprise, un site rapide et adapté au mobile, et l'inscription à Google Search Console.] Il ne s'agit pas d'une promesse de classement : personne ne peut garantir une première position sur Google.

### Un formulaire de contact fonctionnel

Les demandes arrivent directement dans votre boîte courriel. Le formulaire est protégé contre le pourriel et accompagné d'une politique de confidentialité, comme l'exige la Loi 25 pour tout site qui recueille des renseignements personnels.

### Les statistiques de fréquentation

Combien de personnes visitent votre site, quelles pages elles consultent et combien de demandes sont envoyées. [À CONFIRMER : outil utilisé et format du rapport (tableau de bord, rapport mensuel par courriel, etc.).]

## Ce qui n'est pas inclus dans le forfait Croissance

Ces éléments font partie du forfait Premium, à 199 $ par mois :

  - un design entièrement personnalisé, conçu de zéro pour votre entreprise ;
  - jusqu'à 2 h de modifications par mois ;
  - le SEO avancé ;
  - les intégrations avec des services externes et les automatisations personnalisées ;
  - le support prioritaire.

[À CONFIRMER : autres éléments hors forfait, par exemple boutique en ligne, version anglaise, rédaction complète des textes, séance photo.]

## Les frais de départ de 200 $

Ils sont payés une seule fois, au démarrage, et couvrent la mise en place du projet. [À CONFIRMER : ce que couvrent exactement les frais de départ et à quel moment ils sont facturés.] Il n'y a pas d'autres frais de lancement.

## Les conditions à connaître avant de signer

  - **Durée d'engagement :** [À CONFIRMER].
  - **Annulation :** [À CONFIRMER : préavis, frais éventuels].
  - **Après l'annulation :** [À CONFIRMER : le client récupère-t-il son site, ses contenus, et à quelles conditions ? Le domaine, lui, reste à son nom.]
  - **Délai de création :** en général, 2 à 3 semaines entre le premier appel et la mise en ligne. Le délai exact dépend du nombre de pages et de la rapidité à rassembler votre contenu.

Toutes ces conditions sont écrites dans l'entente de service, avant le début du projet.

## Comment comparer avec une autre offre

Pour comparer honnêtement, calculez le coût total sur deux ou trois ans. Avec le forfait Croissance, la première année revient à 200 $ + 12 × 129 $, soit 1 748 $, puis 1 548 $ par année ensuite. [À CONFIRMER : taxes.] Pour une offre à achat unique, additionnez la conception, l'hébergement, le domaine, la maintenance et le coût de vos modifications habituelles sur la même période. Posez aussi les mêmes questions à chaque fournisseur : à qui appartient le domaine, combien coûte une modification, et que se passe-t-il si vous arrêtez.

## En résumé

Le forfait Croissance s'adresse aux entrepreneurs qui veulent un site professionnel, tenu à jour, sans investissement de départ important ni gestion technique. Le détail est sur la page [Tarifs](/tarifs) et ce que comprend chaque site est décrit sur la page [Sites Web](/site-web). Une question sur votre situation ? [Écrivez-moi](/contact) : le premier appel de 15 minutes est gratuit et sans engagement.

## Sources

  - Novio Studio, [page Tarifs](/tarifs) (forfaits et frais de départ)
  - Gouvernement du Québec, [Loi 25 : entrée en vigueur de dispositions qui rehaussent la protection de la vie privée](https://www.quebec.ca/nouvelles/actualites/details/loi-25-entree-en-vigueur-de-dispositions-qui-rehaussent-la-protection-de-la-vie-privee-des-quebecois-50719)
