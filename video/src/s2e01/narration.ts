import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E01, condensed from lessons/s2/e01-add-and-scale.md. Each
// line is one caption and one cue; scenes key their animation off the cue
// frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "four"
  | "rules"
  | "fangcheng"
  | "zoo"
  | "superpose"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Stettin, 1844. Hermann Grassmann, a schoolteacher, publishes a book about adding things and stretching them.",
    "Arrows, forces, points, anything at all: if you can add two of them and stretch one by a number, his rules apply.",
    "Almost nobody reads it. Möbius can't get through it. Grassmann never gets a university post, and later turns to Sanskrit.",
    "Forty-four years on, Peano boils Grassmann's rules down to a short list. Today we call it a vector space.",
  ],
  title: ["Season two, episode one. Anything you can add and scale."],
  four: [
    "Four things that look unrelated: an arrow, a polynomial, a sound, and the waves that solve y double-prime plus y equals zero.",
    "Each can be added to another of its kind and stretched by a number. Two arrows tip to tail. Two sounds at once. Two solutions make another solution.",
  ],
  rules: [
    "Keep only those two moves, and a few rules: order doesn't matter, there's a zero, everything has an opposite, stretching spreads over adding.",
    "The numbers you stretch by can come from any field from last season: the reals, the complex numbers, even the two-element clock where 1 plus 1 is 0.",
  ],
  fangcheng: [], // Chinese edition only
  zoo: [
    "Now stamp it on things. Bit strings under XOR: a space with exactly eight vectors. Every function from the reals to the reals. Lists that never end.",
    "And watch it bounce. The positive numbers: times minus one and you fall out. A sphere: add two points and you leave it. A line that misses the origin has no zero.",
  ],
  superpose: [
    "Why it matters: for a linear equation, any mix of solutions is a solution. That's why two sounds can cross a room and come out untouched.",
    "And when the world isn't linear, zoom in far enough and it looks linear. That's what a derivative is. Linear algebra is the first draft of everything.",
  ],
  endCard: [
    "Forget what vectors are made of. Keep two moves: add and scale.",
    "Next episode: how many numbers it takes to pin down a vector, and whether that count is real or just a choice.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1844 年，斯德丁。中学教师格拉斯曼出了一本书，讲怎样把东西相加、怎样把东西伸缩。",
    "箭头、力、点，什么都行：只要两个能相加、一个能乘上一个数，他的规则就适用。",
    "几乎没人读。默比乌斯读不下去。格拉斯曼始终没能进大学，后来转去研究梵文。",
    "四十四年后，皮亚诺把格拉斯曼的规则浓缩成短短一张清单。今天我们叫它向量空间。",
  ],
  title: ["第二季，第一集。能相加、能伸缩的一切。"],
  four: [
    "四样看似毫不相干的东西：一支箭头、一个多项式、一段声音，还有满足 y″ + y = 0 的那些波。",
    "每一样都能和同类相加，也能乘上一个数来伸缩。两支箭头首尾相接；两个声音同时响；两个解加起来还是解。",
  ],
  rules: [
    "只留下这两个动作，再加几条规矩：加法不讲先后，有一个零，每样东西都有相反的一个，伸缩对加法分配。",
    "用来伸缩的数，可以取自上一季的任何一个域：实数、复数，甚至 1 加 1 等于 0 的两格钟面。",
  ],
  // 只在中文版出现：《九章算术·方程》第一题与“遍乘直除”
  fangcheng: [
    "两千年前的《九章算术》就在做这两件事。“方程”章第一题：上禾三秉、中禾二秉、下禾一秉，共三十九斗。",
    "算筹摆成一列一列，解法叫“遍乘直除”：整列乘一个数，再整列相减。",
    "整列相加、整列伸缩，正是向量的两个动作。答案：上禾一秉，九斗又四分之一。",
  ],
  zoo: [
    "现在到处盖章。异或运算下的比特串：一个恰好有八个向量的空间。从实数到实数的所有函数。永不结束的数列。",
    "再看章盖不上的。正数：乘以负一就掉出去了。球面：两个点一加就离开了球面。不过原点的直线，没有零。",
  ],
  superpose: [
    "这有什么用？线性方程的解，任意组合起来还是解。所以两个声音能穿过同一个房间，各自毫发无损。",
    "世界不是线性的时候，放大到足够近，它也像是线性的。这就是导数。线性代数是一切的第一稿。",
  ],
  endCard: [
    "忘掉向量是什么做的。只留两个动作：相加和伸缩。",
    "下一集：确定一个向量要几个数？这个个数是真的，还是只是一种选择？",
  ],
};

export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  title: { 0: 3.2 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "four",
  "rules",
  "fangcheng",
  "zoo",
  "superpose",
  "endCard",
];

export const S2E01 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { fangcheng: "zh" },
});
