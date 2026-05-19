import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold tracking-tighter mb-2">
              NOVIO<span className="text-gradient">STUDIO</span>
            </div>
            <p className="text-gray-500 text-xs">
              © 2026 Léo Drolet. Tous droits réservés.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Mail size={18} /></a>
          </div>

          <div className="flex gap-6 text-[10px] font-medium text-gray-600 uppercase tracking-widest">
            <a href="#home" className="hover:text-white transition-colors">Accueil</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
