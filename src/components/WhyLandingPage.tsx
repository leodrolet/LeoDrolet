import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Rocket } from 'lucide-react';
import { GlowCard } from './GlowCard';

const WhyLandingPage = () => {
  const reasons = [
    {
      icon: <Target className="text-orange-400" />,
      title: "Plus d'appels entrants",
      description: "Un seul message, un seul bouton. Le visiteur comprend ce que vous faites et comment vous contacter en moins de 5 secondes."
    },
    {
      icon: <Zap className="text-orange-400" />,
      title: "Une bonne première impression",
      description: "Un site qui a l'air professionnel dit à votre client qu'il peut vous faire confiance avant même que vous parliez."
    },
    {
      icon: <TrendingUp className="text-red-400" />,
      title: "Moins de friction",
      description: "Pas de menu à 8 items, pas de 3 clics pour trouver votre numéro. Le chemin vers le contact est direct."
    },
    {
      icon: <Rocket className="text-orange-400" />,
      title: "Pub qui rentabilise",
      description: "Si vous investissez en Google ou Facebook Ads, vous avez besoin d'une page qui ne gaspille pas vos clics."
    },
  ];

  return (
    <section id="why" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
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
            Un site classique essaie de tout montrer. Une landing page choisit une seule chose à dire — et elle le dit bien.
            La différence se mesure en nombre de <span className="text-white font-medium">contacts reçus par mois</span>.
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
            >
              <GlowCard customSize glowColor="orange" className="w-full p-8 text-left group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <GlowCard customSize glowColor="orange" className="w-full p-8 md:p-12">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              La majorité des sites de PME perdent leurs visiteurs parce qu'il y a trop d'information, trop de clics,
              et pas assez de raisons claires de rester. Une landing page bien faite, c'est simplement un site{' '}
              <span className="text-white font-medium">où le visiteur ne se perd pas</span> — il voit ce que vous faites,
              pourquoi vous, et comment vous contacter.
            </p>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLandingPage;
