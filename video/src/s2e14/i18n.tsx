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
  overlap: "overlap",
  // Coordinates
  coordDot: "coordinates · coordinates",
  protractor: "protractor",
  // Axioms
  rules: ["linear", "symmetric", "positive"],
  innerProduct: "inner product",
  // Bowl
  bowl: "x² + y²: a bowl",
  saddle: "x² − y²: a saddle",
  ruledOut: "not an inner product",
  // Inside
  fromInside: "from inside: the dot product",
  // Cauchy
  cauchyNames: "Cauchy 1821 · Bunyakovsky 1859 · Schwarz 1885",
  // 墨经 (Chinese edition only; kept for type parity)
  mojing: "《墨经》：圜，一中同长也",
  newRuler: "换一把尺",
  // Norms
  taxi: "taxi",
  chess: "chessboard",
  round: "round",
  parallelogram: "parallelogram law",
  diagonals: "diagonals²",
  sides: "2 × sides²",
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
  overlap: "重叠量",
  coordDot: "坐标 · 坐标",
  protractor: "量角器",
  rules: ["线性", "对称", "正定"],
  innerProduct: "内积",
  bowl: "x² + y²：碗",
  saddle: "x² − y²：马鞍",
  ruledOut: "不是内积",
  fromInside: "从里面看：就是点积",
  cauchyNames: "柯西 1821 · 布尼亚科夫斯基 1859 · 施瓦茨 1885",
  mojing: "《墨经》：圜，一中同长也",
  newRuler: "换一把尺",
  taxi: "出租车",
  chess: "棋盘",
  round: "圆",
  parallelogram: "平行四边形法则",
  diagonals: "对角线²",
  sides: "2 × 边²",
  nextEpisode: "下一集 · ",
  nextTitle: "酉空间",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
