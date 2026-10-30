import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E07, condensed from lessons/s2/e07-functionals-everywhere.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "probes"
  | "coords"
  | "lagrange"
  | "liuzhuo"
  | "simpson"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Linz, autumn 1613. Johannes Kepler buys wine for his wedding, and the merchant prices each barrel by poking one rod through the bung hole.",
    "One reading for a whole curved barrel? Kepler doesn't trust it, and he writes a book on measuring barrels.",
    "The rule now named after him measures the two ends and the middle, and weighs them one sixth, four sixths, one sixth.",
    "It's exact for parabolas, which makes sense: three readings, three numbers. But it's also exact for cubics. How?",
  ],
  title: ["Season two, episode seven. Functionals everywhere."],
  probes: [
    "Take a curve and ask it questions: its value at 0, its slope at 1, the area under it. Each question returns a number.",
    "And each respects adding and scaling: the area under f plus g is the area under f plus the area under g. They're all covectors.",
  ],
  coords: [
    "Measure a parabola at 0, 1 and 2. Three readings pin it down: three probes are a basis of the measurements.",
    "Swap in different probes, the value, slope and half the curvature at 0, and the readings change. The parabola doesn't.",
  ],
  lagrange: [
    "Each probe has a partner parabola that reads 1 at its own point and 0 at the other two. These are the Lagrange polynomials.",
    "For a parabola through any three values, weight the partners by the values and add. Interpolation is a change of basis.",
  ],
  liuzhuo: [], // Chinese edition only
  simpson: [
    "Now Kepler's rule. Area is one more measurement, so on parabolas it's a mix of the three values: one sixth, four sixths, one sixth.",
    "Add a cubic centred on the middle. Its two lobes cancel, so its area is 0, and the probes read minus, 0, plus: also 0.",
    "Both measurements are blind to that direction, so they agree on every cubic. Symmetry bought a degree for free.",
  ],
  endCard: [
    "Values, slopes, areas: measurements of functions, each one a mix of the others. Interpolation and quadrature are one idea.",
    "Next episode: every linear map pulls measurements back. That's what the transpose really is.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1613 年秋，林茨。开普勒为婚礼买酒，酒商估一桶酒，只把一根量杆从桶口插进去读一下。",
    "一个读数，就定下一整只弯弯的酒桶？开普勒不信，干脆写了一本讲量酒桶的书。",
    "如今以他命名的“酒桶法则”，量两头和正中三处，按六分之一、六分之四、六分之一加权。",
    "对抛物线它是精确的，这说得通：三个读数，三个系数。可它对三次曲线也精确。为什么？",
  ],
  title: ["第二季，第七集。无处不在的泛函。"],
  probes: [
    "拿一条曲线，问它几个问题：在 0 处的值，在 1 处的斜率，曲线下的面积。每个问题都答一个数。",
    "而且都尊重加法和数乘：f + g 下的面积，等于 f 下的面积加 g 下的面积。它们全是余向量。",
  ],
  coords: [
    "在 0、1、2 三处量一条抛物线。三个读数就把它定死了：三个探针是测量的一组基。",
    "换一组探针，量 0 处的值、斜率、曲率的一半，读数就变了。抛物线没变。",
  ],
  lagrange: [
    "每个探针都有一条搭档抛物线，在自己的点读 1，在另外两点读 0。这就是拉格朗日多项式。",
    "要过任意三个值的抛物线，就按这三个值给搭档加权再相加。插值就是换基。",
  ],
  // 只在中文版出现：刘焯《皇极历》的二次内插
  liuzhuo: [
    "隋代刘焯编《皇极历》，公元 600 年成书。他要算日月在两次观测之间走到了哪里。",
    "他用三个等距时刻的数据配出一条二次曲线，再读中间的值：这就是二次内插。",
    "三个读数定一条抛物线，正是刚才的拉格朗日基。只是那时没人叫它对偶基。",
  ],
  simpson: [
    "回到开普勒的法则。面积又是一种测量，所以在抛物线上，它是三个值的组合：六分之一、六分之四、六分之一。",
    "再加一条以正中为中心的三次曲线。它的两瓣正负抵消，面积是 0；三个探针读到负、0、正，加权后也是 0。",
    "两种测量都看不见这个方向，所以对每条三次曲线都一致。对称白送了一次方。",
  ],
  endCard: [
    "取值、斜率、面积：都是对函数的测量，每一个都是其余的组合。插值和数值积分，是同一个想法。",
    "下一集：每个线性映射都把测量拉回去。这才是转置的真面目。",
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
  "probes",
  "coords",
  "lagrange",
  "liuzhuo",
  "simpson",
  "endCard",
];

export const S2E07 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { liuzhuo: "zh" },
  season: 2,
});
