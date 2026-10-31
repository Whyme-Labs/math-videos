import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow, curve } from "../components/vec";
import { useStrings } from "../i18n";

// The stamp. Three panels take it: the cube of bit strings 𝔽₂³ (eight
// corners, 000 to 111), a tangle of function graphs, and a sequence of dots
// running off the edge. Then three bounce it: on the positive ray, 2 times
// −1 drops off the end; on a circle, two points add to one outside it; and
// a line that misses the origin, with the origin left empty.

const PANEL = { w: 520, h: 520, y: 180 };
const XS = [120, 700, 1280];

const Stamp: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly t: number;
  readonly text: string;
  readonly bounce?: number;
}> = ({ x, y, t, text, bounce = 0 }) => {
  const by = bounce > 0 ? hop(bounce, x, y, x + 120, y - 260, 200) : { x, y };
  return (
    <g
      opacity={t > 0 ? 1 - bounce : 0}
      transform={`translate(${by.x} ${lerp(by.y - 200, by.y, t)}) rotate(${-8 + bounce * 40}) scale(${lerp(1.5, 1, t)})`}
    >
      <rect
        x={-200}
        y={-46}
        width={400}
        height={86}
        rx={16}
        fill={alpha(colors.bg, 0.7)}
        stroke={bounce > 0 ? colors.red : colors.primary}
        strokeWidth={7}
      />
      <text
        y={14}
        fill={bounce > 0 ? colors.red : colors.primary}
        fontSize={44}
        textAnchor="middle"
        fontFamily={fonts.title}
        fontWeight={900}
      >
        {text}
      </text>
    </g>
  );
};

export const Zoo: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zoo");
  const [c0, c1] = cues;
  const panelAt = (k: number) => c0 + 10 + k * 60;
  const stampAt = (k: number) => panelAt(k) + 30;
  const part1 = fadeOut(frame, c1, 10);
  const badAt = (k: number) => c1 + 14 + k * 64;
  const act = (k: number) => glide(frame, badAt(k) + 10, fps, 20);
  const bounceAt = (k: number) => badAt(k) + 40;

  const names1 = [tx.bits, tx.functions, tx.sequences];
  const names2 = [tx.positives, tx.sphere, tx.offLine];

  const frameRect = (k: number, s: number, label: string) => (
    <g opacity={s}>
      <rect
        x={XS[k]}
        y={PANEL.y}
        width={PANEL.w}
        height={PANEL.h}
        rx={24}
        fill={alpha(colors.ink, 0.35)}
        stroke={alpha(colors.primary, 0.6)}
        strokeWidth={4}
      />
      <text
        x={XS[k] + PANEL.w / 2}
        y={PANEL.y - 24}
        fill={colors.text}
        fontSize={42}
        textAnchor="middle"
        fontWeight={800}
      >
        {label}
      </text>
    </g>
  );

  return (
    <SceneShell id="zoo">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="thud" at={stampAt(k) + 8} volume={0.3} />
      ))}
      {[0, 1, 2].map((k) => (
        <Sfx key={`b${k}`} name="scratch" at={bounceAt(k)} volume={0.24} />
      ))}

      {/* the stamp takes */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((k) => {
            const s = Math.min(1, springIn(frame, panelAt(k), fps, 10));
            const cx = XS[k] + PANEL.w / 2;
            const cy = PANEL.y + PANEL.h / 2;
            return (
              <g key={k}>
                {frameRect(k, s, names1[k])}
                <g opacity={s}>
                  {k === 0
                    ? // the cube of bit strings
                      (() => {
                        const pts = Array.from({ length: 8 }, (_, i) => {
                          const b = [(i >> 2) & 1, (i >> 1) & 1, i & 1];
                          return {
                            b: b.join(""),
                            x: cx - 120 + b[0] * 200 + b[2] * 70,
                            y: cy + 110 - b[1] * 200 - b[2] * 70,
                          };
                        });
                        return (
                          <g>
                            {pts.map((p, i) =>
                              pts.map((q, j) =>
                                j > i &&
                                [...p.b].filter((ch, n) => ch !== q.b[n])
                                  .length === 1 ? (
                                  <line
                                    key={`${i}${j}`}
                                    x1={p.x}
                                    y1={p.y}
                                    x2={q.x}
                                    y2={q.y}
                                    stroke={alpha(colors.paper, 0.4)}
                                    strokeWidth={3}
                                  />
                                ) : null,
                              ),
                            )}
                            {pts.map((p) => (
                              <g key={p.b}>
                                <circle
                                  cx={p.x}
                                  cy={p.y}
                                  r={12}
                                  fill={colors.primary}
                                />
                                <text
                                  x={p.x}
                                  y={p.y - 20}
                                  fill={colors.text}
                                  fontSize={26}
                                  textAnchor="middle"
                                  fontFamily={fonts.mono}
                                  fontWeight={700}
                                >
                                  {p.b}
                                </text>
                              </g>
                            ))}
                          </g>
                        );
                      })()
                    : k === 1
                      ? [0, 1, 2, 3].map((j) => (
                          <path
                            key={j}
                            d={curve(
                              (x) =>
                                Math.sin(x * (1 + j * 0.7) + j + frame / 30) *
                                (0.5 + j * 0.15),
                              -3,
                              3,
                              (x, y) => ({ x: cx + x * 75, y: cy - y * 160 }),
                            )}
                            fill="none"
                            stroke={
                              [
                                colors.primary,
                                colors.highlight,
                                colors.green,
                                colors.orange,
                              ][j]
                            }
                            strokeWidth={5}
                          />
                        ))
                      : Array.from({ length: 10 }).map((_, j) => (
                          <circle
                            key={j}
                            cx={
                              XS[k] +
                              40 +
                              ((((j * 44 - frame * 1.5) % 440) + 440) % 440)
                            }
                            cy={cy - 120 * Math.sin(j * 0.9 + frame / 40) * 0.8}
                            r={11}
                            fill={colors.primary}
                            opacity={Math.min(
                              1,
                              (440 -
                                ((((j * 44 - frame * 1.5) % 440) + 440) %
                                  440)) /
                                120,
                            )}
                          />
                        ))}
                </g>
                <Stamp
                  x={cx}
                  y={PANEL.y + PANEL.h - 70}
                  t={glide(frame, stampAt(k), fps, 8)}
                  text={tx.vectorSpace}
                />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* the stamp bounces */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {[0, 1, 2].map((k) => {
            const s = Math.min(1, springIn(frame, badAt(k), fps, 10));
            const cx = XS[k] + PANEL.w / 2;
            const cy = PANEL.y + PANEL.h / 2;
            const t = act(k);
            const hit = frame >= bounceAt(k);
            return (
              <g key={k}>
                {frameRect(k, s, names2[k])}
                <g
                  opacity={s}
                  transform={`translate(${hit ? shake(frame, bounceAt(k), 8) : 0} 0)`}
                >
                  {k === 0 ? (
                    <g>
                      {/* the positive ray, and 2 × (−1) falling off */}
                      <line
                        x1={cx - 200}
                        y1={cy}
                        x2={cx + 220}
                        y2={cy}
                        stroke={alpha(colors.muted, 0.4)}
                        strokeWidth={4}
                        strokeDasharray="10 10"
                      />
                      <line
                        x1={cx - 60}
                        y1={cy}
                        x2={cx + 220}
                        y2={cy}
                        stroke={colors.primary}
                        strokeWidth={8}
                      />
                      <circle
                        cx={cx - 60}
                        cy={cy}
                        r={12}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth={5}
                      />
                      <circle
                        cx={lerp(cx + 100, cx - 170, t)}
                        cy={cy + (t > 0.5 ? (t - 0.5) * 300 : 0)}
                        r={20}
                        fill={t > 0.5 ? colors.red : colors.highlight}
                      />
                      <text
                        x={cx + 100}
                        y={cy - 40}
                        fill={colors.highlight}
                        fontSize={40}
                        textAnchor="middle"
                        fontFamily={fonts.math}
                        fontWeight={800}
                        opacity={1 - t}
                      >
                        2
                      </text>
                      <text
                        x={cx - 150}
                        y={cy - 40}
                        fill={colors.red}
                        fontSize={40}
                        textAnchor="middle"
                        fontFamily={fonts.math}
                        fontWeight={800}
                        opacity={t}
                      >
                        −2
                      </text>
                    </g>
                  ) : k === 1 ? (
                    <g>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={150}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth={6}
                      />
                      <Arrow
                        from={{ x: cx, y: cy }}
                        to={{ x: cx + 150, y: cy }}
                        width={8}
                        opacity={0.6}
                      />
                      <Arrow
                        from={{ x: cx, y: cy }}
                        to={{ x: cx, y: cy - 150 }}
                        width={8}
                        opacity={0.6}
                      />
                      <Arrow
                        from={{ x: cx, y: cy }}
                        to={{ x: cx + 150 * t, y: cy - 150 * t }}
                        color={colors.red}
                        width={8}
                      />
                      <circle
                        cx={cx + 150}
                        cy={cy - 150}
                        r={16 * t}
                        fill={colors.red}
                      />
                    </g>
                  ) : (
                    <g>
                      <line
                        x1={cx - 200}
                        y1={cy + 100}
                        x2={cx + 200}
                        y2={cy + 100}
                        stroke={alpha(colors.muted, 0.5)}
                        strokeWidth={3}
                      />
                      <line
                        x1={cx}
                        y1={cy - 200}
                        x2={cx}
                        y2={cy + 200}
                        stroke={alpha(colors.muted, 0.5)}
                        strokeWidth={3}
                      />
                      <line
                        x1={cx - 160}
                        y1={cy + 200}
                        x2={cx + 100}
                        y2={cy - 200}
                        stroke={colors.primary}
                        strokeWidth={7}
                      />
                      <circle
                        cx={cx}
                        cy={cy + 100}
                        r={lerp(10, 26, t)}
                        fill="none"
                        stroke={colors.red}
                        strokeWidth={6}
                      />
                      <text
                        x={cx + 30}
                        y={cy + 150}
                        fill={colors.red}
                        fontSize={44}
                        fontFamily={fonts.math}
                        fontWeight={800}
                        opacity={t}
                      >
                        0 ?
                      </text>
                    </g>
                  )}
                </g>
                <Stamp
                  x={cx}
                  y={PANEL.y + PANEL.h - 70}
                  t={glide(frame, bounceAt(k) - 10, fps, 8)}
                  text={tx.vectorSpace}
                  bounce={glide(frame, bounceAt(k), fps, 18)}
                />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
