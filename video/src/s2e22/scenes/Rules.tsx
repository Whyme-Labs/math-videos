import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { NumberLine } from "../components/line";
import { useStrings } from "../i18n";

// The rules for size, each acted out on a number line. An interval
// [a, b] measured with a ruler: b − a (c0). A set of three pieces slides
// along, its total size read out unchanged (c1). Infinitely many pieces
// ½, ¼, ⅛, … laid end to end, their sizes adding to 1 (c2). The pieces
// are counted 1, 2, 3, … as they land: countable (c3).

const X0 = 200;
const X1 = 1300;
const sx = (x: number) => X0 + (X1 - X0) * x;

export const Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rules");
  const [c0, c1, c2, c3] = cues;
  const slide =
    Math.sin(Math.max(0, frame - c1 - 6) * 0.04) *
    0.15 *
    fadeIn(frame, c1 + 6, 10);
  const n = Math.min(10, Math.floor(Math.max(0, frame - c2 - 6) / 10) + 1);
  const sum = 1 - 0.5 ** n;
  const pieces = [
    [0.05, 0.15],
    [0.3, 0.38],
    [0.5, 0.62],
  ];
  const grow = glide(frame, c0 + 6, fps, 20);

  return (
    <SceneShell id="rules">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.1} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="chime" at={c3 + 30} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* 1: an interval */}
        <g opacity={fadeIn(frame, c0 + 4, 8)}>
          <NumberLine x0={X0} x1={X1} y={260} />
          <rect
            x={sx(0.25)}
            y={240}
            width={(X1 - X0) * 0.4 * grow}
            height={40}
            fill={colors.primary}
          />
        </g>
        {/* 2: sliding */}
        <g opacity={fadeIn(frame, c1 + 4, 8)}>
          <line
            x1={X0}
            y1={480}
            x2={X1}
            y2={480}
            stroke={colors.paper}
            strokeWidth={5}
          />
          {pieces.map(([a, b], i) => (
            <rect
              key={i}
              x={sx(a + 0.2 + slide)}
              y={460}
              width={(X1 - X0) * (b - a)}
              height={40}
              fill={colors.green}
            />
          ))}
        </g>
        {/* 3: countably many pieces */}
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <line
            x1={X0}
            y1={700}
            x2={X1}
            y2={700}
            stroke={colors.paper}
            strokeWidth={5}
          />
          {Array.from({ length: n }).map((_, i) => {
            const a = 1 - 0.5 ** i;
            const b = 1 - 0.5 ** (i + 1);
            return (
              <g key={i}>
                <rect
                  x={sx(a) + 1}
                  y={680}
                  width={Math.max(1, (X1 - X0) * (b - a) - 2)}
                  height={40}
                  fill={i % 2 ? colors.orange : colors.highlight}
                />
                {i < 5 ? (
                  <text
                    x={sx((a + b) / 2)}
                    y={660}
                    fill={colors.muted}
                    fontSize={30}
                    fontFamily={fonts.mono}
                    textAnchor="middle"
                    opacity={fadeIn(frame, c3 + 6 + i * 6, 6)}
                  >
                    {i + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 232,
          left: 1320,
          display: "flex",
          flexDirection: "column",
          gap: 168,
          fontFamily: fonts.math,
          fontSize: 36,
          fontWeight: 800,
        }}
      >
        {tx.rules.map((r, i) => (
          <div
            key={r}
            style={{
              color: [colors.primary, colors.green, colors.highlight][i],
              opacity: fadeIn(frame, [c0, c1, c2][i] + 10),
              translate: riseIn(frame, [c0, c1, c2][i] + 10, 12),
              whiteSpace: "nowrap",
            }}
          >
            {r}
            {i === 0 ? (
              <span style={{ fontFamily: fonts.mono, marginLeft: 20 }}>
                = {lerp(0, 0.4, grow).toFixed(2)}
              </span>
            ) : null}
            {i === 1 ? (
              <span style={{ fontFamily: fonts.mono, marginLeft: 20 }}>
                = 0.30
              </span>
            ) : null}
            {i === 2 ? (
              <span style={{ fontFamily: fonts.mono, marginLeft: 20 }}>
                = {sum.toFixed(3)}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 1360,
          fontSize: 44,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c3 + 30),
        }}
      >
        1, 2, 3, … · {tx.countable}
      </div>
    </SceneShell>
  );
};
