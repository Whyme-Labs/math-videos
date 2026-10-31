import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 10",
  title: "The Tensor Product",
  subtitle: "what a tensor really is",
  // Cold open
  zurich: "Zurich, 1912",
  einstein: "Einstein",
  grossmann: "Grossmann",
  help: "Help me, or I'll go crazy!",
  memoir: "Ricci & Levi-Civita, 1900",
  slogan: "a tensor is something that transforms like a tensor · ",
  // Funnel
  bilinear: "bilinear",
  linear: "linear",
  // Grid
  plus: "2 + 3 = 5",
  times: "2 × 3 = 6",
  // 里耶秦简 (Chinese edition only; kept for type parity)
  liyeTitle: "里耶秦简 · 九九表",
  liyeLines: "九九八十一 八九七十二 七九六十三 六九五十四",
  rankOne: "秩 = 1",
  // Pure
  pure: "rank 1",
  notPure: "rank 3",
  product: "product state",
  entangled: "entangled",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Exterior Algebra and the Determinant",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 10 集",
  title: "张量积",
  subtitle: "张量到底是什么",
  zurich: "苏黎世，1912 年",
  einstein: "爱因斯坦",
  grossmann: "格罗斯曼",
  help: "你得帮我，不然我要疯了！",
  memoir: "里奇与列维-奇维塔，1900",
  slogan: "张量就是像张量一样变换的东西 · ",
  bilinear: "双线性",
  linear: "线性",
  plus: "2 + 3 = 5",
  times: "2 × 3 = 6",
  liyeTitle: "里耶秦简 · 九九表",
  liyeLines: "九九八十一 八九七十二 七九六十三 六九五十四",
  rankOne: "秩 = 1",
  pure: "秩 1",
  notPure: "秩 3",
  product: "可分离态",
  entangled: "纠缠态",
  nextEpisode: "下一集 · ",
  nextTitle: "外代数与行列式",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
