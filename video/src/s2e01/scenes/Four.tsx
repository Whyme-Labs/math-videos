import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow, curve } from "../components/vec";
import { useStrings } from "../i18n";

// Four unrelated things, in four panels: an arrow, the graph of a
// polynomial, a sound wave, and a wave that solves y″ + y = 0. Then each
// one adds: a second arrow tip to tail and the sum; a second polynomial
// and the graph bends into the sum; a second tone and the waveform beats;
// sin x joins cos x and the wave shifts. Then each one stretches.

const W = 760;
const H = 320;
const PANELS = [
  { x: 140, y: 110 },
  { x: 1020, y: 110 },
  { x: 140, y: 470 },
  { x: 1020, y: 470 },
];

const Panel: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s: number;
  readonly label: string;
  readonly children: React.ReactNode;
}> = ({ x, y, s, label, children }) => (
  <g
    opacity={s}
    transform={`translate(${x + W / 2} ${y + H / 2}) scale(${lerp(0.85, 1, s)}) translate(${-W / 2} ${-H / 2})`}
  >
    <rect
      x={0}
      y={0}
      width={W}
      height={H}
      rx={24}
      fill={alpha(colors.ink, 0.35)}
      stroke={alpha(colors.primary, 0.6)}
      strokeWidth={4}
    />
    {children}
    <text
      x={28}
      y={52}
      fill={colors.muted}
      fontSize={38}
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
  </g>
);

export const Four: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("four");
  const [c0, c1] = cues;
  const panelAt = (k: number) => c0 + 8 + k * 22;
  const addAt = (k: number) => c1 + 14 + k * 24;
  const add = [0, 1, 2, 3].map((k) => glide(frame, addAt(k), fps, 20));
  const stretch = lerp(1, 1.5, glide(frame, c1 + 130, fps, 20));
  // local plot frame inside a panel
  const plot =
    (xr: number, yr: number, sx = 1) =>
    (x: number, y: number) => ({
      x: W / 2 + (x / xr) * (W / 2 - 60) * sx,
      y: H / 2 + 20 - (y / yr) * (H / 2 - 50),
    });

  const p = (x: number) => 0.6 * x * x - 0.4 * x - 1.2;
  const q = (x: number) => -0.5 * x * x + 0.9 * x + 0.6;
  const toneA = (x: number) => Math.sin(6 * x);
  const toneB = (x: number) => 0.7 * Math.sin(9.5 * x);

  return (
    <SceneShell id="four">
      {PANELS.map((_, k) => (
        <Sfx key={k} name="pop" at={panelAt(k)} volume={0.14} />
      ))}
      {PANELS.map((_, k) => (
        <Sfx key={`a${k}`} name={PLUCKS[k]} at={addAt(k)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 130} volume={0.14} />
      <Sfx name="chime" at={c1 + 150} />

      <Camera zoom={lerp(1, 1.04, ramp(frame, c0, 400))}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {/* arrows */}
          <Panel
            {...PANELS[0]}
            s={Math.min(1, springIn(frame, panelAt(0), fps, 10))}
            label={tx.arrow}
          >
            {(() => {
              const k = Math.min(stretch, 1.25);
              const o = { x: 220, y: 280 };
              const u = { x: 180 * k, y: -40 * k };
              const v = { x: 80 * k, y: -100 * k };
              return (
                <g>
                  <Arrow from={o} to={{ x: o.x + u.x, y: o.y + u.y }} />
                  <Arrow
                    from={{ x: o.x + u.x, y: o.y + u.y }}
                    to={{
                      x: o.x + u.x + v.x * add[0],
                      y: o.y + u.y + v.y * add[0],
                    }}
                    opacity={add[0] > 0 ? 1 : 0}
                  />
                  <Arrow
                    from={o}
                    to={{ x: o.x + (u.x + v.x), y: o.y + (u.y + v.y) }}
                    color={colors.highlight}
                    opacity={fadeIn(frame, addAt(0) + 16)}
                  />
                </g>
              );
            })()}
          </Panel>
          {/* polynomials */}
          <Panel
            {...PANELS[1]}
            s={Math.min(1, springIn(frame, panelAt(1), fps, 10))}
            label={tx.polynomial}
          >
            <path
              d={curve(
                (x) => stretch * (p(x) + add[1] * q(x)),
                -2,
                2,
                plot(2, 3),
              )}
              fill="none"
              stroke={add[1] > 0.5 ? colors.highlight : colors.primary}
              strokeWidth={8}
            />
            <path
              d={curve(q, -2, 2, plot(2, 3))}
              fill="none"
              stroke={alpha(colors.orange, 0.7)}
              strokeWidth={5}
              strokeDasharray="12 10"
              opacity={
                add[1] > 0 && add[1] < 1
                  ? 1
                  : fadeIn(frame, addAt(1) - 8) * (1 - add[1])
              }
            />
          </Panel>
          {/* sounds */}
          <Panel
            {...PANELS[2]}
            s={Math.min(1, springIn(frame, panelAt(2), fps, 10))}
            label={tx.sound}
          >
            <path
              d={curve(
                (x) =>
                  stretch *
                  0.7 *
                  (toneA(x + frame / 40) + add[2] * toneB(x + frame / 40)),
                -2.5,
                2.5,
                plot(2.5, 2.4),
                240,
              )}
              fill="none"
              stroke={add[2] > 0.5 ? colors.highlight : colors.primary}
              strokeWidth={6}
            />
          </Panel>
          {/* solutions of y″ + y = 0 */}
          <Panel
            {...PANELS[3]}
            s={Math.min(1, springIn(frame, panelAt(3), fps, 10))}
            label={tx.waves}
          >
            <path
              d={curve(Math.sin, -6.3, 6.3, plot(6.3, 2.2))}
              fill="none"
              stroke={alpha(colors.orange, 0.7)}
              strokeWidth={5}
              strokeDasharray="12 10"
              opacity={fadeIn(frame, addAt(3) - 10) * (1 - add[3])}
            />
            <path
              d={curve(
                (x) => stretch * (Math.cos(x) + add[3] * Math.sin(x)),
                -6.3,
                6.3,
                plot(6.3, 2.2),
              )}
              fill="none"
              stroke={add[3] > 0.5 ? colors.highlight : colors.primary}
              strokeWidth={8}
            />
          </Panel>
          {/* the two moves */}
          {[
            { t: "+", at: c1 + 4 },
            { t: "×", at: c1 + 130 },
          ].map((m, k) => {
            const s = Math.min(1, springIn(frame, m.at, fps, 10));
            return (
              <g
                key={m.t}
                opacity={s}
                transform={`translate(${900 + k * 120} 440) scale(${s})`}
              >
                <circle
                  r={50}
                  fill={colors.primary}
                  stroke={colors.ink}
                  strokeWidth={5}
                />
                <text
                  y={24}
                  fill={colors.ink}
                  fontSize={72}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={900}
                >
                  {m.t}
                </text>
              </g>
            );
          })}
        </svg>
      </Camera>
    </SceneShell>
  );
};
