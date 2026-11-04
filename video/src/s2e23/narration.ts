import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E23, from lessons/s2/e23-banach-spaces.md, on the new
// standard (about five minutes, one-line captions, the visuals explain):
// Taylor polynomials crowding towards eˣ, which isn't a polynomial; Cauchy
// sequences and completeness; which spaces are complete; completion as
// Season 1's ℚ → ℝ one level up; absolutely convergent series and
// Schauder bases; the contraction mapping theorem on x = cos x; and
// Picard's iteration landing back on eᵗ.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "cauchy"
  | "zoo"
  | "lp"
  | "completion"
  | "series"
  | "zuchongzhi"
  | "contraction"
  | "picard"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Some polynomials: 1, then 1 + x, then 1 + x + x²/2…",
    "Each adds the next term, xⁿ/n!.",
    "On [0, 1], they soon differ by less than a pen line.",
    "They're homing in on something: eˣ.",
    "But eˣ isn't a polynomial.",
    "Among polynomials only, they crowd towards a hole.",
    "Season 1 again: 1.4, 1.41, 1.414 crowd towards √2.",
    "Today we fill holes in spaces of functions.",
  ],
  title: ["Season two, episode twenty-three. Banach spaces."],
  cauchy: [
    "Terms that crowd together: a Cauchy sequence.",
    "Past some point, every two terms are closer than ε.",
    "Every convergent sequence is Cauchy.",
    "Complete is the converse: crowding always has a target.",
    "A complete normed space is a Banach space.",
  ],
  zoo: [
    "Which spaces are complete?",
    "Every finite-dimensional one. ℓᵖ. C[0, 1] by its peak.",
    "Not the polynomials: eˣ is missing.",
    "Not finite sequences: (1, ½, ¼, …) is missing.",
    "Not C[0, 1] with the area norm: a step is missing.",
  ],
  lp: [
    "Why is ℓ² complete? Take a Cauchy sequence of sequences.",
    "Each coordinate alone is a Cauchy sequence of numbers.",
    "ℝ is complete, so each coordinate has a limit.",
    "Those limits form a sequence x, and x is in ℓ².",
    "They converge to x. ℓ² inherits ℝ's completeness.",
  ],
  completion: [
    "Any normed space can be completed. Same recipe as ℝ.",
    "Its new points are Cauchy sequences, up to closeness.",
    "Polynomials complete to all continuous functions.",
    "Finite sequences complete to ℓᵖ.",
    "Continuous functions in area complete to L¹.",
  ],
  series: [
    "Why care? Infinite sums need completeness.",
    "If the lengths add up, the sum should exist.",
    "In a Banach space, it always does.",
    "So e₁, e₂, … become a real basis of ℓ²: infinite sums.",
    "Not of ℓ∞: (1, 1, 1, …) always stays 1 away.",
  ],
  zuchongzhi: [], // Chinese edition only
  contraction: [
    "The payoff: Banach, 1922.",
    "A contraction pulls any two points closer, by q < 1.",
    "Solve x = cos x: start anywhere and keep applying cos.",
    "The steps shrink like qⁿ, so the iterates are Cauchy.",
    "Complete, so they land somewhere: 0.739…",
    "Exactly one fixed point, and the error drops like qⁿ.",
  ],
  picard: [
    "Same trick for differential equations: y′ = y, y(0) = 1.",
    "Rewrite it: y = 1 + ∫ y. Iterate.",
    "1, then 1 + t, then 1 + t + t²/2…",
    "The cold open's polynomials: Picard lands on eᵗ.",
    "PageRank is a contraction too.",
  ],
  endCard: [
    "Complete spaces have no holes.",
    "So limits, series and iterations have somewhere to land.",
    "Next: the continuous dual. Measurements we can trust.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "一串多项式：1，然后 1 + x，然后 1 + x + x²/2……",
    "每次多加一项 xⁿ/n!。",
    "在 [0, 1] 上，很快就相差不到一笔的粗细。",
    "它们正奔向某个东西：eˣ。",
    "可 eˣ 不是多项式。",
    "只看多项式的话，它们挤向一个洞。",
    "又是第一季：1.4、1.41、1.414 挤向 √2。",
    "今天来填函数空间里的洞。",
  ],
  title: ["第二季，第二十三集。巴拿赫空间。"],
  cauchy: [
    "彼此越挤越近的一串：柯西序列。",
    "过了某一项，任意两项都比 ε 还近。",
    "收敛的序列都是柯西序列。",
    "完备是反过来：挤在一起，就一定有目标。",
    "完备的赋范空间，叫巴拿赫空间。",
  ],
  zoo: [
    "哪些空间是完备的？",
    "所有有限维空间；ℓᵖ；用峰值范数的 C[0, 1]。",
    "多项式不是：缺了 eˣ。",
    "有限长的数列不是：缺了 (1, ½, ¼, …)。",
    "用面积范数的 C[0, 1] 不是：缺了阶梯函数。",
  ],
  lp: [
    "ℓ² 为什么完备？取一串数列组成的柯西序列。",
    "每个坐标单独看，都是一串数的柯西序列。",
    "ℝ 是完备的，所以每个坐标都有极限。",
    "这些极限组成数列 x，而 x 在 ℓ² 里。",
    "那串数列收敛到 x。ℓ² 继承了 ℝ 的完备。",
  ],
  completion: [
    "任何赋范空间都能完备化，做法和造 ℝ 一样。",
    "新的点是柯西序列，彼此靠拢的算同一个。",
    "多项式完备化成所有连续函数。",
    "有限数列完备化成 ℓᵖ。",
    "按面积量的连续函数，完备化成 L¹。",
  ],
  series: [
    "为什么在乎？无穷和需要完备。",
    "如果各项长度加起来有限，和就该存在。",
    "在巴拿赫空间里，它总存在。",
    "于是 e₁、e₂……成了 ℓ² 真正的基：用无穷和。",
    "但不是 ℓ∞ 的基：(1, 1, 1, …) 永远差着 1。",
  ],
  // 只在中文版出现：祖冲之圆周率“盈数”“朒数”（《隋书·律历志》）
  zuchongzhi: [
    "《隋书·律历志》记载祖冲之算圆周率。",
    "盈数三丈一尺四寸一分五厘九毫二秒七忽，",
    "朒数三丈一尺四寸一分五厘九毫二秒六忽。",
    "上下两个界，夹出一个数：这就是完备的样子。",
  ],
  contraction: [
    "回报来了：巴拿赫，1922 年。",
    "压缩映射：把任意两点拉近，倍数 q < 1。",
    "解 x = cos x：随便从哪开始，一直取余弦。",
    "步子按几何级数缩小，所以迭代是柯西序列。",
    "空间完备，所以落在某处：0.739……",
    "恰好一个不动点，误差像 qⁿ 一样下降。",
  ],
  picard: [
    "微分方程也一样：y′ = y，y(0) = 1。",
    "改写成 y = 1 + ∫ y，然后迭代。",
    "1，然后 1 + t，然后 1 + t + t²/2……",
    "正是开头那串多项式：皮卡迭代落在 eᵗ 上。",
    "PageRank 也是一个压缩映射。",
  ],
  endCard: [
    "完备空间没有洞。",
    "极限、级数、迭代，都有地方落脚。",
    "下一集：连续对偶。哪些测量信得过？",
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
  coldOpen: {
    0: 5.75,
    1: 4.75,
    2: 5.75,
    3: 5.25,
    4: 4.75,
    5: 5.25,
    6: 5.75,
    7: 4.75,
  },
  cauchy: { 0: 5.25, 1: 5.75, 2: 4.75, 3: 5.75, 4: 5.25 },
  zoo: { 0: 4.75, 1: 6.25, 2: 5.25, 3: 5.75, 4: 5.75 },
  lp: { 0: 5.75, 1: 5.75, 2: 5.25, 3: 5.75, 4: 5.75 },
  completion: { 0: 5.75, 1: 5.75, 2: 5.25, 3: 5.25, 4: 5.75 },
  series: { 0: 5.25, 1: 5.25, 2: 5.25, 3: 5.75, 4: 5.75 },
  zuchongzhi: { 0: 5.25, 1: 5.75, 2: 5.75, 3: 5.75 },
  contraction: { 0: 4.75, 1: 5.75, 2: 6.25, 3: 5.75, 4: 5.25, 5: 5.75 },
  picard: { 0: 5.25, 1: 5.75, 2: 5.75, 3: 5.75, 4: 5.25 },
  endCard: { 0: 4.25, 1: 4.75, 2: 5.25 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "cauchy",
  "zoo",
  "lp",
  "completion",
  "series",
  "zuchongzhi",
  "contraction",
  "picard",
  "endCard",
];

export const S2E23 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zuchongzhi: "zh" },
  season: 2,
  captions: "large",
});
