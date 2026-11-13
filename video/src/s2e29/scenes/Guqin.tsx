import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. The guqin's thirteen hui and its harmonics. The
// board, one string, and the thirteen hui dots, with Ji Kang's line (c0).
// A finger touches the middle hui and the string rings in its second mode,
// a node at the finger (c1). At the third of the string it rings in the
// third mode; dashed lines show the nodes landing on hui (c2). The plain
// string: several modes added together (c3).

const SX = 220;
const SW = 1480;
const SY = 640;
const HUI = [
  1 / 8,
  1 / 6,
  1 / 5,
  1 / 4,
  1 / 3,
  2 / 5,
  1 / 2,
  3 / 5,
  2 / 3,
  3 / 4,
  4 / 5,
  5 / 6,
  7 / 8,
];

export const Guqin: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("guqin");
  const [c0, c1, c2, c3] = cues;
  const mode = frame < c1 ? 0 : frame < c2 ? 2 : frame < c3 ? 3 : -1;
  const w = Math.cos(frame * 0.5);
  const shape = (s: number) => {
    if (mode === 0) return 0;
    if (mode > 0) return 0.6 * Math.sin(mode * Math.PI * s) * w;
    return (
      (0.5 * Math.sin(Math.PI * s) * Math.cos(frame * 0.25) +
        0.25 * Math.sin(2 * Math.PI * s) * Math.cos(frame * 0.5) +
        0.15 * Math.sin(3 * Math.PI * s) * Math.cos(frame * 0.75)) *
      fadeIn(frame, c3 + 4, 10)
    );
  };
  const finger = mode === 2 ? 1 / 2 : mode === 3 ? 1 / 3 : -1;

  return (
    <SceneShell id="guqin">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      <Sfx name="pluck4" at={c1 + 8} volume={0.18} />
      <Sfx name="pluck5" at={c2 + 8} volume={0.18} />
      <Sfx name="pluck1" at={c3 + 6} volume={0.16} />
      <Sfx name="chime" at={c3 + 50} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 6, 12)}>
          <rect
            x={160}
            y={560}
            width={1600}
            height={170}
            rx={60}
            fill={alpha(colors.wood, 0.55)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {HUI.map((h) => (
            <circle
              key={h}
              cx={SX + SW * h}
              cy={700}
              r={h === 1 / 2 ? 10 : 7}
              fill={colors.paper}
            />
          ))}
        </g>
        {mode > 0 &&
          Array.from({ length: mode - 1 }, (_, k) => (
            <line
              key={k}
              x1={SX + (SW * (k + 1)) / mode}
              y1={380}
              x2={SX + (SW * (k + 1)) / mode}
              y2={710}
              stroke={colors.green}
              strokeWidth={3}
              strokeDasharray="10 7"
            />
          ))}
        <path
          d={Array.from(
            { length: 201 },
            (_, i) =>
              `${i ? "L" : "M"} ${SX + (SW * i) / 200} ${SY - 160 * shape(i / 200)}`,
          ).join(" ")}
          fill="none"
          stroke={colors.primary}
          strokeWidth={5}
          opacity={fadeIn(frame, c0 + 10, 8)}
        />
        {finger > 0 && (
          <circle
            cx={SX + SW * finger}
            cy={SY}
            r={18}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={5}
          />
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 160,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.qinTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 160,
          fontSize: 44,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 20),
        }}
      >
        {tx.qinQuote}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1300,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.green,
          opacity: mode > 0 ? 1 : 0,
          whiteSpace: "nowrap",
        }}
      >
        {tx.qinHarm} · sin({mode > 0 ? mode : 2}πs)
      </div>
      <Chip
        frame={frame}
        at={c3 + 30}
        x={1300}
        y={300}
        color={colors.green}
        size={48}
      >
        {tx.qinSum}
      </Chip>
    </SceneShell>
  );
};
