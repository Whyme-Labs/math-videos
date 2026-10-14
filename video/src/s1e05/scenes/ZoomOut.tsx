import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { scatter } from "../components/pieces";
import { useStrings } from "../i18n";

// The recipe in four cards, then the quotients still to come.
const CARD_W = 300;
const CARD_H = 200;
const cardX = (i: number) => 360 + i * 400;
const CARD_Y = 340;
const QUOTIENTS = ["ℤ", "ℚ", "ℝ", "ℤ/nℤ", "ℂ ≅ ℝ[x]/(x²+1)", "V/W"];

// The drawing inside each card.
const Icon: React.FC<{ readonly i: number; readonly t: number }> = ({
  i,
  t,
}) => {
  if (i === 0)
    return (
      <g>
        {Array.from({ length: 9 }).map((_, k) => {
          const p = scatter(k + 40, { x: -100, y: -60, w: 200, h: 120 });
          return (
            <circle key={k} cx={p.x} cy={p.y} r={9} fill={colors.primary} />
          );
        })}
      </g>
    );
  if (i === 1)
    return (
      <text
        y={34}
        fill={colors.highlight}
        fontSize={110}
        textAnchor="middle"
        fontFamily={fonts.math}
      >
        ~
      </text>
    );
  if (i === 2)
    return (
      <g>
        {[-80, 0, 80].map((x) => (
          <g key={x}>
            <circle
              cx={x}
              cy={0}
              r={34}
              fill={alpha(colors.primary, 0.12)}
              stroke={colors.primary}
              strokeWidth={2.5}
            />
            {[0, 1, 2].map((k) => (
              <circle
                key={k}
                cx={x + 14 * Math.sin((k / 3) * 2 * Math.PI)}
                cy={-14 * Math.cos((k / 3) * 2 * Math.PI)}
                r={6}
                fill={colors.primary}
              />
            ))}
          </g>
        ))}
      </g>
    );
  return (
    <text
      y={30}
      fill={colors.green}
      fontSize={96}
      textAnchor="middle"
      opacity={t}
    >
      ✓
    </text>
  );
};

export const ZoomOut: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zoomOut");
  const [c0, c1] = cues;
  const cardAt = (i: number) => c0 + 6 + i * 14;
  const up = glide(frame, c1 + 2, fps, 22);
  const stampAt = (i: number) => c1 + 14 + i * 8;

  return (
    <SceneShell id="zoomOut">
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name={PLUCKS[i]} at={cardAt(i)} volume={0.28} />
      ))}
      <Sfx name="ding" at={cardAt(3) + 10} volume={0.25} />
      <Sfx name="whoosh" at={c1 + 2} volume={0.14} />
      {QUOTIENTS.map((_, i) => (
        <Sfx key={`q${i}`} name="pop" at={stampAt(i)} volume={0.22} />
      ))}
      <Sfx name="sparkle" at={stampAt(QUOTIENTS.length - 1) + 10} />
      <QuestionTray />

      <AbsoluteFill
        style={{
          scale: lerp(1, 0.78, up),
          translate: `0px ${lerp(0, -150, up)}px`,
        }}
      >
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M ${cardX(i) + CARD_W / 2 + 14} ${CARD_Y} L ${cardX(i + 1) - CARD_W / 2 - 14} ${CARD_Y}`}
              stroke={colors.muted}
              strokeWidth={4}
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - ramp(frame, cardAt(i + 1) - 4, 8)}
              markerEnd="url(#head)"
            />
          ))}
          <defs>
            <marker
              id="head"
              viewBox="0 0 10 10"
              refX={6}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.muted} />
            </marker>
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const s = Math.min(1, springIn(frame, cardAt(i), fps, 11));
            return (
              <g
                key={i}
                opacity={s}
                transform={`translate(${cardX(i)} ${CARD_Y}) scale(${s})`}
              >
                <rect
                  x={-CARD_W / 2}
                  y={-CARD_H / 2}
                  width={CARD_W}
                  height={CARD_H}
                  rx={24}
                  fill={colors.panel}
                  stroke={colors.panelEdge}
                  strokeWidth={3}
                />
                <Icon i={i} t={fadeIn(frame, cardAt(i) + 6)} />
              </g>
            );
          })}
        </svg>
        {tx.recipe.map((r, i) => (
          <div
            key={r}
            style={{
              position: "absolute",
              left: cardX(i) - 190,
              width: 380,
              top: CARD_Y + CARD_H / 2 + 20,
              textAlign: "center",
              fontSize: 36,
              opacity: fadeIn(frame, cardAt(i) + 6),
              translate: riseIn(frame, cardAt(i) + 6, 16),
            }}
          >
            {r}
          </div>
        ))}
      </AbsoluteFill>

      {/* quotients to come */}
      <AbsoluteFill
        style={{
          top: 520,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 22,
          paddingLeft: 140,
          paddingRight: 140,
        }}
      >
        {QUOTIENTS.map((q, i) => {
          const s = Math.min(1, springIn(frame, stampAt(i), fps, 11));
          return (
            <div
              key={q}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                height: 76,
                padding: "0 26px",
                borderRadius: 999,
                border: `3px solid ${colors.primary}`,
                backgroundColor: alpha(colors.primary, 0.1),
                opacity: s,
                scale: s,
                lineHeight: "76px",
              }}
            >
              <span style={{ fontFamily: fonts.math, fontSize: 44 }}>{q}</span>
              <span style={{ fontSize: 26, color: colors.muted }}>
                ↪ {tx.stamps[i]}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </SceneShell>
  );
};
