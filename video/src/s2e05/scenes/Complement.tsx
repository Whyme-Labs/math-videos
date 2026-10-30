import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Complements are not unique. The x axis is fixed; a second line through
// the origin swings round. The arrow v is split into a piece along the
// axis (orange) and a piece along the swinging line (pink), with the dashed
// parallelogram between them; as the line swings, both pieces slide and
// stretch. Ghosts of the earlier choices stay behind, all of them valid.

const O = { x: 820, y: 620 };
const S = 120;
const V = { x: 2.2, y: 1.8 };
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const deg = Math.PI / 180;

export const Complement: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("complement");
  const [c0, c1] = cues;
  // the swing: 90° → 45° → 125° → 65°, one leg per step
  const legs = [
    { at: c0 + 50, to: 45 },
    { at: c1 + 6, to: 125 },
    { at: c1 + 50, to: 65 },
  ];
  let theta = 90;
  for (const l of legs) theta = lerp(theta, l.to, glide(frame, l.at, fps, 26));
  const th = theta * deg;
  const d = { x: Math.cos(th), y: Math.sin(th) };
  const b = V.y / d.y;
  const a = V.x - b * d.x;
  const pa = scr(a, 0);
  const tip = scr(V.x, V.y);
  const ghosts = [90, 45, 125].filter((_, k) => frame > legs[k].at + 20);

  return (
    <SceneShell id="complement">
      <Sfx name="pop" at={c0 + 20} volume={0.16} />
      {legs.map((l, k) => (
        <Sfx key={k} name="whoosh" at={l.at} volume={0.12} />
      ))}
      <Sfx name="tick" at={c0 + 80} volume={0.16} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="compStage">
            <rect x={120} y={90} width={1680} height={740} />
          </clipPath>
        </defs>
        <g clipPath="url(#compStage)">
          {/* earlier choices, left behind as ghosts */}
          {ghosts.map((g) => (
            <line
              key={g}
              x1={scr(-8 * Math.cos(g * deg), -8 * Math.sin(g * deg)).x}
              y1={scr(-8 * Math.cos(g * deg), -8 * Math.sin(g * deg)).y}
              x2={scr(8 * Math.cos(g * deg), 8 * Math.sin(g * deg)).x}
              y2={scr(8 * Math.cos(g * deg), 8 * Math.sin(g * deg)).y}
              stroke={alpha(colors.highlight, 0.25)}
              strokeWidth={4}
              strokeDasharray="14 12"
            />
          ))}
          {/* the x axis, fixed */}
          <line
            x1={120}
            y1={O.y}
            x2={1800}
            y2={O.y}
            stroke={colors.orange}
            strokeWidth={8}
          />
          {/* the swinging line */}
          <line
            x1={scr(-8 * d.x, -8 * d.y).x}
            y1={scr(-8 * d.x, -8 * d.y).y}
            x2={scr(8 * d.x, 8 * d.y).x}
            y2={scr(8 * d.x, 8 * d.y).y}
            stroke={colors.highlight}
            strokeWidth={8}
            opacity={fadeIn(frame, c0 + 8, 10)}
          />
          {/* the parallelogram */}
          <path
            d={`M ${O.x} ${O.y} L ${pa.x} ${pa.y} L ${tip.x} ${tip.y} L ${scr(b * d.x, b * d.y).x} ${scr(b * d.x, b * d.y).y} Z`}
            fill={alpha(colors.primary, 0.08)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
            strokeDasharray="10 10"
            opacity={fadeIn(frame, c0 + 30)}
          />
        </g>
        <g opacity={fadeIn(frame, c0 + 26, 8)}>
          <Arrow from={O} to={pa} color={colors.orange} width={14} />
          <Arrow from={pa} to={tip} color={colors.highlight} width={14} />
        </g>
        <Arrow
          from={O}
          to={tip}
          width={14}
          opacity={fadeIn(frame, c0 + 14, 8)}
        />
        <text
          x={tip.x + 26}
          y={tip.y - 10}
          fill={colors.primary}
          fontSize={56}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 14)}
        >
          v
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1240,
          fontSize: 56,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c0 + 80),
          translate: riseIn(frame, c0 + 80, 16),
        }}
      >
        {tx.whichLine}
      </div>
    </SceneShell>
  );
};
