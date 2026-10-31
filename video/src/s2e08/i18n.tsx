import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 8",
  title: "The Transpose and the Double Dual",
  subtitle: "measuring after mapping",
  // Cold open
  annArbor: "Ann Arbor, 1941",
  eilenberg: "Eilenberg",
  maclane: "Mac Lane",
  naturalQ: "natural?",
  paper: "General Theory of Natural Equivalences, 1945",
  // Pullback
  sameCount: "same count",
  // 璇玑图 (Chinese edition only; kept for type parity)
  xuanjiTitle: "前秦 · 苏蕙《璇玑图》",
  xuanjiCount: "29 × 29 = 841 字",
  byRows: "横读",
  byCols: "竖读",
  // Rank
  colRank: "column rank 2",
  rowRank: "row rank 2",
  // Double dual
  noBasis: "no basis chosen",
  // Natural
  choice: "needs a choice",
  natural: "natural",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Bilinear Forms",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 8 集",
  title: "转置与双重对偶",
  subtitle: "先映射，再测量",
  annArbor: "安娜堡，1941 年",
  eilenberg: "艾伦伯格",
  maclane: "麦克莱恩",
  naturalQ: "自然？",
  paper: "《自然等价的一般理论》，1945 年",
  sameCount: "片数相同",
  xuanjiTitle: "前秦 · 苏蕙《璇玑图》",
  xuanjiCount: "29 × 29 = 841 字",
  byRows: "横读",
  byCols: "竖读",
  colRank: "列秩 2",
  rowRank: "行秩 2",
  noBasis: "不用选基",
  choice: "要选基",
  natural: "自然",
  nextEpisode: "下一集 · ",
  nextTitle: "双线性型",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
