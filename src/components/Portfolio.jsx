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
const SLIDER_ROWS = [
  { feature: "Site web complet",       agency: "5 000 $ – 15 000 $",            novio: "1 500 $ · 5 pages · livré en 2–3 semaines" },
  { feature: "Propriété du site",      agency: "Dépend du contrat",              novio: "Vous en êtes propriétaire dès la livraison" },
  { feature: "Hébergement & SSL",      agency: "Facturé en supplément",          novio: "250 $/mois · tout inclus · sans engagement" },
  { feature: "Modifications",          agency: "100 $ – 200 $/heure",            novio: "1h/mois incluse dans la maintenance" },
  { feature: "Support",                agency: "Délais variables · non garanti", novio: "Réponse garantie en moins de 24h" },
  { feature: "Rapport de performance", agency: "Non inclus",                     novio: "Inclus chaque mois" },
];

const CompareSlider = () => {
  const [pos, setPos] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);
  const ref = React.useRef(null);

  const move = React.useCallback((clientX) => {
    if (!dragging || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  }, [dragging]);

  const stop = React.useCallback(() => setDragging(false), []);

  React.useEffect(() => {
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [stop]);

  return (
    <div
      ref={ref}
      className={`cslider${dragging ? ' cslider--drag' : ''}`}
      onMouseMove={(e) => move(e.clientX)}
      onMouseLeave={stop}
      onTouchMove={(e) => { e.preventDefault(); move(e.touches[0].clientX); }}
      onTouchEnd={stop}
    >
      <div className="cslider-side cslider-side--agency">
        <div className="cslider-head">Agence traditionnelle</div>
        {SLIDER_ROWS.map((row, i) => (
          <div key={i} className="cslider-row">
            <span className="cslider-feat">{row.feature}</span>
            <span className="cslider-val">{row.agency}</span>
          </div>
        ))}
      </div>
      <div className="cslider-novio-clip" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="cslider-side cslider-side--novio">
          <div className="cslider-head">Novio Studio</div>
          {SLIDER_ROWS.map((row, i) => (
            <div key={i} className="cslider-row">
              <span className="cslider-feat">{row.feature}</span>
              <span className="cslider-val"><span className="cslider-check">✓</span>{row.novio}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="cslider-track"
        style={{ left: `${pos}%` }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        <div className="cslider-knob">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18L3 12L9 6"/><path d="M15 18L21 12L15 6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

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
      <CompareSlider />
    </m.div>
  </section>
);

window.Portfolio = Portfolio;
