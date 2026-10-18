import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E09, condensed from lessons/s1/e09-point-nine-repeating.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "staircase"
  | "ceiling"
  | "noRoom"
  | "archimedes"
  | "zhuangzi"
  | "twins"
  | "trick"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: [
    "Season one, episode nine. 0.999 repeating equals one, and what decimals really are.",
  ],
  coldOpen: [
    "0.999 repeating equals one. It may be the most argued-about equation on the internet.",
    "One side says it gets closer and closer but never arrives. The other side has tricks: three thirds, or ten x minus x.",
    "The skeptics are asking the right question. Nobody can write infinitely many nines, so what does 0.999 repeating even name?",
  ],
  staircase: [
    "Start with what we can write: 0.9, 0.99, 0.999. Each one is short of one by exactly one unit in its last place.",
    "Zoom in ten times and the picture looks the same. Every one of these truncations is below one.",
    "But 0.999 repeating is none of them. It's supposed to be a single number, not a process.",
  ],
  ceiling: [
    "Here's the definition. A decimal names the least upper bound of its truncations, which exists because the reals are complete.",
    "So lower a ceiling onto the staircase and stop at the lowest spot that's still above every step. It stops at one.",
  ],
  noRoom: [
    "Could the ceiling stop a little lower, at some c below one? Then every step would have to stay under c.",
    "Pick c close to one. The steps march past it. Pick c even closer, and they march past again.",
    "If 0.999 repeating were less than one, the gap would be smaller than every ten to the minus n. That's an infinitesimal.",
  ],
  archimedes: [
    "And the reals have none. If the whole numbers had a least upper bound b, some n would sit above b minus one.",
    "Then n plus one is above b. So no ceiling stops the whole numbers, and no positive real is smaller than every one over n.",
  ],
  zhuangzi: [], // Chinese edition only
  twins: [
    "So 0.999 repeating and one are two names for the same point. They aren't the only pair: 0.2 and 0.1999 repeating are twins too.",
    "Every decimal that stops has a twin ending in nines. Every other number, like one third, has exactly one name.",
  ],
  trick: [
    "And the ten x minus x trick? It works here because 0.999 repeating is a real number to begin with.",
    "Try it on one plus two plus four plus eight, and it says the sum is minus one. Those partial sums grow without bound.",
    "A trick is a shortcut once you know the decimal names a real number. It can't prove that it does.",
  ],
  endCard: [
    "A decimal is a name. The number is the least upper bound, and between 0.999 repeating and one there's no room.",
    "Next episode: the square root of minus one, seen as a quarter turn. Complex numbers as rotations.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第九集。0.999… = 1：小数到底是什么。"],
  coldOpen: [
    "0.999… = 1。这可能是网上吵得最凶的一个等式。",
    "一方说：它越来越近，可永远到不了。另一方有招：三个三分之一，或者 10x 减 x。",
    "怀疑的人问对了问题。谁也写不出无穷多个 9，那 0.999… 到底指的是什么？",
  ],
  staircase: [
    "先看写得出来的：0.9、0.99、0.999。每一个都比一少了末位上的一个单位。",
    "放大十倍，画面一模一样。这些截断，每一个都小于一。",
    "可 0.999… 不是其中任何一个。它应该是一个确定的数，而不是一个过程。",
  ],
  ceiling: [
    "定义是这样的：小数指的是它所有截断的最小上界。实数是完备的，所以这个上界一定存在。",
    "把一块天花板压到台阶上，停在仍然高过每一级的最低处。它停在一。",
  ],
  noRoom: [
    "天花板能不能停得再低一点，停在某个小于一的 c？那每一级台阶都得在 c 下面。",
    "把 c 取得离一很近，台阶照样走过去。再近一点，台阶还是走过去。",
    "要是 0.999… 小于一，差距就得比每个 10⁻ⁿ 都小。那是一个无穷小。",
  ],
  archimedes: [
    "实数里没有无穷小。假如自然数有最小上界 b，总有某个 n 大于 b − 1。",
    "那么 n + 1 就超过了 b。所以没有天花板挡得住自然数，也没有正实数比每个 1/n 都小。",
  ],
  // 只在中文版出现：《庄子·天下》“一尺之棰，日取其半，万世不竭”。
  zhuangzi: [
    "《庄子·天下》里有一句：“一尺之棰，日取其半，万世不竭。”",
    "剩下的永远不为零：二分之一、四分之一、八分之一……这说的是每一级台阶。",
    "可取走的部分加起来，最小上界正好是一尺：二进制里的 0.111… 等于 1。万世不竭，和等于一，并不矛盾。",
  ],
  twins: [
    "所以 0.999… 和 1 是同一个点的两个名字。这样的一对不止一个：0.2 和 0.1999… 也是双胞胎。",
    "每个有限小数都有一个以 9 结尾的双胞胎。其余的数，比如三分之一，只有一个名字。",
  ],
  trick: [
    "那 10x 减 x 的招呢？在这里管用，是因为 0.999… 本来就是一个实数。",
    "拿它去算 1 + 2 + 4 + 8 + …，会得出和是负一。可这些部分和会无限变大。",
    "招数只是捷径，前提是你已经知道这个小数是个实数。它证明不了这一点。",
  ],
  endCard: [
    "小数只是名字。数是那个最小上界，而 0.999… 和 1 之间，没有任何空隙。",
    "下一集：负一的平方根，看成转四分之一圈。复数就是旋转。",
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
  "title",
  "coldOpen",
  "staircase",
  "ceiling",
  "noRoom",
  "archimedes",
  "zhuangzi",
  "twins",
  "trick",
  "endCard",
];

export const S1E09 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zhuangzi: "zh" },
});
