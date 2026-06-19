/* ============================================================
   FAQ.jsx — Questions fréquentes (accordéon, réutilisable)
   Dépend de : window.SectionHead
   Exporte : window.FAQ (générique), window.FAQ_WEB, window.FAQ_IA
   ============================================================ */

const { SectionHead } = window;

// ── Questions liées aux sites web ──
const FAQ_WEB = [
  { q: "C'est quoi la différence avec WordPress ou Wix ?",
    a: "Vitesse et contrôle. WordPress/Wix alourdissent les sites avec des dizaines d'extensions qui ralentissent les chargements. Je construis chaque page sur mesure — résultat : un site qui s'ouvre en moins d'une seconde, et qui te ressemble vraiment." },
  { q: "Tu héberges aussi le site ?",
    a: "Oui — hébergement professionnel inclus. Domaine séparé. Ensuite, ~120$/an si tu veux que je continue, ou je te transfère le tout." },
  { q: "Et si j'ai déjà un logo ou une identité visuelle ?",
    a: "Parfait — je travaille avec. Si tu n'en as pas, on peut en créer une minimaliste ensemble dans le cadre du projet, ou je te recommande un graphiste de la région." },
  { q: "Travailles-tu à distance ou en personne ?",
    a: "Les deux. Premier appel en visio ou en personne (café offert à Gatineau ou Ottawa). Travail à distance avec aperçus en direct. Formation finale en personne si tu préfères." },
  { q: "Et si je veux modifier le site après la mise en ligne ?",
    a: "Chaque forfait inclut 1, 2 ou 4 révisions gratuites durant le premier mois. Une révision = un fichier texte listant les changements souhaités. Après le premier mois ou les révisions épuisées : 50 $ par page modifiée, 200 $ pour une nouvelle page. Simple, transparent, sans surprise." },
  { q: "Je suis entrepreneur, pas technicien — est-ce que je vais comprendre comment gérer mon site ?",
    a: "Oui. C'est exactement pourquoi je reste 30 à 60 jours après le lancement. Je te montre comment mettre à jour ton contenu, ajouter des photos de projets, et répondre aux soumissions. Pas de jargon technique — tu apprends ce dont tu as besoin, rien de plus." },
  { q: "Mon téléphone sonne déjà par bouche-à-oreille, pourquoi aurais-je besoin d'un site ?",
    a: "Parce que ton prochain client te cherche sur Google avant même de t'appeler. S'il ne te trouve pas, il appelle ton concurrent. Un site bien fait capte ces leads que tu ne savais même pas que tu perdais." },
];

// ── Questions liées à l'automatisation IA ──
const FAQ_IA = [
  { q: "L'automatisation IA, est-ce que ça remplace mon téléphone ou mon monde ?",
    a: "Non. Ça ne remplace personne — ça fait le travail que personne n'a le temps de faire. Répondre à un appel manqué à 21h, relancer une soumission trois jours plus tard, demander un avis Google après chaque contrat. Toi et ton équipe gardez les vraies conversations; l'automatisation s'occupe de ce qui passerait autrement entre les craques." },
  { q: "Est-ce que ça marche avec mon système actuel (CRM, calendrier) ?",
    a: "Oui, dans la majorité des cas. On branche les automatisations sur tes outils existants — Google Agenda, ton CRM, ta boîte courriel, ton numéro de téléphone. Si tu n'as pas de système, on part simple et on monte au besoin. On valide ce que tu utilises dès le premier appel." },
  { q: "Combien de temps avant que ce soit en place ?",
    a: "Une automatisation simple (appels manqués, avis Google) est souvent active en quelques jours. Un montage plus complet — chatbot + relances + intégrations — prend généralement une à deux semaines. On commence par celle qui te fait gagner le plus, puis on ajoute le reste." },
  { q: "Est-ce que je peux juste prendre une automatisation, pas tout le pack ?",
    a: "Absolument. Chaque automatisation se prend à la carte — 250 $/mois, sans frais d'installation. Tu commences avec celle qui règle ton plus gros irritant, et tu en ajoutes d'autres quand tu vois les résultats. Le Pack Croissance (site + 2 automatisations) est là pour ceux qui veulent tout d'un coup, à prix réduit." },
];

// ── Composant générique ──
const FAQ = ({ items = FAQ_WEB, title = "Questions fréquentes." }) => {
  const [open, setOpen] = React.useState(null);
  return (
    <section className="section" id="faq">
      <SectionHead num="05" kicker="FAQ" title={title} right="&#8593; cliquer pour ouvrir" />
      <div className="faq">
        {items.map((f, i) => (
          <div key={i} className={`faq-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="faq-q">
              <span>{f.q}</span><span className="plus">+</span>
            </div>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.FAQ = FAQ;
window.FAQ_WEB = FAQ_WEB;
window.FAQ_IA = FAQ_IA;
