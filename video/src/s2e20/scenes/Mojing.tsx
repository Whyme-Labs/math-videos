import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. 《墨经·经说下》: 穷，或不容尺，有穷；莫不容尺，无穷也.
// The quotation in tiles (c0–c1). A segment: rulers are laid end to end
// until the next one doesn't fit; the leftover gap glows: 有穷 (c2). A
// line that runs off the screen: rulers keep being laid and the view
// keeps sliding, there is always room for one more: 无穷 (c3).

const R = 150;

export const Mojing: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("mojing");
  const [c0, c1, c2, c3] = cues;
  const quote = "穷，或不容尺，有穷；莫不容尺，无穷也。";
  const n2 = Math.min(5, Math.floor(Math.max(0, frame - c2 - 6) / 10));
  const fin = fadeIn(frame, c2 + 4, 8) * fadeOut(frame, c3, 8);
  const inf = fadeIn(frame, c3 + 4, 8);
  const n3 = Math.floor(Math.max(0, frame - c3 - 6) / 9);

  const scroll = Math.max(0, (frame - c3 - 50) * (R / 9));

  return (
    <SceneShell id="mojing">
      {quote
        .split("")
        .map((_, i) =>
          i % 3 === 0 ? (
            <Sfx key={i} name="tick" at={c1 + 4 + i * 2} volume={0.06} />
          ) : null,
        )}
      {Array.from({ length: 5 }).map((_, i) => (
        <Sfx key={`r${i}`} name="clink" at={c2 + 6 + i * 10} volume={0.1} />
      ))}
      <Sfx name="thud" at={c2 + 60} volume={0.18} />
      <Sfx name="riser" at={c3 + 6} volume={0.1} />

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
        {tx.mojing}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          display: "flex",
          gap: 6,
        }}
      >
        {quote.split("").map((ch, i) => (
          <div
            key={i}
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: "，；。".includes(ch) ? colors.muted : colors.text,
              opacity: fadeIn(frame, c1 + 4 + i * 2, 6),
            }}
          >
            {ch}
          </div>
        ))}
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={fin}>
          <line
            x1={200}
            y1={560}
            x2={200 + 4.6 * R}
            y2={560}
            stroke={colors.paper}
            strokeWidth={8}
          />
          <line
            x1={200}
            y1={530}
            x2={200}
            y2={590}
            stroke={colors.paper}
            strokeWidth={6}
          />
          <line
            x1={200 + 4.6 * R}
            y1={530}
            x2={200 + 4.6 * R}
            y2={590}
            stroke={colors.paper}
            strokeWidth={6}
          />
          {Array.from({ length: Math.min(4, n2) }).map((_, i) => (
            <rect
              key={i}
              x={200 + i * R + 4}
              y={500}
              width={R - 8}
              height={40}
              rx={6}
              fill={colors.wood}
            />
          ))}
          {n2 >= 5 ? (
            <>
              <rect
                x={200 + 4 * R + 4}
                y={420}
                width={R - 8}
                height={40}
                rx={6}
                fill={alpha(colors.wood, 0.5)}
                stroke={colors.red}
                strokeWidth={4}
              />
              <rect
                x={200 + 4 * R}
                y={540}
                width={0.6 * R}
                height={40}
                fill={alpha(colors.highlight, 0.4)}
              />
            </>
          ) : null}
        </g>
        <g opacity={inf} transform={`translate(${-scroll} 0)`}>
          <line
            x1={200}
            y1={560}
            x2={200 + 60 * R}
            y2={560}
            stroke={colors.paper}
            strokeWidth={8}
          />
          <line
            x1={200}
            y1={530}
            x2={200}
            y2={590}
            stroke={colors.paper}
            strokeWidth={6}
          />
          {Array.from({ length: n3 }).map((_, i) => (
            <rect
              key={i}
              x={200 + i * R + 4}
              y={500}
              width={R - 8}
              height={40}
              rx={6}
              fill={colors.wood}
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 200,
          fontSize: 56,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fin * fadeIn(frame, c2 + 60, 8),
        }}
      >
        {tx.youqiong}
      </div>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 200,
          fontSize: 56,
          fontWeight: 800,
          color: colors.green,
          opacity: inf * fadeIn(frame, c3 + 40, 8),
        }}
      >
        {tx.wuqiong} →
      </div>
    </SceneShell>
  );
};
