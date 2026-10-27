import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 18",
  title: "Rings",
  subtitle: "worlds where you can add and multiply",
  // Cold open
  paris: "Paris, March 1847",
  lame: "Lamé",
  liouville: "Liouville",
  onlyOneWay: "only one way?",
  fromKummer: "from E. Kummer",
  no: "no",
  // Rules
  spreads: "a(b + c) = ab + ac",
  // Clock
  zeroDivisor: "2 × 3 = 0",
  partners: "every number has a partner",
  // Glue
  rule: "x² + 1 = 0",
  becomesI: "x → i",
  // 秦九韶 (Chinese edition only; kept for type parity)
  qinSource: "Qin Jiushao · Shushu Jiuzhang, 1247",
  qinName: "大衍求一术",
  // Breaks
  cantSplit: "can't split",
  ideals: "ideals",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Fields",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 18 集",
  title: "环",
  subtitle: "能加能乘的世界",
  paris: "巴黎，1847 年 3 月",
  lame: "拉梅",
  liouville: "刘维尔",
  onlyOneWay: "只有一种分法？",
  fromKummer: "寄信人：库默尔",
  no: "不是",
  spreads: "a(b + c) = ab + ac",
  zeroDivisor: "2 × 3 = 0",
  partners: "每个数都有伙伴",
  rule: "x² + 1 = 0",
  becomesI: "x → i",
  qinSource: "秦九韶《数书九章》，1247",
  qinName: "大衍求一术",
  cantSplit: "拆不开",
  ideals: "理想",
  nextEpisode: "下一集 · ",
  nextTitle: "域",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
