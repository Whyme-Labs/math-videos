import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 19",
  title: "Fields",
  subtitle: "worlds where you can divide",
  // Cold open
  paris: "Paris, 1837",
  wantzel: "Wantzel",
  half: "½",
  third: "⅓ ?",
  noMethod: "no method at all?",
  year: (y: number) => (y < 0 ? `${-y} BCE` : `${y}`),
  field: "field",
  // Moves
  lineLine: "+  −  ×  ÷",
  lineCircle: "√",
  // 规矩 (Chinese edition only; kept for type parity)
  mencius: "不以规矩，不能成方圆",
  menciusSource: "《孟子·离娄上》",
  silk: "Fuxi and Nüwa, Tang silk painting, Turfan",
  gui: "规",
  ju: "矩",
  // Field
  rationals: "ℚ",
  divideByZero: "÷ 0 ✗",
  degree: "degree",
  // Tower
  basis: "1   √2   √3   √6",
  twoTimesTwo: "2 × 2 = 4",
  powersOfTwo: "1, 2, 4, 8, 16 …",
  // Payoff
  cubic: "8x³ − 6x − 1 = 0",
  degree3: "degree 3",
  cubeRoot: "∛2",
  impossible: "impossible",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Galois",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 19 集",
  title: "域",
  subtitle: "能做除法的世界",
  paris: "巴黎，1837 年",
  wantzel: "旺策尔",
  half: "½",
  third: "⅓ ?",
  noMethod: "根本没有方法？",
  year: (y: number) => (y < 0 ? `公元前 ${-y} 年` : `${y} 年`),
  field: "域",
  lineLine: "+  −  ×  ÷",
  lineCircle: "√",
  mencius: "不以规矩，不能成方圆",
  menciusSource: "《孟子·离娄上》",
  silk: "伏羲女娲图，唐代绢画，吐鲁番阿斯塔那出土",
  gui: "规",
  ju: "矩",
  rationals: "ℚ",
  divideByZero: "÷ 0 ✗",
  degree: "次数",
  basis: "1   √2   √3   √6",
  twoTimesTwo: "2 × 2 = 4",
  powersOfTwo: "1, 2, 4, 8, 16 …",
  cubic: "8x³ − 6x − 1 = 0",
  degree3: "次数 3",
  cubeRoot: "∛2",
  impossible: "不可能",
  nextEpisode: "下一集 · ",
  nextTitle: "伽罗瓦",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
