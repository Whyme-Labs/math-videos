import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Orthogonality by shifting the sum. The 8 values of χ₃ on ℤ/8 laid head
// to tail (c0). Shifting the sum multiplies every arrow by χ₃(1): the whole
// chain turns (c1), yet it is the same chain, so the sum S, the gap from
// start to end, must be 0 (c2). The 8 × 8 grid of ⟨χⱼ, χₖ⟩, lit only on
// the diagonal (c3). A signal's 8 samples, and its 8 Fourier coordinates
// (c4).

const N = 8;
const K = 3;
const TH = (2 * Math.PI) / N;
const O = { x: 760, y: 470 };
const L = 300;
const SIGNAL = [3, 1, 0, 1, 2, 1, 0, 1];
// |f̂(k)| for the signal above
const SPEC = Array.from({ length: N }, (_, k) => {
  let re = 0;
  let im = 0;
  SIGNAL.forEach((v, j) => {
    re += v * Math.cos(-TH * j * k);
    im += v * Math.sin(-TH * j * k);
  });
  return Math.hypot(re, im);
});

export const Orth: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("orth");
  const [c0, c1, c2, c3, c4] = cues;
  const chain = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c3, 10);
  const shown = Math.min(
    N,
    Math.max(0, Math.floor((frame - c0 - 15) / 12) + 1),
  );
  const turn = K * TH * progress(frame, c1 + 15, 40);
  const pts = [[O.x, O.y]];
  for (let j = 0; j < N; j++) {
    const a = j * K * TH + turn;
    const [px, py] = pts[pts.length - 1];
    pts.push([px + L * Math.cos(a), py - L * Math.sin(a)]);
  }
  const grid = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 10);
  const bars = fadeIn(frame, c4 + 4, 10);

  return (
    <SceneShell id="orth">
      {Array.from({ length: N }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 15 + i * 12} volume={0.06} />
      ))}
      <Sfx name="whoosh" at={c1 + 15} volume={0.12} />
      <Sfx name="ding" at={c2 + 10} volume={0.16} />
      <Sfx name="sparkle" at={c3 + 10} volume={0.18} />
      <Sfx name="pluck3" at={c4 + 10} volume={0.12} />
      <Sfx name="pluck4" at={c4 + 50} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={chain}>
          {pts.slice(0, shown).map((p, i) => {
            const q = pts[i + 1];
            return (
              <g key={i}>
                <line
                  x1={p[0]}
                  y1={p[1]}
                  x2={q[0]}
                  y2={q[1]}
                  stroke={i % 2 ? colors.highlight : colors.primary}
                  strokeWidth={7}
                  strokeLinecap="round"
                />
                <circle cx={q[0]} cy={q[1]} r={8} fill={colors.text} />
              </g>
            );
          })}
          <circle
            cx={O.x}
            cy={O.y}
            r={16}
            fill={frame > c2 ? colors.green : colors.text}
          />

          <text
            x={1400}
            y={300}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={52}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 10, 10)}
          >
            × χ₃(1)
          </text>
        </g>
        <g opacity={grid}>
          {Array.from({ length: N * N }, (_, i) => {
            const r = Math.floor(i / N);
            const c = i % N;
            const d = r === c;
            return (
              <g key={i} opacity={fadeIn(frame, c3 + 6 + (r + c) * 2, 6)}>
                <rect
                  x={620 + c * 86}
                  y={150 + r * 76}
                  width={78}
                  height={68}
                  rx={10}
                  fill={
                    d ? alpha(colors.primary, 0.3) : alpha(colors.paper, 0.05)
                  }
                  stroke={d ? colors.primary : alpha(colors.paper, 0.2)}
                  strokeWidth={2}
                />
                <text
                  x={659 + c * 86}
                  y={196 + r * 76}
                  textAnchor="middle"
                  fill={d ? colors.primary : alpha(colors.paper, 0.4)}
                  fontSize={32}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  {d ? 8 : 0}
                </text>
              </g>
            );
          })}
          <text
            x={560}
            y={460}
            textAnchor="end"
            fill={colors.text}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ⟨χⱼ, χₖ⟩
          </text>
        </g>
        <g opacity={bars}>
          {SIGNAL.map((v, i) => (
            <rect
              key={i}
              x={240 + i * 70}
              y={620 - v * 90}
              width={50}
              height={v * 90 + 2}
              rx={6}
              fill={colors.primary}
              opacity={fadeIn(frame, c4 + 6 + i * 3, 6)}
            />
          ))}
          <text
            x={960}
            y={480}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={80}
            fontFamily={fonts.math}
          >
            →
          </text>
          {SPEC.map((v, i) => (
            <rect
              key={i}
              x={1140 + i * 70}
              y={620 - v * 30}
              width={50}
              height={v * 30 + 2}
              rx={6}
              fill={colors.highlight}
              opacity={fadeIn(frame, c4 + 50 + i * 3, 6)}
            />
          ))}
          <text
            x={480}
            y={690}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={38}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.signal} f
          </text>
          <text
            x={1380}
            y={690}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={38}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.spectrum} |f̂|
          </text>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 30}
          x={1220}
          y={600}
          size={40}
          math
          color={colors.green}
        >
          {tx.sumZero}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 40}
          x={1360}
          y={720}
          size={40}
          color={colors.primary}
        >
          {tx.basis}
        </Chip>
      </div>
    </SceneShell>
  );
};
