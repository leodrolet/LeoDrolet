import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const included = [
    "Design premium sur mesure",
    "Optimisation mobile complète",
    "Formulaire de contact intégré",
    "Hébergement & mise en ligne",
    "Optimisation de la vitesse",
    "Révisions incluses",
  ];

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto glass rounded-3xl p-10 border-orange-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Landing Page Professionnelle</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-gray-500 text-lg">à partir de</span>
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-black text-white">1 200</span>
              <span className="text-3xl font-bold text-accent">$</span>
            </div>

            <ul className="space-y-3 mb-10">
              {included.map((item, i) => (
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
      </div>
    </section>
  );
};

export default Pricing;
