import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Pairs and formulas ((3, 5), a + d = b + c, …) are the same in both
// languages and live in the scenes.
const EN = {
  season: "Season 1 · Episode 6",
  title: "Subtraction and Division",
  subtitle: "building ℤ and ℚ from pairs",
  // Cold open
  noAnswer: "no answer in ℕ",
  invented: "invented",
  built: "built",
  // ℤ
  same: "same answer",
  onlyPlus: "only uses +",
  theLine: "the integer −2",
  // Arithmetic
  sameLine: "same line",
  opposite: "every integer has an opposite",
  // −1 · −1
  distributive: "distributive law",
  forced: "forced",
  // 正负术 (Chinese edition only; kept for type parity)
  zfSource: "Nine Chapters · Fangcheng",
  zfRule: ["同名相除", "异名相益"],
  liuHui: "Liu Hui’s commentary",
  liuQuote: "正算赤，负算黑",
  positive: "positive",
  negative: "negative",
  rulesWritten: "rules written down",
  rulesProved: "rules proved",
  // ℚ
  noIntAnswer: "no answer in ℤ",
  zeroRowOut: "q = 0 is left out",
  allGlued: "everything glued",
  inverse: "inverse",
  // Mediant
  mediantName: "add tops, add bottoms",
  notWellDefined: "not well defined",
  // Ledger
  ring: "ring",
  field: "field",
  ringOps: "+ − ×",
  fieldOps: "+ − × ÷",
  lost: "lost",
  lostZ: "a smallest number",
  lostQ: "a next number",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Holes in ℚ",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 6 集",
  title: "减法与除法",
  subtitle: "用数对造出 ℤ 和 ℚ",
  noAnswer: "在 ℕ 里没有答案",
  invented: "发明",
  built: "造出来",
  same: "答案一样",
  onlyPlus: "只用加法",
  theLine: "整数 −2",
  sameLine: "同一条线",
  opposite: "每个整数都有相反数",
  distributive: "分配律",
  forced: "只能如此",
  zfSource: "《九章算术》方程章",
  zfRule: ["同名相除", "异名相益"],
  liuHui: "刘徽注",
  liuQuote: "正算赤，负算黑",
  positive: "正",
  negative: "负",
  rulesWritten: "写下规则",
  rulesProved: "证明规则",
  noIntAnswer: "在 ℤ 里没有答案",
  zeroRowOut: "q = 0 不准进来",
  allGlued: "全粘成一条",
  inverse: "倒数",
  mediantName: "分子加分子，分母加分母",
  notWellDefined: "不是良定义",
  ring: "环",
  field: "域",
  ringOps: "+ − ×",
  fieldOps: "+ − × ÷",
  lost: "失去",
  lostZ: "最小的数",
  lostQ: "“下一个”数",
  nextEpisode: "下一集 · ",
  nextTitle: "ℚ 里的洞",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
