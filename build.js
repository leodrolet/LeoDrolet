#!/usr/bin/env node
// Build script: Babel compile JSX → dist/, bundle + minify JS, minify CSS

const { execSync } = require("child_process");
const fs = require("fs");

// Ordre de chargement — les composants dépendent de effects (useReveal, etc.)
// Format : [clé-dans-bundle, chemin-source-jsx]
const FILES = [
  ["tweaks-panel", "src/tweaks-panel.jsx"],
  ["effects",      "src/effects.jsx"],
  // Composants (src/components/) — Babel les compile dans dist/ directement
  ["icons",        "src/components/icons.jsx"],
  ["Nav",          "src/components/Nav.jsx"],
  ["Hero",         "src/components/Hero.jsx"],
  ["Marquee",      "src/components/Marquee.jsx"],
  ["Services",     "src/components/Services.jsx"],   // exporte aussi SectionHead
  ["Portfolio",    "src/components/Portfolio.jsx"],
  ["About",        "src/components/About.jsx"],
  ["FAQ",          "src/components/FAQ.jsx"],
  ["Footer",       "src/components/Footer.jsx"],     // exporte aussi FinalCTA
  // Autres modules
  ["cinema",       "src/cinema.jsx"],
  ["tweaks",       "src/tweaks.jsx"],
  ["app",          "src/app.jsx"],
];

const srcPaths = FILES.map(([, src]) => src).join(" ");

// 1. Compiler tout le JSX vers dist/
execSync(`npx babel ${srcPaths} --out-dir dist`, { stdio: "inherit" });

// 2. Construire le bundle (IIFEs pour éviter les conflits de const entre fichiers)
const bundle = FILES.map(([key]) => {
  const code = fs.readFileSync(`dist/${key}.js`, "utf8");
  return `/* === ${key} === */\n(function(){\n${code}\n})();`;
}).join("\n\n");
fs.writeFileSync("dist/bundle.js", bundle);

// 3. Minifier JS
execSync("npx terser dist/bundle.js --compress --mangle --output dist/bundle.min.js", { stdio: "inherit" });

// 4. Minifier CSS
execSync("npx cleancss -o dist/styles.min.css src/styles.css", { stdio: "inherit" });

const jsSize  = fs.statSync("dist/bundle.min.js").size;
const cssSize = fs.statSync("dist/styles.min.css").size;
console.log(`Build complete → bundle: ${(jsSize/1024).toFixed(1)}KB  CSS: ${(cssSize/1024).toFixed(1)}KB`);
