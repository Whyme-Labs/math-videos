# S3E01 narration script

Voiceover script for *Fields Are Vector Spaces*, generated from `src/s3e01/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s3/e01-fields-as-vector-spaces.md`.

## Cold open: a field with six elements?

1. Could a number system have exactly six numbers?
2. Not a clock: mod 6, 2 × 3 = 0, so you can't divide by 2.
3. A real field: add, subtract, multiply, divide.
4. Sizes 2, 3, 4, 5, 7, 8 and 9 all work.
5. 6, 10, 12: never. Something always jams.
6. The reason is almost cheating: it's counting arrows.
7. Every bigger field is secretly a vector space.
8. And dimensions multiply.

## Title

1. Season three, episode one. Fields are vector spaces.

## Counting is the wrong ruler

1. How much bigger is ℚ(√2) than ℚ?
2. Counting fails: both are countable, the same size.
3. But ℚ(√2) has a new direction: √2.
4. Keep adding, and scaling by rationals. Forget the rest.
5. A vector space over ℚ. Its dimension is the ruler.

## The degree of an extension

1. Degree: [L : K] is the dimension of L over K.
2. ℂ over ℝ: basis 1, i. Degree 2.
3. ℚ(√2) over ℚ: basis 1, √2. Every element is a + b√2.
4. Even 1/(a + b√2) stays in that plane.
5. A root of an irreducible degree-n polynomial: degree n.
6. Basis 1, α, …, αⁿ⁻¹: divide, and keep the remainder.

## The tower law

1. Stack them: ℚ ⊂ ℚ(√2) ⊂ ℚ(√2, √3).
2. Basis below: 1, √2. Basis above: 1, √3.
3. Multiply them: 1, √2, √3, √6. A 2 × 2 grid.
4. A basis of a basis is a basis.
5. Tower law: [M : K] = [M : L] · [L : K].
6. So a middle degree must divide the top one.

## Finite fields have pⁿ elements

1. Now a finite field F. Add 1 to itself: 1, 1 + 1, …
2. It must loop back at a prime p, so F contains 𝔽ₚ.
3. So F is a vector space over 𝔽ₚ, of some dimension n.
4. n coordinates, p choices each: |F| = pⁿ.
5. 6 is no prime power. No field has six elements.
6. 𝔽₈: a cube of 2 × 2 × 2 points over 𝔽₂.

## Multiplication as a matrix: norm and trace

1. Fix α. Multiplying by α is a linear map.
2. Over ℝ, times a + bi has the matrix [a −b; b a].
3. Its determinant is a² + b²: the norm of α.
4. det(AB) = det A · det B, so norms multiply.
5. That's the two-squares identity, for free.
6. The trace is 2a, and the char. polynomial kills α.

## The impossible trisection

1. Compass and straightedge take steps of degree 1 or 2.
2. Tower law: anything you construct has degree 2ᵏ.
3. Trisect 60°: cos 20° solves 8x³ − 6x − 1 = 0.
4. Degree 3 never divides 2ᵏ. Impossible.
5. Season 1's miracles were Season 2's dimensions.

## End card

1. A field over a field is a vector space.
2. Degrees multiply, sizes are pⁿ, norms are determinants.
3. Next: modules, when the scalars are only a ring.
