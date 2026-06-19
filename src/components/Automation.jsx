/* ============================================================
   Automation.jsx — Section « Automatisation IA »
   Offre complémentaire au site web : automatisations qui font
   gagner du temps et des contrats aux entrepreneurs.
   Dépend de : window.useReveal, window.BENEFIT_ICONS,
               window.BenefitItem, window.CompareSlider, window.Motion
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS, BenefitItem } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const CALENDLY = "https://calendly.com/leo_drolet-noviostudio/conception-site-web";

// ── Métriques (même format « specs sheet » que la section Specs) ──
const AUTO_METRICS = [
  { v: "24", u: "/7",   k: "Toujours actif",      d: "Répond aux leads la nuit, la fin de semaine, pendant que tu es sur un chantier." },
  { v: "5",  u: "min",  k: "Délai de réponse",    d: "Un SMS part dans les minutes suivant un appel manqué — pendant que le lead est encore chaud." },
  { v: "80", u: "%",    k: "Soumissions suivies", d: "La majorité des soumissions sans suivi ne reviennent jamais. On les relance automatiquement." },
  { v: "250", u: "$/mois", k: "Par automatisation", d: "Tout inclus — hébergement, maintenance et ajustements. Aucun frais d'installation." },
];

const AutoMetric = ({ s, i }) => {
  const ref = useReveal();
  return (
    <div className="spec reveal" ref={ref} style={{ transitionDelay: `${i * 70}ms` }}>
      <div className="spec-num">
        <span className="spec-v">{s.v}</span>
        <span className="spec-u">{s.u}</span>
      </div>
      <div className="spec-k">{s.k}</div>
      <p className="spec-d">{s.d}</p>
      <div className="spec-axis"></div>
    </div>
  );
};

// ── Données : 4 automatisations (même format que les forfaits) ──
const AUTOMATIONS = [
  {
    id: "appels",
    tier: "Réponse aux appels manqués",
    icon: "phone",
    price: "250 $",
    priceUnit: "mois",
    subPrice: "Sans frais d'installation · sans engagement",
    pitch: "« Un appel manqué un vendredi soir, c'est un contrat chez le concurrent. »",
    featured: true,
    items: [
      { icon: "phone",         bold: "SMS automatique",      rest: " dès qu'un appel est manqué" },
      { icon: "checkcircle",   bold: "Qualifie le lead",     rest: " et garde la conversation vivante" },
      { icon: "calendar",      bold: "Propose un rendez-vous", rest: " sans que tu lèves le petit doigt" },
    ],
  },
  {
    id: "chatbot",
    tier: "Chatbot de qualification",
    icon: "messagecircle",
    price: "250 $",
    priceUnit: "mois",
    subPrice: "Sans frais d'installation · sans engagement",
    pitch: "« Le site travaille même quand tu es sur un toit. »",
    featured: false,
    items: [
      { icon: "messagecircle", bold: "Répond aux questions fréquentes", rest: " — prix, délais, secteur desservi" },
      { icon: "checkcircle",   bold: "Qualifie le lead",                rest: " avant de te le transférer" },
      { icon: "clock",         bold: "Disponible 24/7",                 rest: " — jamais de question sans réponse" },
    ],
  },
  {
    id: "relance",
    tier: "Relance des soumissions",
    icon: "refresh",
    price: "250 $",
    priceUnit: "mois",
    subPrice: "Sans frais d'installation · sans engagement",
    pitch: "« 80 % des soumissions non suivies ne reviennent jamais. On les relance pour toi. »",
    featured: false,
    items: [
      { icon: "refresh",  bold: "Relance les leads",       rest: " qui n'ont pas répondu après quelques jours" },
      { icon: "zap",      bold: "Séquence SMS / email",    rest: " automatique, sans intervention" },
      { icon: "checkcircle", bold: "S'arrête seule",       rest: " dès que le client répond" },
    ],
  },
  {
    id: "avis",
    tier: "Demande d'avis Google",
    icon: "star",
    price: "250 $",
    priceUnit: "mois",
    subPrice: "Sans frais d'installation · sans engagement",
    pitch: "« Plus d'avis Google = plus haut sur la carte = plus d'appels. »",
    featured: false,
    items: [
      { icon: "star",     bold: "Demande automatique",     rest: " envoyée après chaque contrat terminé" },
      { icon: "link",     bold: "Lien direct",             rest: " vers ta fiche Google — un clic pour le client" },
      { icon: "barchart", bold: "Meilleur classement",     rest: " local au fil des avis qui s'accumulent" },
    ],
  },
];

const AutoCard = ({ a, i }) => (
  <m.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.12 }}
    style={{ height: "100%" }}
  >
    <div className={`plan-card${a.featured ? " plan-card--featured" : ""}`}>
      <div className="plan-card-header">
        <div className="plan-card-top">
          <span className="plan-tier">
            <span className="benefit-icon-svg" style={{ color: "var(--accent)", marginRight: "8px", verticalAlign: "-3px" }}>{BENEFIT_ICONS[a.icon]}</span>
            {a.tier}
          </span>
        </div>
        <span className="plan-amount">
          {a.price}<sup className="plan-amount-unit">/{a.priceUnit}</sup>
        </span>
        <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "var(--ink-2)", letterSpacing: "0.01em" }}>
          {a.subPrice}
        </p>
        <p className="plan-best-for">{a.pitch}</p>
      </div>
      <div className="plan-benefits">
        <div className="benefit-group">
          <div className="benefit-group-items">
            {a.items.map((item, j) => <BenefitItem key={j} {...item} />)}
          </div>
        </div>
      </div>
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`btn plan-cta${a.featured ? " plan-cta--featured" : ""}`}>
        Automatiser ça <span className="arrow">&#8594;</span>
      </a>
    </div>
  </m.div>
);

// ── Comparateur « Sans automatisation » vs « Avec Novio » ──
const AUTO_COMPARE_ROWS = [
  { feature: "Appels manqués",        agency: "Perdus — le lead appelle le concurrent", novio: "Récupérés automatiquement par SMS" },
  { feature: "Suivi des soumissions", agency: "Manuel, souvent oublié",                 novio: "Automatique et systématique" },
  { feature: "Avis Google",           agency: "Rares, au hasard",                       novio: "Générés après chaque contrat" },
  { feature: "Temps de gestion",      agency: "Des heures chaque semaine",              novio: "Quelques minutes de supervision" },
];

// ── Section principale ──
const Automation = ({ lead = true }) => {
  const headRef = useReveal();
  const { CompareSlider } = window;
  return (
    <section className="section" id="automatisation">
      {lead && (
        <React.Fragment>
          <div className="section-head reveal" ref={headRef}>
            <h2 className="section-title">Automatisation IA</h2>
          </div>
          <p className="specs-sub" style={{ textAlign: "center", margin: "0 auto 8px", maxWidth: "640px", padding: "0 var(--gutter)" }}>
            Un beau site attire les clients. L'automatisation s'assure qu'aucun ne t'échappe.
            Des outils simples qui répondent, relancent et qualifient à ta place — pendant que tu travailles.
          </p>
        </React.Fragment>
      )}

      {/* Métriques — format « specs sheet » */}
      <div className="specs-grid" style={{ marginTop: lead ? "40px" : "0" }}>
        {AUTO_METRICS.map((s, i) => <AutoMetric key={i} s={s} i={i} />)}
      </div>

      {/* 4 automatisations */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        padding: "0 var(--gutter)",
        marginTop: "48px",
      }}>
        {AUTOMATIONS.map((a, i) => <AutoCard key={a.id} a={a} i={i} />)}
      </div>

      {/* Pack Croissance */}
      <m.div
        className="founders-banner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        style={{ marginTop: "32px" }}
      >
        <div className="big">Pack Croissance — site web + 2 automatisations.</div>
        <div>Ton site qui attire, deux automatisations qui convertissent — à prix réduit. La machine complète pour remplir ton agenda, sans engagement.</div>
      </m.div>

      {/* Comparateur */}
      <m.div
        className="imgcmp-wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
      >
        <div className="imgcmp-eyebrow mono">
          <span className="dash"></span>
          <span>Sans automatisation vs avec Novio</span>
        </div>
        {CompareSlider && (
          <CompareSlider rows={AUTO_COMPARE_ROWS} leftHead="Sans automatisation" rightHead="Avec Novio" />
        )}
      </m.div>
    </section>
  );
};

window.Automation = Automation;
