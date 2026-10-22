import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { SignOff } from "../../shared/components/Brand";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Runner } from "../components/race";
import { useStrings } from "../i18n";

// The climb: she runs up the ordinals, 0, 1, 2, ω, ω+1, ω·2, ω², ω^ω, ε₀,
// with the camera tilting after her; the steps keep coming. Then the teaser
// for E14: Jena, 1902. A desk with a tall stack of manuscript; a letter
// slides in and lands on it, and the whole stack starts to totter.

const STEPS = ["0", "1", "2", "ω", "ω+1", "ω·2", "ω²", "ωω", "ε₀"];
const step = (k: number) => ({ x: 300 + k * 190, y: 820 - k * 110 });

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("endCard");
  const [c0, c1] = cues;
  const climb = Math.min(STEPS.length - 1, Math.max(0, (frame - c0 - 8) / 13));
  const kk = Math.min(STEPS.length - 2, Math.floor(climb));
  const a = step(kk);
  const b = step(kk + 1);
  const g = hop(climb - kk, a.x, a.y, b.x, b.y, 70);
  const part1 = fadeOut(frame, c1, 10);
  // the letter
  const fly = glide(frame, c1 + 20, fps, 22);
  const land = c1 + 42;
  const totter =
    frame >= land
      ? 4 * Math.sin((frame - land) / 4) * Math.min(1, (frame - land) / 30)
      : 0;

  return (
    <SceneShell id="endCard" showWatermark={false}>
      {STEPS.map((_, k) => (
        <Sfx key={k} name="pop" at={c0 + 8 + k * 13} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 20} volume={0.18} />
      <Sfx name="thud" at={land} volume={0.3} />
      <Sfx name="scratch" at={land + 10} volume={0.18} />
      <Sfx name="chime" at={c1 + 70} />
      <Sfx name="sparkle" at={c1 + 100} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <Camera
          zoom={lerp(1.15, 0.95, glide(frame, c0, fps, 80))}
          x={lerp(-100, 380, glide(frame, c0, fps, 110))}
          y={lerp(0, -260, glide(frame, c0, fps, 110))}
        >
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            {STEPS.map((s, k) => {
              const p = step(k);
              return (
                <g key={s} opacity={fadeIn(frame, c0 + k * 5)}>
                  <rect
                    x={p.x - 95}
                    y={p.y}
                    width={190}
                    height={1400}
                    fill={alpha(
                      k >= 3 ? colors.green : colors.violet,
                      0.35 + k * 0.05,
                    )}
                    stroke={k >= 3 ? colors.green : colors.primary}
                    strokeWidth={4}
                  />
                  <text
                    x={p.x}
                    y={p.y + 64}
                    fill={k >= 3 ? colors.green : colors.primary}
                    fontSize={60}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                  >
                    {s === "ωω" ? (
                      <>
                        ω
                        <tspan dy={-18} fontSize={30}>
                          ω
                        </tspan>
                      </>
                    ) : (
                      s
                    )}
                  </text>
                </g>
              );
            })}
            {/* more steps fading up out of frame */}
            {[1, 2, 3].map((j) => {
              const p = step(STEPS.length - 1 + j);
              return (
                <rect
                  key={j}
                  x={p.x - 95}
                  y={p.y}
                  width={190}
                  height={1400}
                  fill={alpha(colors.green, 0.3 / j)}
                />
              );
            })}
            <Runner
              x={g.x}
              y={g.y}
              color={colors.highlight}
              size={1.15}
              phase={climb < STEPS.length - 1 ? frame / 2.2 : undefined}
            />
          </svg>
        </Camera>
      </AbsoluteFill>

      {/* Jena, 1902 */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c1 + 4) }}>
        <svg width={1920} height={1080}>
          <rect
            x={0}
            y={0}
            width={1920}
            height={1080}
            fill={alpha(colors.ink, 0.35)}
          />
          {/* the window and the desk */}
          <rect
            x={1500}
            y={90}
            width={360}
            height={300}
            rx={10}
            fill={alpha(colors.bgGlow, 0.5)}
            stroke={colors.wood}
            strokeWidth={14}
          />
          <line
            x1={1680}
            y1={90}
            x2={1680}
            y2={390}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <g transform="translate(340 0)">
            <rect
              x={360}
              y={520}
              width={1200}
              height={44}
              rx={8}
              fill={colors.wood}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <rect x={420} y={564} width={30} height={260} fill={colors.wood} />
            <rect x={1470} y={564} width={30} height={260} fill={colors.wood} />
            {/* twenty years of manuscript */}
            <g transform={`rotate(${totter} 800 520)`}>
              {Array.from({ length: 14 }).map((_, k) => (
                <rect
                  key={k}
                  x={640 + ((k * 37) % 23) - 10}
                  y={498 - k * 22}
                  width={320}
                  height={22}
                  rx={3}
                  fill={k % 3 ? colors.paper : alpha(colors.paper, 0.85)}
                  stroke={colors.ink}
                  strokeWidth={2}
                />
              ))}
            </g>
            {/* the letter */}
            <g
              transform={`translate(${lerp(-300, 1180, fly)} ${lerp(200, 470, fly) + (frame >= land ? shake(frame, land, 3) : 0)}) rotate(${lerp(-30, -6, fly)})`}
            >
              <rect
                x={-110}
                y={-70}
                width={220}
                height={140}
                rx={8}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <path
                d="M -110 -70 L 0 10 L 110 -70"
                fill="none"
                stroke={colors.ink}
                strokeWidth={4}
              />
              <circle cx={0} cy={14} r={16} fill={colors.red} />
            </g>
          </g>
          <text
            x={160}
            y={200}
            fill={colors.primary}
            fontSize={64}
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 8)}
          >
            {tx.jena}
          </text>
        </svg>
        <AbsoluteFill
          style={{ top: 250, left: 160, alignItems: "flex-start", gap: 16 }}
        >
          <div
            style={{
              fontSize: 52,
              color: colors.muted,
              opacity: fadeIn(frame, c1 + 70),
              translate: riseIn(frame, c1 + 70),
            }}
          >
            {tx.nextEpisode}
            <span style={{ color: colors.text }}>{tx.nextTitle}</span>
          </div>
          <SignOff
            line={tx.seriesLine}
            style={{ opacity: fadeIn(frame, c1 + 100) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
