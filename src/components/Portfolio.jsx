/* ============================================================
   Portfolio.jsx
     · Realisations  : état réel du portfolio (aucun projet client publié
                       pour l'instant) + 4 places fondateur, une par secteur
     · CompareAgency : tableau Novio Studio vs agence traditionnelle
   Règle : ne jamais présenter de projet, client ou résultat fictif.
   Dépend de : window.SectionHead, window.ArrowIcon
   ============================================================ */

const { SectionHead, ArrowIcon } = window;

// Places fondateur (une par secteur). Remplacer par de vrais projets au fil des livraisons.
const SLOTS = [
  { n: "01", title: "Couvreur ou entreprise de toiture",     sub: "Gatineau, Hull, Aylmer" },
  { n: "02", title: "Plombier ou technicien en CVC",         sub: "Services résidentiels en Outaouais" },
  { n: "03", title: "Paysagiste ou entrepreneur paysagiste", sub: "Gatineau, Ottawa, Cantley" },
  { n: "04", title: "Entrepreneur général ou rénovateur",    sub: "Cuisines, salles de bain, sous-sols" },
];

const Realisations = () => (
  <section className="section" id="realisations" aria-labelledby="realisations-title">
    <div className="container">
      <SectionHead
        id="realisations-title"
        title="Réalisations."
        lead="Le portfolio est en construction. Les quatre premières entreprises accompagnées y seront présentées, une par secteur. Ces places sont encore ouvertes."
      />
      <ul className="slots">
        {SLOTS.map((s) => (
          <li key={s.n}>
            <a className="slot" href="/contact">
              <span className="slot__n" aria-hidden="true">{s.n}</span>
              <span className="slot__body">
                <span className="slot__t">{s.title}</span>
                <span className="slot__s">{s.sub}</span>
              </span>
              <span className="slot__status">Place disponible</span>
              <span className="slot__go" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ── Comparatif (formulations générales, sans chiffres de marché non vérifiés) ──
const COMPARE_ROWS = [
  { feature: "Coût de départ",            agency: "Plusieurs milliers de dollars à l'avance", novio: "200 $ de frais de départ, une seule fois" },
  { feature: "Hébergement et sécurité",   agency: "Souvent facturés en supplément",           novio: "Inclus dans l'abonnement" },
  { feature: "Maintenance et mises à jour", agency: "Facturées à la demande",                 novio: "Incluses, chaque mois" },
  { feature: "Modifications",             agency: "Facturées à l'heure",                      novio: "1 à 2 h incluses chaque mois" },
  { feature: "Interlocuteur",             agency: "Un chargé de compte",                       novio: "La personne qui conçoit votre site" },
];

const CompareAgency = () => (
  <section className="section" aria-labelledby="comparatif-title">
    <div className="container">
      <SectionHead id="comparatif-title" title="Novio Studio ou une agence traditionnelle ?" />
      <table className="cmp">
        <caption className="sr-only">Comparaison entre Novio Studio et une agence traditionnelle</caption>
        <thead>
          <tr>
            <td></td>
            <th scope="col">Agence traditionnelle</th>
            <th scope="col" className="cmp__novio">Novio Studio</th>
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((r) => (
            <tr key={r.feature}>
              <th scope="row">{r.feature}</th>
              <td data-label="Agence traditionnelle">{r.agency}</td>
              <td data-label="Novio Studio" className="cmp__novio">{r.novio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

Object.assign(window, { Realisations, CompareAgency });
