// Background music: "We Never" (instrumental), public/music/bgm.wav.
// Measured with librosa (see video/README.md): a constant 128 BPM grid whose
// first beat is at 0.4721 s and whose bars start every 4 beats from there.
export const MUSIC_SRC = "music/bgm.wav"; // WAV, not AAC, so bar-aligned trims are sample-accurate
export const BEAT_SECONDS = 60 / 128;
export const BAR_SECONDS = 4 * BEAT_SECONDS;
export const FIRST_BEAT_SECONDS = 0.4721;

// Song sections, in bars counted from the first beat.
const BODY_START_BAR = 8; // after the intro
const BODY_END_BAR = 72; // the outro starts here
const OUTRO_BARS = 8; // bars 72–80: the ending, fading to silence by bar 80
const BODY_BARS = BODY_END_BAR - BODY_START_BAR;

export const barTime = (bar: number) => FIRST_BEAT_SECONDS + bar * BAR_SECONDS;

// Music starts at video time 0, and every splice is a whole number of bars,
// so this grid holds for the whole episode.
export const nearestBeat = (t: number) =>
  FIRST_BEAT_SECONDS + Math.round((t - FIRST_BEAT_SECONDS) / BEAT_SECONDS) * BEAT_SECONDS;

export const nextBarIndex = (t: number) => Math.ceil((t - FIRST_BEAT_SECONDS) / BAR_SECONDS - 1e-6);

export const nextBeat = (t: number) =>
  FIRST_BEAT_SECONDS + Math.ceil((t - FIRST_BEAT_SECONDS) / BEAT_SECONDS - 1e-6) * BEAT_SECONDS;

export type MusicSegment = { readonly videoStart: number; readonly songStart: number; readonly seconds: number };

// Splice plan for a video that ends on bar `endBar`:
// intro + body once, then whole body loops, then the last bars of the body
// running straight into the song's real ending, which finishes the video.
export const musicPlan = (endBar: number): MusicSegment[] => {
  const outroStartBar = endBar - OUTRO_BARS;
  const segments: MusicSegment[] = [];
  const firstPlayBars = Math.min(outroStartBar, BODY_END_BAR);
  segments.push({ videoStart: 0, songStart: 0, seconds: barTime(firstPlayBars) });
  let filler = outroStartBar - BODY_END_BAR;
  let bar = BODY_END_BAR;
  while (filler >= BODY_BARS) {
    segments.push({ videoStart: barTime(bar), songStart: barTime(BODY_START_BAR), seconds: BODY_BARS * BAR_SECONDS });
    bar += BODY_BARS;
    filler -= BODY_BARS;
  }
  if (filler > 0) {
    segments.push({ videoStart: barTime(bar), songStart: barTime(BODY_END_BAR - filler), seconds: filler * BAR_SECONDS });
    bar += filler;
  }
  const outroStart = Math.max(bar, outroStartBar);
  segments.push({ videoStart: barTime(outroStart), songStart: barTime(BODY_END_BAR), seconds: OUTRO_BARS * BAR_SECONDS });
  return segments;
};

// 0..1 pulse that peaks on each beat and decays quickly; bars hit harder.
export const beatPulse = (seconds: number) => {
  const k = Math.floor((seconds - FIRST_BEAT_SECONDS) / BEAT_SECONDS);
  if (k < 0) return 0;
  const since = seconds - (FIRST_BEAT_SECONDS + k * BEAT_SECONDS);
  const strength = k % 4 === 0 ? 1 : 0.45;
  return strength * Math.exp(-since / 0.16);
};
