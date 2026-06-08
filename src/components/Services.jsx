/* ============================================================
   Services.jsx — Section forfaits / plans tarifaires
   Dépend de : window.BENEFIT_ICONS, window.useReveal (via RevealItem)
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

// ── Composant utilitaire (répété localement pour éviter une dépendance globale) ──
const RevealItem = ({ as: Tag = "div", className = "", style = {}, delay = 0, children, onClick }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} onClick={onClick}>
      {children}
    </Tag>
  );
};

// ── En-tête de section ──
const SectionHead = ({ num, kicker, title, right }) => {
  const ref = useReveal();
  return (
    <div className="section-head reveal" ref={ref}>
      <h2 className="section-title">{title}</h2>
    </div>
  );
};

// ── Données : plan unique ──
const PLANS = [
  {
    id: "arsenal",
    tier: "Site Web Clé en Main",
    price: "1 750 $",
    priceUnit: "unique",
    bestFor: "5 pages · paiement unique · livré en 3 semaines.",
    featured: true,
    badge: null,
    optionB: "Besoin de plus ? Le prix est réévalué selon vos demandes précises.",
    groups: [
      {
        label: "Votre site clé en main",
        items: [
          { bold: "5 pages incluses", rest: " — accueil, services, à propos, contact + 1 au choix", icon: "layout" },
          { bold: "Mobile responsive", rest: " — parfait sur tous les appareils", icon: "smartphone" },
          { bold: "Formulaires & intégrations", rest: " inclus", icon: "link" },
        ],
      },
      {
        label: "Votre visibilité",
        items: [
          { bold: "SEO local optimisé", rest: " — trouvé sur Google dans votre région", icon: "search" },
          { bold: "Domaine + hébergement", rest: " — configurés et mis en ligne", icon: "server" },
          { bold: "Livraison en < 3 semaines", rest: " — délai respecté", icon: "clock" },
        ],
      },
      {
        label: "Votre tranquillité d'esprit",
        items: [
          { bold: "Le site vous appartient", rest: " dès la livraison", icon: "unlock" },
          { bold: "Support inclus", rest: " — réponse rapide garantie", icon: "messagecircle" },
          { bold: "Prix ajusté", rest: " selon vos besoins réels — jamais de surprise", icon: "dollar" },
        ],
      },
    ],
  },
];

const PROMISES = [
  { icon: "rocket",        bold: "En ligne",               rest: " en moins de 3 semaines" },
  { icon: "server",        bold: "Domaine + hébergement",  rest: " configurés et mis en ligne" },
  { icon: "unlock",        bold: "Le site vous appartient", rest: " dès la livraison" },
  { icon: "messagecircle", bold: "Support",                rest: " en < 24 h" },
  { icon: "checkcircle",   bold: "Prix réévalué",          rest: " selon vos besoins précis" },
  { icon: "dollar",        bold: "Aucun frais caché",      rest: "" },
];

// ── Sous-composants ──
const BenefitItem = ({ bold, rest, icon, addOn }) => (
  <div className={`benefit-row${addOn ? " benefit-row--addon" : ""}`}>
    <span className="benefit-icon-svg">{BENEFIT_ICONS[icon]}</span>
    <span className="benefit-text">
      <strong className="benefit-bold">{bold}</strong>
      {rest && <span className="benefit-rest">{rest}</span>}
    </span>
  </div>
);

const BenefitGroup = ({ label, items }) => (
  <div className="benefit-group">
    <span className="benefit-group-label">{label}</span>
    <div className="benefit-group-items">
      {items.map((item, i) => <BenefitItem key={i} {...item} />)}
    </div>
  </div>
);

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const PlanCard = ({ plan, i }) => (
  <m.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.28 + i * 0.16 }}
    style={{ height: "100%" }}
  >
    <div className={`plan-card${plan.featured ? " plan-card--featured" : ""}`} style={{ animationDelay: `${-i * 1.6}s` }}>
      <div className="plan-card-header">
        <div className="plan-card-top">
          <span className="plan-tier">{plan.tier}</span>
          {plan.badge && <span className="plan-badge">{plan.badge}</span>}
        </div>
        <span className="plan-amount">{plan.price}<sup className="plan-amount-unit">/{plan.priceUnit}</sup></span>
        <p className="plan-best-for">{plan.bestFor}</p>
        {plan.optionB && (
          <div style={{
            marginTop: "12px", padding: "10px 14px",
            background: "rgba(255,91,46,0.08)", border: "1px solid rgba(255,91,46,0.25)",
            borderRadius: "8px", fontSize: "13px", color: "var(--accent)",
            fontFamily: "var(--mono)", letterSpacing: ".02em"
          }}>
            {plan.optionB}
          </div>
        )}
      </div>
      <div className="plan-benefits">
        {plan.groups.map((g, i) => <BenefitGroup key={i} label={g.label} items={g.items} />)}
      </div>
      <a href="https://calendly.com/leo_drolet-noviostudio/30min" target="_blank" rel="noopener noreferrer" className={`btn plan-cta${plan.featured ? " plan-cta--featured" : ""}`}>
        Démarrer mon projet <span className="arrow">&#8594;</span>
      </a>
    </div>
  </m.div>
);

const PromiseItem = ({ icon, bold, rest }) => (
  <li>
    <span className="promise-icon-svg">{BENEFIT_ICONS[icon]}</span>
    <span>
      <strong className="promise-bold">{bold}</strong>
      {rest && <span className="promise-rest">{rest}</span>}
    </span>
  </li>
);

// ── Section principale ──
const Services = () => (
  <section className="section" id="devis">
    <div className="plans-layout">
      <RevealItem className="plans-intro" as="div">
        <span className="eyebrow" style={{ color: "var(--accent)", marginBottom: 20, display: "block" }}>Forfaits</span>
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          L'Arsenal Web<br/>
          <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>Évolutif.</em>
        </h2>
        <p className="plans-intro-body">1 750 $ · paiement unique · 5 pages.</p>
        <p className="plans-intro-sub">Le prix de base couvre un site complet de 5 pages. Des besoins supplémentaires ? On réévalue ensemble selon ce que vous demandez, clairement.</p>
        <ul className="plans-promises">
          {PROMISES.map((p, i) => <PromiseItem key={i} {...p} />)}
        </ul>
      </RevealItem>
      <div className="plans-card-col">
        {PLANS.map((plan, i) => <PlanCard key={plan.id} plan={plan} i={i} />)}
      </div>
    </div>
  </section>
);

window.Services = Services;
window.SectionHead = SectionHead;
