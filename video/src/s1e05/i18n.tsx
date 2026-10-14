import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Formulas ([a] = [b], p·s = q·r, …) are the same in both languages and
// live in the scenes.
const EN = {
  season: "Season 1 · Episode 5",
  title: "Equivalence Classes",
  subtitle: "the master tool",
  // Cold open
  asAmounts: "same amount",
  asWritten: "different pairs",
  oclock: "3 o’clock",
  declared: "declared the same",
  // Relations
  pairs: "pairs",
  reflexive: "reflexive",
  symmetric: "symmetric",
  transitive: "transitive",
  equivalence: "equivalence relation",
  mod3: "same remainder ÷ 3",
  // Close to
  close: "close",
  notClose: "not close",
  notTransitive: "not transitive",
  // Blobs
  mod12: "same remainder ÷ 12",
  eqClass: "equivalence class",
  quotient: "quotient",
  // Sunzi (Chinese edition only; kept for type parity)
  sunziSource: "Sunzi Suanjing",
  sunziTitle: "the unknown count",
  sunziRem: (d: number, r: number) => `÷${d} leaves ${r}`,
  crt: "Qin Jiushao · 1247 · Chinese remainder theorem",
  // Partition
  oneBlob: "one blob",
  partition: "partition",
  identicalOrDisjoint: "identical or disjoint",
  // Well defined
  pick: "pick any members",
  passes: "passes",
  fails: "different blobs",
  wellDefined: "well defined",
  // Fractions
  oneHalf: "one half",
  denomZero: "bottom ≠ 0",
  allGlued: "everything glued",
  // Zoom out
  recipe: ["raw things", "a rule for “same”", "the blobs", "check operations"],
  stamps: ["E06", "E06", "E08", "E17", "E18", "S2E05"],
  // End card
  inN: "in ℕ",
  nextEpisode: "Next episode · ",
  nextTitle: "Subtraction and Division: ℤ and ℚ",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 5 集",
  title: "等价类",
  subtitle: "万能工具",
  asAmounts: "一样多",
  asWritten: "不同的数对",
  oclock: "三点",
  declared: "规定为一样",
  pairs: "数对",
  reflexive: "自反",
  symmetric: "对称",
  transitive: "传递",
  equivalence: "等价关系",
  mod3: "除以 3 余数相同",
  close: "接近",
  notClose: "不接近",
  notTransitive: "没有传递性",
  mod12: "除以 12 余数相同",
  eqClass: "等价类",
  quotient: "商集",
  sunziSource: "《孙子算经》卷下",
  sunziTitle: "物不知数",
  sunziRem: (d: number, r: number) => `${d} 个 ${d} 个数，剩 ${r}`,
  crt: "秦九韶《数书九章》· 1247 · 中国剩余定理",
  oneBlob: "同一团",
  partition: "划分",
  identicalOrDisjoint: "要么相同，要么不交",
  pick: "随便挑成员",
  passes: "过关",
  fails: "落在不同的团",
  wellDefined: "良定义",
  oneHalf: "二分之一",
  denomZero: "分母 ≠ 0",
  allGlued: "全粘成一团",
  recipe: ["原始的东西", "“一样”的规则", "分成团", "检查运算"],
  stamps: [
    "第 6 集",
    "第 6 集",
    "第 8 集",
    "第 17 集",
    "第 18 集",
    "第二季 第 5 集",
  ],
  inN: "在 ℕ 里",
  nextEpisode: "下一集 · ",
  nextTitle: "减法与除法：整数和有理数",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
