# The Big Picture

## The "different perspective"

Most courses teach mathematics in the order it gets *used*: arithmetic, then
algebra, then calculus, then matrices. This series follows the order it gets
*understood*: why each idea was needed, what went wrong without it, and what
the cleanest version looks like.

The whole series rests on one idea:

> **A mathematical object is defined by what you can do with it, not by what
> it is made of.**

Season 1 arrives at this idea slowly. We build numbers out of almost nothing,
then find out that the building materials don't matter (Benacerraf's
question: *is 2 really the set {∅, {∅}}?*). What matters is the structure:
groups, rings, fields.

Season 2 starts from this idea. A vector isn't an arrow or a list of
numbers. It is anything you can add and scale. A matrix isn't the linear map.
It is a picture of the map taken from one particular angle (a basis).

## Two ways to know a thing

Every season moves back and forth between two ways of understanding an
object:

| Construction (build it) | Characterization (describe it by its properties) |
|---|---|
| von Neumann ordinals: 0 = ∅, n+1 = n ∪ {n} | Peano axioms |
| Dedekind cuts, Cauchy sequences | "the unique complete ordered field" |
| ℂ as pairs of reals | the algebraic closure of ℝ |
| A matrix in some basis | A linear map |
| Coordinates of a tensor | The universal property of the tensor product |
| Frege–Russell: 2 = the class of all pairs; von Neumann: 2 = {∅, {∅}} | Peano: whatever comes after the successor of 0 |
| L¹ as the completion of C[0, 1] under ∫\|f\| | Lebesgue-integrable functions (up to sets of measure zero) |
| L²[0, 1], ℓ², Sobolev spaces | "the" separable infinite-dimensional Hilbert space |
| δ "function" with infinite spike | δ(φ) = φ(0), a linear functional |

Giving this tension a name early ("build vs. describe") gives viewers a lens
they can use for the rest of the series.

## Seven recurring threads

These are the motifs that tie the episodes together. Each one should get a
consistent visual treatment (see production notes) so viewers recognize it
when it comes back.

1. **Extend to repair a defect.** ℕ can't subtract, so we build ℤ. ℤ can't
   divide, so we build ℚ. ℚ has holes, so we build ℝ. ℝ can't solve x² + 1 = 0,
   so we build ℂ. In Season 2: ℝ has no eigenvalues for a rotation, so we pass
   to ℂ; a map can't be diagonalized, so we use generalized eigenvectors;
   function spaces have holes, so we complete them to Banach and Hilbert
   spaces (ℚ → ℝ, one level up); the delta isn't a function, so we enlarge
   functions to distributions.
2. **Glue things together (equivalence classes and quotients).** The single
   most reused tool: ℤ as pairs of naturals, ℚ as pairs of integers, ℝ as
   classes of Cauchy sequences, ℤ/nℤ, quotient groups, quotient rings, the
   quotient space V/W. Every time, "these things are now the same" creates a
   new object.
3. **Bijections are the real way to count.** Cantor's matching argument, an
   isomorphism, and a change of basis are the same move: two things are "the
   same" if you can match them perfectly while keeping the structure.
4. **The diagonal trick.** Cantor's theorem, Russell's paradox, Gödel, the
   halting problem. One argument with many costumes.
5. **Symmetry means what stays fixed.** Groups as symmetries; invariants as
   whatever survives a change of viewpoint (cardinality under bijection;
   determinant, trace, and eigenvalues under change of basis).
6. **Duality, or measuring things.** Covectors measure vectors. The dual of
   the dual brings you back (sometimes: reflexivity). Inner products
   identify the two (Riesz). Hahn–Banach guarantees enough measurements.
   Distributions are *defined* by their measurements. Teasers: Pontryagin
   and Fourier duality.
7. **Structure-preserving maps matter more than objects.** Homomorphisms,
   linear maps, isomorphism theorems. This sets up category theory as the
   final "zoom out."

## How the seasons connect

```
                 SEASON 1: What Is a Number?
   Peano → Sets → ℤ, ℚ (quotients) → ℝ (completeness) → ℂ
                         │                               │
                   Cantor: sizes of infinity             │
                         │                               │
              Groups → Rings → FIELDS ───────────────────┘
                                   │
                                   ▼   "a vector space is a set you can add and
                                       scale, where the scalars form a field"
                 SEASON 2: Spaces, Maps, and Measurements
   Part A (finite dim):
   Vector spaces → Linear maps → Linear functionals & duality
     → Multilinear (bilinear forms, tensors, exterior algebra, det)
     → Invariants (eigen, Jordan) → Inner products (real and unitary)
     → Spectral / SVD
   Part B (infinite dim):
   Normed spaces → Measure spaces & Lebesgue → Banach (completeness)
     → Continuous duals, Hahn–Banach, Big Three, weak convergence
     → Hilbert spaces, Fourier
     → Compact & unbounded operators, spectrum
     → Measure-preserving systems (Koopman: chaos as a unitary operator)
     → Distributions
                                   │
                                   ▼
                 SEASON 3: Where the Roads Meet
   Act I:  Field extensions as vector spaces (impossible constructions)
           Modules: vector spaces over rings (Jordan form = abelian groups!)
           Representation theory: groups acting linearly
           Fourier: the duality that unites everything
   Act II: Manifolds: spaces that are vector spaces up close
           Tangent/cotangent spaces → differential forms → Stokes
           → de Rham cohomology (calculus counts holes)
           → Riemannian metrics, curvature, Gauss–Bonnet → Lie groups
   Act III: Category theory: the language of "what you can do with it"
```

**The handoff between seasons is the field.** Season 1 ends by defining
fields. Season 2 opens with "a vector space over a field." Having just met
𝔽₂ and ℂ, viewers already have the right picture of what the scalars can be.

## Suggested viewing paths

- **Linear path (recommended):** S1 → S2 → S3. Each season's callbacks pay
  off.
- **Practical path:** S2 Part A first, for viewers who need linear algebra
  now (engineering, ML). S2 episodes give one-line recaps of the S1 facts
  they use (fields, quotients, ℂ). Part B needs S1 Ep. 7–8 (completeness)
  first.
- **Interleaved path:** S1 Acts I–II → S2 Acts I–II → S1 Acts III–IV → S2
  Acts III–V (Part A) → S2 Part B → S3. This alternates a
  construction-heavy stretch with a geometry-heavy one.
- **Functional analysis path:** S1 Ep. 5, 7, 8, 11, 12, 15 → S2 Ep. 1–3,
  6–8, 14–19 → S2 Part B. The shortest route to Hilbert spaces and
  distributions.
