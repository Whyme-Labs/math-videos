import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { FRACTIONS, NumberLine } from "../components/line";

// The fractions have size zero. The fractions listed in order, q₁ = ½,
// q₂ = ⅓, q₃ = ⅔, …, each lighting on the line as it's named (c0). q₁ gets
// a cover of length ε/2 (c1); q₂ ε/4, q₃ ε/8, … each cover half the last
// (c2), the total read out, always under ε (c3). ε shrinks, 0.5, 0.1,
// 0.01, and every cover shrinks with it (c3). m(ℚ) = 0 (c4).

const X0 = 200;
const X1 = 1300;
const sx = (x: number) => X0 + (X1 - X0) * x;

export const NullQ: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("nullQ");
  const [c0, c1, c2, c3, c4] = cues;
  const named = Math.min(12, Math.floor(Math.max(0, frame - c0 - 6) / 8) + 1);
  const covers =
    frame < c1 + 6
      ? 0
      : frame < c2 + 6
        ? 1
        : Math.min(40, Math.floor((frame - c2 - 6) / 3) + 2);
  const e1 = glide(frame, c3 + 20, fps, 30);
  const e2 = glide(frame, c3 + 70, fps, 30);
  const eps = lerp(lerp(0.4, 0.1, e1), 0.02, e2);
  const total = eps * (1 - 0.5 ** covers);

  return (
    <SceneShell id="nullQ">
      {Array.from({ length: 12 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 8} volume={0.08} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="riser" at={c2 + 6} volume={0.08} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 70} volume={0.1} />
      <Sfx name="chime" at={c4 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <NumberLine x0={X0} x1={X1} y={560} />
        {FRACTIONS.slice(0, Math.max(named, covers)).map((f, k) => {
          const x = f.p / f.q;
          const w = eps / 2 ** (k + 1);
          return (
            <g key={k}>
              {k < covers ? (
                <rect
                  x={sx(x - w / 2)}
                  y={530}
                  width={Math.max(1.5, (X1 - X0) * w)}
                  height={60}
                  rx={4}
                  fill={alpha(colors.orange, 0.45)}
                  stroke={colors.orange}
                  strokeWidth={2}
                />
              ) : null}
              <circle cx={sx(x)} cy={560} r={8} fill={colors.highlight} />
              {k < 6 ? (
                <text
                  x={sx(x)}
                  y={510 - (k % 2) * 40}
                  fill={colors.highlight}
                  fontSize={30}
                  fontFamily={fonts.math}
                  fontWeight={800}
                  textAnchor="middle"
                >
                  q{"₁₂₃₄₅₆"[k]}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 200,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        ε/2 + ε/4 + ε/8 + … = ε
      </div>
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 200,
          fontSize: 48,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 20),
          whiteSpace: "nowrap",
        }}
      >
        ε = <span style={{ fontFamily: fonts.mono }}>{eps.toFixed(2)}</span>
        <span style={{ marginLeft: 40 }}>
          Σ = <span style={{ fontFamily: fonts.mono }}>{total.toFixed(4)}</span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 200,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c4 + 6),
          translate: riseIn(frame, c4 + 6, 12),
        }}
      >
        m(ℚ ∩ [0, 1]) = 0
      </div>
    </SceneShell>
  );
};
