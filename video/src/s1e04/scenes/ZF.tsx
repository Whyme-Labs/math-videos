import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { SetBox } from "../components/sets";
import { useStrings } from "../i18n";

// The fix: no "set of everything with property P". Only a few building tools,
// and Separation, which carves from a set you already have. Carving
// Russell's set out of A always lands outside A.

const GLYPHS = ["∅", "{a, b}", "⋃ A", "𝒫(A)", "{x ∈ A : P}", "∞"];
const SEP = 4; // index of Separation
const CARD_W = 300;
const CARD_H = 150;
const gridX = (i: number) => 960 + ((i % 3) - 1) * (CARD_W + 40);
const gridY = (i: number) => 330 + Math.floor(i / 3) * (CARD_H + 40);
// The demo set A and the carved set R_A
const A = { x: 1150, y: 420, w: 360, h: 170 };
const RA = { x: 1540, y: 640, w: 330, h: 150 };

export const ZF: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zf");
  const [c0, c1, c2, c3] = cues;
  const cardAt = (i: number) => c1 + 6 + i * 6;
  const aside = glide(frame, c3 + 2, fps, 22); // tools shrink to the left
  const fall = (k: number) => glide(frame, c3 + 30 + k * 8, fps, 18);
  const verdict = springIn(frame, c3 + 70, fps, 10);

  return (
    <SceneShell id="zf">
      <Sfx name="scratch" at={c0 + 20} />
      {GLYPHS.map((_, i) => (
        <Sfx key={i} name="pop" at={cardAt(i)} volume={0.2} />
      ))}
      <Sfx name="ding" at={cardAt(SEP) + 10} volume={0.25} />
      <Sfx name="page" at={c2 + 4} />
      <Sfx name="whoosh" at={c3 + 2} volume={0.18} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`f${k}`} name="tick" at={c3 + 46 + k * 8} volume={0.22} />
      ))}
      <Sfx name="sparkle" at={c3 + 70} />
      <QuestionTray />

      <AbsoluteFill>
        {/* No more "the set of everything with P" */}
        <div
          style={{
            position: "absolute",
            top: 150,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 80,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 10),
          }}
        >
          <span style={{ position: "relative" }}>
            {"{ x : P(x) }"}
            <span
              style={{
                position: "absolute",
                left: -20,
                top: "50%",
                height: 8,
                width: `${110 * ramp(frame, c0 + 20, 12)}%`,
                backgroundColor: colors.red,
                borderRadius: 4,
                rotate: "-8deg",
              }}
            />
          </span>
        </div>

        {/* The toolkit */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            scale: lerp(1, 0.55, aside),
            translate: `${lerp(0, -560, aside)}px ${lerp(0, -40, aside)}px`,
          }}
        >
          {GLYPHS.map((g, i) => {
            const s = springIn(frame, cardAt(i), fps, 11);
            const sep = i === SEP;
            const lit = sep && frame >= cardAt(SEP) + 10;
            return (
              <div
                key={g}
                style={{
                  position: "absolute",
                  left: gridX(i) - CARD_W / 2,
                  top: gridY(i) - CARD_H / 2,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 20,
                  border: `3px solid ${lit ? colors.primary : colors.panelEdge}`,
                  backgroundColor: lit
                    ? alpha(colors.primary, 0.12)
                    : colors.panel,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: Math.min(1, s),
                  scale: Math.min(1.1, s) * (lit ? 1.06 : 1),
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.math,
                    fontSize: 44,
                    color: lit ? colors.primary : colors.text,
                  }}
                >
                  {g}
                </span>
                <span style={{ fontSize: 28, color: colors.muted }}>
                  {tx.tools[i]}
                </span>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: gridX(SEP) - 260,
              width: 520,
              top: gridY(SEP) + CARD_H / 2 + 18,
              textAlign: "center",
              fontSize: 32,
              color: colors.primary,
              opacity: fadeIn(frame, cardAt(SEP) + 14),
            }}
          >
            {tx.onlyCarve}
          </div>
          <div
            style={{
              position: "absolute",
              top: 130,
              width: "100%",
              textAlign: "center",
              fontSize: 52,
              fontFamily: fonts.title,
              opacity: fadeIn(frame, c2 + 4),
              translate: riseIn(frame, c2 + 4),
            }}
          >
            {tx.zfTag}
          </div>
        </div>

        {/* Separation on a small set A: R_A = {x ∈ A : x ∉ x} lands outside A */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <g opacity={fadeIn(frame, c3 + 14)}>
            <rect
              x={A.x - A.w / 2}
              y={A.y - A.h / 2}
              width={A.w}
              height={A.h}
              rx={18}
              fill={alpha(colors.primary, 0.06)}
              stroke={colors.primary}
              strokeWidth={3}
            />
            <text
              x={A.x - A.w / 2 + 16}
              y={A.y - A.h / 2 - 14}
              fill={colors.primary}
              fontSize={40}
              fontFamily={fonts.math}
            >
              A
            </text>
            {/* the sieve */}
            <path
              d={`M ${A.x - 120} ${A.y + A.h / 2 + 30} L ${A.x + 120} ${A.y + A.h / 2 + 30} L ${A.x + 40} ${A.y + A.h / 2 + 110} L ${A.x - 40} ${A.y + A.h / 2 + 110} Z`}
              fill={alpha(colors.primary, 0.1)}
              stroke={colors.primary}
              strokeWidth={3}
              strokeDasharray="8 6"
            />
            <rect
              x={RA.x - RA.w / 2}
              y={RA.y - RA.h / 2}
              width={RA.w}
              height={RA.h}
              rx={18}
              fill={alpha(colors.green, 0.06)}
              stroke={colors.green}
              strokeWidth={3}
              opacity={fadeIn(frame, c3 + 40)}
            />
            <text
              x={RA.x - RA.w / 2 + 12}
              y={RA.y + RA.h / 2 + 46}
              fill={colors.green}
              fontSize={36}
              fontFamily={fonts.math}
              opacity={fadeIn(frame, c3 + 40)}
            >
              R
              <tspan baselineShift="sub" fontSize={24}>
                A
              </tspan>{" "}
              = {"{ x ∈ A : x ∉ x }"}
            </text>
            {[0, 1, 2].map((k) => {
              // elements of A: ∅, {∅}, {{∅}} (Zermelo 0, 1, 2)
              const sx = A.x - 110 + k * 110;
              const p = fall(k);
              // a copy drops through the sieve and slides into R_A
              const mid = { x: A.x, y: A.y + A.h / 2 + 140 };
              const ex = RA.x - 100 + k * 100;
              const x =
                p < 0.5
                  ? lerp(sx, mid.x, p * 2)
                  : lerp(mid.x, ex, (p - 0.5) * 2);
              const y =
                p < 0.5
                  ? lerp(A.y, mid.y, p * 2)
                  : lerp(mid.y, RA.y, (p - 0.5) * 2);
              return (
                <g key={k}>
                  <SetBox n={k} kind="z" cx={sx} cy={A.y} />
                  {p > 0 ? <SetBox n={k} kind="z" cx={x} cy={y} /> : null}
                </g>
              );
            })}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: RA.x - 300,
            width: 600,
            top: RA.y - RA.h / 2 - 70,
            textAlign: "center",
            fontSize: 32,
            color: colors.green,
            opacity: fadeIn(frame, c3 + 60),
          }}
        >
          R<sub style={{ fontSize: 22 }}>A</sub> ∉ A · {tx.landsOutside}
        </div>
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 640,
            fontSize: 48,
            fontFamily: fonts.title,
            color: colors.primary,
            opacity: Math.min(1, verdict),
            scale: 0.8 + 0.2 * Math.min(1, verdict),
            transformOrigin: "0 50%",
          }}
        >
          ✓ {tx.noSetOfAll}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
