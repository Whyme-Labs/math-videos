import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E14, from lessons/s2/e14-inner-products.md. First episode
// on the new standard: about five minutes, short one-line captions (the
// visuals carry the explanation), and real teaching: the failed naive idea,
// the three axioms, why positive matters, every inner product as a bowl and
// an ellipse, the view from inside, a proof of Cauchy–Schwarz, the cold
// open's 30° computed, and the parallelogram-law test.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "coords"
  | "axioms"
  | "bowl"
  | "ellipse"
  | "inside"
  | "cauchy"
  | "angle"
  | "mojing"
  | "norms"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Göttingen, 1908. Schmidt treats functions as arrows.",
    "Functions add and scale. So: are 1 and x perpendicular?",
    "By coefficients, 1 is (1, 0) and x is (0, 1). Yes.",
    "Or multiply them and add up the area from −1 to 1.",
    "The halves cancel. Overlap zero: perpendicular again.",
    "Now add up from 0 to 1. Nothing cancels.",
    "Worked out, the angle is exactly 30 degrees.",
    "Three honest answers. They disagree.",
    "A vector space can't measure angles. You choose how.",
  ],
  title: ["Season two, episode fourteen. Length and angle are a choice."],
  coords: [
    "First idea: pick a basis and dot the coordinates.",
    "Here's a basis: b₁ along the floor, b₂ tilted up.",
    "In its own coordinates, b₁ = (1, 0) and b₂ = (0, 1).",
    "Dot them: zero. The coordinates say perpendicular.",
    "The protractor says 45 degrees.",
    "Change the basis, the answer changes. Not a real angle.",
  ],
  axioms: [
    "So choose the ruler on purpose. Call it ⟨u, v⟩.",
    "Rule one, linear: double u and the overlap doubles.",
    "Rule two, symmetric: ⟨u, v⟩ equals ⟨v, u⟩.",
    "Rule three, positive: ⟨v, v⟩ > 0 unless v = 0.",
    "That's an inner product. Nothing else is assumed.",
  ],
  bowl: [
    "Draw ⟨v, v⟩ as a height above every arrow v.",
    "The dot product makes a bowl, up everywhere but 0.",
    "Some symmetric forms make a saddle instead.",
    "A saddle dips below zero: a negative length². Ruled out.",
    "An inner product is always a bowl.",
  ],
  ellipse: [
    "Every bowl comes from a symmetric matrix G.",
    "Slice the bowl at height 1.",
    "The rim is G's unit circle: an ellipse.",
    "Change G: the bowl tips, the ellipse turns.",
    "Each ellipse brings its own right angles.",
  ],
  inside: [
    "Now live inside one of these geometries.",
    "Stretch the plane until the ellipse is round.",
    "Its right-angle pair becomes an ordinary right angle.",
    "From inside, every inner product is the dot product.",
    "What differs is which arrows count as perpendicular.",
  ],
  cauchy: [
    "One inequality holds for every inner product. Why?",
    "Take u and v. Slide along v: the arrow u − tv.",
    "Plot its length² against t. It traces a parabola.",
    "Positive rule: the parabola never goes below zero.",
    "At the bottom, u − tv is perpendicular to v.",
    "Never below zero means overlap² ≤ length² × length².",
    "Cauchy–Schwarz. Equal only when u lies along v.",
  ],
  angle: [
    "So overlap ÷ (length × length) stays between −1 and 1.",
    "Call it cos θ. Every inner product gets angles.",
    "Back to 1 and x on [0, 1]: overlap ½.",
    "Lengths²: 1 for the 1, ⅓ for the x. So cos θ = √3/2.",
    "θ = 30°. A real angle between two arrows.",
  ],
  mojing: [], // Chinese edition only
  norms: [
    "Some rulers measure length but hide no protractor.",
    "Taxi length |x| + |y|: the unit circle is a diamond.",
    "Chessboard length, the bigger of |x|, |y|: a square.",
    "Taxi Pythagoras: the unit square's diagonal is 2.",
    "Not √2. Pythagoras fails, so there are no angles.",
    "The test: diagonals² against sides², on a balance.",
    "Sweep every ruler from diamond to square.",
    "Only the round one balances. Jordan–von Neumann, 1935.",
  ],
  endCard: [
    "A vector space has no ruler. You choose one.",
    "Choose an inner product and Euclid comes for free.",
    "Next: complex vectors break it. One bar fixes it.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1908 年，哥廷根。施密特把函数当箭头看。",
    "函数能相加、能伸缩。那么，1 和 x 垂直吗？",
    "按系数：1 是 (1, 0)，x 是 (0, 1)。垂直。",
    "或者把两者相乘，从 −1 到 1 求面积。",
    "两半正负抵消，重叠为零：又垂直。",
    "换成从 0 到 1。这回不抵消。",
    "算出来，夹角恰好 30 度。",
    "三个都说得通的答案，彼此打架。",
    "向量空间不会量角度。怎么量，你来选。",
  ],
  title: ["第二季，第十四集。长度与角度是一种选择。"],
  coords: [
    "第一个想法：选一组基，把坐标点乘。",
    "换一组基：b₁ 贴着地面，b₂ 斜向上。",
    "在它自己的坐标里，b₁ = (1, 0)，b₂ = (0, 1)。",
    "点乘得零。坐标说：垂直。",
    "量角器说：45 度。",
    "换基，答案就变。这不是真的角度。",
  ],
  axioms: [
    "那就有意识地选一把尺子，记作 ⟨u, v⟩。",
    "第一条，线性：u 翻倍，重叠量也翻倍。",
    "第二条，对称：⟨u, v⟩ 等于 ⟨v, u⟩。",
    "第三条，正定：v ≠ 0 时 ⟨v, v⟩ > 0。",
    "这就是内积。别的什么都不假设。",
  ],
  bowl: [
    "把 ⟨v, v⟩ 画成每支箭头上方的高度。",
    "点积是一只碗：除了原点，处处向上。",
    "有的对称形式却是一只马鞍。",
    "马鞍会沉到零下：长度平方为负。不行。",
    "内积永远是一只碗。",
  ],
  ellipse: [
    "每只碗都来自一个对称矩阵 G。",
    "在高度 1 处把碗切开。",
    "切口就是 G 的单位圆：一个椭圆。",
    "换一个 G：碗歪了，椭圆也转了。",
    "每个椭圆都带着自己的直角。",
  ],
  inside: [
    "住进其中一种几何里看看。",
    "把平面拉伸，直到椭圆变圆。",
    "它那对直角箭头，成了普通的直角。",
    "从里面看，每个内积都是点积。",
    "不同的只是：哪些箭头算垂直。",
  ],
  cauchy: [
    "有一条不等式对每个内积都成立。看为什么。",
    "取 u 和 v。沿 v 滑动：箭头 u − tv。",
    "把它的长度平方对 t 画出来：一条抛物线。",
    "正定：抛物线永远不低于零。",
    "最低点处，u − tv 恰好垂直于 v。",
    "不低于零，就是：重叠² ≤ 长度² × 长度²。",
    "柯西–施瓦茨。只有 u 沿着 v 时取等号。",
  ],
  angle: [
    "所以 重叠 ÷（长度 × 长度）总在 −1 到 1 之间。",
    "把它叫 cos θ。每个内积都有了角度。",
    "回到 [0, 1] 上的 1 和 x：重叠是 ½。",
    "长度平方：1 是 1，x 是 ⅓。cos θ = √3/2。",
    "θ = 30°。两支箭头之间的真角度。",
  ],
  // 只在中文版出现：《墨经》“圜，一中同长也”
  mojing: [
    "《墨经》：“圜，一中同长也。”",
    "一个中心，一样长的点，连起来就是圆。",
    "可“一样长”要看哪把尺子。换尺，就成了椭圆。",
    "定义没错；错在以为尺子只有一把。",
  ],
  norms: [
    "有的尺子能量长度，却藏不下量角器。",
    "出租车长度 |x| + |y|：单位圆是菱形。",
    "棋盘长度，取 |x|、|y| 中大的：正方形。",
    "出租车里的勾股：单位正方形对角线长 2。",
    "不是 √2。勾股定理失效：这里没有角度。",
    "检验：对角线平方和，与边的平方和上天平。",
    "从菱形到正方形，把每把尺子都试一遍。",
    "只有圆的那把能放平。约尔当、冯·诺伊曼，1935。",
  ],
  endCard: [
    "向量空间本身没有尺子。要你来选。",
    "选定内积，欧几里得的几何全都白送。",
    "下一集：复向量把它弄坏了，一道横就修好。",
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
  coldOpen: { 0: 4.5, 1: 4, 2: 4.5, 3: 5, 4: 4.5, 5: 5, 6: 5, 7: 3.5, 8: 4.5 },
  coords: { 0: 3.5, 1: 4.5, 2: 4.5, 3: 4, 4: 4, 5: 5.5 },
  axioms: { 0: 3.5, 1: 5, 2: 5, 3: 6, 4: 3.5 },
  bowl: { 0: 4.5, 1: 5, 2: 5.5, 3: 5, 4: 3.5 },
  ellipse: { 0: 4, 1: 4, 2: 4, 3: 6, 4: 5 },
  inside: { 0: 3.5, 1: 5.5, 2: 4.5, 3: 4.5, 4: 5 },
  cauchy: { 0: 3.5, 1: 5, 2: 6, 3: 5, 4: 5, 5: 5.5, 6: 5.5 },
  angle: { 0: 4.5, 1: 4.5, 2: 5, 3: 5.5, 4: 4.5 },
  mojing: { 0: 4.5, 1: 4.5, 2: 5, 3: 4 },
  norms: { 0: 3.5, 1: 4.5, 2: 4.5, 3: 5.5, 4: 4, 5: 5, 6: 6, 7: 5 },
  endCard: { 0: 4, 1: 4, 2: 5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "coords",
  "axioms",
  "bowl",
  "ellipse",
  "inside",
  "cauchy",
  "angle",
  "mojing",
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
  captions: "large",
});
