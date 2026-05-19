import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, X, ChevronDown, Clock, Shield, Zap, MessageSquare } from 'lucide-react';

const TOAST_DURATION = 5000;

// ── Validation ──────────────────────────────────────────────────────────────
const rules: Record<string, (v: string) => string> = {
  full_name:   v => v.trim().length < 2      ? 'Veuillez entrer votre nom complet.' : '',
  email:       v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Adresse email invalide.',
  phone:       v => v.replace(/\D/g, '').length < 8 ? 'Numéro de téléphone invalide.' : '',
  company:     v => v.trim().length < 2      ? 'Veuillez entrer un nom d\'entreprise.' : '',
  description: v => v.trim().length < 20     ? 'Décrivez votre projet (20 caractères min.).' : '',
};

const validate = (name: string, value: string) => rules[name]?.(value) ?? '';

// ── Toast ────────────────────────────────────────────────────────────────────
const SuccessToast = ({ onClose }: { onClose: () => void }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.max(0, 100 - ((Date.now() - start) / TOAST_DURATION) * 100);
      setProgress(p);
      if (p === 0) clearInterval(iv);
    }, 30);
    const t = setTimeout(onClose, TOAST_DURATION);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -80, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-start gap-4 p-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle2 size={22} className="text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">Demande envoyée !</p>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            Je vous recontacte sous 24h avec une proposition personnalisée.
          </p>
        </div>
        <button onClick={onClose} className="flex-shrink-0 text-gray-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="h-0.5 bg-white/10">
        <div className="h-full bg-green-400 transition-all ease-linear" style={{ width: `${progress}%`, transitionDuration: '30ms' }} />
      </div>
    </motion.div>
  );
};

// ── Field components ─────────────────────────────────────────────────────────
const fieldBase = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl bg-black/50 border text-white outline-none transition-all placeholder:text-gray-600 ${
    hasError
      ? 'border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
      : 'border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/20'
  }`;

const FieldError = ({ msg }: { msg: string }) => (
  <motion.p
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-xs text-red-400 mt-1 ml-1"
  >
    {msg}
  </motion.p>
);

// ── Main component ────────────────────────────────────────────────────────────
const INITIAL = {
  full_name: '', email: '', phone: '', company: '',
  site_type: 'Landing Page', budget: 'À déterminer',
  deadline: 'Standard (1 mois)', description: '',
};

const ContactForm = () => {
  const [fields, setFields]       = useState(INITIAL);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [touched, setTouched]     = useState<Record<string, boolean>>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) setErrors(err => ({ ...err, [name]: validate(name, value) }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(err => ({ ...err, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['full_name', 'email', 'phone', 'company', 'description'];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    let hasError = false;

    required.forEach(name => {
      newTouched[name] = true;
      newErrors[name] = validate(name, fields[name as keyof typeof fields]);
      if (newErrors[name]) hasError = true;
    });

    setTouched(t => ({ ...t, ...newTouched }));
    setErrors(err => ({ ...err, ...newErrors }));
    if (hasError) return;

    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch('https://formspree.io/f/xykvgwnz', {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      if (res.ok) { setSubmitted(true); setShowToast(true); }
      else setServerError('Une erreur est survenue. Veuillez réessayer.');
    } catch {
      setServerError('Erreur de connexion. Vérifiez votre internet.');
    } finally {
      setLoading(false);
    }
  };

  const trustItems = [
    { icon: <Clock size={16} className="text-accent" />, text: 'Réponse garantie sous 24h' },
    { icon: <Shield size={16} className="text-accent" />, text: 'Devis 100 % gratuit' },
    { icon: <Zap size={16} className="text-accent" />, text: 'Livraison en 14 jours' },
    { icon: <MessageSquare size={16} className="text-accent" />, text: 'Sans engagement' },
  ];

  // Success screen
  if (submitted) {
    return (
      <>
        <AnimatePresence>{showToast && <SuccessToast onClose={() => setShowToast(false)} />}</AnimatePresence>
        <section id="contact" className="py-24 bg-secondary/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto glass p-14 rounded-3xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={40} className="text-green-400" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-3 tracking-tight">Demande envoyée !</h3>
              <p className="text-gray-400 mb-2">Je reviens vers vous sous <span className="text-white font-semibold">24h</span> avec une proposition adaptée à votre projet.</p>
              <p className="text-gray-600 text-sm mb-8">Vérifiez vos spams si vous ne recevez rien.</p>
              <button
                onClick={() => { setSubmitted(false); setFields(INITIAL); setTouched({}); setErrors({}); }}
                className="px-8 py-3 bg-accent text-white rounded-full font-bold hover:bg-orange-600 transition-colors text-sm"
              >
                Envoyer une autre demande
              </button>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>{showToast && <SuccessToast onClose={() => setShowToast(false)} />}</AnimatePresence>

      <section id="contact" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Démarrons votre <span className="text-gradient">projet</span>
            </motion.h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Remplissez le formulaire et recevez une proposition personnalisée sous 24h.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-8 items-start">

            {/* Left — trust panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold mb-1">Parlons de votre projet</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Chaque projet commence par une conversation. Dites-moi ce que vous voulez accomplir.
                </p>
              </div>

              <ul className="space-y-4">
                {trustItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">Tarifs de départ</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Landing page</span>
                    <span className="text-white font-semibold">899 $</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Site web complet</span>
                    <span className="text-white font-semibold">1 199 $</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Row 1: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Nom complet *</label>
                    <input
                      name="full_name" type="text" value={fields.full_name}
                      onChange={onChange} onBlur={onBlur}
                      placeholder="Jean Tremblay"
                      className={fieldBase(!!(errors.full_name && touched.full_name))}
                    />
                    <AnimatePresence>{errors.full_name && touched.full_name && <FieldError msg={errors.full_name} />}</AnimatePresence>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Email *</label>
                    <input
                      name="email" type="email" value={fields.email}
                      onChange={onChange} onBlur={onBlur}
                      placeholder="jean@entreprise.com"
                      className={fieldBase(!!(errors.email && touched.email))}
                    />
                    <AnimatePresence>{errors.email && touched.email && <FieldError msg={errors.email} />}</AnimatePresence>
                  </div>
                </div>

                {/* Row 2: Phone + Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Téléphone *</label>
                    <input
                      name="phone" type="tel" value={fields.phone}
                      onChange={onChange} onBlur={onBlur}
                      placeholder="514 000-0000"
                      className={fieldBase(!!(errors.phone && touched.phone))}
                    />
                    <AnimatePresence>{errors.phone && touched.phone && <FieldError msg={errors.phone} />}</AnimatePresence>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Entreprise *</label>
                    <input
                      name="company" type="text" value={fields.company}
                      onChange={onChange} onBlur={onBlur}
                      placeholder="Ma Compagnie Inc."
                      className={fieldBase(!!(errors.company && touched.company))}
                    />
                    <AnimatePresence>{errors.company && touched.company && <FieldError msg={errors.company} />}</AnimatePresence>
                  </div>
                </div>

                {/* Row 3: Type + Budget */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Type de projet</label>
                    <div className="relative">
                      <select
                        name="site_type" value={fields.site_type}
                        onChange={onChange}
                        className={`${fieldBase(false)} appearance-none pr-10 cursor-pointer`}
                      >
                        <option>Landing Page</option>
                        <option>Site Web Complet</option>
                        <option>Site Vitrine</option>
                        <option>Refonte Complète</option>
                        <option>Autre</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Budget</label>
                    <div className="relative">
                      <select
                        name="budget" value={fields.budget}
                        onChange={onChange}
                        className={`${fieldBase(false)} appearance-none pr-10 cursor-pointer`}
                      >
                        <option>À déterminer</option>
                        <option>Moins de 1 000 $</option>
                        <option>1 000 $ – 1 500 $</option>
                        <option>1 500 $ – 2 500 $</option>
                        <option>2 500 $ +</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 4: Deadline */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">Délai souhaité</label>
                  <div className="relative">
                    <select
                      name="deadline" value={fields.deadline}
                      onChange={onChange}
                      className={`${fieldBase(false)} appearance-none pr-10 cursor-pointer`}
                    >
                      <option>Urgent (&lt; 2 semaines)</option>
                      <option>Standard (1 mois)</option>
                      <option>Flexible (2 mois +)</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Description du projet *</label>
                    <span className={`text-xs ${fields.description.length > 400 ? 'text-orange-400' : 'text-gray-600'}`}>
                      {fields.description.length} / 500
                    </span>
                  </div>
                  <textarea
                    name="description" value={fields.description}
                    onChange={onChange} onBlur={onBlur}
                    maxLength={500} rows={4}
                    placeholder="Décrivez vos objectifs, vos fonctionnalités souhaitées et vos inspirations..."
                    className={`${fieldBase(!!(errors.description && touched.description))} resize-none`}
                  />
                  <AnimatePresence>{errors.description && touched.description && <FieldError msg={errors.description} />}</AnimatePresence>
                </div>

                {/* Server error */}
                <AnimatePresence>
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-sm text-center"
                    >
                      {serverError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-white ${
                    loading
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-accent hover:bg-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    <>Envoyer ma demande <Send size={18} /></>
                  )}
                </motion.button>

                <p className="text-center text-gray-600 text-xs">
                  Vos informations sont confidentielles et ne seront jamais partagées.
                </p>

              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
