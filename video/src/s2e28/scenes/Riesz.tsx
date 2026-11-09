import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, longLine } from "../components/draw";
import { useStrings } from "../i18n";

// Riesz representation. The statement (c0). A stack of parallel level
// lines of φ fills the plane (c1). The kernel, φ = 0, lights up and a
// perpendicular z drops onto it from a point (c2). The arrow y = z/‖z‖²
// crosses the stack; a point x slides about and φ(x) = ⟨x, y⟩ is read off
// (c3). The worked example: f on [0, 1], its area over [0, ½] shaded, and
// y as a step equal to 1 on [0, ½] (c4). Chip: H ≅ H* (c5).

const O = { x: 620, y: 520 };
const N = { x: 0.6, y: -0.8 }; // unit normal of the level lines (screen)
const GAP = 90;
const f = (t: number) => 0.45 + 0.3 * Math.sin(5 * t) + 0.2 * t;

export const Riesz: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("riesz");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const zg = glide(frame, c2 + 20, fps, 20);
  const yg = glide(frame, c3 + 6, fps, 20);
  const t = (frame - c3) * 0.04;
  const xp = {
    x: O.x + 220 * Math.cos(t) + 60,
    y: O.y + 160 * Math.sin(1.3 * t),
  };
  const level = ((xp.x - O.x) * N.x + (xp.y - O.y) * N.y) / GAP;
  const Q = {
    x: O.x - 2.4 * GAP * N.x + 160 * N.y,
    y: O.y - 2.4 * GAP * N.y - 160 * N.x,
  };

  return (
    <SceneShell id="riesz">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 5} volume={0.06} />
      ))}
      <Sfx name="pluck2" at={c2 + 20} volume={0.14} />
      <Sfx name="ding" at={c3 + 26} volume={0.2} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="chime" at={c5 + 8} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="rz-clip">
              <rect x={140} y={140} width={1000} height={680} rx={20} />
            </clipPath>
            <marker
              id="rz-head"
              viewBox="0 0 10 10"
              refX={7}
              refY={5}
              markerWidth={4}
              markerHeight={4}
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={colors.primary} />
            </marker>
          </defs>
          <g clipPath="url(#rz-clip)">
            {Array.from({ length: 13 }, (_, i) => {
              const k = i - 6;
              const isKer = k === 0 && frame >= c2;
              return (
                <path
                  key={i}
                  d={longLine(
                    O.x + k * GAP * N.x,
                    O.y + k * GAP * N.y,
                    -N.y,
                    N.x,
                  )}
                  stroke={isKer ? colors.green : alpha(colors.orange, 0.6)}
                  strokeWidth={isKer ? 6 : 3}
                  opacity={fadeIn(frame, c1 + 6 + Math.abs(k) * 5, 6)}
                />
              );
            })}
            <g opacity={fadeIn(frame, c2 + 6, 8)}>
              <circle cx={Q.x} cy={Q.y} r={12} fill={colors.highlight} />
              <line
                x1={Q.x}
                y1={Q.y}
                x2={Q.x + 2.4 * GAP * N.x * zg}
                y2={Q.y + 2.4 * GAP * N.y * zg}
                stroke={colors.highlight}
                strokeWidth={5}
                strokeDasharray="10 7"
              />
            </g>
            <line
              x1={O.x}
              y1={O.y}
              x2={O.x + 2 * GAP * N.x * yg}
              y2={O.y + 2 * GAP * N.y * yg}
              stroke={colors.primary}
              strokeWidth={9}
              markerEnd="url(#rz-head)"
              opacity={fadeIn(frame, c3 + 4, 6)}
            />
            <g opacity={fadeIn(frame, c3 + 30, 8)}>
              <circle cx={xp.x} cy={xp.y} r={13} fill={colors.paper} />
            </g>
          </g>
          <rect
            x={140}
            y={140}
            width={1000}
            height={680}
            rx={20}
            fill="none"
            stroke={alpha(colors.paper, 0.25)}
            strokeWidth={3}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1220,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 6),
            whiteSpace: "nowrap",
          }}
        >
          {tx.kernel} = {"{"}φ = 0{"}"}
        </div>
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 1220,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c3 + 10),
            whiteSpace: "nowrap",
          }}
        >
          y = z / ‖z‖²
        </div>
        <div
          style={{
            position: "absolute",
            top: 500,
            left: 1220,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c3 + 30),
            whiteSpace: "nowrap",
          }}
        >
          φ(x) = ⟨x, y⟩ ={" "}
          <span style={{ fontFamily: fonts.mono }}>{level.toFixed(2)}</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={700}
            x2={1100}
            y2={700}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={`M 200 700 ${Array.from({ length: 51 }, (_, i) => `L ${200 + 9 * i} ${700 - 400 * f(i / 100)}`).join(" ")} L 650 700 Z`}
            fill={alpha(colors.primary, 0.3)}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, i) =>
                `${i ? "L" : "M"} ${200 + 9 * i} ${700 - 400 * f(i / 100)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <path
            d="M 200 760 L 200 640 L 650 640 L 650 760 L 1100 760"
            fill="none"
            stroke={colors.orange}
            strokeWidth={6}
            transform="translate(0 60)"
          />
          <text
            x={690}
            y={680}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.mono}
          >
            ½
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 1220,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          ∫[0, ½] f = ⟨f, 1[0, ½]⟩
        </div>
        <div
          style={{
            position: "absolute",
            top: 270,
            left: 1220,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.orange,
            whiteSpace: "nowrap",
          }}
        >
          ‖φ‖ = ‖y‖ = 1/√2
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1220,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c4, 8),
          whiteSpace: "nowrap",
        }}
      >
        φ(x) = ⟨x, y⟩
      </div>
      <Chip
        frame={frame}
        at={c5 + 8}
        x={1220}
        y={400}
        color={colors.green}
        math
        size={60}
      >
        {tx.dual}
      </Chip>
    </SceneShell>
  );
};
