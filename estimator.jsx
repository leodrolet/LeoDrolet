/* ============================================================
   estimator.jsx — Plan selector + contact form
   ============================================================ */

const PLANS = [
  {
    id: "complet",
    label: "Tout inclus",
    price: 500,
    subtitle: "L'arsenal complet pour l'entrepreneur qui veut des résultats.",
    features: [
      "Jusqu'à 20 pages",
      "Mobile responsive",
      "Formulaires + intégrations (CRM, email)",
      "SEO avancé + suivi de positionnement mensuel",
      "Rapport mensuel + recommandations",
      "Support prioritaire — réponse < 4 h",
      "Hébergement + sécurité inclus",
      "4 révisions gratuites le 1er mois",
    ],
  },
];

const Estimator = () => {
  const [planId,   setPlanId]   = React.useState("complet");
  const [name,     setName]     = React.useState("");
  const [email,    setEmail]    = React.useState("");
  const [project,  setProject]  = React.useState("");
  const [sent,     setSent]     = React.useState(false);
  const [sending,  setSending]  = React.useState(false);
  const [error,    setError]    = React.useState("");
  const lastSubmit               = React.useRef(0);
  const [estNum]                 = React.useState(() => Math.floor(2026000 + Math.random() * 999));

  const plan = PLANS.find((p) => p.id === planId);

  const [displayPrice, setDisplayPrice] = React.useState(plan.price);
  React.useEffect(() => {
    let raf;
    const start = displayPrice;
    const end   = plan.price;
    const t0    = performance.now();
    const dur   = 350;
    const step  = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setDisplayPrice(Math.round(start + (end - start) * e));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [plan.price]);

  const send = async (e) => {
    e.preventDefault();
    setError("");

    const now = Date.now();
    if (now - lastSubmit.current < 30000) {
      setError("Merci de patienter 30 secondes avant de renvoyer.");
      return;
    }

    if (!name.trim()) { setError("Ton nom est requis."); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Entre un email valide.");
      return;
    }

    if (project.length > 2000) { setError("Description trop longue (max 2000 caractères)."); return; }

    lastSubmit.current = now;

    setSending(true);
    try {
      const body = {
        name,
        email,
        project,
        plan: plan.label,
        prix: `${plan.price} $/mois`,
      };

      const res = await fetch("https://formspree.io/f/xykvgwnz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSent(true);
        setName(""); setEmail(""); setProject("");
      } else {
        setError("Erreur lors de l'envoi. Réessaie ou écris-moi directement.");
      }
    } catch {
      setError("Erreur réseau. Vérifie ta connexion.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="devis">
      <SectionHead
        num="06"
        kicker="Devis"
        title={<>Estime ton projet — <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>en direct.</em></>}
        right="Engagement 3 mois · préavis 30 jours"
      />
      <form className="estimator" onSubmit={send}>

        {/* ── LEFT ────────────────────────────────────────── */}
        <div className="estimator-form">

          {/* 01 · Inclus */}
          <div className="field">
            <div className="field-label">
              <span>01 · Inclus dans ce plan</span>
            </div>
            <ul className="feat-included-list">
              {plan.features.map((f, i) => (
                <li key={i} className="feat-included-item">✓ {f}</li>
              ))}
            </ul>
            <p className="field-help" style={{ marginTop: 12 }}>
              Domaine inclus · engagement min. 3 mois · préavis résiliation 30 jours · aucun frais caché
            </p>
          </div>

          <div className="divider" style={{ margin: "16px 0" }} />

          {/* Contact */}
          <div className="field">
            <div className="field-label"><span>02 · Toi</span></div>
            <label htmlFor="contact-name" className="sr-only">Nom et entreprise</label>
            <input id="contact-name" type="text" placeholder="Nom · entreprise" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="contact-email" className="sr-only">Email professionnel</label>
            <input id="contact-email" type="email" placeholder="Email professionnel" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="contact-project" className="sr-only">Description du projet (optionnel)</label>
            <textarea id="contact-project" placeholder="Décris ton projet en quelques lignes (optionnel)" value={project} onChange={(e) => setProject(e.target.value)} />
          </div>
          {error && (
            <p style={{ color: "var(--accent)", fontSize: 12, margin: "4px 0 0" }}>{error}</p>
          )}
          <button type="submit" className="btn btn-accent" style={{ alignSelf: "flex-start", marginTop: 8 }} disabled={sent || sending}>
            {sent ? "✓ Reçu — réponse en 24h" : sending ? "Envoi…" : <>Envoyer ma demande <span className="arrow">→</span></>}
          </button>
        </div>

        {/* ── RIGHT ───────────────────────────────────────── */}
        <aside className="estimator-quote">

          <div className="quote-head">
            <span>Abonnement #{estNum}</span>
            <span>{plan.label}</span>
          </div>

          <div className="quote-rows">
            <div className="quote-row">
              <span>Plan {plan.label}</span>
              <span className="v">{plan.price} $/mois</span>
            </div>
            {plan.features.map((f, i) => (
              <div className="quote-row muted" key={i}>
                <span>{f}</span>
                <span>inclus</span>
              </div>
            ))}
            <div className="quote-row muted">
              <span>Domaine</span>
              <span>inclus</span>
            </div>
            <div className="quote-row muted">
              <span>Hébergement</span>
              <span>inclus</span>
            </div>
            <div className="quote-row muted">
              <span>Engagement minimum</span>
              <span>3 mois</span>
            </div>
            <div className="quote-row muted">
              <span>Préavis résiliation</span>
              <span>30 jours</span>
            </div>
          </div>

          <div className="quote-total">
            <div className="label">Mensuel · CAD</div>
            <div className="amount">
              {displayPrice}<sup>$/mois</sup>
            </div>
            <div className="note">Facturation mensuelle · sans engagement au-delà de 3 mois</div>
          </div>

          <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 24, lineHeight: 1.6 }}>
            ✓ Aucun frais caché<br/>
            ✓ Tarif fixe mensuel<br/>
            ✓ Résiliation sans pénalité<br/>
            ✓ Domaine inclus sur tous les plans
          </div>

        </aside>
      </form>
    </section>
  );
};

window.Estimator = Estimator;
