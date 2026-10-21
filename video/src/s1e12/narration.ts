import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E12, condensed from lessons/s1/e12-the-diagonal-argument.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "diagonal"
  | "parties"
  | "maodun"
  | "costumes"
  | "unnamed"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "After last night, the clerk of the infinite hotel is feeling unbeatable. A new sign goes up: no crowd too large.",
    "At three in the morning one more bus pulls in. Every passenger's name tag is an infinite decimal, and every decimal between 0 and 1 is on board.",
    "The clerk writes the list: room 0 gets this one, room 1 gets that one, all the way down.",
    "A girl at the back reads the list. Her first digit differs from guest 0's first digit, her second from guest 1's second, and on down the line.",
    "Her name is different from every name on the list. She has no room, and however the clerk reshuffles, she can do it again.",
  ],
  title: ["Season one, episode twelve. The diagonal argument."],
  diagonal: [
    "Write the list as a table of digits. Walk down the diagonal: guest 0's digit 0, guest 1's digit 1, guest 2's digit 2.",
    "Change every one: write 5 unless the digit was 5, and then write 4. The new number differs from row n in place n, for every n.",
    "Why only 4 and 5? A rule like add one could build 0.1999 repeating when 0.2 is already on the list: the same point, under its other name.",
    "Shuffle the list any way you like. The diagonal changes, and a new girl walks out. Every list of real numbers misses one.",
  ],
  parties: [
    "The trick has nothing to do with decimals. Say every guest throws a party, and writes a guest list.",
    "Some guests invite themselves. Now make one more list: everyone who did not invite themselves. Whose party is that?",
    "If it's guest a's, then a is on it exactly when a isn't. No guest owns it. So a set always has more subsets than members.",
  ],
  maodun: [], // Chinese edition only
  costumes: [
    "The same table keeps coming back in costume. Rows of sets: is x in y? Flip the diagonal, and you get Russell's paradox.",
    "Rows of sentences: this sentence is false. Rows of computer programs: does program n halt on input n?",
    "Flip that diagonal and you get a program no checker can predict. Turing, 1936: no program can decide whether every program halts.",
  ],
  unnamed: [
    "One more costume. Every name, every formula, every program is a finite string of symbols, so they can all be listed.",
    "So only countably many real numbers can ever be named. Give each one a tiny interval around it, and they cover almost nothing.",
    "Throw a dart at the number line, and it lands on a number nobody will ever be able to name.",
  ],
  endCard: [
    "Infinities come in sizes: the whole numbers, then the reals, then their subsets, and on up with no top step.",
    "Next episode: counting past infinity. What comes after every whole number, and after that?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "昨晚之后，无穷旅馆的前台觉得自己天下无敌，门口挂出新牌子：来多少人都住得下。",
    "凌晨三点，又来了一辆大巴。每位乘客的名牌是一个无穷小数，0 到 1 之间的每个小数，车上都有。",
    "前台写下名单：这位住 0 号，那位住 1 号，一直写下去。",
    "后排一个女孩看了名单：她的第 1 位和 0 号客人的第 1 位不同，第 2 位和 1 号客人的第 2 位不同，一路下去。",
    "她的名字和名单上每个名字都不一样。她没有房间。名单怎么重排，她都能再来一次。",
  ],
  title: ["第一季，第十二集。对角线论证。"],
  diagonal: [
    "把名单写成一张数字表，沿对角线走：0 号的第 0 位，1 号的第 1 位，2 号的第 2 位。",
    "每一位都改掉：不是 5 就写 5，是 5 就写 4。新数和第 n 行在第 n 位不同，每个 n 都是。",
    "为什么只用 4 和 5？要是用“加一”，可能造出 0.1999…，而 0.2 早在名单上：同一个点的另一个名字。",
    "名单随便怎么重排，对角线跟着变，又走出来一个新女孩。任何一份实数名单，都会漏掉一个。",
  ],
  parties: [
    "这招其实跟小数无关。假设每位客人都办一场派对，写一份邀请名单。",
    "有的人邀请了自己。现在再写一份名单：所有没邀请自己的人。这是谁的派对？",
    "如果是 a 的，那 a 在名单上，当且仅当 a 不在名单上。谁也不是主人。所以一个集合的子集，总比元素多。",
  ],
  // 只在中文版出现：《韩非子·难一》自相矛盾。
  maodun: [
    "《韩非子》里，楚国有人卖盾又卖矛：“吾盾之坚，物莫能陷也。”“吾矛之利，于物无不陷也。”",
    "有人问：“以子之矛，陷子之盾，何如？”那人答不上来。",
    "矛盾的说法，自己和自己打架。对角线论证正是把这一招变成了证明。",
  ],
  costumes: [
    "同一张表，换着装束不断出现。行是集合：x 属于 y 吗？把对角线翻过来，就是罗素悖论。",
    "行是句子：“这句话是假的。”行是程序：第 n 个程序，输入 n，会停吗？",
    "把这条对角线翻过来，就造出一个谁也预测不了的程序。图灵，1936 年：没有程序能判定所有程序会不会停。",
  ],
  unnamed: [
    "再换一身装束。每个名字、每条公式、每段程序，都是有限长的符号串，所以全都能排成一列。",
    "所以能被说出名字的实数，只有可数多个。给每个都套一个小区间，加起来几乎什么也盖不住。",
    "往数轴上扔一支飞镖，它落在一个永远没人能叫出名字的数上。",
  ],
  endCard: [
    "无穷有大小：自然数，然后是实数，然后是实数的子集，一级级往上，没有顶。",
    "下一集：数过无穷。所有自然数之后是什么？再之后呢？",
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
  "diagonal",
  "parties",
  "maodun",
  "costumes",
  "unnamed",
  "endCard",
];

export const S1E12 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { maodun: "zh" },
});
