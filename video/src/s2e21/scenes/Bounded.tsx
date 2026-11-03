import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq } from "../../shared/components/Eq";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Bounded operators. ‖Tx‖ ≤ C‖x‖ (c0). A unit disc goes through a matrix
// and comes out an ellipse, its long semi-axis σ₁ marked as the best C
// (c1). A chip: bounded ⇔ continuous (c2). Differentiation on x, x², …,
// x¹⁰ drawn on [0, 1]: the peak stays 1 while the slope at 1 reads n
// (c3). With the norm that charges for slope too, ‖f‖ = ‖f‖∞ + ‖f′‖∞, the
// ratio ‖f′‖∞ / ‖f‖ = n/(n + 1) stays under 1 (c4). A last chip:
// bounded depends on the map and both norms (c5).

const O = { x: 560, y: 470 };
const S = 120;
const M = [1.4, 0.6, 0.3, 0.9];

export const Bounded: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("bounded");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const go = glide(frame, c1 + 6, fps, 30);
  const ell = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const x = Math.cos(t);
    const y = Math.sin(t);
    const px = x + (M[0] * x + M[1] * y - x) * go;
    const py = y + (M[2] * x + M[3] * y - y) * go;
    return `${i ? "L" : "M"} ${O.x + px * S} ${O.y - py * S}`;
  }).join(" ");
  // σ₁ direction of M
  const p = M[0] * M[0] + M[2] * M[2];
  const q = M[0] * M[1] + M[2] * M[3];
  const r = M[1] * M[1] + M[3] * M[3];
  const tv = 0.5 * Math.atan2(2 * q, p - r);
  const v = { x: Math.cos(tv), y: Math.sin(tv) };
  const Av = { x: M[0] * v.x + M[1] * v.y, y: M[2] * v.x + M[3] * v.y };
  const s1 = Math.hypot(Av.x, Av.y);
  const n = Math.min(10, Math.max(1, Math.floor((frame - c3 - 6) / 12) + 1));
  const PX = 160;
  const PW = 700;
  const PY = 760;
  const PH = 500;

  return (
    <SceneShell id="bounded">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="pluck3" at={c1 + 40} volume={0.14} />
      <Sfx name="ding" at={c2 + 10} volume={0.26} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 12} volume={0.1} />
      ))}
      <Sfx name="pluck5" at={c4 + 10} volume={0.14} />
      <Sfx name="chime" at={c5 + 6} volume={0.3} />

      <Eq
        steps={[[{ id: "a", t: "‖Tx‖ ≤ C‖x‖" }]]}
        at={[c0 + 6]}
        x={1400}
        y={110}
        size={64}
        family={fonts.body}
      />
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={O.x}
            cy={O.y}
            r={S}
            fill="none"
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
          <path
            d={ell}
            fill={alpha(colors.primary, 0.1)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <g opacity={fadeIn(frame, c1 + 40, 8)}>
            <Arrow
              from={O}
              to={{ x: O.x + Av.x * S, y: O.y - Av.y * S }}
              width={14}
              color={colors.green}
            />
            <text
              x={O.x + Av.x * S + 20}
              y={O.y - Av.y * S}
              fill={colors.green}
              fontSize={44}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              σ₁ = {s1.toFixed(2)}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1160,
            padding: "12px 28px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 10),
            translate: riseIn(frame, c2 + 10, 12),
            whiteSpace: "nowrap",
          }}
        >
          {tx.bounded} ⇔ {tx.continuous}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: n }).map((_, i) => {
            const k = i + 1;
            const d = Array.from(
              { length: 101 },
              (_, j) =>
                `${j ? "L" : "M"} ${PX + PW * (j / 100)} ${PY - PH * (j / 100) ** k}`,
            ).join(" ");
            return (
              <path
                key={k}
                d={d}
                fill="none"
                stroke={k === n ? colors.primary : alpha(colors.primary, 0.25)}
                strokeWidth={k === n ? 6 : 3}
              />
            );
          })}
          <line
            x1={PX + PW - 60}
            y1={PY - PH + 60 * n * (PH / PW)}
            x2={PX + PW + 40}
            y2={PY - PH - 40 * n * (PH / PW)}
            stroke={colors.orange}
            strokeWidth={5}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontSize: 46,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontFamily: fonts.math, color: colors.primary }}>
            f = xⁿ <span style={{ fontFamily: fonts.mono }}>n = {n}</span>
          </div>
          <div style={{ color: colors.text }}>
            ‖f‖∞ = <span style={{ fontFamily: fonts.mono }}>1</span>
          </div>
          <div style={{ color: colors.orange }}>
            ‖f′‖∞ = <span style={{ fontFamily: fonts.mono }}>{n}</span> ·{" "}
            {tx.unbounded}
          </div>
          <div
            style={{
              color: colors.green,
              opacity: fadeIn(frame, c4 + 10),
              translate: riseIn(frame, c4 + 10, 12),
            }}
          >
            ‖f′‖∞ / (‖f‖∞ + ‖f′‖∞) ={" "}
            <span style={{ fontFamily: fonts.mono }}>
              {(n / (n + 1)).toFixed(2)}
            </span>{" "}
            &lt; 1
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            left: 1000,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.primary}`,
            background: alpha(colors.bg, 0.85),
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c5 + 6),
            translate: riseIn(frame, c5 + 6, 12),
            whiteSpace: "nowrap",
          }}
        >
          {tx.bounded}: T + ‖·‖ + ‖·‖′
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
