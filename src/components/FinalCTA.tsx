import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden border-orange-500/20"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
              Chaque jour sans site web <br className="hidden md:block" />
              est un client <span className="text-gradient">chez la concurrence.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Que vous ayez besoin d'une landing page, d'un site vitrine ou d'une refonte complète — passons ensemble à l'étape supérieure.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-accent text-white rounded-full font-bold inline-flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 text-lg"
            >
              Commencer maintenant <ArrowRight size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
