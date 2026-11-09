import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Weak* convergence and Banach–Alaoglu. The definition (c0). On [0, 1], a
// spike δ at 1/n slides towards 0 while a continuous probe φ reads φ(1/n)
// → φ(0); the gap between δ's stays 2 (c1). Chip: Banach–Alaoglu (c2). A
// table: columns x₁, x₂, …; rows are nested subsequences (c3). Row k
// settles on x₁ … x_k, ticks filling in row by row (c4). The diagonal
// lights up: it settles on every column (c5).

const AX = 160;
const AW = 760;
const AY = 640;
const phi = (x: number) => 0.55 + 0.25 * Math.cos(5 * x) + 0.15 * x;
const ROWS = 6;
const COLS = 7;
const TX = 1100;
const TY = 300;
const CS = 86;

export const Alaoglu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("alaoglu");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const n = Math.min(14, 1 + Math.max(0, Math.floor((frame - c1 - 6) / 10)));
  const s = 1 / n;
  const left = 1 - 0.7 * fadeIn(frame, c3, 10);
  const rowsDone = Math.min(
    ROWS,
    Math.max(0, Math.floor((frame - c4 - 6) / 14)),
  );
  const diag = Math.min(ROWS, Math.max(0, Math.floor((frame - c5 - 6) / 8)));

  return (
    <SceneShell id="alaoglu">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 10} volume={0.06} />
      ))}
      <Sfx name="chime" at={c2 + 8} volume={0.26} />
      <Sfx name="page" at={c3 + 6} volume={0.16} />
      {Array.from({ length: ROWS }, (_, i) => (
        <Sfx key={i} name="pluck1" at={c4 + 6 + i * 14} volume={0.07} />
      ))}
      {Array.from({ length: ROWS }, (_, i) => (
        <Sfx key={i} name="pluck3" at={c5 + 6 + i * 8} volume={0.08} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c1 + 2, 8) * left}>
          <line
            x1={AX}
            y1={AY}
            x2={AX + AW}
            y2={AY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, i) =>
                `${i ? "L" : "M"} ${AX + (AW * i) / 100} ${AY - 300 * phi(i / 100)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
          />
          <line
            x1={AX}
            y1={AY}
            x2={AX}
            y2={AY - 320}
            stroke={colors.green}
            strokeWidth={8}
            opacity={0.6}
          />
          <line
            x1={AX + AW * s}
            y1={AY}
            x2={AX + AW * s}
            y2={AY - 320}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <circle
            cx={AX + AW * s}
            cy={AY - 300 * phi(s)}
            r={12}
            fill={colors.orange}
          />
          <text
            x={AX}
            y={AY + 46}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.mono}
          >
            0
          </text>
          <text
            x={AX + AW}
            y={AY + 46}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={32}
            fontFamily={fonts.mono}
          >
            1
          </text>
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          {Array.from({ length: COLS }, (_, c) => (
            <text
              key={c}
              x={TX + 80 + c * CS + CS / 2}
              y={TY - 20}
              textAnchor="middle"
              fill={colors.text}
              fontSize={34}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              x{"₁₂₃₄₅₆₇"[c]}
            </text>
          ))}
          {Array.from({ length: ROWS }, (_, r) => (
            <g key={r}>
              <text
                x={TX + 40}
                y={TY + r * 70 + 46}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={32}
                fontFamily={fonts.math}
              >
                {r + 1}
              </text>
              {Array.from({ length: COLS }, (_, c) => {
                const settled = r < rowsDone && c <= r;
                const isDiag = r === c && r < diag;
                return (
                  <rect
                    key={c}
                    x={TX + 80 + c * CS + 6}
                    y={TY + r * 70 + 6}
                    width={CS - 12}
                    height={58}
                    rx={10}
                    fill={
                      isDiag
                        ? colors.green
                        : settled
                          ? alpha(colors.primary, 0.6)
                          : alpha(colors.paper, 0.06)
                    }
                    stroke={alpha(colors.paper, 0.25)}
                    strokeWidth={2}
                  />
                );
              })}
            </g>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: AX,
          fontFamily: fonts.math,
          fontSize: 46,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        fₙ ⇀* f : {tx.weakStar}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: AX,
          fontFamily: fonts.math,
          fontSize: 42,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c1 + 10) * left,
          whiteSpace: "nowrap",
        }}
      >
        φ(1/n) ={" "}
        <span style={{ fontFamily: fonts.mono }}>{phi(s).toFixed(3)}</span> →
        φ(0) · ‖δ − δ‖ = 2
      </div>
      <Chip
        frame={frame}
        at={c2 + 8}
        x={1100}
        y={150}
        color={colors.green}
        size={48}
      >
        {tx.alaoglu}
      </Chip>
    </SceneShell>
  );
};
