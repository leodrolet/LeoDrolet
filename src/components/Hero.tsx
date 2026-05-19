import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 rounded-full glass text-xs font-medium text-orange-400 mb-6 inline-block">
            L'art de la conversion
          </span>

          <div className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            NOVIO<span className="text-gradient">STUDIO</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Votre entreprise mérite <br className="hidden md:block" />
            <span className="text-gradient">une présence digitale d'élite.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-4 leading-relaxed">
            Que ce soit une landing page haute conversion ou un site web complet, je crée des expériences digitales qui transforment vos visiteurs en clients fidèles.
          </p>

          {/* Pricing & delivery friction reducer */}
          <div className="flex items-center justify-center gap-6 mb-10 text-sm">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              À partir de <span className="text-white font-bold ml-1">899 $</span>
            </span>
            <span className="text-gray-700">|</span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock size={13} className="text-orange-400" />
              Livraison en <span className="text-white font-bold ml-1">14 jours</span>
            </span>
            <span className="text-gray-700">|</span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              Devis <span className="text-white font-bold ml-1">gratuit</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
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
