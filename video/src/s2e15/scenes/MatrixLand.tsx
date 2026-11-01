import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Matrix land. One complex plane; three eigenvalue dots start scattered
// (c0). The real line lights up and the dots fly onto it: Hermitian
// matrices (c1). The unit circle lights up and the dots fly onto it:
// unitary (c2). The positive ray lights up and they land there: positive
// definite (c3). On the right, each kind of number is paired with its kind
// of matrix as it lights.

const C = { x: 700, y: 470 };
const R = 200;
const START = [
  { x: 0.9, y: 0.7 },
  { x: -0.7, y: 0.5 },
  { x: 0.3, y: -1.0 },
];
const REAL = [-1.3, 0.4, 1.6];
const CIRC = [0.6, 2.5, 4.3];
const POS = [0.35, 0.95, 1.7];

export const MatrixLand: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("matrixLand");
  const [c0, c1, c2, c3] = cues;
  const t1 = glide(frame, c1 + 20, fps, 24);
  const t2 = glide(frame, c2 + 20, fps, 24);
  const t3 = glide(frame, c3 + 20, fps, 24);
  const glow = [
    fadeIn(frame, c1 + 6),
    fadeIn(frame, c2 + 6),
    fadeIn(frame, c3 + 6),
  ];
  const now = frame >= c3 ? 2 : frame >= c2 ? 1 : frame >= c1 ? 0 : -1;
  const pos = (k: number) => {
    let p = START[k];
    p = { x: lerp(p.x, REAL[k], t1), y: lerp(p.y, 0, t1) };
    p = {
      x: lerp(p.x, Math.cos(CIRC[k]), t2),
      y: lerp(p.y, Math.sin(CIRC[k]), t2),
    };
    p = { x: lerp(p.x, POS[k], t3), y: lerp(p.y, 0, t3) };
    return p;
  };
  const tone = (i: number) => (now === i ? 1 : 0.35);

  return (
    <SceneShell id="matrixLand">
      <Sfx name="pop" at={c0 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={C.x - 420}
          y1={C.y}
          x2={C.x + 420}
          y2={C.y}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        <line
          x1={C.x}
          y1={C.y - 330}
          x2={C.x}
          y2={C.y + 330}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        <line
          x1={C.x - 420}
          y1={C.y}
          x2={C.x + 420}
          y2={C.y}
          stroke={colors.green}
          strokeWidth={10}
          opacity={glow[0] * tone(0)}
        />
        <circle
          cx={C.x}
          cy={C.y}
          r={R}
          fill="none"
          stroke={colors.primary}
          strokeWidth={10}
          opacity={glow[1] * tone(1)}
        />
        <line
          x1={C.x}
          y1={C.y}
          x2={C.x + 420}
          y2={C.y}
          stroke={colors.orange}
          strokeWidth={14}
          opacity={glow[2] * tone(2)}
        />
        <circle cx={C.x} cy={C.y} r={10} fill={colors.text} />
        {[0, 1, 2].map((k) => {
          const p = pos(k);
          return (
            <circle
              key={k}
              cx={C.x + p.x * R}
              cy={C.y - p.y * R}
              r={20}
              fill={colors.highlight}
              stroke={colors.bg}
              strokeWidth={4}
              opacity={fadeIn(frame, c0 + 10 + k * 4)}
            />
          );
        })}
      </svg>
      {tx.kinds.map((kd, i) => (
        <div
          key={kd.mat}
          style={{
            position: "absolute",
            top: 220 + i * 150,
            left: 1300,
            display: "flex",
            gap: 24,
            alignItems: "baseline",
            opacity: glow[i] * (0.4 + 0.6 * tone(i)),
            translate: riseIn(frame, [c1, c2, c3][i] + 6, 12),
          }}
        >
          <span
            style={{
              fontFamily: fonts.math,
              fontSize: 48,
              fontWeight: 800,
              color: [colors.green, colors.primary, colors.orange][i],
            }}
          >
            {kd.num}
          </span>
          <span style={{ fontSize: 40, color: colors.muted }}>→</span>
          <span style={{ fontSize: 48, fontWeight: 800, color: colors.text }}>
            {kd.mat}
          </span>
        </div>
      ))}
    </SceneShell>
  );
};
