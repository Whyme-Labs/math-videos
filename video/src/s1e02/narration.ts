import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E02, condensed from lessons/s1/e02-peano-zero-and-next.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "broken"
  | "peano"
  | "dominoes"
  | "proof"
  | "dedekind"
  | "buildDescribe"
  | "finePrint"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode two. Zero and next."],
  coldOpen: [
    "Imagine teaching a machine to count. It knows no digits, no apples, no number line.",
    "What's the least you could tell it so it counts forever and never gets stuck?",
    "Rule one: there's a starting point. Call it zero.",
    "Rule two: every number has a next one.",
    "Is that enough?",
  ],
  broken: [
    "It isn't. These two rules still allow some strange worlds.",
    "A loop: after two, next brings you back to zero, like a clock.",
    "A merge: after three, next goes back to two, and counting gets stuck.",
    "Ghosts: a second chain sits beside ours, and counting up from zero never reaches it.",
  ],
  peano: [
    "In 1889, Giuseppe Peano wrote down five rules that rule out all of them.",
    "The first two we already have: zero is a number, and every number has a next.",
    "Rule three: zero is not the next of anything. The loop breaks.",
    "Rule four: different numbers have different nexts. The merge comes apart.",
    "Rule five, induction, removes the ghosts. To see how, line up some dominoes.",
  ],
  dominoes: [
    "Stand the numbers up as dominoes, with zero first.",
    "Push zero over. Each falling domino knocks over the next one.",
    "So every domino falls. That is induction.",
    "The ghosts stand on a second table, and nothing ever pushes them.",
    "Rule five says there is no second table. Every number is reached from zero by taking next.",
  ],
  proof: [
    "Here's a first proof. Claim: every number except zero is the next of some number.",
    "Let A hold zero, plus every number that is a next.",
    "Zero is in A. The next of any number is a next, so it's in A too.",
    "By induction, A holds every number. Done.",
    "Among the ghosts the claim fails: zero-prime isn't zero, and nothing comes before it.",
  ],
  dedekind: [
    "Do these rules catch every broken world? Yes. Dedekind proved it in 1888, a year before Peano's list.",
    "Take two worlds that obey all five rules. One counts with dots, the other with tally marks.",
    "Match zero with zero, then each next with the next.",
    "The rules make it a perfect match, with nothing left over and nothing matched twice.",
    "So up to renaming there is only one such world. We call it the natural numbers.",
  ],
  buildDescribe: [
    "Notice what we never said: what zero is made of.",
    "Peano only described how numbers behave, and that was enough to pin them down.",
    "Episode four builds them out of sets, and Dedekind's theorem says we'll get the same numbers.",
  ],
  finePrint: [
    "One catch. Rule five talks about every set of numbers.",
    "Many logicians only allow sets you can describe with a formula.",
    "There are far fewer formulas than sets, so some sets never get checked.",
    "Then strange models sneak back in: the usual numbers, followed by chains with no first and no last element.",
    "Episode thirteen comes back to them.",
  ],
  endCard: [
    "So far we have zero, next, and nothing else.",
    "Next episode: where do plus and times come from? From next alone.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第二集。零，和“下一个”。"],
  coldOpen: [
    "假设你要教一台机器数数。它不认识数字，没见过苹果，也没有数轴。",
    "最少要告诉它什么，它才能一直数下去，永远不卡住？",
    "规则一：有一个起点，叫它零。",
    "规则二：每个数都有下一个。",
    "这样够了吗？",
  ],
  broken: [
    "不够。光有这两条，还会冒出一些奇怪的世界。",
    "循环：二的下一个又回到零，像钟表一样。",
    "合流：三的下一个又回到二，从此原地打转。",
    "幽灵：旁边还有第二条链，从零往上数，永远到不了那里。",
  ],
  peano: [
    "1889 年，皮亚诺写下五条规则，把这些世界全部排除。",
    "前两条我们已经有了：零是一个数，每个数都有下一个。",
    "规则三：零不是任何数的下一个。循环断了。",
    "规则四：不同的数，下一个也不同。合流被拆开了。",
    "规则五叫归纳，它负责赶走幽灵。要看清这一点，先摆一排多米诺骨牌。",
  ],
  dominoes: [
    "把数排成一列多米诺骨牌，零在最前面。",
    "推倒零。每块倒下的骨牌，都会碰倒下一块。",
    "于是所有骨牌都会倒下。这就是归纳。",
    "幽灵骨牌摆在另一张桌子上，从来没有东西去推它们。",
    "规则五说：没有第二张桌子。每个数，都是从零开始一次次取“下一个”得到的。",
  ],
  proof: [
    "来做第一个证明。命题：除了零，每个数都是某个数的下一个。",
    "让集合 A 包含零，以及所有“是某个数的下一个”的数。",
    "零在 A 里。任何数的下一个，当然是“下一个”，所以也在 A 里。",
    "由归纳，A 包含了所有的数。证毕。",
    "在幽灵世界里，命题不成立：零撇不是零，前面也没有任何数。",
  ],
  dedekind: [
    "这些规则把坏世界都排除干净了吗？是的。戴德金在 1888 年就证明了，比皮亚诺还早一年。",
    "任取两个满足全部五条规则的世界。一个用圆点数数，一个用划记。",
    "零对零，然后下一个对下一个。",
    "这五条规则保证配对完美：没有剩下的，也没有配了两次的。",
    "所以，除了换个名字，这样的世界只有一个。我们叫它自然数。",
  ],
  buildDescribe: [
    "注意，我们从没说过零是用什么做的。",
    "皮亚诺只描述了数怎么表现，这就足以把它们确定下来。",
    "第 4 集会用集合把它们造出来。戴德金定理保证，造出来的还是同一套数。",
  ],
  finePrint: [
    "还有一个细节。规则五说的是“所有”数的集合。",
    "很多逻辑学家只承认能用公式写出来的集合。",
    "公式比集合少得多，于是有些集合从来没被检查过。",
    "奇怪的模型就会溜回来：普通的数后面，还跟着一些既没有头、也没有尾的链。",
    "第 13 集我们再回来看它们。",
  ],
  endCard: [
    "到现在，我们只有零和“下一个”，别的什么都没有。",
    "下一集：加法和乘法从哪里来？只从“下一个”出发。",
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
  coldOpen: { 0: 3.4, 2: 2.0, 3: 3.4, 4: 1.8 },
  broken: { 0: 2.0, 1: 3.4, 2: 3.6, 3: 3.6 },
  peano: { 0: 2.6, 1: 2.6, 2: 3.4, 3: 3.4, 4: 3.0 },
  dominoes: { 0: 2.6, 1: 4.4, 2: 2.4, 3: 3.0, 4: 3.4 },
  proof: { 1: 2.4, 2: 4.6, 3: 2.2, 4: 3.4 },
  dedekind: { 1: 3.0, 2: 4.0, 3: 2.6, 4: 3.4 },
  buildDescribe: { 0: 2.6, 1: 3.2, 2: 3.4 },
  finePrint: { 0: 2.6, 1: 3.4, 2: 2.6, 3: 4.4, 4: 1.8 },
  endCard: { 0: 2.6, 1: 6.0 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "title",
  "coldOpen",
  "broken",
  "peano",
  "dominoes",
  "proof",
  "dedekind",
  "buildDescribe",
  "finePrint",
  "endCard",
];

export const S1E02 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
});
