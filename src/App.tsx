import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Services } from './components/AboutServices';
import WhyLandingPage from './components/WhyLandingPage';
import BeforeAfter from './components/BeforeAfter';
import Process from './components/Process';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { smoothScrollTo } from './components/utils';
import { GlowStyles } from './components/GlowCard';
import { ScrollProgress } from './components/ScrollProgress';
import './index.css';

function App() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      smoothScrollTo(anchor.getAttribute('href')!);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white">
      <GlowStyles />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhyLandingPage />
        <BeforeAfter />
        <About />
        <Services />
        <Process />
        <Pricing />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
