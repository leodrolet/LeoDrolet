/* ============================================================
   Footer.jsx — Pied de page + modales légales + FinalCTA
   Dépend de : window.useReveal, window.useMagnetic
   ============================================================ */

const { useReveal, useMagnetic } = window;

// ── CTA final avant le footer (personnalisable par page) ──
const FinalCTA = ({
  headline = (<>Prochain contractor dans la galerie — <em>toi.</em></>),
  ctaLabel = "Démarrer mon projet",
  ctaHref = "https://calendly.com/leo_drolet-noviostudio/conception-site-web",
} = {}) => {
  const ref = useReveal();
  const ctaMagnetic = useMagnetic(10);
  const external = !ctaHref.startsWith("/");
  return (
    <section className="final-cta" id="cta-final">
      <div className="reveal" ref={ref}>
        <div className="huge">{headline}</div>
        <div className="actions">
          <a
            className="btn btn-accent"
            href={ctaHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            ref={ctaMagnetic.ref}
            onMouseMove={ctaMagnetic.onMouseMove}
            onMouseLeave={ctaMagnetic.onMouseLeave}
            style={ctaMagnetic.style}
          >
            {ctaLabel} <span className="arrow">&#8594;</span>
          </a>
          <a className="btn" href="mailto:leo_drolet@noviostudio.online">leo_drolet@noviostudio.online</a>
        </div>
        <div className="small">Premier appel · 15 min · gratuit · on parle chiffres, pas jargon</div>
      </div>
    </section>
  );
};

// ── Modale générique (confidentialité / mentions) ──
const LegalModal = ({ open, onClose, title, children }) => {
  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,.82)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
    >
      <div style={{ background:"var(--bg-2)", border:"1px solid var(--line-strong)", borderRadius:16, width:"100%", maxWidth:640, maxHeight:"85vh", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"24px 28px", borderBottom:"1px solid var(--line)" }}>
          <span style={{ fontFamily:"var(--display)", fontSize:22, fontWeight:400, letterSpacing:"-.01em" }}>{title}</span>
          <button onClick={onClose} style={{ fontFamily:"var(--mono)", fontSize:18, color:"var(--ink-2)", background:"none", border:"none", cursor:"pointer", lineHeight:1 }}>&#10005;</button>
        </div>
        <div style={{ overflowY:"auto", padding:"28px", fontSize:14, lineHeight:1.65, color:"var(--ink-2)" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalSection = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:".16em", textTransform:"uppercase", color:"var(--accent)", marginBottom:10 }}>{title}</div>
    <div>{children}</div>
  </div>
);

// ── Footer principal ──
const Footer = () => {
  const [modal, setModal] = React.useState(null); // "privacy" | "mentions" | null

  return (
    <>
      <footer className="footer">
        <div>
          <div className="brand-big">novio<em>.studio</em></div>
          <div className="mono" style={{ fontSize:10, color:"var(--mute)", marginTop:12, letterSpacing:".14em", textTransform:"uppercase" }}>
            © 2026 · Gatineau, Québec
          </div>
        </div>
        <div>
          <h6>Navigation</h6>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/site-web">Sites Web</a></li>
            <li><a href="/automatisation">Automatisation IA</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h6>Légal</h6>
          <ul>
            <li><a href="mailto:leo_drolet@noviostudio.online">leo_drolet@noviostudio.online</a></li>
            <li><button onClick={() => setModal("privacy")} style={{ background:"none", border:"none", padding:0, color:"inherit", font:"inherit", cursor:"pointer", textAlign:"left" }}>Politique de confidentialité</button></li>
            <li><button onClick={() => setModal("mentions")} style={{ background:"none", border:"none", padding:0, color:"inherit", font:"inherit", cursor:"pointer", textAlign:"left" }}>Mentions légales</button></li>
          </ul>
        </div>
        <div>
          <h6>Contact</h6>
          <ul>
            <li><a href="mailto:leo_drolet@noviostudio.online">Email</a></li>
            <li><a href="tel:+18736554684">1 873 655 4684</a></li>
          </ul>
        </div>
      </footer>

      <div className="footer-bot">
        <span>© 2026 Novio Studio</span>
        <span className="mono" style={{ letterSpacing:".14em" }}>Secteurs · Toiture · HVAC · Plomberie · Paysagement · Rénovation · Entrepreneur général · Gatineau · Hull · Aylmer · Ottawa · Outaouais</span>
        <span>v1.0 · cohorte fondateur</span>
      </div>

      <LegalModal open={modal === "privacy"} onClose={() => setModal(null)} title="Politique de confidentialité">
        <p style={{margin:"0 0 20px", fontSize:12, color:"var(--mute)"}}>Dernière mise à jour : 8 juin 2026</p>
        <p style={{margin:"0 0 24px"}}>Novio Studio (« nous ») s'engage à protéger la vie privée des visiteurs de ce site.</p>
        <ModalSection title="1. Informations collectées">
          <p style={{margin:0}}>Nous collectons uniquement les informations que vous nous fournissez volontairement via le formulaire de contact : nom, adresse courriel, et message.</p>
        </ModalSection>
        <ModalSection title="2. Utilisation des informations">
          <p style={{margin:"0 0 8px"}}>Ces informations sont utilisées uniquement pour répondre à vos demandes.</p>
          <p style={{margin:0}}>Nous ne vendons, ne louons et ne partageons pas vos données avec des tiers.</p>
        </ModalSection>
        <ModalSection title="3. Hébergement">
          <p style={{margin:0}}>Ce site est hébergé sur <strong style={{color:"var(--ink)"}}>Vercel Inc.</strong> (340 Pine Street, San Francisco, CA 94104, USA). Les données transmises via le formulaire de contact transitent par les serveurs de Vercel.</p>
        </ModalSection>
        <ModalSection title="4. Analyse d'audience — Cloudflare Web Analytics">
          <p style={{margin:"0 0 8px"}}>Ce site utilise <strong style={{color:"var(--ink)"}}>Cloudflare Web Analytics</strong> pour mesurer l'audience de façon agrégée (nombre de pages vues, visiteurs uniques, pays d'origine, type d'appareil, pages les plus consultées).</p>
          <p style={{margin:"0 0 8px"}}>Cloudflare Web Analytics est conçu dans le respect de la vie privée :</p>
          <ul style={{margin:"0 0 8px", paddingLeft:18}}>
            <li>Aucun cookie n'est déposé sur votre appareil.</li>
            <li>Aucune empreinte numérique (fingerprinting) n'est utilisée.</li>
            <li>Aucun suivi inter-sites n'est effectué.</li>
            <li>Les données collectées sont anonymes et agrégées — aucune information personnelle n'est associée à votre visite.</li>
          </ul>
          <p style={{margin:0}}>Pour en savoir plus : <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)"}}>politique de confidentialité de Cloudflare</a>.</p>
        </ModalSection>
        <ModalSection title="5. Cookies">
          <p style={{margin:0}}>Ce site n'utilise aucun cookie publicitaire ni cookie de traçage. Aucun bandeau de consentement aux cookies n'est requis.</p>
        </ModalSection>
        <ModalSection title="6. Vos droits (Loi 25 — Québec)">
          <p style={{margin:"0 0 10px"}}>Conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25), vous avez le droit d'accéder à vos données, de les corriger ou d'en demander la suppression en nous contactant à :</p>
          <p style={{margin:0}}><a href="mailto:info@noviostudio.ca" style={{color:"var(--accent)"}}>info@noviostudio.ca</a></p>
        </ModalSection>
        <ModalSection title="7. Contact">
          <p style={{margin:0}}>Pour toute question : <a href="mailto:info@noviostudio.ca" style={{color:"var(--accent)"}}>info@noviostudio.ca</a></p>
        </ModalSection>
      </LegalModal>

      <LegalModal open={modal === "mentions"} onClose={() => setModal(null)} title="Mentions légales">
        <ModalSection title="Éditeur du site">
          <p style={{margin:"0 0 4px"}}><strong style={{color:"var(--ink)"}}>Novio Studio</strong> — travailleur autonome</p>
          <p style={{margin:"0 0 4px"}}>Représentant : Leo Drolet</p>
          <p style={{margin:"0 0 4px"}}>Gatineau, Québec, Canada</p>
          <p style={{margin:"0 0 4px"}}>Email : <a href="mailto:leo_drolet@noviostudio.online" style={{color:"var(--accent)"}}>leo_drolet@noviostudio.online</a></p>
          <p style={{margin:0}}>Activité : Développement web freelance</p>
        </ModalSection>
        <ModalSection title="Hébergeur">
          <p style={{margin:"0 0 4px"}}><strong style={{color:"var(--ink)"}}>Vercel Inc.</strong></p>
          <p style={{margin:"0 0 4px"}}>340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
          <p style={{margin:0}}><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)"}}>vercel.com</a></p>
        </ModalSection>
        <ModalSection title="Analyse d'audience">
          <p style={{margin:"0 0 4px"}}><strong style={{color:"var(--ink)"}}>Cloudflare, Inc.</strong></p>
          <p style={{margin:"0 0 4px"}}>101 Townsend St, San Francisco, CA 94107, USA</p>
          <p style={{margin:"0 0 4px"}}>Service utilisé : Cloudflare Web Analytics (sans cookies, sans traçage)</p>
          <p style={{margin:0}}><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)"}}>cloudflare.com/privacypolicy</a></p>
        </ModalSection>
        <ModalSection title="Propriété intellectuelle">
          <p style={{margin:0}}>L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de Novio Studio. Toute reproduction sans autorisation écrite préalable est interdite.</p>
        </ModalSection>
        <ModalSection title="Responsabilité">
          <p style={{margin:0}}>Novio Studio s'efforce d'assurer l'exactitude des informations publiées. L'utilisation de ces informations se fait sous la responsabilité exclusive du visiteur.</p>
        </ModalSection>
        <ModalSection title="Données personnelles">
          <p style={{margin:0}}>Le traitement des données est décrit dans notre Politique de confidentialité. Conformément à la Loi 25 du Québec et au RGPD, vous disposez de droits d'accès, rectification, suppression et portabilité.</p>
        </ModalSection>
      </LegalModal>
    </>
  );
};

window.FinalCTA = FinalCTA;
window.Footer = Footer;
