import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Runner } from "../components/race";
import { useStrings } from "../i18n";

// The staircase down. She starts high on ω·2+3 and hops down: ω·2+2, ω·2+1,
// ω·2, then a long drop past infinitely many steps to ω+4 (any step below ω·2
// is some ω+n), down to ω, another long drop to 5, and 4, 3, 2, 1, 0: the
// ground. The camera follows her; a step counter ticks and stops.

const STOPS = [
  "ω·2+3",
  "ω·2+2",
  "ω·2+1",
  "ω·2",
  "ω+4",
  "ω+3",
  "ω+2",
  "ω+1",
  "ω",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
];
const BIG = new Set([4, 9]); // landing after a limit: a long drop
const POS = STOPS.reduce<{ x: number; y: number }[]>((acc, _, k) => {
  const prev = acc[k - 1] ?? { x: 360, y: 300 };
  acc.push(
    k === 0
      ? prev
      : {
          x: prev.x + (BIG.has(k) ? 320 : 170),
          y: prev.y + (BIG.has(k) ? 190 : 56),
        },
  );
  return acc;
}, []);
const LAST = STOPS.length - 1;

export const Descent: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("descent");
  const [c0, c1] = cues;
  // hop k goes from stop k to stop k+1
  const hopAt = (k: number) =>
    k < 8 ? c0 + 14 + k * 14 : c1 + 10 + (k - 8) * 12;
  const HOP = 11;
  let k = 0;
  while (k < LAST && frame >= hopAt(k) + HOP) k++;
  const t = k < LAST ? Math.max(0, Math.min(1, (frame - hopAt(k)) / HOP)) : 0;
  const a = POS[k];
  const b = POS[Math.min(LAST, k + 1)];
  const g = hop(t, a.x, a.y, b.x, b.y, BIG.has(k + 1) ? 120 : 50);
  const moving = t > 0 && t < 1;
  const steps = k + (t >= 1 ? 1 : 0);
  const landAt = hopAt(LAST - 1) + HOP;
  const landed = frame >= landAt;
  // the camera trails her, without the arc of the hop
  const camX = lerp(a.x, b.x, t) - 960 + 120;
  const camY = lerp(a.y, b.y, t) - 520;
  const follow = glide(frame, c0, fps, 30);

  return (
    <SceneShell id="descent">
      {Array.from({ length: LAST }).map((_, h) => (
        <Sfx
          key={h}
          name={BIG.has(h + 1) ? "whoosh" : PLUCKS[5 - (h % 6)]}
          at={hopAt(h) + (BIG.has(h + 1) ? 0 : HOP)}
          volume={0.14}
        />
      ))}
      <Sfx name="thud" at={landAt} volume={0.4} />
      <Sfx name="chime" at={landAt + 8} />

      <Camera
        zoom={lerp(1.1, 0.9, follow)}
        x={lerp(-200, camX, follow)}
        y={lerp(-120, camY, follow)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {STOPS.map((s, i) => {
            const p = POS[i];
            const ground = i === LAST;
            return (
              <g
                key={s}
                opacity={fadeIn(frame, c0 + Math.min(i, 9) * 3)}
                transform={`translate(${ground && landed ? shake(frame, landAt, 8) : 0} 0)`}
              >
                <rect
                  x={p.x - 80}
                  y={p.y}
                  width={ground ? 600 : 170}
                  height={1400}
                  fill={alpha(
                    ground ? colors.green : colors.violet,
                    ground ? 0.6 : 0.45 + 0.03 * (i % 4),
                  )}
                  stroke={ground ? colors.green : colors.primary}
                  strokeWidth={4}
                />
                <text
                  x={p.x + 5}
                  y={p.y + 64}
                  fill={ground ? colors.ink : colors.primary}
                  fontSize={s.length > 3 ? 36 : 48}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {s}
                </text>
                {/* infinitely many steps skipped on a long drop */}
                {BIG.has(i) ? (
                  <text
                    x={p.x - 170}
                    y={p.y - 80}
                    fill={alpha(colors.muted, 0.8)}
                    fontSize={44}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {i === 4 ? "… ω+5" : "… 6"}
                  </text>
                ) : null}
              </g>
            );
          })}
          <Runner
            x={g.x}
            y={g.y}
            color={colors.highlight}
            size={0.9}
            phase={moving ? frame / 2.2 : undefined}
          />
        </svg>
      </Camera>

      {/* the step counter */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 120,
          padding: "8px 28px",
          borderRadius: 16,
          backgroundColor: colors.ink,
          border: `5px solid ${landed ? colors.green : colors.primary}`,
          fontFamily: fonts.mono,
          fontSize: 54,
          color: landed ? colors.green : colors.primary,
          opacity: fadeIn(frame, c0 + 10),
        }}
      >
        {tx.steps(steps)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          color: colors.green,
          opacity: fadeIn(frame, landAt + 4),
          translate: riseIn(frame, landAt + 4, 16),
        }}
      >
        {tx.bottom}
      </div>
    </SceneShell>
  );
};
