import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock } from "../../s1e16/components/props";
import { Arrow } from "../components/vec";
import { useStrings } from "../i18n";

// The rules, as four pictures that each act out their law: two routes
// round a parallelogram land on the same corner (order doesn't matter);
// an arrow shrinks to a dot (a zero); an arrow and its opposite cancel; a
// parallelogram doubled is the doubled arrows added (stretching spreads).
// Then the scalars: ℝ, ℂ, and the two-hour clock where 1 + 1 = 0.

const TILE = { w: 380, h: 380, y: 200 };
const XS = [120, 540, 960, 1380];

export const Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rules");
  const [c0, c1] = cues;
  const tileAt = (k: number) => c0 + 10 + k * 50;
  const act = (k: number) => glide(frame, tileAt(k) + 14, fps, 22);
  const part1 = fadeOut(frame, c1, 10);
  const chipAt = (k: number) => c1 + 20 + k * 30;
  const tick = glide(frame, chipAt(2) + 40, fps, 14);

  const labels = [tx.order, tx.zero, tx.opposite, tx.spreads];

  return (
    <SceneShell id="rules">
      {labels.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={tileAt(k)} volume={0.14} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={`c${k}`} name="pop" at={chipAt(k)} volume={0.16} />
      ))}
      <Sfx name="tick" at={chipAt(2) + 40} volume={0.2} />
      <Sfx name="ding" at={chipAt(2) + 56} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {labels.map((l, k) => {
            const s = Math.min(1, springIn(frame, tileAt(k), fps, 10));
            const t = act(k);
            const cx = XS[k] + TILE.w / 2;
            const cy = TILE.y + TILE.h / 2 + 30;
            const o = { x: cx - 120, y: cy + 80 };
            return (
              <g key={k} opacity={s}>
                <rect
                  x={XS[k]}
                  y={TILE.y}
                  width={TILE.w}
                  height={TILE.h}
                  rx={26}
                  fill={alpha(colors.ink, 0.35)}
                  stroke={alpha(colors.primary, 0.6)}
                  strokeWidth={4}
                />
                {k === 0 ? (
                  <g>
                    {/* u then v, and v then u: same corner */}
                    <Arrow
                      from={o}
                      to={{
                        x: o.x + 160 * Math.min(1, t * 2),
                        y: o.y - 30 * Math.min(1, t * 2),
                      }}
                    />
                    <Arrow
                      from={{ x: o.x + 160, y: o.y - 30 }}
                      to={{
                        x: o.x + 160 + 70 * Math.max(0, t * 2 - 1),
                        y: o.y - 30 - 150 * Math.max(0, t * 2 - 1),
                      }}
                      color={colors.highlight}
                      opacity={t > 0.5 ? 1 : 0}
                    />
                    <Arrow
                      from={o}
                      to={{
                        x: o.x + 70 * Math.min(1, t * 2),
                        y: o.y - 150 * Math.min(1, t * 2),
                      }}
                      color={colors.highlight}
                    />
                    <Arrow
                      from={{ x: o.x + 70, y: o.y - 150 }}
                      to={{
                        x: o.x + 70 + 160 * Math.max(0, t * 2 - 1),
                        y: o.y - 150 - 30 * Math.max(0, t * 2 - 1),
                      }}
                      opacity={t > 0.5 ? 1 : 0}
                    />
                    <circle
                      cx={o.x + 230}
                      cy={o.y - 180}
                      r={16 * Math.max(0, t * 2 - 1)}
                      fill={colors.green}
                    />
                  </g>
                ) : k === 1 ? (
                  <g>
                    <Arrow
                      from={o}
                      to={{ x: o.x + 220 * (1 - t), y: o.y - 160 * (1 - t) }}
                    />
                    <circle
                      cx={o.x}
                      cy={o.y}
                      r={lerp(10, 22, t)}
                      fill={t > 0.9 ? colors.green : colors.paper}
                    />
                    <text
                      x={o.x + 40}
                      y={o.y + 16}
                      fill={colors.green}
                      fontSize={56}
                      fontFamily={fonts.math}
                      fontWeight={800}
                      opacity={fadeIn(frame, tileAt(1) + 34)}
                    >
                      0
                    </text>
                  </g>
                ) : k === 2 ? (
                  <g>
                    <Arrow
                      from={{ x: cx, y: cy }}
                      to={{ x: cx + 150, y: cy - 90 }}
                    />
                    <Arrow
                      from={{ x: cx + 150 * t, y: cy - 90 * t }}
                      to={{ x: cx + 150 * t - 150, y: cy - 90 * t + 90 }}
                      color={colors.orange}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={18 * (t > 0.95 ? 1 : 0)}
                      fill={colors.green}
                    />
                  </g>
                ) : (
                  <g>
                    {/* c(u + v) = cu + cv: the whole parallelogram grows */}
                    {(() => {
                      const c = lerp(0.6, 1.2, t);
                      const u = { x: 150 * c, y: -30 * c };
                      const v = { x: 60 * c, y: -130 * c };
                      return (
                        <g>
                          <Arrow from={o} to={{ x: o.x + u.x, y: o.y + u.y }} />
                          <Arrow
                            from={{ x: o.x + u.x, y: o.y + u.y }}
                            to={{ x: o.x + u.x + v.x, y: o.y + u.y + v.y }}
                          />
                          <Arrow
                            from={o}
                            to={{ x: o.x + u.x + v.x, y: o.y + u.y + v.y }}
                            color={colors.highlight}
                          />
                        </g>
                      );
                    })()}
                  </g>
                )}
                <text
                  x={cx}
                  y={TILE.y + 64}
                  fill={colors.text}
                  fontSize={36}
                  textAnchor="middle"
                  fontWeight={800}
                >
                  {l}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the scalars: any field */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {["ℝ", "ℂ"].map((f, k) => {
            const s = Math.min(1, springIn(frame, chipAt(k), fps, 10));
            return (
              <g
                key={f}
                opacity={s}
                transform={`translate(${460 + k * 420} 470) scale(${s})`}
              >
                <circle
                  r={140}
                  fill={colors.violet}
                  stroke={colors.primary}
                  strokeWidth={6}
                />
                <text
                  y={44}
                  fill={colors.text}
                  fontSize={130}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {f}
                </text>
              </g>
            );
          })}
          <g opacity={Math.min(1, springIn(frame, chipAt(2), fps, 10))}>
            <Clock x={1340} y={470} r={150} n={2} pos={1 + tick} zeroTop />
          </g>
          <text
            x={1340}
            y={720}
            fill={colors.green}
            fontSize={64}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, chipAt(2) + 56)}
          >
            {tx.onePlusOne}
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 130,
            width: "100%",
            textAlign: "center",
            fontSize: 60,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 10),
            translate: riseIn(frame, c1 + 10, 16),
          }}
        >
          {tx.fieldsLine}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
