import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 2",
  title: "Zero and “Next”",
  subtitle: "Peano’s five rules for counting",
  // Ancient China aside (Chinese edition only; English kept for type parity)
  ropeSource: "Knotted cords · Book of Changes",
  knotIsNext: "one more knot = next",
  laoziSource: "Tao Te Ching, ch. 42",
  daoChain: ["Tao", "one", "two", "three", "all things"],
  sheng: "begets",
  startWord: "start",
  // Cold open
  rule1: "① a start: 0",
  rule2: "② every number has a next",
  forever: "forever",
  // Broken worlds
  worlds: ["loop", "merge", "ghosts"],
  stuck: "stuck",
  loopNote: "", // Chinese edition: the sexagenary cycle
  // Dedekind's second world: tally marks (EN) or counting rods (ZH)
  rods: false,
  zeroBlank: "",
  // Peano's axioms
  peanoTag: "Giuseppe Peano · 1889",
  axioms: [
    "0 is a number",
    "every n has a next, S(n)",
    "0 is nobody’s next",
    "different n, different next",
    "induction",
  ],
  why: "how?",
  // Dominoes
  allFall: "every domino falls",
  secondTable: "a second table?",
  noSecondTable: "no second table",
  reached: "every number = 0 → next → next → …",
  // Proof
  claim: "Claim: every n ≠ 0 is a next",
  allNumbers: "A = all numbers ∎",
  ghostNote: "0′ is not 0, and nothing comes before it",
  // Dedekind
  dedekindTag: "Richard Dedekind · 1888",
  dots: "dots",
  tallies: "tally marks",
  perfectMatch: "nothing left over · nothing matched twice",
  cupsCallback: "↩ E01 cups and saucers",
  naturals: "the natural numbers",
  // Build or describe
  madeOf: "made of … ?",
  describe: "DESCRIBE",
  build: "BUILD",
  buildNote: "from sets · E04",
  sameN: "same ℕ (Dedekind)",
  // Fine print
  everySet: "P5 checks every set of numbers",
  formulas: "formulas",
  formulaRows: ["n is even", "n is prime", "n > 5"],
  formulaCount: "formulas: you can list them",
  setCount: "sets: too many to list ↩ E12",
  noEnds: "no first, no last",
  callback13: "↩ E13",
  // End card
  nextWord: "next",
  nextEpisode: "Next episode · ",
  nextTitle: "Arithmetic from Scratch",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 2 集",
  title: "零，与“下一个”",
  subtitle: "皮亚诺的五条计数规则",
  ropeSource: "上古结绳而治 ——《周易·系辞下》",
  knotIsNext: "多打一个结 = 下一个",
  laoziSource: "《道德经》第四十二章",
  daoChain: ["道", "一", "二", "三", "万物"],
  sheng: "生",
  startWord: "起点",
  rule1: "① 一个起点：0",
  rule2: "② 每个数都有下一个",
  forever: "一直数下去",
  worlds: ["循环", "合流", "幽灵"],
  stuck: "卡住了",
  loopNote: "甲子 → 乙丑 → … → 癸亥 → 甲子",
  rods: true,
  zeroBlank: "空位 = 零",
  peanoTag: "皮亚诺 · 1889",
  axioms: [
    "0 是一个数",
    "每个 n 都有下一个 S(n)",
    "0 不是谁的下一个",
    "不同的数，下一个不同",
    "归纳",
  ],
  why: "怎么做到？",
  allFall: "所有骨牌都倒下",
  secondTable: "第二张桌子？",
  noSecondTable: "没有第二张桌子",
  reached: "每个数 = 0 → 下一个 → 下一个 → …",
  claim: "命题：每个 n ≠ 0 都是某个数的下一个",
  allNumbers: "A = 所有的数 ∎",
  ghostNote: "0′ 不是 0，前面也没有任何数",
  dedekindTag: "戴德金 · 1888",
  dots: "圆点",
  tallies: "算筹",
  perfectMatch: "没有剩下 · 没有重复",
  cupsCallback: "↩ 第 1 集 杯子和碟子",
  naturals: "自然数",
  madeOf: "由什么做成？",
  describe: "描述",
  build: "构造",
  buildNote: "用集合 · 第 4 集",
  sameN: "同一个 ℕ（戴德金）",
  everySet: "P5 检查所有数的集合",
  formulas: "公式",
  formulaRows: ["n 是偶数", "n 是质数", "n > 5"],
  formulaCount: "公式：可以排成一列",
  setCount: "集合：多到排不成一列 ↩ 第 12 集",
  noEnds: "没有头，也没有尾",
  callback13: "↩ 第 13 集",
  nextWord: "下一个",
  nextEpisode: "下一集 · ",
  nextTitle: "从零开始的算术",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
