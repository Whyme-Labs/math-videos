import { beatGrid, type BeatGrid, TRACKS } from "./music";
import { LOCALES, type Locale } from "./locale";

// Every episode's timing is derived from its narration: each line is one
// caption and one cue, and scene lengths follow from how long the lines take
// to read. Editing the script re-times the picture.

export const FPS = 30;
export const TRANSITION_FRAMES = 12;

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

const MIN_GAP_SECONDS = 1.5;

export type EpisodeSpec<Id extends string> = {
  // Caption lines per scene, per language. Line counts must match across
  // languages for every scene both languages show.
  readonly narration: Record<Locale, Record<Id, string[]>>;
  readonly order: readonly Id[];
  // Scenes shown in one language only (e.g. a Chinese-history aside in the
  // Chinese edition). They are left out of the other languages' films.
  readonly onlyIn?: Partial<Record<Id, Locale>>;
  // Lines whose animation needs more time than reading the caption takes
  // (scene id → line index → seconds). Values come from the scenes' frame offsets.
  readonly minSeconds?: Partial<Record<Id, Record<number, number>>>;
  // Scenes without narration (the brand sting) have a fixed length.
  readonly fixedSeconds?: Partial<Record<Id, number>>;
  // Which season's music the cuts snap to (default 1).
  readonly season?: number;
};

export type SceneTiming = {
  readonly start: number;
  readonly starts: number[];
  readonly durationInFrames: number;
};

// Cut to the beat (卡点): every scene cut (the middle of its crossfade) lands
// on the next beat after the last caption is read, and every caption change
// moves to the nearest beat. Animations key off caption cues, so they land on
// the beat too. The video ends on a bar so the song's ending fits.
const buildTimeline = <Id extends string>(
  spec: EpisodeSpec<Id>,
  locale: Locale,
  grid: BeatGrid,
) => {
  const { barTime, nearestBeat, nextBarIndex, nextBeat } = grid;
  const half = TRANSITION_FRAMES / 2 / FPS;
  const timeline = {} as Record<Id, SceneTiming>;
  const order = orderFor(spec, locale);
  let startFrame = 0;
  let endBar = 0;
  order.forEach((id, index) => {
    const start = startFrame / FPS;
    const lines = spec.narration[locale][id];
    const fixed = spec.fixedSeconds?.[id];
    const rel: number[] = [0];
    let naturalEnd = fixed ?? 0;
    if (fixed === undefined) {
      let t = 0;
      lines.forEach((line, j) => {
        if (j > 0) {
          let snapped = nearestBeat(start + t) - start;
          while (snapped < rel[j - 1] + MIN_GAP_SECONDS)
            snapped += grid.beatSeconds;
          rel.push(snapped);
          t = snapped;
        }
        t += Math.max(
          lineSeconds(line, locale),
          spec.minSeconds?.[id]?.[j] ?? 0,
        );
      });
      naturalEnd = t;
    }
    let end: number;
    if (index < order.length - 1) {
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

// The scenes one language's film shows, in order.
const orderFor = <Id extends string>(spec: EpisodeSpec<Id>, locale: Locale) =>
  spec.order.filter((id) => (spec.onlyIn?.[id] ?? locale) === locale);

export type EpisodeTiming<Id extends string> = ReturnType<
  typeof makeEpisodeTiming<Id>
>;

export const makeEpisodeTiming = <Id extends string>(spec: EpisodeSpec<Id>) => {
  for (const id of spec.order) {
    if (spec.onlyIn?.[id]) continue;
    const n = spec.narration.en[id].length;
    for (const locale of LOCALES)
      if (spec.narration[locale][id].length !== n)
        throw new Error(`Scene ${id}: ${locale} has a different line count`);
  }
  const grid = beatGrid(TRACKS[spec.season ?? 1]);
  const timelines = Object.fromEntries(
    LOCALES.map((l) => [l, buildTimeline(spec, l, grid)]),
  ) as Record<Locale, ReturnType<typeof buildTimeline<Id>>>;
  const sceneTiming = (id: Id, locale: Locale = "en") =>
    timelines[locale].timeline[id];
  const last = (locale: Locale) => orderFor(spec, locale).slice(-1)[0];
  return {
    narration: spec.narration,
    order: spec.order,
    // Whether a scene appears in a language's film.
    shows: (id: Id, locale: Locale) => (spec.onlyIn?.[id] ?? locale) === locale,
    // Start frame of each line within its scene, plus the scene's total length.
    sceneTiming,
    sceneStartFrame: (id: Id, locale: Locale = "en") =>
      sceneTiming(id, locale).start,
    sceneDuration: (id: Id, locale: Locale = "en") =>
      sceneTiming(id, locale).durationInFrames,
    episodeDuration: (locale: Locale = "en") =>
      sceneTiming(last(locale), locale).start +
      sceneTiming(last(locale), locale).durationInFrames,
    // the season's beat grid (for the stage lights and beat accents)
    grid,
    musicSegments: (locale: Locale = "en") =>
      grid.musicPlan(timelines[locale].endBar),
  };
};
