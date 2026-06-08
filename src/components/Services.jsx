/* ============================================================
   Services.jsx — Section forfaits / plans tarifaires
   Dépend de : window.BENEFIT_ICONS, window.useReveal
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

// ── En-tête de section (partagé avec Portfolio, About, FAQ) ──
const SectionHead = ({ num, kicker, title, right }) => {
  const ref = useReveal();
  return (
    <div className="section-head reveal" ref={ref}>
      <h2 className="section-title">{title}</h2>
    </div>
  );
};

// ── Données ──
const PLANS = [
  {
    id: "site",
    tier: "Site Web",
    price: "1 500 $",
    priceUnit: "unique",
    bestFor: "Un site professionnel, livré clé en main.",
    featured: false,
    badge: null,
    items: [
      { icon: "layout",     bold: "5 pages",             rest: " (Accueil, Services, À propos, Portfolio, Contact)" },
      { icon: "smartphone", bold: "Mobile responsive",   rest: " — parfait sur tous les appareils" },
      { icon: "pencil",     bold: "Design personnalisé", rest: " — pas un template" },
      { icon: "link",       bold: "Formulaire de contact", rest: " inclus" },
    ],
  },
  {
    id: "maintenance",
    tier: "Hébergement & Maintenance",
    price: "250 $",
    priceUnit: "mois",
    bestFor: "Votre site en ligne, performant, sans souci.",
    featured: true,
    badge: "Recommandé",
    items: [
      { icon: "server",        bold: "Hébergement rapide", rest: " + sécurité SSL inclus" },
      { icon: "barchart",      bold: "Rapport mensuel",    rest: " de performance" },
      { icon: "clock",         bold: "1h de modifications", rest: " incluse chaque mois" },
      { icon: "messagecircle", bold: "Support prioritaire", rest: " — réponse rapide garantie" },
    ],
  },
];

const BenefitItem = ({ bold, rest, icon }) => (
  <div className="benefit-row">
    <span className="benefit-icon-svg">{BENEFIT_ICONS[icon]}</span>
    <span className="benefit-text">
      <strong className="benefit-bold">{bold}</strong>
      {rest && <span className="benefit-rest">{rest}</span>}
    </span>
  </div>
);

const PlanCard = ({ plan, i }) => (
  <m.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.2 + i * 0.15 }}
    style={{ height: "100%" }}
  >
    <div className={`plan-card${plan.featured ? " plan-card--featured" : ""}`}>
      <div className="plan-card-header">
        <div className="plan-card-top">
          <span className="plan-tier">{plan.tier}</span>
          {plan.badge && <span className="plan-badge">{plan.badge}</span>}
        </div>
        <span className="plan-amount">
          {plan.price}<sup className="plan-amount-unit">/{plan.priceUnit}</sup>
        </span>
        <p className="plan-best-for">{plan.bestFor}</p>
      </div>
      <div className="plan-benefits">
        <div className="benefit-group">
          <div className="benefit-group-items">
            {plan.items.map((item, j) => <BenefitItem key={j} {...item} />)}
          </div>
        </div>
      </div>
      <a href="#contact" className={`btn plan-cta${plan.featured ? " plan-cta--featured" : ""}`}>
        Démarrer mon projet <span className="arrow">&#8594;</span>
      </a>
    </div>
  </m.div>
);

// ── Section principale ──
const Services = () => {
  const ref = useReveal();
  return (
    <section className="section" id="devis">
      <div className="section-head reveal" ref={ref}>
        <h2 className="section-title">Forfaits</h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        padding: "0 var(--gutter)",
      }}>
        {PLANS.map((plan, i) => <PlanCard key={plan.id} plan={plan} i={i} />)}
      </div>
    </section>
  );
};

window.Services = Services;
window.SectionHead = SectionHead;
