// Characters the title fonts lack, drawn in the math font instead.
export const MATH_CHARS = "√−×÷·∅ℕℤℚℝℂ";
export const splitMath = (line: string) => {
  const parts: { text: string; math: boolean }[] = [];
  for (const ch of line) {
    const math = MATH_CHARS.includes(ch);
    const last = parts[parts.length - 1];
    if (last && last.math === math) last.text += ch;
    else parts.push({ text: ch, math });
  }
  return parts;
};
