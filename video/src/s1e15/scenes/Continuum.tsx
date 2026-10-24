import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { Rulebook } from "../components/world";
import { useStrings } from "../i18n";

// The continuum hypothesis. Two steps of infinity: |ℕ| low on the left, |ℝ|
// high on the right, and a gap between them with a "?" hanging in it. She
// stands on |ℕ| and looks up. Then the picture splits into two universes,
// both obeying the same axioms. In Gödel's (1940) the gap closes: |ℝ| slides
// down to sit right after |ℕ|. In Cohen's (1963) new steps pop up inside
// the gap. Between the two, the rulebook says nothing.

const Stairs: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly s: number;
  readonly close: number; // 0..1 the gap closes (Gödel's universe)
  readonly fill: number; // 0..1 new steps appear (Cohen's universe)
  readonly q: number; // the "?" opacity
  readonly her?: boolean;
  readonly frame: number;
}> = ({ x, y, s, close, fill, q, her = false, frame }) => {
  const rX = lerp(760, 360, close);
  const rY = lerp(-420, -200, close);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* |ℕ| */}
      <rect
        x={0}
        y={-160}
        width={300}
        height={500}
        fill={alpha(colors.violet, 0.8)}
        stroke={colors.primary}
        strokeWidth={5}
      />
      <text
        x={150}
        y={-90}
        fill={colors.primary}
        fontSize={64}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={700}
      >
        |ℕ|
      </text>
      {/* the new steps in between */}
      {[0, 1].map((k) => {
        const t = Math.min(1, Math.max(0, fill * 2 - k));
        return (
          <g key={k} opacity={t} transform={`translate(0 ${(1 - t) * 60})`}>
            <rect
              x={330 + k * 200}
              y={-240 - k * 80}
              width={180}
              height={600}
              fill={alpha(colors.green, 0.5)}
              stroke={colors.green}
              strokeWidth={4}
            />
            <text
              x={420 + k * 200}
              y={-180 - k * 80}
              fill={colors.green}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              {k === 0 ? "ℵ₁" : "ℵ₂"}
            </text>
          </g>
        );
      })}
      {/* |ℝ| */}
      <rect
        x={rX}
        y={rY}
        width={300}
        height={800}
        fill={alpha(colors.violet, 0.8)}
        stroke={colors.primary}
        strokeWidth={5}
      />
      <text
        x={rX + 150}
        y={rY + 70}
        fill={colors.primary}
        fontSize={64}
        textAnchor="middle"
        fontFamily={fonts.math}
        fontWeight={700}
      >
        |ℝ|
      </text>
      {/* the question in the gap */}
      <g
        opacity={q}
        transform={`translate(530 ${-330 + 10 * Math.sin(frame / 10)})`}
      >
        <rect
          x={-70}
          y={-70}
          width={140}
          height={140}
          rx={20}
          fill={alpha(colors.highlight, 0.25)}
          stroke={colors.highlight}
          strokeWidth={5}
          strokeDasharray="14 10"
        />
        <text
          x={0}
          y={34}
          fill={colors.highlight}
          fontSize={110}
          textAnchor="middle"
          fontWeight={800}
        >
          ?
        </text>
      </g>
      {her ? (
        <Person
          x={150}
          y={-160}
          color={colors.highlight}
          size={1.2}
          bob={frame / 20}
          facing={1}
        />
      ) : null}
    </g>
  );
};

export const Continuum: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("continuum");
  const [c0, c1, c2] = cues;
  const build = glide(frame, c0 + 4, fps, 20);
  const split = glide(frame, c1 + 4, fps, 24);
  const close = glide(frame, c1 + 30, fps, 20);
  const fill = glide(frame, c1 + 70, fps, 30);
  const book = Math.min(1, springIn(frame, c2 + 6, fps, 10));

  return (
    <SceneShell id="continuum">
      <Sfx name="thud" at={c0 + 8} volume={0.25} />
      <Sfx name="thud" at={c0 + 18} volume={0.25} />
      <Sfx name="ding" at={c0 + 40} volume={0.2} />
      <Sfx name="whoosh" at={c1 + 4} volume={0.16} />
      <Sfx name="thud" at={c1 + 48} volume={0.3} />
      <Sfx name="pop" at={c1 + 76} volume={0.2} />
      <Sfx name="pop" at={c1 + 92} volume={0.2} />
      <Sfx name="pop" at={c2 + 6} volume={0.2} />
      <Sfx name="chime" at={c2 + 30} />

      <Camera
        zoom={lerp(lerp(1, 1.1, glide(frame, c0, fps, 120)), 1, split)}
        x={0}
        y={lerp(lerp(0, -40, glide(frame, c0, fps, 120)), 0, split)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <g opacity={build}>
            {/* one universe, then two */}
            <g opacity={1 - split}>
              <Stairs
                x={lerp(460, 300, split)}
                y={820}
                s={1}
                close={0}
                fill={0}
                q={fadeIn(frame, c0 + 36)}
                her
                frame={frame}
              />
            </g>
            <g opacity={split}>
              <Stairs
                x={90}
                y={800}
                s={0.7}
                close={close}
                fill={0}
                q={1 - close}
                frame={frame}
              />
              <Stairs
                x={1140}
                y={800}
                s={0.7}
                close={0}
                fill={fill}
                q={1 - fill}
                frame={frame}
              />
              <line
                x1={960}
                y1={120}
                x2={960}
                y2={840}
                stroke={alpha(colors.muted, 0.5)}
                strokeWidth={4}
                strokeDasharray="12 10"
              />
            </g>
          </g>
          {/* the rulebook in the middle, saying nothing */}
          <g
            opacity={book}
            transform={`translate(960 ${lerp(1000, 560, book)})`}
          >
            <Rulebook x={0} y={0} pages={4} title="ZFC" s={1.6} />
            <g transform="translate(180 -270)">
              <rect
                x={0}
                y={-50}
                width={140}
                height={80}
                rx={30}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <text
                x={70}
                y={8}
                fill={colors.ink}
                fontSize={52}
                textAnchor="middle"
                fontWeight={800}
              >
                …
              </text>
            </g>
          </g>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 90,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 52,
          fontWeight: 800,
          color: colors.highlight,
          opacity: fadeIn(frame, c0 + 40) * (1 - split),
        }}
      >
        {tx.cantor}
      </div>
      {[
        { t: tx.godel1940, left: 100, at: c1 + 30 },
        { t: tx.cohen1963, left: 1100, at: c1 + 70 },
      ].map((l) => (
        <div
          key={l.t}
          style={{
            position: "absolute",
            top: 90,
            left: l.left,
            width: 720,
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 48,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, l.at),
            translate: riseIn(frame, l.at, 16),
          }}
        >
          {l.t}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 180,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c2 + 24),
          translate: riseIn(frame, c2 + 24, 16),
        }}
      >
        {tx.silent}
      </div>
    </SceneShell>
  );
};
