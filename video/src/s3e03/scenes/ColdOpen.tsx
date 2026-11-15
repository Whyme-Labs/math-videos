import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, Mat } from "../components/draw";
import { Molecule, Table } from "../components/water";
import { useStrings } from "../i18n";

// A molecule's fingerprint. One water molecule jiggling: 3 atoms × 3
// directions (c0). Three chips: slide, spin, vibrate (c1). The three
// vibrations side by side (c2), two marked "mirror kept", one "mirror
// flipped" (c3). They rise and the C₂ᵥ table of ±1s appears under them;
// the rows of the modes light up (c4) and the table is a fingerprint (c5).
// A 3 × 3 matrix with its diagonal summed into one entry: the trace (c6).
// A question mark (c7).

const MX = [520, 960, 1400];

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const t = frame * 0.16;
  const one = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c2, 12);
  const three = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c6, 12);
  const up = progress(frame, c4 + 4, 30);
  const tableOn = fadeIn(frame, c4 + 20, 12) * fadeOut(frame, c7, 12);
  const lit = frame > c4 + 50;
  const traceOn = fadeIn(frame, c6 + 6, 10) * fadeOut(frame, c7, 12);

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pluck2" at={c1 + 10 + i * 14} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c2 + 4} volume={0.1} />
      <Sfx name="ding" at={c3 + 20} volume={0.14} />
      <Sfx name="sparkle" at={c4 + 20} volume={0.2} />
      <Sfx name="chime" at={c5 + 10} volume={0.22} />
      <Sfx name="pop" at={c6 + 10} volume={0.12} />
      <Sfx name="thud" at={c7 + 10} volume={0.16} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Molecule x={960} y={400} s={1.6} t={t} jiggle={10} opacity={one} />
        <g opacity={three}>
          {MX.map((x, i) => (
            <g key={i} transform={`translate(0 ${-150 * up})`}>
              <Molecule x={x} y={430} s={1 - 0.3 * up} mode={i} t={t * 1.4} />
              <text
                x={x}
                y={600 - 60 * up}
                textAnchor="middle"
                fill={i < 2 ? colors.green : colors.orange}
                fontSize={36}
                fontWeight={800}
                fontFamily={fonts.body}
                opacity={fadeIn(frame, c3 + 10 + i * 10, 8) * (1 - up)}
              >
                {i < 2 ? tx.kept : tx.flipped}
              </text>
            </g>
          ))}
        </g>
        <Table
          x={560}
          y={420}
          ops={tx.ops}
          rows={tx.rows}
          cw={140}
          rh={70}
          opacity={tableOn}
          rowColor={(i) =>
            !lit
              ? undefined
              : i === 0
                ? colors.green
                : i === 2
                  ? colors.orange
                  : alpha(colors.paper, 0.35)
          }
        />
        <g opacity={traceOn}>
          <Mat
            x={140}
            y={300}
            rows={[
              [-1, 0, 0],
              [0, 1, 0],
              [0, 0, 1],
            ]}
            cw={70}
            rh={60}
            size={36}
            cell={(i, j) =>
              i === j ? colors.highlight : alpha(colors.paper, 0.4)
            }
          />
          <text
            x={245}
            y={540}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            −1 + 1 + 1 = 1
          </text>
          <path
            d="M 380 500 Q 600 560 770 700"
            fill="none"
            stroke={colors.highlight}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
        </g>
        <text
          x={960}
          y={480}
          textAnchor="middle"
          fill={colors.highlight}
          fontSize={220}
          fontWeight={800}
          fontFamily={fonts.body}
          opacity={fadeIn(frame, c7 + 10, 10)}
        >
          ?
        </text>
      </svg>
      <div style={{ opacity: fadeOut(frame, c1, 10) }}>
        <Chip frame={frame} at={c0 + 30} x={640} y={680} size={40} math>
          {tx.nineWays}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 10}
          x={340}
          y={680}
          size={40}
          color={colors.muted}
        >
          {tx.slide}
        </Chip>
        <Chip
          frame={frame}
          at={c1 + 24}
          x={820}
          y={680}
          size={40}
          color={colors.muted}
        >
          {tx.spin}
        </Chip>
        <Chip
          frame={frame}
          at={c1 + 38}
          x={1280}
          y={680}
          size={40}
          color={colors.primary}
        >
          {tx.vibrate}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c6, 10) }}>
        <Chip
          frame={frame}
          at={c5 + 10}
          x={1500}
          y={600}
          size={40}
          color={colors.highlight}
        >
          {tx.fingerprint}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c7, 10) }}>
        <Chip
          frame={frame}
          at={c6 + 20}
          x={160}
          y={600}
          size={40}
          color={colors.highlight}
        >
          {tx.trace}
        </Chip>
      </div>
    </SceneShell>
  );
};
