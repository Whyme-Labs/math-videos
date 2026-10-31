import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E12, condensed from lessons/s2/e12-eigenvectors.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "lines"
  | "charpoly"
  | "rotation"
  | "yanghui"
  | "fibonacci"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Pisa, 1202. In his book of calculation, Leonardo of Pisa asks how many pairs of rabbits there'll be after a year, if every grown pair breeds a new pair each month.",
    "The answer is the sequence 1, 1, 2, 3, 5, 8, 13: each number is the sum of the two before it.",
    "In 1843 Jacques Binet wrote a formula that jumps straight to any term. It's full of square roots of five, and it always lands on a whole number.",
    "Where could it come from? From the directions a map doesn't turn. Today: eigenvectors.",
  ],
  title: ["Season two, episode twelve. Eigenvectors."],
  lines: [
    "Watch this map act on arrows. Almost every arrow gets knocked off its line. But arrows on two special lines only stretch: one by 5, one by 2.",
    "Those are eigenvectors, and 5 and 2 are their eigenvalues. Use them as the basis, and the whole map is just: stretch by 5, stretch by 2.",
  ],
  charpoly: [
    "To find them, ask when A minus lambda can crush an arrow: when its determinant is zero. That's a polynomial in lambda, and its roots are 5 and 2.",
    "It doesn't care about coordinates. The trace, 7, is the sum of the eigenvalues, and the determinant, 10, is their product.",
  ],
  rotation: [
    "A rotation of the plane turns every line. It has no real eigenvector at all.",
    "Over the complex numbers it has two, with eigenvalues on the unit circle. On a complex space, every map has at least one eigenvector.",
  ],
  yanghui: [], // Chinese edition only
  fibonacci: [
    "Now Fibonacci. Adding the last two numbers is a linear map on pairs, and its eigenvalues are the golden ratio, 1.618, and minus 0.618.",
    "Each step multiplies one part by 1.618 and the other by minus 0.618, which shrinks to nothing. That's Binet's formula, and why the ratios close in on the golden ratio.",
  ],
  endCard: [
    "Eigenvectors are a map's own coordinates. Seen through them, the map only stretches.",
    "Next episode: shear a deck of cards and you get only one eigen-direction. What then?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1202 年，比萨。列奥纳多在他的《算盘书》里问：每对成年兔子每月生一对小兔，一年后有多少对兔子？",
    "答案是 1、1、2、3、5、8、13：每个数都是前两个之和。",
    "1843 年，比内写出一个公式，能直接跳到任何一项。公式里全是根号五，结果却总是整数。",
    "它从哪儿来？来自映射不转动的方向。今天讲特征向量。",
  ],
  title: ["第二季，第十二集。特征向量。"],
  lines: [
    "看这个映射怎样作用在箭头上。几乎每支箭头都被拨离原来的直线；只有两条特殊直线上的箭头只被拉伸：一条拉 5 倍，一条拉 2 倍。",
    "它们就是特征向量，5 和 2 是特征值。用它们当基，整个映射就只是：拉伸 5 倍，拉伸 2 倍。",
  ],
  charpoly: [
    "怎么找？问 A 减 λ 什么时候会压扁一支箭头：它的行列式为零的时候。这是 λ 的一个多项式，根正是 5 和 2。",
    "它不在乎坐标。迹 7 是特征值之和，行列式 10 是特征值之积。",
  ],
  rotation: [
    "平面的旋转把每条直线都转走了，一个实特征向量也没有。",
    "到了复数里，它有两个，特征值落在单位圆上。在复空间上，每个映射至少有一个特征向量。",
  ],
  // 只在中文版出现：杨辉三角斜线之和为斐波那契数
  yanghui: [
    "南宋杨辉在《详解九章算法》（1261 年）里，记下了贾宪的“开方作法本源图”，就是今天说的杨辉三角。",
    "沿着一条条斜线把数加起来：1、1、2、3、5、8、13。三角里藏着同一串数。",
    "“前两个相加”这一步，每次都是同一个线性映射。下面就看它的特征向量。",
  ],
  fibonacci: [
    "回到斐波那契。“前两个相加”是数对上的一个线性映射，它的特征值是黄金比 1.618 和负 0.618。",
    "每走一步，一部分乘 1.618，另一部分乘负 0.618，越来越小直到消失。这就是比内公式，也是相邻两项之比逼近黄金比的原因。",
  ],
  endCard: [
    "特征向量是映射自己的坐标。透过它们看，映射只是在拉伸。",
    "下一集：推一叠纸牌，只得到一个特征方向。那怎么办？",
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
  "lines",
  "charpoly",
  "rotation",
  "yanghui",
  "fibonacci",
  "endCard",
];

export const S2E12 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { yanghui: "zh" },
  season: 2,
});
