import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeIn, progress, riseIn, window } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { SceneShell, useCues } from "../components/SceneShell";
import { alpha, colors, fonts } from "../theme";

const Tag: React.FC<{ readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      fontSize: 32,
      padding: "10px 24px",
      borderRadius: 999,
      backgroundColor: alpha(colors.primary, 0.12),
      border: `2px solid ${colors.primary}`,
      color: colors.primary,
      ...style,
    }}
  >
    {children}
  </div>
);

// Gap between 1 and the n-nines truncation is exactly 10^-n.
const GAPS = [1, 2, 3, 4].map((n) => ({ dec: `0.${"9".repeat(n)}`, gap: `0.${"0".repeat(n - 1)}1`, width: 600 / 10 ** (n - 1) }));

export const WhyHard: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("whyHard");
  const end = 99999;

  return (
    <SceneShell id="whyHard">
      <QuestionTray />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontFamily: fonts.title, fontSize: 68, opacity: window(frame, 5, cues[1]) }}>
          Questions about <span style={{ color: colors.highlight }}>definitions</span>, in disguise.
        </div>
      </AbsoluteFill>

      {/* Question 1: finite sums, the infinite sum, and the shrinking gap. */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 36, opacity: window(frame, cues[1], cues[4]) }}>
        <div style={{ fontFamily: fonts.math, fontSize: 60 }}>
          0.999 = <span style={{ color: colors.primary }}>9/10 + 9/100 + 9/1000</span>
        </div>
        <div style={{ fontFamily: fonts.math, fontSize: 60, opacity: fadeIn(frame, cues[2]), translate: riseIn(frame, cues[2]) }}>
          0.999… = <span style={{ color: colors.primary }}>9/10 + 9/100 + 9/1000 + ⋯</span>
          <span style={{ color: colors.red }}> ?</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10, opacity: fadeIn(frame, cues[3]) }}>
          {GAPS.map((g, i) => {
            const start = cues[3] + i * 25;
            return (
              <div key={g.dec} style={{ display: "flex", alignItems: "center", gap: 30, opacity: fadeIn(frame, start), fontFamily: fonts.mono, fontSize: 36 }}>
                <span style={{ width: 170 }}>{g.dec}</span>
                <span style={{ color: colors.muted, width: 230 }}>gap {g.gap}</span>
                <div
                  style={{
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: colors.orange,
                    width: Math.max(3, g.width * progress(frame, start, 20)),
                  }}
                />
              </div>
            );
          })}
        </div>
        <Tag style={{ opacity: fadeIn(frame, cues[3] + 130) }}>the right idea is a limit → E09</Tag>
      </AbsoluteFill>

      {/* Question 2: root two squeezed between 1.4 and 1.5. */}
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 120, opacity: window(frame, cues[4], cues[5]) }}>
        <svg width={360} height={360} viewBox="-20 -20 360 360">
          <rect x={0} y={0} width={300} height={300} fill="none" stroke={colors.text} strokeWidth={4} />
          <line x1={0} y1={300} x2={300} y2={0} stroke={colors.orange} strokeWidth={7} />
          <text x={110} y={120} fill={colors.orange} fontSize={46} fontFamily={fonts.math} textAnchor="end">√2</text>
          <text x={150} y={335} fill={colors.muted} fontSize={30} textAnchor="middle">1</text>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 760 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 46, opacity: fadeIn(frame, cues[4] + 60) }}>
            1.4² = <span style={{ color: colors.primary }}>1.96</span> &lt; 2
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 46, opacity: fadeIn(frame, cues[4] + 90) }}>
            1.5² = <span style={{ color: colors.primary }}>2.25</span> &gt; 2
          </div>
          <svg width={720} height={80} style={{ opacity: fadeIn(frame, cues[4] + 120) }}>
            <line x1={20} y1={40} x2={700} y2={40} stroke={colors.muted} strokeWidth={3} />
            {[
              { x: 60, label: "1.4" },
              { x: 660, label: "1.5" },
            ].map((t) => (
              <g key={t.label}>
                <line x1={t.x} y1={25} x2={t.x} y2={55} stroke={colors.text} strokeWidth={3} />
                <text x={t.x} y={78} fill={colors.text} fontSize={24} textAnchor="middle">{t.label}</text>
              </g>
            ))}
            {/* √2 ≈ 1.41421: 0.1421 of the way from 1.4 to 1.5 */}
            <circle cx={60 + 600 * 0.1421 * progress(frame, cues[4] + 130, 40)} cy={40} r={11} fill={colors.orange} />
          </svg>
          <div style={{ fontSize: 40, opacity: fadeIn(frame, cues[4] + 210), translate: riseIn(frame, cues[4] + 210) }}>
            No fraction <span style={{ fontFamily: fonts.math }}>p/q</span> has <span style={{ fontFamily: fonts.math }}>(p/q)² = 2</span>.
          </div>
          <Tag style={{ alignSelf: "flex-start", opacity: fadeIn(frame, cues[4] + 260) }}>a bigger system → E07, E08</Tag>
        </div>
      </AbsoluteFill>

      {/* Question 3: what does "more" mean for infinite collections? */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 44, opacity: window(frame, cues[5], end) }}>
        <div style={{ display: "flex", gap: 22, fontFamily: fonts.mono, fontSize: 52, color: colors.primary }}>
          {["1", "2", "3", "4", "5", "6", "7", "…"].map((t, i) => (
            <span key={t} style={{ opacity: fadeIn(frame, cues[5] + 5 + i * 4) }}>{t}</span>
          ))}
        </div>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 80,
            color: colors.highlight,
            opacity: fadeIn(frame, cues[5] + 50),
            scale: interpolate(fadeIn(frame, cues[5] + 50), [0, 1], [0.8, 1]),
          }}
        >
          more?
        </div>
        <div style={{ display: "flex", gap: 22, fontFamily: fonts.math, fontSize: 52, color: colors.orange }}>
          {["½", "⅓", "⅔", "¼", "¾", "⅕", "⅖", "…"].map((t, i) => (
            <span key={t} style={{ opacity: fadeIn(frame, cues[5] + 25 + i * 4) }}>{t}</span>
          ))}
        </div>
        <Tag style={{ opacity: fadeIn(frame, cues[5] + 120) }}>define “same size” → E11</Tag>
      </AbsoluteFill>
    </SceneShell>
  );
};
