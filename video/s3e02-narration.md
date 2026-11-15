# S3E02 narration script

Voiceover script for *Modules: One Theorem, Two Classifications*, generated from `src/s3e02/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s3/e02-modules-two-classifications.md`.

## Cold open: two puzzles, two seasons

1. Two puzzles from two seasons, side by side.
2. Left: how many abelian groups have 144 elements?
3. ℤ/144 is one. ℤ/12 × ℤ/12 is another. Any more?
4. Right: 3 × 3 matrices whose only eigenvalue is 2.
5. 2I is one. A shear is another. How many in all?
6. One is about symmetry. One is about stretching space.
7. Tonight they turn out to be the same question.
8. To see it, the scalars have to stop being a field.

## Title

1. Season three, episode two. Modules.

## Warm-up over 𝔽₂: the Hamming code

1. Warm-up over 𝔽₂: send 4 bits, survive one flipped bit.
2. Three parity checks, each a covector on 𝔽₂⁷.
3. The code is their kernel: rank 3, so dimension 4.
4. Flip bit 6. Checks 4 and 2 fail: 4 + 2 = 6.
5. The failed checks spell out the error's address.
6. All of it ran on one fact: 𝔽₂ is a field.

## Modules

1. A module: a vector space whose scalars form a ring.
2. Same axioms. The scalars just may not have inverses.
3. Over ℤ, a module is exactly an abelian group.
4. Over F[x], it's a vector space with one operator T.
5. x acts as T, and an isomorphism is a change of basis.

## Torsion: ℤ/2 has no basis

1. What did the field give us? Try ℤ/2 as a ℤ-module.
2. Scale the arrow 1 by 2 and it collapses to 0.
3. A nonzero scalar killed a nonzero vector: torsion.
4. So {1} is dependent. ℤ/2 has no basis at all.
5. In a vector space you'd divide by 2. Not here.
6. Lost: bases, complements, dimension. What survives?

## Smith normal form

1. Describe a group by generators and relations.
2. Row moves change generators. Column moves, relations.
3. Clear each row and column with the Euclidean algorithm.
4. What's left: 2, 6, 12, each dividing the next.
5. So the group is ℤ/2 ⊕ ℤ/6 ⊕ ℤ/12. Smith normal form.
6. Coprime parts split apart: ℤ/12 = ℤ/4 ⊕ ℤ/3.

## Over ℤ: ten groups of order 144

1. Structure theorem: over ℤ or F[x], every module splits.
2. Into cyclic pieces R/(d), each d dividing the next.
3. Over ℤ, 144 = 2⁴ · 3². Split the 4, split the 2.
4. 5 × 2 = 10 abelian groups of order 144. No more.

## Over F[x]: Jordan blocks

1. Over F[x], take one piece: F[x] / (x − 2)ᵏ.
2. x acts as a Jordan block: 2 on the diagonal, 1 above.
3. Split 3 three ways: 1 + 1 + 1, 2 + 1, or 3.
4. 2I, one shear block, one full block: exactly three.
5. Same theorem, same algorithm, with x − 2 in place of p.

## The dictionary

1. Put the two columns side by side.
2. Prime p ↔ x − λ. ℤ/pᵏ ↔ a k × k Jordan block.
3. The order of the group ↔ the characteristic polynomial.
4. The largest order ↔ the minimal polynomial.
5. Jordan form is the classification of abelian groups.

## End card

1. A module is a vector space whose scalars can't divide.
2. Over ℤ and F[x], one theorem classifies them all.
3. Next: groups acting by matrices. Representations.
