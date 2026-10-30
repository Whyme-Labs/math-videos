# S2E07 narration script

Voiceover script for *Functionals Everywhere*, generated from `src/s2e07/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e07-functionals-everywhere.md`.

## Cold open: Linz, 1613

1. Linz, autumn 1613. Johannes Kepler buys wine for his wedding, and the merchant prices each barrel by poking one rod through the bung hole.
2. One reading for a whole curved barrel? Kepler doesn't trust it, and he writes a book on measuring barrels.
3. The rule now named after him measures the two ends and the middle, and weighs them one sixth, four sixths, one sixth.
4. It's exact for parabolas, which makes sense: three readings, three numbers. But it's also exact for cubics. How?

## Title

1. Season two, episode seven. Functionals everywhere.

## Measurements of functions

1. Take a curve and ask it questions: its value at 0, its slope at 1, the area under it. Each question returns a number.
2. And each respects adding and scaling: the area under f plus g is the area under f plus the area under g. They're all covectors.

## Probes as coordinates

1. Measure a parabola at 0, 1 and 2. Three readings pin it down: three probes are a basis of the measurements.
2. Swap in different probes, the value, slope and half the curvature at 0, and the readings change. The parabola doesn't.

## The Lagrange partners

1. Each probe has a partner parabola that reads 1 at its own point and 0 at the other two. These are the Lagrange polynomials.
2. For a parabola through any three values, weight the partners by the values and add. Interpolation is a change of basis.

## Payoff: Kepler's rule is exact for cubics

1. Now Kepler's rule. Area is one more measurement, so on parabolas it's a mix of the three values: one sixth, four sixths, one sixth.
2. Add a cubic centred on the middle. Its two lobes cancel, so its area is 0, and the probes read minus, 0, plus: also 0.
3. Both measurements are blind to that direction, so they agree on every cubic. Symmetry bought a degree for free.

## End card

1. Values, slopes, areas: measurements of functions, each one a mix of the others. Interpolation and quadrature are one idea.
2. Next episode: every linear map pulls measurements back. That's what the transpose really is.
