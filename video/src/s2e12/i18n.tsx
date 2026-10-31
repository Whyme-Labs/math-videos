import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 12",
  title: "Eigenvectors",
  subtitle: "the map's own coordinates",
  // Cold open
  pisa: "Pisa, 1202",
  leonardo: "Leonardo of Pisa",
  month: "month",
  pairs: "pairs",
  binet: "Binet, 1843",
  // Lines
  stretch5: "× 5",
  stretch2: "× 2",
  // Charpoly
  traceLabel: "trace 7 = 5 + 2",
  detLabel: "det 10 = 5 × 2",
  // Rotation
  noReal: "no real eigenvector",
  complex: "over ℂ: two",
  // 杨辉三角 (Chinese edition only; kept for type parity)
  yanghui: "杨辉《详解九章算法》 · 1261",
  // Fibonacci
  ratio: "ratio",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "When Diagonalization Fails",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 12 集",
  title: "特征向量",
  subtitle: "映射自己的坐标",
  pisa: "比萨，1202 年",
  leonardo: "比萨的列奥纳多",
  month: "月",
  pairs: "对",
  binet: "比内，1843 年",
  stretch5: "× 5",
  stretch2: "× 2",
  traceLabel: "迹 7 = 5 + 2",
  detLabel: "行列式 10 = 5 × 2",
  noReal: "没有实特征向量",
  complex: "在 ℂ 上：两个",
  yanghui: "杨辉《详解九章算法》 · 1261",
  ratio: "比值",
  nextEpisode: "下一集 · ",
  nextTitle: "对角化失灵的时候",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
