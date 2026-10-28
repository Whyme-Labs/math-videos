import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E04, condensed from lessons/s2/e04-matrices-as-shadows.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "columns"
  | "fangcheng"
  | "compose"
  | "order"
  | "shadows"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Dublin, 16 October 1843. William Rowan Hamilton is walking along the Royal Canal with his wife.",
    "For years he has tried to multiply triples of numbers the way complex numbers multiply pairs. It has never worked.",
    "At Broom Bridge it comes to him: use four numbers, and let i times j differ from j times i. He carves the rule into the stone.",
    "Order matters. Turning, then flattening, isn't flattening, then turning. Today: what a matrix really is.",
  ],
  title: ["Season two, episode four. Matrices as shadows."],
  columns: [
    "Pick a basis, and write down where a map sends each basis arrow. Those become the columns. That grid of numbers is the matrix.",
    "To find where any arrow goes, mix the columns by the arrow's coordinates. The matrix does the map, in numbers.",
  ],
  fangcheng: [], // Chinese edition only
  compose: [
    "Now do one map, then another. Where does the first basis arrow end up? Follow it through both.",
    "Each entry of the answer is a row of the second matrix against a column of the first. Row times column isn't a convention; following arrows forces it.",
  ],
  order: [
    "Turn a square a quarter turn, then flatten it onto the floor: a short flat shadow. Flatten first, then turn: a tall one.",
    "So A times B isn't B times A. Not a strange exception, just socks then shoes.",
  ],
  shadows: [
    "Change the basis, and the same map casts a different matrix: a shadow from a new angle. The map hasn't moved.",
    "Here a tilted matrix hides a simple map. Turn the light to the diagonals and its shadow is just stretch by 3, stretch by 1.",
  ],
  endCard: [
    "A matrix is the shadow a linear map casts in a chosen basis. Multiplying matrices is following maps.",
    "Next episode: new spaces built from old ones, by gluing, and a map that forgets becomes a map that doesn't.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1843 年 10 月 16 日，都柏林。哈密顿和妻子沿着皇家运河散步。",
    "多年来，他一直想像复数乘两个数那样，去乘三个数一组的数。一直不成。",
    "走到布鲁姆桥，他突然想通了：用四个数，并且让 i 乘 j 不等于 j 乘 i。他把公式刻在了桥石上。",
    "次序要紧。先转再压扁，不等于先压扁再转。今天讲：矩阵到底是什么。",
  ],
  title: ["第二季，第四集。矩阵是影子。"],
  columns: [
    "选一组基，记下映射把每支基箭头送到哪里，这些就是各列。这一格一格的数，就是矩阵。",
    "要知道任何箭头去哪，就按它的坐标把各列混起来。矩阵用数字完成了这个映射。",
  ],
  // 只在中文版出现：刘徽注《九章算术》“并列为行，故谓之方程”
  fangcheng: [
    "“方程”这个词，刘徽注《九章算术》时解释过：“并列为行，故谓之方程。”",
    "把数一行一行并排摆成方阵。两千年前，算筹板上已经是一个矩阵。",
    "只是那时它还只是一格一格的数；把它看成映射的影子，要等到十九世纪。",
  ],
  compose: [
    "现在先做一个映射，再做另一个。第一支基箭头最后到了哪里？跟着它走过两步。",
    "答案的每一格，都是第二个矩阵的一行对上第一个矩阵的一列。行乘列不是约定，是跟着箭头走逼出来的。",
  ],
  order: [
    "把正方形转四分之一圈，再压到地面上：一道扁扁的短影子。先压再转：一道竖着的长影子。",
    "所以 A 乘 B 不等于 B 乘 A。这不是什么怪例外，就像先穿袜子再穿鞋。",
  ],
  shadows: [
    "换一组基，同一个映射就投下另一个矩阵：从新角度照出的影子。映射本身没动。",
    "这个歪歪斜斜的矩阵，藏着一个简单的映射。把光转到对角线方向，它的影子就只是拉长 3 倍、拉长 1 倍。",
  ],
  endCard: [
    "矩阵是线性映射在选定的基下投出的影子。矩阵相乘，就是一个映射接着一个映射。",
    "下一集：用旧空间造新空间，把东西粘起来；一个会忘事的映射，变成一个不忘事的映射。",
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
  "columns",
  "fangcheng",
  "compose",
  "order",
  "shadows",
  "endCard",
];

export const S2E04 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { fangcheng: "zh" },
  season: 2,
});
