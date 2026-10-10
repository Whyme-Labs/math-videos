# Math Videos: Remotion Project

Animated episodes for the series planned in [`../storyline`](../storyline)
and written up in [`../lessons`](../lessons), built with
[Remotion](https://www.remotion.dev) (React → video).

## Episodes

| Composition | Episode | Source | Script |
|---|---|---|---|
| `S1E01` | What Do We Mean by “Number”? | [`src/s1e01`](src/s1e01) | [`s1e01-narration.md`](s1e01-narration.md) |

Each scene is also registered on its own (folder `S1E01-Scenes` in Studio),
so it can be previewed and rendered separately.

## How an episode is put together

- **`narration.ts`** holds the voiceover, line by line, edited with the
  `unslop` and `humanizer` skills (run both on any new script). Scene lengths and
  every animation cue are computed from it, so editing the script re-times
  the picture. Lines are shown as captions until a voiceover is recorded.
- **`scenes/`** has one component per scene, following the lesson's shot
  list (`lessons/s1/e01-what-is-a-number.md`, "Visual and animation notes").
- **`components/`** has shared pieces that recur across the series: the
  number tower, the "open questions" tray, the caption shell, and
  animation helpers.
- **`theme.ts`** has the Whyme Labs violet and lemon palette and the fonts
  (see "Brand" in `storyline/04-production-notes.md`). The brand intro,
  watermark and logo components are in `components/Brand.tsx`, and the
  logo cut-outs are in `public/brand`. Fonts are bundled in `public/fonts`
  (from Google Fonts, SIL Open Font License) so renders work offline.

## Music and cutting to the beat (卡点)

The background track is `public/music/bgm.m4a`. It is kept out of git
because it is licensed separately, so copy it there before rendering.
`scripts/analyze-beats.py` measured it: 128 BPM, first beat at 0.472 s,
and a bar every 1.875 s.

- **`music.ts`** holds that beat grid and the splice plan. The song plays
  from the start, the 120-second body (bars 8 to 72) loops as needed, and
  the song's real ending (bars 72 to 80) closes the video. Every splice is
  a whole number of bars, so the beat never skips.
- **`narration.ts`** builds the timeline on the grid. Each scene cut (the
  middle of its crossfade) lands on the first beat of a bar, and each
  caption change moves to the nearest beat. The scene animations key off
  the captions, so they hit the beat too.
- **`SceneShell`** pulses the stage lights on every beat, and harder on
  the first beat of each bar.

Sound effects are original and committed. `scripts/make-sfx.py` synthesizes
them into `public/sfx` (pops, ticks, whooshes, pencil scratches, cup clinks,
thuds, page flicks, and bells and plucks tuned to G minor, the key of the
track). `components/Sfx.tsx` plays one at a scene frame, for example
`<Sfx name="pop" at={cues[1]} />`. The scenes place them on the frames
where animations happen, and every scene cut gets a soft whoosh.

For a new track, run the script, update the constants at the top of
`music.ts` (tempo, first beat, body and outro bars), and the cuts re-snap
on their own.

## Commands

```bash
npm i
npm run dev                                   # Remotion Studio preview
npx remotion render S1E01 out/s1e01.mp4       # full episode
npx remotion still S1E01-Tower out/tower.png --frame=900   # one frame
npm run lint                                  # eslint + tsc
```

## Adding a voiceover

Record `s1e01-narration.md` (or generate it with a TTS service; see the
`remotion-markup` skill's `voiceover.md`). Then add the audio with
`<Audio>` from `@remotion/media` in `Episode.tsx`, and tune
`WORDS_PER_SECOND` in `narration.ts` (or per-line durations) so the scenes
match the takes.

## Agent skills

The official Remotion agent skills are installed in `../.claude/skills`
(`remotion-best-practices` and the others), so Claude Code sessions in this
repo follow Remotion's conventions.
