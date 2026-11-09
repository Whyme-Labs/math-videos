import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 26",
  title: "The Big Three Theorems",
  subtitle: "what completeness buys",
  // Cold open
  fourier1807: "Fourier · 1807",
  everyContinuous: "every continuous f?",
  dbr1873: "du Bois-Reymond · 1873",
  bs1927: "Banach & Steinhaus · 1927",
  neverWritten: "never written down",
  completeness: "completeness",
  // Naive
  uniformly: "bounded together?",
  peak: "peak",
  holes: "c₀₀ has holes",
  // Baire
  thin: "thin sets",
  hole: "a hole in ℚ",
  // 庖丁 (Chinese edition only; kept for type parity)
  pdTitle: "庖丁解牛 · 《庄子·养生主》",
  pdGap: "有间",
  pdBlade: "无厚",
  pdRoom: "总有余地",
  // UBP
  ball: "a ball",
  someX: "some x blows up",
  // Open mapping
  target: "target y",
  inverse: "T⁻¹ is bounded",
  // Closed graph
  graph: "graph of T",
  bounded: "T is bounded",
  notComplete: "C¹ with the sup norm: not complete",
  slope: "slope",
  // Fourier
  lebesgue: "area under |Dₙ|",
  diverges: "some f: Sₙ f(0) → ∞",
  most: "most f diverge at 0",
  // Hamel
  sheets: "Fₙ = span(b₁ … bₙ)",
  uncountable: "every Hamel basis is uncountable",
  // End card
  pillars: ["uniform boundedness", "open mapping", "closed graph"],
  nextEpisode: "Next episode · ",
  nextTitle: "Weak Convergence",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 26 集",
  title: "三大定理",
  subtitle: "完备性换来的东西",
  fourier1807: "傅里叶 · 1807",
  everyContinuous: "每个连续函数都行？",
  dbr1873: "杜布瓦-雷蒙 · 1873",
  bs1927: "巴拿赫、施泰因豪斯 · 1927",
  neverWritten: "从没写出来",
  completeness: "完备性",
  uniformly: "整体有界？",
  peak: "峰值",
  holes: "c₀₀ 有洞",
  thin: "薄集",
  hole: "ℚ 里的洞",
  pdTitle: "庖丁解牛 · 《庄子·养生主》",
  pdGap: "有间",
  pdBlade: "无厚",
  pdRoom: "总有余地",
  ball: "一个球",
  someX: "某个 x 爆掉",
  target: "目标 y",
  inverse: "T⁻¹ 有界",
  graph: "T 的图像",
  bounded: "T 有界",
  notComplete: "峰值范数下的 C¹：不完备",
  slope: "斜率",
  lebesgue: "|Dₙ| 下的面积",
  diverges: "某个 f：Sₙ f(0) → ∞",
  most: "大多数 f 在 0 处发散",
  sheets: "Fₙ = span(b₁ … bₙ)",
  uncountable: "哈默尔基都是不可数的",
  pillars: ["一致有界", "开映射", "闭图像"],
  nextEpisode: "下一集 · ",
  nextTitle: "弱收敛",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
