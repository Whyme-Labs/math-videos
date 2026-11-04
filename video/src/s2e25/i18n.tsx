import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 25",
  title: "The Hahn–Banach Theorem",
  subtitle: "there are enough measurements",
  // Cold open
  noLimit: "no limit",
  everyBounded: "every bounded sequence",
  banach1932: "Stefan Banach · 1932",
  exists: "it exists",
  enough: "enough measurements",
  // Naive
  onM: "f on M",
  hamel: "Hamel basis",
  sameNorm: "‖F‖ = ‖f‖",
  // Extend
  gap: "never empty",
  // Zorn
  maximal: "maximal",
  choice: "Axiom of Choice",
  // Corollaries
  reads: "reads",
  // Separation
  convex: "convex",
  notConvex: "not convex",
  margin: "margin",
  feasible: "feasible",
  // 鸿沟 (Chinese edition only; kept for type parity)
  hgTitle: "鸿沟 · 公元前 203 年",
  han: "汉",
  chu: "楚",
  canal: "鸿沟",
  quote: "“中分天下，割鸿沟以西者为汉，鸿沟而东者为楚。”",
  source: "《史记·项羽本纪》",
  hgGap: "凸集之间，总有一条鸿沟",
  // Banach limit
  averages: "averages",
  convergent: "convergent",
  bounded: "bounded",
  noFormula: "no formula",
  // End card
  bigThree: ["uniform boundedness", "open mapping", "closed graph"],
  nextEpisode: "Next episode · ",
  nextTitle: "The Big Three Theorems",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 25 集",
  title: "哈恩–巴拿赫定理",
  subtitle: "测量永远够用",
  noLimit: "没有极限",
  everyBounded: "每个有界数列",
  banach1932: "斯特凡·巴拿赫 · 1932",
  exists: "它存在",
  enough: "测量够用",
  onM: "M 上的 f",
  hamel: "哈默尔基",
  sameNorm: "‖F‖ = ‖f‖",
  gap: "永远不空",
  maximal: "最大",
  choice: "选择公理",
  reads: "读数",
  convex: "凸",
  notConvex: "不凸",
  margin: "间隔",
  feasible: "可行域",
  hgTitle: "鸿沟 · 公元前 203 年",
  han: "汉",
  chu: "楚",
  canal: "鸿沟",
  quote: "“中分天下，割鸿沟以西者为汉，鸿沟而东者为楚。”",
  source: "《史记·项羽本纪》",
  hgGap: "凸集之间，总有一条鸿沟",
  averages: "平均值",
  convergent: "收敛",
  bounded: "有界",
  noFormula: "没有公式",
  bigThree: ["一致有界", "开映射", "闭图像"],
  nextEpisode: "下一集 · ",
  nextTitle: "三大定理",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
