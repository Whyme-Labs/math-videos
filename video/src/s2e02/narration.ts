import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E02, condensed from lessons/s2/e02-span-basis-dimension.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "span"
  | "wuse"
  | "exchange"
  | "language"
  | "infinite"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "London, May 1861. James Clerk Maxwell stands in the Royal Institution with three magic lanterns and a picture of a tartan ribbon.",
    "The ribbon was photographed three times: through a red filter, a green one and a blue one. Now the three lanterns throw the pictures onto one screen.",
    "The ribbon appears in colour. Three lights were enough. Why three, and not two, or ten?",
    "Because the colours we see form a space with three directions. Today: how many ingredients a space really needs.",
  ],
  title: ["Season two, episode two. Basis and dimension."],
  span: [
    "Mix vectors in any amounts and you get their span. Two arrows that point different ways span the whole plane.",
    "Add a third arrow and you gain nothing: it was already a mix of the first two. An ingredient you could have made is redundant.",
  ],
  wuse: [], // Chinese edition only
  exchange: [
    "A basis is a set of ingredients that makes everything, with nothing redundant. Could one basis have three vectors and another four?",
    "No. Swap the vectors of one basis into the other, one at a time. Each one evicts a vector and takes its seat, and the list still makes everything. So the counts match.",
  ],
  language: [
    "That count is the dimension, and it belongs to the space. The coordinates don't: change the basis and the same arrow gets new numbers.",
    "A basis is a language. The vector is the thing; its coordinates are how one language spells it.",
  ],
  infinite: [
    "Some spaces never run out. Polynomials need 1, x, x squared, and on forever: no finite list makes them all.",
    "And the real numbers, scaled only by fractions, need uncountably many ingredients. A basis exists only by the axiom of choice, and nobody has ever written one down.",
  ],
  endCard: [
    "Span, independence, basis, dimension: what you can make, what's wasted, and how many you need.",
    "Next episode: the machines that move vectors, and the one property that lets a handful of answers decide everything.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1861 年 5 月，伦敦。麦克斯韦站在皇家研究院里，身边是三台幻灯机和一张格子呢丝带的照片。",
    "这条丝带拍了三次：隔着红滤镜、绿滤镜、蓝滤镜。现在三台幻灯机把三张照片投到同一块幕上。",
    "丝带出现了颜色。三束光就够了。为什么是三，不是二，也不是十？",
    "因为我们看到的颜色，组成一个有三个方向的空间。今天讲：一个空间到底需要几种原料。",
  ],
  title: ["第二季，第二集。基与维数。"],
  span: [
    "把向量按任意分量混在一起，得到的就是它们张成的空间。两支方向不同的箭头，张成整个平面。",
    "再加第三支箭头，什么也没多出来：它本来就能由前两支混出来。能配出来的原料，就是多余的。",
  ],
  // 只在中文版出现：《周礼·考工记》“画缋之事，杂五色”
  wuse: [
    "中国古代讲绘画，《周礼·考工记》说：“画缋之事，杂五色。”青、赤、黄、白、黑，五种正色。",
    "五种颜料，调出千百种颜色。可是人眼看到的颜色只有三个方向。",
    "按线性的说法，五色里一定有多余的：有的能用别的配出来。这叫线性相关。",
  ],
  exchange: [
    "能配出一切、又一样都不多余的一组原料，叫做基。会不会一组基有三个向量，另一组有四个？",
    "不会。把一组基的向量一个一个换进另一组：每进来一个，就请走一个、坐它的位子，而这张清单照样什么都能配。所以两组一样多。",
  ],
  language: [
    "这个个数叫维数，它属于空间本身。坐标却不是：换一组基，同一支箭头就换了一组数。",
    "基是一种语言。向量是东西本身，坐标只是某种语言对它的拼写。",
  ],
  infinite: [
    "有些空间永远用不完。多项式要 1、x、x 平方，一直下去：任何有限的清单都配不全。",
    "实数只许乘分数的话，要不可数多种原料。这样的基只能靠选择公理保证存在，至今没有人写出过一组。",
  ],
  endCard: [
    "张成、线性无关、基、维数：能配出什么，什么是多余的，一共需要几种。",
    "下一集：搬动向量的机器，以及让少数几个答案决定一切的那条性质。",
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
  "span",
  "wuse",
  "exchange",
  "language",
  "infinite",
  "endCard",
];

export const S2E02 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { wuse: "zh" },
  season: 2,
});
