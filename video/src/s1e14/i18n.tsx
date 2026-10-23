import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 14",
  title: "Russell's Dream",
  subtitle: "is mathematics just logic?",
  // Cold open
  jena: "Jena, June 1902",
  twentyYears: "20 years",
  volume2: "Vol. II",
  fromRussell: "from B. Russell",
  notInItself: "not in itself",
  totters: "arithmetic totters",
  // Dream
  onlyLogic: "only logic",
  asMany: "as many",
  everyPair: "every pair",
  // Crack
  rule: "every property → a set",
  props: ["is a cup", "is a star", "is a shoe"],
  cups: "cups",
  impossible: "can't exist",
  // 墨经 (Chinese edition only; kept for type parity)
  mojingSource: "Mozi · Jing Xia",
  quote: ["以言为尽悖", "悖", "说在其言"],
  sign: "All sayings are false",
  bei: "self-defeating",
  self: "itself",
  // Floors
  floor: (n: number) => `floor ${n}`,
  cantAsk: "can't be asked",
  infinitelyMany: "assumed: infinitely many things",
  // Principia
  vol: (n: number) => `Vol. ${"I".repeat(n)}`,
  useful: "The above proposition is occasionally useful.",
  // End card
  typeError: "type error",
  checked: "checked",
  konigsberg: "Königsberg, 1930",
  nextEpisode: "Next episode · ",
  nextTitle: "The Limits of the Axioms",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 14 集",
  title: "罗素的梦",
  subtitle: "数学只是逻辑吗？",
  jena: "耶拿，1902 年 6 月",
  twentyYears: "二十年",
  volume2: "第二卷",
  fromRussell: "寄信人：罗素",
  notInItself: "不属于自己",
  totters: "算术在摇晃",
  onlyLogic: "只用逻辑",
  asMany: "一样多",
  everyPair: "所有的一对",
  rule: "每个性质 → 一个集合",
  props: ["是杯子", "是星星", "是鞋"],
  cups: "杯子",
  impossible: "不可能存在",
  mojingSource: "《墨子·经下》",
  quote: ["以言为尽悖", "悖", "说在其言"],
  sign: "所有的话都是错的",
  bei: "悖",
  self: "自己",
  floor: (n: number) => `${n} 层`,
  cantAsk: "问不出口",
  infinitelyMany: "假设：东西有无穷多",
  vol: (n: number) => `第${["一", "二", "三"][n - 1]}卷`,
  useful: "上面这个命题偶尔有用。",
  typeError: "类型错误",
  checked: "已验证",
  konigsberg: "柯尼斯堡，1930",
  nextEpisode: "下一集 · ",
  nextTitle: "公理的尽头",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
