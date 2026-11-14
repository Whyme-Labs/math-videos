import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E32, from lessons/s2/e32-measure-preserving-systems.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): stirring coffee, the doubling map, measure-preserving maps,
// Poincaré recurrence, the Koopman operator, ergodicity and mixing as
// spectral facts, the mean ergodic theorem, and Weyl equidistribution.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "doubling"
  | "preserve"
  | "recurrence"
  | "metonic"
  | "koopman"
  | "spectrum"
  | "mean"
  | "weyl"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Stir cream into coffee. The swirl is pure chaos.",
    "Two drops a hair apart end up across the cup.",
    "But stirring never makes or destroys coffee.",
    "Every region keeps its area, however it's stretched.",
    "Poincaré: almost every drop comes back near its start.",
    "And the cream can spread out perfectly evenly.",
    "Koopman: stop following drops. Follow measurements.",
    "Chaos on points becomes a linear map on functions.",
  ],
  title: ["Season two, episode thirty-two. Chaos, made linear."],
  doubling: [
    "The doubling map: x ↦ 2x mod 1.",
    "In binary, it just deletes the first digit.",
    "Every step, the digits slide one place left.",
    "Two points agreeing to 50 digits split after 50 steps.",
    "Deterministic, yet unpredictable. So ask about averages.",
  ],
  preserve: [
    "Measure-preserving: μ(T⁻¹A) = μ(A) for every set A.",
    "Rotation by α: a shifted arc has the same length.",
    "Doubling: an arc's preimage is two half-arcs. Same sum.",
    "Forward images can grow; preimages keep the measure.",
    "Cat map (2x + y, x + y) mod 1: det 1, area kept.",
    "It stretches by 2.618 and squeezes by 0.382.",
  ],
  recurrence: [
    "Poincaré recurrence: almost every point of A returns.",
    "Let B be the points of A that never come back.",
    "B, T⁻¹B, T⁻²B, … are disjoint, all the same size.",
    "Infinitely many equal pieces fit in measure 1 only if 0.",
    "So μ(B) = 0. The cream comes back.",
  ],
  metonic: [], // Chinese edition only
  koopman: [
    "Koopman, 1931: Uf = f ∘ T, the reading one step later.",
    "U is linear, however wild T is.",
    "If T preserves measure, U is an isometry: ‖Uf‖ = ‖f‖.",
    "Doubling sends each tone eₖ to e₂ₖ.",
    "Odd tones are never hit: an isometry, not onto.",
    "The right shift from Episode 31, hiding in chaos.",
  ],
  spectrum: [
    "U1 = 1: constants are always invariant.",
    "Ergodic: no invariant set except null or full.",
    "Ergodic ⟺ the eigenvalue 1 is simple.",
    "Rotation: every tone eₖ is an eigenvector of U.",
    "α irrational: only k = 0 is fixed, so it's ergodic.",
    "Mixing kills eigenvectors: the spectrum goes continuous.",
  ],
  mean: [
    "Von Neumann: average f, Uf, U²f, …, Uᴺ⁻¹f.",
    "Split H: invariant vectors, and differences Ug − g.",
    "On invariant vectors, averaging changes nothing.",
    "On Ug − g it telescopes: (Uᴺg − g)/N → 0.",
    "So averages → the projection. Ergodic: the mean of f.",
  ],
  weyl: [
    "Weyl: the points nα mod 1 fill the circle evenly.",
    "The share landing in [a, b] tends to b − a.",
    "Each tone averages to 0: a geometric series.",
    "Order and chaos, read off one operator's spectrum.",
  ],
  endCard: [
    "Stirring is chaos. On functions, it's an isometry.",
    "Recurrence, ergodicity, mixing: all spectral facts.",
    "Next, the finale: distributions.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "往咖啡里倒奶，搅一下。漩涡一片混乱。",
    "两滴挨得极近的奶，最后跑到杯子两头。",
    "可搅拌不会凭空多出或少掉咖啡。",
    "每块区域被拉被挤，面积都不变。",
    "庞加莱：几乎每滴奶都会回到起点附近。",
    "奶还可能散得均匀无比。",
    "库普曼：别追着奶滴跑，去追测量值。",
    "点上的混沌，变成函数上的线性映射。",
  ],
  title: ["第二季，第三十二集。线性代数遇上混沌。"],
  doubling: [
    "倍增映射：x ↦ 2x mod 1。",
    "写成二进制，它只是删掉第一位。",
    "每走一步，数字整体左移一位。",
    "前 50 位相同的两个点，50 步后就分道扬镳。",
    "完全确定，却无法预测。那就问平均。",
  ],
  preserve: [
    "保测：对每个集合 A，μ(T⁻¹A) = μ(A)。",
    "转动 α：弧平移一下，长度不变。",
    "倍增：一段弧的原像是两段半弧，总长不变。",
    "正像可以变大，原像保持测度。",
    "猫映射 (2x + y, x + y)：行列式 1，面积不变。",
    "它一个方向拉长 2.618 倍，另一个压到 0.382。",
  ],
  recurrence: [
    "庞加莱回归：A 里几乎每个点都会回来。",
    "设 B 是 A 里永远不回来的点。",
    "B、T⁻¹B、T⁻²B……两两不交，一样大。",
    "无穷多块一样大的塞进测度 1，只能是 0。",
    "所以 μ(B) = 0。奶滴会回来。",
  ],
  // 只在中文版出现：《周髀算经》“十九岁为一章”（十九年七闰）
  metonic: [
    "《周髀算经》：“十九岁为一章”，一章七闰。",
    "一年约 12.368 个朔望月，不是整数。",
    "每年月相错开 0.368 圈：就是圆上的转动。",
    "十九年后几乎回到原处：这就是回归。",
  ],
  koopman: [
    "库普曼，1931：Uf = f ∘ T，下一步的测量值。",
    "不管 T 多狂野，U 都是线性的。",
    "T 保测，U 就是等距：‖Uf‖ = ‖f‖。",
    "倍增把每个纯音 eₖ 送到 e₂ₖ。",
    "奇数纯音永远打不到：等距，却不满。",
    "第 31 集的右移，藏在混沌里。",
  ],
  spectrum: [
    "U1 = 1：常数永远不变。",
    "遍历：不变集要么零测，要么满测。",
    "遍历 ⟺ 特征值 1 是单重的。",
    "转动：每个纯音 eₖ 都是 U 的特征向量。",
    "α 无理：只有 k = 0 不动，所以遍历。",
    "混合会消灭特征向量：谱变成连续的。",
  ],
  mean: [
    "冯·诺依曼：把 f、Uf、U²f……Uᴺ⁻¹f 平均。",
    "把 H 拆开：不变向量，和差 Ug − g。",
    "对不变向量，平均什么也不改。",
    "对 Ug − g，求和相消：(Uᴺg − g)/N → 0。",
    "所以平均 → 投影。遍历时就是 f 的均值。",
  ],
  weyl: [
    "外尔：点 nα mod 1 均匀铺满圆周。",
    "落在 [a, b] 里的比例趋于 b − a。",
    "每个纯音平均下来是 0：几何级数。",
    "有序和混沌，都写在一个算子的谱上。",
  ],
  endCard: [
    "搅拌是混沌，作用在函数上却是等距。",
    "回归、遍历、混合：全是谱的事实。",
    "下一集，季终：广义函数。",
  ],
};

export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  title: { 0: 3 },
  coldOpen: { 0: 6, 1: 6, 2: 5.5, 3: 6, 4: 6.5, 5: 6, 6: 5.5, 7: 6 },
  doubling: { 0: 6, 1: 6, 2: 6, 3: 6.5, 4: 5.5 },
  preserve: { 0: 5.5, 1: 6, 2: 6.5, 3: 5.5, 4: 6, 5: 6.5 },
  recurrence: { 0: 5.5, 1: 6, 2: 6.5, 3: 6.5, 4: 5.5 },
  metonic: { 0: 6, 1: 6, 2: 6, 3: 6.5 },
  koopman: { 0: 6, 1: 5.5, 2: 6, 3: 6.5, 4: 6, 5: 5.5 },
  spectrum: { 0: 5.5, 1: 6, 2: 5.5, 3: 6, 4: 6.5, 5: 6.5 },
  mean: { 0: 6, 1: 6, 2: 5.5, 3: 6.5, 4: 6 },
  weyl: { 0: 6.5, 1: 6, 2: 6, 3: 5.5 },
  endCard: { 0: 5, 1: 5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "doubling",
  "preserve",
  "recurrence",
  "metonic",
  "koopman",
  "spectrum",
  "mean",
  "weyl",
  "endCard",
];

export const S2E32 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { metonic: "zh" },
  season: 2,
  captions: "large",
});
