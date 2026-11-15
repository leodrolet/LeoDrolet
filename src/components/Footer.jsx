/* ============================================================
   Footer.jsx, CTA final + pied de page + fenêtres légales
   Dépend de : window.ArrowIcon, window.Brand
   ============================================================ */

const { ArrowIcon, Brand } = window;

const EMAIL = "leo_drolet@noviostudio.online";
const TEL = "+18736554684";
const TEL_DISPLAY = "873 655-4684";

// ── CTA final avant le pied de page (personnalisable par page) ──
const CTA_TXT = {
  fr: { title: "Parlons de votre site.", sub: "Premier appel de 15 minutes, gratuit et sans engagement. Réponse en moins de 24 h.", btn: "Demander une soumission", href: "/contact", call: "Appeler le" },
  en: { title: "Let's talk about your website.", sub: "A free 15-minute first call, no commitment. Reply within 24 hours.", btn: "Get a quote", href: "/en#contact", call: "Call" },
};

const FinalCTA = ({ lang = "fr", title, sub } = {}) => {
  const c = CTA_TXT[lang] || CTA_TXT.fr;
  return (
  <section className="cta-final" aria-labelledby="cta-final-title">
    <div className="container cta-final__inner">
      <div>
        <h2 className="cta-final__title" id="cta-final-title">{title || c.title}</h2>
        <p className="cta-final__sub">{sub || c.sub}</p>
      </div>
      <div className="cta-final__actions">
        <a className="btn btn--primary btn--lg" href={c.href}>{c.btn} <ArrowIcon /></a>
        <a className="btn btn--secondary btn--lg" href={`tel:${TEL}`}>{c.call} {TEL_DISPLAY}</a>
      </div>
    </div>
  </section>
  );
};

// ── Fenêtre de dialogue (confidentialité / mentions) ──
const LegalModal = ({ open, onClose, title, children }) => {
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    document.body.classList.add("menu-open");
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      prev && prev.focus && prev.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  const titleId = "legal-" + title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className="legal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="legal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="legal__head">
          <h2 className="legal__title" id={titleId}>{title}</h2>
          <button ref={closeRef} type="button" className="legal__close" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>
        <div className="legal__body">{children}</div>
      </div>
    </div>
  );
};

const ModalSection = ({ title, children }) => (
  <section className="legal__section">
    <h3 className="legal__h">{title}</h3>
    <div>{children}</div>
  </section>
);

// ── Pied de page ──
const FOOT_TXT = {
  fr: {
    pitch: "Création de sites Web professionnels par abonnement, à Gatineau et en Outaouais.",
    navH: "Navigation", nav: [["/", "Accueil"], ["/site-web", "Sites Web"], ["/tarifs", "Tarifs"], ["/blogue", "Blogue"], ["/contact", "Contact"]],
    alt: ["/en", "English", "en"],
    contactH: "Contact", city: "Gatineau, Québec", legalH: "Légal",
    privacy: "Politique de confidentialité", mentions: "Mentions légales", consent: "Mesure d'audience",
    area: "Gatineau, Hull, Aylmer, Ottawa et l'Outaouais", footLabel: "Pied de page",
  },
  en: {
    pitch: "Professional small business websites on a monthly plan, in Ottawa, Gatineau and the Outaouais.",
    navH: "Navigation", nav: [["/en", "Home"], ["/en#pricing", "Pricing"], ["/en#contact", "Contact"]],
    alt: ["/", "Français", "fr"],
    contactH: "Contact", city: "Gatineau, Quebec", legalH: "Legal",
    privacy: "Privacy policy (French)", mentions: "Legal notice (French)", consent: "Analytics preferences",
    area: "Ottawa, Gatineau and the Outaouais", footLabel: "Footer",
  },
};

const Footer = ({ lang = "fr" }) => {
  const t = FOOT_TXT[lang] || FOOT_TXT.fr;
  const [modal, setModal] = React.useState(null); // "privacy" | "mentions" | null
  const close = React.useCallback(() => setModal(null), []);
  // Le lien « Mesure d'audience » n'apparaît que si GA4 est configuré (après montage : pas d'écart d'hydratation)
  const [hasGA, setHasGA] = React.useState(false);
  React.useEffect(() => { setHasGA(!!(window.gaConfigured && window.gaConfigured())); }, []);

  return (
    <>
      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__brand">
            <Brand lang={lang} />
            <p>{t.pitch}</p>
          </div>
          <nav aria-label={t.footLabel}>
            <h2 className="site-footer__h">{t.navH}</h2>
            <ul>
              {t.nav.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
              <li><a href={t.alt[0]} hrefLang={t.alt[2]} lang={t.alt[2]}>{t.alt[1]}</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="site-footer__h">{t.contactH}</h2>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`tel:${TEL}`}>{TEL_DISPLAY}</a></li>
              <li>{t.city}</li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">{t.legalH}</h2>
            <ul>
              <li><button type="button" className="site-footer__btn" onClick={() => setModal("privacy")}>{t.privacy}</button></li>
              <li><button type="button" className="site-footer__btn" onClick={() => setModal("mentions")}>{t.mentions}</button></li>
              {hasGA && <li><button type="button" className="site-footer__btn" onClick={() => window.openConsent()}>{t.consent}</button></li>}
            </ul>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <span>© 2026 Novio Studio</span>
          <span>{t.area}</span>
        </div>
      </footer>

      <LegalModal open={modal === "privacy"} onClose={close} title="Politique de confidentialité">
        <p className="legal__date">Dernière mise à jour : 15 novembre 2026</p>
        <p>Novio Studio (« nous ») s'engage à protéger la vie privée des visiteurs de ce site.</p>
        <ModalSection title="1. Informations collectées">
          <p>Nous collectons uniquement les informations que vous nous fournissez volontairement via le formulaire de contact (ou par courriel) : nom, courriel, téléphone et message. Le formulaire est traité par Formspree.</p>
        </ModalSection>
        <ModalSection title="2. Utilisation des informations">
          <p>Ces informations sont utilisées uniquement pour répondre à vos demandes.</p>
          <p>Nous ne vendons, ne louons et ne partageons pas vos données avec des tiers.</p>
        </ModalSection>
        <ModalSection title="3. Hébergement">
          <p>Ce site est hébergé sur <strong>Vercel Inc.</strong> (340 Pine Street, San Francisco, CA 94104, USA). Les données transmises via le formulaire de contact transitent par les serveurs de Vercel.</p>
        </ModalSection>
        <ModalSection title="4. Mesure d'audience, Google Analytics (avec votre accord)">
          <p>Si, et seulement si, vous l'acceptez dans le bandeau prévu à cet effet, ce site utilise <strong>Google Analytics 4</strong> (Google LLC) pour mesurer sa fréquentation : pages consultées, provenance des visites (moteur de recherche, lien, accès direct), type d'appareil, région approximative, et quelques actions sur le site (clic sur « Demander une soumission », sur le téléphone ou le courriel, envoi du formulaire).</p>
          <ul>
            <li>Rien n'est chargé ni déposé sur votre appareil tant que vous n'avez pas accepté.</li>
            <li>Aucun renseignement saisi dans le formulaire (nom, courriel, téléphone, message) n'est transmis à Google Analytics.</li>
            <li>Les fonctions publicitaires et les signaux Google sont désactivés : aucune publicité ni profilage publicitaire.</li>
            <li>Vous pouvez retirer votre consentement en tout temps avec le lien « Mesure d'audience » du pied de page ; les témoins de mesure sont alors effacés.</li>
          </ul>
          <p>Les données peuvent être traitées à l'extérieur du Québec. Pour en savoir plus : <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer" className="link">règles de confidentialité de Google</a>.</p>
        </ModalSection>
        <ModalSection title="5. Témoins (cookies)">
          <p>Ce site n'utilise aucun témoin publicitaire. Les seuls témoins possibles sont ceux de Google Analytics (_ga, _ga_*), déposés uniquement après votre accord. Votre choix est mémorisé dans le stockage local de votre navigateur.</p>
        </ModalSection>
        <ModalSection title="6. Vos droits (Loi 25, Québec)">
          <p>Conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25), vous avez le droit d'accéder à vos données, de les corriger ou d'en demander la suppression en nous contactant à :</p>
          <p><a href="mailto:leo_drolet@noviostudio.online" className="link">leo_drolet@noviostudio.online</a></p>
        </ModalSection>
        <ModalSection title="7. Contact">
          <p>Pour toute question : <a href="mailto:leo_drolet@noviostudio.online" className="link">leo_drolet@noviostudio.online</a></p>
        </ModalSection>
      </LegalModal>

      <LegalModal open={modal === "mentions"} onClose={close} title="Mentions légales">
        <ModalSection title="Éditeur du site">
          <p><strong>Novio Studio</strong>, travailleur autonome</p>
          <p>Représentant : Leo Drolet</p>
          <p>Gatineau, Québec, Canada</p>
          <p>Email : <a href="mailto:leo_drolet@noviostudio.online" className="link">leo_drolet@noviostudio.online</a></p>
          <p>Activité : Développement web freelance</p>
        </ModalSection>
        <ModalSection title="Hébergeur">
          <p><strong>Vercel Inc.</strong></p>
          <p>340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
          <p><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="link">vercel.com</a></p>
        </ModalSection>
        <ModalSection title="Mesure d'audience">
          <p><strong>Google LLC</strong>, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
          <p>Service utilisé : Google Analytics 4, uniquement avec le consentement du visiteur.</p>
        </ModalSection>
        <ModalSection title="Propriété intellectuelle">
          <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de Novio Studio. Toute reproduction sans autorisation écrite préalable est interdite.</p>
        </ModalSection>
        <ModalSection title="Responsabilité">
          <p>Novio Studio s'efforce d'assurer l'exactitude des informations publiées. L'utilisation de ces informations se fait sous la responsabilité exclusive du visiteur.</p>
        </ModalSection>
        <ModalSection title="Données personnelles">
          <p>Le traitement des données est décrit dans notre Politique de confidentialité. Conformément à la Loi 25 du Québec et au RGPD, vous disposez de droits d'accès, rectification, suppression et portabilité.</p>
        </ModalSection>
      </LegalModal>
    </>
  );
};

window.FinalCTA = FinalCTA;
window.CTA_TXT = CTA_TXT;
window.Footer = Footer;
