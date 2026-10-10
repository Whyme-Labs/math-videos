# Season 3: Where the Roads Meet, Plus Side Quests

Season 3 is the payoff. Each episode takes one thread from Season 1 and one
from Season 2 and shows they were the same idea all along. It's shorter
(about 6 episodes) and assumes both seasons.

## Season 3 episodes

### Ep. 1: Fields Are Vector Spaces Over Fields
- ℂ is a 2-dimensional vector space over ℝ; ℚ(√2) is 2-dimensional over ℚ;
  𝔽₈ is 3-dimensional over 𝔽₂. The tower law [L : F] = [L : K][K : F] is
  just "dimensions multiply." It completes S1 Ep. 18: why |𝔽_q| must be a
  prime power (it's a vector space over 𝔽ₚ, so it has pⁿ elements).
- Multiplication by α in a field extension is a linear map, and its
  determinant and trace are the field *norm* and *trace*.

### Ep. 2: One Theorem, Two Classifications
- Modules over a principal ideal domain (PID). Over ℤ, the structure
  theorem says every finitely generated abelian group is ℤʳ ⊕ ℤ/n₁ ⊕ … .
  Over F[x], it says every linear map has a rational / Jordan canonical
  form.
- Visual: two columns, S1 and S2, merging into one statement. The "aha"
  episode of the series.

### Ep. 3: Groups Acting Linearly: Representation Theory
- Represent a group by matrices (symmetries of a square become 2×2
  matrices). Irreducible representations; characters (the trace again, as a
  coordinate-free invariant from S2 Ep. 9). Character tables as the
  "fingerprint" of a group.
- Applications: molecular vibrations, particle physics (SU(2), SU(3)),
  Fourier analysis on finite groups.

### Ep. 4: Fourier Is Duality
- The characters of ℤ/n are the discrete Fourier basis; the characters of
  the circle are e^{inθ}; those of ℝ give the Fourier transform. Pontryagin
  duality: a group and its dual group, just as V and V*. The FFT as a
  clever factorization.
- Ties S2 Ep. 6 (covectors), S2 Ep. 16 (Fourier), and S1 Ep. 15 (groups)
  together.

### Ep. 5: Continuous Symmetry: Lie Groups at a Glance
- Rotations form a group *and* a smooth space. Its tangent space at the
  identity (the Lie algebra) is a vector space: linear algebra captures the
  infinitesimal version of symmetry. The matrix exponential (S2 Ep. 10)
  turns infinitesimal rotations into actual ones.
- Quaternions double-cover 3D rotations (a nice payoff for the
  Cayley–Dickson side quest).

### Ep. 6: Series Finale: The Language of Structure (Category Theory)
- Objects and arrows. Isomorphism as the only meaningful "sameness."
  Universal properties seen throughout the series: ℕ (an initial
  "Peano structure"), free groups, quotients, products and direct sums,
  the tensor product, ℚ as the "field of fractions" of ℤ.
- Naturality: V ≅ V** is natural, V ≅ V* is not (S2 Ep. 7). Functors: the
  dual space is a contravariant functor.
- Closing line: back to the thesis. *An object is what you can do with
  it.* Category theory is mathematics that takes this sentence literally.

---

## Side quests (standalone extrapolations)

Short, optional episodes that branch off the main line. Each one lists where
it attaches. They work well as "bonus" uploads between main episodes.

### Other number systems
| Side quest | Attaches after | Idea |
|---|---|---|
| **p-adic numbers** | S1 Ep. 8 | Complete ℚ using a different notion of distance ("divisible by p a lot = small"). Ostrowski's theorem: up to equivalence, the usual absolute value and the p-adic ones are the *only* absolute values on ℚ. In ℚ₂, 1 + 2 + 4 + 8 + … = −1. |
| **Hyperreals** | S1 Ep. 9 | A legitimate number system with infinitesimals; calculus done Leibniz's way (non-standard analysis). |
| **Surreal numbers** | S1 Ep. 13 | Conway's construction, one rule that builds integers, reals, ordinals, *and* infinitesimals in one field. |
| **Cayley–Dickson: ℍ, 𝕆 and beyond** | S1 Ep. 10 | Keep doubling: ℝ → ℂ loses order, ℂ → ℍ (quaternions) loses commutativity, ℍ → 𝕆 (octonions) loses associativity, 𝕆 → sedenions loses division (zero divisors appear). Hurwitz: ℝ, ℂ, ℍ, 𝕆 are the only normed division algebras. |
| **Computable reals** | S1 Ep. 12 | Only countably many reals can be computed; Chaitin's Ω is defined precisely but can't be computed. |
| **Constructive mathematics** | S1 Ep. 14 | What changes if you reject the law of excluded middle and accept only constructions? |

### Other directions from linear algebra
| Side quest | Attaches after | Idea |
|---|---|---|
| **Linear algebra over 𝔽₂: codes and puzzles** | S2 Ep. 3 | The "Lights Out" puzzle is solving Ax = b over 𝔽₂; Hamming codes. |
| **Graphs as matrices** | S2 Ep. 9 | Adjacency and Laplacian matrices; counting walks; spectral clustering; why the second eigenvalue measures connectivity. |
| **Differential forms** | S2 Ep. 8 | Exterior algebra + calculus; all the integral theorems (Green, Stokes, divergence) become one: ∫_∂M ω = ∫_M dω. |
| **Linear algebra in machine learning** | S2 Ep. 15 | Neural network layers as linear maps + nonlinearities; embeddings and dot-product attention as inner products; low-rank adaptation (LoRA) as Eckart–Young in practice. |
| **Quantum computing** | S2 Ep. 17 | Qubits in ℂ², multi-qubit systems as tensor products, gates as unitary matrices, entanglement. |
| **Projective geometry** | S2 Ep. 5 | Lines through the origin as points; perspective drawing; why parallel lines "meet at infinity." |
| **Special relativity** | S2 Ep. 11 | A "inner product" that isn't positive definite (Minkowski); Lorentz transformations as its symmetries. |

### History interludes (short, story-driven)
- Pythagoras and the irrationality crisis (S1 Act II)
- Cantor vs. Kronecker ("God made the integers…") (S1 Act III)
- Galois's last night (S1 Ep. 19)
- Grassmann's ignored *Ausdehnungslehre* (1844), which invented vector
  spaces decades early (S2 Act I)
- Emmy Noether and the birth of abstract algebra (S1 Act IV / S3 Ep. 2)
- Hilbert's 1900 problems and the foundations crisis (S1 Ep. 14)
