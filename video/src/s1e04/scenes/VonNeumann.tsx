import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { BuildChain } from "../components/sets";
import { useStrings } from "../i18n";

// x⁺ = x ∪ {x}: each number is the box of all the numbers before it.
const Y = 450;
const XS = [210, 380, 640, 1040];
const SCALE = 1.45;
const LABELS = ["0 = ∅", "1 = {0}", "2 = {0, 1}", "3 = {0, 1, 2}"];

export const VonNeumann: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("vonNeumann");
  const [c0, c1, c2, c3, c4] = cues;
  const buildAt = [c0 + 6, c1 + 30, c2 + 6, c2 + 40];
  const countAt = (k: number) => c3 + 8 + k * 12;
  const counting = frame >= countAt(0) && frame < countAt(3) + 10;
  const hk = Math.min(2, Math.floor((frame - countAt(0)) / 12));
  const omega = springIn(frame, c4 + 4, fps, 12);

  return (
    <SceneShell id="vonNeumann">
      <Sfx name="pop" at={buildAt[0]} />
      <Sfx name="page" at={c1 + 4} />
      {[1, 2, 3].map((n) => (
        <Sfx key={n} name={PLUCKS[n + 1]} at={buildAt[n] + 20} volume={0.3} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={`c${k}`} name="tick" at={countAt(k)} volume={0.25} />
      ))}
      <Sfx name="ding" at={countAt(3)} volume={0.25} />
      <Sfx name="whoosh" at={c4 + 4} volume={0.18} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={`p${i}`} name="tick" at={c4 + 20 + i * 6} volume={0.18} />
      ))}
      <Sfx name="sparkle" at={c4 + 52} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 110,
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 4),
          }}
        >
          {tx.vnTag}
        </div>
        <div
          style={{
            position: "absolute",
            top: 160,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 76,
            opacity: fadeIn(frame, c1 + 4),
            translate: riseIn(frame, c1 + 4, 30),
          }}
        >
          x<sup style={{ fontSize: 44 }}>+</sup> = x ∪ {"{x}"}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* ω: all of them, collected */}
          <rect
            x={120}
            y={250}
            width={1300 * Math.min(1, omega)}
            height={470}
            rx={30}
            fill={alpha(colors.primary, 0.04)}
            stroke={colors.primary}
            strokeWidth={3}
            strokeDasharray="14 10"
            opacity={Math.min(1, omega)}
          />
          <text
            x={140}
            y={300}
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            opacity={fadeIn(frame, c4 + 10)}
          >
            ω
          </text>
          <BuildChain
            kind="vn"
            xs={XS}
            y={Y}
            scale={SCALE}
            buildAt={buildAt}
            frame={frame}
            fps={fps}
            ease={(f, s) => glide(f, s, fps, 18)}
            grow={(f, s) => springIn(f, s, fps, 11)}
            highlight={counting ? { n: 3, k: hk } : undefined}
          />
          <text
            x={XS[3] + 240}
            y={Y + 14}
            fill={colors.muted}
            fontSize={48}
            opacity={fadeIn(frame, buildAt[3] + 24)}
          >
            …
          </text>
          {LABELS.map((l, n) => (
            <text
              key={l}
              x={XS[n]}
              y={Y + 170}
              fill={colors.text}
              fontSize={n === 3 ? 38 : 34}
              textAnchor="middle"
              fontFamily={fonts.math}
              opacity={fadeIn(frame, buildAt[n] + (n === 0 ? 6 : 22))}
            >
              {l}
            </text>
          ))}
          {/* Counting the elements of 3 */}
          <text
            x={XS[3]}
            y={Y + 226}
            fill={colors.green}
            fontSize={36}
            textAnchor="middle"
            opacity={fadeIn(frame, countAt(3))}
          >
            ✓ {tx.elements(3)}
          </text>
        </svg>

        {/* Peano's rules all hold on ω */}
        <div
          style={{
            position: "absolute",
            left: 1460,
            top: 300,
            fontSize: 30,
            opacity: fadeIn(frame, c4 + 12),
            translate: riseIn(frame, c4 + 12, 20),
          }}
        >
          <div
            style={{
              color: colors.primary,
              fontWeight: 700,
              marginBottom: 12,
              width: 380,
            }}
          >
            {tx.peanoHolds}
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                fontFamily: fonts.title,
                fontSize: 40,
                opacity: fadeIn(frame, c4 + 20 + (i - 1) * 6),
              }}
            >
              <span style={{ color: colors.green }}>✓</span> P{i}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
