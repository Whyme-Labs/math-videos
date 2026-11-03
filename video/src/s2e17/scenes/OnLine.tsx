import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Eq, type Tok } from "../../shared/components/Eq";
import { useStrings } from "../i18n";

// Projection onto one line, worked out. The line through a = (2, 1) and
// the arrow b = (1, 2) (c0). A candidate shadow p = x a slides back and
// forth along the line with x read out live (c1). The error b − x a joins
// p to b's tip, and the angle it makes with the line is read out; it goes
// green only at 90° (c2). The condition written as a formula, which then
// works itself out while p settles at x = 0.8 (c3–c4):
// (b − x a)·a = 0 → a·b − x a·a = 0 → x = a·b / a·a → x = 4/5.

const O = { x: 560, y: 600 };
const S = 170;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const A = { x: 2, y: 1 };
const Bv = { x: 1, y: 2 };

const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const OnLine: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("onLine");
  const [c0, c1, c2, c3, c4] = cues;
  const lock = glide(frame, c3 + 30, fps, 30);
  const wander = 0.8 + 0.55 * Math.sin(Math.max(0, frame - c1 - 6) * 0.05);
  const x = frame < c1 + 6 ? 0.3 : lerp(wander, 0.8, lock);
  const p = { x: x * A.x, y: x * A.y };
  const e = { x: Bv.x - p.x, y: Bv.y - p.y };
  const cos =
    (e.x * A.x + e.y * A.y) / (Math.hypot(e.x, e.y) * Math.hypot(A.x, A.y));
  const ang = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
  const right = Math.abs(ang - 90) < 1.5;
  const showP = fadeIn(frame, c1 + 6, 10);
  const showE = fadeIn(frame, c2 + 6, 10);
  const B = { x: "b", c: colors.text };
  const steps: Tok[][] = [
    [
      tok("(", "("),
      tok("b", B.x),
      tok("m", " − "),
      tok("x", "x", colors.orange),
      tok("a", " a"),
      tok(")", ")"),
      tok("d", " · a"),
      tok("eq", " = 0"),
    ],
    [
      tok("ab", "a·b"),
      tok("m", " − "),
      tok("x", "x", colors.orange),
      tok("aa", " a·a"),
      tok("eq", " = 0"),
    ],
    [
      tok("x", "x", colors.orange),
      tok("eq", " = "),
      tok("ab", "a·b"),
      tok("/", " / "),
      tok("aa", "a·a"),
    ],
    [
      tok("x", "x", colors.orange),
      tok("eq", " = "),
      tok("ab", "4"),
      tok("/", " / "),
      tok("aa", "5"),
    ],
  ];
  const mark = (deg: number) => {
    const u = { x: A.x / Math.hypot(A.x, A.y), y: A.y / Math.hypot(A.x, A.y) };
    const r = 34;
    const v = { x: -u.y, y: u.x };
    const P = scr(p.x, p.y);
    if (Math.abs(deg - 90) > 1.5) return null;
    return (
      <path
        d={`M ${P.x + r * u.x} ${P.y - r * u.y} L ${P.x + r * (u.x + v.x)} ${P.y - r * (u.y + v.y)} L ${P.x + r * v.x} ${P.y - r * v.y}`}
        fill="none"
        stroke={colors.text}
        strokeWidth={4}
      />
    );
  };

  return (
    <SceneShell id="onLine">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pop" at={c0 + 16} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="ding" at={c3 + 60} volume={0.3} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="pluck5" at={c4 + 60} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={scr(-1.2, -0.6).x}
          y1={scr(-1.2, -0.6).y}
          x2={scr(3, 1.5).x}
          y2={scr(3, 1.5).y}
          stroke={colors.primary}
          strokeWidth={5}
          opacity={0.5 * fadeIn(frame, c0 + 2, 10)}
        />
        <g opacity={fadeIn(frame, c0 + 6, 8)}>
          <Arrow
            from={O}
            to={scr(A.x, A.y)}
            width={14}
            color={colors.primary}
          />
          <text
            x={scr(A.x, A.y).x + 16}
            y={scr(A.x, A.y).y + 50}
            fill={colors.primary}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            a
          </text>
        </g>
        <g opacity={fadeIn(frame, c0 + 16, 8)}>
          <Arrow from={O} to={scr(Bv.x, Bv.y)} width={14} color={colors.text} />
          <text
            x={scr(Bv.x, Bv.y).x - 50}
            y={scr(Bv.x, Bv.y).y - 10}
            fill={colors.text}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            b
          </text>
        </g>
        <g opacity={showE}>
          <line
            x1={scr(p.x, p.y).x}
            y1={scr(p.x, p.y).y}
            x2={scr(Bv.x, Bv.y).x}
            y2={scr(Bv.x, Bv.y).y}
            stroke={colors.green}
            strokeWidth={7}
            strokeDasharray="14 10"
          />
          {mark(ang)}
        </g>
        <g opacity={showP}>
          <Arrow from={O} to={scr(p.x, p.y)} width={16} color={colors.orange} />
          <circle
            cx={scr(p.x, p.y).x}
            cy={scr(p.x, p.y).y}
            r={12}
            fill={colors.orange}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 1180,
          fontFamily: fonts.mono,
          fontSize: 52,
          fontWeight: 800,
          color: colors.orange,
          opacity: showP,
          translate: riseIn(frame, c1 + 6, 12),
        }}
      >
        x = {x.toFixed(2)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1180,
          fontSize: 48,
          fontWeight: 800,
          color: right ? colors.green : colors.muted,
          opacity: showE,
        }}
      >
        {tx.angle}:{" "}
        <span style={{ fontFamily: fonts.mono }}>{Math.round(ang)}°</span>
      </div>
      <Eq
        steps={steps}
        at={[c2 + 40, c3 + 10, c4 + 6, c4 + 60]}
        x={1470}
        y={440}
        size={72}
      />
    </SceneShell>
  );
};
