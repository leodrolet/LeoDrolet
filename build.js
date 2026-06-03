#!/usr/bin/env node
// Build script: Babel compile JSX → dist/, bundle + minify JS, minify CSS

const { execSync } = require("child_process");
const fs = require("fs");

const ORDER = ["tweaks-panel", "effects", "sections", "cinema", "estimator", "tweaks", "app"];

// 1. Compile JSX
execSync(
  `npx babel ${ORDER.map((f) => f + ".jsx").join(" ")} --out-dir dist`,
  { stdio: "inherit" }
);

// 2. Bundle with IIFEs (avoids const redeclaration collisions between files)
const bundle = ORDER.map((f) => {
  const code = fs.readFileSync(`dist/${f}.js`, "utf8");
  return `(function(){\n${code}\n})();`;
}).join("\n");
fs.writeFileSync("dist/bundle.js", bundle);

// 3. Minify JS
execSync(
  "npx terser dist/bundle.js --compress --mangle --output dist/bundle.min.js",
  { stdio: "inherit" }
);

// 4. Minify CSS
execSync(
  "npx cleancss -o styles.min.css styles.css",
  { stdio: "inherit" }
);

const jsSize  = fs.statSync("dist/bundle.min.js").size;
const cssSize = fs.statSync("styles.min.css").size;
console.log(`Build complete → bundle: ${(jsSize/1024).toFixed(1)}KB  CSS: ${(cssSize/1024).toFixed(1)}KB`);
