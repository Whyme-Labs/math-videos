---
name: whyme-video-motion
description: Animation and pacing rules for Whyme Labs math videos. Show the math through motion instead of slides of text, key every animation to a caption cue, use the shared spring and camera helpers, and keep the pace tight so there's never dead air after a caption has been read. Use it whenever you animate or re-time a scene in video/, when a scene "feels like PowerPoint", "too slow", "boring" or "static", and before you add or change MIN_SECONDS, transitions or scene lengths.
---

# Motion and pacing

Two pieces of user feedback shaped these rules:

1. "I have fully read the subtitle already, and then still have to wait for
   2-3 seconds for the next scene. This makes the video boring."
2. "I don't want it to be just like ppts, it should have more dynamics to
   show the knowledge instead of relying on the words."

3. After S1E10: "Our videos look like flipping textbooks, still not
   interesting and dynamic enough. Add more movement and visuals. Show
   instead of tell."

So the picture has to carry the idea, and the clock has to follow the
reader. Feedback 3 came after every scene already had motion on every
line, so "something moves" is not enough. The rules under "Not a textbook"
say what was still textbook-like and what to do instead.

## Not a textbook

These were the textbook habits in S1E05–S1E10. Don't use them.

- **Diagram on the left, a column of text or formulas on the right.** This
  is a textbook page. Instead, let the picture take the whole frame, and put
  the few words it needs on the objects themselves.
- **Stacks of formula lines** (a derivation building up line by line, as in
  the S1E10 cold open and pairs scene). Show at most one formula at a time,
  and build it from objects that were already on screen: the guests' room
  numbers become `n → n + 1`. If a derivation matters, act it out step by
  step, and let each step replace the one before.
- **Abstract diagrams with nothing in them.** Axes, dots and labelled
  arrows explain, but they don't hold attention. Put a concrete thing in
  the world first (a hotel, a stick, a cubic carved on a page, a knight on
  a board), and let the abstract diagram grow out of it.
- **Small pictures in the middle of a big empty frame.** The subject should
  fill most of the frame. If a diagram looks small on the contact sheet,
  scale it up or push the camera in.
- **A new layout for every line.** Fading one arrangement out and the next
  one in is a slide change. Keep one world for the whole scene and move
  through it.

What to do instead:

- **One world, a moving camera.** Build each scene, or the whole episode, as
  one large canvas, and travel through it with `Camera`: track along a
  corridor, push in on the detail, pull back to the whole. The camera
  should move on most lines.
- **Things with a life of their own.** Characters or objects that walk,
  wait, react and interact (guests carrying bags, a knife coming down, a
  stick being cut). A viewer follows a thing that does something much more
  easily than a label.
- **Let the viewer see it before anyone says it.** Play the event first
  (every guest steps one room up, and room 1 is empty), then name it. The
  narration explains something the viewer has just watched.
- **Depth and scale.** Use foreground and background layers and parallax.
  Big things move slowly and small things move fast. Make the frame look
  like a place rather than a sheet of paper.
- **Payoffs are events.** The key moment of a scene gets its biggest motion:
  a door slams, the line cracks, the plane swings open, the camera pulls
  out to show infinitely many rooms. Never a box of text that fades in.

## Show, don't tell

- **Every narration line has an action.** Before you write a scene, list
  each line with the thing that moves while it plays. "Numerals are names"
  became 45 dots regrouping into tens, twos, sevens and Roman numerals.
  "Divide by two" became dots splitting in half with a remainder dropping
  out. If you can't name an action, rewrite the line.
- **Act out the claim.** When the narration says something fails, show it
  failing: a definition gets struck out, a cup has no saucer, a square
  doesn't close up. When it says two things match, move them onto each
  other.
- **Words on screen are labels, not paragraphs.** The caption already holds
  the sentence. On-screen text is a short label next to an object, a
  heading of a few words, or a verdict. Six words is a lot. Never put the
  caption's sentence on screen twice.
- **Change the picture often.** Something should arrive, move or transform
  at least every 2 seconds. A shot that is still for 3 seconds, apart from
  the shell's drift, needs a reason.
- **Transform things instead of replacing them.** Morph, regroup, slide or
  zoom the same object so the viewer sees that it is the same thing in a new
  form. Cutting to a new slide loses that link.
- **Move things, don't flash them.** Motion means position, scale and
  drawing-on. Rapid brightness or opacity changes on big areas read as
  flicker (the user asked for less of it after S1E01). Use `beatPulse` only
  on small accents, never on the background.
- **Use the camera.** `Camera` pushes in on the detail being discussed and
  pulls back to show context. Zooming into 0.999… or into √2 on the number
  line *is* the argument.

## Timing comes from the narration

Scenes never hard-code seconds. `narration.ts` turns each line into a cue
frame, and scenes animate relative to those cues:

```tsx
const cues = useCues("matching");             // start frame of each line
const drop = springIn(frame, cues[1] + i * 14, fps, 7, 220);
<Sfx name="clink" at={cues[1] + i * 14 + 10} />
```

- Offsets inside a line (`cues[1] + 20`) are fine. Absolute frames
  (`frame > 240`) are not, because they break when the script or the
  language changes.
- Animate on the cue. Cues are snapped to the music beat, so motion that
  starts on a cue hits the beat.
- Stagger groups by 10–15 frames per item (dots, cups, letters).

### How long a line stays up

`lineSeconds` gives reading time: English `chars / 18 + 0.25 s`, Chinese
`chars / 7 + 0.25 s`, at least 1.5 s. Captions change on the nearest beat,
at least 1.5 s apart. A scene ends on the first beat after its last line has
been read, and the 12-frame crossfade is centred on that beat.

`MIN_SECONDS[scene][line]` holds a line open longer when its animation needs
more time than reading does. Rules:

- Add an entry only when the animation genuinely needs it, and set it from
  the scene's actual frame offsets: the last important motion ends, plus
  about 0.5 s to see the result.
- If a line needs much more than its reading time, split the animation
  across two lines instead of holding the caption.
- When you shorten an animation, shrink or remove its entry too.
- `PACE = "voiceover"` switches to speech timing once narration is recorded.

## Motion vocabulary

Use the helpers in `components/motion.ts` and `components/anim.ts`. They give
the series one feel.

| Helper | Use for |
|---|---|
| `springIn(frame, start, fps, damping=12, stiffness=170)` | things arriving, with a little overshoot (pops, drops, stamps) |
| `glide(frame, start, fps, frames=20)` | moves that must land exactly without wobbling (regrouping, sliding onto a target) |
| `fadeIn` / `fadeOut` / `window` | opacity, eased (`bezier(0.16,1,0.3,1)`), about 15 frames |
| `riseIn(frame, start, 30)` | labels and text coming in from 30 px below |
| `progress` / `ramp` | eased or linear 0→1 progress for drawing lines and zooms |
| `typed(text, frame, start, fps, 28)` | typewriter for definitions and dictionary entries |
| `hop(t, x0, y0, x1, y1, h)` | pieces jumping along an arc (knight moves, counting along a line) |
| `shake(frame, start, 14)` | "no, that fails", 18 frames, paired with a red ✗ and the `thud` SFX |
| `stageSwell(seconds)` | slow once-per-bar swell; SceneShell uses it for the stage lights |
| `beatPulse(seconds)` | sharp per-beat pulse; small accents only, never backgrounds |
| `Camera` | push-ins and pans |

- Use `interpolate` with clamping, `spring` or the helpers above for
  animation. Never use CSS transitions or `@keyframes`, because Remotion
  renders frame by frame (see `remotion-best-practices`).
- Enter things with spring or rise. Most exits are quick fades. Leave the
  stage tidy before the next idea arrives.
- Scene transitions are the 12-frame `fade()` in `Episode.tsx`, with a whoosh.
  Don't add a different transition for one scene.

## Checks before you call a scene done

- **The textbook test.** Pause on any frame. If it could be printed in a
  textbook as a figure with a caption, the scene is too static. There should
  be something you can only show in video: motion mid-way, a camera in
  flight, a character in the middle of doing something.
- **Count the formulas.** On any frame there is at most one formula or
  equation, apart from small labels on objects.

- Make a contact sheet (`whyme-video` skill). Each row of 6 frames should
  look different from the row above.
- Look for any stretch of 2 s or more where only the caption changes. In
  S1E02 the fixes were usually a counting token hopping along a chain, a
  recap of the previous idea, or empty slots that fill in later.
- Watch the end of each line. Did the animation finish before the caption
  changed? If not, the line needs a `MIN_SECONDS` entry or a faster
  animation. If it finished long before, trim the entry.
- Check both locales. Chinese lines are shorter, so animations get less
  room, which is exactly why `MIN_SECONDS` exists.
