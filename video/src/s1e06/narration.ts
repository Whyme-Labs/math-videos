import type { Locale } from "../shared/locale";
import { makeEpisodeTiming } from "../shared/timeline";

// Narration for S1E06, condensed from lessons/s1/e06-integers-and-rationals.md.
// Each line is one caption and one cue; scenes key their animation off the
// cue frames, so editing the script re-times the video.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "zPairs"
  | "zArith"
  | "minusTimes"
  | "zhengfu"
  | "qBuild"
  | "mediant"
  | "ledger"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode six. Subtraction and division."],
  coldOpen: [
    "What is three minus five? Count down from three and you hit zero after three steps, then fall off.",
    "For centuries the fix was to invent a symbol, minus two, plus rules like minus times minus is plus.",
    "We won't invent anything. We'll build minus two from the pair three, five, which already exists.",
    "Then we'll do the same for three divided by two.",
  ],
  zPairs: [
    "Write three minus five as the pair three, five. It's just two natural numbers.",
    "Zero minus two, one minus three and two minus four should all give the same answer.",
    "So call a, b and c, d the same when a plus d equals b plus c. That only needs addition.",
    "Each diagonal line is one blob. The whole line is the integer minus two.",
    "Collapse every diagonal to a point, and the points line up into the integers.",
  ],
  zArith: [
    "To add, add the pairs part by part. Minus five plus four, as two, seven plus five, one, gives seven, eight.",
    "Seven, eight sits on the line of minus one. Other pairs for minus five and four land on the same line.",
    "And three, five plus five, three is eight, eight, which is zero. Every integer has an opposite now.",
  ],
  minusTimes: [
    "Multiplication has a pair formula too. Minus one times minus one comes out as one.",
    "That's not a convention. Keep the distributive law, and zero equals minus one plus minus one times minus one.",
    "So minus one times minus one has to be one. Any system with negatives and the distributive law agrees.",
  ],
  zhengfu: [], // Chinese edition only
  qBuild: [
    "Division gets the same treatment. Three divided by two has no integer answer, so take the pair three, two.",
    "Pairs p, q and r, s match when p times s equals q times r. Each blob is a line through the center.",
    "The row with zero on the bottom stays out. Let it in, and zero over zero glues every line into one.",
    "Now every fraction except zero has an inverse: two thirds times three halves is one.",
  ],
  mediant: [
    "Here's a tempting way to add fractions: add the tops, and add the bottoms.",
    "One half plus one third gives two fifths. Write one half as two quarters, and you get three sevenths.",
    "Two fifths isn't three sevenths, so this rule isn't well defined. It works on pairs, not on numbers.",
  ],
  ledger: [
    "The tower gets two new floors. The integers form a ring: you can add, subtract and multiply.",
    "The rationals form a field: you can also divide by anything except zero.",
    "Each floor cost something. The integers have no smallest number, and no fraction comes right after zero.",
  ],
  endCard: [
    "We built negatives and fractions out of pairs, and every rule they follow is now a theorem.",
    "Next episode: the rationals look solid, yet x squared equals two has no answer. Where's the hole?",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第六集。减法与除法：造出整数和有理数。"],
  coldOpen: [
    "三减五等于几？从三往回数，数三步就到零，再往下就没路了。",
    "过去的办法是发明一个新符号“负二”，再规定负负得正之类的规则。",
    "我们不发明任何东西。负二，就用已有的数对 (3, 5) 来造。",
    "然后，三除以二也照这样办。",
  ],
  zPairs: [
    "把三减五写成数对 (3, 5)。它只是两个自然数。",
    "零减二、一减三、二减四，答案都应该一样。",
    "所以规定：a 加 d 等于 b 加 c 时，(a, b) 和 (c, d) 算一样。这里只用到加法。",
    "每一条斜线是一团。整条线，就是整数负二。",
    "把每条斜线缩成一个点，这些点排成一行，就是整数。",
  ],
  zArith: [
    "加法就是对应分量相加。负五加四，用 (2, 7) 加 (5, 1)，得到 (7, 8)。",
    "(7, 8) 落在负一那条线上。换别的数对代表负五和四，也落在同一条线上。",
    "(3, 5) 加 (5, 3) 是 (8, 8)，也就是零。现在每个整数都有相反数。",
  ],
  minusTimes: [
    "乘法也有数对公式。负一乘负一，算出来是一。",
    "这不是人为约定。只要分配律成立，零就等于负一加上负一乘负一。",
    "所以负一乘负一只能是一。任何有负数、守分配律的数系，都得这样。",
  ],
  // 只在中文版出现：《九章算术》方程章“正负术”，刘徽注“正算赤，负算黑”。
  zhengfu: [
    "约两千年前的《九章算术》已经在用负数。方程章的“正负术”说：同名相除，异名相益。",
    "刘徽注：“正算赤，负算黑。”红色算筹记正，黑色算筹记负。",
    "古人把规则写了下来。这一集，我们用数对把规则证出来。",
  ],
  qBuild: [
    "除法也照办。三除以二在整数里没有答案，那就取数对 (3, 2)。",
    "p 乘 s 等于 q 乘 r 时，(p, q) 和 (r, s) 算一样。每一团都是一条过中心的直线。",
    "分母为零的那一行不准进来。一旦放进来，零比零会把所有直线粘成一条。",
    "现在除了零，每个分数都有倒数：三分之二乘二分之三等于一。",
  ],
  mediant: [
    "有一种很诱人的分数加法：分子加分子，分母加分母。",
    "二分之一加三分之一，得五分之二。把二分之一写成四分之二，却得到七分之三。",
    "五分之二不等于七分之三，所以这条规则不是良定义的。它作用在数对上，而不是数上。",
  ],
  ledger: [
    "数塔多了两层。整数构成环：能加、能减、能乘。",
    "有理数构成域：除了零，什么都能除。",
    "每一层都有代价。整数没有最小的数；有理数里，零后面没有“下一个”分数。",
  ],
  endCard: [
    "我们用数对造出了负数和分数，它们遵守的每条规则，现在都是定理。",
    "下一集：有理数看起来密不透风，可 x² = 2 却没有解。洞在哪里？",
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
  coldOpen: { 0: 4.6 },
  zPairs: { 4: 4.9 },
  zArith: { 2: 4.2 },
  minusTimes: { 0: 3.7 },
  zhengfu: { 0: 4.8 },
  qBuild: { 2: 4.5 },
  ledger: { 1: 3.6 },
  endCard: { 0: 4.0, 1: 5.0 },
};

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };

export const sceneOrder: SceneId[] = [
  "brand",
  "title",
  "coldOpen",
  "zPairs",
  "zArith",
  "minusTimes",
  "zhengfu",
  "qBuild",
  "mediant",
  "ledger",
  "endCard",
];

export const S1E06 = makeEpisodeTiming({
  narration: NARRATION,
  order: sceneOrder,
  minSeconds: MIN_SECONDS,
  fixedSeconds: FIXED_SECONDS,
  onlyIn: { zhengfu: "zh" },
});
