import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { TOWER_HEIGHT, Tower } from "../../shared/components/Tower";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The ℝ floor is built (the E07 scaffolding comes down). The ledger gains
// an entry: most real numbers have no finite name. A few named points (√2,
// e, π) sit among a dense mass of unnamed ones.

const LEFT = 220;
const TOP = 160;
const LEDGER_X = 1060;
const LINE = { x0: 1060, x1: 1720, y: 560 };

export const TowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("tower");
  const [c0, c1] = cues;
  const built = glide(frame, c0 + 10, fps, 20);
  const named = [
    { v: 0.18, l: "√2" },
    { v: 0.42, l: "e" },
    { v: 0.71, l: "π" },
  ];

  return (
    <SceneShell id="tower">
      <Sfx name="whoosh" at={c0 + 6} volume={0.14} />
      <Sfx name="sparkle" at={c0 + 26} />
      <Sfx name="page" at={c1 + 6} />
      <Sfx name="tick" at={c1 + 30} volume={0.2} />
      <QuestionTray />

      <AbsoluteFill>
        <Tower
          appear={[1, 1, 1, 1, 1]}
          built={[1, 1, 1, ramp(frame, c0 + 10, 16), 0]}
          question={[0, 0, 0, 1 - built, 1]}
          style={{ position: "absolute", left: LEFT, top: TOP }}
        />
        <div
          style={{
            position: "absolute",
            left: LEFT + 560,
            top: TOP + TOWER_HEIGHT - 4 * 126 + 26,
            fontFamily: fonts.math,
            fontSize: 40,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 26),
            translate: riseIn(frame, c0 + 26, 16),
          }}
        >
          ✓ sup
        </div>
        <div
          style={{
            position: "absolute",
            left: LEDGER_X,
            top: 220,
            fontFamily: fonts.title,
            fontSize: 50,
            color: colors.highlight,
            opacity: fadeIn(frame, c1 + 6),
            translate: riseIn(frame, c1 + 6, 20),
          }}
        >
          {tx.lost}
        </div>
        <div
          style={{
            position: "absolute",
            left: LEDGER_X,
            top: 300,
            fontSize: 40,
            opacity: fadeIn(frame, c1 + 14),
            translate: riseIn(frame, c1 + 14, 16),
          }}
        >
          <span
            style={{ fontFamily: fonts.math, fontSize: 52, marginRight: 18 }}
          >
            ℝ
          </span>
          <span style={{ textDecoration: "line-through", color: colors.muted }}>
            {tx.finiteName}
          </span>
        </div>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c1 + 20)}>
            <line
              x1={LINE.x0}
              y1={LINE.y}
              x2={LINE.x1}
              y2={LINE.y}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {Array.from({ length: 160 }).map((_, i) => {
              const h = Math.sin(i * 91.7 + 3.1) * 43758.5453;
              const f = h - Math.floor(h);
              return (
                <circle
                  key={i}
                  cx={LINE.x0 + f * (LINE.x1 - LINE.x0)}
                  cy={LINE.y}
                  r={
                    2.5 *
                    Math.min(1, springIn(frame, c1 + 24 + (i % 40), fps, 14))
                  }
                  fill={alpha(colors.text, 0.6)}
                />
              );
            })}
            {named.map((n, k) => (
              <g key={n.l} opacity={fadeIn(frame, c1 + 30 + k * 6)}>
                <circle
                  cx={LINE.x0 + n.v * (LINE.x1 - LINE.x0)}
                  cy={LINE.y}
                  r={9}
                  fill={colors.primary}
                />
                <text
                  x={LINE.x0 + n.v * (LINE.x1 - LINE.x0)}
                  y={LINE.y - 26}
                  fill={colors.primary}
                  fontSize={32}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {n.l}
                </text>
              </g>
            ))}
            <text
              x={(LINE.x0 + LINE.x1) / 2}
              y={LINE.y + 70}
              fill={colors.muted}
              fontSize={30}
              textAnchor="middle"
              opacity={fadeIn(frame, c1 + 50)}
            >
              ↪ E12
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
