import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S3E01, from lessons/s3/e01-fields-as-vector-spaces.md, on
// the new standard (about five minutes, one-line captions, the visuals
// explain): no field has six elements, counting is the wrong ruler, the
// degree as a dimension, the tower law, finite fields have pⁿ elements,
// multiplication by α as a matrix with the norm as its determinant, and
// the impossible trisection. Each line is one caption and one cue;
// MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "ruler"
  | "degree"
  | "tower"
  | "finite"
  | "bagua"
  | "norm"
  | "construct"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Could a number system have exactly six numbers?",
    "Not a clock: mod 6, 2 × 3 = 0, so you can't divide by 2.",
    "A real field: add, subtract, multiply, divide.",
    "Sizes 2, 3, 4, 5, 7, 8 and 9 all work.",
    "6, 10, 12: never. Something always jams.",
    "The reason is almost cheating: it's counting arrows.",
    "Every bigger field is secretly a vector space.",
    "And dimensions multiply.",
  ],
  title: ["Season three, episode one. Fields are vector spaces."],
  ruler: [
    "How much bigger is ℚ(√2) than ℚ?",
    "Counting fails: both are countable, the same size.",
    "But ℚ(√2) has a new direction: √2.",
    "Keep adding, and scaling by rationals. Forget the rest.",
    "A vector space over ℚ. Its dimension is the ruler.",
  ],
  degree: [
    "Degree: [L : K] is the dimension of L over K.",
    "ℂ over ℝ: basis 1, i. Degree 2.",
    "ℚ(√2) over ℚ: basis 1, √2. Every element is a + b√2.",
    "Even 1/(a + b√2) stays in that plane.",
    "A root of an irreducible degree-n polynomial: degree n.",
    "Basis 1, α, …, αⁿ⁻¹: divide, and keep the remainder.",
  ],
  tower: [
    "Stack them: ℚ ⊂ ℚ(√2) ⊂ ℚ(√2, √3).",
    "Basis below: 1, √2. Basis above: 1, √3.",
    "Multiply them: 1, √2, √3, √6. A 2 × 2 grid.",
    "A basis of a basis is a basis.",
    "Tower law: [M : K] = [M : L] · [L : K].",
    "So a middle degree must divide the top one.",
  ],
  finite: [
    "Now a finite field F. Add 1 to itself: 1, 1 + 1, …",
    "It must loop back at a prime p, so F contains 𝔽ₚ.",
    "So F is a vector space over 𝔽ₚ, of some dimension n.",
    "n coordinates, p choices each: |F| = pⁿ.",
    "6 is no prime power. No field has six elements.",
    "𝔽₈: a cube of 2 × 2 × 2 points over 𝔽₂.",
  ],
  bagua: [], // Chinese edition only
  norm: [
    "Fix α. Multiplying by α is a linear map.",
    "Over ℝ, times a + bi has the matrix [a −b; b a].",
    "Its determinant is a² + b²: the norm of α.",
    "det(AB) = det A · det B, so norms multiply.",
    "That's the two-squares identity, for free.",
    "The trace is 2a, and the char. polynomial kills α.",
  ],
  construct: [
    "Compass and straightedge take steps of degree 1 or 2.",
    "Tower law: anything you construct has degree 2ᵏ.",
    "Trisect 60°: cos 20° solves 8x³ − 6x − 1 = 0.",
    "Degree 3 never divides 2ᵏ. Impossible.",
    "Season 1's miracles were Season 2's dimensions.",
  ],
  endCard: [
    "A field over a field is a vector space.",
    "Degrees multiply, sizes are pⁿ, norms are determinants.",
    "Next: modules, when the scalars are only a ring.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "有没有一个数系，恰好只有六个数？",
    "不是钟表：模 6 时 2 × 3 = 0，除不了 2。",
    "要真正的域：加减乘除都行。",
    "2、3、4、5、7、8、9 个元素都可以。",
    "6、10、12 个：永远不行，总会卡住。",
    "原因简单得像作弊：数一数箭头。",
    "每个大一点的域，其实都是向量空间。",
    "而维数是相乘的。",
  ],
  title: ["第三季，第一集。域是向量空间。"],
  ruler: [
    "ℚ(√2) 比 ℚ 大多少？",
    "数元素不管用：两者都可数，一样多。",
    "可 ℚ(√2) 多了一个方向：√2。",
    "只做加法和有理数倍，别的先忘掉。",
    "这就是 ℚ 上的向量空间。维数才是尺子。",
  ],
  degree: [
    "次数：[L : K] 是 L 作为 K 上向量空间的维数。",
    "ℂ 对 ℝ：基 1、i，次数 2。",
    "ℚ(√2) 对 ℚ：基 1、√2，元素都是 a + b√2。",
    "连 1/(a + b√2) 也留在这个平面里。",
    "n 次不可约多项式的根：次数就是 n。",
    "基 1、α、…、αⁿ⁻¹：做除法，留下余式。",
  ],
  tower: [
    "叠起来：ℚ ⊂ ℚ(√2) ⊂ ℚ(√2, √3)。",
    "下层的基：1、√2；上层的基：1、√3。",
    "两两相乘：1、√2、√3、√6，一个 2 × 2 网格。",
    "基的基还是基。",
    "塔律：[M : K] = [M : L] · [L : K]。",
    "所以中间的次数必须整除顶上的次数。",
  ],
  finite: [
    "看一个有限域 F。1 一直加：1、1 + 1……",
    "它必在某个素数 p 处绕回来，所以 F 含 𝔽ₚ。",
    "于是 F 是 𝔽ₚ 上的向量空间，维数设为 n。",
    "n 个坐标，每个 p 种选择：|F| = pⁿ。",
    "6 不是素数的幂。没有六个元素的域。",
    "𝔽₈：𝔽₂ 上 2 × 2 × 2 的立方体。",
  ],
  // 只在中文版出现：《周易·系辞上》两仪四象八卦
  bagua: [
    "《周易·系辞》：“两仪生四象，四象生八卦。”",
    "每一爻非阴即阳，三爻成一卦：2³ = 8。",
    "八卦正是 𝔽₂ 上的三维向量，每个坐标两种选择。",
    "两卦相叠成六十四卦：64 = 8²，维数 3 × 2 = 6。",
  ],
  norm: [
    "固定 α。乘以 α 是一个线性映射。",
    "在 ℝ 上，乘 a + bi 的矩阵是 [a −b; b a]。",
    "它的行列式是 a² + b²：α 的范数。",
    "det(AB) = det A · det B，所以范数可乘。",
    "这就是两平方和恒等式，白送的。",
    "迹是 2a，特征多项式消灭 α。",
  ],
  construct: [
    "尺规作图，每一步次数只能是 1 或 2。",
    "塔律：能作出的数，次数都是 2ᵏ。",
    "三等分 60°：cos 20° 满足 8x³ − 6x − 1 = 0。",
    "3 永远整除不了 2ᵏ。不可能。",
    "第一季的奇迹，原来是第二季的维数。",
  ],
  endCard: [
    "域上的域，就是向量空间。",
    "次数相乘，大小是 pⁿ，范数是行列式。",
    "下一集：模，标量只是一个环的时候。",
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
  coldOpen: { 0: 5.5, 1: 6, 2: 5.5, 3: 6, 4: 6, 5: 6, 6: 6, 7: 5.5 },
  ruler: { 0: 5.5, 1: 6, 2: 6, 3: 6, 4: 6 },
  degree: { 0: 6, 1: 6, 2: 6.5, 3: 6, 4: 6, 5: 6.5 },
  tower: { 0: 6, 1: 6, 2: 6.5, 3: 5.5, 4: 6, 5: 6 },
  finite: { 0: 6.5, 1: 6, 2: 6, 3: 6.5, 4: 6, 5: 6.5 },
  bagua: { 0: 6, 1: 6.5, 2: 6.5, 3: 6.5 },
  norm: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  construct: { 0: 6, 1: 6, 2: 6.5, 3: 6, 4: 6 },
  endCard: { 0: 5, 1: 5.5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "ruler",
  "degree",
  "tower",
  "finite",
  "bagua",
  "norm",
  "construct",
  "endCard",
];

export const S3E01 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { bagua: "zh" },
  season: 3,
  captions: "large",
});
