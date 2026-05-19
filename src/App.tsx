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
import CursorGlow from './components/CursorGlow';
import { smoothScrollTo } from './components/utils';
import { applyMagnetic } from './utils/magnetic';
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

  // Magnetic effect on all .btn-magnetic wrappers
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const cleanups: (() => void)[] = [];
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.btn-magnetic').forEach(el => {
        cleanups.push(applyMagnetic(el));
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white bg-black">
      <CursorGlow />
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
