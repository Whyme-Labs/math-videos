import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The teaser for completeness. Ramps fₙ from 0 to 1 over [½, ½ + 1/n],
// steeper and steeper, the earlier ones as ghosts (c0). The area between
// the newest two is shaded and read out, shrinking (c1). Where they are
// heading, the step that jumps at ½, is drawn dashed with its jump in red:
// not continuous (c2). A chip: with the area norm, continuous functions
// have holes, like ℚ (c3).

const PX = 160;
const PW = 1000;
const PY = 740;
const PH = 460;
const sx = (x: number) => PX + PW * x;
const ramp = (n: number) => (x: number) =>
  Math.max(0, Math.min(1, (x - 0.5) * n));

export const Holes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("holes");
  const [c0, c1, c2, c3] = cues;
  const k = Math.min(9, Math.max(1, Math.floor((frame - c0 - 6) / 16) + 1));
  const ns = [2, 3, 4, 6, 8, 12, 16, 24, 32];
  const n = ns[k - 1];
  const prev = ns[Math.max(0, k - 2)];
  const path = (f: (x: number) => number) =>
    Array.from(
      { length: 401 },
      (_, i) =>
        `${i ? "L" : "M"} ${sx(i / 400).toFixed(1)} ${(PY - PH * f(i / 400)).toFixed(1)}`,
    ).join(" ");
  const gap = 0.5 * (1 / prev - 1 / n);
  const band = `${path(ramp(n))} L ${sx(1)} ${PY - PH} ${Array.from({ length: 401 }, (_, i) => `L ${sx(1 - i / 400).toFixed(1)} ${(PY - PH * ramp(prev)(1 - i / 400)).toFixed(1)}`).join(" ")} Z`;

  return (
    <SceneShell id="holes">
      {ns.map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 16} volume={0.08} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="thud" at={c2 + 20} volume={0.2} />
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
        {ns.slice(0, k - 1).map((m) => (
          <path
            key={m}
            d={path(ramp(m))}
            fill="none"
            stroke={alpha(colors.primary, 0.25)}
            strokeWidth={3}
          />
        ))}
        <path
          d={band}
          fill={alpha(colors.orange, 0.35)}
          stroke="none"
          opacity={fadeIn(frame, c1 + 6, 8)}
        />
        <path
          d={path(ramp(n))}
          fill="none"
          stroke={colors.primary}
          strokeWidth={6}
        />
        <g opacity={fadeIn(frame, c2 + 10, 8)}>
          <line
            x1={sx(0)}
            y1={PY - 4}
            x2={sx(0.5)}
            y2={PY - 4}
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
          <line
            x1={sx(0.5)}
            y1={PY - PH}
            x2={sx(1)}
            y2={PY - PH}
            stroke={colors.highlight}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
          <line
            x1={sx(0.5)}
            y1={PY}
            x2={sx(0.5)}
            y2={PY - PH}
            stroke={colors.red}
            strokeWidth={6}
          />
        </g>
        <text
          x={sx(0.5)}
          y={PY + 50}
          fill={colors.muted}
          fontSize={36}
          fontFamily={fonts.mono}
          textAnchor="middle"
        >
          ½
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontSize: 46,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        ‖fₙ − fₙ₋₁‖₁ ={" "}
        <span style={{ fontFamily: fonts.mono }}>{gap.toFixed(3)}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1260,
          fontSize: 46,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c2 + 20),
        }}
      >
        {tx.step} · {tx.hole}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1260,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.highlight}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c3 + 6),
          translate: riseIn(frame, c3 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        (C[0, 1], ‖·‖₁) ~ ℚ
      </div>
    </SceneShell>
  );
};
