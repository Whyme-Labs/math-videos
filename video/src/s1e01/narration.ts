// Narration for S1E01, condensed from lessons/s1/e01-what-is-a-number.md.
// Each scene's timing is derived from these lines, so editing the script
// re-times the video. Scene components look up cue frames by line index.

export type SceneId =
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
  title: ["Season one. What is a number?"],
  coldOpen: [
    "Here are three questions. Each one sounds like it belongs on a primary-school worksheet.",
    "One: is zero point nine nine nine, with nines going on forever, equal to one?",
    "Half the internet says obviously yes. The other half says it's always a little bit short.",
    "Two: is the square root of two a number? You can draw it: it's the diagonal of a square with side one. But you can never finish writing it down.",
    "Three: are there more fractions than whole numbers? Between zero and one alone there are infinitely many fractions.",
    "Hold on to these. By the end of this season, all three will have answers, and some of those answers will surprise you.",
  ],
  defineThree: [
    "A five-year-old can hold up three fingers and tell you what three is.",
    "But ask the best mathematicians of 1850 to define the number three, and they would have struggled. Using a thing is not the same as defining it.",
    "Attempt one: three is the symbol three. But the Romans wrote three strokes, and the number didn't change. A symbol is just a name.",
    "Attempt two: three is what all collections of three things have in common. Close, but circular. To spot collections of three, you already need three.",
    "Attempt three: three is a point on the number line. Then where did the line come from?",
    "Attempt four: three is two plus one. Then what are two, one, and plus?",
    "None of these is silly. Each is the seed of a real answer later this season. But none of them is a definition yet.",
  ],
  numerals: [
    "So the first step is to separate a number from its name.",
    "Here is one number. In base ten, we call it forty-five.",
    "In base two, it's one zero one one zero one. In base seven, it's six three. The Romans wrote X L V.",
    "The dot never moved. Only the label changed. A numeral is a name. The number is the thing all the names point to.",
  ],
  ladder: [
    "How do we find the base-two name? Divide by two, again and again, and keep the remainders.",
    "Forty-five, twenty-two, eleven, five, two, one. Each time, write down what's left over.",
    "Read the remainders from the bottom up: one zero one one zero one.",
    "A theorem guarantees that in any base, every whole number gets exactly one name.",
    "But notice what the proof uses: division and induction, which are facts about numbers. If we want to define numbers from scratch, we'll have to earn those facts.",
  ],
  whyHard: [
    "Now look again at our three questions. Each one is a question about definitions, in disguise.",
    "A finite decimal is a finite sum: nine tenths, plus nine hundredths, plus nine thousandths.",
    "But an infinite decimal is an infinite sum, and nobody ever taught you how to add infinitely many things.",
    "Watch the gap to one: a tenth, a hundredth, a thousandth. It shrinks below any size you can name. That's a hint that the right idea is a limit. Episode nine.",
    "Root two is certainly a length. One point four squared is one point nine six; one point five squared is two point two five. It's squeezed in between. But no fraction squares to exactly two. To call it a number, we'll need a bigger system. Episodes seven and eight.",
    "And more fractions? For finite piles, we know what more means. For infinite ones, we need a definition of same size. Episode eleven.",
  ],
  matching: [
    "Here's a hint of that definition. A café has a tray of cups and a tray of saucers. Are there equally many, without counting?",
    "Put one cup on each saucer. If nothing is left over on either side, there are equally many.",
    "Matching decides same number without using numbers at all. Counting is just matching things with the words one, two, three.",
  ],
  tower: [
    "Here is the tower of number systems we're going to build.",
    "Each floor exists because the floor below can't solve a simple equation.",
    "In the natural numbers, x plus five equals three has no solution. So we build the integers.",
    "In the integers, two x equals three has no solution. So we build the rationals.",
    "In the rationals, x squared equals two has no solution. So we build the reals.",
    "And in the reals, x squared equals minus one is impossible. So we build the complex numbers.",
    "Every repair costs something, so we'll keep a ledger: what did we lose?",
    "Right now this is only scaffolding. We've written names on the floors, but we haven't built any of them.",
  ],
  buildDescribe: [
    "There are two ways to say what a mathematical object is.",
    "Build it: say what it's made of.",
    "Or describe it: list the properties it must have.",
    "A chess knight can be carved wood shaped like a horse. But what makes it a knight is how it moves.",
    "Put a bottle cap on the board and move it in an L, and it's a perfectly good knight.",
    "We'll do both for numbers. Peano will describe the natural numbers, and then we'll build them out of nothing but the empty set.",
    "In the end, description wins. A number is whatever behaves like one.",
  ],
  roadmap: [
    "Here's the plan. First, count, with the least equipment possible.",
    "Then calculate, defining plus and times from scratch.",
    "Then ground everything in sets.",
    "Then repair the tower, floor by floor, with one master tool.",
    "By the end of Act Two, every floor is built and every question mark is gone.",
  ],
  endCard: [
    "So let's start with almost nothing.",
    "Next time: what is the least you need to count forever? Just zero, and next.",
  ],
};

// Speaking rate used to time captions: about 150 words per minute.
const WORDS_PER_SECOND = 2.5;
const LINE_PADDING_SECONDS = 0.7;
const MIN_LINE_SECONDS = 2.4;

export const lineSeconds = (line: string) =>
  Math.max(MIN_LINE_SECONDS, line.split(/\s+/).length / WORDS_PER_SECOND + LINE_PADDING_SECONDS);

// Start frame of each line within its scene, plus the scene's total length.
export const sceneTiming = (id: SceneId, fps: number) => {
  const starts: number[] = [];
  let t = 0;
  for (const line of narration[id]) {
    starts.push(Math.round(t * fps));
    t += lineSeconds(line);
  }
  return { starts, durationInFrames: Math.round(t * fps) };
};

export const FPS = 30;
export const TRANSITION_FRAMES = 15;

export const sceneOrder: SceneId[] = [
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

export const sceneDuration = (id: SceneId) => sceneTiming(id, FPS).durationInFrames;

// Transitions overlap neighbouring scenes, so they shorten the total.
export const episodeDuration =
  sceneOrder.reduce((sum, id) => sum + sceneDuration(id), 0) -
  TRANSITION_FRAMES * (sceneOrder.length - 1);
