import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path } from "../components/draw";
import { useStrings } from "../i18n";

// The quantum dictionary. A table, physics on the left and mathematics on
// the right: state (c0), observable and outcomes (c1). A detector strip of
// pixels with one pixel [a, b] lit, over the density |ψ|² (c2); the area
// over [a, b] fills and its value is read out (c3). Uncertainty: a packet
// ψ(x) and its transform side by side, with ΔX and ΔP read out (c4); the
// packet breathes, narrow in x while wide in k and back (c5).

const PX = 14;
const A = 5;
const B = 7;
const dens = (x: number) => Math.exp(-(((x - 0.42) / 0.16) ** 2));
const Dx = (t: number) => 1080 + 700 * t;
const Dy = (v: number) => 640 - 300 * v;

export const Dictionary: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("dictionary");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c4, 10);
  const partB = fadeIn(frame, c4 + 4, 10);
  const rowAt = [c0, c1, c1 + 20, c1 + 40];
  let total = 0;
  let inPix = 0;
  for (let i = 0; i < 1000; i++) {
    const x = (i + 0.5) / 1000;
    total += dens(x);
    if (x >= A / PX && x < (B + 1) / PX) inPix += dens(x);
  }
  const prob = inPix / total;
  const a = A / PX;
  const b = (B + 1) / PX;
  const s = 0.1 * 2 ** (0.9 * Math.sin(Math.max(0, frame - c4 - 30) * 0.045));
  const Lx = (t: number) => 160 + 700 * t;
  const Rx = (t: number) => 1060 + 700 * t;

  return (
    <SceneShell id="dictionary">
      {rowAt.map((at, i) => (
        <Sfx key={i} name="pop" at={at + 6} volume={0.1} />
      ))}
      <Sfx name="pluck3" at={c2 + 8} volume={0.12} />
      <Sfx name="ding" at={c3 + 30} volume={0.2} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />
      <Sfx name="chime" at={c5 + 30} volume={0.26} />

      <AbsoluteFill style={{ opacity: partA }}>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 140,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {tx.rows.map(([phys, math], i) => (
            <div
              key={phys}
              style={{
                display: "flex",
                gap: 30,
                alignItems: "baseline",
                opacity: fadeIn(frame, rowAt[i] + 6),
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 260,
                  fontSize: 40,
                  fontWeight: 700,
                  color: colors.muted,
                }}
              >
                {phys}
              </span>
              <span
                style={{
                  fontFamily: fonts.math,
                  fontSize: 46,
                  fontWeight: 800,
                  color: i === 2 ? colors.green : colors.text,
                }}
              >
                {math}
              </span>
            </div>
          ))}
        </div>
        <svg width={1920} height={1080}>
          <g opacity={fadeIn(frame, c2 + 6, 10)}>
            {Array.from({ length: PX }, (_, i) => {
              const lit = i >= A && i <= B;
              return (
                <rect
                  key={i}
                  x={Dx(i / PX) + 2}
                  y={170}
                  width={700 / PX - 4}
                  height={70}
                  rx={6}
                  fill={
                    lit && frame >= c2 + 20
                      ? colors.highlight
                      : alpha(colors.paper, 0.12)
                  }
                  stroke={alpha(colors.paper, 0.4)}
                  strokeWidth={2}
                />
              );
            })}
            <line
              x1={Dx(0)}
              y1={Dy(0)}
              x2={Dx(1)}
              y2={Dy(0)}
              stroke={alpha(colors.paper, 0.5)}
              strokeWidth={3}
            />
            <path
              d={`${path(dens, a, b, Dx, Dy, 100)} L ${Dx(b)} ${Dy(0)} L ${Dx(a)} ${Dy(0)} Z`}
              fill={alpha(colors.highlight, 0.45)}
              opacity={fadeIn(frame, c3 + 6, 10)}
            />
            <path
              d={path(dens, 0, 1, Dx, Dy, 300)}
              fill="none"
              stroke={colors.primary}
              strokeWidth={5}
            />
            {[a, b].map((t, i) => (
              <line
                key={i}
                x1={Dx(t)}
                y1={250}
                x2={Dx(t)}
                y2={Dy(0)}
                stroke={colors.highlight}
                strokeWidth={3}
                strokeDasharray="8 7"
                opacity={fadeIn(frame, c2 + 20, 8)}
              />
            ))}
            <text
              x={Dx(0.95)}
              y={Dy(0.55)}
              textAnchor="end"
              fill={colors.primary}
              fontSize={40}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              |ψ|²
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 680,
            left: 1080,
            fontFamily: fonts.mono,
            fontSize: 46,
            fontWeight: 800,
            color: colors.highlight,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c3 + 20),
          }}
        >
          Prob(a ≤ X ≤ b) = {prob.toFixed(2)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1080,
            fontSize: 34,
            fontWeight: 700,
            color: colors.muted,
            opacity: fadeIn(frame, c2 + 6),
          }}
        >
          {tx.pixel} [a, b]
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          {[Lx, Rx].map((M, side) => (
            <g key={side}>
              <line
                x1={M(0)}
                y1={600}
                x2={M(1)}
                y2={600}
                stroke={alpha(colors.paper, 0.4)}
                strokeWidth={2}
              />
              <path
                d={path(
                  (t) =>
                    Math.exp(
                      -(((t - 0.5) / (side === 0 ? s : 0.025 / s)) ** 2),
                    ),
                  0,
                  1,
                  M,
                  (v) => 600 - 300 * v,
                  500,
                )}
                fill={alpha(side === 0 ? colors.primary : colors.orange, 0.35)}
                stroke={side === 0 ? colors.primary : colors.orange}
                strokeWidth={5}
              />
              <text
                x={M(0.5)}
                y={650}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={36}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {side === 0 ? "x" : "k"}
              </text>
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: colors.primary }}>
            ΔX = {(s / Math.SQRT2).toFixed(3)}
          </span>
          <span style={{ color: colors.muted }}> · </span>
          <span style={{ color: colors.orange }}>
            ΔP = {(1 / ((2 * s) / Math.SQRT2)).toFixed(2)}ħ
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.green,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c4 + 30),
          }}
        >
          ΔX · ΔP ≥ ħ/2
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
