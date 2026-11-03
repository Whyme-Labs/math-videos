import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E17, from lessons/s2/e17-projection-and-least-squares.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): Ceres lost and found, four points no line can hit, the data as
// one arrow above the plane of everything the model can make, the shadow
// and the upright error, the closest-point proof by Pythagoras, the one-line
// formula, the normal equations worked on the data, the projector P with
// P² = P, Gram–Schmidt peeling shadows in 3D, and
// Legendre polynomials as the payoff.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "naive"
  | "shadow"
  | "closest"
  | "onLine"
  | "normal"
  | "projector"
  | "guishou"
  | "gram"
  | "legendre"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "New Year's night, 1801. Piazzi spots a moving dot.",
    "He tracks it for weeks. Then it slips into the Sun's glare.",
    "To find it again you need its orbit, from his measurements.",
    "Every measurement is slightly off. No orbit fits them all.",
    "Each guess misses somewhere.",
    "Gauss, aged 24: find the orbit that's least wrong.",
    "Make the sum of the squared misses as small as possible.",
    "In December, Ceres was right where he said.",
  ],
  title: ["Season two, episode seventeen. Projection and least squares."],
  naive: [
    "Smaller problem: four points, one straight line.",
    "Each point gives an equation for the height and slope.",
    "The first two fix the line: start at 1, rise 2.",
    "The third point says 1 + 4 = 4. No.",
    "Four equations, two unknowns. No exact answer.",
  ],
  shadow: [
    "Change the picture. The four heights are one arrow b.",
    "Every line the model can draw lands on a flat plane.",
    "b floats above it. That's why nothing fits.",
    "Shine a light straight down. b casts a shadow p.",
    "The error e = b − p stands perfectly upright.",
    "The best fit is the shadow.",
  ],
  closest: [
    "Why is the shadow the closest point? Pick any other u.",
    "From b to u: the error, then a step along the plane.",
    "Those two meet at a right angle. Pythagoras.",
    "So ‖b − u‖² = ‖e‖² + ‖p − u‖². Never smaller.",
    "Closest means exactly this: the error is perpendicular.",
  ],
  onLine: [
    "Simplest case first: the plane is one line, along a.",
    "The shadow of b is some multiple of a: p = x a.",
    "The error b − x a has to be perpendicular to a.",
    "So a · b − x a · a = 0. Solve for x.",
    "x = a·b / a·a. A shadow from two dot products.",
  ],
  normal: [
    "Back to the four points. Perpendicular to the plane means…",
    "…the error is perpendicular to both columns of A.",
    "That's AᵀA x = Aᵀb: the normal equations.",
    "Solve: height 1.5, slope 1. The line y = 1.5 + t.",
    "The misses: −½, ½, ½, −½. They balance to zero.",
    "Squared misses add to 1. No line does better.",
  ],
  projector: [
    "Making shadows is itself a map. Call it P.",
    "The shadow of a shadow doesn't move: P² = P.",
    "What P throws away is the error. That's I − P.",
    "Every b splits in two: fit plus error, at right angles.",
    "With the columns of A: P = A(AᵀA)⁻¹Aᵀ.",
  ],
  guishou: [], // Chinese edition only
  gram: [
    "Shadows need a basis at right angles. Here's how to make one.",
    "Keep the first arrow. Scale it to length 1.",
    "Take the second. Peel off its shadow on the first.",
    "What's left stands perpendicular. Scale it.",
    "Third: peel off its shadow on the plane of the first two.",
    "Gram–Schmidt. The peeled amounts fill a triangle: A = QR.",
  ],
  legendre: [
    "Do the same to functions: 1, x, x², x³ on [−1, 1].",
    "Peel each against the ones before.",
    "Legendre polynomials: each crosses zero once more.",
    "The best line for x² is the constant ⅓. The error: ⅔ P₂.",
  ],
  endCard: [
    "The best fit is a shadow. The error stands upright.",
    "Every least squares formula says exactly that.",
    "Next: symmetric maps and their perpendicular axes.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1801 年元旦夜。皮亚齐看见一个在星星间移动的光点。",
    "他追了几个星期，它却钻进了太阳的光芒里。",
    "要再找到它，得从他的观测算出轨道。",
    "每次观测都有一点误差。没有轨道能全都对上。",
    "每一个猜测，总有地方对不上。",
    "24 岁的高斯说：找最不错的那条轨道。",
    "让偏差的平方和尽可能小。",
    "到了十二月，谷神星就在他说的地方。",
  ],
  title: ["第二季，第十七集。投影与最小二乘。"],
  naive: [
    "先看个小问题：四个点，一条直线。",
    "每个点都给出一条关于截距和斜率的方程。",
    "前两个点定下直线：从 1 出发，斜率 2。",
    "第三个点却说 1 + 4 = 4。不对。",
    "四个方程，两个未知数。没有精确解。",
  ],
  shadow: [
    "换个看法：四个高度，合起来是一支箭头 b。",
    "模型能画出的每条直线，都落在一个平面上。",
    "b 浮在平面上方。所以怎么都对不上。",
    "从正上方打一束光。b 投下影子 p。",
    "误差 e = b − p 笔直地竖着。",
    "最好的拟合，就是这个影子。",
  ],
  closest: [
    "为什么影子最近？任取平面上另一点 u。",
    "从 b 到 u：先走误差，再沿平面走一步。",
    "这两段成直角。勾股定理。",
    "所以 ‖b − u‖² = ‖e‖² + ‖p − u‖²。不会更小。",
    "“最近”恰好就是：误差垂直于平面。",
  ],
  onLine: [
    "先看最简单的情形：平面只是一条沿 a 的直线。",
    "b 的影子是 a 的某个倍数：p = x a。",
    "误差 b − x a 必须垂直于 a。",
    "所以 a · b − x a · a = 0。解出 x。",
    "x = a·b / a·a。影子只要两次点积。",
  ],
  normal: [
    "回到那四个点。垂直于平面，意思是……",
    "……误差同时垂直于 A 的两列。",
    "这就是 AᵀA x = Aᵀb：法方程。",
    "解出来：截距 1.5，斜率 1。直线 y = 1.5 + t。",
    "四个偏差：−½、½、½、−½。正好抵消。",
    "偏差平方和是 1。没有直线能更好。",
  ],
  projector: [
    "造影子这件事本身是一个映射，叫它 P。",
    "影子的影子一动不动：P² = P。",
    "P 扔掉的正是误差，也就是 I − P。",
    "每个 b 都拆成两份：拟合加误差，互成直角。",
    "用 A 的列来写：P = A(AᵀA)⁻¹Aᵀ。",
  ],
  // 只在中文版出现：郭守敬四丈高表与景符
  guishou: [
    "元代郭守敬测日影，立起四丈高表。",
    "表越高，影子越长，读数的误差就相对越小。",
    "他又造景符，让模糊的影端变成一个清楚的亮点。",
    "冬至前后多日测影，前后对照，求出冬至的时刻。",
  ],
  gram: [
    "影子需要一组互相垂直的基。看怎么造。",
    "第一支箭头留下，缩放到长度 1。",
    "第二支：剥掉它在第一支上的影子。",
    "剩下的部分垂直于第一支。再缩放。",
    "第三支：剥掉它在前两支平面上的影子。",
    "格拉姆–施密特。剥下的量填成一个三角：A = QR。",
  ],
  legendre: [
    "对函数也这么做：[−1, 1] 上的 1、x、x²、x³。",
    "每一个都和前面的剥一遍。",
    "得到勒让德多项式，每个多一次起伏。",
    "x² 最好的直线近似是常数 ⅓，误差是 ⅔ P₂。",
  ],
  endCard: [
    "最好的拟合是影子，误差笔直竖着。",
    "每个最小二乘公式，说的都是这件事。",
    "下一集：对称映射，以及它的轴为什么互相垂直。",
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
  coldOpen: { 0: 5, 1: 5, 2: 4, 3: 4.5, 4: 4, 5: 4, 6: 5, 7: 5 },
  naive: { 0: 4, 1: 4.5, 2: 5, 3: 4.5, 4: 4 },
  shadow: { 0: 5, 1: 5, 2: 4, 3: 5, 4: 4.5, 5: 4 },
  closest: { 0: 4.5, 1: 5, 2: 4.5, 3: 5.5, 4: 4.5 },
  onLine: { 0: 4.5, 1: 4.5, 2: 4.5, 3: 5.5, 4: 5 },
  projector: { 0: 4.5, 1: 5, 2: 5, 3: 5, 4: 5 },
  normal: { 0: 4, 1: 4.5, 2: 5, 3: 5, 4: 5, 5: 4.5 },
  guishou: { 0: 4.5, 1: 5, 2: 5, 3: 5 },
  gram: { 0: 4, 1: 4.5, 2: 5, 3: 4.5, 4: 5.5, 5: 5 },
  legendre: { 0: 5, 1: 5, 2: 5, 3: 5.5 },
  endCard: { 0: 4, 1: 4, 2: 5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "naive",
  "shadow",
  "closest",
  "onLine",
  "normal",
  "projector",
  "guishou",
  "gram",
  "legendre",
  "endCard",
];

export const S2E17 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { guishou: "zh" },
  season: 2,
  captions: "large",
});
