# S2E32 narration script

Voiceover script for *Measure-Preserving Systems*, generated from `src/s2e32/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e32-measure-preserving-systems.md`.

## Cold open: stirring coffee

1. Stir cream into coffee. The swirl is pure chaos.
2. Two drops a hair apart end up across the cup.
3. But stirring never makes or destroys coffee.
4. Every region keeps its area, however it's stretched.
5. Poincaré: almost every drop comes back near its start.
6. And the cream can spread out perfectly evenly.
7. Koopman: stop following drops. Follow measurements.
8. Chaos on points becomes a linear map on functions.

## Title

1. Season two, episode thirty-two. Chaos, made linear.

## The doubling map

1. The doubling map: x ↦ 2x mod 1.
2. In binary, it just deletes the first digit.
3. Every step, the digits slide one place left.
4. Two points agreeing to 50 digits split after 50 steps.
5. Deterministic, yet unpredictable. So ask about averages.

## Measure-preserving maps

1. Measure-preserving: μ(T⁻¹A) = μ(A) for every set A.
2. Rotation by α: a shifted arc has the same length.
3. Doubling: an arc's preimage is two half-arcs. Same sum.
4. Forward images can grow; preimages keep the measure.
5. Cat map (2x + y, x + y) mod 1: det 1, area kept.
6. It stretches by 2.618 and squeezes by 0.382.

## Poincaré recurrence

1. Poincaré recurrence: almost every point of A returns.
2. Let B be the points of A that never come back.
3. B, T⁻¹B, T⁻²B, … are disjoint, all the same size.
4. Infinitely many equal pieces fit in measure 1 only if 0.
5. So μ(B) = 0. The cream comes back.

## The Koopman operator

1. Koopman, 1931: Uf = f ∘ T, the reading one step later.
2. U is linear, however wild T is.
3. If T preserves measure, U is an isometry: ‖Uf‖ = ‖f‖.
4. Doubling sends each tone eₖ to e₂ₖ.
5. Odd tones are never hit: an isometry, not onto.
6. The right shift from Episode 31, hiding in chaos.

## Ergodicity and mixing as spectrum

1. U1 = 1: constants are always invariant.
2. Ergodic: no invariant set except null or full.
3. Ergodic ⟺ the eigenvalue 1 is simple.
4. Rotation: every tone eₖ is an eigenvector of U.
5. α irrational: only k = 0 is fixed, so it's ergodic.
6. Mixing kills eigenvectors: the spectrum goes continuous.

## The mean ergodic theorem

1. Von Neumann: average f, Uf, U²f, …, Uᴺ⁻¹f.
2. Split H: invariant vectors, and differences Ug − g.
3. On invariant vectors, averaging changes nothing.
4. On Ug − g it telescopes: (Uᴺg − g)/N → 0.
5. So averages → the projection. Ergodic: the mean of f.

## Weyl equidistribution

1. Weyl: the points nα mod 1 fill the circle evenly.
2. The share landing in [a, b] tends to b − a.
3. Each tone averages to 0: a geometric series.
4. Order and chaos, read off one operator's spectrum.

## End card

1. Stirring is chaos. On functions, it's an isometry.
2. Recurrence, ergodicity, mixing: all spectral facts.
3. Next, the finale: distributions.
