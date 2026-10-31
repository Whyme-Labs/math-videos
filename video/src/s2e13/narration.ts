import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E13, condensed from lessons/s2/e13-jordan-form.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "shear"
  | "zugeng"
  | "ladder"
  | "blocks"
  | "damping"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Paris, 1870. Camille Jordan publishes a treatise on substitutions, 667 pages long, and in it a simplest form for every linear map.",
    "In 1874 Leopold Kronecker attacks it in public. Weierstrass had the same classification back in 1868, he says, and did it properly.",
    "The quarrel is over what's left when last episode's trick fails: when a map doesn't have enough eigenvectors.",
    "And it fails on something as ordinary as a deck of cards.",
  ],
  title: ["Season two, episode thirteen. When diagonalization fails."],
  shear: [
    "Push a deck of cards sideways: that's a shear. Horizontal arrows stay put, with eigenvalue 1. We need a second eigen-direction.",
    "There isn't one. Every other arrow tilts. The eigenvalue 1 counts twice, but it owns only one line.",
  ],
  zugeng: [], // Chinese edition only
  ladder: [
    "Look at S minus the identity instead. It sends the vertical arrow to the horizontal one, and the horizontal one to zero.",
    "So the vertical arrow is an eigenvector after two steps: a generalized eigenvector. Together the two make a little ladder.",
  ],
  blocks: [
    "Jordan's theorem: on a complex space every map splits into blocks, each with one eigenvalue down the diagonal and ones just above it.",
    "The ones are the nudge. They push each rung of a ladder down one step until it falls to zero. Diagonal, plus a little push.",
  ],
  damping: [
    "Here's where it shows up. A damped spring: too little damping and it swings, too much and it creeps. Two eigen-directions either way.",
    "At the exact balance the two eigenvalues merge, the matrix becomes a Jordan block, and a new term appears: t times e to the minus t. Engineers call it critical damping.",
  ],
  endCard: [
    "When a map has too few eigenvectors, it's diagonal plus a nudge. That's the Jordan form, the map's complete fingerprint.",
    "Next episode: a ruler for vectors. Lengths, angles, and what perpendicular really means.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1870 年，巴黎。若尔当出版了一部论置换的著作，667 页，书里给出了每个线性映射的最简形式。",
    "1874 年，克罗内克公开发难：魏尔斯特拉斯 1868 年就有了同样的分类，而且做得更地道。",
    "争的是上一集的招数失灵之后还剩下什么：当一个映射的特征向量不够用的时候。",
    "而它失灵的地方，平常得就像一叠纸牌。",
  ],
  title: ["第二季，第十三集。对角化失灵的时候。"],
  shear: [
    "把一叠纸牌往旁边一推：这是剪切。水平的箭头不动，特征值是 1。我们还需要第二个特征方向。",
    "没有了。其余的箭头全都歪了。特征值 1 算了两重，却只占着一条直线。",
  ],
  // 只在中文版出现：祖暅原理“幂势既同，则积不容异”
  zugeng: [
    "推一叠纸牌，中国古人早有说法。南朝祖暅说：“幂势既同，则积不容异。”",
    "每一层截面一样大，体积就一样大。一叠牌推歪了，体积不变：剪切的行列式是 1。",
    "可体积不变，不等于方向够用。剪切留给我们的特征方向，只有一条。",
  ],
  ladder: [
    "换个角度，看 S 减去单位映射。它把竖直箭头送到水平箭头，再把水平箭头送到零。",
    "所以竖直箭头是走两步才成的特征向量：广义特征向量。两支箭头搭成一架小梯子。",
  ],
  blocks: [
    "若尔当定理：在复空间上，每个映射都能拆成一块一块，每块对角线上是同一个特征值，紧挨着上面是一串 1。",
    "这些 1 就是那一推：把梯子的每一级往下推一格，直到掉到零。对角，再加一点推。",
  ],
  damping: [
    "它在哪儿出现？阻尼弹簧：阻尼太小就来回摆，太大就慢慢爬回去。两种情形都有两个特征方向。",
    "恰好平衡时，两个特征值合二为一，矩阵变成一个若尔当块，冒出一个新项：t 乘 e 的负 t 次方。工程师管这叫临界阻尼。",
  ],
  endCard: [
    "映射的特征向量不够时，它就是对角再加一推。这就是若尔当标准形，映射完整的指纹。",
    "下一集：给向量一把尺子。长度、角度，以及“垂直”到底是什么意思。",
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
  "shear",
  "zugeng",
  "ladder",
  "blocks",
  "damping",
  "endCard",
];

export const S2E13 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zugeng: "zh" },
  season: 2,
});
