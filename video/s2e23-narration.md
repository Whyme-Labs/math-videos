# S2E23 narration script

Voiceover script for *Banach Spaces*, generated from `src/s2e23/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e23-banach-spaces.md`.

## Cold open: polynomials crowding towards eˣ, and √2

1. Some polynomials: 1, then 1 + x, then 1 + x + x²/2…
2. Each adds the next term, xⁿ/n!.
3. On [0, 1], they soon differ by less than a pen line.
4. They're homing in on something: eˣ.
5. But eˣ isn't a polynomial.
6. Among polynomials only, they crowd towards a hole.
7. Season 1 again: 1.4, 1.41, 1.414 crowd towards √2.
8. Today we fill holes in spaces of functions.

## Title

1. Season two, episode twenty-three. Banach spaces.

## Cauchy sequences

1. Terms that crowd together: a Cauchy sequence.
2. Past some point, every two terms are closer than ε.
3. Every convergent sequence is Cauchy.
4. Complete is the converse: crowding always has a target.
5. A complete normed space is a Banach space.

## Which spaces are complete

1. Which spaces are complete?
2. Every finite-dimensional one. ℓᵖ. C[0, 1] by its peak.
3. Not the polynomials: eˣ is missing.
4. Not finite sequences: (1, ½, ¼, …) is missing.
5. Not C[0, 1] with the area norm: a step is missing.

## Why ℓ² is complete

1. Why is ℓ² complete? Take a Cauchy sequence of sequences.
2. Each coordinate alone is a Cauchy sequence of numbers.
3. ℝ is complete, so each coordinate has a limit.
4. Those limits form a sequence x, and x is in ℓ².
5. They converge to x. ℓ² inherits ℝ's completeness.

## Completion

1. Any normed space can be completed. Same recipe as ℝ.
2. Its new points are Cauchy sequences, up to closeness.
3. Polynomials complete to all continuous functions.
4. Finite sequences complete to ℓᵖ.
5. Continuous functions in area complete to L¹.

## Series need completeness

1. Why care? Infinite sums need completeness.
2. If the lengths add up, the sum should exist.
3. In a Banach space, it always does.
4. So e₁, e₂, … become a real basis of ℓ²: infinite sums.
5. Not of ℓ∞: (1, 1, 1, …) always stays 1 away.

## The contraction mapping theorem

1. The payoff: Banach, 1922.
2. A contraction pulls any two points closer, by q < 1.
3. Solve x = cos x: start anywhere and keep applying cos.
4. The steps shrink like qⁿ, so the iterates are Cauchy.
5. Complete, so they land somewhere: 0.739…
6. Exactly one fixed point, and the error drops like qⁿ.

## Picard iteration and PageRank

1. Same trick for differential equations: y′ = y, y(0) = 1.
2. Rewrite it: y = 1 + ∫ y. Iterate.
3. 1, then 1 + t, then 1 + t + t²/2…
4. The cold open's polynomials: Picard lands on eᵗ.
5. PageRank is a contraction too.

## End card

1. Complete spaces have no holes.
2. So limits, series and iterations have somewhere to land.
3. Next: the continuous dual. Measurements we can trust.
