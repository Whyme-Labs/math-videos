import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Plane, linear } from "../../shared/components/Plane";
import { useStrings } from "../i18n";

// Coordinates can't give a ruler. Two perpendicular arrows u = (1, 0) and
// v = (0, 1) stay fixed while the grid behind them switches basis to
// b₁ = (1, 0), b₂ = (1, 1). The coordinates of v change to (−1, 1), and
// the "coordinates · coordinates" meter jumps from 0 to −1, though nothing
// on screen moved. Then a badge: inner product = a choice.

const O = { x: 760, y: 560 };
const S = 220;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Camera: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("camera");
  const [c0, c1] = cues;
  const sw = glide(frame, c0 + 40, fps, 40);
  const b2 = { x: lerp(0, 1, sw), y: 1 };
  // coordinates of v = (0, 1) in the basis (1, 0), b₂
  const vc = { a: -b2.x / b2.y, b: 1 / b2.y };
  const dot = 1 * vc.a + 0 * vc.b;

  return (
    <SceneShell id="camera">
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="scratch" at={c0 + 80} volume={0.2} />
      <Sfx name="chime" at={c1 + 20} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="camStage">
            <rect x={160} y={110} width={1100} height={720} rx={30} />
          </clipPath>
        </defs>
        <g clipPath="url(#camStage)">
          {/* the coordinate grid of the basis (1, 0), b₂: the whole plane
              shears as b₂ tips over, while the two arrows stay put */}
          <Plane map={linear([1, b2.x, 0, b2.y])} scr={scr} range={10} />
        </g>
        <Arrow from={O} to={scr(1, 0)} width={14} />
        <Arrow from={O} to={scr(0, 1)} width={14} color={colors.highlight} />
        <path
          d={`M ${O.x + 40} ${O.y} L ${O.x + 40} ${O.y - 40} L ${O.x} ${O.y - 40}`}
          fill="none"
          stroke={colors.green}
          strokeWidth={5}
        />
        <text
          x={scr(1, 0).x + 20}
          y={O.y + 60}
          fill={colors.primary}
          fontSize={44}
          fontFamily={fonts.mono}
          fontWeight={800}
        >
          (1, 0)
        </text>
        <text
          x={scr(0, 1).x - 30}
          y={scr(0, 1).y - 30}
          fill={colors.highlight}
          fontSize={44}
          textAnchor="end"
          fontFamily={fonts.mono}
          fontWeight={800}
        >
          ({(Math.round(vc.a * 10) / 10).toFixed(1).replace("-", "−")},{" "}
          {vc.b.toFixed(1)})
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1320,
          width: 440,
          padding: "16px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${Math.abs(dot) > 0.05 ? colors.red : colors.green}`,
          opacity: fadeIn(frame, c0 + 10),
        }}
      >
        <div style={{ fontSize: 30, color: colors.muted, fontWeight: 700 }}>
          {tx.coordDot}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 96,
            fontWeight: 800,
            color: Math.abs(dot) > 0.05 ? colors.red : colors.green,
          }}
        >
          {(Math.round(dot * 100) / 100).toFixed(2).replace("-", "−")}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 1300,
          width: 540,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 16,
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 40,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 20),
          translate: riseIn(frame, c1 + 20, 12),
        }}
      >
        {tx.choice}
      </div>
    </SceneShell>
  );
};
