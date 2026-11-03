# S2E17 narration script

Voiceover script for *Projection and Least Squares*, generated from `src/s2e17/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e17-projection-and-least-squares.md`.

## Cold open: Ceres lost and found

1. New Year's night, 1801. Piazzi spots a moving dot.
2. He tracks it for weeks. Then it slips into the Sun's glare.
3. To find it again you need its orbit, from his measurements.
4. Every measurement is slightly off. No orbit fits them all.
5. Each guess misses somewhere.
6. Gauss, aged 24: find the orbit that's least wrong.
7. Make the sum of the squared misses as small as possible.
8. In December, Ceres was right where he said.

## Title

1. Season two, episode seventeen. Projection and least squares.

## Four points, no line

1. Smaller problem: four points, one straight line.
2. Each point gives an equation for the height and slope.
3. The first two fix the line: start at 1, rise 2.
4. The third point says 1 + 4 = 4. No.
5. Four equations, two unknowns. No exact answer.

## The best fit is a shadow

1. Change the picture. The four heights are one arrow b.
2. Every line the model can draw lands on a flat plane.
3. b floats above it. That's why nothing fits.
4. Shine a light straight down. b casts a shadow p.
5. The error e = b − p stands perfectly upright.
6. The best fit is the shadow.

## Why the shadow is closest

1. Why is the shadow the closest point? Pick any other u.
2. From b to u: the error, then a step along the plane.
3. Those two meet at a right angle. Pythagoras.
4. So ‖b − u‖² = ‖e‖² + ‖p − u‖². Never smaller.
5. Closest means exactly this: the error is perpendicular.

## Projecting onto a line

1. Simplest case first: the plane is one line, along a.
2. The shadow of b is some multiple of a: p = x a.
3. The error b − x a has to be perpendicular to a.
4. So a · b − x a · a = 0. Solve for x.
5. x = a·b / a·a. A shadow from two dot products.

## The normal equations

1. Back to the four points. Perpendicular to the plane means…
2. …the error is perpendicular to both columns of A.
3. That's AᵀA x = Aᵀb: the normal equations.
4. Solve: height 1.5, slope 1. The line y = 1.5 + t.
5. The misses: −½, ½, ½, −½. They balance to zero.
6. Squared misses add to 1. No line does better.

## The projector P

1. Making shadows is itself a map. Call it P.
2. The shadow of a shadow doesn't move: P² = P.
3. What P throws away is the error. That's I − P.
4. Every b splits in two: fit plus error, at right angles.
5. With the columns of A: P = A(AᵀA)⁻¹Aᵀ.

## Gram–Schmidt and QR

1. Shadows need a basis at right angles. Here's how to make one.
2. Keep the first arrow. Scale it to length 1.
3. Take the second. Peel off its shadow on the first.
4. What's left stands perpendicular. Scale it.
5. Third: peel off its shadow on the plane of the first two.
6. Gram–Schmidt. The peeled amounts fill a triangle: A = QR.

## Legendre polynomials

1. Do the same to functions: 1, x, x², x³ on [−1, 1].
2. Peel each against the ones before.
3. Legendre polynomials: each crosses zero once more.
4. The best line for x² is the constant ⅓. The error: ⅔ P₂.

## End card

1. The best fit is a shadow. The error stands upright.
2. Every least squares formula says exactly that.
3. Next: symmetric maps and their perpendicular axes.
