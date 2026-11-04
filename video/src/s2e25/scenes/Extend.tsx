import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { ballPath, Chip, longLine } from "../components/draw";
import { useStrings } from "../i18n";

// The one-step extension, in ℝ² with M the x-axis and f(t, 0) = t. The
// ℓ¹ diamond and M, chip ‖F‖ = ‖f‖ (c0). A new direction z = (0, 1)
// rises; c = F(z) is the only unknown (c1). On a number line for c, the
// lower bounds t − ‖(t, −1)‖ slide in from the left and the upper bounds
// ‖(t, 1)‖ − t from the right (c2); the gap between them fills green:
// never empty (c3). On the plane, the line F = 1 rocks about the corner
// (1, 0) with c running over [−1, 1], always touching and never cutting
// (c4). The diamond rounds into the disc: the bounds slide together onto
// 0, and the rocking line cuts the disc (red) until it settles vertical
// (c5).

const O = { x: 560, y: 470 };
const U = 150;
const X = (x: number) => O.x + U * x;
const Y = (y: number) => O.y - U * y;
const NL = { x: 1440, y: 600, u: 150 };
const C = (c: number) => NL.x + NL.u * Math.max(-2.1, Math.min(2.1, c));
const TS = [-1.5, -1, -0.6, -0.3, 0, 0.4, 1, 2, 4];

export const Extend: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("extend");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const round = glide(frame, c5 + 6, fps, 30);
  const p = lerp(1, 2, round);
  const nrm = (a: number, b: number) =>
    (Math.abs(a) ** p + Math.abs(b) ** p) ** (1 / p);
  const lo = TS.map((t) => t - nrm(t, -1));
  const hi = TS.map((t) => nrm(t, 1) - t);
  const sup = Math.max(...lo);
  const inf = Math.min(...hi);
  const slide = glide(frame, c2 + 6, fps, 24);
  const rock =
    frame >= c4
      ? Math.sin((frame - c4 - 10) * 0.05) * fadeIn(frame, c4 + 10, 12)
      : 0;
  const settle = 1 - glide(frame, c5 + 50, fps, 50);
  const c = frame >= c5 ? 0.8 * Math.sin((frame - c5) * 0.09) * settle : rock;
  const cuts = round > 0.5 && Math.abs(c) > 0.06;

  return (
    <SceneShell id="extend">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      {TS.map((_, k) => (
        <Sfx key={k} name="tick" at={c2 + 8 + k * 2} volume={0.06} />
      ))}
      <Sfx name="ding" at={c3 + 10} volume={0.22} />
      <Sfx name="pluck2" at={c4 + 10} volume={0.14} />
      <Sfx name="pluck4" at={c5 + 8} volume={0.14} />
      <Sfx name="chime" at={c5 + 100} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="ex-clip">
            <rect
              x={X(-2.5)}
              y={Y(2.3)}
              width={U * 5}
              height={U * 4.6}
              rx={20}
            />
          </clipPath>
          <marker
            id="ex-head"
            viewBox="0 0 10 10"
            refX={7}
            refY={5}
            markerWidth={4}
            markerHeight={4}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill={colors.highlight} />
          </marker>
        </defs>
        <g opacity={fadeIn(frame, c0 + 2, 10)}>
          <rect
            x={X(-2.5)}
            y={Y(2.3)}
            width={U * 5}
            height={U * 4.6}
            rx={20}
            fill={alpha(colors.paper, 0.04)}
            stroke={alpha(colors.paper, 0.2)}
            strokeWidth={3}
          />
          <line
            x1={X(0)}
            y1={Y(2.3)}
            x2={X(0)}
            y2={Y(-2.3)}
            stroke={alpha(colors.paper, 0.25)}
            strokeWidth={2}
          />
          <path
            d={ballPath(p, O.x, O.y, U)}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <line
            x1={X(-2.5)}
            y1={Y(0)}
            x2={X(2.5)}
            y2={Y(0)}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <text
            x={X(2.35)}
            y={Y(0) - 20}
            textAnchor="end"
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            M
          </text>
          <text
            x={X(-2.3)}
            y={Y(1.95)}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.mono}
          >
            {round < 0.5 ? "ℓ¹" : "ℓ²"}
          </text>
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(0)}
            y2={Y(lerp(0.2, 1, glide(frame, c1 + 6, fps, 14)))}
            stroke={colors.highlight}
            strokeWidth={8}
            markerEnd="url(#ex-head)"
          />
          <text
            x={X(0) + 22}
            y={Y(1.05)}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            z
          </text>
        </g>
        <g clipPath="url(#ex-clip)" opacity={fadeIn(frame, c4 + 6, 8)}>
          <path
            d={longLine(X(1), Y(0), -c, -1)}
            stroke={cuts ? colors.red : colors.green}
            strokeWidth={6}
          />
          <circle cx={X(1)} cy={Y(0)} r={12} fill={colors.paper} />
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <line
            x1={C(-2.1)}
            y1={NL.y}
            x2={C(2.1)}
            y2={NL.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {[-2, -1, 0, 1, 2].map((v) => (
            <g key={v}>
              <line
                x1={C(v)}
                y1={NL.y - 12}
                x2={C(v)}
                y2={NL.y + 12}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
              />
              <text
                x={C(v)}
                y={NL.y + 56}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={34}
                fontFamily={fonts.mono}
              >
                {v < 0 ? `−${-v}` : v}
              </text>
            </g>
          ))}
          <rect
            x={C(sup)}
            y={NL.y - 16}
            width={Math.max(0, C(inf) - C(sup))}
            height={32}
            rx={8}
            fill={alpha(colors.green, 0.5)}
            opacity={fadeIn(frame, c3 + 6, 10)}
          />
          {lo.map((v, k) => (
            <circle
              key={`l${k}`}
              cx={lerp(C(-2.1) - 80, C(v), slide)}
              cy={NL.y - 44}
              r={11}
              fill={colors.orange}
            />
          ))}
          {hi.map((v, k) => (
            <circle
              key={`g${k}`}
              cx={lerp(C(2.1) + 80, C(v), slide)}
              cy={NL.y - 76}
              r={11}
              fill={colors.highlight}
            />
          ))}
          <polygon
            points={`${C(c) - 16},${NL.y + 96} ${C(c) + 16},${NL.y + 96} ${C(c)},${NL.y + 70}`}
            fill={colors.paper}
            opacity={fadeIn(frame, c4 + 6, 8)}
          />
        </g>
      </svg>
      <Chip frame={frame} at={c0 + 8} x={1140} y={110} math size={50}>
        {tx.sameNorm}
      </Chip>
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 1140,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 14),
          whiteSpace: "nowrap",
        }}
      >
        c = F(z) ={" "}
        {frame >= c4 ? (
          <span style={{ fontFamily: fonts.mono }}>{c.toFixed(2)}</span>
        ) : (
          "?"
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 1140,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c2 + 20),
        }}
      >
        <span style={{ color: colors.orange }}>sup</span>{" "}
        <span style={{ color: colors.text }}>≤ c ≤</span>{" "}
        <span style={{ color: colors.highlight }}>inf</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 730,
          left: C(-1.1),
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 16) * fadeOut(frame, c5, 8),
          whiteSpace: "nowrap",
        }}
      >
        [−1, 1] · {tx.gap}
      </div>
    </SceneShell>
  );
};
