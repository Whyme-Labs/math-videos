import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// No countable Hamel basis. A big ball stands for the Banach space and
// basis vectors b₁, b₂, … point out of the centre (c0). Their spans
// F₁ ⊂ F₂ ⊂ … appear as paper-thin sheets, each a little wider, and
// keep coming (c1); a point between them glows, covered by none.
// Chip: every Hamel basis is uncountable (c2).

const C = { x: 700, y: 480 };
const R = 330;

export const Hamel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("hamel");
  const [c0, c1, c2] = cues;
  const sheets = Math.min(14, Math.max(0, Math.floor((frame - c1 - 6) / 8)));

  return (
    <SceneShell id="hamel">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 10 }, (_, k) => (
        <Sfx key={k} name="tick" at={c1 + 6 + k * 8} volume={0.06} />
      ))}
      <Sfx name="ding" at={c1 + 120} volume={0.2} />
      <Sfx name="chime" at={c2 + 8} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="hm-ball">
            <circle cx={C.x} cy={C.y} r={R} />
          </clipPath>
        </defs>
        <circle
          cx={C.x}
          cy={C.y}
          r={R}
          fill={alpha(colors.primary, 0.1)}
          stroke={colors.primary}
          strokeWidth={5}
          opacity={fadeIn(frame, c0 + 2, 8)}
        />
        <g clipPath="url(#hm-ball)">
          {Array.from({ length: sheets }, (_, k) => {
            const a = (k * 137.5) % 180;
            return (
              <rect
                key={k}
                x={C.x - R}
                y={C.y - 4 - k * 0.4}
                width={2 * R}
                height={8 + k * 0.8}
                fill={alpha(colors.orange, 0.55)}
                transform={`rotate(${a} ${C.x} ${C.y})`}
              />
            );
          })}
        </g>
        {[0, 1, 2].map((k) => {
          const a = (k * 137.5 * Math.PI) / 180;
          return (
            <line
              key={k}
              x1={C.x}
              y1={C.y}
              x2={C.x + 150 * Math.cos(a)}
              y2={C.y + 150 * Math.sin(a)}
              stroke={colors.paper}
              strokeWidth={6}
              opacity={fadeIn(frame, c0 + 10 + k * 8, 6)}
            />
          );
        })}
        <circle
          cx={C.x + 170}
          cy={C.y - 150}
          r={16}
          fill={colors.green}
          opacity={fadeIn(frame, c1 + 120, 8)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1160,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c1 + 10),
          whiteSpace: "nowrap",
        }}
      >
        {tx.sheets}
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1160,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 60),
          whiteSpace: "nowrap",
        }}
      >
        F₁ ∪ F₂ ∪ F₃ ∪ … ≠ X
      </div>
      <Chip
        frame={frame}
        at={c2 + 8}
        x={1100}
        y={330}
        color={colors.green}
        size={40}
      >
        {tx.uncountable}
      </Chip>
    </SceneShell>
  );
};
