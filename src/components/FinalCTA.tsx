import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GlowCard } from './GlowCard';

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GlowCard customSize glowColor="orange" className="w-full p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
              Chaque jour sans site web <br className="hidden md:block" />
              est un client <span className="text-gradient">chez la concurrence.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Landing page, site vitrine ou refonte — commencez par un devis gratuit. Aucun engagement, réponse dans la journée.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-accent text-white rounded-full font-bold inline-flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 text-lg"
            >
              Obtenir mon devis gratuit <ArrowRight size={20} />
            </motion.a>
          </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
