import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { TOWER_HEIGHT, Tower } from "../../shared/components/Tower";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The tower: cracks open in the ceiling of the ℚ floor. A √2 patch fills
// one crack and more open beside it (√3, √5, π, …). The ℝ floor above is
// scaffolding that needs a new idea: limits.

const LEFT = 300;
const TOP = 160;
const FLOOR = 126;
const floorTop = (i: number) => TOP + TOWER_HEIGHT - (i + 1) * FLOOR;
const CRACK_Y = floorTop(2) - 7; // between ℚ and ℝ
const CRACKS = [
  { x: 400, name: "√2" },
  { x: 520, name: "√3" },
  { x: 630, name: "√5" },
  { x: 720, name: "π" },
  { x: 460, name: "" },
  { x: 580, name: "" },
  { x: 680, name: "" },
];

const crackPath = (x: number) =>
  `M ${x} ${CRACK_Y - 26} L ${x + 8} ${CRACK_Y - 10} L ${x - 6} ${CRACK_Y + 4} L ${x + 6} ${CRACK_Y + 20} L ${x - 2} ${CRACK_Y + 34}`;

export const TowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("tower");
  const [c0, c1] = cues;
  const crackAt = (k: number) => (k === 0 ? c0 + 6 : c0 + 50 + (k - 1) * 7);
  const patch = glide(frame, c0 + 22, fps, 18);

  return (
    <SceneShell id="tower">
      <Sfx name="scratch" at={c0 + 6} volume={0.22} />
      <Sfx name="pop" at={c0 + 40} />
      {CRACKS.slice(1, 5).map((_, k) => (
        <Sfx key={k} name="scratch" at={crackAt(k + 1)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="chime" at={c1 + 20} />
      {[0, 1, 2].map((k) => (
        <Sfx
          key={`t${k}`}
          name={PLUCKS[k + 2]}
          at={c1 + 30 + k * 8}
          volume={0.18}
        />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <Tower
          appear={[1, 1, 1, 1, 1]}
          built={[1, 1, 1, 0, 0]}
          question={[0, 0, 0, 1, 1]}
          style={{ position: "absolute", left: LEFT, top: TOP }}
        />
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {CRACKS.map((c, k) => (
            <g key={k}>
              <path
                d={crackPath(c.x)}
                fill="none"
                stroke={colors.red}
                strokeWidth={4}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - ramp(frame, crackAt(k), 10)}
              />
              {c.name && k > 0 ? (
                <text
                  x={c.x}
                  y={CRACK_Y - 40}
                  fill={colors.highlight}
                  fontSize={28}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  opacity={fadeIn(frame, crackAt(k) + 6)}
                >
                  {c.name}
                </text>
              ) : null}
            </g>
          ))}
          {/* a √2 patch slides into the first crack */}
          <g
            transform={`translate(${lerp(1100, CRACKS[0].x, patch)} ${lerp(CRACK_Y - 160, CRACK_Y, patch)})`}
            opacity={fadeIn(frame, c0 + 20)}
          >
            <rect
              x={-34}
              y={-22}
              width={68}
              height={44}
              rx={10}
              fill={colors.primary}
            />
            <text
              y={12}
              fill={colors.ink}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              √2
            </text>
          </g>
          {/* scaffolding for ℝ */}
          <g opacity={fadeIn(frame, c1 + 6)}>
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <line
                key={k}
                x1={LEFT + 20 + k * 96}
                y1={floorTop(3) + 4}
                x2={LEFT + 20 + k * 96 + 60}
                y2={floorTop(3) + 108}
                stroke={colors.orange}
                strokeWidth={3}
                opacity={ramp(frame, c1 + 6 + k * 4, 6)}
              />
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: LEFT + 580,
            top: floorTop(3) + 30,
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.orange,
            opacity: fadeIn(frame, c1 + 20),
            translate: riseIn(frame, c1 + 20, 16),
          }}
        >
          ← {tx.newIdea}
        </div>
        <div
          style={{
            position: "absolute",
            left: LEFT + 580,
            top: floorTop(3) + 110,
            fontFamily: fonts.math,
            fontSize: 40,
            color: colors.muted,
            display: "flex",
            gap: 30,
          }}
        >
          {["1", "1.4", "1.41", "1.414", "…"].map((v, k) => (
            <span
              key={v}
              style={{
                opacity: Math.min(1, springIn(frame, c1 + 30 + k * 8, fps, 11)),
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
