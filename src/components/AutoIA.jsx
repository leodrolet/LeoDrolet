/* ============================================================
   AutoIA.jsx — Page « Automatisation IA » (Novio AI)
     1. Hero Novio AI : employé IA 24h/24 + démo de conversation animée
     2. Fonctionnalités (8 cartes) + stats animées + CTA
     3. Scénario « vendredi soir » (timeline 2 colonnes)
     4. Pack Croissance (carte + calcul d'économies)
     5. FAQ (réutilise window.FAQ)
     6. CTA final (réutilise window.FinalCTA)
   CTA principal → /contact. Pas d'em-dash, icônes SVG.
   Dépend de : window.useReveal, window.BENEFIT_ICONS, window.Motion,
   window.FAQ, window.FinalCTA.
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE = [0.16, 1, 0.3, 1];
const CONTACT = "/contact";

/* ---------- Section 1 : Hero Novio AI + démo de conversation ---------- */
const DEMO_CHECKS = ["Rendez-vous créé", "Client ajouté", "Courriel de confirmation envoyé"];

/* Étapes : 0 vide · 1 message client · 2 Novio AI écrit · 3 réponse ·
   4-6 confirmations successives, puis la boucle recommence. */
const NovioDemo = () => {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStep(6); return; }
    const DELAYS = [900, 1200, 1400, 1600, 900, 900, 3400];
    let i = 0, id;
    const tick = () => {
      i = (i + 1) % 7;
      setStep(i);
      id = setTimeout(tick, DELAYS[i]);
    };
    id = setTimeout(tick, DELAYS[0]);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="nvai-chat" aria-hidden="true">
      <div className="nvai-chat__head">
        <span className="nvai-chat__dot"></span>
        <span className="nvai-chat__name">Novio AI</span>
        <span className="nvai-chat__status mono">En ligne 24h/24</span>
      </div>
      <div className="nvai-chat__body">
        {step >= 1 && <div className="nv-chat-user nvai-pop">Bonjour, êtes-vous ouverts demain ?</div>}
        {step === 2 && (
          <div className="nvai-typing nvai-pop"><span></span><span></span><span></span></div>
        )}
        {step >= 3 && (
          <div className="nv-chat-bot nvai-pop">
            Bonjour 👋<br />
            Oui, nous sommes ouverts de 8 h à 17 h.<br />
            Souhaitez-vous prendre rendez-vous ?
          </div>
        )}
        <div className="nvai-checks">
          {DEMO_CHECKS.map((c, i) => step >= 4 + i && (
            <div className="nvai-check nvai-pop" key={c}>{BENEFIT_ICONS.checkcircle}<span>{c}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AutoHero = () => {
  const ref = useReveal();
  return (
    <header className="nvai-hero reveal" ref={ref}>
      <div className="nvai-hero__copy">
        <span className="nv-badge mono">Novio AI · Votre employé IA, disponible 24h/24</span>
        <h1 className="nvai-hero__t">
          Votre prochain employé <em>ne demande pas de salaire.</em>
        </h1>
        <p className="nvai-hero__sub">
          Novio AI répond à vos clients, prend des rendez-vous, génère des soumissions et automatise
          les tâches répétitives afin que vous puissiez vous concentrer sur votre entreprise.
        </p>
        <div className="nvai-cta">
          <a href={CONTACT} className="btn btn-accent">Réserver une démonstration <span className="arrow">&#8594;</span></a>
          <a href="#fonctionnalites" className="btn nv-btn-ghost">Découvrir Novio AI</a>
        </div>
      </div>
      <NovioDemo />
    </header>
  );
};

/* ---------- Section 2 : Fonctionnalités + stats ---------- */
const FEATURES = [
  { icon: "mail", t: "Réponses automatiques aux courriels",
    d: "Chaque courriel reçoit une réponse claire, dans votre ton, en quelques secondes." },
  { icon: "messagecircle", t: "Chat IA sur votre site web",
    d: "Un assistant qui accueille vos visiteurs et répond à leurs questions, jour et nuit." },
  { icon: "calendar", t: "Prise de rendez-vous",
    d: "Novio AI propose un créneau et l'ajoute directement à votre calendrier." },
  { icon: "filetext", t: "Génération de soumissions",
    d: "Une demande entre, une soumission propre sort, prête à envoyer." },
  { icon: "share2", t: "Réponses Facebook et Instagram",
    d: "Vos messages sociaux traités au même endroit, sans délai." },
  { icon: "database", t: "Base de connaissances sur mesure",
    d: "Vos prix, vos services, vos délais : Novio AI est entraîné sur votre entreprise." },
  { icon: "layout", t: "Tableau de bord des conversations",
    d: "Toutes les conversations au même endroit, avec le contexte complet." },
  { icon: "barchart", t: "Statistiques et rapports",
    d: "Voyez ce que Novio AI a répondu, converti et automatisé chaque semaine." },
];

const FeatureCard = ({ f, i }) => (
  <m.article
    className="nvai-card"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + (i % 4) * 0.07 }}
  >
    <div className="nvai-card__ico">{BENEFIT_ICONS[f.icon]}</div>
    <h3 className="nvai-card__t">{f.t}</h3>
    <p className="nvai-card__d">{f.d}</p>
  </m.article>
);

/* Compteur animé au scroll (start → end, easing cubic out) */
const useCountUp = (start, end, dur = 1300) => {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(start);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setVal(end); return; }
    let raf;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const frame = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [start, end, dur]);
  return [ref, val];
};

const STATS = [
  { from: 0, to: 10, pre: "<", u: "s", t: "Réponse instantanée",
    d: "Vos clients obtiennent une réponse en quelques secondes." },
  { from: 0, to: 24, u: "h/24", t: "Disponible 24h/24",
    d: "Même lorsque votre entreprise est fermée." },
  { from: 12, to: 0, u: "occasion manquée", t: "Plus de prospects convertis",
    d: "Ne manquez plus une demande de soumission ou un rendez-vous." },
];

const StatCard = ({ s, i }) => {
  const [ref, val] = useCountUp(s.from, s.to);
  return (
    <m.div
      className="nvai-stat"
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
    >
      <div className="nvai-stat__v">{s.pre}{val}<span className="nvai-stat__u">{s.u}</span></div>
      <div className="nvai-stat__t">{s.t}</div>
      <p className="nvai-stat__d">{s.d}</p>
    </m.div>
  );
};

const Features = () => {
  const ref = useReveal();
  return (
    <section className="nv-section" id="fonctionnalites">
      <div className="sec-head reveal" ref={ref}>
        <div className="sec-head__eyebrow"><span className="dash"></span><span>Ce que Novio AI fait pour vous</span></div>
        <h2 className="sec-head__t">Un seul employé. <em>Huit tâches de moins.</em></h2>
      </div>
      <div className="nvai-grid">
        {FEATURES.map((f, i) => <FeatureCard key={f.t} f={f} i={i} />)}
      </div>
      <div className="nvai-stats">
        {STATS.map((s, i) => <StatCard key={s.t} s={s} i={i} />)}
      </div>
      <div className="cap-cta">
        <a href={CONTACT} className="btn btn-accent">Réserver une démonstration <span className="arrow">&#8594;</span></a>
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
      <Features />
      <FridayScenario />
      <PackGrowth />
      <FAQ items={AUTO_FAQ} title="Questions fréquentes." />
      <FinalCTA
        headline={<>Arrête de perdre des leads <em>la nuit.</em></>}
        ctaLabel="Réserver une démonstration"
        ctaHref={CONTACT}
      />
    </div>
  );
};

window.AutoIA = AutoIA;
