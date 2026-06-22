/* ============================================================
   Nav.jsx, Barre de navigation multi-pages (desktop + mobile)
   Liens réels vers les pages du site. État actif selon l'URL.
   Dépend de : window.useMagnetic
   ============================================================ */

const { useMagnetic } = window;

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/site-web", label: "Sites Web" },
  { href: "/automatisation", label: "Automatisation IA" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

const currentPath = () => {
  const p = (window.location.pathname || "/").replace(/\.html$/, "").replace(/\/+$/, "");
  return p === "" ? "/" : p;
};

const Nav = () => {
  // Barre opaque dès qu'on a dépassé le hero, ou d'emblée sur les pages sans hero.
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) { setScrolled(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = () => setMenuOpen(false);
  const navCtaMagnetic = useMagnetic(8);
  const here = currentPath();

  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} style={{ opacity: "1" }}>
        <a href="/" className="brand">
          <span className="dot"></span>
          novio<span style={{ fontStyle: "italic", color: "var(--ink-2)" }}>.studio</span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} aria-current={here === l.href ? "page" : undefined}
               style={here === l.href ? { color: "var(--ink)" } : undefined}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button
            className={`nav-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
          <a
            className="btn nav-cta"
            href="/contact"
            ref={navCtaMagnetic.ref}
            onMouseMove={navCtaMagnetic.onMouseMove}
            onMouseLeave={navCtaMagnetic.onMouseLeave}
            style={{ padding: "10px 16px", ...navCtaMagnetic.style }}
          >
            Démarrer <span className="arrow">&#8594;</span>
          </a>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={close} aria-label="Fermer">&#215;</button>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}
               aria-current={here === l.href ? "page" : undefined}>
              {l.label}
            </a>
          ))}
          <a href="/contact" className="mobile-menu-cta" onClick={close}>Démarrer &#8594;</a>
        </div>
      )}
    </React.Fragment>
  );
};

window.Nav = Nav;
