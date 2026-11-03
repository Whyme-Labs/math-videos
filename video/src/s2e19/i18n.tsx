import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 19",
  title: "The Singular Value Decomposition",
  subtitle: "turn, stretch, turn",
  // Cold open
  anyMatrix: "any matrix",
  turn: "turn",
  stretch: "stretch",
  // Two bases
  input: "input",
  output: "output",
  notParallel: "not parallel",
  // Example
  size: "size ‖A‖",
  area: "area ×",
  amplify: "errors ×",
  // Rect
  kernel: "kernel",
  // 沈括 (Chinese edition only; kept for type parity)
  shen: "沈括 · 《梦溪笔谈》",
  kite: "鸢",
  shadow: "影",
  slit: "窗隙",
  // Layers
  layer: "layers",
  stored: "numbers stored",
  // PCA
  pc1: "main trend",
  explained: "of the spread",
  // Part A
  partA: "Part A",
  fin: "finite dimension",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "What Breaks in Infinite Dimensions",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 19 集",
  title: "奇异值分解",
  subtitle: "转、伸缩、再转",
  anyMatrix: "任意矩阵",
  turn: "转",
  stretch: "伸缩",
  input: "输入",
  output: "输出",
  notParallel: "不平行",
  size: "大小 ‖A‖",
  area: "面积 ×",
  amplify: "误差 ×",
  kernel: "核",
  shen: "沈括 · 《梦溪笔谈》",
  kite: "鸢",
  shadow: "影",
  slit: "窗隙",
  layer: "层",
  stored: "存下的数",
  pc1: "主要走向",
  explained: "的散布",
  partA: "上篇",
  fin: "有限维",
  nextEpisode: "下一集 · ",
  nextTitle: "无限维里什么会坏掉",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
