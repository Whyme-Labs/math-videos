import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The basis and the dimension. A column of two lemon chips e₁, e₂ and a row
// of three pink chips f₁, f₂, f₃; the 2 × 3 grid of products eᵢ ⊗ fⱼ fills
// in cell by cell. Then the comparison: the five chips side by side in a
// row (2 + 3 = 5, the direct sum) against the same chips multiplied out
// into a rectangle (2 × 3 = 6, the tensor product).

const CW = 170;

export const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("grid");
  const [c0, c1] = cues;
  const cell = (k: number) =>
    Math.min(1, springIn(frame, c0 + 30 + k * 10, fps, 10));
  const part1 = fadeOut(frame, c1, 10);
  const row = glide(frame, c1 + 10, fps, 24);
  const rect = glide(frame, c1 + 50, fps, 24);
  const X0 = 760;
  const Y0 = 380;
  const chip = (x: number, y: number, t: string, c: string, s = 1) => (
    <g key={t} opacity={s} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect
        x={-60}
        y={-40}
        width={120}
        height={80}
        rx={16}
        fill={alpha(c, 0.25)}
        stroke={c}
        strokeWidth={5}
      />
      <text
        y={16}
        fill={c}
        fontSize={44}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={800}
      >
        {t}
      </text>
    </g>
  );

  return (
    <SceneShell id="grid">
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={k} name={PLUCKS[k]} at={c0 + 30 + k * 10} volume={0.12} />
      ))}
      <Sfx name="ding" at={c0 + 100} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 50} volume={0.12} />
      <Sfx name="chime" at={c1 + 80} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {["e₁", "e₂"].map((t, i) =>
            chip(
              X0 - 200,
              Y0 + i * 130,
              t,
              colors.primary,
              fadeIn(frame, c0 + i * 6, 8),
            ),
          )}
          {["f₁", "f₂", "f₃"].map((t, j) =>
            chip(
              X0 + j * CW,
              Y0 - 160,
              t,
              colors.highlight,
              fadeIn(frame, c0 + 12 + j * 6, 8),
            ),
          )}
          {[0, 1].map((i) =>
            [0, 1, 2].map((j) => {
              const s = cell(i * 3 + j);
              return (
                <g
                  key={`${i}${j}`}
                  opacity={s}
                  transform={`translate(${X0 + j * CW} ${Y0 + i * 130}) scale(${s})`}
                >
                  <rect
                    x={-78}
                    y={-52}
                    width={156}
                    height={104}
                    rx={16}
                    fill={alpha(colors.green, 0.2)}
                    stroke={colors.green}
                    strokeWidth={5}
                  />
                  <text
                    y={14}
                    fill={colors.text}
                    fontSize={38}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={800}
                  >
                    e{["₁", "₂"][i]}⊗f{["₁", "₂", "₃"][j]}
                  </text>
                </g>
              );
            }),
          )}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* direct sum: a row of five */}
          {[0, 1, 2, 3, 4].map((k) =>
            chip(
              260 + k * 130,
              330,
              k < 2 ? `e${["₁", "₂"][k]}` : `f${["₁", "₂", "₃"][k - 2]}`,
              k < 2 ? colors.primary : colors.highlight,
              Math.min(1, row * 1.2),
            ),
          )}
          {/* tensor product: a rectangle of six */}
          {[0, 1].map((i) =>
            [0, 1, 2].map((j) => (
              <g
                key={`${i}${j}`}
                opacity={rect}
                transform={`translate(${1220 + j * 150} ${300 + i * 120}) scale(${rect})`}
              >
                <rect
                  x={-66}
                  y={-50}
                  width={132}
                  height={100}
                  rx={14}
                  fill={alpha(colors.green, 0.25)}
                  stroke={colors.green}
                  strokeWidth={5}
                />
              </g>
            )),
          )}
        </svg>
        {[
          {
            left: 260,
            top: 470,
            t: tx.plus,
            c: colors.text,
            at: c1 + 30,
            mark: "⊕",
          },
          {
            left: 1220,
            top: 520,
            t: tx.times,
            c: colors.green,
            at: c1 + 70,
            mark: "⊗",
          },
        ].map((l) => (
          <div
            key={l.t}
            style={{
              position: "absolute",
              top: l.top,
              left: l.left - 60,
              fontFamily: fonts.math,
              fontSize: 72,
              fontWeight: 800,
              color: l.c,
              opacity: fadeIn(frame, l.at),
              translate: riseIn(frame, l.at, 16),
            }}
          >
            {l.mark} &nbsp;{l.t}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
