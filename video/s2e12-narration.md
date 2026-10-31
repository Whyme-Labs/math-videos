# S2E12 narration script

Voiceover script for *Eigenvectors*, generated from `src/s2e12/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e12-eigenvectors.md`.

## Cold open: Pisa, 1202

1. Pisa, 1202. In his book of calculation, Leonardo of Pisa asks how many pairs of rabbits there'll be after a year, if every grown pair breeds a new pair each month.
2. The answer is the sequence 1, 1, 2, 3, 5, 8, 13: each number is the sum of the two before it.
3. In 1843 Jacques Binet wrote a formula that jumps straight to any term. It's full of square roots of five, and it always lands on a whole number.
4. Where could it come from? From the directions a map doesn't turn. Today: eigenvectors.

## Title

1. Season two, episode twelve. Eigenvectors.

## Two lines that only stretch

1. Watch this map act on arrows. Almost every arrow gets knocked off its line. But arrows on two special lines only stretch: one by 5, one by 2.
2. Those are eigenvectors, and 5 and 2 are their eigenvalues. Use them as the basis, and the whole map is just: stretch by 5, stretch by 2.

## The characteristic polynomial

1. To find them, ask when A minus lambda can crush an arrow: when its determinant is zero. That's a polynomial in lambda, and its roots are 5 and 2.
2. It doesn't care about coordinates. The trace, 7, is the sum of the eigenvalues, and the determinant, 10, is their product.

## A rotation, and the complex numbers

1. A rotation of the plane turns every line. It has no real eigenvector at all.
2. Over the complex numbers it has two, with eigenvalues on the unit circle. On a complex space, every map has at least one eigenvector.

## Payoff: Fibonacci and the golden ratio

1. Now Fibonacci. Adding the last two numbers is a linear map on pairs, and its eigenvalues are the golden ratio, 1.618, and minus 0.618.
2. Each step multiplies one part by 1.618 and the other by minus 0.618, which shrinks to nothing. That's Binet's formula, and why the ratios close in on the golden ratio.

## End card

1. Eigenvectors are a map's own coordinates. Seen through them, the map only stretches.
2. Next episode: shear a deck of cards and you get only one eigen-direction. What then?
