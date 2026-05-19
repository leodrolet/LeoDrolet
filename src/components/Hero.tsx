import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <span className="px-4 py-1.5 rounded-full glass text-xs font-medium text-orange-400 mb-5 inline-block tracking-widest uppercase">
            L'art de la conversion
          </span>

          {/* Brand — eyebrow size, not competing with h1 */}
          <p className="text-sm font-bold tracking-[0.25em] text-white/50 uppercase mb-5">
            NOVIO STUDIO
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] max-w-4xl">
            Votre entreprise mérite{' '}
            <span className="text-gradient">une présence digitale d'élite.</span>
          </h1>

          {/* Subline */}
          <p className="max-w-xl mx-auto text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
            Que ce soit une landing page haute conversion ou un site web complet, je crée des expériences digitales qui transforment vos visiteurs en clients fidèles.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-sm">
            <span className="flex items-center gap-2 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              À partir de <span className="text-white font-semibold ml-1">899 $</span>
            </span>
            <span className="hidden md:block text-gray-700">|</span>
            <span className="flex items-center gap-2 text-gray-400">
              <Clock size={13} className="text-orange-400 flex-shrink-0" />
              Livraison en <span className="text-white font-semibold ml-1">14 jours</span>
            </span>
            <span className="hidden md:block text-gray-700">|</span>
            <span className="flex items-center gap-2 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              Devis <span className="text-white font-semibold ml-1">gratuit</span>
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
            >
              Obtenir mon site en 14 jours <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#why"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              En savoir plus
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
