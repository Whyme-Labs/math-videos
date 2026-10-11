#!/usr/bin/env bash
# Render a Remotion composition and tile its frames into one PNG for review.
# Usage (from video/): contact-sheet.sh <CompositionId> [seconds-between-frames]
set -euo pipefail

id="${1:?usage: contact-sheet.sh <CompositionId> [seconds-between-frames]}"
step="${2:-1}"
mkdir -p out/qa
clip="out/qa/${id}.mp4"
sheet="out/qa/${id}-sheet.png"

npx remotion render "$id" "$clip" --log=error >/dev/null

# Frame count = duration / step, laid out 6 wide.
duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$clip")
count=$(awk -v d="$duration" -v s="$step" 'BEGIN { n = int(d / s) + 1; print (n < 1 ? 1 : n) }')
rows=$(( (count + 5) / 6 ))

ffmpeg -v error -y -i "$clip" \
  -vf "fps=1/${step},scale=480:-1,drawtext=text='%{pts\:hms}':x=8:y=8:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.6,tile=6x${rows}:padding=4:color=black" \
  -frames:v 1 "$sheet"

echo "$sheet"
