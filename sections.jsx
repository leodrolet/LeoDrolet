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
  const scrolled = useScrolled(40);
  const clock = useClock();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = () => setMenuOpen(false);
  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} style={{ opacity: "1" }}>
        <a href="#top" className="brand">
          <span className="dot"></span>
          novio<span style={{ fontStyle: "italic", color: "var(--ink-2)" }}>.studio</span>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#travaux">Travaux</a>
          <a href="#studio">Studio</a>
          <a href="/diagnostic">Diagnostic</a>
          <a href="#devis">Devis</a>
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
            Démarrer <span className="arrow">→</span>
          </a>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={close} aria-label="Fermer">×</button>
          <a href="#services" onClick={close}>Services</a>
          <a href="#travaux" onClick={close}>Travaux</a>
          <a href="#studio" onClick={close}>Studio</a>
          <a href="/diagnostic" onClick={close}>Diagnostic gratuit</a>
          <a href="#devis" className="mobile-menu-cta" onClick={close}>Démarrer →</a>
        </div>
      )}
    </React.Fragment>
  );
};

// ====================== HERO ======================
const Hero = ({ headline, accent, shape }) => {
  // Build the hero title from the headline tweak.
  // Default: "Expérience captivante et réfléchie"
  // We'll wrap *italic* and **accent** tokens via WordReveal.
  // For display we hand-format with our own line breaks for big drama.
  const tokens = React.useMemo(() => {
    const words = (headline || "Expérience captivante et réfléchie").trim().split(/\s+/);
    // Default styling: italicize every other "key" word to feel editorial.
    // If headline has explicit *...* / **...** markers, respect them via WordReveal logic.
    return words;
  }, [headline]);

  const titleVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.028, delayChildren: 0.1 } },
  };
  const wordVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.022 } },
  };
  const charVariants = {
    hidden: { opacity: 0, y: "0.45em" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="hero-scroll">
    <header className="hero" id="top">
      <HeroVideo />

      {/* Big title */}
      <div className="hero-body">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          <span>Studio web · Gatineau, QC</span>
        </div>
        <m.h1
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {tokens.map((tok, i) => {
            let kind = "plain"; let display = tok;
            if (tok.startsWith("**") && tok.endsWith("**")) { kind = "accent"; display = tok.slice(2, -2); }
            else if (tok.startsWith("*") && tok.endsWith("*")) { kind = "italic"; display = tok.slice(1, -1); }
            return (
              <React.Fragment key={i}>
                <m.span
                  className={`word ${kind === "italic" ? "italic" : ""} ${kind === "accent" ? "accent" : ""}`}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                  variants={wordVariants}
                >
                  {display.split("").map((char, j) => (
                    <m.span key={j} style={{ display: "inline-block" }} variants={charVariants}>
                      {char}
                    </m.span>
                  ))}
                </m.span>
                {i < tokens.length - 1 ? " " : ""}
              </React.Fragment>
            );
          })}
        </m.h1>
      </div>

      {/* Bottom row */}
      <div className="hero-foot">
        <div className="hero-foot-left">
          <p className="lead">
            Votre site devrait vous amener des <em>appels</em> — pas juste des visites. Studio à Gatineau, livré en 7 à 28 jours.
          </p>
          <div className="hero-foot-meta">
            <span className="hero-avail">
              <span className="hero-avail-dot"></span>
              Disponible
            </span>
            <span className="hero-foot-sep" aria-hidden="true">·</span>
            <span>Gatineau · Ottawa · Outaouais</span>
          </div>
        </div>
        <div className="hero-ctas">
          <a className="btn btn-accent" href="#devis">Démarrer un projet <span className="arrow">→</span></a>
          <a className="btn-diag" href="/diagnostic">Diagnostic gratuit <span className="arrow">→</span></a>
          <a className="hero-text-link" href="#travaux">Voir les travaux →</a>
        </div>
      </div>

      <div className="scroll-hint">
        <span className="bar"></span>
        Faire défiler
      </div>
    </header>
    </div>);

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
              <span className="star">✦</span>
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

// ====================== SERVICES ======================
const SERVICES = [
{
  n: "01",
  title: "Starter",
  subtitle: "Une page. Un message. Des appels.",
  desc: "La page qui transforme vos visiteurs en clients. Design sur mesure, formulaire et hébergement — tout inclus. Opérationnel en 7 jours.",
  items: ["Visible sur Google", "Formulaire de contact", "Hébergement 1 an inclus", "Parfait sur mobile"],
  price: "999",
  delay: "7 jours"
},
{
  n: "02",
  title: "Présence",
  subtitle: "Votre vitrine. Votre crédibilité. Vos clients.",
  desc: "Pour artisans, restos, cliniques. Cinq pages pensées pour convertir, SEO local, design 100% sur mesure.",
  items: ["Classé sur Google local", "Jusqu'à 5 pages", "3 révisions incluses", "Support 30 jours"],
  price: "1\u202F899",
  delay: "2–3 semaines"
},
{
  n: "03",
  title: "Résurrection",
  subtitle: "Votre vieux site — transformé en machine à leads.",
  desc: "Site lent ou daté ? On préserve votre SEO existant, on change tout le reste. Vitesse ×10, redirections propres, trafic intact.",
  items: ["SEO existant préservé", "Vitesse ×10 garantie", "Migration de contenu", "Support 30 jours"],
  price: "3\u202F699",
  delay: "2–4 semaines"
},
{
  n: "04",
  title: "Domination",
  subtitle: "L'arsenal complet pour la PME qui domine sa niche.",
  desc: "CMS, blog, intégrations avancées. Quand votre site devient votre meilleur employé — disponible 24h/24.",
  items: ["CMS modifiable sans technicien", "Blog + intégrations API", "SEO avancé", "Support 60 jours"],
  price: "4\u202F299",
  delay: "2–3 semaines"
}];


const Services = () => {
  const scrollToService = (n) => {
    document.getElementById(`service-${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section" id="services">
      <SectionHead num="01" kicker="Services" title={<>Quatre offres. <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>Zéro flou.</em></>} right="Tarifs ferme · devis 24h" />
      <div className="services-layout">
        <nav className="services-nav">
          {SERVICES.map((s) =>
            <button key={s.n} className="svc-nav-item" onClick={() => scrollToService(s.n)}>
              <span className="svc-nav-num">{s.n}</span>
              <span className="svc-nav-title">{s.title}</span>
              <span className="svc-nav-price">{s.price} $</span>
            </button>
          )}
        </nav>
        <div className="service-stack">
          {SERVICES.map((s, i) =>
            <m.article
              className="service-card"
              key={s.n}
              id={`service-${s.n}`}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="idx">{s.n} / 04</div>
              <div>
                <h3>{s.title}<br /><em>{s.subtitle}</em></h3>
                <p className="desc">{s.desc}</p>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a href="#devis" className="btn cta" style={{ marginTop: 20 }}>
                  Choisir cette offre <span className="arrow">→</span>
                </a>
              </div>
              <div className="price-block">
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--mute)", textTransform: "uppercase" }}>à partir de</div>
                <div className="price">{s.price}<span style={{ fontSize: "0.4em", color: "var(--ink-2)", marginLeft: 6 }}>$</span></div>
                <div className="delay">Livré en {s.delay}</div>
              </div>
            </m.article>
          )}
        </div>
      </div>
    </section>
  );
};




// ====================== PORTFOLIO — FOUNDER SLOTS ======================
const SLOTS = [
{ n: "01", status: "Disponible", title: "Restaurant ou café", sub: "— prochain projet 2026", deal: "−20% fondateur" },
{ n: "02", status: "Disponible", title: "Clinique ou cabinet", sub: "— santé / pro services", deal: "−20% fondateur" },
{ n: "03", status: "Disponible", title: "Artisan ou boutique", sub: "— commerce local", deal: "−20% fondateur" },
{ n: "04", status: "Disponible", title: "Service B2B local", sub: "— immobilier / juridique / autre", deal: "−20% fondateur" }];


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
            <span style={{ color: "var(--mute)" }}>↳ réclamer cette place</span>
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
        Bonjour. Je suis <em>Léo</em>. J'ai monté ce studio à Gatineau pour une raison simple : les PME d'ici méritent des sites à la hauteur de leur travail.
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
{ q: "Et si je veux modifier le site moi-même après ?", a: "Avec l'offre Site Complet, tu reçois un CMS pour tout modifier sans toucher au code. Avec les autres offres, modifications mineures incluses 30 jours, puis 75$/h après." }];


const FAQ = () => {
  const [open, setOpen] = React.useState(null);
  return (
    <section className="section" id="faq">
      <SectionHead num="05" kicker="FAQ" title="Questions fréquentes." right="↑ cliquer pour ouvrir" />
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
          Prochain client — <em>le tien.</em>
        </div>
        <div className="actions">
          <a className="btn btn-accent" href="#devis">Réserver mon créneau <span className="arrow">→</span></a>
          <a className="btn" href="mailto:leo_drolet@noviostudio.online">leo_drolet@noviostudio.online</a>
        </div>
        <div className="small">Premier appel · 15 min · gratuit · café offert à Gatineau / Ottawa</div>
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
          <button onClick={onClose} style={{ fontFamily:"var(--mono)", fontSize:18, color:"var(--ink-2)", background:"none", border:"none", cursor:"pointer", lineHeight:1 }}>✕</button>
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
          <li><a href="/diagnostic">Diagnostic gratuit</a></li>
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
      <span className="mono" style={{ letterSpacing:".14em" }}>Zones desservies · Gatineau · Hull · Aylmer · Ottawa · Kanata · Orléans · Outaouais</span>
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