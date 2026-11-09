import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// The direct method. Left: a convex bowl F. A bounded sequence hops about
// below it, and a subsequence (lit) homes in on one point (c0). Right: a
// convex blob with the sequence inside; its weak limit lands inside too
// (Mazur) (c1). On the bowl, the values F(xₙ) sit above F(x) (c2). A ball
// rolls down the bowl and settles at the bottom (c3). The worked example:
// G's partial minima −Σ 1/k² running to −π²/6 (c4). Right panel swaps to
// the first, non-convex F: its values along e₁, e₂, … slide down to 0 at
// the far edge, while the weak limit sits high at F(0) = 1 (c5).

const BX = 160;
const BW = 720;
const BY = 720;
const bowl = (u: number) => 0.15 + 1.8 * (u - 0.45) ** 2;
const bx = (u: number) => BX + BW * u;
const by = (v: number) => BY - 420 * v;
const SEQ = Array.from({ length: 16 }, (_, k) =>
  k % 2
    ? 0.45 + 0.4 * 0.75 ** k * (rnd(k) > 0.5 ? 1 : -1)
    : 0.1 + 0.8 * rnd(k + 20),
);

export const Direct: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("direct");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const shown = Math.min(
    SEQ.length,
    Math.max(0, Math.floor((frame - c0 - 6) / 6)),
  );
  const roll = Math.max(0, Math.min(1, (frame - c3 - 6) / 60));
  const u =
    0.05 +
    0.4 * (1 - (1 - roll) ** 2) +
    0.03 * Math.sin(roll * 12) * (1 - roll);
  const terms = Math.min(40, Math.max(0, Math.floor((frame - c4 - 6) / 3)));
  let partial = 0;
  for (let k = 1; k <= terms; k++) partial -= 1 / (k * k);
  const right1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c4, 10);
  const right2 = fadeIn(frame, c5 + 4, 10);
  const blobPts = Array.from({ length: 12 }, (_, k) => {
    const a = rnd(k + 70) * 2 * Math.PI;
    const r = 30 + 110 * 0.8 ** k;
    return [1380 + r * Math.cos(a), 560 + 0.7 * r * Math.sin(a)];
  });
  const nShown = Math.min(10, Math.max(0, Math.floor((frame - c5 - 10) / 8)));

  return (
    <SceneShell id="direct">
      {Array.from({ length: 8 }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 6 + i * 12} volume={0.06} />
      ))}
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="pluck4" at={c2 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="ding" at={c3 + 66} volume={0.22} />
      <Sfx name="chime" at={c4 + 20} volume={0.24} />
      <Sfx name="thud" at={c5 + 80} volume={0.2} />

      <AbsoluteFill
        style={{ opacity: fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c4, 10) }}
      >
        <svg width={1920} height={1080}>
          <line
            x1={BX}
            y1={BY}
            x2={BX + BW}
            y2={BY}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, i) => `${i ? "L" : "M"} ${bx(i / 100)} ${by(bowl(i / 100))}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          {SEQ.slice(0, shown).map((v, k) => (
            <g key={k}>
              <circle
                cx={bx(v)}
                cy={BY + 30}
                r={9}
                fill={k % 2 ? colors.highlight : alpha(colors.paper, 0.4)}
              />
              {frame >= c2 && k % 2 === 1 && (
                <circle
                  cx={bx(v)}
                  cy={by(bowl(v))}
                  r={9}
                  fill={colors.highlight}
                />
              )}
            </g>
          ))}
          <circle
            cx={bx(0.45)}
            cy={BY + 30}
            r={16}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 90, 8)}
          />
          <circle
            cx={bx(0.45)}
            cy={by(bowl(0.45))}
            r={14}
            fill={colors.green}
            opacity={fadeIn(frame, c2 + 20, 8) * (1 - fadeIn(frame, c3, 6))}
          />
          <circle
            cx={bx(u)}
            cy={by(bowl(u)) - 22}
            r={22}
            fill={colors.orange}
            opacity={fadeIn(frame, c3 + 4, 6)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 180,
            left: BX,
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 20),
            whiteSpace: "nowrap",
          }}
        >
          F(x) ≤ lim inf F(xₙ)
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: right1 }}>
        <svg width={1920} height={1080}>
          <ellipse
            cx={1380}
            cy={560}
            rx={230}
            ry={170}
            fill={alpha(colors.primary, 0.15)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          {blobPts.map((p, k) => (
            <circle
              key={k}
              cx={p[0]}
              cy={p[1]}
              r={8}
              fill={colors.highlight}
              opacity={fadeIn(frame, c1 + 8 + k * 4, 4)}
            />
          ))}
          <circle
            cx={1380}
            cy={560}
            r={14}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c1 + 70, 6)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 820 - 40,
            left: 1150,
            width: 460,
            textAlign: "center",
            fontSize: 40,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          {tx.convex}
        </div>
      </AbsoluteFill>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c0 + 10}
          x={BX}
          y={100}
          color={colors.green}
          size={38}
        >
          {tx.reflexive}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 10}
          x={1040}
          y={240}
          color={colors.primary}
          size={34}
        >
          {tx.mazur}
        </Chip>
      </div>
      <AbsoluteFill
        style={{ opacity: fadeIn(frame, c4 + 4, 10) * fadeOut(frame, c5, 10) }}
      >
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          G(x) = ‖x‖² − 2 Σ xₖ / k
        </div>
        <div
          style={{
            position: "absolute",
            top: 440,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 64,
            fontWeight: 800,
            color: colors.green,
            whiteSpace: "nowrap",
          }}
        >
          min G = {partial.toFixed(4)} → −π²/6
        </div>
        <div
          style={{
            position: "absolute",
            top: 560,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 44,
            fontWeight: 800,
            color: colors.muted,
            whiteSpace: "nowrap",
          }}
        >
          x = (1, ½, ⅓, ¼, …)
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: right2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={260}
            y1={720}
            x2={1700}
            y2={720}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <line
            x1={260}
            y1={720}
            x2={1700}
            y2={720}
            stroke={colors.green}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          {Array.from({ length: nShown }, (_, k) => (
            <circle
              key={k}
              cx={700 + k * 100}
              cy={720 - 380 / (k + 1) ** 2}
              r={14}
              fill={colors.highlight}
            />
          ))}
          <rect
            x={360}
            y={340}
            width={80}
            height={380}
            rx={6}
            fill={colors.red}
            opacity={fadeIn(frame, c5 + 80, 8)}
          />
          <text
            x={400}
            y={780}
            textAnchor="middle"
            fill={colors.red}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c5 + 80, 8)}
          >
            F(0) = 1
          </text>
          <text
            x={1700}
            y={680}
            textAnchor="end"
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c5 + 30, 8)}
          >
            F(eₙ) → 0
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 260,
            fontSize: 48,
            fontWeight: 800,
            color: colors.red,
          }}
        >
          {tx.notConvex}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
