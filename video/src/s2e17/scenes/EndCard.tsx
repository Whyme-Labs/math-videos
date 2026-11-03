import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Recap: an arrow b turning above a floor line, its shadow following it
// and the upright error always at a right angle (c0). Around it, the
// formulas of the episode pop in as chips; each is that right angle
// written down (c1). Teaser for the spectral theorem: a circle pushed by
// a symmetric matrix into an ellipse whose two axes stay perpendicular,
// drawn as lemon and coral arrows (c2).

const FORMULAS = ["x = a·b / a·a", "AᵀAx = Aᵀb", "P² = P", "A = QR"];

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1, c2] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c2, 10);
  const th = 0.7 + 0.45 * Math.sin((frame - c0) * 0.04);
  const O = { x: 560, y: 640 };
  const L = 340;
  const b = { x: O.x + L * Math.cos(th), y: O.y - L * Math.sin(th) };
  const p = { x: b.x, y: O.y };
  // teaser: a symmetric matrix, its eigen-axes at 30°
  const push = glide(frame, c2 + 20, fps, 40);
  const a = Math.PI / 6;
  const l1 = lerp(1, 1.6, push);
  const l2 = lerp(1, 0.6, push);
  const T = { x: 1380, y: 430 };
  const R0 = 170;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 4} volume={0.12} />
      {FORMULAS.map((_, k) => (
        <Sfx key={k} name="tick" at={c1 + 6 + k * 8} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c2 + 60} volume={0.5} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={O.x - 260}
            y1={O.y}
            x2={O.x + 520}
            y2={O.y}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={5}
          />
          <line
            x1={O.x}
            y1={O.y - 4}
            x2={p.x}
            y2={O.y - 4}
            stroke={colors.orange}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <line
            x1={b.x}
            y1={b.y}
            x2={p.x}
            y2={p.y}
            stroke={colors.green}
            strokeWidth={7}
            strokeDasharray="14 10"
          />
          <path
            d={`M ${p.x - 30} ${O.y} L ${p.x - 30} ${O.y - 30} L ${p.x} ${O.y - 30}`}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
          />
          <Arrow from={O} to={b} width={16} color={colors.text} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1160,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {FORMULAS.map((f, k) => (
            <div
              key={f}
              style={{
                padding: "10px 30px",
                borderRadius: 16,
                border: `4px solid ${colors.green}`,
                background: alpha(colors.bg, 0.85),
                fontFamily: fonts.body,
                fontSize: 48,
                fontWeight: 800,
                color: colors.text,
                opacity: fadeIn(frame, c1 + 6 + k * 8, 8),
                translate: riseIn(frame, c1 + 6 + k * 8, 14),
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <ellipse
            cx={T.x}
            cy={T.y}
            rx={R0 * l1}
            ry={R0 * l2}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.paper}
            strokeWidth={5}
            transform={`rotate(${(-a * 180) / Math.PI} ${T.x} ${T.y})`}
          />
          <Arrow
            from={T}
            to={{
              x: T.x + R0 * l1 * Math.cos(a),
              y: T.y - R0 * l1 * Math.sin(a),
            }}
            width={14}
            color={colors.primary}
          />
          <Arrow
            from={T}
            to={{
              x: T.x - R0 * l2 * Math.sin(a),
              y: T.y - R0 * l2 * Math.cos(a),
            }}
            width={14}
            color={colors.highlight}
          />
        </svg>
        <AbsoluteFill
          style={{ top: 280, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              maxWidth: 1000,
              opacity: fadeIn(frame, c2 + 70),
              translate: riseIn(frame, c2 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c2 + 90) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
