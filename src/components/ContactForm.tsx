import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, CheckCircle2, X } from 'lucide-react';

const TOAST_DURATION = 6000;

const SuccessToast = ({ onClose }: { onClose: () => void }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / TOAST_DURATION) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 30);

    const timer = setTimeout(onClose, TOAST_DURATION);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -80, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-start gap-4 p-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle2 size={22} className="text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">Demande envoyée !</p>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            Je l'analyse et vous recontacte sous 24h avec une proposition personnalisée.
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-green-400 transition-all ease-linear"
          style={{ width: `${progress}%`, transitionDuration: '30ms' }}
        />
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xykvgwnz', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez vérifier votre internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {submitted && <SuccessToast onClose={() => setSubmitted(false)} />}
      </AnimatePresence>
    <section id="contact" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Démarrons Votre Projet</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Remplissez le formulaire ci-dessous pour obtenir un devis précis et une stratégie adaptée à votre entreprise.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Nom */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Nom Complet</label>
              <input
                required
                name="full_name"
                type="text"
                placeholder="Jean Dupont"
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Professionnel</label>
              <input
                required
                name="email"
                type="email"
                placeholder="jean@entreprise.com"
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all"
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Numéro de Téléphone</label>
              <input
                required
                name="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all"
              />
            </div>

            {/* Entreprise */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Nom de l'entreprise</label>
              <input
                required
                name="company"
                type="text"
                placeholder="Ma Super Boutique"
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all"
              />
            </div>

            {/* Type de site */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Type de site souhaité</label>
              <select
                name="site_type"
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all appearance-none"
              >
                <option>Site Vitrine</option>
                <option>E-commerce</option>
                <option>Refonte Complète</option>
                <option>Landing Page</option>
                <option>Autre</option>
              </select>
            </div>

            {/* Délai */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Délai souhaité</label>
              <select
                name="deadline"
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all appearance-none"
              >
                <option>Urgent (&lt; 2 semaines)</option>
                <option>Standard (1 mois)</option>
                <option>Flexible (2 mois +)</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Description du projet</label>
              <textarea
                required
                name="description"
                rows={4}
                placeholder="Décrivez vos objectifs, vos fonctionnalités souhaitées et vos inspirations..."
                className="w-full px-4 py-3 rounded-xl bg-primary border border-white/10 text-white focus:border-accent outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Documents / Cahier des charges (Optionnel)</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer bg-primary hover:bg-secondary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="text-gray-400 mb-2" size={24} />
                    <p className="text-sm text-gray-400 font-medium">Cliquez pour uploader ou glissez-déposez</p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="md:col-span-2 mt-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500 text-red-200 text-sm text-center font-medium"
                >
                  {error}
                </motion.div>
              )}
              <motion.button
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-accent text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]'
                }`}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer la demande'} <Send size={18} />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactForm;
