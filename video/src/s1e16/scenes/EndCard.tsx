import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Clock, CubeFace, Tile } from "../components/props";
import { useStrings } from "../i18n";

// The tile, the clock and the cube each make a move on the same beat, three
// different groups keeping one set of rules. Then the teaser for E17: the
// tile's quarter turns and the hand of a four-hour clock step together,
// beat for beat. Same group?

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const beat = (start: number, k: number) =>
    glide(frame, start + k * 18, fps, 10);
  const moves = (start: number, n: number) =>
    Array.from({ length: n }).reduce<number>(
      (a, _, k) => a + beat(start, k),
      0,
    );
  const m0 = moves(c0 + 10, 5);
  const m1 = moves(c1 + 16, 6);
  const part1 = fadeOut(frame, c1, 10);

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx key={k} name="clink" at={c0 + 10 + k * 18} volume={0.14} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={`t${k}`} name="tick" at={c1 + 16 + k * 18} volume={0.16} />
      ))}
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Tile x={480} y={500} size={280} rot={90 * m0} />
          <Clock x={960} y={500} r={160} pos={2 + 5 * m0} />
          <CubeFace x={1440} y={500} s={1.05} twist={m0} />
        </svg>
      </AbsoluteFill>

      {/* the teaser: quarter turns and a four-hour clock, in step */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080}>
          <Tile x={1100} y={560} size={260} rot={90 * m1} />
          <Clock x={1560} y={560} r={150} n={4} pos={m1} />
          <text
            x={1330}
            y={590}
            fill={colors.highlight}
            fontSize={80}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 40)}
          >
            ⇄
          </text>
          <text
            x={1330}
            y={820}
            fill={colors.highlight}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 60)}
            transform={`scale(${Math.min(1, springIn(frame, c1 + 60, fps, 10))})`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            {tx.same}
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 160, left: 120, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
