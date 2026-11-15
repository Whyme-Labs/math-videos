import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path } from "../components/draw";
import { useStrings } from "../i18n";

// Chinese edition only. 《礼记·学记》 on striking a bell. The book and
// the first line (c0). The bell on the left; a small strike and a small
// ring, then a big strike and a big ring, with the sound traced on the
// right (c1). The strike as a spike δ and the sound as its response, a
// decaying wave (c2). Two strikes at different times; their responses and
// the sum, in lemon (c3).

const BX = 420;
const BY = 470;
const G = (t: number) => (t < 0 ? 0 : Math.exp(-t * 1.6) * Math.sin(14 * t));
const RX = (t: number) => 860 + 900 * (t / 3);
const RY = (v: number) => 470 - 140 * v;

export const Bell: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("bell");
  const [c0, c1, c2, c3] = cues;
  const small = c1 + 10;
  const big = c1 + 70;
  const amp =
    frame < big
      ? 0.35 * Math.exp(-Math.max(0, frame - small) / 25)
      : 1 * Math.exp(-(frame - big) / 25);
  const ring = frame >= small ? amp : 0;
  const sumMode = frame >= c3 + 6;
  const resp = (t: number) =>
    sumMode
      ? 0.6 * G(t - 0.3) + 0.9 * G(t - 1.3)
      : frame >= big
        ? G(t - 0.3)
        : 0.35 * G(t - 0.3);

  return (
    <SceneShell id="bell">
      <Sfx name="page" at={c0 + 6} volume={0.16} />
      <Sfx name="ding" at={small} volume={0.1} />
      <Sfx name="ding" at={big} volume={0.3} />
      <Sfx name="pop" at={c2 + 8} volume={0.12} />
      <Sfx name="ding" at={c3 + 8} volume={0.18} />
      <Sfx name="ding" at={c3 + 30} volume={0.24} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fadeIn(frame, c1 + 2, 8)}>
          {[1, 2, 3].map((k) => (
            <circle
              key={k}
              cx={BX}
              cy={BY + 40}
              r={170 + k * 40 + 20 * Math.sin(frame * 0.3 + k)}
              fill="none"
              stroke={alpha(colors.primary, ring * (1 - k * 0.25))}
              strokeWidth={5}
            />
          ))}
          <path
            d={`M ${BX - 120} ${BY + 140} Q ${BX - 120} ${BY - 140} ${BX} ${BY - 150} Q ${BX + 120} ${BY - 140} ${BX + 120} ${BY + 140} Z`}
            fill={alpha(colors.wood, 0.75)}
            stroke={colors.paper}
            strokeWidth={5}
            transform={`rotate(${6 * ring * Math.sin(frame * 0.8)} ${BX} ${BY - 150})`}
          />
          <line
            x1={BX}
            y1={BY - 150}
            x2={BX}
            y2={BY - 210}
            stroke={colors.paper}
            strokeWidth={6}
          />
        </g>
        <g opacity={fadeIn(frame, c1 + 6, 8)}>
          <line
            x1={RX(0)}
            y1={RY(0)}
            x2={RX(3)}
            y2={RY(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(resp, 0, 3, RX, RY, 500)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
          />
          {sumMode && (
            <>
              <path
                d={path((t) => 0.6 * G(t - 0.3), 0, 3, RX, RY, 400)}
                fill="none"
                stroke={alpha(colors.orange, 0.6)}
                strokeWidth={3}
              />
              <path
                d={path((t) => 0.9 * G(t - 1.3), 0, 3, RX, RY, 400)}
                fill="none"
                stroke={alpha(colors.green, 0.6)}
                strokeWidth={3}
              />
            </>
          )}
          {(sumMode ? [0.3, 1.3] : [0.3]).map((t, i) => (
            <line
              key={t}
              x1={RX(t)}
              y1={RY(0)}
              x2={RX(t)}
              y2={RY(sumMode ? [0.6, 0.9][i] * 1.6 : frame >= big ? 1.6 : 0.56)}
              stroke={colors.highlight}
              strokeWidth={6}
              opacity={fadeIn(frame, c2 + 6, 8)}
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.bellTitle}
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 200,
          fontSize: 46,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 4),
        }}
      >
        {tx.bellQuote}
      </div>
      <div
        style={{
          position: "absolute",
          top: 650,
          left: 860,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.highlight,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, c2 + 10),
        }}
      >
        δ ↦ G
        <span
          style={{ color: colors.primary, opacity: fadeIn(frame, c3 + 30) }}
        >
          {"  "}· aδₛ + bδᵣ ↦ aGₛ + bGᵣ
        </span>
      </div>
    </SceneShell>
  );
};
