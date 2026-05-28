import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const Hero = () => {
  const blobsRef    = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // Multi-layer parallax
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const section = document.getElementById('home');
    if (!section) return;

    const layers = [
      { ref: blobsRef,    xF:  0.030, yF:  0.025 },
      { ref: h1Ref,       xF: -0.015, yF: -0.010 },
      { ref: subtitleRef, xF: -0.010, yF: -0.007 },
      { ref: ctasRef,     xF: -0.008, yF: -0.005 },
    ];

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        layers.forEach(({ ref, xF, yF }) => {
          const el = ref.current;
          if (!el) return;
          el.style.willChange = 'transform';
          el.style.transition = 'transform 0.1s linear';
          el.style.transform = `translate(${dx * xF}px, ${dy * yF}px)`;
        });
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      layers.forEach(({ ref }) => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = 'transform 0.4s ease';
        el.style.transform = 'translate(0, 0)';
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Animated counter — fires on scroll into view
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="home">
      {/* ── Main hero — full viewport ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
        {/* Background */}
        <div ref={blobsRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-orange-500/6 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              ref={h1Ref}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
            >
              <span className="block text-sm md:text-base font-normal text-accent tracking-[0.3em] uppercase mb-5">
                Développeur Web · Gatineau, Québec
              </span>
              Votre prochain client à Gatineau <br className="hidden md:block" />
              vous cherche en ligne — <span className="text-gradient">trouvez-le en premier.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed"
            >
              Développeur web freelance basé à Gatineau, je crée des sites rapides et optimisés pour les PME de l'Outaouais et d'Ottawa — livrés en&nbsp;14&nbsp;jours, garantis.
            </p>

            <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
              >
                Obtenir mon devis gratuit <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                Voir les réalisations
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats — below the fold ── */}
      <section className="border-t border-white/5">
        <div ref={statsRef} className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/5 max-w-3xl mx-auto">
            {[
              { icon: <TrendingUp size={16} className="text-accent" />, value: '14 jours', label: 'Délai de livraison', detail: 'Garanti par contrat' },
              { icon: <ShieldCheck size={16} className="text-accent" />, value: 'Satisfaction garantie', label: 'Révisions incluses', detail: "Jusqu'à la version finale" },
              { icon: <Users size={16} className="text-accent" />, value: 'Support inclus', label: 'Après livraison', detail: "30 jours d'accompagnement" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="flex-1 px-6 py-8 sm:py-10"
              >
                <div className="flex items-center gap-2 mb-3">{stat.icon}<span className="text-[10px] uppercase tracking-[0.15em] text-gray-600">{stat.label}</span></div>
                <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
