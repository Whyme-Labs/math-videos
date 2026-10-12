import type React from "react";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { alpha, colors, fonts } from "../../shared/theme";

// A number written as nested "next" layers: S(S(0)) is a 0 inside two
// boxes. Layers from the first argument are lemon; layers carried over from
// the second argument are orange, so you can see where each one came from.

const CORE = 26;
const GAP = 17;
export const layerHalf = (k: number) => CORE + GAP * k; // half-size of layer k (1-based)

export const Layer: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly half: number;
  readonly color: string;
  readonly opacity?: number;
}> = ({ x, y, half, color, opacity = 1 }) => (
  <rect
    x={x - half}
    y={y - half}
    width={2 * half}
    height={2 * half}
    rx={half * 0.28}
    fill="none"
    stroke={color}
    strokeWidth={5}
    opacity={opacity}
  />
);

export const Nested: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly layers: string[]; // colours, innermost first
  readonly coreOpacity?: number;
  readonly opacity?: number;
  readonly scale?: number;
}> = ({ x, y, layers, coreOpacity = 1, opacity = 1, scale = 1 }) => (
  <g
    opacity={opacity}
    transform={`translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`}
  >
    <g opacity={coreOpacity}>
      <circle
        cx={x}
        cy={y}
        r={CORE}
        fill={alpha(colors.primary, 0.15)}
        stroke={colors.muted}
        strokeWidth={2}
      />
      <text
        x={x}
        y={y + 12}
        fill={colors.text}
        fontSize={34}
        textAnchor="middle"
        fontFamily={fonts.math}
      >
        0
      </text>
    </g>
    {layers.map((c, k) => (
      <Layer key={k} x={x} y={y} half={layerHalf(k + 1)} color={c} />
    ))}
  </g>
);

// a + b by the rules: the first argument slides to the output untouched,
// then each "next" layer is peeled off the second argument and wrapped
// around the outside of the output. When the second argument is 0, rule A1
// finishes and the result is shown.
export const peelTimes = (start: number, b: number, gap: number) => ({
  move: start,
  peel: (i: number) => start + 22 + i * gap, // i-th peel starts
  done: start + 22 + b * gap + 6,
});

export const PeelMachine: React.FC<{
  readonly frame: number;
  readonly fps: number;
  readonly x: number;
  readonly y: number;
  readonly a: number;
  readonly b: number;
  readonly start: number;
  readonly gap?: number;
  readonly spacing?: number;
  readonly scale?: number;
  readonly showResult?: boolean;
}> = ({
  frame,
  fps,
  x,
  y,
  a,
  b,
  start,
  gap = 30,
  spacing = 300,
  scale = 1,
  showResult = true,
}) => {
  const t = peelTimes(start, b, gap);
  const A = { x: x - spacing, y };
  const B = { x, y };
  const OUT = { x: x + spacing, y };
  const slide = glide(frame, t.move, fps, 18);
  const peeled = Array.from({ length: b }).filter(
    (_, i) => frame >= t.peel(i) + 16,
  ).length;
  const flying = Array.from({ length: b }).findIndex(
    (_, i) => frame >= t.peel(i) && frame < t.peel(i) + 16,
  );
  const done = frame >= t.done;
  const outLayers = [
    ...Array.from({ length: a }, () => colors.primary),
    ...Array.from({ length: peeled }, () => colors.orange),
  ];
  // B keeps its inner layers; the outermost one leaves on each peel.
  const bLeft = b - peeled - (flying >= 0 ? 1 : 0);
  const result = springIn(frame, t.done, fps, 10);
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`}
    >
      <text
        x={(A.x + B.x) / 2}
        y={y + 18}
        fill={colors.text}
        fontSize={56}
        textAnchor="middle"
        fontFamily={fonts.math}
      >
        +
      </text>
      <text
        x={(B.x + OUT.x) / 2}
        y={y + 18}
        fill={colors.muted}
        fontSize={56}
        textAnchor="middle"
        fontFamily={fonts.math}
      >
        →
      </text>
      {/* First argument: rides along to the output, untouched. */}
      <Nested
        x={lerp(A.x, OUT.x, slide)}
        y={y}
        layers={
          slide < 1
            ? Array.from({ length: a }, () => colors.primary)
            : outLayers
        }
      />
      {/* Second argument: loses one layer per step; its 0 fades when A1 applies. */}
      <Nested
        x={B.x}
        y={y}
        layers={Array.from({ length: Math.max(0, bLeft) }, () => colors.orange)}
        coreOpacity={done ? 1 - ramp(frame, t.done, 10) : 1}
      />
      {flying >= 0
        ? (() => {
            const p = glide(frame, t.peel(flying), fps, 16);
            const from = layerHalf(b - flying);
            const to = layerHalf(a + flying + 1);
            const lift = -90 * Math.sin(Math.PI * p);
            return (
              <Layer
                x={lerp(B.x, OUT.x, p)}
                y={y + lift}
                half={lerp(from, to, p)}
                color={colors.orange}
              />
            );
          })()
        : null}
      {showResult ? (
        <g
          opacity={Math.min(1, result)}
          transform={`translate(${OUT.x} ${y + layerHalf(a + b) + 70}) scale(${result})`}
        >
          <text
            y={20}
            fill={colors.primary}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={700}
          >
            = {a + b}
          </text>
        </g>
      ) : null}
    </g>
  );
};
