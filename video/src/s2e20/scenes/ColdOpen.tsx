import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { Eq, type Tok } from "../../shared/components/Eq";
import { Boxes, BOX } from "../components/boxes";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// The free lunch and the conveyor belt. A grid bends through an
// invertible matrix and still covers the whole plane, with the chip
// one-to-one ⇒ onto (c0) and the formula Ax = 0 ⇒ x = 0 turning into
// "every b is reached" (c1). Then an endless row of boxes (c2); every
// number slides one box right and a 0 drops into the first box (c3); the
// numbers slide back in green: nothing was lost (c4). The target 1, 0,
// 0, … floats above the row; the first box pulses red and shakes: every
// output starts with 0 (c5). A counter: dim = 3, 10, 100 … ∞ (c6). The
// ledger of five lines appears (c7).

const M: Mat2 = [1.3, 0.6, -0.4, 0.9];
const O = { x: 620, y: 460 };
const S = 90;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const VALS = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7];
const tok = (id: string, t: string, color?: string): Tok => ({ id, t, color });

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const part1 = fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c6, 10);
  const bend = glide(frame, c0 + 10, fps, 30);
  const slide = glide(frame, c3 + 10, fps, 24) - glide(frame, c4 + 10, fps, 24);
  const back = frame >= c4 + 10 && frame < c5;
  const values = ["0", ...VALS.map(String)];
  const shown = slide > 0.01 || frame >= c5 ? values : VALS.map(String);
  const off = frame >= c5 ? 0 : slide > 0.01 ? slide - 1 : 0;
  const shk = shake(frame, c5 + 30, 14);
  const dims = ["3", "10", "100", "1000", "∞"];
  const di = Math.min(4, Math.max(0, Math.floor((frame - c6 - 6) / 14)));
  const steps: Tok[][] = [
    [tok("a", "Ax = 0"), tok("i", " ⇒ "), tok("b", "x = 0")],
    [tok("a", "Ax = b"), tok("i", tx.solvable, colors.green)],
  ];

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 10} volume={0.1} />
      <Sfx name="pop" at={c1 + 6} volume={0.12} />
      <Sfx name="ding" at={c1 + 50} volume={0.26} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.12} />
      <Sfx name="thud" at={c3 + 30} volume={0.18} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.1} />
      <Sfx name="thud" at={c5 + 30} volume={0.26} />
      {dims.map((_, i) => (
        <Sfx key={i} name="tick" at={c6 + 6 + i * 14} volume={0.12} />
      ))}
      <Sfx name="chime" at={c7 + 10} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <defs>
            <clipPath id="c20">
              <rect x={140} y={90} width={1000} height={740} rx={20} />
            </clipPath>
          </defs>
          <g clipPath="url(#c20)">
            <Plane
              map={linear(lerpMat(IDENTITY, M, bend))}
              scr={scr}
              range={9}
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 1240,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c0 + 10),
            translate: riseIn(frame, c0 + 10, 14),
          }}
        >
          {tx.freeLunch}
        </div>
        <div style={{ opacity: fadeIn(frame, c1 + 6, 8) }}>
          <Eq
            steps={steps}
            at={[c1 + 6, c1 + 50]}
            x={1480}
            y={300}
            size={50}
            family={fonts.body}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${shk} 0)`}>
            <Boxes
              x={160}
              y={500}
              n={14}
              values={shown}
              offset={off}
              hot={frame >= c5 + 20 ? 0 : -1}
              color={back ? colors.green : colors.text}
            />
          </g>
          <g opacity={fadeIn(frame, c5 + 6, 10)}>
            <Boxes
              x={160}
              y={300}
              n={14}
              values={["1", ...Array(13).fill("0")]}
              color={colors.primary}
            />
            <text
              x={160}
              y={280}
              fill={colors.highlight}
              fontSize={40}
              fontWeight={800}
            >
              {tx.never}
            </text>
            <line
              x1={160}
              y1={420}
              x2={160 + BOX * 14}
              y2={300}
              stroke={colors.red}
              strokeWidth={6}
              opacity={fadeIn(frame, c5 + 40, 8)}
            />
          </g>
          <text
            x={160 + 14 * BOX - 40}
            y={720}
            fill={colors.muted}
            fontSize={60}
            fontWeight={800}
          >
            …
          </text>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ opacity: fadeIn(frame, c6 + 4, 10) * fadeOut(frame, c7, 10) }}
      >
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 120,
            fontWeight: 800,
            color: di === 4 ? colors.highlight : colors.text,
          }}
        >
          dim = {dims[di]}
        </div>
      </AbsoluteFill>
      <Ledger crossed={0} x={680} y={170} opacity={fadeIn(frame, c7 + 6, 12)} />
    </SceneShell>
  );
};
