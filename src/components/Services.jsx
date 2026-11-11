/* ============================================================
   Services.jsx, En-tête de section partagé.
   Titre + texte d'introduction optionnel, aligné à gauche.
   ============================================================ */

const SectionHead = ({ id, title, lead, children }) => (
  <div className="shead">
    <h2 className="shead__title" id={id}>{title}</h2>
    {lead && <p className="shead__lead">{lead}</p>}
    {children}
  </div>
);

window.SectionHead = SectionHead;
