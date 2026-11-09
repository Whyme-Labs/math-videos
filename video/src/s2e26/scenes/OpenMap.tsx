import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// The open mapping theorem. X's unit disc on the left, T, and its image in
// Y on the right, an ellipse (c0). A small green ball sits inside the
// image (c1). A target y; on the left, steps x₁, x₂, … each half the
// last, and on the right their images homing in on y, the error circle
// halving each time (c2). The steps add up to a point inside X's disc:
// the series converges (c3). Chip: T⁻¹ is bounded (c4).

const XO = { x: 470, y: 470 };
const YO = { x: 1360, y: 470 };
const U = 220;
const A = [
  [1.1, 0.45],
  [-0.25, 0.75],
];
const T = (v: Pt): Pt => [
  A[0][0] * v[0] + A[0][1] * v[1],
  A[1][0] * v[0] + A[1][1] * v[1],
];
const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
const Tinv = (v: Pt): Pt => [
  (A[1][1] * v[0] - A[0][1] * v[1]) / det,
  (-A[1][0] * v[0] + A[0][0] * v[1]) / det,
];
const Y: Pt = [0.55, 0.3];
const XS = Tinv(Y);
// partial sums: approach x* with a zigzag whose size halves each step
const partial = (k: number): Pt => {
  const f = 1 - 0.5 ** k;
  const w = 0.5 ** k * (k % 2 ? 0.6 : -0.6);
  return [XS[0] * f - w * XS[1], XS[1] * f + w * XS[0]];
};
const STEPS = 7;
const scr = (o: { x: number; y: number }, v: Pt): Pt => [
  o.x + U * v[0],
  o.y - U * v[1],
];
const DELTA = 0.7;

export const OpenMap: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("openMap");
  const [c0, c1, c2, c3, c4] = cues;
  const k =
    frame < c2 ? 0 : Math.min(STEPS, 1 + Math.floor((frame - c2 - 10) / 22));
  const pts = Array.from({ length: k + 1 }, (_, i) => partial(i));
  const ell = Array.from({ length: 121 }, (_, i) =>
    scr(
      YO,
      T([Math.cos((2 * Math.PI * i) / 120), Math.sin((2 * Math.PI * i) / 120)]),
    ),
  );
  const grow = glide(frame, c0 + 10, fps, 24);

  return (
    <SceneShell id="openMap">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c0 + 14} volume={0.1} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.14} />
      {Array.from({ length: STEPS }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 10 + i * 22} volume={0.07} />
      ))}
      <Sfx name="ding" at={c3 + 20} volume={0.22} />
      <Sfx name="chime" at={c4 + 8} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <marker
            id="om-head"
            viewBox="0 0 10 10"
            refX={7}
            refY={5}
            markerWidth={4}
            markerHeight={4}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill={colors.paper} />
          </marker>
        </defs>
        <g opacity={fadeIn(frame, c0 + 2, 8)}>
          <circle
            cx={XO.x}
            cy={XO.y}
            r={U}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <circle cx={XO.x} cy={XO.y} r={6} fill={colors.paper} />
          <text
            x={XO.x - U}
            y={XO.y - U - 20}
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            X
          </text>
          <path
            d="M 790 470 Q 900 400 1010 470"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
            markerEnd="url(#om-head)"
          />
          <text
            x={900}
            y={400}
            textAnchor="middle"
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            T
          </text>
          <g
            transform={`translate(${YO.x} ${YO.y}) scale(${grow}) translate(${-YO.x} ${-YO.y})`}
          >
            <path
              d={poly(ell, true)}
              fill={alpha(colors.orange, 0.15)}
              stroke={colors.orange}
              strokeWidth={5}
            />
          </g>
          <circle cx={YO.x} cy={YO.y} r={6} fill={colors.paper} />
          <text
            x={YO.x + 200}
            y={YO.y - U - 20}
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            Y
          </text>
        </g>
        <circle
          cx={YO.x}
          cy={YO.y}
          r={DELTA * U}
          fill={alpha(colors.green, 0.2)}
          stroke={colors.green}
          strokeWidth={5}
          opacity={fadeIn(frame, c1 + 8, 8)}
        />
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <circle
            cx={scr(YO, Y)[0]}
            cy={scr(YO, Y)[1]}
            r={12}
            fill={colors.highlight}
          />
          {k > 0 && (
            <circle
              cx={scr(YO, Y)[0]}
              cy={scr(YO, Y)[1]}
              r={Math.max(4, DELTA * U * 0.5 ** k)}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={3}
              strokeDasharray="6 5"
            />
          )}
          <path
            d={poly(pts.map((p) => scr(XO, p)))}
            fill="none"
            stroke={colors.primary}
            strokeWidth={4}
          />
          <path
            d={poly(pts.map((p) => scr(YO, T(p))))}
            fill="none"
            stroke={colors.orange}
            strokeWidth={4}
          />
          {pts.slice(1).map((p, i) => (
            <g key={i}>
              <circle
                cx={scr(XO, p)[0]}
                cy={scr(XO, p)[1]}
                r={7}
                fill={colors.primary}
              />
              <circle
                cx={scr(YO, T(p))[0]}
                cy={scr(YO, T(p))[1]}
                r={7}
                fill={colors.orange}
              />
            </g>
          ))}
          <circle
            cx={scr(XO, XS)[0]}
            cy={scr(XO, XS)[1]}
            r={14}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c3 + 20, 8)}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 300,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c3 + 20),
          whiteSpace: "nowrap",
        }}
      >
        x = x₁ + x₂ + x₃ + …
      </div>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 1200,
          fontSize: 40,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c2 + 10),
          whiteSpace: "nowrap",
        }}
      >
        {tx.target}
      </div>
      <Chip
        frame={frame}
        at={c4 + 8}
        x={760}
        y={110}
        color={colors.green}
        math
        size={52}
      >
        {tx.inverse}
      </Chip>
    </SceneShell>
  );
};
