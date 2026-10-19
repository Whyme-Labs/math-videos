import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E10, condensed from
// lessons/s1/e10-complex-numbers-as-rotations.md. Each line is one caption
// and one cue; scenes key their animation off the cue frames, so editing the
// script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
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
  coldOpen: [
    "Italy, around 1560. The engineer Rafael Bombelli is draining a marsh. The work stops, so he sits down to write a book of algebra.",
    "One puzzle in it: a cube of blocks weighs as much as fifteen rods plus four loose blocks. How big is the cube?",
    "The answer is plain. A cube of side 4 has 64 blocks, and fifteen rods of 4, plus 4, is 64 too.",
    "But Cardano's famous recipe for this puzzle asks for the square root of minus 121. No number squares to a negative.",
    "Bombelli follows the recipe anyway. The impossible parts cancel each other out, and the scale settles on 4.",
  ],
  title: [
    "Season one, episode ten. That impossible number was a turn all along.",
  ],
  pairs: [
    "We won't just declare a new number. We build it from pairs of reals, the way we built the integers in episode six.",
    "A pair is a walk: three steps east, two steps north. Adding pairs means doing one walk and then the other.",
    "Multiplying uses one odd rule, (ac minus bd, ad plus bc). Call one step north i. Then i times i is one step west: minus one.",
  ],
  quarterTurn: [
    "Multiplying by i turns the whole map a quarter turn about zero: every house, every road, every point.",
    "Turn twice and that's a half turn, which sends every point to minus itself. So i squared is minus one.",
    "Multiplying by minus one was always a half turn. Multiplying by i goes halfway.",
  ],
  scaleRotate: [
    "Every complex number has a length and a direction. Multiplying by it stretches by the length and turns by the angle.",
    "Take 3 plus 4i times 1 plus 2i. The lengths, 5 and root 5, multiply. The angles, 53 and 63 degrees, add.",
    "The product is minus 5 plus 10i: length 5 root 5, angle 117 degrees. The odd rule was rotation all along.",
  ],
  xianTu: [], // Chinese edition only
  fta: [
    "We built ℂ to open one locked door, x squared plus 1 equals 0. It opens every door of that kind.",
    "Here's why. Send a circle through a polynomial. A small circle lands near the constant; a big one winds around zero.",
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
    "Bombelli's impossible number was a quarter turn. A complex number is a stretch and a turn.",
    "Next episode: Hilbert's Hotel. Every room is full, and there's still room for one more guest.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "约 1560 年的意大利。工程师邦贝利正在排干一片沼泽。工程停了，他坐下来写一本代数书。",
    "书里有一道题：一个积木立方体，和十五根木条再加四块积木一样重。立方体有多大？",
    "答案很普通：边长 4 的立方体有 64 块；十五根 4 块长的木条加 4 块，也是 64。",
    "可卡尔达诺的著名公式算这道题，偏要开负一百二十一的平方根。没有哪个数的平方是负的。",
    "邦贝利照着公式算下去。“不可能”的部分互相抵消，天平停在了 4。",
  ],
  title: ["第一季，第十集。那个“不可能”的数，其实是一次旋转。"],
  pairs: [
    "我们不只是宣布一个新数，而是用实数对来造它，就像第六集造整数那样。",
    "一个数对就是一段路：向东三步，向北两步。数对相加，就是走完一段再走另一段。",
    "乘法有一条怪规则：(ac − bd, ad + bc)。把向北一步叫作 i，那么 i 乘 i 就是向西一步：负一。",
  ],
  quarterTurn: [
    "乘以 i，整张地图绕原点转四分之一圈：每座房子、每条路、每个点。",
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
    "我们造 ℂ，只为打开一扇锁着的门：x² + 1 = 0。结果这一类门，全都打开了。",
    "原因是这样的：把一个圆送进多项式。小圆的像停在常数项附近；大圆的像绕着原点转圈。",
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
    "邦贝利那个“不可能”的数，就是转四分之一圈。复数就是一次拉伸加一次旋转。",
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
  "coldOpen",
  "title",
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
