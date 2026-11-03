import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Ledger } from "../components/ledger";

// The new spaces. A sequence (1, ½, ⅓, …) as bars running off to the
// right (c0). Each bar's square stacks into a column whose height is read
// out, climbing towards π²/6 ≈ 1.645: a vector of ℓ² (c1). Three small
// charts, each a single bar: e₁, e₂, e₃ (c2). A function on [0, 1] with
// a dashed line at its highest point: its sup size (c3). The ledger
// slides in on the right (c4).

const N = 40;
const BW = 26;
const X0 = 180;
const Y0 = 520;

export const Spaces: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useCues("spaces");
  const [c0, c1, c2, c3, c4] = cues;
  const part1 = fadeOut(frame, c2, 10);
  const grow = glide(frame, c0 + 6, fps, 40);
  const k = Math.min(N, Math.floor(Math.max(0, frame - c1 - 6) / 2.5));
  const sum = Array.from({ length: k }, (_, i) => 1 / (i + 1) ** 2).reduce(
    (a, b) => a + b,
    0,
  );
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const part3 = fadeIn(frame, c3 + 4, 10);
  const f = (x: number) =>
    0.35 + 0.35 * Math.sin(5 * x + 0.4) * Math.exp(-x) + 0.2 * x;
  let mx = 0;
  let mxX = 0;
  for (let i = 0; i <= 200; i++) {
    const v = f(i / 200);
    if (v > mx) {
      mx = v;
      mxX = i / 200;
    }
  }

  return (
    <SceneShell id="spaces">
      <Sfx name="whoosh" at={c0 + 6} volume={0.1} />
      <Sfx name="riser" at={c1 + 6} volume={0.08} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="pop" at={c2 + 12} volume={0.12} />
      <Sfx name="pop" at={c2 + 18} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 30} volume={0.14} />
      <Sfx name="whoosh" at={c4 + 6} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={part1}>
          <line
            x1={X0 - 20}
            y1={Y0}
            x2={X0 + N * BW + 20}
            y2={Y0}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: N }).map((_, i) => {
            const h = (300 / (i + 1)) * grow;
            const o = Math.max(0, Math.min(1, (N - i) / 12));
            return (
              <rect
                key={i}
                x={X0 + i * BW}
                y={Y0 - h}
                width={BW - 6}
                height={h}
                rx={3}
                fill={i < k ? colors.primary : alpha(colors.paper, 0.6)}
                opacity={o}
              />
            );
          })}
          {/* the squares, stacked */}
          <g opacity={fadeIn(frame, c1 + 4, 8)}>
            <line
              x1={1180}
              y1={Y0}
              x2={1260}
              y2={Y0}
              stroke={colors.text}
              strokeWidth={3}
            />
            <rect
              x={1190}
              y={Y0 - sum * 200}
              width={60}
              height={sum * 200}
              fill={colors.primary}
            />
            <line
              x1={1170}
              y1={Y0 - (Math.PI ** 2 / 6) * 200}
              x2={1280}
              y2={Y0 - (Math.PI ** 2 / 6) * 200}
              stroke={colors.green}
              strokeWidth={4}
              strokeDasharray="10 8"
            />
            <text
              x={1220}
              y={Y0 + 60}
              fill={colors.text}
              fontSize={40}
              fontFamily={fonts.mono}
              fontWeight={800}
              textAnchor="middle"
            >
              {sum.toFixed(3)}
            </text>
            <text
              x={1300}
              y={Y0 - (Math.PI ** 2 / 6) * 200 + 12}
              fill={colors.green}
              fontSize={40}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              π²/6
            </text>
          </g>
        </g>
        <g opacity={part2}>
          {[0, 1, 2].map((j) => (
            <g
              key={j}
              transform={`translate(${200 + j * 360} 300)`}
              opacity={fadeIn(frame, c2 + 6 + j * 6, 8)}
            >
              <line
                x1={-10}
                y1={220}
                x2={300}
                y2={220}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={3}
              />
              {Array.from({ length: 8 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 36}
                  y={i === j ? 40 : 216}
                  width={28}
                  height={i === j ? 180 : 4}
                  rx={3}
                  fill={i === j ? colors.green : alpha(colors.paper, 0.4)}
                />
              ))}
              <text
                x={140}
                y={290}
                fill={colors.green}
                fontSize={48}
                fontFamily={fonts.math}
                fontWeight={800}
                textAnchor="middle"
              >
                e{["₁", "₂", "₃"][j]}
              </text>
            </g>
          ))}
        </g>
        <g opacity={part3}>
          <line
            x1={200}
            y1={700}
            x2={1100}
            y2={700}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={Array.from(
              { length: 201 },
              (_, i) =>
                `${i ? "L" : "M"} ${200 + 900 * (i / 200)} ${700 - 500 * f(i / 200)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={7}
          />
          <line
            x1={200}
            y1={700 - 500 * mx}
            x2={1100}
            y2={700 - 500 * mx}
            stroke={colors.orange}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={fadeIn(frame, c3 + 30, 8)}
          />
          <circle
            cx={200 + 900 * mxX}
            cy={700 - 500 * mx}
            r={12}
            fill={colors.orange}
            opacity={fadeIn(frame, c3 + 30, 8)}
          />
          <text
            x={200}
            y={760}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.mono}
          >
            0
          </text>
          <text
            x={1100}
            y={760}
            fill={colors.muted}
            fontSize={36}
            fontFamily={fonts.mono}
            textAnchor="end"
          >
            1
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 4) * part1,
        }}
      >
        x = (1, ½, ⅓, ¼, …)
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 56,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c3 + 30) * part3,
          translate: riseIn(frame, c3 + 30, 12),
        }}
      >
        ‖f‖<sub style={{ fontSize: 36 }}>∞</sub> = max |f|
      </div>
      <Ledger crossed={0} opacity={fadeIn(frame, c4 + 6, 12)} />
    </SceneShell>
  );
};
