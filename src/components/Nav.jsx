/* ============================================================
   Nav.jsx, En-tête du site (desktop + menu mobile).
   Liens réels vers les pages ; état actif selon l'URL.
   Dépend de : window.ArrowIcon
   ============================================================ */

const { ArrowIcon } = window;

const NAV_LINKS = [
  { href: "/site-web", label: "Sites Web" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

const currentPath = () => {
  const p = (window.location.pathname || "/").replace(/\.html$/, "").replace(/\/+$/, "");
  return p === "" || p === "/index" ? "/" : p;
};

const Brand = () => (
  <a href="/" className="brand" aria-label="Novio Studio, accueil">
    <span className="brand__dot" aria-hidden="true"></span>
    novio<span className="brand__suffix">.studio</span>
  </a>
);

const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef(null);
  const here = currentPath();

  React.useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current && toggleRef.current.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Le menu mobile est rendu hors de <header> : le backdrop-filter de l'en-tête
  // créerait sinon un bloc conteneur pour position: fixed.
  return (
    <React.Fragment>
    <header className="site-header">
      <div className="container site-header__inner">
        <Brand />
        <nav className="site-nav" aria-label="Navigation principale">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={here === l.href ? "page" : undefined}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--primary btn--sm site-header__cta" href="/contact">
          Demander une soumission
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span>
        </button>
      </div>
    </header>

      <div id="menu-mobile" className="mobile-menu" hidden={!open}>
        <nav aria-label="Navigation mobile">
          <ul>
            <li><a href="/" aria-current={here === "/" ? "page" : undefined}>Accueil</a></li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={here === l.href ? "page" : undefined}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--primary btn--lg btn--block" href="/contact">
          Demander une soumission <ArrowIcon />
        </a>
      </div>
    </React.Fragment>
  );
};

window.Nav = Nav;
window.Brand = Brand;
