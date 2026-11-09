import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 28",
  title: "Hilbert Spaces",
  subtitle: "Euclid in infinite dimensions",
  // Cold open
  noClosest: "no closest point",
  sound: "sound",
  temperature: "temperature",
  wave: "wave function",
  hilbert: "angles + completeness = Hilbert",
  // Naive
  notAllowed: "not a finite sequence",
  manyClosest: "many closest points",
  // Projection
  cauchy: "Cauchy → p",
  // 规矩 (Chinese edition only; kept for type parity)
  gjQuote: "“不以规矩，不能成方圆。”",
  gjSource: "《孟子·离娄上》",
  gjGui: "规 · 长短",
  gjJu: "矩 · 直角",
  gjBoth: "规矩俱全",
  // Riesz
  kernel: "ker φ",
  dual: "H ≅ H*",
  // Bases
  error: "error",
  // Only one
  build: "build",
  describe: "describe",
  quantum: "quantum state",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Fourier",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 28 集",
  title: "希尔伯特空间",
  subtitle: "无穷维里的欧几里得",
  noClosest: "没有最近点",
  sound: "声音",
  temperature: "温度",
  wave: "波函数",
  hilbert: "角度 + 完备 = 希尔伯特",
  notAllowed: "不是有限数列",
  manyClosest: "最近点不止一个",
  cauchy: "柯西列 → p",
  gjQuote: "“不以规矩，不能成方圆。”",
  gjSource: "《孟子·离娄上》",
  gjGui: "规 · 长短",
  gjJu: "矩 · 直角",
  gjBoth: "规矩俱全",
  kernel: "ker φ",
  dual: "H ≅ H*",
  error: "误差",
  build: "构造",
  describe: "描述",
  quantum: "量子态",
  nextEpisode: "下一集 · ",
  nextTitle: "傅里叶",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
