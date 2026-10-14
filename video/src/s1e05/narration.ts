import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E05, condensed from lessons/s1/e05-equivalence-classes.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "relations"
  | "closeTo"
  | "blobs"
  | "sunzi"
  | "partition"
  | "wellDefined"
  | "fractions"
  | "zoomOut"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode five. The master tool: equivalence classes."],
  coldOpen: [
    "Is one half the same as two quarters?",
    "As amounts, yes. Lay one over the other and the shaded parts match exactly.",
    "As written, no. The pair one, two and the pair two, four are different pairs.",
    "Clocks do this too. Fifteen hundred hours and three o'clock point the same way.",
    "Different things, declared the same for a purpose. Today we learn to do that without breaking anything.",
  ],
  relations: [
    "First, a relation is just a set of pairs: which things go with which.",
    "Reflexive: everything goes with itself.",
    "Symmetric: if a goes with b, then b goes with a.",
    "Transitive: if a goes with b, and b goes with c, then a goes with c.",
    "A relation with all three is an equivalence relation. This one is same remainder after dividing by three.",
  ],
  closeTo: [
    "Some relations feel like sameness and still fail. Call two numbers close if they differ by less than one.",
    "Zero is close to 0.6, and 0.6 is close to 1.2. But zero and 1.2 are not close.",
    "Small differences add up, so close-to isn't transitive. You can't glue things together with it.",
  ],
  blobs: [
    "Now a real one: same remainder after dividing by twelve.",
    "Related numbers drift together into a blob. Each blob is called an equivalence class.",
    "Then treat each blob as one new point. Twelve blobs, twelve points: a clock.",
    "Fifteen and three are in the same blob, so on the clock they are equal.",
    "The set of blobs is called the quotient. Equal in the new world means related in the old one.",
  ],
  sunzi: [], // Chinese edition only
  partition: [
    "Can two blobs partly overlap? Suppose x sits in the blob of a and in the blob of b.",
    "Then a goes with x and x goes with b, so a goes with b. It was one blob all along.",
    "So two blobs are identical or completely separate. They cut the set into pieces, each element in exactly one. That's a partition.",
  ],
  wellDefined: [
    "To add on the clock, pick a member of each blob, add them, and see where the answer lands.",
    "Nine plus five is fourteen, which lands in the blob of two.",
    "Pick other members: twenty-one plus seventeen is thirty-eight. Same blob. Addition passes.",
    "Now try two to the power n. Zero and twelve sit in the same blob.",
    "Two to the zero is one. Two to the twelve is 4096, which leaves four. Different blobs, so this rule fails.",
    "Every rule on blobs needs this check. A rule that passes is called well defined.",
  ],
  fractions: [
    "Back to fractions. Call pairs p, q and r, s the same when p times s equals q times r.",
    "The blob of one, two holds two, four and three, six and so on, all along one line.",
    "That whole blob is the fraction one half. One half equals two quarters because they share a blob.",
    "Allow zero over zero and it goes with every pair, so all the blobs glue into one. That's why the bottom can't be zero.",
  ],
  zoomOut: [
    "That's the whole recipe: raw descriptions, a rule for being the same, the blobs, and a check for every operation.",
    "Next we use it to build the integers and the fractions, later the real numbers, and much more.",
  ],
  endCard: [
    "We decide what counts as the same, and then we check that our rules survive.",
    "Next episode: three minus five, with only natural numbers. Pairs come to the rescue.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第五集。万能工具：等价类。"],
  coldOpen: [
    "二分之一和四分之二，是同一个东西吗？",
    "论多少，是。把一个叠到另一个上，涂色的部分正好重合。",
    "论写法，不是。数对 (1, 2) 和 (2, 4) 是两个不同的数对。",
    "钟表也是这样：十五点和三点，指针指着同一个位置。",
    "本来不同的东西，为了某个目的被当成一样。今天学的，就是怎么当才不出错。",
  ],
  relations: [
    "先说关系。关系就是一组数对，记下谁和谁相关。",
    "自反：每个东西都和自己相关。",
    "对称：a 和 b 相关，b 就和 a 相关。",
    "传递：a 和 b 相关，b 和 c 相关，a 就和 c 相关。",
    "三条都满足，就叫等价关系。这里的例子是：除以三，余数相同。",
  ],
  closeTo: [
    "有些关系看着像“一样”，其实不行。比如两个数相差小于一，就算“接近”。",
    "零接近 0.6，0.6 接近 1.2，可零和 1.2 并不接近。",
    "小差距会累加，所以“接近”没有传递性，不能拿来把东西粘在一起。",
  ],
  blobs: [
    "换一个真正的等价关系：除以十二，余数相同。",
    "相关的数聚到一起，成为一团。每一团叫一个等价类。",
    "再把每一团当成一个新的点。十二团，十二个点：一个钟面。",
    "十五和三在同一团里，所以在钟面上，它们相等。",
    "所有团组成的集合，叫商集。新世界里的相等，就是旧世界里的相关。",
  ],
  // 只在中文版出现：《孙子算经》卷下的“物不知数”。
  sunzi: [
    "《孙子算经》里有一道“物不知数”：今有物不知其数，三三数之剩二，五五数之剩三，七七数之剩二，问物几何？",
    "用今天的话说，这个数同时属于三个等价类：除以三余二，除以五余三，除以七余二。",
    "书中答：二十三。南宋秦九韶给出了一般解法，这个结果今天叫“中国剩余定理”。",
  ],
  partition: [
    "两团能不能只重叠一部分？假设 x 既在 a 的团里，也在 b 的团里。",
    "那么 a 和 x 相关，x 和 b 相关，所以 a 和 b 相关。其实本来就是同一团。",
    "所以两团要么完全相同，要么毫不相交。它们把集合切成小块，每个元素恰好在一块里，这叫划分。",
  ],
  wellDefined: [
    "在钟面上做加法：从每一团里随便挑一个成员，相加，看结果落在哪一团。",
    "九加五等于十四，落在二那一团。",
    "换别的成员：二十一加十七等于三十八，还是同一团。加法过关。",
    "再试试“二的 n 次方”。零和十二在同一团里。",
    "二的零次方是一，二的十二次方是 4096，除以十二余四。落在不同的团，这条规则不成立。",
    "团上的每条规则都要过这一关。过了关的，叫“良定义”。",
  ],
  fractions: [
    "回到分数。规定 p 乘 s 等于 q 乘 r 时，数对 (p, q) 和 (r, s) 算一样。",
    "(1, 2) 这一团里有 (2, 4)、(3, 6) 等等，全在一条直线上。",
    "这一整团，就是分数二分之一。二分之一等于四分之二，因为它们在同一团里。",
    "要是允许零比零，它和每个数对都相关，所有的团会粘成一团。这就是分母不能为零的原因。",
  ],
  zoomOut: [
    "这就是整套做法：原始的描述，一条“算一样”的规则，分成团，再检查每个运算。",
    "接下来就用它造整数和分数，以后造实数，还有更多。",
  ],
  endCard: [
    "什么算“一样”，由我们来规定，然后检查规则还站得住。",
    "下一集：只有自然数，三减五怎么办？数对来帮忙。",
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
  "relations",
  "closeTo",
  "blobs",
  "sunzi",
  "partition",
  "wellDefined",
  "fractions",
  "zoomOut",
  "endCard",
];

export const S1E05 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { sunzi: "zh" },
});
