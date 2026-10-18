import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Decimals, sums and formulas are the same in both languages and live in
// the scenes.
const EN = {
  season: "Season 1 · Episode 9",
  title: "0.999… = 1",
  subtitle: "and what decimals really are",
  // Cold open
  neverArrives: "closer and closer, never arrives",
  tricks: "tricks",
  whatNames: "what does it name?",
  // Staircase
  truncations: "truncations",
  short: "short by",
  zoom: (z: number) => `zoom ×${z}`,
  allBelow: "every step is below 1",
  process: "a process",
  oneNumber: "one number",
  // Ceiling
  definition: "a decimal names the least upper bound of its truncations",
  completeness: "exists because ℝ is complete",
  ceiling: "lowest ceiling above every step",
  // No room
  below: "a step gets above c",
  smallerThanAll: "smaller than every 10⁻ⁿ",
  infinitesimal: "an infinitesimal",
  // Archimedes
  supposeBound: "suppose ℕ had a least upper bound b",
  noCeiling: "no ceiling stops ℕ",
  noInfinitesimal: "no positive real is below every 1/n",
  // 庄子 (Chinese edition only; kept for type parity)
  zhuangziSource: "《庄子·天下》",
  quote: ["一尺之棰", "日取其半", "万世不竭"],
  day: (n: number) => `day ${n}`,
  left: "left",
  taken: "taken",
  // Twins
  twins: "two names, one point",
  oneName: "one name only",
  // Trick
  realFirst: "x is a real number",
  sumBlowsUp: "the partial sums grow without bound",
  noSum: "no real number to start from",
  shortcut: "a shortcut, not a proof",
  // End card
  isName: "a decimal is a name",
  noRoom: "no room between them",
  nextEpisode: "Next episode · ",
  nextTitle: "ℂ: Numbers as Rotations",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 9 集",
  title: "0.999… = 1",
  subtitle: "小数到底是什么",
  neverArrives: "越来越近，永远到不了",
  tricks: "招数",
  whatNames: "它指的是什么？",
  truncations: "截断",
  short: "差",
  zoom: (z: number) => `放大 ${z} 倍`,
  allBelow: "每一级都在 1 下面",
  process: "一个过程",
  oneNumber: "一个数",
  definition: "小数指的是它所有截断的最小上界",
  completeness: "ℝ 完备，所以它存在",
  ceiling: "高过每一级的最低天花板",
  below: "有一级台阶超过了 c",
  smallerThanAll: "比每个 10⁻ⁿ 都小",
  infinitesimal: "一个无穷小",
  supposeBound: "假设 ℕ 有最小上界 b",
  noCeiling: "没有天花板挡得住 ℕ",
  noInfinitesimal: "没有正实数比每个 1/n 都小",
  zhuangziSource: "《庄子·天下》",
  quote: ["一尺之棰", "日取其半", "万世不竭"],
  day: (n: number) => `第 ${n} 天`,
  left: "剩下",
  taken: "取走",
  twins: "两个名字，同一个点",
  oneName: "只有一个名字",
  realFirst: "x 是一个实数",
  sumBlowsUp: "部分和无限变大",
  noSum: "根本没有那个实数",
  shortcut: "是捷径，不是证明",
  isName: "小数只是名字",
  noRoom: "两者之间没有空隙",
  nextEpisode: "下一集 · ",
  nextTitle: "ℂ：复数就是旋转",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
