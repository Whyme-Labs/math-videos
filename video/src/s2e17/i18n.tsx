import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 17",
  title: "Projection and Least Squares",
  subtitle: "the best fit is a shadow",
  // Cold open
  date: "1 January 1801",
  piazzi: "Giuseppe Piazzi",
  sun: "Sun",
  gauss: "C. F. Gauss, 24",
  sumSq: "sum of squared misses",
  december: "December 1801",
  ceres: "Ceres",
  // Naive
  height: "height c",
  slope: "slope d",
  noSolution: "no exact solution",
  // Shadow
  heights: "4 heights",
  model: "every line the model can draw",
  drawn: "ℝ⁴, drawn in 3D",
  light: "light",
  shadow: "shadow p",
  error: "error e",
  // Closest
  other: "any other u",
  closestPerp: "closest ⇔ e ⊥ plane",
  // On a line
  angle: "angle",
  // Normal
  misses: "misses",
  total: "squared misses",
  // Projector
  again: "project again",
  fit: "fit",
  // 郭守敬 (Chinese edition only; kept for type parity)
  guo: "郭守敬 · 登封观星台",
  biao8: "八尺表",
  biao40: "四丈高表",
  jingfu: "景符",
  blur: "模糊的影端",
  sharp: "清楚的亮点",
  solstice: "冬至",
  ratio: "误差 ÷ 影长",
  // Gram–Schmidt
  peel: "peel off the shadow",
  scale: "scale to length 1",
  // Legendre
  bestLine: "best line: ⅓",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Spectral Theorem",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 17 集",
  title: "投影与最小二乘",
  subtitle: "最好的拟合是一个影子",
  date: "1801 年 1 月 1 日",
  piazzi: "皮亚齐",
  sun: "太阳",
  gauss: "高斯，24 岁",
  sumSq: "偏差平方和",
  december: "1801 年 12 月",
  ceres: "谷神星",
  height: "截距 c",
  slope: "斜率 d",
  noSolution: "没有精确解",
  heights: "4 个高度",
  model: "模型能画出的所有直线",
  drawn: "ℝ⁴，画成三维",
  light: "光",
  shadow: "影子 p",
  error: "误差 e",
  other: "另一点 u",
  closestPerp: "最近 ⇔ e ⊥ 平面",
  angle: "夹角",
  misses: "偏差",
  total: "偏差平方和",
  again: "再投影一次",
  fit: "拟合",
  guo: "郭守敬 · 登封观星台",
  biao8: "八尺表",
  biao40: "四丈高表",
  jingfu: "景符",
  blur: "模糊的影端",
  sharp: "清楚的亮点",
  solstice: "冬至",
  ratio: "误差 ÷ 影长",
  peel: "剥掉影子",
  scale: "缩放到长度 1",
  bestLine: "最好的直线：⅓",
  nextEpisode: "下一集 · ",
  nextTitle: "谱定理",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
