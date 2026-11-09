import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. The blind men and the elephant, from the
// Mahāparinirvāṇa Sūtra. An elephant in outline (c0); the quote (c1).
// Four probes touch the tusk, the ear, a leg and the tail, and each one's
// reading pops up: a radish root, a winnowing basket, a mortar, a rope
// (c2). Chip: judge only by the readings (c3).

const PROBES: { x: number; y: number; lx: number; ly: number }[] = [
  { x: 470, y: 560, lx: 300, ly: 700 }, // tusk
  { x: 650, y: 380, lx: 820, ly: 270 }, // ear
  { x: 980, y: 730, lx: 960, ly: 820 }, // leg
  { x: 1285, y: 520, lx: 1350, ly: 700 }, // tail
];

export const Elephant: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("elephant");
  const [c0, c1, c2, c3] = cues;

  return (
    <SceneShell id="elephant">
      <Sfx name="page" at={c0 + 6} volume={0.18} />
      <Sfx name="page" at={c1 + 6} volume={0.14} />
      {PROBES.map((_, i) => (
        <Sfx key={i} name="pluck2" at={c2 + 8 + i * 12} volume={0.1} />
      ))}
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          opacity={fadeIn(frame, c0 + 6, 12)}
          fill={alpha(colors.paper, 0.12)}
          stroke={alpha(colors.paper, 0.7)}
          strokeWidth={5}
        >
          <ellipse cx={940} cy={520} rx={330} ry={190} />
          <ellipse cx={600} cy={440} rx={150} ry={130} />
          <path d="M 640 380 Q 760 330 760 470 Q 720 560 640 520 Z" />
          <path d="M 500 500 Q 440 640 470 760 L 510 760 Q 500 640 560 540" />
          <path
            d="M 530 540 Q 470 560 440 600"
            fill="none"
            stroke={colors.paper}
            strokeWidth={8}
          />
          {[740, 860, 980, 1120].map((x) => (
            <rect key={x} x={x - 40} y={640} width={80} height={140} rx={16} />
          ))}
          <path d="M 1265 480 Q 1300 520 1290 600" fill="none" />
        </g>
        {PROBES.map((p, i) => (
          <g key={i} opacity={fadeIn(frame, c2 + 8 + i * 12, 6)}>
            <line
              x1={p.x}
              y1={p.y}
              x2={p.lx}
              y2={p.ly}
              stroke={colors.orange}
              strokeWidth={3}
              strokeDasharray="8 6"
            />
            <circle cx={p.x} cy={p.y} r={12} fill={colors.orange} />
          </g>
        ))}
      </svg>
      {PROBES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.ly - 30,
            left: p.lx - 90,
            width: 180,
            textAlign: "center",
            fontSize: 40,
            fontWeight: 800,
            color: colors.orange,
            background: alpha(colors.bg, 0.8),
            borderRadius: 12,
            opacity: fadeIn(frame, c2 + 12 + i * 12),
            translate: riseIn(frame, c2 + 12 + i * 12),
          }}
        >
          {tx.elParts[i]}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 160,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.elTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 160,
          fontSize: 38,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
          translate: riseIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {tx.elQuote}
      </div>
      <Chip
        frame={frame}
        at={c3 + 6}
        x={1380}
        y={280}
        color={colors.green}
        size={48}
      >
        {tx.elWeak}
      </Chip>
    </SceneShell>
  );
};
