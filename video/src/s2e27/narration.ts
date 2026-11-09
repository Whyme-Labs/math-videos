import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E27, from lessons/s2/e27-weak-convergence.md, on the new
// standard (about five minutes, one-line captions, the visuals explain): a
// bump that slides away while every sensor reads 0, a minimum that isn't
// attained, weak convergence and eₙ ⇀ 0, the three ways mass escapes,
// ℓ¹'s failure, weak* convergence and the diagonal argument, and the
// direct method. Each line is one caption and one cue; MIN_SECONDS gives
// the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "crisis"
  | "weak"
  | "escapes"
  | "elephant"
  | "lOne"
  | "alaoglu"
  | "direct"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "A bump of height 1 sits on an endless line.",
    "Let it slide right. One step, ten, a million.",
    "Its energy never changes. It's as big as ever.",
    "Now plant a sensor anywhere. The bump passes by…",
    "…the sensor twitches, then reads 0 forever.",
    "Plant a thousand sensors. Every one ends at 0.",
    "Every measurement says it's gone. It isn't. It escaped.",
    "Today: convergence that only asks the measurements.",
  ],
  title: ["Season two, episode twenty-seven. Weak convergence."],
  crisis: [
    "Episode 20: bounded sequences needn't converge here.",
    "Take F(x) = (‖x‖² − 1)² + Σ xₖ² / k².",
    "Along e₁, e₂, e₃, …, F drops: 1, ¼, ⅑, … → 0.",
    "But nothing reaches 0. The lowest point is missing.",
    "We need a weaker kind of convergence.",
  ],
  weak: [
    "xₙ converges weakly to x if f(xₙ) → f(x) for every f.",
    "Take eₙ in ℓ². Each f is a probe y in ℓ².",
    "f(eₙ) = yₙ, and yₙ → 0 because Σ yₖ² is finite.",
    "So eₙ ⇀ 0, though every ‖eₙ‖ is 1.",
    "The norm can drop in the limit: ‖x‖ ≤ lim inf ‖xₙ‖.",
    "Weak limits are unique. Weak sequences are bounded.",
  ],
  escapes: [
    "Mass can escape in three ways.",
    "Travelling: a block slides off to infinity.",
    "Concentrating: it squeezes into a single point.",
    "Oscillating: sin(nx) wiggles faster and faster.",
    "All three keep their energy, and all three ⇀ 0.",
    "But sin²(nx) ⇀ ½, not 0². Squares don't pass through.",
  ],
  elephant: [], // Chinese edition only
  lOne: [
    "In ℓ¹ it fails. The probe (1, 1, 1, …) is allowed.",
    "It reads every eₙ as 1. The readings never fade.",
    "ℓ¹ isn't reflexive, and weak limits buy nothing there.",
  ],
  alaoglu: [
    "Weak*: functionals converge when they agree at each x.",
    "δ at 1/n ⇀* δ at 0, though they stay 2 apart.",
    "Banach–Alaoglu: the dual's unit ball is weak* compact.",
    "Proof for separable X: list x₁, x₂, x₃, …",
    "Pick a subsequence that settles at x₁, then x₂, …",
    "The diagonal settles everywhere. Cantor's table again.",
  ],
  direct: [
    "In reflexive spaces, bounded means a weak limit exists.",
    "Mazur: a closed convex set keeps its weak limits.",
    "So a convex F can only drop at a weak limit.",
    "Direct method: slide downhill, take a weak limit, done.",
    "G(x) = ‖x‖² − 2Σ xₖ / k is convex. Its minimum: −π²/6.",
    "Our first F wasn't convex. Its limit landed too high.",
  ],
  endCard: [
    "Weak convergence trades the norm for compactness.",
    "Mass may escape, but minimisers come back.",
    "Next: Hilbert spaces. Geometry with angles again.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "一条无限长的直线上，有个高度为 1 的鼓包。",
    "让它往右滑。一步、十步、一百万步。",
    "它的能量从不改变，和原来一样大。",
    "现在随便在哪儿放个传感器。鼓包经过……",
    "……传感器跳一下，之后永远读 0。",
    "放一千个传感器，每一个最后都读 0。",
    "所有测量都说它没了。其实没有，它逃走了。",
    "今天：只问测量的收敛。",
  ],
  title: ["第二季，第二十七集。弱收敛。"],
  crisis: [
    "第 20 集：这里有界序列未必有收敛子列。",
    "取 F(x) = (‖x‖² − 1)² + Σ xₖ² / k²。",
    "沿着 e₁、e₂……F 掉成 1、¼、⅑……→ 0。",
    "可没有哪一点达到 0。最低点不见了。",
    "我们需要一种更弱的收敛。",
  ],
  weak: [
    "每个 f 都有 f(xₙ) → f(x)，就叫 xₙ 弱收敛到 x。",
    "看 ℓ² 里的 eₙ。每个 f 是 ℓ² 里的一个探针 y。",
    "f(eₙ) = yₙ，而 Σ yₖ² 有限，所以 yₙ → 0。",
    "于是 eₙ ⇀ 0，虽然每个 ‖eₙ‖ 都是 1。",
    "范数在极限处可以变小：‖x‖ ≤ lim inf ‖xₙ‖。",
    "弱极限唯一，弱收敛序列有界。",
  ],
  escapes: [
    "质量可以从三条路逃走。",
    "平移：一块东西滑向无穷远。",
    "集中：它挤进一个点。",
    "振荡：sin(nx) 越摆越快。",
    "三种都保住了能量，三种都 ⇀ 0。",
    "可 sin²(nx) ⇀ ½，不是 0²。平方过不去。",
  ],
  // 只在中文版出现：盲人摸象（《大般涅槃经》）
  elephant: [
    "《大般涅槃经》里，几个盲人去摸一头象。",
    "“其触牙者，即言象形如芦菔根……”",
    "每人只知道自己那根探针读到的东西。",
    "弱收敛也是这样：只凭所有探针的读数来判断。",
  ],
  lOne: [
    "在 ℓ¹ 里不行。探针 (1, 1, 1, …) 是允许的。",
    "它把每个 eₙ 都读成 1，读数永远不消失。",
    "ℓ¹ 不自反，弱极限在那里什么也换不来。",
  ],
  alaoglu: [
    "弱*：泛函在每个 x 上都对得上，就算收敛。",
    "1/n 处的 δ ⇀* 0 处的 δ，虽然它们一直相距 2。",
    "巴拿赫–阿劳格鲁：对偶的单位球是弱*紧的。",
    "可分的 X 来证：把 x₁、x₂、x₃……排成一列。",
    "先挑子列在 x₁ 上稳定，再在 x₂ 上……",
    "对角线在每一处都稳定。又是康托尔的表格。",
  ],
  direct: [
    "在自反空间里，有界就一定有弱极限。",
    "马祖尔：闭凸集留得住它的弱极限。",
    "所以凸的 F 在弱极限处只会变小。",
    "直接方法：一路下坡，取弱极限，完事。",
    "G(x) = ‖x‖² − 2Σ xₖ / k 凸，最小值 −π²/6。",
    "最开始的 F 不凸，它的极限落得太高。",
  ],
  endCard: [
    "弱收敛拿范数换来了紧性。",
    "质量会逃走，最小点却回来了。",
    "下一集：希尔伯特空间。角度又回来了。",
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
  coldOpen: { 0: 6, 1: 6, 2: 5.5, 3: 6, 4: 6, 5: 6, 6: 6, 7: 5.5 },
  crisis: { 0: 5.5, 1: 6, 2: 6.5, 3: 6, 4: 5.5 },
  weak: { 0: 6, 1: 6, 2: 6.5, 3: 6, 4: 6, 5: 5.5 },
  escapes: { 0: 5, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6.5 },
  elephant: { 0: 6, 1: 6.5, 2: 6, 3: 6 },
  lOne: { 0: 6, 1: 6, 2: 6 },
  alaoglu: { 0: 6, 1: 6.5, 2: 6, 3: 5.5, 4: 6.5, 5: 6.5 },
  direct: { 0: 6, 1: 6.5, 2: 6, 3: 6.5, 4: 6.5, 5: 6 },
  endCard: { 0: 5, 1: 5.5, 2: 6 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "crisis",
  "weak",
  "escapes",
  "elephant",
  "lOne",
  "alaoglu",
  "direct",
  "endCard",
];

export const S2E27 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { elephant: "zh" },
  season: 2,
  captions: "large",
});
