/* ============================================================
   sections.jsx — Nav, Hero, Marquee, Services, Process,
                  Portfolio, About, FAQ, Final CTA, Footer
   ============================================================ */

const { useReveal, WordReveal, HeroCanvas, HeroVideo, useScrolled, useClock } = window;
const { motion: m } = window.Motion || {};

// Helper component so we can call useReveal once per item without breaking Rules of Hooks in .map()
const RevealItem = ({ as: Tag = "div", className = "", style = {}, delay = 0, children, onClick }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} onClick={onClick}>
      {children}
    </Tag>);

};

// ====================== NAV ======================
const Nav = ({ headline }) => {
  const [pastHero, setPastHero] = React.useState(false);
  React.useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);
  const clock = useClock();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = () => setMenuOpen(false);
  return (
    <React.Fragment>
      <nav className={`nav ${pastHero ? "scrolled" : ""}`} style={{ opacity: "1" }}>
        <a href="#top" className="brand">
          <span className="dot"></span>
          novio<span style={{ fontStyle: "italic", color: "var(--ink-2)" }}>.studio</span>
        </a>
        <div className="nav-links">
          <a href="#travaux">Travaux</a>
          <a href="#studio">Studio</a>
          <a href="#devis">Forfaits</a>
        </div>
        <div className="nav-right">
          <button
            className={`nav-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
          <a className="btn nav-cta" href="#devis" style={{ padding: "10px 16px" }}>
            Démarrer <span className="arrow">&#8594;</span>
          </a>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={close} aria-label="Fermer">&#215;</button>
          <a href="#travaux" onClick={close}>Travaux</a>
          <a href="#studio" onClick={close}>Studio</a>
          <a href="#devis" className="mobile-menu-cta" onClick={close}>Démarrer &#8594;</a>
        </div>
      )}
    </React.Fragment>
  );
};

// ====================== HERO DITHERING ======================
const BAYER4 = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
const HeroDithering = ({ speedRef }) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CELL = 3;
    let w = 0, h = 0, t = 0, raf = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.floor(r.width); h = Math.floor(r.height);
      canvas.width = w; canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const getAccentRGB = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5b2e';
      if (v.startsWith('#') && v.length === 7)
        return [parseInt(v.slice(1,3),16), parseInt(v.slice(3,5),16), parseInt(v.slice(5,7),16)];
      return [255, 91, 46];
    };
    const draw = () => {
      t += (speedRef.current || 0.2) * 0.016;
      ctx.clearRect(0, 0, w, h);
      const [ar, ag, ab] = getAccentRGB();
      ctx.fillStyle = `rgba(${ar},${ag},${ab},0.55)`;
      const cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const nx = cx / cols, ny = cy / rows;
          const wx = nx + Math.sin(ny * 3.0 + t * 0.7) * 0.12;
          const wy = ny + Math.cos(nx * 2.8 - t * 0.5) * 0.10;
          const noise = (Math.sin(wx * 4.8 + t) * Math.cos(wy * 4.2 - t * 0.7)) * 0.5 + 0.5;
          if (noise > BAYER4[cy % 4][cx % 4] / 16)
            ctx.fillRect(cx * CELL, cy * CELL, CELL, CELL);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return React.createElement('canvas', {
    ref: canvasRef,
    style: { position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', display:'block' }
  });
};

// ====================== HERO ======================
const parseHeadline = (text) => {
  const segments = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|[^*]+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const t = m[0];
    if (t.startsWith('**') && t.endsWith('**')) segments.push({ kind: 'accent', text: t.slice(2, -2) });
    else if (t.startsWith('*') && t.endsWith('*')) segments.push({ kind: 'italic', text: t.slice(1, -1) });
    else segments.push({ kind: 'plain', text: t });
  }
  return segments;
};

const Hero = ({ headline }) => {
  const [hovered, setHovered] = React.useState(false);
  const speedRef = React.useRef(0.2);
  React.useEffect(() => { speedRef.current = hovered ? 0.6 : 0.2; }, [hovered]);
  const segments = React.useMemo(() =>
    parseHeadline(headline || "Sites web qui *ramènent des clients* — pour les **PME de Gatineau.**"),
  [headline]);

  return (
    <section className="hero-section" id="top">
      <div
        className="hero-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="hero-card-dither"><HeroDithering speedRef={speedRef} /></div>
        <div className="hero-card-scrim" />
        <div className="hero-card-inner">
          <h1 className="hero-title">
            {segments.map((seg, i) => (
              <span key={i} className={seg.kind === 'italic' ? 'word italic' : seg.kind === 'accent' ? 'word accent' : ''}>
                {seg.text}
              </span>
            ))}
          </h1>
          <div className="hero-ctas">
            <a className="btn btn-accent" href="#devis">Démarrer un projet <span className="arrow">&#8594;</span></a>
          </div>
        </div>
        <div className="scroll-hint">
          <span className="bar"></span>
          Faire défiler
        </div>
      </div>
    </section>
  );

};

// ====================== MARQUEE ======================
const MarqueeRow = ({ items, reverse = false }) =>
<div className={`marquee ${reverse ? "reverse" : ""}`} style={{ borderRadius: "0px" }}>
    <div className="marquee-track">
      {[0, 1].map((k) =>
    <span key={k}>
          {items.map((it, i) =>
      <React.Fragment key={i}>
              <span>{it}</span>
              <span className="star">&#10022;</span>
            </React.Fragment>
      )}
        </span>
    )}
    </div>
  </div>;


// ====================== SECTION HEAD ======================
const SectionHead = ({ num, kicker, title, right }) => {
  const ref = useReveal();
  return (
    <div className="section-head reveal" ref={ref}>
      <h2 className="section-title">{title}</h2>
    </div>);

};

// ====================== PRICING (FORFAITS) ======================
const PLANS = [
  {
    id: "complet",
    tier: "Tout inclus",
    price: "500 $",
    bestFor: "L'arsenal complet — sans surprise, sans extras cachés.",
    featured: true,
    badge: null,
    groups: [
      {
        label: "Votre site",
        items: [
          { bold: "Jusqu'à 8 pages", rest: " clés", icon: "layout" },
          { bold: "Mobile", rest: " responsive", icon: "smartphone" },
          { bold: "Formulaires", rest: " + intégrations (CRM, email)", icon: "link" },
        ],
      },
      {
        label: "Vos nouveaux clients",
        items: [
          { bold: "Trouvé sur Google", rest: " par vos clients locaux", icon: "search" },
          { bold: "Rapport mensuel", rest: " : vous voyez ce qui marche", icon: "barchart" },
          { bold: "1 heure", rest: " de modifications incluse / mois", icon: "clock" },
          { bold: "Modifications supplémentaires", rest: " : 75 $/heure", icon: "dollar", addOn: true },
        ],
      },
      {
        label: "Zéro souci technique",
        items: [
          { bold: "Quelqu'un répond", rest: " en moins de 24 h", icon: "messagecircle" },
          { bold: "Site toujours en ligne,", rest: " toujours sécurisé", icon: "server" },
          { bold: "4 révisions maximum", rest: " pendant le lancement", icon: "refresh" },
          { bold: "Engagement minimum", rest: " : 3 mois", icon: "calendar" },
          { bold: "Résiliation sans pénalité", rest: " après 3 mois — préavis 30 jours", icon: "shield" },
        ],
      },
    ],
  },
];


const Benefit = ({ text, checked }) => (
  <div className="benefit-row">
    <span className={`benefit-icon${checked ? " benefit-icon--check" : " benefit-icon--x"}`}>
      {checked ? "✓" : "✕"}
    </span>
    <span className={`benefit-text${checked ? "" : " benefit-text--muted"}`}>{text}</span>
  </div>
);

const BENEFIT_ICONS = {
  layout:     (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>),
  smartphone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>),
  link:       (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>),
  search:     (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>),
  barchart:   (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>),
  clock:      (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  dollar:     (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>),
  zap:        (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  server:     (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>),
  refresh:    (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>),
  calendar:   (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>),
  shield:     (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>),
  check:      (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
  pencil:       (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>),
  rocket:       (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>),
  unlock:       (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>),
  messagecircle:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>),
  checkcircle:  (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>),
};

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
      {plan.featured && <div className="plan-featured-badge">Le plus populaire</div>}
      <div className="plan-card-header">
        <div className="plan-card-top">
          <span className="plan-tier">{plan.tier}</span>
          {plan.badge && <span className="plan-badge">{plan.badge}</span>}
        </div>
        <span className="plan-amount">{plan.price}<sup className="plan-amount-unit">/mois</sup></span>
        <p className="plan-best-for">{plan.bestFor}</p>
      </div>
      <div className="plan-benefits">
        {plan.groups.map((g, i) => (
          <BenefitGroup key={i} label={g.label} items={g.items} />
        ))}
      </div>
      <a
        href="mailto:leo_drolet@noviostudio.online"
        className={`btn plan-cta${plan.featured ? " plan-cta--featured" : ""}`}
      >
        Démarrer mon projet <span className="arrow">&#8594;</span>
      </a>
    </div>
  </m.div>
);

const PROMISES = [
  { icon: "rocket",        bold: "En ligne",              rest: " en moins de 3 semaines" },
  { icon: "server",        bold: "Domaine + hébergement",  rest: " inclus" },
  { icon: "unlock",        bold: "Sans engagement",        rest: " après 3 mois" },
  { icon: "messagecircle", bold: "Quelqu'un vous répond",  rest: " en < 24 h" },
  { icon: "refresh",       bold: "Votre site évolue",      rest: " avec vous" },
  { icon: "checkcircle",   bold: "Aucun frais caché",      rest: "" },
];

const PromiseItem = ({ icon, bold, rest }) => (
  <li>
    <span className="promise-icon-svg">{BENEFIT_ICONS[icon]}</span>
    <span>
      <strong className="promise-bold">{bold}</strong>
      {rest && <span className="promise-rest">{rest}</span>}
    </span>
  </li>
);

const Services = () => (
  <section className="section" id="devis">
    <div className="plans-layout">

      <RevealItem className="plans-intro" as="div">
        <span className="eyebrow" style={{ color: "var(--accent)", marginBottom: 20, display: "block" }}>Forfaits</span>
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          Un forfait.<br/>
          <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>Tout inclus.</em>
        </h2>
        <p className="plans-intro-body">
          Le site qui travaille pendant que vous travaillez.
        </p>
        <p className="plans-intro-sub">
          Pendant que vous êtes avec vos clients, votre site en attire de nouveaux.
        </p>
        <ul className="plans-promises">
          {PROMISES.map((p, i) => (
            <PromiseItem key={i} {...p} />
          ))}
        </ul>
      </RevealItem>

      <div className="plans-card-col">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} i={i} />
        ))}
      </div>

    </div>
  </section>
);




// ====================== COMPARE SLIDER ======================
const SLIDER_ROWS = [
  { feature: "Création du site",      agency: "5 000 $ – 15 000 $ one-shot", novio: "Inclus" },
  { feature: "Maintenance",           agency: "Facturée en extra",            novio: "Incluse" },
  { feature: "Modifications",         agency: "100 $ – 200 $/heure",          novio: "50 $/page" },
  { feature: "Support",               agency: "Non garanti",                  novio: "< 4h à 24h" },
  { feature: "Mises à jour sécurité", agency: "Non incluses",                 novio: "Incluses" },
  { feature: "Rapport mensuel",       agency: "Non inclus",                   novio: "Inclus" },
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
    return () => window.removeEventListener('mouseup', stop);
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
      {/* ── Agency — base layer ── */}
      <div className="cslider-side cslider-side--agency">
        <div className="cslider-head">Agence traditionnelle</div>
        {SLIDER_ROWS.map((row, i) => (
          <div key={i} className="cslider-row">
            <span className="cslider-feat">{row.feature}</span>
            <span className="cslider-val">{row.agency}</span>
          </div>
        ))}
      </div>

      {/* ── Novio — clipped top layer, reveals from right ── */}
      <div className="cslider-novio-clip" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="cslider-side cslider-side--novio">
          <div className="cslider-head">Novio Studio</div>
          {SLIDER_ROWS.map((row, i) => (
            <div key={i} className="cslider-row">
              <span className="cslider-feat">{row.feature}</span>
              <span className="cslider-val">
                <span className="cslider-check">✓</span>{row.novio}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider + knob ── */}
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

// ====================== PORTFOLIO — FOUNDER SLOTS ======================
const SLOTS = [
{ n: "01", status: "Disponible", title: "Couvreur ou entreprise de toiture", sub: "— secteur Gatineau / Hull / Aylmer" },
{ n: "02", status: "Disponible", title: "Plombier ou technicien HVAC", sub: "— services résidentiels Outaouais" },
{ n: "03", status: "Disponible", title: "Paysagiste ou entrepreneur paysagement", sub: "— Gatineau · Ottawa · Cantley" },
{ n: "04", status: "Disponible", title: "Entrepreneur général ou rénovateur", sub: "— cuisine · salle de bain · sous-sol" }];


const Portfolio = () =>
<section className="section" id="travaux">
    <SectionHead
    num="03"
    kicker="Travaux"
    title={<>4 PME vont <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>dominer leur secteur.</em></>}
    right="Cohorte fondateur · 04 places" />

    <RevealItem className="founders-banner">
      <div className="big">4 places fondateur disponibles.</div>
      <div>Votre concurrent n'est pas encore dans notre galerie. Soyez le premier.</div>
    </RevealItem>
    <div className="portfolio">
      {SLOTS.map((s, i) =>
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
    )}
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
        <span>Glisse pour comparer</span>
      </div>
      <CompareSlider />
    </m.div>
  </section>;


// ====================== ABOUT ======================
const AboutBody = () => {
  const ref = useReveal();
  return (
    <div className="about-body reveal" ref={ref}>
      <p>
        Bonjour. Je suis <em>Léo</em>. J'ai monté ce studio à Gatineau pour une raison simple : les contractors de l'Outaouais méritent des sites à la hauteur de leur travail — un plombier, couvreur ou paysagiste avec un bon site reçoit des soumissions pendant qu'il travaille, pas seulement par bouche-à-oreille.
      </p>
      <p>
        Pas un template <em>recyclé.</em> Pas une agence à 50K. Du sur-mesure, livré en quelques semaines, par la personne qui te répond au téléphone.
      </p>
      <div className="small">
        Je conçois. Je construis. Je livre. Et je reste 30 à 60 jours après la mise en ligne pour que tu sois autonome. Tu parles directement avec la personne qui fait le travail — pas un compte d'agence.
      </div>
      <div className="stack">
        {["Sites sur mesure", "Animations fluides", "Chargement ultra-rapide", "Design interactif", "Référencement local", "Gestion de contenu simple", "Identité visuelle", "Performance mesurée"].map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>);

};

const About = () => {
  const ref = useReveal();
  return (
    <section className="section" id="studio">
      <SectionHead num="04" kicker="Studio" title="Un humain. Pas une agence." right="Gatineau, QC" />
      <div className="about">
        <div className="about-portrait reveal" ref={ref}>
          <div className="caption">
            <span>NOVIO</span>
            <span>2026.05</span>
          </div>
          <picture>
            <source srcSet="leo.webp" type="image/webp" />
            <img src="leo.jpg" alt="Léo Drolet — Novio Studio" loading="lazy" width="600" height="750" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
          </picture>
        </div>
        <AboutBody />
      </div>
    </section>);

};

// ====================== FAQ ======================
const FAQS = [
{ q: "C'est quoi la différence avec WordPress ou Wix ?", a: "Vitesse et contrôle. WordPress/Wix alourdissent les sites avec des dizaines d'extensions qui ralentissent les chargements. Je construis chaque page sur mesure — résultat : un site qui s'ouvre en moins d'une seconde, et qui te ressemble vraiment." },
{ q: "Tu héberges aussi le site ?", a: "Oui — hébergement professionnel inclus. Domaine séparé. Ensuite, ~120$/an si tu veux que je continue, ou je te transfère le tout." },
{ q: "Et si j'ai déjà un logo ou une identité visuelle ?", a: "Parfait — je travaille avec. Si tu n'en as pas, on peut en créer une minimaliste ensemble dans le cadre du projet, ou je te recommande un graphiste de la région." },
{ q: "Travailles-tu à distance ou en personne ?", a: "Les deux. Premier appel en visio ou en personne (café offert à Gatineau ou Ottawa). Travail à distance avec aperçus en direct. Formation finale en personne si tu préfères." },
{ q: "Et si je veux modifier le site après la mise en ligne ?", a: "Chaque forfait inclut 1, 2 ou 4 révisions gratuites durant le premier mois. Une révision = un fichier texte listant les changements souhaités. Après le premier mois ou les révisions épuisées : 50 $ par page modifiée, 200 $ pour une nouvelle page. Simple, transparent, sans surprise." },
{ q: "Je suis entrepreneur, pas technicien — est-ce que je vais comprendre comment gérer mon site ?", a: "Oui. C'est exactement pourquoi je reste 30 à 60 jours après le lancement. Je te montre comment mettre à jour ton contenu, ajouter des photos de projets, et répondre aux soumissions. Pas de jargon technique — tu apprends ce dont tu as besoin, rien de plus." },
{ q: "Mon téléphone sonne déjà par bouche-à-oreille, pourquoi aurais-je besoin d'un site ?", a: "Parce que ton prochain client te cherche sur Google avant même de t'appeler. S'il ne te trouve pas, il appelle ton concurrent. Un site bien fait capte ces leads que tu ne savais même pas que tu perdais." }];


const FAQ = () => {
  const [open, setOpen] = React.useState(null);
  return (
    <section className="section" id="faq">
      <SectionHead num="05" kicker="FAQ" title="Questions fréquentes." right="&#8593; cliquer pour ouvrir" />
      <div className="faq">
        {FAQS.map((f, i) =>
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="faq-q">
              <span>{f.q}</span><span className="plus">+</span>
            </div>
            <div className="faq-a">{f.a}</div>
          </div>
        )}
      </div>
    </section>);

};

// ====================== FINAL CTA ======================
const FinalCTA = () => {
  const ref = useReveal();
  return (
    <section className="final-cta" id="cta-final">
      <div className="reveal" ref={ref}>
        <div className="huge">
          Prochain contractor dans la galerie — <em>toi.</em>
        </div>
        <div className="actions">
          <a className="btn btn-accent" href="#devis">Réserver mon créneau <span className="arrow">&#8594;</span></a>
          <a className="btn" href="mailto:leo_drolet@noviostudio.online">leo_drolet@noviostudio.online</a>
        </div>
        <div className="small">Premier appel · 15 min · gratuit · on parle chiffres, pas jargon</div>
      </div>
    </section>);

};

// ====================== LEGAL MODAL ======================
const LegalModal = ({ open, onClose, title, children }) => {
  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,.82)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
    >
      <div style={{ background:"var(--bg-2)", border:"1px solid var(--line-strong)", borderRadius:16, width:"100%", maxWidth:640, maxHeight:"85vh", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"24px 28px", borderBottom:"1px solid var(--line)" }}>
          <span style={{ fontFamily:"var(--display)", fontSize:22, fontWeight:400, letterSpacing:"-.01em" }}>{title}</span>
          <button onClick={onClose} style={{ fontFamily:"var(--mono)", fontSize:18, color:"var(--ink-2)", background:"none", border:"none", cursor:"pointer", lineHeight:1 }}>&#10005;</button>
        </div>
        <div style={{ overflowY:"auto", padding:"28px", fontSize:14, lineHeight:1.65, color:"var(--ink-2)" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalSection = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:".16em", textTransform:"uppercase", color:"var(--accent)", marginBottom:10 }}>{title}</div>
    <div>{children}</div>
  </div>
);

// ====================== FOOTER ======================
const Footer = () => {
  const [modal, setModal] = React.useState(null); // "privacy" | "mentions" | null

  return (
  <>
    <footer className="footer">
      <div>
        <div className="brand-big">novio<em>.studio</em></div>
        <div className="mono" style={{ fontSize:10, color:"var(--mute)", marginTop:12, letterSpacing:".14em", textTransform:"uppercase" }}>
          © 2026 · Gatineau, Québec
        </div>
      </div>
      <div>
        <h6>Navigation</h6>
        <ul>
          <li><a href="#top">Accueil</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#travaux">Travaux</a></li>

          <li><a href="#devis">Contact</a></li>
        </ul>
      </div>
      <div>
        <h6>Légal</h6>
        <ul>
          <li><a href="mailto:leo_drolet@noviostudio.online">leo_drolet@noviostudio.online</a></li>
          <li><button onClick={() => setModal("privacy")} style={{ background:"none", border:"none", padding:0, color:"inherit", font:"inherit", cursor:"pointer", textAlign:"left" }}>Confidentialité</button></li>
          <li><button onClick={() => setModal("mentions")} style={{ background:"none", border:"none", padding:0, color:"inherit", font:"inherit", cursor:"pointer", textAlign:"left" }}>Mentions légales</button></li>
        </ul>
      </div>
      <div>
        <h6>Contact</h6>
        <ul>
          <li><a href="mailto:leo_drolet@noviostudio.online">Email</a></li>
          <li><a href="tel:+18736554684">1 873 655 4684</a></li>
        </ul>
      </div>
    </footer>
    <div className="footer-bot">
      <span>© 2026 Novio Studio</span>
      <span className="mono" style={{ letterSpacing:".14em" }}>Secteurs · Toiture · HVAC · Plomberie · Paysagement · Rénovation · Entrepreneur général · Gatineau · Hull · Aylmer · Ottawa · Outaouais</span>
      <span>v1.0 · cohorte fondateur</span>
    </div>

    <LegalModal open={modal === "privacy"} onClose={() => setModal(null)} title="Politique de confidentialité">
      <ModalSection title="Responsable du traitement">
        <p style={{margin:"0 0 6px"}}><strong style={{color:"var(--ink)"}}>Novio Studio</strong> — Leo Drolet, développeur web freelance</p>
        <p style={{margin:"0 0 6px"}}>Gatineau, Québec, Canada</p>
        <p style={{margin:0}}>Email : <a href="mailto:leo_drolet@noviostudio.online" style={{color:"var(--accent)"}}>leo_drolet@noviostudio.online</a></p>
      </ModalSection>
      <ModalSection title="Données collectées">
        <p style={{margin:"0 0 8px"}}>Lors de l'utilisation du formulaire de contact, nous collectons : nom, email, entreprise et description du projet.</p>
        <p style={{margin:0}}>Aucune autre donnée n'est collectée (pas de Google Analytics, pas de Meta Pixel, pas de trackers tiers).</p>
      </ModalSection>
      <ModalSection title="Finalité et base légale">
        <p style={{margin:"0 0 6px"}}><strong style={{color:"var(--ink)"}}>Finalité :</strong> Répondre à vos demandes de devis et assurer le suivi de votre projet.</p>
        <p style={{margin:0}}><strong style={{color:"var(--ink)"}}>Base légale :</strong> Consentement (art. 6(1)(a) RGPD). En soumettant le formulaire, vous consentez au traitement de vos données.</p>
      </ModalSection>
      <ModalSection title="Durée de conservation">
        <p style={{margin:0}}>Vos données sont conservées pendant <strong style={{color:"var(--ink)"}}>12 mois</strong>, puis supprimées. En cas de relation commerciale établie, les données relatives aux contrats peuvent être conservées jusqu'à <strong style={{color:"var(--ink)"}}>5 ans</strong>.</p>
      </ModalSection>
      <ModalSection title="Sous-traitant — Formspree">
        <p style={{margin:"0 0 6px"}}>Le formulaire utilise <strong style={{color:"var(--ink)"}}>Formspree Inc.</strong> comme processeur tiers, conforme au cadre EU-U.S. Data Privacy Framework.</p>
        <p style={{margin:0}}><a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)"}}>formspree.io/legal/privacy-policy</a></p>
      </ModalSection>
      <ModalSection title="Hébergement">
        <p style={{margin:0}}>Site hébergé par <strong style={{color:"var(--ink)"}}>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, USA.</p>
      </ModalSection>
      <ModalSection title="Cookies">
        <p style={{margin:0}}>Ce site utilise uniquement des <strong style={{color:"var(--ink)"}}>cookies techniques essentiels</strong>. Aucun cookie publicitaire ou analytique.</p>
      </ModalSection>
      <ModalSection title="Vos droits (RGPD / Loi 25 Québec)">
        <p style={{margin:"0 0 8px"}}>Vous disposez des droits d'accès, rectification, suppression, portabilité et opposition.</p>
        <p style={{margin:0}}>Contact : <a href="mailto:leo_drolet@noviostudio.online" style={{color:"var(--accent)"}}>leo_drolet@noviostudio.online</a> — Réponse sous 30 jours.</p>
      </ModalSection>
    </LegalModal>

    <LegalModal open={modal === "mentions"} onClose={() => setModal(null)} title="Mentions légales">
      <ModalSection title="Éditeur du site">
        <p style={{margin:"0 0 4px"}}><strong style={{color:"var(--ink)"}}>Novio Studio</strong> — travailleur autonome</p>
        <p style={{margin:"0 0 4px"}}>Représentant : Leo Drolet</p>
        <p style={{margin:"0 0 4px"}}>Gatineau, Québec, Canada</p>
        <p style={{margin:"0 0 4px"}}>Email : <a href="mailto:leo_drolet@noviostudio.online" style={{color:"var(--accent)"}}>leo_drolet@noviostudio.online</a></p>
        <p style={{margin:0}}>Activité : Développement web freelance</p>
      </ModalSection>
      <ModalSection title="Hébergeur">
        <p style={{margin:"0 0 4px"}}><strong style={{color:"var(--ink)"}}>Vercel Inc.</strong></p>
        <p style={{margin:"0 0 4px"}}>340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
        <p style={{margin:0}}><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)"}}>vercel.com</a></p>
      </ModalSection>
      <ModalSection title="Propriété intellectuelle">
        <p style={{margin:0}}>L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de Novio Studio. Toute reproduction sans autorisation écrite préalable est interdite.</p>
      </ModalSection>
      <ModalSection title="Responsabilité">
        <p style={{margin:0}}>Novio Studio s'efforce d'assurer l'exactitude des informations publiées. L'utilisation de ces informations se fait sous la responsabilité exclusive du visiteur.</p>
      </ModalSection>
      <ModalSection title="Données personnelles">
        <p style={{margin:0}}>Le traitement des données est décrit dans notre Politique de confidentialité. Conformément à la Loi 25 du Québec et au RGPD, vous disposez de droits d'accès, rectification, suppression et portabilité.</p>
      </ModalSection>
    </LegalModal>
  </>
  );
};


Object.assign(window, {
  Nav, Hero, MarqueeRow, SectionHead, Services,
  Portfolio, About, FAQ, FinalCTA, Footer
});
