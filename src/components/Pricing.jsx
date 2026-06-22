/* ============================================================
   Pricing.jsx, Page Tarifs : hub de prix (site + hébergement +
   automatisations) + pack groupé. Comparateur ajouté au niveau
   de la page (window.CompareAgency).
   Dépend de : window.useReveal, window.BENEFIT_ICONS, window.Motion
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const CONTACT = "/contact";

// ── Trois lignes de prix (site unique · hébergement mensuel · IA mensuel) ──
const PRICE_PLANS = [
  {
    tier: "Site Web", price: "1 500 $", unit: "unique",
    best: "Un site sur mesure, livré clé en main.", sub: null, featured: false,
    items: [
      { icon: "layout",     t: "5 pages sur mesure" },
      { icon: "smartphone", t: "Mobile responsive, rapide partout" },
      { icon: "pencil",     t: "Design personnalisé, pas un template" },
      { icon: "link",       t: "Formulaire de contact inclus" },
      { icon: "clock",      t: "Livré en 2–3 semaines" },
    ],
  },
  {
    tier: "Hébergement & maintenance", price: "119 $", unit: "mois",
    best: "Ton site en ligne, sans souci.", sub: "Sans engagement, annulable en tout temps", featured: false,
    items: [
      { icon: "server",        t: "Hébergement rapide + SSL" },
      { icon: "refresh",       t: "Sauvegardes quotidiennes" },
      { icon: "clock",         t: "30 min de modifications par mois" },
      { icon: "messagecircle", t: "Support par courriel" },
    ],
  },
  {
    tier: "Automatisation IA", price: "250 $", unit: "mois",
    best: "Par automatisation. Aucun lead ne t'échappe.", sub: "Sans frais d'installation", featured: true,
    items: [
      { icon: "phone",         t: "Réponse aux appels manqués" },
      { icon: "messagecircle", t: "Chatbot de qualification 24/7" },
      { icon: "refresh",       t: "Relance des soumissions" },
      { icon: "star",          t: "Avis Google automatiques" },
    ],
  },
];

const PriceCard = ({ p, i }) => (
  <m.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 + i * 0.12 }}
    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
    style={{ height: "100%" }}
  >
    <div className={`plan-card${p.featured ? " plan-card--featured" : ""}`}>
      {p.featured && <span className="plan-badge">Le plus demandé</span>}
      <div className="plan-card-header">
        <div className="plan-card-top"><span className="plan-tier">{p.tier}</span></div>
        <span className="plan-amount">{p.price}<sup className="plan-amount-unit">/{p.unit}</sup></span>
        {p.sub && <p className="plan-sub-note">{p.sub}</p>}
        <p className="plan-best-for">{p.best}</p>
      </div>
      <div className="plan-benefits">
        <div className="benefit-group-items">
          {p.items.map((it, j) => (
            <div key={j} className="benefit-row">
              <span className="benefit-icon-svg">{BENEFIT_ICONS[it.icon]}</span>
              <span className="benefit-text"><strong className="benefit-bold">{it.t}</strong></span>
            </div>
          ))}
        </div>
      </div>
      <a href={CONTACT} className={`btn plan-cta${p.featured ? " plan-cta--featured" : ""}`}>
        Démarrer mon projet <span className="arrow">&#8594;</span>
      </a>
    </div>
  </m.div>
);

// ── Pack groupé (bande pleine largeur) ──
const PricingPack = () => (
  <m.section
    className="pack"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
  >
    <div>
      <h2 className="pack__t">Pack Croissance</h2>
      <p className="pack__d">
        Ton site qui attire plus deux automatisations qui convertissent. La machine complète pour
        remplir ton agenda, un seul interlocuteur, un seul forfait, sans engagement.
      </p>
      <div className="pack__price">
        <span className="pack__old">1 500 $ + 500 $/mois</span>
        <span className="pack__new">1 500 $ + 400 $/mois</span>
        <span className="pack__save">Économise 1 200 $/an</span>
      </div>
    </div>
    <div className="pack__cta">
      <a href={CONTACT} className="btn btn-accent">Démarrer mon projet <span className="arrow">&#8594;</span></a>
      <span className="pack__note">Site + 2 automatisations au choix</span>
    </div>
  </m.section>
);

const Pricing = () => {
  const ref = useReveal();
  return (
    <section className="section pricing" id="tarifs">
      <div className="sec-head reveal" ref={ref}>
        <h2 className="sec-head__t">Trois briques, <em>aucune surprise.</em></h2>
      </div>
      <div className="pricing-grid">
        {PRICE_PLANS.map((p, i) => <PriceCard key={p.tier} p={p} i={i} />)}
      </div>
      <PricingPack />
    </section>
  );
};

window.Pricing = Pricing;
