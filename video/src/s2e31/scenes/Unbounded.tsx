import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// Why X and P can't be bounded. The relation XP − PX = iħ (c0). For n × n
// matrices: a grid with iħ down the diagonal, its trace counting up to
// n·iħ, against tr(XP − PX) = 0 (c1). The ladder XPⁿ − PⁿX = n·iħ·Pⁿ⁻¹
// with n ticking up (c2). Bars n·ħ growing past the fixed dashed ceiling
// 2‖X‖‖P‖, turning red; chip (c3). "X, P bounded" struck out (c4). A
// square for H sprinkled with a dense dust of points, the domain (c5).

const CEIL = 9.5;

export const Unbounded: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("unbounded");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const head = fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 8);
  const partA = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10);
  const partB = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c5, 10);
  const partC = fadeIn(frame, c5 + 4, 10);
  const diag = Math.min(5, Math.max(0, Math.floor((frame - c1 - 10) / 8)));
  const n = Math.min(99, 1 + Math.max(0, Math.floor((frame - c2 - 6) / 6)));
  const bars = Math.min(16, Math.max(0, Math.floor((frame - c3 - 6) / 6)));
  const dust = Math.min(900, Math.max(0, Math.floor((frame - c5 - 6) * 18)));

  return (
    <SceneShell id="unbounded">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: 5 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 10 + i * 8} volume={0.06} />
      ))}
      <Sfx name="thud" at={c1 + 60} volume={0.16} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      {Array.from({ length: 16 }, (_, i) => (
        <Sfx
          key={i}
          name={(i + 1) * 0.8 > CEIL ? "clink" : "pluck2"}
          at={c3 + 6 + i * 6}
          volume={0.06}
        />
      ))}
      <Sfx name="scratch" at={c4 + 10} volume={0.2} />
      <Sfx name="chime" at={c5 + 40} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 96,
          fontWeight: 800,
          color: colors.text,
          opacity: head,
        }}
      >
        XP − PX = <span style={{ color: colors.highlight }}>iħ</span>
      </div>

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <path
            d="M 300 200 L 280 200 L 280 680 L 300 680 M 760 200 L 780 200 L 780 680 L 760 680"
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
          />
          {Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => (
              <text
                key={`${r}-${c}`}
                x={340 + c * 96}
                y={262 + r * 96}
                textAnchor="middle"
                fill={
                  r === c
                    ? r < diag
                      ? colors.highlight
                      : alpha(colors.highlight, 0.4)
                    : alpha(colors.paper, 0.3)
                }
                fontSize={r === c ? 38 : 30}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {r === c ? "iħ" : "0"}
              </text>
            )),
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 960,
            fontFamily: fonts.mono,
            fontSize: 54,
            fontWeight: 800,
            color: colors.highlight,
            whiteSpace: "nowrap",
          }}
        >
          tr(iħ I) = {diag}iħ
        </div>
        <div
          style={{
            position: "absolute",
            top: 420,
            left: 960,
            fontFamily: fonts.mono,
            fontSize: 54,
            fontWeight: 800,
            color: colors.red,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c1 + 56),
          }}
        >
          tr(XP − PX) = 0
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
            opacity: fadeOut(frame, c4, 8),
          }}
        >
          XP<sup>{n}</sup> − P<sup>{n}</sup>X ={" "}
          <span style={{ color: colors.orange }}>{n}</span>·iħ·P
          <sup>{n - 1}</sup>
        </div>
        <svg width={1920} height={1080}>
          <g opacity={fadeIn(frame, c3 + 4, 8) * fadeOut(frame, c4, 8)}>
            <line
              x1={160}
              y1={760}
              x2={1340}
              y2={760}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            <line
              x1={160}
              y1={760 - 36 * CEIL}
              x2={1340}
              y2={760 - 36 * CEIL}
              stroke={colors.green}
              strokeWidth={4}
              strokeDasharray="14 9"
            />
            <text
              x={1360}
              y={760 - 36 * CEIL + 14}
              fill={colors.green}
              fontSize={38}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              2‖X‖‖P‖
            </text>
            {Array.from({ length: bars }, (_, i) => (
              <rect
                key={i}
                x={180 + i * 72}
                y={760 - 36 * (i + 1) * 0.8}
                width={48}
                height={36 * (i + 1) * 0.8}
                rx={6}
                fill={(i + 1) * 0.8 > CEIL ? colors.red : colors.orange}
              />
            ))}
          </g>
        </svg>
        <Chip
          frame={frame}
          at={c3 + 100}
          x={1360}
          y={500}
          color={colors.red}
          size={44}
        >
          nħ ≤ C ✗ · {tx.impossible}
        </Chip>
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 0,
            width: 1920,
            textAlign: "center",
            opacity: fadeIn(frame, c4 + 6),
          }}
        >
          <span
            style={{
              position: "relative",
              fontFamily: fonts.math,
              fontSize: 80,
              fontWeight: 800,
              color: colors.text,
            }}
          >
            ‖X‖, ‖P‖ {"<"} ∞
            <span
              style={{
                position: "absolute",
                left: -16,
                right: -16,
                top: "52%",
                height: 9,
                background: colors.red,
                transformOrigin: "left",
                scale: `${progress(frame, c4 + 12, 14)} 1`,
              }}
            />
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partC }}>
        <svg width={1920} height={1080}>
          <rect
            x={360}
            y={180}
            width={600}
            height={560}
            rx={24}
            fill={alpha(colors.paper, 0.05)}
            stroke={colors.paper}
            strokeWidth={4}
          />
          {Array.from({ length: dust }, (_, i) => (
            <circle
              key={i}
              cx={380 + 560 * rnd(2 * i + 3)}
              cy={200 + 520 * rnd(2 * i + 4)}
              r={2.6}
              fill={colors.primary}
            />
          ))}
          <text
            x={380}
            y={160}
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            H
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1060,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.primary,
            whiteSpace: "nowrap",
          }}
        >
          D(X) = {"{"} ψ : xψ ∈ L² {"}"}
        </div>
        <Chip
          frame={frame}
          at={c5 + 30}
          x={1060}
          y={420}
          color={colors.primary}
          size={44}
        >
          {tx.dense}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
