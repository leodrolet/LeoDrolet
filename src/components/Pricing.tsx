import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';

const plans = [
  {
    name: "Landing Page",
    price: "899",
    popular: true,
    features: [
      "Design premium sur mesure",
      "Optimisation mobile complète",
      "Formulaire de contact intégré",
      "Hébergement & mise en ligne",
      "Optimisation de la vitesse",
      "2 révisions incluses",
      "Livraison en 7 jours",
    ],
  },
  {
    name: "Site Vitrine",
    price: "1 499",
    popular: false,
    features: [
      "Tout inclus dans la Landing Page",
      "Jusqu'à 5 pages personnalisées",
      "SEO optimisé par page",
      "Design sur mesure complet",
      "Hébergement & mise en ligne",
      "3 révisions incluses",
      "Support 30 jours inclus",
    ],
  },
  {
    name: "Site Web Complet",
    price: "3 499",
    popular: false,
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
    popular: false,
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`glass rounded-3xl p-10 relative overflow-hidden flex flex-col ${
                plan.popular ? 'border-orange-500/40' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} /> Populaire
                </div>
              )}
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">{plan.name}</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-black text-white whitespace-nowrap">{plan.price}</span>
                  <span className="text-3xl font-bold text-accent">$</span>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 text-gray-300 text-sm"
                    >
                      <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                >
                  Démarrer mon projet <ArrowRight size={18} />
                </motion.a>

                <p className="text-center text-gray-600 text-xs mt-4">
                  Devis personnalisé gratuit · Réponse sous 24h
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
