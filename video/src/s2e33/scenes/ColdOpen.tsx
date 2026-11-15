import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { phi, spike } from "../components/fns";
import { useStrings } from "../i18n";

// The Dirac delta. A spike of area 1 on a line, narrowing (c0, c1), its
// area shaded and read out (c2). A red cross: no such function (c3). The
// honest version, zero except at one point: a lone dot, area 0 (c4). A
// smooth test function φ in green appears under the spike (c5); the
// product is read out and it is φ(0), ringed on the curve (c6). Chip: δ is
// a measurement, φ ↦ φ(0) (c7).

const X = (t: number) => 960 + 520 * t;
const Y = (v: number) => 700 - 150 * v;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const w = 0.4 * 0.5 ** (5 * progress(frame, c1 + 6, 50)) + 0.004;
  const lone = fadeIn(frame, c4 + 6, 8) * fadeOut(frame, c5, 8);
  const showSpike = fadeIn(frame, c0 + 6, 8) * (1 - lone);
  let prod = 0;
  for (let i = 0; i < 4000; i++) {
    const x = -1.5 + (3 * (i + 0.5)) / 4000;
    prod += (spike(x, w) * phi(x) * 3) / 4000;
  }

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="riser" at={c1 + 6} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.18} />
      <Sfx name="thud" at={c3 + 8} volume={0.2} />
      <Sfx name="pop" at={c4 + 6} volume={0.1} />
      <Sfx name="pluck3" at={c5 + 8} volume={0.12} />
      <Sfx name="pluck2" at={c6 + 10} volume={0.12} />
      <Sfx name="chime" at={c7 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="co-clip">
            <rect x={0} y={150} width={1920} height={560} />
          </clipPath>
        </defs>
        <line
          x1={X(-1.4)}
          y1={Y(0)}
          x2={X(1.4)}
          y2={Y(0)}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
          opacity={fadeIn(frame, c0, 8)}
        />
        <text
          x={X(0)}
          y={Y(0) + 50}
          textAnchor="middle"
          fill={colors.muted}
          fontSize={34}
          fontFamily={fonts.mono}
          opacity={fadeIn(frame, c0, 8)}
        >
          0
        </text>
        <path
          d={path(phi, -1.4, 1.4, X, Y, 400)}
          fill="none"
          stroke={colors.green}
          strokeWidth={5}
          opacity={fadeIn(frame, c5 + 6, 10)}
        />
        <g clipPath="url(#co-clip)" opacity={showSpike}>
          <path
            d={`${path((x) => spike(x, w), -1.4, 1.4, X, Y, 1600)} Z`}
            fill={alpha(colors.primary, 0.35 * fadeIn(frame, c2 + 6, 8))}
            stroke={colors.primary}
            strokeWidth={5}
          />
        </g>
        <g opacity={lone}>
          <circle cx={X(0)} cy={Y(3)} r={12} fill={colors.primary} />
          <line
            x1={X(-1.4)}
            y1={Y(0)}
            x2={X(1.4)}
            y2={Y(0)}
            stroke={colors.primary}
            strokeWidth={5}
          />
        </g>
        <circle
          cx={X(0)}
          cy={Y(phi(0))}
          r={20}
          fill="none"
          stroke={colors.highlight}
          strokeWidth={5}
          opacity={fadeIn(frame, c6 + 10, 8)}
        />
        <g opacity={fadeIn(frame, c3 + 6, 6) * fadeOut(frame, c5, 8)}>
          <line
            x1={X(-0.35)}
            y1={Y(3.3)}
            x2={X(0.35)}
            y2={Y(0.3)}
            stroke={colors.red}
            strokeWidth={12}
          />
          <line
            x1={X(0.35)}
            y1={Y(3.3)}
            x2={X(-0.35)}
            y2={Y(0.3)}
            stroke={colors.red}
            strokeWidth={12}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 160,
          fontFamily: fonts.mono,
          fontSize: 46,
          fontWeight: 800,
          color: colors.primary,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c2 + 10) * fadeOut(frame, c5, 8),
        }}
      >
        {tx.area} = {frame >= c4 + 6 ? "0" : "1"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 50,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c5 + 10),
        }}
      >
        ∫ δ φ ={" "}
        <span style={{ fontFamily: fonts.mono, color: colors.highlight }}>
          {prod.toFixed(3)}
        </span>{" "}
        <span style={{ opacity: fadeIn(frame, c6 + 10) }}>
          = φ(0) ={" "}
          <span style={{ fontFamily: fonts.mono }}>{phi(0).toFixed(3)}</span>
        </span>
      </div>
      <div style={{ opacity: fadeOut(frame, c5, 8) }}>
        <Chip
          frame={frame}
          at={c3 + 12}
          x={1300}
          y={240}
          color={colors.red}
          size={42}
        >
          {tx.noSuch}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c7 + 16}
        x={160}
        y={260}
        color={colors.highlight}
        size={44}
        math
      >
        δ : φ ↦ φ(0) · {tx.measurement}
      </Chip>
    </SceneShell>
  );
};
