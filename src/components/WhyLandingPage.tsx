import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Rocket } from 'lucide-react';

const WhyLandingPage = () => {
  const reasons = [
    {
      icon: <Target className="text-indigo-400" />,
      title: 'Plus de clients',
      description: 'Une structure optimisée pour capturer l\'attention et transformer chaque visiteur en prospect qualifié.'
    },
    {
      icon: <Zap className="text-blue-400" />,
      title: 'Image de marque premium',
      description: 'Un design haut de gamme qui inspire confiance instantanément et positionne votre entreprise comme leader.'
    },
    {
      icon: <TrendingUp className="text-cyan-400" />,
      title: 'Plus de rendez-vous',
      description: 'Réduisez la friction : un chemin clair et direct vers la prise de contact ou la réservation.'
    },
    {
      icon: <Rocket className="text-purple-400" />,
      title: 'Marketing efficace',
      description: 'Maximisez vos campagnes pubs (Facebook, Google Ads) avec une page dédiée dont le seul but est la conversion.'
    },
  ];

  return (
    <section id="why" className="py-24 relative bg-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Pourquoi une <span className="text-gradient">Landing Page ?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed"
          >
            Contrairement à un site web classique qui peut perdre le visiteur dans un labyrinthe de pages, une landing page est un instrument de précision.
            Elle est conçue pour une seule chose : <span className="text-white font-medium">la conversion</span>.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl text-left transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 glass p-8 md:p-12 rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Le secret de la conversion</h3>
            <p className="text-gray-400 leading-relaxed">
              En éliminant les distractions et en guidant l'utilisateur vers un appel à l'action unique et puissant,
              nous augmentons drastiquement les chances qu'un visiteur devienne client. C'est la différence
              entre "avoir un site" et "avoir un business qui génère des revenus".
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50">
              KPI
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLandingPage;
