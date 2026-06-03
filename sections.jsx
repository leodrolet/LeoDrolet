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
      <div className="section-num">
        <span>§ {num} — {kicker}</span>
        {right && <span>{right}</span>}
      </div>
      <h2 className="section-title">{title}</h2>
    </div>);

};

// ====================== PRICING (FORFAITS) ======================
const PLANS = [
  {
    id: "essentiel",
    title: "Essentiel",
    price: "300",
    subtitle: "Présence en ligne. Appels entrants.",
    features: [
      "Site jusqu'à 5 pages",
      "Domaine inclus (valeur 20 $/an)",
      "Hébergement haute performance inclus",
      "Formulaire de contact",
      "Optimisation mobile (100 % responsive)",
      "SEO local de base (Google, carte, fiche)",
      "1 heure de modifications / mois",
      "Temps de réponse < 48 h",
    ],
    featured: false,
    badge: null,
  },
  {
    id: "pro",
    title: "Professionnel",
    price: "450",
    subtitle: "La meilleure valeur pour la majorité des PME.",
    features: [
      "Site jusqu'à 10 pages",
      "Domaine inclus",
      "Hébergement inclus",
      "Formulaires avancés (soumissions, devis)",
      "SEO local avancé + Google Business optimisé",
      "2 révisions / mois",
      "2 heures de modifications / mois",
      "Rapport mensuel de performance",
      "Temps de réponse < 24 h",
    ],
    featured: true,
    badge: "Le plus populaire",
  },
  {
    id: "premium",
    title: "Premium",
    price: "700",
    subtitle: "L'arsenal complet pour l'entreprise qui veut tout.",
    features: [
      "Pages illimitées",
      "Domaine inclus",
      "Hébergement inclus",
      "Formulaires + intégrations (CRM, email, etc.)",
      "SEO avancé + suivi de positionnement mensuel",
      "Révisions illimitées",
      "4 heures de modifications / mois",
      "Rapport mensuel détaillé avec recommandations",
      "Support prioritaire — réponse garantie < 4 h",
      "Appel stratégique mensuel (30 min)",
    ],
    featured: false,
    badge: null,
  },
];

const PRICING_STATS = [
  { value: "20+", label: "Entreprises accompagnées" },
  { value: "+180 %", label: "Trafic moyen généré en 90 jours" },
  { value: "7–28 jours", label: "Délai de livraison" },
];

const PlanCard = ({ plan, i }) => (
  <m.article
    className={`plan-card${plan.featured ? " plan-card--featured" : ""}`}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="plan-card-top">
      <span className="plan-num">0{i + 1} / 03</span>
      {plan.badge && <span className="plan-badge">{plan.badge}</span>}
    </div>
    <h3 className="plan-title">{plan.title}</h3>
    <p className="plan-subtitle">{plan.subtitle}</p>
    <div className="plan-price-block">
      <span className="plan-amount">{plan.price}</span>
      <div className="plan-price-meta">$ · mensuel</div>
    </div>
    <ul className="plan-features">
      {plan.features.map((f) => (
        <li key={f}><span className="plan-plus">+</span>{f}</li>
      ))}
    </ul>
    <a
      href="mailto:leo_drolet@noviostudio.online"
      className={`btn plan-cta${plan.featured ? " plan-cta--featured" : ""}`}
    >
      Démarrer mon projet <span className="arrow">&#8594;</span>
    </a>
    <p className="plan-note">Engagement 3 mois · Sans frais cachés</p>
  </m.article>
);

const Services = () => {
  const statsRef    = useReveal();
  const quoteRef    = useReveal();
  const whyRef      = useReveal();

  return (
    <section className="section" id="devis">
      <SectionHead
        num="06"
        kicker="Forfaits"
        title={<>Trois forfaits. <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>Tout inclus.</em></>}
        right="Engagement 3 mois · préavis 30 jours · aucun frais caché"
      />

      <div className="plans-grid">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} i={i} />
        ))}
      </div>

      <div className="pricing-stats reveal" ref={statsRef}>
        {PRICING_STATS.map((s) => (
          <div key={s.value} className="pricing-stat">
            <div className="pricing-stat-value">{s.value}</div>
            <div className="pricing-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="pricing-testimonial reveal" ref={quoteRef}>
        <span className="pricing-aside-label">Témoignage client</span>
        <div>
          <blockquote className="pricing-quote">
            "Nous recevons maintenant 3 à 5 demandes de soumission par semaine depuis la refonte de notre site. Le retour sur investissement est réel."
          </blockquote>
          <p className="pricing-quote-author">— Jean-François B., entrepreneur, Gatineau</p>
        </div>
      </div>

      <div className="pricing-why reveal" ref={whyRef}>
        <span className="pricing-aside-label">Abonnement mensuel</span>
        <div>
          <div className="pricing-why-title">Pourquoi mensuel ?</div>
          <p className="pricing-why-text">
            Contrairement aux agences qui facturent 5 000 $ à 15 000 $ d'entrée de jeu, notre modèle mensuel vous permet de lancer sans investissement massif. Chaque mois : votre site est maintenu, sécurisé, mis à jour et optimisé. Vous ne payez pas seulement un site — vous payez un partenaire web actif.
          </p>
        </div>
      </div>
    </section>
  );
};




// ====================== PORTFOLIO — FOUNDER SLOTS ======================
const SLOTS = [
{ n: "01", status: "Disponible", title: "Couvreur ou entreprise de toiture", sub: "— secteur Gatineau / Hull / Aylmer", deal: "−20% fondateur" },
{ n: "02", status: "Disponible", title: "Plombier ou technicien HVAC", sub: "— services résidentiels Outaouais", deal: "−20% fondateur" },
{ n: "03", status: "Disponible", title: "Paysagiste ou entrepreneur paysagement", sub: "— Gatineau · Ottawa · Cantley", deal: "−20% fondateur" },
{ n: "04", status: "Disponible", title: "Entrepreneur général ou rénovateur", sub: "— cuisine · salle de bain · sous-sol", deal: "−20% fondateur" }];


const Portfolio = () =>
<section className="section" id="travaux">
    <SectionHead
    num="03"
    kicker="Travaux"
    title={<>4 PME vont <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>dominer leur secteur.</em></>}
    right="Cohorte fondateur · 04 places" />

    <RevealItem className="founders-banner">
      <div className="big">4 places fondateur — 20% de réduction permanente.</div>
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
            <span className="deal">{s.deal}</span>
          </div>
        </m.article>
    )}
    </div>
    <div style={{ padding: "40px var(--gutter) 0", textAlign: "center" }}>
      <p className="mono" style={{ fontSize: 12, color: "var(--mute)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
        Aucun projet à montrer encore — c'est la vérité. Tu seras peut-être le premier dans la galerie.
      </p>
    </div>
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
        Je design. Je code. Je livre. Et je reste 30 à 60 jours après le launch pour que tu sois autonome. Tu parles directement avec celui qui pousse le code en prod — pas un compte d'agence.
      </div>
      <div className="stack">
        {["Next.js", "React", "GSAP", "Three.js", "Webflow", "Sanity CMS", "Figma", "SEO local", "Core Web Vitals", "Tailwind"].map((t) => <span key={t} className="tag">{t}</span>)}
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
{ q: "C'est quoi la différence avec WordPress ou Wix ?", a: "Vitesse et contrôle. WordPress/Wix ajoutent 200+ requêtes et plugins qui ralentissent le site et coûtent en hébergement. Je code chaque ligne — résultat : un site qui charge en 0.9s, et qui te ressemble vraiment." },
{ q: "Tu héberges aussi le site ?", a: "Oui — hébergement premium inclus la première année (Vercel ou équivalent). Domaine séparé. Ensuite, ~120$/an si tu veux que je continue, ou je te transfère le tout." },
{ q: "Et si j'ai déjà un logo ou une identité visuelle ?", a: "Parfait — je travaille avec. Si tu n'en as pas, on peut en créer une minimaliste ensemble dans le cadre du projet, ou je te recommande un graphiste de la région." },
{ q: "Travailles-tu à distance ou en personne ?", a: "Les deux. Premier appel en visio ou en personne (café offert à Gatineau ou Ottawa). Build à distance avec liens live. Formation finale en personne si tu préfères." },
{ q: "Et si je veux modifier le site moi-même après ?", a: "Avec l'offre Site Complet, tu reçois un CMS pour tout modifier sans toucher au code. Avec les autres offres, modifications mineures incluses 30 jours, puis 75$/h après." },
{ q: "Je suis contractor, pas technicien — est-ce que je vais comprendre comment gérer mon site ?", a: "Oui. C'est exactement pourquoi je reste 30 à 60 jours après le lancement. Je te montre comment mettre à jour ton contenu, ajouter des photos de projets, et répondre aux soumissions. Pas de jargon technique — tu apprends ce dont tu as besoin, rien de plus." },
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
