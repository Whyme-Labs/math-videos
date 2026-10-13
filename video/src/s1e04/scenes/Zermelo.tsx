import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import {
  BOTTOM_Y,
  BuildChain,
  ROW_SCALE,
  ROW_XS,
  TOP_Y,
  VN_LABELS,
  Z_LABELS,
} from "../components/sets";
import { useStrings } from "../i18n";

// Zermelo's numbers (n + 1 = {n}) built under von Neumann's. Then: is 1 ∈ 3?
export const Zermelo: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zermelo");
  const [c0, c1, c2, c3] = cues;
  const zAt = [c0 + 8, c0 + 34, c1 + 6, c1 + 34];
  const ease = (f: number, s: number) => glide(f, s, fps, 18);
  const grow = (f: number, s: number) => springIn(f, s, fps, 11);
  const ask = springIn(frame, c2 + 6, fps, 10);
  const yesAt = c3 + 6;
  const noAt = c3 + 30;

  return (
    <SceneShell id="zermelo">
      <Sfx name="page" at={c0 + 2} />
      {zAt.map((t, n) => (
        <Sfx
          key={n}
          name={n === 0 ? "pop" : PLUCKS[n + 1]}
          at={n === 0 ? t : t + 20}
          volume={0.28}
        />
      ))}
      <Sfx name="chime" at={c2 + 6} />
      <Sfx name="ding" at={yesAt} />
      <Sfx name="thud" at={noAt} />
      <QuestionTray />

      <AbsoluteFill>
        {[tx.vnShort, tx.zShort].map((name, r) => (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 120,
              top: (r === 0 ? TOP_Y : BOTTOM_Y) - 150,
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: 2,
              color: r === 0 ? colors.primary : colors.orange,
              opacity: r === 0 ? 1 : fadeIn(frame, c0 + 2),
            }}
          >
            {name}
            {r === 1 ? (
              <span
                style={{ fontWeight: 400, color: colors.muted, marginLeft: 16 }}
              >
                {tx.zermeloTag}
              </span>
            ) : null}
          </div>
        ))}

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <BuildChain
            kind="vn"
            xs={ROW_XS}
            y={TOP_Y}
            scale={ROW_SCALE}
            buildAt={[-100, -100, -100, -100]}
            frame={frame}
            fps={fps}
            ease={ease}
            grow={grow}
            highlight={frame >= yesAt ? { n: 3, k: 1 } : undefined}
          />
          <BuildChain
            kind="z"
            xs={ROW_XS}
            y={BOTTOM_Y}
            scale={ROW_SCALE}
            buildAt={zAt}
            frame={frame}
            fps={fps}
            ease={ease}
            grow={grow}
          />
          {ROW_XS.map((x, n) => (
            <g key={n}>
              <text
                x={x}
                y={TOP_Y + 110}
                fill={colors.muted}
                fontSize={28}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {VN_LABELS[n]}
              </text>
              <text
                x={x}
                y={BOTTOM_Y + 100}
                fill={colors.muted}
                fontSize={28}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={fadeIn(frame, zAt[n] + 20)}
              >
                {Z_LABELS[n]}
              </text>
            </g>
          ))}
        </svg>

        {/* Is 1 ∈ 3? */}
        <div
          style={{
            position: "absolute",
            left: 1300,
            top: 420,
            fontFamily: fonts.math,
            fontSize: 72,
            color: colors.highlight,
            opacity: Math.min(1, ask),
            scale: 0.8 + 0.2 * Math.min(1, ask),
          }}
        >
          1 ∈ 3 ?
        </div>
        <div
          style={{
            position: "absolute",
            left: 1320,
            top: TOP_Y - 30,
            fontSize: 48,
            color: colors.green,
            opacity: fadeIn(frame, yesAt),
            translate: riseIn(frame, yesAt, 16),
          }}
        >
          ✓
        </div>
        <div
          style={{
            position: "absolute",
            left: 1320,
            top: BOTTOM_Y - 30,
            fontSize: 48,
            color: colors.red,
            opacity: fadeIn(frame, noAt),
            translate: `${shake(frame, noAt)}px 0px`,
          }}
        >
          ✗
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
