import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Set notation ({∅}, x ∪ {x}, R ∈ R, …) is the same in both languages and
// lives in the scenes.
const EN = {
  season: "Season 1 · Episode 4",
  title: "Sets: The Building Material",
  subtitle: "numbers built from nothing",
  // Cold open
  whatIsTwo: "2 = ?",
  // Russell
  anyProperty: "any property → a set",
  isEven: "is even",
  allSets: "all sets",
  notSelf: "doesn’t contain itself",
  russellTag: "Bertrand Russell · 1901",
  fregeTag: "letter to Frege · 1902",
  // Mohist (Chinese edition only; kept for type parity)
  mohistSource: "Mohist Canon · Canon B",
  mohistText: ["以言为尽悖", "悖", "说在其言"],
  allFalse: "“every statement is false”",
  selfDefeating: "self-defeating",
  // ZF
  tools: [
    "empty set",
    "pairing",
    "union",
    "power set",
    "separation",
    "infinity",
  ],
  onlyCarve: "only carve from a set you have",
  zfTag: "ZF · Zermelo, Fraenkel",
  landsOutside: "lands outside A",
  noSetOfAll: "no set of all sets",
  // von Neumann
  vnTag: "von Neumann · 1923",
  elements: (n: number) => (n === 1 ? "1 element" : `${n} elements`),
  peanoHolds: "all five Peano rules hold",
  // Zermelo
  zermeloTag: "Zermelo · 1908",
  vnShort: "von Neumann",
  zShort: "Zermelo",
  // Benacerraf
  benacerrafTag: "Paul Benacerraf · 1965",
  realThree: "which is the real 3?",
  sameArithmetic: "same arithmetic",
  position: "after 2, before 4",
  // End card
  same: "same?",
  nextEpisode: "Next episode · ",
  nextTitle: "The Master Tool: Equivalence Classes",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 4 集",
  title: "集合：万物的积木",
  subtitle: "从无中造出数",
  whatIsTwo: "2 = ?",
  anyProperty: "任何性质 → 一个集合",
  isEven: "是偶数",
  allSets: "所有集合",
  notSelf: "不包含自己",
  russellTag: "罗素 · 1901",
  fregeTag: "致弗雷格的信 · 1902",
  mohistSource: "《墨子·经下》",
  mohistText: ["以言为尽悖", "悖", "说在其言"],
  allFalse: "“所有的话都是假的”",
  selfDefeating: "悖",
  tools: ["空集", "配对", "并集", "幂集", "分离", "无穷"],
  onlyCarve: "只能从已有的集合里切",
  zfTag: "ZF · 策梅洛、弗兰克尔",
  landsOutside: "落在 A 的外面",
  noSetOfAll: "不存在所有集合的集合",
  vnTag: "冯·诺伊曼 · 1923",
  elements: (n: number) => `${n} 个元素`,
  peanoHolds: "皮亚诺五条规则全部成立",
  zermeloTag: "策梅洛 · 1908",
  vnShort: "冯·诺伊曼",
  zShort: "策梅洛",
  benacerrafTag: "贝纳塞拉夫 · 1965",
  realThree: "哪个才是真正的 3？",
  sameArithmetic: "算术完全一样",
  position: "在 2 之后，在 4 之前",
  same: "一样吗？",
  nextEpisode: "下一集 · ",
  nextTitle: "万能工具：等价类",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
