import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";

// Chinese edition only. 秦九韶《数书九章》(1247), 大衍求一术: find the number
// that, multiplied in, leaves remainder one. A slip carries the name; then on
// a seven-hour clock the hand takes strides of 5: 5, 10 (= 3), 15 (= 1),
// and stops on 1. So 3 is 5's partner: 5 × 3 = 15, remainder one.

export const Qin: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("qin");
  const [c0, c1, c2] = cues;
  const slip = glide(frame, c0 + 6, fps, 16);
  const strides = [0, 1, 2].reduce(
    (a, k) => a + glide(frame, c1 + 30 + k * 22, fps, 14),
    0,
  );
  const found = Math.min(1, springIn(frame, c1 + 96, fps, 10));
  const glow = fadeIn(frame, c2 + 10);

  return (
    <SceneShell id="qin">
      <Sfx name="page" at={c0 + 6} volume={0.18} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="tick" at={c1 + 30 + k * 22} volume={0.16} />
      ))}
      <Sfx name="ding" at={c1 + 96} />
      <Sfx name="chime" at={c2 + 10} />

      <AbsoluteFill style={{ opacity: fadeOut(frame, c1, 10) }}>
        <svg width={1920} height={1080}>
          <g opacity={slip} transform={`translate(0 ${lerp(-60, 0, slip)})`}>
            <rect
              x={900}
              y={140}
              width={130}
              height={640}
              rx={14}
              fill={colors.wood}
              stroke={colors.ink}
              strokeWidth={4}
            />
            {[...tx.qinName].map((ch, j) => (
              <text
                key={j}
                x={965}
                y={250 + j * 110}
                fill={colors.ink}
                fontSize={80}
                textAnchor="middle"
                fontFamily={fonts.title}
              >
                {ch}
              </text>
            ))}
          </g>
          <text
            x={960}
            y={880 - 40}
            fill={colors.primary}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 20)}
          >
            {tx.qinSource}
          </text>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <Clock x={700} y={480} r={260} n={7} pos={(5 * strides) % 7} />
          {[0, 1, 2].map((k) => (
            <text
              key={k}
              x={1300}
              y={300 + k * 120}
              fill={k === 2 ? colors.highlight : colors.text}
              fontSize={60}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, c1 + 40 + k * 22)}
            >
              5 × {k + 1} = {5 * (k + 1)} → {(5 * (k + 1)) % 7}
            </text>
          ))}
          <g opacity={found} transform={`translate(1450 700) scale(${found})`}>
            <rect
              x={-260}
              y={-60}
              width={520}
              height={110}
              rx={24}
              fill={colors.highlight}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <text
              x={0}
              y={18}
              fill={colors.ink}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              余一
            </text>
          </g>
          <circle
            cx={700}
            cy={480 - 260 * 0.7}
            r={56}
            fill="none"
            stroke={colors.green}
            strokeWidth={10}
            opacity={glow}
          />
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
