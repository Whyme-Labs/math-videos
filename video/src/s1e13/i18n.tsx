import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 13",
  title: "Counting Past Infinity",
  subtitle: "numbers for positions",
  // Cold open
  taken: "taken",
  last: "last",
  sameSize: "same size",
  newPosition: "new position",
  // Omega
  ordinals: "ordinals",
  // Order
  front: "in front",
  end: "at the end",
  noLast: "no last runner",
  hasLast: "a last runner",
  // 庄子 (Chinese edition only; kept for type parity)
  zhuangziSource: "Zhuangzi · Qi Wu Lun",
  quote: ["有始也者", "有未始有始也者", "有未始有夫未始有始也者"],
  regress: "a beginning before every beginning",
  // Descent
  steps: (n: number) => `${n} steps`,
  bottom: "always reaches the bottom",
  // Goodstein
  game: "the game",
  bump: "swap the base",
  minus: "subtract 1",
  digits: "150+ digits",
  shadow: "with ω",
  kirbyParis: "Kirby & Paris, 1982",
  peano: "Peano's axioms",
  cannotProve: "can't prove it",
  // End card
  jena: "Jena, 1902",
  nextEpisode: "Next episode · ",
  nextTitle: "Russell's Dream",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 13 集",
  title: "数过无穷",
  subtitle: "给位置编号的数",
  taken: "已有人",
  last: "最后一个",
  sameSize: "一样多",
  newPosition: "新的位置",
  ordinals: "序数",
  front: "加在最前面",
  end: "加在最后面",
  noLast: "没有最后一个",
  hasLast: "有了最后一个",
  zhuangziSource: "《庄子·齐物论》",
  quote: ["有始也者", "有未始有始也者", "有未始有夫未始有始也者"],
  regress: "每个开始之前，还有开始",
  steps: (n: number) => `${n} 步`,
  bottom: "总能走到底",
  game: "游戏",
  bump: "换底",
  minus: "减一",
  digits: "超过 150 位",
  shadow: "换成 ω",
  kirbyParis: "柯比与帕里斯，1982",
  peano: "皮亚诺公理",
  cannotProve: "证明不了",
  jena: "耶拿，1902",
  nextEpisode: "下一集 · ",
  nextTitle: "罗素的梦",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
