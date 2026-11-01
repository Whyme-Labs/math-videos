import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Chinese edition only. 裴秀 (224–271, 西晋) and his six principles of
// map-making from the preface to 《禹贡地域图》: 分率、准望、道里、高下、
// 方邪、迂直, as six tiles. A square map with a right angle drawn on it at
// 45°; then 分率 goes wrong (the map squashes north–south) and the angle
// on the map reads 118°. Last, three contour lines and a path across
// them: however the map stretches the path still crosses 3, while the
// "steepest" arrow drawn at right angles on the map keeps swinging.

const M = { x: 640, y: 480 };
const U = 170;

export const Peixiu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("peixiu");
  const [c0, c1, c2] = cues;
  const squash = glide(frame, c1 + 40, fps, 30);
  const wobble =
    frame > c2
      ? 0.25 *
        Math.sin((frame - c2 - 10) * 0.08) *
        Math.min(1, (frame - c2) / 20)
      : 0;
  const s = lerp(1, 0.6, squash) + wobble;
  const P = (x: number, y: number) => ({ x: M.x + x * U, y: M.y - y * U * s });
  const ang = (Math.acos((s * s - 1) / (s * s + 1)) * 180) / Math.PI;
  const right = Math.abs(ang - 90) < 1;
  const partL = 1 - fadeIn(frame, c2, 10);
  const partC = fadeIn(frame, c2 + 4, 10);
  const n = Math.hypot(1, 1 / s);
  const steep = { x: M.x + (230 * 1) / n, y: M.y - (230 * (1 / s)) / n };

  return (
    <SceneShell id="peixiu">
      {Array.from({ length: 6 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 20 + k * 8} volume={0.1} />
      ))}
      <Sfx name="whoosh" at={c1 + 40} volume={0.12} />
      <Sfx name="thud" at={c1 + 70} volume={0.24} />
      <Sfx name="pop" at={c2 + 20} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect
          x={P(-1.6, 1.6).x}
          y={P(-1.6, 1.6).y}
          width={3.2 * U}
          height={3.2 * U * s}
          rx={14}
          fill={alpha(colors.paper, 0.9)}
          stroke={colors.wood}
          strokeWidth={8}
        />
        {Array.from({ length: 7 }).map((_, k) => (
          <g key={k} stroke={alpha(colors.ink, 0.15)} strokeWidth={2}>
            <line
              x1={P(-1.2 + k * 0.4, -1.6).x}
              y1={P(0, -1.6).y}
              x2={P(-1.2 + k * 0.4, 1.6).x}
              y2={P(0, 1.6).y}
            />
            <line
              x1={P(-1.6, 0).x}
              y1={P(0, -1.2 + k * 0.4).y}
              x2={P(1.6, 0).x}
              y2={P(0, -1.2 + k * 0.4).y}
            />
          </g>
        ))}
        <g opacity={partL * fadeIn(frame, c0 + 30)}>
          <line
            x1={M.x}
            y1={M.y}
            x2={P(0.9, 0.9).x}
            y2={P(0.9, 0.9).y}
            stroke={colors.orange}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <line
            x1={M.x}
            y1={M.y}
            x2={P(-0.9, 0.9).x}
            y2={P(-0.9, 0.9).y}
            stroke={colors.orange}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <text
            x={M.x}
            y={M.y + 80}
            fill={right ? colors.green : colors.red}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            {Math.round(ang)}°
          </text>
        </g>
        <g opacity={partC}>
          {[-1, 0, 1].map((k) => (
            <line
              key={k}
              x1={P(k / 2 + 0.9, k / 2 - 0.9).x}
              y1={P(k / 2 + 0.9, k / 2 - 0.9).y}
              x2={P(k / 2 - 0.9, k / 2 + 0.9).x}
              y2={P(k / 2 - 0.9, k / 2 + 0.9).y}
              stroke={colors.orange}
              strokeWidth={7}
              strokeLinecap="round"
            />
          ))}
          <path
            d={`M ${P(-1, -0.4).x} ${P(-1, -0.4).y} Q ${P(0.2, -0.8).x} ${P(0.2, -0.8).y} ${P(0.4, 1).x} ${P(0.4, 1).y}`}
            fill="none"
            stroke={colors.green}
            strokeWidth={7}
            strokeDasharray="14 10"
          />
          <Arrow from={M} to={steep} width={14} color={colors.highlight} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.peixiu}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1240,
          display: "grid",
          gridTemplateColumns: "repeat(3, 160px)",
          gap: 20,
        }}
      >
        {tx.six.map((w, k) => {
          const hot = k < 2 && frame >= c1 + 10;
          return (
            <div
              key={k}
              style={{
                height: 100,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                fontWeight: 800,
                color: hot ? colors.bg : colors.text,
                background: hot ? colors.highlight : alpha(colors.bg, 0.8),
                border: `4px solid ${hot ? colors.highlight : alpha(colors.paper, 0.4)}`,
                opacity: fadeIn(frame, c0 + 20 + k * 8),
                translate: riseIn(frame, c0 + 20 + k * 8, 12),
              }}
            >
              {w}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 540,
          left: 1240,
          fontSize: 52,
          fontWeight: 800,
          color: colors.green,
          opacity: partC * fadeIn(frame, c2 + 20),
        }}
      >
        {tx.crossed}
      </div>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 1240,
          fontSize: 48,
          fontWeight: 800,
          color: colors.highlight,
          opacity: partC * fadeIn(frame, c2 + 30),
        }}
      >
        {tx.steepest}
      </div>
    </SceneShell>
  );
};
