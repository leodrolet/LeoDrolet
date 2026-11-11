/* ============================================================
   pages.jsx, En-têtes éditoriaux, sections accueil/contact,
   process, et composition des 4 pages du site vitrine.
   Chargé après tous les composants de section (dépend d'eux).
   ============================================================ */

const { useReveal } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const FORMSPREE = "https://formspree.io/f/mdaronva";
const EMAIL = "leo_drolet@noviostudio.online";
const TEL = "+18736554684";
const TEL_DISPLAY = "873 655-4684";

/* ── En-tête de page éditorial (bande méta + grand titre + stats) ── */
const PageHeader = ({ index, metaRight, title, sub, stats }) => {
  const ref = useReveal();
  return (
    <header className="page-head">
      <div className="reveal" ref={ref}>
        <div className="page-head__meta">
          <span>{index}</span>
          {metaRight && <span className="accent">{metaRight}</span>}
        </div>
        <h1 className="page-head__title">{title}</h1>
        {sub && <p className="page-head__sub">{sub}</p>}
        {stats && (
          <div className="page-head__stats">
            {stats.map((s, i) => (
              <div className="page-stat" key={i}>
                <span className="page-stat__v">{s.v}<sup>{s.u}</sup></span>
                <span className="page-stat__k">{s.k}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

/* ── En-tête de section aligné à gauche ── */
const SecHead = ({ eyebrow, title }) => {
  const ref = useReveal();
  return (
    <div className="sec-head reveal" ref={ref}>
      <div className="sec-head__eyebrow"><span className="dash"></span><span>{eyebrow}</span></div>
      <h2 className="sec-head__t">{title}</h2>
    </div>
  );
};

/* ── Process / timeline (site-web) ── */
const PROCESS = [
  { n: "01", t: "Appel découverte",       d: "On parle de ton métier, tes clients, tes objectifs. 15 minutes, gratuit.", dur: "Jour 0" },
  { n: "02", t: "Design à ton image",     d: "Je conçois une maquette à tes couleurs, qui te ressemble. Tu valides, on ajuste ensemble.", dur: "Semaine 1" },
  { n: "03", t: "Construction",           d: "Je code chaque page à la main : rapide, soignée et optimisée pour Google.", dur: "Semaine 2" },
  { n: "04", t: "Lancement + suivi",      d: "Mise en ligne, puis je m'occupe de l'hébergement, de la maintenance et de tes modifications, chaque mois.", dur: "Semaine 3" },
];

const PStep = ({ s, i }) => {
  const ref = useReveal();
  return (
    <div className="pstep reveal" ref={ref} style={{ transitionDelay: `${i * 90}ms` }}>
      <div className="pstep__node">{s.n}</div>
      <div className="pstep__body">
        <h3 className="pstep__t">{s.t}</h3>
        <p className="pstep__d">{s.d}</p>
        <span className="pstep__dur">{s.dur}</span>
      </div>
    </div>
  );
};

const Process = () => (
  <section className="process">
    <SecHead eyebrow="Comment ça se passe" title={<>De l'idée au site, en <em>quatre étapes.</em></>} />
    <div className="process__grid">
      {PROCESS.map((s, i) => <PStep key={s.n} s={s} i={i} />)}
    </div>
  </section>
);

/* ── Contact : 2 colonnes (aside + carte formulaire) ── */
const NEXT_STEPS = [
  { n: "01", t: "On jase 15 minutes", d: "Tu m'expliques ton métier et où tu perds des leads. Gratuit, sans pression." },
  { n: "02", t: "Je reviens avec un plan", d: "Estimation claire, échéancier et recommandations, en moins de 24 h." },
  { n: "03", t: "On démarre", d: "Tu valides, on lance. Tu parles à la personne qui fait le travail, pas un vendeur." },
];

const CHANNELS = [
  { icon: "messagecircle", label: "Écrire un courriel", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: "phone", label: "Appeler", value: TEL_DISPLAY, href: `tel:${TEL}` },
];

const INTERESTS = ["Forfait Croissance", "Forfait Premium", "Pas sûr encore"];

// Présélection depuis les boutons « Choisir … » des forfaits : /contact?forfait=croissance|premium
const PLAN_INTEREST = { croissance: "Forfait Croissance", premium: "Forfait Premium" };
const initialInterests = () => {
  try {
    const slug = (new URLSearchParams(window.location.search).get("forfait") || "").toLowerCase();
    return PLAN_INTEREST[slug] ? [PLAN_INTEREST[slug]] : [];
  } catch (_) { return []; }
};

// ── Formulaire de projet (AJAX → Formspree, états idle/submitting/success/error) ──
const ProjectForm = () => {
  const [status, setStatus] = React.useState("idle");
  const [interests, setInterests] = React.useState(initialInterests);
  const [error, setError] = React.useState("");

  const toggleInterest = (it) =>
    setInterests((cur) => (cur.includes(it) ? cur.filter((x) => x !== it) : [...cur, it]));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("interet", interests.join(", ") || "Non précisé");
    const plans = interests.filter((x) => x.startsWith("Forfait"));
    data.set("_subject", plans.length
      ? `Nouvelle demande (${plans.join(" + ")}), site Novio Studio`
      : "Nouvelle demande, site Novio Studio");
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const j = await res.json().catch(() => null);
        setError((j && j.errors && j.errors.map((x) => x.message).join(" ")) ||
          "Une erreur est survenue. Réessaie, ou écris-moi directement par courriel.");
        setStatus("error");
      }
    } catch (_) {
      setError("Connexion impossible. Réessaie, ou écris-moi à " + EMAIL + ".");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <m.div
        className="contact-card form-card form-success"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      >
        <span className="form-success__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <h2 className="contact-card__t">Demande envoyée.</h2>
        <p className="form-success__lead">
          Merci. Je te reviens en moins de 24 h avec un plan clair. D'ici là, tu peux m'écrire à
          {" "}<a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <a href="/" className="btn">Retour à l'accueil <span className="arrow">&#8594;</span></a>
      </m.div>
    );
  }

  return (
    <div className="contact-card form-card">
      <h2 className="contact-card__t">Parle-moi de ton projet.</h2>
      <form onSubmit={onSubmit}>
        <div className="field">
          <span className="field-label">Ce qui t'intéresse <span className="field-hint">plusieurs choix possibles</span></span>
          <div className="field-options" role="group" aria-label="Ce qui t'intéresse, plusieurs choix possibles">
            {INTERESTS.map((it) => {
              const on = interests.includes(it);
              return (
                <button
                  type="button"
                  key={it}
                  className={on ? "active" : ""}
                  aria-pressed={on}
                  onClick={() => toggleInterest(it)}
                >
                  {it}
                </button>
              );
            })}
          </div>
        </div>

        {/* anti-spam (honeypot Formspree) */}
        <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" className="form-hp" />
        <input type="hidden" name="_subject" value="Nouvelle demande, site Novio Studio" />

        <div className="form-row">
          <div className="field">
            <label className="field-label" htmlFor="cf-name">Nom <span className="req">*</span></label>
            <input id="cf-name" type="text" name="name" autoComplete="name" required />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="cf-phone">Téléphone</label>
            <input id="cf-phone" type="tel" name="phone" autoComplete="tel" />
          </div>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="cf-email">Courriel <span className="req">*</span></label>
          <input id="cf-email" type="email" name="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="cf-msg">Ton projet</label>
          <textarea id="cf-msg" name="message" rows="4" placeholder="Ex. : couvreur à Gatineau, je veux plus de soumissions sur Google."></textarea>
          <span className="field-help">Métier, secteur, échéancier : tout ce qui aide.</span>
        </div>
        <label className="contact-consent">
          <input type="checkbox" name="consent" required />
          <span>J'accepte d'être contacté par Novio Studio au sujet de ma demande.</span>
        </label>

        {status === "error" && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn-accent form-submit" disabled={status === "submitting"} style={{ justifyContent: "center" }}>
          {status === "submitting"
            ? (<><span className="form-spinner" aria-hidden="true"></span> Envoi…</>)
            : (<>Envoyer ma demande <span className="arrow">&#8594;</span></>)}
        </button>
        <span className="field-help" style={{ textAlign: "center" }}>Réponse en moins de 24 h · sans engagement</span>
      </form>
    </div>
  );
};

const ContactSection = () => {
  const asideRef = useReveal();
  const formRef = useReveal();
  React.useEffect(() => {
    if (window.location.hash !== "#formulaire") return;
    const el = document.getElementById("formulaire");
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);
  return (
    <section className="contact">
      <div className="contact__grid">
        <div className="contact__aside reveal" ref={asideRef}>
          <h2 className="contact__t">Ce qui se passe <em>ensuite.</em></h2>

          <ol className="next-steps">
            {NEXT_STEPS.map((s) => (
              <li className="next-step" key={s.n}>
                <span className="next-step__n">{s.n}</span>
                <div>
                  <h3 className="next-step__t">{s.t}</h3>
                  <p className="next-step__d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="channels">
            {CHANNELS.map((c) => (
              <a key={c.label} href={c.href} className="channel">
                <span className="channel__icon">{BENEFIT_ICONS[c.icon]}</span>
                <span className="channel__txt">
                  <span className="channel__label">{c.label}</span>
                  <span className="channel__val">{c.value}</span>
                </span>
                <span className="channel__arr">&#8594;</span>
              </a>
            ))}
          </div>
        </div>

        <div className="reveal contact__form" id="formulaire" ref={formRef}>
          <ProjectForm />
        </div>
      </div>
    </section>
  );
};

/* ── Hero Sites web (2 colonnes : copy + démo navigateur) ── */
const SITE_CHECKS = ["Trouvé en 1re page Google", "Chargé en 0,9 seconde", "Nouvel appel reçu"];

/* Étapes : 0 vide · 1 recherche Google · 2 chargement · 3 le site apparaît ·
   4-6 confirmations successives, puis la boucle recommence. */
const SiteDemo = () => {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStep(6); return; }
    const DELAYS = [900, 1200, 1200, 1600, 900, 900, 3400];
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
        <span className="nvw-dots"><span></span><span></span><span></span></span>
        <span className="nvw-url mono">tonentreprise.ca</span>
        <span className="nvai-chat__status mono">100/100 Lighthouse</span>
      </div>
      <div className="nvai-chat__body">
        {step >= 1 && (
          <div className="nv-chat-user nvai-pop nvw-search">
            {BENEFIT_ICONS.search}<span>couvreur gatineau</span>
          </div>
        )}
        {step === 2 && (
          <div className="nvai-typing nvai-pop"><span></span><span></span><span></span></div>
        )}
        {step >= 3 && (
          <div className="nvw-site nvai-pop">
            <div className="nvw-site__name">Toitures Tremblay</div>
            <div className="nvw-site__desc">Toiture résidentielle à Gatineau · Soumission gratuite en 24 h</div>
            <div className="nvw-site__cta">Appelez-nous <span className="arrow">&#8594;</span></div>
          </div>
        )}
        <div className="nvai-checks">
          {SITE_CHECKS.map((c, i) => step >= 4 + i && (
            <div className="nvai-check nvai-pop" key={c}>{BENEFIT_ICONS.checkcircle}<span>{c}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SiteWebHero = () => {
  const ref = useReveal();
  return (
    <header className="nvai-hero reveal" ref={ref}>
      <div className="nvai-hero__copy">
        <h1 className="nvai-hero__t">Un site qui <em>fait sonner le téléphone.</em></h1>
        <p className="nvai-hero__sub">
          Professionnel, rapide, pensé pour les entrepreneurs de l'Outaouais. Ton prochain client te
          cherche sur Google, fais en sorte qu'il te trouve, toi, pas ton concurrent.
        </p>
        <div className="nvai-cta">
          <a href="/contact" className="btn btn-accent">Démarrer mon projet <span className="arrow">&#8594;</span></a>
          <a href="#forfaits" className="btn nv-btn-ghost">Voir les forfaits</a>
        </div>
      </div>
      <SiteDemo />
    </header>
  );
};

/* ── Témoignages (structure seulement — placeholders, vrai contenu au Jour 3) ──
   NE PAS inventer d'avis : remplacer chaque champ par du contenu client réel. */
const TESTIMONIALS = [
  { quote: "[Témoignage client — à remplir]", name: "[Nom du client]", role: "[Métier · Ville]" },
  { quote: "[Témoignage client — à remplir]", name: "[Nom du client]", role: "[Métier · Ville]" },
  { quote: "[Témoignage client — à remplir]", name: "[Nom du client]", role: "[Métier · Ville]" },
];

const TestimonialCard = ({ t, i }) => {
  const ref = useReveal();
  return (
    <figure className="tmon-card reveal" ref={ref} style={{ transitionDelay: `${i * 90}ms` }}>
      <span className="tmon-badge mono">À remplir</span>
      <span className="tmon-mark" aria-hidden="true">&#8220;</span>
      <blockquote className="tmon-quote">{t.quote}</blockquote>
      <figcaption className="tmon-cite">
        <span className="tmon-name">{t.name}</span>
        <span className="tmon-role">{t.role}</span>
      </figcaption>
    </figure>
  );
};

const Testimonials = () => {
  const ref = useReveal();
  return (
    <section className="section testimonials" id="temoignages" aria-labelledby="temoignages-title">
      <div className="section-head reveal" ref={ref}>
        <h2 className="section-title" id="temoignages-title">Ce qu'en disent les entrepreneurs.</h2>
      </div>
      <div className="tmon-grid">
        {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
      </div>
    </section>
  );
};

/* ── Composition des pages ── */
const {
  Hero, WhyNovio, Specs, MarqueeRow, FoundersSlots, About, FinalCTA,
  CompareAgency, Pricing, FAQ, FAQ_WEB, FAQ_ABO,
} = window;

const HomePage = () => (
  <React.Fragment>
    <Hero />
    <WhyNovio />
    <MarqueeRow items={[
      "Plus de contrats",
      "Toiture · HVAC · Plomberie · Paysagement · Rénovation",
      "Gatineau · Ottawa · Outaouais",
      "Dès 129 $/mois, tout inclus",
      "Livré en 7–28 jours",
      "100 / 100 Lighthouse",
      "Sans agence · sans jargon",
    ]} />
    <Specs />
    <Pricing />
    <FoundersSlots />
    <About />
    <Testimonials />
    <FinalCTA />
  </React.Fragment>
);

const SiteWebPage = () => (
  <React.Fragment>
    <SiteWebHero />
    <Process />
    <Pricing />
    <CompareAgency />
    <FAQ items={FAQ_WEB} title="Questions fréquentes." />
    <FinalCTA
      headline={<>Ton prochain client te cherche sur Google. <em>Sois là.</em></>}
      ctaLabel="Démarrer mon projet"
      ctaHref="/contact"
    />
  </React.Fragment>
);

const PricingPage = () => (
  <React.Fragment>
    <PageHeader
      index="Tarifs"
      metaRight="Abonnement mensuel"
      title={<>Un site pro. <em>Un prix mensuel.</em></>}
      sub="Deux forfaits tout inclus : création, hébergement, maintenance et modifications, plus 200 $ de frais de départ, une seule fois. Tu sais exactement ce que tu paies, avant de commencer."
    />
    <Pricing title={<>Choisis ton <em>forfait.</em></>} />
    <CompareAgency />
    <FAQ items={FAQ_ABO} title="Questions fréquentes." />
    <FinalCTA
      headline={<>Un prix clair, un interlocuteur. <em>On commence ?</em></>}
      ctaLabel="Démarrer mon projet"
      ctaHref="/contact"
    />
  </React.Fragment>
);

const ContactPage = () => (
  <React.Fragment>
    <PageHeader
      index="Contact"
      metaRight="Réponse < 24 h"
      title={<>Parlons de <em>ton projet.</em></>}
      sub="Premier appel de 15 minutes, gratuit. On regarde où tu perds des leads aujourd'hui, et ce qu'on peut récupérer. Pas de jargon, pas de pression."
    />
    <ContactSection />
  </React.Fragment>
);

Object.assign(window, {
  PageHeader, SecHead, Process, ContactSection,
  HomePage, SiteWebPage, PricingPage, ContactPage,
});
