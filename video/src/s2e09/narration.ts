import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E09, condensed from lessons/s2/e09-bilinear-forms.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "twoObjects"
  | "machine"
  | "gougu"
  | "squares"
  | "signature"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Cologne, September 1908. Hermann Minkowski stands before a congress of scientists and doctors and announces the end of space and time.",
    "From now on, he says, space by itself and time by itself will fade away into mere shadows. Only a union of the two survives.",
    "The union comes with a strange ruler. It measures the gap between two events with one number, and time counts with a minus sign.",
    "A machine that takes two inputs and returns one number is a bilinear form. Today: what it is, and the one thing about it nothing can change.",
  ],
  title: ["Season two, episode nine. Bilinear forms."],
  twoObjects: [
    "Here's a grid: 2, 1, 1, 2. As a map, it stretches arrows. As a form, it takes an arrow twice and returns 2x squared plus 2xy plus 2y squared.",
    "Change the basis. The map's new grid keeps its stretch factors, 3 and 1. The form's new grid doesn't. Same numbers, different objects.",
  ],
  machine: [
    "A bilinear form is a machine with two slots, linear in each. Fill one slot and what's left is a covector: a stack of sheets.",
    "So a form turns vectors into covectors. That's why its grid changes by P transpose B P, while a map's changes by P inverse A P.",
  ],
  gougu: [], // Chinese edition only
  squares: [
    "Any symmetric form can be untangled by completing squares: some plus squares, some minus squares, maybe some zeros.",
    "In 1852 Sylvester proved the counts never change, however you untangle it. He called it the law of inertia.",
  ],
  signature: [
    "So every form has a signature. Plus, plus draws ellipses. Plus, minus draws hyperbolas. Plus and a zero draws parallel lines.",
    "Minkowski's spacetime is plus, minus, minus, minus. No change of coordinates turns it into ordinary distance: the light cone is that signature.",
  ],
  endCard: [
    "A bilinear form takes two vectors and returns a number. Its grid changes by P transpose B P, and its signature never changes.",
    "Next episode: what a tensor really is, beyond something that transforms like a tensor.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1908 年 9 月，科隆。闵可夫斯基站在一场科学家和医生的大会上，宣布空间和时间到此为止。",
    "他说：从今以后，单独的空间、单独的时间，都将褪成影子；只有两者的结合才能留存。",
    "这个结合带着一把奇怪的尺：它用一个数量出两个事件之间的距离，而时间要带一个负号。",
    "吃进两个输入、吐出一个数的机器，叫双线性型。今天讲它是什么，以及它身上唯一改不了的东西。",
  ],
  title: ["第二季，第九集。双线性型。"],
  twoObjects: [
    "这是一格数：2、1、1、2。当作映射，它拉伸箭头；当作型，它把一支箭头吃两遍，吐出 2x² + 2xy + 2y²。",
    "换一组基。映射的新格子保住了拉伸倍数 3 和 1；型的新格子却保不住。同样的数，不同的东西。",
  ],
  machine: [
    "双线性型是一台有两个插槽的机器，对每个插槽都是线性的。填上一个插槽，剩下的就是一个余向量：一叠薄片。",
    "所以型把向量变成余向量。这就是为什么它的格子按 PᵀBP 变，而映射的格子按 P⁻¹AP 变。",
  ],
  // 只在中文版出现：《周髀算经》商高“勾广三，股修四，径隅五”
  gougu: [
    "《周髀算经》里，商高说：“勾广三，股修四，径隅五。”",
    "勾自乘，股自乘，相加就是弦自乘：九加十六，等于二十五。这是最古老的一个二次型。",
    "两千多年后，闵可夫斯基把其中一个加号，改成了减号。",
  ],
  squares: [
    "任何对称的型，都能用配方拆开：几个正的平方，几个负的平方，也许还有几个零。",
    "1852 年，西尔维斯特证明：不管怎么拆，正负的个数都不变。他管这叫“惯性定律”。",
  ],
  signature: [
    "所以每个型都有一个符号差。正正画出椭圆，正负画出双曲线，一正一零画出一组平行线。",
    "闵可夫斯基的时空是正、负、负、负。怎么换坐标都变不成普通的距离：光锥就是这个符号差的样子。",
  ],
  endCard: [
    "双线性型吃进两个向量、吐出一个数。它的格子按 PᵀBP 变，它的符号差永远不变。",
    "下一集：张量到底是什么，不止是“像张量一样变换的东西”。",
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
  "twoObjects",
  "machine",
  "gougu",
  "squares",
  "signature",
  "endCard",
];

export const S2E09 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { gougu: "zh" },
  season: 2,
});
