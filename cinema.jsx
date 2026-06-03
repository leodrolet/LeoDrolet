/* ============================================================
   cinema.jsx — Awwwards-grade scroll moments
     · ScrollProgress  — accent hairline, top of viewport
     · Manifesto       — pinned word-by-word reveal
     · Specs           — big editorial numbers
   ============================================================ */

const { useReveal } = window;

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
  ["Un site qui", "génère des soumissions de toiture."],
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

        <div className="manifesto-foot mono">
          <span>{String(Math.round(t * 100)).padStart(3, "0")}</span>
          <span>·</span>
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
};

/* ---------- Specs ---------- */
const SPECS = [
  {
    v: "100", u: "/100", k: "Lighthouse",
    d: "Performance, accessibilité, SEO — 100/100 visé à chaque livraison. Un site lent coûte des clients.",
  },
  {
    v: "0.9", u: "s", k: "Chargement",
    d: "Vos visiteurs n'attendent pas. Un site rapide = plus de conversions, moins de rebonds, mieux classé.",
  },
  {
    v: "999", u: "$", k: "Prix de départ",
    d: "Page de soumission livrée prête à convertir. Un couvreur qui gagne 1 contrat de plus rembourse son site en 3 semaines.",
  },
  {
    v: "07", u: "j", k: "Livraison minimum",
    d: "Du brief au live en 7 jours. Pendant ce temps, ton concurrent couvreur prend tes leads sur Google.",
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
        <div className="mono specs-eyebrow">
          <span className="dash"></span>
          <span>Specs · v1.0</span>
        </div>
        <h2 className="specs-title">
          Par les <em>chiffres.</em>
        </h2>
        <p className="specs-sub">
          Quatre métriques, mesurées sur chaque livrable. Ce ne sont pas des promesses — ce sont des conditions de réception.
        </p>
      </div>
      <div className="specs-grid">
        {SPECS.map((s, i) => <SpecItem key={i} s={s} i={i} />)}
      </div>
    </section>
  );
};

Object.assign(window, { ScrollProgress, Manifesto, Specs });
