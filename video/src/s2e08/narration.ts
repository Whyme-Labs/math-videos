import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E08, condensed from
// lessons/s2/e08-transpose-and-double-dual.md. Each line is one caption and
// one cue; scenes key their animation off the cue frames, so editing the
// script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "pullback"
  | "transpose"
  | "xuanji"
  | "rank"
  | "doubleDual"
  | "natural"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Ann Arbor, 1941. Samuel Eilenberg sits in on a lecture series by Saunders Mac Lane, and the two start working together.",
    "Mathematicians kept calling some isomorphisms natural and others not, and nobody could say what that word meant.",
    "In 1945 the two of them wrote down the answer, and it took a new branch of mathematics: category theory.",
    "Their first example: a space is naturally the same as its double dual, but not as its dual. Today: the transpose, and why.",
  ],
  title: ["Season two, episode eight. The transpose and the double dual."],
  pullback: [
    "A map T carries arrows forward. Measurements travel the other way: to measure an arrow here, map it first, then measure over there.",
    "That's the dual map, T star. It pulls a stack of sheets back through T, and the arrow crosses the same number of sheets on both sides.",
  ],
  transpose: [
    "Write T star in the dual bases and its matrix is the transpose. Flipping the grid is pulling measurements back.",
    "And the order reverses: pulling back through A then B undoes the order of B then A. That's why the transpose of AB is B transpose A transpose.",
  ],
  xuanji: [], // Chinese edition only
  rank: [
    "Here's a 2 by 7 matrix. Its seven columns are arrows in a plane, and only two of them are independent.",
    "Its two rows are measurements on a seven-dimensional space, also two independent. Pull back and count: rows and columns always agree.",
  ],
  doubleDual: [
    "Now turn it around. A vector can measure measurements: hand it a covector and it reports the covector's value on itself.",
    "So every vector is a point of the double dual. No basis was chosen, and in finite dimensions nothing is missed.",
  ],
  natural: [
    "Matching vectors with covectors is different. Pick a basis and each arrow gets a partner. Change the basis and the partners change.",
    "The match with the double dual never moves, whatever basis you pick. That's what natural means, and why category theory exists.",
  ],
  endCard: [
    "The transpose is measuring after mapping, and every space is naturally its own double dual.",
    "Next episode: machines with two inputs. The same grid of numbers turns out to be two different objects.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1941 年，安娜堡。艾伦伯格去听麦克莱恩的系列讲座，两人从此开始合作。",
    "数学家常说有些同构是“自然的”，有些不是。可“自然”到底是什么意思，谁也说不清。",
    "1945 年，两人写下了答案，为此专门开出一门新学问：范畴论。",
    "他们的第一个例子：一个空间和它的双重对偶自然相同，和它的对偶却不是。今天讲转置，以及为什么。",
  ],
  title: ["第二季，第八集。转置与双重对偶。"],
  pullback: [
    "映射 T 把箭头往前送。测量却往回走：要在这边量一支箭头，先把它送过去，再在那边量。",
    "这就是对偶映射 T*。它把一叠薄片沿着 T 拉回来；箭头在两边穿过的片数一模一样。",
  ],
  transpose: [
    "在对偶基下写出 T* 的矩阵，正好是转置。把表格翻个面，就是把测量拉回来。",
    "顺序也跟着反过来：先 B 后 A，拉回时就先过 A 再过 B。所以 AB 的转置是 B 转置乘 A 转置。",
  ],
  // 只在中文版出现：苏蕙《璇玑图》，横读竖读皆成诗
  xuanji: [
    "前秦女子苏蕙织了一幅《璇玑图》：二十九行，二十九列，八百四十一个字。",
    "横着读是诗，竖着读也是诗。把行当成列，就是换一种读法。",
    "转置也是换一种读法。这一集要问的是：换读法的背后，有没有一样不靠格子的东西。",
  ],
  rank: [
    "这是一个 2 × 7 的矩阵。它的七列是平面上的七支箭头，其中只有两支线性无关。",
    "它的两行是七维空间上的测量，也是两个线性无关。拉回去一数：行秩和列秩永远相等。",
  ],
  doubleDual: [
    "现在反过来想。向量也能测量测量：递给它一个余向量，它就报出这个余向量在它身上的值。",
    "于是每个向量都是双重对偶里的一个点。没有选任何基，而在有限维里，一个也不漏。",
  ],
  natural: [
    "向量和余向量配对就不同了。选一组基，每支箭头配上一个搭档；换一组基，搭档就跟着换。",
    "和双重对偶的配对却纹丝不动，不管选哪组基。这就是“自然”的意思，也是范畴论诞生的原因。",
  ],
  endCard: [
    "转置就是先映射再测量；每个空间都自然地等于它的双重对偶。",
    "下一集：有两个输入的机器。同一格数字，原来是两种不同的东西。",
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
  "pullback",
  "transpose",
  "xuanji",
  "rank",
  "doubleDual",
  "natural",
  "endCard",
];

export const S2E08 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { xuanji: "zh" },
  season: 2,
});
