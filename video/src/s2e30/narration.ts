import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E30, from lessons/s2/e30-compact-operators.md, on the new
// standard (about five minutes, one-line captions, the visuals explain): a
// string's modes and the spectral theorem, why the finite proof fails,
// compact operators, the spectral theorem for compact self-adjoint
// operators, the Fredholm alternative, the string's Green's operator, and
// the Volterra operator. Each line is one caption and one cue; MIN_SECONDS
// gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "naive"
  | "compact"
  | "spectral"
  | "zaiyu"
  | "fredholm"
  | "string"
  | "volterra"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Pluck a guitar string. You hear one note.",
    "It vibrates whole, in halves, thirds, quarters at once.",
    "Each shape is a sine with its own pitch: 1, 2, 3, 4, …",
    "Episode 18: symmetric matrices have perpendicular axes.",
    "An ellipse lines up with its axes: the spectral theorem.",
    "A string has infinitely many modes. Does it still work?",
    "Not always: some operators have no eigenvectors at all.",
    "It survives for almost-finite operators: compact ones.",
  ],
  title: ["Season two, episode thirty. Compact operators."],
  naive: [
    "The finite proof: maximise ⟨Tx, x⟩ on the unit sphere.",
    "The maximiser is the top eigenvector. Peel, repeat.",
    "Try multiplying by x, on L²[0, 1].",
    "Bumps squeeze toward x = 1, and ⟨Mf, f⟩ climbs toward 1.",
    "No function gets there. The sphere isn't compact.",
  ],
  compact: [
    "Compact: T makes bounded sequences cluster.",
    "Example: diag(1, ½, ⅓, …) squashes the unit ball.",
    "Its axes shrink: the image is nearly finite-dimensional.",
    "The identity isn't compact: e₁, e₂, … stay √2 apart.",
    "Compact operators are limits of finite-rank ones.",
    "They turn weak limits into real ones: Teₙ → 0.",
  ],
  spectral: [
    "Spectral theorem: compact, self-adjoint ⇒ an eigenbasis.",
    "Now the maximising sequence works: Txₙ has a limit.",
    "So a top eigenvector exists. Peel it off and repeat.",
    "The eigenvalues march toward 0 from both sides.",
    "Outside any band [−ε, ε] there are only finitely many.",
    "Tx = Σ λₖ ⟨x, uₖ⟩ uₖ: Episode 18, infinitely long.",
  ],
  zaiyu: [], // Chinese edition only
  fredholm: [
    "Fredholm: for compact K, solve u − λKu = f.",
    "Either there's exactly one solution for every f…",
    "…or u − λKu = 0 has a solution, and f must be ⟂ to it.",
    "Example: K(x, y) = xy. It breaks only at λ = 3.",
    "Rank–nullity, rescued in infinite dimensions.",
  ],
  string: [
    "Back to the string: −u″ = λu, with u(0) = u(1) = 0.",
    "−d²/dx² isn't bounded, but its inverse G is compact.",
    "G's eigenfunctions: sin(nπx). Its eigenvalues: 1/(n²π²).",
    "Invert them: frequencies nπ, a ladder up to infinity.",
    "Trace of G: ∫ x(1 − x) dx = 1/6. So Σ 1/n² = π²/6 again.",
  ],
  volterra: [
    "Self-adjointness matters. Volterra: Vf(x) = ∫₀ˣ f.",
    "V is compact, yet it has no eigenvalues at all.",
    "‖Vⁿ‖ ≤ 1/n!: it shrinks all, and fixes no direction.",
  ],
  endCard: [
    "Compact means almost finite. The spectral theorem lives.",
    "Strings, drums and integral equations break into modes.",
    "Next: the spectrum, and quantum mechanics.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "拨一下吉他弦，你听到一个音。",
    "可它同时在整体振、对半振、三段振、四段振。",
    "每种形状都是正弦，各有频率：1、2、3、4……",
    "第 18 集：对称矩阵有互相垂直的特征向量。",
    "椭圆对准它的轴。这就是谱定理。",
    "弦有无穷多个振型。谱定理还成立吗？",
    "不一定：有的算子一个特征向量都没有。",
    "对“几乎有限维”的算子，它活下来了：紧算子。",
  ],
  title: ["第二季，第三十集。紧算子。"],
  naive: [
    "有限维的证明：在单位球面上让 ⟨Tx, x⟩ 最大。",
    "最大点就是第一个特征向量。剥掉它，再来一遍。",
    "试试 L²[0, 1] 上“乘以 x”这个算子。",
    "鼓包挤向 x = 1，⟨Mf, f⟩ 爬向 1。",
    "可没有哪个函数到得了。球面不紧。",
  ],
  compact: [
    "紧算子：把有界序列变成有极限点的序列。",
    "例子：diag(1, ½, ⅓, …) 把单位球压扁。",
    "它的轴越来越短，像几乎有限维。",
    "恒等算子不紧：e₁、e₂……两两相距 √2。",
    "紧算子是有限秩算子的极限。",
    "它把弱极限变成真极限：Teₙ → 0。",
  ],
  spectral: [
    "谱定理：紧的自伴算子，有一组特征基。",
    "这下求最大的序列管用了：Txₙ 有极限。",
    "于是第一个特征向量存在。剥掉它，再来。",
    "特征值从两边向 0 靠拢。",
    "在 [−ε, ε] 之外，只有有限个。",
    "Tx = Σ λₖ ⟨x, uₖ⟩ uₖ：第 18 集，无限长版。",
  ],
  // 只在中文版出现：朱载堉十二平均律（《律学新说》，1584）
  zaiyu: [
    "明代朱载堉，1584 年写成《律学新说》。",
    "他把 2 的十二次方根算到二十五位：1.059463……",
    "十二个半音，弦长按这个比一级级缩短。",
    "弦的频率排成离散的一串，正是今天讲的谱。",
  ],
  fredholm: [
    "弗雷德霍姆：K 紧，解 u − λKu = f。",
    "要么对每个 f 都恰好有一个解……",
    "……要么 u − λKu = 0 有解，而 f 必须与它正交。",
    "例子：K(x, y) = xy，只在 λ = 3 时出问题。",
    "秩–零化度定理，在无穷维里被救了回来。",
  ],
  string: [
    "回到弦：−u″ = λu，且 u(0) = u(1) = 0。",
    "−d²/dx² 连有界都不是，可它的逆 G 是紧的。",
    "G 的特征函数是 sin(nπx)，特征值 1/(n²π²)。",
    "取倒数：频率 nπ，一串离散的阶梯通向无穷。",
    "G 的迹是 1/6，于是又得到 Σ 1/n² = π²/6。",
  ],
  volterra: [
    "自伴很重要。沃尔泰拉算子：(Vf)(x) = ∫₀ˣ f。",
    "V 是紧的，却一个特征值都没有。",
    "‖Vⁿ‖ ≤ 1/n!：处处压小，却不固定任何方向。",
  ],
  endCard: [
    "紧就是几乎有限维，谱定理活了下来。",
    "弦、鼓、积分方程，都能拆成振型。",
    "下一集：超越特征值的谱，和量子力学。",
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
  coldOpen: { 0: 5.5, 1: 6, 2: 6, 3: 6, 4: 6, 5: 5.5, 6: 5.5, 7: 6 },
  naive: { 0: 6, 1: 6, 2: 5.5, 3: 6.5, 4: 6 },
  compact: { 0: 6, 1: 6.5, 2: 6, 3: 6, 4: 6, 5: 6 },
  spectral: { 0: 6, 1: 6, 2: 6, 3: 6.5, 4: 6, 5: 6 },
  zaiyu: { 0: 6, 1: 6, 2: 6, 3: 6 },
  fredholm: { 0: 6, 1: 6, 2: 6.5, 3: 6, 4: 5.5 },
  string: { 0: 6, 1: 6, 2: 6.5, 3: 6, 4: 6.5 },
  volterra: { 0: 6, 1: 6, 2: 6.5 },
  endCard: { 0: 5, 1: 5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "naive",
  "compact",
  "spectral",
  "zaiyu",
  "fredholm",
  "string",
  "volterra",
  "endCard",
];

export const S2E30 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zaiyu: "zh" },
  season: 2,
  captions: "large",
});
