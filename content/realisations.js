/* ============================================================
   content/realisations.js — Projets clients RÉELS (/realisations).

   RÈGLES (non négociables) :
     · Uniquement des projets livrés, pour de vrais clients.
     · Accord ÉCRIT du client avant publication (nom, captures, citation).
       Conserver la preuve de l'accord (courriel) : champ `consent`.
     · Aucun résultat sans source vérifiable (Search Console, GA4,
       données du client). Pas de résultat ? Laisser `results: []`.
     · Pas de maquette présentée comme un projet.

   Tant qu'aucun projet n'a `published: true`, build.js NE GÉNÈRE PAS
   /realisations : une page vide serait du contenu mince pour Google.
   Dès le premier projet publié, le build crée :
     · /realisations            (liste, CollectionPage)
     · /realisations/<slug>     (étude de cas, avec fil d'Ariane)
   et les ajoute au sitemap.

   Images : assets/realisations/<slug>/<fichier>.webp (ou .jpg),
   largeur 1600 px conseillée, avec dimensions réelles (width/height).

   Modèle d'entrée (copier, remplir, puis passer published à true) :

   {
     slug: "couvreur-exemple-aylmer",            // minuscules, tirets
     published: false,
     consent: "Courriel du 2027-01-10, accord écrit de [nom]", // preuve, non affichée
     client: {
       name: "Nom réel de l'entreprise",
       trade: "Couvreur",                         // métier
       city: "Aylmer (Gatineau)",
       url: "https://site-du-client.ca",          // facultatif
       description: "Une ou deux phrases sur l'entreprise, validées par le client.",
     },
     plan: "Croissance",                          // Croissance | Premium
     date: "2027-01-15",                          // mise en ligne (AAAA-MM-JJ)
     problem: "Situation de départ, dans les mots du client si possible.",
     solution: "Ce qui a été conçu, et pourquoi.",
     features: ["Page par service", "Formulaire de soumission", "Version mobile"],
     results: [
       // Uniquement des faits mesurés, avec leur source et leur période :
       // { label: "Demandes reçues par le formulaire", value: "12", period: "fév. à avr. 2027", source: "Formspree" },
     ],
     screenshots: [
       // { src: "/assets/realisations/couvreur-exemple-aylmer/accueil.webp", width: 1600, height: 1000,
       //   alt: "Page d'accueil du site de [entreprise] sur ordinateur" },
     ],
     testimonial: null,
     // ou { quote: "Citation exacte, approuvée par écrit.", name: "Prénom Nom", role: "Propriétaire, [entreprise]" }
   }
   ============================================================ */

module.exports = [];
