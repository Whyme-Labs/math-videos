import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only: 刘徽割圆术, from his commentary on 《九章算术》方田章
// (圆田术): "割之弥细，所失弥少。割之又割，以至于不可割，则与圆周合体而无所
// 失矣。" Regular polygons inscribed in a circle double their sides
// (6 → 12 → … → 192) and close in on it; half the perimeter of the n-gon
// (n · sin(π/n) for radius 1) climbs towards π.

const C = { x: 520, y: 450 };
const R = 280;
const NS = [6, 12, 24, 48, 96, 192];
const SLIP_W = 92;
const SLIP_X = (i: number) => 1700 - i * (SLIP_W + 14);
const SLIP_Y = 170;
const SLIP_H = 470;

const polygon = (n: number) =>
  Array.from({ length: n })
    .map((_, k) => {
      const a = (k / n) * 2 * Math.PI - Math.PI / 2;
      return `${C.x + R * Math.cos(a)},${C.y + R * Math.sin(a)}`;
    })
    .join(" ");

export const LiuHui: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("liuHui");
  const [c0, c1, c2] = cues;
  const stepAt = (k: number) => c0 + 30 + k * 22;
  // the doubling runs once while it's explained, and again on the last line
  const replayAt = (k: number) => c2 + 50 + k * 10;
  const level =
    frame >= replayAt(0)
      ? NS.reduce((acc, _, k) => (frame >= replayAt(k) ? k : acc), 0)
      : NS.reduce((acc, _, k) => (frame >= stepAt(k) ? k : acc), 0);
  const shownAt = (k: number) =>
    frame >= replayAt(0) ? replayAt(k) : stepAt(k);
  const slipAt = (i: number) => c1 + 4 + i * 8;
  const pi = springIn(frame, c2 + 30, fps, 10);
  const halfPerim = (n: number) => n * Math.sin(Math.PI / n);

  return (
    <SceneShell id="liuHui">
      <Sfx name="scratch" at={c0 + 6} volume={0.2} />
      {NS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={stepAt(k)} volume={0.22} />
      ))}
      {tx.quote.map((_, i) => (
        <Sfx key={`q${i}`} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      <Sfx name="chime" at={c2 + 30} />
      {NS.map((_, k) => (
        <Sfx key={`r${k}`} name="tick" at={c2 + 50 + k * 10} volume={0.14} />
      ))}

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <circle
            cx={C.x}
            cy={C.y}
            r={R}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 4)}
          />
          {NS.map((n, k) => (
            <polygon
              key={n}
              points={polygon(n)}
              fill={k === level ? alpha(colors.primary, 0.14) : "none"}
              stroke={colors.primary}
              strokeWidth={k === level ? 4 : 2}
              opacity={
                frame < shownAt(k)
                  ? 0
                  : k === level
                    ? Math.min(1, springIn(frame, shownAt(k), fps, 14))
                    : 0.18
              }
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            left: C.x - 220,
            width: 440,
            top: C.y + R + 24,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 40,
            opacity: fadeIn(frame, c0 + 30),
          }}
        >
          <span style={{ color: colors.primary }}>{tx.sides(NS[level])}</span>
          <span style={{ color: colors.muted, marginLeft: 20 }}>
            {halfPerim(NS[level]).toFixed(4)}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 880,
            top: 300,
            fontFamily: fonts.mono,
            fontSize: 34,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 30),
          }}
        >
          {NS.slice(0, level + 1).map((n) => (
            <div
              key={n}
              style={{ opacity: fadeIn(frame, stepAt(NS.indexOf(n))) }}
            >
              {String(n).padStart(3, " ")} → {halfPerim(n).toFixed(4)}
            </div>
          ))}
          <div
            style={{
              fontFamily: fonts.math,
              fontSize: 56,
              color: colors.highlight,
              marginTop: 16,
              opacity: Math.min(1, pi),
              scale: lerp(0.7, 1, Math.min(1, pi)),
              transformOrigin: "0 50%",
            }}
          >
            {tx.piApprox}
          </div>
        </div>
        {/* the quote on bamboo slips */}
        {tx.quote.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLIP_X(i),
              top: SLIP_Y,
              width: SLIP_W,
              height: SLIP_H,
              borderRadius: 12,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 20,
              opacity: fadeIn(frame, slipAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slipAt(i), fps, 12))) * -50}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 46,
                letterSpacing: 6,
                color: colors.paper,
              }}
            >
              {t}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(5) - 20,
            width: SLIP_X(0) + SLIP_W - SLIP_X(5) + 40,
            top: SLIP_Y + SLIP_H + 18,
            textAlign: "center",
            fontSize: 30,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(5) + 6),
            translate: riseIn(frame, slipAt(5) + 6, 14),
          }}
        >
          {tx.liuSource}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
