# Season 2: Spaces, Maps, and Measurements

**Arc:** Linear algebra without starting from matrices. We begin with the
*idea* of linearity, treat maps as the main characters, introduce duality
(measurement) before geometry (inner products), and only then add lengths and
angles. Matrices show up as what they really are: coordinates of a map in
some basis. Every big theorem gets reframed as an answer to *"what does not
depend on the coordinates I chose?"*

**Season hook (cold open of Ep. 1):** an arrow in the plane, the polynomial
3x² − x + 2, an audio clip, and the solutions of y″ + y = 0 appear side by
side. *These are all the same kind of thing.* By the end of the episode,
viewers know why.

**Core stance (repeat it often):**
- A vector is anything you can add and scale.
- A linear map is any process that respects adding and scaling.
- A matrix is a picture of a linear map, taken in a chosen basis.
- A covector is a measuring device.
- An inner product is *extra structure* you choose to add, not something
  that was there all along.

---

## Act I: What Is Linear?

### Ep. 1: Anything You Can Add and Scale
- **Core ideas:** the vector space axioms over a field F (callback to S1
  Ep. 18). Examples: ℝⁿ, polynomials, functions ℝ → ℝ, solutions of linear
  ODEs, sequences, 𝔽₂ⁿ (bit strings, where 1 + 1 = 0). Non-examples: the
  positive reals under + (no negatives), points on a sphere.
- **The superposition principle:** why linearity is everywhere in physics,
  and why it's the first approximation to everything else (calculus = local
  linearization).
- **Key visual:** a "vector space" stamp landing on wildly different
  objects.

### Ep. 2: Span, Independence, Basis, Dimension
- **Hook:** what's the smallest set of "ingredients" that can make
  everything?
- **Core ideas:** span; linear independence (no ingredient is redundant);
  basis = independent spanning set; **dimension is well-defined** (the
  Steinitz exchange lemma: every basis has the same size). Coordinates are a
  *language* that a basis lets you speak; there is no preferred one.
- **Infinite dimension teaser:** polynomials have the basis 1, x, x², …;
  ℝ as a vector space over ℚ has uncountable dimension (callback to S1
  Ep. 12), and finding a basis for it needs the Axiom of Choice (callback to
  S1 Ep. 14).
- **Key visual:** the same vector described in two different bases, like
  the same sentence in two languages.

### Ep. 3: Linear Maps Are the Real Characters
- **Hook:** rotation, projection, differentiation, "shift a sequence,"
  "evaluate a polynomial at 2." What do they share?
- **Core ideas:** the definition of a linear map; a linear map is completely
  determined by what it does to a basis. Kernel (what gets crushed) and
  image (what can be reached). **Rank–nullity as conservation of dimension:**
  dim V = dim ker + dim im. Injective ↔ trivial kernel. Callback: this is the
  First Isomorphism Theorem from S1 Ep. 16, with dimensions instead of group
  orders.
- **Key visual:** a 3D space being squashed onto a plane, with the crushed
  line glowing.

### Ep. 4: Matrices: Shadows of Maps
- **Hook:** why on earth is matrix multiplication "row times column"?
- **Core ideas:** fix bases, and a map becomes a grid of numbers; column j
  is where basis vector j goes. Composition of maps *is* matrix
  multiplication; that's the only reason the rule is what it is.
  Non-commutativity is natural (rotate-then-project ≠ project-then-rotate).
  **Change of basis:** the same map in different bases gives similar
  matrices P⁻¹AP. Solving Ax = b: the solution set is a particular
  solution plus the kernel (an affine subspace).
- **Key visual:** one linear map, a camera moving around it, and the matrix
  "shadow" changing while the map stays fixed.
- **Payoff:** sets up the season's central question: *which properties of A
  are properties of the map, and which are artifacts of the camera angle?*

### Ep. 5: Building New Spaces
- **Core ideas:** subspaces, sums, direct sums; **quotient spaces V/W**
  (callback to S1 Ep. 5: collapse W to a point, and each parallel copy of W
  becomes a single vector). V/ker T ≅ im T. The space of all linear maps
  Hom(V, W) is itself a vector space of dimension mn. Example: the
  derivative on polynomials, viewed on the quotient "polynomials mod
  constants."
- **Key visual:** a stack of parallel planes collapsing into points on a
  line.

---

## Act II: Duality: Measurements

### Ep. 6: Covectors: Measuring Devices
- **Hook:** a temperature gradient, a price list, a row vector. What's the
  difference between a column and a row, really?
- **Core ideas:** a linear functional V → F is a measurement; the dual
  space V*; the dual basis ("measure the i-th coordinate"). Picture a
  covector as a *stack of evenly spaced level lines*, where the measurement
  is "how many lines does the arrow cross?" Examples: "evaluate at 0,"
  "integrate over [0, 1]," "take the 3rd coordinate." Price × quantity is a
  covector applied to a vector.
- **Key visual:** arrows (vectors, one color) piercing stacks of planes
  (covectors, another color). Keep this color code for the rest of the
  series.
- **Payoff:** the gradient of a function is naturally a covector (df). It
  only becomes an arrow once you choose an inner product (set up for Ep. 12).

### Ep. 7: The Transpose, Demystified
- **Core ideas:** every map T : V → W induces a dual map T* : W* → V*
  (measure after mapping); in dual bases its matrix is the transpose. That is
  the meaning of the transpose. Annihilators. **Row rank = column rank**
  follows from duality. The double dual: V ≅ V** *naturally* (no basis
  needed), while V ≅ V* requires a choice. In infinite dimensions, V* is
  strictly bigger than V.
- **Big idea, named gently:** "natural" vs. "requires a choice." This is the
  first glimpse of category theory (S3).

---

## Act III: Invariants: What Coordinates Can't Change

### Ep. 8: The Determinant Is a Volume
- **Hook:** the usual cofactor formula is a mess. What is the determinant
  actually measuring?
- **Core ideas:** the determinant = the factor by which a map scales signed
  volume. It is the unique alternating multilinear "volume form" up to
  scale, so the formula is *forced*. det(AB) = det A · det B becomes obvious
  (scale, then scale). det = 0 ↔ the map crushes a dimension ↔ not
  invertible. Sign = orientation. Cramer's rule as a ratio of volumes.
- **Key visual:** a unit cube deforming into a parallelepiped, with the
  volume counter ticking; a flip turns it "inside out" (negative sign).
- **Extension:** exterior powers Λᵏ V measure k-dimensional volumes; the
  determinant is the action on the top power. Plant this for differential
  forms.

### Ep. 9: Eigenvectors: The Map's Own Coordinates
- **Hook:** is there a basis in which this map is as simple as possible?
- **Core ideas:** eigenvectors are directions a map only stretches;
  diagonalization = choosing the basis the map "prefers." Characteristic
  polynomial; trace = sum of eigenvalues, det = product, *both
  coordinate-free*. Applications: Fibonacci in closed form, Markov chains
  and steady states, Google's PageRank, normal modes of vibration.
- **Field matters:** a rotation of ℝ² has no real eigenvectors; over ℂ it
  has eigenvalues e^{±iθ} (callback to S1 Ep. 10). Algebraic closure is what
  guarantees eigenvalues exist.
- **Key visual:** a grid being sheared or stretched while eigen-directions
  stay on their own lines.

### Ep. 10: When Diagonalization Fails
- **Hook:** the shear (1 1; 0 1) has only one eigen-direction. Now what?
- **Core ideas:** invariant subspaces; generalized eigenvectors; Jordan
  normal form as "diagonal plus a nilpotent nudge"; the minimal polynomial
  and Cayley–Hamilton. Exponentials of matrices and solving linear ODEs.
  Seed for S3: V as a module over F[x] (the map T acts like "x"), and the
  Jordan form is a classification theorem.
- **Payoff:** every linear map over ℂ is fully classified by its Jordan
  form, which completely answers "what does a map look like up to change of
  basis."

---

## Act IV: Geometry: Inner Products

### Ep. 11: Length and Angle Are a Choice
- **Hook:** so far, nothing in this season had a length. A vector space
  doesn't know what "perpendicular" means.
- **Core ideas:** an inner product is extra structure (bilinear, symmetric,
  positive definite). The same space can carry many inner products (show
  stretched "unit circles," i.e. ellipses). The dot product is just one
  choice. Norms, angles, Cauchy–Schwarz, orthogonality. Inner products on
  function spaces: ⟨f, g⟩ = ∫ f g.
- **Key visual:** the same plane with different "unit circles": round,
  elliptical, and (as a norm that isn't from an inner product) a diamond.

### Ep. 12: Identifying Vectors and Covectors
- **Core ideas:** an inner product gives an isomorphism V → V*,
  v ↦ ⟨v, ·⟩ (Riesz). *This* is why we usually pretend rows and columns are
  the same: we silently use the dot product. The gradient as an arrow =
  df converted using the inner product (resolves Ep. 6). The adjoint T† as
  the transpose made geometric: ⟨Tv, w⟩ = ⟨v, T†w⟩. Orthogonal / unitary
  maps preserve the inner product.
- **Payoff:** the duality act and the geometry act snap together.

### Ep. 13: Projection and Least Squares
- **Core ideas:** orthogonal complements; orthogonal projection as "closest
  point"; Gram–Schmidt (and QR); least squares: the best-fit line *is* a
  projection onto the column space; the normal equations AᵀA x = Aᵀb.
- **Key visual:** a vector dropping its shadow onto a plane; the residual is
  the perpendicular error.

### Ep. 14: The Spectral Theorem
- **Hook:** some maps are guaranteed to be perfectly diagonalizable with
  perpendicular axes. Which ones, and why?
- **Core ideas:** self-adjoint (symmetric / Hermitian) maps have real
  eigenvalues and an orthonormal eigenbasis. Quadratic forms and their
  principal axes (an ellipse is a circle seen through a symmetric map);
  positive-definiteness; the second-derivative test in many variables.
  Normal operators. Quantum mechanics: observables are self-adjoint;
  eigenvalues are measurement outcomes.
- **Key visual:** a tilted ellipse rotating to align with the axes.

### Ep. 15: SVD: Every Map Is Rotate–Stretch–Rotate
- **Hook:** Ep. 14 only covers special maps. What about *every* map, even
  between different spaces?
- **Core ideas:** the singular value decomposition A = UΣVᵀ: rotate, scale
  along the axes, rotate. Singular values as the "true size" of a map;
  rank and low-rank approximation (Eckart–Young); the pseudoinverse; PCA as
  "find the axes of the data cloud"; image compression demo.
- **Key visual:** a unit sphere turning into an ellipsoid, decomposed into
  three moves.
- **Payoff:** the season's main question gets its most complete answer.
  Up to rotations on both sides, a linear map is *just its singular values*.

---

## Act V: Beyond Finite Dimensions (Extrapolation)

### Ep. 16: Functions Are Vectors: Fourier
- **Hook:** can a sound be broken into "basis vectors"?
- **Core ideas:** sines and cosines as an orthonormal basis of L²;
  Fourier coefficients are just ⟨f, eₙ⟩ (Ep. 13's projection, infinitely
  many times). Convergence matters now (completeness again, callback to S1
  Ep. 8): Hilbert spaces. Differentiation is diagonal in the Fourier basis,
  which is why Fourier solves the heat and wave equations.
- **Payoff:** the eigenvector idea from Ep. 9 applied to calculus.

### Ep. 17: Tensors Without Fear
- **Hook:** physicists say "a tensor is something that transforms like a
  tensor." Let's do better.
- **Core ideas:** bilinear maps; the tensor product V ⊗ W defined by its
  **universal property** (bilinear maps out of V × W = linear maps out of
  V ⊗ W). Covariant vs. contravariant = vector-like vs. covector-like slots
  (Ep. 6 colors again). Examples: the inner product as a (0,2)-tensor (the
  metric), a linear map as V* ⊗ W, quantum entanglement as tensors that
  aren't pure products.
- **Payoff:** a clean final example of "describe it, don't build it."

### Ep. 18: Season Finale: Change the Scalars
- **Hook:** what if the scalars aren't a field?
- **Core ideas:** vector spaces over 𝔽₂: error-correcting codes (Hamming
  code), where a parity check is a covector. Modules: "vector spaces over a
  ring." ℤ-modules are exactly abelian groups. Not every module has a basis
  (ℤ/2ℤ as a ℤ-module), which shows what fields were silently giving us.
- **Teaser for S3:** one theorem (structure of finitely generated modules
  over a PID) classifies *both* finite abelian groups *and* Jordan normal
  forms. The two seasons are one story.
