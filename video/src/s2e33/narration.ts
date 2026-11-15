import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E33, the Season 2 finale, from
// lessons/s2/e33-distributions.md, on the new standard (about five
// minutes, one-line captions, the visuals explain): the Dirac delta that
// cannot be a function, boxes that converge only as measurements, test
// functions and distributions, the distributional derivative and H′ = δ,
// Green's functions, the weak form of Poisson's equation solved by Riesz,
// and a montage of the season's story of measurement. Each line is one
// caption and one cue; MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "boxes"
  | "distributions"
  | "derivative"
  | "bell"
  | "green"
  | "weak"
  | "montage"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Physicists love the Dirac delta, δ(x).",
    "Zero everywhere, except one infinitely tall spike.",
    "Its area is exactly 1: a point charge, a hammer blow.",
    "One problem: no such function exists.",
    "Zero except at one point means area 0, not 1.",
    "Schwartz noticed δ is only ever used inside integrals.",
    "And ∫ δ(x) φ(x) dx is always just φ(0).",
    "So let δ be a measurement, not a function.",
  ],
  title: ["Season two, episode thirty-three. Distributions."],
  boxes: [
    "Try boxes: width 1/n, height n, area 1.",
    "Pointwise, they tend to 0 everywhere but one point.",
    "In L² they blow up: ‖δₙ‖² = n.",
    "But measured against any smooth φ, they settle.",
    "∫ δₙ φ → φ(0). The measurements converge.",
  ],
  distributions: [
    "Test functions: smooth bumps that vanish outside a box.",
    "A distribution: a continuous linear functional on them.",
    "Every function f is one: φ ↦ ∫ f φ.",
    "The delta is one too: δ(φ) = φ(0).",
    "So are measures, and their point masses.",
    "Tiny inputs, huge dual: D ⊂ L² ⊂ D′.",
  ],
  derivative: [
    "Integration by parts: ∫ f′φ = −∫ f φ′.",
    "Make it the definition: T′(φ) = −T(φ′).",
    "Now every distribution has every derivative.",
    "The step H: H′(φ) = −∫ φ′ over [0, ∞) = φ(0).",
    "So H′ = δ. A jump differentiates into a spike.",
    "And limits commute with derivatives, at last.",
  ],
  bell: [], // Chinese edition only
  green: [
    "Green's function: solve LG = δ once.",
    "Any source f is a sum of shifted point sources.",
    "So u = G ∗ f: add up the responses.",
    "On a string: G(x, y) = min(x, y)(1 − max(x, y)).",
    "In 3D, G = 1/(4π|x|): a point charge's potential.",
  ],
  weak: [
    "Poisson: −u″ = f, with u = 0 at both ends.",
    "Multiply by a test v, integrate: ∫ u′v′ = ∫ f v.",
    "a(u, v) = ∫ u′v′ is an inner product on H¹₀.",
    "v ↦ ∫ f v is bounded, so Riesz gives exactly one u.",
    "Finite elements: solve the same thing on hat functions.",
    "The error is ⟂ to the hats: a projection, again.",
  ],
  montage: [
    "This season was one story about measurement.",
    "Covectors measured arrows. Riesz turned them back.",
    "Hahn–Banach: enough measurements to tell things apart.",
    "Koopman: study chaos through what you can measure.",
    "A function is the way it answers measurements.",
    "Answer like a function, and you are one: δ.",
  ],
  endCard: [
    "Distributions: functions, extended by duality.",
    "That's Season 2: spaces, maps, and measurements.",
    "Next season: algebra meets linear algebra.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "物理学家最爱狄拉克 δ 函数 δ(x)。",
    "处处为零，只在一点有无穷高的尖峰。",
    "面积正好是 1：一个点电荷，一记锤击。",
    "只有一个问题：这样的函数不存在。",
    "只在一点非零，面积就是 0，不是 1。",
    "施瓦茨注意到：δ 总是出现在积分里。",
    "而 ∫ δ(x) φ(x) dx 永远等于 φ(0)。",
    "那就让 δ 当一个测量，而不是函数。",
  ],
  title: ["第二季，第三十三集。广义函数。"],
  boxes: [
    "试试方块：宽 1/n，高 n，面积 1。",
    "逐点看，除了一个点，处处趋于 0。",
    "在 L² 里它爆掉了：‖δₙ‖² = n。",
    "可拿任何光滑的 φ 去测，结果稳住了。",
    "∫ δₙ φ → φ(0)。测量值收敛。",
  ],
  distributions: [
    "试验函数：光滑的鼓包，出了一个盒子就是 0。",
    "广义函数：试验函数上的连续线性泛函。",
    "每个函数 f 都是：φ ↦ ∫ f φ。",
    "δ 也是：δ(φ) = φ(0)。",
    "测度也是，包括点质量。",
    "输入越小，对偶越大：D ⊂ L² ⊂ D′。",
  ],
  derivative: [
    "分部积分：∫ f′φ = −∫ f φ′。",
    "把它当定义：T′(φ) = −T(φ′)。",
    "从此每个广义函数都能求任意阶导数。",
    "阶跃 H：H′(φ) = −∫ φ′（0 到 ∞）= φ(0)。",
    "所以 H′ = δ。跳跃求导变成尖峰。",
    "极限和求导终于可以交换了。",
  ],
  // 只在中文版出现：《礼记·学记》论撞钟
  bell: [
    "《礼记·学记》：“善待问者如撞钟。”",
    "“叩之以小者则小鸣，叩之以大者则大鸣。”",
    "一记敲击就是 δ，钟声就是它的响应。",
    "敲多大，响多大：响应是线性的，可以叠加。",
  ],
  green: [
    "格林函数：先解一次 LG = δ。",
    "任何源 f 都是平移的点源叠起来的。",
    "所以 u = G ∗ f：把响应加起来。",
    "弦上：G(x, y) = min(x, y)(1 − max(x, y))。",
    "三维：G = 1/(4π|x|)，点电荷的电势。",
  ],
  weak: [
    "泊松方程：−u″ = f，两端 u = 0。",
    "乘上试验函数 v 再积分：∫ u′v′ = ∫ f v。",
    "a(u, v) = ∫ u′v′ 是 H¹₀ 上的内积。",
    "v ↦ ∫ f v 有界，里斯给出唯一的 u。",
    "有限元：在帽子函数上解同一个方程。",
    "误差与帽子函数正交：又是投影。",
  ],
  montage: [
    "这一季讲的是一个关于测量的故事。",
    "余向量测量箭头，里斯又把测量变回箭头。",
    "哈恩–巴拿赫：测量多到足以区分一切。",
    "库普曼：通过测量来研究混沌。",
    "一个函数，就是它回应测量的方式。",
    "回应得像函数，你就是函数：δ。",
  ],
  endCard: [
    "广义函数：用对偶把函数扩充。",
    "第二季到此结束：空间、映射与度量。",
    "下一季：代数遇上线性代数。",
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
  coldOpen: { 0: 5.5, 1: 6, 2: 6, 3: 5.5, 4: 6, 5: 6, 6: 6, 7: 6 },
  boxes: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6.5 },
  distributions: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 5.5, 5: 6.5 },
  derivative: { 0: 6, 1: 6, 2: 5.5, 3: 6.5, 4: 6, 5: 6 },
  bell: { 0: 6, 1: 6, 2: 6, 3: 6.5 },
  green: { 0: 6, 1: 6.5, 2: 6, 3: 6, 4: 6 },
  weak: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6.5, 5: 6 },
  montage: { 0: 5.5, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6.5 },
  endCard: { 0: 5, 1: 5.5, 2: 6 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "boxes",
  "distributions",
  "derivative",
  "bell",
  "green",
  "weak",
  "montage",
  "endCard",
];

export const S2E33 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { bell: "zh" },
  season: 2,
  captions: "large",
});
