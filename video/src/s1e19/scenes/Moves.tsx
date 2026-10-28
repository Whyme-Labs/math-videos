import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { arcPath, Compass } from "../components/tools";
import { useStrings } from "../i18n";

// What the tools can reach. The plane with 0 and 1 marked. Pairs of ruled
// lines cross and drop new points, each labelled with a number you could
// already get by + − × ÷: ½, 2, the point (1, 1). Then the compass, needle
// on 0, pencil on (1, 1), swings down to the axis and lands on √2: a square
// root, the only new thing a circle can add.

const O = { x: 640, y: 600 };
const U = 280; // one unit, in px
const pt = (x: number, y: number) => ({ x: O.x + x * U, y: O.y - y * U });

// each crossing: the point, two line directions (degrees), the label
const CROSSINGS = [
  { p: [0.5, 0], a: [90, 35], l: "½" },
  { p: [2, 0], a: [90, 130], l: "2" },
  { p: [1, 1], a: [90, 0], l: "(1, 1)" },
] as const;

export const Moves: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("moves");
  const [c0, c1] = cues;
  const crossAt = (k: number) => c0 + 24 + k * 44;
  const swing = glide(frame, c1 + 30, fps, 40);
  const root = Math.min(1, springIn(frame, c1 + 72, fps, 10));
  const R2 = Math.SQRT2 * U;
  // the camera drifts right as the plane fills, then settles on √2
  const camX = lerp(0, 120, glide(frame, c0 + 10, fps, 120));

  return (
    <SceneShell id="moves">
      <Sfx name="pop" at={c0 + 8} volume={0.16} />
      {CROSSINGS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={crossAt(k) + 18} volume={0.16} />
      ))}
      <Sfx name="scratch" at={c1 + 30} volume={0.2} />
      <Sfx name="ding" at={c1 + 72} />

      <Camera x={camX} zoom={lerp(1, 1.15, ramp(frame, c1 + 60, 120))}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the axis, 0 and 1 */}
          <line
            x1={O.x - 2 * U}
            y1={O.y}
            x2={O.x + 3.6 * U}
            y2={O.y}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {[0, 1].map((n) => {
            const s = Math.min(1, springIn(frame, c0 + 8 + n * 6, fps, 10));
            return (
              <g key={n} transform={`translate(${pt(n, 0).x} ${O.y})`}>
                <circle r={16 * s} fill={colors.primary} />
                <text
                  y={70}
                  fill={colors.primary}
                  fontSize={56}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={s}
                >
                  {n}
                </text>
              </g>
            );
          })}
          {/* lines crossing lines */}
          {CROSSINGS.map((c, k) => {
            const t = glide(frame, crossAt(k), fps, 16);
            const p = pt(c.p[0], c.p[1]);
            const s = Math.min(1, springIn(frame, crossAt(k) + 18, fps, 10));
            const dim = 1 - 0.6 * fadeIn(frame, c1, 10);
            return (
              <g key={k} opacity={dim}>
                {c.a.map((d) => {
                  const dx = Math.cos((d * Math.PI) / 180) * 260 * t;
                  const dy = -Math.sin((d * Math.PI) / 180) * 260 * t;
                  return (
                    <line
                      key={d}
                      x1={p.x - dx}
                      y1={p.y - dy}
                      x2={p.x + dx}
                      y2={p.y + dy}
                      stroke={alpha(colors.paper, 0.7)}
                      strokeWidth={4}
                    />
                  );
                })}
                <circle cx={p.x} cy={p.y} r={14 * s} fill={colors.green} />
                <text
                  x={p.x + (c.p[1] ? 30 : 0)}
                  y={p.y + (c.p[1] ? -24 : 70)}
                  fill={colors.green}
                  fontSize={52}
                  textAnchor={c.p[1] ? "start" : "middle"}
                  fontFamily={fonts.math}
                  fontWeight={800}
                  opacity={s}
                >
                  {c.l}
                </text>
              </g>
            );
          })}
          {/* the circle: needle on 0, pencil on (1, 1), down to the axis */}
          <path
            d={arcPath(O.x, O.y, R2, 45, 45 - 45 * swing)}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={7}
            opacity={swing > 0 ? 1 : 0}
          />
          <path
            d={arcPath(O.x, O.y, R2, 45, 180)}
            fill="none"
            stroke={alpha(colors.highlight, 0.35)}
            strokeWidth={4}
            strokeDasharray="10 10"
            opacity={fadeIn(frame, c1 + 76)}
          />
          <Compass
            cx={O.x}
            cy={O.y}
            r={R2}
            deg={45 - 45 * swing}
            opacity={fadeIn(frame, c1 + 10, 8) * fadeOut(frame, c1 + 80, 10)}
          />
          <g
            opacity={root}
            transform={`translate(${O.x + R2} ${O.y}) scale(${root})`}
          >
            <circle r={18} fill={colors.highlight} />
            <text
              y={90}
              fill={colors.highlight}
              fontSize={84}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              √2
            </text>
          </g>
        </svg>
      </Camera>

      {/* what each kind of crossing can add */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 140,
          fontFamily: fonts.math,
          fontSize: 76,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, crossAt(2) + 30) * fadeOut(frame, c1, 10),
          translate: riseIn(frame, crossAt(2) + 30, 16),
        }}
      >
        {tx.lineLine}
      </div>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 140,
          fontFamily: fonts.math,
          fontSize: 120,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c1 + 90),
          scale: lerp(1.4, 1, Math.min(1, springIn(frame, c1 + 90, fps, 10))),
        }}
      >
        {tx.lineCircle}
      </div>
    </SceneShell>
  );
};
