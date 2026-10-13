import type React from "react";
import { alpha, colors } from "../../shared/theme";

// Sets drawn as boxes. A von Neumann number n is a box holding the boxes
// 0, 1, …, n−1 side by side; a Zermelo number n is a single tower of n
// nested boxes. Each box is coloured by the number it is, so you can see
// at a glance that 3 holds 0, 1 and 2.

export const NUM_COLORS = [
  colors.muted,
  colors.orange,
  colors.primary,
  colors.highlight,
  colors.green,
];
const EMPTY = 34; // the empty set
const PAD = 12;
const GAP = 8;

export type Kind = "vn" | "z";

export const boxSize = (n: number, kind: Kind): { w: number; h: number } => {
  if (n === 0) return { w: EMPTY, h: EMPTY };
  if (kind === "z") {
    const inner = boxSize(n - 1, "z");
    return { w: inner.w + 2 * PAD, h: inner.h + 2 * PAD };
  }
  const kids = Array.from({ length: n }, (_, k) => boxSize(k, "vn"));
  return {
    w: 2 * PAD + kids.reduce((s, k) => s + k.w, 0) + GAP * (n - 1),
    h: 2 * PAD + Math.max(...kids.map((k) => k.h)),
  };
};

// One set as nested boxes, centred on (cx, cy). `highlight` (a number) draws
// that element with a glow, `dim` fades everything else.
export const SetBox: React.FC<{
  readonly n: number;
  readonly kind: Kind;
  readonly cx: number;
  readonly cy: number;
  readonly color?: string;
  readonly highlight?: number;
  readonly highlightColor?: string;
  readonly opacity?: number;
}> = ({
  n,
  kind,
  cx,
  cy,
  color,
  highlight,
  highlightColor = colors.green,
  opacity = 1,
}) => {
  const { w, h } = boxSize(n, kind);
  const c = color ?? NUM_COLORS[n % NUM_COLORS.length];
  const children: React.ReactNode[] = [];
  if (n > 0) {
    if (kind === "z") {
      children.push(<SetBox key={0} n={n - 1} kind="z" cx={cx} cy={cy} />);
    } else {
      let x = cx - w / 2 + PAD;
      for (let k = 0; k < n; k++) {
        const s = boxSize(k, "vn");
        children.push(
          <g key={k}>
            {highlight === k ? (
              <rect
                x={x - 6}
                y={cy - s.h / 2 - 6}
                width={s.w + 12}
                height={s.h + 12}
                rx={14}
                fill={alpha(highlightColor, 0.25)}
                stroke={highlightColor}
                strokeWidth={3}
              />
            ) : null}
            <SetBox n={k} kind="vn" cx={x + s.w / 2} cy={cy} />
          </g>,
        );
        x += s.w + GAP;
      }
    }
  }
  return (
    <g opacity={opacity}>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={10}
        fill={alpha(c, 0.08)}
        stroke={c}
        strokeWidth={3}
      />
      {children}
    </g>
  );
};

// Centre offsets (from the parent's centre, unscaled) of each element of n.
export const childOffsets = (
  n: number,
  kind: Kind,
): { dx: number; dy: number }[] => {
  if (n === 0) return [];
  if (kind === "z") return [{ dx: 0, dy: 0 }];
  const { w } = boxSize(n, "vn");
  let x = -w / 2 + PAD;
  return Array.from({ length: n }, (_, k) => {
    const s = boxSize(k, "vn");
    const o = { dx: x + s.w / 2, dy: 0 };
    x += s.w + GAP;
    return o;
  });
};

// A row of numbers 0, 1, …, built one at a time. Number n appears at
// buildAt[n]: copies of its elements fly out of the earlier boxes into place,
// then the new outer box closes around them. (von Neumann: copies of all of
// 0 … n−1; Zermelo: a copy of n−1 only.)
export const BuildChain: React.FC<{
  readonly kind: Kind;
  readonly xs: number[];
  readonly y: number;
  readonly scale: number;
  readonly buildAt: number[];
  readonly frame: number;
  readonly fps: number;
  readonly ease: (frame: number, start: number) => number; // 0..1 flight progress
  readonly grow: (frame: number, start: number) => number; // outer box spring
  readonly highlight?: {
    readonly n: number;
    readonly k: number;
    readonly color?: string;
  };
  readonly opacity?: number;
}> = ({
  kind,
  xs,
  y,
  scale,
  buildAt,
  frame,
  ease,
  grow,
  highlight,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    {buildAt.map((t, n) => {
      if (frame < t) return null;
      const settled = frame >= t + 22;
      if (n === 0 || settled) {
        const s = n === 0 ? Math.min(1.1, grow(frame, t)) : 1;
        return (
          <g
            key={n}
            transform={`translate(${xs[n]} ${y}) scale(${scale * s}) translate(${-xs[n]} ${-y})`}
          >
            <SetBox
              n={n}
              kind={kind}
              cx={xs[n]}
              cy={y}
              highlight={
                highlight && highlight.n === n ? highlight.k : undefined
              }
              highlightColor={highlight?.color}
            />
          </g>
        );
      }
      // In flight: element copies travel from their own boxes into place.
      const offs = childOffsets(n, kind);
      const elems =
        kind === "z" ? [n - 1] : Array.from({ length: n }, (_, k) => k);
      const p = ease(frame, t);
      const outer = boxSize(n, kind);
      const g = grow(frame, t + 12);
      return (
        <g key={n}>
          {elems.map((k, i) => {
            const fx = xs[k];
            const tx = xs[n] + offs[i].dx * scale;
            const cx = fx + (tx - fx) * p;
            const cy =
              y -
              120 *
                Math.sin(Math.PI * p) *
                (1 - (0.3 * i) / Math.max(1, elems.length));
            return (
              <g
                key={k}
                transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
              >
                <SetBox n={k} kind={kind} cx={cx} cy={cy} />
              </g>
            );
          })}
          {g > 0 ? (
            <rect
              x={xs[n] - (outer.w * scale * g) / 2}
              y={y - (outer.h * scale * g) / 2}
              width={outer.w * scale * g}
              height={outer.h * scale * g}
              rx={10 * scale}
              fill="none"
              stroke={NUM_COLORS[n % NUM_COLORS.length]}
              strokeWidth={3 * scale}
              opacity={Math.min(1, g)}
            />
          ) : null}
        </g>
      );
    })}
  </g>
);

// Two-row comparison layout used by the Zermelo and Benacerraf scenes.
export const ROW_XS = [270, 450, 700, 1100];
export const TOP_Y = 290;
export const BOTTOM_Y = 620;
export const ROW_SCALE = 0.9;
export const VN_LABELS = ["0 = ∅", "1 = {0}", "2 = {0, 1}", "3 = {0, 1, 2}"];
export const Z_LABELS = ["0 = ∅", "1 = {0}", "2 = {1}", "3 = {2}"];
