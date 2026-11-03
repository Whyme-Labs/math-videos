import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E19, from lessons/s2/e19-svd.md, the Part A finale, on
// the new standard (about five minutes, one-line captions, the visuals
// explain): random matrices always turn circles into ellipses, why one
// eigenbasis isn't enough, the proof from AᵀA, rotate–stretch–rotate on a
// 3D sphere, the worked example [3 0; 4 5] and what its σ's tell you,
// rectangular maps in 3D, Eckart–Young on a picture rebuilt layer by
// layer, PCA on a cloud, and the cliffhanger into Part B.
// Each line is one caption and one cue; MIN_SECONDS gives the animations
// the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "twoBases"
  | "proof"
  | "rsr"
  | "example"
  | "rect"
  | "shenkuo"
  | "layers"
  | "pca"
  | "partA"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Pick any four numbers. Put them in a 2 × 2 matrix.",
    "Apply it to a circle.",
    "An ellipse. Always a perfect ellipse.",
    "Try another. And another. Shears, flips, squashes.",
    "Every time: an ellipse with axes at right angles.",
    "A perpendicular pair always lands on a perpendicular pair.",
    "Every map is secretly simple: turn, stretch, turn.",
    "Today: the singular value decomposition.",
  ],
  title: ["Season two, episode nineteen. The SVD."],
  twoBases: [
    "Eigenvectors want Av ∥ v: one basis for both sides.",
    "A 3 × 2 matrix sends ℝ² into ℝ³. Parallel makes no sense.",
    "New idea: one perpendicular basis in, another one out.",
    "Ask for Av₁ = σ₁u₁ and Av₂ = σ₂u₂.",
    "Each input axis lands on an output axis, stretched.",
  ],
  proof: [
    "Where do the v's come from? From AᵀA.",
    "AᵀA is symmetric: perpendicular eigen-axes v.",
    "Its stretches are never negative: ⟨AᵀAv, v⟩ = ‖Av‖².",
    "Push the v's through A. Their images stay perpendicular.",
    "Their lengths are σ = √λ. Scale them down: the u's.",
    "So AV = UΣ, and A = UΣVᵀ.",
  ],
  rsr: [
    "Read it right to left. Vᵀ turns the sphere.",
    "Σ stretches along the axes.",
    "U turns the result into place.",
    "Sphere in, ellipsoid out. The semi-axes are σᵢuᵢ.",
    "Every linear map does exactly this.",
  ],
  example: [
    "An example: A = [3 0; 4 5].",
    "AᵀA = [25 20; 20 25]. Stretches 45 and 5.",
    "So σ₁ = √45 ≈ 6.7 and σ₂ = √5 ≈ 2.2.",
    "The biggest stretch is the size of A: ‖A‖ = 6.7.",
    "Their product is |det A| = 15: the area scale.",
    "Their ratio, 3, says how much A can blow up errors.",
  ],
  rect: [
    "Rectangular maps work too. A 3 × 2 matrix:",
    "the disc lands as a flat ellipse floating in 3D.",
    "A 2 × 3 matrix crushes a ball onto an ellipse.",
    "The crushed direction, σ = 0, is the kernel.",
  ],
  shenkuo: [], // Chinese edition only
  layers: [
    "Write A as layers: σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + …",
    "Each layer is a rank-one picture, biggest first.",
    "Keep the first k. That's the best rank-k copy.",
    "No rank-k matrix gets closer. Eckart–Young, 1936.",
    "A picture rebuilt: 1 layer, 5, 20, 50.",
    "A 1000 × 1000 photo at 50 layers: a tenth of the numbers.",
  ],
  pca: [
    "A cloud of data points is a matrix too.",
    "Its first singular direction is the main trend.",
    "Project onto it: the best line through the cloud.",
    "That's principal component analysis.",
  ],
  partA: [
    "That ends Part A. Up to turns, a map is its σ's.",
    "Every theorem so far assumed finite dimension.",
    "What if the vectors are all functions on [0, 1]?",
    "Infinitely many axes, all √2 apart. Nothing closes up.",
  ],
  endCard: [
    "Every map: turn, stretch, turn.",
    "The stretches, the σ's, are all that's left.",
    "Next: Part B. What breaks in infinite dimensions.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "随便挑四个数，排成一个 2 × 2 矩阵。",
    "用它去变一个圆。",
    "得到椭圆。永远是一个标准的椭圆。",
    "再换一个，再换一个。错切、翻转、压扁。",
    "每一次：椭圆，两根轴互相垂直。",
    "也就是说，两个垂直方向被送到另外两个垂直方向。",
    "每个映射其实都很简单：转、伸缩、再转。",
    "今天：奇异值分解。",
  ],
  title: ["第二季，第十九集。奇异值分解。"],
  twoBases: [
    "特征向量要求 Av 平行于 v：两边用同一组基。",
    "3 × 2 矩阵把 ℝ² 送进 ℝ³，“平行”根本说不通。",
    "新想法：输入一组垂直基，输出另一组。",
    "要求 Av₁ = σ₁u₁，Av₂ = σ₂u₂。",
    "每根输入轴落到一根输出轴上，再伸缩。",
  ],
  proof: [
    "v 从哪里来？从 AᵀA 来。",
    "AᵀA 是对称的：有互相垂直的特征轴 v。",
    "它的伸缩从不为负：⟨AᵀAv, v⟩ = ‖Av‖²。",
    "把 v 送过 A。它们的像仍然互相垂直。",
    "像的长度是 σ = √λ。缩成单位长：就是 u。",
    "所以 AV = UΣ，也就是 A = UΣVᵀ。",
  ],
  rsr: [
    "从右往左读。Vᵀ 转动球面。",
    "Σ 沿坐标轴伸缩。",
    "U 再把结果转到位。",
    "进去是球，出来是椭球。半轴是 σᵢuᵢ。",
    "每个线性映射做的都正是这件事。",
  ],
  example: [
    "举个例子：A = [3 0; 4 5]。",
    "AᵀA = [25 20; 20 25]。伸缩倍数 45 和 5。",
    "所以 σ₁ = √45 ≈ 6.7，σ₂ = √5 ≈ 2.2。",
    "最大的伸缩就是 A 的大小：‖A‖ = 6.7。",
    "两者之积是 |det A| = 15：面积的缩放。",
    "两者之比是 3：A 最多把误差放大几倍。",
  ],
  rect: [
    "长方形的矩阵也行。一个 3 × 2 矩阵：",
    "圆盘变成一个浮在三维空间里的扁椭圆。",
    "2 × 3 矩阵把一个球压扁成椭圆。",
    "被压没的方向，σ = 0，就是核。",
  ],
  // 只在中文版出现：沈括《梦溪笔谈》小孔成像
  shenkuo: [
    "北宋沈括在《梦溪笔谈》里写小孔成像。",
    "鸢在空中飞，影子跟着鸢移动。",
    "影子穿过窗隙，就“鸢东则影西，鸢西则影东”。",
    "像倒了过来，也变小了：先转，再伸缩。",
  ],
  layers: [
    "把 A 写成一层层：σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + …",
    "每一层都是秩为一的图，从大到小排。",
    "只留前 k 层，就是最好的秩 k 近似。",
    "没有哪个秩 k 矩阵更近。埃卡特–杨，1936 年。",
    "重建一张图：1 层，5 层，20 层，50 层。",
    "1000 × 1000 的照片留 50 层，只要十分之一的数。",
  ],
  pca: [
    "一团数据点，也是一个矩阵。",
    "它的第一个奇异方向，就是主要的走向。",
    "投影到这个方向：穿过这团点最好的直线。",
    "这就是主成分分析。",
  ],
  partA: [
    "上篇到此结束。除去转动，映射就是它的 σ。",
    "到现在为止，每个定理都默认维数有限。",
    "如果向量是 [0, 1] 上所有的函数呢？",
    "无穷多根轴，两两相距 √2。怎么也收不拢。",
  ],
  endCard: [
    "每个映射：转、伸缩、再转。",
    "剩下的只有那些伸缩倍数：σ。",
    "下一集：下篇。无限维里什么会坏掉。",
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
  coldOpen: { 0: 4.5, 1: 4, 2: 4, 3: 6, 4: 4.5, 5: 5, 6: 5, 7: 4 },
  twoBases: { 0: 5, 1: 5, 2: 5, 3: 4.5, 4: 4.5 },
  proof: { 0: 4, 1: 4.5, 2: 5, 3: 5, 4: 5, 5: 5 },
  rsr: { 0: 5, 1: 4.5, 2: 4.5, 3: 5, 4: 5 },
  example: { 0: 4, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
  rect: { 0: 4, 1: 5, 2: 5.5, 3: 5 },
  shenkuo: { 0: 4.5, 1: 4.5, 2: 5.5, 3: 5 },
  layers: { 0: 5, 1: 4.5, 2: 5, 3: 4.5, 4: 7, 5: 5 },
  pca: { 0: 4, 1: 5, 2: 5.5, 3: 4 },
  partA: { 0: 5, 1: 4.5, 2: 5, 3: 6 },
  endCard: { 0: 4, 1: 4.5, 2: 5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "twoBases",
  "proof",
  "rsr",
  "example",
  "rect",
  "shenkuo",
  "layers",
  "pca",
  "partA",
  "endCard",
];

export const S2E19 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { shenkuo: "zh" },
  season: 2,
  captions: "large",
});
