import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E18, condensed from lessons/s1/e18-rings.md. Each line is
// one caption and one cue; scenes key their animation off the cue frames, so
// editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "rules"
  | "clock"
  | "glue"
  | "qin"
  | "breaks"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Paris, March 1847. Gabriel Lamé tells the Academy of Sciences he has proved Fermat's Last Theorem.",
    "His trick: let some new numbers into arithmetic, factor both sides of the equation, and compare the primes.",
    "Joseph Liouville stands up. Your proof assumes these new numbers split into primes in only one way. Do they?",
    "That May, a letter from Ernst Kummer is read out: they don't. He had shown it three years before.",
    "To see what broke, we need the rules for every world where you can add and multiply.",
  ],
  title: ["Season one, episode eighteen. Rings."],
  rules: [
    "A ring is a world where you can add, subtract and multiply, and multiplying spreads over adding: a times b plus c is ab plus ac.",
    "That one rule forces minus one times minus one to be one. It isn't a convention: once multiplying spreads over adding, there's no other choice.",
  ],
  clock: [
    "On a six-hour clock, 2 times 3 is 0. Two things that aren't nothing multiply to nothing.",
    "On a seven-hour clock, that never happens. Seven is prime, so every number but 0 has a partner that multiplies it to 1.",
  ],
  glue: [
    "Now take polynomials and add one rule: x squared plus 1 is 0. Every time x squared appears, swap it for minus 1.",
    "What's left is a plus b x, and it multiplies exactly like the complex numbers from episode ten. x has become i.",
  ],
  qin: [], // Chinese edition only
  breaks: [
    "Lamé's trouble, in a smaller world: allow root minus five. Then 6 is 2 times 3, and also 1 plus root minus five, times 1 minus root minus five.",
    "None of those four can be split any further. One number, two different factorizations into primes.",
    "Kummer and Dedekind's repair: factor the sets of multiples, called ideals, instead of the numbers. Then factorization is unique again.",
  ],
  endCard: [
    "Clocks, polynomials, numbers with root minus five: all rings. Pick an ideal, glue, and a new world appears.",
    "Next episode: the worlds where you can divide by everything, and why no ruler and compass can split every angle in three.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1847 年 3 月，巴黎。拉梅在法国科学院宣布：他证明了费马大定理。",
    "他的办法是：往算术里加进一些新的数，把方程两边都分解，再比较质因数。",
    "刘维尔站起来：你的证明默认这些新数只有一种分解成质数的方法。真是这样吗？",
    "那年五月，科学院宣读了库默尔的来信：不是。他三年前就证明过了。",
    "要看清哪里出了问题，得先弄清楚所有能加能乘的世界遵守什么规则。",
  ],
  title: ["第一季，第十八集。环。"],
  rules: [
    "环，就是能加、能减、能乘的世界，而且乘法对加法分配：a 乘以 b 加 c，等于 ab 加 ac。",
    "单这一条，就逼得负一乘负一等于一。这不是约定：只要乘法对加法分配，就别无选择。",
  ],
  clock: [
    "在六小时钟面上，2 乘 3 等于 0。两个都不是零的东西，乘出来却是零。",
    "七小时钟面上永远不会这样。七是质数，除了 0，每个数都有一个伙伴，乘起来正好是 1。",
  ],
  glue: [
    "再拿多项式，只加一条规则：x 平方加 1 等于 0。每次出现 x 平方，就换成负一。",
    "剩下的都是 a 加 b x，乘起来和第十集的复数一模一样。x 变成了 i。",
  ],
  // 只在中文版出现：秦九韶《数书九章》（1247）大衍求一术
  qin: [
    "南宋秦九韶的《数书九章》（1247 年）里，有一门“大衍求一术”。",
    "它求的是：乘上去，余数正好是一的那个数。比如在七小时钟面上，5 乘 3 等于 15，余一。",
    "这正是钟面上的“除法”：七是质数，所以每个非零的数，都找得到这样的伙伴。",
  ],
  breaks: [
    "拉梅的麻烦，放进一个小世界看：允许根号负五。于是 6 等于 2 乘 3，也等于 1 加根号负五，乘以 1 减根号负五。",
    "这四个数，哪个都拆不下去了。同一个数，两种不同的质因数分解。",
    "库默尔和戴德金的补救：不分解数，改分解“倍数的集合”，叫理想。这样一来，分解又唯一了。",
  ],
  endCard: [
    "钟面、多项式、带根号负五的数，都是环。挑一个理想，一粘，就有一个新世界。",
    "下一集：什么样的世界里，每个数都能当除数？以及，为什么尺规不能把每个角三等分。",
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
  "rules",
  "clock",
  "qin",
  "glue",
  "breaks",
  "endCard",
];

export const S1E18 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { qin: "zh" },
});
