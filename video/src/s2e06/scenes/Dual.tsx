import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../components/stack";
import { useStrings } from "../i18n";

// The dual basis. Basis arrows b₁ = (1, 0) and b₂ = (1, 2). The first
// reader β¹ appears as an orange stack whose sheets run parallel to b₂,
// spaced so that b₁ crosses exactly one; the second reader β² appears as a
// faint pink stack parallel to b₁. Then b₂ swings to (0, 1): β¹'s sheets
// turn upright and respace, live (rows of the inverse matrix), while b₁,
// circled, never moves.

const O = { x: 760, y: 600 };
const S = 150;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Dual: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("dual");
  const [c0, c1] = cues;
  const swing = glide(frame, c1 + 30, fps, 50);
  const b1 = { x: 1, y: 0 };
  const b2 = { x: lerp(1, 0, swing), y: lerp(2, 1, swing) };
  // rows of the inverse of [b₁ b₂]
  const det = b1.x * b2.y - b2.x * b1.y;
  const beta1 = { a: b2.y / det, b: -b2.x / det };
  const beta2 = { a: -b1.y / det, b: b1.x / det };
  const ring = fadeIn(frame, c1 + 30, 8);

  return (
    <SceneShell id="dual">
      <Sfx name="pluck1" at={c0 + 10} volume={0.14} />
      <Sfx name="pluck3" at={c0 + 22} volume={0.14} />
      <Sfx name="whoosh" at={c0 + 50} volume={0.12} />
      <Sfx name="ding" at={c0 + 80} />
      <Sfx name="whoosh" at={c0 + 110} volume={0.1} />
      <Sfx name="riser" at={c1 + 30} volume={0.1} />
      <Sfx name="chime" at={c1 + 80} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="dualStage">
            <rect x={120} y={90} width={1680} height={740} />
          </clipPath>
        </defs>
        <g clipPath="url(#dualStage)">
          <Stack
            a={beta2.a}
            b={beta2.b}
            scr={scr}
            color={alpha(colors.highlight, 0.35)}
            width={4}
            opacity={fadeIn(frame, c0 + 110, 12)}
          />
          <Stack
            a={beta1.a}
            b={beta1.b}
            scr={scr}
            opacity={fadeIn(frame, c0 + 50, 12)}
          />
        </g>
        {/* b₁ crosses exactly one sheet */}
        <circle
          cx={scr(1, 0).x}
          cy={scr(1, 0).y}
          r={22}
          fill="none"
          stroke={colors.green}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 80, 6)}
        />
        <Arrow from={O} to={scr(b1.x, b1.y)} width={14} />
        <Arrow
          from={O}
          to={scr(b2.x, b2.y)}
          width={14}
          opacity={fadeIn(frame, c0 + 22, 6)}
        />
        <circle
          cx={scr(0.5, 0).x}
          cy={O.y}
          r={110}
          fill="none"
          stroke={colors.primary}
          strokeWidth={4}
          strokeDasharray="12 10"
          opacity={ring * 0.8}
        />
        {[
          { p: scr(b1.x + 0.15, b1.y - 0.3), t: "b₁", at: c0 + 10 },
          { p: scr(b2.x + 0.2, b2.y + 0.1), t: "b₂", at: c0 + 22 },
        ].map((l) => (
          <text
            key={l.t}
            x={l.p.x}
            y={l.p.y}
            fill={colors.primary}
            stroke={colors.bg}
            strokeWidth={8}
            paintOrder="stroke"
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, l.at)}
          >
            {l.t}
          </text>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1280,
          padding: "14px 26px",
          borderRadius: 16,
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${colors.orange}`,
          color: colors.orange,
          fontSize: 42,
          fontWeight: 800,
          opacity: fadeIn(frame, c0 + 60),
          translate: riseIn(frame, c0 + 60, 16),
        }}
      >
        <span style={{ fontFamily: fonts.math }}>β¹</span> · {tx.readsFirst}
      </div>
    </SceneShell>
  );
};
