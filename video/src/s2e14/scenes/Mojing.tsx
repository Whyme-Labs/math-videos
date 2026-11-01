import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《墨经》: "圜，一中同长也". A centre and twelve
// spokes of equal length sweep out a circle. Then the ruler changes: the
// spokes, each still exactly "one unit" for the new ruler, now trace an
// ellipse, and a ruler icon labelled "换一把尺" swaps in. Last, the circle
// and the ellipse side by side, both correct.

const C = { x: 820, y: 470 };
const R = 280;

export const Mojing: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("mojing");
  const [c0, c1, c2, c3] = cues;
  const sweep = Math.min(1, Math.max(0, (frame - c1 - 10) / 50));
  const ruler = glide(frame, c2 + 20, fps, 40);
  const ghost = fadeIn(frame, c3 + 10, 10);
  // the new ruler: unit length means (x/1.5)² + (y/0.75)² = 1, tilted 25°
  const rx = lerp(R, R * 1.5, ruler);
  const ry = lerp(R, R * 0.7, ruler);
  const rot = lerp(0, 25, ruler);

  return (
    <SceneShell id="mojing">
      {Array.from({ length: 12 }).map((_, k) => (
        <Sfx
          key={k}
          name="tick"
          at={c1 + 10 + Math.round((k / 12) * 50)}
          volume={0.1}
        />
      ))}
      <Sfx name="whoosh" at={c2 + 20} volume={0.12} />
      <Sfx name="chime" at={c3 + 20} volume={0.35} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={C.x}
          cy={C.y}
          r={R}
          fill="none"
          stroke={alpha(colors.paper, 0.4)}
          strokeWidth={4}
          strokeDasharray="12 10"
          opacity={ghost}
        />
        <g transform={`rotate(${-rot} ${C.x} ${C.y})`}>
          {Array.from({ length: 12 }).map((_, k) => {
            const a = (k / 12) * Math.PI * 2;
            const on = k / 12 < sweep;
            return (
              <g key={k} opacity={on ? 1 : 0}>
                <line
                  x1={C.x}
                  y1={C.y}
                  x2={C.x + rx * Math.cos(a)}
                  y2={C.y + ry * Math.sin(a)}
                  stroke={colors.orange}
                  strokeWidth={5}
                />
                <circle
                  cx={C.x + rx * Math.cos(a)}
                  cy={C.y + ry * Math.sin(a)}
                  r={10}
                  fill={colors.primary}
                />
              </g>
            );
          })}
          <ellipse
            cx={C.x}
            cy={C.y}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            opacity={sweep >= 1 ? 1 : 0}
          />
        </g>
        <circle cx={C.x} cy={C.y} r={14} fill={colors.text} />
        {/* the ruler */}
        <g
          transform={`translate(1500 ${lerp(820, 560, ruler)})`}
          opacity={fadeIn(frame, c2 + 10, 10)}
        >
          <rect
            x={-200}
            y={-30}
            width={400}
            height={60}
            rx={8}
            fill={alpha(colors.wood, 0.8)}
            stroke={colors.ink}
            strokeWidth={3}
          />
          {Array.from({ length: 11 }).map((_, k) => (
            <line
              key={k}
              x1={-180 + k * 36}
              y1={-30}
              x2={-180 + k * 36}
              y2={k % 5 === 0 ? 4 : -10}
              stroke={colors.ink}
              strokeWidth={3}
            />
          ))}
          <text
            y={90}
            fill={colors.orange}
            fontSize={44}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.newRuler}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.mojing}
      </div>
    </SceneShell>
  );
};
