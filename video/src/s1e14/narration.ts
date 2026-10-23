import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E14, condensed from lessons/s1/e14-russells-dream-logicism.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "dream"
  | "crack"
  | "mojing"
  | "floors"
  | "principia"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Jena, June 1902. For twenty years Gottlob Frege has been building arithmetic out of pure logic. Volume two is at the printer.",
    "A letter arrives from England. A young man named Bertrand Russell admires the work, and has one question.",
    "Take the set of all sets that are not members of themselves. Is it a member of itself?",
    "If it is, then it isn't. If it isn't, then it is.",
    "Frege writes back within a week. The ground he built on has shaken: arithmetic totters.",
  ],
  title: ["Season one, episode fourteen. Russell's dream."],
  dream: [
    "Frege's dream: no axioms about numbers at all. Only logic, plus the idea from episode eleven: matching.",
    "Put one cup on every saucer. If nothing is left over, there are as many cups as saucers, and nobody counted.",
    "So the number 2 is the collection of every pair there is: two cups, two shoes, two stars, all at once.",
  ],
  crack: [
    "To build that, Frege used one rule that sounds like plain logic: every property makes a set.",
    "Most sets are not members of themselves. A bag of cups is not a cup. So gather every bag like that into one bag, R.",
    "Is R in R? If it is, it breaks its own rule. If it isn't, it belongs inside. The rule makes R, and R can't exist.",
  ],
  mojing: [], // Chinese edition only
  floors: [
    "Russell's repair: give everything a floor. Things on floor 0, sets of things on floor 1, sets of those on floor 2.",
    "A set may only hold things from the floor just below it. So the question “is R in R?” isn't false any more. It can't even be asked.",
    "The price: there's a 2 on every floor, and to have enough things, Russell had to assume the world holds infinitely many.",
  ],
  principia: [
    "With Alfred North Whitehead he wrote it all out: Principia Mathematica, three volumes, every step checkable.",
    "One plus one equals two arrives in volume two, at proposition 110.643, with a dry note: the above proposition is occasionally useful.",
  ],
  endCard: [
    "Russell's floors never left. A program that refuses to add a number to a word is checking types, and proof checkers now verify mathematics line by line.",
    "Next episode: Königsberg, 1930. A quiet young man says every rulebook for arithmetic leaves some truths unprovable.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1902 年 6 月，耶拿。二十年来，弗雷格一直想只用逻辑搭出整个算术。第二卷已经送去印刷。",
    "一封信从英国寄来。写信的年轻人叫罗素，很佩服这套工作，只想问一个问题。",
    "所有“不属于自己”的集合放在一起，组成一个集合。它属于它自己吗？",
    "如果属于，那它就不属于；如果不属于，那它就属于。",
    "不到一周，弗雷格回信：他用来打地基的那块地动摇了，算术在摇晃。",
  ],
  title: ["第一季，第十四集。罗素的梦。"],
  dream: [
    "弗雷格的梦：不要任何关于数的公理，只用逻辑，加上第十一集的那个办法：配对。",
    "每个碟子上放一个杯子。谁都没多出来，杯子和碟子就一样多，根本不用数。",
    "所以数 2，就是世界上所有“一对”的集合：两个杯子、两只鞋、两颗星，一个不落。",
  ],
  crack: [
    "为了搭出这些，弗雷格用了一条听起来再普通不过的规则：每个性质都能组成一个集合。",
    "大多数集合不属于自己。一袋杯子，本身不是杯子。把所有这样的袋子装进一个大袋子，叫它 R。",
    "R 属于 R 吗？属于，就违反了它自己的规则；不属于，它又该进去。规则造出了 R，而 R 根本不可能存在。",
  ],
  // 只在中文版出现：《墨子·经下》“以言为尽悖，悖。说在其言。”
  mojing: [
    "《墨经》里早就有一句：“以言为尽悖，悖。说在其言。”",
    "有人说“所有的话都是错的”。可这句话自己也是一句话：它要是对的，它自己就错了。",
    "罗素的集合也是这样，绕了一圈回来指着自己。毛病就出在“自己”上。",
  ],
  floors: [
    "罗素的补救：给每样东西分楼层。东西在 0 层，东西的集合在 1 层，集合的集合在 2 层。",
    "一个集合只能装正下方那一层的东西。于是“R 属于 R 吗”不再是假话，而是根本问不出口。",
    "代价是：每一层都有一个自己的 2；而且为了东西够用，罗素只好假设世界上的东西有无穷多。",
  ],
  principia: [
    "他和怀特海把这一切全部写了出来：《数学原理》，三大卷，每一步都能检查。",
    "1 + 1 = 2 直到第二卷的命题 110.643 才出现，后面还有一句冷幽默：上面这个命题偶尔有用。",
  ],
  endCard: [
    "罗素的楼层一直都在。程序拒绝把数字和文字相加，就是在检查类型；如今的证明检查器，也在一行一行地验证数学。",
    "下一集：1930 年，柯尼斯堡。一个安静的年轻人说：任何算术的规则手册，都会漏掉一些证明不了的真话。",
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
  "dream",
  "crack",
  "mojing",
  "floors",
  "principia",
  "endCard",
];

export const S1E14 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { mojing: "zh" },
});
