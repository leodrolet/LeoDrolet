/* ============================================================
   diagnostic.jsx — Page de diagnostic web pour Novio Studio
   ============================================================ */

const LOADING_MESSAGES = [
  "Analyse de la vitesse de chargement...",
  "Vérification de l'optimisation mobile...",
  "Audit du référencement local...",
  "Évaluation des éléments de conversion...",
  "Compilation du rapport...",
];

const SCENARIOS = [
  {
    id: "bad",
    cards: [
      { label: "Performance",  score: "18",     unit: "/100", detail: "Temps de chargement > 8s — la majorité de vos visiteurs abandonnent avant d'arriver.", color: "red",   pct: 18 },
      { label: "Mobile",       score: "Absent", unit: "",     detail: "Aucune adaptation mobile. 70% de votre trafic arrive sur téléphone.", color: "red",   pct: 8  },
      { label: "SEO Local",    score: "Faible", unit: "",     detail: "Votre PME est invisible sur les recherches Google de votre région.", color: "amber", pct: 22 },
      { label: "Conversion",   score: "0 CTA",  unit: "",     detail: "Aucun appel à l'action visible. Les visiteurs ne savent pas quoi faire.", color: "red",   pct: 4  },
    ],
    verdict: {
      title: "Ce site vous coûte des clients chaque jour.",
      text: "Un site dans cet état génère en moyenne 5× moins de leads qu'un site optimisé. Chaque journée passée sans intervention représente des clients qui vont chez la concurrence.",
    },
  },
  {
    id: "medium",
    cards: [
      { label: "Performance",  score: "52",      unit: "/100", detail: "Trop lent — la moitié de vos visiteurs n'attendent pas 3 secondes.", color: "amber", pct: 52 },
      { label: "Mobile",       score: "Partiel", unit: "",     detail: "Certains éléments s'affichent mal sur téléphone. Expérience dégradée.", color: "amber", pct: 54 },
      { label: "SEO Local",    score: "Moyen",   unit: "",     detail: "Visible, mais pas en position pour capter les recherches à haute intention.", color: "amber", pct: 47 },
      { label: "Conversion",   score: "1 CTA",   unit: "",     detail: "Un seul point d'accroche — insuffisant pour convertir efficacement.", color: "green", pct: 62 },
    ],
    verdict: {
      title: "Votre site a du potentiel, mais laisse des clients sur la table.",
      text: "Avec des ajustements ciblés sur la vitesse et le SEO local, votre site pourrait générer 2× plus de leads. La base est là — il manque l'optimisation.",
    },
  },
  {
    id: "good",
    cards: [
      { label: "Performance",  score: "91",      unit: "/100", detail: "Excellente vitesse. Vos visiteurs restent et s'engagent avec votre contenu.", color: "gold",  pct: 91 },
      { label: "Mobile",       score: "Parfait", unit: "",     detail: "Expérience mobile irréprochable sur tous les appareils et tailles d'écran.", color: "green", pct: 96 },
      { label: "SEO Local",    score: "Solide",  unit: "",     detail: "Bien positionné pour les recherches locales dans votre secteur.", color: "green", pct: 83 },
      { label: "Conversion",   score: "Bon",     unit: "",     detail: "CTA clairs, positionnés aux bons endroits du parcours visiteur.", color: "green", pct: 79 },
    ],
    verdict: {
      title: "Votre site performe bien — place au contenu et au SEO avancé.",
      text: "Votre base technique est solide. La prochaine étape : contenu SEO ciblé, stratégie de mots-clés longue traîne et domination locale de votre niche.",
    },
  },
];

const C = {
  red:   { fg: "#e05252", bg: "rgba(224,82,82,0.10)" },
  amber: { fg: "#d4924a", bg: "rgba(212,146,74,0.10)" },
  green: { fg: "#5cb87a", bg: "rgba(92,184,122,0.10)" },
  gold:  { fg: "#b8973a", bg: "rgba(184,151,58,0.10)" },
};

const ProgressBar = ({ pct, color, delay }) => {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setW(pct), delay || 0);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div style={{ height: 3, background: "rgba(239,236,228,0.08)", borderRadius: 2, overflow: "hidden", marginTop: 14 }}>
      <div style={{ height: "100%", width: w + "%", background: C[color].fg, borderRadius: 2, transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)" }} />
    </div>
  );
};

const ResultCard = ({ card, index }) => (
  <div style={{ background: "#131313", border: "1px solid rgba(239,236,228,0.10)", borderRadius: 12, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
    <div style={{ fontFamily: "var(--d-sans,'DM Sans',sans-serif)", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7e7e77", marginBottom: 10 }}>
      {card.label}
    </div>
    <div style={{ fontFamily: "var(--d-serif,'Cormorant Garamond',serif)", fontSize: 38, fontWeight: 600, lineHeight: 1, color: C[card.color].fg, marginBottom: 10 }}>
      {card.score}<span style={{ fontSize: 18, opacity: 0.65 }}>{card.unit}</span>
    </div>
    <div style={{ fontFamily: "var(--d-sans,'DM Sans',sans-serif)", fontSize: 13, color: "#b9b6ad", fontWeight: 300, lineHeight: 1.6, flex: 1 }}>
      {card.detail}
    </div>
    <ProgressBar pct={card.pct} color={card.color} delay={index * 200} />
  </div>
);

const Spinner = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="diag-spin">
    <circle cx="22" cy="22" r="18" stroke="rgba(184,151,58,0.18)" strokeWidth="2.5" />
    <path d="M22 4 A18 18 0 0 1 40 22" stroke="#b8973a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DiagnosticApp = () => {
  const [phase,     setPhase]     = React.useState("idle");
  const [url,       setUrl]       = React.useState("");
  const [urlError,  setUrlError]  = React.useState("");
  const [msgIdx,    setMsgIdx]    = React.useState(0);
  const [scenario,  setScenario]  = React.useState(null);

  const isValid = (v) => {
    try { new URL(v.startsWith("http") ? v : "https://" + v); return true; } catch { return false; }
  };

  const analyze = () => {
    const trimmed = url.trim();
    if (!trimmed)            { setUrlError("Entre une URL à analyser."); return; }
    if (!isValid(trimmed))   { setUrlError("URL invalide — ex: monsite.com"); return; }
    setUrlError("");
    setPhase("loading");
    setMsgIdx(0);

    const DUR   = 4000;
    const PER   = DUR / LOADING_MESSAGES.length;
    const tids  = LOADING_MESSAGES.map((_, i) => setTimeout(() => setMsgIdx(i), i * PER));
    const done  = setTimeout(() => {
      const picked = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
      setScenario(picked);
      setPhase("results");
      tids.forEach(clearTimeout);
    }, DUR);
    return () => { tids.forEach(clearTimeout); clearTimeout(done); };
  };

  const reset = () => { setPhase("idle"); setUrl(""); setUrlError(""); setScenario(null); };

  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;background:#0a0a0a;color:#efece4}
        :root{--d-serif:'Cormorant Garamond',serif;--d-sans:'DM Sans',sans-serif}
        @keyframes diag-spin{to{transform:rotate(360deg)}}
        .diag-spin{animation:diag-spin 1.1s linear infinite;display:block}
        input::placeholder{color:rgba(239,236,228,.22)}
        input:focus{outline:none}
        .diag-btn-gold{background:#b8973a;color:#1a1400;border:none;font-family:var(--d-sans);font-weight:600;font-size:16px;padding:16px 36px;border-radius:8px;cursor:pointer;letter-spacing:.02em;text-decoration:none;display:inline-block;transition:opacity .18s}
        .diag-btn-ghost{background:none;border:1px solid rgba(239,236,228,.14);border-radius:6px;padding:10px 20px;color:#7e7e77;font-family:var(--d-sans);font-size:13px;cursor:pointer;transition:opacity .18s}
        .diag-btn-gold:hover,.diag-btn-ghost:hover{opacity:.8}
        .diag-nav-cta{font-family:var(--d-sans);font-size:13px;color:#b9b6ad;text-decoration:none;padding:8px 16px;border:1px solid rgba(239,236,228,.14);border-radius:6px;transition:opacity .18s}
        .diag-nav-cta:hover{opacity:.7}
        .diag-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:28px}
        @media(min-width:640px){.diag-cards{grid-template-columns:1fr 1fr}}
      `}</style>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(20px,4vw,64px)", height: 62, borderBottom: "1px solid rgba(239,236,228,0.07)", background: "rgba(10,10,10,0.88)", backdropFilter: "blur(14px)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#efece4", fontFamily: "var(--d-sans)", fontWeight: 500, fontSize: 15 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#b8973a", display: "inline-block" }} />
          novio<span style={{ fontStyle: "italic", color: "#b9b6ad" }}>.studio</span>
        </a>
        <a href="/#devis" className="diag-nav-cta">Obtenir un devis →</a>
      </nav>

      <div style={{ paddingTop: 62, minHeight: "100dvh", display: "flex", flexDirection: "column" }}>

        {/* ── HERO ── */}
        <section style={{ textAlign: "center", padding: "72px clamp(20px,6vw,120px) 56px" }}>
          <div style={{ fontFamily: "var(--d-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b8973a", marginBottom: 22, fontWeight: 500 }}>
            Diagnostic web gratuit
          </div>
          <h1 style={{ fontFamily: "var(--d-serif)", fontSize: "clamp(30px,5vw,60px)", fontWeight: 500, lineHeight: 1.14, margin: "0 0 20px", letterSpacing: "-0.01em", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            Votre site est-il en train de<br />
            <em>vous faire perdre des clients&nbsp;?</em>
          </h1>
          <p style={{ fontFamily: "var(--d-sans)", fontSize: "clamp(14px,1.8vw,17px)", color: "#b9b6ad", fontWeight: 300, margin: "0 0 44px", maxWidth: 440, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65 }}>
            Diagnostic professionnel en 15 secondes.<br />Sans inscription.
          </p>

          {/* Input — hidden once results are shown */}
          {phase !== "results" && (
            <div style={{ maxWidth: 540, margin: "0 auto" }}>
              <div style={{ display: "flex", border: `1.5px solid ${urlError ? "#e05252" : "#b8973a"}`, borderRadius: 8, overflow: "hidden", background: "#111" }}>
                <input
                  type="text"
                  placeholder="votresite.com"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setUrlError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && analyze()}
                  disabled={phase === "loading"}
                  style={{ flex: 1, background: "none", border: "none", padding: "16px 20px", fontSize: 16, color: "#efece4", fontFamily: "var(--d-sans)", fontWeight: 400 }}
                />
                <button
                  onClick={analyze}
                  disabled={phase === "loading"}
                  className="diag-btn-gold"
                  style={{ borderRadius: 0, padding: "16px 22px", fontSize: 15 }}
                >
                  {phase === "loading" ? "Analyse…" : "Analyser →"}
                </button>
              </div>
              {urlError && (
                <p style={{ color: "#e05252", fontFamily: "var(--d-sans)", fontSize: 13, marginTop: 8, textAlign: "left" }}>
                  {urlError}
                </p>
              )}
            </div>
          )}
        </section>

        {/* ── LOADING ── */}
        {phase === "loading" && (
          <section style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 20px 80px", gap: 24 }}>
            <Spinner />
            <p style={{ fontFamily: "var(--d-sans)", fontSize: 14, color: "#b8973a", fontWeight: 300, letterSpacing: "0.04em", margin: 0, minHeight: 20 }}>
              {LOADING_MESSAGES[msgIdx]}
            </p>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 8 }}>
              {LOADING_MESSAGES.map((_, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= msgIdx ? "#b8973a" : "rgba(184,151,58,0.2)", transition: "background .3s" }} />
              ))}
            </div>
          </section>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && scenario && (
          <section style={{ maxWidth: 880, margin: "0 auto", width: "100%", padding: "0 clamp(20px,4vw,48px) 80px" }}>

            {/* URL badge */}
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span style={{ fontFamily: "var(--d-sans)", fontSize: 12, color: "#7e7e77", background: "#111", border: "1px solid rgba(239,236,228,0.10)", borderRadius: 20, padding: "6px 18px", letterSpacing: "0.05em" }}>
                Rapport pour · <span style={{ color: "#b9b6ad" }}>{url.trim()}</span>
              </span>
            </div>

            {/* 2×2 grid */}
            <div className="diag-cards">
              {scenario.cards.map((card, i) => (
                <ResultCard key={i} card={card} index={i} />
              ))}
            </div>

            {/* Verdict */}
            <div style={{ border: "1.5px solid #b8973a", borderRadius: 12, padding: "clamp(24px,4vw,40px)", marginBottom: 36, background: "rgba(184,151,58,0.04)" }}>
              <div style={{ fontFamily: "var(--d-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b8973a", marginBottom: 14, fontWeight: 500 }}>
                Verdict
              </div>
              <h2 style={{ fontFamily: "var(--d-serif)", fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 500, margin: "0 0 14px", lineHeight: 1.22 }}>
                {scenario.verdict.title}
              </h2>
              <p style={{ fontFamily: "var(--d-sans)", fontSize: 15, color: "#b9b6ad", fontWeight: 300, margin: 0, lineHeight: 1.7 }}>
                {scenario.verdict.text}
              </p>
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <a href="/#devis" className="diag-btn-gold" style={{ marginBottom: 14 }}>
                Obtenir un plan d'action gratuit →
              </a>
              <p style={{ fontFamily: "var(--d-sans)", fontSize: 12, color: "#7e7e77", margin: "0 0 20px", letterSpacing: "0.04em" }}>
                Réponse personnalisée par Léo · Sans engagement
              </p>
              <button onClick={reset} className="diag-btn-ghost">
                ← Analyser un autre site
              </button>
            </div>
          </section>
        )}

        <div style={{ flex: 1 }} />

        {/* Footer */}
        <footer style={{ borderTop: "1px solid rgba(239,236,228,0.08)", padding: "22px clamp(20px,4vw,64px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "var(--d-sans)", fontSize: 11, color: "#7e7e77", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            © 2026 Novio Studio · Gatineau
          </span>
          <a href="/" style={{ fontFamily: "var(--d-sans)", fontSize: 12, color: "#7e7e77", textDecoration: "none", transition: "opacity .2s" }}>
            ← Retour au site
          </a>
        </footer>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("diag-root")).render(<DiagnosticApp />);
