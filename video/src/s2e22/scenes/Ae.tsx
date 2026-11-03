import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { FRACTIONS } from "../components/line";
import { useStrings } from "../i18n";

// Almost everywhere. f(x) = x as a line, and g = x + 1_ℚ: the same line
// with a dust of points lifted by 1 over the fractions (c0–c1). The set
// where they differ, the fractions, glows on the axis as dust of size 0;
// ‖f − g‖₁ = 0 and a chip: the same element of L¹ (c2). A probe at one
// point flickers between the two values: an element of L¹ has no value
// there (c3).

const PX = 200;
const PW = 1000;
const PY = 740;
const PH = 260;
const sx = (x: number) => PX + PW * x;

export const Ae: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("ae");
  const [c0, c1, c2, c3] = cues;
  const flick = Math.floor((frame - c3) / 8) % 2 === 0;

  return (
    <SceneShell id="ae">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 6} volume={0.25} />
      <Sfx name="ding" at={c2 + 20} volume={0.26} />
      {Array.from({ length: 6 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 8 + i * 16} volume={0.08} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={PX}
          y1={PY}
          x2={PX + PW}
          y2={PY}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <line
          x1={sx(0)}
          y1={PY}
          x2={sx(1)}
          y2={PY - PH}
          stroke={colors.primary}
          strokeWidth={6}
          opacity={fadeIn(frame, c0 + 6, 8)}
        />
        <g opacity={fadeIn(frame, c1 + 6, 10)}>
          {FRACTIONS.slice(0, 200).map((f) => {
            const x = f.p / f.q;
            return (
              <circle
                key={`${f.p}/${f.q}`}
                cx={sx(x)}
                cy={PY - PH * x - PH}
                r={3}
                fill={colors.highlight}
              />
            );
          })}
        </g>
        <g opacity={fadeIn(frame, c2 + 6, 10)}>
          {FRACTIONS.slice(0, 200).map((f) => (
            <circle
              key={`a${f.p}/${f.q}`}
              cx={sx(f.p / f.q)}
              cy={PY}
              r={2.5}
              fill={colors.highlight}
            />
          ))}
        </g>
        {frame >= c3 + 4 ? (
          <g>
            <line
              x1={sx(0.5)}
              y1={PY}
              x2={sx(0.5)}
              y2={PY - PH * 1.6}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={3}
              strokeDasharray="8 8"
            />
            <circle
              cx={sx(0.5)}
              cy={flick ? PY - PH * 0.5 : PY - PH * 1.5}
              r={14}
              fill={colors.text}
            />
            <text
              x={sx(0.5) + 30}
              y={PY - PH * 1.6}
              fill={colors.text}
              fontSize={52}
              fontWeight={800}
            >
              ?
            </text>
          </g>
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          display: "flex",
          gap: 60,
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
        }}
      >
        <span style={{ color: colors.primary, opacity: fadeIn(frame, c0 + 6) }}>
          f = x
        </span>
        <span
          style={{ color: colors.highlight, opacity: fadeIn(frame, c1 + 6) }}
        >
          g = x + 1<sub style={{ fontSize: 32 }}>ℚ</sub>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 20),
            whiteSpace: "nowrap",
          }}
        >
          ‖f − g‖₁ = 0
        </div>
        <div
          style={{
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 38,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c2 + 30),
            translate: riseIn(frame, c2 + 30, 12),
            whiteSpace: "nowrap",
          }}
        >
          [f] = [g] · {tx.same}
        </div>
      </div>
    </SceneShell>
  );
};
