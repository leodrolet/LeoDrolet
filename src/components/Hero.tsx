import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // Parallax on mousemove
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const section = document.getElementById('home');
    if (!section) return;

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (h1Ref.current) {
          h1Ref.current.style.willChange = 'transform';
          h1Ref.current.style.transition = 'transform 0.1s linear';
          h1Ref.current.style.transform = `translate(${-dx * 0.015}px, ${-dy * 0.015}px)`;
        }
        if (blobsRef.current) {
          blobsRef.current.style.willChange = 'transform';
          blobsRef.current.style.transition = 'transform 0.1s linear';
          blobsRef.current.style.transform = `translate(${dx * 0.025}px, ${dy * 0.025}px)`;
        }
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      if (h1Ref.current) {
        h1Ref.current.style.transition = 'transform 0.4s ease';
        h1Ref.current.style.transform = 'translate(0, 0)';
      }
      if (blobsRef.current) {
        blobsRef.current.style.transition = 'transform 0.4s ease';
        blobsRef.current.style.transform = 'translate(0, 0)';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Animated counter for +150%
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;
        const target = 150;

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(easeOutCubic(progress) * target));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
      <div ref={blobsRef} className="absolute inset-0 z-0">
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

          <h1
            ref={h1Ref}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
          >
            Votre entreprise mérite <br className="hidden md:block" />
            <span className="text-gradient">une présence digitale d'élite.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Que ce soit une landing page haute conversion ou un site web complet, je crée des expériences digitales qui transforment vos visiteurs en clients fidèles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            {/* btn-magnetic wrapper — outer div translates, inner motion.a scales */}
            <div className="btn-magnetic inline-block">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/20"
              >
                Lancer mon projet <ArrowRight size={18} />
              </motion.a>
            </div>
            <div className="btn-magnetic inline-block">
              <motion.a
                href="#why"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                En savoir plus
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <TrendingUp className="text-orange-400" />,
                label: 'Conversions',
                value: <span>+{count}%</span>,
                detail: 'Taux de conversion moyen',
              },
              {
                icon: <ShieldCheck className="text-orange-400" />,
                label: 'Crédibilité',
                value: 'Haut de Gamme',
                detail: 'Image de marque premium',
              },
              {
                icon: <Users className="text-red-400" />,
                label: 'Clients',
                value: 'Flux Continu',
                detail: 'Génération de leads 24/7',
              },
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
