/* ============================================================
   Automation.jsx, Section « Automatisation IA »
   Présentation éditoriale : métriques (specs) + capability tiles
   + pack groupé + ledger « sans / avec ».
   Dépend de : window.useReveal, window.BENEFIT_ICONS, window.Motion
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const CALENDLY = "https://calendly.com/leo_drolet-noviostudio/conception-site-web";
const CONTACT = CALENDLY;
const EXT = { target: "_blank", rel: "noopener noreferrer" };

// ── Métriques (format « specs sheet ») ──
const AUTO_METRICS = [
  { v: "24", u: "/7",   k: "Toujours actif",      d: "Répond aux leads la nuit, la fin de semaine, pendant que tu es sur un chantier." },
  { v: "5",  u: "min",  k: "Délai de réponse",    d: "Un SMS part dans les minutes suivant un appel manqué, pendant que le lead est encore chaud." },
  { v: "80", u: "%",    k: "Soumissions suivies", d: "La majorité des soumissions sans suivi ne reviennent jamais. On les relance automatiquement." },
  { v: "250", u: "$/mois", k: "Par automatisation", d: "Tout inclus, hébergement, maintenance et ajustements. Aucun frais d'installation." },
];

const AutoMetric = ({ s, i }) => {
  const ref = useReveal();
  return (
    <div className="spec reveal" ref={ref} style={{ transitionDelay: `${i * 70}ms` }}>
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

// ── Les 4 automatisations (capability tiles) ──
const AUTOMATIONS = [
  {
    id: "appels", n: "01", tier: "Réponse aux appels manqués", icon: "phone", featured: true,
    pitch: "« Un appel manqué un vendredi soir, c'est un contrat chez le concurrent. »",
    items: [
      { bold: "SMS automatique", rest: " dès qu'un appel est manqué" },
      { bold: "Qualifie le lead", rest: " et garde la conversation vivante" },
      { bold: "Propose un rendez-vous", rest: " sans que tu lèves le petit doigt" },
    ],
  },
  {
    id: "chatbot", n: "02", tier: "Chatbot de qualification", icon: "messagecircle", featured: false,
    pitch: "« Le site travaille même quand tu es sur un toit. »",
    items: [
      { bold: "Répond aux questions fréquentes", rest: ", prix, délais, secteur desservi" },
      { bold: "Qualifie le lead", rest: " avant de te le transférer" },
      { bold: "Disponible 24/7", rest: ", jamais de question sans réponse" },
    ],
  },
  {
    id: "relance", n: "03", tier: "Relance des soumissions", icon: "refresh", featured: false,
    pitch: "« 80 % des soumissions non suivies ne reviennent jamais. On les relance pour toi. »",
    items: [
      { bold: "Relance les leads", rest: " qui n'ont pas répondu après quelques jours" },
      { bold: "Séquence SMS / email", rest: " automatique, sans intervention" },
      { bold: "S'arrête seule", rest: " dès que le client répond" },
    ],
  },
  {
    id: "avis", n: "04", tier: "Demande d'avis Google", icon: "star", featured: false,
    pitch: "« Plus d'avis Google = plus haut sur la carte = plus d'appels. »",
    items: [
      { bold: "Demande automatique", rest: " envoyée après chaque contrat terminé" },
      { bold: "Lien direct", rest: " vers ta fiche Google, un clic pour le client" },
      { bold: "Meilleur classement", rest: " local au fil des avis qui s'accumulent" },
    ],
  },
];

const CapTile = ({ a, i }) => (
  <m.article
    className={`cap${a.featured ? " cap--featured" : ""}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 + (i % 2) * 0.1 }}
  >
    <div className="cap__icon">{BENEFIT_ICONS[a.icon]}</div>
    <h3 className="cap__t">{a.tier}</h3>
    <p className="cap__pitch">{a.pitch}</p>
    <ul className="cap__list">
      {a.items.map((it, j) => (
        <li key={j}>{BENEFIT_ICONS.check}<span><b>{it.bold}</b>{it.rest}</span></li>
      ))}
    </ul>
    <div className="cap__price">À partir de <b>250&nbsp;$/mois</b> · sans installation</div>
  </m.article>
);

// ── Ledger « sans / avec » ──
const LEDGER_ROWS = [
  { feature: "Appels manqués",        bad: "Perdus, le lead appelle le concurrent", good: "Récupérés automatiquement par SMS" },
  { feature: "Suivi des soumissions", bad: "Manuel, souvent oublié",                 good: "Automatique et systématique" },
  { feature: "Avis Google",           bad: "Rares, au hasard",                       good: "Générés après chaque contrat" },
  { feature: "Temps de gestion",      bad: "Des heures chaque semaine",              good: "Quelques minutes de supervision" },
];

const Ledger = () => {
  const ref = useReveal();
  return (
    <section className="ledger">
      <div className="sec-head reveal" ref={ref}>
        <h2 className="sec-head__t">Ce que ça change, <em>concrètement.</em></h2>
      </div>
      <m.div
        className="ledger__grid"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="ledger__col ledger__col--bad">
          <div className="ledger__head"><span>Sans automatisation</span><span>✕</span></div>
          {LEDGER_ROWS.map((r, i) => (
            <div key={i} className="ledger__row">
              <span className="ledger__mk">✕</span>
              <span><span className="ledger__feat">{r.feature}</span><span className="ledger__val">{r.bad}</span></span>
            </div>
          ))}
        </div>
        <div className="ledger__col ledger__col--good">
          <div className="ledger__head"><span>Avec Novio</span><span>✓</span></div>
          {LEDGER_ROWS.map((r, i) => (
            <div key={i} className="ledger__row">
              <span className="ledger__mk">✓</span>
              <span><span className="ledger__feat">{r.feature}</span><span className="ledger__val">{r.good}</span></span>
            </div>
          ))}
        </div>
      </m.div>
    </section>
  );
};

// ── Pack Croissance (offre groupée chiffrée) ──
const PackOffer = () => (
  <m.section
    className="pack"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
  >
    <div>
      <h2 className="pack__t">Pack Croissance</h2>
      <p className="pack__d">
        Ton site web qui attire + deux automatisations qui convertissent. La machine complète pour
        remplir ton agenda, un seul interlocuteur, un seul forfait, sans engagement.
      </p>
      <div className="pack__price">
        <span className="pack__old">1 500 $ + 500 $/mois</span>
        <span className="pack__new">1 500 $ + 400 $/mois</span>
        <span className="pack__save">Économise 1 200 $/an</span>
      </div>
    </div>
    <div className="pack__cta">
      <a href={CONTACT} {...EXT} className="btn btn-accent">Démarrer mon projet <span className="arrow">&#8594;</span></a>
      <span className="pack__note">Site + 2 automatisations au choix</span>
    </div>
  </m.section>
);

// ── Section principale ──
const Automation = ({ lead = true }) => {
  const headRef = useReveal();
  const tilesRef = useReveal();
  return (
    <section className="section" id="automatisation">
      {lead && (
        <React.Fragment>
          <div className="section-head reveal" ref={headRef}>
            <h2 className="section-title">Automatisation IA</h2>
          </div>
          <p className="specs-sub" style={{ textAlign: "center", margin: "0 auto 8px", maxWidth: "640px", padding: "0 var(--gutter)" }}>
            Un beau site attire les clients. L'automatisation s'assure qu'aucun ne t'échappe.
            Des outils simples qui répondent, relancent et qualifient à ta place, pendant que tu travailles.
          </p>
        </React.Fragment>
      )}

      {/* Métriques */}
      <div className="specs-grid" style={{ marginTop: lead ? "40px" : "0" }}>
        {AUTO_METRICS.map((s, i) => <AutoMetric key={i} s={s} i={i} />)}
      </div>

      {/* Capability tiles */}
      <div className="sec-head reveal" ref={tilesRef} style={{ marginTop: "clamp(56px,9vh,112px)" }}>
        <div className="sec-head__eyebrow"><span className="dash"></span><span>Les automatisations</span></div>
        <h2 className="sec-head__t">Quatre outils qui <em>travaillent pour toi.</em></h2>
      </div>
      <div className="cap-grid">
        {AUTOMATIONS.map((a, i) => <CapTile key={a.id} a={a} i={i} />)}
      </div>
      <div className="cap-cta">
        <a href={CONTACT} {...EXT} className="btn btn-accent">Démarrer mon projet <span className="arrow">&#8594;</span></a>
      </div>

      {/* Ledger sans / avec */}
      <Ledger />

      {/* Pack groupé */}
      <PackOffer />
    </section>
  );
};

window.Automation = Automation;
