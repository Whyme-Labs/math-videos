import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E10, condensed from
// lessons/s1/e10-complex-numbers-as-rotations.md. Each line is one caption
// and one cue; scenes key their animation off the cue frames, so editing the
// script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "pairs"
  | "quarterTurn"
  | "scaleRotate"
  | "xianTu"
  | "fta"
  | "noOrder"
  | "tower"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode ten. The complex numbers, as rotations."],
  coldOpen: [
    "In 1572, Rafael Bombelli looked at x cubed equals 15x plus 4. The answer is plain: x equals 4.",
    "But Cardano's formula for cubics asked for the square root of minus 121, a number whose square is negative.",
    "Bombelli played along. He cubed 2 plus i and got 2 plus 11i. The imaginary parts cancelled, and out came 4.",
  ],
  pairs: [
    "Declaring a new symbol isn't enough. As with the integers in episode six, we build it from pairs, this time pairs of reals.",
    "Add pairs piece by piece. Multiply with one odd rule: (a, b) times (c, d) is (ac minus bd, ad plus bc).",
    "The reals sit inside as the pairs (a, 0). Call (0, 1) i. Then i times i is (minus 1, 0), which is minus one.",
  ],
  quarterTurn: [
    "Pairs are points in the plane. Multiplying by i sends (a, b) to (minus b, a): a quarter turn about zero.",
    "Do it twice and that's a half turn, which sends every point to minus itself. So i squared is minus one.",
    "Multiplying by minus one was always a half turn. Multiplying by i goes halfway.",
  ],
  scaleRotate: [
    "Every complex number has a length and an angle. Multiplying by it stretches by the length and turns by the angle.",
    "Take 3 plus 4i times 1 plus 2i. The lengths, 5 and root 5, multiply. The angles, 53 and 63 degrees, add.",
    "The product is minus 5 plus 10i: length 5 root 5, angle 117 degrees. The odd rule was rotation all along.",
  ],
  xianTu: [], // Chinese edition only
  fta: [
    "We built ℂ to solve x squared plus 1 equals 0. We got every polynomial equation for free.",
    "Send a circle through a polynomial. A small circle lands near the constant term; a big one winds around zero n times.",
    "As the circle grows, its image has to sweep across zero, and there is a root. Gauss gave a proof in 1799.",
  ],
  noOrder: [
    "The price is order. In an ordered field every nonzero square is positive, and minus one is negative.",
    "But i squared is minus one. No ordering of ℂ fits its arithmetic, and the line cracks.",
  ],
  tower: [
    "The tower gets its last floor. It's wider, not taller: the real line swings out into a plane.",
    "The algebra is finished. Over ℂ, every polynomial equation already has its roots.",
  ],
  endCard: [
    "A complex number is a stretch and a turn, and i, the imaginary one, is a quarter turn.",
    "Next episode: Hilbert's Hotel. Every room is full, and there's still room for one more guest.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第十集。复数，就是旋转。"],
  coldOpen: [
    "1572 年，邦贝利看着一个三次方程：x³ = 15x + 4。答案很普通：x = 4。",
    "可卡尔达诺的三次方程公式，偏要开负一百二十一的平方根，一个平方为负的数。",
    "邦贝利照算下去：2 + i 的立方是 2 + 11i。虚的部分正好抵消，剩下 4。",
  ],
  pairs: [
    "光宣布一个新符号还不够。像第六集造整数那样，我们用数对来造，这次是实数对。",
    "加法逐项相加。乘法有一条怪规则：(a, b) 乘 (c, d) 等于 (ac − bd, ad + bc)。",
    "实数就是 (a, 0) 这样的对。把 (0, 1) 叫作 i，那么 i 乘 i 等于 (−1, 0)，也就是负一。",
  ],
  quarterTurn: [
    "数对就是平面上的点。乘以 i，把 (a, b) 送到 (−b, a)：绕原点转四分之一圈。",
    "转两次就是半圈，每个点都到了自己的相反数。所以 i 的平方是负一。",
    "乘以负一，本来就是转半圈。乘以 i，只转一半。",
  ],
  scaleRotate: [
    "每个复数都有长度和角度。乘以它，就是按长度拉伸，再按角度旋转。",
    "算 (3 + 4i)(1 + 2i)。长度 5 和根号 5 相乘，角度 53° 和 63° 相加。",
    "结果是 −5 + 10i：长度 5√5，角度 117°。那条怪规则，原来就是旋转。",
  ],
  // 只在中文版出现：《周髀算经》商高“句广三，股修四，径隅五”与赵爽弦图。
  xianTu: [
    "《周髀算经》里，商高说：“故折矩，以为句广三，股修四，径隅五。”3 + 4i 的长度正是 5。",
    "三国时赵爽画了弦图：四个朱色直角三角形，一个转四分之一圈就是下一个，中间围出一个黄色小方。",
    "四个三角形加中黄实：4 × 6 + 1 = 25，正是弦的平方。转四次回到原处：i 的四次方等于 1。",
  ],
  fta: [
    "我们造 ℂ，只为解 x² + 1 = 0。结果每一个多项式方程，都白送了解。",
    "把一个圆送进多项式。小圆的像停在常数项附近；大圆的像绕原点转 n 圈。",
    "圆从小变大，它的像一定会扫过原点，那里就是根。高斯在 1799 年给出了证明。",
  ],
  noOrder: [
    "代价是顺序。在有序域里，每个非零数的平方都是正的，而负一是负的。",
    "可 i 的平方是负一。ℂ 上的任何排序都和它的算术合不来，数轴裂开了。",
  ],
  tower: [
    "数塔盖好了最后一层。它不是更高，而是更宽：实数轴展开成一个平面。",
    "代数上的修补到此为止：在 ℂ 里，每个多项式方程都已经有根。",
  ],
  endCard: [
    "复数就是一次拉伸加一次旋转。那个“虚”的 i，就是转四分之一圈。",
    "下一集：希尔伯特旅馆。每个房间都住满了，还能再住进一位客人。",
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
  "title",
  "coldOpen",
  "pairs",
  "quarterTurn",
  "scaleRotate",
  "xianTu",
  "fta",
  "noOrder",
  "tower",
  "endCard",
];

export const S1E10 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { xianTu: "zh" },
});
