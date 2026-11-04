import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The dual of C[0, 1]. A function on [0, 1] (c0). A probe slides along
// reading f(t): a point mass δₜ (c1). A weight g shaded under the axis and
// the weighted average ∫ f g read out (c2). Chip: C[0, 1]* = measures
// (c3).

const PX = 160;
const PW = 1000;
const PY = 560;
const PH = 300;
const sx = (x: number) => PX + PW * x;
const f = (x: number) => 0.5 + 0.3 * Math.sin(7 * x) * Math.exp(-x) + 0.15 * x;
const g = (x: number) =>
  (2 * Math.exp(-((x - 0.65) ** 2) / 0.02)) / Math.sqrt(2 * Math.PI * 0.01);

export const Measures: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("measures");
  const [c0, c1, c2, c3] = cues;
  const t = 0.15 + 0.35 * (1 + Math.sin((frame - c1) * 0.03));
  let avg = 0;
  let mass = 0;
  for (let i = 0; i <= 400; i++) {
    const x = i / 400;
    avg += f(x) * g(x);
    mass += g(x);
  }
  avg /= mass;

  return (
    <SceneShell id="measures">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c2 + 6} volume={0.14} />
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={PX}
          y1={PY}
          x2={PX + PW}
          y2={PY}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <path
          d={Array.from(
            { length: 201 },
            (_, i) => `${i ? "L" : "M"} ${sx(i / 200)} ${PY - PH * f(i / 200)}`,
          ).join(" ")}
          fill="none"
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 4, 8)}
        />
        <g opacity={fadeIn(frame, c1 + 6, 8) * (1 - fadeIn(frame, c2, 8))}>
          <line
            x1={sx(t)}
            y1={PY}
            x2={sx(t)}
            y2={PY - PH * f(t)}
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="8 6"
          />
          <circle
            cx={sx(t)}
            cy={PY - PH * f(t)}
            r={14}
            fill={colors.highlight}
          />
          <line
            x1={sx(t)}
            y1={PY}
            x2={sx(t)}
            y2={PY + 160}
            stroke={colors.highlight}
            strokeWidth={8}
          />
        </g>
        <g opacity={fadeIn(frame, c2 + 6, 8)}>
          <path
            d={`${Array.from({ length: 201 }, (_, i) => `${i ? "L" : "M"} ${sx(i / 200)} ${PY + 25 * g(i / 200)}`).join(" ")} L ${sx(1)} ${PY} L ${sx(0)} ${PY} Z`}
            fill={alpha(colors.green, 0.35)}
            stroke={colors.green}
            strokeWidth={3}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1240,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 6),
            whiteSpace: "nowrap",
          }}
        >
          δₜ(f) = f(t) ={" "}
          <span style={{ fontFamily: fonts.mono }}>{f(t).toFixed(2)}</span>
        </div>
        <div
          style={{
            color: colors.green,
            opacity: fadeIn(frame, c2 + 6),
            whiteSpace: "nowrap",
          }}
        >
          ∫ f g ={" "}
          <span style={{ fontFamily: fonts.mono }}>{avg.toFixed(2)}</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c3 + 6),
          translate: riseIn(frame, c3 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        {tx.measures}
      </div>
    </SceneShell>
  );
};
