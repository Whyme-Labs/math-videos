import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 21",
  title: "Normed Spaces and Bounded Operators",
  subtitle: "many rulers, and they disagree",
  // Cold open
  judges: ["area", "energy", "peak"],
  verdicts: ["→ 0", "stays ⅓", "→ ∞"],
  // Norm
  rules: ["‖x‖ = 0 ⇒ x = 0", "‖cx‖ = |c| ‖x‖", "‖x + y‖ ≤ ‖x‖ + ‖y‖"],
  convex: "convex",
  notNorm: "not a norm",
  // Spread
  total: "total",
  energy: "energy",
  peak: "peak",
  // Finite
  min: "min",
  compact: "compact",
  // 考工记 (Chinese edition only; kept for type parity)
  kaogong: "《考工记 · 轮人》",
  tests: ["规 · 圆", "萬 · 匡", "县 · 直", "水 · 平", "权 · 轻重"],
  // Bounded
  bounded: "bounded",
  continuous: "continuous",
  unbounded: "unbounded",
  // Matrix
  rulers: ["diamond", "disc", "square"],
  // Riesz
  far: "≥ ½",
  // Holes
  step: "step",
  hole: "not continuous",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Measure: How Big Is a Set?",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 21 集",
  title: "赋范空间与有界算子",
  subtitle: "好多把尺子，彼此不一致",
  judges: ["面积", "能量", "峰值"],
  verdicts: ["→ 0", "停在 ⅓", "→ ∞"],
  rules: ["‖x‖ = 0 ⇒ x = 0", "‖cx‖ = |c| ‖x‖", "‖x + y‖ ≤ ‖x‖ + ‖y‖"],
  convex: "凸的",
  notNorm: "不是范数",
  total: "总量",
  energy: "能量",
  peak: "峰值",
  min: "最小值",
  compact: "紧的",
  kaogong: "《考工记 · 轮人》",
  tests: ["规 · 圆", "萬 · 匡", "县 · 直", "水 · 平", "权 · 轻重"],
  bounded: "有界",
  continuous: "连续",
  unbounded: "无界",
  rulers: ["菱形", "圆盘", "正方形"],
  far: "≥ ½",
  step: "阶梯",
  hole: "不连续",
  nextEpisode: "下一集 · ",
  nextTitle: "测度：一个集合有多大？",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
