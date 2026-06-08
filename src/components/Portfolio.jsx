/* ============================================================
   Portfolio.jsx — Slots fondateur + comparateur agence/novio
   Dépend de : window.useReveal, window.SectionHead
   ============================================================ */

const { useReveal, SectionHead } = window;
const { motion: m } = window.Motion || {};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const RevealItem = ({ as: Tag = "div", className = "", style = {}, delay = 0, children, onClick }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} onClick={onClick}>
      {children}
    </Tag>
  );
};

// ── Données : 4 slots disponibles ──
const SLOTS = [
  { n: "01", status: "Disponible", title: "Couvreur ou entreprise de toiture",      sub: "— secteur Gatineau / Hull / Aylmer" },
  { n: "02", status: "Disponible", title: "Plombier ou technicien HVAC",             sub: "— services résidentiels Outaouais" },
  { n: "03", status: "Disponible", title: "Paysagiste ou entrepreneur paysagement",  sub: "— Gatineau · Ottawa · Cantley" },
  { n: "04", status: "Disponible", title: "Entrepreneur général ou rénovateur",      sub: "— cuisine · salle de bain · sous-sol" },
];

// ── Comparateur agence vs Novio ──
const COMPARE_ROWS = [
  {
    feature: "Site web complet",
    agency:  "5 000 $ – 15 000 $",
    novio:   "1 500 $ · 5 pages · livré en 2–3 semaines",
    novioOk: true,
  },
  {
    feature: "Propriété du site",
    agency:  "Dépend du contrat",
    novio:   "Vous en êtes propriétaire dès la livraison",
    novioOk: true,
  },
  {
    feature: "Hébergement & SSL",
    agency:  "Facturé en supplément",
    novio:   "250 $/mois · tout inclus · sans engagement",
    novioOk: true,
  },
  {
    feature: "Modifications",
    agency:  "100 $ – 200 $/heure",
    novio:   "1h/mois incluse dans la maintenance",
    novioOk: true,
  },
  {
    feature: "Support",
    agency:  "Délais variables · non garanti",
    novio:   "Réponse garantie en moins de 24h",
    novioOk: true,
  },
  {
    feature: "Rapport de performance",
    agency:  "Non inclus",
    novio:   "Inclus chaque mois",
    novioOk: true,
  },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginRight: 6, color: "var(--accent)" }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginRight: 6, opacity: 0.35 }}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CompareTable = () => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    fontSize: "0.88rem",
  }}>
    {/* En-têtes */}
    <div style={{ padding: "14px 18px", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-2)", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      Critère
    </div>
    <div style={{ padding: "14px 18px", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-2)", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
      Agence traditionnelle
    </div>
    <div style={{ padding: "14px 18px", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", background: "rgba(232,98,26,0.08)", borderBottom: "1px solid rgba(232,98,26,0.2)", borderLeft: "1px solid rgba(232,98,26,0.2)" }}>
      Novio Studio
    </div>

    {/* Lignes */}
    {COMPARE_ROWS.map((row, i) => {
      const rowBg = i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent";
      const sep = "1px solid rgba(255,255,255,0.05)";
      return (
        <React.Fragment key={i}>
          <div style={{ padding: "13px 18px", borderBottom: sep, background: rowBg, fontWeight: 500, color: "var(--ink-2)" }}>
            {row.feature}
          </div>
          <div style={{ padding: "13px 18px", borderBottom: sep, background: rowBg, borderLeft: sep, color: "var(--ink-2)", display: "flex", alignItems: "flex-start" }}>
            <CrossIcon />
            <span>{row.agency}</span>
          </div>
          <div style={{ padding: "13px 18px", borderBottom: sep, background: i % 2 === 0 ? "rgba(232,98,26,0.05)" : "rgba(232,98,26,0.03)", borderLeft: "1px solid rgba(232,98,26,0.15)", color: "var(--ink)", display: "flex", alignItems: "flex-start" }}>
            <CheckIcon />
            <span>{row.novio}</span>
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

// ── Section principale ──
const Portfolio = () => (
  <section className="section" id="travaux">
    <SectionHead
      num="03"
      kicker="Travaux"
      title={<>4 PME vont <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>dominer leur secteur.</em></>}
      right="Cohorte fondateur · 04 places"
    />
    <RevealItem className="founders-banner">
      <div className="big">4 places fondateur disponibles.</div>
      <div>Votre concurrent n'est pas encore dans notre galerie. Soyez le premier.</div>
    </RevealItem>
    <div className="portfolio">
      {SLOTS.map((s, i) => (
        <m.article
          key={s.n}
          className="slot"
          onClick={() => { document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' }); }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.28, ease: "easeOut" } }}
          style={{ cursor: "pointer" }}
        >
          <div className="slot-top">
            <span className="slot-num">SLOT {s.n} / 04</span>
            <span className="status">{s.status}</span>
          </div>
          <h4>{s.title}<br /><em>{s.sub}</em></h4>
          <div className="slot-bottom">
            <span style={{ color: "var(--mute)" }}>&#8627; réclamer cette place</span>
          </div>
        </m.article>
      ))}
    </div>
    <m.div
      className="imgcmp-wrap"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
    >
      <div className="imgcmp-eyebrow mono">
        <span className="dash"></span>
        <span>Novio Studio vs agence traditionnelle</span>
      </div>
      <CompareTable />
    </m.div>
  </section>
);

window.Portfolio = Portfolio;
