# Thumbnails

One thumbnail per episode, in English and Chinese. Everything here is made by
`scripts/thumbnails.sh` from `src/thumbnails/`.

| Folder | What it is | Use it for |
| --- | --- | --- |
| `png/E05-EN.png` | 1280×720, finished | Upload as is (YouTube, bilibili) |
| `svg/E05-EN.svg` | 1920×1080, layered: `art`, `badge`, `hook`, `brand` | Edit in Figma, Illustrator or Inkscape. The text is live text |
| `art/E05-EN.jpg` | 1920×1080, picture and background only, no text | Start your own layout, e.g. in Canva or Photoshop |
| `square/png/E05-EN.png` | 1080×1080, finished | Cover for TikTok and 抖音 |
| `square/svg/E05-EN.svg` | 1080×1080, the same layers, centred | Edit the square cover |
| `square/art/E05-EN.jpg` | 1080×1080, picture only | Start your own square layout |

The square covers keep everything inside the middle 810 px (x 135–945). The
TikTok and 抖音 profile grids crop covers to 3:4, so if you edit a square
SVG, keep the text inside that strip too.

## Fonts for editing the SVGs

The SVGs name these fonts. Install them first, or your editor will show
substitutes. All are free (SIL Open Font License):

- [Fraunces](https://fonts.google.com/specimen/Fraunces): English hook and badge (weight 800)
- [Inter](https://fonts.google.com/specimen/Inter): series name
- [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC): all Chinese text (weight 900)
- [STIX Two Text](https://fonts.google.com/specimen/STIX+Two+Text): math symbols such as √ − ×

## Changing a hook in the source

Each episode's hook lines, the accented line and the font size live in
`src/thumbnails/thumbs.ts`, and the art is drawn in
`src/thumbnails/Thumbnail.tsx`. After editing, run this from `video/`:

```
scripts/thumbnails.sh          # every episode
scripts/thumbnails.sh 05       # only E05
```

To preview while editing, open `npm run dev` and look in the Thumbnails
folder.

## Layout rules

- Hook: at most about 4 English words, or 6 Chinese characters, per line,
  with at most 2 lines. One line is in yellow.
- The art sits on the right. The bottom-right corner stays clear, because
  YouTube puts the video length there.
- The brand mark goes bottom-left, and the episode badge top-left.
