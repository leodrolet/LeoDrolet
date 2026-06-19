/* ============================================================
   app.jsx — Novio Studio · routeur multi-pages
   La page à rendre est déterminée par l'attribut data-page sur
   #root (défini dans chaque fichier HTML). ScrollProgress, Nav
   et Footer sont communs à toutes les pages.
   ============================================================ */

const {
  ScrollProgress, Nav, Footer,
  HomePage, SiteWebPage, AutomationPage, ContactPage,
} = window;

const PAGES = {
  home: HomePage,
  "site-web": SiteWebPage,
  automatisation: AutomationPage,
  contact: ContactPage,
};

const App = () => {
  const root = document.getElementById("root");
  const key = (root && root.dataset.page) || "home";
  const Page = PAGES[key] || HomePage;
  return (
    <React.Fragment>
      <ScrollProgress />
      <Nav />
      <Page />
      <Footer />
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
