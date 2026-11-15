import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The Act I montage. Four cards, one per line, each with its picture and
// the Season 2 idea stamped under it: fields and dimension (c0), modules
// and Jordan form (c1), representations and the trace (c2), Fourier and
// the dual space (c3).

const CX = [300, 720, 1140, 1560];

export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("finale");
  const t = frame * 0.03;
  const pics = [
    // a 2 × 2 × 2 cube of points
    <g key="f">
      {Array.from({ length: 8 }, (_, k) => {
        const x = (k & 1) - 0.5;
        const y = ((k >> 1) & 1) - 0.5;
        const z = (k >> 2) - 0.5;
        const px = x * Math.cos(t) + z * Math.sin(t);
        const pz = -x * Math.sin(t) + z * Math.cos(t);
        return (
          <circle
            key={k}
            cx={110 * px}
            cy={-110 * y + 30 * pz}
            r={12 + 3 * pz}
            fill={colors.primary}
          />
        );
      })}
    </g>,
    // a Jordan block's grid, sheared
    <g key="m">
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <line
            x1={-100 + i * 50 - 50}
            y1={100}
            x2={-100 + i * 50 + 50}
            y2={-100}
            stroke={alpha(colors.green, 0.7)}
            strokeWidth={3}
          />
          <line
            x1={-150}
            y1={-100 + i * 50}
            x2={150}
            y2={-100 + i * 50}
            stroke={alpha(colors.green, 0.7)}
            strokeWidth={3}
          />
        </g>
      ))}
    </g>,
    // a square turning
    <rect
      key="r"
      x={-80}
      y={-80}
      width={160}
      height={160}
      fill={alpha(colors.orange, 0.15)}
      stroke={colors.orange}
      strokeWidth={6}
      transform={`rotate(${frame * 1.2})`}
    />,
    // a wave and its dial
    <g key="d">
      <circle
        cx={0}
        cy={-30}
        r={70}
        fill="none"
        stroke={alpha(colors.highlight, 0.6)}
        strokeWidth={3}
      />
      <line
        x1={0}
        y1={-30}
        x2={70 * Math.cos(t * 3)}
        y2={-30 - 70 * Math.sin(t * 3)}
        stroke={colors.highlight}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d={Array.from(
          { length: 61 },
          (_, i) =>
            `${i ? "L" : "M"} ${-130 + i * 4.33} ${90 - 30 * Math.sin(i * 0.3 - t * 3)}`,
        ).join(" ")}
        fill="none"
        stroke={colors.highlight}
        strokeWidth={4}
      />
    </g>,
  ];
  const col = [colors.primary, colors.green, colors.orange, colors.highlight];

  return (
    <SceneShell id="finale">
      {cues.map((c, i) => (
        <Sfx
          key={i}
          name={i === 3 ? "chime" : "pluck3"}
          at={c + 8}
          volume={i === 3 ? 0.24 : 0.12}
        />
      ))}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {CX.map((x, i) => (
          <g key={i} opacity={fadeIn(frame, cues[i] + 4, 12)}>
            <rect
              x={x - 190}
              y={170}
              width={380}
              height={560}
              rx={28}
              fill={alpha(colors.bg, 0.6)}
              stroke={col[i]}
              strokeWidth={4}
            />
            <g transform={`translate(${x} 380)`}>{pics[i]}</g>
          </g>
        ))}
      </svg>
      {CX.map((x, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - 190,
            width: 380,
            top: 560,
            textAlign: "center",
            opacity: fadeIn(frame, cues[i] + 10, 12),
            translate: riseIn(frame, cues[i] + 10),
          }}
        >
          <div style={{ fontSize: 38, fontWeight: 800, color: colors.text }}>
            {tx.cards[i][0]}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: col[i],
              marginTop: 14,
              fontFamily: fonts.body,
            }}
          >
            {tx.cards[i][1]}
          </div>
        </div>
      ))}
    </SceneShell>
  );
};
