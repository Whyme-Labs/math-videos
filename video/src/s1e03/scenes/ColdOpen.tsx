import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

const SLOT = 150;
const slotX = (i: number) => 960 + (i - 1.5) * (SLOT + 36);
const SLOT_Y = 220;
const DOT = 46;

// A row of n dots in one colour then m in another, starting at x.
const DotRow: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly n: number;
  readonly m: number;
  readonly c1: string;
  readonly c2: string;
  readonly reveal: number; // 0..1 how many dots are shown
}> = ({ x, y, n, m, c1, c2, reveal }) => (
  <g>
    {Array.from({ length: n + m }).map((_, i) => (
      <circle
        key={i}
        cx={x + i * DOT}
        cy={y}
        r={17 * Math.min(1, Math.max(0, reveal * (n + m) - i))}
        fill={i < n ? c1 : c2}
      />
    ))}
  </g>
);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2] = cues;
  const spin = interpolate(frame, [0, 150], [0, 360]);
  const tryOp = (i: number) => c0 + 30 + i * 14;
  const stamp = springIn(frame, c1 + 30, fps, 9, 240);
  const bars = (start: number) =>
    interpolate(frame, [start, start + 24], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const swap = glide(frame, c2 + 50, fps, 20);
  const rowW = 8 * DOT;
  const rowX = 960 - rowW / 2 + DOT / 2;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="pop" at={c0 + 12} />
      {[0, 1].map((i) => (
        <Sfx key={i} name="thud" at={tryOp(i) + 10} volume={0.25} />
      ))}
      <Sfx name="pop" at={c1 + 6} />
      <Sfx name="thud" at={c1 + 30} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Sfx key={`a${i}`} name="tick" at={c2 + 6 + i * 3} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 50} volume={0.18} />
      <Sfx name="chime" at={c2 + 72} />
      <QuestionTray />

      <AbsoluteFill>
        {/* The toolbox from E02: 0 and next. + and × aren't there. */}
        {[0, 1, 2, 3].map((i) => {
          const filled = i < 2;
          const s = springIn(
            frame,
            filled ? c0 + 4 + i * 8 : c0 + 20 + i * 4,
            fps,
            11,
          );
          const attempt = filled ? 0 : springIn(frame, tryOp(i - 2), fps, 9);
          const failed = !filled && frame >= tryOp(i - 2) + 10;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: slotX(i) - SLOT / 2,
                top: SLOT_Y - SLOT / 2,
                width: SLOT,
                height: SLOT,
                borderRadius: 28,
                border: `4px ${filled ? "solid" : "dashed"} ${filled ? colors.primary : colors.panelEdge}`,
                backgroundColor: filled
                  ? alpha(colors.primary, 0.1)
                  : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: Math.min(1.2, s),
                opacity: Math.min(1, s),
                translate: filled
                  ? undefined
                  : `${shake(frame, tryOp(i - 2) + 10, 10)}px 0px`,
              }}
            >
              {i === 0 ? (
                <span
                  style={{
                    fontFamily: fonts.math,
                    fontSize: 90,
                    color: colors.primary,
                  }}
                >
                  0
                </span>
              ) : null}
              {i === 1 ? (
                <svg
                  width={96}
                  height={96}
                  viewBox="0 0 130 130"
                  style={{ rotate: `${spin}deg` }}
                >
                  <path
                    d="M 65 15 A 50 50 0 1 1 20 45"
                    fill="none"
                    stroke={colors.highlight}
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <polygon points="65,0 65,30 90,15" fill={colors.highlight} />
                </svg>
              ) : null}
              {!filled ? (
                <span
                  style={{
                    fontFamily: fonts.math,
                    fontSize: 90,
                    color: failed ? colors.highlight : colors.text,
                    opacity: Math.min(1, attempt),
                  }}
                >
                  {failed ? "?" : i === 2 ? "+" : "×"}
                </span>
              ) : null}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: slotX(1) - SLOT / 2,
            width: SLOT,
            top: SLOT_Y + SLOT / 2 + 12,
            textAlign: "center",
            fontSize: 28,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 14),
          }}
        >
          {tx.nextWord}
        </div>

        {/* 2 + 2 = 4 … but where's the proof? */}
        <div
          style={{
            position: "absolute",
            top: 430,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 140,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 4) * fadeOut(frame, c2 - 4, 10),
            translate: riseIn(frame, c1 + 4, 40),
          }}
        >
          2 + 2 = 4
        </div>
        <div
          style={{
            position: "absolute",
            left: 1240,
            top: 420,
            padding: "10px 26px",
            borderRadius: 14,
            border: `5px solid ${colors.highlight}`,
            color: colors.highlight,
            fontFamily: fonts.title,
            fontWeight: 700,
            fontSize: 52,
            rotate: "-10deg",
            opacity: Math.min(1, stamp) * fadeOut(frame, c2 - 4, 10),
            scale: interpolate(stamp, [0, 1], [1.8, 1]),
          }}
        >
          {tx.proof}
        </div>

        {/* 3 + 5 and 5 + 3: same length, built differently. */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c2 + 2)}>
            <text
              x={rowX - 70}
              y={505}
              fill={colors.text}
              fontSize={44}
              textAnchor="end"
              fontFamily={fonts.math}
            >
              3 + 5
            </text>
            <DotRow
              x={rowX}
              y={490}
              n={3}
              m={5}
              c1={colors.primary}
              c2={colors.orange}
              reveal={bars(c2 + 6)}
            />
            <text
              x={rowX - 70}
              y={lerp(655, 605, swap)}
              fill={colors.text}
              fontSize={44}
              textAnchor="end"
              fontFamily={fonts.math}
            >
              5 + 3
            </text>
            <DotRow
              x={rowX}
              y={lerp(640, 590, swap)}
              n={5}
              m={3}
              c1={colors.orange}
              c2={colors.primary}
              reveal={bars(c2 + 20)}
            />
            <text
              x={rowX + rowW + 10}
              y={562}
              fill={colors.highlight}
              fontSize={72}
              fontFamily={fonts.title}
              fontWeight={700}
              opacity={fadeIn(frame, c2 + 72)}
            >
              ?
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
