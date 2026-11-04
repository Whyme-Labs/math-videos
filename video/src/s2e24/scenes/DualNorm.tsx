import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Eq } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The dual norm. X* = bounded functionals (c0). The formula ‖f‖ = sup over
// the unit ball of |f(x)| (c1). The unit disc and the level lines of
// f(x) = 2x₁ + x₂; the line f = c slides outwards, c read out, until it
// touches the disc at one point: c = √5 = ‖f‖ (c2). Two chips: X* is
// complete (c3), the completeness comes from ℝ (c4).

const O = { x: 640, y: 480 };
const S = 200;
const A = { x: 2, y: 1 };
const NA = Math.hypot(A.x, A.y);

export const DualNorm: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("dualNorm");
  const [c0, c1, c2, c3, c4] = cues;
  const slide = glide(frame, c2 + 10, fps, 80);
  const c = lerp(0.2, NA, slide);
  const u = { x: A.x / NA, y: A.y / NA };
  const v = { x: -u.y, y: u.x };
  const line = (k: number) => {
    const d = k / NA;
    const p = { x: O.x + S * d * u.x, y: O.y - S * d * u.y };
    return {
      x1: p.x - 500 * v.x,
      y1: p.y + 500 * v.y,
      x2: p.x + 500 * v.x,
      y2: p.y - 500 * v.y,
    };
  };
  const touch = slide > 0.98;

  return (
    <SceneShell id="dualNorm">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      <Sfx name="riser" at={c2 + 10} volume={0.08} />
      <Sfx name="ding" at={c2 + 92} volume={0.26} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="chime" at={c4 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="dn">
            <rect x={160} y={110} width={960} height={720} />
          </clipPath>
        </defs>
        <g opacity={fadeIn(frame, c2 + 4, 10)} clipPath="url(#dn)">
          {[-2, -1, 1, 2].map((k) => (
            <line
              key={k}
              {...line(k * 0.9)}
              stroke={alpha(colors.orange, 0.25)}
              strokeWidth={3}
            />
          ))}
          <circle
            cx={O.x}
            cy={O.y}
            r={S}
            fill={alpha(colors.primary, 0.1)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <line
            {...line(c)}
            stroke={touch ? colors.green : colors.orange}
            strokeWidth={6}
          />
          {touch ? (
            <circle
              cx={O.x + S * u.x}
              cy={O.y - S * u.y}
              r={14}
              fill={colors.green}
            />
          ) : null}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1200,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        X* = {"{"} f : |f(x)| ≤ C‖x‖ {"}"}
      </div>
      <Eq
        steps={[
          [
            { id: "a", t: "‖f‖ = sup" },
            { id: "b", t: "‖x‖≤1", color: colors.muted },
            { id: "c", t: " |f(x)|" },
          ],
        ]}
        at={[c1 + 6]}
        x={1500}
        y={220}
        size={56}
      />
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 1200,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          fontSize: 44,
          fontWeight: 800,
          opacity: fadeIn(frame, c2 + 10),
        }}
      >
        <div
          style={{
            fontFamily: fonts.math,
            color: colors.orange,
            whiteSpace: "nowrap",
          }}
        >
          f(x) = 2x₁ + x₂
        </div>
        <div
          style={{
            color: touch ? colors.green : colors.orange,
            whiteSpace: "nowrap",
          }}
        >
          f = <span style={{ fontFamily: fonts.mono }}>{c.toFixed(2)}</span>
          {touch ? (
            <span style={{ fontFamily: fonts.math }}> = √5 = ‖f‖</span>
          ) : null}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1200,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 44,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 6),
            translate: riseIn(frame, c3 + 6, 12),
          }}
        >
          {tx.complete}
        </div>
        <div
          style={{
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c4 + 6),
            translate: riseIn(frame, c4 + 6, 12),
          }}
        >
          {tx.fromR}
        </div>
      </div>
    </SceneShell>
  );
};
