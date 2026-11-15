import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S3E02, from lessons/s3/e02-modules-two-classifications.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): two puzzles from two seasons, the Hamming code over 𝔽₂, modules,
// torsion and the lost basis, the Smith normal form, the structure theorem
// read over ℤ (abelian groups of order 144) and over F[x] (Jordan blocks),
// and the dictionary between them. Each line is one caption and one cue;
// MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "hamming"
  | "module"
  | "torsion"
  | "smith"
  | "gengxiang"
  | "count"
  | "jordan"
  | "merge"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Two puzzles from two seasons, side by side.",
    "Left: how many abelian groups have 144 elements?",
    "ℤ/144 is one. ℤ/12 × ℤ/12 is another. Any more?",
    "Right: 3 × 3 matrices whose only eigenvalue is 2.",
    "2I is one. A shear is another. How many in all?",
    "One is about symmetry. One is about stretching space.",
    "Tonight they turn out to be the same question.",
    "To see it, the scalars have to stop being a field.",
  ],
  title: ["Season three, episode two. Modules."],
  hamming: [
    "Warm-up over 𝔽₂: send 4 bits, survive one flipped bit.",
    "Three parity checks, each a covector on 𝔽₂⁷.",
    "The code is their kernel: rank 3, so dimension 4.",
    "Flip bit 6. Checks 4 and 2 fail: 4 + 2 = 6.",
    "The failed checks spell out the error's address.",
    "All of it ran on one fact: 𝔽₂ is a field.",
  ],
  module: [
    "A module: a vector space whose scalars form a ring.",
    "Same axioms. The scalars just may not have inverses.",
    "Over ℤ, a module is exactly an abelian group.",
    "Over F[x], it's a vector space with one operator T.",
    "x acts as T, and an isomorphism is a change of basis.",
  ],
  torsion: [
    "What did the field give us? Try ℤ/2 as a ℤ-module.",
    "Scale the arrow 1 by 2 and it collapses to 0.",
    "A nonzero scalar killed a nonzero vector: torsion.",
    "So {1} is dependent. ℤ/2 has no basis at all.",
    "In a vector space you'd divide by 2. Not here.",
    "Lost: bases, complements, dimension. What survives?",
  ],
  smith: [
    "Describe a group by generators and relations.",
    "Row moves change generators. Column moves, relations.",
    "Clear each row and column with the Euclidean algorithm.",
    "What's left: 2, 6, 12, each dividing the next.",
    "So the group is ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12. Smith normal form.",
    "Coprime parts split apart: ℤ/12 = ℤ/4 ⊕ ℤ/3.",
  ],
  gengxiang: [],
  count: [
    "Structure theorem: over ℤ or F[x], every module splits.",
    "Into cyclic pieces R/(d), each d dividing the next.",
    "Over ℤ, 144 = 2⁴ · 3². Split the 4, split the 2.",
    "5 × 2 = 10 abelian groups of order 144. No more.",
  ],
  jordan: [
    "Over F[x], take one piece: F[x] / (x − 2)ᵏ.",
    "x acts as a Jordan block: 2 on the diagonal, 1 above.",
    "Split 3 three ways: 1 + 1 + 1, 2 + 1, or 3.",
    "2I, one shear block, one full block: exactly three.",
    "Same theorem, same algorithm, with x − 2 in place of p.",
  ],
  merge: [
    "Put the two columns side by side.",
    "Prime p ↔ x − λ. ℤ/pᵏ ↔ a k × k Jordan block.",
    "The order of the group ↔ the characteristic polynomial.",
    "The largest order ↔ the minimal polynomial.",
    "Jordan form is the classification of abelian groups.",
  ],
  endCard: [
    "A module is a vector space whose scalars can't divide.",
    "Over ℤ and F[x], one theorem classifies them all.",
    "Next: groups acting by matrices. Representations.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "两季的两道题，并排放着。",
    "左边：144 个元素的交换群，有几种？",
    "ℤ/144 是一种，ℤ/12 × ℤ/12 是另一种。还有吗？",
    "右边：唯一特征值是 2 的 3 × 3 矩阵。",
    "2I 是一种，剪切是另一种。一共几种？",
    "一个讲对称，一个讲拉伸空间。",
    "今晚它们会变成同一个问题。",
    "要看清这一点，标量就不能再是域。",
  ],
  title: ["第三季，第二集。模。"],
  hamming: [
    "先在 𝔽₂ 上热身：传 4 位，扛住翻错一位。",
    "三个奇偶校验，每个都是 𝔽₂⁷ 上的余向量。",
    "码就是它们的核：秩 3，所以维数 4。",
    "第 6 位翻了，校验 4 和 2 报错：4 + 2 = 6。",
    "报错的校验，直接写出了出错的位置。",
    "这一切都靠一件事：𝔽₂ 是域。",
  ],
  module: [
    "模：标量只来自一个环的向量空间。",
    "公理一字不改，只是标量未必可逆。",
    "在 ℤ 上，模恰好就是交换群。",
    "在 F[x] 上，模是向量空间加一个算子 T。",
    "x 的作用就是 T，同构就是换基。",
  ],
  torsion: [
    "域到底给了我们什么？把 ℤ/2 看成 ℤ 模。",
    "把箭头 1 乘以 2，它缩成了 0。",
    "非零标量消灭了非零向量：这叫挠。",
    "所以 {1} 线性相关，ℤ/2 根本没有基。",
    "在向量空间里可以除以 2，这里不行。",
    "丢了：基、补空间、维数。还剩什么？",
  ],
  smith: [
    "用生成元和关系来描述一个群。",
    "行变换换生成元，列变换换关系。",
    "每一行、每一列都用辗转相除消掉。",
    "剩下 2、6、12，前一个整除后一个。",
    "群就是 ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12：史密斯标准形。",
    "互素的部分能拆开：ℤ/12 = ℤ/4 ⊕ ℤ/3。",
  ],
  gengxiang: [
    "《九章算术·方田》约分：“更相减损，求其等也。”",
    "91 和 49，以少减多：42，7，35……",
    "一路减到 7 和 7：等数是 7，也就是最大公约数。",
    "史密斯标准形，就是整个矩阵在更相减损。",
  ],
  count: [
    "结构定理：在 ℤ 或 F[x] 上，每个模都能拆开。",
    "拆成循环块 R/(d)，前一个 d 整除后一个。",
    "在 ℤ 上，144 = 2⁴ · 3²：拆开 4，拆开 2。",
    "5 × 2 = 10：144 阶交换群恰好十种。",
  ],
  jordan: [
    "在 F[x] 上，取一块：F[x] / (x − 2)ᵏ。",
    "x 作用成若尔当块：对角线是 2，上面是 1。",
    "把 3 拆开：1 + 1 + 1、2 + 1、3。",
    "2I、一个剪切块、一个整块：恰好三种。",
    "同一个定理、同一个算法，p 换成了 x − 2。",
  ],
  merge: [
    "把两列并排放。",
    "素数 p ↔ x − λ；ℤ/pᵏ ↔ k × k 若尔当块。",
    "群的阶 ↔ 特征多项式。",
    "最大的阶 ↔ 极小多项式。",
    "若尔当标准形，就是交换群的分类。",
  ],
  endCard: [
    "模，就是标量不能做除法的向量空间。",
    "在 ℤ 和 F[x] 上，一个定理分类了全部。",
    "下一集：群用矩阵来作用。表示论。",
  ],
};

export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  coldOpen: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6 },
  title: { 0: 3 },
  hamming: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  module: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  torsion: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  smith: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6 },
  gengxiang: { 0: 6, 1: 6, 2: 6, 3: 6 },
  count: { 0: 6, 1: 6, 2: 6, 3: 6 },
  jordan: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  merge: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6 },
  endCard: { 0: 5, 1: 5.5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "hamming",
  "module",
  "torsion",
  "smith",
  "gengxiang",
  "count",
  "jordan",
  "merge",
  "endCard",
];

export const S3E02 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { gengxiang: "zh" },
  season: 3,
  captions: "large",
});
