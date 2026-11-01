import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";

const mul = (p: Mat2, q: Mat2): Mat2 => [
  p[0] * q[0] + p[1] * q[2],
  p[0] * q[1] + p[1] * q[3],
  p[2] * q[0] + p[3] * q[2],
  p[2] * q[1] + p[3] * q[3],
];

// The product rule and the formula. The whole plane bends by B (area ×2),
// then by A on top of it (×3), carrying the unit square along: its area
// counter reads 1, 2, 6, and det(AB) = det A · det B
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
  // B = [2 ½; 0 1] (det 2), then A = [1.5 0; ½ 2] (det 3): the whole
  // plane bends, first by B, then by A on top of it
  const Bt = lerpMat(IDENTITY, [2, 0.5, 0, 1], g1);
  const At = lerpMat(IDENTITY, [1.5, 0, 0.5, 2], g2);
  const M = mul(At, Bt);
  const area = M[0] * M[3] - M[1] * M[2];
  const part1 = fadeOut(frame, c1, 10);
  const termAt = (k: number) => c1 + 20 + k * 16;
  const active = TERMS.findIndex(
    (_, k) => frame >= termAt(k) && frame < termAt(k) + 16,
  );
  const U = 90;
  const scr = (x: number, y: number) => ({ x: 600 + x * U, y: 660 - y * U });
  const sq = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ].map(([x, y]) => linear(M)(x, y));

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
          <defs>
            <clipPath id="e11prod">
              <rect x={180} y={110} width={900} height={720} rx={30} />
            </clipPath>
          </defs>
          <g clipPath="url(#e11prod)">
            <Plane map={linear(M)} scr={scr} range={12} />
          </g>
          <polygon
            points={sq
              .map((p) => `${scr(p.x, p.y).x},${scr(p.x, p.y).y}`)
              .join(" ")}
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
