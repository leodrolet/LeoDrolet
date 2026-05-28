import React from 'react';
import { motion } from 'framer-motion';
import { Code, Laptop, Smartphone, RefreshCw, Paintbrush, Settings, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import { GlowCard } from './GlowCard';

export const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass p-2">
              <div className="w-full h-full bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="/leo.jpg"
                  alt="Léo Drolet"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Qui suis-je ?
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                Je travaille en solo depuis <span className="text-white">Gatineau</span> — pas d'agence, pas de sous-traitant. Vous avez affaire directement à la personne qui va coder votre site.
              </p>
              <p>
                Je me concentre sur les entrepreneurs et PME de l'<span className="text-white">Outaouais</span> qui ont besoin d'un site professionnel sans se faire facturer des honoraires d'agence. Un projet à la fois, bien fait.
              </p>
              <p>
                Ce qui m'importe : que votre site charge vite, qu'il se retrouve sur Google, et qu'il donne envie de vous appeler. Le reste, c'est du décor.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle size={20} />
                <span>Un projet à la fois</span>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle size={20} />
                <span>Livraison en 14 jours</span>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle size={20} />
                <span>Disponible, pas juste joignable</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Services = () => {
  const services = [
    {
      title: "Sites Web Complets",
      desc: "De 3 à 10 pages selon votre besoin : accueil, services, à propos, contact. Tout conçu et codé sur mesure.",
      icon: <Laptop size={32} />,
    },
    {
      title: "Landing Pages",
      desc: "Une seule page, un seul objectif. Idéal si vous faites de la pub ou que vous voulez juste que les gens vous appellent.",
      icon: <Code size={32} />,
    },
    {
      title: "Design sur mesure",
      desc: "Pas de thème WordPress acheté en ligne. Chaque site est conçu à partir de zéro pour votre marque.",
      icon: <Paintbrush size={32} />,
    },
    {
      title: "Formulaires & intégrations",
      desc: "Formulaires de contact, prise de rendez-vous, intégration carte Google Maps — ce dont vous avez besoin, pas plus.",
      icon: <Settings size={32} />,
    },
    {
      title: "SEO local Gatineau",
      desc: "Votre site apparaît sur Google quand quelqu'un cherche votre service à Gatineau ou Ottawa. C'est l'objectif principal.",
      icon: <TrendingUp size={32} />,
    },
    {
      title: "Sites rapides",
      desc: "Un site lent perd ses visiteurs en 3 secondes. Les miens chargent vite — Google et vos clients vous en remercient.",
      icon: <Zap size={32} />,
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Ce que <span className="text-gradient">je fais</span>
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ce que je construis, selon où vous en êtes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard customSize glowColor="orange" className="w-full p-8 group cursor-pointer">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
