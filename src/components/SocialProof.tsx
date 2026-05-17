import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Marc Lefebvre",
      role: "Gérant de Garage Pro",
      content: "Léo a transformé mon vieux site en une véritable machine à clients. Depuis le lancement de ma landing page, j'ai vu mes prises de rendez-vous augmenter de 40% en un mois.",
      rating: 5
    },
    {
      name: "Sophie Morel",
      role: "Consultante RH",
      content: "Le design est simplement bluffant. On sent tout de suite le côté premium. Mes clients me disent souvent que mon site reflète parfaitement mon professionnalisme.",
      rating: 5
    },
    {
      name: "Julien Dupont",
      role: "Fondateur de TechStart",
      content: "Vitesse, clarté et efficacité. Léo a compris exactement mes besoins et a livré une page qui convertit mieux que tout ce que j'avais essayé auparavant.",
      rating: 5
    }
  ];

  return (
    <section id="proof" className="py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Ils nous font <span className="text-gradient">confiance</span>
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ne nous croyez pas sur parole, écoutez ceux qui ont déjà transformé leur business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-6 text-indigo-500/20" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, starIdx) => (
                  <Star key={starIdx} size={16} className="fill-indigo-400 text-indigo-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic leading-relaxed relative z-10">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500" />
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges / Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { label: 'Projets Livrés', value: '20+' },
            { label: 'Taux de Conversion', value: '↑ 40%' },
            { label: 'Clients Satisfaits', value: '100%' },
            { label: 'Vitesse Moyenne', value: '0.8s' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
