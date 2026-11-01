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
  entry: "entry",
  // No bilinear form
  bilinear: "linear in both slots",
  // Define
  rules: ["linear in slot 1", "swap = conjugate", "⟨v, v⟩ > 0"],
  unfold: "ℂ² as ℝ⁴",
  // Unitary
  coord: "coordinate",
  // Eigen
  unitCircle: "unit circle",
  // 割圆术 (Chinese edition only; kept for type parity)
  geyuan: "刘徽 · 割圆术",
  sides: "边",
  quote: "割之弥细，所失弥少",
  step: "每一步：× ω，|ω| = 1",
  // Spectral
  schur: "Schur, 1909",
  normal: "commutes with its conjugate transpose",
  // Matrix land
  kinds: [
    { num: "real", mat: "Hermitian" },
    { num: "|z| = 1", mat: "unitary" },
    { num: "positive", mat: "positive definite" },
  ],
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
  entry: "分量",
  bilinear: "两个插槽都线性",
  rules: ["对第 1 个插槽线性", "对调 = 取共轭", "⟨v, v⟩ > 0"],
  unfold: "把 ℂ² 看成 ℝ⁴",
  coord: "坐标",
  unitCircle: "单位圆",
  geyuan: "刘徽 · 割圆术",
  sides: "边",
  quote: "割之弥细，所失弥少",
  step: "每一步：× ω，|ω| = 1",
  schur: "舒尔，1909 年",
  normal: "与共轭转置可交换",
  kinds: [
    { num: "实数", mat: "厄米矩阵" },
    { num: "|z| = 1", mat: "酉矩阵" },
    { num: "正数", mat: "正定矩阵" },
  ],
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
