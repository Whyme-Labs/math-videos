import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S3E03, from lessons/s3/e03-representation-theory.md, on
// the new standard (about five minutes, one-line captions, the visuals
// explain): the water molecule and its table of ±1s, a square's symmetries
// as matrices, S₃ on three axes splitting 1 + 2, Maschke's averaging,
// Schur's lemma, characters and their orthogonal table, and the water
// molecule's three vibrations read off by traces. Each line is one caption
// and one cue; MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "matrices"
  | "blocks"
  | "maschke"
  | "schur"
  | "character"
  | "lattice"
  | "water"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "A water molecule: three atoms, nine ways to move.",
    "Three slide it. Three spin it. Three really vibrate.",
    "Chemists sort those three before solving any equation.",
    "Two keep the mirror symmetry. One flips it.",
    "They read it off a small grid of 1s and −1s.",
    "Every group has such a grid. It's a fingerprint.",
    "One number per symmetry: the trace of a matrix.",
    "How can one number know that much?",
  ],
  title: ["Season three, episode three. Representations."],
  matrices: [
    "A square has 8 symmetries. Each one moves the plane.",
    "A quarter turn: r = [0 −1; 1 0].",
    "A flip across the x-axis: s = [1 0; 0 −1].",
    "Doing one symmetry after another multiplies matrices.",
    "A representation turns each g into a matrix ρ(g).",
  ],
  blocks: [
    "S₃ permutes three axes: a 3 × 3 representation.",
    "But the line through (1, 1, 1) never moves.",
    "And the plane x + y + z = 0 is carried to itself.",
    "In that basis every matrix splits into blocks: 1 + 2.",
    "Irreducible: no invariant subspace left to split off.",
    "Goal: break every representation into irreducibles.",
  ],
  maschke: [
    "Can we always split? Start with a lopsided ellipse.",
    "Move it by all 6 symmetries and add them up.",
    "The average is a circle no symmetry can disturb.",
    "Now the perpendicular to an invariant line is invariant.",
    "Maschke: for a finite group, everything splits.",
  ],
  schur: [
    "Schur: take a map that commutes with every ρ(g).",
    "Its kernel and its image are invariant subspaces.",
    "Between irreducibles: zero, or an isomorphism.",
    "From an irreducible to itself: only a scalar, λI.",
  ],
  character: [
    "Matrices change with the basis. Traces don't.",
    "Character: χ(g) = tr ρ(g). One number per symmetry.",
    "S₃ has three irreducibles: trivial, sign, and a 2D one.",
    "Their characters are the rows of a 3 × 3 table.",
    "The rows are orthogonal, like perpendicular arrows.",
    "Project the permutation character: 1, 0, 1.",
  ],
  lattice: [],
  water: [
    "Back to water. Its group has 4 symmetries.",
    "Count the atoms each one leaves in place: a character.",
    "Remove slides and spins, then project on the rows.",
    "Out come the vibrations: two symmetric, one not.",
    "No equation of motion was solved. Only traces.",
  ],
  endCard: [
    "A representation is a group acting by matrices.",
    "Pieces are irreducibles, and traces tell them apart.",
    "Next: the shifts of a circle. Fourier is duality.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "一个水分子：三个原子，九种运动方式。",
    "三种是平移，三种是转动，三种是真振动。",
    "化学家不解方程，就能先把这三种分好类。",
    "两种保持镜面对称，一种把它翻过来。",
    "他们看的是一张小表，里面都是 1 和 −1。",
    "每个群都有这样一张表：它的指纹。",
    "每个对称只记一个数：矩阵的迹。",
    "一个数，怎么能知道这么多？",
  ],
  title: ["第三季，第三集。表示论。"],
  matrices: [
    "正方形有 8 个对称，每个都移动整个平面。",
    "转四分之一圈：r = [0 −1; 1 0]。",
    "沿 x 轴翻转：s = [1 0; 0 −1]。",
    "对称接着对称做，就是矩阵相乘。",
    "表示：把每个 g 变成一个矩阵 ρ(g)。",
  ],
  blocks: [
    "S₃ 置换三根坐标轴：一个 3 × 3 表示。",
    "可是过 (1, 1, 1) 的那条线从来不动。",
    "平面 x + y + z = 0 也被带回自己。",
    "换到这组基，每个矩阵都分块：1 + 2。",
    "不可约：再也分不出不变子空间。",
    "目标：把每个表示拆成不可约的块。",
  ],
  maschke: [
    "总能拆吗？先随便取一个歪的椭圆。",
    "用 6 个对称把它挪一遍，全加起来。",
    "平均出来是个圆，哪个对称都动不了它。",
    "于是不变直线的垂线，也是不变的。",
    "马施克定理：有限群的表示，总能拆开。",
  ],
  schur: [
    "舒尔引理：取一个和每个 ρ(g) 交换的映射。",
    "它的核和像，都是不变子空间。",
    "不可约表示之间：要么是零，要么是同构。",
    "从一个不可约表示到自己：只能是 λI。",
  ],
  character: [
    "矩阵随基而变，迹不变。",
    "特征标：χ(g) = tr ρ(g)，每个对称一个数。",
    "S₃ 有三个不可约表示：平凡、符号、二维的。",
    "它们的特征标排成一张 3 × 3 的表。",
    "各行两两正交，像互相垂直的箭头。",
    "置换表示投影到各行：1、0、1。",
  ],
  lattice: [
    "北宋李诫《营造法式》，画下了格子门的格眼。",
    "“四斜毬文”：转四分之一圈或翻过来，花样不变。",
    "这八个对称，正是正方形的群 D₄。",
    "每个对称都是平面的线性变换：一个表示。",
  ],
  water: [
    "回到水分子：它的群有 4 个对称。",
    "数每个对称下不动的原子：一个特征标。",
    "减去平移和转动，再投影到各行上。",
    "振动就出来了：两种对称，一种不对称。",
    "没解任何运动方程，只用了迹。",
  ],
  endCard: [
    "表示，就是群用矩阵来作用。",
    "有限群的表示拆成不可约块，迹就是指纹。",
    "下一集：圆上的平移。傅里叶就是对偶。",
  ],
};

export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  coldOpen: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6 },
  title: { 0: 3 },
  matrices: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  blocks: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  maschke: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  schur: { 0: 6, 1: 6, 2: 6, 3: 6 },
  character: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  lattice: { 0: 6, 1: 6, 2: 6, 3: 6 },
  water: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  endCard: { 0: 5, 1: 5.5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "matrices",
  "blocks",
  "maschke",
  "schur",
  "character",
  "lattice",
  "water",
  "endCard",
];

export const S3E03 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { lattice: "zh" },
  season: 3,
  captions: "large",
});
