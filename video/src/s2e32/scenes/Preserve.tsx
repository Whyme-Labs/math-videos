import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// Measure-preserving maps. μ(T⁻¹A) = μ(A) across the top (c0). A circle
// with an arc A in green; the rotation slides it round to a same-length
// orange copy (c1). Doubling: A's preimage, two half-length arcs, with the
// lengths added up (c2). The half circle [0, ½) and its forward image, the
// whole circle (c3). The cat map on the unit square: a round blob of
// points, then its image, then its second image, stretched and wrapped,
// with det = 1 (c4); the stretching and squeezing directions with their
// factors (c5).

const CX = 480;
const CY = 520;
const RR = 230;
const A0 = 0.1;
const A1 = 0.3;
const arc = (a: number, b: number, r = RR) => {
  const n = 40;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = 2 * Math.PI * (a + ((b - a) * i) / n);
    return `${i ? "L" : "M"} ${CX + r * Math.cos(t)} ${CY - r * Math.sin(t)}`;
  }).join(" ");
};
const BLOB = Array.from({ length: 500 }, (_, i) => {
  const r = 0.12 * Math.sqrt(rnd(i * 2 + 7));
  const t = 2 * Math.PI * rnd(i * 2 + 8);
  return [0.35 + r * Math.cos(t), 0.4 + r * Math.sin(t)] as const;
});
const cat = ([x, y]: readonly [number, number]) =>
  [(((2 * x + y) % 1) + 1) % 1, (((x + y) % 1) + 1) % 1] as const;
const SQ = { x: 1120, y: 230, s: 520 };

export const Preserve: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("preserve");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const rot = 0.37 * progress(frame, c1 + 10, 24);
  const showRot = fadeIn(frame, c1 + 6, 8) * fadeOut(frame, c2, 8);
  const showPre = fadeIn(frame, c2 + 6, 8) * fadeOut(frame, c3, 8);
  const showImg = fadeIn(frame, c3 + 6, 8);
  const steps = frame < c4 + 40 ? 0 : frame < c4 + 80 ? 1 : 2;
  const pts = BLOB.map((p) => {
    let q = p;
    for (let k = 0; k < steps; k++) q = cat(q);
    return q;
  });
  const ev = (1 + Math.sqrt(5)) / 2;

  return (
    <SceneShell id="preserve">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c1 + 10} volume={0.1} />
      <Sfx name="pluck2" at={c2 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 8} volume={0.12} />
      <Sfx name="pop" at={c4 + 6} volume={0.12} />
      <Sfx name="pluck4" at={c4 + 40} volume={0.1} />
      <Sfx name="pluck5" at={c4 + 80} volume={0.1} />
      <Sfx name="chime" at={c5 + 30} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 54,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        μ(T⁻¹A) = μ(A)
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={CX}
          cy={CY}
          r={RR}
          fill="none"
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={4}
          opacity={fadeIn(frame, c0 + 4, 8)}
        />
        <path
          d={arc(A0, A1)}
          fill="none"
          stroke={colors.green}
          strokeWidth={18}
          strokeLinecap="round"
          opacity={fadeIn(frame, c0 + 10, 8) * fadeOut(frame, c3, 8)}
        />
        <path
          d={arc(A0 + rot, A1 + rot)}
          fill="none"
          stroke={colors.orange}
          strokeWidth={12}
          strokeLinecap="round"
          opacity={showRot}
        />
        <g opacity={showPre}>
          <path
            d={arc(A0 / 2, A1 / 2, RR - 36)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <path
            d={arc(A0 / 2 + 0.5, A1 / 2 + 0.5, RR - 36)}
            fill="none"
            stroke={colors.orange}
            strokeWidth={12}
            strokeLinecap="round"
          />
        </g>
        <g opacity={showImg}>
          <path
            d={arc(0, 0.5)}
            fill="none"
            stroke={colors.green}
            strokeWidth={18}
          />
          <circle
            cx={CX}
            cy={CY}
            r={RR - 34}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={10}
            opacity={fadeIn(frame, c3 + 30, 10)}
          />
        </g>
        <g opacity={fadeIn(frame, c4 + 4, 8)}>
          <rect
            x={SQ.x}
            y={SQ.y}
            width={SQ.s}
            height={SQ.s}
            fill={alpha(colors.paper, 0.05)}
            stroke={colors.paper}
            strokeWidth={4}
          />
          {pts.map(([x, y], i) => (
            <circle
              key={i}
              cx={SQ.x + SQ.s * x}
              cy={SQ.y + SQ.s * (1 - y)}
              r={4}
              fill={colors.primary}
            />
          ))}
        </g>
        <g opacity={fadeIn(frame, c5 + 6, 8)}>
          <line
            x1={SQ.x + SQ.s / 2 - 200}
            y1={SQ.y + SQ.s / 2 + 200 / ev}
            x2={SQ.x + SQ.s / 2 + 200}
            y2={SQ.y + SQ.s / 2 - 200 / ev}
            stroke={colors.red}
            strokeWidth={7}
          />
          <line
            x1={SQ.x + SQ.s / 2 - 90 / ev}
            y1={SQ.y + SQ.s / 2 - 90}
            x2={SQ.x + SQ.s / 2 + 90 / ev}
            y2={SQ.y + SQ.s / 2 + 90}
            stroke={colors.green}
            strokeWidth={7}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 780,
          left: CX - 300,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 40,
          fontWeight: 800,
          color: colors.orange,
          whiteSpace: "nowrap",
          opacity: showPre,
        }}
      >
        0.1 + 0.1 = 0.2
      </div>
      <div
        style={{
          position: "absolute",
          top: 780,
          left: CX - 300,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontSize: 40,
          fontWeight: 800,
          color: colors.highlight,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c3 + 30) * (1 - fadeIn(frame, c4, 8)),
        }}
      >
        ½ ↦ 1 · {tx.image}
      </div>
      <Chip
        frame={frame}
        at={c4 + 20}
        x={SQ.x + SQ.s + 30}
        y={SQ.y}
        color={colors.primary}
        size={40}
        math
      >
        det = 1
      </Chip>
      <div
        style={{
          position: "absolute",
          top: SQ.y + 120,
          left: SQ.x + SQ.s + 30,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontFamily: fonts.mono,
          fontSize: 40,
          fontWeight: 800,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c5 + 14),
        }}
      >
        <span style={{ color: colors.red }}>× 2.618</span>
        <span style={{ color: colors.green }}>× 0.382</span>
      </div>
    </SceneShell>
  );
};
