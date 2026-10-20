---
name: whyme-video
description: House rules and the end-to-end workflow for Whyme Labs math videos (the Remotion project in video/). Use this skill whenever you make, edit, re-time, translate, render, review or deliver an episode or a scene of the math series, even for a small change like "make this scene faster", "add a sound here", "do the Chinese version" or "render episode 2". It routes to the style, motion, sound and script skills and holds the definition of done.
---

# Whyme Labs math videos

Every episode of the series should look, sound and move like the same show.
S1E01–S1E11 (`video/src/s1e01` … `s1e11`) are the reference
implementations, built on the shared code in `video/src/shared`. When this
skill and the code disagree, fix one of them so they agree again.

## The five skills

| Skill | Read it when you |
|---|---|
| `whyme-video` (this one) | start any video task: workflow, file layout, definition of done, delivery |
| `whyme-video-style` | place anything on screen: brand, palette, colour roles, fonts, layout grid, motifs |
| `whyme-video-motion` | animate a scene or change timing: show-don't-tell rules, cues, pacing, camera |
| `whyme-video-sound` | touch music or sound effects: beat grid, splices, SFX vocabulary, mix levels |
| `whyme-video-script` | write or edit narration or on-screen words, in English or Chinese |

Read the ones the task touches before you write code. A new episode touches
all of them.

## What the series is

- A tutorial series on numbers and linear algebra, planned in `storyline/`
  and written out lesson by lesson in `lessons/s1`, `lessons/s2`, `lessons/s3`.
- Each episode is a short animated film made from one lesson: 1920×1080,
  30 fps, captions on screen (voiceover optional), background music cut to
  the beat, synthesized sound effects.
- Every episode ships in English and Simplified Chinese from the same
  scenes.
- Viewers should learn by watching things move. The user's two strongest
  complaints so far were "it feels like PowerPoint" and "I finished reading
  and then had to wait". Both are rules now (see `whyme-video-motion`).

## Workflow for a new episode

1. **Read the lesson.** `lessons/sN/eNN-*.md` has the outline, examples and
   a "Visual and animation notes" shot list. `storyline/04-production-notes.md`
   has the episode template and the recurring motifs.
2. **Write the narration** (`whyme-video-script`). Write it into the
   episode's `narration.ts` and a readable `video/sNeNN-narration.md`. Run the
   `unslop` and `humanizer` passes. Aim for 3 to 5 minutes.
3. **Plan the scenes.** One scene per beat of the episode template (cold
   open, naive attempt, crisis, construction, payoff, zoom out, teaser),
   plus the brand sting, the title card and the end card. For every
   narration line, write down what moves on screen. If a line has nothing
   to show, cut the line or invent the visual before you write code.
4. **Build the scenes** (`whyme-video-style`, `whyme-video-motion`). Each one is
   a component in `scenes/` wrapped in `SceneShell`, timed only from `useCues`.
5. **Add sound** (`whyme-video-sound`). Put SFX on the frames where things
   happen. The music plan and the beat-snapped cuts come from `narration.ts`
   and `music.ts` without any extra work.
6. **Translate** (`whyme-video-script`, Chinese section). Add the ZH narration
   and strings, regenerate the Chinese font chunks, and register the `-ZH`
   composition.
7. **QA.** Run `npm run lint`. Make a contact sheet of every scene in both
   languages (below) and look at it. Then render the full episode.
8. **Deliver** (below).

## File layout

```
video/
  src/Root.tsx            one <SNENNCompositions /> per episode
  src/shared/             everything that makes episodes look alike
    theme.ts              palette + fonts (zh-fonts.json: Chinese font chunks)
    music.ts              beat grid, splice plan, stageSwell / beatPulse
    timeline.ts           makeEpisodeTiming: narration → beat-snapped cues
    episode.tsx           makeEpisodeCompositions: films EN + ZH, scene folders
    locale.tsx            Locale, useLocale, series-wide strings (useSeries)
    components/           SceneShell, Brand (+ SignOff), Music, Sfx, Camera,
                          motion/anim helpers, NumberLine, Tower, QuestionTray,
                          graph (number nodes, "next" arrows, tokens, robot),
                          worlds (loop / merge / ghost worlds), Domino,
                          pieces (number chips, pies, 12-point clock),
                          rationals (the dotted rational line, gaps)
    scenes/BrandIntro.tsx the 3.5 s sting, same in every episode
  src/sNeNN/              one folder per episode
    narration.ts          EN + ZH lines, MIN_SECONDS, order → makeEpisodeTiming
    i18n.tsx              every on-screen string, EN + ZH (useStrings)
    Episode.tsx           scene list → makeEpisodeCompositions("SNENN", …)
    scenes/               one component per scene
    components/           drawings only this episode needs
  public/brand|fonts|sfx  committed assets
  public/music/bgm.wav    licensed separately, gitignored
  scripts/                analyze-beats.py, make-sfx.py, zh-fonts.py
  out/                    renders, gitignored
```

Start a new episode by copying the shape of `src/s1e02`: write
`narration.ts`, `i18n.tsx` and the scenes, list them in `Episode.tsx`, and
add `<SNENNCompositions />` to `Root.tsx`. That gives you `SNENN`, `SNENN-ZH`
and every scene on its own (`SNENN-<Key>`, `SNENN-ZH-<Key>`). Anything a
second episode would reuse belongs in `src/shared`, and a change there
changes every episode, so re-check the older ones (render a few stills and
compare) when you touch it.

## Definition of done

An episode or scene change is finished when all of these hold:

- [ ] `npm run lint` passes (eslint and tsc).
- [ ] Every scene uses `SceneShell`, the theme tokens and the shared fonts.
      No hex colours or font names typed inside a scene.
- [ ] Every narration line has something moving that shows its idea, and
      every animation is keyed to a cue from `useCues`, not to a hard-coded
      second.
- [ ] No flicker: nothing large changes brightness on every beat, and
      nothing blinks. The stage only breathes once per bar (`stageSwell`).
- [ ] No dead air. Each caption stays up about as long as it takes to read
      it, and a scene cuts on the next beat after its last line. A
      `MIN_SECONDS` entry exists only where the animation needs it.
- [ ] Every visible event (an arrival, a hit, a reveal, a cut) has a sound,
      and no two loud sounds overlap.
- [ ] Narration and on-screen text went through `unslop` and `humanizer`.
- [ ] The Chinese edition has the same scenes and the same animation. Its
      text was rewritten in natural Chinese, and the zh font chunks were
      regenerated.
- [ ] You looked at a contact sheet of every scene in both languages: no
      overlaps, nothing outside the safe area, nothing cut off, no tofu (□)
      glyphs.
- [ ] The cold open is a story (a character, a place, something at stake)
      and comes before the title card. See `whyme-video-script`, "The hook".
- [ ] No scene is a textbook page: the picture fills the frame, the camera or
      the objects move on most lines, and no frame has more than one
      formula. See `whyme-video-motion`, "Not a textbook".
- [ ] The episode has a thumbnail: an entry in
      `video/src/thumbnails/thumbs.ts` (a hook of at most two short lines in
      each language) and a picture in `Thumbnail.tsx`. Then run
      `scripts/thumbnails.sh <NN>` and look at both PNGs. See
      `video/thumbnails/README.md`.

## QA: contact sheets

`scripts/contact-sheet.sh` renders one composition and tiles a frame from
every second into a single PNG, so you can check a whole scene at a glance.

```bash
cd video
../.claude/skills/whyme-video/scripts/contact-sheet.sh S1E01-Tower        # one scene
../.claude/skills/whyme-video/scripts/contact-sheet.sh S1E01-ZH-Tower 0.5 # 2 frames/s
```

Open the PNG it prints with the Read tool and look at it. To check one exact
moment, use `npx remotion still <id> out/x.png --frame=<n>`.

## Render and deliver

```bash
cd video
npx remotion render S1E01    out/s1e01-<slug>.mp4
npx remotion render S1E01-ZH out/s1e01-zh-<slug>.mp4
# a smaller copy for sharing
ffmpeg -i out/s1e01-<slug>.mp4 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 160k out/s1e01-share.mp4
```

- Upload only the video file when the user asks for a link (for example to
  here.now). Do not make a site or a player page unless they ask for one.
- Every public link contains the background music, which is licensed
  separately. Say so whenever you hand out a link.
- Name files `sNeNN-<slug>.mp4` and `sNeNN-zh-<slug>.mp4`.
