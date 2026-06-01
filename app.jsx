/* ============================================================
   app.jsx — Novio Studio main app
   ============================================================ */

const {
  Nav, Hero, MarqueeRow, Services, Portfolio, About, FAQ,
  FinalCTA, Footer, Estimator, useTweaksReactive, TWEAK_DEFAULTS, TweaksUI,
  ScrollProgress, Manifesto, Specs,
} = window;

const App = () => {
  const [tweaks, setTweak] = useTweaksReactive(TWEAK_DEFAULTS);

  // Hero headline — pass through to Hero
  // Convert markup: words wrapped in *...* render italic; **...** render accent
  // Tokenization happens inside Hero.

  return (
    <>
      <ScrollProgress />
      <Nav />
      <Hero headline={tweaks.headline} accent={tweaks.accent} shape={tweaks.shape} />

      <Manifesto />

      <MarqueeRow items={[
        "Expériences immersives",
        "Gatineau / Outaouais",
        "Dès 999 $ CAD",
        "Livré 7–28 jours",
        "100 / 100 Lighthouse",
        "Support 30–60 jours",
      ]} />

      <Specs />
      <Services />

      <MarqueeRow reverse items={[
        "Cohorte fondateur · 20% off",
        "04 places · printemps 2026",
        "Pas d'agence · pas d'intermédiaire",
        "hello@novio.studio",
      ]} />

      <Portfolio />
      <About />
      <Estimator />
      <FAQ />
      <FinalCTA />
      <Footer />

      <TweaksUI tweaks={tweaks} setTweak={setTweak} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
