---
name: whyme-video-style
description: Visual identity for Whyme Labs math videos. Covers the brand sting, watermark and end card, the violet-and-lemon palette (Season 1) and the deep-teal stage (Season 2) and what each colour means, fonts for English and Chinese, the 1920×1080 layout grid and type scale, and the recurring visual motifs (number tower, question tray, vectors in lemon, covectors in orange). Use it whenever you put anything on screen in video/: a new scene, a label, a diagram, a title card, or a colour or font change, and whenever someone asks how the videos should look.
---

# Whyme Labs video style

The look is a violet stage lit by a warm lemon-and-orange light column.
Objects are bright and saturated, text is warm white, and the background is
deep violet. The tokens live in `theme.ts`. Use them, and never type a hex
code or font name inside a scene. That one rule is what keeps 65 episodes
looking like one show.

## Brand

- **Opening sting (3.5 s, `BrandIntro`).** The gradient mark blooms out of a
  lemon glow, the white wordmark rises, then "presents" (呈现) appears. Every
  episode opens with it unchanged.
- **Title card.** The mark sits above a small uppercase season/episode line
  in highlight pink, then the title in `fonts.title` at about 132 px, then a
  muted subtitle. No captions and no watermark on this card.
- **Watermark.** Every content scene shows the mark (46 px) and wordmark
  (20 px) top-left at 85 % opacity. `SceneShell` draws it, so don't add your
  own.
- **End card.** "Next episode" teaser plus a "Whyme Labs · series" sign-off.
- **Logo files.** The logos are in `public/brand` (`whyme-mark.png`,
  `whyme-mark-white.png`, `whyme-wordmark-white.png`). Use `BrandMark` and
  `BrandWordmark`, which keep the aspect ratio. Never recolour, stretch or
  rebuild the logo in SVG.

## Palette and colour roles

Colour carries meaning, so a viewer who learns it in S1 can read S3 without
a legend. Pick a colour by role, not by taste.

| Token | Hex | Role |
|---|---|---|
| `bg` → `bgMid` → `bgGlow` | `#16052f` → `#2b0a5a` → `#4a1491` | stage (SceneShell paints it) |
| `primary` (lemon) | `#ffd102` | the object being studied: numbers, vectors, built things, the "answer" |
| `orange` | `#ff9702` | measurements, remainders, gaps, covectors, things that act on objects |
| `highlight` (lilac-pink) | `#f29ad8` | open questions, verdicts, the one word to remember, counting words |
| `text` / `muted` | `#fff8ec` / `#c8b6e6` | body text / notes, side remarks, callbacks |
| `green` / `red` | `#5eeaa0` / `#ff4d6d` | works ✓ / fails ✗ (use sparingly) |
| `violet`, `brandPurple` | `#7c15bc`, `#613896` | secondary shapes, panels, inactive items |
| `paper` / `ink` / `wood` | `#fff6d6` / `#2a1450` / `#ff7a1a` | props: paper, dictionary pages, wooden pieces |
| `panel`, `panelEdge` | translucent white / lilac | cards and boxes |

**Each season has its own stage.** The table above is Season 1 (violet).
Season 2 (*Spaces, Maps, and Measurements*) uses a deep-teal stage: `bg` →
`bgMid` → `bgGlow` `#03201e` → `#063d39` → `#0c6b62`, `highlight` coral
`#ff8a80`, `violet` (the panel and card fill role) `#0f7f73`, `muted`
`#a6d6cc`, `ink` `#062b28`, `paper` `#fffbea`. Lemon, orange, green, red and
wood stay the same in every season, so the brand light and the roles (lemon
vectors, orange covectors) carry over. The palettes live in `PALETTES` in
`theme.ts`; an episode picks its season's palette from its code (`S2E01` →
Season 2), and thumbnails from their episode number. Always read colours
through `colors.x` inside a component, never into a module-level constant,
or the colour is frozen at Season 1's value.

- Use `alpha(color, a)` for glows and translucent fills.
- One idea gets one colour for the whole series. Vectors are always lemon
  and covectors are always orange. If S2 needs a new role, add a token to
  `theme.ts` and to the table in `storyline/04-production-notes.md` in the
  same commit.
- At most three saturated colours should compete on screen at once.

## Fonts

| Token | Stack | Use |
|---|---|---|
| `fonts.title` | Fraunces → Noto Sans SC | titles, scene headings, big numerals |
| `fonts.body` | Inter → Noto Sans SC | captions, labels, notes (SceneShell default) |
| `fonts.mono` | JetBrains Mono → Noto Sans SC | digits in base conversions, code-like strings |
| `fonts.math` | STIX Two Text → DejaVu Serif → Noto Sans SC | ℕ ℤ ℚ ℝ ℂ, ⊂, ∅, √, formulas |

- All fonts are bundled in `public/fonts` and loaded in `theme.ts`. Never
  load from Google Fonts at render time, because Chrome in this environment
  rejects the proxy certificate.
- **Chinese is sans only.** Every Chinese character, titles included, is set
  in Noto Sans SC (思源黑体). The user rejected 宋体/serif CJK titles. The
  Latin fonts come first in each stack, so English and digits keep their
  look and CJK falls through to Noto Sans SC.
- After any change to Chinese text, run `scripts/zh-fonts.py` (see
  `whyme-video-script`). A missing chunk shows up as tofu (□).
- Math symbols go in `fonts.math`. Don't fake them with letters (write ℝ,
  not "R").

## Layout grid (1920×1080)

```
┌──────────────────────────────────────────────────────────────┐
│ ◆ whyme labs  (40,30)                    question tray (top-right)
│                                                              │
│        stage: content area, bottom edge at y = 890            │
│        keep important things inside x 120…1800                │
│                                                              │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │ y 890
│        caption box: x 160…1760, bottom 56, 38 px, max 2 lines  │
└──────────────────────────────────────────────────────────────┘
```

- `SceneShell` gives children an `AbsoluteFill` that ends 190 px above the
  bottom, so content never sits behind the caption box. It also adds a
  slow 4 % drift (zoom and pan) so no frame is ever frozen. The drift
  pushes things near the edges outward by up to ~45 px, so keep content
  at least 80 px from the left and right edges.
- **The stage never flickers.** The background lights breathe once per
  bar with a small, smooth swell (`stageSwell` in `music.ts`). The user
  found the earlier per-beat flash distracting. Don't pulse large areas,
  the background or text on the beat, and don't blink or flicker anything.
  Show "unreal" or "ghost" things with steady translucency, dashed outlines
  and a slow drift instead.
- Leave the top-left (watermark) and top-right (question tray, when shown)
  corners clear.
- The scene heading, when there is one, goes centred near y 120.

## Type scale

| Level | Size | Font |
|---|---|---|
| Hero (title card, giant numeral) | 130–150 | title, 700 |
| Display (big symbol or number in a scene) | 96–110 | title or math |
| Scene heading | 60–72 | title |
| Sub-heading, verdict | 44–52 | title or body |
| Label on an object | 34–40 | body |
| Caption | 38 (fixed in SceneShell) | body |
| Note, callback stamp | 24–30 | body, `muted` |

Nothing smaller than 24 px, because it vanishes on a phone. A label sits
next to the thing it names, never in a legend.

## Recurring motifs

Reuse these components and metaphors instead of inventing new ones. The full
series table is in `storyline/04-production-notes.md` ("Visual language").

| Motif | Component / rule |
|---|---|
| Number tower ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ | `Tower.tsx`. One floor per extension, with a "what did we lose?" ledger at the side |
| Open questions | `QuestionTray.tsx`. Small pills top-right that stay until an episode answers them |
| Number line | `NumberLine.tsx` |
| Callback stamp | small `muted` tag like "↩ E11" / "↩ 第 11 集" whenever an old idea returns |
| Vectors / covectors | lemon arrows (`Arrow`, `src/s2e01/components/vec.tsx`) / orange stacks of evenly spaced level lines (`Stack`, `src/s2e06/components/stack.tsx`); the reading is the number of sheets an arrow crosses |
| Bijection | threads joining two sets, then sliding together |
| Build or describe? | the two-panel comparison from S1E01 `BuildDescribe` |
| Works / fails | green tick or red cross plus a `shake` (see `whyme-video-motion`) |

Draw props (cups, hands, chess pieces, dictionaries) as simple flat SVG in
palette colours. No photos, no stock icons and no emoji, so the props match
the rest of the stage.
