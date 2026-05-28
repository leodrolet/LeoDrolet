import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'novio_cookies_accepted';

interface Props {
  onOpenPrivacy: () => void;
}

export const CookieBanner = ({ onOpenPrivacy }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl px-5 py-4 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Cookie size={16} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium mb-1">Cookies techniques uniquement</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Ce site utilise uniquement des cookies essentiels au fonctionnement du formulaire de contact. Aucun suivi publicitaire ni analytique.{' '}
                <button
                  onClick={onOpenPrivacy}
                  className="text-accent hover:underline"
                >
                  En savoir plus
                </button>
              </p>
            </div>
            <button
              onClick={accept}
              className="flex-shrink-0 px-4 py-2 bg-accent hover:bg-accent/90 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
