import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Stairs, ST, yOfGap } from "../components/stairs";
import { useStrings } from "../i18n";

// Could the ceiling stop at some c < 1? Try c = 0.95: the step 0.99 pokes
// through. Zoom ×10, try 0.995: 0.999 pokes through. Again. Then the only
// way out: a gap smaller than every 10⁻ⁿ, an infinitesimal.

const TRIES = [
  { gap: 0.05, label: "0.95", poke: 2 },
  { gap: 0.005, label: "0.995", poke: 3 },
  { gap: 0.0005, label: "0.9995", poke: 4 },
];

export const NoRoom: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("noRoom");
  const [c0, c1, c2] = cues;
  const tryAt = [c0 + 10, c1 + 10, c1 + 70];
  const dropAt = (k: number) => tryAt[k] + (k === 0 ? 0 : 24);
  const pokeAt = (k: number) => dropAt(k) + 24;
  const zoom =
    10 ** (glide(frame, tryAt[1], fps, 22) + glide(frame, tryAt[2], fps, 22));
  const k = [2, 1, 0].find((i) => frame >= tryAt[i]) ?? 0;
  const t = TRIES[k];
  const drop = glide(frame, dropAt(k), fps, 18);
  const ceilY = lerp(ST.top - 200, yOfGap(t.gap, zoom), drop);
  const dim = lerp(1, 0.2, glide(frame, c2 + 4, fps, 16));
  const poked = (n: number) =>
    TRIES.some((tr, i) => i <= k && tr.poke === n && frame >= pokeAt(i));

  return (
    <SceneShell id="noRoom">
      {TRIES.map((_, i) => (
        <Sfx key={`d${i}`} name="whoosh" at={dropAt(i)} volume={0.14} />
      ))}
      {TRIES.map((_, i) => (
        <Sfx key={`p${i}`} name="scratch" at={pokeAt(i)} volume={0.26} />
      ))}
      <Sfx name="pop" at={c2 + 14} />
      <Sfx name="ding" at={c2 + 60} volume={0.22} />
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <Stairs
            zoom={zoom}
            opacity={dim}
            rise={() => 1}
            fill={(n) => (poked(n) ? colors.red : colors.primary)}
          />
          <g
            opacity={Math.min(1, drop) * dim}
            transform={`translate(${shake(frame, pokeAt(k), 12)} 0)`}
          >
            <rect
              x={ST.x0 - 60}
              y={ceilY - 7}
              width={ST.x1 - ST.x0 + 120}
              height={14}
              rx={6}
              fill={alpha(colors.highlight, 0.9)}
            />
            <text
              x={ST.x1 + 80}
              y={ceilY + 14}
              fill={colors.highlight}
              fontSize={42}
              fontFamily={fonts.math}
            >
              c = {t.label}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: ST.top + ST.h + 40,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            color: colors.red,
            opacity: fadeIn(frame, pokeAt(0) + 6) * fadeOut(frame, c2, 10),
          }}
        >
          {tx.below}
        </div>
        <div
          style={{
            position: "absolute",
            right: 200,
            top: 120,
            fontFamily: fonts.mono,
            fontSize: 40,
            color: colors.highlight,
            opacity: fadeIn(frame, tryAt[1]) * dim,
          }}
        >
          {tx.zoom(Math.round(zoom))}
        </div>
        {/* the only way out */}
        <div
          style={{
            position: "absolute",
            top: 300,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 64,
              opacity: fadeIn(frame, c2 + 14),
              translate: riseIn(frame, c2 + 14, 20),
            }}
          >
            0 {"<"} 1 − 0.999… {"<"} 10
            <sup style={{ fontSize: 40 }}>−n</sup>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 40,
                color: colors.muted,
              }}
            >
              {"  "}({tx.smallerThanAll})
            </span>
          </div>
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 60,
              color: colors.highlight,
              opacity: fadeIn(frame, c2 + 60),
              scale: lerp(
                0.7,
                1,
                Math.min(1, springIn(frame, c2 + 60, fps, 11)),
              ),
            }}
          >
            = {tx.infinitesimal} ?
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
