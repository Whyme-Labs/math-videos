import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// The Banach limit. Bars 1, 0, 1, 0, … and their running average
// settling on ½ (c0). A sequence of growing blocks of 1s and 0s whose
// average keeps swinging; a dashed ceiling at the top of the swings is
// p(x) (c1). Nested boxes: convergent sequences inside bounded ones, lim
// extended to L with L ≤ p (c2). Rows of cells: x, its shift Sx sliding
// in one step, and their sum 1, 1, 1, … (c3). L(x) = ½; then period
// three with x, Sx, S²x summing to 1s and L(x) = ⅓ (c4). A locked box:
// no formula (c5).

const N = 36;
const PX = 160;
const PW = 1100;
const PY = 700;
const PH = 380;
const bx = (n: number) => PX + (PW * n) / N;
const BLOCKS = [1, 2, 3, 5, 8, 13, 21];
const blockSeq = (() => {
  const s: number[] = [];
  BLOCKS.forEach((len, i) => {
    for (let k = 0; k < len; k++) s.push(i % 2 ? 0 : 1);
  });
  return s.slice(0, N);
})();

const CELLS = 14;
const CW = 70;
const RX = 220;

export const BanachLimit: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("banachLimit");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const second = frame >= c1;
  const seq = second
    ? blockSeq
    : Array.from({ length: N }, (_, n) => (n % 2 ? 0 : 1));
  const from = second ? c1 : c0;
  const shown = Math.min(N, Math.max(0, Math.floor((frame - from - 4) / 2)));
  const means: number[] = [];
  let sum = 0;
  for (let n = 0; n < N; n++) {
    sum += seq[n];
    means.push(sum / (n + 1));
  }
  const ceiling = Math.max(...means.slice(8));
  const part1 = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c3, 10);
  const dim1 = 1 - 0.7 * fadeIn(frame, c2, 10);
  const part2 = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c5, 10);
  const part3 = fadeIn(frame, c5 + 4, 10);
  const period = frame >= c4 + 40 ? 3 : 2;
  const slide = glide(frame, period === 2 ? c3 + 14 : c4 + 44, fps, 18);
  const rows = period;
  const rattle = shake(frame, c5 + 30, 10);

  return (
    <SceneShell id="banachLimit">
      {Array.from({ length: 12 }, (_, k) => (
        <Sfx key={k} name="tick" at={c0 + 4 + k * 2} volume={0.06} />
      ))}
      <Sfx name="pluck2" at={c1 + 6} volume={0.14} />
      <Sfx name="ding" at={c1 + 80} volume={0.2} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c2 + 30} volume={0.1} />
      <Sfx name="whoosh" at={c3 + 14} volume={0.1} />
      <Sfx name="ding" at={c3 + 40} volume={0.22} />
      <Sfx name="chime" at={c4 + 8} volume={0.26} />
      <Sfx name="whoosh" at={c4 + 44} volume={0.1} />
      <Sfx name="ding" at={c4 + 70} volume={0.22} />
      <Sfx name="clink" at={c5 + 30} volume={0.2} />

      <AbsoluteFill style={{ opacity: part1 * dim1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={PX}
            y1={PY}
            x2={PX + PW}
            y2={PY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          {Array.from({ length: shown }, (_, n) => (
            <rect
              key={`${second}-${n}`}
              x={bx(n) + 4}
              y={PY - PH * seq[n]}
              width={PW / N - 8}
              height={PH * seq[n]}
              fill={alpha(colors.primary, 0.55)}
            />
          ))}
          <path
            d={means
              .slice(0, shown)
              .map((m, n) => `${n ? "L" : "M"} ${bx(n + 0.5)} ${PY - PH * m}`)
              .join(" ")}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
          />
          {!second && (
            <g opacity={fadeIn(frame, c0 + 70, 10)}>
              <line
                x1={PX}
                y1={PY - PH / 2}
                x2={PX + PW}
                y2={PY - PH / 2}
                stroke={colors.green}
                strokeWidth={4}
                strokeDasharray="14 10"
              />
              <text
                x={PX + PW + 20}
                y={PY - PH / 2 + 16}
                fill={colors.green}
                fontSize={52}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                ½
              </text>
            </g>
          )}
          {second && (
            <g opacity={fadeIn(frame, c1 + 80, 10)}>
              <line
                x1={PX}
                y1={PY - PH * ceiling}
                x2={PX + PW}
                y2={PY - PH * ceiling}
                stroke={colors.orange}
                strokeWidth={5}
                strokeDasharray="14 10"
              />
              <text
                x={PX + PW + 20}
                y={PY - PH * ceiling + 16}
                fill={colors.orange}
                fontSize={48}
                fontFamily={fonts.math}
                fontWeight={800}
              >
                p(x)
              </text>
            </g>
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: PX,
            fontSize: 40,
            fontWeight: 700,
            color: colors.highlight,
          }}
        >
          {tx.averages}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part1 * fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <rect
            x={1060}
            y={220}
            width={720}
            height={500}
            rx={28}
            fill={alpha(colors.bg, 0.85)}
            stroke={colors.paper}
            strokeWidth={4}
          />
          <rect
            x={1120}
            y={420}
            width={300}
            height={240}
            rx={22}
            fill={alpha(colors.green, 0.15)}
            stroke={colors.green}
            strokeWidth={4}
          />
          <path
            d="M 1430 540 Q 1560 540 1620 420"
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            strokeDasharray={`${400 * glide(frame, c2 + 30, fps, 20)} 400`}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 1090,
            fontSize: 40,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          ℓ∞ · {tx.bounded}
        </div>
        <div
          style={{
            position: "absolute",
            top: 440,
            left: 1140,
            fontSize: 36,
            fontWeight: 700,
            color: colors.green,
          }}
        >
          c · {tx.convergent}
        </div>
        <div
          style={{
            position: "absolute",
            top: 540,
            left: 1160,
            fontFamily: fonts.math,
            fontSize: 48,
            fontWeight: 800,
            color: colors.green,
          }}
        >
          lim
        </div>
        <div
          style={{
            position: "absolute",
            top: 330,
            left: 1560,
            fontFamily: fonts.math,
            fontSize: 52,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c2 + 46),
            whiteSpace: "nowrap",
          }}
        >
          L ≤ p
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: rows + 1 }, (_, r) => {
            const isSum = r === rows;
            const y = 230 + r * 110 + (isSum ? 30 : 0);
            const shift = isSum ? 0 : r * slide;
            return (
              <g key={`${period}-${r}`}>
                {isSum && (
                  <line
                    x1={RX}
                    y1={y - 26}
                    x2={RX + CELLS * CW}
                    y2={y - 26}
                    stroke={alpha(colors.paper, 0.6)}
                    strokeWidth={4}
                  />
                )}
                {Array.from({ length: CELLS + 3 }, (_, k) => {
                  const idx = k + (isSum ? 0 : r);
                  const v = isSum ? 1 : idx % period === 0 ? 1 : 0;
                  const x = RX + (k + (isSum ? 0 : r) - shift) * CW;
                  if (x < RX - 1 || x > RX + (CELLS - 1) * CW + 1) return null;
                  return (
                    <rect
                      key={k}
                      x={x + 4}
                      y={y}
                      width={CW - 8}
                      height={70}
                      rx={10}
                      fill={
                        v
                          ? isSum
                            ? colors.green
                            : colors.primary
                          : alpha(colors.paper, 0.08)
                      }
                      stroke={alpha(colors.paper, 0.3)}
                      strokeWidth={2}
                      opacity={
                        isSum
                          ? fadeIn(frame, (period === 2 ? c3 : c4 + 44) + 30, 8)
                          : 1
                      }
                    />
                  );
                })}
                <text
                  x={RX - 24}
                  y={y + 50}
                  textAnchor="end"
                  fill={colors.text}
                  fontSize={40}
                  fontFamily={fonts.math}
                  fontWeight={800}
                >
                  {isSum ? "Σ" : ["x", "Sx", "S²x"][r]}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 230,
            left: 1290,
            fontFamily: fonts.math,
            fontSize: 56,
            fontWeight: 800,
            color: colors.green,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ opacity: fadeIn(frame, c3 + 40) }}>
            {period === 2 ? "L(x) + L(Sx) = 1" : "3 L(x) = 1"}
          </div>
          <div
            style={{
              marginTop: 30,
              color: colors.primary,
              opacity:
                period === 2 ? fadeIn(frame, c4 + 8) : fadeIn(frame, c4 + 70),
            }}
          >
            L(x) = {period === 2 ? "½" : "⅓"}
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${960 + rattle} 500)`}>
            <path
              d="M -80 -90 L -80 -160 A 80 80 0 0 1 80 -160 L 80 -90"
              fill="none"
              stroke={colors.paper}
              strokeWidth={20}
            />
            <rect
              x={-200}
              y={-90}
              width={400}
              height={260}
              rx={24}
              fill={colors.wood}
              stroke={colors.paper}
              strokeWidth={6}
            />
            <circle cx={0} cy={10} r={28} fill={colors.ink} />
            <rect x={-10} y={10} width={20} height={80} fill={colors.ink} />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 1240,
            fontFamily: fonts.math,
            fontSize: 60,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          L = ?
        </div>
      </AbsoluteFill>
      <Chip frame={frame} at={c5 + 40} x={1240} y={420} color={colors.red}>
        Zorn · {tx.noFormula}
      </Chip>
    </SceneShell>
  );
};
