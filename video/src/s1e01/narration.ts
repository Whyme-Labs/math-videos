import { barTime, BEAT_SECONDS, musicPlan, nearestBeat, nextBarIndex, nextBeat } from "./music";

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

export const narration: Record<SceneId, string[]> = {
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

// "reading": captions only, timed to reading speed (about 18 characters per
// second, a common subtitle rate). "voiceover": timed to a narrator speaking
// at about 160 words per minute. Switch when a voiceover is recorded.
export const PACE: "reading" | "voiceover" = "reading";

export const lineSeconds = (line: string) =>
  PACE === "reading"
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

const lineLength = (id: SceneId, index: number) =>
  Math.max(lineSeconds(narration[id][index]), MIN_SECONDS[id]?.[index] ?? 0);

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

type SceneTiming = { readonly start: number; readonly starts: number[]; readonly durationInFrames: number };

// Cut to the beat (卡点): every scene cut (the middle of its crossfade) lands
// on the next beat after the last caption is read, and every caption change
// moves to the nearest beat. Animations key off caption cues, so they land on
// the beat too. The video ends on a bar so the song's ending fits.
const buildTimeline = () => {
  const half = TRANSITION_FRAMES / 2 / FPS;
  const timeline = {} as Record<SceneId, SceneTiming>;
  let startFrame = 0;
  let endBar = 0;
  sceneOrder.forEach((id, index) => {
    const start = startFrame / FPS;
    const lines = narration[id];
    const fixed = FIXED_SECONDS[id];
    const rel: number[] = [0];
    let naturalEnd = fixed ?? 0;
    if (fixed === undefined) {
      let t = 0;
      lines.forEach((_, j) => {
        if (j > 0) {
          let snapped = nearestBeat(start + t) - start;
          while (snapped < rel[j - 1] + MIN_GAP_SECONDS) snapped += BEAT_SECONDS;
          rel.push(snapped);
          t = snapped;
        }
        t += lineLength(id, j);
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

const { timeline, endBar } = buildTimeline();

// Start frame of each line within its scene, plus the scene's total length.
export const sceneTiming = (id: SceneId) => timeline[id];

export const sceneStartFrame = (id: SceneId) => timeline[id].start;

export const sceneDuration = (id: SceneId) => timeline[id].durationInFrames;

export const episodeDuration = sceneStartFrame("endCard") + sceneDuration("endCard");

export const musicSegments = musicPlan(endBar);
