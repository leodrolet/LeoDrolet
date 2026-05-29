/* ============================================================
   estimator.jsx — Live price calculator + contact form
   ============================================================ */

// ── Data ─────────────────────────────────────────────────────

const TYPE_OPTS = [
  { id: "landing",     label: "Landing Page" },
  { id: "vitrine",     label: "Site Vitrine" },
  { id: "complet",     label: "Site Complet" },
  { id: "refonte",     label: "Refonte" },
  { id: "maintenance", label: "Maintenance" },
];

const PLANS = {
  landing: { label: "Landing Page", base: 999,  days: "7 jours" },
  vitrine: { label: "Site Vitrine", base: 1899, days: "2–3 sem." },
  complet: { label: "Site Complet", base: 3999, days: "2–3 sem." },
  refonte: { label: "Refonte",      base: 3699, days: "2–4 sem." },
};

const INCLUDED_FEATURES = {
  landing: [
    "SEO de base", "Formulaire contact", "Hébergement 1 an",
    "Optimisation mobile", "Optimisation vitesse",
  ],
  vitrine: [
    "SEO de base", "Formulaire contact", "Hébergement 1 an",
    "Optimisation mobile", "Optimisation vitesse",
    "SEO par page", "CMS éditable", "Blog / journal",
  ],
  complet: [
    "SEO de base", "Formulaire contact", "Hébergement 1 an",
    "Optimisation mobile", "Optimisation vitesse",
    "SEO par page", "CMS éditable", "Blog / journal",
    "SEO avancé", "Panel admin", "Architecture avancée",
  ],
  refonte: [
    "SEO de base", "Hébergement 1 an", "Optimisation vitesse (Core Web Vitals)",
    "SEO par page", "Audit complet", "Migration contenu",
    "Redirections 301", "Formation incluse",
  ],
};

const EXTRA_OPTS = [
  { id: "calendar", label: "Réservation / calendrier" },
  { id: "maps",     label: "Carte interactive" },
  { id: "anim",     label: "Animations premium" },
  { id: "i18n",     label: "Bilingue FR/EN" },
  { id: "ecom",     label: "Mini e-commerce" },
];

const EXTRA_AVAILABLE = {
  landing: ["calendar", "maps", "anim", "i18n"],
  vitrine: ["calendar", "maps", "anim", "i18n", "ecom"],
  complet: ["calendar", "maps", "anim", "i18n", "ecom"],
  refonte: ["calendar", "maps", "anim", "i18n", "ecom"],
};

const URGENCY_OPTS = [
  { id: "normal", label: "Délai normal", mult: 1 },
  { id: "fast",   label: "Rapide (+30%)", mult: 1.3 },
  { id: "urgent", label: "Urgent (+60%)", mult: 1.6 },
];

const MAINT_PLANS = [
  {
    id: "essentiel", label: "Essentiel", price: 99,
    features: [
      "Mises à jour CMS / plugins",
      "Sauvegardes hebdomadaires",
      "Monitoring 24/7",
      "SSL actif",
      "Rapport mensuel",
    ],
  },
  {
    id: "standard", label: "Standard", price: 199,
    features: [
      "Tout Essentiel",
      "Modifications mineures 2h/mois",
      "Support prioritaire",
      "Rapport détaillé",
    ],
  },
  {
    id: "croissance", label: "Croissance", price: 349,
    features: [
      "Tout Standard",
      "SEO local mensuel",
      "Ajout de contenu 4h/mois",
      "Rapport analytics",
      "Appel mensuel 30 min",
    ],
  },
];

const formatPrice = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// ── Component ────────────────────────────────────────────────

const Estimator = () => {
  const [type,       setType]       = React.useState("vitrine");
  const [extras,     setExtras]     = React.useState(new Set());
  const [urgency,    setUrgency]    = React.useState("normal");
  const [maintPlan,  setMaintPlan]  = React.useState("standard");
  const [name,       setName]       = React.useState("");
  const [email,      setEmail]      = React.useState("");
  const [project,    setProject]    = React.useState("");
  const [sent,       setSent]       = React.useState(false);
  const [estNum]                    = React.useState(() => Math.floor(2026000 + Math.random() * 999));

  const isMaint = type === "maintenance";

  const handleTypeChange = (t) => {
    setType(t);
    if (t !== "maintenance") {
      const avail = EXTRA_AVAILABLE[t] || [];
      setExtras((prev) => new Set([...prev].filter((e) => avail.includes(e))));
    }
  };

  const toggleExtra = (id) => {
    setExtras((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const calc = React.useMemo(() => {
    if (isMaint) {
      const p = MAINT_PLANS.find((p) => p.id === maintPlan);
      return { maint: true, plan: p, total: p.price };
    }
    const plan = PLANS[type];
    const u    = URGENCY_OPTS.find((u) => u.id === urgency);
    const extraCost = extras.size * 100;
    const total     = Math.round((plan.base + extraCost) * u.mult);
    return {
      maint: false,
      base: plan.base,
      extraCost,
      extrasCount: extras.size,
      urgencyMult: u.mult,
      urgencyLabel: u.label,
      total,
      label: plan.label,
      days: plan.days,
    };
  }, [type, extras, urgency, maintPlan, isMaint]);

  // Animate the total number
  const [displayTotal, setDisplayTotal] = React.useState(calc.total);
  React.useEffect(() => {
    let raf;
    const start = displayTotal;
    const end   = calc.total;
    const t0    = performance.now();
    const dur   = 450;
    const step  = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setDisplayTotal(Math.round(start + (end - start) * e));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [calc.total]);

  const send = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
  };

  const includedFeats = isMaint ? [] : (INCLUDED_FEATURES[type] || []);
  const availExtras   = isMaint ? [] : EXTRA_OPTS.filter((o) => (EXTRA_AVAILABLE[type] || []).includes(o.id));
  const activeMaint   = isMaint ? MAINT_PLANS.find((p) => p.id === maintPlan) : null;
  const contactNum    = isMaint ? "03" : "04";

  return (
    <section className="section" id="devis">
      <SectionHead
        num="06"
        kicker="Devis"
        title={<>Estime ton projet — <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>en direct.</em></>}
        right="Tarif ferme · pas d'arnaque"
      />
      <form className="estimator" onSubmit={send}>

        {/* ── LEFT ────────────────────────────────────────── */}
        <div className="estimator-form">

          {/* 01 · Type */}
          <div className="field">
            <div className="field-label">
              <span>01 · Type de projet</span>
              <span className="req">requis</span>
            </div>
            <div className="field-options">
              {TYPE_OPTS.map((o) => (
                <button
                  type="button" key={o.id}
                  className={type === o.id ? "active" : ""}
                  onClick={() => handleTypeChange(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* 02 · Fonctionnalités (standard) or Forfait mensuel (maintenance) */}
          {isMaint ? (
            <div className="field">
              <div className="field-label">
                <span>02 · Forfait mensuel</span>
                <span className="field-help">sélectionne un plan</span>
              </div>
              <div className="field-options">
                {MAINT_PLANS.map((p) => (
                  <button
                    type="button" key={p.id}
                    className={maintPlan === p.id ? "active" : ""}
                    onClick={() => setMaintPlan(p.id)}
                  >
                    {p.label} · {p.price} $/mois
                  </button>
                ))}
              </div>

              <p className="field-help" style={{ marginTop: 14, marginBottom: 8 }}>Inclus dans ce forfait</p>
              <ul className="feat-included-list">
                {(MAINT_PLANS.find((p) => p.id === maintPlan)?.features || []).map((f, i) => (
                  <li key={i} className="feat-included-item">✓ {f}</li>
                ))}
              </ul>

              <p className="field-help" style={{ marginTop: 12 }}>
                Engagement min. 3 mois · Préavis résiliation 30 jours
              </p>
            </div>
          ) : (
            <div className="field">
              <div className="field-label">
                <span>02 · Fonctionnalités</span>
                <span className="field-help">options en extra</span>
              </div>

              <p className="field-help" style={{ marginBottom: 8 }}>Inclus dans ce forfait</p>
              <ul className="feat-included-list">
                {includedFeats.map((f, i) => (
                  <li key={i} className="feat-included-item">✓ {f}</li>
                ))}
              </ul>

              {availExtras.length > 0 && (
                <>
                  <p className="field-help" style={{ marginTop: 14, marginBottom: 8 }}>
                    En option · +100 $ chacune
                  </p>
                  <div className="field-options">
                    {availExtras.map((o) => (
                      <button
                        type="button" key={o.id}
                        className={extras.has(o.id) ? "active" : ""}
                        onClick={() => toggleExtra(o.id)}
                      >
                        + {o.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 03 · Délai (standard only) */}
          {!isMaint && (
            <div className="field">
              <div className="field-label">
                <span>03 · Délai</span>
                <span className="field-help">l'urgence ajuste le tarif</span>
              </div>
              <div className="field-options">
                {URGENCY_OPTS.map((o) => (
                  <button
                    type="button" key={o.id}
                    className={urgency === o.id ? "active" : ""}
                    onClick={() => setUrgency(o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="divider" style={{ margin: "16px 0" }} />

          {/* Contact */}
          <div className="field">
            <div className="field-label"><span>{contactNum} · Toi</span></div>
            <input type="text" placeholder="Nom · entreprise" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <input type="email" placeholder="Email professionnel" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <textarea placeholder="Décris ton projet en quelques lignes (optionnel)" value={project} onChange={(e) => setProject(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-accent" style={{ alignSelf: "flex-start", marginTop: 8 }} disabled={sent}>
            {sent ? "✓ Reçu — réponse en 24h" : <>Envoyer ma demande <span className="arrow">→</span></>}
          </button>
        </div>

        {/* ── RIGHT ───────────────────────────────────────── */}
        <aside className="estimator-quote">

          <div className="quote-head">
            <span>{isMaint ? "Abonnement" : "Estimation"} #{estNum}</span>
            <span>{isMaint ? "Maintenance" : calc.label}</span>
          </div>

          {isMaint ? (
            /* ── Maintenance quote ── */
            <>
              <div className="quote-rows">
                <div className="quote-row">
                  <span>Forfait {activeMaint.label}</span>
                  <span className="v">{activeMaint.price} $/mois</span>
                </div>
                {activeMaint.features.map((f, i) => (
                  <div className="quote-row muted" key={i}>
                    <span>{f}</span>
                    <span>inclus</span>
                  </div>
                ))}
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
                  {formatPrice(activeMaint.price)}<sup>$/mois</sup>
                </div>
                <div className="note">Facturation mensuelle · sans engagement au-delà de 3 mois</div>
              </div>
            </>
          ) : (
            /* ── Standard quote ── */
            <>
              <div className="quote-rows">
                <div className="quote-row">
                  <span>Base · {calc.label}</span>
                  <span className="v">{formatPrice(calc.base)} $</span>
                </div>
                {calc.extrasCount > 0 && (
                  <div className="quote-row">
                    <span>+ {calc.extrasCount} option{calc.extrasCount > 1 ? "s" : ""} extra</span>
                    <span className="v">+{formatPrice(calc.extraCost)} $</span>
                  </div>
                )}
                {calc.urgencyMult > 1 && (
                  <div className="quote-row">
                    <span>× urgence ({calc.urgencyLabel})</span>
                    <span className="v">×{calc.urgencyMult}</span>
                  </div>
                )}
                <div className="quote-row muted">
                  <span>Hébergement (1 an)</span>
                  <span>inclus</span>
                </div>
                <div className="quote-row muted">
                  <span>Support post-launch</span>
                  <span>inclus 30–60j</span>
                </div>
                <div className="quote-row muted">
                  <span>Révisions</span>
                  <span>2–3 incluses</span>
                </div>
              </div>
              <div className="quote-total">
                <div className="label">Total estimé · CAD</div>
                <div className="amount">
                  {formatPrice(displayTotal)}<sup>$</sup>
                </div>
                <div className="note">Livraison estimée : {calc.days} · devis ferme sous 24h après envoi</div>
              </div>
            </>
          )}

          <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 24, lineHeight: 1.6 }}>
            ✓ Pas de frais cachés<br/>
            ✓ Tarif signé au contrat<br/>
            ✓ Acompte 50% au démarrage<br/>
            ✓ Solde à la mise en ligne
          </div>

        </aside>
      </form>
    </section>
  );
};

window.Estimator = Estimator;
