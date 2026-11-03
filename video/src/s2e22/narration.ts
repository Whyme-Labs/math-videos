import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E22, from lessons/s2/e22-measure-spaces-and-lebesgue.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): a random fraction has chance zero and the Cantor set is as big
// as ℝ with length zero, Dirichlet's function breaks Riemann, the rules
// for size, the fractions covered by intervals of total length ε, the
// Cantor set's length and its base-3 digits, Vitali's set that no size
// fits, Lebesgue slicing the heights, functions equal almost everywhere,
// and probability as measure.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "dirichlet"
  | "rules"
  | "nullQ"
  | "cantor"
  | "vitali"
  | "caochong"
  | "lebesgue"
  | "ae"
  | "probability"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Pick a number between 0 and 1, completely at random.",
    "What's the chance it's a fraction?",
    "Fractions are everywhere. Zoom anywhere: they swarm.",
    "The chance is zero. Not small. Zero.",
    "Stranger still: delete the middle third of [0, 1].",
    "From each piece, delete the middle third. Forever.",
    "You remove total length 1. As many points as ℝ remain.",
    "Counting and measuring are different questions.",
  ],
  title: ["Season two, episode twenty-two. Measure."],
  dirichlet: [
    "Riemann integrates by cutting the x-axis into strips.",
    "Dirichlet's function: 1 on fractions, 0 everywhere else.",
    "Every strip, however thin, holds both. Upper 1, lower 0.",
    "No integral, though it's a limit of integral-0 functions.",
    "The Riemann integral can't take limits.",
  ],
  rules: [
    "So what should size mean? Intervals keep their length.",
    "Sliding a set along doesn't change its size.",
    "Countably many separate pieces: their sizes add.",
    "Countably, because limits come one step at a time.",
  ],
  nullQ: [
    "Now the fractions. List them: q₁, q₂, q₃, …",
    "Cover q₁ by an interval of length ε/2.",
    "q₂ by ε/4, q₃ by ε/8, and so on.",
    "Total length at most ε, however small ε is.",
    "So the fractions have size zero.",
  ],
  cantor: [
    "The Cantor set: 2ⁿ pieces, each 3⁻ⁿ long.",
    "Removed: ⅓ + 2/9 + 4/27 + … = 1.",
    "What's left: base-3 numbers using only 0s and 2s.",
    "Turn each 2 into a 1: every binary number appears.",
    "Size zero, yet as many points as [0, 1].",
  ],
  vitali: [
    "Can every set be given a size? No.",
    "Call x and y friends if x − y is a fraction.",
    "Choose one from each group of friends. That's the set V.",
    "Slide V by every fraction in [−1, 1]: separate copies.",
    "They cover [0, 1] and fit in [−1, 2]. No size works.",
  ],
  caochong: [], // Chinese edition only
  lebesgue: [
    "Lebesgue's idea: slice the heights, not the x-axis.",
    "Like counting coins: sort by value, then count each pile.",
    "For each height t, measure where f is above t.",
    "Add over all heights. For x², that gives ⅓.",
    "Dirichlet's function: 1 × size of the fractions = 0.",
    "And now limits and integrals can swap.",
  ],
  ae: [
    "Two functions that differ on a size-zero set…",
    "…like x, and x plus Dirichlet's function…",
    "…are at distance 0. In L¹ they're the same element.",
    "So an element of L¹ has no value at a single point.",
  ],
  probability: [
    "Probability runs on this. Kolmogorov, 1933.",
    "Events are measurable sets; chance is their size.",
    "A random fraction: probability 0, yet it can happen.",
    "An expected value is an integral.",
  ],
  endCard: [
    "Size is a measure, and it has to be chosen with care.",
    "Countable sets are tiny. Some sets can't be sized at all.",
    "Next: complete spaces. Filling in the holes.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "在 0 到 1 之间完全随机地挑一个数。",
    "它是分数的机会有多大？",
    "分数到处都是，往哪里放大都密密麻麻。",
    "机会是零。不是很小，是零。",
    "更怪的：把 [0, 1] 中间的三分之一挖掉。",
    "每一段再挖掉中间的三分之一，一直挖下去。",
    "总共挖掉长度 1，剩下的点却和 ℝ 一样多。",
    "数个数和量大小，是两个不同的问题。",
  ],
  title: ["第二季，第二十二集。测度。"],
  dirichlet: [
    "黎曼积分把横轴切成一条条窄带。",
    "狄利克雷函数：分数处是 1，其余是 0。",
    "每条窄带再窄，两种点都有。上和 1，下和 0。",
    "没有积分。可它是一串积分为 0 的函数的极限。",
    "黎曼积分经不起取极限。",
  ],
  rules: [
    "那“大小”该是什么？区间保留它的长度。",
    "把集合平移，大小不变。",
    "可数多块互不相交的部分：大小相加。",
    "要可数，因为极限是一步一步取的。",
  ],
  nullQ: [
    "现在看分数。把它们排成一列：q₁, q₂, q₃, …",
    "用长 ε/2 的区间盖住 q₁。",
    "q₂ 用 ε/4，q₃ 用 ε/8，依此类推。",
    "总长不超过 ε，ε 要多小都行。",
    "所以分数的大小是零。",
  ],
  cantor: [
    "康托尔集：2ⁿ 段，每段长 3⁻ⁿ。",
    "挖掉的：⅓ + 2/9 + 4/27 + … = 1。",
    "剩下的：三进制里只用 0 和 2 写的数。",
    "把每个 2 换成 1：每个二进制数都出现了。",
    "大小是零，点却和 [0, 1] 一样多。",
  ],
  vitali: [
    "每个集合都能给个大小吗？不能。",
    "如果 x − y 是分数，就说 x 和 y 是朋友。",
    "每个朋友圈里挑一个人，组成集合 V。",
    "把 V 平移 [−1, 1] 里的每个分数：互不相交的副本。",
    "副本盖住 [0, 1]，又装进 [−1, 2]：大小定不了。",
  ],
  // 只在中文版出现：曹冲称象（《三国志·魏书·邓哀王冲传》）
  caochong: [
    "《三国志》记载，曹冲称象。",
    "大象太重，秤称不了。",
    "把象牵上船，刻下水痕；换成石头，装到同一道水痕。",
    "石头一块块称，加起来就是象重：换个切法来量。",
  ],
  lebesgue: [
    "勒贝格的想法：切高度，不切横轴。",
    "像数硬币：先按面值分堆，再数每堆。",
    "对每个高度 t，量出 f 高于 t 的地方有多大。",
    "把所有高度加起来。对 x²，得到 ⅓。",
    "狄利克雷函数：1 × 分数的大小 = 0。",
    "现在极限和积分可以交换了。",
  ],
  ae: [
    "两个函数，只在大小为零的集合上不同……",
    "……比如 x，和 x 加上狄利克雷函数……",
    "……距离是 0。在 L¹ 里它们是同一个元素。",
    "所以 L¹ 的元素，在单独一点上没有值。",
  ],
  probability: [
    "概率论就建立在这上面。柯尔莫哥洛夫，1933 年。",
    "事件是可测集，概率是它的大小。",
    "随机取到分数：概率为 0，却可能发生。",
    "期望值就是一个积分。",
  ],
  endCard: [
    "大小是一种测度，得小心地选。",
    "可数集小得可以忽略，有的集合根本量不了。",
    "下一集：完备空间。把洞填上。",
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
    1: 4.25,
    2: 5.75,
    3: 4.75,
    4: 5.25,
    5: 5.75,
    6: 5.75,
    7: 4.75,
  },
  dirichlet: { 0: 5.25, 1: 5.25, 2: 5.75, 3: 5.75, 4: 4.75 },
  rules: { 0: 5.25, 1: 5.25, 2: 5.25, 3: 4.75 },
  nullQ: { 0: 5.25, 1: 4.75, 2: 5.25, 3: 5.25, 4: 4.75 },
  cantor: { 0: 5.25, 1: 5.25, 2: 5.75, 3: 5.75, 4: 4.75 },
  vitali: { 0: 4.75, 1: 5.25, 2: 5.75, 3: 5.75, 4: 5.75 },
  caochong: { 0: 4.75, 1: 4.25, 2: 6.25, 3: 5.75 },
  lebesgue: { 0: 5.25, 1: 5.25, 2: 5.75, 3: 5.75, 4: 5.25, 5: 4.75 },
  ae: { 0: 4.75, 1: 5.25, 2: 5.25, 3: 5.25 },
  probability: { 0: 4.75, 1: 5.25, 2: 5.25, 3: 4.75 },
  endCard: { 0: 4.25, 1: 4.75, 2: 5.25 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "dirichlet",
  "rules",
  "nullQ",
  "cantor",
  "vitali",
  "caochong",
  "lebesgue",
  "ae",
  "probability",
  "endCard",
];

export const S2E22 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { caochong: "zh" },
  season: 2,
  captions: "large",
});
