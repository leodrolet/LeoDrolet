/* ============================================================
   FAQ.jsx, Questions fréquentes (accordéon natif <details>)
   Dépend de : window.SectionHead
   Exporte : window.FAQ (générique), window.FAQ_WEB, window.FAQ_ABO
   ============================================================ */

const { SectionHead } = window;

/* ── Conditions commerciales de l'abonnement : À CONFIRMER PAR NOVIO STUDIO ──
   Ces réponses touchent au contrat. Elles restent volontairement prudentes
   (aucun délai garanti, aucun tarif ni préavis inventé). Remplacer chaque texte
   par les conditions réelles dès qu'elles sont fixées. */
const SUBSCRIPTION_TERMS = {
  // Dépassement des heures de modifications incluses (tarif horaire ? report ?)
  overage:
    "Je vous préviens avant de dépasser les heures incluses dans votre forfait. Le travail supplémentaire " +
    "vous est alors proposé avec une estimation claire, et rien n'est fait sans votre accord.",
  // Annulation (préavis, durée minimale, sort du site après l'annulation…)
  cancellation:
    "Oui. Les modalités d'annulation sont précisées noir sur blanc dans votre entente de service, " +
    "avant le démarrage du projet. Vous savez exactement à quoi vous attendre, dès le départ.",
  // Délai de création (2 à 3 semaines : délai habituel, non garanti)
  buildTime:
    "En général, 2 à 3 semaines entre le premier appel et la mise en ligne. Le délai exact dépend du " +
    "nombre de pages et de la rapidité à rassembler votre contenu (textes, photos, logo). Je vous donne " +
    "un échéancier précis dès notre premier appel.",
};

// ── Questions sur l'abonnement (accueil, /tarifs) ──
const FAQ_ABO = [
  { q: "Que comprend l'abonnement mensuel ?",
    a: "La création de votre site, son hébergement, la gestion du nom de domaine, la sécurité et les sauvegardes, la maintenance et les mises à jour, l'optimisation SEO, un formulaire de contact fonctionnel, les statistiques de fréquentation et le support technique. Des heures de modifications sont aussi incluses chaque mois : 1 h avec Croissance, jusqu'à 2 h avec Premium. Des frais de départ uniques de 200 $ s'ajoutent au premier mois." },
  { q: "Puis-je demander des modifications à mon site ?",
    a: "Oui. Chaque mois, votre forfait inclut des heures de modifications de contenu ou de design : 1 h avec Croissance, jusqu'à 2 h avec Premium. Vous m'envoyez ce que vous souhaitez changer (textes, photos, sections), je m'en occupe." },
  { q: "Que se passe-t-il si je dépasse mes heures de modifications mensuelles ?",
    a: SUBSCRIPTION_TERMS.overage },
  { q: "Le nom de domaine m'appartient-il ?",
    a: "Oui. Votre nom de domaine reste à votre nom : il vous appartient. Je m'occupe simplement de sa gestion technique dans le cadre de votre abonnement." },
  { q: "Puis-je annuler mon abonnement ?",
    a: SUBSCRIPTION_TERMS.cancellation },
  { q: "Combien de temps faut-il pour créer mon site ?",
    a: SUBSCRIPTION_TERMS.buildTime },
];

// ── Questions liées aux sites Web (/site-web) ──
const FAQ_WEB = [
  { q: "Quelle est la différence avec WordPress ou Wix ?",
    a: "Le poids et le contrôle. Les sites WordPress ou Wix accumulent souvent des extensions qui ralentissent le chargement. Je construis des sites légers, sans extensions inutiles, conçus pour votre entreprise. Avec Premium, le design est entièrement personnalisé." },
  { q: "Qu'est-ce qui est inclus dans mon forfait ?",
    a: "Tout ce qu'il faut pour que votre site travaille pour vous : création, hébergement, gestion du nom de domaine, sécurité, sauvegardes, maintenance et des heures de modifications chaque mois. Croissance à 129 $/mois, Premium à 199 $/mois, plus 200 $ de frais de départ, une seule fois. Le détail complet est sur la page Tarifs." },
  { q: "J'ai déjà un logo ou une identité visuelle. Est-ce un problème ?",
    a: "Au contraire, je travaille avec. Si vous n'en avez pas, on peut définir ensemble une identité simple dans le cadre du projet, ou je vous recommande un graphiste de la région." },
  { q: "Travaillez-vous à distance ou en personne ?",
    a: "Les deux. Le premier appel peut se faire en visioconférence ou en personne, à Gatineau ou à Ottawa. Le travail se fait ensuite à distance, avec des aperçus à valider à chaque étape." },
  { q: "Je ne suis pas technicien. Vais-je devoir gérer mon site ?",
    a: "Non. La maintenance, les mises à jour et vos modifications mensuelles sont incluses dans l'abonnement : vous m'écrivez ce que vous souhaitez changer, je m'en occupe." },
  { q: "Mes clients arrivent déjà par le bouche-à-oreille. Pourquoi un site ?",
    a: "Parce que même un client recommandé vous cherche sur Google avant d'appeler. S'il ne trouve rien, ou un site qui inspire peu confiance, il risque d'appeler quelqu'un d'autre. Un site professionnel confirme la bonne impression." },
];

// ── Composant générique ──
const FAQ = ({ items = FAQ_ABO, title = "Questions fréquentes." }) => (
  <section className="section" id="faq" aria-labelledby="faq-title">
    <div className="container faq-layout">
      <SectionHead id="faq-title" title={title} lead={<>Une autre question ? <a className="link" href="/contact">Écrivez-moi</a>, je réponds en moins de 24 h.</>} />
      <div className="faq">
        {items.map((f) => (
          <details className="faq__item" key={f.q}>
            <summary className="faq__q">
              <span>{f.q}</span>
              <span className="faq__icon" aria-hidden="true"></span>
            </summary>
            <div className="faq__a"><p>{f.a}</p></div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { FAQ, FAQ_WEB, FAQ_ABO });
