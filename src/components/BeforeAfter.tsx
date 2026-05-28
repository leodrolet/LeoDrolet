import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const BeforeAfter = () => {
  const comparisons = [
    {
      before: "Site vitrine classique",
      after: "Landing Page Optimisée",
      pointsBefore: [
        "Trop d'informations dispersées",
        "Navigation confuse",
        "Appels à l'action invisibles",
        "Design daté et générique"
      ],
      pointsAfter: [
        "Message clair et percutant",
        "Parcours utilisateur linéaire",
        "CTA stratégiques et visibles",
        "Design premium et moderne"
      ]
    }
  ];

  return (
    <section id="comparison" className="py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            L'impact d'une <span className="text-gradient">Optimisation</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            La différence entre un visiteur qui repart et un qui vous contacte tient souvent à ça.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* BEFORE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4">
              <XCircle className="text-red-500/50" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-gray-500 uppercase tracking-widest text-center">SANS LANDING PAGE</h3>
            <div className="space-y-4">
              {comparisons[0].pointsBefore.map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-500 p-3 rounded-xl bg-white/5">
                  <XCircle size={16} className="text-red-500/50" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-zinc-800/50 text-center border border-white/5">
              <p className="text-sm text-gray-500 italic">"C'est quoi exactement ce qu'ils font ?"</p>
            </div>
          </motion.div>

          {/* AFTER CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl glass relative overflow-hidden group border-orange-500/20"
          >
            <div className="absolute top-0 right-0 p-4">
              <CheckCircle2 className="text-orange-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-white uppercase tracking-widest text-center">AVEC OPTIMISATION</h3>
            <div className="space-y-4">
              {comparisons[0].pointsAfter.map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 group-hover:bg-orange-500/10 transition-colors">
                  <CheckCircle2 size={16} className="text-orange-400" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-orange-500/10 text-center border border-orange-500/20">
              <p className="text-sm text-orange-300 italic">"OK, je vais les appeler."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
