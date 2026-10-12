import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { NextArrow } from "../components/graph";
import { useStrings } from "../i18n";

// Chinese edition only: counting before numerals. Knots on a cord (结绳记事),
// then 道生一，一生二，二生三，三生万物 read as a chain of "next".

const ROPE_Y = 330;
const KNOTS = 7;
const knotX = (i: number) => 380 + i * 190;
const ropeY = (x: number) => ROPE_Y + Math.sin(x / 70) * 10;
const CHAIN_Y = 470;
const chainX = (i: number) => 330 + i * 315;
const NUMERALS = ["0", "1", "2", "3", "…"];

// A few dozen "things" spreading out of 万物, fixed positions (no randomness).
const SPARKS = Array.from({ length: 36 }, (_, k) => {
  const a = (k * 137.5 * Math.PI) / 180;
  const r = 70 + ((k * 53) % 150);
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r * 0.6 };
});

export const Ancient: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ancient");
  const [c0, c1, c2] = cues;

  const knotAt = (i: number) => c0 + 16 + i * 9;
  const ropeDraw = ramp(frame, c0 + 2, 18);
  const ropeAway = glide(frame, c1 - 4, fps, 20);
  const linkAt = (i: number) => c1 + 8 + i * 13;
  const toNumbers = ramp(frame, c2 + 10, 14);
  const burst = ramp(frame, linkAt(4), 30);

  const ropePath = Array.from({ length: 80 }, (_, k) => {
    const x = 180 + (k / 79) * 1560;
    return `${k === 0 ? "M" : "L"} ${x} ${ropeY(x)}`;
  }).join(" ");

  return (
    <SceneShell id="ancient">
      <Sfx name="whoosh" at={c0 + 2} volume={0.15} />
      {Array.from({ length: KNOTS }).map((_, i) => (
        <Sfx
          key={`k${i}`}
          name={i < 6 ? PLUCKS[i] : "tick"}
          at={knotAt(i)}
          volume={0.26}
        />
      ))}
      <Sfx name="page" at={c1 + 2} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx
          key={`l${i}`}
          name={PLUCKS[i + 1]}
          at={linkAt(i + 1)}
          volume={0.26}
        />
      ))}
      <Sfx name="sparkle" at={linkAt(4)} />
      <Sfx name="chime" at={c2 + 10} />

      <AbsoluteFill>
        {/* Source line for the knots */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 120,
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 6) * (1 - ropeAway),
            translate: riseIn(frame, c0 + 6),
          }}
        >
          {tx.ropeSource}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* The cord with its knots; it lifts away and stays faintly behind. */}
          <g
            opacity={1 - 0.75 * ropeAway}
            transform={`translate(0 ${-130 * ropeAway})`}
          >
            <path
              d={ropePath}
              fill="none"
              stroke={colors.wood}
              strokeWidth={8}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - ropeDraw}
            />
            {Array.from({ length: KNOTS }).map((_, i) => {
              const s = springIn(frame, knotAt(i), fps, 9);
              const x = knotX(i);
              return (
                <g
                  key={i}
                  transform={`translate(${x} ${ropeY(x)}) scale(${s})`}
                >
                  <ellipse rx={26} ry={22} fill={colors.orange} />
                  <ellipse rx={14} ry={11} fill={colors.primary} />
                </g>
              );
            })}
          </g>
          <text
            x={960}
            y={ROPE_Y + 110}
            fill={colors.highlight}
            fontSize={40}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={fadeIn(frame, knotAt(KNOTS - 1) + 8) * (1 - ropeAway)}
          >
            {tx.knotIsNext}
          </text>

          {/* 道 → 一 → 二 → 三 → 万物, which then reads as 0 → 1 → 2 → 3 → … */}
          {tx.daoChain.map((word, i) => {
            const s = springIn(frame, linkAt(i), fps, 10);
            const x = chainX(i);
            return (
              <g key={word}>
                {i > 0 ? (
                  <>
                    <NextArrow
                      a={{ x: chainX(i - 1), y: CHAIN_Y }}
                      b={{ x, y: CHAIN_Y }}
                      r={72}
                      progress={ramp(frame, linkAt(i) - 8, 10)}
                    />
                    <text
                      x={x - 157}
                      y={CHAIN_Y - 26}
                      fill={colors.highlight}
                      fontSize={34}
                      textAnchor="middle"
                      fontFamily={fonts.title}
                      opacity={fadeIn(frame, linkAt(i) - 2) * (1 - toNumbers)}
                    >
                      {tx.sheng}
                    </text>
                    <text
                      x={x - 157}
                      y={CHAIN_Y - 26}
                      fill={colors.highlight}
                      fontSize={30}
                      textAnchor="middle"
                      fontFamily={fonts.title}
                      opacity={toNumbers}
                    >
                      {tx.nextWord}
                    </text>
                  </>
                ) : null}
                <g transform={`translate(${x} ${CHAIN_Y}) scale(${s})`}>
                  <circle
                    r={66}
                    fill={alpha(colors.primary, 0.12)}
                    stroke={colors.primary}
                    strokeWidth={3}
                  />
                  <text
                    y={word.length > 1 ? 16 : 30}
                    fill={colors.primary}
                    fontSize={word.length > 1 ? 44 : 84}
                    textAnchor="middle"
                    fontFamily={fonts.title}
                    fontWeight={700}
                    opacity={1 - toNumbers}
                  >
                    {word}
                  </text>
                  <text
                    y={28}
                    fill={colors.primary}
                    fontSize={80}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={toNumbers}
                  >
                    {NUMERALS[i]}
                  </text>
                </g>
              </g>
            );
          })}
          {/* 万物: the things it begets spread out, then settle as "…". */}
          <g opacity={(burst > 0 ? 1 : 0) * (1 - toNumbers)}>
            {SPARKS.map((p, k) => (
              <circle
                key={k}
                cx={chainX(4) + lerp(0, p.dx, burst)}
                cy={CHAIN_Y + lerp(0, p.dy, burst)}
                r={5}
                fill={k % 3 === 0 ? colors.orange : colors.primary}
                opacity={0.8}
              />
            ))}
          </g>
          <text
            x={chainX(0)}
            y={CHAIN_Y + 120}
            fill={colors.primary}
            fontSize={34}
            textAnchor="middle"
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c2 + 20)}
          >
            {tx.startWord}
          </text>
        </svg>

        <div
          style={{
            position: "absolute",
            top: CHAIN_Y + 170,
            width: "100%",
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, c1 + 30) * (1 - toNumbers),
          }}
        >
          {tx.laoziSource}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
