import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Services } from './components/AboutServices';
import WhyLandingPage from './components/WhyLandingPage';
import BeforeAfter from './components/BeforeAfter';
import { Portfolio } from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import { FAQ } from './components/FAQ';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { MentionsLegales } from './components/MentionsLegales';
import { CookieBanner } from './components/CookieBanner';
import { smoothScrollTo } from './components/utils';
import { GlowStyles } from './components/GlowCard';
import { ScrollProgress } from './components/ScrollProgress';
import './index.css';

function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [mentionsOpen, setMentionsOpen] = useState(false);

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
        <Portfolio />
        <About />
        <Services />
        <Process />
        <Pricing />
        <FAQ />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenMentions={() => setMentionsOpen(true)}
      />
      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <MentionsLegales open={mentionsOpen} onClose={() => setMentionsOpen(false)} />
      <CookieBanner onOpenPrivacy={() => setPrivacyOpen(true)} />
    </div>
  );
}

export default App;
