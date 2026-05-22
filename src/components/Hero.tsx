import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { GlowCard } from './GlowCard';
import { FallingPattern } from './ui/falling-pattern';
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const Hero = () => {
  const blobsRef  = useRef<HTMLDivElement>(null);
  const h1Ref     = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef   = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Falling pattern background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FallingPattern
            color="rgba(249, 115, 22, 0.55)"
            backgroundColor="#000000"
            duration={120}
            blurIntensity="1.5px"
            density={1}
            className="[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,black_100%)]"
          />
        </div>

        {/* Background blobs — fastest layer, follows cursor */}
        <div ref={blobsRef} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* H1 — mid-speed, opposite */}
            <h1
              ref={h1Ref}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
            >
              Votre prochain client vous cherche <br className="hidden md:block" />
              en ligne — <span className="text-gradient">assurez-vous qu'il vous trouve.</span>
            </h1>

            {/* Subtitle — slowest text layer */}
            <p
              ref={subtitleRef}
              className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed"
            >
              Je crée des sites web rapides, modernes et optimisés pour attirer des clients locaux et transformer vos visiteurs en appels, réservations et ventes.
            </p>

            {/* CTAs — very slight opposite movement */}
            <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
              >
                Lancer mon projet <ArrowRight size={18} />
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

      {/* ── Stats — below the fold, animates on scroll ── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <TrendingUp className="text-orange-400" />,
                label: 'Délai de livraison',
                value: '14 jours',
                detail: 'Garanti par contrat',
              },
              {
                icon: <ShieldCheck className="text-orange-400" />,
                label: 'Révisions incluses',
                value: 'Satisfaction garantie',
                detail: "Jusqu'à la version finale",
              },
              {
                icon: <Users className="text-orange-400" />,
                label: 'Après livraison',
                value: 'Support inclus',
                detail: "30 jours d'accompagnement",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GlowCard customSize glowColor="orange" className="w-full p-6 text-left">
                  <div className="mb-4">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.detail}</div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
