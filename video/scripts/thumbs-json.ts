// Prints the thumbnail text and layout as JSON for scripts/thumbnail-svg.py.
import {
  badge,
  badgeWidth,
  code,
  LAYOUT,
  SERIES_NAME,
  seriesName,
  COVERS,
  THUMBS,
} from "../src/thumbnails/thumbs";
import { MATH_CHARS } from "../src/thumbnails/math-chars";

console.log(
  JSON.stringify({
    layout: LAYOUT,
    covers: COVERS,
    series: SERIES_NAME,
    mathChars: MATH_CHARS,
    thumbs: THUMBS.map((t) => ({
      ...t,
      code: code(t.ep),
      badge: { en: badge(t.ep, "en"), zh: badge(t.ep, "zh") },
      series: { en: seriesName(t.ep, "en"), zh: seriesName(t.ep, "zh") },
      badgeW: {
        en: badgeWidth(t.ep, "en"),
        zh: badgeWidth(t.ep, "zh"),
        coverEn: badgeWidth(t.ep, "en", true),
        coverZh: badgeWidth(t.ep, "zh", true),
      },
    })),
  }),
);
