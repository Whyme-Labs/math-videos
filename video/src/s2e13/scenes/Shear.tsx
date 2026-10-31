import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The shear S = [[1, 1], [0, 1]]. A fan of arrows; the plane shears. The
// horizontal arrows stay on their line and glow; every other arrow tilts.
// Then a search beam sweeps round the origin looking for a second line;
// each candidate it stops on gets a red cross. Badge: "λ = 1, twice · only
// one line".

const O = { x: 760, y: 520 };
const S = 120;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });

export const Shear: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("shear");
  const [c0, c1] = cues;
  const sh = glide(frame, c0 + 20, fps, 40);
  const sweep = ramp(frame, c1 + 10, 80);
  const beamA = lerp(0.3, Math.PI - 0.3, sweep);
  const fan = Array.from({ length: 10 }, (_, k) => (k / 10) * Math.PI * 2);
  const stops = [0.6, 1.2, 1.9, 2.5];

  return (
    <SceneShell id="shear">
      <Sfx name="whoosh" at={c0 + 20} volume={0.12} />
      <Sfx name="ding" at={c0 + 60} />
      <Sfx name="riser" at={c1 + 10} volume={0.08} />
      {stops.map((a, k) => (
        <Sfx
          key={k}
          name="scratch"
          at={c1 + 10 + Math.round(((a - 0.3) / (Math.PI - 0.6)) * 80)}
          volume={0.14}
        />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="shearStage">
            <rect x={120} y={90} width={1680} height={740} rx={30} />
          </clipPath>
        </defs>
        <g clipPath="url(#shearStage)">
          {Array.from({ length: 13 }).map((_, i) => {
            const k = i - 6;
            return (
              <g key={i} stroke={alpha(colors.paper, 0.12)} strokeWidth={2}>
                <line
                  x1={scr(k - 4 * sh, -4).x}
                  y1={scr(0, -4).y}
                  x2={scr(k + 4 * sh, 4).x}
                  y2={scr(0, 4).y}
                />
                <line
                  x1={scr(-8, k).x}
                  y1={scr(0, k).y}
                  x2={scr(8, k).x}
                  y2={scr(0, k).y}
                />
              </g>
            );
          })}
          <line
            x1={scr(-6, 0).x}
            y1={O.y}
            x2={scr(6, 0).x}
            y2={O.y}
            stroke={alpha(
              colors.primary,
              0.3 + 0.5 * fadeIn(frame, c0 + 60, 10),
            )}
            strokeWidth={8}
          />
          {fan.map((a, k) => {
            const p = { x: 1.6 * Math.cos(a), y: 1.6 * Math.sin(a) };
            const q = { x: p.x + sh * p.y, y: p.y };
            const horiz = Math.abs(p.y) < 1e-6;
            return (
              <Arrow
                key={k}
                from={O}
                to={scr(q.x, q.y)}
                width={horiz ? 14 : 8}
                color={horiz ? colors.primary : alpha(colors.paper, 0.6)}
              />
            );
          })}
          {/* the search beam */}
          <g opacity={sweep > 0 && sweep < 1 ? 1 : 0}>
            <line
              x1={O.x - 500 * Math.cos(beamA)}
              y1={O.y + 500 * Math.sin(beamA)}
              x2={O.x + 500 * Math.cos(beamA)}
              y2={O.y - 500 * Math.sin(beamA)}
              stroke={colors.highlight}
              strokeWidth={5}
              strokeDasharray="14 10"
            />
          </g>
        </g>
        {stops.map((a, k) => (
          <text
            key={k}
            x={O.x + 340 * Math.cos(a)}
            y={O.y - 340 * Math.sin(a)}
            fill={colors.red}
            fontSize={56}
            textAnchor="middle"
            fontWeight={900}
            opacity={fadeIn(
              frame,
              c1 + 10 + Math.round(((a - 0.3) / (Math.PI - 0.6)) * 80),
              4,
            )}
          >
            ✗
          </text>
        ))}
        <text
          x={scr(1.9, 0).x}
          y={O.y + 60}
          fill={colors.primary}
          fontSize={48}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 60)}
        >
          λ = 1
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1260,
          padding: "12px 26px",
          borderRadius: 16,
          border: `5px solid ${colors.red}`,
          background: alpha(colors.bg, 0.85),
          fontSize: 40,
          fontWeight: 800,
          color: colors.red,
          opacity: fadeIn(frame, c1 + 90),
          translate: riseIn(frame, c1 + 90, 12),
        }}
      >
        {tx.oneLine}
      </div>
    </SceneShell>
  );
};
