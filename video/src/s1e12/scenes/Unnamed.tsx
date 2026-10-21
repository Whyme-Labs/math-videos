import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Names are finite strings, so they line up in a queue: tickets 0, 1, 2, …
// Then each named number lights on the line inside a little interval, the
// intervals halving (1/2, 1/4, 1/8 … of a tiny ε), so together they cover
// almost nothing. The rest of the line dims, a dart flies in, and the
// camera dives to where it landed: no name there.

const NAMES = ["π", "√2", "e", "1/3", "φ", "ln 2", "0.1101…", "√3", "π/4", "γ"];
const VALUES = [
  3.14159, 1.41421, 2.71828, 0.33333, 1.61803, 0.69315, 0.8125, 1.73205, 0.7854,
  0.57722,
];
const LINE = { x0: 160, x1: 1760, y: 620, lo: 0, hi: 3.3 };
const lx = (v: number) =>
  LINE.x0 + ((v - LINE.lo) / (LINE.hi - LINE.lo)) * (LINE.x1 - LINE.x0);
const DART = 2.31;

export const Unnamed: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("unnamed");
  const [c0, c1, c2] = cues;
  const joinAt = (k: number) => c0 + 6 + k * 7;
  const queue = 1 - glide(frame, c1, fps, 20);
  const lightAt = (k: number) => c1 + 8 + k * 7;
  const shrink = ramp(frame, c1 + 80, 40);
  const dim = ramp(frame, c2, 20);
  const dart = ramp(frame, c2 + 16, 16);
  const dive = glide(frame, c2 + 36, fps, 40);
  const zoom = lerp(1, 6, dive);
  const camX = lerp(0, lx(DART) - 960, dive);
  const camY = lerp(0, LINE.y - 540, dive);
  const dartP = hop(dart, 2100, 160, lx(DART), LINE.y - 6, -120);

  return (
    <SceneShell id="unnamed">
      {NAMES.map((_, k) => (
        <Sfx key={`j${k}`} name="tick" at={joinAt(k) + 10} volume={0.12} />
      ))}
      {NAMES.map((_, k) => (
        <Sfx key={`l${k}`} name={PLUCKS[k % 6]} at={lightAt(k)} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 16} volume={0.2} />
      <Sfx name="thud" at={c2 + 32} volume={0.4} />
      <Sfx name="whoosh" at={c2 + 36} volume={0.14} />
      <QuestionTray />

      {/* the queue of names */}
      <AbsoluteFill style={{ opacity: queue }}>
        <svg width={1920} height={1080}>
          {NAMES.map((n, k) => {
            const t = Math.min(1, springIn(frame, joinAt(k), fps, 13));
            const x = 220 + (k % 5) * 320;
            const y = 300 + Math.floor(k / 5) * 220;
            return (
              <g
                key={n}
                transform={`translate(${lerp(2100, x, t)} ${y}) rotate(${(1 - t) * 20})`}
              >
                <rect
                  x={-130}
                  y={-60}
                  width={260}
                  height={120}
                  rx={16}
                  fill={colors.paper}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <circle cx={-96} cy={0} r={12} fill={alpha(colors.bg, 0.9)} />
                <text
                  x={20}
                  y={16}
                  fill={colors.ink}
                  fontSize={46}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                >
                  {n}
                </text>
                <text
                  x={-96}
                  y={-74}
                  fill={colors.muted}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                >
                  #{k}
                </text>
              </g>
            );
          })}
          <text
            x={960}
            y={800}
            fill={colors.muted}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.mono}
            opacity={fadeIn(frame, joinAt(NAMES.length))}
          >
            #{NAMES.length}, #{NAMES.length + 1}, …
          </text>
        </svg>
      </AbsoluteFill>

      {/* the number line */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 2) }}>
        <Camera zoom={zoom} x={camX} y={camY}>
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            <line
              x1={LINE.x0 - 100}
              y1={LINE.y}
              x2={LINE.x1 + 100}
              y2={LINE.y}
              stroke={alpha(colors.text, 1 - 0.6 * dim)}
              strokeWidth={6}
            />
            {[0, 1, 2, 3].map((v) => (
              <text
                key={v}
                x={lx(v)}
                y={LINE.y + 70}
                fill={colors.muted}
                fontSize={36}
                textAnchor="middle"
                fontFamily={fonts.math}
                opacity={1 - dive}
              >
                {v}
              </text>
            ))}
            {NAMES.map((n, k) => {
              const on = Math.min(1, springIn(frame, lightAt(k), fps, 11));
              const w = lerp(160, 34, shrink) / 2 ** (k / 2);
              const x = lx(VALUES[k]);
              return (
                <g key={n} opacity={on}>
                  <rect
                    x={x - w / 2}
                    y={LINE.y - 26}
                    width={w}
                    height={52}
                    rx={8}
                    fill={alpha(colors.primary, 0.35)}
                    stroke={colors.primary}
                    strokeWidth={3}
                  />
                  <circle cx={x} cy={LINE.y} r={8} fill={colors.primary} />
                  <text
                    x={x}
                    y={LINE.y - 50 - (k % 3) * 40}
                    fill={colors.primary}
                    fontSize={34}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    opacity={1 - dive}
                  >
                    {n}
                  </text>
                </g>
              );
            })}
            {/* the dart */}
            {dart > 0 ? (
              <g
                transform={`translate(${dartP.x} ${dartP.y}) rotate(${lerp(30, 70, dart)})`}
              >
                <line
                  x1={0}
                  y1={0}
                  x2={-120}
                  y2={0}
                  stroke={colors.highlight}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
                <polygon points="0,0 -26,-12 -26,12" fill={colors.highlight} />
                <polygon
                  points="-120,0 -150,-22 -138,0 -150,22"
                  fill={colors.red}
                />
              </g>
            ) : null}
            <text
              x={lx(DART)}
              y={LINE.y + 26}
              fill={colors.highlight}
              fontSize={7}
              textAnchor="middle"
              fontFamily={fonts.mono}
              opacity={fadeIn(frame, c2 + 70)}
            >
              2.3104758291…?
            </text>
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 180,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 80,
            fontSize: 40,
            opacity: fadeIn(frame, c1 + 80) * fadeOut(frame, c2 + 36, 10),
          }}
        >
          <span style={{ color: colors.primary }}>▮ {tx.named}</span>
          <span style={{ color: colors.muted, opacity: 0.4 + 0.6 * dim }}>
            — {tx.unnamed}
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
