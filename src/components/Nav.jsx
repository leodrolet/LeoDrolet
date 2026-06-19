/* ============================================================
   Nav.jsx — Barre de navigation (desktop + menu mobile)
   Dépend de : window.useClock, window.useMagnetic
   ============================================================ */

const { useClock, useMagnetic } = window;

const Nav = () => {
  const [pastHero, setPastHero] = React.useState(false);
  React.useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const clock = useClock();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = () => setMenuOpen(false);
  const navCtaMagnetic = useMagnetic(8);

  return (
    <React.Fragment>
      <nav className={`nav ${pastHero ? "scrolled" : ""}`} style={{ opacity: "1" }}>
        <a href="#top" className="brand">
          <span className="dot"></span>
          novio<span style={{ fontStyle: "italic", color: "var(--ink-2)" }}>.studio</span>
        </a>
        <div className="nav-links">
          <a href="#devis">Forfaits</a>
          <a href="#travaux">Travaux</a>
          <a href="#studio">Studio</a>
          <a href="#automatisation">Automatisation&nbsp;IA</a>
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
            href="#devis"
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
          <a href="#devis" onClick={close}>Forfaits</a>
          <a href="#travaux" onClick={close}>Travaux</a>
          <a href="#studio" onClick={close}>Studio</a>
          <a href="#automatisation" onClick={close}>Automatisation IA</a>
          <a href="#devis" className="mobile-menu-cta" onClick={close}>Démarrer &#8594;</a>
        </div>
      )}
    </React.Fragment>
  );
};

window.Nav = Nav;
