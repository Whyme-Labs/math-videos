import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import {
  IDENTITY,
  Plane,
  lerpMat,
  linear,
  type Mat2,
} from "../../shared/components/Plane";
import { useStrings } from "../i18n";

// Arrows and stacks, and no natural bridge. An arrow v and an unrelated
// stack α, each labelled (c0). A test arrow w turns and a counter shows how
// many sheets of α it crosses, α(w) (c1). A basis pairs them: arrow with
// coordinates c ↔ the stack with the same coordinates in the dual basis;
// the stack swings to become v's partner, the basis arrows drawn (c2).
// The basis bends (the grid shears, b₂ tipping over); v doesn't move but
// its partner stack turns (c3). The basis rocks back and forth and the
// partner keeps changing: nothing in the space prefers one (c4).

const O = { x: 760, y: 480 };
const S = 170;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const V = { x: 0.9, y: 0.5 };
const A0 = { a: 0.7, b: -0.5 };
const SHEAR: Mat2 = [1, 1, 0, 1];
const inv = ([a, b, c, d]: Mat2): Mat2 => {
  const det = a * d - b * c;
  return [d / det, -b / det, -c / det, a / det];
};

export const TwoKinds: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("twoKinds");
  const [c0, c1, c2, c3, c4] = cues;
  const th = 0.3 + Math.max(0, frame - c1 - 6) * 0.03;
  const w = { x: 1.6 * Math.cos(th), y: 1.6 * Math.sin(th) };
  const pair = glide(frame, c2 + 10, fps, 30);
  const rock = frame > c4 ? 0.5 - 0.5 * Math.cos((frame - c4) * 0.06) : 0;
  const bend = glide(frame, c3 + 10, fps, 36) * (1 - rock);
  const B = lerpMat(IDENTITY, SHEAR, bend);
  const Bi = inv(B);
  // coordinates of v in the basis, then the stack with the same dual coordinates
  const c = linear(Bi)(V.x, V.y);
  const paired = { a: c.x * Bi[0] + c.y * Bi[2], b: c.x * Bi[1] + c.y * Bi[3] };
  const al = { a: lerp(A0.a, paired.a, pair), b: lerp(A0.b, paired.b, pair) };
  const crossed = al.a * w.x + al.b * w.y;
  const b1 = linear(B)(1, 0);
  const b2 = linear(B)(0, 1);
  const showTest = fadeIn(frame, c1 + 6) * (1 - fadeIn(frame, c2 + 4));

  return (
    <SceneShell id="twoKinds">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="pop" at={c0 + 20} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.08} />
      <Sfx name="clink" at={c2 + 10} volume={0.16} />
      <Sfx name="whoosh" at={c3 + 10} volume={0.1} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="e16two">
            <circle cx={O.x} cy={O.y} r={360} />
          </clipPath>
        </defs>
        <g clipPath="url(#e16two)">
          <g opacity={fadeIn(frame, c2 + 4) * 0.9}>
            <Plane map={linear(B)} scr={scr} range={6} />
          </g>
          <g opacity={fadeIn(frame, c0 + 20)}>
            <Stack a={al.a} b={al.b} scr={scr} range={10} />
          </g>
        </g>
        <g opacity={fadeIn(frame, c2 + 4)}>
          <Arrow
            from={O}
            to={scr(b1.x, b1.y)}
            width={10}
            color={alpha(colors.paper, 0.8)}
          />
          <Arrow
            from={O}
            to={scr(b2.x, b2.y)}
            width={10}
            color={alpha(colors.paper, 0.8)}
          />
        </g>
        <g opacity={showTest}>
          <Arrow from={O} to={scr(w.x, w.y)} width={12} color={colors.green} />
        </g>
        <g opacity={fadeIn(frame, c0 + 6)}>
          <Arrow from={O} to={scr(V.x, V.y)} width={16} />
          <text
            x={scr(V.x, V.y).x + 16}
            y={scr(V.x, V.y).y - 14}
            fill={colors.primary}
            fontSize={50}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 1340,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 6),
          }}
        >
          → {tx.arrow}
        </div>
        <div
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: colors.orange,
            opacity: fadeIn(frame, c0 + 20),
          }}
        >
          ≡ {tx.stack}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 1340,
          width: 420,
          padding: "14px 0",
          borderRadius: 20,
          textAlign: "center",
          background: alpha(colors.bg, 0.85),
          border: `4px solid ${colors.green}`,
          opacity: showTest,
        }}
      >
        <div style={{ fontSize: 32, color: colors.muted, fontWeight: 700 }}>
          {tx.count}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 84,
            fontWeight: 800,
            color: colors.green,
          }}
        >
          {crossed.toFixed(1).replace("-", "−")}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1340,
          width: 440,
          padding: "14px 0",
          borderRadius: 16,
          textAlign: "center",
          border: `4px solid ${colors.highlight}`,
          fontSize: 38,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c2 + 20),
          translate: riseIn(frame, c2 + 20, 12),
        }}
      >
        {tx.pairing}
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 1340,
          width: 440,
          textAlign: "center",
          fontSize: 110,
          fontWeight: 900,
          color: colors.highlight,
          opacity: fadeIn(frame, c4 + 20),
        }}
      >
        ?
      </div>
    </SceneShell>
  );
};
