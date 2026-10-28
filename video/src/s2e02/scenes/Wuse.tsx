import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Chinese edition only. 《周礼·考工记》: "画缋之事，杂五色" — painting mixes the
// five colours 青 赤 黄 白 黑. Five dishes of pigment set out in a row. Then
// three axes of colour; five arrows crowd into that three-direction space,
// and two of them dim with dashed outlines: in the linear picture, five
// vectors in three directions can't all be independent.

const DISHES = [
  { c: "#2a7fbf" },
  { c: "#d93a2b" },
  { c: "#f2c230" },
  { c: "#f4f1e8" },
  { c: "#1b1b1b" },
];
const O = { x: 960, y: 560 };
const ARROWS = [
  { x: 260, y: 60 },
  { x: -40, y: -260 },
  { x: -250, y: 90 },
  { x: 110, y: -140 },
  { x: -150, y: -90 },
];

export const Wuse: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("wuse");
  const [c0, c1, c2] = cues;
  const dishAt = (k: number) => c0 + 50 + k * 10;
  const arrowAt = (k: number) => c1 + 20 + k * 14;
  const dim = fadeIn(frame, c2 + 20, 12);

  return (
    <SceneShell id="wuse">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      {DISHES.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={dishAt(k)} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="thud" at={c2 + 20} volume={0.24} />

      {/* the quotation and the five dishes */}
      <AbsoluteFill style={{ opacity: fadeOut(frame, c1, 10) }}>
        <div
          style={{
            position: "absolute",
            top: 180,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 92,
            color: colors.text,
          }}
        >
          {typed("画缋之事，杂五色", frame, c0 + 10, fps, 8)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 320,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 46,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 40),
            translate: riseIn(frame, c0 + 40, 16),
          }}
        >
          {tx.kaogong}
        </div>
        <svg width={1920} height={1080}>
          {DISHES.map((d, k) => {
            const s = Math.min(1, springIn(frame, dishAt(k), fps, 10));
            const x = 560 + k * 200;
            return (
              <g
                key={k}
                opacity={s}
                transform={`translate(${x} 600) scale(${s})`}
              >
                <ellipse
                  rx={80}
                  ry={36}
                  cy={30}
                  fill={alpha(colors.ink, 0.6)}
                />
                <ellipse
                  rx={74}
                  ry={30}
                  fill={d.c}
                  stroke={colors.paper}
                  strokeWidth={4}
                />
                <text
                  y={130}
                  fill={colors.text}
                  fontSize={60}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={800}
                >
                  {tx.wuse[k]}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* five arrows in a space with three directions */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((k) => {
            const d = ARROWS[k];
            return (
              <line
                key={`ax${k}`}
                x1={O.x - d.x * 1.3}
                y1={O.y - d.y * 1.3}
                x2={O.x + d.x * 1.3}
                y2={O.y + d.y * 1.3}
                stroke={alpha(colors.paper, 0.25)}
                strokeWidth={3}
              />
            );
          })}
          {ARROWS.map((d, k) => {
            const t = glide(frame, arrowAt(k), fps, 14);
            const extra = k >= 3;
            return (
              <Arrow
                key={k}
                from={O}
                to={{ x: O.x + d.x * t, y: O.y + d.y * t }}
                color={
                  extra
                    ? alpha(
                        DISHES[k].c === "#1b1b1b" ? colors.paper : DISHES[k].c,
                        1 - 0.6 * dim,
                      )
                    : DISHES[k].c
                }
                width={14}
                dashed={extra && dim > 0.5}
              />
            );
          })}
          <text
            x={1440}
            y={300}
            fill={colors.highlight}
            fontSize={80}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={900}
            opacity={dim}
          >
            {tx.dependent}
          </text>
          <text
            x={480}
            y={300}
            fill={colors.text}
            fontSize={120}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 80)}
          >
            5 → 3
          </text>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
