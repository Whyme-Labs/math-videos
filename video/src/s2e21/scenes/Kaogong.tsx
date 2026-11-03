import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《周礼·考工记·轮人》 on testing a wheel: 规之以眡其
// 圜也，萬之以眡其匡也，县之以眡其辐之直也，水之以眡其平沈之均也，……权之以眡
// 其轻重之侔也. A wheel turns (c0). The tests in turn, each drawn over the
// wheel as it lights: a compass circle for roundness, a straight edge for
// flatness, a plumb line for straight spokes (c1), floating in water for
// even sinking, a balance for even weight (c2). Each test gives the same
// wheel its own score bar, all different: several rulers for one object
// (c3).

const W = { x: 560, y: 470, r: 200 };

export const Kaogong: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("kaogong");
  const [c0, c1, c2, c3] = cues;
  const rot = (frame - c0) * 0.6;
  const at = [c1 + 6, c1 + 40, c1 + 74, c2 + 10, c2 + 50];
  const k = at.filter((a) => frame >= a).length - 1;
  const scores = [0.82, 0.64, 0.9, 0.55, 0.73];
  const bars = glide(frame, c3 + 6, fps, 24);

  return (
    <SceneShell id="kaogong">
      {at.map((a, i) => (
        <Sfx key={i} name="tick" at={a} volume={0.12} />
      ))}
      <Sfx name="pluck3" at={c3 + 6} volume={0.14} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          transform={`translate(${W.x} ${W.y}) rotate(${rot})`}
          opacity={fadeIn(frame, c0 + 4, 10)}
        >
          <circle r={W.r} fill="none" stroke={colors.wood} strokeWidth={22} />
          <circle r={36} fill={colors.wood} />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={W.r * Math.cos((i * Math.PI) / 6)}
              y2={W.r * Math.sin((i * Math.PI) / 6)}
              stroke={colors.wood}
              strokeWidth={8}
            />
          ))}
        </g>
        {k === 0 ? (
          <circle
            cx={W.x}
            cy={W.y}
            r={W.r + 24}
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
        ) : null}
        {k === 1 ? (
          <line
            x1={W.x - 260}
            y1={W.y + W.r + 14}
            x2={W.x + 260}
            y2={W.y + W.r + 14}
            stroke={colors.green}
            strokeWidth={6}
          />
        ) : null}
        {k === 2 ? (
          <g>
            <line
              x1={W.x}
              y1={W.y - W.r - 80}
              x2={W.x}
              y2={W.y + W.r + 40}
              stroke={colors.green}
              strokeWidth={4}
            />
            <circle cx={W.x} cy={W.y + W.r + 50} r={14} fill={colors.green} />
          </g>
        ) : null}
        {k === 3 ? (
          <rect
            x={W.x - 300}
            y={W.y + 40}
            width={600}
            height={W.r}
            fill={alpha(colors.primary, 0.2)}
            stroke={colors.primary}
            strokeWidth={3}
          />
        ) : null}
        {k === 4 ? (
          <g stroke={colors.green} strokeWidth={6} fill="none">
            <line
              x1={W.x - 260}
              y1={W.y - W.r - 40}
              x2={W.x + 260}
              y2={W.y - W.r - 40}
            />
            <line x1={W.x} y1={W.y - W.r - 40} x2={W.x} y2={W.y - W.r - 110} />
          </g>
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.kaogong}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {tx.tests.map((t, i) => (
          <div
            key={t}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: fadeIn(frame, at[i], 8),
              translate: riseIn(frame, at[i], 12),
            }}
          >
            <div
              style={{
                width: 240,
                padding: "8px 0",
                textAlign: "center",
                borderRadius: 14,
                border: `4px solid ${i === k ? colors.green : alpha(colors.paper, 0.4)}`,
                background: alpha(colors.bg, 0.85),
                fontSize: 42,
                fontWeight: 800,
                color: i === k ? colors.green : colors.text,
              }}
            >
              {t}
            </div>
            <div
              style={{
                width: 400 * scores[i] * bars,
                height: 34,
                borderRadius: 8,
                background: [
                  colors.primary,
                  colors.green,
                  colors.highlight,
                  colors.orange,
                  colors.wood,
                ][i],
              }}
            />
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
