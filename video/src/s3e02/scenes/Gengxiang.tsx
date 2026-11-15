import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { colors, fonts } from "../../shared/theme";
import { Mat } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. 《九章算术·方田》 on reducing fractions: "以少减多，
// 更相减损，求其等也" (c0). Two rods of 91 and 49; the shorter is cut from the
// longer, again and again (c1), until both are 7, the 等数 (c2). The same
// subtraction run on a whole matrix is the Smith normal form (c3).

// (91, 49) → … → (7, 7)
const PAIRS: [number, number][] = [[91, 49]];
while (PAIRS[PAIRS.length - 1][0] !== PAIRS[PAIRS.length - 1][1]) {
  const [a, b] = PAIRS[PAIRS.length - 1];
  PAIRS.push(a > b ? [a - b, b] : [a, b - a]);
}
const U = 12; // pixels per unit

export const Gengxiang: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("gengxiang");
  const [c0, c1, c2, c3] = cues;
  const step = Math.min(
    PAIRS.length - 1,
    Math.max(0, Math.floor((frame - c1 - 10) / 24) + 1),
  );
  const [a, b] = frame < c1 + 10 ? PAIRS[0] : PAIRS[step];
  const rods = fadeIn(frame, c0 + 30, 10) * fadeOut(frame, c3, 12);
  const done = step === PAIRS.length - 1;

  return (
    <SceneShell id="gengxiang">
      <Sfx name="page" at={c0 + 4} volume={0.16} />
      {PAIRS.slice(1).map((_, i) => (
        <Sfx key={i} name="clink" at={c1 + 10 + i * 24} volume={0.07} />
      ))}
      <Sfx name="chime" at={c2 + 10} volume={0.24} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.12} />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 160,
          right: 160,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c3, 12),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.gxTitle}
        <div style={{ color: colors.text, marginTop: 16, fontSize: 40 }}>
          {tx.gxQuote}
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={rods}>
          {[a, b].map((n, i) => (
            <g key={i}>
              <rect
                x={260}
                y={400 + i * 150}
                width={n * U}
                height={56}
                rx={10}
                fill={i ? colors.orange : colors.primary}
              />
              <text
                x={260 + n * U + 30}
                y={442 + i * 150}
                fill={colors.text}
                fontSize={52}
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {n}
              </text>
            </g>
          ))}
          <text
            x={1500}
            y={520}
            textAnchor="middle"
            fill={colors.green}
            fontSize={64}
            fontWeight={800}
            fontFamily={fonts.body}
            opacity={done ? fadeIn(frame, c2 + 6, 10) : 0}
          >
            {tx.gxGcd}
          </text>
          <text
            x={1500}
            y={600}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={done ? fadeIn(frame, c2 + 20, 10) : 0}
          >
            gcd(91, 49) = 7
          </text>
        </g>
        <g opacity={fadeIn(frame, c3 + 6, 12)}>
          <Mat
            x={300}
            y={300}
            rows={[
              [2, 0, 0],
              [0, 18, 24],
              [0, -24, -36],
            ]}
            cw={130}
            rh={100}
            size={50}
          />
          <text
            x={960}
            y={470}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={80}
            fontFamily={fonts.math}
          >
            →
          </text>
          <Mat
            x={1230}
            y={300}
            rows={[
              [2, 0, 0],
              [0, 6, 0],
              [0, 0, 12],
            ]}
            cw={130}
            rh={100}
            size={50}
            cell={(i, j) => (i === j ? colors.green : undefined)}
          />
          <text
            x={960}
            y={720}
            textAnchor="middle"
            fill={colors.text}
            fontSize={48}
            fontWeight={800}
            fontFamily={fonts.body}
          >
            {tx.gxSnf}
          </text>
        </g>
      </svg>
    </SceneShell>
  );
};
