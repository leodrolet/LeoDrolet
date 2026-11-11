/* ============================================================
   pages.jsx, En-têtes de pages, étapes, contact, témoignages,
   et composition des 4 pages du site.
   Chargé après tous les composants de section (dépend d'eux).
   ============================================================ */

const { BENEFIT_ICONS, ArrowIcon, SectionHead } = window;

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
const NEXT_STEPS = [
  { t: "Un appel de 15 minutes", d: "Gratuit et sans engagement. Vous me parlez de votre entreprise et de vos objectifs." },
  { t: "Une proposition claire", d: "Le forfait adapté, ce qu'il comprend et un échéancier, en moins de 24 h." },
  { t: "La conception démarre",  d: "Vous validez, je commence. Vous parlez toujours à la personne qui fait le travail." },
];

// Choix du forfait (radio). La valeur est envoyée dans le champ « interet ».
const PLAN_OPTIONS = [
  { slug: "croissance", label: "Croissance", hint: "129 $/mois" },
  { slug: "premium",    label: "Premium",    hint: "199 $/mois" },
  { slug: "indecis",    label: "Je ne sais pas encore", hint: "On en discute" },
];
const PLAN_VALUE = { croissance: "Forfait Croissance", premium: "Forfait Premium", indecis: "Pas sûr encore" };

// Présélection depuis les boutons « Choisir … » : /contact?forfait=croissance|premium
const initialPlan = () => {
  try {
    const slug = (new URLSearchParams(window.location.search).get("forfait") || "").toLowerCase();
    return PLAN_VALUE[slug] ? slug : "";
  } catch (_) { return ""; }
};

// ── Formulaire (AJAX → Formspree, états idle/submitting/success/error) ──
const ProjectForm = () => {
  const [status, setStatus] = React.useState("idle");
  const [plan, setPlan] = React.useState(initialPlan);
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete("forfait");
    data.set("interet", plan ? PLAN_VALUE[plan] : "Non précisé");
    data.set("_subject", plan === "croissance" || plan === "premium"
      ? `Nouvelle demande (${PLAN_VALUE[plan]}), site Novio Studio`
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
          "Une erreur est survenue. Réessayez, ou écrivez-moi directement par courriel.");
        setStatus("error");
      }
    } catch (_) {
      setError("Connexion impossible. Réessayez, ou écrivez-moi à " + EMAIL + ".");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-card form-success" role="status">
        <span className="form-success__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <h2 className="form-card__title">Demande envoyée.</h2>
        <p className="form-success__lead">
          Merci. Je vous réponds en moins de 24 h. D'ici là, vous pouvez m'écrire à{" "}
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <a href="/" className="btn btn--secondary">Retour à l'accueil</a>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2 className="form-card__title">Demander une soumission</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="field">
          <legend className="field__label">Forfait souhaité</legend>
          <div className="plan-choice">
            {PLAN_OPTIONS.map((o) => (
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
        <input type="hidden" name="_subject" value="Nouvelle demande, site Novio Studio" />

        <div className="form-row">
          <div className="field">
            <label className="field__label" htmlFor="cf-name">Nom <span className="field__req" aria-hidden="true">*</span></label>
            <input className="input" id="cf-name" type="text" name="name" autoComplete="name" required />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="cf-phone">Téléphone <span className="field__opt">facultatif</span></label>
            <input className="input" id="cf-phone" type="tel" name="phone" autoComplete="tel" />
          </div>
        </div>
        <div className="field">
          <label className="field__label" htmlFor="cf-email">Courriel <span className="field__req" aria-hidden="true">*</span></label>
          <input className="input" id="cf-email" type="email" name="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="cf-msg">Votre entreprise et votre projet</label>
          <textarea className="input" id="cf-msg" name="message" rows="4" placeholder="Ex. : couvreur à Gatineau, je souhaite recevoir plus de demandes de soumission."></textarea>
        </div>
        <label className="consent">
          <input type="checkbox" name="consent" required />
          <span>J'accepte d'être contacté par Novio Studio au sujet de ma demande.</span>
        </label>

        {status === "error" && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "submitting"}>
          {status === "submitting"
            ? (<><span className="spinner" aria-hidden="true"></span> Envoi en cours…</>)
            : (<>Envoyer ma demande <ArrowIcon /></>)}
        </button>
        <p className="form-card__note">Réponse en moins de 24 h. Les champs marqués d'un * sont obligatoires.</p>
      </form>
    </div>
  );
};

const ContactSection = () => {
  React.useEffect(() => {
    if (window.location.hash !== "#formulaire") return;
    const el = document.getElementById("formulaire");
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);
  return (
    <section className="section section--tight" aria-label="Formulaire de contact">
      <div className="container contact">
        <div className="contact__form" id="formulaire">
          <ProjectForm />
        </div>
        <aside className="contact__aside" aria-labelledby="ensuite-title">
          <h2 className="contact__h" id="ensuite-title">Ce qui se passe ensuite</h2>
          <ol className="next">
            {NEXT_STEPS.map((s, i) => (
              <li className="next__item" key={s.t}>
                <span className="next__n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="next__t">{s.t}</h3>
                  <p className="next__d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <h2 className="contact__h">Ou directement</h2>
          <ul className="channels">
            <li>
              <a className="channel" href={`mailto:${EMAIL}`}>
                <span className="channel__ico" aria-hidden="true">{BENEFIT_ICONS.mail}</span>
                <span className="channel__txt"><span className="channel__label">Courriel</span><span className="channel__val">{EMAIL}</span></span>
              </a>
            </li>
            <li>
              <a className="channel" href={`tel:${TEL}`}>
                <span className="channel__ico" aria-hidden="true">{BENEFIT_ICONS.phone}</span>
                <span className="channel__txt"><span className="channel__label">Téléphone</span><span className="channel__val">{TEL_DISPLAY}</span></span>
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
      title="Des sites conçus pour attirer des clients."
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
      title="Des tarifs simples et transparents."
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
  PageHeader, Process, SiteFeatures, ContactSection, Testimonials,
  HomePage, SiteWebPage, PricingPage, ContactPage,
});
