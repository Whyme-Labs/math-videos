import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { linear, type Mat2 } from "../../shared/components/Plane";
import { Arrow } from "../../s2e01/components/vec";
import {
  Arrow3,
  FloorGrid,
  ParamSurface,
  Stage3D,
  type V3,
} from "../../shared/components/three3d";
import { svd2 } from "../components/svd";
import { useStrings } from "../i18n";

// Why two bases. An arrow v turns and its image Av turns with it but
// never lines up, the angle between them read out (c0). A 3 × 2 matrix:
// the disc on the left, its image a flat ellipse tilted in 3D on the
// right; v and Av don't even live in the same space (c1). Two panels,
// input and output: a perpendicular pair v₁, v₂ on the input circle, a
// perpendicular pair u₁, u₂ on the output ellipse (c2), linked by dashed
// arcs with Av₁ = σ₁u₁, Av₂ = σ₂u₂ (c3). A point runs round the input
// circle and its image runs round the ellipse; when it crosses an input
// axis, the image crosses the matching output axis (c4).

const M: Mat2 = [1.2, 0.8, -0.3, 1.0];
const f = linear(M);
const { s1, s2, v1, v2, Av1, Av2 } = svd2(M);
const S = 150;
const IN = { x: 520, y: 480 };
const OUT = { x: 1380, y: 480 };
const at = (c: { x: number; y: number }) => (x: number, y: number) => ({
  x: c.x + x * S,
  y: c.y - y * S,
});
const sIn = at(IN);
const sOut = at(OUT);
const B = (x: number, y: number): V3 => [x + y, y, x];

export const TwoBases: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("twoBases");
  const [c0, c1, c2, c3, c4] = cues;
  const part0 = fadeIn(frame, c0 + 4, 10) * fadeOut(frame, c1, 10);
  const part1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10);
  const th = (frame - c0) * 0.03;
  const v = { x: Math.cos(th), y: Math.sin(th) };
  const Av = f(v.x, v.y);
  const ang = Math.abs(
    ((Math.atan2(Av.y, Av.x) - th + 3 * Math.PI) % (2 * Math.PI)) - Math.PI,
  );
  const C = { x: 960, y: 480 };
  const s0 = at(C);
  const run = (frame - c4) * 0.035;
  const p = { x: Math.cos(run), y: Math.sin(run) };
  const fp = f(p.x, p.y);
  const ell = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const q = sOut(
      f(Math.cos(t), Math.sin(t)).x,
      f(Math.cos(t), Math.sin(t)).y,
    );
    return `${i ? "L" : "M"} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }).join(" ");
  const u1 = { x: Av1.x / s1, y: Av1.y / s1 };
  const u2 = { x: Av2.x / s2, y: Av2.y / s2 };
  const link = glide(frame, c3 + 6, fps, 24);
  const th1 = (frame - c1) * 0.03;

  return (
    <SceneShell id="twoBases">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.1} />
      <Sfx name="pluck2" at={c2 + 10} volume={0.14} />
      <Sfx name="pluck4" at={c2 + 24} volume={0.14} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="ding" at={c3 + 34} volume={0.26} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />

      <AbsoluteFill style={{ opacity: part0 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={C.x}
            cy={C.y}
            r={S}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <Arrow
            from={C}
            to={s0(v.x * 1.4, v.y * 1.4)}
            width={14}
            color={colors.text}
          />
          <Arrow
            from={C}
            to={s0(Av.x * 1.4, Av.y * 1.4)}
            width={14}
            color={colors.primary}
          />
          <text
            x={s0(v.x * 1.65, v.y * 1.65).x}
            y={s0(v.x * 1.65, v.y * 1.65).y}
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            v
          </text>
          <text
            x={s0(Av.x * 1.55, Av.y * 1.55).x}
            y={s0(Av.x * 1.55, Av.y * 1.55).y}
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            Av
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1300,
            fontSize: 46,
            fontWeight: 800,
            color: colors.highlight,
          }}
        >
          {tx.notParallel}:{" "}
          <span style={{ fontFamily: fonts.mono }}>
            {Math.round((ang * 180) / Math.PI)}°
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={IN.x}
            cy={IN.y}
            r={S}
            fill={alpha(colors.primary, 0.1)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <Arrow
            from={IN}
            to={sIn(Math.cos(th1), Math.sin(th1))}
            width={14}
            color={colors.text}
          />
          <text
            x={IN.x}
            y={IN.y + S + 80}
            fill={colors.muted}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            ℝ²
          </text>
          <text
            x={1400}
            y={IN.y + S + 80}
            fill={colors.muted}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            textAnchor="middle"
          >
            ℝ³
          </text>
        </svg>
        <Stage3D
          azimuth={-0.6 + (frame - c1) * 0.002}
          elevation={0.4}
          distance={6}
          target={[0.5, 0.3, 0.3]}
          style={{ left: 440, top: -40 }}
        >
          <FloorGrid n={2} color={colors.paper} opacity={0.12} />
          <ParamSurface
            p={(a, b) =>
              B(a * Math.cos(b * Math.PI * 2), a * Math.sin(b * Math.PI * 2))
            }
            res={32}
            color={colors.primary}
            opacity={0.4}
          />
          <Arrow3
            from={[0, 0, 0]}
            to={B(Math.cos(th1), Math.sin(th1))}
            color={colors.primary}
            radius={0.03}
          />
        </Stage3D>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <circle
            cx={IN.x}
            cy={IN.y}
            r={S}
            fill={alpha(colors.paper, 0.06)}
            stroke={colors.paper}
            strokeWidth={5}
          />
          <path
            d={ell}
            fill={alpha(colors.primary, 0.08)}
            stroke={colors.primary}
            strokeWidth={6}
          />
          <g opacity={fadeIn(frame, c2 + 10, 8)}>
            <Arrow
              from={IN}
              to={sIn(v1.x, v1.y)}
              width={14}
              color={colors.green}
            />
            <Arrow
              from={IN}
              to={sIn(v2.x, v2.y)}
              width={14}
              color={colors.highlight}
            />
          </g>
          <g opacity={fadeIn(frame, c2 + 24, 8)}>
            <Arrow
              from={OUT}
              to={sOut(Av1.x, Av1.y)}
              width={14}
              color={colors.green}
            />
            <Arrow
              from={OUT}
              to={sOut(Av2.x, Av2.y)}
              width={14}
              color={colors.highlight}
            />
            <path
              d={`M ${sOut(0.16 * u1.x, 0.16 * u1.y).x} ${sOut(0.16 * u1.x, 0.16 * u1.y).y} L ${sOut(0.16 * (u1.x + u2.x), 0.16 * (u1.y + u2.y)).x} ${sOut(0.16 * (u1.x + u2.x), 0.16 * (u1.y + u2.y)).y} L ${sOut(0.16 * u2.x, 0.16 * u2.y).x} ${sOut(0.16 * u2.x, 0.16 * u2.y).y}`}
              fill="none"
              stroke={colors.text}
              strokeWidth={4}
            />
          </g>
          {[
            { a: sIn(v1.x, v1.y), b: sOut(Av1.x, Av1.y), c: colors.green },
            { a: sIn(v2.x, v2.y), b: sOut(Av2.x, Av2.y), c: colors.highlight },
          ].map(({ a, b, c }, i) => {
            const mx = (a.x + b.x) / 2;
            const my = Math.min(a.y, b.y) - 140 - i * 40;
            return (
              <path
                key={i}
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke={c}
                strokeWidth={4}
                strokeDasharray="12 10"
                pathLength={1}
                strokeDashoffset={0}
                opacity={link}
              />
            );
          })}
          <g opacity={fadeIn(frame, c4 + 6, 8)}>
            <circle
              cx={sIn(p.x, p.y).x}
              cy={sIn(p.x, p.y).y}
              r={14}
              fill={colors.text}
            />
            <circle
              cx={sOut(fp.x, fp.y).x}
              cy={sOut(fp.x, fp.y).y}
              r={14}
              fill={colors.text}
            />
          </g>
          <text
            x={IN.x}
            y={IN.y + S + 110}
            fill={colors.muted}
            fontSize={42}
            fontWeight={800}
            textAnchor="middle"
          >
            {tx.input}
          </text>
          <text
            x={OUT.x}
            y={IN.y + S + 110}
            fill={colors.muted}
            fontSize={42}
            fontWeight={800}
            textAnchor="middle"
          >
            {tx.output}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            opacity: fadeIn(frame, c3 + 30),
            translate: riseIn(frame, c3 + 30, 14),
          }}
        >
          <span style={{ color: colors.green }}>Av₁ = σ₁u₁</span>
          <span style={{ color: colors.muted }}>{"   ·   "}</span>
          <span style={{ color: colors.highlight }}>Av₂ = σ₂u₂</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
