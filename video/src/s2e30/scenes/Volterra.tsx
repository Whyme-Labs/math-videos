import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The Volterra operator. A function f and its running integral Vf, the
// area sweeping from 0 to x (c0). Chip: no eigenvalues (c1). Repeated
// integration of 1: x, x²/2, x³/6, … flattening towards the axis, with
// the bound 1/n! read out (c2).

const PX = 200;
const PW = 800;
const PY = 700;
const X = (x: number) => PX + PW * x;
const f = (x: number) => 0.5 + 0.35 * Math.cos(6 * x);
const F = (x: number) => 0.5 * x + (0.35 / 6) * Math.sin(6 * x);
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));

export const Volterra: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("volterra");
  const [c0, c1, c2] = cues;
  const sweep = Math.max(0, Math.min(1, (frame - c0 - 10) / 80));
  const n = Math.min(7, Math.max(1, 1 + Math.floor((frame - c2 - 6) / 16)));

  return (
    <SceneShell id="volterra">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="thud" at={c1 + 10} volume={0.2} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 16} volume={0.06} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={X(0)}
          y1={PY}
          x2={X(1)}
          y2={PY}
          stroke={alpha(colors.paper, 0.4)}
          strokeWidth={3}
        />
        <g opacity={fadeIn(frame, c0 + 4, 8) * (frame >= c2 ? 0.25 : 1)}>
          <path
            d={`M ${X(0)} ${PY} ${Array.from({ length: 101 }, (_, i) => `L ${X((sweep * i) / 100)} ${PY - 400 * f((sweep * i) / 100)}`).join(" ")} L ${X(sweep)} ${PY} Z`}
            fill={alpha(colors.orange, 0.3)}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, i) =>
                `${i ? "L" : "M"} ${X(i / 100)} ${PY - 400 * f(i / 100)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, i) =>
                `${i ? "L" : "M"} ${X((sweep * i) / 100)} ${PY - 400 * F((sweep * i) / 100)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          {Array.from({ length: n }, (_, k) => {
            const m = k + 1;
            return (
              <path
                key={m}
                d={Array.from(
                  { length: 101 },
                  (_, i) =>
                    `${i ? "L" : "M"} ${X(i / 100)} ${PY - (400 * (i / 100) ** m) / fact(m)}`,
                ).join(" ")}
                fill="none"
                stroke={m === n ? colors.green : alpha(colors.green, 0.4)}
                strokeWidth={m === n ? 6 : 3}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1100,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        (Vf)(x) = ∫₀ˣ f
      </div>
      <Chip
        frame={frame}
        at={c1 + 10}
        x={1100}
        y={250}
        color={colors.red}
        size={46}
      >
        {tx.noEigenvalues}
      </Chip>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1100,
          fontFamily: fonts.mono,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 10),
          whiteSpace: "nowrap",
        }}
      >
        Vⁿ1 = xⁿ/n!
        <br />
        ‖Vⁿ‖ ≤ 1/{fact(n)}
      </div>
    </SceneShell>
  );
};
