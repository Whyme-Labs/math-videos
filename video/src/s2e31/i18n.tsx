import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 31",
  title: "Spectrum and Quantum Mechanics",
  subtitle: "beyond eigenvalues",
  // Cold open
  noEigen: "no eigenvectors",
  position: "position x",
  rule: "outcomes = eigenvalues?",
  // Shift
  notHit: "never hit",
  noEigenvalues: "no eigenvalues",
  finite: "ℝⁿ: one-to-one ⟺ onto ✓",
  // Spectrum
  point: "not one-to-one",
  continuous: "dense range, not onto",
  residual: "range not dense",
  invertible: "invertible",
  nonEmpty: "never empty",
  // Examples
  approx: "approximate eigenvector",
  // 沈括 (Chinese edition only; kept for type parity)
  rbTitle: "沈括 · 《梦溪笔谈》卷二十一",
  rbQuote: "虹乃雨中日影也，日照雨则有之。",
  rbContinuous: "连续谱",
  rbDiscrete: "离散谱",
  // Unbounded
  impossible: "impossible",
  dense: "dense domain",
  // Spectral
  rightCoords: "the right coordinates",
  // Dictionary
  rows: [
    ["state", "unit vector ψ"],
    ["observable", "self-adjoint A"],
    ["outcomes", "spectrum σ(A)"],
    ["evolution", "unitary exp(−itH/ħ)"],
  ] as [string, string][],
  pixel: "pixel",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Measure-Preserving Systems",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 31 集",
  title: "谱与量子力学",
  subtitle: "超越特征值",
  noEigen: "没有特征向量",
  position: "位置 x",
  rule: "测量结果 = 特征值？",
  notHit: "永远打不到",
  noEigenvalues: "没有特征值",
  finite: "ℝⁿ：单射 ⟺ 满射 ✓",
  point: "不是单射",
  continuous: "像稠密，但不满",
  residual: "像不稠密",
  invertible: "可逆",
  nonEmpty: "永远不空",
  approx: "近似特征向量",
  rbTitle: "沈括 · 《梦溪笔谈》卷二十一",
  rbQuote: "虹乃雨中日影也，日照雨则有之。",
  rbContinuous: "连续谱",
  rbDiscrete: "离散谱",
  impossible: "不可能",
  dense: "稠密定义域",
  rightCoords: "选对坐标",
  rows: [
    ["状态", "单位向量 ψ"],
    ["可观测量", "自伴算子 A"],
    ["测量结果", "谱 σ(A)"],
    ["时间演化", "酉算子 exp(−itH/ħ)"],
  ],
  pixel: "像素",
  nextEpisode: "下一集 · ",
  nextTitle: "保测系统",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
