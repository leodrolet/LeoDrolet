/* ============================================================
   app.jsx — Novio Studio · routeur multi-pages
   La page à rendre est déterminée par l'attribut data-page sur
   #root (défini dans chaque fichier HTML). Nav et Footer sont
   communs à toutes les pages.
   ============================================================ */

const { Nav, Footer, HomePage, SiteWebPage, PricingPage, ContactPage } = window;

const PAGES = {
  home: HomePage,
  "site-web": SiteWebPage,
  tarifs: PricingPage,
  contact: ContactPage,
};

const App = () => {
  const root = document.getElementById("root");
  const key = (root && root.dataset.page) || "home";
  const Page = PAGES[key] || HomePage;
  return (
    <React.Fragment>
      <Nav />
      <main id="contenu" tabIndex="-1">
        <Page />
      </main>
      <Footer />
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
