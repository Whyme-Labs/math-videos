import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Formulas (a + 0 = a, S(a + b), …) are the same in both languages and live
// in the scenes.
const EN = {
  season: "Season 1 · Episode 3",
  title: "Arithmetic from Scratch",
  subtitle: "plus and times, from “next” alone",
  // Chinese edition only: the Qin multiplication table (kept for type parity)
  liyeSource: "Liye slips · Qin dynasty",
  jiujiu: [
    "九九八十一",
    "八九七十二",
    "七九六十三",
    "六九五十四",
    "五九四十五",
    "四九卅六",
    "三九廿七",
    "二九十八",
  ],
  fromNext: "from “next” alone?",
  // Cold open
  nextWord: "next",
  proof: "proof?",
  // Addition
  peel: "peel one S",
  secondNumber: "the second number",
  // Lopsided
  oneStep: "1 step",
  threeSteps: "3 steps",
  sameAnswer: "same answer, different work",
  // Commutativity
  lemma1: "Lemma 1",
  lemma2: "Lemma 2",
  theorem: "Theorem",
  needs: "needs",
  everyPair: "for every a and b",
  // Cancellation
  p4Needed: "P4 needed here",
  mergeWorld: "merge world ↩ E02",
  // Times
  rowsOf: (rows: number, each: number) => `${rows} rows of ${each}`,
  hint: "picture = hint · proof = induction",
  // Order
  noJump: "no c works",
  // Payoff
  allTheorems: "all theorems",
  missing: "missing:",
  callback6: "→ ℤ · E06",
  // End card
  madeOf: "made of … ?",
  nextEpisode: "Next episode · ",
  nextTitle: "Sets: The Universal Building Material",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 3 集",
  title: "从零开始的算术",
  subtitle: "只用“下一个”，造出加法和乘法",
  liyeSource: "里耶秦简 · 九九表（秦代）",
  jiujiu: [
    "九九八十一",
    "八九七十二",
    "七九六十三",
    "六九五十四",
    "五九四十五",
    "四九卅六",
    "三九廿七",
    "二九十八",
  ],
  fromNext: "只从“下一个”推得出来吗？",
  nextWord: "下一个",
  proof: "证明？",
  peel: "剥一层 S",
  secondNumber: "第二个数",
  oneStep: "1 步",
  threeSteps: "3 步",
  sameAnswer: "答案一样，功夫不同",
  lemma1: "引理 1",
  lemma2: "引理 2",
  theorem: "定理",
  needs: "需要",
  everyPair: "对任何 a 和 b",
  p4Needed: "这里要用 P4",
  mergeWorld: "合流世界 ↩ 第 2 集",
  rowsOf: (rows: number, each: number) => `${rows} 行，每行 ${each} 个`,
  hint: "图 = 提示 · 证明 = 归纳",
  noJump: "找不到这样的 c",
  allTheorems: "全是定理",
  missing: "缺了：",
  callback6: "→ ℤ · 第 6 集",
  madeOf: "由什么做成？",
  nextEpisode: "下一集 · ",
  nextTitle: "集合：万物的积木",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
