import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path } from "../components/draw";
import { phi } from "../components/fns";
import { useStrings } from "../i18n";

// The delta as a limit of boxes. A box of width 1/n and height n, with n
// doubling 1, 2, 4, … 32 (c0). A probe point at x = 0.3 reads 0 once the
// box has passed it (c1). A bar of ‖δₙ‖² = n climbing off the top (c2). A
// smooth φ in green under the box (c3); the readout ∫ δₙ φ settling onto
// φ(0), its values listed as n grows (c4).

const X = (t: number) => 260 + 900 * t;
const Y = (v: number) => 720 - 16 * v;
const NS = [1, 2, 4, 8, 16, 32];
const avgPhi = (n: number) => {
  let s = 0;
  for (let i = 0; i < 400; i++) s += phi((i + 0.5) / (400 * n)) / 400;
  return s;
};

export const Boxes: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("boxes");
  const [c0, c1, c2, c3, c4] = cues;
  const start = frame >= c3 ? c3 + 10 : c0 + 6;
  const k = Math.min(
    NS.length - 1,
    Math.max(0, Math.floor((frame - start) / 26)),
  );
  const n = NS[k];
  const sh = 22; // φ drawn taller so it reads beside the box

  return (
    <SceneShell id="boxes">
      {NS.map((_, i) => (
        <Sfx key={i} name="pluck2" at={c0 + 6 + i * 26} volume={0.08} />
      ))}
      {NS.map((_, i) => (
        <Sfx key={`b${i}`} name="tick" at={c3 + 10 + i * 26} volume={0.06} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="riser" at={c2 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="chime" at={c4 + 40} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="bx-clip">
            <rect x={0} y={150} width={1920} height={580} />
          </clipPath>
        </defs>
        <line
          x1={X(-0.15)}
          y1={Y(0)}
          x2={X(1.05)}
          y2={Y(0)}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        {[0, 1].map((t) => (
          <text
            key={t}
            x={X(t)}
            y={Y(0) + 46}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.mono}
          >
            {t}
          </text>
        ))}
        <path
          d={path((x) => sh * phi(x), -0.15, 1.05, X, Y, 300)}
          fill="none"
          stroke={colors.green}
          strokeWidth={5}
          opacity={fadeIn(frame, c3 + 6, 10)}
        />
        <g clipPath="url(#bx-clip)">
          <rect
            x={X(0)}
            y={Y(n)}
            width={X(1 / n) - X(0)}
            height={Y(0) - Y(n)}
            fill={alpha(colors.primary, 0.4)}
            stroke={colors.primary}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 4, 8)}
          />
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <line
            x1={X(0.3)}
            y1={Y(0)}
            x2={X(0.3)}
            y2={Y(14)}
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="8 7"
          />
          <circle
            cx={X(0.3)}
            cy={Y(n <= 3 ? n : 0)}
            r={13}
            fill={colors.highlight}
          />
        </g>
        <g opacity={fadeIn(frame, c2 + 6, 8)}>
          <rect
            x={1300}
            y={Math.max(150, 720 - 16 * n)}
            width={80}
            height={720 - Math.max(150, 720 - 16 * n)}
            rx={8}
            fill={colors.red}
          />
          <text
            x={1340}
            y={770}
            textAnchor="middle"
            fill={colors.red}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ‖δₙ‖²
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 260,
          fontFamily: fonts.mono,
          fontSize: 46,
          fontWeight: 800,
          color: colors.primary,
          whiteSpace: "nowrap",
        }}
      >
        n = {n}
        <span
          style={{ color: colors.highlight, opacity: fadeIn(frame, c1 + 10) }}
        >
          {"  "}· {tx.pointwise}: δₙ(0.3) = {n <= 3 ? n : 0}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1440,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontFamily: fonts.mono,
          fontSize: 38,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 10),
        }}
      >
        {NS.slice(0, k + 1).map((m) => (
          <div key={m}>
            n={m}: {avgPhi(m).toFixed(3)}
          </div>
        ))}
        <div
          style={{
            color: colors.highlight,
            opacity: fadeIn(frame, c4 + 20),
          }}
        >
          φ(0) = {phi(0).toFixed(3)}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1440,
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 10),
        }}
      >
        ∫ δₙ φ
      </div>
    </SceneShell>
  );
};
