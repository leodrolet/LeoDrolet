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

/* ── Accueil : les deux offres ── */
const OFFERS = [
  {
    href: "/site-web", title: "Sites Web", price: "dès 1 500 $",
    desc: "Un site sur mesure, rapide, qui transforme les recherches Google en appels et en soumissions.",
    points: ["5 pages sur mesure", "Livré en 2–3 semaines", "Hébergement 119 $/mois"],
    cta: "Voir les forfaits", featured: false,
  },
  {
    href: "/automatisation", title: "Automatisation IA", price: "250 $/mois",
    desc: "Des automatisations qui répondent, relancent et qualifient tes leads, pendant que tu travailles.",
    points: ["Réponse aux appels manqués", "Relance des soumissions", "Avis Google automatiques"],
    cta: "Voir les automatisations", featured: true,
  },
];

const OfferCard = ({ o, i }) => (
  <m.a
    href={o.href}
    className={`plan-card${o.featured ? " plan-card--featured" : ""}`}
    style={{ textDecoration: "none", color: "inherit", height: "100%" }}
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.12 }}
    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
  >
    <div className="plan-card-header">
      <div className="plan-card-top"><span className="plan-tier">{o.title}</span></div>
      <span className="plan-amount">{o.price}</span>
      <p className="plan-best-for">{o.desc}</p>
    </div>
    <div className="plan-benefits">
      <div className="benefit-group">
        <div className="benefit-group-items">
          {o.points.map((p, j) => (
            <div key={j} className="benefit-row">
              <span className="benefit-icon-svg">{BENEFIT_ICONS.check}</span>
              <span className="benefit-text"><strong className="benefit-bold">{p}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <span className={`btn plan-cta${o.featured ? " plan-cta--featured" : ""}`}>
      {o.cta} <span className="arrow">&#8594;</span>
    </span>
  </m.a>
);

const OffersOverview = () => {
  const ref = useReveal();
  return (
    <section className="section" id="offres">
      <div className="section-head reveal" ref={ref}>
        <h2 className="section-title">Deux façons de remplir ton agenda.</h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        padding: "0 var(--gutter)",
      }}>
        {OFFERS.map((o, i) => <OfferCard key={o.href} o={o} i={i} />)}
      </div>
    </section>
  );
};

/* ── Process / timeline (site-web) ── */
const PROCESS = [
  { n: "01", t: "Appel découverte",       d: "On parle de ton métier, tes clients, tes objectifs. 15 minutes, gratuit.", dur: "Jour 0" },
  { n: "02", t: "Design sur mesure",      d: "Je conçois une maquette qui te ressemble. Tu valides, on ajuste ensemble.", dur: "Semaine 1" },
  { n: "03", t: "Construction",           d: "Je code chaque page à la main, rapide, soignée, et à toi pour toujours.", dur: "Semaine 2" },
  { n: "04", t: "Lancement + autonomie",  d: "Mise en ligne, formation, et je reste 30 à 60 jours pour que tu sois autonome.", dur: "Semaine 3" },
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

const INTERESTS = ["Site web", "Automatisation IA", "Pack Croissance", "Pas sûr encore"];

// ── Formulaire de projet (AJAX → Formspree, états idle/submitting/success/error) ──
const ProjectForm = () => {
  const [status, setStatus] = React.useState("idle");
  const [interest, setInterest] = React.useState("Site web");
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("interet", interest);
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
          <span className="field-label">Ce qui t'intéresse</span>
          <div className="field-options" role="group" aria-label="Ce qui t'intéresse">
            {INTERESTS.map((it) => (
              <button
                type="button"
                key={it}
                className={interest === it ? "active" : ""}
                aria-pressed={interest === it}
                onClick={() => setInterest(it)}
              >
                {it}
              </button>
            ))}
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

        <div className="reveal" ref={formRef}>
          <ProjectForm />
        </div>
      </div>
    </section>
  );
};

/* ── Composition des pages ── */
const {
  Hero, Manifesto, WhyNovio, Specs, MarqueeRow, FoundersSlots, About, FinalCTA,
  Services, CompareAgency, Automation, AutoIA, Pricing, FAQ, FAQ_WEB, FAQ_IA,
} = window;

const HomePage = () => (
  <React.Fragment>
    <Hero />
    <WhyNovio />
    <MarqueeRow items={[
      "Plus de contrats",
      "Toiture · HVAC · Plomberie · Paysagement · Rénovation",
      "Gatineau · Ottawa · Outaouais",
      "Dès 1 500 $ CAD",
      "Livré en 7–28 jours",
      "100 / 100 Lighthouse",
      "Sans agence · sans template",
    ]} />
    <Specs />
    <OffersOverview />
    <FoundersSlots />
    <About />
    <FinalCTA />
  </React.Fragment>
);

const SiteWebPage = () => (
  <React.Fragment>
    <PageHeader
      index="Sites web"
      metaRight="2–3 semaines"
      title={<>Un site qui <em>fait sonner le téléphone.</em></>}
      sub="Sur mesure, rapide, pensé pour les entrepreneurs de l'Outaouais. Ton prochain client te cherche sur Google, fais en sorte qu'il te trouve, toi, pas ton concurrent."
      stats={[
        { v: "2–3", u: "sem", k: "Livraison" },
        { v: "100", u: "/100", k: "Lighthouse" },
        { v: "0.9", u: "s", k: "Chargement" },
        { v: "1 500", u: "$", k: "À partir de" },
      ]}
    />
    <Process />
    <Services />
    <FAQ items={FAQ_WEB} title="Questions fréquentes." />
    <FinalCTA
      headline={<>Ton prochain client te cherche sur Google. <em>Sois là.</em></>}
      ctaLabel="Démarrer mon projet"
      ctaHref="/contact"
    />
  </React.Fragment>
);

const AutomationPage = () => <AutoIA />;

const PricingPage = () => (
  <React.Fragment>
    <PageHeader
      index="Tarifs"
      metaRight="Sans engagement"
      title={<>Des prix clairs. <em>Aucune surprise.</em></>}
      sub="Un forfait unique pour le site, un mensuel sans engagement pour l'hébergement, des automatisations à la carte. Tu sais exactement ce que tu paies, avant de commencer."
      stats={[
        { v: "1 500", u: "$", k: "Site web" },
        { v: "119", u: "$/mois", k: "Hébergement" },
        { v: "250", u: "$/mois", k: "Par automatisation" },
        { v: "0", u: "$", k: "Installation" },
      ]}
    />
    <Pricing />
    <CompareAgency />
    <FAQ items={FAQ_WEB} title="Questions fréquentes." />
    <FinalCTA
      headline={<>Un prix, un échéancier, un interlocuteur. <em>On commence ?</em></>}
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
  PageHeader, SecHead, OffersOverview, Process, ContactSection,
  HomePage, SiteWebPage, AutomationPage, PricingPage, ContactPage,
});
