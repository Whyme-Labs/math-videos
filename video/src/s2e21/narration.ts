import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E21, from lessons/s2/e21-normed-spaces-and-bounded-operators.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): three judges disagree about a row of spikes, the rules of a
// norm and its convex unit ball, the zoo on sequences, why all norms on
// the plane agree (and the one step that needs finite dimension), bounded
// operators and three operator norms of one matrix, Riesz's lemma, and
// the holes in continuous functions under the area norm.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "norm"
  | "zoo"
  | "spread"
  | "finite"
  | "kaogong"
  | "bounded"
  | "matrix"
  | "riesz"
  | "holes"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "A row of spikes on [0, 1], each taller and thinner.",
    "The n-th is n tall and 1/n² wide.",
    "Do they shrink to zero? Ask three judges.",
    "The accountant measures area: 1/(2n). Yes, to zero.",
    "The engineer measures energy: always ⅓. No.",
    "The inspector measures the peak: n. It explodes.",
    "Same functions, three verdicts.",
    "In the plane this can't happen. Today: why not.",
  ],
  title: ["Season two, episode twenty-one. Normed spaces."],
  norm: [
    "A norm is a length with three rules.",
    "Zero only for 0. Double x, double it. Triangle rule.",
    "Each norm has a unit ball: a diamond, a disc, a square.",
    "The triangle rule holds exactly when the ball is convex.",
    "A star-shaped ball breaks it. That's not a norm.",
  ],
  zoo: [
    "The same rules give a zoo on sequences: ℓ¹, ℓ², ℓ∞.",
    "For every sequence: peak ≤ energy ≤ total.",
    "(1, ½, ⅓, …) has finite energy but infinite total.",
    "(1, 1, 1, …) is bounded, with infinite energy.",
  ],
  spread: [
    "Spread a total of 1 evenly over n boxes.",
    "The total stays 1. Energy: 1/√n. The peak: 1/n.",
    "Two norms agree if each is at most C times the other.",
    "For the spikes, peak ÷ area = 2n². No C works.",
  ],
  finite: [
    "In the plane, every two norms agree. Here's why.",
    "Any norm is at most a constant times the usual length.",
    "For the other side, look at the unit circle.",
    "It's closed and bounded, so the norm has a minimum on it.",
    "That value isn't 0. It's the constant we need.",
    "One step used finite dimension: the circle is compact.",
  ],
  kaogong: [], // Chinese edition only
  bounded: [
    "Good linear maps respect small: ‖Tx‖ ≤ C‖x‖.",
    "The best C is the operator norm. For matrices, σ₁.",
    "Bounded and continuous turn out to be the same thing.",
    "Differentiation fails: xⁿ has peak 1 but slope n.",
    "Charge for steepness too, and it's bounded again.",
    "Bounded depends on the map and on both norms.",
  ],
  matrix: [
    "One matrix, three rulers, three operator norms.",
    "A = [1 2; 3 4]. Push each unit ball through it.",
    "Diamond rules: 6. Disc rules: 5.46. Square rules: 7.",
    "How big a map is depends on how you measure.",
  ],
  riesz: [
    "Why is the unit ball never compact? Riesz, 1918.",
    "Beyond any closed subspace, a unit vector lies far off.",
    "At least ½ away. Add it to the subspace, and repeat.",
    "Unit vectors, all at least ½ apart, forever.",
    "The ball is compact only in finite dimensions.",
  ],
  holes: [
    "One more crack. Ramps get steeper and steeper.",
    "In area, they crowd closer and closer together.",
    "But where they're heading, a step, isn't continuous.",
    "With the area norm, continuous functions have holes.",
  ],
  endCard: [
    "In infinite dimensions, rulers genuinely disagree.",
    "Choosing a norm chooses what small means.",
    "Next: measure. How big is a set?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "[0, 1] 上一排尖刺，一个比一个高、一个比一个窄。",
    "第 n 个高 n，宽 1/n²。",
    "它们缩到零了吗？问三位裁判。",
    "会计量面积：1/(2n)。是的，趋于零。",
    "工程师量能量：永远是 ⅓。不是。",
    "安全员量峰值：n。它爆炸了。",
    "同一串函数，三个判决。",
    "在平面上这不可能发生。今天：为什么。",
  ],
  title: ["第二季，第二十一集。赋范空间。"],
  norm: [
    "范数是一种长度，守三条规矩。",
    "只有零的长度是零；x 加倍长度加倍；三角不等式。",
    "每个范数有一个单位球：菱形、圆盘、正方形。",
    "三角不等式成立，恰好当单位球是凸的。",
    "星形的“球”会破坏它，那就不是范数。",
  ],
  zoo: [
    "同样的规矩，在数列上给出一园子：ℓ¹、ℓ²、ℓ∞。",
    "对每个数列：峰值 ≤ 能量 ≤ 总量。",
    "(1, ½, ⅓, …) 能量有限，总量无穷。",
    "(1, 1, 1, …) 有界，能量却无穷。",
  ],
  spread: [
    "把总量 1 平均摊到 n 个格子里。",
    "总量还是 1。能量是 1/√n，峰值是 1/n。",
    "两个范数等价：各自不超过另一个的 C 倍。",
    "对那些尖刺，峰值 ÷ 面积 = 2n²。没有 C 管用。",
  ],
  finite: [
    "在平面上，任何两个范数都等价。看为什么。",
    "任何范数都不超过普通长度的常数倍。",
    "另一边，看单位圆。",
    "单位圆有界又闭合，范数在上面取得最小值。",
    "这个最小值不是 0，它就是要找的常数。",
    "只有一步用到有限维：单位圆是紧的。",
  ],
  // 只在中文版出现：《周礼·考工记·轮人》检验车轮
  kaogong: [
    "《考工记·轮人》讲怎样检验一只车轮。",
    "规之以视其圆，萬之以视其匡，县之以视其辐之直。",
    "水之以视其平沉之均，权之以视其轻重之侔。",
    "同一只轮子，用几种办法量，各量各的好坏。",
  ],
  bounded: [
    "好的线性映射尊重“小”：‖Tx‖ ≤ C‖x‖。",
    "最小的 C 就是算子范数。对矩阵，就是 σ₁。",
    "有界和连续，原来是同一回事。",
    "求导就不行：xⁿ 峰值是 1，斜率却是 n。",
    "把陡峭也算进长度，它又有界了。",
    "有没有界，取决于映射和两边的范数。",
  ],
  matrix: [
    "一个矩阵，三把尺子，三个算子范数。",
    "A = [1 2; 3 4]。把每种单位球推过去。",
    "菱形尺：6。圆盘尺：5.46。正方形尺：7。",
    "一个映射有多大，要看你怎么量。",
  ],
  riesz: [
    "单位球为什么永远不紧？里斯，1918 年。",
    "对任何闭的子空间，总有一个单位向量离它很远。",
    "至少相距 ½。把它加进子空间，再来一次。",
    "一串单位向量，两两至少相距 ½，没有尽头。",
    "只有在有限维里，单位球才是紧的。",
  ],
  holes: [
    "还有一道裂缝。一串斜坡越来越陡。",
    "按面积量，它们彼此越挤越近。",
    "可它们奔向的阶梯函数，并不连续。",
    "用面积范数，连续函数的空间有洞。",
  ],
  endCard: [
    "在无限维里，尺子之间真的会打架。",
    "选一个范数，就是选什么叫“小”。",
    "下一集：测度。一个集合有多大？",
  ],
};

export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  title: { 0: 3 },
  coldOpen: {
    0: 5.25,
    1: 4.75,
    2: 4.75,
    3: 5.75,
    4: 5.25,
    5: 5.25,
    6: 4.25,
    7: 4.75,
  },
  norm: { 0: 4.25, 1: 5.75, 2: 5.75, 3: 5.75, 4: 5.25 },
  zoo: { 0: 5.25, 1: 5.25, 2: 5.25, 3: 5.25 },
  spread: { 0: 5.25, 1: 5.75, 2: 5.25, 3: 5.25 },
  finite: { 0: 4.75, 1: 5.25, 2: 4.75, 3: 5.75, 4: 5.25, 5: 5.25 },
  kaogong: { 0: 4.75, 1: 5.75, 2: 5.75, 3: 5.25 },
  bounded: { 0: 5.25, 1: 5.25, 2: 4.75, 3: 5.25, 4: 5.25, 5: 4.75 },
  matrix: { 0: 4.75, 1: 5.75, 2: 6.75, 3: 4.75 },
  riesz: { 0: 4.75, 1: 5.75, 2: 5.75, 3: 5.25, 4: 4.75 },
  holes: { 0: 5.25, 1: 5.25, 2: 5.25, 3: 5.25 },
  endCard: { 0: 4.25, 1: 4.75, 2: 5.25 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "norm",
  "zoo",
  "spread",
  "finite",
  "kaogong",
  "bounded",
  "matrix",
  "riesz",
  "holes",
  "endCard",
];

export const S2E21 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { kaogong: "zh" },
  season: 2,
  captions: "large",
});
