import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Person } from "../../s1e14/components/study";
import { useStrings } from "../i18n";

// The story. Dublin, 16 October 1843: Hamilton and his wife walk along the
// Royal Canal, the water sliding past. Over his head, failed triples
// (a, b, c) × (d, e, f) = ? flicker and cross out. They reach the arch of
// Broom Bridge; he stops, the camera pushes in on the stone, and the rule
// is chiselled in letter by letter, chips flying. Then "ij ≠ ji" lands.

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3] = cues;
  const walk = ramp(frame, c0, c2 + 20 - c0);
  const walkX = lerp(200, 760, walk);
  const walking = frame < c2 + 20;
  const triedAt = (k: number) => c1 + 10 + k * 40;
  const push = glide(frame, c2 + 30, fps, 30);
  const carve = typed(tx.carving, frame, c2 + 50, fps, 10);
  const big = Math.min(1, springIn(frame, c3 + 20, fps, 10));
  const BRIDGE = { x: 1380, y: 640 };

  return (
    <SceneShell id="coldOpen">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="scratch" at={triedAt(k) + 20} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c2 + 30} volume={0.14} />
      {Array.from({ length: 8 }).map((_, k) => (
        <Sfx key={`c${k}`} name="tick" at={c2 + 50 + k * 9} volume={0.14} />
      ))}
      <Sfx name="thud" at={c3 + 20} volume={0.4} />
      <Sfx name="chime" at={c3 + 30} />

      <Camera
        zoom={lerp(1, 1.7, push)}
        x={lerp(0, BRIDGE.x - 960, push)}
        y={lerp(0, BRIDGE.y - 160 - 540, push)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the canal */}
          <rect
            x={-400}
            y={700}
            width={2800}
            height={160}
            fill={alpha(colors.bgGlow, 0.9)}
          />
          {Array.from({ length: 14 }).map((_, k) => (
            <line
              key={k}
              x1={((k * 230 - frame * 2) % 2600) - 300}
              y1={740 + (k % 3) * 36}
              x2={((k * 230 - frame * 2) % 2600) - 220}
              y2={740 + (k % 3) * 36}
              stroke={alpha(colors.paper, 0.35)}
              strokeWidth={4}
              strokeLinecap="round"
            />
          ))}
          <rect
            x={-400}
            y={680}
            width={2800}
            height={24}
            fill={colors.wood}
            opacity={0.7}
          />
          {/* Broom Bridge */}
          <path
            d={`M ${BRIDGE.x - 330} 700 L ${BRIDGE.x - 330} 400 L ${BRIDGE.x + 330} 400 L ${BRIDGE.x + 330} 700 L ${BRIDGE.x + 220} 700 A 220 200 0 0 0 ${BRIDGE.x - 220} 700 Z`}
            fill={colors.muted}
            stroke={colors.ink}
            strokeWidth={6}
            opacity={fadeIn(frame, c0 + 30)}
          />
          {/* the stone where he carves */}
          <rect
            x={BRIDGE.x - 290}
            y={420}
            width={580}
            height={110}
            rx={8}
            fill={alpha(colors.paper, 0.85)}
            stroke={colors.ink}
            strokeWidth={4}
            opacity={fadeIn(frame, c0 + 30)}
          />
          <text
            x={BRIDGE.x}
            y={492}
            fill={colors.ink}
            fontSize={46}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            {carve}
          </text>
          {/* chips flying while he carves */}
          {frame >= c2 + 50 && frame < c2 + 130
            ? Array.from({ length: 6 }).map((_, k) => {
                const t = ((frame - c2 - 50 + k * 7) % 20) / 20;
                return (
                  <circle
                    key={k}
                    cx={
                      BRIDGE.x -
                      200 +
                      (carve.length / tx.carving.length) * 400 +
                      t * (k - 3) * 30
                    }
                    cy={470 - t * 60 + t * t * 80}
                    r={5}
                    fill={colors.paper}
                    opacity={1 - t}
                  />
                );
              })
            : null}
          {/* Hamilton and his wife */}
          <Person
            x={walkX}
            y={680}
            color={colors.orange}
            size={1.8}
            facing={1}
            bob={walking ? frame / 4 : 0}
          />
          <Person
            x={walkX - 150}
            y={680}
            color={colors.highlight}
            size={1.7}
            facing={1}
            bob={walking ? frame / 4 + 1 : 0}
          />
          <text
            x={walkX}
            y={400}
            fill={colors.orange}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 20) * fadeOut(frame, c1, 8)}
          >
            {tx.hamilton}
          </text>
          {/* the triples that never worked */}
          {[0, 1, 2].map((k) => (
            <g
              key={k}
              opacity={
                fadeIn(frame, triedAt(k), 6) *
                fadeOut(frame, triedAt(k) + 34, 6)
              }
            >
              <text
                x={walkX + 60}
                y={300 - k * 10}
                fill={colors.text}
                fontSize={48}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={700}
              >
                ({["a, b, c", "1, i, j", "x, y, z"][k]}) × (…) = ?
              </text>
              <line
                x1={walkX - 170}
                y1={290 - k * 10}
                x2={walkX + 290}
                y2={280 - k * 10}
                stroke={colors.red}
                strokeWidth={7}
                opacity={fadeIn(frame, triedAt(k) + 20, 4)}
              />
            </g>
          ))}
          <text
            x={BRIDGE.x}
            y={380}
            fill={colors.muted}
            fontSize={30}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c2) * (1 - push)}
          >
            {tx.bridge}
          </text>
          <g
            opacity={big}
            transform={`translate(${BRIDGE.x} 610) scale(${big * 0.7})`}
          >
            <text
              fill={colors.primary}
              fontSize={110}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {tx.ijNotJi}
            </text>
          </g>
        </svg>
      </Camera>

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1, 12),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.dublin}
      </div>
    </SceneShell>
  );
};
