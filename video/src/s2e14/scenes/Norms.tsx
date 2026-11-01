import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The payoff. Part 1: one unit circle |x|^p + |y|^p = 1 morphing from the
// taxi diamond (p = 1) to the round circle (p = 2) to the max square
// (p → ∞), each named as it forms. Part 2: the parallelogram law as a
// balance. On the left the unit square's sides (lemon) and diagonals
// (orange) inside the current unit ball; on the right a beam with two orange
// blocks (the squared diagonals) against four lemon ones (twice the
// squared sides). p sweeps through every ruler and the beam only sits level
// at p = 2, where it settles with a ding.

const ball = (q: number, cx: number, cy: number, r: number) =>
  Array.from({ length: 145 }, (_, i) => {
    const t = (i / 144) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = Math.sign(c) * Math.abs(c) ** (2 * q);
    const y = Math.sign(s) * Math.abs(s) ** (2 * q);
    return `${i ? "L" : "M"} ${(cx + x * r).toFixed(1)} ${(cy - y * r).toFixed(1)}`;
  }).join(" ");

const Q_INF = 0.02;

export const Norms: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("norms");
  const [c0, c1] = cues;

  // part 1: q = 1/p
  const q1 = lerp(
    lerp(1, 0.5, glide(frame, c0 + 60, fps, 30)),
    Q_INF,
    glide(frame, c0 + 130, fps, 30),
  );
  const named = [
    { at: c0 + 20, until: c0 + 60, label: tx.taxi },
    { at: c0 + 90, until: c0 + 130, label: tx.round },
    { at: c0 + 160, until: c1, label: tx.max },
  ];
  const part1 = fadeOut(frame, c1, 10);

  // part 2: p sweeps 1 → ∞, then settles at 2
  const q2 = lerp(
    lerp(1, Q_INF, glide(frame, c1 + 30, fps, 70)),
    0.5,
    glide(frame, c1 + 110, fps, 40),
  );
  const p = 1 / q2;
  const diag2 = 2 ** (2 * q2); // ‖e₁ ± e₂‖² for the p-norm
  const left = 2 * diag2;
  const right = 4;
  const tilt = Math.max(-14, Math.min(14, (left - right) * 5));
  const level = Math.abs(left - right) < 0.05;
  const H = 34;
  const O = { x: 440, y: 560 };
  const R = 220;
  const corner = { x: O.x + R, y: O.y - R };

  return (
    <SceneShell id="norms">
      <Sfx name="pop" at={c0 + 20} volume={0.14} />
      <Sfx name="pop" at={c0 + 90} volume={0.14} />
      <Sfx name="pop" at={c0 + 160} volume={0.14} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.12} />
      <Sfx name="ding" at={c1 + 150} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[1, 0.5, Q_INF].map((q, i) => (
            <path
              key={i}
              d={ball(q, 960, 470, 300)}
              fill="none"
              stroke={alpha(colors.paper, 0.18)}
              strokeWidth={3}
              strokeDasharray="10 10"
              opacity={fadeIn(frame, named[i].until)}
            />
          ))}
          <path
            d={ball(q1, 960, 470, 300)}
            fill={alpha(colors.primary, 0.12)}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <line
            x1={600}
            y1={470}
            x2={1320}
            y2={470}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={960}
            y1={110}
            x2={960}
            y2={830}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
        </svg>
        {named.map((n, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 200 + i * 130,
              left: 1400,
              fontSize: 60,
              fontWeight: 800,
              color: frame < n.until || i === 2 ? colors.primary : colors.muted,
              opacity: fadeIn(frame, n.at),
              translate: riseIn(frame, n.at, 14),
            }}
          >
            {n.label}
          </div>
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {/* the unit ball and the unit square's sides and diagonals */}
          <path
            d={ball(q2, O.x, O.y, R)}
            fill={alpha(colors.primary, 0.08)}
            stroke={alpha(colors.primary, 0.5)}
            strokeWidth={4}
          />
          <Arrow from={O} to={{ x: O.x + R, y: O.y }} width={12} />
          <Arrow from={O} to={{ x: O.x, y: O.y - R }} width={12} />
          <line
            x1={O.x + R}
            y1={O.y}
            x2={corner.x}
            y2={corner.y}
            stroke={alpha(colors.primary, 0.4)}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
          <line
            x1={O.x}
            y1={O.y - R}
            x2={corner.x}
            y2={corner.y}
            stroke={alpha(colors.primary, 0.4)}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={corner.x}
            y2={corner.y}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <line
            x1={O.x + R}
            y1={O.y}
            x2={O.x}
            y2={O.y - R}
            stroke={colors.orange}
            strokeWidth={8}
          />
          {/* the balance */}
          <g transform="translate(1340 640)">
            <path
              d="M -40 120 L 0 0 L 40 120 Z"
              fill={alpha(colors.wood, 0.8)}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <g transform={`rotate(${tilt})`}>
              <line
                x1={-300}
                y1={0}
                x2={300}
                y2={0}
                stroke={level ? colors.green : colors.text}
                strokeWidth={10}
                strokeLinecap="round"
              />
              <g transform={`translate(-240 0) rotate(${-tilt})`}>
                <line
                  x1={-70}
                  y1={-6}
                  x2={70}
                  y2={-6}
                  stroke={colors.text}
                  strokeWidth={6}
                />
                {[0, 1].map((n) => (
                  <rect
                    key={n}
                    x={-50}
                    y={-6 - (n + 1) * diag2 * H}
                    width={100}
                    height={diag2 * H - 4}
                    rx={6}
                    fill={colors.orange}
                  />
                ))}
              </g>
              <g transform={`translate(240 0) rotate(${-tilt})`}>
                <line
                  x1={-70}
                  y1={-6}
                  x2={70}
                  y2={-6}
                  stroke={colors.text}
                  strokeWidth={6}
                />
                {[0, 1, 2, 3].map((n) => (
                  <rect
                    key={n}
                    x={-50}
                    y={-6 - (n + 1) * H}
                    width={100}
                    height={H - 4}
                    rx={6}
                    fill={colors.primary}
                  />
                ))}
              </g>
            </g>
            <circle r={12} fill={colors.text} />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 16),
          }}
        >
          {tx.parallelogram}
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 140,
            fontFamily: fonts.mono,
            fontSize: 72,
            fontWeight: 800,
            color: level ? colors.green : colors.text,
            opacity: fadeIn(frame, c1 + 20),
          }}
        >
          p = {p > 30 ? "∞" : p.toFixed(1)}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
