import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { Dial } from "../components/dial";
import { useStrings } from "../i18n";

// The DFT matrix. The characters of ℤ/8 as rows of clock hands, row k
// turning k steps at a time (c0, c1, a highlight sweeping down the rows).
// Divided by √8 it is unitary: two basis arrows turn rigidly into new ones
// (c2). The shift matrix, ones just below the diagonal, becomes a diagonal
// of hands ω^(−k) in the new basis (c3). Convolution of two bar charts on
// one side, the product of their spectra on the other (c4).

const N = 8;
const TH = (2 * Math.PI) / N;
const GX = 230;
const GY = 170;
const CS = 74;

export const Dft: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("dft");
  const [c0, c1, c2, c3, c4] = cues;
  const sweep = Math.floor((frame - c1 - 10) / 16);
  const rot = (Math.PI / 5) * progress(frame, c2 + 20, 40);
  const toDiag = progress(frame, c3 + 30, 40);
  const right2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c3, 10);
  const right3 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 10);
  const right4 = fadeIn(frame, c4 + 4, 10);

  return (
    <SceneShell id="dft">
      {Array.from({ length: N }, (_, i) => (
        <Sfx key={i} name="tick" at={c0 + 8 + i * 6} volume={0.05} />
      ))}
      {Array.from({ length: N }, (_, i) => (
        <Sfx key={i} name="pluck2" at={c1 + 10 + i * 16} volume={0.06} />
      ))}
      <Sfx name="whoosh" at={c2 + 20} volume={0.12} />
      <Sfx name="riser" at={c3 + 20} volume={0.1} />
      <Sfx name="chime" at={c3 + 70} volume={0.2} />
      <Sfx name="pop" at={c4 + 10} volume={0.12} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: N }, (_, k) => (
          <g key={k} opacity={fadeIn(frame, c0 + 8 + k * 6, 8)}>
            {Array.from({ length: N }, (_, j) => (
              <Dial
                key={j}
                cx={GX + j * CS}
                cy={GY + k * CS}
                r={30}
                angle={-j * k * TH}
                lit={sweep >= 0 && sweep % N === k && frame < c2}
              />
            ))}
            <text
              x={GX - 70}
              y={GY + k * CS + 12}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={30}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              χ{["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇"][k]}
            </text>
          </g>
        ))}
        <g opacity={right2}>
          {[0, 1].map((i) => {
            const a = i * (Math.PI / 2);
            return (
              <g key={i}>
                <line
                  x1={1350}
                  y1={480}
                  x2={1350 + 220 * Math.cos(a)}
                  y2={480 - 220 * Math.sin(a)}
                  stroke={alpha(colors.paper, 0.35)}
                  strokeWidth={5}
                />
                <line
                  x1={1350}
                  y1={480}
                  x2={1350 + 220 * Math.cos(a + rot)}
                  y2={480 - 220 * Math.sin(a + rot)}
                  stroke={i ? colors.green : colors.primary}
                  strokeWidth={8}
                  strokeLinecap="round"
                />
              </g>
            );
          })}
          <text
            x={1350}
            y={620}
            textAnchor="middle"
            fill={colors.text}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            F / √8
          </text>
        </g>
        <g opacity={right3}>
          {Array.from({ length: N * N }, (_, i) => {
            const r = Math.floor(i / N);
            const c = i % N;
            const sub = r === (c + 1) % N;
            const diag = r === c;
            const x = 1060 + c * 72;
            const y = 180 + r * 72;
            if (diag)
              return (
                <Dial
                  key={i}
                  cx={x}
                  cy={y}
                  r={28}
                  angle={-r * TH}
                  color={colors.green}
                  opacity={toDiag}
                />
              );
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={sub ? 12 * (1 - toDiag) + 4 : 4}
                fill={
                  sub
                    ? alpha(colors.primary, 1 - 0.8 * toDiag)
                    : alpha(colors.paper, 0.2)
                }
              />
            );
          })}
        </g>
        <g opacity={right4}>
          {[0, 1].map((side) => {
            const x0 = 1020 + side * 420;
            const vals = side
              ? [6, 3, 1, 0.5, 0.5, 1, 3]
              : [1, 3, 5, 6, 5, 3, 1];
            return (
              <g key={side}>
                {vals.map((v, i) => (
                  <rect
                    key={i}
                    x={x0 + i * 46}
                    y={560 - v * 45}
                    width={34}
                    height={v * 45 + 2}
                    rx={5}
                    fill={side ? colors.highlight : colors.primary}
                  />
                ))}
              </g>
            );
          })}
          <text
            x={1020}
            y={640}
            fill={colors.primary}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            f ∗ h
          </text>
          <text
            x={1440}
            y={640}
            fill={colors.highlight}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            f̂ · ĥ
          </text>
          <text
            x={1390}
            y={420}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={56}
            fontFamily={fonts.math}
          >
            ↔
          </text>
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c3, 10) }}>
        <Chip
          frame={frame}
          at={c2 + 30}
          x={1500}
          y={180}
          size={40}
          color={colors.green}
        >
          {tx.unitary}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 10}
          x={1060}
          y={760}
          size={36}
          color={colors.primary}
        >
          {tx.shift}
        </Chip>
        <Chip
          frame={frame}
          at={c3 + 70}
          x={1300}
          y={760}
          size={36}
          color={colors.green}
        >
          → {tx.diagonal}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c4 + 20}
        x={1020}
        y={700}
        size={36}
        color={colors.primary}
      >
        {tx.conv}
      </Chip>
      <Chip
        frame={frame}
        at={c4 + 30}
        x={1440}
        y={700}
        size={36}
        color={colors.highlight}
      >
        {tx.product}
      </Chip>
    </SceneShell>
  );
};
