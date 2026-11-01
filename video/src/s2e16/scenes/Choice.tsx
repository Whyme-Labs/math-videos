import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// The stack stays, the arrow moves. A fixed orange stack α = (0.5, 0.5).
// The inner product G is drawn as its unit ellipse; G morphs from round to
// squashed to tilted, and the arrow standing for α (G⁻¹α) swings and
// stretches to stay G-perpendicular to the sheets, the dot-product arrow
// left as a dashed ghost. Then two badges: the stack is the real thing;
// the arrow is the stack seen through the ruler.

const O = { x: 760, y: 480 };
const S = 150;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const GS = [
  [1, 0, 1],
  [1, 0, 4],
  [2.5, 1, 1],
];
const AL = { x: 0.5, y: 0.5 };

export const Choice: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("choice");
  const [c0, c1] = cues;
  let g = GS[0];
  [c0 + 30, c0 + 100].forEach((at, k) => {
    const t = glide(frame, at, fps, 36);
    g = g.map((v, i) => lerp(v, GS[k + 1][i], t));
  });
  const [a, b, c] = g;
  const det = a * c - b * b;
  const arrow = {
    x: (c * AL.x - b * AL.y) / det,
    y: (a * AL.y - b * AL.x) / det,
  };
  const K = 2.6;
  const ellipse = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const x = Math.cos(t);
    const y = Math.sin(t);
    const l = Math.sqrt(a * x * x + 2 * b * x * y + c * y * y);
    return `${i ? "L" : "M"} ${scr((x / l) * 1.6, (y / l) * 1.6).x.toFixed(1)} ${scr((x / l) * 1.6, (y / l) * 1.6).y.toFixed(1)}`;
  }).join(" ");

  return (
    <SceneShell id="choice">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 100} volume={0.12} />
      <Sfx name="pop" at={c1 + 20} volume={0.14} />
      <Sfx name="chime" at={c1 + 60} volume={0.35} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16choice">
            <circle cx={O.x} cy={O.y} r={350} />
          </clipPath>
        </defs>
        <g clipPath="url(#e16choice)">
          <Stack a={AL.x} b={AL.y} scr={scr} range={8} opacity={0.85} />
        </g>
        <path
          d={ellipse}
          fill={alpha(colors.primary, 0.08)}
          stroke={alpha(colors.primary, 0.6)}
          strokeWidth={5}
          strokeDasharray="4 8"
        />
        <line
          x1={O.x}
          y1={O.y}
          x2={scr(AL.x * K, AL.y * K).x}
          y2={scr(AL.x * K, AL.y * K).y}
          stroke={alpha(colors.paper, 0.45)}
          strokeWidth={6}
          strokeDasharray="12 10"
        />
        <Arrow from={O} to={scr(arrow.x * K, arrow.y * K)} width={16} />
        <circle cx={O.x} cy={O.y} r={12} fill={colors.text} />
        <g transform="translate(1520 690)" opacity={fadeIn(frame, c0 + 20)}>
          <text
            x={-170}
            y={14}
            fill={colors.muted}
            fontSize={44}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            G
          </text>
          <path
            d="M -110 -80 l -20 0 l 0 160 l 20 0 M 110 -80 l 20 0 l 0 160 l -20 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
          {[a, b, b, c].map((n, k) => (
            <text
              key={k}
              x={-55 + (k % 2) * 110}
              y={-14 + Math.floor(k / 2) * 76}
              fill={colors.text}
              fontSize={48}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {n.toFixed(1)}
            </text>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1260,
          width: 520,
          padding: "14px 0",
          borderRadius: 16,
          textAlign: "center",
          border: `5px solid ${colors.orange}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 38,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c1 + 20),
          translate: riseIn(frame, c1 + 20, 12),
        }}
      >
        {tx.real}
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1260,
          width: 520,
          padding: "14px 0",
          borderRadius: 16,
          textAlign: "center",
          border: `5px solid ${colors.primary}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 38,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 60),
          translate: riseIn(frame, c1 + 60, 12),
        }}
      >
        {tx.seen}
      </div>
    </SceneShell>
  );
};
