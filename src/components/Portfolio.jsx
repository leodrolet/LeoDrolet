/* ============================================================
   Portfolio.jsx, Slots fondateur + comparateur agence/novio
   Dépend de : window.useReveal, window.SectionHead
   ============================================================ */

const { useReveal, SectionHead, BENEFIT_ICONS } = window;
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
  { n: "01", status: "Disponible", title: "Couvreur ou entreprise de toiture",      sub: "secteur Gatineau / Hull / Aylmer" },
  { n: "02", status: "Disponible", title: "Plombier ou technicien HVAC",             sub: "services résidentiels Outaouais" },
  { n: "03", status: "Disponible", title: "Paysagiste ou entrepreneur paysagement",  sub: "Gatineau · Ottawa · Cantley" },
  { n: "04", status: "Disponible", title: "Entrepreneur général ou rénovateur",      sub: "cuisine · salle de bain · sous-sol" },
];

// ── Comparateur agence vs Novio ──
const COMPARE_ROWS = [
  { icon: "dollar",        feature: "Site web complet",  agency: "5 000 $ – 15 000 $",            novio: "1 500 $ · 5 pages · livré en 2–3 semaines" },
  { icon: "unlock",        feature: "Propriété du site", agency: "Dépend du contrat",              novio: "À vous dès la livraison" },
  { icon: "server",        feature: "Hébergement & SSL", agency: "Facturé en supplément",          novio: "119 $/mois · tout inclus · sans engagement" },
  { icon: "pencil",        feature: "Modifications",     agency: "100 $ – 200 $/heure",            novio: "30 min/mois incluses dans la maintenance" },
  { icon: "messagecircle", feature: "Support",           agency: "Délais variables · non garanti", novio: "Support par courriel inclus" },
];

// Scorecard : deux colonnes alignées (subgrid), colonne Novio surélevée.
const ScoreCard = ({ rows = COMPARE_ROWS, leftHead = "Agence traditionnelle", rightHead = "Novio Studio" }) => {
  const Cell = ({ row, side, delay }) => (
    <m.div
      className="cscore-cell"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT_EXPO }}
    >
      <span className="cscore-feat">
        <span className="cscore-ico">{BENEFIT_ICONS[row.icon]}</span>{row.feature}
      </span>
      {side === "novio" ? (
        <span className="cscore-val">
          <span className="cscore-mark cscore-mark--yes">✓</span>{row.novio}
        </span>
      ) : (
        <span className="cscore-val cscore-val--agency">
          <span className="cscore-mark cscore-mark--no">✕</span>{row.agency}
        </span>
      )}
    </m.div>
  );

  return (
    <div className="cscore" role="table" aria-label="Comparatif agence traditionnelle vs Novio Studio">
      <div className="cscore-card cscore-card--agency">
        <div className="cscore-head" role="columnheader">{leftHead}</div>
        {rows.map((row, i) => <Cell key={i} row={row} side="agency" delay={i * 0.06} />)}
        <div className="cscore-foot">
          <span className="cscore-foot-note">Coûts variables · facturés à l'heure</span>
        </div>
      </div>
      <div className="cscore-card cscore-card--novio">
        <div className="cscore-head" role="columnheader">
          {rightHead}<span className="cscore-badge">Recommandé</span>
        </div>
        {rows.map((row, i) => <Cell key={i} row={row} side="novio" delay={0.12 + i * 0.06} />)}
        <div className="cscore-foot">
          <span className="cscore-foot-price">1 500 $ <em>puis 119 $/mois</em></span>
          <a className="btn btn-accent cscore-cta" href="/contact">Démarrer mon projet &#8594;</a>
        </div>
      </div>
    </div>
  );
};

// ── Galerie « réalisations » : slots fondateur ──
const FoundersSlots = () => (
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
          onClick={() => { window.location.href = "/contact"; }}
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
  </section>
);

// ── Comparateur Novio vs agence traditionnelle ──
const CompareAgency = () => (
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
    <ScoreCard />
  </m.div>
);

window.FoundersSlots = FoundersSlots;
window.CompareAgency = CompareAgency;
window.ScoreCard = ScoreCard;
