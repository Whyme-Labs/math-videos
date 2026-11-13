import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// Position has no eigenvalues. A function f on [0, 1] and x·f beside it
// (c0). Trying x·f = λf: f squeezes into a spike at x = λ (c1), and the
// spike collapses to nothing; chip (c2). A detector screen for position
// (c3) and the textbook rule as a chip (c4). Hits land on the screen and a
// histogram of positions builds up under it (c5). The rule is struck out
// (c6). The real line with the band [0, 1] lighting up: the spectrum of
// multiplication by x (c7).

const LAM = 0.62;
const X = (t: number) => 160 + 760 * t;
const Y = (v: number) => 640 - 300 * v;
const f0 = (x: number) => 0.45 + 0.25 * Math.sin(2 * Math.PI * x + 0.6);
// positions of the detector hits, roughly bell-shaped around 0.45
const hit = (i: number) =>
  Math.min(
    0.99,
    Math.max(
      0.01,
      0.45 + 0.3 * (rnd(3 * i + 1) + rnd(3 * i + 2) + rnd(3 * i + 3) - 1.5),
    ),
  );
const BINS = 24;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const left = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c7, 10);
  const right = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c7, 10);
  const end = fadeIn(frame, c7 + 4, 10);
  // the eigenfunction attempt: f morphs into a narrowing bump at λ
  const m = progress(frame, c1 + 6, 20);
  const w = 0.2 * (1 - progress(frame, c1 + 26, 60)) + 0.004;
  const collapse = 1 - progress(frame, c2 + 6, 24);
  const f = (x: number) =>
    (1 - m) * f0(x) + m * 0.8 * collapse * Math.exp(-(((x - LAM) / w) ** 2));
  const hits = Math.min(420, Math.max(0, Math.floor((frame - c5 - 4) * 3)));
  const counts = Array.from({ length: BINS }, () => 0);
  for (let i = 0; i < hits; i++)
    counts[Math.min(BINS - 1, Math.floor(hit(i) * BINS))] += 1;
  const band = progress(frame, c7 + 10, 40);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pluck3" at={c0 + 30} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 26} volume={0.1} />
      <Sfx name="thud" at={c2 + 20} volume={0.2} />
      <Sfx name="pop" at={c3 + 6} volume={0.12} />
      <Sfx name="pluck2" at={c4 + 8} volume={0.12} />
      {Array.from({ length: 12 }, (_, i) => (
        <Sfx key={i} name="tick" at={c5 + 6 + i * 9} volume={0.05} />
      ))}
      <Sfx name="scratch" at={c6 + 8} volume={0.2} />
      <Sfx name="chime" at={c7 + 40} volume={0.28} />

      <AbsoluteFill style={{ opacity: left }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {[0, 1].map((t) => (
            <text
              key={t}
              x={X(t)}
              y={Y(0) + 46}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={32}
              fontFamily={fonts.mono}
            >
              {t}
            </text>
          ))}
          <line
            x1={X(LAM)}
            y1={Y(0)}
            x2={X(LAM)}
            y2={Y(1)}
            stroke={colors.highlight}
            strokeWidth={3}
            strokeDasharray="10 8"
            opacity={fadeIn(frame, c1 + 10, 8)}
          />
          <text
            x={X(LAM)}
            y={Y(0) + 46}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={32}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 10, 8)}
          >
            λ
          </text>
          <path
            d={path((x) => x * f0(x), 0, 1, X, Y, 200)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 30, 8) * fadeOut(frame, c1, 8)}
          />
          <path
            d={path(f, 0, 1, X, Y, 600)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 6, 8)}
          />
          <circle
            cx={X(LAM)}
            cy={Y(0)}
            r={16}
            fill="none"
            stroke={colors.red}
            strokeWidth={5}
            opacity={fadeIn(frame, c2 + 26, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            whiteSpace: "nowrap",
            color: colors.text,
            opacity: fadeIn(frame, c0 + 6) * fadeOut(frame, c2 + 16, 8),
          }}
        >
          <span style={{ color: colors.primary }}>f</span>
          {"  ↦  "}
          <span style={{ color: frame < c1 ? colors.orange : colors.text }}>
            x · f
          </span>
          {frame >= c1 && (
            <span style={{ opacity: fadeIn(frame, c1 + 4) }}> = λ f ?</span>
          )}
        </div>
        <Chip
          frame={frame}
          at={c2 + 30}
          x={160}
          y={190}
          color={colors.red}
          size={44}
        >
          {tx.noEigen}
        </Chip>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: right }}>
        <svg width={1920} height={1080}>
          <rect
            x={1060}
            y={300}
            width={700}
            height={150}
            rx={16}
            fill={alpha(colors.ink, 0.6)}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
          />
          {Array.from({ length: hits }, (_, i) => (
            <circle
              key={i}
              cx={1080 + 660 * hit(i)}
              cy={320 + 110 * rnd(7 * i + 5)}
              r={4}
              fill={colors.highlight}
              opacity={Math.max(0.35, 1 - (hits - i) / 60)}
            />
          ))}
          <line
            x1={1060}
            y1={760}
            x2={1760}
            y2={760}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {counts.map((c, b) => (
            <rect
              key={b}
              x={1064 + (692 * b) / BINS}
              y={760 - 4.2 * c}
              width={692 / BINS - 4}
              height={4.2 * c}
              fill={colors.primary}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 470,
            left: 1060,
            width: 700,
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            color: colors.muted,
          }}
        >
          {tx.position}
        </div>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 1060,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.orange}`,
            fontSize: 44,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c4 + 6),
            whiteSpace: "nowrap",
          }}
        >
          {tx.rule}
          <div
            style={{
              position: "absolute",
              left: -10,
              right: -10,
              top: "50%",
              height: 7,
              background: colors.red,
              transformOrigin: "left",
              scale: `${progress(frame, c6 + 6, 14)} 1`,
            }}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: end }}>
        <svg width={1920} height={1080}>
          <line
            x1={260}
            y1={480}
            x2={1660}
            y2={480}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <rect
            x={660}
            y={462}
            width={600 * band}
            height={36}
            rx={18}
            fill={colors.green}
          />
          {[0, 1].map((t) => (
            <text
              key={t}
              x={660 + 600 * t}
              y={550}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={36}
              fontFamily={fonts.mono}
            >
              {t}
            </text>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c7 + 30),
          }}
        >
          σ(Mₓ) = [0, 1]
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
