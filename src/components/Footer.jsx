/* ============================================================
   Footer.jsx, CTA final + pied de page + fenêtres légales
   Dépend de : window.ArrowIcon, window.Brand
   ============================================================ */

const { ArrowIcon, Brand } = window;

const EMAIL = "leo_drolet@noviostudio.online";
const TEL = "+18736554684";
const TEL_DISPLAY = "873 655-4684";

// ── CTA final avant le pied de page (personnalisable par page) ──
const FinalCTA = ({
  title = "Parlons de votre site.",
  sub = "Premier appel de 15 minutes, gratuit et sans engagement. Réponse en moins de 24 h.",
} = {}) => (
  <section className="cta-final" aria-labelledby="cta-final-title">
    <div className="container cta-final__inner">
      <div>
        <h2 className="cta-final__title" id="cta-final-title">{title}</h2>
        <p className="cta-final__sub">{sub}</p>
      </div>
      <div className="cta-final__actions">
        <a className="btn btn--primary btn--lg" href="/contact">Demander une soumission <ArrowIcon /></a>
        <a className="btn btn--secondary btn--lg" href={`tel:${TEL}`}>Appeler le {TEL_DISPLAY}</a>
      </div>
    </div>
  </section>
);

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
const Footer = () => {
  const [modal, setModal] = React.useState(null); // "privacy" | "mentions" | null
  const close = React.useCallback(() => setModal(null), []);

  return (
    <>
      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__brand">
            <Brand />
            <p>Sites Web professionnels par abonnement, à Gatineau et en Outaouais.</p>
          </div>
          <nav aria-label="Pied de page">
            <h2 className="site-footer__h">Navigation</h2>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/site-web">Sites Web</a></li>
              <li><a href="/tarifs">Tarifs</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="site-footer__h">Contact</h2>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`tel:${TEL}`}>{TEL_DISPLAY}</a></li>
              <li>Gatineau, Québec</li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">Légal</h2>
            <ul>
              <li><button type="button" className="site-footer__btn" onClick={() => setModal("privacy")}>Politique de confidentialité</button></li>
              <li><button type="button" className="site-footer__btn" onClick={() => setModal("mentions")}>Mentions légales</button></li>
            </ul>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <span>© 2026 Novio Studio</span>
          <span>Gatineau, Hull, Aylmer, Ottawa et l'Outaouais</span>
        </div>
      </footer>

      <LegalModal open={modal === "privacy"} onClose={close} title="Politique de confidentialité">
        <p className="legal__date">Dernière mise à jour : 8 juin 2026</p>
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
        <ModalSection title="4. Analyse d'audience, Cloudflare Web Analytics">
          <p>Ce site utilise <strong>Cloudflare Web Analytics</strong> pour mesurer l'audience de façon agrégée (nombre de pages vues, visiteurs uniques, pays d'origine, type d'appareil, pages les plus consultées).</p>
          <p>Cloudflare Web Analytics est conçu dans le respect de la vie privée :</p>
          <ul>
            <li>Aucun cookie n'est déposé sur votre appareil.</li>
            <li>Aucune empreinte numérique (fingerprinting) n'est utilisée.</li>
            <li>Aucun suivi inter-sites n'est effectué.</li>
            <li>Les données collectées sont anonymes et agrégées, aucune information personnelle n'est associée à votre visite.</li>
          </ul>
          <p>Pour en savoir plus : <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="link">politique de confidentialité de Cloudflare</a>.</p>
        </ModalSection>
        <ModalSection title="5. Cookies">
          <p>Ce site n'utilise aucun cookie publicitaire ni cookie de traçage. Aucun bandeau de consentement aux cookies n'est requis.</p>
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
        <ModalSection title="Analyse d'audience">
          <p><strong>Cloudflare, Inc.</strong></p>
          <p>101 Townsend St, San Francisco, CA 94107, USA</p>
          <p>Service utilisé : Cloudflare Web Analytics (sans cookies, sans traçage)</p>
          <p><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="link">cloudflare.com/privacypolicy</a></p>
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
window.Footer = Footer;
