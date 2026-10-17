import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E08, condensed from lessons/s1/e08-building-the-reals.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "cut"
  | "sup"
  | "swarm"
  | "liuHui"
  | "same"
  | "tower"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode eight. Building the real numbers, twice."],
  coldOpen: [
    "Last time we found holes in the rationals. At root two there is nothing, and the hole has no edges to grab.",
    "Adding root two, then root three, then pi, one name at a time, never ends. New holes keep turning up.",
    "In 1872 two answers appeared. Dedekind: a number is a cut. Cantor: a number is where a swarm of fractions is heading.",
  ],
  cut: [
    "Dedekind's idea: describe the hole by the fractions on its left. Take every fraction below zero or with square less than two.",
    "That set has no largest member. From one, last episode's rule climbs to four thirds, seven fifths, twenty-four seventeenths, forever.",
    "And no fraction sits at its edge. So Dedekind declares that this set of fractions is root two.",
    "Each fraction r gets a cut too: every fraction below r. The cuts are the new numbers.",
  ],
  sup: [
    "Cuts are ordered by containment. A smaller number's cut sits inside a bigger one's.",
    "Take any bounded pile of cuts and join them together. The union is a cut, and it's the least upper bound.",
    "So the cuts have no holes. The hard part is multiplication, which needs a separate case for each pair of signs.",
  ],
  swarm: [
    "Cantor starts from sequences. One, 1.4, 1.41, 1.414 crowd together near the hole.",
    "So do three halves, seventeen twelfths and 577 over 408, from the other side. Two swarms heading for one spot.",
    "The gap between them shrinks to zero. Call two such sequences the same and glue them, with the tool from episode five.",
    "Each glued blob is a real number. Multiply term by term, and root two times root two is exactly two.",
  ],
  liuHui: [], // Chinese edition only
  same: [
    "So one machine makes sets of fractions and the other makes classes of sequences. No number is literally the same in both.",
    "Yet both give a complete ordered field: arithmetic, order, and no holes. And any two such fields match up exactly.",
    "We built the reals twice and can now describe them once: the complete ordered field. The scaffolding can go.",
  ],
  tower: [
    "The tower gets its real floor. Every bounded set has a least upper bound, and every swarm lands.",
    "What did we lose? Most real numbers will never have a finite name. Episode twelve shows why.",
  ],
  endCard: [
    "A hole is filled by its own description: everything to its left, or every swarm flying toward it.",
    "Next episode: 0.999 repeating and one name the same real number. So what is a decimal, really?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第八集。两次造出实数。"],
  coldOpen: [
    "上一集，我们在有理数里找到了洞。根号二那里什么都没有，连个边都抓不住。",
    "补上根号二，再补根号三，再补 π，一个一个补，永远补不完，新的洞总会冒出来。",
    "1872 年出现了两个答案。戴德金说：数是一刀切口。康托尔说：数是一群分数奔向的地方。",
  ],
  cut: [
    "戴德金的想法：用洞左边的分数来描述这个洞。取所有小于零、或者平方小于二的分数。",
    "这个集合没有最大的成员。从一出发，上一集的规则一路往上爬：三分之四、五分之七、十七分之二十四，永无止境。",
    "它的边上也没有分数。于是戴德金规定：这一整个分数集合，就是根号二。",
    "每个分数 r 也有自己的切口：所有比 r 小的分数。这些切口，就是新的数。",
  ],
  sup: [
    "切口按包含关系排大小。小的数，它的切口装在大的数的切口里面。",
    "任取一堆有上界的切口，把它们并在一起。并集还是切口，而且正好是最小上界。",
    "所以切口里没有洞。难的是乘法：正负号的每种搭配都得单独处理。",
  ],
  swarm: [
    "康托尔从数列出发。1、1.4、1.41、1.414，在洞的旁边越挤越紧。",
    "从另一边，二分之三、十二分之十七、408 分之 577 也挤过来。两群点，奔向同一个地方。",
    "两群之间的距离缩到零。把这样的数列看成一样，粘在一起，用的正是第五集的工具。",
    "每一团就是一个实数。逐项相乘，根号二乘根号二恰好等于二。",
  ],
  // 只在中文版出现：刘徽割圆术（《九章算术》方田章“圆田术”刘徽注）。
  liuHui: [
    "刘徽注《九章算术》时，用的也是“越逼越近”：在圆里作内接正多边形，边数一次次加倍。",
    "他说：“割之弥细，所失弥少。割之又割，以至于不可割，则与圆周合体而无所失矣。”",
    "他一直算到 192 边形，得出圆周率约为 3.14。多边形一步步逼近圆，就像数列一步步逼近一个实数。",
  ],
  same: [
    "一台机器造出分数的集合，另一台造出数列的类。两边没有一个数是字面上相同的。",
    "可两边都得到完备有序域：能运算，有大小，没有洞。任意两个这样的域，都能一一对上。",
    "实数造了两遍，现在可以一句话描述：完备有序域。脚手架可以拆了。",
  ],
  tower: [
    "数塔盖好了实数这一层。每个有上界的集合都有最小上界，每一群点都有地方落脚。",
    "代价是什么？绝大多数实数，永远不会有一个有限长的名字。第十二集会讲为什么。",
  ],
  endCard: [
    "洞由它自己的描述来填：左边的所有分数，或者奔向它的每一群点。",
    "下一集：0.999… 和 1 是同一个实数的两个名字。小数到底是什么？",
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
  cut: { 0: 4.4, 1: 4.2 },
  sup: { 1: 5.0, 2: 3.6 },
  swarm: { 2: 4.0, 3: 3.6 },
  liuHui: { 2: 4.4 },
  same: { 2: 4.0 },
  tower: { 1: 3.6 },
  endCard: { 0: 3.0, 1: 5.0 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "title",
  "coldOpen",
  "cut",
  "sup",
  "swarm",
  "liuHui",
  "same",
  "tower",
  "endCard",
];

export const S1E08 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { liuHui: "zh" },
});
