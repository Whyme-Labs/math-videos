import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 3 · Episode 3",
  title: "Representations",
  subtitle: "groups acting by matrices",
  // Cold open
  nineWays: "3 atoms × 3 directions = 9",
  slide: "3 slide",
  spin: "3 spin",
  vibrate: "3 vibrate",
  kept: "mirror kept",
  flipped: "mirror flipped",
  fingerprint: "fingerprint",
  trace: "trace",
  // Matrices
  eight: "8 symmetries",
  quarter: "quarter turn",
  flip: "flip",
  // Blocks
  fixedLine: "fixed line",
  plane: "x + y + z = 0",
  irreducible: "irreducible",
  // Maschke
  average: "average",
  invariant: "invariant",
  maschke: "Maschke",
  // Schur
  kernel: "kernel",
  image: "image",
  zero: "zero",
  iso: "isomorphism",
  // Character
  newBasis: "new basis",
  classes: ["e", "(12)", "(123)"],
  irreps: ["trivial", "sign", "2D"],
  perm: "permutation",
  // 《营造法式》 (Chinese edition only; kept for type parity)
  lzTitle: "李诫《营造法式》（1103）",
  lzName: "格子门 · 四斜毬文格眼",
  lzD4: "D₄：8 个对称",
  // Water
  ops: ["E", "C₂", "σ", "σ′"],
  rows: ["A₁", "A₂", "B₁", "B₂"],
  stayPut: "atoms that stay put",
  modes: ["stretch", "bend", "asymmetric"],
  onlyTraces: "only traces",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Fourier Is Duality",
  seriesLine: "Where the Roads Meet · Season 3",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第三季 · 第 3 集",
  title: "表示论",
  subtitle: "群用矩阵来作用",
  nineWays: "3 个原子 × 3 个方向 = 9",
  slide: "3 种平移",
  spin: "3 种转动",
  vibrate: "3 种振动",
  kept: "镜面保持",
  flipped: "镜面翻转",
  fingerprint: "指纹",
  trace: "迹",
  eight: "8 个对称",
  quarter: "转四分之一圈",
  flip: "翻转",
  fixedLine: "不动的线",
  plane: "x + y + z = 0",
  irreducible: "不可约",
  average: "平均",
  invariant: "不变",
  maschke: "马施克定理",
  kernel: "核",
  image: "像",
  zero: "零",
  iso: "同构",
  newBasis: "换一组基",
  classes: ["e", "(12)", "(123)"],
  irreps: ["平凡", "符号", "二维"],
  perm: "置换",
  lzTitle: "李诫《营造法式》（1103）",
  lzName: "格子门 · 四斜毬文格眼",
  lzD4: "D₄：8 个对称",
  ops: ["E", "C₂", "σ", "σ′"],
  rows: ["A₁", "A₂", "B₁", "B₂"],
  stayPut: "不动的原子",
  modes: ["伸缩", "弯曲", "不对称"],
  onlyTraces: "只用了迹",
  nextEpisode: "下一集 · ",
  nextTitle: "傅里叶就是对偶",
  seriesLine: "殊途同归 · 第三季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
