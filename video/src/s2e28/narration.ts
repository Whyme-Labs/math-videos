import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E28, from lessons/s2/e28-hilbert-spaces.md, on the new
// standard (about five minutes, one-line captions, the visuals explain):
// the closest-point puzzle, why an inner product alone fails, the
// projection theorem from the parallelogram law, Riesz representation,
// orthonormal bases with Bessel and Parseval, and the one separable
// Hilbert space ℓ². Each line is one caption and one cue; MIN_SECONDS
// gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "naive"
  | "projection"
  | "guiju"
  | "riesz"
  | "bases"
  | "onlyOne"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "In the plane, the closest point on a line is easy.",
    "Drop a perpendicular. The error meets it square on.",
    "Some spaces have no closest point. Gaps just shrink.",
    "Now take every square-integrable function on [0, 1].",
    "Sound clips, temperature curves, an electron's wave.",
    "Pick the subspace of lines a + b·x.",
    "Is there a closest line to x², error perpendicular?",
    "Yes: with angles and completeness. Hilbert spaces.",
  ],
  title: ["Season two, episode twenty-eight. Hilbert spaces."],
  naive: [
    "An inner product alone isn't enough.",
    "In finite sequences, aim at the plane ⟨x, y⟩ = 0.",
    "The closest point to e₁ needs every entry. Not allowed.",
    "Without one, balls get corners and closest points split.",
    "A Hilbert space has both: angles and completeness.",
  ],
  projection: [
    "Projection: a closed convex C has one closest point.",
    "Take cₙ in C, closer and closer to the best distance d.",
    "Parallelogram law: ‖cₘ − cₙ‖² ≤ 2/n + 2/m.",
    "So they're Cauchy, and completeness gives a limit p.",
    "For a subspace, the error x − p is perpendicular to it.",
    "So H = M ⊕ M⊥ for every closed subspace M.",
  ],
  guiju: [], // Chinese edition only
  riesz: [
    "Riesz: every continuous functional is ⟨x, y⟩ for one y.",
    "Draw φ as a stack of parallel level hyperplanes.",
    "Its kernel is closed, so drop a perpendicular z onto it.",
    "y = z / ‖z‖² points across the stack, and ‖φ‖ = ‖y‖.",
    "Example: ∫ f over [0, ½] is ⟨f, y⟩ with y = 1 on [0, ½].",
    "H is its own dual. Banach spaces lost that. It's back.",
  ],
  bases: [
    "The best line to x² on [0, 1] is x − 1/6. Error²: 1/180.",
    "Add orthonormal directions e₁, e₂, e₃, one at a time.",
    "Each step projects x again, and the error shrinks.",
    "Bessel: Σ |⟨x, eₙ⟩|² ≤ ‖x‖². The pieces never overshoot.",
    "Completeness sums the series. Parseval: equality.",
    "So x = Σ ⟨x, eₙ⟩ eₙ, an infinite sum of shadows.",
  ],
  onlyOne: [
    "Every separable Hilbert space has such a basis.",
    "Read off coordinates: x ↦ (⟨x, e₁⟩, ⟨x, e₂⟩, …).",
    "That map keeps lengths and angles, and lands in ℓ².",
    "So L²[0, 1], L²(ℝ) and a quantum state space are all ℓ².",
    "Don't build it. Describe it: the separable Hilbert space.",
    "Bonus: f(t) = t and Parseval give Σ 1/n² = π²/6.",
  ],
  endCard: [
    "Inner product plus completeness: Euclid comes back.",
    "Closest points, perpendiculars, H = H*, and one ℓ².",
    "Next: Fourier. Functions as infinite vectors.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "在平面上，直线上离某点最近的点很好找。",
    "作一条垂线。误差和直线正交。",
    "有的空间没有最近点，差距一直缩小，永远到不了。",
    "现在看 [0, 1] 上所有平方可积的函数。",
    "录音片段、温度曲线、电子的波函数。",
    "取子空间：所有直线 a + b·x。",
    "有没有一条离 x² 最近的直线，误差还正交？",
    "有，只要同时有角度和完备性。今天讲希尔伯特空间。",
  ],
  title: ["第二季，第二十八集。希尔伯特空间。"],
  naive: [
    "光有内积还不够。",
    "在有限数列里，瞄准平面 ⟨x, y⟩ = 0。",
    "离 e₁ 最近的点要用上每一项，这里不允许。",
    "没有内积，球就有棱角：最近点不止一个。",
    "希尔伯特空间两样都有：内积，加上完备。",
  ],
  projection: [
    "投影定理：闭凸集 C 里只有一个最近点。",
    "在 C 里取一串点 cₙ，离最小距离 d 越来越近。",
    "平行四边形法则：‖cₘ − cₙ‖² ≤ 2/n + 2/m。",
    "所以它们是柯西列，完备性给出极限 p。",
    "对子空间，误差 x − p 与它正交。",
    "所以每个闭子空间 M 都有 H = M ⊕ M⊥。",
  ],
  // 只在中文版出现：规矩（《孟子·离娄上》）
  guiju: [
    "《孟子》：“不以规矩，不能成方圆。”",
    "规画圆，量的是长短。",
    "矩成直角，管的是垂直。",
    "希尔伯特空间规矩俱全：有范数，也有直角。",
  ],
  riesz: [
    "里斯：每个连续泛函都是 ⟨x, y⟩，y 只有一个。",
    "把 φ 画成一叠平行的等值超平面。",
    "它的核是闭的，所以往核上作垂线 z。",
    "y = z / ‖z‖² 横穿这叠平面，而且 ‖φ‖ = ‖y‖。",
    "例：f 在 [0, ½] 上的积分，就是 ⟨f, 1_[0,½]⟩。",
    "H 就是自己的对偶。巴拿赫空间丢了它，现在回来了。",
  ],
  bases: [
    "离 x² 最近的直线是 x − 1/6，误差平方 1/180。",
    "再一个一个加上正交单位方向 e₁、e₂、e₃。",
    "每一步重新投影，误差就缩小一点。",
    "贝塞尔：Σ |⟨x, eₙ⟩|² ≤ ‖x‖²，加起来不会超。",
    "完备性把级数加起来。帕塞瓦尔：正好相等。",
    "所以 x = Σ ⟨x, eₙ⟩ eₙ，是无穷多个影子之和。",
  ],
  onlyOne: [
    "每个可分的希尔伯特空间都有这样的基。",
    "读出坐标：x ↦ (⟨x, e₁⟩, ⟨x, e₂⟩, …)。",
    "这个映射保长度、保角度，落在 ℓ² 里。",
    "所以 L²[0, 1]、L²(ℝ)、量子态空间，都是 ℓ²。",
    "不用去造，只要描述：唯一的可分希尔伯特空间。",
    "附送：f(t) = t 加帕塞瓦尔，得到 Σ 1/n² = π²/6。",
  ],
  endCard: [
    "内积加完备：欧几里得回来了。",
    "最近点、垂线、H = H*，还有唯一的 ℓ²。",
    "下一集：傅里叶。函数是无穷维向量。",
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
  coldOpen: { 0: 6, 1: 6.5, 2: 6.5, 3: 6, 4: 6, 5: 6, 6: 6.5, 7: 6.5 },
  naive: { 0: 5.5, 1: 6.5, 2: 6.5, 3: 6.5, 4: 6 },
  projection: { 0: 6.5, 1: 6.5, 2: 7, 3: 6.5, 4: 6.5, 5: 6 },
  guiju: { 0: 6, 1: 6, 2: 6, 3: 6.5 },
  riesz: { 0: 6, 1: 6, 2: 6.5, 3: 6.5, 4: 6.5, 5: 6 },
  bases: { 0: 7, 1: 6.5, 2: 6.5, 3: 6.5, 4: 6, 5: 6.5 },
  onlyOne: { 0: 6, 1: 6.5, 2: 6.5, 3: 6.5, 4: 6, 5: 6.5 },
  endCard: { 0: 5, 1: 5.5, 2: 6 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "naive",
  "projection",
  "guiju",
  "riesz",
  "bases",
  "onlyOne",
  "endCard",
];

export const S2E28 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { guiju: "zh" },
  season: 2,
  captions: "large",
});
