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
    featured: true,
    badge: null,
    subPrice: null,
    paymentNote: null,
    items: [
      { icon: "layout",     bold: "5 pages",               rest: " (Accueil, Services, À propos, Portfolio, Contact)" },
      { icon: "smartphone", bold: "Mobile responsive",     rest: " — parfait sur tous les appareils" },
      { icon: "pencil",     bold: "Design personnalisé",   rest: " — pas un template" },
      { icon: "link",       bold: "Formulaire de contact", rest: " inclus" },
      { icon: "clock",      bold: "Livraison en 2–3 semaines", rest: "" },
    ],
  },
  {
    id: "maintenance",
    tier: "Hébergement & Maintenance",
    price: "250 $",
    priceUnit: "mois",
    bestFor: "Votre site en ligne, performant, sans souci.",
    featured: false,
    badge: null,
    subPrice: "Sans engagement — annulable en tout temps",
    paymentNote: null,
    items: [
      { icon: "server",        bold: "Hébergement rapide",          rest: " + sécurité SSL inclus" },
      { icon: "barchart",      bold: "Rapport mensuel",             rest: " de performance" },
      { icon: "clock",         bold: "1h de modifications",         rest: " incluse chaque mois" },
      { icon: "messagecircle", bold: "Support prioritaire",         rest: " — réponse rapide garantie" },
      { icon: "refresh",       bold: "Sauvegardes automatiques",    rest: " quotidiennes" },
      { icon: "link",          bold: "Nom de domaine non inclus",  rest: " — environ 15 $/an à prévoir", muted: true },
    ],
  },
];

const BenefitItem = ({ bold, rest, icon, muted }) => (
  <div className="benefit-row" style={muted ? { opacity: 0.55 } : undefined}>
    <span className="benefit-icon-svg">{BENEFIT_ICONS[icon]}</span>
    <span className="benefit-text" style={muted ? { fontSize: "0.82em" } : undefined}>
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
        </div>
        <span className="plan-amount">
          {plan.price}<sup className="plan-amount-unit">/{plan.priceUnit}</sup>
        </span>
        {plan.subPrice && (
          <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "var(--ink-2)", letterSpacing: "0.01em" }}>
            {plan.subPrice}
          </p>
        )}
        <p className="plan-best-for">{plan.bestFor}</p>
      </div>
      <div className="plan-benefits">
        <div className="benefit-group">
          <div className="benefit-group-items">
            {plan.items.map((item, j) => <BenefitItem key={j} {...item} />)}
          </div>
        </div>
      </div>
      <a href="https://calendly.com/leo_drolet-noviostudio/conception-site-web" target="_blank" rel="noopener noreferrer" className={`btn plan-cta${plan.featured ? " plan-cta--featured" : ""}`}>
        Démarrer mon projet <span className="arrow">&#8594;</span>
      </a>
      {plan.paymentNote && (
        <p style={{ margin: "12px 0 0", fontSize: "0.75rem", textAlign: "center", color: "var(--ink-2)", letterSpacing: "0.01em" }}>
          {plan.paymentNote}
        </p>
      )}
    </div>
  </m.div>
);

const REASSURANCE = [
  {
    label: "Satisfaction garantie",
    svg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>),
  },
  {
    label: "Livraison en 2–3 semaines",
    svg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  },
  {
    label: "Basé à Gatineau",
    svg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  },
];

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

      {/* Réassurance */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "32px 48px",
        margin: "48px auto 0",
        padding: "0 var(--gutter)",
        maxWidth: "680px",
      }}>
        {REASSURANCE.map(({ label, svg }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ink-2)", fontSize: "0.85rem", letterSpacing: "0.01em" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>{svg}</span>
            {label}
          </div>
        ))}
      </div>

      {/* Lien vers l'offre Automatisation IA */}
      <div style={{ textAlign: "center", marginTop: "40px", padding: "0 var(--gutter)" }}>
        <a href="/automatisation" className="btn" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "transparent", border: "1px solid var(--line-strong)", color: "var(--ink)",
          padding: "12px 22px",
        }}>
          Et si ton site faisait aussi le suivi&nbsp;? Découvre l'Automatisation&nbsp;IA <span className="arrow">&#8594;</span>
        </a>
      </div>

    </section>
  );
};

window.Services = Services;
window.SectionHead = SectionHead;
window.BenefitItem = BenefitItem;
