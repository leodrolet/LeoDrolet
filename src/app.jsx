/* ============================================================
   app.jsx — Novio Studio · routeur multi-pages
   La page est déterminée par data-page sur #root. Le HTML de chaque
   page est PRÉ-RENDU au build (build.js → react-dom/server) puis
   « hydraté » ici : le contenu est lisible par Google et s'affiche
   avant le chargement du JavaScript.

   Pages « statiques » (blogue, articles, /en) : leur contenu principal
   est un fragment HTML généré au build (content/). Côté client, on
   relit ce fragment dans le DOM avant l'hydratation, pour que React
   retrouve exactement le même HTML (aucun écart d'hydratation).
   ============================================================ */

const {
  Nav, Footer, HomePage, SiteWebPage, PricingPage, ContactPage,
  StaticPage, ConsentBanner, installTracking,
} = window;

const PAGES = {
  home: HomePage,
  "site-web": SiteWebPage,
  tarifs: PricingPage,
  contact: ContactPage,
};

const App = ({ page = "home", lang = "fr", staticHtml = null, staticAfter = "cta" }) => {
  const Page = PAGES[page];
  return (
    <React.Fragment>
      <Nav lang={lang} />
      <main id="contenu" tabIndex="-1">
        {Page ? <Page /> : <StaticPage html={staticHtml} after={staticAfter} lang={lang} />}
      </main>
      <Footer lang={lang} />
      <ConsentBanner lang={lang} />
    </React.Fragment>
  );
};

window.App = App;

// ── Démarrage côté navigateur (ignoré pendant le pré-rendu Node) ──
if (typeof document !== "undefined" && document.getElementById("root")) {
  const root = document.getElementById("root");
  const body = root.querySelector("[data-static-body]");
  const props = {
    page: root.dataset.page || "home",
    lang: root.dataset.lang || "fr",
    staticHtml: body ? body.innerHTML : null,
    staticAfter: root.dataset.after || "cta",
  };
  if (root.firstElementChild) ReactDOM.hydrateRoot(root, <App {...props} />);
  else ReactDOM.createRoot(root).render(<App {...props} />);
  installTracking();
}
