import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Sets, sequences and formulas are the same in both languages and live in
// the scenes.
const EN = {
  season: "Season 1 · Episode 8",
  title: "Building ℝ, Twice",
  subtitle: "a knife and a swarm",
  // Cold open
  newHoles: "new holes keep appearing",
  knife: "a cut",
  swarm: "a swarm",
  // Cut
  noMax: "no largest member",
  noEdge: "no fraction at the edge",
  isRoot2: "this set is ",
  rationalCut: "every fraction below r",
  // Sup
  inside: "inside",
  union: "union = least upper bound",
  complete: "no holes",
  signs: "× needs a case for each pair of signs",
  // Swarm
  decimals: "decimals",
  babylonian: "Babylonian",
  gap: "gap",
  glue: "glue: same limit",
  termwise: "term by term",
  // 刘徽割圆术 (Chinese edition only; kept for type parity)
  liuSource: "Liu Hui · commentary on the Nine Chapters",
  quote: [
    "割之弥细",
    "所失弥少",
    "割之又割",
    "以至于不可割",
    "则与圆周合体",
    "而无所失矣",
  ],
  sides: (n: number) => `${n} sides`,
  piApprox: "π ≈ 3.14",
  // Same
  setOfFractions: "a set of fractions",
  classOfSequences: "a class of sequences",
  cutsLine: "cuts",
  cauchyLine: "classes of sequences",
  cof: "the complete ordered field",
  // Tower
  lost: "lost",
  finiteName: "a finite name for every number",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "0.999… = 1, and What Decimals Really Are",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 8 集",
  title: "两次造出 ℝ",
  subtitle: "一把刀，一群点",
  newHoles: "新的洞不断出现",
  knife: "切口",
  swarm: "点群",
  noMax: "没有最大的成员",
  noEdge: "边上没有分数",
  isRoot2: "这个集合就是 ",
  rationalCut: "所有比 r 小的分数",
  inside: "包含于",
  union: "并集 = 最小上界",
  complete: "没有洞",
  signs: "乘法要按正负号分情况",
  decimals: "小数截断",
  babylonian: "巴比伦迭代",
  gap: "差距",
  glue: "粘合：极限相同",
  termwise: "逐项相乘",
  liuSource: "刘徽注《九章算术》",
  quote: [
    "割之弥细",
    "所失弥少",
    "割之又割",
    "以至于不可割",
    "则与圆周合体",
    "而无所失矣",
  ],
  sides: (n: number) => `${n} 边形`,
  piApprox: "π ≈ 3.14",
  setOfFractions: "一个分数集合",
  classOfSequences: "一类数列",
  cutsLine: "切口",
  cauchyLine: "数列的类",
  cof: "完备有序域",
  lost: "失去",
  finiteName: "每个数都有有限长的名字",
  nextEpisode: "下一集 · ",
  nextTitle: "0.999… = 1：小数到底是什么",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
