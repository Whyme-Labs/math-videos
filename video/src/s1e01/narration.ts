import {
  barTime,
  BEAT_SECONDS,
  musicPlan,
  nearestBeat,
  nextBarIndex,
  nextBeat,
} from "./music";

// Narration for S1E01, condensed from lessons/s1/e01-what-is-a-number.md.
// Each scene's timing is derived from these lines, so editing the script
// re-times the video. Scene components look up cue frames by line index.

export type SceneId =
  | "brand"
  | "title"
  | "coldOpen"
  | "defineThree"
  | "numerals"
  | "ladder"
  | "whyHard"
  | "matching"
  | "tower"
  | "buildDescribe"
  | "roadmap"
  | "endCard";

const EN: Record<SceneId, string[]> = {
  brand: [],
  title: ["Season one, episode one. What is a number?"],
  coldOpen: [
    "Three questions that sound like homework for children.",
    "First: does zero point nine nine nine, with nines forever, equal one?",
    "Half the internet says yes. The other half says it always falls a little short.",
    "Second: is the square root of two a number? You can draw it, but its decimals never end.",
    "Third: are there more fractions than whole numbers? There are infinitely many between zero and one alone.",
    "We'll answer all three this season.",
  ],
  defineThree: [
    "A five-year-old can hold up three fingers and tell you what three is.",
    "Yet in 1850, no mathematician had written down a definition of three.",
    "Attempt one: three is the symbol 3. But the Romans wrote III for the same number.",
    "Attempt two: three is what all groups of three have in common. That's circular.",
    "Attempt three: three is a point on the number line. Then where does the line come from?",
    "Attempt four: three is two plus one. Then what are two, one, and plus?",
    "Each attempt returns later in the season, but none is a definition yet.",
  ],
  numerals: [
    "First, separate a number from its name.",
    "Here is one number. In base ten we write it forty-five.",
    "In base two it's one zero one one zero one. In base seven it's six three. The Romans wrote X L V.",
    "These five numerals are names for one number.",
  ],
  ladder: [
    "To get the base-two name, divide by two again and again and keep the remainders.",
    "Forty-five, twenty-two, eleven, five, two, one.",
    "Read the remainders from the bottom up: one zero one one zero one.",
    "In any base, every whole number has exactly one name. That's a theorem.",
    "The proof uses division and induction. To build numbers from scratch, we have to prove those first.",
  ],
  whyHard: [
    "Each of our three questions turns out to depend on a definition.",
    "A finite decimal is a finite sum: nine tenths plus nine hundredths plus nine thousandths.",
    "An infinite decimal would be an infinite sum, and school never says how to add infinitely many numbers.",
    "The gap to one goes from a tenth to a hundredth to a thousandth, smaller than any size you name. Episode nine makes this precise with limits.",
    "One point four squared is one point nine six, and one point five squared is two point two five. Root two lies between them, but no fraction squares to exactly two. Episodes seven and eight build numbers that include it.",
    "To compare infinite collections, we first need to define what same size means. That comes in episode eleven.",
  ],
  matching: [
    "A café has cups and saucers. Are there equally many? You can tell without counting.",
    "Put one cup on each saucer. If nothing is left over, there are equally many.",
    "This matching needs no numbers. Counting is matching things with the words one, two, three.",
  ],
  tower: [
    "This is the tower of number systems we're going to build.",
    "Each floor exists because the floor below it can't solve some simple equation.",
    "The natural numbers can't solve x plus five equals three, so we build the integers.",
    "The integers can't solve two x equals three, so we build the rationals.",
    "The rationals can't solve x squared equals two, so we build the reals.",
    "The reals can't solve x squared equals minus one, so we build the complex numbers.",
    "Each new floor also loses something. We'll keep a list.",
    "For now the floors only have names.",
  ],
  buildDescribe: [
    "You can say what a mathematical object is in two ways.",
    "Build it: say what it's made of.",
    "Or describe it: list the properties it must have.",
    "A chess knight is carved wood shaped like a horse, but what makes it a knight is how it moves.",
    "A bottle cap moved in an L on the board works just as well as a knight.",
    "We'll do both for numbers: Peano describes them in episode two, and episode four builds them from the empty set.",
    "By the end of the season, the descriptions win. A number is anything that behaves like one.",
  ],
  roadmap: [
    "The plan: first, count, using as little as possible.",
    "Next, define plus and times from scratch.",
    "Then build the numbers out of sets.",
    "Then repair the tower one floor at a time, using one tool.",
    "By the end of Act Two, every floor is built and every question mark is gone.",
  ],
  endCard: [
    "We start with almost nothing.",
    "Next episode: what's the smallest set of rules that lets you count forever? Zero, and a way to say next.",
  ],
};

const ZH: Record<SceneId, string[]> = {
  brand: [],
  title: ["第一季，第一集。数是什么？"],
  coldOpen: [
    "三个问题，听起来都像小学生的作业。",
    "第一个：0.999……，9 一直写下去，它等于 1 吗？",
    "网上一半人说等于，另一半人说永远差一点。",
    "第二个：根号 2 是数吗？你能把它画出来，可它的小数永远写不完。",
    "第三个：分数比整数多吗？光是 0 到 1 之间，就有无穷多个分数。",
    "这一季，我们会回答这三个问题。",
  ],
  defineThree: [
    "五岁的孩子能竖起三根手指，告诉你这就是三。",
    "可是在 1850 年，还没有哪位数学家写下过“三”的定义。",
    "第一种说法：三就是符号 3。可罗马人写的是 III，数却是同一个。",
    "第二种说法：三是所有“三个一组”的共同点。这就绕回去了。",
    "第三种说法：三是数轴上的一个点。那这条数轴又是从哪儿来的？",
    "第四种说法：三等于二加一。那二、一和加号又是什么？",
    "这些说法在本季后面都会再出现，但没有一个算得上定义。",
  ],
  numerals: [
    "第一步，把数和它的名字分开。",
    "这是一个数。十进制里，我们写作四十五。",
    "二进制里是一零一一零一，七进制里是六三，罗马人写作 XLV。",
    "这五种写法，都是同一个数的名字。",
  ],
  ladder: [
    "要得到二进制的名字，就反复除以二，把余数记下来。",
    "四十五，二十二，十一，五，二，一。",
    "把余数从下往上读：一零一一零一。",
    "在任何进制下，每个正整数都恰好只有一个名字。这是一条定理。",
    "证明要用到除法和归纳法。要从零开始构造数，这些都得先证明。",
  ],
  whyHard: [
    "我们的三个问题，其实都取决于定义。",
    "有限小数就是有限项的和：十分之九，加百分之九，加千分之九。",
    "无限小数则是无限多项的和，可学校从没教过怎么把无限多个数加起来。",
    "和 1 的差距从十分之一，到百分之一，再到千分之一，比你说得出的任何量都小。第九集会用极限把它讲清楚。",
    "1.4 的平方是 1.96，1.5 的平方是 2.25。根号 2 就夹在中间，可没有哪个分数的平方恰好是 2。第七、八集会构造出包含它的数。",
    "要比较无穷多的东西，得先定义什么叫“一样多”。这在第十一集。",
  ],
  matching: [
    "咖啡馆里有一摞杯子和一摞碟子。它们一样多吗？不用数也能知道。",
    "每个碟子上放一个杯子。如果没有剩下的，就是一样多。",
    "这种配对完全不用数字。数数，其实就是把东西和“一、二、三”这些词配对。",
  ],
  tower: [
    "这就是我们要建的数系之塔。",
    "每一层之所以存在，是因为下面那层解不了某个简单的方程。",
    "自然数解不了 x 加 5 等于 3，所以我们建出整数。",
    "整数解不了 2x 等于 3，所以我们建出有理数。",
    "有理数解不了 x 的平方等于 2，所以我们建出实数。",
    "实数解不了 x 的平方等于负一，所以我们建出复数。",
    "每加一层，也会失去点什么。我们会记一本账。",
    "眼下，这些楼层还只有名字。",
  ],
  buildDescribe: [
    "说清一个数学对象是什么，有两种方式。",
    "构造它：说清它由什么做成。",
    "或者描述它：列出它必须具备的性质。",
    "国际象棋的马是一块雕成马头的木头，但让它成为马的，是它的走法。",
    "拿个瓶盖在棋盘上走日字，它照样是一匹好马。",
    "对数，我们两种都做：第二集用皮亚诺公理描述自然数，第四集用空集把它们构造出来。",
    "到本季结束，描述会胜出：凡是表现得像数的，就是数。",
  ],
  roadmap: [
    "计划是这样的：先计数，用尽量少的工具。",
    "再从零定义加法和乘法。",
    "然后用集合把数建起来。",
    "接着用一件工具，一层层修好这座塔。",
    "到第二幕结束，每层都会建好，所有问号都会消失。",
  ],
  endCard: [
    "我们从几乎一无所有开始。",
    "下一集：要永远数下去，最少需要什么？零，和“下一个”。",
  ],
};

export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];
export const NARRATION: Record<Locale, Record<SceneId, string[]>> = {
  en: EN,
  zh: ZH,
};

// "reading": captions only, timed to reading speed (about 18 characters per
// second, a common subtitle rate). "voiceover": timed to a narrator speaking
// at about 160 words per minute. Switch when a voiceover is recorded.
export const PACE: "reading" | "voiceover" = "reading";

// Chinese captions are read at about 7 characters per second (a common
// subtitle rate); spaces don't count.
export const lineSeconds = (line: string, locale: Locale = "en") =>
  locale === "zh"
    ? Math.max(1.5, line.replace(/\s/g, "").length / 7 + 0.25)
    : PACE === "reading"
      ? Math.max(1.5, line.length / 18 + 0.25)
      : Math.max(2.4, line.split(/\s+/).length / 2.67 + 0.5);

// Lines whose animation needs more time than reading the caption takes
// (scene id → line index → seconds). Values come from the scenes' frame offsets.
const MIN_SECONDS: Partial<Record<SceneId, Record<number, number>>> = {
  title: { 0: 2.8 },
  coldOpen: { 0: 1.6, 1: 2.6, 2: 2.2, 3: 4.0, 4: 3.2, 5: 1.9 },
  defineThree: { 0: 2.4, 2: 3.6, 3: 3.4, 4: 3.6, 5: 3.4, 6: 3.0 },
  numerals: { 0: 1.8, 1: 2.4, 2: 5.8, 3: 3.4 },
  ladder: { 0: 3.4, 1: 4.8, 2: 2.6, 3: 2.2, 4: 2.4 },
  whyHard: { 0: 2.2, 1: 2.8, 2: 3.4, 3: 5.4, 4: 10.2, 5: 5.6 },
  matching: { 1: 4.0, 2: 4.2 },
  tower: { 0: 2.6, 2: 4.8, 3: 4.6, 4: 4.2, 5: 4.8, 6: 2.0, 7: 1.8 },
  buildDescribe: { 0: 2.0, 1: 2.0, 2: 2.6, 3: 2.6, 4: 3.4, 5: 4.2, 6: 2.6 },
  roadmap: { 3: 4.5, 4: 3.0 },
  endCard: { 1: 7.0 },
};

const lineLength = (id: SceneId, index: number, locale: Locale) =>
  Math.max(
    lineSeconds(NARRATION[locale][id][index], locale),
    MIN_SECONDS[id]?.[index] ?? 0,
  );

// Scenes without narration (the brand sting) have a fixed length.
const FIXED_SECONDS: Partial<Record<SceneId, number>> = { brand: 3.5 };
const MIN_GAP_SECONDS = 1.5;

export const FPS = 30;
export const TRANSITION_FRAMES = 12;

export const sceneOrder: SceneId[] = [
  "brand",
  "title",
  "coldOpen",
  "defineThree",
  "numerals",
  "ladder",
  "whyHard",
  "matching",
  "tower",
  "buildDescribe",
  "roadmap",
  "endCard",
];

type SceneTiming = {
  readonly start: number;
  readonly starts: number[];
  readonly durationInFrames: number;
};

// Cut to the beat (卡点): every scene cut (the middle of its crossfade) lands
// on the next beat after the last caption is read, and every caption change
// moves to the nearest beat. Animations key off caption cues, so they land on
// the beat too. The video ends on a bar so the song's ending fits.
const buildTimeline = (locale: Locale) => {
  const half = TRANSITION_FRAMES / 2 / FPS;
  const timeline = {} as Record<SceneId, SceneTiming>;
  let startFrame = 0;
  let endBar = 0;
  sceneOrder.forEach((id, index) => {
    const start = startFrame / FPS;
    const lines = NARRATION[locale][id];
    const fixed = FIXED_SECONDS[id];
    const rel: number[] = [0];
    let naturalEnd = fixed ?? 0;
    if (fixed === undefined) {
      let t = 0;
      lines.forEach((_, j) => {
        if (j > 0) {
          let snapped = nearestBeat(start + t) - start;
          while (snapped < rel[j - 1] + MIN_GAP_SECONDS)
            snapped += BEAT_SECONDS;
          rel.push(snapped);
          t = snapped;
        }
        t += lineLength(id, j, locale);
      });
      naturalEnd = t;
    }
    let end: number;
    if (index < sceneOrder.length - 1) {
      end = nextBeat(start + naturalEnd - half - 0.1) + half;
    } else {
      endBar = nextBarIndex(start + naturalEnd);
      end = barTime(endBar);
    }
    const durationInFrames = Math.round(end * FPS) - startFrame;
    timeline[id] = {
      start: startFrame,
      starts: rel.map((r) => Math.round((start + r) * FPS) - startFrame),
      durationInFrames,
    };
    startFrame += durationInFrames - TRANSITION_FRAMES;
  });
  return { timeline, endBar };
};

const TIMELINES = { en: buildTimeline("en"), zh: buildTimeline("zh") };

// Start frame of each line within its scene, plus the scene's total length.
export const sceneTiming = (id: SceneId, locale: Locale = "en") =>
  TIMELINES[locale].timeline[id];

export const sceneStartFrame = (id: SceneId, locale: Locale = "en") =>
  TIMELINES[locale].timeline[id].start;

export const sceneDuration = (id: SceneId, locale: Locale = "en") =>
  TIMELINES[locale].timeline[id].durationInFrames;

export const episodeDuration = (locale: Locale = "en") =>
  sceneStartFrame("endCard", locale) + sceneDuration("endCard", locale);

export const musicSegments = (locale: Locale = "en") =>
  musicPlan(TIMELINES[locale].endBar);
