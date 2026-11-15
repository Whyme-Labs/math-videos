import type React from "react";
import { useCurrentFrame } from "remotion";
import {
  fadeIn,
  fadeOut,
  progress,
  riseIn,
} from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Clock } from "../components/draw";
import { useStrings } from "../i18n";

// Modules. Two cards with the same four axioms, a field F on the left and a
// ring R on the right (c0); a red "r⁻¹ ?" lands on the ring card (c1).
// Left: ℤ/12, where 3·a is a hopping three times round the clock (c2).
// Right: a plane where x acts as an operator T, turning and stretching an
// arrow (c3), and a second camera P shows the same T in another basis (c4).

const AXIOMS = [
  "r(m + n) = rm + rn",
  "(r + s)m = rm + sm",
  "(rs)m = r(sm)",
  "1m = m",
];

export const Module: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("module");
  const [c0, c1, c2, c3, c4] = cues;
  const cards = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);
  const partB = fadeIn(frame, c2 + 6, 10);
  // 3 · a on ℤ/12 with a = 2: hops 0 → 2 → 4 → 6
  const hops = Math.min(3, Math.max(0, (frame - c2 - 30) / 20));
  const theta = (k: number) => Math.PI / 2 - (2 * Math.PI * k) / 12;
  // T = rotate by 30° and scale by 1.3, applied gradually
  const t = progress(frame, c3 + 10, 40);
  const ang = (Math.PI / 6) * t;
  const sc = 1 + 0.3 * t;
  const O = { x: 1340, y: 450 };
  const v = [2, 1];
  const Tv = [
    sc * (Math.cos(ang) * v[0] - Math.sin(ang) * v[1]),
    sc * (Math.sin(ang) * v[0] + Math.cos(ang) * v[1]),
  ];
  const tilt = (Math.PI / 9) * progress(frame, c4 + 10, 40);

  const Card: React.FC<{ x: number; head: string; ring?: boolean }> = ({
    x,
    head,
    ring,
  }) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 170,
        width: 760,
        padding: "34px 44px",
        borderRadius: 24,
        border: `4px solid ${ring ? colors.highlight : colors.primary}`,
        background: alpha(colors.bg, 0.7),
        opacity: cards,
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: ring ? colors.highlight : colors.primary,
          marginBottom: 24,
        }}
      >
        {head}
      </div>
      {AXIOMS.map((a, i) => (
        <div
          key={a}
          style={{
            fontFamily: fonts.math,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.5,
            opacity: fadeIn(frame, c0 + 10 + i * 6, 8),
          }}
        >
          {a}
        </div>
      ))}
    </div>
  );

  return (
    <SceneShell id="module">
      <Sfx name="page" at={c0 + 4} volume={0.14} />
      <Sfx name="thud" at={c1 + 12} volume={0.18} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c2 + 30 + i * 20} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.1} />

      <Card x={140} head={tx.vectorSpace} />
      <Card x={1020} head={tx.module} ring />
      <div
        style={{
          position: "absolute",
          left: 1500,
          top: 470,
          fontFamily: fonts.math,
          fontSize: 80,
          fontWeight: 800,
          color: colors.red,
          rotate: "-12deg",
          border: `6px solid ${colors.red}`,
          borderRadius: 16,
          padding: "4px 24px",
          opacity: fadeIn(frame, c1 + 10, 6) * cards,
          scale: `${1.5 - 0.5 * progress(frame, c1 + 10, 10)}`,
        }}
      >
        {tx.noInverse}
      </div>

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", opacity: partB }}
      >
        <Clock cx={480} cy={450} r={230} n={12} dot={12} />
        {Array.from({ length: Math.ceil(hops) }, (_, i) => {
          const f = Math.min(1, hops - i);
          const a0 = theta(2 * i);
          const a1 = theta(2 * i + 2 * f);
          const p0 = [480 + 230 * Math.cos(a0), 450 - 230 * Math.sin(a0)];
          const p1 = [480 + 230 * Math.cos(a1), 450 - 230 * Math.sin(a1)];
          return (
            <path
              key={i}
              d={`M ${p0[0]} ${p0[1]} Q ${480 + 330 * Math.cos((a0 + a1) / 2)} ${450 - 330 * Math.sin((a0 + a1) / 2)} ${p1[0]} ${p1[1]}`}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={6}
            />
          );
        })}
        <text
          x={480}
          y={470}
          textAnchor="middle"
          fill={colors.highlight}
          fontSize={56}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c2 + 90, 10)}
        >
          3 · 2 = 6
        </text>
        <g opacity={fadeIn(frame, c3 + 2, 10)}>
          {Array.from({ length: 9 }, (_, k) => {
            const u = k - 4;
            const R = (x: number, y: number) => [
              O.x + 70 * (Math.cos(tilt) * x - Math.sin(tilt) * y),
              O.y - 70 * (Math.sin(tilt) * x + Math.cos(tilt) * y),
            ];
            const [x1, y1] = R(u, -4);
            const [x2, y2] = R(u, 4);
            const [x3, y3] = R(-4, u);
            const [x4, y4] = R(4, u);
            const s = alpha(colors.paper, u === 0 ? 0.5 : 0.16);
            return (
              <g key={k}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={s}
                  strokeWidth={2}
                />
                <line
                  x1={x3}
                  y1={y3}
                  x2={x4}
                  y2={y4}
                  stroke={s}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + 70 * v[0]}
            y2={O.y - 70 * v[1]}
            stroke={alpha(colors.primary, 0.4)}
            strokeWidth={6}
          />
          <line
            x1={O.x}
            y1={O.y}
            x2={O.x + 70 * Tv[0]}
            y2={O.y - 70 * Tv[1]}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <text
            x={O.x + 70 * Tv[0] + 16}
            y={O.y - 70 * Tv[1] - 10}
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            x · v = Tv
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 740,
          opacity: partB,
          translate: riseIn(frame, c2 + 6),
        }}
      >
        <Chip frame={frame} at={c2 + 6} x={0} y={0} size={40} math>
          {tx.abelian}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c3 + 20}
        x={1100}
        y={740}
        size={40}
        math
        color={colors.highlight}
      >
        {tx.withT}
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 30}
        x={1080}
        y={130}
        size={40}
        math
        color={colors.green}
      >
        T′ = P T P⁻¹
      </Chip>
    </SceneShell>
  );
};
