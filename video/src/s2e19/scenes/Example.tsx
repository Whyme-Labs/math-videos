import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Mat } from "../../s2e18/components/mat";
import { useStrings } from "../i18n";

// The worked example A = [3 0; 4 5], at true scale. The matrix, and the
// small unit circle growing into a big ellipse (c0). AᵀA = [25 20; 20 25]
// with stretches 45 and 5 (c1). The semi-axes σ₁u₁ and σ₂u₂ drawn, 6.7
// and 2.2 (c2). A test arrow sweeps round the circle and its image's
// length is read out; the readout peaks at 6.7 on the long axis: ‖A‖
// (c3). The circle's area fills in, then the ellipse's: 15 times as much,
// 6.7 × 2.2 (c4). Last the ratio 6.7 / 2.2 = 3 (c5).

const O = { x: 600, y: 480 };
const S = 48;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const A = (x: number, y: number) => ({ x: 3 * x, y: 4 * x + 5 * y });
const S1 = Math.sqrt(45);
const S2 = Math.sqrt(5);
const U1 = { x: 1 / Math.sqrt(10), y: 3 / Math.sqrt(10) };
const U2 = { x: -3 / Math.sqrt(10), y: 1 / Math.sqrt(10) };

export const Example: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("example");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const grow = glide(frame, c0 + 20, fps, 36);
  const path = (k: number) =>
    Array.from({ length: 73 }, (_, i) => {
      const t = (i / 72) * Math.PI * 2;
      const p = A(Math.cos(t), Math.sin(t));
      const q = scr(
        Math.cos(t) + (p.x - Math.cos(t)) * k,
        Math.sin(t) + (p.y - Math.sin(t)) * k,
      );
      return `${i ? "L" : "M"} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
    }).join(" ");
  const th = Math.max(0, frame - c3 - 6) * 0.04;
  const test = A(Math.cos(th), Math.sin(th));
  const tl = Math.hypot(test.x, test.y);
  const sweep = fadeIn(frame, c3 + 6, 8) * fadeOut(frame, c4, 8);
  const areaC = fadeIn(frame, c4 + 6, 10);
  const areaE = fadeIn(frame, c4 + 40, 16);
  const chips = [
    { at: c3 + 30, t: `${tx.size} = 6.7`, c: colors.green },
    { at: c4 + 40, t: `${tx.area} 15 = 6.7 × 2.2`, c: colors.primary },
    { at: c5 + 10, t: `${tx.amplify} 3 = 6.7 / 2.2`, c: colors.highlight },
  ];

  return (
    <SceneShell id="example">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="pluck4" at={c2 + 6} volume={0.14} />
      <Sfx name="riser" at={c3 + 6} volume={0.08} />
      <Sfx name="ding" at={c3 + 30} volume={0.26} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />
      <Sfx name="ding" at={c4 + 40} volume={0.26} />
      <Sfx name="chime" at={c5 + 10} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={O.x - 400}
          y1={O.y}
          x2={O.x + 400}
          y2={O.y}
          stroke={alpha(colors.paper, 0.25)}
          strokeWidth={3}
        />
        <line
          x1={O.x}
          y1={O.y - 360}
          x2={O.x}
          y2={O.y + 340}
          stroke={alpha(colors.paper, 0.25)}
          strokeWidth={3}
        />
        <path
          d={path(grow)}
          fill={alpha(colors.primary, 0.08 + 0.25 * areaE)}
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 4, 8)}
        />
        <circle
          cx={O.x}
          cy={O.y}
          r={S}
          fill={alpha(colors.orange, 0.7 * areaC)}
          stroke={colors.text}
          strokeWidth={4}
          strokeDasharray="8 6"
        />
        <g opacity={fadeIn(frame, c2 + 6, 8)}>
          <Arrow
            from={O}
            to={scr(S1 * U1.x, S1 * U1.y)}
            width={14}
            color={colors.green}
          />
          <Arrow
            from={O}
            to={scr(S2 * U2.x, S2 * U2.y)}
            width={14}
            color={colors.highlight}
          />
          <text
            x={scr(S1 * U1.x, S1 * U1.y).x + 20}
            y={scr(S1 * U1.x, S1 * U1.y).y + 20}
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            6.7
          </text>
          <text
            x={scr(S2 * U2.x, S2 * U2.y).x - 20}
            y={scr(S2 * U2.x, S2 * U2.y).y - 16}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
            textAnchor="end"
          >
            2.2
          </text>
        </g>
        <g opacity={sweep}>
          <line
            x1={O.x}
            y1={O.y}
            x2={scr(Math.cos(th), Math.sin(th)).x}
            y2={scr(Math.cos(th), Math.sin(th)).y}
            stroke={colors.text}
            strokeWidth={6}
          />
          <Arrow
            from={O}
            to={scr(test.x, test.y)}
            width={10}
            color={colors.text}
          />
          <text
            x={scr(test.x * 1.08, test.y * 1.08).x}
            y={scr(test.x * 1.08, test.y * 1.08).y}
            fill={colors.text}
            fontSize={40}
            fontFamily={fonts.mono}
            fontWeight={800}
            textAnchor="middle"
          >
            {tl.toFixed(1)}
          </text>
        </g>
      </svg>
      <Mat
        m={[3, 0, 4, 5]}
        x={1500}
        y={260}
        cell={110}
        opacity={fadeIn(frame, c0 + 6, 8) * fadeOut(frame, c1, 8)}
      />
      <div
        style={{ opacity: fadeIn(frame, c1 + 6, 8) * fadeOut(frame, c3, 8) }}
      >
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 1100,
            fontFamily: fonts.body,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          AᵀA
        </div>
        <Mat m={[25, 20, 20, 25]} x={1500} y={260} cell={110} />
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 1250,
            width: 500,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
          }}
        >
          λ = 45, 5
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1250,
          width: 500,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 6) * fadeOut(frame, c3, 8),
        }}
      >
        σ = √45, √5
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {chips.map(({ at, t, c }) => (
          <div
            key={t}
            style={{
              padding: "10px 26px",
              borderRadius: 16,
              border: `5px solid ${c}`,
              background: alpha(colors.bg, 0.85),
              fontSize: 46,
              fontWeight: 800,
              color: c,
              whiteSpace: "nowrap",
              opacity: fadeIn(frame, at, 8),
              translate: riseIn(frame, at, 12),
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
