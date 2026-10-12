import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E03, condensed from lessons/s1/e03-arithmetic-from-scratch.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "jiujiu"
  | "coldOpen"
  | "addition"
  | "lopsided"
  | "commute"
  | "cancel"
  | "times"
  | "order"
  | "payoff"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode three. Arithmetic from scratch."],
  jiujiu: [], // Chinese edition only
  coldOpen: [
    "Last time we pinned down counting with zero and next. Nothing else.",
    "So here's a puzzle: can you prove that two plus two is four, using only next?",
    "And why is three plus five the same as five plus three?",
  ],
  addition: [
    "Here's the trick: define plus by what it does to the second number.",
    "Rule one: a plus zero is a. Adding zero changes nothing.",
    "Rule two: a plus the next of b is the next of a plus b.",
    "Watch two plus two. Each step peels a next off the right and wraps it around the outside.",
    "When the right side reaches zero, rule one finishes the job. Four.",
  ],
  lopsided: [
    "But these rules only ever look at the second number.",
    "Three plus zero: rule one, done in a single step.",
    "Zero plus three: three rounds of peeling before it's done.",
    "Same answer, different work. So why should the order never matter?",
  ],
  commute: [
    "That order doesn't matter is a theorem, and proving it takes three inductions.",
    "First: zero plus a is a.",
    "Second: the next of a, plus b, is the next of a plus b.",
    "Then the theorem itself. Its induction only goes through because the first two are down.",
    "Three plus five equals five plus three, for every pair of numbers, proved from next.",
  ],
  cancel: [
    "Rule four earns its keep here: if a plus c equals b plus c, then a equals b.",
    "In last episode's merge world it fails. One plus one and one plus three both land on two.",
  ],
  times: [
    "Times works the same way: a times zero is zero, and a times the next of b is a times b, plus a.",
    "So two times three is three rows of two.",
    "Three times two is two rows of three. Turn the rectangle and they match.",
    "The picture is a hint. The proof is more induction.",
  ],
  order: [
    "Even less-than comes for free: a is at most b when some c takes you from a to b.",
    "Two to five: a jump of three.",
    "Five to two: no jump works, because adding only moves you forward.",
  ],
  payoff: [
    "Every rule of school arithmetic is now a theorem, from five rules and two definitions.",
    "But three plus x equals zero has no answer in these numbers.",
    "Fixing that means building the integers, in episode six.",
  ],
  endCard: [
    "We built arithmetic out of next.",
    "Next episode: what is next made of? We build the numbers out of sets.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第三集。从零开始的算术。"],
  // 只在中文版出现：九九表。
  jiujiu: [
    "九九乘法表，中国人背了两千多年。湖南里耶出土的秦代简牍上，就写着“九九八十一”。",
    "可这些口诀，能不能只从“下一个”出发，一条一条推出来？",
  ],
  coldOpen: [
    "上一集，我们只用零和“下一个”，就把数数说清楚了。别的什么都没有。",
    "那么问题来了：只用“下一个”，你能证明二加二等于四吗？",
    "还有，三加五为什么等于五加三？",
  ],
  addition: [
    "诀窍是：加法的定义，只看第二个数。",
    "规则一：a 加零等于 a。加零，什么都不变。",
    "规则二：a 加上 b 的下一个，等于 a 加 b 的下一个。",
    "看二加二：每一步，从右边剥下一层“下一个”，套到结果外面。",
    "右边剥到零，规则一收尾。得四。",
  ],
  lopsided: [
    "可是这两条规则，只盯着第二个数。",
    "三加零：规则一，一步就完。",
    "零加三：要剥三轮才算完。",
    "答案一样，功夫不同。凭什么顺序永远不重要？",
  ],
  commute: [
    "“顺序不重要”是一条定理，证明它要做三次归纳。",
    "第一条：零加 a 等于 a。",
    "第二条：a 的下一个加 b，等于 a 加 b 的下一个。",
    "然后才是定理本身。前两条先倒下，它的归纳才推得动。",
    "三加五等于五加三，对任何两个数都成立，全从“下一个”推出来。",
  ],
  cancel: [
    "规则四在这里派上用场：如果 a 加 c 等于 b 加 c，那么 a 等于 b。",
    "在上一集的合流世界里，这条不成立：一加一和一加三，都落在二上。",
  ],
  times: [
    "乘法也一样定义：a 乘零等于零，a 乘 b 的下一个，等于 a 乘 b 再加 a。",
    "所以二乘三，是三行，每行两个。",
    "三乘二，是两行，每行三个。把长方形转过来，它们一模一样。",
    "图只是提示，证明还得靠归纳。",
  ],
  order: [
    "连“小于等于”都是白送的：如果有个 c 能从 a 走到 b，就说 a 不大于 b。",
    "从二到五：跳三步。",
    "从五到二：怎么跳都不行，因为加法只会往前走。",
  ],
  payoff: [
    "课本里的整数运算规律，现在全是定理：只用五条规则、两个定义。",
    "可是，三加 x 等于零，在这些数里没有答案。",
    "要解决它，就得造出整数。那是第六集。",
  ],
  endCard: [
    "我们用“下一个”搭起了整套算术。",
    "下一集：“下一个”本身，又是用什么做的？我们用集合把数造出来。",
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
  jiujiu: { 0: 4.0, 1: 3.0 },
  coldOpen: { 0: 2.6, 1: 3.0, 2: 3.4 },
  addition: { 0: 2.4, 1: 2.4, 2: 2.6, 3: 4.4, 4: 2.8 },
  lopsided: { 0: 2.0, 1: 2.2, 2: 3.6, 3: 2.4 },
  commute: { 0: 2.6, 1: 2.6, 2: 2.8, 3: 3.4, 4: 2.8 },
  cancel: { 0: 3.0, 1: 4.2 },
  times: { 0: 3.0, 1: 2.6, 2: 3.4, 3: 2.2 },
  order: { 0: 2.6, 1: 2.4, 2: 3.0 },
  payoff: { 0: 3.4, 1: 2.6, 2: 2.8 },
  endCard: { 0: 2.4, 1: 6.0 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "title",
  "jiujiu",
  "coldOpen",
  "addition",
  "lopsided",
  "commute",
  "cancel",
  "times",
  "order",
  "payoff",
  "endCard",
];

export const S1E03 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { jiujiu: "zh" },
});
