import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 27",
  title: "Weak Convergence",
  subtitle: "getting compactness back",
  // Cold open
  energy: "energy",
  sensor: "sensor",
  escaped: "escaped to ∞",
  onlyMeasure: "ask only the measurements",
  // Crisis
  infimum: "inf F = 0, never reached",
  weaker: "a weaker convergence",
  // Weak
  probe: "probe y",
  unique: "limits are unique",
  bounded: "weak sequences are bounded",
  // Escapes
  travel: "travelling",
  concentrate: "concentrating",
  oscillate: "oscillating",
  // 盲人摸象 (Chinese edition only; kept for type parity)
  elTitle: "盲人摸象 · 《大般涅槃经》",
  elQuote: "“其触牙者，即言象形如芦菔根；其触耳者，言象如箕。”",
  elParts: ["芦菔根", "箕", "木臼", "绳"],
  elWeak: "只凭读数判断",
  // ℓ¹
  notReflexive: "ℓ¹ is not reflexive",
  // Alaoglu
  weakStar: "fₙ(x) → f(x) for each x",
  alaoglu: "Banach–Alaoglu",
  // Direct method
  reflexive: "reflexive: bounded ⇒ a weak limit",
  mazur: "Mazur: closed convex sets keep weak limits",
  convex: "convex",
  notConvex: "not convex",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Hilbert Spaces",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 27 集",
  title: "弱收敛",
  subtitle: "把紧性找回来",
  energy: "能量",
  sensor: "传感器",
  escaped: "逃到 ∞",
  onlyMeasure: "只问测量",
  infimum: "inf F = 0，永远达不到",
  weaker: "更弱的收敛",
  probe: "探针 y",
  unique: "极限唯一",
  bounded: "弱收敛序列有界",
  travel: "平移",
  concentrate: "集中",
  oscillate: "振荡",
  elTitle: "盲人摸象 · 《大般涅槃经》",
  elQuote: "“其触牙者，即言象形如芦菔根；其触耳者，言象如箕。”",
  elParts: ["芦菔根", "箕", "木臼", "绳"],
  elWeak: "只凭读数判断",
  notReflexive: "ℓ¹ 不自反",
  weakStar: "对每个 x，fₙ(x) → f(x)",
  alaoglu: "巴拿赫–阿劳格鲁",
  reflexive: "自反：有界 ⇒ 有弱极限",
  mazur: "马祖尔：闭凸集留得住弱极限",
  convex: "凸",
  notConvex: "不凸",
  nextEpisode: "下一集 · ",
  nextTitle: "希尔伯特空间",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
