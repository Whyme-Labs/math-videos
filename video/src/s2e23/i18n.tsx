import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 23",
  title: "Banach Spaces",
  subtitle: "complete spaces and fixed points",
  // Cold open
  notPoly: "not a polynomial",
  hole: "a hole",
  // Cauchy
  cauchy: "Cauchy",
  converges: "converges",
  banach: "complete normed space = Banach space",
  // Zoo
  complete: "complete",
  incomplete: "not complete",
  zooYes: ["ℝⁿ", "ℓᵖ", "C[0, 1], peak"],
  zooNo: ["polynomials", "finite sequences", "C[0, 1], area"],
  missing: ["eˣ", "(1, ½, ¼, …)", "a step"],
  // lp
  coordinate: "coordinate",
  limit: "limit x",
  // Completion
  space: "space",
  completion: "completion",
  // Series
  lengths: "Σ ‖xₙ‖ < ∞",
  // 祖冲之 (Chinese edition only; kept for type parity)
  zu: "祖冲之 · 《隋书·律历志》",
  ying: "盈数",
  nu: "朒数",
  // Contraction
  fixed: "fixed point",
  // Picard
  pagerank: "PageRank",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Continuous Dual",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 23 集",
  title: "巴拿赫空间",
  subtitle: "完备空间与不动点",
  notPoly: "不是多项式",
  hole: "一个洞",
  cauchy: "柯西",
  converges: "收敛",
  banach: "完备的赋范空间 = 巴拿赫空间",
  complete: "完备",
  incomplete: "不完备",
  zooYes: ["ℝⁿ", "ℓᵖ", "C[0, 1]，峰值"],
  zooNo: ["多项式", "有限数列", "C[0, 1]，面积"],
  missing: ["eˣ", "(1, ½, ¼, …)", "阶梯函数"],
  coordinate: "坐标",
  limit: "极限 x",
  space: "空间",
  completion: "完备化",
  lengths: "Σ ‖xₙ‖ < ∞",
  zu: "祖冲之 · 《隋书·律历志》",
  ying: "盈数",
  nu: "朒数",
  fixed: "不动点",
  pagerank: "PageRank",
  nextEpisode: "下一集 · ",
  nextTitle: "连续对偶",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
