import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E11, condensed from lessons/s1/e11-hilberts-hotel.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "bus"
  | "matching"
  | "liezi"
  | "buses"
  | "fractions"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "It's midnight, and it's raining. A traveler with one suitcase reaches the only hotel in town.",
    "The hotel has infinitely many rooms, numbered 0, 1, 2, and on forever. Tonight every room is taken.",
    "The clerk picks up the intercom: everyone, please move from your room to the next room along.",
    "Every guest steps one door along. Nobody leaves, nobody shares, and room 0 is empty. The traveler gets the key.",
    "The hotel was full, and now it has room. So what does full even mean, when you can't count to the end?",
  ],
  title: [
    "Season one, episode eleven. Hilbert's Hotel: counting without numbers.",
  ],
  bus: [
    "At one in the morning a bus pulls up with infinitely many passengers: seat 0, seat 1, seat 2, and on.",
    "The clerk calls: everyone in room n, move to room 2n. Every guest lands on an even door, and every odd door is free.",
    "Seat k takes room 2k plus 1. An infinite busload, seated, and nobody had to leave.",
  ],
  matching: [
    "So are there fewer even numbers than whole numbers? The evens look like only half of them.",
    "Pair them up instead: 0 with 0, 1 with 2, 2 with 4. Every number gets exactly one partner, and nobody is left over.",
    "Galileo saw this in 1638 with square numbers, and gave up comparing infinities. Cantor kept the pairing instead.",
    "Two sets have the same size if they can be matched one to one. That is the whole definition. No counting needed.",
  ],
  liezi: [], // Chinese edition only
  buses: [
    "At two in the morning, infinitely many buses arrive, and every bus has infinitely many passengers.",
    "Seat them bus by bus and it fails: bus 1 alone takes every free room, and bus 2 waits forever.",
    "Instead, walk the car park in diagonals. Each diagonal is short, so every passenger on every bus gets a turn.",
  ],
  fractions: [
    "The fractions feel even bigger. Between any two of them there are infinitely many more.",
    "But they grow on a tree. Start at 1 over 1; each a over b has two children, a over a plus b, and a plus b over b.",
    "Every positive fraction grows on it exactly once, in lowest terms. Read it row by row, and each one gets a room.",
  ],
  endCard: [
    "By dawn every guest has a room: the evens, the integers, every bus, every fraction. Matching, not counting.",
    "Next episode: one more bus, whose passengers are named by infinite decimals. The clerk reads the list, and frowns.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "午夜，下着雨。一个旅人提着一只箱子，走到镇上唯一的旅馆门口。",
    "这家旅馆有无穷多个房间：0 号、1 号、2 号……一直排下去。今晚，每个房间都住满了。",
    "前台拿起广播：“各位客人，请从您的房间，搬到下一个房间。”",
    "每位客人都往后挪一间。没人离开，没人合住，0 号房空了出来。旅人拿到了钥匙。",
    "旅馆明明住满了，却又有了空房。数不到头的时候，“满”到底是什么意思？",
  ],
  title: ["第一季，第十一集。希尔伯特旅馆：不用数数的计数。"],
  bus: [
    "凌晨一点，来了一辆大巴，车上有无穷多位乘客：0 号座、1 号座、2 号座……",
    "前台广播：“n 号房的客人，请搬到 2n 号房。”老客人全住进了偶数号，奇数号全空了。",
    "k 号座的乘客住进 2k + 1 号房。一整车无穷多的人住下了，没有一个人要走。",
  ],
  matching: [
    "那偶数是不是比自然数少？看起来，偶数只占一半。",
    "换个办法，一对一配对：0 配 0，1 配 2，2 配 4。每个数都有唯一的搭档，谁也没落单。",
    "1638 年，伽利略用平方数发现了这一点，于是放弃比较无穷的大小。康托尔则留下了配对。",
    "两个集合能一一配对，就算一样大。定义就这么简单，根本不用数。",
  ],
  // 只在中文版出现：《列子·汤问》殷汤问夏革“上下八方有极尽乎”。
  liezi: [
    "《列子·汤问》里，商汤问夏革：上下八方，有没有尽头？",
    "夏革答：“无极之外复无无极，无尽之中复无无尽。”无穷之外，再没有另一个无穷。",
    "拿来看这家旅馆正合适：无穷多个房间再添一位、再添一车，还是同样的无穷。",
  ],
  buses: [
    "凌晨两点，来了无穷多辆大巴，每辆车上都有无穷多位乘客。",
    "一辆一辆地安排就不行：光是 1 号车，就占满了所有空房，2 号车永远等不到。",
    "改成沿对角线走遍停车场。每条对角线都很短，每辆车上的每位乘客，都轮得到。",
  ],
  fractions: [
    "分数看起来更多：任意两个分数之间，都还有无穷多个分数。",
    "可它们长在一棵树上。从 1/1 开始，每个 a/b 生出两个孩子：a/(a+b) 和 (a+b)/b。",
    "每个正分数在树上恰好出现一次，而且是最简分数。一行一行读下来，每个都有房间。",
  ],
  endCard: [
    "天亮时，每位客人都有了房间：偶数、整数、每一辆车、每一个分数。靠的是配对，不是数数。",
    "下一集：又来一辆车，乘客的名字是无穷小数。前台看了看名单，皱起了眉头。",
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
  "bus",
  "matching",
  "liezi",
  "buses",
  "fractions",
  "endCard",
];

export const S1E11 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { liezi: "zh" },
});
