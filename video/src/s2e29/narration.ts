import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E29, from lessons/s2/e29-fourier.md, on the new standard
// (about five minutes, one-line captions, the visuals explain): sounds as
// recipes of pure tones, the tones as an orthonormal basis, partial sums
// as projections and Parseval, the Gibbs overshoot, differentiation made
// diagonal and the heat equation, and other bases. Each line is one
// caption and one cue; MIN_SECONDS gives the animations the time they need.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "tones"
  | "energy"
  | "gibbs"
  | "guqin"
  | "diagonal"
  | "bases"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Play one note on a violin, then on a flute. Same pitch.",
    "Your ear still tells them apart. It hears their recipes.",
    "Each sound splits into pure tones and overtones.",
    "1807: Fourier says every function splits like this.",
    "Even a square wave, corners and all, from smooth waves?",
    "Lagrange doubted it. The partial sums keep overshooting.",
    "So is Fourier right? It depends on what '=' means.",
    "Today: pure tones are perpendicular unit vectors.",
  ],
  title: ["Season two, episode twenty-nine. Fourier."],
  tones: [
    "The tones are eⁱⁿˣ, one for every whole number n.",
    "Multiply two different tones and average: you get 0.",
    "The positive and negative areas cancel exactly.",
    "So the tones are orthonormal. A recipe entry is ⟨f, eₙ⟩.",
    "The partial sum Sₙ f projects f onto the first tones.",
  ],
  energy: [
    "Project the square wave onto more and more tones.",
    "The energy left over: 0.19, 0.10, 0.07, 0.04, …",
    "It goes to 0. Sₙ f → f in L², for every f.",
    "Parseval: the energy is the sum of the tones' energies.",
    "So the Fourier map L² → ℓ² keeps every length and angle.",
    "Square wave: 1 = (8/π²)(1 + 1/9 + 1/25 + …).",
    "So 1 + 1/9 + 1/25 + … = π²/8, and Σ 1/n² = π²/6.",
  ],
  gibbs: [
    "Pointwise, the overshoot near a jump never leaves.",
    "N = 9, 49, 199: the peak stays near 1.179.",
    "It gets thinner, so the energy it carries goes to 0.",
    "In energy, Fourier is right. Pointwise, almost always.",
  ],
  guqin: [], // Chinese edition only
  diagonal: [
    "Why did Fourier care? He was solving the heat equation.",
    "d/dx eⁱⁿˣ = in·eⁱⁿˣ. Every tone is an eigenvector.",
    "In this basis, d/dx is diagonal: …, −i, 0, i, 2i, …",
    "So uₜ = uₓₓ splits into one easy equation per tone.",
    "Tone n fades like e⁻ⁿ²ᵗ. High notes die first.",
    "On a hot ring, the corners round off first.",
  ],
  bases: [
    "Fourier's basis is one of many.",
    "Gram–Schmidt on 1, x, x², x³ gives Legendre: x² − ⅓, …",
    "Hermite functions: the quantum oscillator's own states.",
    "Haar wavelets: blocks that zoom in where a signal jumps.",
    "Each basis diagonalises its own operator.",
  ],
  endCard: [
    "Fourier: a function is an infinite vector of tones.",
    "Energy is kept, and derivatives become multiplications.",
    "Next: compact operators. The spectral theorem survives.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "小提琴拉一个音，长笛吹同一个音。音高一样。",
    "耳朵还是分得出来，它听的是配方。",
    "每个声音都能拆成纯音：一个基音，加上泛音。",
    "1807 年：傅里叶说，每个函数都能这样拆。",
    "连方波，带着尖角，也能用光滑的波拼出来？",
    "拉格朗日不信。部分和总是冲过头。",
    "傅里叶对不对？要看“等于”是什么意思。",
    "今天：纯音是互相垂直的单位向量。",
  ],
  title: ["第二季，第二十九集。傅里叶。"],
  tones: [
    "纯音是 eⁱⁿˣ，每个整数 n 一个。",
    "两个不同的纯音相乘再取平均，得 0。",
    "正的面积和负的面积正好抵消。",
    "所以纯音是标准正交的。配方里的一项是 ⟨f, eₙ⟩。",
    "部分和 Sₙ f，就是投影到前几个纯音上。",
  ],
  energy: [
    "把方波投影到越来越多的纯音上。",
    "剩下的能量：0.19、0.10、0.07、0.04……",
    "它趋于 0。对每个 f，Sₙ f 都在 L² 里趋于 f。",
    "帕塞瓦尔：声音的能量，等于各纯音能量之和。",
    "所以傅里叶映射 L² → ℓ² 保长度、保角度。",
    "方波：1 = (8/π²)(1 + 1/9 + 1/25 + …)。",
    "所以 1 + 1/9 + 1/25 + … = π²/8，Σ 1/n² = π²/6。",
  ],
  gibbs: [
    "可逐点看，跳跃附近的过冲永远不走。",
    "N = 9、49、199：峰值都在 1.179 附近。",
    "它越来越窄，带的能量趋于 0。",
    "按能量算傅里叶是对的；逐点只能几乎处处。",
  ],
  // 只在中文版出现：古琴的徽与泛音（嵇康《琴赋》）
  guqin: [
    "古琴有十三徽。嵇康《琴赋》：“徽以钟山之玉。”",
    "手指轻点徽位再拨弦，弹出的是泛音。",
    "点在一半是二倍频，点在三分之一是三倍频。",
    "徽位就是 sin(nx) 的节点。弦音是纯音的叠加。",
  ],
  diagonal: [
    "傅里叶为什么在乎？他想解热传导方程。",
    "d/dx eⁱⁿˣ = in·eⁱⁿˣ。每个纯音都是特征向量。",
    "在这组基下，d/dx 是对角的：…, −i, 0, i, 2i, …",
    "于是 uₜ = uₓₓ 拆成每个纯音一个简单方程。",
    "第 n 个纯音按 e⁻ⁿ²ᵗ 衰减，高音先消失。",
    "一个热环上，尖角最先被磨圆。",
  ],
  bases: [
    "傅里叶基只是众多基里的一组。",
    "对 1, x, x² 正交化，得到勒让德：x² − ⅓……",
    "埃尔米特函数：量子谐振子自己的状态。",
    "哈尔小波：一块块方波，信号跳的地方就放大去看。",
    "每组基，各自把一个算子对角化。",
  ],
  endCard: [
    "傅里叶：函数是一个由纯音组成的无穷维向量。",
    "能量守恒，求导变成乘法。",
    "下一集：紧算子。谱定理活了下来。",
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
  coldOpen: { 0: 6.5, 1: 6.5, 2: 6.5, 3: 6, 4: 6.5, 5: 6.5, 6: 6, 7: 6 },
  tones: { 0: 6.5, 1: 6.5, 2: 6.5, 3: 6.5, 4: 7 },
  energy: { 0: 6.5, 1: 6.5, 2: 6, 3: 6.5, 4: 6, 5: 6.5, 6: 7 },
  gibbs: { 0: 6.5, 1: 7, 2: 6.5, 3: 6 },
  guqin: { 0: 6.5, 1: 6, 2: 6.5, 3: 6.5 },
  diagonal: { 0: 6, 1: 6.5, 2: 6.5, 3: 6.5, 4: 7, 5: 6.5 },
  bases: { 0: 5, 1: 7, 2: 6.5, 3: 6.5, 4: 6 },
  endCard: { 0: 5, 1: 5.5, 2: 6 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "coldOpen",
  "title",
  "tones",
  "energy",
  "gibbs",
  "guqin",
  "diagonal",
  "bases",
  "endCard",
];

export const S2E29 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { guqin: "zh" },
  season: 2,
  captions: "large",
});
