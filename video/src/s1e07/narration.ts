import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E07, condensed from lessons/s1/e07-the-holes-in-q.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "density"
  | "descent"
  | "liuHui"
  | "hole"
  | "armies"
  | "babylon"
  | "tower"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode seven. The holes in the rationals."],
  coldOpen: [
    "Draw a square with sides of one. The diagonal squared is one plus one, which is two.",
    "Can a fine enough ruler measure both the side and the diagonal? Halves, tenths, hundredths: the diagonal always falls between two marks.",
    "Greek mathematicians proved that no ruler ever works. A much later legend says the man who told was drowned at sea.",
    "Fractions seem to fill the line, and yet it's full of holes. Today we find them.",
  ],
  density: [
    "First, the case for fractions: between any two of them sits their average, another fraction.",
    "Repeat, and the gap fills up. Between any two fractions there are infinitely many more.",
  ],
  descent: [
    "Suppose a over b squares to two, with b as small as possible. Then a squared equals two b squared.",
    "So a squared is even, which makes a even. Write a as two c, and b squared equals two c squared.",
    "So b is even too, and c over d is the same fraction with a smaller bottom. That breaks our choice of b.",
    "No fraction squares to two. The diagonal has no length in the rationals.",
  ],
  liuHui: [], // Chinese edition only
  hole: [
    "Zoom in near 1.414. At every level the line looks solid, packed with fractions.",
    "Now look closer: the fractions are dust, and at the square root of two there is a gap.",
    "Zoom back out and the gaps are everywhere: root three, root five, and infinitely many more between any two fractions.",
  ],
  armies: [
    "Take every fraction whose square is less than two. All of them are below 1.5, so the set has upper bounds.",
    "Is there a least upper bound? From any fraction that's too small, one rule gives a bigger one that's still too small.",
    "From any fraction that's too big, the same rule gives a smaller one that's still too big.",
    "So the two sides close in forever with nothing between them. Some sets of rationals have no least upper bound.",
  ],
  babylon: [
    "Another view: average x with two over x, and repeat. One, three halves, seventeen twelfths, 577 over 408.",
    "The terms crowd together. After four steps, they agree to within a few millionths.",
    "A sequence like that ought to have a limit, but the limit would square to two. It has nowhere to land.",
  ],
  tower: [
    "So the rationals have holes everywhere, and adding root two alone won't fix them.",
    "The next floor needs a new idea: limits.",
  ],
  endCard: [
    "Dense, and still full of holes. That's the rational line.",
    "Next episode: two ways to fill a hole you can't point to. Building the real numbers, twice.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第七集。有理数里的洞。"],
  coldOpen: [
    "画一个边长为一的正方形。对角线的平方是一加一，等于二。",
    "能不能找一把够细的尺子，同时量准边和对角线？分成二等份、十等份、百等份，对角线总落在两个刻度之间。",
    "古希腊人证明了：哪把尺子都不行。很晚才出现的传说讲，泄露这件事的人被扔进了海里。",
    "分数好像铺满了数轴，可数轴上到处是洞。今天就来找这些洞。",
  ],
  density: [
    "先替分数说句话：任意两个分数之间，都夹着它们的平均数，又是一个分数。",
    "一直做下去，空隙就被填满了。任意两个分数之间，都有无穷多个分数。",
  ],
  descent: [
    "假设 a/b 的平方等于二，并且 b 取到最小。那么 a² = 2b²。",
    "所以 a² 是偶数，a 也是偶数。写成 a = 2c，就得到 b² = 2c²。",
    "于是 b 也是偶数，c/d 是同一个分数，分母却更小。这跟 b 最小矛盾。",
    "没有哪个分数的平方等于二。对角线的长度，在有理数里找不到。",
  ],
  // 只在中文版出现：《九章算术》少广章“开方不尽”，刘徽注“其数不可得而定”。
  liuHui: [
    "中国古人也碰到过。《九章算术》少广章说：“若开之不尽者，为不可开，当以面命之。”",
    "刘徽注里说，取近似值，不是“微少”就是“微多”，“其数不可得而定”。",
    "所以只能“以面命之”：直接叫它面积为二的正方形的边。数轴上的这个位置，没有分数。",
  ],
  hole: [
    "在 1.414 附近放大。每放大一层，数轴都显得满满当当，全是分数。",
    "再仔细看：分数只是一粒粒尘土，在根号二的位置，有一个缺口。",
    "再缩小回来，缺口到处都是：根号三、根号五，任意两个分数之间都有无穷多个。",
  ],
  armies: [
    "取所有平方小于二的分数。它们都小于 1.5，所以这个集合有上界。",
    "有没有最小的上界？从任何一个偏小的分数出发，一条规则就能给出一个更大、却仍然偏小的分数。",
    "从任何一个偏大的分数出发，同一条规则给出一个更小、却仍然偏大的分数。",
    "两边永远在逼近，中间却什么都没有。有些有理数集合，没有最小上界。",
  ],
  babylon: [
    "换个角度：把 x 和 2/x 取平均，再重复。一、二分之三、十二分之十七、408 分之 577。",
    "这些项越挤越紧。四步之后，彼此相差不到百万分之几。",
    "这样的数列理应有极限，可极限的平方得等于二。它无处落脚。",
  ],
  tower: [
    "所以有理数处处有洞，只补上一个根号二是不够的。",
    "下一层楼需要一个新想法：极限。",
  ],
  endCard: [
    "处处稠密，却到处是洞。这就是有理数的数轴。",
    "下一集：用两种办法，填补一个指不出来的洞。两次造出实数。",
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
  "density",
  "descent",
  "liuHui",
  "hole",
  "armies",
  "babylon",
  "tower",
  "endCard",
];

export const S1E07 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { liuHui: "zh" },
});
