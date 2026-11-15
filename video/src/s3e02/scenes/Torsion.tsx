import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Torsion. ℤ/2 as two points on a little loop, the arrow 0 → 1, and the
// scalar line ℤ underneath (c0). Scaling by 2 runs the arrow round the loop
// back to 0, where it shrinks to a dot (c1). "torsion" (c2). The three
// candidate sets ∅, {0}, {1} each get a red cross: no basis (c3). In a
// vector space, v = ½ · (2v) = 0, but ½ is missing from ℤ (c4). The
// ledger of losses (c5).

const A = { x: 760, y: 420 };
const B = { x: 1160, y: 420 };

export const Torsion: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("torsion");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const loop = fadeIn(frame, c0 + 4, 10) * fadeOut(frame, c4, 12);
  // the arrow's tip runs 0 → 1 → 0 along the loop as the scalar goes 1 → 2
  const s = progress(frame, c1 + 10, 50);
  const tipAngle = Math.PI + 2 * Math.PI * s; // 0 sits at angle π, 1 at 0
  const cx = (A.x + B.x) / 2;
  const R = (B.x - A.x) / 2;
  const tip = [
    cx + R * Math.cos(tipAngle),
    A.y - 0.45 * R * Math.sin(tipAngle),
  ];
  const collapsed = s >= 1;
  const arc = Array.from({ length: 41 }, (_, k) => {
    const a = Math.PI + (2 * Math.PI * s * k) / 40;
    return `${k ? "L" : "M"} ${cx + R * Math.cos(a)} ${A.y - 0.45 * R * Math.sin(a)}`;
  }).join(" ");
  const ledger = fadeIn(frame, c5 + 4, 10);

  return (
    <SceneShell id="torsion">
      <Sfx name="pop" at={c0 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="thud" at={c1 + 62} volume={0.2} />
      <Sfx name="ding" at={c2 + 10} volume={0.16} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="scratch" at={c3 + 20 + i * 18} volume={0.1} />
      ))}
      <Sfx name="pluck3" at={c4 + 10} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="tick" at={c5 + 10 + i * 12} volume={0.08} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={loop}>
          <ellipse
            cx={cx}
            cy={A.y}
            rx={R}
            ry={0.45 * R}
            fill="none"
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          {[A, B].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={22} fill={colors.primary} />
              <text
                x={p.x}
                y={p.y + 80}
                textAnchor="middle"
                fill={colors.text}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {i}
              </text>
            </g>
          ))}
          {/* the vector 1: first straight, then running round as it is scaled */}
          {s === 0 ? (
            <line
              x1={A.x}
              y1={A.y}
              x2={B.x - 30}
              y2={B.y}
              stroke={colors.highlight}
              strokeWidth={9}
              opacity={fadeIn(frame, c0 + 14, 8)}
            />
          ) : (
            <path
              d={arc}
              fill="none"
              stroke={collapsed ? colors.red : colors.highlight}
              strokeWidth={9}
              opacity={collapsed ? fadeOut(frame, c1 + 62, 20) : 1}
            />
          )}
          <circle
            cx={tip[0]}
            cy={tip[1]}
            r={collapsed ? 30 : 14}
            fill={collapsed ? colors.red : colors.highlight}
            opacity={s > 0 ? 1 : 0}
          />
          <text
            x={cx}
            y={250}
            textAnchor="middle"
            fill={collapsed ? colors.red : colors.highlight}
            fontSize={60}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 6, 8)}
          >
            {collapsed ? "2 · 1 = 0" : "2 · 1 = 1 + 1"}
          </text>
          {/* the scalars ℤ */}
          <line
            x1={360}
            y1={720}
            x2={1560}
            y2={720}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: 9 }, (_, k) => (
            <g key={k}>
              <circle
                cx={480 + k * 120}
                cy={720}
                r={k - 4 === 2 && frame > c1 + 6 ? 14 : 8}
                fill={
                  k - 4 === 2 && frame > c1 + 6
                    ? colors.highlight
                    : colors.paper
                }
              />
              <text
                x={480 + k * 120}
                y={780}
                textAnchor="middle"
                fill={colors.muted}
                fontSize={34}
                fontFamily={fonts.mono}
              >
                {String(k - 4).replace("-", "−")}
              </text>
            </g>
          ))}
          <text
            x={1600}
            y={732}
            fill={colors.text}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            ℤ
          </text>
        </g>
        {/* c3: candidate bases */}
        <g opacity={fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 12)}>
          {["∅", "{0}", "{1}"].map((t, i) => (
            <g key={t}>
              <text
                x={1500}
                y={300 + i * 120}
                textAnchor="middle"
                fill={colors.text}
                fontSize={56}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {t}
              </text>
              <path
                d={`M ${1430} ${260 + i * 120} L ${1570} ${310 + i * 120} M ${1570} ${260 + i * 120} L ${1430} ${310 + i * 120}`}
                stroke={colors.red}
                strokeWidth={7}
                opacity={fadeIn(frame, c3 + 20 + i * 18, 6)}
              />
            </g>
          ))}
        </g>
      </svg>
      <Chip frame={frame} at={c0 + 20} x={130} y={140} size={40} math>
        {tx.asModule}
      </Chip>
      <div style={{ opacity: fadeOut(frame, c4, 12) }}>
        <Chip
          frame={frame}
          at={c2 + 10}
          x={130}
          y={480}
          size={52}
          color={colors.red}
        >
          {tx.torsion}
        </Chip>
        <Chip
          frame={frame}
          at={c3 + 76}
          x={1400}
          y={590}
          size={42}
          color={colors.red}
        >
          {tx.noBasis}
        </Chip>
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 72,
          fontWeight: 800,
          opacity: fadeIn(frame, c4 + 8, 10) * fadeOut(frame, c5, 12),
        }}
      >
        <span style={{ color: colors.green }}>v = ½ · (2v) = ½ · 0 = 0</span>
        <div style={{ marginTop: 70, color: colors.red, fontSize: 64 }}>
          ½ ∉ ℤ
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 660,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          opacity: ledger,
        }}
      >
        {tx.lost.map((w, i) => (
          <div
            key={w}
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: colors.text,
              opacity: fadeIn(frame, c5 + 10 + i * 12, 8),
              textDecoration: `line-through ${colors.red} 6px`,
            }}
          >
            {w}
          </div>
        ))}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c5 + 60, 10),
          }}
        >
          ?
        </div>
      </div>
    </SceneShell>
  );
};
