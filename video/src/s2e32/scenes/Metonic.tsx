import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. The old calendar's cycle of 19 years with 7 leap
// months. The book and the rule (c0). A year is about 12.368 months (c1).
// A circle of the moon's phase: each year the phase on New Year's day
// moves on by 0.368 of a turn, a dot per year, numbered (c2). The 19th dot
// lands almost on the first, ringed; 19 × 12.368 = 235 (c3).

const CX = 720;
const CY = 500;
const R = 260;
const FRAC = 365.25 / 29.530589 - 12;

export const Metonic: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("metonic");
  const [c0, c1, c2, c3] = cues;
  const years = Math.min(19, Math.max(0, Math.floor((frame - c2 - 6) / 8)));
  const pos = (k: number) => {
    const a = Math.PI / 2 - 2 * Math.PI * ((k * FRAC) % 1);
    return [CX + R * Math.cos(a), CY - R * Math.sin(a)] as const;
  };

  return (
    <SceneShell id="metonic">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      {Array.from({ length: 19 }, (_, i) => (
        <Sfx key={i} name="tick" at={c2 + 6 + i * 8} volume={0.05} />
      ))}
      <Sfx name="chime" at={c3 + 20} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c1 + 4, 10)}>
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={4}
          />
          <circle cx={CX} cy={CY} r={60} fill={colors.paper} />
          <circle cx={CX + 24} cy={CY - 6} r={54} fill={colors.bg} />
        </g>
        {Array.from({ length: years + 1 }, (_, k) => {
          const [x, y] = pos(k);
          const m = k === 19 ? 1.28 : 1.16;
          const [lx, ly] = [CX + (x - CX) * m, CY + (y - CY) * m];
          return (
            <g key={k} opacity={frame >= c2 + 6 || k === 0 ? 1 : 0}>
              <circle
                cx={x}
                cy={y}
                r={k === 0 || k === 19 ? 14 : 9}
                fill={
                  k === 0
                    ? colors.green
                    : k === 19
                      ? colors.primary
                      : colors.orange
                }
              />
              {((k > 0 && k < 6) || k === 19) && (
                <text
                  x={lx}
                  y={ly + 12}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={30}
                  fontFamily={fonts.mono}
                >
                  {k}
                </text>
              )}
            </g>
          );
        })}
        <circle
          cx={pos(0)[0]}
          cy={pos(0)[1]}
          r={30}
          fill="none"
          stroke={colors.primary}
          strokeWidth={5}
          opacity={fadeIn(frame, c3 + 10, 8)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.mtTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1160,
          fontSize: 44,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {tx.mtMonths}
      </div>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1160,
          fontFamily: fonts.mono,
          fontSize: 44,
          fontWeight: 800,
          color: colors.orange,
          opacity: fadeIn(frame, c2 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {years} {tx.mtYear} · {(years * FRAC).toFixed(3)} 圈
      </div>
      <Chip
        frame={frame}
        at={c3 + 20}
        x={1160}
        y={500}
        color={colors.primary}
        size={44}
        math
      >
        19 × 12.368 = 235.0
      </Chip>
    </SceneShell>
  );
};
