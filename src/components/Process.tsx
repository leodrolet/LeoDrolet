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

        <div className="relative">
          {/* Progress Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-white/10 z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-orange-400 to-red-500"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-6 relative group cursor-pointer transition-all duration-300 hover:border-orange-500/50">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
