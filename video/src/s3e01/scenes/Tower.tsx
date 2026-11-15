import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The tower law. Three floors, ℚ at the bottom, ℚ(√2), ℚ(√2, √3) on top,
// with ×2 between each (c0). The two bases beside the floors (c1). A 2 × 2
// table: rows 1, √2, columns 1, √3, cells filling in 1, √3, √2, √6 (c2).
// Chip: a basis of a basis is a basis (c3). The law with its numbers,
// 4 = 2 · 2 (c4). Chip: the middle degree divides the top (c5).

const FLOORS = ["ℚ", "ℚ(√2)", "ℚ(√2, √3)"];

export const Tower: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("tower");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const cells = [
    ["1", "√3"],
    ["√2", "√6"],
  ];

  return (
    <SceneShell id="tower">
      {FLOORS.map((_, i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 12} volume={0.12} />
      ))}
      <Sfx name="pluck2" at={c1 + 8} volume={0.12} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pluck3" at={c2 + 10 + i * 10} volume={0.08} />
      ))}
      <Sfx name="ding" at={c3 + 10} volume={0.18} />
      <Sfx name="pop" at={c4 + 8} volume={0.12} />
      <Sfx name="chime" at={c5 + 20} volume={0.26} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {FLOORS.map((f, i) => {
          const y = 640 - i * 200;
          return (
            <g key={f} opacity={fadeIn(frame, c0 + 6 + i * 12, 8)}>
              <rect
                x={180}
                y={y}
                width={460 - i * 0}
                height={110}
                rx={18}
                fill={alpha(colors.violet, 0.35 + i * 0.15)}
                stroke={colors.highlight}
                strokeWidth={3}
              />
              <text
                x={410}
                y={y + 72}
                textAnchor="middle"
                fill={colors.text}
                fontSize={48}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                {f}
              </text>
              {i > 0 && (
                <text
                  x={680}
                  y={y + 160}
                  fill={colors.orange}
                  fontSize={44}
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  × 2
                </text>
              )}
            </g>
          );
        })}
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <text
            x={800}
            y={540}
            fill={colors.primary}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1, √2
          </text>
          <text
            x={800}
            y={340}
            fill={colors.orange}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            1, √3
          </text>
        </g>
        <g opacity={fadeIn(frame, c2 + 4, 8)}>
          {["1", "√3"].map((h, j) => (
            <text
              key={h}
              x={1300 + j * 220}
              y={250}
              textAnchor="middle"
              fill={colors.orange}
              fontSize={46}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {h}
            </text>
          ))}
          {["1", "√2"].map((h, i) => (
            <text
              key={h}
              x={1100}
              y={350 + i * 200}
              textAnchor="middle"
              fill={colors.primary}
              fontSize={46}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {h}
            </text>
          ))}
          {cells.map((row, i) =>
            row.map((c, j) => (
              <g key={c} opacity={fadeIn(frame, c2 + 10 + (i * 2 + j) * 10, 6)}>
                <rect
                  x={1200 + j * 220}
                  y={280 + i * 200}
                  width={200}
                  height={130}
                  rx={18}
                  fill={alpha(colors.paper, 0.08)}
                  stroke={colors.paper}
                  strokeWidth={3}
                />
                <text
                  x={1300 + j * 220}
                  y={362 + i * 200}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={52}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {c}
                </text>
              </g>
            )),
          )}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 52,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c4 + 6),
        }}
      >
        [M : K] = [M : L] · [L : K]{"   "}
        <span style={{ color: colors.green }}>4 = 2 · 2</span>
      </div>
      <Chip
        frame={frame}
        at={c3 + 10}
        x={1160}
        y={720}
        color={colors.green}
        size={38}
      >
        {tx.basisOfBasis}
      </Chip>
      <Chip
        frame={frame}
        at={c5 + 14}
        x={180}
        y={150}
        color={colors.highlight}
        size={40}
        math
      >
        [L : K] | [M : K]
      </Chip>
    </SceneShell>
  );
};
