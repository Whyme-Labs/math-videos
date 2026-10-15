import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { ramp, springIn } from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { TOWER_HEIGHT, Tower } from "../../shared/components/Tower";
import { colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The number tower gets its ℤ and ℚ floors (ring, field), and the
// "what did we lose?" ledger gets two entries: no smallest integer, and no
// next rational after 0.

const TOWER_LEFT = 160;
const TOWER_TOP = 160;
const FLOOR = 126;
const floorMid = (i: number) => TOWER_TOP + TOWER_HEIGHT - (i + 1) * FLOOR + 56;
const LEDGER_X = 1180;

export const Ledger: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ledger");
  const [c0, c1, c2] = cues;
  const zIn = Math.min(1, springIn(frame, c0 + 4, fps, 12));
  const qIn = Math.min(1, springIn(frame, c1 + 4, fps, 12));
  const flow = Math.max(0, frame - (c2 + 10));
  const halfAt = (k: number) => c2 + 50 + k * 6;

  const plaque = (i: number, name: string, ops: string, start: number) => (
    <div
      style={{
        position: "absolute",
        left: TOWER_LEFT + 560,
        top: floorMid(i) - 34,
        display: "flex",
        alignItems: "baseline",
        gap: 20,
        opacity: fadeIn(frame, start),
        translate: riseIn(frame, start, 16),
      }}
    >
      <span
        style={{ fontFamily: fonts.title, fontSize: 48, color: colors.primary }}
      >
        {name}
      </span>
      <span style={{ fontFamily: fonts.math, fontSize: 42 }}>{ops}</span>
    </div>
  );

  return (
    <SceneShell id="ledger">
      <Sfx name="whoosh" at={c0 + 4} volume={0.16} />
      <Sfx name="sparkle" at={c0 + 22} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.16} />
      <Sfx name="sparkle" at={c1 + 22} />
      <Sfx name="page" at={c2 + 6} />
      <Sfx name="tick" at={c2 + 14} volume={0.2} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx key={k} name={PLUCKS[k]} at={halfAt(k)} volume={0.2} />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <Tower
          appear={[1, zIn, qIn, 0.35, 0.35]}
          built={[1, ramp(frame, c0 + 20, 12), ramp(frame, c1 + 20, 12), 0, 0]}
          question={[0, 0, 0, 1, 1]}
          style={{ position: "absolute", left: TOWER_LEFT, top: TOWER_TOP }}
        />
        {plaque(1, tx.ring, tx.ringOps, c0 + 24)}
        {plaque(2, tx.field, tx.fieldOps, c1 + 24)}

        {/* what did we lose? */}
        <div
          style={{
            position: "absolute",
            left: LEDGER_X,
            top: 190,
            fontFamily: fonts.title,
            fontSize: 50,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 6),
            translate: riseIn(frame, c2 + 6, 20),
          }}
        >
          {tx.lost}
        </div>
        {[
          { sym: "ℤ", text: tx.lostZ, top: 290, at: c2 + 14 },
          { sym: "ℚ", text: tx.lostQ, top: 500, at: c2 + 40 },
        ].map((r) => (
          <div
            key={r.sym}
            style={{
              position: "absolute",
              left: LEDGER_X,
              top: r.top,
              fontSize: 40,
              opacity: fadeIn(frame, r.at),
              translate: riseIn(frame, r.at, 16),
            }}
          >
            <span
              style={{ fontFamily: fonts.math, fontSize: 52, marginRight: 18 }}
            >
              {r.sym}
            </span>
            <span
              style={{ textDecoration: "line-through", color: colors.muted }}
            >
              {r.text}
            </span>
          </div>
        ))}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* ℤ: the integers run off to the left forever */}
          <g opacity={fadeIn(frame, c2 + 14)}>
            <line
              x1={LEDGER_X}
              y1={420}
              x2={1740}
              y2={420}
              stroke={colors.muted}
              strokeWidth={3}
            />
            {Array.from({ length: 11 }).map((_, k) => {
              const x = 1700 - k * 56 - ((flow * 1.5) % 56);
              const fade = Math.min(1, (x - LEDGER_X) / 80);
              return x > LEDGER_X ? (
                <circle
                  key={k}
                  cx={x}
                  cy={420}
                  r={9}
                  fill={colors.primary}
                  opacity={Math.max(0, fade)}
                />
              ) : null;
            })}
            <text
              x={LEDGER_X - 10}
              y={430}
              fill={colors.muted}
              fontSize={34}
              textAnchor="end"
            >
              …
            </text>
          </g>
          {/* ℚ: 1, 1/2, 1/4, … crowd towards 0, none of them next */}
          <g opacity={fadeIn(frame, c2 + 40)}>
            <line
              x1={LEDGER_X}
              y1={630}
              x2={1740}
              y2={630}
              stroke={colors.muted}
              strokeWidth={3}
            />
            <circle
              cx={LEDGER_X + 20}
              cy={630}
              r={10}
              fill={colors.highlight}
            />
            <text
              x={LEDGER_X + 20}
              y={680}
              fill={colors.highlight}
              fontSize={30}
              textAnchor="middle"
              fontFamily={fonts.mono}
            >
              0
            </text>
            {Array.from({ length: 7 }).map((_, k) => {
              const x = LEDGER_X + 20 + 500 / 2 ** k;
              const s = Math.min(1, springIn(frame, halfAt(k), fps, 11));
              return (
                <g key={k}>
                  <circle cx={x} cy={630} r={9 * s} fill={colors.primary} />
                  {k < 4 ? (
                    <text
                      x={x}
                      y={600}
                      fill={colors.text}
                      fontSize={28}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                      opacity={s}
                    >
                      {k === 0 ? "1" : `1/${2 ** k}`}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
