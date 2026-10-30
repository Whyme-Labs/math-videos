import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { curve } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The payoff: "+ C" is a point of the quotient. Left, the family x² + C;
// right, the line 2x; between them the arrow d/dx. Dots fly from every
// curve of the family into the one line, and underneath, the constants are
// squashed flat onto zero, in red: the kernel. Then the family glues into
// one glowing point, and an orange "undo" arrow curls back from 2x; a token
// runs along it and lands on the whole family at once. "+ C" swells.

const CS = [-1, 0, 1, 2, 3];
const L = { x: 460, y: 570 };
const R = { x: 1460, y: 420 };
const left = (x: number, y: number) => ({ x: L.x + x * 125, y: L.y - y * 34 });
const right = (x: number, y: number) => ({ x: R.x + x * 120, y: R.y - y * 45 });

export const PlusC: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("plusC");
  const [c0, c1, c2] = cues;
  const fly = ramp(frame, c0 + 30, 30);
  const flat = glide(frame, c0 + 70, fps, 24);
  const glue = glide(frame, c1 + 6, fps, 30);
  const undo = ramp(frame, c1 + 50, 20);
  const run = glide(frame, c2 + 10, fps, 30);
  const land = Math.min(1, springIn(frame, c2 + 40, fps, 10));
  const blob = left(0, 2);
  // the undo arrow: from under the right plot, curling back to the blob
  const U0 = { x: 1300, y: 640 };
  const U1 = { x: 620, y: 640 };
  const along = (t: number) => ({
    x: lerp(U0.x, U1.x, t),
    y: lerp(U0.y, U1.y, t) + 120 * Math.sin(Math.PI * t),
  });
  const token = along(run);

  return (
    <SceneShell id="plusC">
      <Sfx name="whoosh" at={c0 + 30} volume={0.12} />
      <Sfx name="thud" at={c0 + 70} volume={0.3} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="ding" at={c1 + 36} />
      <Sfx name="pluck2" at={c1 + 50} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 10} volume={0.12} />
      <Sfx name="chime" at={c2 + 40} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the two boxes */}
        {[
          { x: 160, c: colors.primary },
          { x: 1160, c: colors.paper },
        ].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={170}
            width={600}
            height={440}
            rx={24}
            fill={alpha(colors.bgMid, 0.6)}
            stroke={alpha(b.c, 0.4)}
            strokeWidth={4}
          />
        ))}
        {/* the family, gluing into a point */}
        <g
          transform={`translate(${blob.x} ${blob.y}) scale(${1 - glue}) translate(${-blob.x} ${-blob.y})`}
        >
          {CS.map((c, k) => (
            <path
              key={k}
              d={curve((x) => x * x + lerp(c, 2, glue), -1.8, 1.8, left)}
              fill="none"
              stroke={c === 0 ? colors.primary : colors.orange}
              strokeWidth={6}
              opacity={fadeIn(frame, c0 + k * 4, 8)}
            />
          ))}
        </g>
        <g opacity={glue} transform={`translate(${blob.x} ${blob.y})`}>
          <circle r={80 * glue} fill={alpha(colors.primary, 0.22)} />
          <circle r={30 * glue} fill={colors.primary} />
        </g>
        <text
          x={blob.x}
          y={blob.y - 130}
          fill={colors.primary}
          fontSize={lerp(56, 84, land)}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={glue}
        >
          x² + C
        </text>
        {/* 2x */}
        <path
          d={curve((x) => 2 * x, -2, 2, right)}
          fill="none"
          stroke={colors.paper}
          strokeWidth={7}
          opacity={fadeIn(frame, c0 + 10)}
        />
        <text
          x={right(2, 4).x - 20}
          y={right(2, 4).y + 70}
          fill={colors.paper}
          fontSize={56}
          textAnchor="end"
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c0 + 10)}
        >
          2x
        </text>
        {/* d/dx */}
        <line
          x1={790}
          y1={390}
          x2={1110}
          y2={390}
          stroke={colors.text}
          strokeWidth={8}
        />
        <polygon points="1130,390 1100,372 1100,408" fill={colors.text} />
        <text
          x={950}
          y={360}
          fill={colors.text}
          fontSize={48}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          {tx.dLabel}
        </text>
        {/* dots flying from every curve into the one line */}
        {CS.map((c, k) => {
          const from = left(1, 1 + c);
          const to = right(1, 2);
          const t = Math.max(0, Math.min(1, fly * 1.4 - k * 0.08));
          return (
            <circle
              key={k}
              cx={lerp(from.x, to.x, t)}
              cy={lerp(from.y, to.y, t) - 120 * Math.sin(Math.PI * t)}
              r={12}
              fill={colors.orange}
              opacity={t > 0 && t < 1 ? 1 : 0}
            />
          );
        })}
        {/* the kernel: constants squashed to zero */}
        <g opacity={fadeIn(frame, c0 + 64) * fadeOut(frame, c1, 10)}>
          {[-2, -1, 1, 2].map((c) => (
            <line
              key={c}
              x1={820}
              y1={680 - c * 30 * (1 - flat)}
              x2={1100}
              y2={680 - c * 30 * (1 - flat)}
              stroke={colors.red}
              strokeWidth={6}
            />
          ))}
          <line
            x1={820}
            y1={680}
            x2={1100}
            y2={680}
            stroke={colors.red}
            strokeWidth={10}
          />
          <text
            x={960}
            y={790}
            fill={colors.red}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.kernel}
          </text>
        </g>
        {/* undo */}
        <g opacity={undo}>
          <path
            d={Array.from({ length: 41 })
              .map((_, i) => {
                const p = along((i / 40) * undo);
                return `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
              })
              .join(" ")}
            fill="none"
            stroke={colors.orange}
            strokeWidth={8}
            strokeDasharray="18 12"
            strokeDashoffset={-frame * 1.5}
          />
          <polygon
            points={`${U1.x - 10},${U1.y - 30} ${U1.x - 30},${U1.y + 10} ${U1.x + 16},${U1.y + 4}`}
            fill={colors.orange}
            opacity={undo >= 1 ? 1 : 0}
          />
          <text
            x={960}
            y={810}
            fill={colors.orange}
            fontSize={44}
            textAnchor="middle"
            fontWeight={800}
          >
            {tx.undo}
          </text>
        </g>
        <circle
          cx={token.x}
          cy={token.y}
          r={16}
          fill={colors.orange}
          opacity={run > 0 && run < 1 ? 1 : 0}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 64,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c2 + 44),
          translate: riseIn(frame, c2 + 44, 16),
        }}
      >
        ∫ 2x dx = x² + C
      </div>
    </SceneShell>
  );
};
