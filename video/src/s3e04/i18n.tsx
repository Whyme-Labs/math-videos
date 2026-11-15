import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 3 · Episode 4",
  title: "Fourier Is Duality",
  subtitle: "the characters of the shift group",
  // Cold open
  perSecond: "thousands of times a second",
  whyThis: "why this one?",
  newFn: "new function",
  sameFn: "same helix × one number",
  eigen: "eigenvector of every shift",
  // Shifts
  rescale: "only rescaled",
  homom: "homomorphism",
  // Orth
  sumZero: "S = χ(h) S, so S = 0",
  basis: "orthogonal basis",
  signal: "signal",
  spectrum: "spectrum",
  // Dft
  unitary: "unitary",
  shift: "shift",
  diagonal: "diagonal",
  conv: "convolution",
  product: "product",
  // Fft
  even: "even",
  odd: "odd",
  // 《庄子》 (Chinese edition only; kept for type parity)
  rsTitle: "《庄子·徐无鬼》",
  rsQuote: "鼓宫宫动，鼓角角动，音律同矣。",
  rsNotes: ["宫", "商", "角", "徵", "羽"],
  rsHall: "堂上",
  rsRoom: "室内",
  rsCoef: "傅里叶系数 = 共振",
  // Duality
  natural: "natural",
  choice: "a choice",
  vectors: "vectors",
  covectors: "covectors",
  pontryagin: "Pontryagin",
  // Plancherel
  energy: "energy = ∞",
  // Finale
  cards: [
    ["Fields", "dimension"],
    ["Modules", "Jordan form"],
    ["Representations", "trace"],
    ["Fourier", "dual space"],
  ],
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Manifolds",
  seriesLine: "Where the Roads Meet · Season 3",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第三季 · 第 4 集",
  title: "傅里叶就是对偶",
  subtitle: "平移群的特征标",
  perSecond: "每秒几千次",
  whyThis: "凭什么是这一组？",
  newFn: "新函数",
  sameFn: "同一条螺旋 × 一个数",
  eigen: "所有平移的特征向量",
  rescale: "只被缩放",
  homom: "同态",
  sumZero: "S = χ(h) S，所以 S = 0",
  basis: "正交基",
  signal: "信号",
  spectrum: "频谱",
  unitary: "酉矩阵",
  shift: "平移",
  diagonal: "对角",
  conv: "卷积",
  product: "乘积",
  even: "偶数位",
  odd: "奇数位",
  rsTitle: "《庄子·徐无鬼》",
  rsQuote: "鼓宫宫动，鼓角角动，音律同矣。",
  rsNotes: ["宫", "商", "角", "徵", "羽"],
  rsHall: "堂上",
  rsRoom: "室内",
  rsCoef: "傅里叶系数 = 共振",
  natural: "自然",
  choice: "要选择",
  vectors: "向量",
  covectors: "余向量",
  pontryagin: "庞特里亚金",
  energy: "能量 = ∞",
  cards: [
    ["域", "维数"],
    ["模", "若尔当标准形"],
    ["表示论", "迹"],
    ["傅里叶", "对偶空间"],
  ],
  nextEpisode: "下一集 · ",
  nextTitle: "流形",
  seriesLine: "殊途同归 · 第三季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
