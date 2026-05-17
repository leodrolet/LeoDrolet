import React from 'react';
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
import './index.css';

function App() {
  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white bg-black">
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
