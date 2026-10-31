import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 杨辉三角 (贾宪's table, recorded by 杨辉 in 1261),
// drawn left-aligned so its shallow diagonals are straight lines. The rows
// build one by one; then the diagonals light up in turn, each summed at its
// left end: 1, 1, 2, 3, 5, 8, 13, 21. Last, the step "add the last two" as
// a matrix [[1, 1], [1, 0]] on the right.

const N = 8;
const C = (n: number, k: number) => {
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
};
const X0 = 520;
const Y0 = 200;
const DX = 92;
const DY = 72;

export const Yanghui: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("yanghui");
  const [c0, c1, c2] = cues;
  const row = (n: number) => fadeIn(frame, c0 + 20 + n * 6, 8);
  const diagAt = (d: number) => c1 + 10 + d * 12;
  const card = Math.min(1, springIn(frame, c2 + 20, fps, 10));

  return (
    <SceneShell id="yanghui">
      {Array.from({ length: N + 1 }).map((_, n) => (
        <Sfx key={n} name="tick" at={c0 + 20 + n * 6} volume={0.1} />
      ))}
      {Array.from({ length: N }).map((_, d) => (
        <Sfx key={`d${d}`} name={PLUCKS[d % 6]} at={diagAt(d)} volume={0.12} />
      ))}
      <Sfx name="chime" at={c2 + 20} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the diagonals */}
        {Array.from({ length: N }).map((_, d) => {
          const end = Math.floor(d / 2);
          const s = fadeIn(frame, diagAt(d), 6);
          let sum = 0;
          for (let k = 0; k <= end; k++) sum += C(d - k, k);
          return (
            <g key={d} opacity={s}>
              <line
                x1={X0}
                y1={Y0 + d * DY}
                x2={X0 + end * DX + 1}
                y2={Y0 + (d - end) * DY}
                stroke={alpha(colors.orange, 0.7)}
                strokeWidth={46}
                strokeLinecap="round"
                opacity={0.35}
              />
              <text
                x={X0 - 70}
                y={Y0 + d * DY + 14}
                fill={colors.orange}
                fontSize={44}
                textAnchor="end"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {sum}
              </text>
            </g>
          );
        })}
        {/* the triangle */}
        {Array.from({ length: N + 1 }).map((_, n) =>
          Array.from({ length: n + 1 }).map((__, k) => (
            <text
              key={`${n}${k}`}
              x={X0 + k * DX}
              y={Y0 + n * DY + 14}
              fill={colors.text}
              fontSize={38}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={700}
              opacity={row(n)}
            >
              {C(n, k)}
            </text>
          )),
        )}
        {/* add the last two: one linear map */}
        <g opacity={card} transform={`translate(1560 400) scale(${card})`}>
          <path
            d="M -100 -90 l -20 0 l 0 180 l 20 0 M 100 -90 l 20 0 l 0 180 l -20 0"
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          {["1", "1", "1", "0"].map((n, k) => (
            <text
              key={k}
              x={-50 + (k % 2) * 100}
              y={-14 + Math.floor(k / 2) * 90}
              fill={colors.primary}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {n}
            </text>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.yanghui}
      </div>
    </SceneShell>
  );
};
