import { Folder, Still } from "remotion";
import { Thumbnail, type ThumbProps } from "./Thumbnail";
import { THUMBS } from "./thumbs";

// Two stills per episode and language: Thumb-E05-EN (wide) and
// Thumb-E05-EN-SQ (square), and the same for ZH.
// Render with scripts/thumbnails.sh (PNG for upload, art-only PNG and an
// editable SVG for changing the text).
export const ThumbnailStills: React.FC = () => (
  <Folder name="Thumbnails">
    {THUMBS.flatMap((t) =>
      (["en", "zh"] as const).flatMap((locale) => {
        const id = `Thumb-E${String(t.ep).padStart(2, "0")}-${locale.toUpperCase()}`;
        return [
          <Still
            key={id}
            id={id}
            component={Thumbnail}
            width={1920}
            height={1080}
            defaultProps={
              { ep: t.ep, locale, layer: "full" } satisfies ThumbProps
            }
          />,
          <Still
            key={`${id}-SQ`}
            id={`${id}-SQ`}
            component={Thumbnail}
            width={1080}
            height={1080}
            defaultProps={
              {
                ep: t.ep,
                locale,
                layer: "full",
                shape: "square",
              } satisfies ThumbProps
            }
          />,
        ];
      }),
    )}
  </Folder>
);
