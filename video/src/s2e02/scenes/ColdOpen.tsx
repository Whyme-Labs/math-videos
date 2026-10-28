import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The story. London, May 1861, the Royal Institution: Maxwell beside three
// magic lanterns and a screen. The ribbon's photograph shows grey. Each
// lantern lights in turn, throwing the tartan in red, in green, in blue
// (each only the stripes' share of its colour); the three overlap, added
// like light, and the ribbon comes up in full colour. A "3?" hangs over
// it. Then three arrows grow from one corner: colour is a space with three
// directions.

// the tartan's stripes as RGB in 0..1
const STRIPES: [number, number, number][] = [
  [0.85, 0.12, 0.15],
  [0.1, 0.45, 0.2],
  [0.95, 0.8, 0.2],
  [0.1, 0.2, 0.6],
  [0.85, 0.12, 0.15],
  [0.1, 0.45, 0.2],
];
const SCREEN = { x: 760, y: 120, w: 900, h: 520 };
const LANTERNS = [
  { x: 820, c: [1, 0, 0] },
  { x: 1210, c: [0, 1, 0] },
  { x: 1600, c: [0, 0, 1] },
] as const;

const rgb = (r: number, g: number, b: number) =>
  `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;

// the tartan: vertical and horizontal bands, crossing
const Tartan: React.FC<{
  readonly ch: (c: [number, number, number]) => [number, number, number];
  readonly opacity: number;
  readonly reveal?: number;
}> = ({ ch, opacity, reveal = 1 }) => {
  const bw = SCREEN.w / STRIPES.length;
  const bh = SCREEN.h / STRIPES.length;
  return (
    <g opacity={opacity} style={{ mixBlendMode: "screen" }}>
      {STRIPES.map((s, i) => (
        <rect
          key={`v${i}`}
          x={SCREEN.x + i * bw}
          y={SCREEN.y}
          width={bw * 0.8}
          height={SCREEN.h}
          fill={rgb(...ch(s))}
          opacity={0.75 * Math.min(1, Math.max(0, reveal * STRIPES.length - i))}
        />
      ))}
      {STRIPES.map((s, i) => (
        <rect
          key={`h${i}`}
          x={SCREEN.x}
          y={SCREEN.y + i * bh}
          width={SCREEN.w}
          height={bh * 0.45}
          fill={rgb(...ch(s))}
          opacity={0.55 * Math.min(1, Math.max(0, reveal * STRIPES.length - i))}
        />
      ))}
    </g>
  );
};

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const lampAt = (k: number) => c1 + 20 + k * 40;
  const lamp = (k: number) => fadeIn(frame, lampAt(k), 10);
  const grey = 1 - fadeIn(frame, lampAt(0), 10);
  const q = Math.min(1, springIn(frame, c2 + 40, fps, 10));
  const axes = [0, 1, 2].map((k) => glide(frame, c3 + 14 + k * 14, fps, 16));
  const pull = glide(frame, c3 + 4, fps, 30);
  const AX = { x: 1210, y: 380 };
  const walk = glide(frame, c0 + 10, fps, 70);
  // the grey photograph builds up stripe by stripe
  const build = Math.min(1, Math.max(0, (frame - c0 - 20) / 120));

  return (
    <SceneShell id="coldOpen">
      <Sfx name="page" at={c0 + 10} volume={0.14} />
      {LANTERNS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={lampAt(k)} volume={0.18} />
      ))}
      <Sfx name="chime" at={c2 + 6} />
      <Sfx name="pop" at={c2 + 40} volume={0.18} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`a${k}`} name="whoosh" at={c3 + 14 + k * 14} volume={0.12} />
      ))}

      <Camera
        zoom={lerp(1, 1.06, ramp(frame, c0, c3 - c0)) * lerp(1, 1.12, pull)}
        x={lerp(0, 220, pull)}
        y={lerp(0, -80, pull)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the screen */}
          <rect
            x={SCREEN.x - 16}
            y={SCREEN.y - 16}
            width={SCREEN.w + 32}
            height={SCREEN.h + 32}
            rx={10}
            fill={colors.ink}
            stroke={colors.wood}
            strokeWidth={10}
          />
          {/* before the lanterns: the photograph in grey */}
          <Tartan
            ch={(s) => {
              const v = (s[0] + s[1] + s[2]) / 3;
              return [v, v, v];
            }}
            opacity={0.6 * grey}
            reveal={build}
          />
          {/* the three lanterns' pictures, added like light */}
          {LANTERNS.map((l, k) => (
            <Tartan
              key={k}
              ch={(s) => [s[0] * l.c[0], s[1] * l.c[1], s[2] * l.c[2]]}
              opacity={lamp(k) * (1 - 0.6 * pull)}
            />
          ))}
          {/* beams from each lantern to the screen */}
          {LANTERNS.map((l, k) => (
            <polygon
              key={`b${k}`}
              points={`${l.x - 30},790 ${l.x + 30},790 ${SCREEN.x + SCREEN.w},${SCREEN.y + SCREEN.h} ${SCREEN.x},${SCREEN.y + SCREEN.h}`}
              fill={rgb(l.c[0], l.c[1], l.c[2])}
              opacity={0.08 * lamp(k) * (1 - pull)}
            />
          ))}
          {LANTERNS.map((l, k) => (
            <g
              key={`l${k}`}
              opacity={fadeIn(frame, c0 + 20 + k * 6) * (1 - pull)}
            >
              <rect
                x={l.x - 60}
                y={770}
                width={120}
                height={60}
                rx={10}
                fill={colors.wood}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <circle
                cx={l.x}
                cy={770}
                r={22}
                fill={lamp(k) > 0 ? rgb(l.c[0], l.c[1], l.c[2]) : colors.ink}
                stroke={colors.ink}
                strokeWidth={4}
              />
            </g>
          ))}
          {/* Maxwell */}
          <Person
            x={lerp(-100, 380, walk)}
            y={860}
            color={colors.orange}
            size={2.2}
            beard
            facing={1}
            bob={walk > 0 && walk < 1 ? frame / 3 : 0}
          />
          <text
            x={380}
            y={330}
            fill={colors.orange}
            fontSize={42}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.maxwell}
          </text>
          {/* three? */}
          <g
            opacity={q * (1 - pull)}
            transform={`translate(${SCREEN.x + SCREEN.w / 2} ${SCREEN.y + SCREEN.h / 2}) scale(${q})`}
          >
            <circle r={110} fill={alpha(colors.bg, 0.75)} />
            <text
              y={50}
              fill={colors.highlight}
              fontSize={140}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={900}
            >
              {tx.three}
            </text>
          </g>
          {/* colour as a space with three directions */}
          {LANTERNS.map((l, k) => {
            const dir = [
              { x: 300, y: 120 },
              { x: -40, y: -280 },
              { x: -300, y: 120 },
            ][k];
            return (
              <Arrow
                key={`ax${k}`}
                from={AX}
                to={{ x: AX.x + dir.x * axes[k], y: AX.y + dir.y * axes[k] }}
                color={rgb(
                  0.3 + 0.7 * l.c[0],
                  0.3 + 0.7 * l.c[1],
                  0.3 + 0.7 * l.c[2],
                )}
                width={14}
              />
            );
          })}
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 12),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.london}
      </div>
    </SceneShell>
  );
};
