"""Write an editable SVG for every thumbnail.

Each SVG is the art-only render (thumbnails/art/*.jpg, embedded) with the
badge, the series name, the hook and the brand mark on top as separate,
named layers. The text stays live text, so it can be changed in Figma,
Illustrator or Inkscape. Needs the fonts Fraunces, Inter, Noto Sans SC and
STIX Two Text installed (all free, SIL OFL).

Run by scripts/thumbnails.sh, after thumbnails/thumbs.json is written.
"""
import base64
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "thumbnails"
data = json.loads((OUT / "thumbs.json").read_text())
L = data["layout"]
MATH = data["mathChars"]

COLORS = {"bg": "#16052f", "text": "#fff8ec", "muted": "#c8b6e6", "primary": "#ffd102", "ink": "#2a1450"}
TITLE = "Fraunces, 'Noto Sans SC', serif"
BODY = "Inter, 'Noto Sans SC', sans-serif"
MATHF = "'STIX Two Text', 'Noto Sans SC', serif"


def b64(path: Path) -> str:
    kind = "jpeg" if path.suffix == ".jpg" else "png"
    return f"data:image/{kind};base64," + base64.b64encode(path.read_bytes()).decode()


MARK = b64(ROOT / "public" / "brand" / "whyme-mark.png")
WORD = b64(ROOT / "public" / "brand" / "whyme-wordmark-white.png")


def spans(line: str) -> str:
    out, cur, math = [], "", None
    for ch in line:
        m = ch in MATH
        if math is not None and m != math:
            out.append((cur, math))
            cur = ""
        cur += ch
        math = m
    if cur:
        out.append((cur, math))
    return "".join(
        f'<tspan font-family="{MATHF}" font-weight="700">{escape(t)}</tspan>' if m else f"<tspan>{escape(t)}</tspan>"
        for t, m in out
    )


for t in data["thumbs"]:
    for loc in ("en", "zh"):
        name = f"E{t['ep']:02d}-{loc.upper()}"
        art = OUT / "art" / f"{name}.jpg"
        if not art.exists():
            continue
        tx = t[loc]
        zh = loc == "zh"
        bw = 230 if zh else 190
        hook = "\n".join(
            f'    <text x="{L["textX"]}" y="{L["firstBaseline"] + i * tx["size"] * L["lineGap"]:.1f}" '
            f'font-family="{BODY if zh else TITLE}" font-size="{tx["size"]}" font-weight="{900 if zh else 800}" '
            f'fill="{COLORS["primary"] if i == tx["accent"] else COLORS["text"]}" stroke="{COLORS["bg"]}" '
            f'stroke-width="{L["stroke"]}" stroke-linejoin="round" paint-order="stroke">{spans(line)}</text>'
            for i, line in enumerate(tx["lines"])
        )
        mark_w = L["brandH"] * 2000 / 1801
        word_h = L["brandH"] * 0.42
        word_w = word_h * 2000 / 252
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{L['width']}" height="{L['height']}" viewBox="0 0 {L['width']} {L['height']}">
  <g id="art">
    <image width="{L['width']}" height="{L['height']}" xlink:href="{b64(art)}"/>
  </g>
  <g id="badge">
    <rect x="{L['textX']}" y="{L['badgeY']}" width="{bw}" height="{L['badgeH']}" rx="20" fill="{COLORS['primary']}"/>
    <text x="{L['textX'] + bw / 2}" y="{L['badgeY'] + L['badgeH'] * 0.72:.1f}" font-family="{BODY if zh else TITLE}" font-size="60" font-weight="800" fill="{COLORS['ink']}" text-anchor="middle">{escape(t['badge'][loc])}</text>
    <text x="{L['textX'] + bw + 30}" y="{L['badgeY'] + L['badgeH'] * 0.68:.1f}" font-family="{BODY}" font-size="46" font-weight="700" letter-spacing="{2 if zh else 6}" fill="{COLORS['muted']}">{escape(data['series'][loc])}</text>
  </g>
  <g id="hook">
{hook}
  </g>
  <g id="brand">
    <image x="{L['textX']}" y="{L['brandY']}" width="{mark_w:.1f}" height="{L['brandH']}" xlink:href="{MARK}"/>
    <image x="{L['textX'] + mark_w + 18:.1f}" y="{L['brandY'] + (L['brandH'] - word_h) / 2:.1f}" width="{word_w:.1f}" height="{word_h:.1f}" xlink:href="{WORD}"/>
  </g>
</svg>
"""
        (OUT / "svg" / f"{name}.svg").write_text(svg)
        print("svg", name)

# 抖音 / TikTok covers (4:3 and 3:4): the same layers, centred.
for shape, Q in data["covers"].items():
    for t in data["thumbs"]:
        for loc in ("en", "zh"):
            name = f"E{t['ep']:02d}-{loc.upper()}"
            art = OUT / f"cover-{shape}" / "art" / f"{name}.jpg"
            if not art.exists():
                continue
            tx = t[loc]
            zh = loc == "zh"
            bw = 200 if zh else 160
            size = tx["size"] * Q["hookScale"]
            hook = "\n".join(
                f'    <text x="{Q["cx"]}" y="{Q["firstBaseline"] + i * size * Q["lineGap"]:.1f}" text-anchor="middle" '
                f'font-family="{BODY if zh else TITLE}" font-size="{size:.1f}" font-weight="{900 if zh else 800}" '
                f'fill="{COLORS["primary"] if i == tx["accent"] else COLORS["text"]}" stroke="{COLORS["bg"]}" '
                f'stroke-width="{Q["stroke"]}" stroke-linejoin="round" paint-order="stroke">{spans(line)}</text>'
                for i, line in enumerate(tx["lines"])
            )
            mark_w = Q["brandH"] * 2000 / 1801
            word_h = Q["brandH"] * 0.42
            word_w = word_h * 2000 / 252
            brand_x = Q["cx"] - (mark_w + 14 + word_w) / 2
            svg = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{Q['width']}" height="{Q['height']}" viewBox="0 0 {Q['width']} {Q['height']}">
    <g id="art">
        <image width="{Q['width']}" height="{Q['height']}" xlink:href="{b64(art)}"/>
    </g>
    <g id="badge">
        <rect x="{Q['cx'] - bw / 2}" y="{Q['badgeY']}" width="{bw}" height="{Q['badgeH']}" rx="18" fill="{COLORS['primary']}"/>
        <text x="{Q['cx']}" y="{Q['badgeY'] + Q['badgeH'] * 0.72:.1f}" font-family="{BODY if zh else TITLE}" font-size="{Q['badgeFont']}" font-weight="800" fill="{COLORS['ink']}" text-anchor="middle">{escape(t['badge'][loc])}</text>
        <text x="{Q['cx']}" y="{Q['seriesY']}" font-family="{BODY}" font-size="{Q['seriesFont']}" font-weight="700" letter-spacing="{2 if zh else 5}" fill="{COLORS['muted']}" text-anchor="middle">{escape(data['series'][loc])}</text>
    </g>
    <g id="hook">
  {hook}
    </g>
    <g id="brand">
        <image x="{brand_x:.1f}" y="{Q['brandY']}" width="{mark_w:.1f}" height="{Q['brandH']}" xlink:href="{MARK}"/>
        <image x="{brand_x + mark_w + 14:.1f}" y="{Q['brandY'] + (Q['brandH'] - word_h) / 2:.1f}" width="{word_w:.1f}" height="{word_h:.1f}" xlink:href="{WORD}"/>
    </g>
  </svg>
  """
            (OUT / f"cover-{shape}" / "svg" / f"{name}.svg").write_text(svg)
            print("svg", shape, name)
