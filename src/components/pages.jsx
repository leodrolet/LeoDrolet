/* ============================================================
   pages.jsx — En-têtes de page, sections accueil/contact, et
   composition des 4 pages du site vitrine.
   Chargé après tous les composants de section (dépend d'eux).
   Exporte : window.PageHeader, OffersOverview, ContactSection,
             HomePage, SiteWebPage, AutomationPage, ContactPage
   ============================================================ */

const { useReveal, useMagnetic } = window;
const { motion: m } = window.Motion || {};
const { BENEFIT_ICONS } = window;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const CALENDLY = "https://calendly.com/leo_drolet-noviostudio/conception-site-web";
const EMAIL = "leo_drolet@noviostudio.online";
const TEL = "+18736554684";
const TEL_DISPLAY = "873 655-4684";
// Formulaire de contact — endpoint Formspree à remplacer par le vrai ID du formulaire.
const FORMSPREE = "https://formspree.io/f/REMPLACER";

/* ── En-tête de page réutilisable ───────────────────────── */
const PageHeader = ({ eyebrow, title, sub }) => {
  const ref = useReveal();
  return (
    <header className="section">
      <div className="section-head reveal" ref={ref} style={{ display: "grid", gap: "20px", maxWidth: "900px" }}>
        {eyebrow && (
          <div className="mono specs-eyebrow"><span className="dash"></span><span>{eyebrow}</span></div>
        )}
        <h1 className="section-title">{title}</h1>
        {sub && <p className="specs-sub" style={{ maxWidth: "60ch", fontSize: "16px" }}>{sub}</p>}
      </div>
    </header>
  );
};

/* ── Accueil : les deux offres ──────────────────────────── */
const OFFERS = [
  {
    href: "/site-web",
    title: "Sites Web",
    price: "dès 1 500 $",
    desc: "Un site sur mesure, rapide, qui transforme les recherches Google en appels et en soumissions.",
    points: ["5 pages sur mesure", "Livré en 2–3 semaines", "Hébergement 250 $/mois"],
    cta: "Voir les forfaits",
    featured: false,
  },
  {
    href: "/automatisation",
    title: "Automatisation IA",
    price: "250 $/mois",
    desc: "Des automatisations qui répondent, relancent et qualifient tes leads — pendant que tu travailles.",
    points: ["Réponse aux appels manqués", "Relance des soumissions", "Avis Google automatiques"],
    cta: "Voir les automatisations",
    featured: true,
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

/* ── Contact : canaux + formulaire ──────────────────────── */
const CONTACT_CHANNELS = [
  {
    icon: "calendar", label: "Prendre un appel", value: "15 min · gratuit",
    href: CALENDLY, external: true,
  },
  {
    icon: "messagecircle", label: "Écrire un courriel", value: EMAIL,
    href: `mailto:${EMAIL}`, external: false,
  },
  {
    icon: "phone", label: "Appeler", value: TEL_DISPLAY,
    href: `tel:${TEL}`, external: false,
  },
];

const ContactSection = () => {
  const ref = useReveal();
  return (
    <section className="section" id="contact">
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        padding: "0 var(--gutter)",
        marginBottom: "48px",
      }}>
        {CONTACT_CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="plan-card"
            style={{ textDecoration: "none", color: "inherit", gap: "10px" }}
          >
            <span className="benefit-icon-svg" style={{ color: "var(--accent)", width: "26px", height: "26px" }}>{BENEFIT_ICONS[c.icon]}</span>
            <span className="plan-tier" style={{ marginTop: "8px" }}>{c.label}</span>
            <span style={{ color: "var(--ink-2)", fontSize: "0.95rem", wordBreak: "break-word" }}>{c.value}</span>
          </a>
        ))}
      </div>

      <div className="reveal" ref={ref} style={{ maxWidth: "640px", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <p className="specs-sub" style={{ textAlign: "center", margin: "0 0 24px" }}>
          Ou laisse-moi un mot — je réponds en moins de 24&nbsp;h, sans jargon, on parle chiffres.
        </p>
        <form action={FORMSPREE} method="POST" style={{ display: "grid", gap: "20px" }}>
          <div className="field">
            <label className="field-label" htmlFor="cf-name">Nom <span className="req">*</span></label>
            <input id="cf-name" type="text" name="name" autoComplete="name" required />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="cf-email">Courriel <span className="req">*</span></label>
            <input id="cf-email" type="email" name="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="cf-msg">Ton projet</label>
            <textarea id="cf-msg" name="message" rows="4" placeholder="Ex. : couvreur à Gatineau, je veux plus de soumissions…"></textarea>
            <span className="field-help">Téléphone, secteur, échéancier — tout ce qui aide.</span>
          </div>
          <button type="submit" className="btn btn-accent" style={{ justifyContent: "center" }}>
            Envoyer <span className="arrow">&#8594;</span>
          </button>
        </form>
      </div>
    </section>
  );
};

/* ── Composition des pages ──────────────────────────────── */
const {
  Hero, Manifesto, Specs, MarqueeRow, FoundersSlots, About, FinalCTA,
  Services, CompareAgency, Automation, FAQ, FAQ_WEB, FAQ_IA,
} = window;

const HomePage = () => (
  <React.Fragment>
    <Hero />
    <Manifesto />
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
    <MarqueeRow reverse items={[
      "Cohorte fondateur · 04 places",
      "04 places · printemps 2026",
      "Pas d'agence · pas d'intermédiaire",
      "hello@novio.studio",
    ]} />
    <FoundersSlots />
    <About />
    <FinalCTA />
  </React.Fragment>
);

const SiteWebPage = () => (
  <React.Fragment>
    <PageHeader
      eyebrow="Offre · Sites web"
      title={<>Un site qui <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>fait sonner le téléphone.</em></>}
      sub="Sur mesure, rapide, pensé pour les entrepreneurs de l'Outaouais. Ton prochain client te cherche sur Google — fais en sorte qu'il te trouve, toi, pas ton concurrent."
    />
    <Services />
    <CompareAgency />
    <FAQ items={FAQ_WEB} title="Questions fréquentes — sites web." />
    <FinalCTA />
  </React.Fragment>
);

const AutomationPage = () => (
  <React.Fragment>
    <PageHeader
      eyebrow="Offre · Automatisation IA"
      title={<>Aucun lead ne <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>passe entre les craques.</em></>}
      sub="Un beau site attire les clients. L'automatisation s'assure qu'aucun ne t'échappe. Des outils simples — 250 $/mois, sans frais d'installation — qui répondent, relancent et qualifient à ta place."
    />
    <Automation lead={false} />
    <FAQ items={FAQ_IA} title="Questions fréquentes — automatisation." />
    <FinalCTA />
  </React.Fragment>
);

const ContactPage = () => (
  <React.Fragment>
    <PageHeader
      eyebrow="Parlons-en"
      title="Contact"
      sub="Premier appel de 15 minutes, gratuit. On regarde où tu perds des leads aujourd'hui, et ce qu'on peut récupérer. Pas de jargon, pas de pression."
    />
    <ContactSection />
  </React.Fragment>
);

Object.assign(window, {
  PageHeader, OffersOverview, ContactSection,
  HomePage, SiteWebPage, AutomationPage, ContactPage,
});
