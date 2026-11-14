import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 32",
  title: "Measure-Preserving Systems",
  subtitle: "linear algebra meets chaos",
  // Cold open
  area: "area",
  measurements: "measurements",
  // Doubling
  steps: "step",
  gap: "gap",
  averages: "ask about averages",
  // Preserve
  preimage: "preimage",
  image: "image",
  // Recurrence
  neverBack: "never come back",
  // 古历 (Chinese edition only; kept for type parity)
  mtTitle: "《周髀算经》 · 十九岁为一章",
  mtYear: "年",
  mtMonths: "1 年 ≈ 12.368 个朔望月",
  // Koopman
  linear: "linear",
  isometry: "isometry",
  notOnto: "never hit",
  // Spectrum
  ergodic: "ergodic",
  recurrence: "recurrence",
  mixingWord: "mixing",
  notErgodic: "not ergodic",
  continuous: "continuous spectrum",
  rational: "α = 1/4",
  irrational: "α = (√5 − 1)/2",
  mixing: "doubling: mixing",
  // Mean
  invariant: "invariant",
  // Weyl
  share: "share in [a, b]",
  spectrumOne: "one operator, one spectrum",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Distributions",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 32 集",
  title: "保测系统",
  subtitle: "线性代数遇上混沌",
  area: "面积",
  measurements: "测量值",
  steps: "步",
  gap: "距离",
  averages: "问平均",
  preimage: "原像",
  image: "正像",
  neverBack: "永不回来",
  mtTitle: "《周髀算经》 · 十九岁为一章",
  mtYear: "年",
  mtMonths: "1 年 ≈ 12.368 个朔望月",
  linear: "线性",
  isometry: "等距",
  notOnto: "打不到",
  ergodic: "遍历",
  recurrence: "回归",
  mixingWord: "混合",
  notErgodic: "不遍历",
  continuous: "连续谱",
  rational: "α = 1/4",
  irrational: "α = (√5 − 1)/2",
  mixing: "倍增：混合",
  invariant: "不变",
  share: "落在 [a, b] 的比例",
  spectrumOne: "一个算子，一个谱",
  nextEpisode: "下一集 · ",
  nextTitle: "广义函数",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
