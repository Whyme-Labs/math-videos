import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// No bilinear form can be positive over ℂ, proved on screen. A badge for
// the hypothetical form B, linear in both slots, and a gauge for B(v, v).
// An arrow v in the complex plane, the gauge positive. v turns a quarter
// turn into iv. The algebra works itself out, B(iv, iv) = i·i·B(v, v) =
// −B(v, v), and the gauge swings below zero with a shake: no such form.

const O = { x: 620, y: 540 };
const R = 230;

export const NoBilinear: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("noBilinear");
  const [c0, c1, c2, c3, c4] = cues;
  const turn = glide(frame, c2 + 6, fps, 30);
  const a = 0.35 + (turn * Math.PI) / 2;
  const flip = glide(frame, c4 + 4, fps, 20);
  const val = (1 - 2 * flip) * fadeIn(frame, c1 + 10, 14);
  const G = { x: 1560, y: 560 };
  const U = 150;
  const steps: Tok[][] = [
    [
      { id: "l", t: "B(iv, iv)" },
      { id: "e", t: " = " },
      { id: "i", t: "i · i" },
      { id: "r", t: " · B(v, v)" },
    ],
    [
      { id: "l", t: "B(iv, iv)" },
      { id: "e", t: " = " },
      { id: "i", t: "(−1)", color: colors.red },
      { id: "r", t: " · B(v, v)" },
    ],
    [
      { id: "l", t: "B(iv, iv)" },
      { id: "e", t: " = " },
      { id: "r", t: "−B(v, v)", color: colors.red },
    ],
  ];

  return (
    <SceneShell id="noBilinear">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pop" at={c1 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 30} volume={0.08} />
      <Sfx name="thud" at={c4 + 4} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={O.x - 320}
          y1={O.y}
          x2={O.x + 320}
          y2={O.y}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <line
          x1={O.x}
          y1={O.y - 300}
          x2={O.x}
          y2={O.y + 260}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <circle
          cx={O.x}
          cy={O.y}
          r={R}
          fill="none"
          stroke={alpha(colors.primary, 0.2)}
          strokeWidth={3}
          strokeDasharray="8 10"
        />
        <g opacity={fadeIn(frame, c1 + 4)}>
          <Arrow
            from={O}
            to={{ x: O.x + R * Math.cos(0.35), y: O.y - R * Math.sin(0.35) }}
            width={14}
            color={alpha(colors.primary, turn > 0.05 ? 0.4 : 1)}
          />
          {turn > 0.02 ? (
            <Arrow
              from={O}
              to={{ x: O.x + R * Math.cos(a), y: O.y - R * Math.sin(a) }}
              width={14}
              color={colors.highlight}
            />
          ) : null}
          <path
            d={`M ${O.x + 90 * Math.cos(0.35)} ${O.y - 90 * Math.sin(0.35)} A 90 90 0 0 0 ${O.x + 90 * Math.cos(a)} ${O.y - 90 * Math.sin(a)}`}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
            opacity={turn}
          />
          <text
            x={O.x + R * Math.cos(0.35) + 18}
            y={O.y - R * Math.sin(0.35) + 10}
            fill={colors.primary}
            fontSize={50}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v
          </text>
          <text
            x={O.x + R * Math.cos(a) - 70}
            y={O.y - R * Math.sin(a) - 10}
            fill={colors.highlight}
            fontSize={50}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={turn}
          >
            iv
          </text>
          <text
            x={O.x + 110}
            y={O.y - 120}
            fill={colors.orange}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={turn}
          >
            × i
          </text>
        </g>
        <g
          transform={`translate(${G.x + shake(frame, c4 + 20, 14)} ${G.y})`}
          opacity={fadeIn(frame, c1 + 6)}
        >
          <rect
            x={-80}
            y={-1.6 * U}
            width={160}
            height={3.2 * U}
            rx={20}
            fill={alpha(colors.bg, 0.8)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={4}
          />
          <line
            x1={-100}
            y1={0}
            x2={100}
            y2={0}
            stroke={colors.text}
            strokeWidth={5}
          />
          <rect
            x={-54}
            y={val > 0 ? -val * U : 0}
            width={108}
            height={Math.abs(val) * U}
            rx={8}
            fill={val > 0 ? colors.green : colors.red}
          />
          <text
            y={-1.6 * U - 26}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {flip > 0.5 ? "B(iv, iv)" : "B(v, v)"}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          padding: "10px 24px",
          borderRadius: 14,
          border: `4px solid ${colors.orange}`,
          fontSize: 40,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 6),
          translate: riseIn(frame, c0 + 6, 12),
        }}
      >
        B : {tx.bilinear}
      </div>
      <Eq
        steps={steps}
        at={[c3 + 6, c3 + 30, c3 + 60]}
        x={1260}
        y={110}
        size={64}
      />
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1690,
          width: 160,
          textAlign: "center",
          fontSize: 110,
          fontWeight: 900,
          color: colors.red,
          opacity: fadeIn(frame, c4 + 24),
        }}
      >
        ✗
      </div>
    </SceneShell>
  );
};
