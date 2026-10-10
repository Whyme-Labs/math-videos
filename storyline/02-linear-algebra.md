# Season 2: Spaces, Maps, and Measurements

**Arc:** Linear algebra without starting from matrices. We begin with the
*idea* of linearity, treat maps as the main characters, introduce duality
(measurement) and multilinearity before geometry (inner products), and only
then add lengths and angles. Then we remove the last training wheel,
*finite dimension*, and see which ideas survive, which break, and what new
structure (norms, completeness) we need to fix them. That second half is
functional analysis: Banach spaces, Hilbert spaces, operators, and
distributions.

The season comes in two parts:

| Part | Episodes | Question |
|---|---|---|
| **A: Finite dimensions** | 1–18 | Which properties of a linear map survive any change of coordinates? |
| **B: Infinite dimensions** | 19–30 | What happens when spaces are made of functions, and how much of Part A can we save? |

Part B is the natural place for a break or a separate playlist. It assumes
a bit more calculus (limits, series, integrals), and each episode recaps the
analysis it uses.

**Season hook (cold open of Ep. 1):** an arrow in the plane, the polynomial
3x² − x + 2, an audio clip, and the solutions of y″ + y = 0 appear side by
side. *These are all the same kind of thing.* By the end of the episode,
viewers know why. By the end of the season, they know that the audio clip
lives in a Hilbert space, and that "the value at a point" is a linear
functional that can be continuous or not, depending on the norm.

**Core stance (repeat it often):**
- A vector is anything you can add and scale.
- A linear map is any process that respects adding and scaling.
- A matrix is a picture of a linear map, taken in a chosen basis.
- A linear functional is a measuring device.
- A multilinear map is a measurement that takes several vectors at once.
- Norms and inner products are *extra structure* you choose to add.
- Completeness is what makes limits work, as with ℚ → ℝ in Season 1.

---

# Part A: Finite Dimensions

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
  S1 Ep. 14). Plant the question *"is this kind of basis even useful?"*
  (Part B's answer: usually not.)
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
- **Seed for Part B:** on sequences, the right shift is injective but not
  surjective. That can't happen for a map from a finite-dimensional space to
  itself.

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
- **Payoff:** sets up the central question of Part A: *which properties of
  A are properties of the map, and which are artifacts of the camera angle?*

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

## Act II: Linear Functionals and Duality

This act gives linear functionals a full act, not a footnote. They
come back in every later act: as rows of matrices, as slots of tensors, as
the reason inner products matter, as the dual of a Banach space, and finally
as distributions.

### Ep. 6: Covectors: Measuring Devices
- **Hook:** a temperature gradient, a price list, a row vector. What's the
  difference between a column and a row, really?
- **Core ideas:** a linear functional V → F is a measurement; the dual
  space V*; the dual basis ("measure the i-th coordinate"). Picture a
  covector as a *stack of evenly spaced level lines*, where the measurement
  is "how many lines does the arrow cross?" The kernel of a nonzero
  functional is a hyperplane, and a functional is determined (up to scale)
  by its kernel. Price × quantity is a covector applied to a vector.
- **Key visual:** arrows (vectors, one color) piercing stacks of planes
  (covectors, another color). Keep this color code for the rest of the
  series.
- **Payoff:** the gradient of a function is naturally a covector (df). It
  only becomes an arrow once you choose an inner product (set up for
  Ep. 15).

### Ep. 7: Functionals Everywhere
- **Hook:** "the value at 0," "the area under the curve," "the slope at 1,"
  "the 5th Fourier coefficient." All of these are linear functionals on a
  space of functions.
- **Core ideas:**
  - **Evaluation functionals** δₐ(p) = p(a). On polynomials of degree < n,
    the evaluations at n distinct points form a basis of the dual. The dual
    basis is the **Lagrange interpolation** basis, so interpolation is just
    a change of basis in V*.
  - **Taylor coefficients** p ↦ p⁽ᵏ⁾(0)/k! are the dual basis of 1, x, x², ….
  - **Integration and quadrature:** ∫₀¹ p is a functional. Writing it as a
    combination of evaluations gives Simpson's rule, and Gaussian quadrature
    is the best possible choice of points.
  - **Linear constraints are functionals:** systems of equations as
    "intersections of kernels."
- **Key visual:** a polynomial being "measured" by a row of probes; swap the
  probes and the coordinates change.
- **Seed for the finale (Ep. 30):** δ₀ ("value at 0") is a perfectly good
  functional on polynomials. On a space of rough functions it stops making
  sense. Keep this problem in the back pocket.

### Ep. 8: The Transpose and the Double Dual
- **Core ideas:** every map T : V → W induces a dual map T* : W* → V*
  (measure after mapping); in dual bases its matrix is the transpose. That is
  the meaning of the transpose. Annihilators. **Row rank = column rank**
  follows from duality. The double dual: V ≅ V** *naturally* (no basis
  needed), while V ≅ V* requires a choice. In infinite dimensions, the
  algebraic dual V* is strictly bigger than V (dimension jumps; callback to
  Cantor).
- **Big idea, named gently:** "natural" vs. "requires a choice." This is the
  first glimpse of category theory (S3).
- **Seed for Part B:** "V** = V" fails in infinite dimensions. The spaces
  where a version of it survives get a name: *reflexive* (Ep. 22).

---

## Act III: Multilinear Algebra

The idea of this act: *a multilinear map is a measurement that takes several
vectors at once and is linear in each one separately.* Determinants, inner
products, cross products, and tensors are all examples.

### Ep. 9: Bilinear Forms: Two Inputs, One Number
- **Hook:** a matrix can describe a *map* (vector in, vector out) or a
  *form* (two vectors in, number out). They look identical as grids. Are
  they the same thing?
- **Core ideas:** bilinear forms B(u, v); a bilinear form is the same thing
  as a map V → V* (feed it one vector, get a measurement). **The punchline:**
  under change of basis, maps change as P⁻¹AP (similarity) but forms change
  as PᵀBP (congruence). Same grid of numbers, different objects, different
  invariants. Symmetric vs. alternating forms; nondegeneracy.
  **Sylvester's law of inertia:** a symmetric form is classified by its
  signature (how many +, −, 0). Examples: the dot product (+ + +), the
  Minkowski form of relativity (+ − − −), and the symplectic form of
  Hamiltonian mechanics (alternating).
- **Key visual:** the same 2×2 grid shown twice, once moving a grid of
  arrows, once drawing level curves (ellipse, hyperbola). The camera changes
  and the two grids transform differently.
- **Payoff:** an inner product (Act V) is just a symmetric, positive
  definite bilinear form.

### Ep. 10: Multilinear Maps and the Tensor Product
- **Hook:** physicists say "a tensor is something that transforms like a
  tensor." Let's do better.
- **Core ideas:** multilinear maps V₁ × … × Vₖ → F. The tensor product V ⊗ W
  defined by its **universal property**: bilinear maps out of V × W are the
  same as linear maps out of V ⊗ W. Then a concrete construction (dim V ⊗ W
  = dim V · dim W). Pure tensors v ⊗ w vs. sums of them; tensor rank (for
  matrices it's ordinary rank, for 3-tensors it's NP-hard to compute).
  Identifications: Hom(V, W) ≅ V* ⊗ W; bilinear forms ≅ V* ⊗ V*.
  Covariant vs. contravariant = vector-like vs. covector-like slots (Ep. 6
  colors again). Symmetric tensors ↔ homogeneous polynomials.
- **Applications:** quantum entanglement as tensors that aren't pure
  products; the metric tensor; multi-dimensional data arrays.
- **Payoff:** a clean example of "describe it, don't build it."

### Ep. 11: Alternating Forms, Exterior Algebra, and the Determinant
- **Hook:** the usual cofactor formula is a mess. What is the determinant
  actually measuring?
- **Core ideas:** alternating multilinear forms (swap two inputs, flip the
  sign) measure *signed volume*. The wedge product v ∧ w as an "oriented
  area element"; Λᵏ V has dimension C(n, k). The top power Λⁿ V is
  1-dimensional, so every linear map acts on it as multiplication by a
  single number, **the determinant**. The formula is *forced*.
  det(AB) = det A · det B becomes obvious (scale, then scale). det = 0 ↔
  the map crushes a dimension. Sign = orientation. Cramer's rule as a ratio
  of volumes.
- **Unmasking the cross product:** in 3D, u × v is really the bivector
  u ∧ v, converted to an arrow by the inner product and orientation (the
  Hodge star). That's why it only "works" in 3D.
- **Key visual:** a unit cube deforming into a parallelepiped, with the
  volume counter ticking; a flip turns it "inside out" (negative sign).
- **Extension:** differential forms (side quest).

---

## Act IV: Invariants: What Coordinates Can't Change

### Ep. 12: Eigenvectors: The Map's Own Coordinates
- **Hook:** is there a basis in which this map is as simple as possible?
- **Core ideas:** eigenvectors are directions a map only stretches;
  diagonalization = choosing the basis the map "prefers." Characteristic
  polynomial det(T − λI) (Ep. 11 makes this coordinate-free); trace = sum
  of eigenvalues, det = product. Applications: Fibonacci in closed form,
  Markov chains, PageRank, normal modes of vibration.
- **Field matters:** a rotation of ℝ² has no real eigenvectors; over ℂ it
  has eigenvalues e^{±iθ} (callback to S1 Ep. 10). Algebraic closure is what
  guarantees eigenvalues exist.
- **Key visual:** a grid being sheared or stretched while eigen-directions
  stay on their own lines.

### Ep. 13: When Diagonalization Fails
- **Hook:** the shear (1 1; 0 1) has only one eigen-direction. Now what?
- **Core ideas:** invariant subspaces; generalized eigenvectors; Jordan
  normal form as "diagonal plus a nilpotent nudge"; the minimal polynomial
  and Cayley–Hamilton. The matrix exponential and solving linear ODEs.
  Seed for S3: V as a module over F[x] (the map T acts like "x").
- **Payoff:** over ℂ, every linear map on a finite-dimensional space is
  classified by its Jordan form. (Part B: in infinite dimensions there's
  nothing this clean. The spectrum is the replacement, Ep. 29.)

---

## Act V: Geometry: Inner Products

### Ep. 14: Length and Angle Are a Choice
- **Hook:** so far, nothing in this season had a length. A vector space
  doesn't know what "perpendicular" means.
- **Core ideas:** an inner product = a symmetric positive definite bilinear
  form (Ep. 9). The same space can carry many inner products (show stretched
  "unit circles," i.e. ellipses). Complex inner products are sesquilinear.
  Norms, angles, Cauchy–Schwarz, orthogonality. Inner products on function
  spaces: ⟨f, g⟩ = ∫ f g. The parallelogram law identifies which norms come
  from an inner product.
- **Key visual:** the same plane with different "unit circles": round,
  elliptical, and (as a norm that isn't from an inner product) a diamond
  and a square. These shapes come back in Ep. 20.

### Ep. 15: Identifying Vectors and Covectors
- **Core ideas:** an inner product gives an isomorphism V → V*,
  v ↦ ⟨v, ·⟩ (finite-dimensional Riesz representation). *This* is why we
  usually pretend rows and columns are the same: we silently use the dot
  product. The gradient as an arrow = df converted using the inner product
  (resolves Ep. 6). The adjoint T† as the transpose made geometric:
  ⟨Tv, w⟩ = ⟨v, T†w⟩. Orthogonal / unitary maps preserve the inner product.
- **Payoff:** the duality act and the geometry act snap together. Ep. 26
  repeats this trick in infinite dimensions, where it needs completeness.

### Ep. 16: Projection and Least Squares
- **Core ideas:** orthogonal complements; orthogonal projection as "closest
  point"; Gram–Schmidt (and QR); least squares: the best-fit line *is* a
  projection onto the column space; the normal equations AᵀA x = Aᵀb.
- **Key visual:** a vector dropping its shadow onto a plane; the residual is
  the perpendicular error.

### Ep. 17: The Spectral Theorem
- **Hook:** some maps are guaranteed to be perfectly diagonalizable with
  perpendicular axes. Which ones, and why?
- **Core ideas:** self-adjoint (symmetric / Hermitian) maps have real
  eigenvalues and an orthonormal eigenbasis. Quadratic forms and their
  principal axes (an ellipse is a circle seen through a symmetric map);
  positive-definiteness; the second-derivative test in many variables.
  Normal operators.
- **Key visual:** a tilted ellipse rotating to align with the axes.
- **Seed for Part B:** quantum mechanics wants this theorem for operators on
  *function spaces*. Does it survive? (Eps. 28–29.)

### Ep. 18: SVD: Every Map Is Rotate–Stretch–Rotate (Part A Finale)
- **Hook:** Ep. 17 only covers special maps. What about *every* map, even
  between different spaces?
- **Core ideas:** A = UΣVᵀ: rotate, scale along the axes, rotate. Singular
  values as the "true size" of a map; the largest one is the **operator
  norm** (plant this for Ep. 20); low-rank approximation (Eckart–Young); the
  pseudoinverse; PCA; image compression demo.
- **Key visual:** a unit sphere turning into an ellipsoid, decomposed into
  three moves.
- **Payoff:** up to rotations on both sides, a linear map is *just its
  singular values*. **Cliffhanger:** every theorem in Part A quietly
  assumed finite dimension. What if the space is all functions on [0, 1]?

---

# Part B: Infinite Dimensions (Functional Analysis)

**The turn:** in Part A, the algebra did all the work. In infinite
dimensions, algebra alone is too weak, and we need **topology**: a notion
of closeness (a norm) and a guarantee that limits exist (completeness).
This is the Season 1 story ℚ → ℝ replayed one level up.

## Act VI: Norms and Completeness

### Ep. 19: What Breaks in Infinite Dimensions
- **Hook:** five facts from Part A that quietly fail.
  1. **Injective doesn't imply surjective:** the right shift on sequences.
  2. **Linear maps needn't be "nice":** differentiation on functions can
     turn tiny functions (ε sin(x/ε²)) into huge ones.
  3. **Hamel bases are useless:** they exist (with Choice) but can't be
     written down, and an infinite-dimensional Banach space can never have a
     countable one. We need *infinite sums*, which means we need limits.
  4. **The unit ball isn't compact:** the vectors e₁, e₂, e₃, … are all on
     the unit sphere and all √2 apart. There's no convergent subsequence.
  5. **Eigenvalues can vanish:** "multiply by x" on functions on [0, 1] has
     no eigenvectors at all.
- **Payoff:** a to-do list for Part B. Every later episode repairs one of
  these.

### Ep. 20: Normed Spaces, Unit Balls, and Bounded Operators
- **Core ideas:** a norm is a length function (triangle inequality,
  scaling). The zoo: ℓ¹, ℓ², ℓ^∞ on sequences; the sup norm and the
  L¹ / L² norms on C[0, 1]. Same vector space, different norms, different
  notions of convergence (a spike that gets taller and thinner → 0 in L¹,
  not in sup). In finite dimensions all norms are equivalent; in infinite
  dimensions they aren't. **Bounded = continuous:** a linear map is
  continuous iff ‖Tx‖ ≤ C‖x‖; the operator norm (callback to Ep. 18).
  Differentiation is unbounded in the sup norm. Riesz's lemma: the closed
  unit ball is compact iff the dimension is finite (repairs nothing, but
  explains item 4).
- **Key visual:** unit balls of ℓᵖ in 2D morphing from diamond (p = 1)
  through circle (p = 2) to square (p = ∞).

### Ep. 21: Banach Spaces: Where Limits Live
- **Hook:** the sequence of polynomials 1 + x + x²/2! + … + xⁿ/n! is Cauchy
  in the space of polynomials, but its limit eˣ isn't a polynomial. Sound
  familiar? (It's √2 and ℚ again, from S1 Ep. 7.)
- **Core ideas:** a Banach space is a complete normed space. ℓᵖ, C[0, 1]
  with sup norm, and Lᵖ. **Completion:** C[0, 1] under the L¹ norm has
  holes; filling them (with Cauchy sequences, exactly as in S1 Ep. 8)
  produces L¹. The Lebesgue integral is what makes those new elements
  concrete (side quest). Absolutely convergent series converge iff the
  space is complete. Schauder bases (infinite sums) replace Hamel bases.
- **Showcase, the Banach fixed-point theorem:** a contraction on a complete
  space has exactly one fixed point. Applications: Picard iteration proves
  ODEs have unique solutions; Newton's method; PageRank as a fixed point.
- **Key visual:** S1's "zoom into ℚ and find holes" animation, replayed with
  functions instead of points.

---

## Act VII: Duality in Infinite Dimensions

Linear functionals return in a new form: we now require them to be
**continuous**.

### Ep. 22: The Continuous Dual
- **Core ideas:** X* = bounded linear functionals, itself a Banach space.
  Computing duals: (ℓᵖ)* = ℓ^q with 1/p + 1/q = 1 (Hölder's inequality is
  the pairing); (ℓ¹)* = ℓ^∞, but (ℓ^∞)* is *bigger* than ℓ¹. (c₀)* = ℓ¹.
  Evaluation at a point is continuous for the sup norm but *not* for L¹
  (callback to Ep. 7: "the value at 0" is no longer a legal measurement).
  **Reflexivity:** X → X** is always an isometric embedding; when it's onto,
  X is reflexive (ℓᵖ and Lᵖ for 1 < p < ∞, all Hilbert spaces), but ℓ¹ and
  C[0, 1] aren't. Ep. 8's "V ≅ V**" survives only for some spaces.
- **Key visual:** the ℓᵖ / ℓ^q unit balls as dual shapes (diamond ↔
  square).

### Ep. 23: Hahn–Banach: There Are Enough Measurements
- **Hook:** in an infinite-dimensional space, how do we know there are any
  continuous functionals at all, let alone enough to tell vectors apart?
- **Core ideas:** **analytic form:** a functional defined on a subspace and
  bounded by a norm extends to the whole space without growing. Corollary:
  X* separates points, and ‖x‖ = max over unit functionals |f(x)|. The
  proof uses the Axiom of Choice (Zorn), another callback to S1 Ep. 14.
  **Geometric form:** a closed convex set and a point outside it can be
  separated by a hyperplane, i.e. the kernel of a functional (Ep. 6's
  level sets again).
- **Applications:** duality in linear programming and convex optimization
  (every minimization has a "shadow" maximization); support vector machines
  as separating hyperplanes; Banach limits (a "limit" for every bounded
  sequence).
- **Key visual:** a convex blob and a point, with a plane sliding between
  them.

### Ep. 24: The Big Three Theorems
- **Hook:** some of the most useful theorems in analysis say "if it works
  for each one, it works uniformly." Where does that power come from?
- **Core ideas:** the **Baire category theorem** (a complete space isn't a
  countable union of "thin" sets), then its three consequences:
  - **Uniform boundedness:** a family of operators bounded at every point
    is uniformly bounded.
  - **Open mapping:** a bounded linear surjection between Banach spaces
    maps open sets to open sets, so a bounded bijection has a bounded
    inverse.
  - **Closed graph:** a linear map with a closed graph is bounded.
- **Showcase:** uniform boundedness proves that *some continuous function
  has a Fourier series diverging at a point*, without ever writing one down.
  Existence by pure structure.
- **Payoff:** completeness (again!) gives these theorems their strength.

### Ep. 25: Weak Convergence: Getting Compactness Back
- **Hook:** Ep. 19 said the unit ball isn't compact. Optimization and PDEs
  need compactness. Can we cheat?
- **Core ideas:** weak convergence: xₙ ⇀ x if every measurement converges,
  f(xₙ) → f(x) for all f ∈ X*. In ℓ², eₙ ⇀ 0 even though ‖eₙ‖ = 1: the
  mass "escapes to infinity" where no single functional can see it.
  Oscillating functions sin(nx) ⇀ 0. **Banach–Alaoglu:** the dual unit ball
  is compact in the weak* sense. In reflexive spaces, every bounded sequence
  has a weakly convergent subsequence.
- **Key visual:** a bump traveling off to infinity while each fixed
  "probe" reads values that go to 0.
- **Payoff:** "measure it with functionals" becomes a kind of convergence
  in its own right. This is how existence of minimizers in calculus of
  variations is proved.

---

## Act VIII: Hilbert Spaces and Operators

### Ep. 26: Hilbert Spaces: Infinite-Dimensional Euclidean Geometry
- **Core ideas:** a Hilbert space = inner product + complete. ℓ², L².
  **Projection theorem:** every closed convex set has a unique closest
  point (fails without completeness, and fails in non-Hilbert Banach
  spaces). Orthogonal complements and H = M ⊕ M⊥ for closed M. **Riesz
  representation:** every continuous functional is ⟨·, y⟩ for a unique y,
  so H ≅ H* (Ep. 15, now for infinite dimensions). Orthonormal bases in the
  infinite-sum sense, Bessel and Parseval. **Every separable
  infinite-dimensional Hilbert space is isomorphic to ℓ²**, a big
  "describe, don't build" moment: L²[0, 1], L²(ℝ), and Sobolev spaces are
  all ℓ² in disguise.
- **Key visual:** Ep. 16's "drop a shadow onto a plane," now onto an
  infinite-dimensional subspace, with the error shrinking term by term.

### Ep. 27: Fourier: Functions as Infinite Vectors
- **Hook:** can a sound be broken into "basis vectors"?
- **Core ideas:** {e^{inx}} is an orthonormal basis of L²[−π, π];
  Fourier coefficients are ⟨f, eₙ⟩, and partial sums are projections
  (Ep. 16, infinitely many times). Riesz–Fischer and Parseval: the Fourier
  map L² → ℓ² is a unitary isomorphism (energy is preserved). Convergence
  in L² vs. pointwise (callback to Ep. 24's divergence). Differentiation is
  diagonal in the Fourier basis, which is why Fourier solves the heat and
  wave equations. Other orthonormal bases: Legendre polynomials (Gram–Schmidt
  on 1, x, x², …), Hermite functions, wavelets.
- **Payoff:** the eigenvector idea from Ep. 12 applied to calculus.

### Ep. 28: Compact Operators: The Spectral Theorem Survives
- **Hook:** does Ep. 17's spectral theorem survive in infinite dimensions?
- **Core ideas:** compact operators = limits of finite-rank operators (they
  send bounded sets to nearly finite-dimensional ones). Integral operators
  (Tf)(x) = ∫ K(x, y) f(y) dy are compact. **Spectral theorem for compact
  self-adjoint operators:** an orthonormal eigenbasis with eigenvalues
  → 0. Fredholm alternative: "unique solutions ↔ existence" (rank–nullity's
  infinite-dimensional heir).
- **Application:** Sturm–Liouville problems. A vibrating string's harmonics
  are eigenvectors of the inverse of d²/dx², which is a compact operator.
  Kernel methods in machine learning (Mercer's theorem) as a side note.
- **Key visual:** eigenvalues plotted as dots marching toward 0.

### Ep. 29: Spectrum Beyond Eigenvalues, and Quantum Mechanics
- **Hook:** Ep. 19's "multiply by x" has no eigenvectors. Yet physicists
  measure position all the time.
- **Core ideas:** the spectrum σ(T) = {λ : T − λI has no bounded inverse},
  which can be much larger than the set of eigenvalues. Examples: the right
  shift on ℓ² has no eigenvalues, yet its spectrum is the closed unit disk;
  multiplication by x on L²[0, 1] has spectrum [0, 1] (continuous spectrum).
  The spectrum is always nonempty and compact (complex analysis sneaks in).
  **Unbounded operators:** Hellinger–Toeplitz says a symmetric operator
  defined everywhere must be bounded, and [X, P] = iħ is impossible for
  bounded operators, so position and momentum have to be unbounded and only
  densely defined. The spectral theorem for self-adjoint operators
  (multiplication-operator form).
- **Quantum mechanics dictionary:** states are unit vectors in a Hilbert
  space; observables are self-adjoint operators; possible outcomes are the
  spectrum; probabilities come from projections; composite systems are
  tensor products (Ep. 10).
- **Payoff:** Jordan form (Ep. 13) is replaced by the spectral theorem as
  the classification tool.

### Ep. 30: Season Finale: Distributions: Functionals as Generalized Functions
- **Hook:** the Dirac delta "δ(x) = 0 except at 0, where it's so infinite
  that ∫δ = 1." Physicists use it every day. Is it a function?
- **Core ideas:** no, it's a *linear functional*: δ(φ) = φ(0) on smooth test
  functions φ (the evaluation functional from Ep. 7, finally made
  rigorous). Distributions = continuous linear functionals on test
  functions; every ordinary function f becomes the functional φ ↦ ∫ f φ.
  **Differentiate anything:** define T′(φ) = −T(φ′) (integration by parts
  as a definition). The derivative of the Heaviside step is δ. Green's
  functions: solve L G = δ once, then every source is a superposition.
- **Closing the loop:** Sobolev spaces (functions with derivatives in L²)
  are Hilbert spaces, so the **Riesz representation theorem solves PDEs**:
  the weak form of Poisson's equation −Δu = f has exactly one solution
  (Lax–Milgram). That's how finite element software works.
- **Season montage:** the arc of "measurement": Ep. 6 covectors → Ep. 7
  evaluations → Ep. 10 tensor slots → Ep. 15 Riesz in finite dimensions →
  Ep. 22 continuous duals → Ep. 23 Hahn–Banach → Ep. 26 Riesz in Hilbert
  space → distributions. *A function can be thought of as nothing more than
  the way it responds to measurements.* This is Season 1's thesis again
  ("an object is what you can do with it"), now about functions.
