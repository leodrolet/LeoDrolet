import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Pourquoi ?', href: '#why' },
    { name: 'Services', href: '#services' },
    { name: 'Processus', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass py-4 transition-all duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          NOVIO<span className="text-gradient">STUDIO</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: navLinks.length * 0.1 }}
            className="px-5 py-2 bg-accent text-white rounded-full text-sm font-bold hover:bg-orange-600 transition-all"
          >
            Démarrer
          </motion.a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <a
            href="#contact"
            className="px-4 py-2 bg-accent text-white rounded-full text-xs font-bold"
          >
            Démarrer
          </a>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-black border-t border-white/10 overflow-hidden"
        >
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
