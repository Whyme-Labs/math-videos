import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E10, condensed from lessons/s2/e10-tensor-product.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "funnel"
  | "grid"
  | "liye"
  | "pure"
  | "legs"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Zurich, 1912. Albert Einstein is stuck on gravity, and he turns to his old classmate Marcel Grossmann: help me, or I'll go crazy.",
    "Grossmann, a geometer, finds the tool in a memoir by Ricci and Levi-Civita: grids of numbers that change by strict rules when the coordinates change.",
    "Physicists still define them like this: a tensor is something that transforms like a tensor. It sounds like a joke.",
    "Today we define a tensor by what it does, and every one of those rules falls out on its own.",
  ],
  title: ["Season two, episode ten. The tensor product."],
  funnel: [
    "A bilinear machine eats two vectors. Put a funnel in front: every pair v, w goes in and comes out as one object, v ⊗ w.",
    "Behind the funnel, the two-input machine becomes an ordinary linear one. That's the tensor product's whole job.",
  ],
  grid: [
    "If V has two basis arrows and W has three, the six products eᵢ ⊗ fⱼ are a basis. Two times three: six dimensions.",
    "Putting spaces side by side adds dimensions: two plus three. Tensoring multiplies them: a rectangle instead of a row.",
  ],
  liye: [], // Chinese edition only
  pure: [
    "A pure tensor is a column times a row: a grid of rank one. Most grids aren't pure. The identity can't be split into one column times one row.",
    "In quantum mechanics the tensors that won't split are entangled states: two particles described by one object, not two.",
  ],
  legs: [
    "Now the rules. Draw a tensor with legs: vector legs and covector legs. Change the basis, and each vector leg picks up P inverse, each covector leg P.",
    "A map has one of each: P inverse A P. A form has two covector legs: P transpose B P. Nobody chose these rules. The legs did.",
  ],
  endCard: [
    "A tensor is whatever turns multilinear machines into linear ones, and the transformation rules come along for free.",
    "Next episode: tensors that flip sign when you swap two inputs. The determinant falls out as a volume.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1912 年，苏黎世。爱因斯坦在引力问题上卡住了，他去找老同学格罗斯曼：你得帮我，不然我要疯了。",
    "几何学家格罗斯曼在里奇和列维-奇维塔的论文里找到了工具：一种格子数，坐标一变，它就按严格的规则跟着变。",
    "物理学家至今还这样定义它：张量就是像张量一样变换的东西。听起来像个笑话。",
    "今天我们按张量能做什么来定义它，那些变换规则会自己冒出来。",
  ],
  title: ["第二季，第十集。张量积。"],
  funnel: [
    "双线性机器吃进两个向量。在前面装一个漏斗：每一对 v、w 进去，出来变成一个东西 v ⊗ w。",
    "漏斗后面，两个输入的机器就变成了普通的线性机器。张量积的全部工作就是这个。",
  ],
  grid: [
    "如果 V 有两支基箭头，W 有三支，那么六个乘积 eᵢ ⊗ fⱼ 就是一组基。二乘三，六维。",
    "把空间并排放，维数相加：二加三。做张量积，维数相乘：排成一个长方形，而不是一行。",
  ],
  // 只在中文版出现：里耶秦简九九表
  liye: [
    "2002 年，湖南里耶的一口古井里出土了一枚秦简，上面是一张九九乘法表。",
    "把它排成方阵，就是一列 1 到 9 乘一行 1 到 9：一个纯张量，秩为一。",
    "八十一个数，只靠十八个数就能写出来。拆不开的表，才是这一集真正的主角。",
  ],
  pure: [
    "纯张量就是一列乘一行：秩为一的格子。大多数格子都不纯。单位矩阵就拆不成一列乘一行。",
    "在量子力学里，拆不开的张量就是纠缠态：两个粒子由一个东西描述，而不是两个。",
  ],
  legs: [
    "现在看规则。把张量画成带腿的东西：向量腿和余向量腿。换一组基，每条向量腿带上 P⁻¹，每条余向量腿带上 P。",
    "映射各有一条：P⁻¹AP。型有两条余向量腿：PᵀBP。规则不是谁选的，是腿定的。",
  ],
  endCard: [
    "张量就是把多线性机器变成线性机器的那个东西；变换规则顺带白送。",
    "下一集：交换两个输入就变号的张量。行列式作为体积自己冒出来。",
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
  "funnel",
  "grid",
  "liye",
  "pure",
  "legs",
  "endCard",
];

export const S2E10 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { liye: "zh" },
  season: 2,
});
