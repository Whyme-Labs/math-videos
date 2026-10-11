"""Pick the Noto Sans SC (思源黑体) chunks the Chinese edition needs.

Usage:
    npm i --no-save @fontsource-variable/noto-sans-sc
    python3 scripts/zh-fonts.py

Scans the Chinese text in src/s1e01 (narration.ts and i18n.tsx), copies the
Fontsource woff2 chunks whose unicode-range covers those characters into
public/fonts/zh, and writes src/s1e01/zh-fonts.json for theme.ts to load.
Run it again whenever the Chinese text changes.
"""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONTSOURCE = ROOT / "node_modules" / "@fontsource-variable"
OUT = ROOT / "public" / "fonts" / "zh"

text = (ROOT / "src/s1e01/narration.ts").read_text() + (ROOT / "src/s1e01/i18n.tsx").read_text()
chars = sorted({c for c in text if ord(c) > 0x2E7F})  # CJK and full-width punctuation


def ranges(spec):
    for part in spec.split(","):
        a, _, b = part.strip()[2:].partition("-")
        yield int(a, 16), int(b or a, 16)


OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob("*.woff2"):
    old.unlink()
manifest = []
for family, pkg in [("Noto Sans SC", "noto-sans-sc")]:
    unicode_map = json.loads((FONTSOURCE / pkg / "unicode.json").read_text())
    # Keys are chunk numbers like "[42]", plus a few named subsets like "latin".
    for key, spec in sorted(unicode_map.items(), key=lambda kv: kv[0].strip("[]").zfill(4)):
        if any(a <= ord(c) <= b for c in chars for a, b in ranges(spec)):
            idx = key.strip("[]")
            shutil.copy(FONTSOURCE / pkg / "files" / f"{pkg}-{idx}-wght-normal.woff2", OUT / f"{pkg}-{idx}.woff2")
            manifest.append({"family": family, "file": f"fonts/zh/{pkg}-{idx}.woff2", "unicodeRange": spec})
shutil.copy(FONTSOURCE / "noto-sans-sc" / "LICENSE", OUT / "OFL.txt")
(ROOT / "src/s1e01/zh-fonts.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n")
print(f"{len(chars)} characters → {len(manifest)} font chunks")
