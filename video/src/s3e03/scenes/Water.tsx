import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { Molecule, Table } from "../components/water";
import { useStrings } from "../i18n";

// The payoff. The water molecule beside its table: E, C₂, σ (its own
// plane) and σ′ (c0). Under each operation, the atoms it leaves in place
// and the character of all nine motions, Γ = (9, −1, 3, 1) (c1). Minus the
// slides and spins, Γ_vib = (3, 1, 3, 1), projected on the rows: 2, 0, 1,
// 0 (c2). The three vibrations appear by their rows, two of type A₁ and
// one of type B₁ (c3). "only traces" (c4).

const TX = 760;
const TY = 210;
const CW = 150;
const RH = 70;
const STAY = [3, 1, 3, 1];
const GAMMA = [9, -1, 3, 1];
const VIB = [3, 1, 3, 1];
const PROJ = [2, 0, 1, 0];
const n = (v: number) => String(v).replace("-", "−");

export const Water: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("water");
  const [c0, c1, c2, c3, c4] = cues;
  const t = frame * 0.2;
  const row = (
    y: number,
    vals: number[],
    color: string,
    at: number,
    label: string,
  ) => (
    <g opacity={fadeIn(frame, at, 8)}>
      <text
        x={TX + CW * 0.5}
        y={y}
        textAnchor="middle"
        fill={color}
        fontSize={34}
        fontFamily={fonts.math}
        fontWeight={800}
      >
        {label}
      </text>
      {vals.map((v, j) => (
        <text
          key={j}
          x={TX + CW * (j + 1.5)}
          y={y}
          textAnchor="middle"
          fill={color}
          fontSize={42}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, at + j * 8, 6)}
        >
          {n(v)}
        </text>
      ))}
    </g>
  );

  return (
    <SceneShell id="water">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {STAY.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 10 + i * 8} volume={0.06} />
      ))}
      <Sfx name="pluck3" at={c2 + 10} volume={0.12} />
      {PROJ.map((_, i) => (
        <Sfx key={i} name="pluck2" at={c2 + 60 + i * 10} volume={0.08} />
      ))}
      <Sfx name="sparkle" at={c3 + 10} volume={0.2} />
      <Sfx name="chime" at={c4 + 10} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c3, 12)}>
          <Molecule x={380} y={400} s={1.4} />
          <line
            x1={380}
            y1={180}
            x2={380}
            y2={640}
            stroke={alpha(colors.highlight, 0.6)}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <text
            x={400}
            y={200}
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            C₂
          </text>
        </g>
        <Table
          x={TX}
          y={TY}
          ops={tx.ops}
          rows={tx.rows}
          cw={CW}
          rh={RH}
          opacity={fadeIn(frame, c0 + 10, 10)}
          rowColor={(i) =>
            frame < c3
              ? undefined
              : i === 0
                ? colors.green
                : i === 2
                  ? colors.orange
                  : alpha(colors.paper, 0.3)
          }
        />
        {/* the projections of Γ_vib on each row */}
        {PROJ.map((p, i) => (
          <text
            key={i}
            x={TX + CW * 5.6}
            y={TY + RH * (i + 1) + 16}
            textAnchor="middle"
            fill={p ? colors.green : alpha(colors.paper, 0.45)}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c2 + 60 + i * 10, 8)}
          >
            {p}
          </text>
        ))}
        <line
          x1={TX}
          y1={TY + RH * 4.6}
          x2={TX + CW * 5}
          y2={TY + RH * 4.6}
          stroke={alpha(colors.paper, 0.25)}
          strokeWidth={2}
        />
        {row(TY + RH * 5.4, STAY, colors.muted, c1 + 10, "#")}
        <g opacity={fadeOut(frame, c2, 10)}>
          {row(TY + RH * 6.4, GAMMA, colors.highlight, c1 + 50, "Γ")}
        </g>
        {row(TY + RH * 6.4, VIB, colors.green, c2 + 10, "Γ′")}
        <g opacity={fadeIn(frame, c3 + 6, 10)}>
          <Molecule x={300} y={240} s={0.75} mode={0} t={t} />
          <Molecule x={520} y={240} s={0.75} mode={1} t={t} />
          <Molecule x={410} y={500} s={0.75} mode={2} t={t} />
          {[0, 1, 2].map((i) => (
            <text
              key={i}
              x={[300, 520, 410][i]}
              y={[370, 370, 630][i]}
              textAnchor="middle"
              fill={i < 2 ? colors.green : colors.orange}
              fontSize={30}
              fontWeight={800}
              fontFamily={fonts.body}
            >
              {tx.modes[i]} · {i < 2 ? "A₁" : "B₁"}
            </text>
          ))}
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 20}
          x={160}
          y={680}
          size={36}
          color={colors.muted}
        >
          {tx.stayPut}
        </Chip>
      </div>
      <Chip
        frame={frame}
        at={c4 + 10}
        x={260}
        y={700}
        size={44}
        color={colors.highlight}
      >
        {tx.onlyTraces}
      </Chip>
    </SceneShell>
  );
};
