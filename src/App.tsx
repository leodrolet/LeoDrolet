import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Services } from './components/AboutServices';
import { Portfolio, WhyMe, Process } from './components/PortfolioWhyMeProcess';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyMe />
        <Process />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
