import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

// Bundled directly into the JS — no server file needed on any host
import studioOneHtml from '../../public/previews/studio-one.html?raw';
import salonGatineauHtml from '../../public/previews/salon-gatineau/index.html?raw';

interface Project {
  num: string;
  title: string;
  type: string;
  desc: string;
  srcdoc?: string;        // inline HTML (no server needed)
  src?: string;           // URL fallback for built React apps
  accentColor: string;
  bgFrom: string;
  bgTo: string;
}

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Studio One',
    type: 'Studio musical',
    desc: "Site vitrine premium pour un studio d'enregistrement professionnel à Gatineau.",
    srcdoc: studioOneHtml,
    accentColor: '#818cf8',
    bgFrom: '#0d0f1a',
    bgTo: '#111827',
  },
  {
    num: '02',
    title: 'Salon Gatineau',
    type: 'Salon esthétique',
    desc: "Expérience de luxe pour un salon d'esthétique haut de gamme. Design épuré et élégant.",
    srcdoc: salonGatineauHtml,
    accentColor: '#d4a853',
    bgFrom: '#110e08',
    bgTo: '#1a1409',
  },
  {
    num: '03',
    title: 'Garage Gatineau',
    type: 'Garage automobile',
    desc: 'Site moderne pour un garage automobile avec présentation des services.',
    src: '/previews/garage-gatineau/index.html',
    accentColor: '#f97316',
    bgFrom: '#0f0d0b',
    bgTo: '#1a1208',
  },
];

export const Portfolio = () => {
  const [active, setActive] = useState<Project | null>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function open(proj: Project) {
    setIframeReady(false);
    setActive(proj);
    document.body.style.overflow = 'hidden';
  }

  function close() {
    setActive(null);
    document.body.style.overflow = '';
  }

  return (
    <>
      {/* ── SECTION ─────────────────────────────────────────── */}
      <section id="portfolio" className="py-32 bg-primary relative overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[0.65rem] font-semibold text-accent uppercase tracking-[0.5em] mb-5 block">
              Réalisations
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Entrez dans{' '}
              <span className="text-gradient">l'expérience</span>
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
              Trois projets réels. Cliquez sur une carte pour naviguer dans le site complet.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                onClick={() => open(proj)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Visual panel */}
                <div
                  className="h-48 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${proj.bgFrom} 0%, ${proj.bgTo} 100%)` }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 60%, ${proj.accentColor}18 0%, transparent 70%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span
                      className="text-[7rem] font-black leading-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]"
                      style={{ color: proj.accentColor }}
                    >
                      {proj.num}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[2px]">
                    <div
                      className="flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.3em] uppercase px-5 py-2.5 rounded-full border backdrop-blur-md"
                      style={{
                        borderColor: `${proj.accentColor}60`,
                        color: proj.accentColor,
                        background: `${proj.accentColor}12`,
                      }}
                    >
                      <span>Entrer</span>
                      <ArrowUpRight size={11} />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 bg-secondary/70 backdrop-blur-sm">
                  <span
                    className="text-[0.58rem] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: proj.accentColor }}
                  >
                    {proj.type}
                  </span>
                  <h3 className="text-lg font-bold mt-1.5 mb-2 text-white">{proj.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IFRAME MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9000] flex flex-col"
            style={{ background: '#000' }}
          >
            {/* Top bar */}
            <div className="h-11 flex items-center justify-between px-5 bg-zinc-950 border-b border-white/[0.08] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: active.accentColor }} />
                <span className="text-[0.6rem] font-semibold tracking-[0.35em] uppercase text-gray-300">
                  {active.title}
                </span>
              </div>
              <button
                onClick={close}
                className="flex items-center gap-2 text-[0.58rem] tracking-[0.25em] uppercase text-gray-600 hover:text-white transition-colors duration-200 group"
              >
                <span>Fermer</span>
                <X size={13} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Loading bar */}
            {!iframeReady && (
              <div className="h-[2px] bg-zinc-900 flex-shrink-0 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: active.accentColor }}
                  initial={{ width: '0%' }}
                  animate={{ width: '90%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            )}

            {/* iframe — srcdoc for standalone HTML, src for built apps */}
            <iframe
              ref={iframeRef}
              key={active.title}
              {...(active.srcdoc
                ? { srcdoc: active.srcdoc }
                : { src: active.src }
              )}
              title={active.title}
              className="flex-1 w-full border-none bg-white"
              onLoad={() => setIframeReady(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
