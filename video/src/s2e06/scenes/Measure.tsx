import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../components/stack";
import { useStrings } from "../i18n";

// A covector is a measuring device. First as a machine: a basket (a lemon
// column) slides into an orange box and a number drops out, 10.5; a second
// basket gives 4; their sum gives 14.5, the sum of the readings, written
// under them like a sum on paper. Then as a
// picture: a plane with an orange stack of evenly spaced sheets. A lemon
// arrow grows from the origin and a counter ticks 1, 2, 2.5 as its tip
// crosses sheets; then it swings round and the count goes negative.

const O = { x: 760, y: 560 };
const S = 110;
const PHI = { a: 0.9, b: 0.45 };
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Measure: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("measure");
  const [c0, c1] = cues;
  const feeds = [
    { at: c0 + 20, v: [2, 1, 0.5], out: "10.5" },
    { at: c0 + 60, v: [0, 2, 0], out: "4" },
    { at: c0 + 100, v: [2, 3, 0.5], out: "14.5" },
  ];
  const part1 = fadeOut(frame, c1, 10);
  // the arrow: grows along a fixed direction, then swings to the opposite side
  const grow = ramp(frame, c1 + 20, 60);
  const swing = glide(frame, c1 + 100, fps, 30);
  const dir0 = Math.atan2(0.5, 1);
  const ang = lerp(dir0, dir0 + Math.PI * 0.9, swing);
  const len = lerp(0.2, 3.3, grow) * (1 - 0.45 * swing);
  const tip = { x: len * Math.cos(ang), y: len * Math.sin(ang) };
  const reading = PHI.a * tip.x + PHI.b * tip.y;
  const crossings = [1, 2, 3];

  return (
    <SceneShell id="measure">
      {feeds.map((f, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={f.at + 22} volume={0.16} />
      ))}
      <Sfx name="ding" at={c0 + 122} />
      {crossings.map((k) => (
        <Sfx
          key={`x${k}`}
          name="tick"
          at={c1 + 20 + Math.round(((k - 0.2) / 3.1) * 60)}
          volume={0.12}
        />
      ))}
      <Sfx name="whoosh" at={c1 + 100} volume={0.12} />

      {/* the machine */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={760}
            y={300}
            width={400}
            height={280}
            rx={30}
            fill={alpha(colors.orange, 0.2)}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <g opacity={fadeIn(frame, c0 + 100, 8)}>
            <line
              x1={1380}
              y1={500}
              x2={1680}
              y2={500}
              stroke={colors.text}
              strokeWidth={5}
            />
            <text
              x={1360}
              y={450}
              fill={colors.text}
              fontSize={70}
              textAnchor="end"
              fontWeight={800}
            >
              +
            </text>
          </g>
          <text
            x={960}
            y={460}
            fill={colors.orange}
            fontSize={56}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.covector}
          </text>
          {feeds.map((f, k) => {
            const t = glide(frame, f.at, fps, 22);
            const out = Math.min(1, springIn(frame, f.at + 22, fps, 10));
            return (
              <g key={k}>
                <g
                  opacity={(t > 0 ? 1 : 0) * (t < 0.98 ? 1 : 0)}
                  transform={`translate(${lerp(300, 820, t)} 440)`}
                >
                  <path
                    d="M -60 -110 l -14 0 l 0 220 l 14 0 M 60 -110 l 14 0 l 0 220 l -14 0"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth={6}
                  />
                  {f.v.map((v, i) => (
                    <text
                      key={i}
                      y={-40 + i * 70}
                      fill={colors.text}
                      fontSize={48}
                      textAnchor="middle"
                      fontFamily={fonts.mono}
                      fontWeight={800}
                    >
                      {v}
                    </text>
                  ))}
                </g>
                <text
                  x={lerp(1160, 1440, out)}
                  y={[350, 450, 590][k]}
                  fill={colors.primary}
                  fontSize={80}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                  opacity={out}
                >
                  {f.out}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the picture: a stack of sheets */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="measureStage">
              <rect x={120} y={90} width={1680} height={740} />
            </clipPath>
          </defs>
          <g clipPath="url(#measureStage)">
            <Stack a={PHI.a} b={PHI.b} scr={scr} />
          </g>
          <Arrow from={O} to={scr(tip.x, tip.y)} width={14} />
          <circle cx={O.x} cy={O.y} r={12} fill={colors.primary} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1300,
            width: 420,
            padding: "18px 0",
            borderRadius: 20,
            textAlign: "center",
            background: alpha(colors.bg, 0.85),
            border: `4px solid ${colors.orange}`,
            opacity: fadeIn(frame, c1 + 14),
            translate: riseIn(frame, c1 + 14, 16),
          }}
        >
          <div style={{ fontSize: 34, color: colors.muted, fontWeight: 700 }}>
            {tx.sheets}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 96,
              fontWeight: 800,
              color: reading < 0 ? colors.red : colors.primary,
            }}
          >
            {reading < 0 ? "−" : ""}
            {Math.abs(Math.round(reading * 10) / 10).toFixed(1)}
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
