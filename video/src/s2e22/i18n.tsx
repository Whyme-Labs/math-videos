import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 22",
  title: "Measure: How Big Is a Set?",
  subtitle: "Lebesgue measure and integral",
  // Cold open
  chance: "P(fraction)",
  removed: "removed",
  left: "left",
  // Dirichlet
  upper: "upper sum",
  lower: "lower sum",
  // Rules
  rules: ["m([a, b]) = b − a", "m(A + t) = m(A)", "m(∪ Aₙ) = Σ m(Aₙ)"],
  countable: "countable",
  // Null Q
  total: "total ≤",
  // Cantor
  base3: "base 3",
  base2: "base 2",
  // Vitali
  friends: "x − y ∈ ℚ",
  everySet: "m(A) for every A ⊆ ℝ?",
  copies: "copies of V",
  // 曹冲 (Chinese edition only; kept for type parity)
  caochong: "曹冲称象 · 《三国志》",
  elephant: "象",
  stones: "石",
  // Lebesgue
  riemann: "Riemann",
  lebesgue: "Lebesgue",
  // ae
  same: "same element of L¹",
  // Probability
  table: [
    ["event", "measurable set"],
    ["probability", "measure"],
    ["expected value", "integral"],
  ],
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Banach Spaces",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 22 集",
  title: "测度：一个集合有多大？",
  subtitle: "勒贝格测度与积分",
  chance: "P(分数)",
  removed: "挖掉",
  left: "剩下",
  upper: "上和",
  lower: "下和",
  rules: ["m([a, b]) = b − a", "m(A + t) = m(A)", "m(∪ Aₙ) = Σ m(Aₙ)"],
  countable: "可数",
  total: "总长 ≤",
  base3: "三进制",
  base2: "二进制",
  friends: "x − y ∈ ℚ",
  everySet: "每个 A ⊆ ℝ 都有 m(A)？",
  copies: "V 的副本",
  caochong: "曹冲称象 · 《三国志》",
  elephant: "象",
  stones: "石",
  riemann: "黎曼",
  lebesgue: "勒贝格",
  same: "L¹ 里的同一个元素",
  table: [
    ["事件", "可测集"],
    ["概率", "测度"],
    ["期望", "积分"],
  ],
  nextEpisode: "下一集 · ",
  nextTitle: "巴拿赫空间",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
