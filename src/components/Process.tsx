import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      title: "Analyse du besoin",
      desc: "On discute de vos objectifs, de votre cible et de vos concurrents pour définir la meilleure stratégie de conversion.",
      icon: <Search className="text-orange-400" />,
      step: "01"
    },
    {
      title: "Création du design",
      desc: "Je conçois une interface premium et minimaliste, optimisée pour l'expérience utilisateur et l'impact visuel.",
      icon: <PenTool className="text-orange-400" />,
      step: "02"
    },
    {
      title: "Mise en ligne",
      desc: "Développement rapide, tests de performance et déploiement. Votre machine à leads est prête à capturer des clients.",
      icon: <Rocket className="text-red-400" />,
      step: "03"
    }
  ];

  return (
    <section id="process" className="py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Comment ça <span className="text-gradient">fonctionne ?</span>
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Un processus simple, transparent et efficace pour passer de l'idée au résultat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              <div className="text-[6rem] font-black leading-none text-white/[0.04] select-none mb-4 -ml-1">
                {step.step}
              </div>
              <div className="mb-4 text-accent">{step.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-6 w-3 h-px bg-accent/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
