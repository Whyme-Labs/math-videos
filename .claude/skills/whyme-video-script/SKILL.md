---
name: whyme-video-script
description: Writing rules for Whyme Labs math videos in English and Simplified Chinese. Covers the narration voice, episode structure, line length and caption rules, on-screen labels, callbacks, the mandatory unslop and humanizer passes, and how to make the Chinese edition (natural rewrite, punctuation, reading speed, font chunks). Also covers titles, descriptions and captions for posting on YouTube, X, LinkedIn, TikTok, 抖音 and bilibili. Use it whenever you write or edit narration.ts, i18n.tsx, a narration .md, an episode title, or any post or caption for the videos.
---

# Script and words

## Voice

- A curious friend explaining at a whiteboard. Plain words, short
  sentences, concrete things first (fingers, cups, chess pieces), and the
  formal word after the viewer has seen the idea.
- Questions are real questions the viewer would ask. Answer them, or say
  which episode answers them ("Episode nine makes this precise.").
- Be honest about what is hard or unsolved. Say "nobody had written down a
  definition", not "this fascinating concept".
- Don't flatter the viewer, and don't hype. No "mind-blowing", "beautiful",
  "elegant", "let's dive in".
- Use numbers and names: "in 1850", "Peano", "45 in base 7 is 63". Prefer
  them to vague claims.

## Structure

Follow the episode template in `storyline/04-production-notes.md`: cold
open (a puzzle, never a definition), naive attempt, crisis, construction,
payoff, zoom out, teaser. S1E01 runs about 4 minutes in English and 3.5
minutes in Chinese, and that is the target length. Cut whatever doesn't
serve the cold-open question.

## Lines and captions

Each entry in `NARRATION[locale][scene]` is one caption and one cue.

- **One idea per line.** 6–20 English words, at most 2 lines in the caption
  box (about 110 characters). If you need "and" twice, split it.
- **Write numbers the way they are said** when the sound matters ("zero
  point nine nine nine", "one zero one one zero one"). Use digits and
  symbols in on-screen labels (`0.999…`, `101101`).
- **A line is a cue.** Adding, removing or reordering lines shifts the
  `useCues` indexes and the `MIN_SECONDS` keys of that scene. Update the
  scene and `MIN_SECONDS` in the same change.
- **On-screen strings live in `i18n.tsx`**, never inline in a scene. Keep
  them to a few words (see `whyme-video-motion`). The EN and ZH objects must
  have the same keys, and TypeScript checks this.
- **Callbacks** name the episode: "↩ E11" in English, "↩ 第 11 集" in
  Chinese.

## Mandatory passes: unslop, then humanizer

Every new or edited narration line and on-screen string goes through both:

1. Read `.claude/skills/unslop/SKILL.md` and apply it. It has no model
   invocation, so read the file directly. It removes AI vocabulary,
   "not just X but Y", forced triads, em dashes, filler and generic
   conclusions.
2. Read `.claude/skills/humanizer/SKILL.md` and apply it. It catches staged
   openers, one-line zingers, inflated claims and sales tone.

Then read the lines aloud in your head at speaking pace. Rewrite anything
you'd stumble over. The passes apply to Chinese too: no 「不仅……而且」
padding, no 「让我们一起探索」, no stacked four-character idioms.

## Chinese edition (简体中文)

- **Rewrite, don't translate.** Keep the same idea, the same cue count and
  the same animation per line, but write how a Chinese teacher would say it.
  Line counts per scene must match English exactly, because the scenes index
  cues by line.
- **Punctuation:** full-width ，。？！：“”（）……. Leave one space between
  Chinese and Latin letters or digits ("第 2 集", "XLV"), and no space before
  full-width punctuation.
- **Terms:** 自然数 / 整数 / 有理数 / 实数 / 复数, 皮亚诺, 冯·诺伊曼, 集合, 双射.
  Use the standard mainland textbook term, and keep a term the same once
  you've chosen it.
- **Reading speed** is about 7 characters per second, set in `lineSeconds`.
  Chinese lines come out shorter than English, so check that animations
  still fit (`MIN_SECONDS`).
- **Fonts.** After changing any Chinese text, regenerate the font chunks:
  ```bash
  cd video
  npm i --no-save @fontsource-variable/noto-sans-sc
  python3 scripts/zh-fonts.py      # scans all of src, rewrites src/shared/zh-fonts.json + public/fonts/zh
  ```
  Commit both outputs. A missed character shows up as tofu (□) in the
  render.
- Keep a readable script in `video/sNeNN-narration-zh.md`, next to the
  English one.
- **Bring in Chinese mathematical and cultural history where it fits.**
  Viewers of the Chinese edition get more from an idea when it connects to
  something they already know. S1E02's Chinese edition adds a scene on 结绳记事
  and 道生一，一生二…, uses the 干支 cycle (癸亥 → 甲子) as its loop example, and
  counts with 算筹 (counting rods, with a blank for zero) instead of tally
  marks. Rules for these additions:
  - Every claim must be accurate and sourced. Name the source on screen
    (《周易·系辞下》, 《道德经》第四十二章, 《九章算术》), and quote the original
    wording exactly.
  - Draw parallels, not equations. Laozi was not stating Peano's axioms, so
    say "读起来就像在数数", not "老子早就发现了".
  - Keep each addition short: one scene of 2–4 lines, or one swapped example
    or visual. The episode still has to answer its own question.
  - **Mechanics.** A scene only in Chinese goes in the spec with
    `onlyIn: { <scene>: "zh" }`, and its English narration is `[]`. A
    swapped example inside a shared scene is a string in `i18n.tsx` (empty
    in English) or a flag such as `rods: true`. Shared scenes must keep the
    same line count in both languages.
  - Good candidates for later episodes: 《庄子·天下》"一尺之棰，日取其半，万世不竭"
    (0.999…, limits), 刘徽割圆术 (π, completing the reals), 勾股/弦图 (√2), and
    杨辉三角 (combinatorics).
    Already used: 结绳记事 and 干支 (S1E02), 里耶秦简九九表 (S1E03),
    “有生于无” and 《墨经》 (S1E04), 《孙子算经》's 物不知数 (S1E05),
    《九章算术》正负术 and 刘徽's red and black rods (S1E06), 《九章算术》少广章
    开方不尽 and 刘徽's 微少/微多 (S1E07).

## Titles and posts for each platform

Each episode gets a posting kit in `video/sNeNN-social.md`, in both languages.
Read `references/platforms.md` for each platform's conventions and limits,
and use the S1E01 kit (`video/s1e01-social.md`) as the model. The voice
rules above apply here too: lead with the cold-open question, no clickbait
promises the episode doesn't keep, and run the unslop and humanizer passes
on every post.
