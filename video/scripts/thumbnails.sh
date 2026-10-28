#!/usr/bin/env bash
# Render every episode thumbnail, in both languages, into thumbnails/:
#   png/  E05-EN.png …   1280×720, ready to upload (YouTube, bilibili)
#   art/  E05-EN.jpg …   1920×1080 background and picture only, no text
#   svg/  E05-EN.svg …   the art plus live, editable text (Figma, Illustrator,
#                        Inkscape); fonts: Fraunces, Inter, Noto Sans SC, STIX Two
#   cover-4x3/{png,art,svg}   1440×1080 cover for a landscape video on 抖音
#   cover-3x4/{png,art,svg}   1080×1440 cover for 抖音 竖版 and TikTok
# Text lives in src/thumbnails/thumbs.ts. Usage (from video/):
#   scripts/thumbnails.sh            all episodes
#   scripts/thumbnails.sh 05 06      only these (S1 by number)
#   scripts/thumbnails.sh S2E01      later seasons by code
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p thumbnails/png thumbnails/art thumbnails/svg
for c in 4x3 3x4; do mkdir -p thumbnails/cover-$c/png thumbnails/cover-$c/art thumbnails/cover-$c/svg; done
eps=("$@")
if [ ${#eps[@]} -eq 0 ]; then
  eps=($(grep -oE 'ep: [0-9]+' src/thumbnails/thumbs.ts | awk '{n=$2; if (n < 100) printf "E%02d\n", n; else printf "S%dE%02d\n", int(n/100), n%100}'))
fi
for e in "${eps[@]}"; do
  # a bare number is a Season 1 episode
  if [[ "$e" =~ ^[0-9]+$ ]]; then e=$(printf "E%02d" "$((10#$e))"); fi
  for l in EN ZH; do
    id="Thumb-$e-$l"
    npx remotion still "$id" "thumbnails/png/$e-$l.png" --scale=0.6667 --log=error >/dev/null
    npx remotion still "$id" "thumbnails/art/$e-$l.jpg" --image-format=jpeg --jpeg-quality=92 --props='{"layer":"art"}' --log=error >/dev/null
    for c in 4x3 3x4; do
      npx remotion still "$id-$c" "thumbnails/cover-$c/png/$e-$l.png" --log=error >/dev/null
      npx remotion still "$id-$c" "thumbnails/cover-$c/art/$e-$l.jpg" --image-format=jpeg --jpeg-quality=92 --props="{\"layer\":\"art\",\"shape\":\"$c\"}" --log=error >/dev/null
    done
    echo "$e-$l"
  done
done
npx esbuild scripts/thumbs-json.ts --bundle --platform=node --log-level=error | node > thumbnails/thumbs.json
python3 scripts/thumbnail-svg.py
