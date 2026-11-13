import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E31, from lessons/s2/e31-spectrum-and-quantum-mechanics.md,
// on the new standard (about five minutes, one-line captions, the visuals
// explain): position has no eigenvalues, the right shift, the spectrum and
// its basic properties, the two examples solved, why X and P can't be
// bounded, the spectral theorem as multiplication, and the quantum
// mechanics dictionary. Each line is one caption and one cue; MIN_SECONDS
// gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "shift"
  | "spectrum"
  | "examples"
  | "rainbow"
  | "unbounded"
  | "spectral"
  | "dictionary"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Multiply a function on [0, 1] by x. Simple, linear.",
    "x·f = λf forces f to live at the single point λ.",
    "A function at one point is zero. No eigenvectors.",
    "In quantum mechanics, multiplying by x is position.",
    "Textbook rule: measured values are eigenvalues.",
    "Position has none, yet detectors record it all day.",
    "Eigenvalues were the wrong idea in infinite dimensions.",
    "The fix is the spectrum: where T − λ fails to invert.",
  ],
  title: ["Season two, episode thirty-one. The spectrum."],
  shift: [
    "The right shift: S(x₁, x₂, …) = (0, x₁, x₂, …).",
    "Sx = λx? Then λx₁ = 0, λx₂ = x₁, λx₃ = x₂, …",
    "Every coordinate falls to 0: S has no eigenvalues.",
    "Yet S isn't onto: nothing maps to e₁ = (1, 0, 0, …).",
    "One-to-one, not onto: impossible in finite dimensions.",
  ],
  spectrum: [
    "Ask instead: is T − λ invertible? If not, λ ∈ σ(T).",
    "Three ways to fail: not one-to-one (an eigenvalue)…",
    "…onto a dense part only, or onto a thin part.",
    "For |λ| > ‖T‖, a geometric series inverts T − λ.",
    "So σ(T) is closed, inside the disk of radius ‖T‖.",
    "Liouville's theorem: over ℂ, σ(T) is never empty.",
  ],
  examples: [
    "The shift: for |λ| < 1, the geometric vector v is in ℓ².",
    "Every output of S − λ is perpendicular to v.",
    "So σ(S) is the closed unit disk. Still no eigenvalues.",
    "Multiplying by x: off [0, 1], 1/(x − λ) inverts it.",
    "For λ in [0, 1], tall thin bumps nearly solve xf = λf.",
    "‖(M − λ)fₙ‖ ≤ 1/n. So σ(M) = [0, 1], all continuous.",
  ],
  rainbow: [], // Chinese edition only
  unbounded: [
    "Physics wants XP − PX = iħ. Can X and P be bounded?",
    "Matrices: no. tr(XP − PX) = 0, but tr(iħI) isn't.",
    "Bounded operators: XPⁿ − PⁿX = n·iħ·Pⁿ⁻¹.",
    "Take norms: nħ ≤ 2‖X‖‖P‖ for every n. Impossible.",
    "So X and P can't both be bounded.",
    "Hellinger–Toeplitz: they live on a dense domain only.",
  ],
  spectral: [
    "Spectral theorem: a self-adjoint A is multiplication…",
    "…by a real function g, in the right coordinates.",
    "Episode 18 was the discrete case: diag(λ₁, …, λₙ).",
    "Position is already multiplication by x.",
    "Momentum: the Fourier transform turns it into ħk.",
  ],
  dictionary: [
    "The dictionary: a state is a unit vector ψ.",
    "An observable is self-adjoint. Outcomes: its spectrum.",
    "Detectors ask: is X in [a, b]? Never: is X = 0.3?",
    "Prob(a ≤ X ≤ b) = ∫ₐᵇ |ψ|². No eigenvector needed.",
    "Cauchy–Schwarz on XP − PX gives ΔX · ΔP ≥ ħ/2.",
    "Narrow in x means wide in k, and the other way round.",
  ],
  endCard: [
    "Spectrum: where T − λ fails to invert. Never empty.",
    "Eigenvalues were the discrete special case all along.",
    "Next: measure-preserving maps, and chaos.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "把 [0, 1] 上的函数乘以 x。简单，线性。",
    "x·f = λf 逼得 f 只能活在 x = λ 这一点。",
    "只在一点上非零的函数就是零。没有特征向量。",
    "在量子力学里，乘以 x 就是“位置”。",
    "教科书说：测量结果都是特征值。",
    "位置一个特征值都没有，探测器却天天在测它。",
    "在无穷维里，“特征值”本来就选错了。",
    "换成谱：让 T − λ 不可逆的那些 λ。",
  ],
  title: ["第二季，第三十一集。谱与量子力学。"],
  shift: [
    "右移：S(x₁, x₂, …) = (0, x₁, x₂, …)。",
    "设 Sx = λx：λx₁ = 0，λx₂ = x₁，λx₃ = x₂……",
    "坐标一个接一个倒成 0：S 没有特征值。",
    "可 S 不是满射：没有谁被映到 e₁。",
    "单射却不满射，这在有限维里不可能。",
  ],
  spectrum: [
    "换个问法：T − λ 可逆吗？不可逆，λ 就在谱里。",
    "失败有三种：不是单射，这就是特征值……",
    "……像稠密却不满，或者像根本不稠密。",
    "|λ| > ‖T‖ 时，几何级数把 T − λ 逆了回来。",
    "所以 σ(T) 是闭集，在半径 ‖T‖ 的圆盘里。",
    "刘维尔定理：在 ℂ 上，σ(T) 永远不空。",
  ],
  examples: [
    "右移：|λ| < 1 时，几何向量 v 在 ℓ² 里。",
    "S − λ 的每个输出都和 v 垂直。",
    "所以 σ(S) 是整个闭单位圆盘，仍没有特征值。",
    "乘以 x：λ 不在 [0, 1] 里，1/(x − λ) 就是逆。",
    "λ 在 [0, 1] 里，又高又窄的鼓包几乎解出 xf = λf。",
    "‖(M − λ)fₙ‖ ≤ 1/n：σ(M) = [0, 1]，全是连续谱。",
  ],
  // 只在中文版出现：沈括《梦溪笔谈》记虹（卷二十一）
  rainbow: [
    "北宋沈括《梦溪笔谈》，记下孙彦先一句话：",
    "“虹乃雨中日影也，日照雨则有之。”",
    "雨滴把阳光拆开，摊成一整条彩带。",
    "颜色连成一片，没有孤立的线：连续谱。",
  ],
  unbounded: [
    "物理要 XP − PX = iħ。X 和 P 能有界吗？",
    "矩阵不行：XP − PX 的迹是 0，iħI 的不是。",
    "有界算子：归纳得 XPⁿ − PⁿX = n·iħ·Pⁿ⁻¹。",
    "取范数：对每个 n，nħ ≤ 2‖X‖‖P‖。不可能。",
    "所以 X 和 P 不能都有界。",
    "海林格–特普利茨：它们只能定义在稠密子空间上。",
  ],
  spectral: [
    "谱定理：自伴算子 A 就是一个乘法……",
    "……乘以实函数 g，只要坐标选对。",
    "第 18 集是离散情形：diag(λ₁, …, λₙ)。",
    "位置本来就是乘以 x。",
    "动量：傅里叶变换把它变成乘以 ħk。",
  ],
  dictionary: [
    "对照表：状态是单位向量 ψ。",
    "可观测量是自伴算子，可能的结果是它的谱。",
    "探测器问：X 在 [a, b] 里吗？从不问 X = 0.3。",
    "Prob(a ≤ X ≤ b) = ∫ₐᵇ |ψ|²，用不着特征向量。",
    "对 XP − PX 用柯西–施瓦茨：ΔX · ΔP ≥ ħ/2。",
    "x 上越窄，k 上越宽，反过来也一样。",
  ],
  endCard: [
    "谱：T − λ 不可逆的地方，永远不空。",
    "特征值一直只是离散的特例。",
    "下一集：保测系统，线性代数遇上混沌。",
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
  coldOpen: { 0: 5.5, 1: 6, 2: 6, 3: 5.5, 4: 5.5, 5: 6.5, 6: 5.5, 7: 6 },
  shift: { 0: 6, 1: 6.5, 2: 6, 3: 6, 4: 5.5 },
  spectrum: { 0: 6, 1: 6, 2: 6, 3: 6.5, 4: 6, 5: 6 },
  examples: { 0: 6, 1: 6, 2: 6.5, 3: 6, 4: 6.5, 5: 6 },
  rainbow: { 0: 6, 1: 6, 2: 6, 3: 6 },
  unbounded: { 0: 6, 1: 6, 2: 6, 3: 7, 4: 5.5, 5: 6 },
  spectral: { 0: 6, 1: 6, 2: 6, 3: 5.5, 4: 6.5 },
  dictionary: { 0: 5.5, 1: 6, 2: 6, 3: 6.5, 4: 6, 5: 6.5 },
  endCard: { 0: 5, 1: 5, 2: 5.5 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "shift",
  "spectrum",
  "examples",
  "rainbow",
  "unbounded",
  "spectral",
  "dictionary",
  "endCard",
];

export const S2E31 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { rainbow: "zh" },
  season: 2,
  captions: "large",
});
