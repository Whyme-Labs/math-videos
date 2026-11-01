import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E16, condensed from lessons/s2/e16-riesz-vectors-and-covectors.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "riesz"
  | "choice"
  | "peixiu"
  | "gradient"
  | "adjoint"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1907. Frigyes Riesz, a schoolteacher in Hungary, and Maurice Fréchet in Paris publish the same theorem in the same year.",
    "It answers a question every hiker meets: which way is straight uphill? On the map, walk perpendicular to the contour lines.",
    "But squash the map north to south, and perpendicular points somewhere else on the ground. The contour lines didn't change. The arrow did.",
    "So which is real, the stack of contours or the uphill arrow? Today: the exact moment a stack becomes an arrow.",
  ],
  title: ["Season two, episode sixteen. Vectors and covectors."],
  riesz: [
    "An inner product turns every arrow v into a stack: measure any arrow by its overlap with v. The sheets stand perpendicular to v.",
    "And every stack comes from exactly one arrow. That's the Riesz theorem: once you've chosen a ruler, arrows and stacks match one to one.",
  ],
  choice: [
    "Change the inner product and the stack stays put, but the arrow that stands for it swings to the new perpendicular.",
    "The stack was the real thing all along. The arrow is the stack, seen through your choice of ruler.",
  ],
  peixiu: [], // Chinese edition only
  gradient: [
    "Now the gradient. The derivative df is a stack: it counts contours crossed. To turn it into an arrow you need a ruler.",
    "With the ordinary dot product you get the textbook gradient. With another ruler, another arrow. Steepest is a choice; how much you climb is not.",
  ],
  adjoint: [
    "And the transpose finally makes sense. Pull a measurement back through a map, then turn it into an arrow again. That round trip is the adjoint.",
    "With the dot product the adjoint is the transpose. Change the ruler and it's a different matrix: symmetric only means something once you've chosen how to measure.",
  ],
  endCard: [
    "Arrows and stacks are different things. A ruler pairs them up, and every gradient arrow depends on that choice.",
    "Next episode: the closest point. Projections, and the line that best fits a cloud of data.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1907 年。匈牙利的中学教师里斯，和巴黎的弗雷歇，在同一年发表了同一个定理。",
    "它回答每个登山者都会遇到的问题：哪边是笔直的上坡？在地图上，就是垂直于等高线走。",
    "可把地图南北方向压扁，“垂直”在地面上就指向别处了。等高线没变，变的是那支箭头。",
    "那么哪个才是真的，那叠等高线，还是那支上坡箭头？今天讲一叠薄片变成一支箭头的那一刻。",
  ],
  title: ["第二季，第十六集。向量与余向量。"],
  riesz: [
    "内积能把每支箭头 v 变成一叠薄片：用和 v 的重叠量去量任何箭头。这些薄片垂直于 v。",
    "反过来，每叠薄片都恰好来自一支箭头。这就是里斯定理：选定一把尺子，箭头和薄片就一一对应。",
  ],
  choice: [
    "换一个内积，那叠薄片不动，代表它的箭头却转向新的“垂直”。",
    "真正的东西从来是那叠薄片。箭头只是透过你选的尺子看到的薄片。",
  ],
  // 只在中文版出现：裴秀“制图六体”
  peixiu: [
    "西晋裴秀给地图定下“制图六体”：分率、准望、道里、高下、方邪、迂直。",
    "“分率”是比例尺，“准望”是方位。比例一歪，图上的直角和地上的直角就对不上了。",
    "等高线数的是穿过几条，不怕比例；“哪边最陡”的箭头，却要看你怎么画图。",
  ],
  gradient: [
    "现在看梯度。导数 df 是一叠薄片：它数穿过了几条等高线。要把它变成箭头，得有一把尺子。",
    "用普通的点积，得到课本上的梯度；换一把尺，就是另一支箭头。哪边最陡是一种选择；升高多少却不是。",
  ],
  adjoint: [
    "转置也终于讲通了。把一个测量沿映射拉回来，再变回箭头：这一圈就是伴随。",
    "用点积时，伴随就是转置。换一把尺，它就是另一个矩阵：“对称”只有在选定怎么量之后才有意义。",
  ],
  endCard: [
    "箭头和薄片是两种东西。尺子把它们配成对，每一支梯度箭头都取决于这个选择。",
    "下一集：最近的那一点。投影，以及最贴合一团数据的那条直线。",
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
  "riesz",
  "choice",
  "peixiu",
  "gradient",
  "adjoint",
  "endCard",
];

export const S2E16 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { peixiu: "zh" },
  season: 2,
});
