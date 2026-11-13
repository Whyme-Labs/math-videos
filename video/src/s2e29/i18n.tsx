import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 29",
  title: "Fourier",
  subtitle: "functions as infinite vectors",
  // Cold open
  violin: "violin",
  flute: "flute",
  fourier1807: "Fourier · 1807",
  lagrange: "Lagrange: “impossible”",
  // Tones
  average: "average",
  // Energy
  leftover: "energy left",
  energy: "energy",
  // Gibbs
  peak: "peak",
  // 古琴 (Chinese edition only; kept for type parity)
  qinTitle: "古琴十三徽 · 嵇康《琴赋》",
  qinQuote: "“徽以钟山之玉”",
  qinHarm: "泛音",
  qinSum: "弦音 = 纯音之和",
  // Diagonal
  hot: "hot",
  cold: "cold",
  // Bases
  legendre: "Legendre",
  hermite: "Hermite",
  haar: "Haar",
  diagonalises: "each basis diagonalises its own operator",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Compact Operators",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 29 集",
  title: "傅里叶",
  subtitle: "函数是无穷维向量",
  violin: "小提琴",
  flute: "长笛",
  fourier1807: "傅里叶 · 1807",
  lagrange: "拉格朗日：“不可能”",
  average: "平均",
  leftover: "剩余能量",
  energy: "能量",
  peak: "峰值",
  qinTitle: "古琴十三徽 · 嵇康《琴赋》",
  qinQuote: "“徽以钟山之玉”",
  qinHarm: "泛音",
  qinSum: "弦音 = 纯音之和",
  hot: "热",
  cold: "冷",
  legendre: "勒让德",
  hermite: "埃尔米特",
  haar: "哈尔",
  diagonalises: "每组基各自对角化一个算子",
  nextEpisode: "下一集 · ",
  nextTitle: "紧算子",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
