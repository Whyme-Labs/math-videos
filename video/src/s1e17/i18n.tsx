import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 17",
  title: "Homomorphisms",
  subtitle: "when are two groups the same?",
  // Cold open
  samePattern: "same pattern",
  question: "the same?",
  // Same
  iso: "isomorphism",
  rect: "rectangle",
  steps: (n: number) => `home in ${n}`,
  // Forget
  addThenMap: "add, then convert",
  mapThenAdd: "convert, then add",
  hom: "homomorphism",
  kernel: "kernel",
  // Lanes
  coset: "coset",
  lagrange: "3 divides 12",
  // Collapse
  firstIso: "homomorphism = collapse + relabel",
  // 孙子算经 (Chinese edition only; kept for type parity)
  sunziSource: "Sunzi Suanjing",
  quote: [
    "今有物不知其数",
    "三三数之剩二",
    "五五数之剩三",
    "七七数之剩二",
    "问物几何",
  ],
  answer: "23",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Rings",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 17 集",
  title: "同态",
  subtitle: "两个群什么时候一样？",
  samePattern: "同样的规律",
  question: "一样吗？",
  iso: "同构",
  rect: "长方形",
  steps: (n: number) => `${n} 步回家`,
  addThenMap: "先加再换算",
  mapThenAdd: "先换算再加",
  hom: "同态",
  kernel: "核",
  coset: "陪集",
  lagrange: "3 整除 12",
  firstIso: "同态 = 压扁 + 改标签",
  sunziSource: "《孙子算经》",
  quote: [
    "今有物不知其数",
    "三三数之剩二",
    "五五数之剩三",
    "七七数之剩二",
    "问物几何",
  ],
  answer: "二十三",
  nextEpisode: "下一集 · ",
  nextTitle: "环",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
