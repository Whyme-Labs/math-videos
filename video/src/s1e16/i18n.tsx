import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 16",
  title: "Groups",
  subtitle: "the rules behind symmetry",
  // Cold open
  which: "which move?",
  eight: "8 moves",
  scrambles: "43,252,003,274,489,856,000 scrambles",
  sameRules: "the same rules?",
  // Rules
  ruleNames: [
    "a move, then a move, is a move",
    "doing nothing is a move",
    "every move can be undone",
    "grouping doesn't matter",
  ],
  group: "a group",
  // Fails
  noNegatives: "no −3 here",
  integers: "episode 6: the integers",
  // Order
  flipThenTurn: "flip, then turn",
  turnThenFlip: "turn, then flip",
  socks: "socks",
  shoes: "shoes",
  on: "on",
  off: "off",
  // 洛书 (Chinese edition only; kept for type parity)
  luoshuSource: "Da Dai Li Ji · Ming Tang",
  luoshuQuote: "二九四，七五三，六一八",
  // Counting
  home: "home",
  never: "never back",
  // End card
  same: "the same group?",
  nextEpisode: "Next episode · ",
  nextTitle: "Homomorphisms",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 16 集",
  title: "群",
  subtitle: "对称背后的规则",
  which: "哪个动作？",
  eight: "8 个动作",
  scrambles: "43 252 003 274 489 856 000 种打乱",
  sameRules: "同样的规则？",
  ruleNames: [
    "动作接动作，还是动作",
    "不动也算一个动作",
    "每个动作都能撤销",
    "怎么分组都一样",
  ],
  group: "群",
  noNegatives: "这里没有 −3",
  integers: "第六集：整数",
  flipThenTurn: "先翻再转",
  turnThenFlip: "先转再翻",
  socks: "袜子",
  shoes: "鞋",
  on: "穿",
  off: "脱",
  luoshuSource: "《大戴礼记·明堂》",
  luoshuQuote: "二九四，七五三，六一八",
  home: "回家",
  never: "回不来",
  same: "同一个群？",
  nextEpisode: "下一集 · ",
  nextTitle: "同态",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
