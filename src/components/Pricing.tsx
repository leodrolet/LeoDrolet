import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';

const hero = {
  name: "Landing Page",
  price: "899",
  features: [
    "Design premium sur mesure",
    "Optimisation mobile complète",
    "Formulaire de contact intégré",
    "Hébergement & mise en ligne",
    "Optimisation de la vitesse",
    "2 révisions incluses",
    "Livraison en 7 jours",
  ],
};

const others = [
  {
    name: "Site Vitrine",
    price: "1 499",
    features: [
      "Tout inclus dans la Landing Page",
      "Jusqu'à 5 pages personnalisées",
      "SEO optimisé par page",
      "Design sur mesure complet",
      "3 révisions incluses",
      "Support 30 jours inclus",
    ],
  },
  {
    name: "Site Web Complet",
    price: "3 499",
    features: [
      "Tout inclus dans le Site Vitrine",
      "Architecture d'information avancée",
      "Blog ou portfolio intégré",
      "Intégration formulaire, calendrier ou carte",
      "SEO avancé multi-pages",
      "Panel admin pour modifier le contenu",
      "Support prioritaire 60 jours inclus",
    ],
  },
  {
    name: "Refonte Complète",
    price: "2 999",
    features: [
      "Audit complet de l'existant",
      "Migration de tout le contenu",
      "Nouveau design from scratch",
      "Optimisation des performances (Core Web Vitals)",
      "SEO optimisé par page",
      "Formation & documentation incluse",
      "Support 30 jours inclus",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Investissement <span className="text-gradient">transparent</span>
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Pas de surprise. Un prix clair pour un résultat premium.
          </p>
        </div>

        {/* ── Hero plan — Landing Page ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden border-orange-500/30">
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-5 right-5 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Star size={11} fill="currentColor" /> Produit phare
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">
              {/* Left — price */}
              <div className="md:w-56 flex-shrink-0">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">{hero.name}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-7xl font-black text-white">{hero.price}</span>
                  <span className="text-4xl font-bold text-accent">$</span>
                </div>
                <p className="text-gray-500 text-xs">À partir de · Devis gratuit</p>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 w-full py-4 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25"
                >
                  Démarrer mon projet <ArrowRight size={18} />
                </motion.a>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px self-stretch bg-white/10" />
              <div className="md:hidden h-px bg-white/10" />

              {/* Right — features */}
              <ul className="grid sm:grid-cols-2 gap-3 flex-1">
                {hero.features.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Other plans ── */}
        <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">
          Besoin de plus ?
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {others.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl p-8 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-black text-white whitespace-nowrap">{plan.price}</span>
                  <span className="text-xl font-bold text-accent">$</span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-400 text-xs">
                      <CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 border border-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-all text-sm"
                >
                  En savoir plus <ArrowRight size={15} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
