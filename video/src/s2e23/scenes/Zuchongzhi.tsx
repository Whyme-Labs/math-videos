import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 祖冲之's bounds on π from 《隋书·律历志》: 盈数
// 3.1415927 and 朒数 3.1415926. A ladder of number lines, each a zoom
// into the highlighted piece of the one above, from [3, 4] down to
// [3.1415926, 3.1415927] (c0–c2); the two bounds are labelled 盈 and 朒
// as they arrive (c1, c2). At the bottom the two bounds squeeze one point
// between them, lit in green: nested bounds always pin down a real number
// (c3).

const PI = Math.PI;
const LEVELS = 8;

export const Zuchongzhi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("zuchongzhi");
  const [c0, c1, c2, c3] = cues;
  const shown = Math.min(
    LEVELS,
    Math.floor(Math.max(0, frame - c0 - 10) / 14) + 1,
  );
  const X0 = 300;
  const W = 1080;

  return (
    <SceneShell id="zuchongzhi">
      {Array.from({ length: LEVELS }).map((_, i) => (
        <Sfx key={i} name="tick" at={c0 + 10 + i * 14} volume={0.1} />
      ))}
      <Sfx name="pluck2" at={c1 + 10} volume={0.14} />
      <Sfx name="pluck4" at={c2 + 10} volume={0.14} />
      <Sfx name="chime" at={c3 + 20} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: shown }).map((_, i) => {
          const step = 10 ** -i;
          const lo = Math.floor(PI / step) * step;
          const piece = step / 10;
          const plo = Math.floor(PI / piece) * piece;
          const sx = (v: number) => X0 + ((v - lo) / step) * W;
          const y = 200 + i * 70;
          return (
            <g key={i}>
              <line
                x1={X0}
                y1={y}
                x2={X0 + W}
                y2={y}
                stroke={alpha(colors.paper, 0.6)}
                strokeWidth={3}
              />
              <rect
                x={sx(plo)}
                y={y - 12}
                width={W / 10}
                height={24}
                fill={
                  i === LEVELS - 1 ? colors.green : alpha(colors.primary, 0.7)
                }
              />
              <text
                x={X0 - 20}
                y={y + 12}
                fill={colors.muted}
                fontSize={30}
                fontFamily={fonts.mono}
                textAnchor="end"
              >
                {lo.toFixed(i)}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.zu}
      </div>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1480,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontFamily: fonts.mono,
          fontSize: 42,
          fontWeight: 800,
        }}
      >
        <div
          style={{ color: colors.highlight, opacity: fadeIn(frame, c1 + 10) }}
        >
          {tx.ying} 3.1415927
        </div>
        <div style={{ color: colors.orange, opacity: fadeIn(frame, c2 + 10) }}>
          {tx.nu} 3.1415926
        </div>
        <div
          style={{
            color: colors.green,
            opacity: fadeIn(frame, c3 + 20),
            fontFamily: fonts.math,
          }}
        >
          π ∈ ℝ
        </div>
      </div>
    </SceneShell>
  );
};
