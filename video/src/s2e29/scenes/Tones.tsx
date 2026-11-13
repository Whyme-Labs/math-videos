import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { path } from "../components/waves";
import { useStrings } from "../i18n";

// Tones as orthonormal vectors. Four tones, n = 1 … 4, stacked as waves
// (c0). Two of them, sin x and sin 2x, and their product drawn below
// (c1); the product's area shaded green above the axis and red below, the
// average reading 0.000 (c2). A Gram table of ⟨eₙ, eₘ⟩: ones on the
// diagonal, zeros elsewhere (c3). A vector f, the plane of the first
// tones, and its shadow Sₙ f with the perpendicular error (c4).

const X0 = 180;
const W = 760;
const X = (t: number) => X0 + (W * t) / (2 * Math.PI);

export const Tones: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("tones");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const prod = (t: number) => Math.sin(t) * Math.sin(2 * t);
  const sweep = Math.max(0, Math.min(1, (frame - c2 - 6) / 60));
  let avg = 0;
  const M = 400;
  for (let i = 0; i < M * sweep; i++)
    avg += prod(((i + 0.5) * 2 * Math.PI) / M);
  avg = sweep > 0 ? avg / M : 0;
  const drop = glide(frame, c4 + 20, fps, 20);
  const F = { x: 1080, y: 260 };
  const P = { x: 1220, y: 640 };

  return (
    <SceneShell id="tones">
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pluck1" at={c0 + 6 + i * 8} volume={0.08} />
      ))}
      <Sfx name="pop" at={c1 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="ding" at={c2 + 70} volume={0.2} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="chime" at={c4 + 40} volume={0.26} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[1, 2, 3, 4].map((n, i) => {
            const y0 = 200 + i * 70;
            const hl = frame >= c1 && (n === 1 || n === 2);
            return (
              <path
                key={n}
                d={path(
                  (t) => Math.sin(n * t),
                  0,
                  2 * Math.PI,
                  X,
                  (v) => y0 - 28 * v,
                  300,
                )}
                fill="none"
                stroke={hl ? colors.primary : alpha(colors.paper, 0.5)}
                strokeWidth={hl ? 5 : 3}
                opacity={fadeIn(frame, c0 + 6 + i * 8, 8)}
              />
            );
          })}
          <g opacity={fadeIn(frame, c1 + 6, 8)}>
            <line
              x1={X0}
              y1={640}
              x2={X0 + W}
              y2={640}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={3}
            />
            <path
              d={`${path(prod, 0, 2 * Math.PI * sweep, X, (v) => 640 - 150 * Math.max(0, v), 300)} L ${X(2 * Math.PI * sweep)} 640 L ${X0} 640 Z`}
              fill={alpha(colors.green, 0.5)}
            />
            <path
              d={`${path(prod, 0, 2 * Math.PI * sweep, X, (v) => 640 - 150 * Math.min(0, v), 300)} L ${X(2 * Math.PI * sweep)} 640 L ${X0} 640 Z`}
              fill={alpha(colors.red, 0.5)}
            />
            <path
              d={path(prod, 0, 2 * Math.PI, X, (v) => 640 - 150 * v, 300)}
              fill="none"
              stroke={colors.orange}
              strokeWidth={5}
            />
          </g>
          <g opacity={fadeIn(frame, c3 + 6, 8)}>
            {Array.from({ length: 4 }, (_, r) =>
              Array.from({ length: 4 }, (_, c) => (
                <g key={`${r}-${c}`}>
                  <rect
                    x={1180 + c * 120}
                    y={260 + r * 110}
                    width={104}
                    height={94}
                    rx={12}
                    fill={
                      r === c
                        ? alpha(colors.green, 0.4)
                        : alpha(colors.paper, 0.06)
                    }
                    stroke={alpha(colors.paper, 0.3)}
                    strokeWidth={2}
                    opacity={fadeIn(frame, c3 + 8 + (r + c) * 3, 6)}
                  />
                  <text
                    x={1232 + c * 120}
                    y={322 + r * 110}
                    textAnchor="middle"
                    fill={colors.text}
                    fontSize={44}
                    fontFamily={fonts.mono}
                    fontWeight={800}
                    opacity={fadeIn(frame, c3 + 8 + (r + c) * 3, 6)}
                  >
                    {r === c ? 1 : 0}
                  </text>
                </g>
              )),
            )}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 560,
            left: X0 + W + 30,
            fontFamily: fonts.math,
            fontSize: 40,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c1 + 10) * fadeOut(frame, c3, 8),
            whiteSpace: "nowrap",
          }}
        >
          sin x · sin 2x
        </div>
        <div
          style={{
            position: "absolute",
            top: 640,
            left: X0 + W + 30,
            fontFamily: fonts.mono,
            fontSize: 40,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c2 + 10) * fadeOut(frame, c3, 8),
            whiteSpace: "nowrap",
          }}
        >
          {tx.average} = {avg.toFixed(3)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 1180,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 6),
            whiteSpace: "nowrap",
          }}
        >
          ⟨eₙ, eₘ⟩
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <path
            d="M 520 760 L 1700 760 L 1460 560 L 280 560 Z"
            fill={alpha(colors.primary, 0.12)}
            stroke={alpha(colors.primary, 0.6)}
            strokeWidth={3}
          />
          <line
            x1={900}
            y1={680}
            x2={F.x}
            y2={F.y}
            stroke={colors.highlight}
            strokeWidth={7}
          />
          <circle cx={F.x} cy={F.y} r={12} fill={colors.highlight} />
          <line
            x1={F.x}
            y1={F.y}
            x2={lerp(F.x, P.x, drop)}
            y2={lerp(F.y, P.y, drop)}
            stroke={colors.red}
            strokeWidth={5}
            strokeDasharray="10 7"
          />
          <line
            x1={900}
            y1={680}
            x2={lerp(900, P.x, drop)}
            y2={lerp(680, P.y, drop)}
            stroke={colors.green}
            strokeWidth={7}
          />
          <circle cx={P.x} cy={P.y} r={10} fill={colors.green} opacity={drop} />
          <text
            x={F.x + 24}
            y={F.y}
            fill={colors.highlight}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            f
          </text>
          <text
            x={P.x + 24}
            y={P.y + 50}
            fill={colors.green}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={drop}
          >
            Sₙ f
          </text>
          <text
            x={300}
            y={540}
            fill={colors.primary}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            span(e₋ₙ … eₙ)
          </text>
        </svg>
      </AbsoluteFill>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 30}
          x={1180}
          y={720}
          color={colors.green}
          math
          size={44}
        >
          cₙ = ⟨f, eₙ⟩
        </Chip>
      </div>
    </SceneShell>
  );
};
