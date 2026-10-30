import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 7",
  title: "Functionals Everywhere",
  subtitle: "measuring functions",
  // Cold open
  linz: "Linz, 1613",
  kepler: "Kepler",
  merchant: "merchant",
  book: "Nova stereometria doliorum vinariorum, 1615",
  exact: "exact",
  // Probes
  value: "value at 0",
  slope: "slope at 1",
  area: "area",
  // Coords
  valueProbes: "values at 0, 1, 2",
  taylorProbes: "value, slope, curvature ÷ 2 at 0",
  // Lagrange
  partners: "partners",
  // 刘焯 (Chinese edition only; kept for type parity)
  liuzhuo: "隋 · 刘焯《皇极历》 · 公元 600 年",
  sun: "日",
  moon: "月",
  // Simpson
  probesSum: "probes",
  areaMeter: "area",
  blind: "both blind",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Transpose and the Double Dual",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 7 集",
  title: "无处不在的泛函",
  subtitle: "给函数做测量",
  linz: "林茨，1613 年",
  kepler: "开普勒",
  merchant: "酒商",
  book: "《酒桶的新立体几何》，1615 年",
  exact: "精确",
  value: "0 处的值",
  slope: "1 处的斜率",
  area: "面积",
  valueProbes: "0、1、2 处的值",
  taylorProbes: "0 处的值、斜率、曲率 ÷ 2",
  partners: "搭档",
  liuzhuo: "隋 · 刘焯《皇极历》 · 公元 600 年",
  sun: "日",
  moon: "月",
  probesSum: "探针",
  areaMeter: "面积",
  blind: "都看不见",
  nextEpisode: "下一集 · ",
  nextTitle: "转置与双重对偶",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
