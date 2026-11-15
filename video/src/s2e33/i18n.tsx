import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 33 · Finale",
  title: "Distributions",
  subtitle: "functionals as generalized functions",
  // Cold open
  area: "area",
  noSuch: "no such function",
  measurement: "a measurement",
  // Boxes
  pointwise: "pointwise",
  // Distributions
  testFns: "test functions",
  number: "a number",
  measures: "point masses",
  // Derivative
  everyDeriv: "every derivative exists",
  jump: "jump → spike",
  commute: "lim and d/dx commute",
  // 撞钟 (Chinese edition only; kept for type parity)
  bellTitle: "《礼记·学记》",
  bellQuote: "叩之以小者则小鸣，叩之以大者则大鸣",
  bellSmall: "小叩",
  bellBig: "大叩",
  // Green
  pointSource: "point source",
  response: "response",
  charge: "point charge",
  // Weak
  hats: "hat functions",
  innerProduct: "an inner product",
  error: "error",
  // Montage
  tiles: [
    ["E06", "covectors"],
    ["E16 · E28", "Riesz"],
    ["E25", "Hahn–Banach"],
    ["E32", "Koopman"],
    ["E33", "distributions"],
  ] as [string, string][],
  seasonStory: "Season 2: the story of measurement",
  // End card
  nextEpisode: "Next season · ",
  nextTitle: "Fields Are Vector Spaces",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 33 集 · 季终",
  title: "广义函数",
  subtitle: "作为广义函数的泛函",
  area: "面积",
  noSuch: "没有这样的函数",
  measurement: "一个测量",
  pointwise: "逐点",
  testFns: "试验函数",
  number: "一个数",
  measures: "点质量",
  everyDeriv: "任意阶导数都存在",
  jump: "跳跃 → 尖峰",
  commute: "极限与求导可交换",
  bellTitle: "《礼记·学记》",
  bellQuote: "叩之以小者则小鸣，叩之以大者则大鸣",
  bellSmall: "小叩",
  bellBig: "大叩",
  pointSource: "点源",
  response: "响应",
  charge: "点电荷",
  hats: "帽子函数",
  innerProduct: "一个内积",
  error: "误差",
  tiles: [
    ["E06", "余向量"],
    ["E16 · E28", "里斯"],
    ["E25", "哈恩–巴拿赫"],
    ["E32", "库普曼"],
    ["E33", "广义函数"],
  ],
  seasonStory: "第二季：一个关于测量的故事",
  nextEpisode: "下一季 · ",
  nextTitle: "域是向量空间",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
