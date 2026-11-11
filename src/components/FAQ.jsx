/* ============================================================
   FAQ.jsx, Questions fréquentes (accordéon, réutilisable)
   Dépend de : window.SectionHead
   Exporte : window.FAQ (générique), window.FAQ_WEB, window.FAQ_ABO
   ============================================================ */

const { SectionHead } = window;

/* ── Conditions commerciales de l'abonnement : À CONFIRMER PAR NOVIO STUDIO ──
   Ces réponses touchent au contrat. Elles restent volontairement prudentes
   (aucun délai garanti, aucun tarif ni préavis inventé). Remplace chaque texte
   par tes conditions réelles dès qu'elles sont fixées. */
const SUBSCRIPTION_TERMS = {
  // Dépassement des heures de modifications incluses (tarif horaire ? report ?)
  overage:
    "Je te préviens avant de dépasser les heures incluses dans ton forfait. Le travail supplémentaire " +
    "t'est alors proposé avec une estimation claire, et rien n'est fait sans ton accord.",
  // Annulation (préavis, durée minimale, sort du site après l'annulation…)
  cancellation:
    "Oui. Les modalités d'annulation sont précisées noir sur blanc dans ton entente de service, " +
    "avant le démarrage du projet. Tu sais exactement à quoi t'attendre, dès le départ.",
  // Délai de création (2–3 semaines : délai habituel déjà annoncé sur le site, non garanti)
  buildTime:
    "En général, 2 à 3 semaines entre le premier appel et la mise en ligne. Le délai exact dépend du " +
    "nombre de pages et de la rapidité à rassembler ton contenu (textes, photos, logo). Je te donne " +
    "un échéancier précis dès notre premier appel.",
};

// ── Questions sur l'abonnement mensuel (page Tarifs) ──
const FAQ_ABO = [
  { q: "Que comprend l'abonnement mensuel ?",
    a: "La création de ton site, son hébergement, la gestion du nom de domaine, la sécurité et les sauvegardes, la maintenance et les mises à jour, l'optimisation SEO, un formulaire de contact fonctionnel, les statistiques de fréquentation et le support technique. Des heures de modifications sont aussi incluses chaque mois : 1 h avec Croissance, jusqu'à 2 h avec Premium. Pour démarrer, des frais de départ uniques de 200 $ s'ajoutent au premier mois." },
  { q: "Puis-je demander des modifications à mon site ?",
    a: "Oui. Chaque mois, ton forfait inclut des heures de modifications de contenu ou de design : 1 h avec Croissance, jusqu'à 2 h avec Premium. Tu m'envoies ce que tu veux changer (textes, photos, sections…), je m'en occupe." },
  { q: "Que se passe-t-il si je dépasse mes heures de modifications mensuelles ?",
    a: SUBSCRIPTION_TERMS.overage },
  { q: "Le nom de domaine m'appartient-il ?",
    a: "Oui. Ton nom de domaine reste à ton nom : il t'appartient. Je m'occupe simplement de sa gestion technique dans le cadre de ton abonnement." },
  { q: "Puis-je annuler mon abonnement ?",
    a: SUBSCRIPTION_TERMS.cancellation },
  { q: "Combien de temps faut-il pour créer mon site ?",
    a: SUBSCRIPTION_TERMS.buildTime },
];

// ── Questions liées aux sites web (page Sites Web) ──
const FAQ_WEB = [
  { q: "C'est quoi la différence avec WordPress ou Wix ?",
    a: "Vitesse et contrôle. WordPress/Wix alourdissent les sites avec des dizaines d'extensions qui ralentissent les chargements. Je construis des sites légers, sans extensions inutiles, résultat : un site qui s'ouvre en moins d'une seconde, et qui te ressemble. Avec Premium, le design est entièrement personnalisé, de A à Z." },
  { q: "Qu'est-ce qui est inclus dans mon forfait ?",
    a: "Tout ce qu'il faut pour que ton site travaille pour toi : création, hébergement, gestion du nom de domaine, sécurité, sauvegardes, maintenance et des heures de modifications chaque mois. Croissance à 129 $/mois, Premium à 199 $/mois, plus 200 $ de frais de départ, une seule fois. Le détail complet est sur la page Tarifs." },
  { q: "Et si j'ai déjà un logo ou une identité visuelle ?",
    a: "Parfait, je travaille avec. Si tu n'en as pas, on peut en créer une minimaliste ensemble dans le cadre du projet, ou je te recommande un graphiste de la région." },
  { q: "Travailles-tu à distance ou en personne ?",
    a: "Les deux. Premier appel en visio ou en personne (café offert à Gatineau ou Ottawa). Travail à distance avec aperçus en direct. Formation finale en personne si tu préfères." },
  { q: "Je suis entrepreneur, pas technicien, est-ce que je vais devoir gérer mon site ?",
    a: "Non. La maintenance, les mises à jour et tes modifications mensuelles sont incluses dans ton abonnement : tu m'écris ce que tu veux changer, je m'en occupe. Pas de jargon technique, tu restes concentré sur tes chantiers." },
  { q: "Mon téléphone sonne déjà par bouche-à-oreille, pourquoi aurais-je besoin d'un site ?",
    a: "Parce que ton prochain client te cherche sur Google avant même de t'appeler. S'il ne te trouve pas, il appelle ton concurrent. Un site bien fait capte ces leads que tu ne savais même pas que tu perdais." },
];

// ── Composant générique ──
const FAQ = ({ items = FAQ_WEB, title = "Questions fréquentes." }) => {
  const [open, setOpen] = React.useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  return (
    <section className="section" id="faq">
      <SectionHead title={title} />
      <div className="faq">
        {items.map((f, i) => (
          <div key={i} className={`faq-item ${open === i ? "open" : ""}`} onClick={() => toggle(i)}>
            <div
              className="faq-q"
              role="button"
              tabIndex={0}
              aria-expanded={open === i}
              aria-controls={`faq-a-${i}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); }
              }}
            >
              <span>{f.q}</span><span className="plus" aria-hidden="true">+</span>
            </div>
            <div className="faq-a" id={`faq-a-${i}`}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.FAQ = FAQ;
window.FAQ_WEB = FAQ_WEB;
window.FAQ_ABO = FAQ_ABO;
