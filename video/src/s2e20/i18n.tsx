import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 20",
  title: "What Breaks in Infinite Dimensions",
  subtitle: "Part B begins",
  // Cold open
  freeLunch: "one-to-one ⇒ onto",
  never: "never comes out",
  solvable: " solvable for every b",
  // Ledger
  ledger: "What did we lose?",
  algebra: "algebra + limits",
  losses: [
    "one-to-one ⇒ onto",
    "every map has a biggest stretch",
    "bases give coordinates",
    "the unit ball is compact",
    "eigenvalues exist",
  ],
  repairs: ["S2E30", "S2E21", "S2E23, S2E28", "S2E21, S2E27", "S2E31"],
  // Spaces
  sequences: "sequences",
  functions: "functions on [0, 1]",
  // Shift
  lost: "lost",
  // Wiggle
  height: "height",
  slope: "slope",
  // Hamel
  missing: "still missing",
  // Ball
  sqrt2: "√2 apart",
  never1: "never reaches 1",
  // 墨经 (Chinese edition only; kept for type parity)
  mojing: "《墨经》论穷",
  youqiong: "有穷",
  wuqiong: "无穷",
  // Eigen
  miss: "miss",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Normed Spaces and Bounded Operators",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 20 集",
  title: "无限维里什么会坏掉",
  subtitle: "下篇开始",
  freeLunch: "一对一 ⇒ 满射",
  never: "永远出不来",
  solvable: " 对每个 b 都有解",
  ledger: "我们丢了什么？",
  algebra: "代数 + 极限",
  losses: [
    "一对一 ⇒ 满射",
    "每个映射都有最大伸缩",
    "基给出坐标",
    "单位球是紧的",
    "特征值存在",
  ],
  repairs: ["S2E30", "S2E21", "S2E23、S2E28", "S2E21、S2E27", "S2E31"],
  sequences: "数列",
  functions: "[0, 1] 上的函数",
  lost: "丢了",
  height: "高度",
  slope: "斜率",
  missing: "还差",
  sqrt2: "相距 √2",
  never1: "永远到不了 1",
  mojing: "《墨经》论穷",
  youqiong: "有穷",
  wuqiong: "无穷",
  miss: "差",
  nextEpisode: "下一集 · ",
  nextTitle: "赋范空间与有界算子",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
