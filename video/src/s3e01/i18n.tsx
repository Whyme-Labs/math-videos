import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 3 · Episode 1",
  title: "Fields Are Vector Spaces",
  subtitle: "and dimensions multiply",
  // Cold open
  field: "field?",
  dimsMultiply: "dimensions multiply",
  // Ruler
  countable: "both countable",
  newDirection: "new direction",
  // Degree
  remainder: "remainder",
  // Tower
  basisOfBasis: "a basis of a basis is a basis",
  divides: "divides",
  // Finite
  primePowers: "prime powers",
  noSix: "no field of size 6",
  // 八卦 (Chinese edition only; kept for type parity)
  bgTitle: "《周易·系辞上》",
  bgQuote: "两仪生四象，四象生八卦",
  bgStages: ["两仪 2", "四象 4", "八卦 8"],
  // Norm
  norm: "norm",
  trace: "trace",
  // Construct
  impossible: "impossible",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Modules",
  seriesLine: "Where the Roads Meet · Season 3",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第三季 · 第 1 集",
  title: "域是向量空间",
  subtitle: "而维数相乘",
  field: "域？",
  dimsMultiply: "维数相乘",
  countable: "都可数",
  newDirection: "新方向",
  remainder: "余式",
  basisOfBasis: "基的基还是基",
  divides: "整除",
  primePowers: "素数的幂",
  noSix: "没有 6 个元素的域",
  bgTitle: "《周易·系辞上》",
  bgQuote: "两仪生四象，四象生八卦",
  bgStages: ["两仪 2", "四象 4", "八卦 8"],
  norm: "范数",
  trace: "迹",
  impossible: "不可能",
  nextEpisode: "下一集 · ",
  nextTitle: "模",
  seriesLine: "殊途同归 · 第三季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
