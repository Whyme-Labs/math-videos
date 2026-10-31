import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Arrow } from "../../s2e01/components/vec";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Paris, 1870: Jordan beside a tall stack of pages, "667 pages".
// Berlin, 1874: Kronecker on the right; a letter flies across, stamped
// "Weierstrass, 1868", and red sparks crackle between them. Then the
// eigen-picture from last episode: two arrows on their lines, and one of
// them fades away, "too few eigenvectors". Last, a deck of cards shears.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const stack = Math.min(1, springIn(frame, c0 + 20, fps, 12));
  const kron = Math.min(1, springIn(frame, c1 + 6, fps, 10));
  const letter = glide(frame, c1 + 30, fps, 24);
  const part1 = fadeOut(frame, c2, 10);
  const lose = glide(frame, c2 + 40, fps, 30);
  const part2 = fadeOut(frame, c3, 10);
  const shear = glide(frame, c3 + 20, fps, 40);
  const O = { x: 960, y: 520 };

  return (
    <SceneShell id="coldOpen">
      <Sfx name="thud" at={c0 + 20} volume={0.3} />
      <Sfx name="pop" at={c1 + 6} volume={0.16} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.12} />
      <Sfx name="scratch" at={c1 + 56} volume={0.24} />
      <Sfx name="pop" at={c2 + 10} volume={0.14} />
      <Sfx name="whoosh" at={c2 + 40} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 20} volume={0.12} />
      <Sfx name="chime" at={c3 + 60} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <Person
            x={420}
            y={780}
            color={colors.highlight}
            size={1.7}
            facing={1}
            beard
          />
          {/* the treatise */}
          <g
            opacity={stack}
            transform={`translate(640 ${lerp(-200, 0, stack)})`}
          >
            {Array.from({ length: 14 }).map((_, k) => (
              <rect
                key={k}
                x={-120 + (k % 2) * 6}
                y={760 - k * 22}
                width={240}
                height={20}
                rx={3}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={2}
              />
            ))}
            <text
              y={420}
              fill={colors.primary}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              {tx.pages}
            </text>
          </g>
          <text
            x={420}
            y={130}
            fill={colors.primary}
            fontSize={52}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 4)}
          >
            {tx.paris}
          </text>
          <text
            x={420}
            y={480}
            fill={colors.highlight}
            fontSize={38}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 14)}
          >
            {tx.jordan}
          </text>
          {/* Kronecker, and the letter */}
          <g opacity={kron}>
            <Person
              x={1500}
              y={780}
              color={colors.orange}
              size={1.5}
              facing={-1}
              glasses
            />
            <text
              x={1500}
              y={130}
              fill={colors.primary}
              fontSize={52}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {tx.berlin}
            </text>
            <text
              x={1500}
              y={500}
              fill={colors.orange}
              fontSize={38}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.kronecker}
            </text>
          </g>
          <g
            opacity={letter > 0 ? 1 : 0}
            transform={`translate(${lerp(1400, 900, letter)} ${lerp(420, 300, letter) - 80 * Math.sin(Math.PI * letter)}) rotate(${lerp(10, -6, letter)})`}
          >
            <rect
              x={-180}
              y={-60}
              width={360}
              height={110}
              rx={6}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={3}
            />
            <text
              y={10}
              fill={colors.ink}
              fontSize={30}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.weierstrass}
            </text>
          </g>
          <g
            opacity={fadeIn(frame, c1 + 56, 4)}
            stroke={colors.red}
            strokeWidth={6}
            fill="none"
          >
            {[0, 1, 2].map((k) => (
              <path
                key={k}
                d={`M ${880 + k * 60} ${560 + ((frame + k * 5) % 10)} l 20 -30 l 10 24 l 20 -30`}
              />
            ))}
          </g>
        </svg>
      </AbsoluteFill>

      {/* too few eigenvectors */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) * part2 }}>
        <svg width={1920} height={1080}>
          {[
            { a: 0, c: colors.primary, k: 0 },
            { a: -1.1, c: colors.highlight, k: 1 },
          ].map((l) => (
            <g key={l.k} opacity={l.k ? 1 - lose : 1}>
              <line
                x1={O.x - 400 * Math.cos(l.a)}
                y1={O.y - 400 * Math.sin(l.a)}
                x2={O.x + 400 * Math.cos(l.a)}
                y2={O.y + 400 * Math.sin(l.a)}
                stroke={alpha(l.c, 0.5)}
                strokeWidth={6}
              />
              <Arrow
                from={O}
                to={{
                  x: O.x + 200 * Math.cos(l.a),
                  y: O.y + 200 * Math.sin(l.a),
                }}
                width={14}
                color={l.c}
              />
            </g>
          ))}
          <text
            x={O.x + 260 * Math.cos(-1.1)}
            y={O.y + 260 * Math.sin(-1.1)}
            fill={colors.highlight}
            fontSize={120}
            fontWeight={900}
            opacity={lose}
          >
            ?
          </text>
          <text
            x={O.x}
            y={820}
            fill={colors.red}
            fontSize={52}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c2 + 60)}
          >
            {tx.tooFew}
          </text>
        </svg>
      </AbsoluteFill>

      {/* a deck of cards, sheared */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 16 }).map((_, k) => (
            <rect
              key={k}
              x={760 + k * 18 * shear}
              y={720 - k * 30}
              width={400}
              height={26}
              rx={5}
              fill={k % 2 ? colors.paper : alpha(colors.paper, 0.85)}
              stroke={colors.ink}
              strokeWidth={2}
            />
          ))}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
