import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S3E04, from lessons/s3/e04-fourier-is-duality.md, on the
// new standard (about five minutes, one-line captions, the visuals
// explain): only the helix survives a shift, characters as the common
// eigenvectors of shifts, orthogonality by shifting the sum, the DFT
// matrix of clock hands, the FFT butterfly, the dual group and its
// natural double dual, Plancherel on ℝ, and the Act I montage. Each line
// is one caption and one cue; MIN_SECONDS gives the animations the time
// they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "shifts"
  | "orth"
  | "dft"
  | "fft"
  | "resonance"
  | "duality"
  | "plancherel"
  | "finale"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Why do we always break signals into waves?",
    "Your phone does it to music thousands of times a second.",
    "There are endless orthonormal bases. Why this one?",
    "Slide a bump to the right: a brand-new function.",
    "Slide a parabola: another new function.",
    "Slide the helix e^(iωt): same helix, times one number.",
    "It's an eigenvector of every shift at once.",
    "Fourier analysis is the representation theory of shifts.",
  ],
  title: ["Season three, episode four. Fourier is duality."],
  shifts: [
    "Shifts form a group: slide by a, then by b, is a + b.",
    "Look for functions that every shift only rescales.",
    "Set f(0) = 1. Then f(x + y) = f(x) f(y).",
    "Those are characters: homomorphisms to the unit circle.",
    "On ℤ/8: χₖ(j) = ωʲᵏ, a pointer walking k steps a time.",
  ],
  orth: [
    "Add up a nontrivial character over the whole group.",
    "Shift the sum: it gets multiplied by χ(h) ≠ 1.",
    "But a shifted sum is the same sum. So it's 0.",
    "So characters are orthogonal: n of them, a basis.",
    "The Fourier transform: coordinates in that basis.",
  ],
  dft: [
    "For ℤ/n, write the characters as rows of a matrix.",
    "A grid of little clock hands: the DFT matrix.",
    "Divided by √n, it's unitary: a rotation of ℂⁿ.",
    "In the new basis, every shift is diagonal.",
    "So convolution becomes plain multiplication.",
  ],
  fft: [
    "Split the samples into even and odd.",
    "Two half-size DFTs, glued by a butterfly.",
    "Repeat: n log n steps instead of n².",
    "n = 2²⁰: a trillion steps down to twenty million.",
  ],
  resonance: [],
  duality: [
    "Characters form a group of their own: the dual Ĝ.",
    "Like V and V*: vectors and covectors.",
    "ℤ/n matches its dual, but only once you pick ω.",
    "The dual of the dual needs no choice at all.",
    "Circle ↔ integers. Integers ↔ circle. ℝ ↔ ℝ.",
    "Pontryagin: every such group is its dual's dual.",
  ],
  plancherel: [
    "On ℝ, e^(2πiξx) never fades. It isn't in L².",
    "Like δ, it lives just outside the space.",
    "Sums over characters become integrals.",
    "Plancherel: the Fourier transform is unitary on L².",
    "A Gaussian fits inside, and maps to itself.",
  ],
  finale: [
    "Fields were vector spaces: dimension.",
    "Groups and operators were modules: Jordan form.",
    "Groups acted by matrices: the trace.",
    "And Fourier was duality: the dual space.",
  ],
  endCard: [
    "Fourier's waves are the characters of the shift group.",
    "Transforming is measuring against every character.",
    "Next: leave flat space behind. Manifolds.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "为什么拆信号，总是拆成波？",
    "手机每秒都要对音乐做上几千次。",
    "标准正交基有无数组，凭什么是这一组？",
    "把一个鼓包右移：变成一个新函数。",
    "把抛物线右移：又是一个新函数。",
    "把螺旋 e^(iωt) 右移：同一条螺旋，乘一个数。",
    "它是所有平移共同的特征向量。",
    "傅里叶分析，就是平移群的表示论。",
  ],
  title: ["第三季，第四集。傅里叶就是对偶。"],
  shifts: [
    "平移成群：先移 a 再移 b，就是移 a + b。",
    "找那些每个平移都只缩放的函数。",
    "令 f(0) = 1，就有 f(x + y) = f(x) f(y)。",
    "这就是特征标：到单位圆的同态。",
    "在 ℤ/8 上：χₖ(j) = ωʲᵏ，指针每次走 k 步。",
  ],
  orth: [
    "把一个非平凡特征标在整个群上加起来。",
    "把和平移一下：它乘上了 χ(h) ≠ 1。",
    "可平移后还是同一个和，所以它是 0。",
    "特征标两两正交：n 个，正好一组基。",
    "傅里叶变换：就是这组基下的坐标。",
  ],
  dft: [
    "对 ℤ/n，把特征标排成矩阵的行。",
    "一格格小钟表的指针：DFT 矩阵。",
    "除以 √n 是酉矩阵：ℂⁿ 的一次旋转。",
    "在新基下，每个平移都是对角的。",
    "于是卷积变成了逐点相乘。",
  ],
  fft: [
    "把样本分成偶数位和奇数位。",
    "两个一半大小的 DFT，用蝴蝶拼起来。",
    "一直分下去：n log n 步，而不是 n² 步。",
    "n = 2²⁰：一万亿步降到两千万步。",
  ],
  resonance: [
    "《庄子·徐无鬼》：调两张瑟，堂上一张，室内一张。",
    "“鼓宫宫动，鼓角角动，音律同矣。”",
    "弹一个音，另一张瑟上只有同音的弦会动。",
    "傅里叶系数，就是信号和一个特征标的共振。",
  ],
  duality: [
    "特征标自己也成群：对偶群 Ĝ。",
    "就像 V 和 V*：向量和余向量。",
    "ℤ/n 和它的对偶同构，但得先选定 ω。",
    "对偶的对偶，什么都不用选。",
    "圆 ↔ 整数，整数 ↔ 圆，ℝ ↔ ℝ。",
    "庞特里亚金：这类群都是对偶的对偶。",
  ],
  plancherel: [
    "在 ℝ 上，e^(2πiξx) 永不衰减，不在 L² 里。",
    "它和 δ 一样，就住在空间外面。",
    "对特征标求和，变成了积分。",
    "普朗歇尔：傅里叶变换在 L² 上是酉的。",
    "高斯函数装得进去，还变回它自己。",
  ],
  finale: [
    "域是向量空间：维数。",
    "交换群和算子都是模：若尔当标准形。",
    "群用矩阵来作用：迹。",
    "傅里叶就是对偶：对偶空间。",
  ],
  endCard: [
    "傅里叶的波，是平移群的特征标。",
    "做变换，就是拿每个特征标去测量。",
    "下一集：离开平直空间。流形。",
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
  shifts: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  orth: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  dft: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  fft: { 0: 6, 1: 6, 2: 6, 3: 6 },
  resonance: { 0: 6, 1: 6, 2: 6, 3: 6 },
  duality: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  plancherel: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  finale: { 0: 5, 1: 5.5, 2: 5, 3: 5.5 },
  endCard: { 0: 5, 1: 5.5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "shifts",
  "orth",
  "dft",
  "fft",
  "resonance",
  "duality",
  "plancherel",
  "finale",
  "endCard",
];

export const S3E04 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { resonance: "zh" },
  season: 3,
  captions: "large",
});
