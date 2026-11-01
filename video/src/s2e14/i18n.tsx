import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 14",
  title: "Length and Angle Are a Choice",
  subtitle: "inner products",
  // Cold open
  gottingen: "Göttingen, 1908",
  schmidt: "Erhard Schmidt",
  coeffs: "coefficients",
  // Camera
  coordDot: "coordinates · coordinates",
  choice: "inner product = a choice",
  // 墨经 (Chinese edition only; kept for type parity)
  mojing: "《墨经》：圜，一中同长也",
  newRuler: "换一把尺",
  // Cauchy
  overlap: "overlap",
  lengths: "length × length",
  cauchyNames: "Cauchy 1821 · Bunyakovsky 1859 · Schwarz 1885",
  // Norms
  taxi: "taxi",
  round: "round",
  max: "max",
  parallelogram: "parallelogram law",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Unitary Spaces",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 14 集",
  title: "长度与角度是一种选择",
  subtitle: "内积",
  gottingen: "哥廷根，1908 年",
  schmidt: "施密特",
  coeffs: "按系数",
  coordDot: "坐标 · 坐标",
  choice: "内积 = 一种选择",
  mojing: "《墨经》：圜，一中同长也",
  newRuler: "换一把尺",
  overlap: "重叠量",
  lengths: "长度 × 长度",
  cauchyNames: "柯西 1821 · 布尼亚科夫斯基 1859 · 施瓦茨 1885",
  taxi: "出租车",
  round: "圆",
  max: "最大值",
  parallelogram: "平行四边形法则",
  nextEpisode: "下一集 · ",
  nextTitle: "酉空间",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
