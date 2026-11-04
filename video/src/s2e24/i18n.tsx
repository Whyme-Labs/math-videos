import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 24",
  title: "The Continuous Dual",
  subtitle: "measurements you can trust",
  // Cold open
  devices: ["value at a point", "slope", "area"],
  area: "area",
  valueAt0: "value at 0",
  trust: "only continuous measurements",
  // Monsters
  allLinear: "every linear f",
  length: "length",
  // Dual norm
  complete: "X* is complete",
  fromR: "⇐ ℝ is complete",
  // Hölder
  partner: "partner",
  // Duals
  missing: "still missing",
  bigger: "(ℓ∞)* ⊋ ℓ¹",
  // 卡尺 (Chinese edition only; kept for type parity)
  kachi: "新莽铜卡尺 · 公元 9 年",
  reading: "读数",
  // Measures
  measures: "C[0, 1]* = measures on [0, 1]",
  // Evaluation
  peak: "peak norm",
  areaNorm: "area norm",
  undefined: "not defined",
  // Bidual
  reflexive: "reflexive",
  yes: "yes",
  no: "no",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Hahn–Banach Theorem",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 24 集",
  title: "连续对偶",
  subtitle: "信得过的测量",
  devices: ["某点的值", "斜率", "面积"],
  area: "面积",
  valueAt0: "0 处的值",
  trust: "只留连续的测量",
  allLinear: "所有线性 f",
  length: "长度",
  complete: "X* 是完备的",
  fromR: "⇐ ℝ 是完备的",
  partner: "搭档",
  missing: "还差",
  bigger: "(ℓ∞)* ⊋ ℓ¹",
  kachi: "新莽铜卡尺 · 公元 9 年",
  reading: "读数",
  measures: "C[0, 1]* = [0, 1] 上的测度",
  peak: "峰值范数",
  areaNorm: "面积范数",
  undefined: "没有定义",
  reflexive: "自反",
  yes: "是",
  no: "否",
  nextEpisode: "下一集 · ",
  nextTitle: "哈恩–巴拿赫定理",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
