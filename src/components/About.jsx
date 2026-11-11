/* ============================================================
   About.jsx, Le studio : portrait et présentation de Léo
   Dépend de : window.SectionHead
   ============================================================ */

const { SectionHead } = window;

const About = () => (
  <section className="section" id="studio" aria-labelledby="studio-title">
    <div className="container about">
      <picture className="about__portrait">
        <source srcSet="assets/leo.webp" type="image/webp" />
        <img src="assets/leo.jpg" alt="Léo Drolet, fondateur de Novio Studio" loading="lazy" decoding="async" width="600" height="750" />
      </picture>
      <div className="about__body">
        <SectionHead id="studio-title" title="Un humain, pas une agence." />
        <p>
          Je m'appelle Léo Drolet. J'ai fondé Novio Studio à Gatineau pour offrir aux entreprises de
          l'Outaouais des sites à la hauteur de leur travail, sans le coût d'une agence.
        </p>
        <p>
          Je conçois, je construis et j'entretiens chaque site moi-même. Vous parlez directement à la
          personne qui fait le travail, du premier appel jusqu'aux modifications de chaque mois.
        </p>
        <a className="link link--arrow" href="/contact">Parlons de votre projet</a>
      </div>
    </div>
  </section>
);

window.About = About;
