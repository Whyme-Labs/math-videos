// Background music, one track per season, each measured with librosa
// (scripts/analyze-beats.py; see video/README.md) to a constant beat grid
// whose bars start every 4 beats from the first beat. Tracks are WAV, not
// AAC, so bar-aligned trims are sample-accurate.
export type Track = {
  readonly src: string;
  readonly bpm: number;
  readonly firstBeat: number; // seconds
  // song sections, in bars counted from the first beat
  readonly bodyStartBar: number; // after the intro
  readonly bodyEndBar: number; // the outro starts here
  readonly outroBars: number; // the song's real ending, fading to silence
};

export const TRACKS: Record<number, Track> = {
  // Season 1: "We Never" (instrumental). 128 BPM; the outro is bars 72–80.
  1: {
    src: "music/bgm.wav",
    bpm: 128,
    firstBeat: 0.4721,
    bodyStartBar: 8,
    bodyEndBar: 72,
    outroBars: 8,
  },
  // Season 2: the track supplied for Season 2, with its last 5 s (silence)
  // cut. 112.8 BPM. Intro bars 0–8, body 8–76 (a breakdown at 40–48), and
  // the ending fades out over bars 76–84.
  2: {
    src: "music/bgm-s2.wav",
    bpm: 112.795,
    firstBeat: 0.4362,
    bodyStartBar: 8,
    bodyEndBar: 76,
    outroBars: 8,
  },
};

export type MusicSegment = {
  readonly src: string;
  readonly videoStart: number;
  readonly songStart: number;
  readonly seconds: number;
};

// The beat grid and splice plan for one track. Music starts at video time
// 0, and every splice is a whole number of bars, so the grid holds for the
// whole episode.
export const beatGrid = (track: Track) => {
  const beat = 60 / track.bpm;
  const bar = 4 * beat;
  const first = track.firstBeat;
  const bodyBars = track.bodyEndBar - track.bodyStartBar;
  const barTime = (n: number) => first + n * bar;

  // Splice plan for a video that ends on bar `endBar`: intro and body once
  // (cut short for a short video), then whole body loops, then the last
  // bars of the body running straight into the song's real ending, which
  // finishes the video.
  const musicPlan = (endBar: number): MusicSegment[] => {
    const outroStartBar = endBar - track.outroBars;
    const segments: MusicSegment[] = [];
    const firstPlayBars = Math.min(outroStartBar, track.bodyEndBar);
    segments.push({
      src: track.src,
      videoStart: 0,
      songStart: 0,
      seconds: barTime(firstPlayBars),
    });
    // short videos stop the first play early, so the loops (if any) and
    // the ending pick up from wherever it stopped
    let n = firstPlayBars;
    let filler = outroStartBar - n;
    while (filler >= bodyBars) {
      segments.push({
        src: track.src,
        videoStart: barTime(n),
        songStart: barTime(track.bodyStartBar),
        seconds: bodyBars * bar,
      });
      n += bodyBars;
      filler -= bodyBars;
    }
    if (filler > 0) {
      segments.push({
        src: track.src,
        videoStart: barTime(n),
        songStart: barTime(track.bodyEndBar - filler),
        seconds: filler * bar,
      });
      n += filler;
    }
    segments.push({
      src: track.src,
      videoStart: barTime(Math.max(n, outroStartBar)),
      songStart: barTime(track.bodyEndBar),
      seconds: track.outroBars * bar,
    });
    return segments;
  };

  return {
    beatSeconds: beat,
    barSeconds: bar,
    barTime,
    nearestBeat: (t: number) => first + Math.round((t - first) / beat) * beat,
    nextBarIndex: (t: number) => Math.ceil((t - first) / bar - 1e-6),
    nextBeat: (t: number) =>
      first + Math.ceil((t - first) / beat - 1e-6) * beat,
    musicPlan,
    // 0..1 pulse that peaks on each beat and decays quickly; bars hit
    // harder. Too flashy for the whole background (it flickers twice a
    // second); use it only for small accents. The stage uses stageSwell.
    beatPulse: (seconds: number) => {
      const k = Math.floor((seconds - first) / beat);
      if (k < 0) return 0;
      const since = seconds - (first + k * beat);
      const strength = k % 4 === 0 ? 1 : 0.45;
      return strength * Math.exp(-since / 0.16);
    },
    // 0..1 slow swell, one smooth cosine per bar, brightest on the
    // downbeat. The stage lights breathe with the music instead of flashing
    // on every beat.
    stageSwell: (seconds: number) => {
      if (seconds < first) return 1;
      const phase = ((seconds - first) / bar) % 1;
      return 0.5 + 0.5 * Math.cos(2 * Math.PI * phase);
    },
  };
};

export type BeatGrid = ReturnType<typeof beatGrid>;
