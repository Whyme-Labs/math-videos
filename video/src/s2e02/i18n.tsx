import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 2",
  title: "Basis and Dimension",
  subtitle: "how many ingredients a space needs",
  // Cold open
  london: "London, 1861",
  maxwell: "Maxwell",
  three: "3?",
  // Span
  span: "span",
  redundant: "redundant",
  // 五色 (Chinese edition only; kept for type parity)
  kaogong: "《周礼·考工记》",
  wuse: ["青", "赤", "黄", "白", "黑"],
  dependent: "线性相关",
  // Exchange
  basis: "basis",
  spans: "still makes everything",
  // Language
  dimension: "dimension",
  sameArrow: "same arrow",
  // Infinite
  never: "never enough",
  choice: "axiom of choice",
  rOverQ: "ℝ over ℚ",
  // End card
  recap: ["span", "independence", "basis", "dimension"],
  nextEpisode: "Next episode · ",
  nextTitle: "Linear Maps",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 2 集",
  title: "基与维数",
  subtitle: "一个空间需要几种原料",
  london: "伦敦，1861 年",
  maxwell: "麦克斯韦",
  three: "3？",
  span: "张成",
  redundant: "多余",
  kaogong: "《周礼·考工记》",
  wuse: ["青", "赤", "黄", "白", "黑"],
  dependent: "线性相关",
  basis: "基",
  spans: "照样什么都能配",
  dimension: "维数",
  sameArrow: "同一支箭头",
  never: "永远不够",
  choice: "选择公理",
  rOverQ: "ℝ 对 ℚ",
  recap: ["张成", "无关", "基", "维数"],
  nextEpisode: "下一集 · ",
  nextTitle: "线性映射",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
