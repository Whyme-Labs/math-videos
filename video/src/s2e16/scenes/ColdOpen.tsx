import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import {
  ParamSurface,
  Stage3D,
  Tube,
  type V3,
} from "../../shared/components/three3d";
import { useStrings } from "../i18n";

// The story. 1907: Riesz and Fréchet, two papers sliding together (c0).
// The hiker's question (c1). A 3D dome-shaped hill with contour rings; the
// rings drop to the floor and the camera rises overhead until the hill is
// a map (c2). On the map (2D from here), the uphill arrow at P points at
// the summit, perpendicular to the contour circle (c3). An inset shows the
// same map squashed north to south: circles become ellipses (c4). The
// ground contours pulse: they didn't move (c5). The squashed map's
// "perpendicular", carried back to the ground, swings the arrow to a new
// direction, the true one left as a ghost (c6). Last a stack and an arrow
// face each other across a "?" (c7).

const RINGS = [0.45, 0.8, 1.15, 1.5];
const P = { x: 1.2 * 0.62, y: 0.9 * 0.62 }; // on the ring of radius 0.93
const M = { x: 620, y: 470, s: 230 };
const mp = (x: number, y: number) => ({ x: M.x + x * M.s, y: M.y - y * M.s });
const I = { x: 1460, y: 470, s: 150 };

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const partA = fadeOut(frame, c1 + 6, 10);
  const slide = glide(frame, c0 + 30, fps, 24);
  const hill = fadeIn(frame, c1 + 10, 12) * fadeOut(frame, c3, 10);
  const drop = glide(frame, c2 + 80, fps, 40);
  const map = fadeIn(frame, c3 - 4, 10) * fadeOut(frame, c7, 10);
  const squash = glide(frame, c4 + 6, fps, 30);
  const pulse =
    0.6 +
    0.4 *
      Math.sin(Math.max(0, frame - c5) * 0.25) *
      fadeIn(frame, c5, 6) *
      fadeOut(frame, c6, 6);
  const swing = glide(frame, c6 + 20, fps, 30);
  // true uphill at P: toward the summit (0, 0); squashed-map rule gives
  // the map normal (X, 4Y) at P' = (x, y/2), i.e. (x, 4y) back on the ground
  const tru = { x: -P.x, y: -P.y };
  const alt = { x: -P.x, y: -4 * P.y };
  const nt = Math.hypot(tru.x, tru.y);
  const na = Math.hypot(alt.x, alt.y);
  const L = 0.7;
  const dir = {
    x: lerp(tru.x / nt, alt.x / na, swing),
    y: lerp(tru.y / nt, alt.y / na, swing),
  };
  const dn = Math.hypot(dir.x, dir.y);
  const H = 1.4;
  const z = (x: number, y: number) => H * (1 - (x * x + y * y) / 3.2);
  const dome = (u: number, v: number): V3 => {
    const r = u * 1.7;
    const t = v * Math.PI * 2;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    return [x, y, z(x, y)];
  };
  const ring = (r: number, h: number): V3[] =>
    Array.from({ length: 49 }, (_, i) => {
      const t = (i / 48) * Math.PI * 2;
      return [r * Math.cos(t), r * Math.sin(t), h];
    });
  const ell = (r: number) =>
    Array.from({ length: 73 }, (_, i) => {
      const t = (i / 72) * Math.PI * 2;
      return `${i ? "L" : "M"} ${(I.x + r * Math.cos(t) * I.s).toFixed(1)} ${(I.y - r * Math.sin(t) * I.s * lerp(1, 0.5, squash)).toFixed(1)}`;
    }).join(" ");

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="clink" at={c0 + 54} volume={0.18} />
      <Sfx name="riser" at={c2 + 80} volume={0.08} />
      <Sfx name="pop" at={c3 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="scratch" at={c6 + 20} volume={0.18} />
      <Sfx name="riser" at={c7 + 10} volume={0.1} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <Person
            x={360}
            y={800}
            color={colors.highlight}
            size={1.7}
            facing={1}
            beard
          />
          <Person
            x={1560}
            y={800}
            color={colors.primary}
            size={1.7}
            facing={-1}
          />
          <text
            x={360}
            y={540}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10)}
          >
            {tx.riesz}
          </text>
          <text
            x={1560}
            y={540}
            fill={colors.primary}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 10)}
          >
            {tx.frechet}
          </text>
          {[0, 1].map((k) => {
            const x = lerp(k ? 1380 : 540, k ? 980 : 940, slide);
            return (
              <g
                key={k}
                transform={`translate(${x} ${480 + k * 20}) rotate(${k ? 4 : -4})`}
                opacity={fadeIn(frame, c0 + 16)}
              >
                <rect
                  x={-150}
                  y={-200}
                  width={300}
                  height={400}
                  rx={8}
                  fill={colors.paper}
                  stroke={colors.wood}
                  strokeWidth={6}
                />
                {Array.from({ length: 7 }).map((_, j) => (
                  <line
                    key={j}
                    x1={-110}
                    y1={-140 + j * 44}
                    x2={lerp(
                      -110,
                      j % 3 === 2 ? 40 : 110,
                      glide(frame, c0 + 40 + j * 10 + k * 4, fps, 10),
                    )}
                    y2={-140 + j * 44}
                    stroke={alpha(colors.ink, 0.35)}
                    strokeWidth={6}
                  />
                ))}
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.year}
        </div>
      </AbsoluteFill>

      {/* the hill, its contours dropping to the floor as the camera rises */}
      <div style={{ position: "absolute", inset: 0, opacity: hill }}>
        <Stage3D
          azimuth={-1.2 + (frame - c1) * 0.003}
          elevation={lerp(0.5, 1.5, drop)}
          distance={7}
          target={[0, 0, lerp(0.4, 0, drop)]}
          style={{ left: -340 }}
        >
          <ParamSurface
            p={(u, v) => {
              const q = dome(u, v);
              return [q[0], q[1], q[2] * (1 - drop)];
            }}
            color={colors.green}
            opacity={0.4 * (1 - drop)}
          />
          {RINGS.map((r) => (
            <Tube
              key={r}
              points={ring(r, z(r, 0) * (1 - drop))}
              radius={0.02}
              color={colors.orange}
              closed
            />
          ))}
        </Stage3D>
      </div>

      {/* the map, the inset, the arrows */}
      <AbsoluteFill style={{ opacity: map }}>
        <svg width={1920} height={1080}>
          {RINGS.map((r) => (
            <circle
              key={r}
              cx={M.x}
              cy={M.y}
              r={r * M.s}
              fill="none"
              stroke={colors.orange}
              strokeWidth={5}
              opacity={pulse}
            />
          ))}
          <circle cx={M.x} cy={M.y} r={10} fill={colors.text} />
          <line
            x1={mp(P.x, P.y).x}
            y1={mp(P.x, P.y).y}
            x2={mp(P.x + (L * tru.x) / nt, P.y + (L * tru.y) / nt).x}
            y2={mp(P.x + (L * tru.x) / nt, P.y + (L * tru.y) / nt).y}
            stroke={alpha(colors.primary, 0.45)}
            strokeWidth={6}
            strokeDasharray="12 10"
            opacity={swing}
          />
          <Arrow
            from={mp(P.x, P.y)}
            to={mp(P.x + (L * dir.x) / dn, P.y + (L * dir.y) / dn)}
            width={16}
            color={swing > 0.05 ? colors.highlight : colors.primary}
          />
          <circle
            cx={mp(P.x, P.y).x}
            cy={mp(P.x, P.y).y}
            r={14}
            fill={colors.text}
          />
          <text
            x={mp(P.x, P.y).x + 24}
            y={mp(P.x, P.y).y + 40}
            fill={colors.primary}
            fontSize={44}
            fontWeight={800}
          >
            {tx.uphill}
          </text>
          <text
            x={M.x}
            y={M.y - 1.6 * M.s - 14}
            fill={colors.muted}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.ground}
          </text>
          <g opacity={fadeIn(frame, c4 + 2)}>
            <rect
              x={I.x - 1.75 * I.s}
              y={I.y - 1.75 * I.s * lerp(1, 0.5, squash)}
              width={3.5 * I.s}
              height={3.5 * I.s * lerp(1, 0.5, squash)}
              rx={16}
              fill={alpha(colors.wood, 0.2)}
              stroke={colors.wood}
              strokeWidth={5}
            />
            {RINGS.map((r) => (
              <path
                key={r}
                d={ell(r)}
                fill="none"
                stroke={colors.orange}
                strokeWidth={4}
              />
            ))}
            {(() => {
              const p = {
                x: I.x + P.x * I.s,
                y: I.y - P.y * I.s * lerp(1, 0.5, squash),
              };
              // the map's own perpendicular to the squashed ring at P
              const nx = -P.x;
              const ny = (-P.y * lerp(1, 0.5, squash)) / lerp(1, 0.25, squash);
              const n = Math.hypot(nx, ny);
              return (
                <Arrow
                  from={p}
                  to={{ x: p.x + (100 * nx) / n, y: p.y - (100 * ny) / n }}
                  width={12}
                  color={colors.highlight}
                />
              );
            })()}
            <text
              x={I.x}
              y={I.y + 1.75 * I.s * lerp(1, 0.5, squash) + 50}
              fill={colors.muted}
              fontSize={38}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.squash}
            </text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* stack or arrow? */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c7 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[-2, -1, 0, 1, 2].map((k) => (
            <line
              key={k}
              x1={560 + k * 50}
              y1={300}
              x2={560 + k * 50}
              y2={640}
              stroke={colors.orange}
              strokeWidth={k === 0 ? 10 : 7}
              strokeLinecap="round"
            />
          ))}
          <Arrow
            from={{ x: 1180, y: 470 }}
            to={{ x: 1480, y: 470 }}
            width={18}
          />
          <text
            x={870}
            y={520}
            fill={colors.highlight}
            fontSize={160}
            textAnchor="middle"
            fontWeight={900}
            opacity={fadeIn(frame, c7 + 30)}
          >
            ?
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
