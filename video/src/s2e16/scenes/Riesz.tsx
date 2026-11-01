import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// Arrow to stack. A lemon arrow v turning slowly, and its stack: the
// sheets v·x = k, standing perpendicular to v, closer together the longer
// v is. A fixed pink test arrow w, and a readout of how many sheets w
// crosses (v·w). Then the other way: three stacks on the left, three arrows
// on the right, and green links snapping between them one by one.

const O = { x: 720, y: 470 };
const S = 120;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const W = { x: 2.4, y: 0.8 };
const PAIRS = [
  { a: 1, b: 0.4 },
  { a: -0.5, b: 1 },
  { a: 0.7, b: -0.7 },
];

export const Riesz: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("riesz");
  const [c0, c1] = cues;
  const part1 = fadeOut(frame, c1, 10);
  const th = 0.9 - Math.max(0, frame - c0 - 20) * 0.012;
  const len = 1.2 + 0.4 * Math.sin(Math.max(0, frame - c0 - 20) * 0.03);
  const v = { x: len * Math.cos(th), y: len * Math.sin(th) };
  const dot = v.x * W.x + v.y * W.y;

  return (
    <SceneShell id="riesz">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pop" at={c0 + 40} volume={0.14} />
      {PAIRS.map((_, k) => (
        <Sfx key={k} name="clink" at={c1 + 40 + k * 20} volume={0.18} />
      ))}
      <Sfx name="chime" at={c1 + 110} volume={0.6} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="e16riesz">
              <circle cx={O.x} cy={O.y} r={360} />
            </clipPath>
          </defs>
          <g clipPath="url(#e16riesz)" opacity={fadeIn(frame, c0 + 10)}>
            <Stack a={v.x} b={v.y} scr={scr} range={10} />
          </g>
          <Arrow from={O} to={scr(v.x, v.y)} width={16} />
          <g opacity={fadeIn(frame, c0 + 40)}>
            <Arrow
              from={O}
              to={scr(W.x, W.y)}
              width={14}
              color={colors.highlight}
            />
            <text
              x={scr(W.x, W.y).x + 20}
              y={scr(W.x, W.y).y + 14}
              fill={colors.highlight}
              fontSize={52}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              w
            </text>
          </g>
          <text
            x={scr(v.x, v.y).x + 16}
            y={scr(v.x, v.y).y - 16}
            fill={colors.primary}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1260,
            width: 460,
            padding: "16px 0",
            borderRadius: 20,
            textAlign: "center",
            background: alpha(colors.bg, 0.85),
            border: `4px solid ${colors.orange}`,
            opacity: fadeIn(frame, c0 + 40),
            translate: riseIn(frame, c0 + 40, 12),
          }}
        >
          <div style={{ fontSize: 34, color: colors.muted, fontWeight: 800 }}>
            {tx.count}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 96,
              fontWeight: 800,
              color: colors.orange,
            }}
          >
            {dot.toFixed(1).replace("-", "−")}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {PAIRS.map((p, k) => {
            const y = 230 + k * 230;
            const ls = { x: 560, y };
            const ra = { x: 1360, y };
            const n = Math.hypot(p.a, p.b);
            const link = glide(frame, c1 + 40 + k * 20, fps, 10);
            return (
              <g key={k} opacity={fadeIn(frame, c1 + 10 + k * 6)}>
                <g
                  transform={`translate(${ls.x} ${ls.y}) rotate(${(-Math.atan2(p.b, p.a) * 180) / Math.PI})`}
                >
                  {[-2, -1, 0, 1, 2].map((j) => (
                    <line
                      key={j}
                      x1={(j * 34) / n}
                      y1={-80}
                      x2={(j * 34) / n}
                      y2={80}
                      stroke={colors.orange}
                      strokeWidth={j === 0 ? 9 : 6}
                      strokeLinecap="round"
                    />
                  ))}
                </g>
                <Arrow
                  from={ra}
                  to={{ x: ra.x + (110 * p.a) / n, y: ra.y - (110 * p.b) / n }}
                  width={14}
                />
                <line
                  x1={ls.x + 140}
                  y1={y}
                  x2={ls.x + 140 + (ra.x - ls.x - 280) * link}
                  y2={y}
                  stroke={colors.green}
                  strokeWidth={6}
                  strokeDasharray="14 10"
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 110),
            translate: riseIn(frame, c1 + 110, 14),
          }}
        >
          {tx.rieszThm}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
