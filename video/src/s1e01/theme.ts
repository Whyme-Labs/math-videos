import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import zhFonts from "./zh-fonts.json";

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

// Chinese: Noto Sans SC / Noto Serif SC (Fontsource, SIL OFL), only the
// unicode-range chunks that cover the characters the Chinese edition uses.
// Regenerate zh-fonts.json and public/fonts/zh after changing Chinese text.
for (const chunk of zhFonts) {
  loadFont({
    family: chunk.family,
    url: staticFile(chunk.file),
    weight: "100 900",
    unicodeRange: chunk.unicodeRange,
  });
}

// Math symbols (ℕ, ℤ, ⊂, ∅) are outside the latin subset and fall back to DejaVu Serif.
export const fonts = {
  title: 'Fraunces, "Noto Serif SC", serif',
  body: 'Inter, "Noto Sans SC", sans-serif',
  mono: 'JetBrainsMono, "Noto Sans SC", monospace',
  math: 'STIXTwoText, "DejaVu Serif", "Noto Serif SC", serif',
};

// Whyme Labs palette: violet stage, lemon light, orange glow (brand mark
// gradient). Semantic roles follow storyline/04-production-notes.md:
// primary = objects, orange = measurements/remainders, highlight = open questions.
export const colors = {
  bg: "#16052f",
  bgMid: "#2b0a5a",
  bgGlow: "#4a1491",
  panel: "rgba(255,255,255,0.06)",
  panelEdge: "rgba(201,160,255,0.28)",
  text: "#fff8ec",
  muted: "#c8b6e6",
  violet: "#7c15bc",
  brandPurple: "#613896",
  primary: "#ffd102",
  orange: "#ff9702",
  highlight: "#f29ad8",
  green: "#5eeaa0",
  red: "#ff4d6d",
  wood: "#ff7a1a",
  paper: "#fff6d6",
  ink: "#2a1450",
};

// rgba() helper for translucent fills of palette colours.
export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
