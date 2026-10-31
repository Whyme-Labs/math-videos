import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 11",
  title: "Exterior Algebra and the Determinant",
  subtitle: "how a map scales volume",
  // Cold open
  edo: "Edo, 1683",
  seki: "Seki Takakazu",
  hanover: "Hanover, 1693",
  leibniz: "Leibniz",
  terms: "terms",
  // Rules
  area: "area",
  // 出入相补 (Chinese edition only; kept for type parity)
  liuhui: "刘徽 · 出入相补",
  // Wedge
  threeDirs: "3 directions",
  oneDir: "1 direction",
  // Det
  volume: "volume",
  lost: "a direction lost",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Eigenvectors",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 11 集",
  title: "外代数与行列式",
  subtitle: "映射怎样放大体积",
  edo: "江户，1683 年",
  seki: "关孝和",
  hanover: "汉诺威，1693 年",
  leibniz: "莱布尼茨",
  terms: "项",
  area: "面积",
  liuhui: "刘徽 · 出入相补",
  threeDirs: "3 个方向",
  oneDir: "1 个方向",
  volume: "体积",
  lost: "丢了一个方向",
  nextEpisode: "下一集 · ",
  nextTitle: "特征向量",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
