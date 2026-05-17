import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
      {/* Dynamic Background Elements */}
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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Votre entreprise mérite <br className="hidden md:block" />
            <span className="text-gradient">mieux qu'un simple site web.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Une landing page optimisée n'est pas juste un design : c'est un moteur de croissance qui transforme vos visiteurs en clients fidèles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
            >
              Obtenir ma landing page <ArrowRight size={18} />
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

        {/* Mockup & Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Landing Page Mockup Placeholder */}
          <div className="relative glass p-2 rounded-2xl border-white/10 shadow-2xl overflow-hidden">
            <div className="bg-black/50 rounded-xl overflow-hidden aspect-video relative">
              {/* Simulating a Landing Page Layout */}
              <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center justify-center h-full text-gray-600 font-medium italic">
                [ Aperçu de votre future Landing Page Haute-Conversion ]
              </div>
              {/* Visual Decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-orange-500/10 to-transparent" />
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: <TrendingUp className="text-orange-400" />, label: 'Conversions', value: '+150%', detail: 'Taux de conversion moyen' },
              { icon: <ShieldCheck className="text-orange-400" />, label: 'Crédibilité', value: 'Haut de Gamme', detail: 'Image de marque premium' },
              { icon: <Users className="text-red-400" />, label: 'Clients', value: 'Flux Continu', detail: 'Génération de leads 24/7' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl text-left transition-all"
              >
                <div className="mb-4">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
