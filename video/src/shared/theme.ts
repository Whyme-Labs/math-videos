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

// Chinese: Noto Sans SC (思源黑体, Fontsource, SIL OFL) for every Chinese
// character, titles included, so the Chinese edition uses one family. Only the
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
  title: 'Fraunces, "Noto Sans SC", serif',
  body: 'Inter, "Noto Sans SC", sans-serif',
  mono: 'JetBrainsMono, "Noto Sans SC", monospace',
  math: 'STIXTwoText, "DejaVu Serif", "Noto Sans SC", serif',
};

// Whyme Labs palette: violet stage, lemon light, orange glow (brand mark
// gradient). Semantic roles follow storyline/04-production-notes.md:
// primary = objects, orange = measurements/remainders, highlight = open questions.
const SEASON1 = {
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

export type Palette = typeof SEASON1;

// Each season has its own stage. The roles stay the same (lemon objects and
// vectors, orange measurements and covectors, the brand's lemon-to-orange
// light), so only the stage and the supporting colours change. `violet` is
// the name of the role "card and panel fill", whatever its hue.
export const PALETTES: Record<string, Palette> = {
  "1": SEASON1,
  // Season 2, deep teal: a sea-green stage, coral for open questions
  "2": {
    ...SEASON1,
    bg: "#03201e",
    bgMid: "#063d39",
    bgGlow: "#0c6b62",
    panelEdge: "rgba(140,240,220,0.28)",
    text: "#f4fffb",
    muted: "#a6d6cc",
    violet: "#0f7f73",
    brandPurple: "#2a6b63",
    highlight: "#ff8a80",
    paper: "#fffbea",
    ink: "#062b28",
  },
};

// Which palette each season uses.
export const SEASON_PALETTE: Record<number, string> = { 1: "1", 2: "2" };

// The palette in use. A composition (an episode, one of its scenes, or a
// thumbnail) calls useSeasonPalette before rendering anything, and Remotion
// renders one composition at a time, so every colour read below it comes
// from that composition's season.
let current: Palette = SEASON1;
export const setSeason = (season: number) => {
  current = PALETTES[SEASON_PALETTE[season] ?? "1"];
};
export const seasonOfCode = (code: string) => {
  const m = /^S(\d+)E/.exec(code);
  return m ? Number(m[1]) : 1;
};

export const colors: Palette = new Proxy({} as Palette, {
  get: (_, key) => current[key as keyof Palette],
});

// rgba() helper for translucent fills of palette colours.
export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
