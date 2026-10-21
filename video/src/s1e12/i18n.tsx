import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 12",
  title: "The Diagonal Argument",
  subtitle: "the crowd that doesn't fit",
  // Cold open
  sign: "NO CROWD TOO LARGE",
  room: "room",
  noRoom: "no room",
  // Diagonal
  rule: "5 → 4, anything else → 5",
  differs: "differs from every row",
  sameName: "same point, two names",
  shuffle: "shuffle",
  // Parties
  party: (n: number) => `${n}'s party`,
  invites: "invites",
  selfless: "didn't invite themselves",
  whose: "whose party?",
  nobody: "nobody's",
  // 矛盾 (Chinese edition only; kept for type parity)
  hanfei: "Han Feizi",
  quote: ["以子之矛", "陷子之盾", "何如"],
  // Costumes
  sets: "sets",
  sentences: "sentences",
  programs: "programs",
  russell: "Russell, 1901",
  liar: "the Liar",
  turing: "Turing, 1936",
  halts: "halts",
  loops: "loops",
  trueWord: "true",
  falseWord: "false",
  // Unnamed
  named: "everything anyone can name",
  unnamed: "everything else",
  // End card
  sizes: "infinities come in sizes",
  nextEpisode: "Next episode · ",
  nextTitle: "Counting Past Infinity",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 12 集",
  title: "对角线论证",
  subtitle: "住不下的那一群人",
  sign: "来多少人都住得下",
  room: "房",
  noRoom: "没有房间",
  rule: "5 → 4，其他 → 5",
  differs: "和每一行都不同",
  sameName: "同一个点，两个名字",
  shuffle: "重排",
  party: (n: number) => `${n} 号的派对`,
  invites: "邀请",
  selfless: "没邀请自己的人",
  whose: "谁的派对？",
  nobody: "谁的都不是",
  hanfei: "《韩非子·难一》",
  quote: ["以子之矛", "陷子之盾", "何如"],
  sets: "集合",
  sentences: "句子",
  programs: "程序",
  russell: "罗素，1901",
  liar: "说谎者悖论",
  turing: "图灵，1936",
  halts: "停",
  loops: "不停",
  trueWord: "真",
  falseWord: "假",
  named: "能叫出名字的数",
  unnamed: "其余所有的数",
  sizes: "无穷有大小",
  nextEpisode: "下一集 · ",
  nextTitle: "数过无穷",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
