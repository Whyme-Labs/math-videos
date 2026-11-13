import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. Zhu Zaiyu's equal temperament (1584). The book
// and year (c0). The twelfth root of 2 typing itself out to 25 digits
// (c1). Thirteen strings, each shorter than the last by that ratio, from
// one string to its octave half (c2). Their frequencies as dots on a
// ladder: a discrete spectrum (c3).

const ROOT = "1.059463094359295264561825";

export const Zaiyu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("zaiyu");
  const [c0, c1, c2, c3] = cues;
  const digits = Math.min(
    ROOT.length,
    Math.max(0, Math.floor((frame - c1 - 6) / 2)),
  );
  const strings = Math.min(13, Math.max(0, Math.floor((frame - c2 - 6) / 6)));

  return (
    <SceneShell id="zaiyu">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      {Array.from({ length: 10 }, (_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 5} volume={0.05} />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <Sfx
          key={i}
          name={i % 2 ? "pluck2" : "pluck3"}
          at={c2 + 6 + i * 6}
          volume={0.06}
        />
      ))}
      <Sfx name="chime" at={c3 + 10} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: strings }, (_, k) => {
          const len = 1100 * 2 ** (-k / 12);
          return (
            <g key={k}>
              <line
                x1={200}
                y1={360 + k * 32}
                x2={200 + len}
                y2={360 + k * 32}
                stroke={
                  k === 0 || k === 12
                    ? colors.primary
                    : alpha(colors.paper, 0.75)
                }
                strokeWidth={k === 0 || k === 12 ? 6 : 4}
              />
              <circle
                cx={200 + len}
                cy={360 + k * 32}
                r={7}
                fill={colors.wood}
              />
            </g>
          );
        })}
        <g opacity={fadeIn(frame, c3 + 6, 8)}>
          <line
            x1={1500}
            y1={790}
            x2={1500}
            y2={330}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: 13 }, (_, k) => (
            <circle
              key={k}
              cx={1500}
              cy={790 - 460 * (2 ** (k / 12) - 1)}
              r={10}
              fill={colors.green}
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.zyTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 200,
          fontSize: 40,
          fontWeight: 700,
          color: colors.muted,
          opacity: fadeIn(frame, c1 + 4),
          whiteSpace: "nowrap",
        }}
      >
        {tx.zyRoot} ={" "}
        <span
          style={{
            fontFamily: fonts.mono,
            color: colors.text,
            fontWeight: 800,
          }}
        >
          {ROOT.slice(0, digits)}
        </span>
      </div>
      <Chip
        frame={frame}
        at={c3 + 20}
        x={1560}
        y={420}
        color={colors.green}
        size={44}
      >
        {tx.zySpectrum}
      </Chip>
    </SceneShell>
  );
};
