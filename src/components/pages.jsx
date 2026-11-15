/* ============================================================
   pages.jsx, En-têtes de pages, étapes, contact, témoignages,
   et composition des 4 pages du site.
   Chargé après tous les composants de section (dépend d'eux).
   ============================================================ */

const { BENEFIT_ICONS, ArrowIcon, SectionHead, track } = window;

const FORMSPREE = "https://formspree.io/f/mdaronva";
const EMAIL = "leo_drolet@noviostudio.online";
const TEL = "+18736554684";
const TEL_DISPLAY = "873 655-4684";

/* ── En-tête de page (pages internes) ── */
const PageHeader = ({ title, sub, actions }) => (
  <header className="page-head">
    <div className="container">
      <h1 className="page-head__title">{title}</h1>
      {sub && <p className="page-head__sub">{sub}</p>}
      {actions && <div className="page-head__actions">{actions}</div>}
    </div>
  </header>
);

/* ── Étapes de démarrage ── */
const PROCESS = [
  { t: "Appel découverte", d: "15 minutes, gratuit. Vous me parlez de votre entreprise, de vos clients et de vos objectifs." },
  { t: "Conception",       d: "Je conçois une maquette à votre image. Vous la validez, on ajuste ensemble." },
  { t: "Mise en ligne",    d: "Je construis le site, l'optimise pour Google et le mets en ligne, en général 2 à 3 semaines après le premier appel." },
  { t: "Chaque mois",      d: "Hébergement, maintenance, sécurité et vos modifications : votre site reste à jour, sans effort de votre part." },
];

const Process = () => (
  <section className="section" aria-labelledby="etapes-title">
    <div className="container">
      <SectionHead id="etapes-title" title="Votre site en ligne, en quatre étapes." />
      <ol className="steps">
        {PROCESS.map((s, i) => (
          <li className="step" key={s.t}>
            <span className="step__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="step__t">{s.t}</h3>
            <p className="step__d">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ── Ce que comprend chaque site (/site-web) ── */
const SITE_FEATURES = [
  { icon: "pencil",     t: "À votre image",        d: "Un site conçu pour votre métier et vos couleurs. Avec Premium, un design entièrement personnalisé." },
  { icon: "smartphone", t: "Adapté au mobile",     d: "Une lecture claire sur téléphone, tablette et ordinateur." },
  { icon: "search",     t: "Pensé pour Google",    d: "Optimisation SEO incluse : de base avec Croissance, avancée avec Premium." },
  { icon: "mail",       t: "Formulaire de contact", d: "Vos clients vous écrivent directement depuis votre site." },
  { icon: "barchart",   t: "Statistiques",         d: "Suivez la fréquentation de votre site et les pages consultées." },
  { icon: "shield",     t: "Hébergé et sécurisé",  d: "Hébergement, sécurité et sauvegardes gérés pour vous." },
];

const SiteFeatures = () => (
  <section className="section" aria-labelledby="inclus-title">
    <div className="container">
      <SectionHead id="inclus-title" title="Ce que comprend chaque site." />
      <ul className="features">
        {SITE_FEATURES.map((f) => (
          <li className="feature" key={f.t}>
            <span className="feature__ico" aria-hidden="true">{BENEFIT_ICONS[f.icon]}</span>
            <h3 className="feature__t">{f.t}</h3>
            <p className="feature__d">{f.d}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ── Contact ── */
const NEXT_STEPS = {
  fr: [
    { t: "Un appel de 15 minutes", d: "Gratuit et sans engagement. Vous me parlez de votre entreprise et de vos objectifs." },
    { t: "Une proposition claire", d: "Le forfait adapté, ce qu'il comprend et un échéancier, en moins de 24 h." },
    { t: "La conception démarre",  d: "Vous validez, je commence. Vous parlez toujours à la personne qui fait le travail." },
  ],
  en: [
    { t: "A 15-minute call",     d: "Free, no commitment. Tell me about your business and your goals." },
    { t: "A clear proposal",     d: "The right plan, what it includes and a timeline, within 24 hours." },
    { t: "Design begins",        d: "You approve, I start. You always talk to the person doing the work." },
  ],
};

// Choix du forfait (radio). La valeur est envoyée dans le champ « interet ».
const PLAN_OPTIONS = {
  fr: [
    { slug: "croissance", label: "Croissance", hint: "129 $/mois" },
    { slug: "premium",    label: "Premium",    hint: "199 $/mois" },
    { slug: "indecis",    label: "Je ne sais pas encore", hint: "On en discute" },
  ],
  en: [
    { slug: "croissance", label: "Growth",  hint: "$129/month" },
    { slug: "premium",    label: "Premium", hint: "$199/month" },
    { slug: "indecis",    label: "Not sure yet", hint: "Let's discuss" },
  ],
};

// Textes du formulaire (français / anglais)
const FORM_TXT = {
  fr: {
    title: "Demander une soumission", plan: "Forfait souhaité", name: "Nom", phone: "Téléphone",
    optional: "facultatif", email: "Courriel", msg: "Votre entreprise et votre projet",
    placeholder: "Ex. : couvreur à Gatineau, je souhaite recevoir plus de demandes de soumission.",
    consent: "J'accepte d'être contacté par Novio Studio au sujet de ma demande.",
    sending: "Envoi en cours…", send: "Envoyer ma demande",
    note: "Réponse en moins de 24 h. Les champs marqués d'un * sont obligatoires.",
    okTitle: "Demande envoyée.", okLead: "Merci. Je vous réponds en moins de 24 h. D'ici là, vous pouvez m'écrire à",
    back: "Retour à l'accueil", backHref: "/",
    err: "Une erreur est survenue. Réessayez, ou écrivez-moi directement par courriel.",
    net: "Connexion impossible. Réessayez, ou écrivez-moi à ",
    subject: "Nouvelle demande, site Novio Studio", undecided: "Non précisé",
    nextH: "Ce qui se passe ensuite", directH: "Ou directement", mailL: "Courriel", telL: "Téléphone",
    section: "Formulaire de contact",
  },
  en: {
    title: "Get a quote", plan: "Plan you're interested in", name: "Name", phone: "Phone",
    optional: "optional", email: "Email", msg: "Your business and your project",
    placeholder: "E.g. roofing company in Ottawa, I'd like to get more quote requests online.",
    consent: "I agree to be contacted by Novio Studio about my request.",
    sending: "Sending…", send: "Send my request",
    note: "Reply within 24 hours. Fields marked with * are required.",
    okTitle: "Request sent.", okLead: "Thank you. I'll get back to you within 24 hours. In the meantime, you can email me at",
    back: "Back to home", backHref: "/en",
    err: "Something went wrong. Please try again, or email me directly.",
    net: "Connection failed. Please try again, or email me at ",
    subject: "New request (EN), Novio Studio website", undecided: "Not specified",
    nextH: "What happens next", directH: "Or reach me directly", mailL: "Email", telL: "Phone",
    section: "Contact form",
  },
};
const PLAN_VALUE = { croissance: "Forfait Croissance", premium: "Forfait Premium", indecis: "Pas sûr encore" };

// Présélection depuis les boutons « Choisir … » : /contact?forfait=croissance|premium
const initialPlan = () => {
  try {
    const slug = (new URLSearchParams(window.location.search).get("forfait") || "").toLowerCase();
    return PLAN_VALUE[slug] ? slug : "";
  } catch (_) { return ""; }
};

// ── Formulaire (AJAX → Formspree, états idle/submitting/success/error) ──
const ProjectForm = ({ lang = "fr" }) => {
  const t = FORM_TXT[lang] || FORM_TXT.fr;
  const [status, setStatus] = React.useState("idle");
  // Présélection lue après le montage : le HTML pré-rendu (sans forfait) reste identique à l'hydratation
  const [plan, setPlan] = React.useState("");
  React.useEffect(() => { const p = initialPlan(); if (p) setPlan(p); }, []);
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete("forfait");
    data.set("interet", plan ? PLAN_VALUE[plan] : t.undecided);
    if (lang !== "fr") data.set("langue", lang);
    data.set("_subject", plan === "croissance" || plan === "premium"
      ? `${t.subject} (${PLAN_VALUE[plan]})`
      : t.subject);
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
        // Conversion : aucun renseignement personnel, seulement le forfait et la langue
        track("generate_lead", { form: "contact", plan: plan || "none", lang });
      } else {
        const j = await res.json().catch(() => null);
        setError((j && j.errors && j.errors.map((x) => x.message).join(" ")) || t.err);
        setStatus("error");
        track("form_error", { form: "contact", lang });
      }
    } catch (_) {
      setError(t.net + EMAIL + ".");
      setStatus("error");
      track("form_error", { form: "contact", lang });
    }
  };

  if (status === "success") {
    return (
      <div className="form-card form-success" role="status">
        <span className="form-success__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <h2 className="form-card__title">{t.okTitle}</h2>
        <p className="form-success__lead">
          {t.okLead}{" "}
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <a href={t.backHref} className="btn btn--secondary">{t.back}</a>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2 className="form-card__title">{t.title}</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="field">
          <legend className="field__label">{t.plan}</legend>
          <div className="plan-choice">
            {(PLAN_OPTIONS[lang] || PLAN_OPTIONS.fr).map((o) => (
              <label key={o.slug} className="plan-choice__opt">
                <input
                  type="radio"
                  name="forfait"
                  value={o.slug}
                  checked={plan === o.slug}
                  onChange={() => setPlan(o.slug)}
                />
                <span className="plan-choice__box">
                  <span className="plan-choice__label">{o.label}</span>
                  <span className="plan-choice__hint">{o.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* anti-spam (honeypot Formspree) */}
        <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" className="form-hp" />
        <input type="hidden" name="_subject" value={t.subject} />

        <div className="form-row">
          <div className="field">
            <label className="field__label" htmlFor="cf-name">{t.name} <span className="field__req" aria-hidden="true">*</span></label>
            <input className="input" id="cf-name" type="text" name="name" autoComplete="name" required />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="cf-phone">{t.phone} <span className="field__opt">{t.optional}</span></label>
            <input className="input" id="cf-phone" type="tel" name="phone" autoComplete="tel" />
          </div>
        </div>
        <div className="field">
          <label className="field__label" htmlFor="cf-email">{t.email} <span className="field__req" aria-hidden="true">*</span></label>
          <input className="input" id="cf-email" type="email" name="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="cf-msg">{t.msg}</label>
          <textarea className="input" id="cf-msg" name="message" rows="4" placeholder={t.placeholder}></textarea>
        </div>
        <label className="consent">
          <input type="checkbox" name="consent" required />
          <span>{t.consent}</span>
        </label>

        {status === "error" && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "submitting"}>
          {status === "submitting"
            ? (<><span className="spinner" aria-hidden="true"></span> {t.sending}</>)
            : (<>{t.send} <ArrowIcon /></>)}
        </button>
        <p className="form-card__note">{t.note}</p>
      </form>
    </div>
  );
};

const ContactSection = ({ lang = "fr", id }) => {
  const t = FORM_TXT[lang] || FORM_TXT.fr;
  React.useEffect(() => {
    if (window.location.hash !== "#formulaire") return;
    const el = document.getElementById("formulaire");
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);
  return (
    <section className="section section--tight" id={id} aria-label={t.section}>
      <div className="container contact">
        <div className="contact__form" id="formulaire">
          <ProjectForm lang={lang} />
        </div>
        <aside className="contact__aside" aria-labelledby="ensuite-title">
          <h2 className="contact__h" id="ensuite-title">{t.nextH}</h2>
          <ol className="next">
            {(NEXT_STEPS[lang] || NEXT_STEPS.fr).map((s, i) => (
              <li className="next__item" key={s.t}>
                <span className="next__n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="next__t">{s.t}</h3>
                  <p className="next__d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <h2 className="contact__h">{t.directH}</h2>
          <ul className="channels">
            <li>
              <a className="channel" href={`mailto:${EMAIL}`}>
                <span className="channel__ico" aria-hidden="true">{BENEFIT_ICONS.mail}</span>
                <span className="channel__txt"><span className="channel__label">{t.mailL}</span><span className="channel__val">{EMAIL}</span></span>
              </a>
            </li>
            <li>
              <a className="channel" href={`tel:${TEL}`}>
                <span className="channel__ico" aria-hidden="true">{BENEFIT_ICONS.phone}</span>
                <span className="channel__txt"><span className="channel__label">{t.telL}</span><span className="channel__val">{TEL_DISPLAY}</span></span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

/* ── Témoignages ──
   NE JAMAIS inventer d'avis. La section ne s'affiche que lorsqu'au moins un
   vrai témoignage est saisi (les entrées entre crochets sont ignorées). */
const TESTIMONIALS = [
  { quote: "[Témoignage client — à remplir]", name: "[Nom du client]", role: "[Métier · Ville]" },
  { quote: "[Témoignage client — à remplir]", name: "[Nom du client]", role: "[Métier · Ville]" },
  { quote: "[Témoignage client — à remplir]", name: "[Nom du client]", role: "[Métier · Ville]" },
];

const Testimonials = () => {
  const real = TESTIMONIALS.filter((t) => t.quote && !t.quote.trim().startsWith("["));
  if (!real.length) return null;
  return (
    <section className="section" id="temoignages" aria-labelledby="temoignages-title">
      <div className="container">
        <SectionHead id="temoignages-title" title="Ce qu'en disent nos clients." />
        <div className="quotes">
          {real.map((t, i) => (
            <figure className="quote" key={i}>
              <blockquote className="quote__text"><p>{t.quote}</p></blockquote>
              <figcaption className="quote__cite">
                <span className="quote__name">{t.name}</span>
                <span className="quote__role">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Page « statique » (blogue, articles, /en) ──
   Le contenu principal est un fragment HTML généré au build (content/).
   after = "cta" (appel à l'action final) | "contact" (formulaire, /en). */
const StaticPage = ({ html, after = "cta", lang = "fr" }) => (
  <React.Fragment>
    <div className="static-body" data-static-body="" dangerouslySetInnerHTML={{ __html: html || "" }} />
    {after === "contact"
      ? <ContactSection lang={lang} id="contact" />
      : <window.FinalCTA lang={lang} />}
  </React.Fragment>
);

/* ── Composition des pages ── */
const {
  Hero, Pricing, SubscriptionModel, Realisations, CompareAgency, About,
  FAQ, FAQ_WEB, FAQ_ABO, FinalCTA,
} = window;

const HomePage = () => (
  <React.Fragment>
    <Hero />
    <SubscriptionModel />
    <Pricing />
    <Process />
    <Realisations />
    <About />
    <Testimonials />
    <FAQ items={FAQ_ABO} />
    <FinalCTA />
  </React.Fragment>
);

const SiteWebPage = () => (
  <React.Fragment>
    <PageHeader
      title="Des sites Web d'entreprise conçus pour attirer des clients."
      sub="Clairs, rapides et pensés pour Google. Conçus, hébergés et entretenus par Novio Studio, pour les entreprises de l'Outaouais."
      actions={<>
        <a className="btn btn--primary btn--lg" href="/contact">Demander une soumission <ArrowIcon /></a>
        <a className="btn btn--secondary btn--lg" href="#forfaits">Voir les forfaits</a>
      </>}
    />
    <SiteFeatures />
    <Process />
    <Pricing />
    <CompareAgency />
    <FAQ items={FAQ_WEB} />
    <FinalCTA />
  </React.Fragment>
);

const PricingPage = () => (
  <React.Fragment>
    <PageHeader
      title={"Prix d'un site Web\u00a0: des tarifs simples et transparents."}
      sub="Deux forfaits mensuels tout inclus, après des frais de départ uniques de 200 $. Vous savez exactement ce que vous payez, avant de commencer."
    />
    <Pricing showHead={false} />
    <SubscriptionModel />
    <CompareAgency />
    <FAQ items={FAQ_ABO} />
    <FinalCTA />
  </React.Fragment>
);

const ContactPage = () => (
  <React.Fragment>
    <PageHeader
      title="Parlons de votre projet."
      sub="Décrivez votre entreprise et ce que vous attendez de votre site. Je vous réponds en moins de 24 h."
    />
    <ContactSection />
  </React.Fragment>
);

Object.assign(window, {
  PageHeader, Process, SiteFeatures, ContactSection, Testimonials, StaticPage,
  PROCESS, SITE_FEATURES,
  HomePage, SiteWebPage, PricingPage, ContactPage,
});
