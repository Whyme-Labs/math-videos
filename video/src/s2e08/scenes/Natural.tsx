import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Stack } from "../../s2e06/components/stack";
import { useStrings } from "../i18n";

// Natural vs chosen. Two panels, each with a basis grid that shears when the
// basis changes. Left, V → V*: the arrow b₁ and its partner stack β¹; as
// the second basis arrow swings, β¹ turns and respaces although b₁ never
// moved, and the left panel is stamped "needs a choice" in red. Right,
// V → V**: the arrow v and the ring v** round it; the grid shears the same
// way and the ring doesn't move at all. Stamped "natural ✓" in green.

const S = 110;

const Panel: React.FC<{
  readonly cx: number;
  readonly swing: number;
  readonly dual: boolean;
  readonly id: string;
}> = ({ cx, swing, dual, id }) => {
  const O = { x: cx, y: 500 };
  const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
  const b1 = { x: 1, y: 0 };
  const b2 = { x: lerp(0, 1.2, swing), y: lerp(1, 0.9, swing) };
  const det = b1.x * b2.y - b2.x * b1.y;
  const beta1 = { a: b2.y / det, b: -b2.x / det };
  const grid = (
    k: number,
    d: { x: number; y: number },
    e: { x: number; y: number },
  ) => ({
    a: scr(k * d.x - 4 * e.x, k * d.y - 4 * e.y),
    b: scr(k * d.x + 4 * e.x, k * d.y + 4 * e.y),
  });
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={cx - 340} y={200} width={680} height={600} rx={30} />
        </clipPath>
      </defs>
      <rect
        x={cx - 340}
        y={200}
        width={680}
        height={600}
        rx={30}
        fill={alpha(colors.bgMid, 0.55)}
        stroke={alpha(colors.paper, 0.3)}
        strokeWidth={4}
      />
      <g clipPath={`url(#${id})`}>
        {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
          <g key={k}>
            {[grid(k, b1, b2), grid(k, b2, b1)].map((l, i) => (
              <line
                key={i}
                x1={l.a.x}
                y1={l.a.y}
                x2={l.b.x}
                y2={l.b.y}
                stroke={alpha(colors.paper, 0.15)}
                strokeWidth={2}
              />
            ))}
          </g>
        ))}
        {dual ? <Stack a={beta1.a} b={beta1.b} scr={scr} width={5} /> : null}
      </g>
      {dual ? (
        <>
          <Arrow from={O} to={scr(b1.x, b1.y)} width={14} />
          <Arrow
            from={O}
            to={scr(b2.x, b2.y)}
            width={10}
            color={alpha(colors.primary, 0.5)}
          />
        </>
      ) : (
        <>
          <Arrow from={O} to={scr(1.3, 0.9)} width={14} />
          <circle
            cx={scr(0.65, 0.45).x}
            cy={scr(0.65, 0.45).y}
            r={120}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <text
            x={scr(0.65, 0.45).x}
            y={scr(0.65, 0.45).y - 140}
            fill={colors.primary}
            fontSize={48}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            v**
          </text>
        </>
      )}
    </g>
  );
};

export const Natural: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("natural");
  const [c0, c1] = cues;
  const swingL = glide(frame, c0 + 40, fps, 50);
  const swingR = glide(frame, c1 + 20, fps, 50);

  return (
    <SceneShell id="natural">
      <Sfx name="whoosh" at={c0 + 40} volume={0.12} />
      <Sfx name="scratch" at={c0 + 90} volume={0.22} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.12} />
      <Sfx name="chime" at={c1 + 70} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Panel cx={540} swing={swingL} dual id="natL" />
        <g opacity={fadeIn(frame, c1, 12)}>
          <Panel cx={1380} swing={swingR} dual={false} id="natR" />
        </g>
        {[
          { x: 540, t: "V → V*", c: colors.orange },
          { x: 1380, t: "V → V**", c: colors.primary },
        ].map((l, k) => (
          <text
            key={l.t}
            x={l.x}
            y={170}
            fill={l.c}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={k === 0 ? fadeIn(frame, c0 + 4) : fadeIn(frame, c1)}
          >
            {l.t}
          </text>
        ))}
      </svg>
      {[
        { t: tx.choice, at: c0 + 90, left: 340, c: colors.red, mark: "✗" },
        { t: tx.natural, at: c1 + 70, left: 1200, c: colors.green, mark: "✓" },
      ].map((l) => (
        <div
          key={l.t}
          style={{
            position: "absolute",
            top: 720,
            left: l.left,
            width: 400,
            textAlign: "center",
            padding: "8px 0",
            borderRadius: 14,
            border: `5px solid ${l.c}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 44,
            fontWeight: 900,
            color: l.c,
            opacity: fadeIn(frame, l.at),
            translate: riseIn(frame, l.at, 16),
            rotate: "-4deg",
          }}
        >
          {l.t} {l.mark}
        </div>
      ))}
    </SceneShell>
  );
};
