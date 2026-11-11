/* ============================================================
   Pricing.jsx, Forfaits par abonnement (Croissance · Premium).
     · Pricing           : tableau comparatif (accueil, /site-web, /tarifs)
     · SubscriptionModel : fonctionnement de l'abonnement en 3 points
   Les boutons « Choisir … » mènent au formulaire de contact existant
   avec le forfait présélectionné : /contact?forfait=<slug>#formulaire
   Dépend de : window.SectionHead
   ============================================================ */

const { SectionHead } = window;

// Frais de départ uniques (identiques pour les deux forfaits)
const SETUP_FEE = 200;

// Présentation du modèle d'abonnement (texte fourni par Novio Studio)
const SUBSCRIPTION_PITCH =
  "Un site Web professionnel sans investissement initial important. Profitez d'un site conçu pour " +
  "votre entreprise, hébergé, entretenu et optimisé grâce à un abonnement mensuel simple et transparent.";

const PLANS = [
  {
    slug: "croissance",
    name: "Croissance",
    price: 129,
    pitch: "Pour les entreprises en croissance qui souhaitent une présence Web professionnelle et efficace.",
    cta: "Choisir Croissance",
    recommended: true,
  },
  {
    slug: "premium",
    name: "Premium",
    price: 199,
    pitch: "Pour les entreprises qui souhaitent une présence Web entièrement personnalisée et des fonctionnalités avancées.",
    cta: "Choisir Premium",
    recommended: false,
  },
];

// Valeurs par forfait, dans l'ordre de PLANS. true = inclus, false = non inclus.
const ROW_GROUPS = [
  {
    title: "Ce qui distingue les forfaits",
    rows: [
      { label: "Site Web",                                values: ["5 à 10 pages", "Entièrement personnalisé"] },
      { label: "Modifications de contenu ou de design",   values: ["1 h par mois", "Jusqu'à 2 h par mois"] },
      { label: "Optimisation SEO",                        values: ["De base", "Avancée"] },
      { label: "Support",                                 values: ["Technique", "Prioritaire"] },
      { label: "Intégrations avec des services externes", values: [false, true] },
      { label: "Automatisations personnalisées",          values: [false, true] },
    ],
  },
  {
    title: "Inclus dans les deux forfaits",
    rows: [
      { label: "Hébergement Web",                   values: [true, true] },
      { label: "Gestion du nom de domaine",         values: [true, true] },
      { label: "Sécurité et sauvegardes",           values: [true, true] },
      { label: "Maintenance et mises à jour",       values: [true, true] },
      { label: "Formulaire de contact fonctionnel", values: [true, true] },
      { label: "Statistiques de fréquentation",     values: [true, true] },
    ],
  },
];

const contactHref = (slug) => `/contact?forfait=${slug}#formulaire`;

const Check = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
);

const Cell = ({ v }) => {
  if (v === true) return <span className="pt-yes"><Check /><span className="sr-only">Inclus</span></span>;
  if (v === false) return <span className="pt-no"><span aria-hidden="true">—</span><span className="sr-only">Non inclus</span></span>;
  return <span className="pt-val">{v}</span>;
};

const PlanHead = ({ p }) => (
  <th scope="col" className={`pt-plan${p.recommended ? " is-rec" : ""}`}>
    <span className={`pt-plan__rec${p.recommended ? "" : " is-empty"}`} aria-hidden={!p.recommended}>
      {p.recommended ? "Recommandé" : " "}
    </span>
    <span className="pt-plan__name">{p.name}</span>
    <span className="pt-plan__price">
      <span className="pt-plan__amount">{p.price}&nbsp;$</span>
      <span className="pt-plan__per">/mois</span>
    </span>
    <a className={`btn btn--block pt-plan__cta ${p.recommended ? "btn--primary" : "btn--secondary"}`} href={contactHref(p.slug)}>
      {p.cta}
    </a>
    <span className="pt-plan__pitch">{p.pitch}</span>
  </th>
);

const Pricing = ({
  id = "forfaits",
  title = "Deux forfaits, tout inclus.",
  lead = SUBSCRIPTION_PITCH,
  showHead = true,
}) => (
  <section className="section" id={id} aria-labelledby={`${id}-title`}>
    <div className="container">
      {showHead
        ? <SectionHead id={`${id}-title`} title={title} lead={lead} />
        : <h2 className="sr-only" id={`${id}-title`}>{title}</h2>}

      <div className="pt-wrap">
        <table className="pt">
          <caption className="sr-only">Comparaison des forfaits Croissance et Premium</caption>
          <thead>
            <tr>
              <td className="pt-corner">
                <span className="pt-corner__t">Prix mensuel fixe</span>
                <span className="pt-corner__d">Plus {SETUP_FEE}&nbsp;$ de frais de départ, une seule fois, pour les deux forfaits.</span>
              </td>
              {PLANS.map((p) => <PlanHead key={p.slug} p={p} />)}
            </tr>
          </thead>
          {ROW_GROUPS.map((g) => (
            <tbody key={g.title}>
              <tr className="pt-group">
                <th scope="rowgroup">{g.title}</th>
                {PLANS.map((p) => <td key={p.slug} className={p.recommended ? "is-rec" : undefined}></td>)}
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="pt-label">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i} className={PLANS[i].recommended ? "is-rec" : undefined}><Cell v={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Mobile : les boutons sont regroupés sous le tableau, pleine largeur */}
      <div className="pt-mobile">
        <p className="pt-mobile__note">Plus {SETUP_FEE}&nbsp;$ de frais de départ, une seule fois, pour les deux forfaits.</p>
        {PLANS.map((p) => (
          <a key={p.slug} className={`btn btn--lg btn--block ${p.recommended ? "btn--primary" : "btn--secondary"}`} href={contactHref(p.slug)}>
            {p.cta}, {p.price}&nbsp;$/mois
          </a>
        ))}
      </div>

      <p className="pt-foot">
        Une question sur l'abonnement ? <a className="link" href="#faq">Consultez la FAQ</a> ou{" "}
        <a className="link" href="/contact">écrivez-moi</a>.
      </p>
    </div>
  </section>
);

/* ── Fonctionnement de l'abonnement ── */
const MODEL_POINTS = [
  {
    t: `${SETUP_FEE} $ pour démarrer`,
    d: "Des frais de départ uniques, puis un prix fixe chaque mois. Pas de facture de plusieurs milliers de dollars pour lancer votre site.",
  },
  {
    t: "La technique est prise en charge",
    d: "Hébergement, nom de domaine, sécurité, sauvegardes et mises à jour : je m'en occupe, vous vous concentrez sur vos clients.",
  },
  {
    t: "Un site qui reste à jour",
    d: "Des heures de modifications sont incluses chaque mois : 1 h avec Croissance, jusqu'à 2 h avec Premium.",
  },
];

const SubscriptionModel = ({ title = "Comment fonctionne l'abonnement." }) => (
  <section className="section" aria-labelledby="abonnement-title">
    <div className="container">
      <SectionHead id="abonnement-title" title={title} />
      <ol className="points">
        {MODEL_POINTS.map((pt, i) => (
          <li className="point" key={pt.t}>
            <span className="point__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="point__t">{pt.t}</h3>
            <p className="point__d">{pt.d}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

Object.assign(window, { Pricing, SubscriptionModel, PLANS, SETUP_FEE });
