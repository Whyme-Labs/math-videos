import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// Chinese edition only. 规矩: Mencius (《孟子·离娄上》) says nobody draws a
// square or a circle without 规 (the compass) and 矩 (the carpenter's square).
// Then the Tang silk paintings of Fuxi and Nüwa from Astana, Turfan: their
// tails twined, Fuxi holding the 矩 and Nüwa the 规. The 矩 rules a square,
// the 规 draws a circle; the two shapes drift together and the word 域 lights
// between them: what the tools can and can't reach needs a field to say.

const FUXI = { x: 520, y: 760 };
const NUWA = { x: 1400, y: 760 };

export const Guiju: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("guiju");
  const [c0, c1, c2] = cues;
  const pair = glide(frame, c1 + 4, fps, 20);
  const square = glide(frame, c1 + 40, fps, 30);
  const circle = glide(frame, c1 + 70, fps, 30);
  const meet = glide(frame, c2 + 10, fps, 24);
  const field = Math.min(1, springIn(frame, c2 + 50, fps, 10));
  const sq = { x: lerp(640, 860, meet), y: 300 };
  const ci = { x: lerp(1280, 1060, meet), y: 300 };

  return (
    <SceneShell id="guiju">
      <Sfx name="page" at={c0 + 6} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.14} />
      <Sfx name="scratch" at={c1 + 40} volume={0.18} />
      <Sfx name="scratch" at={c1 + 70} volume={0.18} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.14} />
      <Sfx name="sparkle" at={c2 + 50} />

      {/* Mencius */}
      <AbsoluteFill style={{ opacity: fadeOut(frame, c1, 10) }}>
        <div
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 96,
            color: colors.text,
          }}
        >
          {typed(tx.mencius, frame, c0 + 20, fps, 8)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 500,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 48,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 70),
            translate: riseIn(frame, c0 + 70, 16),
          }}
        >
          {tx.menciusSource}
        </div>
      </AbsoluteFill>

      {/* Fuxi and Nüwa */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* the twined tails */}
          <g opacity={pair}>
            {[0, 1].map((k) => (
              <path
                key={k}
                d={Array.from({ length: 25 })
                  .map((_, i) => {
                    const t = i / 24;
                    const x =
                      lerp(FUXI.x, NUWA.x, 0.5) +
                      (k ? 1 : -1) *
                        Math.cos(t * Math.PI * 3) *
                        lerp(300, 30, t);
                    const y = lerp(FUXI.y - 40, 850, t);
                    return `${i ? "L" : "M"} ${x} ${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke={k ? colors.highlight : colors.orange}
                strokeWidth={22}
                strokeLinecap="round"
                opacity={0.8}
              />
            ))}
          </g>
          <g transform={`translate(${lerp(-300, 0, pair)} 0)`}>
            <Person x={FUXI.x} y={FUXI.y} color={colors.orange} size={2} />
            {/* the 矩: an L-shaped square */}
            <path
              d={`M ${FUXI.x + 90} ${FUXI.y - 330} l 0 180 l 120 0`}
              fill="none"
              stroke={colors.wood}
              strokeWidth={18}
              strokeLinecap="square"
            />
          </g>
          <g transform={`translate(${lerp(300, 0, pair)} 0)`}>
            <Person
              x={NUWA.x}
              y={NUWA.y}
              color={colors.highlight}
              size={2}
              facing={-1}
            />
            {/* the 规: a compass */}
            <path
              d={`M ${NUWA.x - 120} ${NUWA.y - 160} L ${NUWA.x - 170} ${NUWA.y - 340} L ${NUWA.x - 220} ${NUWA.y - 160}`}
              fill="none"
              stroke={colors.wood}
              strokeWidth={14}
              strokeLinejoin="round"
            />
          </g>
          {[
            { t: tx.ju, x: FUXI.x + 250, at: c1 + 30 },
            { t: tx.gui, x: NUWA.x - 300, at: c1 + 36 },
          ].map((l) => (
            <text
              key={l.t}
              x={l.x}
              y={FUXI.y - 220}
              fill={colors.primary}
              fontSize={72}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
              opacity={fadeIn(frame, l.at) * fadeOut(frame, c2 + 10, 10)}
            >
              {l.t}
            </text>
          ))}
          {/* what they draw: a square and a circle */}
          <rect
            x={sq.x - 110}
            y={sq.y - 110}
            width={220}
            height={220}
            fill={alpha(colors.orange, 0.15)}
            stroke={colors.orange}
            strokeWidth={8}
            strokeDasharray={`${880 * square} 880`}
            opacity={square > 0 ? 1 : 0}
          />
          <circle
            cx={ci.x}
            cy={ci.y}
            r={110}
            fill={alpha(colors.highlight, 0.15)}
            stroke={colors.highlight}
            strokeWidth={8}
            strokeDasharray={`${691 * circle} 691`}
            transform={`rotate(-90 ${ci.x} ${ci.y})`}
            opacity={circle > 0 ? 1 : 0}
          />
          <g opacity={field} transform={`translate(960 600) scale(${field})`}>
            <text
              x={0}
              y={0}
              fill={colors.primary}
              fontSize={150}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.field}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 36,
            color: colors.muted,
            opacity: fadeIn(frame, c1 + 20),
          }}
        >
          {tx.silk}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
