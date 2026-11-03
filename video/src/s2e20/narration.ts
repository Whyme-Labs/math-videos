import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E20, from lessons/s2/e20-what-breaks-in-infinite-dimensions.md,
// the start of Part B, on the new standard (about five minutes, one-line
// captions, the visuals explain): the free lunch of square systems broken
// by a conveyor belt, then five losses in a ledger: the shift, a wiggle
// whose slope explodes, a sequence no finite sum reaches, the unit
// vectors that never bunch up, and multiplication by x with no
// eigenvectors. Each line of the ledger points to its repair.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "spaces"
  | "shift"
  | "wiggle"
  | "hamel"
  | "ball"
  | "mojing"
  | "eigen"
  | "ledger"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Linear algebra's best free lunch: square systems.",
    "If only zero solves Ax = 0, every b has a solution.",
    "Now take an infinite row of boxes.",
    "A machine slides every number one box to the right.",
    "Nothing is lost: you can read the input back.",
    "But 1, 0, 0, … never comes out. The first box is 0.",
    "For nineteen episodes, every proof used finite dimension.",
    "Today five favourite facts fall over.",
  ],
  title: ["Season two, episode twenty. What breaks in infinite dimensions."],
  spaces: [
    "The new spaces: infinite sequences, like (1, ½, ⅓, …).",
    "ℓ²: sequences whose squares add up to something finite.",
    "Its axes e₁ = (1, 0, 0, …), e₂, e₃, … look familiar.",
    "And functions on [0, 1], sized by their highest point.",
    "A ledger keeps track of what we lose.",
  ],
  shift: [
    "Loss one. For a square matrix, one-to-one means onto.",
    "Cut the shift down to n boxes: the last number falls off.",
    "Grow n. The end runs away. Nothing falls off any more.",
    "Shift right, then left: back where you started. LS = I.",
    "Left, then right: the first box is lost. SL ≠ I.",
  ],
  wiggle: [
    "Loss two. Every matrix has a biggest stretch, σ₁.",
    "Now differentiate f = ε sin(x/ε²).",
    "As ε shrinks, the graph flattens onto the axis.",
    "Its slope grows like 1/ε, without limit.",
    "A linear map turns tiny into huge. No σ₁ exists.",
  ],
  hamel: [
    "Loss three. Every vector, a finite sum of basis vectors.",
    "Take (1, ½, ⅓, ¼, …). Its squares add up to π²/6.",
    "Finite sums of e₁, e₂, … fill it in from the left.",
    "Stop at 10: still 0.31 away. At 1000: 0.03.",
    "They never finish. We need infinite sums, so limits.",
  ],
  ball: [
    "Loss four. On a sphere in 3D, points always bunch up.",
    "In ℓ², the axes e₁, e₂, e₃, … all have length 1.",
    "Every two are √2 apart. None ever get closer.",
    "No subsequence settles down. The ball isn't compact.",
    "So maximising on the sphere can fail.",
    "Here 1 − 1/k creeps towards 1 and never gets there.",
  ],
  mojing: [], // Chinese edition only
  eigen: [
    "Loss five. Over ℂ, every matrix has an eigenvector.",
    "Multiply each function by x. Suppose x·f = λf.",
    "Then f is 0 except at λ, so by continuity f = 0.",
    "Sampled at n points, it's diagonal. Eigenvectors: spikes.",
    "As n grows the spikes thin to nothing. No eigenvectors.",
    "Tents of width 1/n come close: they miss by 1/(4n).",
  ],
  ledger: [
    "Five losses, and one reason.",
    "Part A was pure algebra. Infinity needs limits.",
    "Closeness, and limits that exist: ℚ to ℝ all over again.",
    "Each coming episode repairs one line of this list.",
  ],
  endCard: [
    "In infinite dimensions, algebra alone isn't enough.",
    "We need a ruler for vectors, and the choice matters.",
    "Next: normed spaces. Many rulers, and they disagree.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "线性代数最好的免费午餐：方程和未知数一样多。",
    "只要 Ax = 0 只有零解，每个 b 都有解。",
    "现在拿一排无穷多的格子。",
    "一台机器把每个数往右挪一格。",
    "什么都没丢：从输出能读回输入。",
    "可 1, 0, 0, … 永远出不来：第一格总是 0。",
    "十九集以来，每个证明都用到了维数有限。",
    "今天，五个熟悉的结论一一倒下。",
  ],
  title: ["第二季，第二十集。无限维里什么会坏掉。"],
  spaces: [
    "新的空间：无穷数列，比如 (1, ½, ⅓, …)。",
    "ℓ²：平方加起来有限的数列。",
    "它的轴 e₁ = (1, 0, 0, …)、e₂、e₃……看着眼熟。",
    "还有 [0, 1] 上的函数，用最高点量大小。",
    "一本账记下我们丢了什么。",
  ],
  shift: [
    "第一项损失。方阵一对一，就一定是满射。",
    "把移位截成 n 格：最后一个数掉出去。",
    "让 n 变大，尽头跑远了，再没有数掉出去。",
    "先右移再左移：回到原处，LS = I。",
    "先左移再右移：第一格丢了，SL ≠ I。",
  ],
  wiggle: [
    "第二项损失。每个矩阵都有最大的伸缩 σ₁。",
    "现在对 f = ε sin(x/ε²) 求导。",
    "ε 越小，图像越贴近横轴。",
    "斜率却像 1/ε 一样涨，没有上限。",
    "一个线性映射把很小变成很大。σ₁ 不存在。",
  ],
  hamel: [
    "第三项损失。每个向量应是基向量的有限和。",
    "取 (1, ½, ⅓, ¼, …)，平方和是 π²/6。",
    "e₁、e₂……的有限和从左边一格格填进去。",
    "到第 10 格还差 0.31，到第 1000 格还差 0.03。",
    "永远填不完。我们需要无穷和，也就需要极限。",
  ],
  ball: [
    "第四项损失。三维球面上的点，总会在某处聚拢。",
    "在 ℓ² 里，轴 e₁、e₂、e₃……长度都是 1。",
    "任何两个都相距 √2，谁也不靠近谁。",
    "没有子列会收敛。单位球不是紧的。",
    "于是在球面上求最大值可能落空。",
    "这里 1 − 1/k 一直往 1 爬，永远到不了。",
  ],
  // 只在中文版出现：《墨经》“穷，或不容尺，有穷；莫不容尺，无穷也”
  mojing: [
    "《墨经》给“有穷”和“无穷”下过定义。",
    "“穷，或不容尺，有穷；莫不容尺，无穷也。”",
    "量到某处，再放不下一把尺子，就是有穷。",
    "处处都还能再放一把尺子，就是无穷。",
  ],
  eigen: [
    "第五项损失。在 ℂ 上，每个矩阵都有特征向量。",
    "把每个函数乘以 x。假设 x·f = λf。",
    "那么 f 除了 λ 处都是 0，由连续性 f = 0。",
    "在 n 个点上取样，它是对角的，特征向量是尖刺。",
    "n 越大，尖刺越细，最后什么都不剩。没有特征向量。",
    "宽 1/n 的小帐篷很接近：只差 1/(4n)。",
  ],
  ledger: [
    "五项损失，一个原因。",
    "上篇全靠代数。无穷需要极限。",
    "远近，和存在的极限：又是第一季从 ℚ 到 ℝ。",
    "接下来每一集，修好这张单子上的一行。",
  ],
  endCard: [
    "在无限维里，只靠代数不够。",
    "向量需要一把尺子，而选哪把很要紧。",
    "下一集：赋范空间。好多把尺子，彼此还不一致。",
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
  coldOpen: { 0: 5, 1: 5.5, 2: 4.5, 3: 5.5, 4: 5, 5: 6, 6: 5, 7: 5 },
  spaces: { 0: 5.5, 1: 5.5, 2: 5, 3: 5.5, 4: 4.5 },
  shift: { 0: 5.5, 1: 6, 2: 5.5, 3: 5.5, 4: 5.5 },
  wiggle: { 0: 5, 1: 5, 2: 5.5, 3: 5.5, 4: 5 },
  hamel: { 0: 5.5, 1: 5.5, 2: 6, 3: 5.5, 4: 5 },
  ball: { 0: 5.5, 1: 5, 2: 5.5, 3: 5, 4: 4.5, 5: 5.5 },
  mojing: { 0: 5, 1: 5.5, 2: 5.5, 3: 5.5 },
  eigen: { 0: 5, 1: 5, 2: 5.5, 3: 5.5, 4: 5.5, 5: 5.5 },
  ledger: { 0: 4.5, 1: 5, 2: 5.5, 3: 6 },
  endCard: { 0: 4.5, 1: 5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "spaces",
  "shift",
  "wiggle",
  "hamel",
  "ball",
  "mojing",
  "eigen",
  "ledger",
  "endCard",
];

export const S2E20 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { mojing: "zh" },
  season: 2,
  captions: "large",
});
