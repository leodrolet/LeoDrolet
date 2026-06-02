/* ============================================================
   tweaks.jsx — Tweaks panel for Novio Studio
   Exposes a small set of curated knobs.
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  accent: "#ff5b2e",
  headline: "Site Web *Fiable* en **Outaouais**",
  display: "instrument",
  theme: "dark",
  grain: 0.045,
  density: "regular",
  speed: 1,
  shape: "torus"
}/*EDITMODE-END*/;

const SHAPE_OPTIONS = [
  { id: "sphere", label: "Sphere" },
  { id: "torus", label: "Torus" },
  { id: "octahedron", label: "Diamond" },
  { id: "cube", label: "Cube" },
  { id: "globe", label: "Globe" },
  { id: "knot", label: "Knot" },
];

const ACCENT_OPTIONS = [
  "#ff5b2e", // orange (default)
  "#c5ff3d", // electric lime
  "#4d7cff", // ultraviolet blue
  "#e8e3d8", // bone white (monochrome accent)
  "#d4a574", // tan
  "#ff3d7f", // hot pink
];

const DISPLAY_OPTIONS = [
  { id: "instrument", label: "Serif éditorial" },
  { id: "display-modern", label: "Display moderne" },
  { id: "grotesque", label: "Grotesque XL" },
  { id: "serif-classic", label: "Serif classique" },
];

const useTweaksReactive = (defaults) => {
  const [t, setTweakRaw] = (window.useTweaks || (() => [defaults, () => {}]))(defaults);
  // Apply to <html> attributes / CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--grain-opacity", String(t.grain));
    root.style.setProperty("--anim-speed", String(t.speed));
    root.setAttribute("data-theme", t.theme);
    root.setAttribute("data-display", t.display);
    root.setAttribute("data-density", t.density);
  }, [t.accent, t.grain, t.speed, t.theme, t.display, t.density]);
  return [t, setTweakRaw];
};

const TweaksUI = ({ tweaks, setTweak }) => {
  const {
    TweaksPanel, TweakSection, TweakSlider, TweakRadio, TweakSelect,
    TweakText, TweakColor, TweakToggle,
  } = window;
  if (!TweaksPanel) return null;
  return (
    <TweaksPanel title="Tweaks · Novio">
      <TweakSection label="Identité" />
      <TweakColor
        label="Couleur d'accent"
        value={tweaks.accent}
        options={ACCENT_OPTIONS}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakSelect
        label="Police titres"
        value={tweaks.display}
        options={DISPLAY_OPTIONS.map((o) => ({ value: o.id, label: o.label }))}
        onChange={(v) => setTweak("display", v)}
      />
      <TweakText
        label="Headline hero"
        value={tweaks.headline}
        placeholder="Expérience captivante et *réfléchie*"
        onChange={(v) => setTweak("headline", v)}
      />

      <TweakSection label="Apparence" />
      <TweakRadio
        label="Thème"
        value={tweaks.theme}
        options={["dark", "light"]}
        onChange={(v) => setTweak("theme", v)}
      />
      <TweakRadio
        label="Densité"
        value={tweaks.density}
        options={["tight", "regular", "loose"]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakSlider
        label="Grain"
        value={tweaks.grain}
        min={0} max={0.18} step={0.005}
        unit=""
        onChange={(v) => setTweak("grain", v)}
      />

      <TweakSection label="Mouvement" />
      <TweakSlider
        label="Vitesse animations"
        value={tweaks.speed}
        min={0.4} max={2.4} step={0.1}
        unit="×"
        onChange={(v) => setTweak("speed", v)}
      />
    </TweaksPanel>
  );
};

Object.assign(window, { TWEAK_DEFAULTS, useTweaksReactive, TweaksUI });
