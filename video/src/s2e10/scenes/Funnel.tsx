import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, ramp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { useStrings } from "../i18n";

// The universal property. A funnel marked ⊗. Pairs of arrows (lemon v,
// pink w) drop into its mouth, one pair at a time, and a single glowing
// token labelled v ⊗ w drops out of the spout and slides right. At first
// the machine on the right has two slots and is labelled "bilinear"; then
// its two slots merge into one, the label turns to "linear", and each
// token clicks into the one slot and a number pops out.

const F = { x: 640, y: 250 };
const M = { x: 1220, y: 470 };

export const Funnel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("funnel");
  const [c0, c1] = cues;
  const merge = glide(frame, c1 + 10, fps, 24);
  const pairs = [0, 1, 2].map((k) => c0 + 20 + k * 40);
  const tokens = [0, 1, 2];

  return (
    <SceneShell id="funnel">
      {pairs.map((at, k) => (
        <Sfx key={k} name={PLUCKS[k * 2]} at={at + 24} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 + 10} volume={0.12} />
      <Sfx name="ding" at={c1 + 34} />
      {tokens.map((k) => (
        <Sfx key={`o${k}`} name="clink" at={c1 + 50 + k * 26} volume={0.14} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the funnel */}
        <path
          d={`M ${F.x - 240} ${F.y} L ${F.x + 240} ${F.y} L ${F.x + 50} ${F.y + 260} L ${F.x + 50} ${F.y + 360} L ${F.x - 50} ${F.y + 360} L ${F.x - 50} ${F.y + 260} Z`}
          fill={alpha(colors.primary, 0.12)}
          stroke={colors.primary}
          strokeWidth={8}
        />
        <text
          x={F.x}
          y={F.y + 170}
          fill={colors.primary}
          fontSize={110}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={800}
        >
          ⊗
        </text>
        {/* pairs going in */}
        {pairs.map((at, k) => {
          const t = ramp(frame, at, 24);
          const y = lerp(F.y - 180, F.y + 40, t);
          return (
            <g key={k} opacity={t > 0 && t < 1 ? 1 : 0}>
              <Arrow
                from={{ x: F.x - 130, y: y + 40 }}
                to={{ x: F.x - 60, y: y - 30 }}
                width={10}
              />
              <Arrow
                from={{ x: F.x + 40, y: y + 40 }}
                to={{ x: F.x + 130, y: y - 20 }}
                width={10}
                color={colors.highlight}
              />
            </g>
          );
        })}
        {/* tokens coming out, sliding right, and (after the merge) into the slot */}
        {tokens.map((k) => {
          const out = Math.min(1, springIn(frame, pairs[k] + 24, fps, 10));
          const slide = glide(frame, pairs[k] + 34, fps, 20);
          const into = glide(frame, c1 + 40 + k * 26, fps, 14);
          const x = lerp(F.x, 940 - k * 120, slide);
          const xx = lerp(x, M.x - 20, into);
          const y = lerp(F.y + 420, M.y + 120, into);
          return (
            <g
              key={k}
              opacity={out * (into > 0.95 ? 0 : 1)}
              transform={`translate(${xx} ${y}) scale(${out})`}
            >
              <circle r={34} fill={colors.primary} />
              <text
                y={84}
                fill={colors.primary}
                fontSize={34}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={into > 0 ? 0 : 1}
              >
                v⊗w
              </text>
            </g>
          );
        })}
        {/* the machine */}
        <rect
          x={M.x}
          y={M.y}
          width={380}
          height={240}
          rx={30}
          fill={alpha(colors.orange, 0.2)}
          stroke={colors.orange}
          strokeWidth={8}
        />
        {[0, 1].map((k) => (
          <rect
            key={k}
            x={M.x - 20}
            y={lerp(M.y + 60 + k * 90, M.y + 98, merge)}
            width={40}
            height={44}
            rx={8}
            fill={colors.ink}
            opacity={k === 1 ? 1 - merge : 1}
          />
        ))}
        {tokens.map((k) => {
          const pop = Math.min(1, springIn(frame, c1 + 54 + k * 26, fps, 10));
          return (
            <text
              key={k}
              x={M.x + 440}
              y={M.y + 80 + k * 70}
              fill={colors.primary}
              fontSize={56}
              fontFamily={fonts.mono}
              fontWeight={800}
              opacity={pop}
            >
              {[6, 2, 9][k]}
            </text>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: M.y - 90,
          left: M.x,
          width: 380,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          color: merge > 0.5 ? colors.green : colors.orange,
          opacity: fadeIn(frame, c0 + 10),
          translate: riseIn(frame, c0 + 10, 12),
        }}
      >
        {merge > 0.5 ? tx.linear : tx.bilinear}
      </div>
    </SceneShell>
  );
};
