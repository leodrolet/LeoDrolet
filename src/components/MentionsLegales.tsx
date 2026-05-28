import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface Props { open: boolean; onClose: () => void; }

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b border-white/5 last:border-0">
    <span className="text-gray-500 text-xs uppercase tracking-wider w-40 flex-shrink-0 mb-1 sm:mb-0 sm:pt-0.5">{label}</span>
    <span className="text-gray-300 text-sm">{value}</span>
  </div>
);

export const MentionsLegales = ({ open, onClose }: Props) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-[#111] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-6 border-b border-white/10 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                <FileText size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-white text-lg">Mentions légales</h1>
                <p className="text-xs text-gray-500">Conformément à la Loi 25 du Québec</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8">

              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
                  Éditeur du site
                </h2>
                <div className="bg-white/[0.03] rounded-2xl border border-white/5 px-4 divide-y divide-white/5">
                  <Row label="Dénomination" value={<><strong className="text-white">Novio Studio</strong> — travailleur autonome</>} />
                  <Row label="Représentant" value="Leo Drolet" />
                  <Row label="Adresse" value="Gatineau, Québec, Canada" />
                  <Row label="Email" value={<a href="mailto:leodrolet07@gmail.com" className="text-accent hover:underline">leodrolet07@gmail.com</a>} />
                  <Row label="Activité" value="Développement web freelance" />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
                  Hébergeur
                </h2>
                <div className="bg-white/[0.03] rounded-2xl border border-white/5 px-4 divide-y divide-white/5">
                  <Row label="Société" value={<strong className="text-white">Vercel Inc.</strong>} />
                  <Row label="Adresse" value="340 Pine Street, Suite 701, San Francisco, CA 94104, USA" />
                  <Row label="Site web" value={<a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a>} />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
                  Propriété intellectuelle
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de Novio Studio, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
                  Responsabilité
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Novio Studio s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité de ces informations. L'utilisation des informations et contenus disponibles sur ce site se fait sous la responsabilité exclusive du visiteur.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
                  Données personnelles
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Le traitement des données personnelles collectées via ce site est décrit dans notre{' '}
                  <span className="text-accent">Politique de confidentialité</span>.
                  Conformément à la Loi 25 du Québec et au RGPD, vous disposez de droits d'accès, rectification, suppression et portabilité de vos données.
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentionsLegales;
