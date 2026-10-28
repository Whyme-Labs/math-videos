import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E03, condensed from lessons/s2/e03-linear-maps.md. Each
// line is one caption and one cue; scenes key their animation off the cue
// frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "test"
  | "basis"
  | "zhaocha"
  | "kernel"
  | "engine"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "London, 1821. Charles Babbage and John Herschel are checking a book of astronomical tables, and it is full of mistakes.",
    "Babbage snaps: I wish to God these calculations had been executed by steam.",
    "So he designs a machine that can only add. It works because taking differences respects adding and scaling.",
    "Machines like that move vectors, and they're today's subject: linear maps.",
  ],
  title: ["Season two, episode three. Linear maps."],
  test: [
    "Here's the test. Turn a sum of arrows, or turn each arrow and then add: same answer. Stretch then turn, or turn then stretch: same answer.",
    "Rotations pass. So do shadows, derivatives, and shifting a list along. Squaring fails: the square of a sum isn't the sum of the squares.",
  ],
  basis: [
    "That test is strong. Tell a linear map where the two basis arrows go, and it has no choices left.",
    "Every other arrow is a mix of the basis, so its image is the same mix of their images. The whole grid follows.",
  ],
  zhaocha: [], // Chinese edition only
  kernel: [
    "A shadow at noon flattens space onto the floor. Everything that lands on zero, the whole vertical line, is the kernel. The floor it covers is the image.",
    "And no dimension is lost: three in, one crushed, two out. Rank plus nullity always adds back to where you started.",
  ],
  engine: [
    "Babbage's engine runs on this. For the squares 0, 1, 4, 9, 16, the differences are 1, 3, 5, 7, and their differences are all 2.",
    "Taking differences is linear, and it crushes constants to zero. So the engine starts from a 2 and adds its way back up, column by column: 25, 36, 49, with no mistakes.",
  ],
  endCard: [
    "Linear maps respect adding and scaling. A basis decides them, and what they crush plus what they reach is everything.",
    "Next episode: why matrices multiply row by column, and why turning then flattening isn't flattening then turning.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1821 年，伦敦。巴贝奇和赫歇尔在核对一本天文表，错误百出。",
    "巴贝奇脱口而出：真希望这些计算是用蒸汽机做的！",
    "于是他设计了一台只会做加法的机器。它能行，是因为“取差”这件事尊重加法和数乘。",
    "这样搬动向量的机器，就是今天的主角：线性映射。",
  ],
  title: ["第二季，第三集。线性映射。"],
  test: [
    "检验很简单。先把箭头相加再转，或者各自转了再加：结果一样。先伸缩再转，或者先转再伸缩：也一样。",
    "旋转通过了。影子、求导、把一串数往后挪一格，也都通过。平方不行：和的平方不等于平方的和。",
  ],
  basis: [
    "这个检验很强。告诉线性映射两支基箭头去了哪里，它就再没有别的选择。",
    "别的箭头都是基的组合，像也就是基的像的同一个组合。整张网格都跟着走。",
  ],
  // 只在中文版出现：郭守敬、王恂等编《授时历》（1280）所用的招差术
  zhaocha: [
    "差分的办法，中国古人也用。元代郭守敬、王恂等人编《授时历》（1280 年），用“招差术”推算太阳的运行。",
    "一列数，逐次相减，减到差相等为止；反过来，只要一次次相加，就能把整张表推出来。",
    "相减和相加，都尊重加法和数乘。用今天的话说，取差就是一个线性映射。",
  ],
  kernel: [
    "正午的影子把空间压到地面上。所有落到零上的东西，也就是整条竖线，叫做核。影子铺满的地面，叫做像。",
    "而且维数一点没少：进去三维，压掉一维，出来两维。秩加零度，总是等于原来的维数。",
  ],
  engine: [
    "巴贝奇的机器就靠这个。平方数 0、1、4、9、16，差是 1、3、5、7，差的差全是 2。",
    "取差是线性的，而且把常数压成零。于是机器从一个 2 出发，一列一列加回去：25、36、49，一个错也没有。",
  ],
  endCard: [
    "线性映射尊重加法和数乘。一组基就决定了它；它压掉的加上它到达的，正好是全部。",
    "下一集：矩阵为什么要“行乘列”，为什么先转再压不等于先压再转。",
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
  "test",
  "basis",
  "zhaocha",
  "kernel",
  "engine",
  "endCard",
];

export const S2E03 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zhaocha: "zh" },
  season: 2,
});
