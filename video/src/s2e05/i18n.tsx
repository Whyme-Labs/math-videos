import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 5",
  title: "Building New Spaces",
  subtitle: "sums, splits and gluing",
  // Cold open
  exam: "Exam hall",
  question: "∫ 2x dx = ?",
  answer: "x²",
  plusC: "+ C",
  callback: "↩ S1E05",
  // Sum
  union: "U ∪ W: not a space",
  sumLabel: "U + W = the plane",
  // Complement
  whichLine: "which line?",
  // Quotient
  quotientLabel: "ℝ² / x-axis",
  sameLine: "same line",
  // 干支 (Chinese edition only; kept for type parity)
  ganzhiTitle: "干支纪年",
  jiazi: "甲子",
  oracle: "商代甲骨 · 六十干支表",
  // +C
  kernel: "kernel: the constants",
  dLabel: "d/dx",
  undo: "undo",
  // Hom
  homLabel: "maps ℝ² → ℝ³",
  sixDims: "6 dials = 6 dimensions",
  // End card
  noChoice: "no choice needed",
  nextEpisode: "Next episode · ",
  nextTitle: "Covectors",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 5 集",
  title: "造新的空间",
  subtitle: "相加、拆分与粘合",
  exam: "考场",
  question: "∫ 2x dx = ?",
  answer: "x²",
  plusC: "+ C",
  callback: "↩ 第一季第 5 集",
  union: "U ∪ W：不是空间",
  sumLabel: "U + W = 整个平面",
  whichLine: "选哪条？",
  quotientLabel: "ℝ² / x 轴",
  sameLine: "同一条线",
  ganzhiTitle: "干支纪年",
  jiazi: "甲子",
  oracle: "商代甲骨 · 六十干支表",
  kernel: "核：常数",
  dLabel: "d/dx",
  undo: "倒回去",
  homLabel: "映射 ℝ² → ℝ³",
  sixDims: "6 个旋钮 = 6 维",
  noChoice: "无需选择",
  nextEpisode: "下一集 · ",
  nextTitle: "余向量",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
