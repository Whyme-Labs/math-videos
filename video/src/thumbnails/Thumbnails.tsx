import { Folder, Still } from "remotion";
import { Thumbnail, type ThumbProps } from "./Thumbnail";
import { THUMBS } from "./thumbs";

// One still per episode and language: Thumb-E05-EN, Thumb-E05-ZH, …
// Render with scripts/thumbnails.sh (PNG for upload, art-only PNG and an
// editable SVG for changing the text).
export const ThumbnailStills: React.FC = () => (
  <Folder name="Thumbnails">
    {THUMBS.flatMap((t) =>
      (["en", "zh"] as const).map((locale) => (
        <Still
          key={`${t.ep}-${locale}`}
          id={`Thumb-E${String(t.ep).padStart(2, "0")}-${locale.toUpperCase()}`}
          component={Thumbnail}
          width={1920}
          height={1080}
          defaultProps={
            { ep: t.ep, locale, layer: "full" } satisfies ThumbProps
          }
        />
      )),
    )}
  </Folder>
);
