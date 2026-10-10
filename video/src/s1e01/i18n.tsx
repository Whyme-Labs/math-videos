import type React from "react";
import { createContext, useContext } from "react";
import type { Locale } from "./narration";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  presents: "presents",
  season: "Season 1 · Episode 1",
  title: "What Is a Number?",
  subtitle: "What do we mean by “number”?",
  tray: ["0.999… = 1 ?", "√2 a number?", "more fractions?"],
  floors: [
    "natural numbers",
    "integers",
    "rationals",
    "reals",
    "complex numbers",
  ],
  // Cold open
  threeQuestions: "Three easy questions.",
  question: (n: number) => `QUESTION ${n}`,
  q2: "Is √2 a number?",
  q3: "More fractions?",
  sayYes: "“= 1”",
  sayNo: "“just short”",
  vsWhole: "vs 1, 2, 3, 4, …",
  // Define three
  headword: "three",
  pos: "(n.)",
  attempts: [
    "the symbol 3",
    "what all trios share",
    "a point on the number line",
    "2 + 1",
  ],
  later: [
    "a name, not the number",
    "Frege & Russell → E14",
    "the real line → E08",
    "zero and “next” → E02",
  ],
  symbolNote: "the symbol changes · the amount doesn’t",
  trioNote: "to spot a trio, you already need 3",
  lineQuestion: "where did the line come from?",
  // Numerals
  names: ["45", "101101₂", "63₇", "XLV", "forty-five"],
  fourTens: "4 tens",
  fiveOnes: "5 ones",
  sixSevens: "6 sevens",
  threeOnes: "3 ones",
  // Ladder
  pairUp: " dots: pair them up",
  pairs: (n: number) => ` → ${n} pairs`,
  theorem: ["Every whole number has ", "exactly one", " base-b name."],
  needs: ["needs division", "needs induction"],
  provedIn: "→ proved in E02, E03",
  // Why it's hard
  needsDefinition: "each one needs a definition",
  forever: "+ ⋯ forever?",
  zoom: (z: string, gap: string) => [`zoom ×${z} · gap to 1 = `, gap],
  limitsTag: "the right tool: limits → E09",
  sqrtTitle: ["Is √2 a ", "number", "?"],
  sqrtTag: "no fraction lands on it → E07, E08",
  fracTitle: ["More ", "fractions", " than whole numbers?"],
  wholeArrow: "whole numbers →",
  fracEndless: "fractions between 0 and 1 alone: endless",
  sameSizeTag: "define “same size” → E11",
  // Matching
  matchTitle: ["Same number, ", "without counting", "?"],
  matched: "✓ nothing left over: equally many",
  numberWords: ["one", "two", "three", "four", "five", "six"],
  countingNote: "counting = matching with number words · ↪ E11, E14",
  // Tower
  towerIntro: [
    "each floor fixes an equation",
    "the floor below ",
    "can’t solve",
    "",
  ],
  target: "target",
  overshoot: "smallest x = 0 already overshoots",
  zAdds: "ℤ adds the negatives",
  qFills: "ℚ fills in the fractions",
  hole: "hole",
  noneSquares: "fractions everywhere, but none squares to 2",
  rFills: "ℝ fills every hole",
  neverNegative: "x² never goes below 0",
  cAdds: "ℂ adds a second direction",
  ledger: "What did we lose?",
  // Build / describe
  build: "BUILD",
  describe: "DESCRIBE",
  or: "or",
  madeOf: "what it’s made of",
  stillKnight: "still a knight",
  describeN: "DESCRIBE ℕ",
  peanoNote: "zero, and “next” (Peano · E02)",
  buildN: "BUILD ℕ",
  vonNeumannNote: "from the empty set (von Neumann · E04)",
  verdict: "A number is anything that behaves like one.",
  // Roadmap
  steps: [
    { title: "Count", detail: "zero and “next”", eps: "E02" },
    { title: "Calculate", detail: "+ and × from scratch", eps: "E03" },
    { title: "Ground", detail: "numbers from sets", eps: "E04" },
    {
      title: "Repair",
      detail: "one master tool, floor by floor",
      eps: "E05–E10",
    },
  ],
  // End card
  nextWord: "next",
  nextEpisode: "Next episode · ",
  nextTitle: "Peano: Zero and “Next”",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  presents: "出品",
  season: "第一季 · 第一集",
  title: "数是什么？",
  subtitle: "我们说的“数”，到底是什么？",
  tray: ["0.999… = 1 ?", "√2 是数吗？", "分数更多吗？"],
  floors: ["自然数", "整数", "有理数", "实数", "复数"],
  threeQuestions: "三个简单的问题。",
  question: (n: number) => `问题 ${n}`,
  q2: "√2 是数吗？",
  q3: "分数更多吗？",
  sayYes: "“等于 1”",
  sayNo: "“差一点”",
  vsWhole: "对比 1, 2, 3, 4, …",
  headword: "三",
  pos: "（名词）",
  attempts: ["符号 3", "所有“三个一组”的共同点", "数轴上的一个点", "2 + 1"],
  later: [
    "只是名字，不是数本身",
    "弗雷格与罗素 → 第 14 集",
    "实数轴 → 第 8 集",
    "零与“下一个” → 第 2 集",
  ],
  symbolNote: "符号在变 · 数量不变",
  trioNote: "要认出“三个一组”，得先知道 3",
  lineQuestion: "这条数轴从哪儿来？",
  names: ["45", "101101₂", "63₇", "XLV", "四十五"],
  fourTens: "4 个十",
  fiveOnes: "5 个一",
  sixSevens: "6 个七",
  threeOnes: "3 个一",
  pairUp: " 个点：两两配对",
  pairs: (n: number) => ` → ${n} 对`,
  theorem: ["每个正整数在任何进制下都", "恰好只有一个", "名字。"],
  needs: ["需要除法", "需要归纳法"],
  provedIn: "→ 第 2、3 集证明",
  needsDefinition: "每个问题都需要一个定义",
  forever: "+ ⋯ 一直加下去？",
  zoom: (z: string, gap: string) => [`放大 ×${z} · 与 1 的差 = `, gap],
  limitsTag: "需要的工具：极限 → 第 9 集",
  sqrtTitle: ["√2 是", "数", "吗？"],
  sqrtTag: "没有分数恰好落在它上面 → 第 7、8 集",
  fracTitle: ["", "分数", "比整数更多吗？"],
  wholeArrow: "整数 →",
  fracEndless: "光是 0 到 1 之间，分数就无穷无尽",
  sameSizeTag: "先定义“一样多” → 第 11 集",
  matchTitle: ["不数数，", "也能比多少", "吗？"],
  matched: "✓ 没有剩下的：一样多",
  numberWords: ["一", "二", "三", "四", "五", "六"],
  countingNote: "数数 = 用数词来配对 · ↪ 第 11、14 集",
  towerIntro: ["每一层都解决一个方程", "这个方程，下一层", "解不了", ""],
  target: "目标",
  overshoot: "最小的 x = 0 也已经超过了",
  zAdds: "ℤ 补上了负数",
  qFills: "ℚ 补上了分数",
  hole: "空洞",
  noneSquares: "到处都是分数，却没有一个平方等于 2",
  rFills: "ℝ 填满了所有空洞",
  neverNegative: "x² 永远不会小于 0",
  cAdds: "ℂ 多了第二个方向",
  ledger: "我们失去了什么？",
  build: "构造",
  describe: "描述",
  or: "还是",
  madeOf: "它由什么做成",
  stillKnight: "照样是马",
  describeN: "描述 ℕ",
  peanoNote: "零，和“下一个”（皮亚诺 · 第 2 集）",
  buildN: "构造 ℕ",
  vonNeumannNote: "从空集出发（冯·诺伊曼 · 第 4 集）",
  verdict: "凡是表现得像数的，就是数。",
  steps: [
    { title: "计数", detail: "零与“下一个”", eps: "第 2 集" },
    { title: "运算", detail: "从零定义 + 和 ×", eps: "第 3 集" },
    { title: "奠基", detail: "用集合造出数", eps: "第 4 集" },
    { title: "修补", detail: "一件工具，一层层修", eps: "第 5–10 集" },
  ],
  nextWord: "下一个",
  nextEpisode: "下一集 · ",
  nextTitle: "皮亚诺：零与“下一个”",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

const LocaleContext = createContext<Locale>("en");

export const LocaleProvider: React.FC<{
  readonly locale: Locale;
  readonly children: React.ReactNode;
}> = ({ locale, children }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

export const useLocale = () => useContext(LocaleContext);
export const useStrings = () => STRINGS[useContext(LocaleContext)];

// Render a scene in a given language (for standalone scene compositions).
export const withLocale = <P extends object>(
  Component: React.FC<P>,
  locale: Locale,
): React.FC<P> => {
  const Wrapped: React.FC<P> = (props) => (
    <LocaleProvider locale={locale}>
      <Component {...props} />
    </LocaleProvider>
  );
  return Wrapped;
};
