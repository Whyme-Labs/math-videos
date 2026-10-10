import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeIn, progress, window } from "../components/anim";
import { QuestionTray } from "../components/QuestionTray";
import { Sfx } from "../components/Sfx";
import { SceneShell, useCues } from "../components/SceneShell";
import { colors, fonts } from "../theme";

// One number, five names. The dot never moves; only its label changes.
const NAMES = [
  { text: "45", note: "base ten" },
  { text: "101101₂", note: "base two" },
  { text: "63₇", note: "base seven" },
  { text: "XLV", note: "Roman" },
  { text: "forty-five", note: "English" },
];

export const Numerals: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = useCues("numerals");
  // Label i is shown during [labelStart[i], labelStart[i+1]).
  const labelStart = [
    cues[1] + 10,
    cues[2] + 10,
    cues[2] + 70,
    cues[2] + 130,
    cues[3] + 5,
  ];
  const ring = progress(frame, cues[3] + 45, 35);
  const glow = 0.6 + 0.4 * Math.sin(frame / 10);

  return (
    <SceneShell id="numerals">
      <Sfx name="pop" at={cues[1]} />
      {labelStart.slice(1).map((f) => (
        <Sfx key={f} name="tick" at={f} />
      ))}
      <Sfx name="chime" at={cues[3] + 45} />

      <QuestionTray />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fonts.title,
            fontSize: 64,
            position: "absolute",
            top: 120,
            opacity: fadeIn(frame, 0) * (1 - ring),
          }}
        >
          A numeral is a <span style={{ color: colors.highlight }}>name</span>.
        </div>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.primary,
            boxShadow: `0 0 ${50 * glow}px ${colors.primary}`,
            opacity: fadeIn(frame, cues[1]),
          }}
        />
        {/* Sequential labels above the dot. */}
        {NAMES.map((n, i) => (
          <div
            key={n.text}
            style={{
              position: "absolute",
              top: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity:
                window(
                  frame,
                  labelStart[i],
                  i < NAMES.length - 1 ? labelStart[i + 1] : cues[3] + 45,
                ) *
                (1 - ring),
            }}
          >
            <div
              style={{
                fontFamily: fonts.math,
                fontSize: 110,
                color: colors.text,
              }}
            >
              {n.text}
            </div>
            <div style={{ fontSize: 32, color: colors.muted }}>{n.note}</div>
          </div>
        ))}
        {/* Finally, all names around the dot, each pointing at it. */}
        <svg
          width={1920}
          height={890}
          style={{ position: "absolute", left: 0, top: 0, opacity: ring }}
        >
          {NAMES.map((n, i) => {
            const angle = (-90 + (360 / NAMES.length) * i) * (Math.PI / 180);
            const r = 300;
            const x = 960 + r * Math.cos(angle);
            const y = 445 + r * 0.95 * Math.sin(angle);
            return (
              <g key={n.text}>
                <line
                  x1={x}
                  y1={y}
                  x2={interpolate(
                    ring,
                    [0, 1],
                    [x, 960 + 60 * Math.cos(angle)],
                  )}
                  y2={interpolate(
                    ring,
                    [0, 1],
                    [y, 445 + 60 * Math.sin(angle)],
                  )}
                  stroke={colors.highlight}
                  strokeWidth={3}
                  strokeDasharray="10 8"
                />
                <rect
                  x={x - 150}
                  y={y - 45}
                  width={300}
                  height={90}
                  rx={18}
                  fill={colors.panel}
                  stroke={colors.panelEdge}
                  strokeWidth={2}
                />
                <text
                  x={x}
                  y={y + 18}
                  fill={colors.text}
                  fontSize={52}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {n.text}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
