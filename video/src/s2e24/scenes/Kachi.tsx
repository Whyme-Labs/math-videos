import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. The bronze caliper of the Xin dynasty (始建国元年,
// AD 9), with its inscription (c0). A fixed jaw and a sliding jaw on a
// graduated beam (c1). A small object between the jaws grows a little
// thicker and thinner; the sliding jaw follows and the reading changes
// only a little each time (c2). A chip: a trustworthy gauge is a
// continuous measurement (c3).

const BEAM = { x: 300, y: 380, w: 1100 };
const U = 100; // pixels per 寸

export const Kachi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("kachi");
  const [c0, c1, c2, c3] = cues;
  const th = 2.3 + (frame >= c2 ? 0.25 * Math.sin((frame - c2) * 0.05) : 0);
  const jaw = BEAM.x + 160 + th * U;

  return (
    <SceneShell id="kachi">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="clink" at={c1 + 6} volume={0.18} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.12} />
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 6, 10)}>
          <rect
            x={BEAM.x}
            y={BEAM.y}
            width={BEAM.w}
            height={60}
            rx={8}
            fill={colors.wood}
          />
          {Array.from({ length: 61 }).map((_, i) => (
            <line
              key={i}
              x1={BEAM.x + 160 + i * (U / 10)}
              y1={BEAM.y}
              x2={BEAM.x + 160 + i * (U / 10)}
              y2={BEAM.y + (i % 10 ? 14 : 30)}
              stroke={colors.ink}
              strokeWidth={3}
            />
          ))}
          {/* the fixed jaw */}
          <rect
            x={BEAM.x + 100}
            y={BEAM.y + 60}
            width={60}
            height={240}
            fill={colors.wood}
          />
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 10)}>
          {/* the sliding jaw */}
          <rect
            x={jaw}
            y={BEAM.y - 20}
            width={70}
            height={100}
            rx={6}
            fill={alpha(colors.wood, 0.9)}
            stroke={colors.paper}
            strokeWidth={3}
          />
          <rect
            x={jaw}
            y={BEAM.y + 60}
            width={60}
            height={240}
            fill={alpha(colors.wood, 0.9)}
            stroke={colors.paper}
            strokeWidth={3}
          />
        </g>
        <rect
          x={BEAM.x + 160}
          y={BEAM.y + 140}
          width={th * U}
          height={120}
          rx={10}
          fill={alpha(colors.primary, 0.6)}
          opacity={fadeIn(frame, c2 + 4, 8)}
        />
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
        {tx.kachi}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          fontSize: 40,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c0 + 20),
        }}
      >
        “始建国元年正月癸酉朔日制”
      </div>
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 300,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 6),
        }}
      >
        {tx.reading}{" "}
        <span style={{ fontFamily: fonts.mono }}>{th.toFixed(2)}</span> 寸
      </div>
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 1000,
          padding: "10px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.green}`,
          background: alpha(colors.bg, 0.85),
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c3 + 6),
          translate: riseIn(frame, c3 + 6, 12),
          whiteSpace: "nowrap",
        }}
      >
        |f(x) − f(y)| ≤ C‖x − y‖
      </div>
    </SceneShell>
  );
};
