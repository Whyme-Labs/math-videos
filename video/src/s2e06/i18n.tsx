import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 6",
  title: "Covectors",
  subtitle: "measuring devices",
  // Cold open
  paris: "Paris, 1795",
  basket: "basket",
  prices: "prices",
  kg: "kg",
  g: "g",
  apples: "apples",
  flour: "flour",
  sugar: "sugar",
  bill: "bill: 10.50 F",
  // Measure
  vector: "vector",
  covector: "covector",
  sheets: "sheets crossed",
  // Density
  doubled: "× 2",
  // 量器 (Chinese edition only; kept for type parity)
  qin: "秦 · 统一度量衡",
  edict: "法度量则不壹歉疑者，皆明壹之",
  fangsheng: "商鞅方升 · 公元前 344 年",
  // Dual
  readsFirst: "reads 1st coordinate",
  // Gradient
  hill: "contour map",
  dfLabel: "df",
  climb: "climb",
  perp: "+ “perpendicular”",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Functionals Everywhere",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 6 集",
  title: "余向量",
  subtitle: "会测量的仪器",
  paris: "巴黎，1795 年",
  basket: "篮子",
  prices: "价目",
  kg: "公斤",
  g: "克",
  apples: "苹果",
  flour: "面粉",
  sugar: "糖",
  bill: "账单：10.50 法郎",
  vector: "向量",
  covector: "余向量",
  sheets: "穿过的片数",
  doubled: "× 2",
  qin: "秦 · 统一度量衡",
  edict: "法度量则不壹歉疑者，皆明壹之",
  fangsheng: "商鞅方升 · 公元前 344 年",
  readsFirst: "读出第一个坐标",
  hill: "等高线图",
  dfLabel: "df",
  climb: "升高",
  perp: "+ “垂直”",
  nextEpisode: "下一集 · ",
  nextTitle: "无处不在的泛函",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
