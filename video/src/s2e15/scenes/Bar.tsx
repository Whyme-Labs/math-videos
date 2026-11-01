import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";

// Why the bar. One complex number z turning slowly on its circle (c0).
// z·z appears, turning twice as fast; a readout of its real part keeps
// flipping sign, red when negative (c1). The mirror image z̄ appears,
// dashed, turning the other way (c2). Their product z̄·z appears as a
// green dot that never moves, sitting on the positive real axis at |z|²,
// with a steady readout (c3). Last the angles: +θ on z, −θ on z̄, and
// they add to 0 (c4): the conjugate undoes the turn and keeps the size.

const O = { x: 680, y: 480 };
const S = 210;
const R = 1.15;

export const Bar: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("bar");
  const [c0, c1, c2, c3, c4] = cues;
  const th = 0.5 + Math.max(0, frame - c0 - 10) * 0.025;
  const z = { x: R * Math.cos(th), y: R * Math.sin(th) };
  const zz = { x: R * R * Math.cos(2 * th), y: R * R * Math.sin(2 * th) };
  const p = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  const sq = fadeIn(frame, c1 + 4, 10);
  const mirror = fadeIn(frame, c2 + 4, 10);
  const prod = fadeIn(frame, c3 + 4, 10);
  const arcs = fadeIn(frame, c4 + 4, 10);
  const fmt = (n: number) =>
    (Math.round(n * 100) / 100).toFixed(2).replace("-", "−");
  const thDeg = Math.round(
    (((th % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * (180 / Math.PI),
  );
  const arc = (a: number, r: number) => {
    const s = a >= 0 ? 0 : 1;
    const e = p((r / S) * Math.cos(a), (r / S) * Math.sin(a));
    return `M ${O.x + r} ${O.y} A ${r} ${r} 0 ${Math.abs(a) > Math.PI ? 1 : 0} ${s} ${e.x} ${e.y}`;
  };
  const a = ((th + Math.PI) % (2 * Math.PI)) - Math.PI;

  return (
    <SceneShell id="bar">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pop" at={c1 + 4} volume={0.12} />
      <Sfx name="pop" at={c2 + 4} volume={0.12} />
      <Sfx name="chime" at={c3 + 10} volume={0.3} />
      <Sfx name="pop" at={c4 + 4} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={p(-1.9, 0).x}
          y1={O.y}
          x2={p(1.9, 0).x}
          y2={O.y}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <line
          x1={O.x}
          y1={p(0, -1.7).y}
          x2={O.x}
          y2={p(0, 1.7).y}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
        />
        <circle
          cx={O.x}
          cy={O.y}
          r={R * S}
          fill="none"
          stroke={alpha(colors.primary, 0.25)}
          strokeWidth={3}
          strokeDasharray="10 10"
        />
        <g opacity={sq}>
          <Arrow from={O} to={p(zz.x, zz.y)} width={12} color={colors.orange} />
          <text
            x={p(zz.x, zz.y).x + 16}
            y={p(zz.x, zz.y).y - 16}
            fill={colors.orange}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            z·z
          </text>
        </g>
        <Arrow from={O} to={p(z.x, z.y)} width={15} />
        <text
          x={p(z.x, z.y).x + 16}
          y={p(z.x, z.y).y - 16}
          fill={colors.primary}
          fontSize={56}
          fontFamily={fonts.math}
          fontWeight={800}
        >
          z
        </text>
        <g opacity={mirror}>
          <line
            x1={O.x}
            y1={O.y}
            x2={p(z.x, -z.y).x}
            y2={p(z.x, -z.y).y}
            stroke={colors.primary}
            strokeWidth={7}
            strokeDasharray="14 10"
          />
          <circle
            cx={p(z.x, -z.y).x}
            cy={p(z.x, -z.y).y}
            r={12}
            fill={colors.primary}
          />
          <text
            x={p(z.x, -z.y).x + 16}
            y={p(z.x, -z.y).y + 52}
            fill={colors.primary}
            fontSize={56}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            <tspan textDecoration="overline">z</tspan>
          </text>
        </g>
        <g opacity={prod}>
          <circle cx={p(R * R, 0).x} cy={O.y} r={22} fill={colors.green} />
          <text
            x={p(R * R, 0).x + 30}
            y={O.y + 60}
            fill={colors.green}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            <tspan textDecoration="overline">z</tspan>·z
          </text>
        </g>
        <g opacity={arcs}>
          <path
            d={arc(a, 90)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={7}
          />
          <path
            d={arc(-a, 120)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={7}
            strokeDasharray="10 8"
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1260,
          display: "flex",
          flexDirection: "column",
          gap: 34,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 56,
            fontWeight: 800,
            color: zz.x < 0 ? colors.red : colors.orange,
            opacity: sq,
          }}
        >
          Re(z·z) = {fmt(zz.x)}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: prod,
            translate: riseIn(frame, c3 + 4, 12),
          }}
        >
          <span style={{ textDecoration: "overline" }}>z</span>·z = {fmt(R * R)}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: arcs,
            translate: riseIn(frame, c4 + 4, 12),
          }}
        >
          +{thDeg % 360}° − {thDeg % 360}° = 0°
        </div>
      </div>
    </SceneShell>
  );
};
