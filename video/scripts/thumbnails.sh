#!/usr/bin/env bash
# Render every episode thumbnail, in both languages, into thumbnails/:
#   png/  E05-EN.png …   1280×720, ready to upload (YouTube, bilibili)
#   art/  E05-EN.jpg …   1920×1080 background and picture only, no text
#   svg/  E05-EN.svg …   the art plus live, editable text (Figma, Illustrator,
#                        Inkscape); fonts: Fraunces, Inter, Noto Sans SC, STIX Two
#   square/png, square/art, square/svg   the same at 1080×1080 for TikTok and
#                        抖音 (content kept inside the centre 3:4 strip)
# Text lives in src/thumbnails/thumbs.ts. Usage (from video/):
#   scripts/thumbnails.sh            all episodes
#   scripts/thumbnails.sh 05 06      only these
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p thumbnails/png thumbnails/art thumbnails/svg thumbnails/square/png thumbnails/square/art thumbnails/square/svg
eps=("$@")
if [ ${#eps[@]} -eq 0 ]; then
  eps=($(grep -oE 'ep: [0-9]+' src/thumbnails/thumbs.ts | awk '{printf "%02d\n", $2}'))
fi
for e in "${eps[@]}"; do
  for l in EN ZH; do
    id="Thumb-E$e-$l"
    npx remotion still "$id" "thumbnails/png/E$e-$l.png" --scale=0.6667 --log=error >/dev/null
    npx remotion still "$id" "thumbnails/art/E$e-$l.jpg" --image-format=jpeg --jpeg-quality=92 --props='{"layer":"art"}' --log=error >/dev/null
    npx remotion still "$id-SQ" "thumbnails/square/png/E$e-$l.png" --log=error >/dev/null
    npx remotion still "$id-SQ" "thumbnails/square/art/E$e-$l.jpg" --image-format=jpeg --jpeg-quality=92 --props='{"layer":"art","shape":"square"}' --log=error >/dev/null
    echo "E$e-$l"
  done
done
npx esbuild scripts/thumbs-json.ts --bundle --platform=node --log-level=error | node > thumbnails/thumbs.json
python3 scripts/thumbnail-svg.py
