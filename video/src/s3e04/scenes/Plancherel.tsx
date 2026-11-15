import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { useStrings } from "../i18n";

// ℝ and Plancherel. The ball of finite energy, L², and the wave
// e^(2πiξx) running straight through it and off both edges; its energy
// counter climbs without end (c0). δ, a spike that also pokes out of the
// ball (c1). Bars of a sum over characters crowd together into a curve, an
// integral (c2). Two balls of the same size joined by the arrow ℱ:
// ‖f̂‖ = ‖f‖ (c3). A Gaussian maps to the same Gaussian (c4).

const C = { x: 960, y: 450 };
const RB = 230;

export const Plancherel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("plancherel");
  const [c0, c1, c2, c3, c4] = cues;
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);
  const grow = progress(frame, c0 + 10, 60);
  const energy = Math.floor(10 ** (1 + 5 * progress(frame, c0 + 20, 120)));
  const partB = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 12);
  const n = Math.round(8 * 2 ** (3 * progress(frame, c2 + 20, 60)));
  const partC = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 12);
  const partD = fadeIn(frame, c4 + 4, 10);
  const bump = (x: number) =>
    Math.exp(-x * x * 1.6) * (1 + 0.5 * Math.cos(3 * x));

  return (
    <SceneShell id="plancherel">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="thud" at={c1 + 10} volume={0.16} />
      <Sfx name="riser" at={c2 + 20} volume={0.1} />
      <Sfx name="ding" at={c3 + 20} volume={0.16} />
      <Sfx name="chime" at={c4 + 40} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="pl-ball">
            <circle cx={C.x} cy={C.y} r={RB} />
          </clipPath>
        </defs>
        <g opacity={partA}>
          <circle
            cx={C.x}
            cy={C.y}
            r={RB}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <text
            x={C.x}
            y={C.y + RB + 60}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            L²(ℝ)
          </text>
          {/* the wave: red outside the ball, lemon inside */}
          {(() => {
            const half = 860 * grow;
            const d = path(
              (x) => Math.cos(x * 0.05),
              -half,
              half,
              (x) => C.x + x,
              (v) => C.y - 70 * v,
              600,
            );
            return (
              <g>
                <path d={d} fill="none" stroke={colors.red} strokeWidth={5} />
                <path
                  d={d}
                  fill="none"
                  stroke={colors.highlight}
                  strokeWidth={6}
                  clipPath="url(#pl-ball)"
                />
              </g>
            );
          })()}
          <g opacity={fadeIn(frame, c1 + 6, 10)}>
            <path
              d={`M ${C.x - 120} ${C.y + 150} L ${C.x - 112} ${C.y + 150} L ${C.x - 106} 120 L ${C.x - 100} ${C.y + 150} L ${C.x - 92} ${C.y + 150}`}
              fill="none"
              stroke={colors.red}
              strokeWidth={6}
            />
            <text
              x={C.x - 80}
              y={150}
              fill={colors.red}
              fontSize={52}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              δ
            </text>
          </g>
          <text
            x={1300}
            y={220}
            fill={colors.red}
            fontSize={44}
            fontFamily={fonts.mono}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20, 10)}
          >
            ∫|e|² ≥ {energy.toLocaleString("en-US")}
          </text>
        </g>
        <g opacity={partB}>
          <line
            x1={300}
            y1={640}
            x2={1620}
            y2={640}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {Array.from({ length: n + 1 }, (_, i) => {
            const x = -3 + (6 * i) / n;
            const w = (1320 / n) * 0.7;
            const h = 320 * bump(x);
            return (
              <rect
                key={i}
                x={960 + x * 220 - w / 2}
                y={640 - h}
                width={w}
                height={h}
                fill={alpha(colors.highlight, 0.85)}
                rx={Math.min(6, w / 3)}
              />
            );
          })}
          <path
            d={path(
              bump,
              -3,
              3,
              (x) => 960 + x * 220,
              (v) => 640 - 320 * v,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={progress(frame, c2 + 60, 20)}
          />
          <text
            x={960}
            y={220}
            textAnchor="middle"
            fill={colors.text}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {frame < c2 + 70 ? "Σ" : "∫"}
          </text>
        </g>
        <g opacity={partC}>
          {[0, 1].map((s) => (
            <g key={s}>
              <circle
                cx={600 + s * 720}
                cy={450}
                r={200}
                fill={alpha(s ? colors.highlight : colors.primary, 0.1)}
                stroke={s ? colors.highlight : colors.primary}
                strokeWidth={5}
              />
              <line
                x1={600 + s * 720}
                y1={450}
                x2={
                  600 +
                  s * 720 +
                  200 * Math.cos(0.6 + s * progress(frame, c3 + 20, 40) * 1.2)
                }
                y2={
                  450 -
                  200 * Math.sin(0.6 + s * progress(frame, c3 + 20, 40) * 1.2)
                }
                stroke={s ? colors.highlight : colors.primary}
                strokeWidth={8}
                strokeLinecap="round"
              />
              <text
                x={600 + s * 720}
                y={720}
                textAnchor="middle"
                fill={colors.text}
                fontSize={48}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {s ? "f̂" : "f"}
              </text>
            </g>
          ))}
          <text
            x={960}
            y={440}
            textAnchor="middle"
            fill={colors.green}
            fontSize={72}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℱ →
          </text>
        </g>
        <g opacity={partD}>
          {[0, 1].map((s) => (
            <g key={s}>
              <line
                x1={260 + s * 760}
                y1={600}
                x2={900 + s * 760}
                y2={600}
                stroke={alpha(colors.paper, 0.4)}
                strokeWidth={3}
              />
              <path
                d={path(
                  (x) => Math.exp(-Math.PI * x * x),
                  -2.2,
                  2.2,
                  (x) => 580 + s * 760 + x * 140,
                  (v) => 600 - 330 * v * (s ? progress(frame, c4 + 30, 30) : 1),
                )}
                fill={alpha(s ? colors.highlight : colors.primary, 0.15)}
                stroke={s ? colors.highlight : colors.primary}
                strokeWidth={6}
              />
            </g>
          ))}
          <text
            x={960}
            y={420}
            textAnchor="middle"
            fill={colors.green}
            fontSize={72}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℱ
          </text>
          <text
            x={580}
            y={680}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            e^(−πx²)
          </text>
          <text
            x={1340}
            y={680}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            e^(−πξ²)
          </text>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c0 + 40}
          x={1300}
          y={290}
          size={36}
          color={colors.red}
        >
          {tx.energy}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 30}
          x={760}
          y={150}
          size={44}
          math
          color={colors.green}
        >
          ‖f̂‖ = ‖f‖
        </Chip>
      </div>
    </SceneShell>
  );
};
