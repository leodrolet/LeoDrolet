/* ============================================================
   Hero.jsx, Hero de l'accueil : proposition de valeur + 2 actions,
   et une maquette (ordinateur + mobile) construite en HTML/CSS.
   La maquette est une démonstration, pas un projet client : elle
   est légendée comme telle et masquée des lecteurs d'écran.
   Dépend de : window.ArrowIcon
   ============================================================ */

const { ArrowIcon } = window;

// Contenu fictif de la maquette (entreprise « Exemple », clairement générique)
const DemoSite = ({ mobile = false }) => (
  <div className={`demo${mobile ? " demo--mobile" : ""}`}>
    <div className="demo__nav">
      <span className="demo__logo">Rénovations <strong>Exemple</strong></span>
      {!mobile && (
        <span className="demo__links"><span>Services</span><span>Réalisations</span><span>À propos</span></span>
      )}
      <span className="demo__btn">{mobile ? "Menu" : "Soumission"}</span>
    </div>
    <div className="demo__hero">
      <div className="demo__copy">
        <span className="demo__kicker">Gatineau · Outaouais</span>
        <span className="demo__h">Rénovation résidentielle, faite avec soin.</span>
        <span className="demo__p">Cuisines, salles de bain et sous-sols. Soumission gratuite.</span>
        <span className="demo__cta">Demander une soumission</span>
      </div>
      <div className="demo__media"><span></span></div>
    </div>
    <div className="demo__cards">
      <span><strong>Cuisines</strong><em>Conception et réalisation</em></span>
      <span><strong>Salles de bain</strong><em>Rénovation complète</em></span>
      {!mobile && <span><strong>Sous-sols</strong><em>Aménagement</em></span>}
    </div>
  </div>
);

const DeviceMockup = () => (
  <figure className="devices">
    <div className="devices__stage" aria-hidden="true">
      <div className="device-desktop">
        <div className="device-desktop__bar">
          <span className="device-desktop__dots"><i></i><i></i><i></i></span>
          <span className="device-desktop__url">renovations-exemple.ca</span>
        </div>
        <DemoSite />
      </div>
      <div className="device-phone">
        <DemoSite mobile />
      </div>
    </div>
    <figcaption className="devices__caption">Maquette de démonstration, version ordinateur et mobile</figcaption>
  </figure>
);

const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="container hero__grid">
      <div className="hero__copy">
        <h1 className="hero__title" id="hero-title">
          Un site Web professionnel, <span className="hero__title-accent">par abonnement.</span>
        </h1>
        <p className="hero__lead">
          Novio Studio conçoit, héberge et entretient le site de votre entreprise, à Gatineau et en
          Outaouais. Un prix mensuel fixe dès 129 $, modifications incluses.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg" href="/contact">
            Demander une soumission <ArrowIcon />
          </a>
          <a className="btn btn--secondary btn--lg" href="#forfaits">Voir les forfaits</a>
        </div>
      </div>
      <DeviceMockup />
    </div>
  </section>
);

window.Hero = Hero;
window.DeviceMockup = DeviceMockup;
