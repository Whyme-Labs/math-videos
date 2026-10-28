import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 20 · Finale",
  title: "Galois",
  subtitle: "the symmetry of roots",
  // Cold open
  paris: "Paris, 29 May 1832",
  galois: "Galois",
  dear: "Mon cher ami,",
  noTime: "Je n'ai pas le temps.",
  noTimeGloss: "I have no time.",
  quintic: "x⁵ = ?",
  // Swap
  sum: "sum",
  product: "product",
  difference: "difference",
  quadFormula: "x = (6 ± √4) / 2",
  // 秦九韶 (Chinese edition only; kept for type parity)
  qinBook: "秦九韶《数书九章》，1247",
  qinProblem: "遥度圆城",
  tenth: "十次方程",
  answer: "城径九里",
  numeric: "数值 ✓",
  formula: "公式 ?",
  // Group
  groupWord: "its group",
  ladderLabels: ["degree 2", "degree 3", "degree 4"],
  // Quintic
  commutator: "(a b c) = [(a b d), (a c e)]",
  jam: "stuck at 60",
  poly: "x⁵ − 4x + 2",
  shuffles: "120 shuffles",
  noFormula: "no formula",
  // Tower
  floors: ["counting", "a ring", "a field", "complete", "closed"],
  answerLine: "a number is whatever behaves like one",
  // End card
  journal: "Journal de Liouville, 1846",
  seasonTwo: "Season 2",
  nextEpisode: "Next · ",
  nextTitle: "Anything You Can Add and Scale",
  seriesLine: "What Is a Number? · Season 1 · Finale",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 20 集 · 终章",
  title: "伽罗瓦",
  subtitle: "根的对称",
  paris: "巴黎，1832 年 5 月 29 日",
  galois: "伽罗瓦",
  dear: "Mon cher ami,",
  noTime: "Je n'ai pas le temps.",
  noTimeGloss: "我没有时间了。",
  quintic: "x⁵ = ?",
  sum: "和",
  product: "积",
  difference: "差",
  quadFormula: "x = (6 ± √4) / 2",
  qinBook: "秦九韶《数书九章》，1247",
  qinProblem: "遥度圆城",
  tenth: "十次方程",
  answer: "城径九里",
  numeric: "数值 ✓",
  formula: "公式 ?",
  groupWord: "它的群",
  ladderLabels: ["二次", "三次", "四次"],
  commutator: "(a b c) = [(a b d), (a c e)]",
  jam: "卡在 60",
  poly: "x⁵ − 4x + 2",
  shuffles: "120 种排列",
  noFormula: "没有公式",
  floors: ["能数", "环", "域", "完备", "封闭"],
  answerLine: "表现得像数的，就是数",
  journal: "《刘维尔杂志》，1846",
  seasonTwo: "第二季",
  nextEpisode: "下一集 · ",
  nextTitle: "能相加、能伸缩的一切",
  seriesLine: "数是什么？ · 第一季 · 终章",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
