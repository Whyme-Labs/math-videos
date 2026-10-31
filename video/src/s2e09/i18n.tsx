import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 9",
  title: "Bilinear Forms",
  subtitle: "two inputs, one number",
  // Cold open
  cologne: "Cologne, 1908",
  minkowski: "Minkowski",
  raumZeit: "Raum und Zeit",
  space: "space",
  time: "time",
  // Two objects
  asMap: "as a map",
  asForm: "as a form",
  stretch: "stretch 3, 1",
  // 勾股 (Chinese edition only; kept for type parity)
  zhoubi: "《周髀算经》 · 商高",
  gou: "勾 3",
  gu: "股 4",
  xian: "弦 5",
  // Squares
  sylvester: "Sylvester, 1852 · law of inertia",
  // Signature
  lightCone: "light cone",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "The Tensor Product",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 9 集",
  title: "双线性型",
  subtitle: "两个输入，一个数",
  cologne: "科隆，1908 年",
  minkowski: "闵可夫斯基",
  raumZeit: "《空间与时间》",
  space: "空间",
  time: "时间",
  asMap: "当作映射",
  asForm: "当作型",
  stretch: "拉伸 3、1",
  zhoubi: "《周髀算经》 · 商高",
  gou: "勾 3",
  gu: "股 4",
  xian: "弦 5",
  sylvester: "西尔维斯特，1852 · 惯性定律",
  lightCone: "光锥",
  nextEpisode: "下一集 · ",
  nextTitle: "张量积",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
