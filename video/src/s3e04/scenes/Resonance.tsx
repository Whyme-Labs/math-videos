import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. 《庄子·徐无鬼》: two se zithers tuned alike, one in
// the hall and one in the room (c0). Pluck 宫 on one, and only 宫 on the
// other moves (c1). Pluck 角, and only 角 answers (c2). A Fourier
// coefficient is that resonance: the signal measured against one character
// (c3).

const STR = (i: number) => 330 + i * 64;
const ZX = [170, 1050];
const ZW = 700;

export const Resonance: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("resonance");
  const [c0, c1, c2, c3] = cues;
  // which string is sounding, and since when
  const pluck = (f: number) =>
    f >= c2 + 10 ? [2, c2 + 10] : f >= c1 + 10 ? [0, c1 + 10] : [-1, 0];
  const [note, t0] = pluck(frame);
  const amp = (side: number, i: number) => {
    if (i !== note) return 0;
    const dt = frame - t0 - (side ? 14 : 0);
    if (dt < 0) return 0;
    return (side ? 20 : 27) * Math.exp(-dt / 140) * Math.min(1, dt / 6);
  };

  return (
    <SceneShell id="resonance">
      <Sfx name="page" at={c0 + 4} volume={0.16} />
      <Sfx name="pluck1" at={c1 + 10} volume={0.22} />
      <Sfx name="pluck1" at={c1 + 24} volume={0.1} />
      <Sfx name="pluck3" at={c2 + 10} volume={0.22} />
      <Sfx name="pluck3" at={c2 + 24} volume={0.1} />
      <Sfx name="chime" at={c3 + 20} volume={0.22} />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 170,
          fontSize: 44,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.rsTitle}
        <span style={{ color: colors.text, marginLeft: 30 }}>{tx.rsQuote}</span>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {ZX.map((x0, side) => (
          <g key={side} opacity={fadeIn(frame, c0 + 20 + side * 10, 10)}>
            <rect
              x={x0}
              y={280}
              width={ZW}
              height={360}
              rx={40}
              fill={alpha(colors.wood, 0.18)}
              stroke={colors.wood}
              strokeWidth={6}
            />
            <text
              x={x0 + ZW / 2}
              y={700}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={40}
              fontWeight={800}
              fontFamily={fonts.body}
            >
              {side ? tx.rsRoom : tx.rsHall}
            </text>
            {tx.rsNotes.map((n, i) => {
              const A = amp(side, i);
              const ph = frame * 1.3;
              const d = Array.from({ length: 41 }, (_, k) => {
                const u = k / 40;
                const y =
                  STR(i) + A * Math.sin(Math.PI * u) * Math.sin(ph + side);
                return `${k ? "L" : "M"} ${x0 + 90 + u * (ZW - 140)} ${y}`;
              }).join(" ");
              const on = A > 0.5;
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke={on ? colors.primary : alpha(colors.paper, 0.7)}
                    strokeWidth={on ? 5 : 3}
                  />
                  <text
                    x={x0 + 50}
                    y={STR(i) + 14}
                    textAnchor="middle"
                    fill={on ? colors.primary : colors.muted}
                    fontSize={36}
                    fontWeight={800}
                    fontFamily={fonts.body}
                  >
                    {n}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <Chip
        frame={frame}
        at={c3 + 10}
        x={560}
        y={740}
        size={42}
        color={colors.highlight}
      >
        {tx.rsCoef}
      </Chip>
    </SceneShell>
  );
};
