/* ============================================================
   cinema.jsx, Awwwards-grade scroll moments
     · ScrollProgress , accent hairline, top of viewport
     · Manifesto      , pinned word-by-word reveal (legacy, non rendu)
     · WhyNovio       , grille de différenciateurs « Pourquoi Novio »
     · Specs          , big editorial numbers
   ============================================================ */

const { useReveal, BENEFIT_ICONS } = window;
const { motion: m } = window.Motion || {};
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const CONTACT = "/contact";

/* ---------- ScrollProgress ---------- */
const ScrollProgress = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={ref}></div>
    </div>
  );
};

/* ---------- Manifesto ---------- */
const MANIFESTO_LINES = [
  ["Pas un", "template"],
  ["Pas une", "dépense"],
  ["Pas un", "intermédiaire"],
  ["Un site qui", "génère des soumissions et des appels."],
];

const Manifesto = () => {
  const sectionRef = React.useRef(null);
  const [t, setT] = React.useState(0);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, el.offsetHeight - vh);
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setT(p);
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const N = MANIFESTO_LINES.length;
  // Une fois les lignes révélées (~t > 0.84), l'« atterrissage » prend le relais.
  const land = Math.max(0, Math.min(1, (t - 0.84) / 0.16));

  return (
    <section className="manifesto" ref={sectionRef} aria-label="Manifesto">
      <div className="manifesto-pin">
        <div className="manifesto-eyebrow mono">
          <span className="dash"></span>
          <span>Pourquoi Novio</span>
        </div>

        <div className="manifesto-lines">
          {MANIFESTO_LINES.map((line, i) => {
            // Each line gets a slice of the scroll, with overlap.
            const from = i / (N + 0.4);
            const to = (i + 0.55) / (N + 0.4);
            const local = Math.max(0, Math.min(1, (t - from) / Math.max(0.0001, to - from)));
            const opacity = local;
            const ty = (1 - local) * 36;
            const blur = (1 - local) * 6;
            return (
              <div
                key={i}
                className="manifesto-line"
                style={{
                  opacity,
                  transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`,
                  filter: `blur(${blur.toFixed(2)}px)`,
                }}>
                <span className="mn-pre">{line[0]}</span>{" "}
                <em className="mn-key">{line[1]}.</em>
              </div>
            );
          })}
        </div>

        <div className="manifesto-end">
          <div className="manifesto-foot mono" style={{ opacity: 1 - land }}>
            <span>{String(Math.round(t * 100)).padStart(3, "0")}</span>
            <span>·</span>
            <span>défiler</span>
          </div>
          <div
            className="manifesto-proof"
            aria-hidden={land < 0.5}
            style={{
              opacity: land,
              transform: `translate3d(0, ${((1 - land) * 22).toFixed(2)}px, 0)`,
              pointerEvents: land > 0.5 ? "auto" : "none",
            }}>
            <div className="mproof-stats">
              <div className="mproof-stat">
                <span className="mproof-num">100<span>/100</span></span>
                <span className="mproof-k">Lighthouse</span>
              </div>
              <div className="mproof-stat">
                <span className="mproof-num">2–3<span> sem</span></span>
                <span className="mproof-k">Livraison</span>
              </div>
              <div className="mproof-stat">
                <span className="mproof-num">À vous</span>
                <span className="mproof-k">Dès la livraison</span>
              </div>
            </div>
            <a className="btn btn-accent" href={CONTACT}>Démarrer mon projet &#8594;</a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Specs ---------- */
const SPECS = [
  {
    v: "100", u: "/100", k: "Lighthouse",
    d: "Performance, accessibilité, SEO, 100/100 visé à chaque livraison. Un site lent coûte des clients.",
  },
  {
    v: "0.9", u: "s", k: "Chargement",
    d: "Vos visiteurs n'attendent pas. Un site rapide = plus de conversions, moins de rebonds, mieux classé.",
  },
  {
    v: "119", u: "$/mois", k: "Hébergement",
    d: "Hébergement, SSL, sauvegardes et 30 min de modifications par mois. Sans engagement, annulable en tout temps.",
  },
  {
    v: "2–3", u: "sem", k: "Livraison",
    d: "Du brief au lancement en deux à trois semaines. Pendant ce temps, ton concurrent prend tes leads sur Google.",
  },
];

const SpecItem = ({ s, i }) => {
  const ref = useReveal();
  return (
    <div
      className="spec reveal"
      ref={ref}
      style={{ transitionDelay: `${i * 70}ms` }}>
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

const Specs = () => {
  const headRef = useReveal();
  return (
    <section className="specs" id="specs">
      <div className="specs-head reveal" ref={headRef}>
        <h2 className="specs-title">
          Par les <em>chiffres.</em>
        </h2>
        <p className="specs-sub">
          Quatre métriques, mesurées sur chaque livrable. Ce ne sont pas des promesses, ce sont des conditions de réception.
        </p>
      </div>
      <div className="specs-grid">
        {SPECS.map((s, i) => <SpecItem key={i} s={s} i={i} />)}
      </div>
    </section>
  );
};

/* ---------- WhyNovio (différenciateurs) ---------- */
const WHY_REASONS = [
  {
    icon: "layout",
    strike: "Pas un template",
    title: "Sur mesure",
    desc: "Conçu pour votre métier et votre coin de l'Outaouais, pas un thème recyclé que trois concurrents utilisent déjà.",
  },
  {
    icon: "barchart",
    strike: "Pas une dépense",
    title: "Un investissement",
    desc: "Pensé pour convertir : le client qui cherche un couvreur à Gatineau vous trouve, vous appelle et demande une soumission.",
  },
  {
    icon: "unlock",
    strike: "Pas un intermédiaire",
    title: "Vous êtes propriétaire",
    desc: "Le site est à vous dès la livraison. Pas de location, pas de dépendance, personne entre vous et vos clients.",
  },
];

const WhyCard = ({ reason, i }) => (
  <m.div
    className="why-card"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: i * 0.12, ease: EASE_OUT_EXPO }}
    whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
  >
    <span className="why-card-ico">{BENEFIT_ICONS[reason.icon]}</span>
    <div className="why-card-body">
      <span className="why-card-strike">{reason.strike}</span>
      <h3 className="why-card-title">{reason.title}</h3>
      <p className="why-card-desc">{reason.desc}</p>
    </div>
    <m.span
      className="why-card-axis"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.7, 0.1, 0.2, 1] }}
    />
  </m.div>
);

const WhyNovio = () => {
  const headRef = useReveal();
  return (
    <section className="why" id="pourquoi" aria-label="Pourquoi Novio">
      <div className="why-head reveal" ref={headRef}>
        <div className="mono why-eyebrow">
          <span className="dash"></span>
          <span>Pourquoi Novio</span>
        </div>
        <h2 className="why-title">
          Un site qui <em>génère des soumissions</em> et des appels.
        </h2>
        <p className="why-sub">
          Trois choses qui nous séparent d'une agence, d'un template ou d'un freelance de passage.
        </p>
      </div>
      <div className="why-grid">
        {WHY_REASONS.map((r, i) => <WhyCard key={i} reason={r} i={i} />)}
      </div>
      <m.div
        className="why-cta"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT_EXPO }}
      >
        <a className="btn btn-accent" href={CONTACT}>Démarrer mon projet &#8594;</a>
        <span className="mono why-cta-note">Cohorte fondateur · 04 places</span>
      </m.div>
    </section>
  );
};

Object.assign(window, { ScrollProgress, Manifesto, WhyNovio, Specs });
