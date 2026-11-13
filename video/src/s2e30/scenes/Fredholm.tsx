import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The Fredholm alternative. The equation (c0); a fork in the road, the
// left branch lit: one solution for every f (c1); the right branch lit: a
// kernel, and f must be perpendicular to it (c2). The rank-one example
// K(x, y) = xy: a grid under I − (λ/3)P, where P projects onto one
// direction; as λ runs up to 3 that direction collapses, then recovers
// (c3). Chip: rank–nullity rescued (c4).

const G = { x: 1360, y: 500, s: 52 };

export const Fredholm: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("fredholm");
  const [c0, c1, c2, c3, c4] = cues;
  const lam =
    frame >= c3 ? 3 - 2.6 * Math.abs(Math.cos((frame - c3 - 6) * 0.03)) : 0.4;
  const k = 1 - lam / 3;
  const map = (x: number, y: number): [number, number] => [
    G.x + G.s * x * k,
    G.y - G.s * y,
  ];

  return (
    <SceneShell id="fredholm">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="pluck4" at={c2 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="chime" at={c4 + 8} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 6, 8)}>
          <path
            d="M 560 760 L 560 560"
            stroke={colors.paper}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d="M 560 560 Q 560 440 360 360"
            fill="none"
            stroke={
              frame >= c1 + 6 && frame < c2
                ? colors.green
                : alpha(colors.paper, 0.5)
            }
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d="M 560 560 Q 560 440 760 360"
            fill="none"
            stroke={frame >= c2 + 6 ? colors.orange : alpha(colors.paper, 0.5)}
            strokeWidth={10}
            strokeLinecap="round"
          />
        </g>
        <g opacity={fadeIn(frame, c3 + 4, 8)}>
          {Array.from({ length: 9 }, (_, i) => {
            const v = i - 4;
            const [a1, b1] = map(v, -4);
            const [a2, b2] = map(v, 4);
            const [p1, q1] = map(-4, v);
            const [p2, q2] = map(4, v);
            return (
              <g key={i}>
                <line
                  x1={a1}
                  y1={b1}
                  x2={a2}
                  y2={b2}
                  stroke={alpha(colors.primary, 0.6)}
                  strokeWidth={2}
                />
                <line
                  x1={p1}
                  y1={q1}
                  x2={p2}
                  y2={q2}
                  stroke={alpha(colors.primary, 0.6)}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          <line
            x1={G.x - 4 * G.s}
            y1={G.y}
            x2={G.x + 4 * G.s}
            y2={G.y}
            stroke={colors.red}
            strokeWidth={4}
            opacity={0.4 + 0.6 * (1 - k)}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 200,
          fontFamily: fonts.math,
          fontSize: 54,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        u − λKu = f
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 140,
          width: 440,
          textAlign: "center",
          fontSize: 38,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 8),
          translate: riseIn(frame, c1 + 8),
        }}
      >
        {tx.unique}
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 560,
          width: 460,
          textAlign: "center",
          fontSize: 38,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 8),
          translate: riseIn(frame, c2 + 8),
        }}
      >
        {tx.kernel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1160,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c3 + 6),
          whiteSpace: "nowrap",
        }}
      >
        K(x, y) = xy · λ ={" "}
        <span
          style={{
            fontFamily: fonts.mono,
            color: lam > 2.95 ? colors.red : colors.primary,
          }}
        >
          {lam.toFixed(2)}
        </span>
      </div>
      <Chip
        frame={frame}
        at={c4 + 8}
        x={1160}
        y={760}
        color={colors.green}
        size={40}
      >
        {tx.rankNullity}
      </Chip>
    </SceneShell>
  );
};
