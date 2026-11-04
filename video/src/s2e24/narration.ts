import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E24, from lessons/s2/e24-continuous-dual.md, on the new
// standard (about five minutes, one-line captions, the visuals explain):
// tents whose area vanishes while their value at 0 stays 1, the algebraic
// dual's monsters, the continuous dual and its norm, Hölder's inequality
// and dual unit balls, the dual of each ℓᵖ, functionals on C[0, 1] as
// measures, evaluation at a point, and the double dual with reflexivity.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "monsters"
  | "dualNorm"
  | "holder"
  | "duals"
  | "kachi"
  | "measures"
  | "evaluation"
  | "bidual"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Ways to measure a function: a value, a slope, an area.",
    "Each one is linear: it turns a function into a number.",
    "Here's a narrow tent at 0. Its area: 1/200.",
    "Narrower: 1/2000. Narrower still. The area goes to 0.",
    "By area, these tents are shrinking to nothing.",
    "But the value at 0 reads 1, every time.",
    "A thermometer that reads 100° on ice isn't a thermometer.",
    "Today: keep only the measurements we can trust.",
  ],
  title: ["Season two, episode twenty-four. The continuous dual."],
  monsters: [
    "Part A's dual held every linear measurement.",
    "In finite dimensions, every one of them is continuous.",
    "In infinite dimensions, monsters appear: f(x) = Σ k·xₖ.",
    "Each eₙ has length 1, but f(eₙ) = n.",
    "Tiny changes in, huge changes out. Useless.",
  ],
  dualNorm: [
    "The continuous dual X* keeps only the bounded ones.",
    "A functional's size: its top reading on the unit ball.",
    "Its level lines slide outwards until they touch the ball.",
    "X* is always complete, even when X isn't.",
    "Its completeness comes from the numbers, not from X.",
  ],
  holder: [
    "Which measurements does ℓᵖ have? Hölder answers.",
    "Σ |xₖyₖ| ≤ ‖x‖ₚ ‖y‖ᵣ, when 1/p + 1/r = 1.",
    "So every y in ℓʳ measures ℓᵖ.",
    "Dual balls: the diamond's partner is the square.",
    "The disc is its own partner: p = r = 2.",
    "p = 3 pairs with r = 3/2. One fattens as the other thins.",
  ],
  duals: [
    "In fact (ℓᵖ)* is exactly ℓʳ, for 1 ≤ p < ∞.",
    "The proof tests f on e₁, e₂, …, then fills in by density.",
    "Finite sequences are dense in ℓᵖ. That's the key.",
    "In ℓ∞ they aren't: (1, 1, 1, …) stays 1 away.",
    "So (ℓ∞)* is strictly bigger than ℓ¹.",
  ],
  kachi: [], // Chinese edition only
  measures: [
    "And the measurements of C[0, 1], with the peak norm?",
    "Some read a value: δₜ(f) = f(t).",
    "Some average with a weight: ∫ f g.",
    "All of them are measures on [0, 1]. Riesz again.",
  ],
  evaluation: [
    "Is the value at a point trustworthy? It depends.",
    "With the peak norm: |f(a)| ≤ ‖f‖∞. Yes.",
    "With the area norm, the tents break it. No.",
    "In L¹, a single point isn't even defined.",
  ],
  bidual: [
    "Measure the measurements: X**.",
    "Each x gives one: f ↦ f(x). That's J.",
    "When J hits all of X**, X is reflexive.",
    "ℓᵖ for 1 < p < ∞: yes. Rounded balls.",
    "ℓ¹: no. ℓ∞ holds uncountably many 0–1 sequences, 1 apart.",
    "C[0, 1]: no. Its point readings are all 2 apart.",
  ],
  endCard: [
    "Only continuous measurements count.",
    "They form X*, and how big it is depends on the norm.",
    "Next: Hahn–Banach. Are there enough of them?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "量函数的工具：某点的值、斜率、面积。",
    "每个都是线性的：把函数变成一个数。",
    "这是 0 处一个窄窄的帐篷，面积 1/200。",
    "再窄：1/2000。还要窄，面积趋于 0。",
    "按面积量，这些帐篷缩成了没有。",
    "可“0 处的值”每次都读 1。",
    "冰块上读出 100° 的温度计，不算温度计。",
    "今天：只留下信得过的测量。",
  ],
  title: ["第二季，第二十四集。连续对偶。"],
  monsters: [
    "上篇的对偶，装着所有线性测量。",
    "在有限维里，它们每一个都是连续的。",
    "在无限维里，怪物出现了：f(x) = Σ k·xₖ。",
    "每个 eₙ 长度是 1，f(eₙ) 却是 n。",
    "输入差一点，输出差很多。没法用。",
  ],
  dualNorm: [
    "连续对偶 X* 只留下有界的那些。",
    "一个泛函的大小：它在单位球上最大的读数。",
    "想象它的等值线向外推，直到碰到单位球。",
    "X* 永远是完备的，就算 X 不是。",
    "它的完备来自数本身，不是来自 X。",
  ],
  holder: [
    "ℓᵖ 有哪些测量？赫尔德不等式给出答案。",
    "Σ |xₖyₖ| ≤ ‖x‖ₚ ‖y‖ᵣ，其中 1/p + 1/r = 1。",
    "于是 ℓʳ 里每个 y 都能量 ℓᵖ。",
    "对偶的单位球：菱形的搭档是正方形。",
    "圆盘的搭档是它自己：p = r = 2。",
    "p = 3 配 r = 3/2。一个变胖，另一个就变瘦。",
  ],
  duals: [
    "其实，1 ≤ p < ∞ 时，(ℓᵖ)* 正好是 ℓʳ。",
    "证明在 e₁、e₂……上试一遍，再靠稠密补全。",
    "有限数列在 ℓᵖ 里稠密，这是关键。",
    "在 ℓ∞ 里不稠密：(1, 1, 1, …) 永远差着 1。",
    "所以 (ℓ∞)* 比 ℓ¹ 严格大。",
  ],
  // 只在中文版出现：新莽铜卡尺（始建国元年，公元 9 年）
  kachi: [
    "新莽铜卡尺，铭文“始建国元年正月癸酉朔日制”。",
    "一边是固定的爪，一边是能滑动的爪。",
    "东西厚一点点，读数就只变一点点。",
    "靠得住的量具，就是连续的测量。",
  ],
  measures: [
    "那用峰值范数的 C[0, 1]，有哪些测量？",
    "有的读一个点的值：δₜ(f) = f(t)。",
    "有的带权平均：∫ f g。",
    "它们全都是 [0, 1] 上的测度。又是里斯。",
  ],
  evaluation: [
    "某一点的值信得过吗？要看情况。",
    "用峰值范数：|f(a)| ≤ ‖f‖∞。信得过。",
    "用面积范数，那些帐篷就把它弄坏了。",
    "在 L¹ 里，单独一点根本没有定义。",
  ],
  bidual: [
    "再来量这些测量：X**。",
    "每个 x 给出一个：f ↦ f(x)。这就是 J。",
    "如果 J 盖满整个 X**，X 就叫自反的。",
    "1 < p < ∞ 的 ℓᵖ：是。单位球是圆润的。",
    "ℓ¹：不是。ℓ∞ 里不可数多个 0–1 数列，两两相距 1。",
    "C[0, 1]：不是。它的点值测量两两相距 2。",
  ],
  endCard: [
    "只有连续的测量才算数。",
    "它们组成 X*，大小取决于范数。",
    "下一集：哈恩–巴拿赫。这样的测量够不够用？",
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
    1: 5.25,
    2: 5.75,
    3: 5.75,
    4: 5.25,
    5: 5.25,
    6: 5.75,
    7: 5.25,
  },
  monsters: { 0: 5.25, 1: 5.25, 2: 5.75, 3: 5.75, 4: 5.25 },
  dualNorm: { 0: 5.25, 1: 5.75, 2: 6.25, 3: 5.25, 4: 5.25 },
  holder: { 0: 5.25, 1: 5.75, 2: 5.25, 3: 5.75, 4: 5.25, 5: 6.25 },
  duals: { 0: 5.75, 1: 5.75, 2: 5.75, 3: 5.75, 4: 5.25 },
  kachi: { 0: 5.75, 1: 5.25, 2: 5.75, 3: 5.25 },
  measures: { 0: 5.25, 1: 5.75, 2: 5.75, 3: 5.75 },
  evaluation: { 0: 5.25, 1: 5.75, 2: 5.75, 3: 5.25 },
  bidual: { 0: 4.75, 1: 5.75, 2: 5.75, 3: 5.75, 4: 6.25, 5: 5.75 },
  endCard: { 0: 4.25, 1: 4.75, 2: 5.25 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "monsters",
  "dualNorm",
  "holder",
  "duals",
  "kachi",
  "measures",
  "evaluation",
  "bidual",
  "endCard",
];

export const S2E24 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { kachi: "zh" },
  season: 2,
  captions: "large",
});
