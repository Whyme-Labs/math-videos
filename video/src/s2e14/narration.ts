import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E14, condensed from lessons/s2/e14-inner-products.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "camera"
  | "circles"
  | "mojing"
  | "cauchy"
  | "norms"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Göttingen, 1908. Erhard Schmidt, a student of Hilbert, takes infinite lists of numbers and talks about them in Euclid's words: length, angle, right angle.",
    "So try it on functions. Are 1 and x perpendicular? By their coefficients, yes. By how much they overlap from minus 1 to 1, yes again.",
    "By how much they overlap from 0 to 1, no: they meet at exactly 30 degrees. Three honest answers, and they disagree.",
    "A vector space only knows how to add and scale. Length and angle are something extra that you choose. Today: that choice.",
  ],
  title: ["Season two, episode fourteen. Length and angle are a choice."],
  camera: [
    "First try: multiply the coordinates and add. But coordinates depend on the basis. Switch basis, and the same two arrows stop being perpendicular.",
    "So a ruler can't come from coordinates. It has to be a choice of its own: an inner product.",
  ],
  circles: [
    "An inner product is a symmetric form that's positive: every nonzero arrow gets a positive squared length. Its unit circle is an ellipse.",
    "Pick a different one and you get a different ellipse, with different right angles. Each one is a perfectly good geometry.",
  ],
  mojing: [], // Chinese edition only
  cauchy: [
    "Whatever ruler you pick, one inequality holds: the overlap of two arrows is never more than the product of their lengths.",
    "That's Cauchy–Schwarz, found three times by three people. It's what makes angles possible: the ratio always lands between minus one and one.",
  ],
  norms: [
    "Now the payoff. Some rulers measure length but have no angles at all. The taxi ruler's unit circle is a diamond; the max ruler's is a square.",
    "Which rulers hide a protractor? In 1935 Jordan and von Neumann found the test: the parallelogram law. Only the round ruler passes.",
  ],
  endCard: [
    "Length and angle are a choice: an inner product. Choose one and you get circles, right angles and Pythagoras.",
    "Next episode: complex vectors break the dot product. One bar over one letter fixes it.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1908 年，哥廷根。希尔伯特的学生施密特，拿无穷长的数列来谈欧几里得的词：长度、角度、直角。",
    "那就拿函数试试。1 和 x 垂直吗？按系数看，垂直。按从负 1 到 1 的重叠量看，也垂直。",
    "按从 0 到 1 的重叠量看，不垂直：夹角恰好 30 度。三个都说得通的答案，彼此打架。",
    "向量空间只会相加和伸缩。长度和角度是另外加上去的，要你自己选。今天就讲这个选择。",
  ],
  title: ["第二季，第十四集。长度与角度是一种选择。"],
  camera: [
    "先试试：坐标相乘再相加。可坐标取决于基。换一组基，同样两支箭头就不垂直了。",
    "所以尺子不能从坐标来。它得是单独的一个选择：内积。",
  ],
  circles: [
    "内积是一个正定的对称型：每支非零箭头的长度平方都是正的。它的单位圆是一个椭圆。",
    "换一个内积，就换一个椭圆，直角也跟着换。每一个都是完全合格的几何。",
  ],
  // 只在中文版出现：《墨经》“圜，一中同长也”
  mojing: [
    "《墨经》给圆下过定义：“圜，一中同长也。”一个中心，到它一样长的点，就是圆。",
    "可“一样长”要看用哪把尺子量。换一把尺，同样的定义画出来的是椭圆。",
    "墨家的定义没错；错的是以为尺子只有一把。",
  ],
  cauchy: [
    "不管选哪把尺子，有一条不等式总成立：两支箭头的重叠量，不会超过它们长度的乘积。",
    "这就是柯西–施瓦茨不等式，三个人先后发现了三次。有了它才有角度：那个比值总落在负 1 到 1 之间。",
  ],
  norms: [
    "压轴的来了。有些尺子能量长度，却根本没有角度。出租车尺的单位圆是菱形，最大值尺的是正方形。",
    "哪些尺子里藏着量角器？1935 年，约尔当和冯·诺伊曼找到了检验：平行四边形法则。只有圆的那把通过。",
  ],
  endCard: [
    "长度和角度是一种选择：内积。选定一个，就有了圆、直角和勾股定理。",
    "下一集：复向量把点积弄坏了。一个字母上加一道横，就修好了。",
  ],
};

export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  title: { 0: 2.8 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "camera",
  "circles",
  "mojing",
  "cauchy",
  "norms",
  "endCard",
];

export const S2E14 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { mojing: "zh" },
  season: 2,
});
