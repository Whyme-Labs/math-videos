import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// The stack stays, the arrow moves. A fixed orange stack a = (1, 1) and,
// with the dot product, its arrow (1, 1) (c0). The ruler changes to
// G = diag(1, 4): its unit circle squashes into an ellipse (c1). The arrow
// standing for the same stack swings to G⁻¹a, the old one left dashed
// (c2). The formula works it out, r = G⁻¹a = (1, ¼), with a G-card (c3).
// Last a badge: row ≠ column unless G = I (c4).

const O = { x: 720, y: 500 };
const S = 200;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const AL = { x: 1, y: 1 };

export const Choice: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("choice");
  const [c0, c1, c2, c3, c4] = cues;
  const squash = glide(frame, c1 + 6, fps, 36);
  const swing = glide(frame, c2 + 6, fps, 36);
  const g = lerp(1, 4, squash); // G = diag(1, g)
  const ga = lerp(1, 4, swing);
  const r = { x: AL.x, y: AL.y / ga };
  const ell = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const p = { x: Math.cos(t), y: Math.sin(t) / Math.sqrt(g) };
    return `${i ? "L" : "M"} ${scr(p.x, p.y).x.toFixed(1)} ${scr(p.x, p.y).y.toFixed(1)}`;
  }).join(" ");
  const steps: Tok[][] = [
    [
      { id: "r", t: "r" },
      { id: "e", t: " = " },
      { id: "v", t: "G⁻¹a" },
    ],
    [
      { id: "r", t: "r" },
      { id: "e", t: " = " },
      { id: "v", t: "(1, ¼)", color: colors.primary },
    ],
  ];

  return (
    <SceneShell id="choice">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="ding" at={c3 + 40} volume={0.3} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16choice">
            <circle cx={O.x} cy={O.y} r={360} />
          </clipPath>
        </defs>
        <g clipPath="url(#e16choice)">
          <Stack a={AL.x} b={AL.y} scr={scr} range={8} opacity={0.85} />
        </g>
        <path
          d={ell}
          fill={alpha(colors.primary, 0.08)}
          stroke={alpha(colors.primary, 0.7)}
          strokeWidth={5}
          strokeDasharray="4 8"
          opacity={fadeIn(frame, c0 + 10)}
        />
        <line
          x1={O.x}
          y1={O.y}
          x2={scr(AL.x, AL.y).x}
          y2={scr(AL.x, AL.y).y}
          stroke={alpha(colors.paper, 0.45)}
          strokeWidth={6}
          strokeDasharray="12 10"
          opacity={swing}
        />
        <Arrow from={O} to={scr(r.x, r.y)} width={16} />
        <text
          x={scr(r.x, r.y).x + 14}
          y={scr(r.x, r.y).y - 14}
          fill={colors.primary}
          fontSize={50}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          r
        </text>
        <circle cx={O.x} cy={O.y} r={12} fill={colors.text} />
        <g transform="translate(1540 640)" opacity={fadeIn(frame, c1 + 10)}>
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
          {[1, 0, 0, g].map((n, k) => (
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
              {n.toFixed(n % 1 ? 1 : 0)}
            </text>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1400,
          fontFamily: fonts.math,
          fontSize: 50,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c0 + 6),
        }}
      >
        a = (1, 1)
      </div>
      <Eq steps={steps} at={[c3 + 6, c3 + 40]} x={1560} y={260} size={64} />
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1320,
          width: 500,
          padding: "12px 0",
          borderRadius: 16,
          textAlign: "center",
          border: `4px solid ${colors.highlight}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 36,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c4 + 6),
          translate: riseIn(frame, c4 + 6, 12),
        }}
      >
        {tx.rowsCols}
      </div>
    </SceneShell>
  );
};
