# S2E16 narration script

Voiceover script for *Vectors and Covectors*, generated from `src/s2e16/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e16-riesz-vectors-and-covectors.md`.

## Cold open: the hiker's squashed map

1. 1907: Riesz and Fréchet, apart, prove the same theorem.
2. A hiker's question: which way is straight uphill?
3. Here's the hill. Its contour lines go on a map.
4. On the map, uphill is perpendicular to the contours.
5. Now squash the map north to south.
6. The contours on the ground didn't move.
7. On the squashed map, 'perpendicular' points elsewhere.
8. So which is real: the contours, or the arrow?

## Title

1. Season two, episode sixteen. Vectors and covectors.

## Arrows and stacks

1. Two kinds of things live here. Arrows, and stacks.
2. A stack measures an arrow: count the sheets it crosses.
3. A basis can pair them: each arrow with its own stack.
4. Change the basis and the pairing changes.
5. Nothing in the space itself prefers one pairing.

## The Riesz theorem

1. An inner product gives a pairing. Start from an arrow v.
2. Measure any arrow by its overlap with v: that's a stack.
3. Sheets are perpendicular to v. Longer v, denser sheets.
4. Riesz: every stack comes from exactly one arrow.
5. To build it, read the stack on each orthonormal arrow.
6. Use the readings as coordinates. That arrow is r.
7. Why only one? Two arrows giving the same stack…
8. …differ by an arrow perpendicular to itself. Length zero.

## The stack stays, the arrow moves

1. Now change the ruler. Keep the stack fixed.
2. Its unit circle squashes into an ellipse.
3. The arrow for the same stack swings: r = G⁻¹a.
4. For the stack (1, 1) and G = diag(1, 4): r = (1, ¼).
5. Rows equal columns only for the dot product.

## The gradient needs a ruler

1. Back to the hill: f = x²y. At P = (1, 2):
2. df counts contours crossed. It's a stack: (4, 1).
3. With the dot product it's (4, 1): the textbook gradient.
4. With G = diag(4, 1), the arrow is (1, 1).
5. Steepest is a choice. The climb along a step is not.
6. That's why gradient descent tunes its ruler.

## Why steepest depends on the ruler

1. Why 'steepest'? Try every step of length 1.
2. With the dot product, length-1 steps fill a circle.
3. The climb is biggest where it touches the highest sheet.
4. That best step points along (4, 1).
5. Change the ruler: length-1 steps fill an ellipse.
6. Now the best step points along (1, 1).

## The adjoint

1. A map A carries V to W. Watch W's grid bend.
2. Take a stack on W. Pull it back through A.
3. Turn it into an arrow on V. That round trip is A*.
4. With the dot product, A* is the transpose.
5. With G = diag(1, 4), A* is a different matrix.
6. Check: ⟨Av, w⟩ = ⟨v, A*w⟩ holds; the transpose fails.

## Where Riesz runs out

1. Last: a stack that measures a function by its value at 0.
2. On polynomials of degree 1, its arrow is 4 − 6x.
3. Degree 2: 9 − 36x + 30x². Taller, sharper at 0.
4. The lengths grow: 2, 3, 4, 5… without end.
5. On all polynomials, no arrow exists. Riesz needs more.

## End card

1. Arrows and stacks are different things.
2. An inner product pairs them. Every gradient depends on it.
3. Next: the closest point. Projections and best-fit lines.
