import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = [
  {
    q: 'Combien coûte un site web à Gatineau ?',
    a: 'Le prix dépend de votre projet. Une landing page performante commence à partir de 999 $, un site vitrine complet à partir de 1 899 $. Je fournis toujours un devis gratuit et détaillé avant de commencer — aucune surprise.',
  },
  {
    q: "Est-ce qu'un site web aide vraiment à avoir plus de clients locaux ?",
    a: "Oui — à condition que le site soit optimisé pour le SEO local. Un site rapide, bien structuré et mentionnant votre région (Gatineau, Outaouais, Ottawa) permet d'apparaître dans les résultats Google quand vos clients cherchent vos services près de chez eux.",
  },
  {
    q: 'Quelle est la différence entre une landing page et un site vitrine ?',
    a: "Une landing page est une page unique centrée sur un seul objectif : convertir un visiteur en prospect (formulaire de contact, appel téléphonique, achat). Un site vitrine est multi-pages et présente l'ensemble de votre entreprise : services, à propos, portfolio, contact.",
  },
  {
    q: 'Vous servez quelles régions ?',
    a: 'Je travaille principalement avec des entreprises à Gatineau, Hull, Aylmer, Ottawa, Kanata et Orléans. Je peux aussi travailler avec des clients partout au Québec et en Ontario — tout se fait en ligne.',
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[0.65rem] font-semibold text-accent uppercase tracking-[0.5em] mb-5 block">
            Questions fréquentes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Tout ce que vous voulez <span className="text-gradient">savoir</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="border border-white/[0.07] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.03] transition-colors duration-200"
              >
                <span className="text-sm md:text-base font-semibold text-white pr-4">{item.q}</span>
                <span className="flex-shrink-0 text-accent">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
