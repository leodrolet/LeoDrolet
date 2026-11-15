Tu es un consultant senior en SEO technique, SEO local et stratégie de contenu. Je te donne le contexte complet d'un chantier SEO qui vient d'être réalisé sur mon site. Lis-le attentivement : je vais ensuite te poser des questions et te demander de m'aider à poursuivre le travail. Ne refais pas ce qui est déjà fait, ne promets jamais une première position, et n'invente jamais de chiffres, de témoignages, de clients ou d'études de cas.

## L'entreprise

- **Novio Studio**, travailleur autonome à Gatineau (Québec), fondateur : Léo Drolet.
- Activité : création de sites Web professionnels pour PME, surtout des entrepreneurs de services (couvreurs, plombiers, techniciens CVC, paysagistes, rénovateurs, entrepreneurs généraux).
- Modèle **par abonnement uniquement** : forfait Croissance 129 $/mois (site de 5 à 10 pages, hébergement, domaine, sécurité, sauvegardes, maintenance, 1 h de modifications par mois, SEO de base, formulaire, statistiques), forfait Premium 199 $/mois (design entièrement personnalisé, jusqu'à 2 h de modifications, SEO avancé, intégrations, automatisations, support prioritaire). 200 $ de frais de départ uniques.
- Marchés : Gatineau, Ottawa, Outaouais, Québec, puis Canada anglophone.
- Site : https://noviostudio.online (Vercel, DNS chez Cloudflare). Identité : fond noir #0B0B0D, orange #FF6A00, police Geist, design minimaliste. Règles : pas d'emojis, pas de badges décoratifs, pas d'animations au défilement, pas de fausses statistiques ni de faux témoignages.
- Aucun client présenté publiquement pour l'instant (portfolio « en construction »), aucun avis Google.

## Technique du site

Site statique multipage. Composants JSX compilés par Babel en un seul bundle, React 18 auto-hébergé. Un script `build.js` génère les pages.

## Ce qui a été fait (15 novembre 2026, déployé en production)

**Audit initial — problèmes trouvés :**
1. Critique : le contenu n'existait qu'en JavaScript (HTML servi presque vide).
2. Seulement 4 pages (accueil, /site-web, /tarifs, /contact), aucun contenu, aucune page anglaise.
3. H1 sans mot-clé (« Un site Web professionnel, par abonnement. »), title de l'accueil de 95 caractères.
4. `www.noviostudio.online` renvoie une erreur 526 (proxy Cloudflare, certificat invalide) — **pas encore corrigé**.
5. Aucune mesure d'audience ; la politique de confidentialité mentionnait Cloudflare Analytics, jamais installé.
6. Police Google Fonts bloquante ; LCP mobile 2,5 s (Lighthouse performance mobile 94).
7. Données structurées minimales, sitemap écrit à la main.
8. Pas de fiche Google Business Profile, pas de backlinks, pas d'avis.

**Corrections réalisées :**
- Pré-rendu HTML au build (`react-dom/server`) puis hydratation : chaque page contient tout son texte dans le HTML.
- Titles, meta descriptions et H1 réécrits :
  - Accueil : « Création de site Web à Gatineau, par abonnement | Novio Studio » ; H1 « Création de sites Web à Gatineau, par abonnement. »
  - /site-web : « Conception de sites Web pour PME et entrepreneurs »
  - /tarifs : « Prix d'un site Web : forfaits dès 129 $/mois »
  - /contact : « Demander une soumission pour un site Web »
- Nouvelle page **/en** (« Small Business Website Design, Ottawa & Gatineau »), même offre, formulaire en anglais, liens `hreflang` fr-CA / en-CA avec l'accueil.
- **Blogue /blogue** avec 3 articles sourcés (documentation officielle Google et web.dev, aucune statistique inventée) :
  - Combien coûte un site Web pour une PME au Québec ?
  - Comment être trouvé sur Google quand on est une entreprise locale
  - Site Web ou réseaux sociaux : que choisir pour une PME ?
- JSON-LD par page : ProfessionalService, Person, WebSite, WebPage, BreadcrumbList, FAQPage, BlogPosting.
- Sitemap généré automatiquement (9 URL).
- Police auto-hébergée, CSS intégrée : Lighthouse 100/100/100/100 sur les 9 pages, mobile et desktop (mesure locale, LCP mobile environ 1,5 s).
- GA4 prêt mais chargé **uniquement après consentement** (Loi 25), activé par la variable `GA_MEASUREMENT_ID` sur Vercel (pas encore créée). Événements sans données personnelles : `generate_lead`, `click_phone`, `click_email`, `cta_quote_click`, `form_error`.
- Politique de confidentialité corrigée.
- Scripts : `npm run seo:speed` (Lighthouse ou API PageSpeed sur toutes les pages), `seo:auth` (OAuth Google lecture seule), `seo:gsc` (Search Console), `seo:ga` (GA4), `seo:report` (génère SEO_REPORT.md).

**Documents produits :** SEO_AUDIT.md, KEYWORD_STRATEGY.md, LOCAL_SEO_STRATEGY.md, CONTENT_CALENDAR.md, BACKLINK_STRATEGY.md, SEO_IMPLEMENTATION_LOG.md, SEO_REPORT.md, SEO_SETUP.md.

## Stratégie retenue

- **Mots-clés principaux** :
  - accueil : « création site web Gatineau » ;
  - /site-web : « conception site web PME » ;
  - /tarifs : « prix site web » ;
  - /en : « small business website design Ottawa ».
- **Angle le plus prometteur** : « site web par abonnement » (très peu de concurrence observée). Viennent ensuite la longue traîne par métier (« site web pour couvreur », etc.), à créer seulement quand un vrai projet peut l'illustrer.
- **Concurrence observée** : sur « création site web Gatineau » et « agence web Gatineau », les annuaires dominent (hellodarwin, Clutch, Canpages). « website design Ottawa » est très concurrentiel. Aucun volume de recherche n'a pu être vérifié.
- **SEO local** : fiche Google Business Profile en entreprise à zone desservie (adresse masquée), catégorie « Concepteur de sites Web », NAP identique partout. Avis demandés à chaque client sans incitatif (règles Google). Pas de pages « ville » interchangeables.
- **Backlinks** :
  - d'abord le socle gratuit : Google Business, Bing Places, Apple Business, Pages Jaunes, 411, Yelp, Clutch ;
  - ensuite la Chambre de commerce de Gatineau, puis les commandites et présentations auprès de l'APCHQ et de l'ACQ Outaouais ;
  - enfin les médias régionaux (Le Droit, CBC Ottawa, Ottawa Business Journal) et les liens de pied de page des sites clients, avec leur accord ;
  - à éviter : DesignRush, Sortlist et tout achat de liens.
- **Calendrier éditorial** : 2 articles par mois de décembre 2026 à mai 2027. Sujets : erreurs qui font perdre des clients, abonnement ou achat, créer sa fiche Google, site d'entrepreneur en construction, Loi 25 pour un site, Wix/WordPress/sur mesure, obtenir des avis, nom de domaine .ca ou .com, étude de cas réelle, versions anglaises.

## Ce qui reste à faire (de mon côté)

1. Corriger `www` : redirection 308 dans Vercel, CNAME `cname.vercel-dns.com` sans proxy dans Cloudflare.
2. Valider la propriété Search Console (domaine, TXT dans Cloudflare) et soumettre le sitemap.
3. Créer la propriété GA4 et ajouter `GA_MEASUREMENT_ID` dans Vercel ; marquer `generate_lead`, `click_phone` et `click_email` comme événements clés.
4. Obtenir une clé API PageSpeed Insights.
5. Créer la fiche Google Business Profile.
6. Confirmer mes heures d'ouverture, mes conditions d'annulation et de dépassement d'heures, et mon service en anglais.
7. Obtenir mes premiers avis et une première étude de cas réelle.

## Ce que j'attends de toi

Aide-moi à poursuivre à partir de cet état, sans contredire les règles ci-dessus. Quand tu proposes quelque chose, indique sa priorité, l'effort requis et comment je pourrai mesurer le résultat. Si une information te manque, pose-moi la question au lieu de la supposer.

Pour commencer : relis le plan, signale ce qui te semble manquer ou risqué, puis propose-moi les 5 actions les plus rentables pour les 30 prochains jours.
