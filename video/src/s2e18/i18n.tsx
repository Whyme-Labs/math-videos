import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 18",
  title: "The Spectral Theorem",
  subtitle: "symmetric maps only stretch",
  // Cold open
  wobble: "wobble",
  clean: "clean spin",
  principal: "principal axes",
  symmetric: "symmetric",
  // Skewed
  rotation: "rotation: no eigenvectors",
  shear: "shear: only one",
  general: "a general map",
  angle: "angle",
  coeffs: "(0, 1) = (100, 1) − 100 · (1, 0)",
  want: "perpendicular eigenvectors",
  // Necessary
  inBasis: "in the eigenbasis",
  usual: "on the usual axes",
  necessary: "necessary ✓",
  enough: "enough?",
  // Lemmas
  equal: "equal only at 90°",
  // Invariant
  plane: "v⊥",
  symMap: "symmetric map",
  shearMap: "shear",
  stays: "stays in the plane",
  tips: "tips out",
  // Peel
  step: "step",
  // Ellipse
  stretch: "stretch",
  // 编钟 (Chinese edition only; kept for type parity)
  bell: "曾侯乙编钟 · 战国早期",
  hewa: "合瓦形",
  zhenggu: "正鼓音",
  cegu: "侧鼓音",
  independent: "互不牵连",
  // Hessian
  saddle: "saddle",
  bowl: "minimum",
  up: "up",
  down: "down",
  // Decomp
  outcome: "outcome",
  prob: "probability",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Singular Value Decomposition",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 18 集",
  title: "谱定理",
  subtitle: "对称映射只做伸缩",
  wobble: "乱晃",
  clean: "转得稳",
  principal: "主轴",
  symmetric: "对称",
  rotation: "旋转：没有特征向量",
  shear: "错切：只有一个",
  general: "一般的映射",
  angle: "夹角",
  coeffs: "(0, 1) = (100, 1) − 100 · (1, 0)",
  want: "互相垂直的特征向量",
  inBasis: "在特征基下",
  usual: "在平常的坐标轴上",
  necessary: "必要 ✓",
  enough: "充分？",
  equal: "只有 90° 时相等",
  plane: "v⊥",
  symMap: "对称映射",
  shearMap: "错切",
  stays: "留在平面里",
  tips: "被掀歪",
  step: "第",
  stretch: "伸缩",
  bell: "曾侯乙编钟 · 战国早期",
  hewa: "合瓦形",
  zhenggu: "正鼓音",
  cegu: "侧鼓音",
  independent: "互不牵连",
  saddle: "鞍点",
  bowl: "极小值",
  up: "向上",
  down: "向下",
  outcome: "结果",
  prob: "概率",
  nextEpisode: "下一集 · ",
  nextTitle: "奇异值分解",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
