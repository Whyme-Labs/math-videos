import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { poly, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// Orthonormal bases. x² on [0, 1], the best line x − 1/6 and the gap
// between them shaded; error² = 1/180 (c0). Bars of the coefficients
// ⟨x, eₙ⟩ appear one at a time, each a new direction (c1); beside them an
// error meter ‖x − s_N‖² drops with every bar (c2). A tank of height
// ‖x‖² fills with the squares |⟨x, eₙ⟩|², never past the brim: Bessel
// (c3). It fills exactly to the brim: Parseval (c4). The expansion
// x = Σ ⟨x, eₙ⟩ eₙ (c5).

const PX = 260;
const PW = 640;
const PY = 720;
const PH = 460;
const px = (x: number) => PX + PW * x;
const py = (y: number) => PY - PH * y;
const K = 12;
const coef = (k: number) => 0.8 * 0.72 ** k;
const NORM2 = Array.from({ length: 60 }, (_, k) => coef(k) ** 2).reduce(
  (a, b) => a + b,
  0,
);

export const Bases: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("bases");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c1, 10);
  const part2 = fadeIn(frame, c1 + 4, 10);
  const n =
    frame < c4
      ? Math.min(6, Math.max(0, Math.floor((frame - c1 - 6) / 36)))
      : Math.min(K, 6 + Math.floor((frame - c4 - 6) / 6));
  let partial = 0;
  for (let k = 0; k < n; k++) partial += coef(k) ** 2;
  const err = NORM2 - partial;
  const TH = 420;

  return (
    <SceneShell id="bases">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="ding" at={c0 + 50} volume={0.18} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="pluck1" at={c1 + 6 + i * 36} volume={0.08} />
      ))}
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      {Array.from({ length: 6 }, (_, i) => (
        <Sfx key={i} name="tick" at={c4 + 6 + i * 6} volume={0.06} />
      ))}
      <Sfx name="chime" at={c4 + 50} volume={0.26} />
      <Sfx name="ding" at={c5 + 8} volume={0.2} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={`${poly(Array.from({ length: 101 }, (_, i) => [px(i / 100), py((i / 100) ** 2)] as Pt))} ${poly(Array.from({ length: 101 }, (_, i) => [px(1 - i / 100), py(1 - i / 100 - 1 / 6)] as Pt)).replace("M", "L")} Z`}
            fill={alpha(colors.red, 0.3)}
          />
          <path
            d={poly(
              Array.from(
                { length: 101 },
                (_, i) => [px(i / 100), py((i / 100) ** 2)] as Pt,
              ),
            )}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <line
            x1={px(0)}
            y1={py(-1 / 6)}
            x2={px(1)}
            y2={py(5 / 6)}
            stroke={colors.primary}
            strokeWidth={6}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1100,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ color: colors.primary }}>P x² = x − 1/6</div>
          <div style={{ color: colors.red, opacity: fadeIn(frame, c0 + 50) }}>
            ‖{tx.error}‖² = 1/180
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={700}
            x2={200 + K * 66}
            y2={700}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: n }, (_, k) => (
            <g key={k}>
              <rect
                x={210 + k * 66}
                y={700 - 420 * coef(k)}
                width={46}
                height={420 * coef(k)}
                rx={6}
                fill={colors.primary}
              />
              <text
                x={233 + k * 66}
                y={745}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={26}
                fontFamily={fonts.math}
              >
                {`e${"₁₂₃₄₅₆₇₈₉"[k] ?? "…"}`}
              </text>
            </g>
          ))}
          <g opacity={fadeIn(frame, c2 + 4, 8)}>
            <rect
              x={1120}
              y={700 - TH * Math.sqrt(err / NORM2)}
              width={70}
              height={TH * Math.sqrt(err / NORM2)}
              rx={8}
              fill={colors.red}
            />
            <text
              x={1155}
              y={745}
              textAnchor="middle"
              fill={colors.red}
              fontSize={30}
              fontFamily={fonts.body}
              fontWeight={800}
            >
              {tx.error}
            </text>
          </g>
          <g opacity={fadeIn(frame, c3 + 4, 8)}>
            <rect
              x={1400}
              y={700 - TH}
              width={140}
              height={TH}
              rx={10}
              fill="none"
              stroke={colors.paper}
              strokeWidth={4}
            />
            {Array.from({ length: n }, (_, k) => {
              let below = 0;
              for (let j = 0; j < k; j++) below += coef(j) ** 2;
              return (
                <rect
                  key={k}
                  x={1404}
                  y={700 - TH * ((below + coef(k) ** 2) / NORM2)}
                  width={132}
                  height={TH * (coef(k) ** 2 / NORM2)}
                  fill={alpha(k % 2 ? colors.orange : colors.primary, 0.85)}
                />
              );
            })}
            <line
              x1={1380}
              y1={700 - TH}
              x2={1560}
              y2={700 - TH}
              stroke={colors.green}
              strokeWidth={5}
              strokeDasharray="10 7"
            />
            <text
              x={1580}
              y={700 - TH + 12}
              fill={colors.green}
              fontSize={36}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              ‖x‖²
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 200,
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c5, 8),
            whiteSpace: "nowrap",
          }}
        >
          ⟨x, eₙ⟩
        </div>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 1260,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c3 + 10) * fadeOut(frame, c4, 8),
            whiteSpace: "nowrap",
          }}
        >
          Σ |⟨x, eₙ⟩|² ≤ ‖x‖²
        </div>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 1260,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c4 + 50) * fadeOut(frame, c5, 8),
            whiteSpace: "nowrap",
          }}
        >
          Σ |⟨x, eₙ⟩|² = ‖x‖²
        </div>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, c5 + 8),
            whiteSpace: "nowrap",
          }}
        >
          x = Σ ⟨x, eₙ⟩ eₙ
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
