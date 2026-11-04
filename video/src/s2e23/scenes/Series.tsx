import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Series need completeness. Arrows laid tip to tail, each half as long
// and turned a little, their lengths' total read out: finite (c0–c1). In
// a Banach space the tip-to-tail path lands on a point, which glows (c2).
// The bars of a sequence in ℓ² filled in by e₁, e₂, … with the missing
// part read out shrinking to 0: an infinite-sum basis (c3). The same for
// (1, 1, 1, …) in ℓ∞: the missing part stays 1 every time (c4).

const O = { x: 360, y: 640 };

export const Series: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("series");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const k = Math.min(10, Math.floor(Math.max(0, frame - c0 - 6) / 10) + 1);
  const pts = [O];
  for (let i = 0; i < 10; i++) {
    const a = 0.5 + i * 0.6;
    const L = 420 * 0.55 ** i;
    const p = pts[pts.length - 1];
    pts.push({ x: p.x + L * Math.cos(a), y: p.y - L * Math.sin(a) });
  }
  const total = Array.from({ length: k }, (_, i) => 0.55 ** i).reduce(
    (a, b) => a + b,
    0,
  );
  const fillN = Math.min(14, Math.floor(Math.max(0, frame - c3 - 6) / 6));
  const fillM = Math.min(14, Math.floor(Math.max(0, frame - c4 - 6) / 6));
  const tail2 = Math.sqrt(
    Array.from({ length: 200 }, (_, i) =>
      i >= fillN ? 1 / (i + 1) ** 2 : 0,
    ).reduce((a, b) => a + b, 0),
  );

  return (
    <SceneShell id="series">
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 10} volume={0.08} />
      ))}
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.26} />
      <Sfx name="riser" at={c3 + 6} volume={0.08} />
      <Sfx name="thud" at={c4 + 60} volume={0.2} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {pts.slice(0, k).map((p, i) => (
            <Arrow
              key={i}
              from={p}
              to={pts[i + 1]}
              width={Math.max(4, 14 * 0.8 ** i)}
              color={i % 2 ? colors.primary : colors.orange}
            />
          ))}
          <circle
            cx={pts[10].x}
            cy={pts[10].y}
            r={18}
            fill={colors.green}
            opacity={fadeIn(frame, c2 + 10, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 1180,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            fontSize: 46,
            fontWeight: 800,
          }}
        >
          <div
            style={{
              fontFamily: fonts.math,
              color: colors.orange,
              opacity: fadeIn(frame, c1 + 6),
              whiteSpace: "nowrap",
            }}
          >
            {tx.lengths}{" "}
            <span style={{ fontFamily: fonts.mono }}>{total.toFixed(3)}</span>
          </div>
          <div
            style={{
              fontFamily: fonts.math,
              color: colors.green,
              opacity: fadeIn(frame, c2 + 10),
              whiteSpace: "nowrap",
            }}
          >
            Σ xₙ ✓
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {[0, 1].map((r) => (
            <g key={r} transform={`translate(200 ${360 + r * 300})`}>
              <line
                x1={0}
                y1={0}
                x2={14 * 60}
                y2={0}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
              />
              {Array.from({ length: 14 }).map((_, i) => {
                const h = r === 0 ? 200 / (i + 1) : 120;
                const on = i < (r === 0 ? fillN : fillM);
                return (
                  <rect
                    key={i}
                    x={i * 60}
                    y={-h}
                    width={48}
                    height={h}
                    rx={4}
                    fill={on ? colors.green : "none"}
                    stroke={
                      on
                        ? colors.green
                        : r === 0
                          ? colors.primary
                          : colors.highlight
                    }
                    strokeWidth={3}
                  />
                );
              })}
              <text
                x={14 * 60 + 30}
                y={-20}
                fill={colors.muted}
                fontSize={52}
                fontWeight={800}
              >
                …
              </text>
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 1160,
            fontSize: 44,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
          }}
        >
          ℓ²:{" "}
          <span style={{ fontFamily: fonts.mono }}>
            ‖x − Σ‖ = {tail2.toFixed(3)}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 540,
            left: 1160,
            fontSize: 44,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c4 + 6),
            whiteSpace: "nowrap",
          }}
        >
          ℓ∞: <span style={{ fontFamily: fonts.mono }}>‖x − Σ‖ = 1</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
