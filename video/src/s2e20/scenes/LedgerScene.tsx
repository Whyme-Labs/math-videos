import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// The ledger, full size: all five lines crossed (c0). A chip: algebra →
// limits (c1). The rational number line with its gaps (√2, π, e) as
// holes that fill in green: Season 1's ℚ → ℝ (c2). Each ledger line
// grows an arrow to the episode that repairs it (c3).

const HOLES = [Math.SQRT2, Math.E, Math.PI];

export const LedgerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ledger");
  const [c0, c1, c2, c3] = cues;
  const fillH = glide(frame, c2 + 30, fps, 30);
  const reps = Math.max(0, (frame - c3 - 6) / 10);

  return (
    <SceneShell id="ledger">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 30} volume={0.3} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 10} volume={0.12} />
      ))}

      <Ledger
        crossed={5}
        repairs={reps}
        x={180}
        y={150}
        scale={1.35}
        opacity={fadeIn(frame, c0 + 4, 10)}
      />
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 1180,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.body,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 6),
          translate: riseIn(frame, c1 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        {tx.algebra}
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={fadeIn(frame, c2 + 4, 10)}
      >
        <line
          x1={1180}
          y1={420}
          x2={1780}
          y2={420}
          stroke={colors.paper}
          strokeWidth={6}
        />
        {HOLES.map((h, i) => {
          const x = 1180 + (h - 1) * 230;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={420}
                r={14}
                fill={fillH > 0.5 ? colors.green : colors.bg}
                stroke={fillH > 0.5 ? colors.green : colors.paper}
                strokeWidth={4}
              />
              <text
                x={x}
                y={480}
                fill={colors.muted}
                fontSize={36}
                fontFamily={fonts.math}
                textAnchor="middle"
              >
                {["√2", "e", "π"][i]}
              </text>
            </g>
          );
        })}
        <text
          x={1180}
          y={370}
          fill={fillH > 0.5 ? colors.green : colors.text}
          fontSize={52}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          {fillH > 0.5 ? "ℝ" : "ℚ"}
        </text>
      </svg>
    </SceneShell>
  );
};
