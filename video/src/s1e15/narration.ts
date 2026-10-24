import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E15, condensed from lessons/s1/e15-limits-of-the-axioms.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "numbering"
  | "godel"
  | "yangsheng"
  | "continuum"
  | "choice"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Königsberg, September 1930. At a round table on the foundations of mathematics, a quiet 24-year-old named Kurt Gödel speaks up.",
    "Almost in passing, he says that arithmetic has true statements its axioms can never prove.",
    "Hardly anyone reacts. Only John von Neumann seeks him out afterwards.",
    "The next day, in the same city, David Hilbert ends a famous speech: we must know, we will know.",
    "But Gödel had just shown that for some questions, the rules alone never will.",
  ],
  title: ["Season one, episode fifteen. The limits of the axioms."],
  numbering: [
    "Gödel's first trick: turn every formula into a number. Give each symbol a code and stack them on primes: 0 = 0 becomes 2 × 27 × 5, which is 270.",
    "A proof is a list of formulas, so it's a number too. Now arithmetic can talk about its own proofs.",
  ],
  godel: [
    "His second trick is the diagonal from episode twelve. It builds a sentence that says: I am not provable.",
    "If the axioms proved it, they'd prove something false. So they can't, and that is exactly what it says. It's true.",
    "Add it as a new axiom, and the same trick builds a new one. No consistent rulebook for arithmetic catches every truth.",
    "And no such rulebook can prove that it never contradicts itself.",
  ],
  yangsheng: [], // Chinese edition only
  continuum: [
    "Back to episode twelve: between the whole numbers and the real line, is there a size in between? Cantor guessed no.",
    "In 1940 Gödel showed the standard axioms can't disprove that guess. In 1963 Paul Cohen showed they can't prove it either.",
    "The question is perfectly precise, and the axioms simply don't say.",
  ],
  choice: [
    "One more, the axiom of choice. Infinitely many pairs of shoes? Take every left shoe. Pairs of socks? There's no rule, so you need the axiom.",
    "Accept it, and a ball can be cut into five pieces and put back together as two balls the same size as the first.",
  ],
  endCard: [
    "So axioms aren't the last word on what's true. They're choices about which world we study.",
    "Next episode: a square of paper, a clock and a Rubik's cube, all following the same few rules.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1930 年 9 月，柯尼斯堡。一场讨论数学基础的圆桌会上，一个 24 岁、话不多的年轻人开了口，他叫哥德尔。",
    "他几乎是顺口一提：算术里有些真命题，它的公理永远证明不了。",
    "几乎没人在意。只有冯·诺依曼会后专门去找他。",
    "第二天，同一座城市，希尔伯特发表著名演讲，结尾是：我们必须知道，我们必将知道。",
    "可哥德尔刚刚证明：有些问题，光靠规则，永远不会知道。",
  ],
  title: ["第一季，第十五集。公理的尽头。"],
  numbering: [
    "哥德尔的第一招：把每个公式变成一个数。每个符号给个编号，再放到质数上：0 = 0 变成 2 × 27 × 5，也就是 270。",
    "证明是一串公式，所以也是一个数。这样，算术就能谈论它自己的证明了。",
  ],
  godel: [
    "第二招是第十二集的对角线。它造出一句话，内容是：我不能被证明。",
    "公理要是证明了它，就证明了一句假话。所以证明不了，而这正是它说的。它是真的。",
    "把它加成新公理，同一招又造出新的一句。没有哪本不自相矛盾的算术规则手册，能抓住所有真话。",
    "而且这样的手册，也证明不了自己永远不会自相矛盾。",
  ],
  // 只在中文版出现：《庄子·养生主》“吾生也有涯，而知也无涯。”
  yangsheng: [
    "《庄子·养生主》：“吾生也有涯，而知也无涯。以有涯随无涯，殆已。”",
    "公理是有限的一本手册，真话却没有尽头。用有限去追无限，总有追不上的地方。",
  ],
  continuum: [
    "回到第十二集：自然数和整条实数线之间，有没有中间大小的无穷？康托尔猜没有。",
    "1940 年，哥德尔证明标准公理推翻不了这个猜想；1963 年，科恩证明它们也证明不了。",
    "这个问题再清楚不过，可公理就是不表态。",
  ],
  choice: [
    "还有选择公理。无穷多双鞋？每双拿左脚就行。无穷多双袜子？没有规则可循，只能靠这条公理。",
    "接受它，就能把一个球切成五块，再拼成两个和原来一样大的球。",
  ],
  endCard: [
    "所以公理不是“什么为真”的最终答案。它们是选择：我们要研究哪个世界。",
    "下一集：一张方纸、一个钟面、一个魔方，遵守的竟是同一套规则。",
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
  "numbering",
  "godel",
  "yangsheng",
  "continuum",
  "choice",
  "endCard",
];

export const S1E15 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { yangsheng: "zh" },
});
