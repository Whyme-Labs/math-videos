import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// Eigenvectors of A = [[4, 1], [2, 3]]. A fan of twelve arrows around the
// origin; the map acts and almost every arrow swings off its own line (its
// old line stays as a faint ghost), while the arrows on the lines through
// (1, 1) and (1, −2) only stretch, ×5 and ×2, and those lines glow. Then
// the grid redraws along the two eigen-lines, and the matrix card on the
// right turns into diag(5, 2).

const O = { x: 760, y: 470 };
const S = 46;
const scr = (x: number, y: number) => ({ x: O.x + x * S, y: O.y - y * S });
const map = (x: number, y: number) => ({ x: 4 * x + y, y: 2 * x + 3 * y });
const EIG = [
  { d: { x: 1, y: 1 }, l: 5 },
  { d: { x: 1, y: -2 }, l: 2 },
];

export const Lines: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("lines");
  const [c0, c1] = cues;
  const act = glide(frame, c0 + 30, fps, 50);
  const glow = fadeIn(frame, c0 + 80, 10);
  const regrid = glide(frame, c1 + 10, fps, 40);
  const fan = Array.from({ length: 12 }, (_, k) => {
    const a = (k / 12) * Math.PI * 2 + 0.2;
    return { x: 1.1 * Math.cos(a), y: 1.1 * Math.sin(a) };
  });
  const card = regrid > 0.5 ? ["5", "0", "0", "2"] : ["4", "1", "2", "3"];

  return (
    <SceneShell id="lines">
      <Sfx name="riser" at={c0 + 30} volume={0.1} />
      <Sfx name="ding" at={c0 + 84} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="chime" at={c1 + 50} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="linesStage">
            <rect x={120} y={90} width={1220} height={740} rx={30} />
          </clipPath>
        </defs>
        <g clipPath="url(#linesStage)">
          {/* grid: standard, then along the eigen-lines */}
          {Array.from({ length: 15 }).map((_, i) => {
            const k = i - 7;
            const u = { x: lerp(1, 1, regrid), y: lerp(0, 1, regrid) };
            const v = { x: lerp(0, 1, regrid), y: lerp(1, -2, regrid) };
            const a1 = scr(k * u.x - 12 * v.x, k * u.y - 12 * v.y);
            const a2 = scr(k * u.x + 12 * v.x, k * u.y + 12 * v.y);
            const b1 = scr(k * v.x - 12 * u.x, k * v.y - 12 * u.y);
            const b2 = scr(k * v.x + 12 * u.x, k * v.y + 12 * u.y);
            return (
              <g key={i} stroke={alpha(colors.paper, 0.12)} strokeWidth={2}>
                <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} />
                <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} />
              </g>
            );
          })}
          {EIG.map((e, k) => (
            <line
              key={k}
              x1={scr(-12 * e.d.x, -12 * e.d.y).x}
              y1={scr(-12 * e.d.x, -12 * e.d.y).y}
              x2={scr(12 * e.d.x, 12 * e.d.y).x}
              y2={scr(12 * e.d.x, 12 * e.d.y).y}
              stroke={alpha(
                k ? colors.highlight : colors.primary,
                0.25 + 0.55 * glow,
              )}
              strokeWidth={6}
            />
          ))}
          {/* the fan, swinging off its lines */}
          {fan.map((p, k) => {
            const q = map(p.x, p.y);
            const tip = { x: lerp(p.x, q.x, act), y: lerp(p.y, q.y, act) };
            return (
              <g key={k}>
                <line
                  x1={O.x}
                  y1={O.y}
                  x2={scr(p.x * 4, p.y * 4).x}
                  y2={scr(p.x * 4, p.y * 4).y}
                  stroke={alpha(colors.paper, 0.15 * act)}
                  strokeWidth={2}
                  strokeDasharray="6 8"
                />
                <Arrow
                  from={O}
                  to={scr(tip.x, tip.y)}
                  width={7}
                  color={alpha(colors.paper, 0.55)}
                />
              </g>
            );
          })}
          {EIG.map((e, k) => {
            const s = lerp(1, e.l, act);
            return (
              <Arrow
                key={k}
                from={O}
                to={scr(e.d.x * s * 0.9, e.d.y * s * 0.9)}
                width={14}
                color={k ? colors.highlight : colors.primary}
              />
            );
          })}
        </g>
        {EIG.map((e, k) => {
          const p = scr(e.d.x * e.l * 0.9, e.d.y * e.l * 0.9);
          return (
            <text
              key={k}
              x={p.x + 20}
              y={p.y + (k ? 50 : -14)}
              fill={k ? colors.highlight : colors.primary}
              stroke={colors.bg}
              strokeWidth={8}
              paintOrder="stroke"
              fontSize={56}
              fontFamily={fonts.math}
              fontWeight={800}
              opacity={glow}
            >
              {k ? tx.stretch2 : tx.stretch5}
            </text>
          );
        })}
        {/* the matrix card */}
        <g transform="translate(1620 420)" opacity={fadeIn(frame, c0 + 10)}>
          <path
            d="M -110 -90 l -20 0 l 0 180 l 20 0 M 110 -90 l 20 0 l 0 180 l -20 0"
            fill="none"
            stroke={regrid > 0.5 ? colors.green : colors.text}
            strokeWidth={6}
          />
          {card.map((n, k) => (
            <text
              key={k}
              x={-55 + (k % 2) * 110}
              y={-14 + Math.floor(k / 2) * 90}
              fill={
                regrid > 0.5 && (k === 1 || k === 2)
                  ? alpha(colors.text, 0.4)
                  : colors.text
              }
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {n}
            </text>
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 1440,
          width: 360,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c1 + 50),
          translate: riseIn(frame, c1 + 50, 12),
        }}
      >
        diag(5, 2)
      </div>
    </SceneShell>
  );
};
