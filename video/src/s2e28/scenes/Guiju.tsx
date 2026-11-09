import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. Compass and square, from Mencius: "without the
// compass and the square you cannot make circles and squares" (c0). The
// compass swings and draws a circle: lengths (c1). The carpenter's square
// sets a right angle against a line: perpendiculars (c2). Chip: a Hilbert
// space has both (c3).

const C = { x: 560, y: 560, r: 200 };

export const Guiju: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("guiju");
  const [c0, c1, c2, c3] = cues;
  const sweep = glide(frame, c1 + 6, fps, 50);
  const a = -Math.PI / 2 + 2 * Math.PI * sweep;
  const tip = [C.x + C.r * Math.cos(a), C.y + C.r * Math.sin(a)];
  const hinge = [C.x + 0.5 * (tip[0] - C.x), C.y + 0.5 * (tip[1] - C.y) - 200];
  const slide = glide(frame, c2 + 6, fps, 24);

  return (
    <SceneShell id="guiju">
      <Sfx name="page" at={c0 + 6} volume={0.18} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="clink" at={c2 + 30} volume={0.18} />
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 8, 10)}>
          <path
            d={Array.from({ length: 121 }, (_, k) => {
              const b = -Math.PI / 2 + 2 * Math.PI * sweep * (k / 120);
              return `${k ? "L" : "M"} ${C.x + C.r * Math.cos(b)} ${C.y + C.r * Math.sin(b)}`;
            }).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            opacity={sweep > 0.001 ? 1 : 0}
          />
          <line
            x1={C.x}
            y1={C.y}
            x2={hinge[0]}
            y2={hinge[1]}
            stroke={colors.wood}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <line
            x1={tip[0]}
            y1={tip[1]}
            x2={hinge[0]}
            y2={hinge[1]}
            stroke={colors.wood}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <circle cx={hinge[0]} cy={hinge[1]} r={14} fill={colors.paper} />
          <circle cx={C.x} cy={C.y} r={8} fill={colors.paper} />
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          <line
            x1={1000}
            y1={760}
            x2={1760}
            y2={760}
            stroke={alpha(colors.paper, 0.7)}
            strokeWidth={5}
          />
          <g transform={`translate(${1500 - 200 * (1 - slide)} 760)`}>
            <path
              d="M 0 0 L 0 -360 L -40 -360 L -40 -40 L -260 -40 L -260 0 Z"
              fill={colors.wood}
              stroke={colors.paper}
              strokeWidth={3}
            />
            <path
              d="M 30 0 L 30 -30 L 0 -30"
              fill="none"
              stroke={colors.green}
              strokeWidth={5}
              opacity={fadeIn(frame, c2 + 30, 6)}
            />
          </g>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 160,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
          whiteSpace: "nowrap",
        }}
      >
        {tx.gjQuote}
        <span style={{ fontSize: 36, color: colors.muted, marginLeft: 20 }}>
          {tx.gjSource}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 800,
          left: 360,
          width: 400,
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 30),
        }}
      >
        {tx.gjGui}
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 1540,
          fontFamily: fonts.title,
          fontSize: 48,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 30),
          whiteSpace: "nowrap",
        }}
      >
        {tx.gjJu}
      </div>
      <Chip
        frame={frame}
        at={c3 + 6}
        x={1040}
        y={200}
        color={colors.green}
        size={52}
      >
        {tx.gjBoth}
      </Chip>
    </SceneShell>
  );
};
