import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E17, condensed from
// lessons/s1/e17-homomorphisms-and-quotient-groups.md. Each line is one
// caption and one cue; scenes key their animation off the cue frames, so
// editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "same"
  | "forget"
  | "lanes"
  | "collapse"
  | "sunzi"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Three friends on a video call, each with a different toy. One turns a square tile a quarter turn. One moves a four-hour clock forward an hour.",
    "The third multiplies by i: i, then minus one, then minus i.",
    "They keep going together. After four moves, all three are back where they started.",
    "Hide the labels and you can't tell them apart. The pictures are different; the pattern is the same.",
    "So when are two groups really the same? And what happens when a group is made to forget something?",
  ],
  title: ["Season one, episode seventeen. Homomorphisms."],
  same: [
    "Two groups are the same when you can relabel one as the other and every move still matches: quarter turn, one hour, times i.",
    "That relabeling is an isomorphism. Same size isn't enough. A rectangle also has four moves, but each one undoes itself in two steps. The clock's one hour needs four.",
  ],
  forget: [
    "Now a map that forgets. Send every integer to its hour on the four-hour clock. Add, then convert, or convert, then add: you land in the same place.",
    "A map that respects the moves like that is a homomorphism. Everything that lands on 0, the multiples of 4, is its kernel: exactly what the map forgets.",
  ],
  lanes: [
    "The kernel slices the integers into four lanes: the multiples of 4, then one more, two more, three more. Each lane is a coset.",
    "In a finite group, the slices are all the same size, so a subgroup's size always divides the group's. That's Lagrange's theorem.",
  ],
  collapse: [
    "Squash each lane to a single point, and the four points form a group of their own: the four-hour clock.",
    "That's the first isomorphism theorem. Every homomorphism is a collapse, followed by a relabeling.",
  ],
  sunzi: [], // Chinese edition only
  endCard: [
    "Same pattern means isomorphic. A map that forgets is a homomorphism, and what it forgets is its kernel.",
    "Next episode: numbers you can add and multiply, and a world where 2 times 3 is 0.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "三个朋友视频通话，每人拿着不同的玩具。一个把方瓷砖转四分之一圈，一个把四小时钟面往前拨一小时。",
    "第三个人乘以 i：得到 i，再乘是负一，再乘是负 i。",
    "他们一起继续。走完四步，三个人都回到了起点。",
    "把标签遮住，你根本分不出谁是谁。画面不同，规律一样。",
    "那么，两个群什么时候算“一样”？要是让一个群忘掉点什么，又会怎样？",
  ],
  title: ["第一季，第十七集。同态。"],
  same: [
    "如果能把一个群重新贴标签，变成另一个，而且每个动作都对得上，它们就是一样的：转四分之一圈、拨一小时、乘以 i。",
    "这种改标签叫同构。光是大小一样还不够。长方形也有四个动作，但每个动作走两步就回家；钟面的“一小时”要走四步。",
  ],
  forget: [
    "再来一个会“忘事”的映射：把每个整数送到四小时钟面上对应的时刻。先加再换算，或者先换算再加，落点一样。",
    "像这样尊重动作的映射，叫同态。所有落在 0 上的数，也就是 4 的倍数，叫它的核：正是这个映射忘掉的东西。",
  ],
  lanes: [
    "核把整数切成四条跑道：4 的倍数，再多 1、多 2、多 3。每条跑道叫一个陪集。",
    "在有限群里，切出来的每一片一样大，所以子群的大小总能整除群的大小。这就是拉格朗日定理。",
  ],
  collapse: [
    "把每条跑道压成一个点，四个点自己就组成一个群：正是四小时钟面。",
    "这就是第一同构定理。每个同态，都是先压扁，再改标签。",
  ],
  // 只在中文版出现：《孙子算经》“今有物不知其数”
  sunzi: [
    "《孙子算经》：“今有物不知其数，三三数之剩二，五五数之剩三，七七数之剩二，问物几何？”",
    "三个钟面，各自只记得一个余数：2、3、2。每个钟面都忘了很多。",
    "可三个合起来，在 105 以内只剩一个答案：二十三。忘掉的东西，又被拼了回来。",
  ],
  endCard: [
    "规律一样就是同构。会忘事的映射是同态，它忘掉的，就是它的核。",
    "下一集：既能加、又能乘的数，还有一个 2 乘 3 等于 0 的世界。",
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
  "same",
  "forget",
  "lanes",
  "collapse",
  "sunzi",
  "endCard",
];

export const S1E17 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { sunzi: "zh" },
});
