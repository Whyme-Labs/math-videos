import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E16, from lessons/s2/e16-riesz-vectors-and-covectors.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): the hiker's squashed map, arrows and stacks with no natural
// bridge, the Riesz theorem with its uniqueness proof, the arrow swinging
// when the ruler changes (r = G⁻¹a), the gradient on a 3D hill, the
// adjoint as a round trip and one that isn't the transpose, and the limit
// case: "evaluate at 0" whose representers blow up.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "twoKinds"
  | "riesz"
  | "choice"
  | "peixiu"
  | "gradient"
  | "steepest"
  | "adjoint"
  | "delta"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1907: Riesz and Fréchet, apart, prove the same theorem.",
    "A hiker's question: which way is straight uphill?",
    "Here's the hill. Its contour lines go on a map.",
    "On the map, uphill is perpendicular to the contours.",
    "Now squash the map north to south.",
    "The contours on the ground didn't move.",
    "On the squashed map, 'perpendicular' points elsewhere.",
    "So which is real: the contours, or the arrow?",
  ],
  title: ["Season two, episode sixteen. Vectors and covectors."],
  twoKinds: [
    "Two kinds of things live here. Arrows, and stacks.",
    "A stack measures an arrow: count the sheets it crosses.",
    "A basis can pair them: each arrow with its own stack.",
    "Change the basis and the pairing changes.",
    "Nothing in the space itself prefers one pairing.",
  ],
  riesz: [
    "An inner product gives a pairing. Start from an arrow v.",
    "Measure any arrow by its overlap with v: that's a stack.",
    "Sheets are perpendicular to v. Longer v, denser sheets.",
    "Riesz: every stack comes from exactly one arrow.",
    "To build it, read the stack on each orthonormal arrow.",
    "Use the readings as coordinates. That arrow is r.",
    "Why only one? Two arrows giving the same stack…",
    "…differ by an arrow perpendicular to itself. Length zero.",
  ],
  choice: [
    "Now change the ruler. Keep the stack fixed.",
    "Its unit circle squashes into an ellipse.",
    "The arrow for the same stack swings: r = G⁻¹a.",
    "For the stack (1, 1) and G = diag(1, 4): r = (1, ¼).",
    "Rows equal columns only for the dot product.",
  ],
  peixiu: [], // Chinese edition only
  gradient: [
    "Back to the hill: f = x²y. At P = (1, 2):",
    "df counts contours crossed. It's a stack: (4, 1).",
    "With the dot product it's (4, 1): the textbook gradient.",
    "With G = diag(4, 1), the arrow is (1, 1).",
    "Steepest is a choice. The climb along a step is not.",
    "That's why gradient descent tunes its ruler.",
  ],
  steepest: [
    "Why 'steepest'? Try every step of length 1.",
    "With the dot product, length-1 steps fill a circle.",
    "The climb is biggest where it touches the highest sheet.",
    "That best step points along (4, 1).",
    "Change the ruler: length-1 steps fill an ellipse.",
    "Now the best step points along (1, 1).",
  ],
  adjoint: [
    "A map A carries V to W. Watch W's grid bend.",
    "Take a stack on W. Pull it back through A.",
    "Turn it into an arrow on V. That round trip is A*.",
    "With the dot product, A* is the transpose.",
    "With G = diag(1, 4), A* is a different matrix.",
    "Check: ⟨Av, w⟩ = ⟨v, A*w⟩ holds; the transpose fails.",
  ],
  delta: [
    "Last: a stack that measures a function by its value at 0.",
    "On polynomials of degree 1, its arrow is 4 − 6x.",
    "Degree 2: 9 − 36x + 30x². Taller, sharper at 0.",
    "The lengths grow: 2, 3, 4, 5… without end.",
    "On all polynomials, no arrow exists. Riesz needs more.",
  ],
  endCard: [
    "Arrows and stacks are different things.",
    "An inner product pairs them. Every gradient depends on it.",
    "Next: the closest point. Projections and best-fit lines.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1907 年，里斯和弗雷歇各自证出同一个定理。",
    "它回答登山者的问题：哪边是笔直的上坡？",
    "这是一座山。等高线画到地图上。",
    "在地图上，上坡方向垂直于等高线。",
    "现在把地图南北压扁。",
    "地面上的等高线一动没动。",
    "可压扁的地图上，“垂直”指向了别处。",
    "那么哪个是真的：等高线，还是箭头？",
  ],
  title: ["第二季，第十六集。向量与余向量。"],
  twoKinds: [
    "这里住着两种东西：箭头，和薄片。",
    "薄片量箭头：数它穿过几张。",
    "一组基可以把它们配对：每支箭头配一叠薄片。",
    "换一组基，配对就变了。",
    "空间本身并不偏爱哪一种配对。",
  ],
  riesz: [
    "内积给出一种配对。从箭头 v 开始。",
    "用和 v 的重叠量去量任何箭头：这就是一叠薄片。",
    "薄片垂直于 v。v 越长，薄片越密。",
    "里斯：每叠薄片都恰好来自一支箭头。",
    "构造它：在每支标准正交箭头上读出薄片的值。",
    "把读数当坐标，这支箭头就是 r。",
    "为什么只有一支？若两支箭头给出同一叠薄片……",
    "……它们的差垂直于自己。长度为零。",
  ],
  choice: [
    "现在换一把尺子。薄片不动。",
    "它的单位圆被压成椭圆。",
    "同一叠薄片对应的箭头转了：r = G⁻¹a。",
    "薄片 (1, 1)，G = diag(1, 4)：r = (1, ¼)。",
    "只有点积下，行和列才一模一样。",
  ],
  // 只在中文版出现：裴秀“制图六体”
  peixiu: [
    "西晋裴秀给地图定下“制图六体”。",
    "分率、准望、道里、高下、方邪、迂直。",
    "分率一歪，图上的直角就对不上地上的直角。",
    "可等高线穿过几条，不会因比例改变。",
  ],
  gradient: [
    "回到山上：f = x²y。在 P = (1, 2)：",
    "df 数穿过的等高线，是一叠薄片：(4, 1)。",
    "用点积，它的箭头是 (4, 1)：课本上的梯度。",
    "用 G = diag(4, 1)，箭头是 (1, 1)。",
    "哪边最陡是一种选择；沿一步升高多少却不是。",
    "所以梯度下降要调它的尺子。",
  ],
  steepest: [
    "为什么叫“最陡”？把长度为 1 的步子都试一遍。",
    "用点积，长度为 1 的步子铺成一个圆。",
    "升高最多的那一步，碰到最高的那张薄片。",
    "这最好的一步指向 (4, 1)。",
    "换一把尺：长度为 1 的步子铺成椭圆。",
    "现在最好的一步指向 (1, 1)。",
  ],
  adjoint: [
    "映射 A 把 V 送到 W。看 W 的网格弯过去。",
    "在 W 上取一叠薄片，沿 A 拉回来。",
    "再变成 V 上的箭头。这一圈就是 A*。",
    "用点积时，A* 就是转置。",
    "用 G = diag(1, 4)，A* 是另一个矩阵。",
    "验算：⟨Av, w⟩ = ⟨v, A*w⟩ 成立；转置不成立。",
  ],
  delta: [
    "最后：一叠按函数在 0 处的值去量的薄片。",
    "在一次多项式上，它的箭头是 4 − 6x。",
    "二次：9 − 36x + 30x²。更高，更尖。",
    "长度一路涨：2、3、4、5……没有尽头。",
    "在所有多项式上，箭头不存在。里斯还需要更多条件。",
  ],
  endCard: [
    "箭头和薄片是两种东西。",
    "内积把它们配成对。每支梯度都取决于它。",
    "下一集：最近的那一点。投影，与最贴合的直线。",
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
  coldOpen: { 0: 4.5, 1: 3.5, 2: 6, 3: 4.5, 4: 4.5, 5: 3.5, 6: 5.5, 7: 4 },
  twoKinds: { 0: 4, 1: 5, 2: 4.5, 3: 5, 4: 3.5 },
  riesz: { 0: 3.5, 1: 4.5, 2: 5.5, 3: 5, 4: 5, 5: 5, 6: 4, 7: 5 },
  choice: { 0: 3.5, 1: 4, 2: 5, 3: 4.5, 4: 4 },
  peixiu: { 0: 4, 1: 4.5, 2: 5, 3: 5 },
  gradient: { 0: 5, 1: 4.5, 2: 4.5, 3: 4.5, 4: 6, 5: 4 },
  steepest: { 0: 4, 1: 4.5, 2: 5.5, 3: 4, 4: 5, 5: 5 },
  adjoint: { 0: 4.5, 1: 5.5, 2: 5.5, 3: 4, 4: 5, 5: 5.5 },
  delta: { 0: 4.5, 1: 5, 2: 5.5, 3: 6, 4: 5 },
  endCard: { 0: 4, 1: 4.5, 2: 5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "twoKinds",
  "riesz",
  "choice",
  "peixiu",
  "gradient",
  "steepest",
  "adjoint",
  "delta",
  "endCard",
];

export const S2E16 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { peixiu: "zh" },
  season: 2,
  captions: "large",
});
