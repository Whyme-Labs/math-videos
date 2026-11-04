import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E25, from lessons/s2/e25-hahn-banach.md, on the new
// standard (about five minutes, one-line captions, the visuals explain):
// the "limit" of 1, 0, 1, 0, …, extending a functional without letting it
// grow, the one-step interval and the role of the ball's corners, Zorn's
// lemma, norming functionals and the norm as a best reading, separation
// of convex sets (and the circle that can't be separated), SVMs and LP
// duality, and the Banach limit. Each line is one caption and one cue;
// MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "naive"
  | "extend"
  | "zorn"
  | "corollaries"
  | "separation"
  | "honggou"
  | "banachLimit"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "What is the limit of 1, 0, 1, 0, 1, 0, …?",
    "Calculus says there isn't one. It never settles.",
    "But if you had to pick one number, you'd say ½.",
    "And for 1, 0, 0, 1, 0, 0, …, you'd say ⅓.",
    "Can we make that official, for every bounded sequence?",
    "Banach proved in 1932 that we can.",
    "But nobody has ever written one down, and nobody will.",
    "Today: proof that enough measurements exist.",
  ],
  title: ["Season two, episode twenty-five. The Hahn–Banach theorem."],
  naive: [
    "f measures a subspace M. Can we extend it to X?",
    "Here M is a line, and f reads the position along it.",
    "Any F(x, y) = x + c·y agrees with f on M.",
    "In infinite dimensions, a Hamel basis does the same job.",
    "But the extensions it builds are usually monsters.",
    "We want one that stays continuous: no bigger norm.",
  ],
  extend: [
    "Hahn–Banach: f always extends with the same norm.",
    "Add one direction z. All we choose is c = F(z).",
    "The rules squeeze c between a sup and an inf.",
    "The triangle inequality says the gap never closes.",
    "On the ℓ¹ diamond, every c from −1 to 1 works.",
    "On the round disc, only c = 0. One tangent line.",
  ],
  zorn: [
    "One direction at a time, but X has endless directions.",
    "Order the partial extensions. Each chain has a top.",
    "Zorn's lemma gives a biggest one. It must be all of X.",
    "Zorn is the Axiom of Choice in disguise. Remember that.",
  ],
  corollaries: [
    "Now the payoff. Take any vector, say x₀ = (3, −4).",
    "Some f with norm 1 reads its full length: f(x₀) = ‖x₀‖.",
    "In ℓ², f = (3/5, −4/5) reads 5.",
    "In ℓ¹, f = (1, −1) reads 7.",
    "So the norm is the best reading: ‖x‖ = max |f(x)|.",
    "And if x ≠ y, some measurement tells them apart.",
  ],
  separation: [
    "Geometric form: a convex set and a point outside it.",
    "A hyperplane slides in between: a level set of f.",
    "A closed convex set is all its half-planes put together.",
    "Without convexity it fails: a circle and its centre.",
    "Every line through the centre cuts the circle.",
    "Support vector machines look for the widest such gap.",
    "In LP, prices ⅖ and ⅕ prove that 14/5 is the best.",
  ],
  honggou: [], // Chinese edition only
  banachLimit: [
    "Back to 1, 0, 1, 0, … Average the first n terms.",
    "Let p(x) be the top value those averages keep hitting.",
    "Extend lim, staying under p: that's a Banach limit L.",
    "L ignores a shift, so L(x) + L(Sx) = L(1, 1, 1, …) = 1.",
    "So L(x) = ½, and 1, 0, 0, 1, 0, 0, … gets ⅓.",
    "But L needs Zorn. No formula for it will ever exist.",
  ],
  endCard: [
    "There are always enough continuous measurements.",
    "They extend, read the norm and separate convex sets.",
    "Next: the big three theorems of Banach spaces.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1, 0, 1, 0, 1, 0, … 的极限是多少？",
    "微积分说：没有。它永远定不下来。",
    "可要是非得给一个数，你会说 ½。",
    "1, 0, 0, 1, 0, 0, … 呢？你会说 ⅓。",
    "能不能把它正式化，对每个有界数列都成立？",
    "巴拿赫在 1932 年证明了：能。",
    "可没人写出过一个，以后也不会有人写出来。",
    "今天：保证测量够用的那个定理。",
  ],
  title: ["第二季，第二十五集。哈恩–巴拿赫定理。"],
  naive: [
    "子空间 M 上有个测量 f，想把它延拓到 X。",
    "这里 M 是一条直线，f 读出沿线的位置。",
    "任何 F(x, y) = x + c·y 在 M 上都和 f 一样。",
    "在无限维里，哈默尔基也能这样做。",
    "可它造出来的延拓，通常是怪物。",
    "我们要的是连续的延拓：范数不变大。",
  ],
  extend: [
    "哈恩–巴拿赫：f 总能保持范数不变地延拓。",
    "加一个方向 z，要选的只有 c = F(z)。",
    "条件把 c 夹在一个上确界和一个下确界之间。",
    "三角不等式保证：中间的空隙不会合上。",
    "在 ℓ¹ 的菱形上，−1 到 1 之间的 c 都行。",
    "在圆盘上，只有 c = 0：只有一条切线。",
  ],
  zorn: [
    "一次加一个方向，可 X 的方向无穷无尽。",
    "把部分延拓排好序，每条链都有上界。",
    "佐恩引理给出一个最大的，它必定是整个 X。",
    "佐恩引理就是换了装的选择公理。记住这一点。",
  ],
  corollaries: [
    "收获来了。随便取一个向量，比如 x₀ = (3, −4)。",
    "有个范数为 1 的 f，读出它的全长：f(x₀) = ‖x₀‖。",
    "在 ℓ² 里，f = (3/5, −4/5)，读数 5。",
    "在 ℓ¹ 里，f = (1, −1)，读数 7。",
    "所以范数就是最好的读数：‖x‖ = max |f(x)|。",
    "而且只要 x ≠ y，总有测量能把它们分开。",
  ],
  separation: [
    "几何形式：一个凸集，和它外面的一个点。",
    "一个超平面滑进两者之间：它是 f 的等值面。",
    "闭凸集就是包住它的所有半平面的交。",
    "不凸就不行：一个圆周和它的圆心。",
    "过圆心的每条直线都会切到圆周。",
    "支持向量机找的，就是最宽的那条缝。",
    "线性规划里，价格 ⅖ 和 ⅕ 证明了最优值是 14/5。",
  ],
  // 只在中文版出现：鸿沟（《史记·项羽本纪》）
  honggou: [
    "公元前 203 年，楚汉相争，约定以鸿沟为界。",
    "《史记》：“割鸿沟以西者为汉，鸿沟而东者为楚。”",
    "两边的地盘各自连成一片，一条线就能分开。",
    "分离定理说：两个凸集之间，总有一条鸿沟。",
  ],
  banachLimit: [
    "回到 1, 0, 1, 0, …，把前 n 项取平均。",
    "让 p(x) 等于这些平均值反复能达到的最高值。",
    "哈恩–巴拿赫把 lim 延拓到 p 之下：巴拿赫极限 L。",
    "L 不在乎平移，所以 L(x) + L(Sx) = 1。",
    "所以 L(x) = ½；1, 0, 0, 1, 0, 0, … 得 ⅓。",
    "可 L 要靠佐恩引理。它永远不会有公式。",
  ],
  endCard: [
    "连续的测量，永远够用。",
    "它们能延拓，能读出范数，能分开凸集。",
    "下一集：巴拿赫空间的三大定理。",
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
  coldOpen: { 0: 5.5, 1: 5, 2: 5.5, 3: 5.5, 4: 5, 5: 5, 6: 5.5, 7: 5 },
  naive: { 0: 5.5, 1: 5, 2: 6, 3: 5, 4: 5.5, 5: 5 },
  extend: { 0: 5, 1: 5.5, 2: 6, 3: 5.5, 4: 6, 5: 6 },
  zorn: { 0: 5, 1: 6, 2: 6, 3: 5 },
  corollaries: { 0: 5, 1: 5.5, 2: 5.5, 3: 5.5, 4: 5.5, 5: 5 },
  separation: { 0: 5, 1: 5.5, 2: 6, 3: 5, 4: 5.5, 5: 6, 6: 6.5 },
  honggou: { 0: 5.5, 1: 5.5, 2: 5.5, 3: 5 },
  banachLimit: { 0: 5.5, 1: 5.5, 2: 5.5, 3: 6, 4: 5.5, 5: 5 },
  endCard: { 0: 4.5, 1: 5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "naive",
  "extend",
  "zorn",
  "corollaries",
  "separation",
  "honggou",
  "banachLimit",
  "endCard",
];

export const S2E25 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { honggou: "zh" },
  season: 2,
  captions: "large",
});
