import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { path, squareSum } from "../components/waves";
import { useStrings } from "../i18n";

// The Gibbs overshoot. A close-up of the square wave's jump at 0 with
// S₉ f rising past 1 (c0). N steps to 49, then 199: the bump squeezes
// against the jump but its top stays on the dashed line at 1.179 (c1).
// The overshoot is shaded; its area shrinks with N (c2). Chip: in energy
// yes, pointwise almost everywhere (c3).

const XA = -0.25;
const XB = 1.3;
const X = (t: number) => 200 + (1200 * (t - XA)) / (XB - XA);
const Y = (v: number) => 720 - 420 * v;

export const Gibbs: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("gibbs");
  const [c0, c1, c2, c3] = cues;
  const N = frame < c1 + 50 ? 9 : frame < c1 + 110 ? 49 : 199;
  const f = (x: number) => squareSum(x, N);
  let peak = 0;
  for (let i = 1; i <= 600; i++) peak = Math.max(peak, f((i / 600) * 0.6));
  let area = 0;
  for (let i = 0; i < 2000; i++) {
    const x = ((i + 0.5) / 2000) * 1.3;
    area += (Math.max(0, f(x) - 1) * 1.3) / 2000;
  }
  const over = (x: number) => Math.max(1, f(x));

  return (
    <SceneShell id="gibbs">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 50} volume={0.12} />
      <Sfx name="pluck4" at={c1 + 110} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="chime" at={c3 + 8} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="gb-clip">
            <rect x={200} y={140} width={1200} height={680} />
          </clipPath>
        </defs>
        <g opacity={fadeIn(frame, c0 + 2, 8)} clipPath="url(#gb-clip)">
          <line
            x1={200}
            y1={Y(0)}
            x2={1400}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={`M ${X(XA)} ${Y(-1)} L ${X(0)} ${Y(-1)} L ${X(0)} ${Y(1)} L ${X(XB)} ${Y(1)}`}
            fill="none"
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={6}
          />
          <path
            d={`${path(over, 0, 1.3, X, Y, 800)} L ${X(1.3)} ${Y(1)} L ${X(0)} ${Y(1)} Z`}
            fill={alpha(colors.red, 0.4)}
            opacity={fadeIn(frame, c2 + 6, 8)}
          />
          <path
            d={path(f, XA, XB, X, Y, 1600)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          <line
            x1={200}
            y1={Y(1.179)}
            x2={1400}
            y2={Y(1.179)}
            stroke={colors.green}
            strokeWidth={3}
            strokeDasharray="12 8"
            opacity={fadeIn(frame, c1 + 10, 8)}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 1460,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ color: colors.primary, opacity: fadeIn(frame, c0 + 6) }}>
          N = {N}
        </div>
        <div style={{ color: colors.green, opacity: fadeIn(frame, c1 + 10) }}>
          {tx.peak} {peak.toFixed(3)}
        </div>
        <div style={{ color: colors.red, opacity: fadeIn(frame, c2 + 10) }}>
          ∫ = {area.toFixed(4)}
        </div>
      </div>
      <Chip
        frame={frame}
        at={c3 + 8}
        x={1440}
        y={460}
        color={colors.green}
        size={40}
      >
        L² ✓ · a.e. ✓
      </Chip>
    </SceneShell>
  );
};
