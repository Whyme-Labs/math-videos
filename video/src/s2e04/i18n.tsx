import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 4",
  title: "Matrices as Shadows",
  subtitle: "what a matrix really is",
  // Cold open
  dublin: "Dublin, 16 October 1843",
  hamilton: "Hamilton",
  bridge: "Broom Bridge",
  carving: "i² = j² = k² = ijk = −1",
  ijNotJi: "ij ≠ ji",
  // Columns
  columnsAre: "columns = where the basis goes",
  // 方程 (Chinese edition only; kept for type parity)
  liuhui: "刘徽注《九章算术》",
  quote: "并列为行，故谓之方程",
  // Compose
  thenWord: "then",
  rowCol: "row × column",
  // Order
  turnFlat: "turn, then flatten",
  flatTurn: "flatten, then turn",
  abNotBa: "AB ≠ BA",
  // Shadows
  sameMap: "same map, new light",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Building New Spaces",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 4 集",
  title: "矩阵是影子",
  subtitle: "矩阵到底是什么",
  dublin: "都柏林，1843 年 10 月 16 日",
  hamilton: "哈密顿",
  bridge: "布鲁姆桥",
  carving: "i² = j² = k² = ijk = −1",
  ijNotJi: "ij ≠ ji",
  columnsAre: "各列 = 基去了哪里",
  liuhui: "刘徽注《九章算术》",
  quote: "并列为行，故谓之方程",
  thenWord: "再",
  rowCol: "行 × 列",
  turnFlat: "先转，再压",
  flatTurn: "先压，再转",
  abNotBa: "AB ≠ BA",
  sameMap: "同一个映射，换个光",
  nextEpisode: "下一集 · ",
  nextTitle: "造新的空间",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
