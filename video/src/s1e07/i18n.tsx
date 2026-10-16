import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
// Numbers and formulas (√2, a² = 2b², 577/408, …) are the same in both
// languages and live in the scenes.
const EN = {
  season: "Season 1 · Episode 7",
  title: "The Holes in ℚ",
  subtitle: "dense, and still full of gaps",
  // Cold open
  side: "side 1",
  diagonal: "diagonal",
  between: "between two marks",
  legend: "legend",
  // Density
  average: "average",
  // Descent
  smallest: "b as small as possible",
  even: "even",
  smaller: "smaller bottom",
  contradiction: "contradiction",
  floor: "no endless descent in ℕ",
  noFraction: "no fraction squares to 2",
  // 九章算术 (Chinese edition only; kept for type parity)
  shaoguang: "Nine Chapters · Shaoguang",
  quote: ["若开之不尽者", "为不可开", "当以面命之"],
  liuHui: "Liu Hui’s commentary",
  tooSmall: "微少",
  tooBig: "微多",
  undetermined: "其数不可得而定",
  areaTwo: "area 2",
  sideName: "面",
  // Hole
  zoom: "zoom",
  gap: "a gap",
  // Armies
  below: "q² < 2",
  above: "q² > 2",
  upperBounds: "upper bounds",
  nothing: "nothing here",
  noSup: "no least upper bound",
  // Babylon
  tablet: "Babylonian tablet YBC 7289 · 1;24,51,10 ≈ 1.4142130",
  landing: "limit?",
  nowhere: "nowhere to land",
  // Tower
  newIdea: "needs a new idea: limits",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Building ℝ, Twice",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 7 集",
  title: "ℚ 里的洞",
  subtitle: "处处稠密，却到处是洞",
  side: "边长 1",
  diagonal: "对角线",
  between: "落在两个刻度之间",
  legend: "传说",
  average: "平均数",
  smallest: "b 取最小",
  even: "偶数",
  smaller: "分母更小",
  contradiction: "矛盾",
  floor: "自然数不能无限下降",
  noFraction: "没有分数的平方等于 2",
  shaoguang: "《九章算术》少广章",
  quote: ["若开之不尽者", "为不可开", "当以面命之"],
  liuHui: "刘徽注",
  tooSmall: "微少",
  tooBig: "微多",
  undetermined: "其数不可得而定",
  areaTwo: "面积 2",
  sideName: "面",
  zoom: "放大",
  gap: "缺口",
  below: "q² < 2",
  above: "q² > 2",
  upperBounds: "上界",
  nothing: "这里什么都没有",
  noSup: "没有最小上界",
  tablet: "巴比伦泥板 YBC 7289 · 1;24,51,10 ≈ 1.4142130",
  landing: "极限？",
  nowhere: "无处落脚",
  newIdea: "需要新想法：极限",
  nextEpisode: "下一集 · ",
  nextTitle: "两次造出 ℝ",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
