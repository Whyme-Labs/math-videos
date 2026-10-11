import type React from "react";
import { alpha, colors, fonts } from "../../shared/theme";
import { lerp } from "../../shared/components/motion";

// Numbers as nodes and "next" as arrows, in the S1E01 chain style:
// lemon nodes, pink "next" arrows.

export type Pt = { readonly x: number; readonly y: number };

export const NumberNode: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly scale?: number;
  readonly r?: number;
  readonly color?: string;
  readonly fill?: string;
  readonly fontSize?: number;
  readonly opacity?: number;
  readonly ring?: string; // extra outer ring colour (highlight a node)
}> = ({
  x,
  y,
  label,
  scale = 1,
  r = 34,
  color = colors.primary,
  fill,
  fontSize = 34,
  opacity = 1,
  ring,
}) => (
  <g opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
    {ring ? (
      <circle r={r + 12} fill="none" stroke={ring} strokeWidth={4} />
    ) : null}
    <circle
      r={r}
      fill={fill ?? alpha(color, 0.2)}
      stroke={color}
      strokeWidth={3}
    />
    <text
      y={fontSize * 0.36}
      fill={color}
      fontSize={fontSize}
      textAnchor="middle"
      fontFamily={fonts.math}
    >
      {label}
    </text>
  </g>
);

// Point on a straight or quadratic-curved edge at t (0..1).
export const edgePoint = (a: Pt, b: Pt, t: number, ctrl?: Pt): Pt =>
  ctrl
    ? {
        x: (1 - t) ** 2 * a.x + 2 * (1 - t) * t * ctrl.x + t ** 2 * b.x,
        y: (1 - t) ** 2 * a.y + 2 * (1 - t) * t * ctrl.y + t ** 2 * b.y,
      }
    : { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };

// A "next" arrow from node a to node b, trimmed so it starts and ends at the
// node rims. `progress` draws it in (0..1). `ctrl` bends it.
export const NextArrow: React.FC<{
  readonly a: Pt;
  readonly b: Pt;
  readonly ctrl?: Pt;
  readonly r?: number;
  readonly progress?: number;
  readonly color?: string;
  readonly width?: number;
  readonly opacity?: number;
  readonly dashed?: boolean;
  readonly dashOffset?: number; // animate to make the dashes flow
}> = ({
  a,
  b,
  ctrl,
  r = 34,
  progress = 1,
  color = colors.highlight,
  width = 4,
  opacity = 1,
  dashed = false,
  dashOffset = 0,
}) => {
  if (progress <= 0) return null;
  // Trim the ends by the node radius (approximate along the curve).
  const length = Math.hypot(b.x - a.x, b.y - a.y) * (ctrl ? 1.25 : 1);
  const t0 = Math.min(0.45, (r + 4) / length);
  const t1 = 1 - Math.min(0.45, (r + 8) / length);
  const tEnd = lerp(t0, t1, Math.min(1, progress));
  const steps = 24;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++)
    pts.push(edgePoint(a, b, lerp(t0, tEnd, i / steps), ctrl));
  const end = pts[pts.length - 1];
  const before = pts[pts.length - 3];
  const angle = Math.atan2(end.y - before.y, end.x - before.x);
  const head = 16;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <g opacity={opacity}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "10 10" : undefined}
        strokeDashoffset={dashed ? dashOffset : undefined}
      />
      <polygon
        points={[
          [end.x + Math.cos(angle) * 4, end.y + Math.sin(angle) * 4],
          [
            end.x - Math.cos(angle - 0.45) * head,
            end.y - Math.sin(angle - 0.45) * head,
          ],
          [
            end.x - Math.cos(angle + 0.45) * head,
            end.y - Math.sin(angle + 0.45) * head,
          ],
        ]
          .map((p) => p.join(","))
          .join(" ")}
        fill={color}
      />
    </g>
  );
};

// A glowing token stepping along a path of nodes: one step every
// `stepFrames`, gliding between nodes. `node(k)` gives the k-th node visited,
// `ctrl(k)` the bend of the edge from step k to k + 1.
export const tokenPosition = (
  frame: number,
  start: number,
  stepFrames: number,
  node: (k: number) => Pt,
  ctrl?: (k: number) => Pt | undefined,
): Pt => {
  const t = Math.max(0, (frame - start) / stepFrames);
  const k = Math.floor(t);
  const f = t - k;
  // Ease in and out of each step so the token pauses on every node.
  const e =
    f < 0.25
      ? 0
      : f > 0.85
        ? 1
        : 0.5 - 0.5 * Math.cos(((f - 0.25) / 0.6) * Math.PI);
  return edgePoint(node(k), node(k + 1), e, ctrl?.(k));
};

export const Token: React.FC<{
  readonly p: Pt;
  readonly opacity?: number;
  readonly color?: string;
}> = ({ p, opacity = 1, color = colors.primary }) => (
  <g opacity={opacity}>
    <circle cx={p.x} cy={p.y} r={30} fill={alpha(color, 0.25)} />
    <circle cx={p.x} cy={p.y} r={14} fill={color} />
  </g>
);

// A tiny robot that knows nothing yet. `look` turns its eyes (-1..1),
// `tilt` tips its head (degrees), `blink` closes its eyes (0..1).
export const Robot: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly scale?: number;
  readonly look?: number;
  readonly tilt?: number;
  readonly blink?: number;
}> = ({ x, y, scale = 1, look = 0, tilt = 0, blink = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {/* body */}
    <rect
      x={-56}
      y={10}
      width={112}
      height={96}
      rx={22}
      fill={colors.violet}
      stroke={colors.panelEdge}
      strokeWidth={3}
    />
    <rect
      x={-22}
      y={36}
      width={44}
      height={30}
      rx={8}
      fill={alpha(colors.primary, 0.35)}
    />
    {/* legs */}
    <rect
      x={-40}
      y={104}
      width={22}
      height={30}
      rx={8}
      fill={colors.brandPurple}
    />
    <rect
      x={18}
      y={104}
      width={22}
      height={30}
      rx={8}
      fill={colors.brandPurple}
    />
    {/* head */}
    <g transform={`rotate(${tilt} 0 0)`}>
      <line
        x1={0}
        y1={-92}
        x2={0}
        y2={-120}
        stroke={colors.muted}
        strokeWidth={4}
      />
      <circle cx={0} cy={-124} r={9} fill={colors.orange} />
      <rect
        x={-64}
        y={-92}
        width={128}
        height={92}
        rx={26}
        fill={colors.bgGlow}
        stroke={colors.panelEdge}
        strokeWidth={3}
      />
      {[-26, 26].map((ex) => (
        <ellipse
          key={ex}
          cx={ex + look * 10}
          cy={-46}
          rx={11}
          ry={Math.max(1.5, 13 * (1 - blink))}
          fill={colors.primary}
        />
      ))}
    </g>
  </g>
);
