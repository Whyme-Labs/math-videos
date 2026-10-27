import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { useStrings } from "../i18n";

// A map that forgets. Two tokens, 5 and 7. Left route: they add to 12 on
// the integer line, then 12 drops onto the four-hour clock and lands on 0.
// Right route: 5 and 7 each drop onto a clock first (1 and 3), and the clock
// adds them: 1 + 3 lands on 0. Same place. Then the kernel: on a long
// integer line, every multiple of 4 lights up and pours into the clock's 0.

const Token: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly v: string;
  readonly s?: number;
  readonly color?: string;
}> = ({ x, y, v, s = 1, color = colors.highlight }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle
      cx={0}
      cy={0}
      r={50}
      fill={color}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <text
      x={0}
      y={20}
      fill={colors.ink}
      fontSize={52}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {v}
    </text>
  </g>
);

export const Forget: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("forget");
  const [c0, c1] = cues;
  // left route
  const lMerge = glide(frame, c0 + 30, fps, 20);
  const lDrop = glide(frame, c0 + 80, fps, 20);
  // right route
  const r5 = glide(frame, c0 + 130, fps, 16);
  const r7 = glide(frame, c0 + 160, fps, 16);
  const rClock = 1 * r5 + 3 * r7;
  const same = Math.min(1, springIn(frame, c0 + 190, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  // the kernel pours into 0
  const pourAt = (k: number) => c1 + 40 + k * 14;

  return (
    <SceneShell id="forget">
      <Sfx name="clink" at={c0 + 40} volume={0.16} />
      <Sfx name="thud" at={c0 + 100} volume={0.25} />
      <Sfx name="pluck2" at={c0 + 140} volume={0.14} />
      <Sfx name="pluck4" at={c0 + 170} volume={0.14} />
      <Sfx name="ding" at={c0 + 190} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx key={k} name="pop" at={pourAt(k) + 10} volume={0.12} />
      ))}
      <Sfx name="chime" at={pourAt(4) + 20} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={120}
            y1={250}
            x2={1800}
            y2={250}
            stroke={colors.primary}
            strokeWidth={4}
          />
          {/* the two routes */}
          <Clock x={520} y={640} r={150} n={4} pos={0} />
          <Clock x={1400} y={640} r={150} n={4} pos={rClock} />
          {/* left: add on the integers, then convert */}
          {frame < c0 + 80 ? (
            <>
              <Token
                x={lerp(380, 520, lMerge)}
                y={250}
                v="5"
                s={1 - lMerge * 0.5}
              />
              <Token
                x={lerp(660, 520, lMerge)}
                y={250}
                v="7"
                s={1 - lMerge * 0.5}
              />
              <g opacity={lMerge}>
                <Token
                  x={520}
                  y={250}
                  v="12"
                  s={lMerge}
                  color={colors.orange}
                />
              </g>
            </>
          ) : (
            <Token
              x={520}
              y={lerp(250, 640, lDrop)}
              v={lDrop >= 1 ? "0" : "12"}
              s={lerp(1, 0.7, lDrop)}
              color={colors.orange}
            />
          )}
          {/* right: convert each, then add on the clock */}
          <Token
            x={1260}
            y={lerp(250, 520, r5)}
            v={r5 >= 1 ? "1" : "5"}
            s={lerp(1, 0.6, r5)}
          />
          <Token
            x={1540}
            y={lerp(250, 520, r7)}
            v={r7 >= 1 ? "3" : "7"}
            s={lerp(1, 0.6, r7)}
          />
          <text
            x={520}
            y={880 - 40}
            fill={colors.text}
            fontSize={40}
            textAnchor="middle"
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 30)}
          >
            {tx.addThenMap}
          </text>
          <text
            x={1400}
            y={880 - 40}
            fill={colors.text}
            fontSize={40}
            textAnchor="middle"
            fontWeight={700}
            opacity={fadeIn(frame, c0 + 130)}
          >
            {tx.mapThenAdd}
          </text>
          <text
            x={960}
            y={680}
            fill={colors.green}
            fontSize={130}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={same}
            transform={`scale(${same})`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            =
          </text>
        </svg>
      </AbsoluteFill>

      {/* the kernel: every multiple of 4 falls into 0 */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <line
            x1={80}
            y1={300}
            x2={1840}
            y2={300}
            stroke={colors.primary}
            strokeWidth={4}
          />
          {Array.from({ length: 21 }).map((_, i) => {
            const n = i - 10;
            const x = 960 + n * 80;
            const ker = n % 4 === 0;
            const k = (n + 8) / 4;
            const t = ker ? glide(frame, pourAt(k), fps, 14) : 0;
            const p = hop(t, x, 300, 960, 640 - 110, 120);
            return (
              <g key={n}>
                <text
                  x={x}
                  y={260}
                  fill={ker ? colors.highlight : colors.muted}
                  fontSize={34}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={ker ? 800 : 400}
                >
                  {n < 0 ? `−${-n}` : n}
                </text>
                <circle
                  cx={x}
                  cy={300}
                  r={ker ? 16 : 9}
                  fill={
                    ker ? alpha(colors.highlight, 1 - t * 0.7) : colors.primary
                  }
                />
                {ker ? (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={16}
                    fill={colors.highlight}
                    opacity={t > 0 && t < 1 ? 1 : 0}
                  />
                ) : null}
              </g>
            );
          })}
          <Clock x={960} y={640} r={150} n={4} pos={0} />
          <circle
            cx={960}
            cy={640 - 110}
            r={34}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={fadeIn(frame, pourAt(0) + 10)}
          />
          <text
            x={1200}
            y={560}
            fill={colors.highlight}
            fontSize={60}
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, pourAt(4) + 16)}
          >
            {tx.kernel}
          </text>
          <text
            x={1200}
            y={630}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, pourAt(4) + 16)}
          >
            {"{…, −8, −4, 0, 4, 8, …}"}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 8),
            translate: riseIn(frame, c1 + 8, 16),
          }}
        >
          {tx.hom}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
