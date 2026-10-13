import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { SetBox } from "../components/sets";
import { useStrings } from "../i18n";

// Two builds of 3, then the teaser for E05: 1/2 and 2/4 — the same number?
const PIE_Y = 300;
const PIE_R = 110;
const PIES = [
  { x: 720, parts: 2, shaded: 1, label: "1/2" },
  { x: 1200, parts: 4, shaded: 2, label: "2/4" },
];

// A wedge from angle a0 to a1 (radians, 0 = up, clockwise).
const wedge = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => `${cx + r * Math.sin(a)} ${cy - r * Math.cos(a)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${p(a0)} A ${r} ${r} 0 ${large} 1 ${p(a1)} Z`;
};

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const pieIn = (i: number) => springIn(frame, c1 + 6 + i * 10, fps, 11);
  const fill = ramp(frame, c1 + 24, 20);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="pop" at={c0 + 12} />
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="pop" at={c1 + 16} />
      <Sfx name="chime" at={c1 + 46} />
      <Sfx name="page" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* Two builds of 3 */}
          <g opacity={fadeOut(frame, c1 - 2, 10)}>
            <g
              opacity={fadeIn(frame, c0 + 4)}
              transform={`translate(760 ${PIE_Y}) scale(1.1) translate(-760 ${-PIE_Y})`}
            >
              <SetBox n={3} kind="vn" cx={760} cy={PIE_Y} />
            </g>
            <g
              opacity={fadeIn(frame, c0 + 12)}
              transform={`translate(1220 ${PIE_Y}) scale(1.1) translate(-1220 ${-PIE_Y})`}
            >
              <SetBox n={3} kind="z" cx={1220} cy={PIE_Y} />
            </g>
          </g>
          {/* 1/2 and 2/4 */}
          {PIES.map((p, i) => {
            const s = pieIn(i);
            return (
              <g
                key={p.label}
                opacity={Math.min(1, s)}
                transform={`translate(${p.x} ${PIE_Y}) scale(${Math.min(1, s)}) translate(${-p.x} ${-PIE_Y})`}
              >
                <circle
                  cx={p.x}
                  cy={PIE_Y}
                  r={PIE_R}
                  fill={alpha(colors.primary, 0.05)}
                  stroke={colors.primary}
                  strokeWidth={3}
                />
                {Array.from({ length: p.shaded }).map((_, k) => {
                  const a0 = (k / p.parts) * 2 * Math.PI;
                  const a1 = a0 + (fill * 2 * Math.PI) / p.parts;
                  return fill > 0 ? (
                    <path
                      key={k}
                      d={wedge(p.x, PIE_Y, PIE_R, a0, a1)}
                      fill={alpha(colors.primary, 0.75)}
                    />
                  ) : null;
                })}
                {Array.from({ length: p.parts }).map((_, k) => {
                  const a = (k / p.parts) * 2 * Math.PI;
                  return (
                    <line
                      key={k}
                      x1={p.x}
                      y1={PIE_Y}
                      x2={p.x + PIE_R * Math.sin(a)}
                      y2={PIE_Y - PIE_R * Math.cos(a)}
                      stroke={colors.primary}
                      strokeWidth={3}
                    />
                  );
                })}
                <text
                  x={p.x}
                  y={PIE_Y + PIE_R + 64}
                  fill={colors.text}
                  fontSize={52}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
          <text
            x={960}
            y={PIE_Y + 18}
            fill={colors.highlight}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c1 + 46)}
          >
            {tx.same}
          </text>
        </svg>

        <AbsoluteFill style={{ top: 580, alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontSize: 40,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
