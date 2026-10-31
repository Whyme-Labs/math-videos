import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";

// The product rule and the formula. A unit square grows by B (×2), then by
// A (×3): its area counter reads 1, 2, 6, and det(AB) = det A · det B
// lands under it. Then a 3 × 3 grid of letters a … i; expanding the wedge
// of its three columns, the six products fly out one at a time, each
// lighting its three cells, with its sign: aei, bfg, cdh, −ceg, −bdi, −afh.

const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const TERMS = [
  { t: "aei", s: "+", cells: [0, 4, 8] },
  { t: "bfg", s: "+", cells: [1, 5, 6] },
  { t: "cdh", s: "+", cells: [2, 3, 7] },
  { t: "ceg", s: "−", cells: [2, 4, 6] },
  { t: "bdi", s: "−", cells: [1, 3, 8] },
  { t: "afh", s: "−", cells: [0, 5, 7] },
];

export const Product: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("product");
  const [c0, c1] = cues;
  const g1 = glide(frame, c0 + 20, fps, 24);
  const g2 = glide(frame, c0 + 60, fps, 24);
  const area = lerp(1, 2, g1) * lerp(1, 3, g2);
  const part1 = fadeOut(frame, c1, 10);
  const termAt = (k: number) => c1 + 20 + k * 16;
  const active = TERMS.findIndex(
    (_, k) => frame >= termAt(k) && frame < termAt(k) + 16,
  );
  const U = 90;
  const w = U * lerp(1, 2, g1) * lerp(1, 1.5, g2);
  const h = U * lerp(1, 2, g2);

  return (
    <SceneShell id="product">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c0 + 44} volume={0.16} />
      <Sfx name="whoosh" at={c0 + 60} volume={0.12} />
      <Sfx name="ding" at={c0 + 84} />
      {TERMS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={termAt(k)} volume={0.14} />
      ))}
      <Sfx name="chime" at={termAt(6) + 6} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <rect
            x={560}
            y={640 - h}
            width={w}
            height={h}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {[
            { at: c0 + 20, t: "× 2", x: 1180, y: 340 },
            { at: c0 + 60, t: "× 3", x: 1180, y: 440 },
          ].map((l) => (
            <text
              key={l.t}
              x={l.x}
              y={l.y}
              fill={colors.orange}
              fontSize={64}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={fadeIn(frame, l.at)}
            >
              {l.t}
            </text>
          ))}
          <text
            x={1180}
            y={560}
            fill={colors.primary}
            fontSize={84}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            = {area.toFixed(1)}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 64,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c0 + 96),
            translate: riseIn(frame, c0 + 96, 16),
          }}
        >
          det(AB) = det A · det B
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <path
            d="M 470 230 l -24 0 l 0 420 l 24 0 M 830 230 l 24 0 l 0 420 l -24 0"
            fill="none"
            stroke={colors.text}
            strokeWidth={6}
          />
          {LETTERS.map((l, k) => {
            const lit = active >= 0 && TERMS[active].cells.includes(k);
            return (
              <g key={l}>
                <rect
                  x={500 + (k % 3) * 110}
                  y={260 + Math.floor(k / 3) * 130}
                  width={90}
                  height={100}
                  rx={14}
                  fill={alpha(
                    lit
                      ? colors.orange
                      : [colors.primary, colors.highlight, colors.green][k % 3],
                    lit ? 0.6 : 0.15,
                  )}
                />
                <text
                  x={545 + (k % 3) * 110}
                  y={330 + Math.floor(k / 3) * 130}
                  fill={colors.text}
                  fontSize={60}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {l}
                </text>
              </g>
            );
          })}
          {TERMS.map((t, k) => {
            const s = Math.min(1, springIn(frame, termAt(k), fps, 10));
            return (
              <g
                key={t.t}
                opacity={s}
                transform={`translate(${1050 + (k % 3) * 230} ${330 + Math.floor(k / 3) * 160}) scale(${s})`}
              >
                <text
                  fill={t.s === "+" ? colors.primary : colors.red}
                  fontSize={72}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {t.s}
                  {t.t}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
