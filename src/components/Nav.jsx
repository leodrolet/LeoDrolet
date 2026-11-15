/* ============================================================
   Nav.jsx, En-tête du site (desktop + menu mobile).
   Liens réels vers les pages ; état actif selon l'URL.
   Dépend de : window.ArrowIcon
   ============================================================ */

const { ArrowIcon } = window;

const NAV = {
  fr: {
    home: "/", homeLabel: "Accueil", brandLabel: "Novio Studio, accueil",
    links: [
      { href: "/site-web", label: "Sites Web" },
      { href: "/tarifs", label: "Tarifs" },
      { href: "/blogue", label: "Blogue" },
      { href: "/contact", label: "Contact" },
    ],
    alt: { href: "/en", label: "EN", full: "English version", lang: "en" },
    cta: "Demander une soumission", ctaHref: "/contact",
    main: "Navigation principale", mobile: "Navigation mobile",
    open: "Ouvrir le menu", close: "Fermer le menu",
  },
  en: {
    home: "/en", homeLabel: "Home", brandLabel: "Novio Studio, home",
    links: [
      { href: "/en#features", label: "Websites" },
      { href: "/en#pricing", label: "Pricing" },
      { href: "/en#contact", label: "Contact" },
    ],
    alt: { href: "/", label: "FR", full: "Version française", lang: "fr" },
    cta: "Get a quote", ctaHref: "/en#contact",
    main: "Main navigation", mobile: "Mobile navigation",
    open: "Open menu", close: "Close menu",
  },
};

const currentPath = () => {
  const p = (window.location.pathname || "/").replace(/\.html$/, "").replace(/\/+$/, "");
  return p === "" || p === "/index" ? "/" : p;
};

// « Blogue » reste actif sur les articles (/blogue/…)
const isCurrent = (here, href) => here === href || (href === "/blogue" && here.indexOf("/blogue/") === 0);

const Brand = ({ lang = "fr" }) => (
  <a href={NAV[lang].home} className="brand" aria-label={NAV[lang].brandLabel}>
    <span className="brand__dot" aria-hidden="true"></span>
    novio<span className="brand__suffix">.studio</span>
  </a>
);

const Nav = ({ lang = "fr" }) => {
  const t = NAV[lang] || NAV.fr;
  const NAV_LINKS = t.links;
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
        <Brand lang={lang} />
        <nav className="site-nav" aria-label={t.main}>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={isCurrent(here, l.href) ? "page" : undefined}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href={t.alt.href} hrefLang={t.alt.lang} lang={t.alt.lang} className="site-nav__lang" aria-label={t.alt.full}>{t.alt.label}</a>
            </li>
          </ul>
        </nav>
        <a className="btn btn--primary btn--sm site-header__cta" href={t.ctaHref}>
          {t.cta}
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? t.close : t.open}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span>
        </button>
      </div>
    </header>

      <div id="menu-mobile" className="mobile-menu" hidden={!open}>
        <nav aria-label={t.mobile}>
          <ul>
            <li><a href={t.home} aria-current={here === t.home ? "page" : undefined}>{t.homeLabel}</a></li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={isCurrent(here, l.href) ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</a>
              </li>
            ))}
            <li><a href={t.alt.href} hrefLang={t.alt.lang} lang={t.alt.lang}>{t.alt.full}</a></li>
          </ul>
        </nav>
        <a className="btn btn--primary btn--lg btn--block" href={t.ctaHref} onClick={() => setOpen(false)}>
          {t.cta} <ArrowIcon />
        </a>
      </div>
    </React.Fragment>
  );
};

window.Nav = Nav;
window.Brand = Brand;
