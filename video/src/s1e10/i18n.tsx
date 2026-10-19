import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Formulas and numbers are the same in both languages and live in the
// scenes.
const EN = {
  season: "Season 1 · Episode 10",
  title: "ℂ: Numbers as Rotations",
  subtitle: "the imaginary unit is a quarter turn",
  // Cold open
  plain: "a plain answer",
  cardano: "Cardano's formula",
  impossible: "impossible?",
  cancel: "the imaginary parts cancel",
  // Pairs
  pairsOfReals: "pairs of reals",
  add: "add",
  multiply: "multiply",
  realsInside: "the reals: (a, 0)",
  east: "3 → east",
  north: "2 ↑ north",
  // Quarter turn
  quarter: "× i: a quarter turn",
  half: "× i × i: a half turn",
  halfway: "× i goes halfway",
  // Scale and rotate
  length: "length",
  angle: "angle",
  lengthsMultiply: "lengths multiply",
  anglesAdd: "angles add",
  // 弦图 (Chinese edition only; kept for type parity)
  zhoubi: "Zhoubi Suanjing",
  quote: ["故折矩", "句广三", "股修四", "径隅五"],
  zhaoShuang: "Zhao Shuang's hypotenuse diagram",
  red: "red",
  yellow: "yellow",
  // FTA
  wanted: "wanted",
  gotFree: "got for free",
  everyPoly: "every polynomial has a root in ℂ",
  winds: (n: number) => `winds ${n}×`,
  noWind: "doesn't go around 0",
  root: "root",
  fta: "Fundamental Theorem of Algebra",
  // No order
  squaresPositive: "nonzero squares are positive",
  contradiction: "contradiction",
  // Tower
  gained: "gained",
  lost: "lost",
  ledger: [
    { step: "ℕ → ℤ", gain: "subtraction", loss: "a least element" },
    { step: "ℤ → ℚ", gain: "division", loss: "a next number" },
    { step: "ℚ → ℝ", gain: "no holes", loss: "finite names" },
    { step: "ℝ → ℂ", gain: "every root", loss: "order" },
  ],
  algebraDone: "nothing left to repair in the algebra",
  // End card
  stretchTurn: "a stretch and a turn",
  nextEpisode: "Next episode · ",
  nextTitle: "Hilbert's Hotel",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 10 集",
  title: "ℂ：复数就是旋转",
  subtitle: "虚数单位 i，就是转四分之一圈",
  plain: "答案很普通",
  cardano: "卡尔达诺公式",
  impossible: "不可能？",
  cancel: "虚的部分抵消了",
  pairsOfReals: "实数对",
  add: "加法",
  multiply: "乘法",
  realsInside: "实数：(a, 0)",
  east: "向东 3 →",
  north: "向北 2 ↑",
  quarter: "× i：转四分之一圈",
  half: "× i × i：转半圈",
  halfway: "× i 只转一半",
  length: "长度",
  angle: "角度",
  lengthsMultiply: "长度相乘",
  anglesAdd: "角度相加",
  zhoubi: "《周髀算经》",
  quote: ["故折矩", "句广三", "股修四", "径隅五"],
  zhaoShuang: "赵爽弦图",
  red: "朱实",
  yellow: "中黄实",
  wanted: "想要的",
  gotFree: "白送的",
  everyPoly: "每个多项式在 ℂ 里都有根",
  winds: (n: number) => `绕 ${n} 圈`,
  noWind: "不绕原点",
  root: "根",
  fta: "代数基本定理",
  squaresPositive: "非零数的平方都是正的",
  contradiction: "矛盾",
  gained: "得到",
  lost: "失去",
  ledger: [
    { step: "ℕ → ℤ", gain: "减法", loss: "最小元" },
    { step: "ℤ → ℚ", gain: "除法", loss: "“下一个数”" },
    { step: "ℚ → ℝ", gain: "没有洞", loss: "有限长的名字" },
    { step: "ℝ → ℂ", gain: "处处有根", loss: "顺序" },
  ],
  algebraDone: "代数上已经没有要修补的了",
  stretchTurn: "一次拉伸，一次旋转",
  nextEpisode: "下一集 · ",
  nextTitle: "希尔伯特旅馆",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
