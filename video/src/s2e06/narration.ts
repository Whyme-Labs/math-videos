import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E06, condensed from lessons/s2/e06-covectors.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "measure"
  | "density"
  | "liangqi"
  | "dual"
  | "gradient"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Paris, 1795. A new law makes the gram the unit of weight, and a grocer has to rewrite every number in the shop.",
    "A basket: 2 kilos of apples, 1 of flour, half a kilo of sugar. In grams, those numbers grow a thousand times.",
    "The prices per gram shrink a thousand times. And the bill doesn't move: 10 francs 50.",
    "Both are lists of three numbers, yet they change in opposite ways. They can't be the same kind of thing.",
  ],
  title: ["Season two, episode six. Covectors."],
  measure: [
    "The basket is a vector. The price list is a machine: feed it a basket, it hands back a number, and it respects adding and scaling.",
    "Draw it as a stack of evenly spaced sheets. Its reading is the number of sheets an arrow crosses, from tail to tip.",
  ],
  density: [
    "Double an arrow and it gets longer. Double a covector and its sheets crowd in, twice as close.",
    "That's the grocer, drawn: stretch the units, the arrows stretch, the sheets spread out, and the count stays put.",
  ],
  liangqi: [], // Chinese edition only
  dual: [
    "Pick a basis. Its dual basis is a pair of coordinate readers: one reads off the first coordinate, one the second.",
    "The first reader's sheets run parallel to the second arrow. Swing the second arrow and the first reader changes, though the first arrow never moved.",
  ],
  gradient: [
    "Now the payoff. Zoom in on a contour map of a hill until the contour lines turn straight, parallel and evenly spaced.",
    "That stack is the derivative, df. How far a step climbs is how many contours it crosses. The gradient was a covector all along.",
    "The familiar gradient arrow only appears once you decide what perpendicular means. The stack needs no such choice.",
  ],
  endCard: [
    "Vectors are things. Covectors measure them. A number appears wherever an arrow pierces a stack.",
    "Next episode: measuring functions. Values, slopes and areas are covectors too, and a rule from a wine merchant turns out exact for cubics.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1795 年，巴黎。新法令把“克”定为重量单位，一位杂货商得把店里每个数字重写一遍。",
    "一篮东西：苹果 2 公斤，面粉 1 公斤，糖半公斤。换成克，这些数都变大一千倍。",
    "每克的价钱变小一千倍。账单却纹丝不动：10 法郎 50。",
    "两样都是三个数，变起来却方向相反。它们不可能是同一种东西。",
  ],
  title: ["第二季，第六集。余向量。"],
  measure: [
    "篮子是向量。价目表是一台机器：喂它一篮东西，它吐出一个数，而且尊重加法和数乘。",
    "把它画成一叠等距的薄片。它的读数，就是箭头从尾到头穿过几片。",
  ],
  density: [
    "箭头乘 2，变长。余向量乘 2，薄片挤得更密，间距缩成一半。",
    "这就是那位杂货商，画出来：单位拉长，箭头跟着拉长，薄片跟着散开，穿过的片数不变。",
  ],
  // 只在中文版出现：商鞅方升与秦统一度量衡
  liangqi: [
    "两千多年前也换过一次单位。秦始皇统一度量衡，诏书刻在量器上：“法度量则不壹歉疑者，皆明壹之。”",
    "上海博物馆的商鞅方升，造于公元前 344 年，底部就补刻了这道诏书。",
    "量器换了，读数跟着变；被量的那升米，一粒没变。量器和被量的东西，本来就是两种东西。",
  ],
  dual: [
    "选一组基。它的对偶基是一对坐标读数器：一个读出第一个坐标，一个读出第二个。",
    "第一个读数器的薄片，平行于第二支箭头。把第二支箭头转一转，第一个读数器就变了，虽然第一支箭头一动没动。",
  ],
  gradient: [
    "压轴的来了。把一座山的等高线图一直放大，放到等高线变得笔直、平行、等距。",
    "这一叠就是导数 df。走一步升高多少，就数它穿过几条等高线。梯度从头到尾都是余向量。",
    "人们熟悉的梯度箭头，要先规定什么叫“垂直”才画得出来。那一叠薄片，不需要这个选择。",
  ],
  endCard: [
    "向量是东西，余向量去量它。箭头穿过薄片的地方，就出现一个数。",
    "下一集：给函数做测量。取值、斜率、面积也都是余向量；一位酒商引出的法则，对三次多项式竟然也精确。",
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
  "measure",
  "density",
  "liangqi",
  "dual",
  "gradient",
  "endCard",
];

export const S2E06 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { liangqi: "zh" },
  season: 2,
});
