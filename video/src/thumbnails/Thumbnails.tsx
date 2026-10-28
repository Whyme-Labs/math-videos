import { Folder, Still } from "remotion";
import { Thumbnail, type ThumbProps } from "./Thumbnail";
import { code, COVERS, type CoverShape, THUMBS } from "./thumbs";

// Three stills per episode and language: Thumb-E05-EN (wide, 16:9; later
// seasons Thumb-S2E01-EN) and the
// covers Thumb-E05-EN-4x3 and Thumb-E05-EN-3x4, and the same for ZH.
// Render with scripts/thumbnails.sh (PNG for upload, art-only PNG and an
// editable SVG for changing the text).
export const ThumbnailStills: React.FC = () => (
  <Folder name="Thumbnails">
    {THUMBS.flatMap((t) =>
      (["en", "zh"] as const).flatMap((locale) => {
        const id = `Thumb-${code(t.ep)}-${locale.toUpperCase()}`;
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
          ...(Object.keys(COVERS) as CoverShape[]).map((shape) => (
            <Still
              key={`${id}-${shape}`}
              id={`${id}-${shape}`}
              component={Thumbnail}
              width={COVERS[shape].width}
              height={COVERS[shape].height}
              defaultProps={
                { ep: t.ep, locale, layer: "full", shape } satisfies ThumbProps
              }
            />
          )),
        ];
      }),
    )}
  </Folder>
);
