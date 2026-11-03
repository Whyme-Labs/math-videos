import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Boxes, BOX } from "../components/boxes";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// Loss one. Six boxes and the free-lunch chip (c0). The shift cut to six
// boxes: every number slides right and the last one drops off the end
// into a red bin (c1). The row grows, the far end slides off screen and
// the bin fades: nothing drops off any more (c2). Right then left, the
// numbers come home: LS = I in green (c3). Left then right, the first
// number drops out at the front and a 0 takes its place: SL ≠ I in red,
// and the first ledger line is crossed (c4).

const V = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8].map(String);
const X = 160;
const Y = 440;

export const Shift: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("shift");
  const [c0, c1, c2, c3, c4] = cues;
  const s1 = glide(frame, c1 + 10, fps, 24);
  const grow = glide(frame, c2 + 6, fps, 40);
  const n = Math.round(lerp(6, 11, grow));
  // LS: right then left
  const r3 = glide(frame, c3 + 6, fps, 20);
  const l3 = glide(frame, c3 + 40, fps, 20);
  // SL: left then right
  const l4 = glide(frame, c4 + 6, fps, 20);
  const r4 = glide(frame, c4 + 40, fps, 20);
  // what the row shows, phase by phase
  let values: string[];
  let off: number;
  if (frame < c2) {
    values = s1 > 0.5 ? V.slice(0, 5) : V.slice(0, 6);
    off = s1;
  } else if (frame < c3) {
    values = V;
    off = 0;
  } else if (frame < c4) {
    values = V;
    off = r3 - l3;
  } else if (l4 <= 0.5) {
    values = V;
    off = -l4;
  } else {
    values = V.slice(1);
    off = 1 - l4 + r4;
  }
  const zeroFront =
    (frame < c2 && s1 > 0.5) ||
    (frame >= c3 && frame < c4 && r3 > 0.5 && l3 < 0.5) ||
    (frame >= c4 && r4 > 0.5);
  const fall = glide(frame, c1 + 20, fps, 20);
  const binOp = fadeIn(frame, c1 + 6, 8) * (1 - grow);
  const crossed = glide(frame, c4 + 70, fps, 20);

  return (
    <SceneShell id="shift">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.1} />
      <Sfx name="thud" at={c1 + 36} volume={0.2} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.08} />
      <Sfx name="whoosh" at={c3 + 40} volume={0.08} />
      <Sfx name="ding" at={c3 + 62} volume={0.26} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.08} />
      <Sfx name="thud" at={c4 + 26} volume={0.2} />
      <Sfx name="whoosh" at={c4 + 40} volume={0.08} />
      <Sfx name="scratch" at={c4 + 70} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Boxes
          x={X}
          y={Y}
          n={n}
          values={values}
          offset={off}
          fade={frame >= c2}
          hot={frame >= c4 + 60 ? 0 : -1}
        />
        {zeroFront ? (
          <text
            x={X + (BOX - 8) / 2}
            y={Y + BOX / 2 + 12}
            fill={frame >= c4 ? colors.red : colors.text}
            fontSize={40}
            fontFamily={fonts.mono}
            fontWeight={800}
            textAnchor="middle"
          >
            0
          </text>
        ) : null}
        {/* the number falling off the end, and its bin */}
        <g opacity={binOp}>
          <rect
            x={X + 6 * BOX + 10}
            y={Y + 150}
            width={110}
            height={80}
            rx={10}
            fill={alpha(colors.red, 0.2)}
            stroke={colors.red}
            strokeWidth={4}
          />
          <text
            x={X + 6 * BOX + 65}
            y={Y + 270}
            fill={colors.red}
            fontSize={34}
            fontWeight={800}
            textAnchor="middle"
          >
            {tx.lost}
          </text>
          {s1 > 0.5 && frame < c2 ? (
            <text
              x={X + 6 * BOX + 65}
              y={lerp(Y + BOX / 2 + 12, Y + 205, fall)}
              fill={colors.red}
              fontSize={40}
              fontFamily={fonts.mono}
              fontWeight={800}
              textAnchor="middle"
            >
              9
            </text>
          ) : null}
        </g>
        {/* the first number dropping out at the front, for SL */}
        {frame >= c4 ? (
          <g opacity={fadeIn(frame, c4 + 10, 8)}>
            <rect
              x={X - 20}
              y={Y + 150}
              width={110}
              height={80}
              rx={10}
              fill={alpha(colors.red, 0.2)}
              stroke={colors.red}
              strokeWidth={4}
            />
            <text
              x={X + 35}
              y={lerp(
                Y + BOX / 2 + 12,
                Y + 205,
                glide(frame, c4 + 14, fps, 16),
              )}
              fill={colors.red}
              fontSize={40}
              fontFamily={fonts.mono}
              fontWeight={800}
              textAnchor="middle"
            >
              3
            </text>
          </g>
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c2, 10),
        }}
      >
        3 × 3 · {tx.freeLunch}
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.body,
          fontSize: 64,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 62) * fadeOut(frame, c4, 8),
          translate: riseIn(frame, c3 + 62, 12),
        }}
      >
        LS = I
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontFamily: fonts.body,
          fontSize: 64,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 60),
          translate: riseIn(frame, c4 + 60, 12),
        }}
      >
        SL ≠ I
      </div>
      <Ledger crossed={crossed} active={0} compact />
    </SceneShell>
  );
};
