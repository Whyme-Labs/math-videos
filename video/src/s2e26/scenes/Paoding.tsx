import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. Cook Ding carving an ox (Zhuangzi, "The Secret of
// Caring for Life"). The carcass as blocks with gaps between the joints,
// and a knife beside it (c0). The gaps light up: 有间; the blade's edge
// is marked 无厚 (c1). The blade glides along the gaps without touching a
// block (c2). Chip: there's always room (c3).

const COLS = [300, 470, 640, 810, 980];
const ROWS = [230, 400, 570];
const BW = 150;
const BH = 150;
// the blade's route, through the gaps between blocks
const ROUTE: Pt[] = [
  [230, 220],
  [460, 220],
  [460, 390],
  [812, 390],
  [812, 560],
  [1140, 560],
  [1140, 760],
];
const along = (t: number): Pt => {
  const seg = ROUTE.slice(1).map((p, i) =>
    Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]),
  );
  let d = t * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i]) {
      const u = d / seg[i];
      return [
        ROUTE[i][0] + u * (ROUTE[i + 1][0] - ROUTE[i][0]),
        ROUTE[i][1] + u * (ROUTE[i + 1][1] - ROUTE[i][1]),
      ];
    }
    d -= seg[i];
  }
  return ROUTE[ROUTE.length - 1];
};

export const Paoding: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("paoding");
  const [c0, c1, c2, c3] = cues;
  const t = Math.max(0, Math.min(1, (frame - c2 - 6) / 120));
  const [bx, by] = along(t);
  const passed: Pt[] = [];
  for (let s = 0; s <= 60; s++) passed.push(along((t * s) / 60));

  return (
    <SceneShell id="paoding">
      <Sfx name="page" at={c0 + 6} volume={0.18} />
      <Sfx name="pluck2" at={c1 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 70} volume={0.1} />
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 6, 12)}>
          {ROWS.map((y, r) =>
            COLS.map((x, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + (r % 2) * 12}
                y={y}
                width={BW}
                height={BH}
                rx={26}
                fill={alpha(colors.wood, 0.55)}
                stroke={alpha(colors.paper, 0.4)}
                strokeWidth={3}
              />
            )),
          )}
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 10)}>
          <path
            d={poly(ROUTE)}
            fill="none"
            stroke={alpha(colors.green, 0.6)}
            strokeWidth={10}
            strokeDasharray="4 14"
            strokeLinecap="round"
          />
        </g>
        <path
          d={poly(passed)}
          fill="none"
          stroke={colors.primary}
          strokeWidth={4}
          opacity={t > 0 ? 1 : 0}
        />
        <g
          transform={`translate(${frame >= c2 ? bx : 230} ${frame >= c2 ? by : 220})`}
          opacity={fadeIn(frame, c0 + 20, 10)}
        >
          <path
            d="M -150 -10 L -12 -10 L 0 0 L -150 10 Z"
            fill={colors.paper}
            stroke={colors.ink}
            strokeWidth={2}
          />
          <rect
            x={-212}
            y={-13}
            width={62}
            height={26}
            rx={6}
            fill={colors.wood}
          />
        </g>
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
        {tx.pdTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 1260,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          fontFamily: fonts.title,
          fontSize: 72,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            color: colors.green,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10),
          }}
        >
          {tx.pdGap}
        </div>
        <div
          style={{
            color: colors.paper,
            opacity: fadeIn(frame, c1 + 24),
            translate: riseIn(frame, c1 + 24),
          }}
        >
          {tx.pdBlade}
        </div>
      </div>
      <Chip
        frame={frame}
        at={c3 + 6}
        x={1260}
        y={520}
        color={colors.green}
        size={52}
      >
        {tx.pdRoom}
      </Chip>
    </SceneShell>
  );
};
