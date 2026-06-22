/* ============================================================
   AutoIA.jsx — Page « Automatisation IA » (refonte 6 sections)
     1. Hero + simulation « appel manqué »
     2. Les 4 automatisations (accordéon avec démos)
     3. Scénario « vendredi soir » (timeline 2 colonnes)
     4. Pack Croissance (carte + calcul d'économies)
     5. FAQ (réutilise window.FAQ)
     6. CTA final (réutilise window.FinalCTA)
   CTA principal → /contact (formulaire). Pas d'em-dash, icônes SVG.
   Dépend de : window.useReveal, window.BENEFIT_ICONS, window.Motion,
   window.FAQ, window.FinalCTA.
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE = [0.16, 1, 0.3, 1];
const CONTACT = "/contact";

/* ---------- Bulles ---------- */
const Sms = ({ dir = "out", children }) => (
  <div className={dir === "out" ? "nv-sms-bubble-out" : "nv-sms-bubble-in"}>{children}</div>
);
const Chat = ({ who = "bot", children }) => (
  <div className={who === "bot" ? "nv-chat-bot" : "nv-chat-user"}>{children}</div>
);

/* ---------- Section 1 : Hero + simulation ---------- */
const HERO_METRICS = [
  { v: "24/7", k: "Actif" },
  { v: "~5", u: "min", k: "Réponse" },
  { v: "4", k: "Automatisations" },
  { v: "250", u: "$/mois", k: "Par automatisation" },
];

const MissedCallSim = () => {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setPhase(2); return; }
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="nv-sim">
      <div className="nv-sim__label mono">Simulation en temps réel</div>
      <div className="nv-sim__stage">
        {phase === 0 && (
          <div className="nv-sim__row">
            <span className="nv-sim__ico nv-ring">{BENEFIT_ICONS.phone}</span>
            <span className="nv-sim__txt">Appel entrant · 22:14</span>
          </div>
        )}
        {phase === 1 && (
          <div className="nv-sim__row">
            <span className="nv-sim__ico nv-sim__ico--miss">{BENEFIT_ICONS.phone}</span>
            <span className="nv-sim__txt">Appel manqué · SMS envoyé en 47 sec…</span>
          </div>
        )}
        {phase === 2 && (
          <div className="nv-sim__sms nv-sms-in">
            <div className="nv-sms-bubble-out">
              Allô ! On a manqué votre appel 📞 C'est pour quel type de travaux et dans quelle région ?
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AutoHero = () => {
  const ref = useReveal();
  return (
    <header className="nv-hero reveal" ref={ref}>
      <span className="nv-badge mono">~80 % des soumissions sans suivi ne reviennent jamais</span>
      <h1 className="nv-hero__t">
        Ton téléphone ne peut pas répondre à 22h.<br />
        <em>Le nôtre, oui.</em>
      </h1>
      <p className="nv-hero__sub">
        4 automatisations IA qui capturent les leads pendant que tu travailles, dors, ou profites de ton weekend.
      </p>
      <div className="nv-metrics">
        {HERO_METRICS.map((mtr, i) => (
          <div className="nv-metric" key={i}>
            <span className="nv-metric__v">{mtr.v}{mtr.u && <sup>{mtr.u}</sup>}</span>
            <span className="nv-metric__k mono">{mtr.k}</span>
          </div>
        ))}
      </div>
      <MissedCallSim />
    </header>
  );
};

/* ---------- Section 2 : Les 4 automatisations (accordéon) ---------- */
const AutoCard = ({ n, icon, tint, title, benefit, open, onToggle, children }) => (
  <div className={`nv-auto-card${open ? " is-open" : ""}`} style={open ? { borderColor: "rgba(255,91,46,.5)" } : undefined}>
    <button className="nv-auto-card__head" onClick={onToggle} aria-expanded={open}>
      <span className="nv-auto-card__ico" style={{ background: tint.bg, borderColor: tint.bd, color: tint.fg }}>
        {BENEFIT_ICONS[icon]}
      </span>
      <span className="nv-auto-card__main">
        <span className="nv-auto-card__num mono">AUTOMATISATION {n}</span>
        <span className="nv-auto-card__t">{title}</span>
        <span className="nv-auto-card__benefit">{benefit}</span>
      </span>
      <span className="nv-auto-card__price mono">250 $/mois</span>
      <span className={`nv-chev${open ? " is-open" : ""}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </span>
    </button>
    <div className={`nv-demo-zone${open ? " is-open" : ""}`}>
      <div className="nv-demo-inner">
        {children}
        <a href={CONTACT} className="btn btn-accent nv-demo-cta">Ajouter cette automatisation <span className="arrow">&#8594;</span></a>
      </div>
    </div>
  </div>
);

const TINTS = {
  orange: { bg: "rgba(255,91,46,.1)",  bd: "rgba(255,91,46,.25)",  fg: "#ff5b2e" },
  green:  { bg: "rgba(34,197,94,.08)", bd: "rgba(34,197,94,.2)",   fg: "#22c55e" },
  purple: { bg: "rgba(99,91,255,.1)",  bd: "rgba(99,91,255,.22)",  fg: "#8b85ff" },
  amber:  { bg: "rgba(245,158,11,.1)", bd: "rgba(245,158,11,.22)", fg: "#f59e0b" },
};

const Automations = () => {
  const [open, setOpen] = React.useState(0);
  const ref = useReveal();
  const toggle = (i) => setOpen((cur) => (cur === i ? -1 : i));
  return (
    <section className="nv-section">
      <div className="sec-head reveal" ref={ref}>
        <h2 className="sec-head__t">Quatre outils qui <em>travaillent pour toi.</em></h2>
      </div>
      <div className="nv-auto-list">
        <AutoCard n="01" icon="phone" tint={TINTS.orange} open={open === 0} onToggle={() => toggle(0)}
          title="Réponse aux appels manqués"
          benefit="SMS automatique en moins de 5 min. Le lead est capturé avant qu'il rappelle le concurrent.">
          <div className="nv-demo__label mono">Ce que reçoit le client · vendredi 21h47</div>
          <div className="nv-thread">
            <Sms dir="out">Allô ! On a manqué votre appel 📞 C'est pour quel type de travaux et dans quelle région ?</Sms>
            <Sms dir="in">Toiture résidentielle, Gatineau</Sms>
            <Sms dir="out">Super ! Budget approximatif et surface du toit ? On vous envoie une soumission demain matin.</Sms>
            <div className="nv-thread__note mono">Lead qualifié transmis au propriétaire à 21:52</div>
          </div>
          <div className="nv-compare">
            <div className="nv-compare__cell nv-bad">Lead perdu, rappelé le concurrent</div>
            <span className="nv-compare__arr">&#8594;</span>
            <div className="nv-compare__cell nv-good">Lead qualifié, rendez-vous posé</div>
          </div>
        </AutoCard>

        <AutoCard n="02" icon="messagecircle" tint={TINTS.green} open={open === 1} onToggle={() => toggle(1)}
          title="Chatbot de qualification"
          benefit="Répond aux questions, qualifie le lead, disponible 24/7. Ton meilleur vendeur ne prend jamais de vacances.">
          <div className="nv-demo__label mono">Conversation en direct sur le site web · 3h22 du matin</div>
          <div className="nv-chat">
            <Chat who="bot">Bonjour ! 👋 Je suis l'assistant de votre entreprise. Quel type de travaux vous intéresse ?</Chat>
            <Chat who="user">HVAC, remplacement fournaise</Chat>
            <Chat who="bot">Parfait. Quelle est la superficie de votre maison approximativement ?</Chat>
            <Chat who="user">~1800 pi²</Chat>
            <Chat who="bot">Super ! On dessert votre secteur. Souhaitez-vous recevoir une soumission ? Laissez votre courriel ou réservez directement 📅</Chat>
            <div className="nv-thread__note mono">Lead chaud transmis · notification envoyée au proprio</div>
          </div>
        </AutoCard>

        <AutoCard n="03" icon="refresh" tint={TINTS.purple} open={open === 2} onToggle={() => toggle(2)}
          title="Relance des soumissions"
          benefit="Séquence SMS/email automatique sur les devis sans réponse. S'arrête dès que le client répond.">
          <div className="nv-demo__label mono">Séquence automatique post-soumission</div>
          <ol className="nv-relance">
            <li><span className="nv-relance__b nv-relance__b--on">J+0</span><span>Soumission envoyée, aucune réponse</span></li>
            <li><span className="nv-relance__b">J+2</span><span>SMS : « Avez-vous eu la chance de regarder notre soumission ? Des questions ? »</span></li>
            <li><span className="nv-relance__b">J+5</span><span>Email : soumission ajustée + témoignage d'un client similaire</span></li>
            <li><span className="nv-relance__b">J+10</span><span>SMS final : « On garde votre dossier actif encore 48h. »</span></li>
          </ol>
          <div className="nv-success-box">Le client répond à J+3, la séquence s'annule automatiquement.</div>
        </AutoCard>

        <AutoCard n="04" icon="star" tint={TINTS.amber} open={open === 3} onToggle={() => toggle(3)}
          title="Demande d'avis Google"
          benefit="Chaque contrat terminé déclenche une demande automatique. Plus d'avis, meilleur classement local.">
          <div className="nv-demo__label mono">Impact sur le classement Google local</div>
          <div className="nv-google">
            <div className="nv-google__col">
              <div className="nv-google__when mono">Avant Novio</div>
              <div className="nv-stars">★★★<span className="nv-stars--off">★★</span></div>
              <div className="nv-google__score">3,2 · 7 avis</div>
              <div className="nv-progress"><span style={{ width: "30%", background: "rgba(255,91,46,.5)" }}></span></div>
              <div className="nv-google__rank">Classement local bas</div>
            </div>
            <div className="nv-google__col nv-google__col--good">
              <div className="nv-google__when mono">Après 3 mois</div>
              <div className="nv-stars">★★★★★</div>
              <div className="nv-google__score nv-good-txt">4,8 · 34 avis</div>
              <div className="nv-progress"><span style={{ width: "85%", background: "#22c55e" }}></span></div>
              <div className="nv-google__rank nv-good-txt">Top 3 local Google Maps</div>
            </div>
          </div>
          <div className="nv-demo__label mono">Message automatique · 2h après la fin du contrat</div>
          <div className="nv-thread">
            <Sms dir="out">Merci pour votre confiance ! Si vous êtes satisfait, un avis Google nous aide énormément 🙏 → [lien direct]</Sms>
          </div>
        </AutoCard>
      </div>
    </section>
  );
};

/* ---------- Section 3 : Scénario vendredi soir ---------- */
const SCN_SANS = [
  { t: "21:31", d: "Appel manqué, messagerie", tone: "bad" },
  { t: "21:32", d: "Le client appelle le concurrent suivant", tone: "bad" },
  { t: "Samedi", d: "Tu rappelles, trop tard", tone: "mute" },
  { t: "Résultat", d: "Lead perdu · 1 500 à 5 000 $ de contrat manqué", tone: "bad" },
];
const SCN_AVEC = [
  { t: "21:31", d: "Appel manqué, SMS envoyé en 47 sec", tone: "accent" },
  { t: "21:33", d: "Le client répond, lead qualifié automatiquement", tone: "accent" },
  { t: "21:38", d: "Notification envoyée, rendez-vous posé", tone: "good" },
  { t: "Résultat", d: "Contrat signé · client satisfait", tone: "good" },
];

const ScnCol = ({ head, badge, steps }) => (
  <div className="nv-scn__col">
    <div className={`nv-scn__badge nv-scn__badge--${badge}`}>{head}</div>
    <ol className="nv-scn__list">
      {steps.map((s, i) => (
        <li className="nv-scn__step" key={i}>
          <span className={`nv-scn__dot nv-scn__dot--${s.tone}`}></span>
          <span className="nv-scn__time mono">{s.t}</span>
          <span className="nv-scn__d">{s.d}</span>
        </li>
      ))}
    </ol>
  </div>
);

const FridayScenario = () => {
  const ref = useReveal();
  return (
    <section className="nv-section">
      <div className="sec-head reveal" ref={ref}>
        <h2 className="sec-head__t">Vendredi 21h30, un client cherche un <em>couvreur.</em></h2>
        <p className="nv-sub">Ce qui se passe selon que tu as Novio, ou pas.</p>
      </div>
      <m.div className="nv-scn"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: EASE }}>
        <ScnCol head="Sans Novio" badge="bad" steps={SCN_SANS} />
        <ScnCol head="Avec Novio" badge="good" steps={SCN_AVEC} />
      </m.div>
    </section>
  );
};

/* ---------- Section 4 : Pack Croissance ---------- */
const PackGrowth = () => (
  <section className="nv-section">
    <m.div className="nv-pack-card"
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: EASE }}>
      <div className="nv-pack__left">
        <span className="nv-badge mono">Offre groupée, la plus populaire</span>
        <h2 className="nv-pack__t">Pack Croissance</h2>
        <p className="nv-pack__d">
          Site web sur mesure + 2 automatisations IA au choix. Un seul interlocuteur, un seul forfait.
        </p>
        <ul className="nv-pack__list">
          <li>{BENEFIT_ICONS.check}<span>Site web 5 pages sur mesure · 1 500 $</span></li>
          <li>{BENEFIT_ICONS.check}<span>2 automatisations IA au choix</span></li>
          <li>{BENEFIT_ICONS.check}<span>Sans frais d'installation</span></li>
          <li>{BENEFIT_ICONS.check}<span>Sans engagement, annulable en tout temps</span></li>
        </ul>
        <div className="nv-pack__cta">
          <a href={CONTACT} className="btn btn-accent">Démarrer mon projet <span className="arrow">&#8594;</span></a>
          <a href={CONTACT} className="btn nv-btn-ghost">Choisir mes 2 automatisations</a>
        </div>
      </div>
      <div className="nv-pack__calc">
        <div className="nv-pack__calc-label mono">Calcul d'économies</div>
        <div className="nv-pack__row">
          <span>2 automatisations seules</span>
          <span className="nv-pack__strike">500 $/mois</span>
        </div>
        <div className="nv-pack__row">
          <span>Pack Croissance</span>
          <span className="nv-pack__now">400 $/mois</span>
        </div>
        <div className="nv-pack__save">
          <span className="mono">Économie annuelle</span>
          <span className="nv-pack__save-v">1 200 $</span>
        </div>
        <div className="nv-pack__note mono">1 500 $ + 400 $/mois · sans engagement</div>
      </div>
    </m.div>
  </section>
);

/* ---------- FAQ + CTA (réutilise les composants existants) ---------- */
const AUTO_FAQ = [
  { q: "Est-ce que je peux avoir qu'une seule automatisation ?",
    a: "Oui, absolument. Chaque automatisation est indépendante à 250 $/mois. Tu choisis ce dont tu as besoin et tu peux en ajouter d'autres quand tu veux." },
  { q: "Y a-t-il des frais cachés ou d'installation ?",
    a: "Aucun. Le 250 $/mois est tout inclus : hébergement, maintenance, ajustements et support. Zéro surprise." },
  { q: "Combien de temps pour mettre en place une automatisation ?",
    a: "En général, 3 à 5 jours ouvrables après l'appel de démarrage. On configure tout de notre côté, tu n'as rien à faire techniquement." },
  { q: "Puis-je annuler quand je veux ?",
    a: "Oui. Sans engagement, sans pénalité. Un courriel suffit, on désactive proprement dans les 48 h." },
  { q: "Est-ce que ça fonctionne pour tous les métiers ?",
    a: "On travaille surtout avec les entrepreneurs en construction, toiture, plomberie, HVAC, paysagement et rénovation en Outaouais. Si tu es dans les métiers, ça fonctionne." },
];

/* ---------- Page complète ---------- */
const AutoIA = () => {
  const { FAQ, FinalCTA } = window;
  return (
    <div className="nv-auto">
      <AutoHero />
      <Automations />
      <FridayScenario />
      <PackGrowth />
      <FAQ items={AUTO_FAQ} title="Questions fréquentes." />
      <FinalCTA
        headline={<>Arrête de perdre des leads <em>la nuit.</em></>}
        ctaLabel="Démarrer mon projet"
        ctaHref={CONTACT}
      />
    </div>
  );
};

window.AutoIA = AutoIA;
