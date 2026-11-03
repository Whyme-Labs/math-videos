# S2E22 narration script

Voiceover script for *Measure: How Big Is a Set?*, generated from `src/s2e22/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e22-measure-spaces-and-lebesgue.md`.

## Cold open: a random fraction, and the Cantor set

1. Pick a number between 0 and 1, completely at random.
2. What's the chance it's a fraction?
3. Fractions are everywhere. Zoom anywhere: they swarm.
4. The chance is zero. Not small. Zero.
5. Stranger still: delete the middle third of [0, 1].
6. From each piece, delete the middle third. Forever.
7. You remove total length 1. As many points as ℝ remain.
8. Counting and measuring are different questions.

## Title

1. Season two, episode twenty-two. Measure.

## Dirichlet's function breaks Riemann

1. Riemann integrates by cutting the x-axis into strips.
2. Dirichlet's function: 1 on fractions, 0 everywhere else.
3. Every strip, however thin, holds both. Upper 1, lower 0.
4. No integral, though it's a limit of integral-0 functions.
5. The Riemann integral can't take limits.

## What size should mean

1. So what should size mean? Intervals keep their length.
2. Sliding a set along doesn't change its size.
3. Countably many separate pieces: their sizes add.
4. Countably, because limits come one step at a time.

## The fractions have size zero

1. Now the fractions. List them: q₁, q₂, q₃, …
2. Cover q₁ by an interval of length ε/2.
3. q₂ by ε/4, q₃ by ε/8, and so on.
4. Total length at most ε, however small ε is.
5. So the fractions have size zero.

## The Cantor set

1. The Cantor set: 2ⁿ pieces, each 3⁻ⁿ long.
2. Removed: ⅓ + 2/9 + 4/27 + … = 1.
3. What's left: base-3 numbers using only 0s and 2s.
4. Turn each 2 into a 1: every binary number appears.
5. Size zero, yet as many points as [0, 1].

## A set with no size

1. Can every set be given a size? No.
2. Call x and y friends if x − y is a fraction.
3. Choose one from each group of friends. That's the set V.
4. Slide V by every fraction in [−1, 1]: separate copies.
5. They cover [0, 1] and fit in [−1, 2]. No size works.

## Slice the heights

1. Lebesgue's idea: slice the heights, not the x-axis.
2. Like counting coins: sort by value, then count each pile.
3. For each height t, measure where f is above t.
4. Add over all heights. For x², that gives ⅓.
5. Dirichlet's function: 1 × size of the fractions = 0.
6. And now limits and integrals can swap.

## Almost everywhere

1. Two functions that differ on a size-zero set…
2. …like x, and x plus Dirichlet's function…
3. …are at distance 0. In L¹ they're the same element.
4. So an element of L¹ has no value at a single point.

## Probability is measure

1. Probability runs on this. Kolmogorov, 1933.
2. Events are measurable sets; chance is their size.
3. A random fraction: probability 0, yet it can happen.
4. An expected value is an integral.

## End card

1. Size is a measure, and it has to be chosen with care.
2. Countable sets are tiny. Some sets can't be sized at all.
3. Next: complete spaces. Filling in the holes.
