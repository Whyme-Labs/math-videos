import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, poly, type Pt } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. The Hong Canal, 203 BC: Han in the west, Chu in
// the east, the canal winding between them (c0). The treaty from the
// Shiji, "Annals of Xiang Yu" (c1). Each side's land drawn as one convex
// piece, and a straight line drops into the canal's course between them
// (c2). Chip: between convex sets there's always a canal (c3).

const HAN: Pt[] = [
  [260, 420],
  [420, 330],
  [700, 350],
  [830, 470],
  [820, 650],
  [620, 760],
  [360, 730],
  [240, 580],
];
const CHU: Pt[] = [
  [1110, 360],
  [1380, 320],
  [1620, 400],
  [1690, 560],
  [1600, 720],
  [1330, 770],
  [1120, 700],
  [1080, 520],
];
const canal = Array.from({ length: 41 }, (_, i) => {
  const y = 300 + (i / 40) * 500;
  return [955 + 28 * Math.sin(i * 0.5) + 10 * Math.sin(i * 1.3), y] as Pt;
});

export const Honggou: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("honggou");
  const [c0, c1, c2, c3] = cues;
  const drop = glide(frame, c2 + 20, fps, 24);

  return (
    <SceneShell id="honggou">
      <Sfx name="page" at={c0 + 6} volume={0.18} />
      <Sfx name="page" at={c1 + 6} volume={0.16} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="thud" at={c2 + 44} volume={0.18} />
      <Sfx name="chime" at={c3 + 6} volume={0.3} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 6, 12)}>
          <path
            d={poly(HAN, true)}
            fill={alpha(colors.highlight, 0.25)}
            stroke={
              frame >= c2 + 6 ? colors.highlight : alpha(colors.highlight, 0.5)
            }
            strokeWidth={frame >= c2 + 6 ? 6 : 3}
            strokeDasharray={frame >= c2 + 6 ? undefined : "10 8"}
          />
          <path
            d={poly(CHU, true)}
            fill={alpha(colors.orange, 0.25)}
            stroke={frame >= c2 + 6 ? colors.orange : alpha(colors.orange, 0.5)}
            strokeWidth={frame >= c2 + 6 ? 6 : 3}
            strokeDasharray={frame >= c2 + 6 ? undefined : "10 8"}
          />
          <path
            d={poly(canal)}
            fill="none"
            stroke={alpha(colors.paper, 0.8)}
            strokeWidth={14}
            strokeLinecap="round"
          />
          <text
            x={540}
            y={570}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={120}
            fontFamily={fonts.title}
            fontWeight={800}
          >
            {tx.han}
          </text>
          <text
            x={1390}
            y={570}
            textAnchor="middle"
            fill={colors.orange}
            fontSize={120}
            fontFamily={fonts.title}
            fontWeight={800}
          >
            {tx.chu}
          </text>
          <text
            x={1010}
            y={820}
            fill={colors.paper}
            fontSize={40}
            fontFamily={fonts.body}
            fontWeight={700}
          >
            {tx.canal}
          </text>
        </g>
        <line
          x1={960}
          y1={280 - 300 * (1 - drop)}
          x2={960}
          y2={820 - 300 * (1 - drop)}
          stroke={colors.primary}
          strokeWidth={8}
          opacity={drop}
        />
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
        {tx.hgTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 160,
          fontSize: 40,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6),
          translate: riseIn(frame, c1 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {tx.quote}
        <span style={{ color: colors.muted, marginLeft: 20, fontSize: 34 }}>
          {tx.source}
        </span>
      </div>
      <Chip frame={frame} at={c3 + 6} x={1180} y={110} color={colors.green}>
        {tx.hgGap}
      </Chip>
    </SceneShell>
  );
};
