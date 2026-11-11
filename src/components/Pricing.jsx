/* ============================================================
   Pricing.jsx, Forfaits par abonnement mensuel (Croissance · Premium).
   Section réutilisée sur l'accueil, /site-web et /tarifs.
   Les CTA mènent au formulaire de contact existant avec le forfait
   présélectionné (/contact?forfait=…#formulaire, lu par ProjectForm).
   Dépend de : window.useReveal, window.BENEFIT_ICONS, window.Motion
   ============================================================ */

const { useReveal } = window;
const { motion: m, useReducedMotion } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

// Phrase de présentation du modèle d'abonnement (texte fourni par Novio Studio).
const SUBSCRIPTION_PITCH =
  "Un site Web professionnel sans investissement initial important. Profitez d'un site conçu pour " +
  "votre entreprise, hébergé, entretenu et optimisé grâce à un abonnement mensuel simple et transparent.";

/* ── Données des forfaits ──
   keys  : les 3 dimensions qui différencient les forfaits (alignées d'une carte à l'autre).
   items : le reste de ce qui est inclus.
   `slug` sert au lien de contact (?forfait=slug) et à la présélection du formulaire. */
const PLANS = [
  {
    slug: "croissance",
    name: "Croissance",
    price: 129,
    pitch: "Pour les entreprises en croissance qui souhaitent avoir une présence Web professionnelle et efficace.",
    featured: true,
    cta: "Choisir Croissance",
    keys: [
      { k: "Site Web",      v: "5 à 10 pages" },
      { k: "Modifications", v: "1 h / mois" },
      { k: "SEO",           v: "De base" },
    ],
    listLabel: "Aussi inclus",
    items: [
      { icon: "server",        t: "Hébergement Web" },
      { icon: "globe",         t: "Gestion du nom de domaine" },
      { icon: "shield",        t: "Sécurité et sauvegardes" },
      { icon: "refresh",       t: "Maintenance et mises à jour" },
      { icon: "mail",          t: "Formulaire de contact fonctionnel" },
      { icon: "barchart",      t: "Statistiques de fréquentation du site" },
      { icon: "messagecircle", t: "Support technique" },
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    price: 199,
    pitch: "Pour les entreprises qui souhaitent une présence Web entièrement personnalisée et des fonctionnalités plus avancées.",
    featured: false,
    cta: "Choisir Premium",
    keys: [
      { k: "Site Web",      v: "Entièrement personnalisé", up: true },
      { k: "Modifications", v: "Jusqu'à 2 h / mois",       up: true },
      { k: "SEO",           v: "Avancé",                   up: true },
    ],
    listLabel: "Tout Croissance, plus",
    items: [
      { icon: "checkcircle", t: "Tout ce qui est compris dans le forfait Croissance", base: true },
      { icon: "plug",        t: "Intégrations avec des services externes" },
      { icon: "workflow",    t: "Automatisations personnalisées" },
      { icon: "headset",     t: "Support prioritaire" },
    ],
  },
];

const ASSURANCES = [
  { icon: "dollar",   t: "Prix mensuel fixe et transparent" },
  { icon: "clock",    t: "Réponse en moins de 24 h" },
  { icon: "mappin",   t: "Basé à Gatineau, un seul interlocuteur" },
];

const contactHref = (slug) => `/contact?forfait=${slug}#formulaire`;

const PlanCard = ({ p, i, reduce }) => {
  const titleId = `forfait-${p.slug}`;
  return (
    <m.article
      className={`plan-card tier${p.featured ? " tier--featured" : ""}`}
      aria-labelledby={titleId}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.12 }}
    >
      {p.featured && <span className="tier__badge">Recommandé</span>}

      <header className="tier__head">
        <h3 className="tier__name" id={titleId}>Forfait {p.name}</h3>
        <p className="tier__pitch">{p.pitch}</p>
        <p className="tier__price">
          <span className="tier__amount">{p.price}&nbsp;$</span>
          <span className="tier__unit">/mois</span>
        </p>
      </header>

      <dl className="tier__keys">
        {p.keys.map((x) => (
          <div className="tier__key" key={x.k}>
            <dt>{x.k}</dt>
            <dd className={x.up ? "is-up" : undefined}>{x.v}</dd>
          </div>
        ))}
      </dl>

      <a
        href={contactHref(p.slug)}
        className={`btn tier__cta${p.featured ? " btn-accent" : ""}`}
      >
        {p.cta} <span className="arrow" aria-hidden="true">&#8594;</span>
      </a>

      <div className="tier__body">
        <span className="tier__label">{p.listLabel}</span>
        <ul className="tier__list">
          {p.items.map((it) => (
            <li key={it.t} className={it.base ? "is-base" : undefined}>
              <span className="tier__ico" aria-hidden="true">{BENEFIT_ICONS[it.icon]}</span>
              <span>{it.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.article>
  );
};

const Pricing = ({
  id = "forfaits",
  eyebrow = "Forfaits · abonnement mensuel",
  title = (<>Deux forfaits. <em>Tout inclus.</em></>),
}) => {
  const ref = useReveal();
  const reduce = useReducedMotion ? useReducedMotion() : false;
  return (
    <section className="section tiers-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="tiers-layout">
        <div className="tiers-intro reveal" ref={ref}>
          <div className="sec-head">
            <div className="sec-head__eyebrow"><span className="dash"></span><span>{eyebrow}</span></div>
            <h2 className="sec-head__t" id={`${id}-title`}>{title}</h2>
          </div>
          <p className="tiers-pitch">{SUBSCRIPTION_PITCH}</p>
          <ul className="tiers-assure">
            {ASSURANCES.map((a) => (
              <li key={a.t}>
                <span className="tier__ico" aria-hidden="true">{BENEFIT_ICONS[a.icon]}</span>
                {a.t}
              </li>
            ))}
          </ul>
        </div>

        <div className="tiers">
          {PLANS.map((p, i) => <PlanCard key={p.slug} p={p} i={i} reduce={reduce} />)}
        </div>
      </div>
    </section>
  );
};

window.Pricing = Pricing;
window.PLANS = PLANS;
