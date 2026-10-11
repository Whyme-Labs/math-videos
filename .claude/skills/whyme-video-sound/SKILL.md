---
name: whyme-video-sound
description: Sound rules for Whyme Labs math videos. Covers background music cut to the beat (卡点): the beat grid, bar-aligned looping and splices, and the song's real ending. Also covers the synthesized sound-effect vocabulary, where effects go and mix levels. Use it whenever you add or move a sound effect, change or replace the background track, change scene lengths so the music plan moves, or when something "sounds off", clicks, drifts off the beat or is too loud.
---

# Music and sound effects

## Background music, cut to the beat

The track is `public/music/bgm.wav` ("We Never", instrumental). It is
licensed separately and kept out of git, so copy it in before rendering.
Keep the source as WAV. AAC trims landed about 31 ms late and the beat
drifted at every splice.

**The grid** (`music.ts`): 128 BPM, first beat at 0.4721 s, a beat every
0.469 s and a bar every 1.875 s. The music starts at video time 0 and every
splice is a whole number of bars, so this grid holds for the whole
video.

**What lands on the beat:**

- Every caption change goes to the nearest beat (`nearestBeat`).
- Every scene cut (the middle of the crossfade) goes to the next beat after
  the last line is read (`nextBeat`).
- The video ends on a bar (`nextBarIndex`), so the song's ending fits.
- Animations key off cues, so they hit the beat as well.
- `SceneShell` lets the stage lights swell gently once per bar
  (`stageSwell`). Per-beat flashing (`beatPulse`) looked like flicker on the
  whole background, so it is only for small accents.

**Splice plan** (`musicPlan(endBar)`): intro and body play once (bars 0–72).
For a longer video, the body (bars 8–72) loops whole, then a partial body
fills the gap, and the song's real ending (bars 72–80) always closes the
video. `Music.tsx` places each segment with 2-frame fades at the seams so
splices don't click, and adds a 3 s fade at the very end.

**New track:** run `scripts/analyze-beats.py` (librosa, in a venv), then
update the constants at the top of `music.ts`: tempo, first beat, body start
and end bars, and outro bars. Everything re-snaps. Listen to every splice in
the render, or check the onsets with librosa against the planned grid.
Aim for a median offset under 10 ms.

**Level:** `MUSIC_VOLUME` is 0.6 while the video is captions-only. Drop it
to about 0.2 under a voiceover.

## Sound effects

All effects are original. `scripts/make-sfx.py` synthesizes them with numpy
into `public/sfx/*.wav`, and they're committed. The pitched ones are tuned to
G minor (root G3 = 196 Hz), the key of the track, so they sit inside the
music instead of fighting it. To change one, edit the script and re-run it.
Don't drop in downloaded sound files, because their licences and tuning
won't match.

| Name | Default vol | Use it for |
|---|---|---|
| `whoosh` | 0.22 | every scene cut (Episode.tsx adds it 2 frames before), big camera moves |
| `pop` | 0.40 | an object or label arriving (springIn) |
| `tick` | 0.25 | small steps: counting, digits, dots landing, a ladder rung |
| `chime` | 0.35 | a title or idea appearing, a gentle reveal |
| `ding` | 0.35 | a result, "matched", a correct answer |
| `sparkle` | 0.35 | a payoff or magic moment: a new floor, the verdict |
| `riser` | 0.30 | tension building into a reveal (lead in by its length) |
| `thud` | 0.50 | failure, a strike-out, something landing heavily (pair with `shake`) |
| `scratch` | 0.30 | writing, crossing out, drawing a line with a pencil or compass |
| `clink` | 0.30 | cups and other physical props touching |
| `page` | 0.30 | dictionary or book pages, ledger entries |
| `pluck1`…`pluck6` | 0.35 | rising notes for a sequence (counting 1, 2, 3…), via `PLUCKS[i]` |

Rules:

- **Sound what moves.** Every visible event (an arrival, a hit, a reveal, a
  cut) gets a sound at the frame it happens: `<Sfx name="pop" at={cues[2] + 12} />`.
  Put the sound on the frame where the motion lands, not where it starts. A
  dropped cup clinks when it touches the saucer.
- **Use the same offset as the animation.** If the motion is
  `springIn(frame, cues[1] + i * 14, …)`, the sound is at
  `cues[1] + i * 14 + <frames to land>`.
- **Don't stack.** No more than two effects within about 3 frames of each
  other. For a burst of many items, play a softer `tick` per item
  (volume 0.15–0.25), or one sound for the group.
- **Plucks go upward.** Use `PLUCKS[i]` in order for sequences, so counting
  sounds like counting.
- **Stay under the music.** Defaults are tuned against `MUSIC_VOLUME` 0.6.
  Override `volume` only to go softer for repeats, not louder.
- One meaning, one sound, for the whole series. A failure is always a
  `thud`, never a `ding`.
