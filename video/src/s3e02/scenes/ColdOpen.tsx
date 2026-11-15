import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Two puzzles from two seasons. A seam splits the screen (c0). Left: the
// 144-hour clock ℤ/144 (c1), which folds into a 12 × 12 grid of dots,
// ℤ/12 × ℤ/12, with a "?" (c2). Right: a grid stretched by 2I (c3), then
// sheared by the Jordan block [2 1; 0 2], with a "?" (c4). The clock turns
// and the grid stretches: symmetry and stretching (c5). The seam fades and
// the halves slide together under one label (c6). The stamp "field" turns
// into "ring" (c7).

const L = { x: 480, y: 440 };
const R = { x: 1440, y: 440 };

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const fold = progress(frame, c2 + 6, 40);
  const scale2 = progress(frame, c3 + 10, 30);
  const shear = progress(frame, c4 + 10, 30);
  // the symmetry "add 1, 1" walks a lit dot diagonally across the grid
  const walker = frame > c5 ? (Math.floor((frame - c5) / 6) * 13) % 144 : 0;
  const merge = progress(frame, c6 + 4, 40);
  const seam = fadeIn(frame, c0, 10) * fadeOut(frame, c6, 20);
  const dxL = 300 * merge;
  const dxR = -300 * merge;
  const fadeAll = fadeOut(frame, c7, 12);
  // the right-hand matrix: I → 2I → [2 1; 0 2], breathing a little at c5
  const breathe = frame > c5 ? 0.08 * Math.sin((frame - c5) * 0.08) : 0;
  const a = 1 + scale2 + breathe;
  const b = shear;
  const M = (x: number, y: number) =>
    [R.x + dxR + 50 * (a * x + b * y), R.y - 50 * a * y] as const;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="whoosh" at={c0 + 2} volume={0.12} />
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      <Sfx name="pluck4" at={c3 + 10} volume={0.12} />
      <Sfx name="whoosh" at={c4 + 10} volume={0.1} />
      <Sfx name="whoosh" at={c6 + 4} volume={0.12} />
      <Sfx name="chime" at={c6 + 44} volume={0.24} />
      <Sfx name="thud" at={c7 + 16} volume={0.18} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={960}
          y1={130}
          x2={960}
          y2={800}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={3}
          strokeDasharray="10 10"
          opacity={seam}
        />
        <g opacity={fadeAll}>
          {/* left: ℤ/144 folding into ℤ/12 × ℤ/12 */}
          <g opacity={fadeIn(frame, c1 + 4, 10)}>
            {Array.from({ length: 144 }, (_, k) => {
              const ang = Math.PI / 2 - (2 * Math.PI * k) / 144;
              const rx = L.x + dxL + 230 * Math.cos(ang);
              const ry = L.y - 230 * Math.sin(ang);
              const i = k % 12;
              const j = Math.floor(k / 12);
              const gx = L.x + dxL + (i - 5.5) * 36;
              const gy = L.y + (j - 5.5) * 36;
              const t = Math.min(1, Math.max(0, fold * 1.3 - (k / 144) * 0.3));
              return (
                <circle
                  key={k}
                  cx={rx + (gx - rx) * t}
                  cy={ry + (gy - ry) * t}
                  r={k === walker ? 12 : 7}
                  fill={k === walker ? colors.highlight : colors.primary}
                />
              );
            })}
          </g>
          {/* right: a grid stretched and sheared, kept inside its half */}
          <defs>
            <clipPath id="co-right">
              <rect x={1000 + dxR} y={150} width={820} height={640} rx={20} />
            </clipPath>
          </defs>
          <g opacity={fadeIn(frame, c3 + 2, 10)} clipPath="url(#co-right)">
            {Array.from({ length: 9 }, (_, k) => {
              const v = k - 4;
              const [x1, y1] = M(v, -4);
              const [x2, y2] = M(v, 4);
              const [x3, y3] = M(-4, v);
              const [x4, y4] = M(4, v);
              const s = alpha(colors.paper, v === 0 ? 0.6 : 0.2);
              return (
                <g key={k}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={s}
                    strokeWidth={2}
                  />
                  <line
                    x1={x3}
                    y1={y3}
                    x2={x4}
                    y2={y4}
                    stroke={s}
                    strokeWidth={2}
                  />
                </g>
              );
            })}
            <line
              x1={M(0, 0)[0]}
              y1={M(0, 0)[1]}
              x2={M(1, 0)[0]}
              y2={M(1, 0)[1]}
              stroke={colors.primary}
              strokeWidth={8}
            />
            <line
              x1={M(0, 0)[0]}
              y1={M(0, 0)[1]}
              x2={M(0, 1)[0]}
              y2={M(0, 1)[1]}
              stroke={colors.green}
              strokeWidth={8}
            />
          </g>
        </g>
      </svg>
      <div style={{ opacity: fadeAll }}>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 120 + dxL,
            fontSize: 40,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c6, 12),
          }}
        >
          {tx.s1} · <span style={{ color: colors.text }}>{tx.groups144}</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1080 + dxR,
            fontSize: 40,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c6, 12),
          }}
        >
          {tx.s2} · <span style={{ color: colors.text }}>{tx.onlyEigen2}</span>
        </div>
        <div style={{ opacity: fadeOut(frame, c5, 12) }}>
          <Chip frame={frame} at={c1 + 30} x={110} y={690} size={40} math>
            ℤ/144
          </Chip>
          <Chip frame={frame} at={c2 + 40} x={330} y={690} size={40} math>
            ℤ/12 × ℤ/12
          </Chip>
          <Chip
            frame={frame}
            at={c2 + 60}
            x={700}
            y={690}
            size={40}
            color={colors.highlight}
          >
            ?
          </Chip>
          <Chip frame={frame} at={c3 + 30} x={1100} y={690} size={40} math>
            2I
          </Chip>
          <Chip frame={frame} at={c4 + 30} x={1250} y={690} size={40} math>
            [2 1; 0 2]
          </Chip>
          <Chip
            frame={frame}
            at={c4 + 50}
            x={1560}
            y={690}
            size={40}
            color={colors.highlight}
          >
            ?
          </Chip>
        </div>
        <div style={{ opacity: fadeOut(frame, c6, 12) }}>
          <Chip frame={frame} at={c5 + 6} x={360} y={720} color={colors.green}>
            {tx.symmetry}
          </Chip>
          <Chip
            frame={frame}
            at={c5 + 16}
            x={1300}
            y={720}
            color={colors.orange}
          >
            {tx.stretching}
          </Chip>
        </div>
        <Chip
          frame={frame}
          at={c6 + 44}
          x={820}
          y={720}
          color={colors.highlight}
        >
          {tx.sameQuestion}
        </Chip>
      </div>
      <div
        style={{
          position: "absolute",
          top: 330,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.body,
          fontSize: 96,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c7 + 6, 12),
          scale: `${1.3 - 0.3 * progress(frame, c7 + 6, 14)}`,
        }}
      >
        {tx.fieldToRing}
      </div>
    </SceneShell>
  );
};
