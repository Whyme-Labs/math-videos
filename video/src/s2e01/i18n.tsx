import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 2 · Episode 1",
  title: "Anything You Can Add and Scale",
  subtitle: "vector spaces",
  // Cold open
  stettin: "Stettin, 1844",
  grassmann: "Grassmann",
  book: "Ausdehnungslehre",
  mobius: "Möbius",
  university: "University",
  sanskrit: "Rigveda",
  peano: "Peano, 1888",
  vectorSpace: "vector space",
  // Four
  arrow: "arrows",
  polynomial: "polynomials",
  sound: "sounds",
  waves: "y″ + y = 0",
  // Rules
  order: "order doesn't matter",
  zero: "a zero",
  opposite: "an opposite",
  spreads: "stretching spreads",
  fieldsLine: "scalars: any field",
  onePlusOne: "1 + 1 = 0",
  // 方程 (Chinese edition only; kept for type parity)
  jiuzhang: "《九章算术·方程》",
  method: "遍乘直除",
  rows: ["上禾", "中禾", "下禾", "实"],
  answer: "上禾一秉 = 9¼ 斗",
  // Zoo
  bits: "bit strings",
  functions: "functions",
  sequences: "sequences",
  positives: "positive numbers",
  sphere: "a sphere",
  offLine: "a line off 0",
  // Superpose
  linearWord: "linear",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Basis and Dimension",
  seriesLine: "Spaces, Maps, and Measurements · Season 2",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第二季 · 第 1 集",
  title: "能相加、能伸缩的一切",
  subtitle: "向量空间",
  stettin: "斯德丁，1844 年",
  grassmann: "格拉斯曼",
  book: "Ausdehnungslehre",
  mobius: "默比乌斯",
  university: "大学",
  sanskrit: "梵文《梨俱吠陀》",
  peano: "皮亚诺，1888 年",
  vectorSpace: "向量空间",
  arrow: "箭头",
  polynomial: "多项式",
  sound: "声音",
  waves: "y″ + y = 0",
  order: "不讲先后",
  zero: "有零",
  opposite: "有相反",
  spreads: "伸缩分配",
  fieldsLine: "数：任意一个域",
  onePlusOne: "1 + 1 = 0",
  jiuzhang: "《九章算术·方程》",
  method: "遍乘直除",
  rows: ["上禾", "中禾", "下禾", "实"],
  answer: "上禾一秉 = 9¼ 斗",
  bits: "比特串",
  functions: "函数",
  sequences: "数列",
  positives: "正数",
  sphere: "球面",
  offLine: "不过原点的直线",
  linearWord: "线性",
  nextEpisode: "下一集 · ",
  nextTitle: "基与维数",
  seriesLine: "空间、映射与度量 · 第二季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
