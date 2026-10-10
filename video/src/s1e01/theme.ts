import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts are bundled in public/fonts (variable woff2, latin subset, from Google
// Fonts) so renders work offline and look identical everywhere.
const FAMILIES = {
  Fraunces: "Fraunces.woff2",
  Inter: "Inter.woff2",
  JetBrainsMono: "JetBrainsMono.woff2",
  STIXTwoText: "STIXTwoText.woff2",
};

for (const [family, file] of Object.entries(FAMILIES)) {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight: "100 900" });
}

// Math symbols (ℕ, ℤ, ⊂, ∅) are outside the latin subset and fall back to DejaVu Serif.
export const fonts = {
  title: "Fraunces, serif",
  body: "Inter, sans-serif",
  mono: "JetBrainsMono, monospace",
  math: 'STIXTwoText, "DejaVu Serif", serif',
};

// Series palette (storyline/04-production-notes.md): blue = objects/vectors,
// orange = measurements/remainders, gold = open questions.
export const colors = {
  bg: "#0e1116",
  panel: "#161b22",
  panelEdge: "#30363d",
  text: "#e6edf3",
  muted: "#8b949e",
  blue: "#58a6ff",
  orange: "#f0883e",
  gold: "#e3b341",
  green: "#3fb950",
  red: "#f85149",
  purple: "#bc8cff",
  wood: "#b0773f",
};
