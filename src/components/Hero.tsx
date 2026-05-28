import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FluidParticlesBackground } from './FluidParticlesBackground';

const Hero = () => {
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  // ── Multi-layer parallax (logique originale préservée) ──
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const section = document.getElementById('home');
    if (!section) return;

    const layers = [
      { ref: h1Ref,       xF: -0.015, yF: -0.010 },
      { ref: subtitleRef, xF: -0.010, yF: -0.007 },
      { ref: ctasRef,     xF: -0.008, yF: -0.005 },
    ];

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
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

  return (
    <div id="home">
      {/* ── Hero principal ── */}
      <FluidParticlesBackground
        particleCount={800}
        noiseIntensity={0.0025}
        particleSize={{ min: 0.4, max: 1.4 }}
        className="min-h-screen pt-20"
      >
        {/* Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-accent/30 pointer-events-none" />

        <div className="flex items-center min-h-screen">
        <div className="container mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-4xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="block w-5 h-px bg-accent" />
              <span className="font-mono text-[11px] text-accent/70 uppercase tracking-[0.35em]">
                Développeur Web · Gatineau, Québec
              </span>
            </motion.div>

            {/* Titre — DM Serif Display */}
            <motion.h1
              ref={h1Ref}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-white mb-8"
            >
              Votre prochain client
              <br />
              à Gatineau vous cherche
              <br />
              en ligne —
              <br />
              <span className="text-gradient">trouvez-le en premier.</span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              ref={subtitleRef}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="text-[#888] text-lg leading-relaxed max-w-lg mb-12"
            >
              Développeur web freelance basé à Gatineau, je crée des sites rapides
              et optimisés pour les PME de l'Outaouais et d'Ottawa — livrés en&nbsp;14&nbsp;jours, garantis.
            </motion.p>

            {/* CTA */}
            <motion.div
              ref={ctasRef}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Obtenir mon devis gratuit
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-[#aaa] text-sm font-medium rounded-lg hover:border-white/25 hover:text-white transition-all"
              >
                Voir les réalisations
              </a>
            </motion.div>

          </div>
        </div>
        </div>
      </FluidParticlesBackground>

      {/* ── Stats strip ── */}
      <section ref={statsRef} className="border-t border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
            {[
              { value: '14 jours', label: 'Délai de livraison', sub: 'Garanti par contrat' },
              { value: '30 jours', label: 'Support inclus',     sub: 'Après la mise en ligne' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="py-9 px-6"
              >
                <div className="font-mono text-[10px] text-[#444] uppercase tracking-[0.2em] mb-2">{s.label}</div>
                <div className="font-display text-3xl text-white mb-1">{s.value}</div>
                <div className="text-xs text-[#555]">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
