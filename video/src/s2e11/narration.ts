import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S2E11, condensed from lessons/s2/e11-exterior-algebra-and-determinant.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "coldOpen"
  | "title"
  | "rules"
  | "churu"
  | "wedge"
  | "det"
  | "product"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "Edo, 1683. Seki Takakazu, an accounts official for a samurai lord, writes down a rule that decides when a system of equations can be solved.",
    "Ten years later in Hanover, Leibniz finds the same rule and writes it to L'Hôpital. Neither knows about the other.",
    "Today it's the determinant. Three by three takes six terms, four by four takes twenty-four, ten by ten more than three million.",
    "Behind the pile of terms is one question: how much does a map stretch volume, and does it turn space inside out?",
  ],
  title: ["Season two, episode eleven. Exterior algebra and the determinant."],
  rules: [
    "Ask for a signed area of two arrows. Stretch one arrow and the area stretches. Slide one arrow along the other and nothing changes.",
    "Swap the arrows and the sign flips. Make them parallel and the area is zero. Those rules fix the area completely, once you pick a unit.",
  ],
  churu: [], // Chinese edition only
  wedge: [
    "Call it the wedge, v wedge w: an oriented patch of area. In three dimensions, wedges of two arrows fill three directions, and wedges of three fill just one.",
    "In n dimensions the top wedge always has one direction. So a linear map can only do one thing to it: multiply it by a single number.",
  ],
  det: [
    "That number is the determinant. Push the unit cube through the map and its new volume is the determinant. Turn it inside out and the sign goes negative.",
    "Crush the cube flat and the determinant is zero: the map has lost a direction, and nothing can undo it.",
  ],
  product: [
    "Now the old miracle. Scale volumes by 2, then by 3, and you've scaled them by 6. So the determinant of AB is det A times det B.",
    "And the six-term formula? Expand the wedge of the three columns, and the terms fall out by themselves, signs and all.",
  ],
  endCard: [
    "The determinant is how a map scales oriented volume, and every rule about it is a rule about volume.",
    "Next episode: the directions a map doesn't turn, only stretches. The golden ratio is hiding in one of them.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  coldOpen: [
    "1683 年，江户。为一位藩主管账的关孝和，写下一条规则：判断一组方程什么时候有解。",
    "十年后，莱布尼茨在汉诺威找到同一条规则，写信告诉洛必达。两人谁也不知道谁。",
    "今天它叫行列式。三阶要六项，四阶二十四项，十阶超过三百万项。",
    "这一大堆项背后，其实只问一件事：映射把体积放大多少倍，有没有把空间翻个面？",
  ],
  title: ["第二季，第十一集。外代数与行列式。"],
  rules: [
    "给两支箭头定一个带符号的面积。拉长一支，面积跟着拉长；让一支沿另一支滑动，面积不变。",
    "交换两支，符号反过来；两支平行，面积为零。只要选定单位，这几条就把面积完全定死了。",
  ],
  // 只在中文版出现：刘徽“出入相补”
  churu: [
    "刘徽注《九章算术》，用过一个原理：“出入相补，各从其类。”",
    "把一块图形切下来，挪到别处补上，面积不变。平行四边形切下一角补到另一边，就成了长方形。",
    "这正是行列式不怕“推”：沿一支箭头推另一支，面积不变。",
  ],
  wedge: [
    "把它叫作楔积 v ∧ w：一块有方向的面积。三维里，两支箭头的楔积有三个方向，三支的楔积只有一个。",
    "n 维里，最高一层的楔积永远只有一个方向。所以线性映射对它只能做一件事：乘一个数。",
  ],
  det: [
    "这个数就是行列式。把单位立方体推过映射，新的体积就是行列式；把它翻个面，符号变负。",
    "把立方体压扁，行列式就是零：映射丢了一个方向，再也倒不回去。",
  ],
  product: [
    "现在看那个老奇迹。体积先放大 2 倍，再放大 3 倍，一共放大 6 倍。所以 AB 的行列式等于 A 的行列式乘 B 的行列式。",
    "那个六项公式呢？把三列的楔积展开，各项连同正负号，自己就冒出来了。",
  ],
  endCard: [
    "行列式就是映射放大有向体积的倍数；关于它的每条规则，都是关于体积的规则。",
    "下一集：映射不转、只拉伸的方向。黄金比就藏在其中一个里。",
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
  "rules",
  "churu",
  "wedge",
  "det",
  "product",
  "endCard",
];

export const S2E11 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { churu: "zh" },
  season: 2,
});
