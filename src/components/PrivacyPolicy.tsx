import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';

interface Props { open: boolean; onClose: () => void; }

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
      <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
      {title}
    </h2>
    <div className="text-gray-400 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export const PrivacyPolicy = ({ open, onClose }: Props) => {
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
                <Shield size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-white text-lg">Politique de confidentialité</h1>
                <p className="text-xs text-gray-500">Dernière mise à jour : 27 mai 2026</p>
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

              <Section title="Responsable du traitement">
                <p><strong className="text-white">Novio Studio</strong> — Leo Drolet, développeur web freelance</p>
                <p>Gatineau, Québec, Canada</p>
                <p>Email : <a href="mailto:leodrolet07@gmail.com" className="text-accent hover:underline">leodrolet07@gmail.com</a></p>
              </Section>

              <Section title="Données collectées">
                <p>Lors de l'utilisation du formulaire de contact, nous collectons les informations suivantes :</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Nom complet</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Nom de l'entreprise</li>
                  <li>Description du projet</li>
                  <li>Type de projet souhaité</li>
                </ul>
                <p className="mt-3">Aucune autre donnée personnelle n'est collectée automatiquement (pas de Google Analytics, pas de Meta Pixel, pas de trackers tiers).</p>
              </Section>

              <Section title="Finalité et base légale">
                <p><strong className="text-white">Finalité :</strong> Répondre à vos demandes de devis et établir un suivi de votre projet de développement web.</p>
                <p><strong className="text-white">Base légale :</strong> Consentement de l'utilisateur (art. 6(1)(a) du RGPD). En soumettant le formulaire, vous consentez au traitement de vos données aux fins décrites ci-dessus.</p>
              </Section>

              <Section title="Durée de conservation">
                <p>Vos données sont conservées pendant <strong className="text-white">12 mois</strong> à compter de leur collecte, puis supprimées. En cas de relation commerciale établie, les données relatives aux contrats peuvent être conservées jusqu'à <strong className="text-white">5 ans</strong> conformément aux obligations légales comptables.</p>
              </Section>

              <Section title="Sous-traitant — Formspree">
                <p>Le formulaire de contact utilise <strong className="text-white">Formspree Inc.</strong> (États-Unis) comme processeur tiers pour la transmission des données. Formspree est conforme au cadre EU-U.S. Data Privacy Framework.</p>
                <p>Politique de Formspree : <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">formspree.io/legal/privacy-policy</a></p>
              </Section>

              <Section title="Hébergement">
                <p>Le site est hébergé par <strong className="text-white">Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, USA. Vercel peut traiter certaines données techniques (adresses IP) dans le cadre de la diffusion du site.</p>
              </Section>

              <Section title="Cookies">
                <p>Ce site utilise uniquement des <strong className="text-white">cookies techniques essentiels</strong> nécessaires au fonctionnement du formulaire (session temporaire). Aucun cookie publicitaire ou analytique n'est utilisé.</p>
              </Section>

              <Section title="Vos droits (RGPD / Loi 25 Québec)">
                <p>Conformément au RGPD et à la Loi 25 du Québec, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li><strong className="text-gray-300">Accès</strong> — consulter les données vous concernant</li>
                  <li><strong className="text-gray-300">Rectification</strong> — corriger vos données</li>
                  <li><strong className="text-gray-300">Suppression</strong> — demander l'effacement de vos données</li>
                  <li><strong className="text-gray-300">Portabilité</strong> — recevoir vos données dans un format structuré</li>
                  <li><strong className="text-gray-300">Opposition</strong> — vous opposer au traitement</li>
                  <li><strong className="text-gray-300">Retrait du consentement</strong> — à tout moment, sans effet rétroactif</li>
                </ul>
                <p className="mt-3">Pour exercer ces droits, contactez-nous à : <a href="mailto:leodrolet07@gmail.com" className="text-accent hover:underline">leodrolet07@gmail.com</a></p>
                <p>Délai de réponse : <strong className="text-white">30 jours</strong>.</p>
              </Section>

              <Section title="Modifications">
                <p>Cette politique peut être mise à jour pour refléter des changements légaux ou techniques. La date de « Dernière mise à jour » en haut de ce document sera modifiée en conséquence.</p>
              </Section>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicy;
