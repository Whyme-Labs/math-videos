// Prints the thumbnail text and layout as JSON for scripts/thumbnail-svg.py.
import {
  badge,
  LAYOUT,
  SERIES_NAME,
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
      badge: { en: badge(t.ep, "en"), zh: badge(t.ep, "zh") },
    })),
  }),
);
