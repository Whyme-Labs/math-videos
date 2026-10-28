#!/usr/bin/env bash
# Join a season's finished episodes into one video per language, with a
# chapter for every episode (chapter titles from the table in README.md).
# Usage (from video/), after rendering every episode into out/:
#   scripts/season.sh 1        → out/s1-season-en.mp4, out/s1-season-zh.mp4
# It also prints each edition's YouTube chapter list.
# Video is copied as is (every episode is encoded the same way); the audio
# is re-encoded once so the joins stay in sync.
set -euo pipefail
cd "$(dirname "$0")/.."
s="${1:?usage: season.sh <season number>}"
tmp=$(mktemp -d)
for lang in en zh; do
  if [ "$lang" = en ]; then
    files=$(ls out/s${s}e[0-9][0-9]-*.mp4 | grep -v -- '-zh-' | grep -v -- '-share' | grep -v -- '-season' | sort)
  else
    files=$(ls out/s${s}e[0-9][0-9]-zh-*.mp4 | grep -v -- '-share' | sort)
  fi
  list="$tmp/$lang.txt"
  meta="$tmp/$lang.meta"
  : > "$list"
  printf ';FFMETADATA1\n' > "$meta"
  chapters=""
  t=0
  for f in $files; do
    echo "file '$PWD/$f'" >> "$list"
    code=$(basename "$f" | cut -c1-5 | tr a-z A-Z)
    id="$code"
    [ "$lang" = zh ] && id="$code-ZH"
    title=$(grep -F "| \`$id\` |" README.md | awk -F'|' '{gsub(/^ +| +$/, "", $3); print $3}' | sed 's/（中文版.*）$//')
    dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
    start_ms=$(awk -v t="$t" 'BEGIN { printf "%d", t * 1000 }')
    end_ms=$(awk -v t="$t" -v d="$dur" 'BEGIN { printf "%d", (t + d) * 1000 }')
    printf '[CHAPTER]\nTIMEBASE=1/1000\nSTART=%s\nEND=%s\ntitle=%s %s\n' "$start_ms" "$end_ms" "$code" "$title" >> "$meta"
    stamp=$(awk -v t="$t" 'BEGIN { s = int(t); printf "%d:%02d:%02d", s / 3600, (s % 3600) / 60, s % 60 }')
    chapters+="$stamp $code $title"$'\n'
    t=$(awk -v t="$t" -v d="$dur" 'BEGIN { print t + d }')
  done
  out="out/s${s}-season-$lang.mp4"
  ffmpeg -y -loglevel error -f concat -safe 0 -i "$list" -i "$meta" \
    -map_metadata 1 -map_chapters 1 -map 0:v -map 0:a \
    -c:v copy -c:a aac -b:a 256k -movflags +faststart "$out"
  echo "== $out ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out") s)"
  printf '%s' "$chapters"
done
rm -rf "$tmp"
