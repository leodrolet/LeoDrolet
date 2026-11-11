/* ============================================================
   Services.jsx, En-tête de section partagé (Portfolio, About, FAQ).
   Les forfaits vivent désormais dans Pricing.jsx (window.Pricing).
   Dépend de : window.useReveal
   ============================================================ */

const { useReveal } = window;

// ── En-tête de section centré ──
const SectionHead = ({ title }) => {
  const ref = useReveal();
  return (
    <div className="section-head reveal" ref={ref}>
      <h2 className="section-title">{title}</h2>
    </div>
  );
};

window.SectionHead = SectionHead;
