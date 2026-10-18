import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { nines, Stairs, ST } from "../components/stairs";
import { useStrings } from "../i18n";

// The truncations as a staircase under the line at 1, each short by one
// unit in its last place. Zooming ×10 at a time shows the same picture
// again. Then the process (the steps) against the one number 0.999….

export const Staircase: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("staircase");
  const [c0, c1, c2] = cues;
  const stepAt = (n: number) => c0 + 10 + (n - 1) * 22;
  const zoomAt = (k: number) => c1 + 10 + k * 34;
  const zoom =
    10 **
    [0, 1, 2].reduce((acc, k) => acc + glide(frame, zoomAt(k), fps, 22), 0);
  const current = [6, 5, 4, 3, 2, 1].find((n) => frame >= stepAt(n)) ?? 1;
  const dim = lerp(1, 0.22, glide(frame, c2 + 4, fps, 16));
  const z = 10 ** Math.round(Math.log10(zoom));

  return (
    <SceneShell id="staircase">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Sfx key={n} name={PLUCKS[n - 1]} at={stepAt(n)} volume={0.24} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={`z${k}`} name="whoosh" at={zoomAt(k)} volume={0.14} />
      ))}
      <Sfx name="ding" at={zoomAt(2) + 30} volume={0.2} />
      <Sfx name="pop" at={c2 + 14} />
      <Sfx name="pop" at={c2 + 40} volume={0.3} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <Stairs
            zoom={zoom}
            opacity={fadeIn(frame, c0 + 2) * dim}
            rise={(n) =>
              n <= 6
                ? springIn(frame, stepAt(n), fps, 14)
                : frame > stepAt(6)
                  ? 1
                  : 0
            }
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: ST.x0,
            top: 120,
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 6) * dim,
          }}
        >
          {tx.truncations}
        </div>
        {/* how far short each step is */}
        <div
          style={{
            position: "absolute",
            top: ST.top + ST.h + 40,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 46,
            color: colors.text,
            opacity: fadeIn(frame, stepAt(1)) * fadeOut(frame, c1 + 4, 10),
          }}
        >
          1 − {nines(current)} ={" "}
          <span style={{ color: colors.highlight }}>
            {`0.${"0".repeat(current - 1)}1`}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 200,
            top: 120,
            fontFamily: fonts.mono,
            fontSize: 40,
            color: colors.highlight,
            opacity: fadeIn(frame, zoomAt(0)) * dim,
            scale: 1 + 0.15 * Math.max(0, 1 - Math.abs(zoom - z) * 4),
          }}
        >
          {tx.zoom(z)}
        </div>
        <div
          style={{
            position: "absolute",
            top: ST.top + ST.h + 40,
            width: "100%",
            textAlign: "center",
            fontSize: 42,
            color: colors.green,
            opacity: fadeIn(frame, zoomAt(2) + 30) * fadeOut(frame, c2, 10),
            translate: riseIn(frame, zoomAt(2) + 30, 16),
          }}
        >
          {tx.allBelow}
        </div>

        {/* process vs number */}
        <div
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 70,
          }}
        >
          {[
            {
              // the process keeps stepping: one term lit at a time
              t: ["0.9", "0.99", "0.999", "…"].map((term, i, all) => (
                <span key={term}>
                  <span
                    style={{
                      opacity:
                        Math.floor(Math.max(0, frame - c2 - 20) / 14) % 4 === i
                          ? 1
                          : 0.45,
                    }}
                  >
                    {term}
                  </span>
                  {i < all.length - 1 ? " → " : ""}
                </span>
              )),
              l: tx.process,
              at: c2 + 14,
              c: colors.primary,
            },
            { t: "0.999…", l: tx.oneNumber, at: c2 + 40, c: colors.highlight },
          ].map((b, k) => (
            <div
              key={b.l}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                opacity: fadeIn(frame, b.at),
                scale: lerp(
                  0.7,
                  1,
                  Math.min(1, springIn(frame, b.at, fps, 12)),
                ),
              }}
            >
              <div
                style={{
                  fontFamily: k === 0 ? fonts.mono : fonts.math,
                  fontSize: k === 0 ? 46 : 80,
                  color: b.c,
                  padding: "26px 40px",
                  borderRadius: 24,
                  border: `3px solid ${b.c}`,
                  backgroundColor: alpha(b.c, 0.1),
                }}
              >
                {b.t}
              </div>
              <div style={{ fontSize: 36, color: colors.muted }}>{b.l}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
