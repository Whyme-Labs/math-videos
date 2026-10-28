import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 3",
  title: "Linear Maps",
  subtitle: "machines that respect adding and scaling",
  // Cold open
  london: "London, 1821",
  babbage: "Babbage",
  herschel: "Herschel",
  steam: "by steam!",
  // Test
  addThenTurn: "add, then turn",
  turnThenAdd: "turn, then add",
  machines: ["turn", "shadow", "d/dx", "shift", "square"],
  // Basis
  decided: "decided by the basis",
  // 招差术 (Chinese edition only; kept for type parity)
  shoushi: "《授时历》，1280",
  zhaocha: "招差术",
  // Kernel
  kernel: "kernel",
  image: "image",
  rankNullity: "3 = 1 + 2",
  // Engine
  engine: "Difference Engine",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Matrices as Shadows",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 3 集",
  title: "线性映射",
  subtitle: "尊重加法和数乘的机器",
  london: "伦敦，1821 年",
  babbage: "巴贝奇",
  herschel: "赫歇尔",
  steam: "用蒸汽算！",
  addThenTurn: "先加，再转",
  turnThenAdd: "先转，再加",
  machines: ["旋转", "影子", "求导", "平移一格", "平方"],
  decided: "由基决定",
  shoushi: "《授时历》，1280 年",
  zhaocha: "招差术",
  kernel: "核",
  image: "像",
  rankNullity: "3 = 1 + 2",
  engine: "差分机",
  nextEpisode: "下一集 · ",
  nextTitle: "矩阵是影子",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
