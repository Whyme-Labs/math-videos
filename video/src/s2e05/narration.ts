import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E05, condensed from lessons/s2/e05-building-new-spaces.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "sum"
  | "complement"
  | "quotient"
  | "ganzhi"
  | "plusC"
  | "hom"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "An exam hall. A student finds the antiderivative of 2x, writes x squared, and the teacher circles it in red: you forgot plus C.",
    "Because x squared, x squared plus 7 and x squared minus pi all have the same derivative. The answer is a whole family of curves.",
    "So stop fighting it. Declare the whole family to be one object: glue it into a single point.",
    "Season one built the integers, the fractions and clock arithmetic by gluing. Today gluing builds new vector spaces.",
  ],
  title: ["Season two, episode five. Building new spaces."],
  sum: [
    "Two lines through the origin. Their union isn't a space: add an arrow from each and you land on neither line.",
    "The fix is the sum: every arrow of one plus every arrow of the other. Two different lines sum to the whole plane.",
  ],
  complement: [
    "Split the plane along the x axis and one other line, and every arrow breaks into a piece on each. But which other line?",
    "Swing it, and the pieces change. Every choice works, and no choice is the right one.",
  ],
  quotient: [
    "So don't choose. Glue together everything that differs by a step along the axis: each horizontal line becomes one point.",
    "What's left is a line of points, one for each height. That's the quotient: the plane modulo the axis.",
    "Add two points by adding any arrows from their lines. Whichever arrows you pick, the sum lands on the same line.",
  ],
  ganzhi: [], // Chinese edition only
  plusC: [
    "Now the exam. Differentiation can't tell x squared from x squared plus 7: it crushes the constants. They're its kernel.",
    "Glue the kernel away and nothing gets crushed. On polynomials modulo constants, differentiation can be undone.",
    "Undo it on 2x and you land on the whole family, x squared plus C. The plus C was never sloppiness. It's a point of the quotient.",
  ],
  hom: [
    "One more. Linear maps can be added and scaled too, so the maps themselves form a vector space.",
    "Maps from the plane into space are 3 by 2 matrices: six dials, so six dimensions, and each map is a single point.",
  ],
  endCard: [
    "Sums, splits, quotients and spaces of maps: new spaces from old. The quotient is the one that needs no choice.",
    "Next episode: maps to plain numbers. Measuring devices get a space of their own, and a picture of their own.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "考场上，一个学生求 2x 的原函数，写下 x²。老师用红笔一圈：漏了 +C。",
    "因为 x²、x² + 7、x² − π 的导数都一样。答案不是一条曲线，而是一整族。",
    "那就别跟它较劲。干脆宣布这一整族是同一个东西：粘成一个点。",
    "第一季里，整数、分数、钟面算术都是这样粘出来的。今天要粘出新的向量空间。",
  ],
  title: ["第二季，第五集。造新的空间。"],
  sum: [
    "两条过原点的直线。它们的并集不是空间：各取一支箭头相加，结果哪条线上都不在。",
    "补救的办法是和：一条线上的箭头加另一条线上的箭头，全都算上。两条不同的直线，加起来就是整个平面。",
  ],
  complement: [
    "沿着 x 轴和另一条直线把平面拆开，每支箭头都分成两段，各在一条线上。可另一条线选哪条？",
    "把它转一转，两段就跟着变。选哪条都行，哪条也不是“对”的那条。",
  ],
  quotient: [
    "那就不选。凡是沿 x 轴方向相差一步的，都粘在一起：每条水平线变成一个点。",
    "剩下的是一列点，一个高度一个点。这就是商空间：平面模掉 x 轴。",
    "两个点相加，就从它们的线上随便取箭头相加。不管取哪两支，和都落在同一条线上。",
  ],
  // 只在中文版出现：干支纪年，六十年一轮
  ganzhi: [
    "“粘”这件事，古人天天在做。干支纪年，六十年一轮。",
    "1984 年是甲子年，2044 年也是甲子年：相差六十的年份，粘成同一个名字。商代甲骨上就刻着完整的六十干支表。",
    "这是第一季的模运算。今天要粘的不是年份，是向量。",
  ],
  plusC: [
    "回到考场。求导分不清 x² 和 x² + 7：常数全被压成零。常数就是它的核。",
    "把核粘掉，就再没有东西被压扁。在“多项式模常数”上，求导可以倒回去。",
    "对 2x 倒回去，落到的是一整族 x² + C。+C 从来不是马虎，它就是商空间里的一个点。",
  ],
  hom: [
    "再造一个。线性映射也能相加、能伸缩，所以映射本身组成一个向量空间。",
    "从平面到空间的映射，就是 3 × 2 的矩阵：六个旋钮，六维。每个映射只是其中一个点。",
  ],
  endCard: [
    "和、拆分、商、映射的空间：用旧空间造新空间。其中只有商，不需要做任何选择。",
    "下一集：映到普通数的映射。测量仪器有了自己的空间，也有了自己的样子。",
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
  "sum",
  "complement",
  "quotient",
  "ganzhi",
  "plusC",
  "hom",
  "endCard",
];

export const S2E05 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { ganzhi: "zh" },
  season: 2,
});
