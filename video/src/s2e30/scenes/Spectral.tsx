import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The spectral theorem for compact self-adjoint operators. Chip (c0).
// Points Txₙ crowd in to one point, which glows (c1). Three perpendicular
// arrows u₁, u₂, u₃ peel off one at a time (c2). Eigenvalue dots on the
// real line, alternating sides and marching in to 0 (c3). A band past ±ε
// is shaded; inside it a counter shows finitely many (c4). The expansion
// Tx = Σ λₖ ⟨x, uₖ⟩ uₖ (c5).

const L = { x: 260, w: 1400, y: 600 };
const LX = (v: number) => L.x + (L.w * (v + 1)) / 2;
const lam = (k: number) => (k % 2 ? -1 : 1) * 0.92 * 0.82 ** k;
const EPS = 0.3;

export const Spectral: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("spectral");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part1 = fadeIn(frame, c1 + 2, 8) * fadeOut(frame, c3, 10);
  const part2 = fadeIn(frame, c3 + 4, 10);
  const pts = Math.min(14, Math.max(0, Math.floor((frame - c1 - 6) / 6)));
  const dots = Math.min(30, Math.max(0, Math.floor((frame - c3 - 6) / 4)));
  const outside = Array.from({ length: dots }, (_, k) => lam(k)).filter(
    (v) => Math.abs(v) >= EPS,
  ).length;

  return (
    <SceneShell id="spectral">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 6} volume={0.06} />
      ))}
      <Sfx name="ding" at={c1 + 90} volume={0.2} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c2 + 8 + i * 20} volume={0.1} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 4} volume={0.05} />
      ))}
      <Sfx name="pluck3" at={c4 + 8} volume={0.12} />
      <Sfx name="chime" at={c5 + 8} volume={0.28} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: pts }, (_, k) => {
            const r = 260 * 0.75 ** k;
            const a = rnd(k) * 6.28;
            return (
              <circle
                key={k}
                cx={560 + r * Math.cos(a)}
                cy={500 + r * Math.sin(a)}
                r={10}
                fill={colors.highlight}
                opacity={0.5 + 0.5 * (k / 14)}
              />
            );
          })}
          <circle
            cx={560}
            cy={500}
            r={22}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c1 + 90, 6)}
          />
          {[0, 1, 2].map((k) => {
            const g = glide(frame, c2 + 8 + k * 20, fps, 16);
            const d = [
              [1, 0],
              [0, -1],
              [-0.6, 0.6],
            ][k];
            return (
              <g key={k} opacity={g}>
                <line
                  x1={1300}
                  y1={520}
                  x2={1300 + 240 * d[0] * g}
                  y2={520 + 240 * d[1] * g}
                  stroke={[colors.primary, colors.orange, colors.green][k]}
                  strokeWidth={8}
                />
                <text
                  x={1300 + 270 * d[0]}
                  y={530 + 270 * d[1]}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={40}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  u{"₁₂₃"[k]}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 820 - 40,
            left: 400,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c1 + 30),
            whiteSpace: "nowrap",
          }}
        >
          Txₙ → λ x
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <rect
            x={LX(-1)}
            y={L.y - 80}
            width={LX(-EPS) - LX(-1)}
            height={160}
            fill={alpha(colors.orange, 0.15)}
            opacity={fadeIn(frame, c4 + 4, 8)}
          />
          <rect
            x={LX(EPS)}
            y={L.y - 80}
            width={LX(1) - LX(EPS)}
            height={160}
            fill={alpha(colors.orange, 0.15)}
            opacity={fadeIn(frame, c4 + 4, 8)}
          />
          <line
            x1={L.x}
            y1={L.y}
            x2={L.x + L.w}
            y2={L.y}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
          />
          {[-1, -EPS, 0, EPS, 1].map((v) => (
            <text
              key={v}
              x={LX(v)}
              y={L.y + 60}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={32}
              fontFamily={fonts.mono}
            >
              {v === 0
                ? "0"
                : v === EPS
                  ? "ε"
                  : v === -EPS
                    ? "−ε"
                    : v > 0
                      ? "‖T‖"
                      : "−‖T‖"}
            </text>
          ))}
          {Array.from({ length: dots }, (_, k) => (
            <circle
              key={k}
              cx={LX(lam(k))}
              cy={L.y}
              r={Math.max(5, 14 - k * 0.3)}
              fill={Math.abs(lam(k)) >= EPS ? colors.orange : colors.primary}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c4 + 10) * fadeOut(frame, c5, 8),
            whiteSpace: "nowrap",
          }}
        >
          |λ| ≥ ε : {outside} · {tx.finitelyMany}
        </div>
        <div
          style={{
            position: "absolute",
            top: 360,
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
          Tx = Σ λₖ ⟨x, uₖ⟩ uₖ
        </div>
      </AbsoluteFill>
      <Chip
        frame={frame}
        at={c0 + 6}
        x={160}
        y={120}
        color={colors.green}
        math
        size={46}
      >
        {tx.hyp}
      </Chip>
    </SceneShell>
  );
};
