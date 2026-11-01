import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 15",
  title: "Unitary Spaces",
  subtitle: "complex inner products",
  // Cold open
  berlin: "Berlin, 1932",
  vonNeumann: "John von Neumann",
  book: "Mathematical Foundations of Quantum Mechanics",
  lengthSq: "length²",
  // Bar
  conj: "conjugate",
  // Unitary
  coord1: "coordinate 1",
  coord2: "coordinate 2",
  eigen: "eigenvalues",
  // 割圆术 (Chinese edition only; kept for type parity)
  geyuan: "刘徽 · 割圆术",
  sides: "边",
  quote: "割之弥细，所失弥少",
  step: "每一步：× ω，|ω| = 1",
  // Spectral
  schur: "Schur, 1909",
  normal: "commutes with its adjoint",
  hermitian: "Hermitian: real",
  unitaryEig: "unitary: on the circle",
  // Fourier
  time: "time",
  freq: "frequency",
  energy: "energy",
  back: "back = conjugate transpose",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Vectors and Covectors",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 15 集",
  title: "酉空间",
  subtitle: "复内积",
  berlin: "柏林，1932 年",
  vonNeumann: "冯·诺伊曼",
  book: "《量子力学的数学基础》",
  lengthSq: "长度²",
  conj: "共轭",
  coord1: "坐标 1",
  coord2: "坐标 2",
  eigen: "特征值",
  geyuan: "刘徽 · 割圆术",
  sides: "边",
  quote: "割之弥细，所失弥少",
  step: "每一步：× ω，|ω| = 1",
  schur: "舒尔，1909 年",
  normal: "与伴随可交换",
  hermitian: "厄米：实数",
  unitaryEig: "酉：在单位圆上",
  time: "时间",
  freq: "频率",
  energy: "能量",
  back: "变回去 = 共轭转置",
  nextEpisode: "下一集 · ",
  nextTitle: "向量与余向量",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
