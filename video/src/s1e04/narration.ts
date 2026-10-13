import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E04, condensed from lessons/s1/e04-sets-the-building-material.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "russell"
  | "mohist"
  | "zf"
  | "vonNeumann"
  | "zermelo"
  | "benacerraf"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode four. Sets, the building material."],
  coldOpen: [
    "We described numbers by how they behave. But what is the number two, actually?",
    "Let's build numbers from the simplest thing there is: an empty box. Call it zero.",
    "Put that empty box inside a new box. It holds one thing. Call it one.",
    "A box holding both of those holds two things. Call it two.",
    "Boxes inside boxes, built from nothing. But first we need rules for which boxes are allowed.",
  ],
  russell: [
    "The first idea, from Cantor's time: any property you can describe makes a set.",
    "The set of even numbers. The set of all sets, which would even contain itself.",
    "Now take the property of not containing yourself, and collect every such set into R.",
    "Is R inside R? If it is, then it isn't. If it isn't, then it is.",
    "Russell found this around 1901. In 1902 he wrote to Frege, whose book on arithmetic rested on exactly this idea.",
  ],
  mohist: [], // Chinese edition only
  zf: [
    "The fix: you may not collect everything with a property.",
    "You may only carve a smaller set out of a set you already have, or build with a few fixed tools.",
    "These rules are called ZF, after Zermelo and Fraenkel.",
    "Carve Russell's set out of any box, and it lands outside that box. The paradox becomes a theorem: there is no set of all sets.",
  ],
  vonNeumann: [
    "Now build. Zero is the empty set.",
    "The next of a set x is x together with x itself: x union the set of x.",
    "So one holds zero. Two holds zero and one. Three holds zero, one and two.",
    "Each number is the set of all the numbers before it, so three has exactly three elements.",
    "Collect them all and Peano's five rules hold. That's the natural numbers, built from nothing.",
  ],
  zermelo: [
    "In 1908, Zermelo used a different next: just put x in one more box.",
    "Zero, the box of zero, the box of that, and so on.",
    "Both versions satisfy Peano's rules. So: is one an element of three?",
    "Von Neumann's three says yes. Zermelo's three says no.",
  ],
  benacerraf: [
    "So which one is the real three? In 1965 the philosopher Paul Benacerraf asked exactly this.",
    "Dedekind's theorem matches the two chains step by step, so all their arithmetic agrees.",
    "What matters about three is where it sits: after two, before four. A number is what it does.",
  ],
  endCard: [
    "We built the numbers out of nothing, and found more than one way to do it.",
    "Next episode: one half and two quarters look different. When are two things the same?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第四集。集合：万物的积木。"],
  coldOpen: [
    "我们描述了数怎么表现。可数字二本身，到底是什么？",
    "从最简单的东西开始造：一个空盒子，叫它零。老子说“有生于无”，我们真的从无开始。",
    "把空盒子放进一个新盒子。里面有一样东西，叫它一。",
    "再拿一个盒子，把前面两个都装进去。里面有两样东西，叫它二。",
    "盒子套盒子，从无到有。但先得定好规矩：什么样的盒子才允许存在。",
  ],
  russell: [
    "康托尔那个时代的想法是：只要能说出一个性质，就有一个集合。",
    "偶数的集合，还有“所有集合的集合”，它甚至得装下自己。",
    "现在取“不包含自己”这个性质，把所有这样的集合收进 R。",
    "R 在不在 R 里面？如果在，它就不该在；如果不在，它就该在。",
    "罗素在 1901 年前后发现了它。1902 年他写信给弗雷格，而弗雷格的算术大厦，正建在这个想法上。",
  ],
  // 只在中文版出现：《墨经》里的自我指涉。
  mohist: [
    "两千多年前，墨家也碰到过这种自己绕住自己的话。",
    "《墨经》说：“以言为尽悖，悖。说在其言。”断言所有的话都是假的，这句话本身就站不住。",
  ],
  zf: [
    "解决办法是：不许把“所有满足某性质的东西”一股脑儿收成集合。",
    "只能从已有的集合里切出一部分，或者用几样固定的工具来造。",
    "这套规矩叫 ZF，取自策梅洛和弗兰克尔的名字。",
    "从任何一个盒子里切出罗素集合，它都会落在盒子外面。悖论变成了定理：不存在“所有集合的集合”。",
  ],
  vonNeumann: [
    "现在开始造。零就是空集。",
    "集合 x 的下一个，是 x 再加上 x 本身：x 并上 {x}。",
    "所以一装着零；二装着零和一；三装着零、一、二。",
    "每个数，都是它前面所有数的集合，所以三恰好有三个元素。",
    "把它们全收齐，皮亚诺的五条规则都成立。这就是自然数，从无中造出来。",
  ],
  zermelo: [
    "1908 年，策梅洛用了另一种“下一个”：只是把 x 再装进一个盒子。",
    "零、装着零的盒子、再装着它的盒子，一层层下去。",
    "两种造法都满足皮亚诺的规则。那么，一是不是三的元素？",
    "冯·诺伊曼的三说：是。策梅洛的三说：不是。",
  ],
  benacerraf: [
    "那哪一个才是真正的三？1965 年，哲学家贝纳塞拉夫正是这样问的。",
    "戴德金定理把两条链一一对上，所以它们的算术完全一样。",
    "三重要的是它站在哪里：在二之后，在四之前。数，就是它所做的事。",
  ],
  endCard: [
    "我们从无中造出了数，而且造法不止一种。",
    "下一集：二分之一和四分之二，写法不同。两样东西，什么时候算“一样”？",
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
  coldOpen: { 0: 2.4, 1: 2.4, 2: 2.6, 3: 2.6, 4: 2.8 },
  russell: { 0: 3.2, 1: 3.2, 2: 2.8, 3: 4.2, 4: 3.0 },
  mohist: { 0: 2.6, 1: 4.0 },
  zf: { 0: 2.4, 1: 3.4, 2: 2.4, 3: 4.4 },
  vonNeumann: { 0: 2.0, 1: 3.6, 2: 3.6, 3: 2.6, 4: 3.6 },
  zermelo: { 0: 2.6, 1: 2.8, 2: 2.4, 3: 3.2 },
  benacerraf: { 0: 2.6, 1: 3.6, 2: 3.0 },
  endCard: { 0: 2.4, 1: 6.0 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "title",
  "coldOpen",
  "russell",
  "mohist",
  "zf",
  "vonNeumann",
  "zermelo",
  "benacerraf",
  "endCard",
];

export const S1E04 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { mohist: "zh" },
});
