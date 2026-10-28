import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E20, the season finale, condensed from
// lessons/s1/e20-galois-symmetry-of-roots.md. Each line is one caption and
// one cue; scenes key their animation off the cue frames, so editing the
// script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "swap"
  | "qin"
  | "group"
  | "quintic"
  | "tower"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Paris, the night of 29 May 1832. Évariste Galois, twenty years old, has a duel at dawn.",
    "He spends the night writing to his friend Auguste Chevalier, racing to set down everything he knows about equations.",
    "In a margin he scribbles: I have no time. Inside the letter is the answer to a question nearly three hundred years old: why the fifth degree has no formula.",
    "He found it by watching how the roots of an equation trade places.",
  ],
  title: ["Season one, episode twenty. Galois."],
  swap: [
    "Take a quadratic with roots r one and r two. Swap them: their sum and their product don't change, and those are the coefficients you're given.",
    "Their difference flips sign when you swap. Its square doesn't, so the square is known, and one square root brings back the difference. That's the quadratic formula.",
  ],
  qin: [], // Chinese edition only
  group: [
    "Galois's idea: for any equation, collect every way its roots can trade places without breaking a single rational relation among them. That's its group.",
    "A formula climbs down a ladder, one root sign per rung, and each rung must be a step where the moves commute. For degrees 2, 3 and 4, the ladder reaches the bottom.",
  ],
  quintic: [
    "Five roots, and the ladder jams. With five to shuffle, every three-cycle is a commutator of two others, so no rung can ever get rid of them.",
    "x to the fifth minus 4x plus 2 has all 120 shuffles as its group. The ladder never reaches the bottom, so no formula of roots can reach its roots.",
  ],
  tower: [
    "Remember the tower from episode one: naturals, integers, rationals, reals, complex numbers. We built every floor, then learned what each one does.",
    "Galois never asked what the roots were, only how they move. That's the season's answer: a number is whatever behaves like one.",
  ],
  endCard: [
    "Galois died the day after the duel. Liouville published his work in 1846, and algebra was never the same.",
    "Next season: what you can build on top of a field. Season two opens with vectors, anything you can add and scale.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1832 年 5 月 29 日夜，巴黎。二十岁的伽罗瓦，天一亮就要去决斗。",
    "他整夜给朋友舍瓦利耶写信，抢着把自己关于方程的一切都写下来。",
    "他在页边匆匆写下：我没有时间了。信里藏着一个将近三百年的老问题的答案：五次方程为什么没有求根公式。",
    "他的办法，是看方程的根怎样互换位置。",
  ],
  title: ["第一季，第二十集。伽罗瓦。"],
  swap: [
    "取一个二次方程，两个根 r₁、r₂。把它们对调：和不变，积也不变，而这两个正是题目给的系数。",
    "差一对调就变号，可差的平方不变，所以平方是已知的，开一次平方就得回差。这就是求根公式。",
  ],
  // 只在中文版出现：秦九韶《数书九章》（1247）“遥度圆城”题的十次方程与正负开方术
  qin: [
    "中国古代算家另有一套本领。秦九韶《数书九章》的“遥度圆城”题，要解一个十次方程。",
    "他用“正负开方术”，一位一位把根算出来，要多精确就有多精确。",
    "但那是算数值，不是公式。能不能只用加减乘除和开方把根写出来，是另一回事。",
  ],
  group: [
    "伽罗瓦的想法：对任何方程，收集它的根所有可以互换位置、又不破坏任何一条有理关系的方式。这就是它的群。",
    "求根公式就是沿着梯子往下爬，每一级开一次方，而每一级都必须是操作可以交换次序的一步。二次、三次、四次，梯子都能爬到底。",
  ],
  quintic: [
    "到了五个根，梯子卡住了。五个根时，每个三轮换都是另外两个的换位子，所以哪一级都甩不掉它们。",
    "x⁵ − 4x + 2 的群是五个根的全部 120 种排列。梯子永远到不了底，所以没有任何根式能写出它的根。",
  ],
  tower: [
    "还记得第一集的数塔吗：自然数、整数、有理数、实数、复数。每一层我们都亲手造过，然后弄清了它能做什么。",
    "伽罗瓦从不问根是什么，只看它们怎么动。这就是本季的答案：凡是表现得像数的，就是数。",
  ],
  endCard: [
    "决斗后第二天，伽罗瓦去世。1846 年，刘维尔发表了他的遗作，代数从此改变。",
    "下一季：在域上面能建起什么。第二季从向量讲起：凡是能相加、能伸缩的东西。",
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
  "swap",
  "qin",
  "group",
  "quintic",
  "tower",
  "endCard",
];

export const S1E20 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { qin: "zh" },
});
