import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Coordinates are a language. One fixed arrow, reading (3, 2) on the usual
// grid. The second basis vector leans over from (0, 1) to (1, 1); the grid
// shears under the arrow and its coordinates count down live to (1, 2). A
// "dimension 2" badge stays put the whole time. Then both spellings sit
// side by side under "same arrow".

const O = { x: 760, y: 700 };
const S = 150; // px per unit
const T = { x: 3, y: 2 };

export const Language: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("language");
  const [c0, c1] = cues;
  const lean = glide(frame, c0 + 50, fps, 60);
  const badge = Math.min(1, springIn(frame, c0 + 20, fps, 10));
  const pair = Math.min(1, springIn(frame, c1 + 20, fps, 10));
  // basis: b1 = (1, 0), b2 = (lean, 1); T = a·b1 + b·b2
  const b = T.y;
  const a = T.x - lean * b;
  const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  const tip = scr(T.x, T.y);

  return (
    <SceneShell id="language">
      <Sfx name="pop" at={c0 + 20} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 50} volume={0.14} />
      <Sfx name="ding" at={c0 + 110} volume={0.14} />
      <Sfx name="chime" at={c1 + 20} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the grid of the current basis */}
        {Array.from({ length: 11 }).map((_, i) => {
          const k = i - 3;
          // lines along b2 through k·b1, and along b1 through k·b2
          const p1 = scr(k + lean * -0.5, -0.5);
          const p2 = scr(k + lean * 3.6, 3.6);
          const q1 = scr(-3 + lean * k, k);
          const q2 = scr(7 + lean * k, k);
          return (
            <g key={i}>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={alpha(colors.paper, k === 0 ? 0.5 : 0.15)}
                strokeWidth={k === 0 ? 4 : 2}
              />
              {k >= 0 && k <= 3 ? (
                <line
                  x1={q1.x}
                  y1={q1.y}
                  x2={q2.x}
                  y2={q2.y}
                  stroke={alpha(colors.paper, k === 0 ? 0.5 : 0.15)}
                  strokeWidth={k === 0 ? 4 : 2}
                />
              ) : null}
            </g>
          );
        })}
        {/* the basis vectors */}
        <Arrow from={O} to={scr(1, 0)} color={colors.orange} width={10} />
        <Arrow from={O} to={scr(lean, 1)} color={colors.orange} width={10} />
        {/* the arrow itself, which never moves */}
        <Arrow from={O} to={tip} width={14} />
        <text
          x={tip.x + 30}
          y={tip.y - 20}
          fill={colors.primary}
          fontSize={64}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          ({a.toFixed(lean > 0.001 && lean < 0.999 ? 1 : 0)}, {b})
        </text>
        {/* the invariant */}
        <g
          opacity={badge}
          transform={`translate(1560 220) rotate(-4) scale(${badge})`}
        >
          <rect
            x={-210}
            y={-58}
            width={420}
            height={108}
            rx={22}
            fill={colors.primary}
            stroke={colors.ink}
            strokeWidth={5}
          />
          <text
            y={18}
            fill={colors.ink}
            fontSize={54}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
          >
            {tx.dimension} 2
          </text>
        </g>
        {/* two spellings of one arrow */}
        <g opacity={pair}>
          {["(3, 2)", "(1, 2)"].map((t, k) => (
            <g
              key={t}
              transform={`translate(${1440 + k * 260} ${lerp(560, 520, pair)})`}
            >
              <rect
                x={-110}
                y={-52}
                width={220}
                height={96}
                rx={18}
                fill={alpha(colors.violet, 0.9)}
                stroke={colors.primary}
                strokeWidth={4}
              />
              <text
                y={16}
                fill={colors.text}
                fontSize={52}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {t}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 1290,
          width: 560,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 30),
          translate: riseIn(frame, c1 + 30, 16),
        }}
      >
        {tx.sameArrow}
      </div>
    </SceneShell>
  );
};
