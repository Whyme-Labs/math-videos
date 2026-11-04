import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { longLine, poly, rnd, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// The separation form. A convex blob and a point x₀ (c0); a line slides
// in from beyond x₀ and stops halfway across the gap, with its parallel
// level lines (c1). Supporting lines wrap round the blob one by one,
// each darkening the half-plane outside: what's left is the blob (c2).
// A circle and its centre (c3); a line through the centre turns and
// always cuts the circle at two red points (c4). An SVM: two clouds, their
// hulls, and the street between them widening (c5). LP: the feasible
// polygon, the objective's level line sweeping to the corner (8/5, 6/5),
// the two constraint lines weighted ⅖ and ⅕ (c6).

const E = { x: 640, y: 470, rx: 270, ry: 180 };
const X0 = { x: 1300, y: 330 };
const support = (nx: number, ny: number) => Math.hypot(E.rx * nx, E.ry * ny);

const cloud = (seed: number, cx: number, cy: number): Pt[] =>
  Array.from({ length: 14 }, (_, k) => {
    const a = rnd(seed + k) * 2 * Math.PI;
    const r = 40 + 130 * Math.sqrt(rnd(seed + k + 40));
    return [cx + r * Math.cos(a), cy + 0.8 * r * Math.sin(a)];
  });
const hull = (pts: Pt[]): Pt[] => {
  const s = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o: Pt, a: Pt, b: Pt) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: Pt[] = [];
  for (const p of s) {
    while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0)
      lo.pop();
    lo.push(p);
  }
  const up: Pt[] = [];
  for (const p of [...s].reverse()) {
    while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0)
      up.pop();
    up.push(p);
  }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
};
const A = cloud(10, 560, 380);
const B = cloud(70, 1060, 600);

const LP = { x: 380, y: 760, u: 200 };
const LX = (x: number) => LP.x + LP.u * x;
const LY = (y: number) => LP.y - LP.u * y;

export const Separation: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("separation");
  const [c0, c1, c2, c3, c4, c5, c6] = cues;
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10) * fadeOut(frame, c6, 10);
  const partD = fadeIn(frame, c6 + 4, 10);

  // separating line for the blob and x₀
  const dx0 = X0.x - E.x;
  const dy0 = -(X0.y - E.y);
  const dist = Math.hypot(dx0, dy0);
  const n = { x: dx0 / dist, y: dy0 / dist };
  const h = support(n.x, n.y);
  const sStop = (h + dist) / 2;
  const s = lerp(dist + 320, sStop, glide(frame, c1 + 6, fps, 30));
  const sep = (t: number) => longLine(E.x + n.x * t, E.y - n.y * t, n.y, n.x);
  const tangents = Math.min(24, Math.max(0, Math.floor((frame - c2 - 6) / 4)));

  // circle and the rotating line through its centre
  const ang = (frame - c4) * 0.03;

  // SVM street
  const street = glide(frame, c5 + 20, fps, 40);
  const nv = { x: 500, y: 220 };
  const nl = Math.hypot(nv.x, nv.y);
  const mid = { x: 820, y: 500 };

  // LP sweep
  const k = lerp(0, 14 / 5, glide(frame, c6 + 10, fps, 50));

  return (
    <SceneShell id="separation">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="thud" at={c1 + 36} volume={0.16} />
      {Array.from({ length: 12 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 8} volume={0.06} />
      ))}
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="scratch" at={c4 + 10} volume={0.14} />
      <Sfx name="pluck3" at={c5 + 8} volume={0.14} />
      <Sfx name="ding" at={c5 + 60} volume={0.2} />
      <Sfx name="whoosh" at={c6 + 10} volume={0.1} />
      <Sfx name="chime" at={c6 + 64} volume={0.28} />

      <AbsoluteFill
        style={{ opacity: partA, clipPath: "inset(70px 0 250px 0)" }}
      >
        <svg width={1920} height={1080}>
          <ellipse
            cx={E.x}
            cy={E.y}
            rx={E.rx}
            ry={E.ry}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <g opacity={fadeIn(frame, c1 + 6, 8) * fadeOut(frame, c2, 10)}>
            {[-2, -1, 1, 2].map((j) => (
              <path
                key={j}
                d={sep(s + j * 60)}
                stroke={alpha(colors.orange, 0.35)}
                strokeWidth={3}
              />
            ))}
            <path d={sep(s)} stroke={colors.orange} strokeWidth={7} />
          </g>
          {Array.from({ length: tangents }, (_, i) => {
            const t = (2 * Math.PI * i) / 24;
            const nx = Math.cos(t);
            const ny = Math.sin(t);
            const hh = support(nx, ny);
            const px = E.x + nx * hh;
            const py = E.y - ny * hh;
            const far = 3000;
            return (
              <g key={i}>
                <path
                  d={poly(
                    [
                      [px - ny * far, py - nx * far],
                      [px + ny * far, py + nx * far],
                      [px + ny * far + nx * far, py + nx * far - ny * far],
                      [px - ny * far + nx * far, py - nx * far - ny * far],
                    ],
                    true,
                  )}
                  fill={alpha(colors.bg, 0.22)}
                />
                <path
                  d={longLine(px, py, ny, nx)}
                  stroke={alpha(colors.green, 0.6)}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          <circle cx={X0.x} cy={X0.y} r={16} fill={colors.highlight} />
          <text
            x={X0.x + 26}
            y={X0.y + 14}
            fill={colors.highlight}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            x₀
          </text>
          <text
            x={E.x}
            y={E.y + 16}
            textAnchor="middle"
            fill={colors.text}
            fontSize={44}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.convex}
          </text>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <circle
            cx={760}
            cy={470}
            r={260}
            fill="none"
            stroke={colors.primary}
            strokeWidth={8}
          />
          <circle cx={760} cy={470} r={16} fill={colors.highlight} />
          <g opacity={fadeIn(frame, c4 + 6, 8)}>
            <path
              d={longLine(760, 470, Math.cos(ang), Math.sin(ang), 420)}
              stroke={colors.orange}
              strokeWidth={6}
            />
            {[1, -1].map((sg) => (
              <circle
                key={sg}
                cx={760 + sg * 260 * Math.cos(ang)}
                cy={470 + sg * 260 * Math.sin(ang)}
                r={16}
                fill={colors.red}
              />
            ))}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1180,
            fontSize: 52,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c3 + 10),
            whiteSpace: "nowrap",
          }}
        >
          {tx.notConvex} {frame >= c4 + 30 ? "✗" : ""}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{ opacity: partC, clipPath: "inset(70px 0 250px 0)" }}
      >
        <svg width={1920} height={1080}>
          <path
            d={poly(hull(A), true)}
            fill={alpha(colors.primary, 0.15)}
            stroke={alpha(colors.primary, 0.6)}
            strokeWidth={3}
          />
          <path
            d={poly(hull(B), true)}
            fill={alpha(colors.highlight, 0.15)}
            stroke={alpha(colors.highlight, 0.6)}
            strokeWidth={3}
          />
          {[-1, 1].map((sg) => (
            <path
              key={sg}
              d={longLine(
                mid.x + (sg * street * 70 * nv.x) / nl,
                mid.y + (sg * street * 70 * nv.y) / nl,
                -nv.y,
                nv.x,
              )}
              stroke={alpha(colors.paper, 0.6)}
              strokeWidth={3}
              strokeDasharray="12 8"
            />
          ))}
          <path
            d={longLine(mid.x, mid.y, -nv.y, nv.x)}
            stroke={colors.green}
            strokeWidth={6}
            opacity={fadeIn(frame, c5 + 14, 8)}
          />
          {A.map((p, i) => (
            <circle
              key={`a${i}`}
              cx={p[0]}
              cy={p[1]}
              r={12}
              fill={colors.primary}
            />
          ))}
          {B.map((p, i) => (
            <rect
              key={`b${i}`}
              x={p[0] - 11}
              y={p[1] - 11}
              width={22}
              height={22}
              fill={colors.highlight}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 1300,
            fontFamily: fonts.body,
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c5 + 50),
          }}
        >
          SVM · {tx.margin}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partD }}>
        <svg width={1920} height={1080}>
          <line
            x1={LX(0)}
            y1={LY(0)}
            x2={LX(3.2)}
            y2={LY(0)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={LX(0)}
            y1={LY(0)}
            x2={LX(0)}
            y2={LY(3)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={poly(
              [
                [LX(0), LY(0)],
                [LX(2), LY(0)],
                [LX(1.6), LY(1.2)],
                [LX(0), LY(2)],
              ],
              true,
            )}
            fill={alpha(colors.primary, 0.25)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <line
            x1={LX(0)}
            y1={LY(2)}
            x2={LX(3.2)}
            y2={LY(0.4)}
            stroke={colors.highlight}
            strokeWidth={5}
          />
          <line
            x1={LX(2)}
            y1={LY(0)}
            x2={LX(1.0)}
            y2={LY(3)}
            stroke={colors.green}
            strokeWidth={5}
          />
          <line
            x1={LX(k)}
            y1={LY(0)}
            x2={LX(0)}
            y2={LY(k)}
            stroke={colors.orange}
            strokeWidth={6}
          />
          <circle
            cx={LX(1.6)}
            cy={LY(1.2)}
            r={16}
            fill={colors.orange}
            opacity={fadeIn(frame, c6 + 60, 6)}
          />
          <text
            x={LX(2.6)}
            y={LY(0.62)}
            fill={colors.highlight}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c6 + 64)}
          >
            ⅖
          </text>
          <text
            x={LX(1.25)}
            y={LY(2.4)}
            fill={colors.green}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c6 + 64)}
          >
            ⅕
          </text>
          <text
            x={LX(0.5)}
            y={LY(0.5)}
            fill={colors.text}
            fontSize={36}
            fontFamily={fonts.body}
            fontWeight={700}
          >
            {tx.feasible}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1100,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ color: colors.orange }}>
            max x + y ={" "}
            <span style={{ fontFamily: fonts.mono }}>{k.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: 24, opacity: fadeIn(frame, c6 + 70) }}>
            x + y ≤ <span style={{ color: colors.highlight }}>⅖</span>·4 +{" "}
            <span style={{ color: colors.green }}>⅕</span>·6 = 14/5
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
