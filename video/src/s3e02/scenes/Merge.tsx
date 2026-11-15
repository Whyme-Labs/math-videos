import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The dictionary. Two columns far apart, ℤ on the left and F[x] on the
// right (c0). Rows arrive with a thread between their two sides: primes,
// then prime powers and Jordan blocks (c1), the order and the
// characteristic polynomial (c2), the largest order and the minimal
// polynomial (c3). The columns slide together and every thread glows (c4).

export const Merge: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("merge");
  const [c0, c1, c2, c3, c4] = cues;
  const close = progress(frame, c4 + 6, 40);
  const gap = 260 - 200 * close;
  const rowAt = [c1 + 6, c1 + 40, c2 + 6, c3 + 6];
  const ROWY = [330, 450, 570, 690];

  return (
    <SceneShell id="merge">
      <Sfx name="whoosh" at={c0 + 4} volume={0.1} />
      {rowAt.map((f, i) => (
        <Sfx key={i} name="pluck3" at={f + 4} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c4 + 6} volume={0.14} />
      <Sfx name="chime" at={c4 + 46} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {ROWY.map((y, i) => (
          <g key={i} opacity={fadeIn(frame, rowAt[i], 10)}>
            <line
              x1={960 - gap + 20}
              y1={y - 14}
              x2={960 + gap - 20}
              y2={y - 14}
              stroke={close > 0.9 ? colors.green : alpha(colors.paper, 0.5)}
              strokeWidth={close > 0.9 ? 6 : 3}
              strokeDasharray={close > 0.9 ? undefined : "10 8"}
            />
            <text
              x={960 - gap}
              y={y}
              textAnchor="end"
              fill={colors.highlight}
              fontSize={46}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.rowsZ[i]}
            </text>
            <text
              x={960 + gap}
              y={y}
              textAnchor="start"
              fill={colors.primary}
              fontSize={46}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.rowsFx[i]}
            </text>
          </g>
        ))}
        <g opacity={fadeIn(frame, c0 + 4, 10)}>
          <text
            x={960 - gap}
            y={200}
            textAnchor="end"
            fill={colors.muted}
            fontSize={44}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.colZ} · {tx.s1}
          </text>
          <text
            x={960 + gap}
            y={200}
            textAnchor="start"
            fill={colors.muted}
            fontSize={44}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.colFx} · {tx.s2}
          </text>
          <line
            x1={960 - gap - 600}
            y1={232}
            x2={960 + gap + 600}
            y2={232}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
        </g>
      </svg>
      <Chip
        frame={frame}
        at={c4 + 46}
        x={820}
        y={750}
        size={40}
        color={colors.green}
      >
        {tx.oneTheorem}
      </Chip>
    </SceneShell>
  );
};
