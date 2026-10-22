import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E13, condensed from lessons/s1/e13-ordinals.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "omega"
  | "order"
  | "zhuangzi"
  | "descent"
  | "goodstein"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "A race with infinitely many runners. Runner 0 crosses the line, then runner 1, runner 2, each one a little quicker than the last.",
    "Every runner gets a number, and the announcer never runs out of them.",
    "Then, after all of them, one more runner crosses the line. What is her number?",
    "It isn't any whole number. Every whole number is already taken by someone ahead of her.",
    "There are no more runners than before, but now there is a last one. We need numbers for positions, not just for sizes.",
  ],
  title: ["Season one, episode thirteen. Counting past infinity."],
  omega: [
    "Back in episode four, each number was the set of all the numbers before it. Nothing says we have to stop at the finite ones.",
    "Collect every whole number, and you get the first position after all of them: omega. Then omega plus 1, omega plus 2.",
    "After all of those, omega times 2. Then omega squared, omega to the omega, and a tower of omegas called epsilon nought.",
    "Each one is the set of all the positions before it. These are the ordinals.",
  ],
  order: [
    "Order matters now. Put one extra runner in front of omega, and everyone just shifts back one: one plus omega is still omega.",
    "Put her at the end, and there is a last runner, which omega never had. Omega plus one is a new number.",
  ],
  zhuangzi: [], // Chinese edition only
  descent: [
    "One rule holds all the way up: you can never walk down forever. Every staircase down from any ordinal ends after finitely many steps.",
    "Even from omega, your first step down lands on some whole number, and from there the steps run out.",
  ],
  goodstein: [
    "Now a game. Take 4, which is 2 to the 2. Swap every 2 for a 3 and subtract one: 26. Then 41, 60, 83, 109.",
    "Start at 19 instead, and by the third step the number has over 150 digits. Surely it never comes back down?",
    "Swap the base for omega. Swapping changes nothing, and every subtract-one is a step down. So every game ends at 0.",
    "In 1982, Kirby and Paris proved that Peano's axioms from episode two can't prove this, though it's only about whole numbers.",
  ],
  endCard: [
    "Past infinity, the positions keep coming, and every way down is finite. That is what makes the climb safe.",
    "Next episode: Jena, 1902. A letter arrives for Frege, and twenty years of work begins to totter.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "一场有无穷多个选手的赛跑。0 号冲线，然后 1 号、2 号，一个比一个快。",
    "每个选手都有号码，播报员的号码永远报不完。",
    "然后，在所有人之后，又有一个选手冲过终点线。她是几号？",
    "她不是任何一个自然数。每个自然数，都已经给了跑在她前面的人。",
    "选手并没有变多，但现在有了“最后一个”。我们需要给位置编号，而不只是给大小编号。",
  ],
  title: ["第一季，第十三集。数过无穷。"],
  omega: [
    "第四集里，每个数都是它前面所有数组成的集合。没人规定只能停在有限的数上。",
    "把所有自然数收拢起来，就是排在它们全体之后的第一个位置：ω。然后是 ω + 1，ω + 2。",
    "这些全部之后，是 ω·2。然后是 ω²，ω 的 ω 次方，一直叠成 ω 塔，叫作 ε₀。",
    "每一个都是它前面所有位置组成的集合。它们叫作序数。",
  ],
  order: [
    "现在顺序很重要。在 ω 前面多加一个选手，大家往后挪一位就好：1 + ω 还是 ω。",
    "把她放在最后，就出现了“最后一个”，而 ω 从来没有最后一个。ω + 1 是个新的数。",
  ],
  // 只在中文版出现：《庄子·齐物论》“有始也者，有未始有始也者……”
  zhuangzi: [
    "《庄子·齐物论》说：“有始也者，有未始有始也者，有未始有夫未始有始也者。”",
    "开始之前还有开始，开始之前的开始之前还有开始，一路往回推，没有尽头。",
    "序数恰恰相反：往下走永远走得到底。这一点，正是下面这个游戏的关键。",
  ],
  descent: [
    "有一条规则一直成立：往下走，永远走不了无穷步。从任何序数往下，台阶总在有限步内走完。",
    "就算从 ω 出发，第一步也只能落到某个自然数上，然后台阶很快就没了。",
  ],
  goodstein: [
    "来玩个游戏。拿 4，写成 2 的 2 次方。把所有 2 换成 3，再减一：26。接着是 41、60、83、109。",
    "换成从 19 开始，第三步就超过 150 位数了。它总不会再降回来吧？",
    "把底数换成 ω。换底什么都不变，每次减一都是往下走一步。所以每局游戏都会走到 0。",
    "1982 年，柯比和帕里斯证明：第二集的皮亚诺公理证明不了这件事，尽管它只讲自然数。",
  ],
  endCard: [
    "过了无穷，位置还在一个个出现，而每条往下的路都是有限的。所以往上爬才是安全的。",
    "下一集：1902 年，耶拿。弗雷格收到一封信，二十年的心血开始摇晃。",
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
  "omega",
  "order",
  "zhuangzi",
  "descent",
  "goodstein",
  "endCard",
];

export const S1E13 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zhuangzi: "zh" },
});
