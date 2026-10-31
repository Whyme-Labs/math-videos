import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";

// The generalized eigenvector. S − I acting on the plane: the vertical
// arrow e₂ swings down onto e₁; then e₁ shrinks to a dot at the origin.
// On the right, the same thing as a two-rung ladder: e₂ on the top rung,
// e₁ on the middle, 0 at the bottom, with "S − I" arrows stepping down.

const O = { x: 640, y: 560 };
const S = 200;

export const Ladder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("ladder");
  const [c0, c1] = cues;
  const step1 = glide(frame, c0 + 30, fps, 30);
  const step2 = glide(frame, c0 + 90, fps, 30);
  const ladder = fadeIn(frame, c1 + 6, 10);
  const rung = (k: number) => fadeIn(frame, c1 + 20 + k * 20, 8);
  // e₂ → e₁ → 0
  const tip = {
    x: lerp(lerp(0, 1, step1), 0, step2),
    y: lerp(1, 0, step1),
  };

  return (
    <SceneShell id="ladder">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="clink" at={c0 + 60} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 90} volume={0.12} />
      <Sfx name="thud" at={c0 + 120} volume={0.26} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="tick" at={c1 + 20 + k * 20} volume={0.12} />
      ))}
      <Sfx name="chime" at={c1 + 80} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={O.x - 360}
          y1={O.y}
          x2={O.x + 360}
          y2={O.y}
          stroke={alpha(colors.primary, 0.5)}
          strokeWidth={6}
        />
        <line
          x1={O.x}
          y1={O.y + 200}
          x2={O.x}
          y2={O.y - 320}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        {/* ghost of where e₂ started */}
        <Arrow
          from={O}
          to={{ x: O.x, y: O.y - S }}
          width={8}
          color={alpha(colors.highlight, 0.3)}
        />
        <Arrow
          from={O}
          to={{ x: O.x + tip.x * S, y: O.y - tip.y * S }}
          width={16}
          color={step1 > 0.5 ? colors.primary : colors.highlight}
        />
        <circle
          cx={O.x}
          cy={O.y}
          r={step2 > 0.9 ? 18 : 8}
          fill={step2 > 0.9 ? colors.red : colors.paper}
        />
        <text
          x={O.x - 60}
          y={O.y - S + 10}
          fill={colors.highlight}
          fontSize={48}
          textAnchor="end"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          e₂
        </text>
        <text
          x={O.x + S + 20}
          y={O.y + 60}
          fill={colors.primary}
          fontSize={48}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 50)}
        >
          e₁
        </text>
        <text
          x={O.x + 200}
          y={O.y - 140}
          fill={colors.text}
          fontSize={44}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 20)}
        >
          S − I
        </text>
        {/* the ladder */}
        <g opacity={ladder}>
          <line
            x1={1300}
            y1={200}
            x2={1300}
            y2={760}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <line
            x1={1620}
            y1={200}
            x2={1620}
            y2={760}
            stroke={colors.wood}
            strokeWidth={10}
          />
          {[
            { y: 260, t: "e₂", c: colors.highlight },
            { y: 480, t: "e₁", c: colors.primary },
            { y: 700, t: "0", c: colors.red },
          ].map((r, k) => (
            <g key={r.t} opacity={rung(k)}>
              <line
                x1={1300}
                y1={r.y}
                x2={1620}
                y2={r.y}
                stroke={colors.wood}
                strokeWidth={10}
              />
              <text
                x={1460}
                y={r.y - 24}
                fill={r.c}
                fontSize={56}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {r.t}
              </text>
              {k < 2 ? (
                <g>
                  <line
                    x1={1680}
                    y1={r.y + 10}
                    x2={1680}
                    y2={r.y + 190}
                    stroke={colors.text}
                    strokeWidth={5}
                  />
                  <polygon
                    points={`1680,${r.y + 206} 1666,${r.y + 182} 1694,${r.y + 182}`}
                    fill={colors.text}
                  />
                  <text
                    x={1700}
                    y={r.y + 120}
                    fill={colors.text}
                    fontSize={34}
                    fontFamily={fonts.math}
                    fontWeight={700}
                  >
                    S − I
                  </text>
                </g>
              ) : null}
            </g>
          ))}
        </g>
      </svg>
    </SceneShell>
  );
};
