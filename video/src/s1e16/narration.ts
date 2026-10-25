import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E16, condensed from lessons/s1/e16-groups-and-symmetry.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "rules"
  | "fails"
  | "order"
  | "luoshu"
  | "counting"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Close your eyes. Your friend picks up a square tile, does something to it, and puts it back exactly in its outline.",
    "Open them. Nothing looks different. Did they turn it a quarter, a half, three quarters, or not at all?",
    "Or flip it, across either diagonal or either middle line? That's eight moves, and you can't tell them apart.",
    "The same game works on a clock: add five hours. And on a Rubik's cube, with about 43 quintillion scrambles.",
    "Three different worlds, and their moves follow the same few rules. What are they?",
  ],
  title: ["Season one, episode sixteen. Groups."],
  rules: [
    "Rule one: a move followed by a move is a move. Rule two: doing nothing counts as a move.",
    "Rule three: every move can be undone. Rule four: in a long chain of moves, it doesn't matter how you group them.",
    "Any collection of moves with these four rules is called a group. Nothing says what the moves are made of, only what they do.",
  ],
  fails: [
    "Whole numbers with adding fail rule three: you can't undo add three without going below zero. That's why episode six built the integers.",
    "Subtraction fails rule four: 5 minus 3, then minus 1, is 1. But 5 minus the result of 3 minus 1 is 3.",
  ],
  order: [
    "On the square, order matters. Flip then turn, and corner 1 lands where 2 was. Turn then flip, and it lands where 4 was.",
    "So undo in reverse. You put on socks, then shoes. To undo that, shoes come off first.",
  ],
  luoshu: [], // Chinese edition only
  counting: [
    "And counting? Counting is one move, done again and again. Three is: do it three times. Minus three: undo it three times.",
    "The integers are what one undoable move builds when nothing else is assumed. On a clock, twelve steps bring you home. In the integers, you never come back.",
  ],
  endCard: [
    "The square, the clock and the cube are three different groups, with one set of rules.",
    "Next episode: a square's four quarter turns and a four-hour clock move in perfect step. Are they the same group?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "闭上眼睛。朋友拿起一块方形瓷砖，动了点手脚，再严丝合缝地放回原位。",
    "睁开眼，什么都没变。他是转了四分之一圈、半圈、四分之三圈，还是根本没动？",
    "还是翻了个面：沿两条对角线之一，或两条中线之一？一共八种动作，你根本分不出来。",
    "钟面也能玩这个游戏：往后拨五小时。魔方也能，它大约有四千三百亿亿种打乱方式。",
    "三个不同的世界，它们的动作遵守同样几条规则。是哪几条？",
  ],
  title: ["第一季，第十六集。群。"],
  rules: [
    "规则一：一个动作接着一个动作，还是一个动作。规则二：什么都不做，也算一个动作。",
    "规则三：每个动作都能撤销。规则四：一长串动作，怎么分组先算都一样。",
    "满足这四条规则的一组动作，就叫一个群。规则里没说动作是什么做的，只说它们能做什么。",
  ],
  fails: [
    "自然数加法过不了规则三：“加三”撤销不了，除非走到零下面。所以第六集造出了整数。",
    "减法过不了规则四：5 减 3 再减 1，等于 1；可 5 减去“3 减 1”，等于 3。",
  ],
  order: [
    "在方块上，顺序很重要。先翻再转，1 号角落到原来 2 的位置；先转再翻，落到原来 4 的位置。",
    "所以撤销要倒着来。先穿袜子再穿鞋，脱的时候得先脱鞋。",
  ],
  // 只在中文版出现：洛书。《大戴礼记·明堂》“二九四，七五三，六一八”
  luoshu: [
    "《大戴礼记·明堂》记下了一个九宫数：“二九四，七五三，六一八”，这就是洛书。",
    "每行、每列、每条对角线，加起来都是 15。",
    "把它转一转、翻一翻，八种摆法个个还是幻方。这八个动作，正是方块的那八个。",
  ],
  counting: [
    "那数数呢？数数就是同一个动作，一遍又一遍。三，就是做三次；负三，就是撤销三次。",
    "整数，就是一个能撤销的动作、不加任何别的规则时造出来的东西。钟面走十二步就回家，整数永远回不来。",
  ],
  endCard: [
    "方块、钟面、魔方，是三个不同的群，遵守的却是同一套规则。",
    "下一集：方块的四种转法，和四小时钟面的四个位置，步调完全一致。它们是同一个群吗？",
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
  "fails",
  "order",
  "luoshu",
  "counting",
  "endCard",
];

export const S1E16 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { luoshu: "zh" },
});
