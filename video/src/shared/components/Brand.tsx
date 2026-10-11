import type React from "react";
import { Img, staticFile } from "remotion";
import { colors } from "../theme";

// Whyme Labs brand assets (public/brand), cut out from the official logos.
export const BRAND = {
  mark: staticFile("brand/whyme-mark.png"), // orange → lemon gradient mark
  markWhite: staticFile("brand/whyme-mark-white.png"),
  wordmarkWhite: staticFile("brand/whyme-wordmark-white.png"),
};

// Aspect ratios of the cut-outs (width / height).
const MARK_RATIO = 2000 / 1801;
const WORDMARK_RATIO = 2000 / 252;

export const BrandMark: React.FC<{
  readonly height: number;
  readonly style?: React.CSSProperties;
}> = ({ height, style }) => (
  <Img
    src={BRAND.mark}
    style={{ height, width: height * MARK_RATIO, ...style }}
  />
);

export const BrandWordmark: React.FC<{
  readonly height: number;
  readonly style?: React.CSSProperties;
}> = ({ height, style }) => (
  <Img
    src={BRAND.wordmarkWhite}
    style={{ height, width: height * WORDMARK_RATIO, ...style }}
  />
);

// Small corner watermark shown in every content scene.
export const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 30,
      left: 40,
      display: "flex",
      alignItems: "center",
      gap: 14,
      opacity: 0.85,
    }}
  >
    <BrandMark height={46} />
    <BrandWordmark height={20} />
  </div>
);

// End-card sign-off: mark, wordmark, and the series line under it.
export const SignOff: React.FC<{
  readonly line: string;
  readonly style?: React.CSSProperties;
}> = ({ line, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      marginTop: 30,
      ...style,
    }}
  >
    <BrandMark height={70} />
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <BrandWordmark height={30} />
      <span
        style={{
          fontSize: 24,
          letterSpacing: 4,
          color: colors.muted,
          textTransform: "uppercase",
        }}
      >
        {line}
      </span>
    </div>
  </div>
);
