import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The rules of a norm. A chip (c0) and the three rules as tiles (c1).
// Three unit balls appear side by side: ‖·‖₁ a diamond, ‖·‖₂ a disc, ‖·‖∞
// a square (c2). In each, two points slide around inside and the segment
// between them stays inside: convex (c3). Then the "ball" of
// (√|x| + √|y|)² ≤ 1, a four-pointed star: its segment from (1, 0) to
// (0, 1) bulges out, and the numbers say why: N(x) = N(y) = 1 but
// N(x + y) = 4 > 2 (c4).

const R = 150;
const CX = [420, 960, 1500];
const CY = 560;
// the boundary of the p-ball, p = 1, 2, ∞, or ½
const ball = (p: number) =>
  Array.from({ length: 145 }, (_, i) => {
    const t = (i / 144) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    let r: number;
    if (p === Infinity) r = 1 / Math.max(Math.abs(c), Math.abs(s));
    else r = 1 / (Math.abs(c) ** p + Math.abs(s) ** p) ** (1 / p);
    return { x: r * c, y: r * s };
  });
const path = (pts: { x: number; y: number }[], cx: number) =>
  pts
    .map(
      (q, i) =>
        `${i ? "L" : "M"} ${(cx + q.x * R).toFixed(1)} ${(CY - q.y * R).toFixed(1)}`,
    )
    .join(" ") + " Z";

export const Norm: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("norm");
  const [c0, c1, c2, c3, c4] = cues;
  const grow = glide(frame, c2 + 6, fps, 24);
  const seg = fadeIn(frame, c3 + 6, 8) * fadeOut(frame, c4, 8);
  const t = (frame - c3) * 0.05;
  const a = { x: 0.6 * Math.cos(t), y: 0.6 * Math.sin(1.3 * t) };
  const b = { x: -0.55 * Math.cos(0.8 * t + 1), y: -0.5 * Math.sin(t + 2) };
  const star = fadeIn(frame, c4 + 6, 10);
  const morph = glide(frame, c4 + 6, fps, 24);
  const shk = shake(frame, c4 + 50, 10);
  const pB = lerp(2, 0.5, morph);

  return (
    <SceneShell id="norm">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 10} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.12} />
      <Sfx name="thud" at={c4 + 50} volume={0.22} />

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          translate: riseIn(frame, c0 + 6, 14),
        }}
      >
        ‖x‖
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          width: 1920,
          display: "flex",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {tx.rules.map((r, i) => (
          <div
            key={r}
            style={{
              padding: "10px 24px",
              borderRadius: 14,
              border: `4px solid ${colors.primary}`,
              background: alpha(colors.bg, 0.85),
              fontFamily: fonts.math,
              fontSize: 40,
              fontWeight: 800,
              color: colors.text,
              opacity: fadeIn(frame, c1 + 6 + i * 10, 8),
              translate: riseIn(frame, c1 + 6 + i * 10, 12),
            }}
          >
            {r}
          </div>
        ))}
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={fadeIn(frame, c2 + 2, 8)}
      >
        {[1, 2, Infinity].map((p, i) => {
          const pp = i === 1 && frame >= c4 ? pB : p;
          const col = [colors.primary, colors.green, colors.highlight][i];
          const bad = i === 1 && morph > 0.5;
          return (
            <g
              key={i}
              transform={`translate(${i === 1 ? shk : 0} 0) scale(1)`}
              style={{ transformOrigin: `${CX[i]}px ${CY}px` }}
            >
              <g
                transform={`translate(${CX[i]} ${CY}) scale(${grow}) translate(${-CX[i]} ${-CY})`}
              >
                <path
                  d={path(ball(pp), CX[i])}
                  fill={alpha(bad ? colors.red : col, 0.12)}
                  stroke={bad ? colors.red : col}
                  strokeWidth={6}
                />
              </g>
              <g opacity={i === 1 && frame >= c4 ? 0 : seg}>
                <line
                  x1={CX[i] + a.x * R}
                  y1={CY - a.y * R}
                  x2={CX[i] + b.x * R}
                  y2={CY - b.y * R}
                  stroke={colors.green}
                  strokeWidth={5}
                />
                <circle
                  cx={CX[i] + a.x * R}
                  cy={CY - a.y * R}
                  r={10}
                  fill={colors.text}
                />
                <circle
                  cx={CX[i] + b.x * R}
                  cy={CY - b.y * R}
                  r={10}
                  fill={colors.text}
                />
              </g>
              {i === 1 ? (
                <g opacity={star}>
                  <line
                    x1={CX[1] + R}
                    y1={CY}
                    x2={CX[1]}
                    y2={CY - R}
                    stroke={colors.red}
                    strokeWidth={5}
                    strokeDasharray="10 8"
                  />
                  <circle cx={CX[1] + R} cy={CY} r={10} fill={colors.text} />
                  <circle cx={CX[1]} cy={CY - R} r={10} fill={colors.text} />
                </g>
              ) : null}
            </g>
          );
        })}
        {["‖·‖₁", "‖·‖₂", "‖·‖∞"].map((l, i) => (
          <text
            key={l}
            x={CX[i]}
            y={CY + R + 70}
            fill={colors.muted}
            fontSize={42}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
            opacity={i === 1 ? 1 - star : 1}
          >
            {l}
          </text>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: CY + R + 30,
          left: CX[1] - 300,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 40,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 40),
        }}
      >
        N(x + y) = 4 &gt; 1 + 1 · {tx.notNorm}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: CX[1] - 150,
          width: 300,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: seg,
        }}
      >
        {tx.convex} ✓
      </div>
    </SceneShell>
  );
};
