import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E26, from lessons/s2/e26-big-three-theorems.md, on the
// new standard (about five minutes, one-line captions, the visuals
// explain): a continuous function whose Fourier series blows up at 0,
// pointwise versus uniform bounds, Baire's theorem, uniform boundedness,
// the open mapping and closed graph theorems, the Dirichlet kernel and
// the Lebesgue constants, and no countable Hamel basis. Each line is one
// caption and one cue; MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "naive"
  | "baire"
  | "paoding"
  | "ubp"
  | "openMap"
  | "closedGraph"
  | "fourier"
  | "hamel"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1807: Fourier says any function is a sum of waves.",
    "For a smooth function, the partial sums close in on it.",
    "Surely the same holds for every continuous function?",
    "1873: du Bois-Reymond builds one that blows up at 0.",
    "Layer on layer of wiggles, each tuned by hand.",
    "1927: Banach and Steinhaus prove it in a few lines.",
    "They never write the bad function down.",
    "The secret is completeness. Today: three theorems.",
  ],
  title: ["Season two, episode twenty-six. The big three theorems."],
  naive: [
    "A family of maps, bounded at every single point.",
    "Must they be bounded all together? Not always.",
    "Each bump fades at every x, yet the peaks grow like n.",
    "Linear maps on finite sequences: fₙ(x) = n·xₙ.",
    "Bounded at each x, but ‖fₙ‖ = n. The space has holes.",
  ],
  baire: [
    "Baire's theorem: a complete space isn't made of dust.",
    "Take countably many thin sets: lines, points, dust.",
    "Pick a disc that misses the first one.",
    "Inside it, a smaller disc that misses the second.",
    "The centres are Cauchy, so they land on a point.",
    "That point dodges every thin set. In ℚ, it's a hole.",
  ],
  paoding: [], // Chinese edition only
  ubp: [
    "Uniform boundedness turns pointwise bounds into one.",
    "Sort the points by bound: Fₙ is where every ‖Tx‖ ≤ n.",
    "The Fₙ cover the space, so one of them holds a ball.",
    "Shift and scale that ball: every ‖T‖ ≤ 2N / r.",
    "Unbounded norms? Then some x is unbounded too.",
  ],
  openMap: [
    "Open mapping: a bounded map onto Y opens up balls.",
    "The image of X's unit ball holds a whole ball of Y.",
    "To hit a target y, step closer by halves.",
    "The steps form a series, and completeness sums it.",
    "So a bounded bijection has a bounded inverse.",
  ],
  closedGraph: [
    "Closed graph: if limits of (x, Tx) stay on the graph…",
    "…then T is bounded, between Banach spaces.",
    "Take d/dx with the sup norm: xⁿ stays at 1.",
    "Its slope at 1 is n. Unbounded, yet the graph is closed.",
    "No contradiction: C¹ with the sup norm isn't complete.",
  ],
  fourier: [
    "Now the Fourier showcase. Sₙ f(0) = ∫ f·Dₙ.",
    "Dₙ is the Dirichlet kernel. It grows taller as n grows.",
    "The norm of f ↦ Sₙ f(0) is the area under |Dₙ|.",
    "Those areas grow like (4/π²) ln n. Slowly, but forever.",
    "Unbounded norms, complete space: some f diverges at 0.",
    "And most continuous functions do. We never built one.",
  ],
  hamel: [
    "One more: Hamel bases. Suppose b₁, b₂, … were enough.",
    "Each span Fₙ is closed and paper-thin.",
    "Countably many can't cover a Banach space.",
  ],
  endCard: [
    "Completeness gives three theorems for free.",
    "Bounds spread, balls open, closed graphs are bounded.",
    "Next: weak convergence, where only readings converge.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1807 年：傅里叶说，任何函数都是波的和。",
    "光滑的函数，部分和会一步步贴上去。",
    "每个连续函数，应该也一样吧？",
    "1873 年：杜布瓦-雷蒙造出一个在 0 处发散的。",
    "一层又一层的波纹，每层都手工调好。",
    "1927 年：巴拿赫和施泰因豪斯几行就证明了。",
    "他们根本没把那个坏函数写出来。",
    "秘诀是完备性。今天讲由它而来的三个定理。",
  ],
  title: ["第二季，第二十六集。三大定理。"],
  naive: [
    "一族映射，在每一点上都有界。",
    "它们一定整体有界吗？不一定。",
    "这些鼓包在每个 x 处都趋于 0，峰却像 n 一样长。",
    "有限数列上的线性映射：fₙ(x) = n·xₙ。",
    "每点有界，‖fₙ‖ 却是 n。这个空间有洞。",
  ],
  baire: [
    "贝尔定理：完备空间不是一堆尘土拼成的。",
    "取可数个薄薄的集合：直线、点、康托尔尘。",
    "挑一个圆盘，避开第一个。",
    "在里面挑个更小的，避开第二个。",
    "圆心是柯西序列，所以落到一个点上。",
    "这个点躲开了所有薄集。在 ℚ 里，它是个洞。",
  ],
  // 只在中文版出现：庖丁解牛（《庄子·养生主》）
  paoding: [
    "《庄子》里，庖丁的刀用了十九年还像新的。",
    "“彼节者有间，而刀刃者无厚。”",
    "“以无厚入有间，恢恢乎其于游刃必有余地矣。”",
    "薄集再多也挤不满完备空间，总有余地。",
  ],
  ubp: [
    "一致有界原理：每点的界，会变成一个总的界。",
    "按界把点分组：Fₙ 是所有 ‖Tx‖ ≤ n 的地方。",
    "这些 Fₙ 盖住了空间，其中一个装得下一个球。",
    "把这个球平移、缩放：每个 ‖T‖ ≤ 2N / r。",
    "范数无界？那就有某个 x 也无界。",
  ],
  openMap: [
    "开映射：满的有界映射会把球撑开。",
    "X 的单位球的像里，装得下 Y 的一整个球。",
    "要打中目标 y，每步把误差减半。",
    "这些步子是一个级数，完备性把它加起来。",
    "所以有界的双射，逆也有界。",
  ],
  closedGraph: [
    "闭图像：如果 (x, Tx) 的极限还在图像上……",
    "……那么在巴拿赫空间之间，T 就有界。",
    "看用峰值范数的 d/dx：xⁿ 一直是 1。",
    "它在 1 处的斜率是 n。无界，图像却是闭的。",
    "不矛盾：用峰值范数的 C¹ 不完备。",
  ],
  fourier: [
    "回到傅里叶。Sₙ f(0) = ∫ f·Dₙ。",
    "Dₙ 是狄利克雷核，n 越大越高。",
    "f ↦ Sₙ f(0) 的范数，就是 |Dₙ| 下的面积。",
    "这些面积像 (4/π²) ln n 一样长，慢，但不停。",
    "范数无界、空间完备：某个 f 在 0 处发散。",
    "而且大多数连续函数都这样。我们一个也没造。",
  ],
  hamel: [
    "再来一个：哈默尔基。假设 b₁、b₂……就够用。",
    "每个张成 Fₙ 都是闭的，薄得像纸。",
    "可数个这样的薄片，盖不满巴拿赫空间。",
  ],
  endCard: [
    "完备性白送了三个定理。",
    "界会扩散，球会撑开，闭图像就有界。",
    "下一集：弱收敛。只对测量收敛。",
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
  coldOpen: { 0: 5.5, 1: 5.5, 2: 5, 3: 5.5, 4: 5.5, 5: 5, 6: 5, 7: 5.5 },
  naive: { 0: 5, 1: 5, 2: 6, 3: 5.5, 4: 5.5 },
  baire: { 0: 5, 1: 5.5, 2: 5, 3: 5, 4: 5.5, 5: 6 },
  paoding: { 0: 5.5, 1: 5, 2: 5.5, 3: 5.5 },
  ubp: { 0: 5, 1: 6, 2: 6, 3: 5.5, 4: 5.5 },
  openMap: { 0: 5, 1: 5.5, 2: 6, 3: 5.5, 4: 5 },
  closedGraph: { 0: 5.5, 1: 5, 2: 5.5, 3: 5.5, 4: 5 },
  fourier: { 0: 5, 1: 6, 2: 5.5, 3: 6, 4: 5.5, 5: 5 },
  hamel: { 0: 5, 1: 5.5, 2: 5.5 },
  endCard: { 0: 4.5, 1: 5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "naive",
  "baire",
  "paoding",
  "ubp",
  "openMap",
  "closedGraph",
  "fourier",
  "hamel",
  "endCard",
];

export const S2E26 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { paoding: "zh" },
  season: 2,
  captions: "large",
});
