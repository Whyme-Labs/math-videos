import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E15, condensed from lessons/s2/e15-unitary-spaces.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "bar"
  | "unitary"
  | "geyuan"
  | "spectral"
  | "fourier"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Berlin, 1932. John von Neumann publishes the mathematics of quantum mechanics. A particle's state is a vector, and its entries are complex numbers.",
    "Lengths of those vectors give probabilities, so they'd better be positive. Try the dot product on the vector (1, i): one times one, plus i times i. Zero.",
    "A vector that isn't zero has length zero. And (1, 2i) is worse: its squared length comes out minus 3.",
    "Today: one bar over one letter that repairs geometry for the complex numbers.",
  ],
  title: ["Season two, episode fifteen. Unitary spaces."],
  bar: [
    "A complex number times itself spins twice as fast, and its sign wanders. A complex number times its conjugate doesn't spin at all: it's the length squared.",
    "So the complex inner product conjugates one slot. Now the squared length of (1, i) is 1 plus 1: two.",
  ],
  unitary: [
    "A map that keeps complex lengths is called unitary. In the right basis it just turns each coordinate around its own circle.",
    "Change the basis and its matrix fills with numbers, but the eigenvalues stay put, every one of them on the unit circle.",
  ],
  geyuan: [], // Chinese edition only
  spectral: [
    "In 1909 Schur proved that any complex map is triangular in some orthonormal basis.",
    "If the map also commutes with its adjoint, the triangle empties out and it's diagonal. Hermitian maps get real eigenvalues; unitary maps get eigenvalues on the circle.",
  ],
  fourier: [
    "Now the payoff. Break a signal into frequencies with the discrete Fourier transform. It's a unitary map.",
    "So the energy is the same in time and in frequency, and running it backwards is just the conjugate transpose. Every audio file and phone call leans on that.",
  ],
  endCard: [
    "Over the complex numbers, length needs a conjugate. With it, unitary maps keep lengths and just spin.",
    "Next episode: the exact moment a stack of sheets becomes an arrow. The gradient, finally explained.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1932 年，柏林。冯·诺伊曼出版了量子力学的数学基础。粒子的状态是一个向量，分量是复数。",
    "这些向量的长度给出概率，所以最好是正的。拿点积试试向量 (1, i)：1 乘 1，加 i 乘 i。得零。",
    "一个不是零的向量，长度却是零。(1, 2i) 更糟：长度平方算出来是负 3。",
    "今天讲：一个字母上加一道横，就修好了复数上的几何。",
  ],
  title: ["第二季，第十五集。酉空间。"],
  bar: [
    "复数自乘，转得快一倍，符号也跟着乱跳。复数乘它的共轭，就一点也不转：正好是长度的平方。",
    "所以复内积在一个插槽上取共轭。这样 (1, i) 的长度平方就是 1 加 1：二。",
  ],
  unitary: [
    "保持复长度的映射叫酉映射。在合适的基下，它只是让每个坐标绕自己的圆转。",
    "换一组基，矩阵里填满了数，可特征值纹丝不动，个个都在单位圆上。",
  ],
  // 只在中文版出现：刘徽割圆术
  geyuan: [
    "刘徽注《九章算术》，用“割圆术”算圆周率：从正六边形起，边数一次次加倍。",
    "“割之弥细，所失弥少。”正多边形的顶点，是同一个转动一步一步走出来的。",
    "这个转动不改长度、只改角度：在复数里，它就是乘一个单位圆上的数。",
  ],
  spectral: [
    "1909 年，舒尔证明：任何复映射，在某组标准正交基下都是三角形的。",
    "如果映射还和它的伴随可交换，三角形就空了，变成对角的。厄米映射的特征值是实数，酉映射的特征值在单位圆上。",
  ],
  fourier: [
    "压轴的来了。用离散傅里叶变换把一段信号拆成各个频率。它是一个酉映射。",
    "所以能量在时间上和在频率上一样多，反着变回去只要取共轭转置。每一个音频文件、每一通电话都靠它。",
  ],
  endCard: [
    "在复数上，长度离不开共轭。有了它，酉映射保持长度，只是转动。",
    "下一集：一叠薄片变成一支箭头的那一刻。梯度，终于讲清楚。",
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
  "bar",
  "unitary",
  "geyuan",
  "spectral",
  "fourier",
  "endCard",
];

export const S2E15 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { geyuan: "zh" },
  season: 2,
});
