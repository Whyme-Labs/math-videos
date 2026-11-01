import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 16",
  title: "Vectors and Covectors",
  subtitle: "the Riesz representation",
  // Cold open
  year: "1907",
  riesz: "Frigyes Riesz",
  frechet: "Maurice Fréchet",
  uphill: "uphill",
  ground: "ground",
  squash: "squashed map",
  // Two kinds
  arrow: "arrow",
  stack: "stack",
  count: "sheets crossed",
  pairing: "pairing from a basis",
  // Riesz
  rieszThm: "one arrow ↔ one stack",
  // Choice
  rowsCols: "row ≠ column unless G = I",
  // 裴秀 (Chinese edition only; kept for type parity)
  peixiu: "裴秀 · 制图六体",
  six: ["分率", "准望", "道里", "高下", "方邪", "迂直"],
  crossed: "穿过 3 条",
  // Gradient
  dotRuler: "dot product",
  otherRuler: "G = diag(4, 1)",
  steepest: "steepest",
  climb: "climb",
  // Adjoint
  pullBack: "pull back",
  toArrow: "turn into an arrow",
  transpose: "transpose",
  // Delta
  valueAt0: "p ↦ p(0)",
  degree: "degree",
  length: "length",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Projection and Least Squares",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 16 集",
  title: "向量与余向量",
  subtitle: "里斯表示定理",
  year: "1907 年",
  riesz: "里斯",
  frechet: "弗雷歇",
  uphill: "上坡",
  ground: "地面",
  squash: "压扁的地图",
  arrow: "箭头",
  stack: "薄片",
  count: "穿过的薄片",
  pairing: "由一组基配对",
  rieszThm: "一支箭头 ↔ 一叠薄片",
  rowsCols: "除非 G = I，行 ≠ 列",
  peixiu: "裴秀 · 制图六体",
  six: ["分率", "准望", "道里", "高下", "方邪", "迂直"],
  crossed: "穿过 3 条",
  dotRuler: "点积",
  otherRuler: "G = diag(4, 1)",
  steepest: "最陡",
  climb: "升高",
  pullBack: "拉回",
  toArrow: "变成箭头",
  transpose: "转置",
  valueAt0: "p ↦ p(0)",
  degree: "次数",
  length: "长度",
  nextEpisode: "下一集 · ",
  nextTitle: "投影与最小二乘",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
