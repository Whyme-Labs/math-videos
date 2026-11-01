import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E15, from lessons/s2/e15-unitary-spaces.md, on the new
// standard (about five minutes, one-line captions, the visuals explain):
// the (1, i) disaster worked on screen, why no bilinear form can be
// positive over ℂ, why the conjugate is forced, the complex inner product
// and the real space hiding inside it, unitary maps and the proof that
// their eigenvalues sit on the unit circle, Schur and the spectral
// theorem, matrix land, and the DFT as a unitary map.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "noBilinear"
  | "bar"
  | "define"
  | "unitary"
  | "eigen"
  | "geyuan"
  | "spectral"
  | "matrixLand"
  | "fourier"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Berlin, 1932. Quantum mechanics, written in vectors.",
    "A state is a vector with complex entries, like (1, i).",
    "Its length gives probabilities. So let's measure it.",
    "Last episode's rule: multiply matching entries and add.",
    "1·1 + i·i. That's 1 + (−1). Zero.",
    "A nonzero arrow with length zero.",
    "Try (1, 2i): 1 + (−4) = −3. Negative.",
    "Today: one bar over one letter fixes all of it.",
  ],
  title: ["Season two, episode fifteen. Unitary spaces."],
  noBilinear: [
    "Could a cleverer formula, linear in both slots, work?",
    "Suppose some arrow v gets a positive B(v, v).",
    "Turn v a quarter turn: multiply by i.",
    "Both slots pull out an i. i · i = −1.",
    "So B(iv, iv) is negative. No such formula exists.",
  ],
  bar: [
    "Look at one complex number z on its circle.",
    "z · z spins twice as fast. Its real part flips sign.",
    "Mirror z across the real line: its conjugate.",
    "Conjugate times z doesn't spin at all. It sits at |z|².",
    "The conjugate undoes the turn and keeps the size.",
  ],
  define: [
    "So conjugate the second slot before multiplying.",
    "Rule one: linear in the first slot.",
    "Rule two: swap the slots and you get the conjugate.",
    "Rule three: ⟨v, v⟩ is real and positive.",
    "Now (1, i): 1·1 + i·(−i) = 1 + 1 = 2.",
    "Unfold ℂ² into ℝ⁴: (1, 0, 0, 1). Length² 2 again.",
  ],
  unitary: [
    "Which maps keep these lengths? Unitary maps.",
    "Each coordinate lives in its own complex plane.",
    "The simplest unitary map turns each one on its circle.",
    "Lengths can't change: each coordinate only turns.",
    "Change the basis and the matrix fills with numbers.",
    "But it's still the same turning, seen differently.",
  ],
  eigen: [
    "Its eigenvalues must sit on the unit circle. Here's why.",
    "Say Uv = λv. U keeps lengths, so ‖Uv‖ = ‖v‖.",
    "Pull λ out of each slot: one comes out conjugated.",
    "So |λ|² = 1: λ is on the unit circle.",
    "Without the bar this gives λ², which proves nothing.",
  ],
  geyuan: [], // Chinese edition only
  spectral: [
    "Schur, 1909: over ℂ, every map gets triangular.",
    "Pick an eigenvector, make it the first basis arrow.",
    "Repeat in what's left. Zeros fill the lower corner.",
    "If the map commutes with its conjugate transpose…",
    "…the upper corner empties too. Diagonal.",
    "Perpendicular eigen-axes, each with its own scale.",
  ],
  matrixLand: [
    "Numbers come in three special kinds on the complex plane.",
    "Real numbers: the line. Hermitian matrices land here.",
    "Unit numbers: the circle. Unitary matrices live there.",
    "Positive numbers: the ray. Positive matrices.",
  ],
  fourier: [
    "Now the payoff: a sound split into frequencies.",
    "The discrete Fourier transform does it with a matrix.",
    "Divided by √n, that matrix is unitary.",
    "So energy is the same in time and in frequency.",
    "Run it backwards with the conjugate transpose.",
    "Every audio file and phone call leans on this.",
  ],
  endCard: [
    "Over ℂ, length needs a conjugate.",
    "With it, unitary maps keep length and only turn.",
    "Next: the gradient isn't an arrow. It's a stack.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1932 年，柏林。冯·诺伊曼用向量写量子力学。",
    "状态是一个复数向量，比如 (1, i)。",
    "它的长度给出概率。那就量一量。",
    "用上一集的办法：对应项相乘再相加。",
    "1·1 + i·i，就是 1 + (−1)。等于零。",
    "一支非零的箭头，长度是零。",
    "再试 (1, 2i)：1 + (−4) = −3。负的。",
    "今天：一个字母上加一道横，全部修好。",
  ],
  title: ["第二季，第十五集。酉空间。"],
  noBilinear: [
    "换个更巧的公式，两个插槽都线性，行吗？",
    "假设某支箭头 v 的 B(v, v) 是正的。",
    "把 v 转四分之一圈：乘以 i。",
    "两个插槽各提出一个 i。i · i = −1。",
    "于是 B(iv, iv) 是负的。这种公式不存在。",
  ],
  bar: [
    "看一个复数 z，在它的圆上。",
    "z · z 转得快一倍，实部正负乱跳。",
    "把 z 沿实轴翻过去：这就是它的共轭。",
    "共轭乘 z，一点也不转，停在 |z|²。",
    "共轭抵掉了转动，只留下大小。",
  ],
  define: [
    "那就在相乘之前，给第二个插槽取共轭。",
    "第一条：对第一个插槽线性。",
    "第二条：两个插槽对调，得到共轭。",
    "第三条：⟨v, v⟩ 是正的实数。",
    "现在 (1, i)：1·1 + i·(−i) = 1 + 1 = 2。",
    "把 ℂ² 摊成 ℝ⁴：(1, 0, 0, 1)。长度平方也是 2。",
  ],
  unitary: [
    "哪些映射保持这种长度？酉映射。",
    "每个坐标住在自己的复平面里。",
    "最简单的酉映射：让每个坐标在圆上转。",
    "长度变不了：每个坐标只是在转。",
    "换一组基，矩阵里填满了数。",
    "可它还是同样的转动，只是换了角度看。",
  ],
  eigen: [
    "它的特征值一定在单位圆上。看为什么。",
    "设 Uv = λv。U 保持长度，‖Uv‖ = ‖v‖。",
    "把 λ 从两个插槽提出来：其中一个带共轭。",
    "所以 |λ|² = 1：λ 在单位圆上。",
    "没有那道横，这里只会得到 λ²，什么也证明不了。",
  ],
  // 只在中文版出现：刘徽割圆术
  geyuan: [
    "刘徽注《九章算术》，用割圆术算圆周率。",
    "从正六边形起，边数一次次加倍。",
    "“割之弥细，所失弥少。”",
    "每个顶点，都是同一个转动一步步走出来的。",
    "这个转动，就是乘一个单位圆上的数。",
  ],
  spectral: [
    "舒尔，1909 年：在 ℂ 上，每个映射都能化成三角形。",
    "取一个特征向量，当作第一支基箭头。",
    "在剩下的部分重复。左下角填满了零。",
    "如果映射和它的共轭转置可交换……",
    "……右上角也空了。对角的。",
    "互相垂直的特征轴，各有各的伸缩。",
  ],
  matrixLand: [
    "复平面上有三类特别的数。",
    "实数：直线。厄米矩阵：特征值是实数。",
    "模为 1 的数：单位圆。酉矩阵住在这里。",
    "正数：射线。正定矩阵。",
  ],
  fourier: [
    "压轴：把一段声音拆成各个频率。",
    "离散傅里叶变换用一个矩阵做到这件事。",
    "除以 √n 之后，这个矩阵是酉的。",
    "所以能量在时间上和在频率上一样多。",
    "反着变回去，只要共轭转置。",
    "每个音频文件、每通电话都靠它。",
  ],
  endCard: [
    "在 ℂ 上，长度离不开共轭。",
    "有了它，酉映射保持长度，只是转动。",
    "下一集：梯度不是箭头，而是一叠薄片。",
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
  coldOpen: { 0: 4.5, 1: 4, 2: 3.5, 3: 4, 4: 5, 5: 3.5, 6: 5, 7: 4.5 },
  noBilinear: { 0: 3.5, 1: 4, 2: 4.5, 3: 4.5, 4: 4.5 },
  bar: { 0: 4, 1: 5, 2: 4, 3: 5, 4: 4 },
  define: { 0: 4.5, 1: 4, 2: 4.5, 3: 4.5, 4: 5.5, 5: 6 },
  unitary: { 0: 3.5, 1: 4, 2: 5, 3: 4.5, 4: 5, 5: 4.5 },
  eigen: { 0: 3.5, 1: 4.5, 2: 5.5, 3: 4.5, 4: 4.5 },
  geyuan: { 0: 4, 1: 5, 2: 3.5, 3: 4.5, 4: 4.5 },
  spectral: { 0: 4, 1: 5, 2: 5.5, 3: 3.5, 4: 4.5, 5: 4.5 },
  matrixLand: { 0: 4, 1: 5, 2: 5, 3: 5 },
  fourier: { 0: 4.5, 1: 5, 2: 4.5, 3: 5, 4: 5.5, 5: 4 },
  endCard: { 0: 4, 1: 4.5, 2: 5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "noBilinear",
  "bar",
  "define",
  "unitary",
  "eigen",
  "geyuan",
  "spectral",
  "matrixLand",
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
  captions: "large",
});
