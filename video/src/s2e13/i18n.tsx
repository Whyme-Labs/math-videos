import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 13",
  title: "When Diagonalization Fails",
  subtitle: "the Jordan form",
  // Cold open
  paris: "Paris, 1870",
  jordan: "Jordan",
  pages: "667 pages",
  berlin: "Berlin, 1874",
  kronecker: "Kronecker",
  weierstrass: "Weierstrass, 1868",
  tooFew: "too few eigenvectors",
  // Shear
  oneLine: "λ = 1, twice · only one line",
  // 祖暅 (Chinese edition only; kept for type parity)
  zugeng: "祖暅原理",
  volumeSame: "体积不变 · det = 1",
  // Ladder
  // Blocks
  nudge: "the nudge",
  // Damping
  under: "underdamped",
  critical: "critical",
  over: "overdamped",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Length and Angle Are a Choice",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 13 集",
  title: "对角化失灵的时候",
  subtitle: "若尔当标准形",
  paris: "巴黎，1870 年",
  jordan: "若尔当",
  pages: "667 页",
  berlin: "柏林，1874 年",
  kronecker: "克罗内克",
  weierstrass: "魏尔斯特拉斯，1868 年",
  tooFew: "特征向量不够",
  oneLine: "λ = 1，两重 · 只有一条线",
  zugeng: "祖暅原理",
  volumeSame: "体积不变 · det = 1",
  nudge: "那一推",
  under: "欠阻尼",
  critical: "临界阻尼",
  over: "过阻尼",
  nextEpisode: "下一集 · ",
  nextTitle: "长度与角度是一种选择",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
