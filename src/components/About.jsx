/* ============================================================
   About.jsx, Section studio / portrait de Léo
   Dépend de : window.useReveal, window.SectionHead
   ============================================================ */

const { useReveal, SectionHead } = window;

const TAGS = [
  "Sites sur mesure", "Animations fluides", "Chargement ultra-rapide",
  "Design interactif", "Référencement local", "Gestion de contenu simple",
  "Identité visuelle", "Performance mesurée",
];

const About = () => {
  const portraitRef = useReveal();
  const bodyRef = useReveal();
  return (
    <section className="section" id="studio">
      <SectionHead num="04" kicker="Studio" title="Un humain. Pas une agence." right="Gatineau, QC" />
      <div className="about">
        <div className="about-portrait reveal" ref={portraitRef}>
          <div className="caption">
            <span>NOVIO</span>
            <span>2026.05</span>
          </div>
          <picture>
            <source srcSet="assets/leo.webp" type="image/webp" />
            <img src="assets/leo.jpg" alt="Léo Drolet, Novio Studio" loading="lazy" width="600" height="750"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
          </picture>
        </div>
        <div className="about-body reveal" ref={bodyRef}>
          <p>
            Bonjour. Je suis <em>Léo</em>. J'ai monté ce studio à Gatineau pour une raison simple : les contractors de l'Outaouais méritent des sites à la hauteur de leur travail, un plombier, couvreur ou paysagiste avec un bon site reçoit des soumissions pendant qu'il travaille, pas seulement par bouche-à-oreille.
          </p>
          <p>
            Pas un template <em>recyclé.</em> Pas une agence à 50K. Du sur-mesure, livré en quelques semaines, par la personne qui te répond au téléphone.
          </p>
          <div className="small">
            Je conçois. Je construis. Je livre. Et je reste 30 à 60 jours après la mise en ligne pour que tu sois autonome. Tu parles directement avec la personne qui fait le travail, pas un compte d'agence.
          </div>
          <div className="stack">
            {TAGS.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
};

window.About = About;
