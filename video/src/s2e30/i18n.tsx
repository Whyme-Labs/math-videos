import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 30",
  title: "Compact Operators",
  subtitle: "the spectral theorem survives",
  // Cold open
  noEigen: "no eigenvectors",
  compact: "compact = almost finite",
  // Naive
  noMax: "no maximiser",
  defn: "(xₙ) bounded ⟹ (Txₙ) clusters",
  hyp: "T compact, T = T*",
  // Compact
  axes: "axes",
  // Spectral
  finitelyMany: "finitely many",
  // 朱载堉 (Chinese edition only; kept for type parity)
  zyTitle: "朱载堉 · 《律学新说》 · 1584",
  zyRoot: "2 的十二次方根",
  zySpectrum: "离散的谱",
  // Fredholm
  unique: "one solution for every f",
  kernel: "a kernel, and f ⟂ it",
  rankNullity: "rank–nullity, rescued",
  // String
  frequencies: "frequencies",
  // Volterra
  noEigenvalues: "no eigenvalues",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Spectrum and Quantum Mechanics",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 30 集",
  title: "紧算子",
  subtitle: "谱定理活了下来",
  noEigen: "没有特征向量",
  compact: "紧 = 几乎有限维",
  noMax: "没有最大点",
  defn: "(xₙ) 有界 ⟹ (Txₙ) 有聚点",
  hyp: "T 紧，T = T*",
  axes: "轴长",
  finitelyMany: "只有有限个",
  zyTitle: "朱载堉 · 《律学新说》 · 1584",
  zyRoot: "2 的十二次方根",
  zySpectrum: "离散的谱",
  unique: "每个 f 恰有一个解",
  kernel: "有核，f 须与之正交",
  rankNullity: "秩–零化度，救回来了",
  frequencies: "频率",
  noEigenvalues: "没有特征值",
  nextEpisode: "下一集 · ",
  nextTitle: "谱与量子力学",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
