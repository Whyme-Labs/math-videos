import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { path, square, squareSum } from "../components/waves";
import { useStrings } from "../i18n";

// Sounds as recipes. A violin waveform and a flute waveform at the same
// pitch (c0); under each, its recipe: bars for the harmonics (c1); the
// separate pure tones fade in over each waveform (c2). Fourier, 1807 (c3):
// a square wave, and its partial sums piling up harmonic by harmonic
// (c4); red rings mark the overshoots at the corners, with Lagrange's
// doubt (c5). A big "= ?" (c6). Two unit arrows at a right angle: pure
// tones are perpendicular unit vectors (c7).

const VIOLIN = [1, 0.5, 0.33, 0.25, 0.2, 0.16, 0.14];
const FLUTE = [1, 0.18, 0.06, 0.02, 0, 0, 0];
const wave = (amps: number[]) => (x: number) =>
  amps.reduce((s, a, k) => s + a * Math.sin((k + 1) * x), 0) / 1.6;

const Panel: React.FC<{
  x: number;
  amps: number[];
  label: string;
  frame: number;
  c0: number;
  c1: number;
  c2: number;
}> = ({ x, amps, label, frame, c0, c1, c2 }) => {
  const X = (t: number) => x + (640 * t) / (4 * Math.PI);
  const Y = (v: number) => 360 - 130 * v;
  return (
    <g opacity={fadeIn(frame, c0 + 6, 10)}>
      <line
        x1={x}
        y1={360}
        x2={x + 640}
        y2={360}
        stroke={alpha(colors.paper, 0.3)}
        strokeWidth={2}
      />
      {amps.map((a, k) =>
        a > 0.01 ? (
          <path
            key={k}
            d={path(
              (t) => (a * Math.sin((k + 1) * t)) / 1.6,
              0,
              4 * Math.PI,
              X,
              Y,
              300,
            )}
            fill="none"
            stroke={alpha(colors.orange, 0.55)}
            strokeWidth={2}
            opacity={fadeIn(frame, c2 + 6 + k * 6, 8)}
          />
        ) : null,
      )}
      <path
        d={path(wave(amps), 0, 4 * Math.PI, X, Y, 400)}
        fill="none"
        stroke={colors.primary}
        strokeWidth={5}
      />
      <text
        x={x}
        y={200}
        fill={colors.text}
        fontSize={44}
        fontFamily={fonts.body}
        fontWeight={800}
      >
        {label}
      </text>
      <line
        x1={x}
        y1={760}
        x2={x + 640}
        y2={760}
        stroke={alpha(colors.paper, 0.4)}
        strokeWidth={3}
        opacity={fadeIn(frame, c1 + 4, 8)}
      />
      {amps.map((a, k) => (
        <rect
          key={k}
          x={x + 20 + k * 88}
          y={760 - 220 * a * fadeIn(frame, c1 + 6 + k * 4, 8)}
          width={56}
          height={220 * a * fadeIn(frame, c1 + 6 + k * 4, 8)}
          rx={6}
          fill={colors.orange}
        />
      ))}
    </g>
  );
};

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const partA = fadeOut(frame, c3, 10);
  const partB = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c7, 10);
  const N = Math.min(
    41,
    1 + 2 * Math.max(0, Math.floor((frame - c4 - 6) / 10)),
  );
  const X = (t: number) => 200 + (1520 * (t + Math.PI)) / (4 * Math.PI);
  const Y = (v: number) => 520 - 200 * v;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pluck1" at={c0 + 6} volume={0.14} />
      <Sfx name="pluck3" at={c0 + 20} volume={0.12} />
      {VIOLIN.map((_, k) => (
        <Sfx key={k} name="tick" at={c1 + 6 + k * 4} volume={0.05} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="page" at={c3 + 6} volume={0.16} />
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx
          key={i}
          name="pluck2"
          at={c4 + 6 + i * 10}
          volume={0.06 + 0.005 * i}
        />
      ))}
      <Sfx name="thud" at={c5 + 10} volume={0.2} />
      <Sfx name="pop" at={c6 + 6} volume={0.14} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <Panel
            x={160}
            amps={VIOLIN}
            label={tx.violin}
            frame={frame}
            c0={c0}
            c1={c1}
            c2={c2}
          />
          <Panel
            x={1060}
            amps={FLUTE}
            label={tx.flute}
            frame={frame}
            c0={c0 + 10}
            c1={c1}
            c2={c2}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          <line
            x1={200}
            y1={520}
            x2={1720}
            y2={520}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={path(square, -Math.PI + 0.001, 3 * Math.PI - 0.001, X, Y, 800)}
            fill="none"
            stroke={alpha(colors.paper, 0.45)}
            strokeWidth={6}
            opacity={fadeIn(frame, c4 + 2, 8)}
          />
          <path
            d={path((x) => squareSum(x, N), -Math.PI, 3 * Math.PI, X, Y, 1200)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={fadeIn(frame, c4 + 6, 8)}
          />
          {[0, Math.PI, 2 * Math.PI].map((j, i) => (
            <circle
              key={i}
              cx={X(j + (i === 1 ? -1 : 1) * (Math.PI / (N + 1)))}
              cy={Y(1.18)}
              r={34}
              fill="none"
              stroke={colors.red}
              strokeWidth={5}
              opacity={fadeIn(frame, c5 + 10, 6)}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 200,
            fontFamily: fonts.title,
            fontSize: 56,
            fontWeight: 700,
            color: colors.text,
            opacity: fadeIn(frame, c3 + 6),
            translate: riseIn(frame, c3 + 6),
          }}
        >
          {tx.fourier1807}
        </div>
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 1240,
            fontFamily: fonts.mono,
            fontSize: 44,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c4 + 6),
          }}
        >
          N = {N}
        </div>
        <div
          style={{
            position: "absolute",
            top: 800,
            left: 200,
            fontSize: 44,
            fontWeight: 800,
            color: colors.red,
            opacity: fadeIn(frame, c5 + 14),
          }}
        >
          {tx.lagrange}
        </div>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 1560,
            fontFamily: fonts.math,
            fontSize: 90,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c6 + 6),
            translate: riseIn(frame, c6 + 6),
          }}
        >
          = ?
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c7 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <defs>
            <marker
              id="co29-h"
              viewBox="0 0 10 10"
              refX={7}
              refY={5}
              markerWidth={4}
              markerHeight={4}
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={colors.primary} />
            </marker>
          </defs>
          <line
            x1={760}
            y1={700}
            x2={1160}
            y2={700}
            stroke={colors.primary}
            strokeWidth={9}
            markerEnd="url(#co29-h)"
          />
          <line
            x1={760}
            y1={700}
            x2={760}
            y2={300}
            stroke={colors.primary}
            strokeWidth={9}
            markerEnd="url(#co29-h)"
          />
          <path
            d="M 800 700 L 800 660 L 760 660"
            fill="none"
            stroke={colors.paper}
            strokeWidth={4}
          />
          <text
            x={1180}
            y={715}
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            sin x
          </text>
          <text
            x={700}
            y={280}
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            sin 2x
          </text>
        </svg>
        <Chip
          frame={frame}
          at={c7 + 20}
          x={1240}
          y={300}
          color={colors.green}
          math
          size={50}
        >
          ⟨eₙ, eₘ⟩ = δₙₘ
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
