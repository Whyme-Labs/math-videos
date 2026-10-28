import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E19, condensed from lessons/s1/e19-fields-and-impossible-
// constructions.md. Each line is one caption and one cue; scenes key their
// animation off the cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "moves"
  | "guiju"
  | "field"
  | "tower"
  | "payoff"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Paris, 1837. Pierre Wantzel, still in his early twenties, picks up a problem two thousand years old.",
    "With a straightedge and a compass, cut any angle into three equal parts. Cutting it in half takes three strokes.",
    "Thirds have beaten everyone since the Greeks. Wantzel isn't hunting for a method. He wants to prove there isn't one.",
    "To rule out every construction at once, he needs one idea: the field.",
  ],
  title: ["Season one, episode nineteen. Fields."],
  moves: [
    "Start with the points 0 and 1. Where two lines cross, you only get numbers you could already reach by adding, subtracting, multiplying and dividing.",
    "Where a circle crosses a line, you solve a quadratic. So each circle can add one square root, and nothing else.",
  ],
  guiju: [], // Chinese edition only
  field: [
    "A world where you can add, subtract, multiply, and divide by anything but zero is a field. The rationals are one. So is the seven-hour clock.",
    "Add root 2 to the rationals and you get every a plus b root 2: a grid with two directions. Its degree is 2.",
  ],
  tower: [
    "Add root 3 on top, and each direction splits in two again: 1, root 2, root 3, root 6. Degrees multiply: 2 times 2 is 4.",
    "Each compass step adds a floor that at most doubles the degree. So anything you can construct has degree 1, 2, 4, 8: always a power of 2.",
  ],
  payoff: [
    "Now the angle. Cutting 60 degrees in three means building the cosine of 20 degrees, a root of 8x cubed minus 6x minus 1.",
    "That cubic won't factor, so the cosine of 20 degrees has degree 3. Three isn't a power of 2. No construction can ever reach it.",
    "The same 3 rules out doubling the cube. Two thousand years of attempts, closed by counting dimensions.",
  ],
  endCard: [
    "A field is a world where you can divide. Its degree is a dimension, and dimensions multiply.",
    "Next episode, the season finale: why quadratics, cubics and quartics have formulas, and the fifth degree never will.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1837 年，巴黎。二十出头的旺策尔，接手了一个两千年的老问题。",
    "只用直尺和圆规，把任意一个角三等分。二等分只要画三笔。",
    "从古希腊起，三等分难倒了所有人。旺策尔不找方法，他要证明根本没有方法。",
    "要一次排除所有作图，他需要一个概念：域。",
  ],
  title: ["第一季，第十九集。域。"],
  moves: [
    "从 0 和 1 两个点出发。两条直线相交，得到的数，靠加减乘除早就能得到。",
    "圆和直线相交，就是解一个二次方程。所以每画一个圆，最多添一个平方根，别的什么也添不了。",
  ],
  // 只在中文版出现：规矩。《孟子·离娄上》；吐鲁番阿斯塔那出土唐代伏羲女娲绢画
  guiju: [
    "中国人也早有这两样工具。《孟子》说：“不以规矩，不能成方圆。”",
    "规画圆，矩画方。吐鲁番出土的唐代绢画上，伏羲执矩，女娲执规。",
    "可是规矩到底能画出什么、画不出什么，要等有了域，才说得清。",
  ],
  field: [
    "能加、能减、能乘，除了零谁都能除，这样的世界叫域。有理数是域，七小时钟面也是。",
    "给有理数添上根号 2，得到所有的 a 加 b 根号 2：一张有两个方向的网格。它的次数是 2。",
  ],
  tower: [
    "再添上根号 3，每个方向又一分为二：1、根号 2、根号 3、根号 6。次数相乘：2 乘 2 等于 4。",
    "尺规每走一步，塔加高一层，次数最多翻一倍。所以能作出来的数，次数总是 1、2、4、8：一定是 2 的幂。",
  ],
  payoff: [
    "现在看那个角。把 60 度三等分，就要作出 20 度的余弦，它是 8x³ − 6x − 1 = 0 的根。",
    "这个三次式分解不了，所以 20 度的余弦次数是 3。3 不是 2 的幂，任何作图都到不了它。",
    "同一个 3 也判了倍立方的死刑。两千年的尝试，最后靠数维数了结。",
  ],
  endCard: [
    "域，就是能做除法的世界。它的次数是维数，而维数相乘。",
    "下一集，本季终章：为什么二次、三次、四次方程都有求根公式，五次却永远没有。",
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
  "moves",
  "guiju",
  "field",
  "tower",
  "payoff",
  "endCard",
];

export const S1E19 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { guiju: "zh" },
});
