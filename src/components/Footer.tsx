import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface Props {
  onOpenPrivacy: () => void;
  onOpenMentions: () => void;
}

const Footer = ({ onOpenPrivacy, onOpenMentions }: Props) => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold tracking-tighter mb-2">
              NOVIO<span className="text-gradient">STUDIO</span>
            </div>
            <p className="text-gray-500 text-xs mb-3">
              © 2026 Novio Studio. Tous droits réservés. · Gatineau, Québec
            </p>
            <p className="text-[10px] text-gray-700 uppercase tracking-widest">
              Zones desservies&nbsp;: Gatineau · Hull · Aylmer · Ottawa · Kanata · Orléans · Outaouais
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#contact" aria-label="Envoyer un email" className="text-gray-500 hover:text-white transition-colors"><Mail size={18} /></a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-medium text-gray-600 uppercase tracking-widest">
            <a href="#home" className="hover:text-white transition-colors">Accueil</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Confidentialité</button>
            <button onClick={onOpenMentions} className="hover:text-white transition-colors">Mentions légales</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
