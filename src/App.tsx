import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Services } from './components/AboutServices';
import WhyLandingPage from './components/WhyLandingPage';
import BeforeAfter from './components/BeforeAfter';
import SocialProof from './components/SocialProof';
import Process from './components/Process';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white bg-black">
      <Navbar />
      <main>
        <Hero />
        <WhyLandingPage />
        <BeforeAfter />
        <About />
        <Services />
        <SocialProof />
        <Process />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
