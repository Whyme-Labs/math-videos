import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E18, from lessons/s2/e18-spectral-theorem.md, on the new
// standard (about five minutes, one-line captions, the visuals explain):
// a tossed box with three clean spin axes and a tilted ellipse, why
// ordinary eigenbases fail, why an orthonormal one forces symmetry, the
// two lemmas worked as moving formulas, the invariant perpendicular plane
// in 3D (against a shear), the proof by peeling, the ellipse rotated to
// its axes, the Hessian on a 3D surface, and A as a sum of stretched
// shadows.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "skewed"
  | "necessary"
  | "lemmas"
  | "invariant"
  | "peel"
  | "ellipse"
  | "bianzhong"
  | "hessian"
  | "decomp"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Toss a box in the air with a spin. It wobbles.",
    "Spin it about one of three axes, and it turns cleanly.",
    "Every rigid object has three: a potato, a wrench, a book.",
    "And the three are always at right angles.",
    "A second puzzle: the curve 5x² + 4xy + 2y² = 1.",
    "A tilted ellipse. Its long and short axes cross at 90°.",
    "Both come from a symmetric matrix.",
    "Today: why symmetric means perpendicular axes.",
  ],
  title: ["Season two, episode eighteen. The spectral theorem."],
  skewed: [
    "Eigenvectors: directions a map only stretches.",
    "A rotation has none. A shear has only one.",
    "Some eigenbases are terrible: (1, 0) and (100, 1).",
    "Almost parallel. Useless for measuring anything.",
    "With an inner product, ask for perpendicular ones.",
  ],
  necessary: [
    "Suppose A has perpendicular unit eigenvectors.",
    "In that basis, A is a diagonal list of stretches.",
    "Back on the usual axes: A = QDQᵀ.",
    "Flip it across its diagonal: nothing changes. Aᵀ = A.",
    "Symmetry is necessary. The theorem: it's enough, too.",
  ],
  lemmas: [
    "Symmetric means ⟨Au, v⟩ = ⟨u, Av⟩: A moves across.",
    "Take eigenvectors u and v, with stretches λ and μ.",
    "Move A across: λ⟨u, v⟩ = μ⟨u, v⟩.",
    "If λ ≠ μ, then ⟨u, v⟩ = 0. Perpendicular, forced.",
    "The same trick over ℂ shows every λ is real.",
  ],
  invariant: [
    "Now the key step. Take one eigen-arrow v.",
    "Its perpendicular plane: everything at right angles to v.",
    "A symmetric map sends that plane into itself.",
    "Why: ⟨Aw, v⟩ = ⟨w, Av⟩ = λ⟨w, v⟩ = 0.",
    "A shear doesn't. Its plane tips out of place.",
    "So what's left never gets tangled with v.",
  ],
  peel: [
    "That's the whole proof. Find one eigen-arrow.",
    "Split it off. What's left is symmetric again.",
    "Find an eigen-arrow in there. Split again.",
    "Repeat until you run out of room.",
    "Perpendicular unit axes, one for every dimension.",
  ],
  ellipse: [
    "Back to the tilted ellipse. Its matrix is [5 2; 2 2].",
    "Its stretches are 6 and 1, along (2, 1) and (1, −2).",
    "Perpendicular, as promised.",
    "Turn to those axes: the curve is 6X² + Y² = 1.",
    "No cross term. Semi-axes 1/√6 and 1.",
    "An ellipse is a circle seen through a symmetric map.",
  ],
  bianzhong: [], // Chinese edition only
  hessian: [
    "Same story in calculus: f = x³ − 3xy + y³.",
    "Flat spots at (0, 0) and (1, 1). Which is which?",
    "Second derivatives form a symmetric matrix: the Hessian.",
    "At (0, 0) its stretches are 3 and −3.",
    "Up along one axis, down along the other: a saddle.",
    "At (1, 1): 3 and 9. Both positive: a bowl.",
  ],
  decomp: [
    "One more way to say it: A is a sum of stretched shadows.",
    "Project onto each axis, stretch by λ, add up.",
    "For the ellipse: A = 6 P₁ + 1 P₂.",
    "Now functions of A make sense: √A = √6 P₁ + P₂.",
    "Quantum measurements use exactly these shadows.",
  ],
  endCard: [
    "Symmetric maps only stretch, along perpendicular axes.",
    "The axes peel off one at a time.",
    "Next: every matrix, symmetric or not. The SVD.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "把盒子旋着抛到空中。它会乱晃。",
    "可绕着三根轴中的一根转，它就转得很稳。",
    "每个刚体都有这三根轴：土豆、扳手、手机。",
    "而且三根轴总是互相垂直。",
    "第二个谜题：曲线 5x² + 4xy + 2y² = 1。",
    "一个斜着的椭圆。最长和最短的直径成 90°。",
    "两个问题背后，都是一个对称矩阵。",
    "今天：为什么对称就意味着互相垂直的轴。",
  ],
  title: ["第二季，第十八集。谱定理。"],
  skewed: [
    "特征向量：映射只做伸缩的方向。",
    "旋转一个都没有。错切只有一个。",
    "有的特征基很糟：(1, 0) 和 (100, 1)。",
    "几乎平行，拿来度量什么都不好用。",
    "有了内积，就要最好的：互相垂直的特征向量。",
  ],
  necessary: [
    "假设 A 有一组互相垂直的单位特征向量。",
    "在这组基下，A 只是对角线上的一串伸缩。",
    "换回平常的坐标轴：A = QDQᵀ。",
    "沿对角线翻过来，一点不变：Aᵀ = A。",
    "所以对称是必要的。定理说：它也是充分的。",
  ],
  lemmas: [
    "对称就是 ⟨Au, v⟩ = ⟨u, Av⟩：A 可以挪到另一边。",
    "取特征向量 u 和 v，伸缩倍数是 λ 和 μ。",
    "把 A 挪过去：λ⟨u, v⟩ = μ⟨u, v⟩。",
    "如果 λ ≠ μ，那么 ⟨u, v⟩ = 0。只能垂直。",
    "在 ℂ 上用同一招，可知每个 λ 都是实数。",
  ],
  invariant: [
    "关键的一步。取一支特征箭头 v。",
    "它的垂直平面：所有和 v 成直角的向量。",
    "对称映射把这个平面送回它自己。",
    "因为 ⟨Aw, v⟩ = ⟨w, Av⟩ = λ⟨w, v⟩ = 0。",
    "错切就不行，它的平面被掀歪了。",
    "所以剩下的部分，永远不会和 v 缠在一起。",
  ],
  peel: [
    "证明就这么多。先找到一支特征箭头。",
    "把它分出去，剩下的仍然是对称的。",
    "在剩下的里面再找一支，再分出去。",
    "一直重复，直到没有空间。",
    "互相垂直的单位轴，每个维度一根。",
  ],
  ellipse: [
    "回到那个斜椭圆。它的矩阵是 [5 2; 2 2]。",
    "伸缩倍数是 6 和 1，方向 (2, 1) 和 (1, −2)。",
    "果然互相垂直。",
    "转到这两根轴上：曲线变成 6X² + Y² = 1。",
    "交叉项没了。半轴是 1/√6 和 1。",
    "椭圆，就是透过对称映射看到的圆。",
  ],
  // 只在中文版出现：曾侯乙编钟，一钟双音
  bianzhong: [
    "1978 年，湖北随州出土曾侯乙编钟，战国早期。",
    "钟身不是圆的，是两片瓦合成的“合瓦形”。",
    "敲正面中间是一个音，敲侧面是另一个音。",
    "一钟双音：两种振动各自独立，互不牵连。",
    "对称的钟体，把振动分成了两个“主方向”。",
  ],
  hessian: [
    "微积分里也是这样：f = x³ − 3xy + y³。",
    "平坦点在 (0, 0) 和 (1, 1)。各是什么？",
    "二阶导数排成一个对称矩阵：黑塞矩阵。",
    "在 (0, 0)，它的伸缩倍数是 3 和 −3。",
    "沿一根轴向上，沿另一根向下：鞍点。",
    "在 (1, 1)：3 和 9，都为正：一个碗。",
  ],
  decomp: [
    "换个说法：A 是一组伸缩过的影子之和。",
    "投影到每根轴上，乘以 λ，再加起来。",
    "对这个椭圆：A = 6 P₁ + 1 P₂。",
    "于是 A 的函数也有了意义：√A = √6 P₁ + P₂。",
    "量子力学的测量，用的正是这些影子。",
  ],
  endCard: [
    "对称映射只做伸缩，沿着互相垂直的轴。",
    "这些轴可以一根一根剥出来。",
    "下一集：任何矩阵，对称与否。奇异值分解。",
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
  coldOpen: { 0: 4.5, 1: 5, 2: 5, 3: 4, 4: 4.5, 5: 5, 6: 4, 7: 4.5 },
  skewed: { 0: 4.5, 1: 5.5, 2: 5, 3: 4, 4: 4.5 },
  necessary: { 0: 4.5, 1: 5, 2: 5, 3: 5.5, 4: 4.5 },
  lemmas: { 0: 5, 1: 4.5, 2: 5, 3: 5, 4: 4.5 },
  invariant: { 0: 4, 1: 4.5, 2: 5.5, 3: 5, 4: 5.5, 5: 4 },
  peel: { 0: 4.5, 1: 5, 2: 5, 3: 4.5, 4: 4.5 },
  ellipse: { 0: 4.5, 1: 5, 2: 3.5, 3: 5.5, 4: 4.5, 5: 5.5 },
  bianzhong: { 0: 4.5, 1: 4.5, 2: 5, 3: 5, 4: 4.5 },
  hessian: { 0: 5, 1: 4.5, 2: 4.5, 3: 4.5, 4: 5, 5: 5.5 },
  decomp: { 0: 4.5, 1: 5.5, 2: 4.5, 3: 5, 4: 4 },
  endCard: { 0: 4, 1: 4.5, 2: 5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "skewed",
  "necessary",
  "lemmas",
  "invariant",
  "peel",
  "ellipse",
  "bianzhong",
  "hessian",
  "decomp",
  "endCard",
];

export const S2E18 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { bianzhong: "zh" },
  season: 2,
  captions: "large",
});
