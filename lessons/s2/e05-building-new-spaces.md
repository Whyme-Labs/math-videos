# S2E05: Building New Spaces

> **Season / Act:** Season 2, Part A, Act I: What Is Linear? · **Target runtime:** 18–25 min ·
> **Prerequisites:** S2E02–04 (bases, dimension, linear maps, rank–nullity, matrices); S1E05 (equivalence classes and quotient sets); S1E17 (quotient groups, First Isomorphism Theorem) ·
> **Builds toward:** S2E06–08 (dual spaces, annihilators), S2E10 (tensor products and $\operatorname{Hom}(V,W) \cong V^*\otimes W$), S2E13 (invariant subspaces), S2E17 (orthogonal complements), S2E22–23 (Lᵖ as a quotient), S3E09 (cohomology as a quotient)

## Learning objectives
By the end of this lesson the viewer can:
1. Form sums, intersections, products, and direct sums of subspaces, and prove $\dim(U + W) = \dim U + \dim W - \dim(U\cap W)$.
2. Define the quotient space $V/W$, prove that its operations are well defined, and compute $\dim V/W = \dim V - \dim W$.
3. State and prove the First Isomorphism Theorem $V/\ker T \cong \operatorname{im}T$, and use it to identify quotients concretely.
4. Explain why $\operatorname{Hom}(V, W)$ is a vector space of dimension $(\dim V)(\dim W)$.
5. Explain, using "$+C$" in integration, why a quotient can be more natural than a complement.

## Cold open
"Every calculus student has lost a point for this. You compute the antiderivative of $2x$, write $x^2$, and the teacher circles it in red: *you forgot the $+C$*.

"Why is the $+C$ there? Because differentiation can't tell $x^2$ from $x^2 + 7$ or $x^2 - \pi$. All of those have the same derivative. So 'the' antiderivative isn't a single function. It's a whole family of functions, all vertical shifts of one another.

"Now here's a strange thought. What if we stopped fighting this? What if we *declared* $x^2$, $x^2 + 7$, and $x^2 - \pi$ to be the same object? Blur the whole family into a single point. Then differentiation can no longer confuse two different things, because there's nothing left to confuse. And the antiderivative becomes a perfectly good function, no $+C$ required.

"Season 1 had a name for this move: gluing things together with an equivalence relation. That's how we built the integers, the rationals, the reals, and clock arithmetic. Today we use it to build new vector spaces out of old ones. We'll glue, we'll stack, we'll split, and we'll discover that the set of all linear maps is itself a vector space. And we'll see which constructions need a *choice* and which come for free."

## The story

### 1. Building blocks: subspaces, sums, intersections, products

Let $V$ be a vector space over $F$ and $U, W$ subspaces (↩ S2E01).

- The **intersection** $U \cap W$ is a subspace (if $x, y$ lie in both, so do $x + y$ and $cx$).
- The **union** $U \cup W$ is usually *not* a subspace: in $\mathbb{R}^2$, the union of the two axes contains $(1,0)$ and $(0,1)$ but not their sum.
- The fix is the **sum** $U + W = \lbrace u + w : u \in U, w \in W\rbrace$, the smallest subspace containing both (it is $\operatorname{span}(U \cup W)$).

We can also combine spaces that don't live inside a common space.

> **Definition (product, or external direct sum).** For vector spaces $V_1, V_2$ over $F$, the **product** $V_1 \times V_2$ is the set of pairs $(v_1, v_2)$ with componentwise operations: $(v_1, v_2) + (v_1', v_2') = (v_1 + v_1', v_2 + v_2')$ and $c(v_1, v_2) = (cv_1, cv_2)$.

If $(b_i)$ is a basis of $V_1$ and $(b'_j)$ a basis of $V_2$, the pairs $(b_i, 0)$ and $(0, b'_j)$ form a basis of $V_1\times V_2$, so $\dim(V_1\times V_2) = \dim V_1 + \dim V_2$. For example $\mathbb{R}^2 \times \mathbb{R}^3$ is "the same as" $\mathbb{R}^5$.

> **Theorem (dimension of a sum).** If $U$ and $W$ are finite-dimensional subspaces of $V$, then
> $$\dim(U + W) = \dim U + \dim W - \dim(U\cap W).$$

*Proof.* Consider the linear map $\sigma : U \times W \to V$, $\sigma(u, w) = u + w$. Its image is $U + W$. Its kernel is $\lbrace (u, w) : u + w = 0\rbrace = \lbrace (x, -x) : x \in U \cap W\rbrace$, because $u = -w$ lies in both $U$ and $W$. The map $x \mapsto (x, -x)$ is an isomorphism $U \cap W \to \ker\sigma$, so $\dim\ker\sigma = \dim(U\cap W)$. Rank–nullity (↩ S2E03) gives
$$\dim U + \dim W = \dim(U \times W) = \dim(U\cap W) + \dim(U + W). \qquad\blacksquare$$

This is the inclusion–exclusion principle for dimensions: the overlap is counted twice, so subtract it once.

### 2. Direct sums and complements

> **Definition (direct sum).** $V$ is the **(internal) direct sum** of subspaces $U$ and $W$, written $V = U \oplus W$, if every $v \in V$ can be written as $v = u + w$ with $u \in U$, $w \in W$ in **exactly one** way. Then $W$ is called a **complement** of $U$.

> **Proposition.** $V = U \oplus W$ if and only if $U + W = V$ and $U \cap W = \lbrace 0\rbrace$. In finite dimensions this holds iff $U + W = V$ and $\dim U + \dim W = \dim V$.

*Proof.* Uniqueness fails iff $u + w = u' + w'$ with $(u,w) \ne (u',w')$, iff $u - u' = w' - w$ is a nonzero vector in $U\cap W$. The dimension form follows from the theorem of §1. $\blacksquare$

Every subspace $U$ of a finite-dimensional $V$ has a complement: extend a basis of $U$ to a basis of $V$ (↩ S2E02), and let $W$ be the span of the added vectors. But **complements are not unique.** In $\mathbb{R}^2$, the $x$-axis is complemented by the $y$-axis, and equally well by the line $y = x$, or by any other line through $0$ except the $x$-axis itself. Choosing a complement is like choosing a basis: possible, useful, and arbitrary.

Is there a way to talk about "what's left of $V$ after removing $U$" *without* choosing? Yes. Instead of picking a complement, we *collapse* $U$.

### 3. The construction: quotient spaces

Fix a subspace $W \subseteq V$. Declare two vectors equivalent if they differ by an element of $W$:
$$v \sim v' \iff v - v' \in W.$$
This is an equivalence relation (↩ S1E05): $v - v = 0 \in W$; if $v - v' \in W$ then $v' - v = -(v - v') \in W$; if $v - v', v' - v'' \in W$ then their sum $v - v'' \in W$. The equivalence class of $v$ is the **coset**
$$v + W = \lbrace v + w : w \in W\rbrace,$$
a parallel copy of $W$ passing through $v$. In $\mathbb{R}^3$ with $W$ a line through the origin, the cosets are all the lines parallel to $W$; with $W$ a plane, they're the parallel planes.

> **Definition (quotient space).** $V/W$ is the set of cosets $\lbrace v + W : v \in V\rbrace$, with operations
> $$(v + W) + (v' + W) = (v + v') + W, \qquad c\,(v + W) = cv + W.$$
> The **quotient map** is $\pi : V \to V/W$, $\pi(v) = v + W$.

The visual: collapse $W$ to a point, and each parallel copy of $W$ becomes a single vector.

*The operations are well defined.* A coset has many names: $v + W = \tilde v + W$ whenever $v - \tilde v \in W$. We must check the answers don't depend on the names chosen. Suppose $v - \tilde v \in W$ and $v' - \tilde v' \in W$. Then
$$(v + v') - (\tilde v + \tilde v') = (v - \tilde v) + (v' - \tilde v') \in W,$$
since $W$ is closed under addition; and $cv - c\tilde v = c(v - \tilde v) \in W$, since $W$ is closed under scaling. So sums and scalar multiples of cosets don't depend on representatives. This is exactly where we use that $W$ is a *subspace*, just as quotient groups required a normal subgroup (↩ S1E17). The vector-space axioms for $V/W$ follow from those of $V$, with zero vector $0 + W = W$ itself.

By construction $\pi$ is linear and surjective, and $\ker\pi = \lbrace v : v + W = W\rbrace = W$. Rank–nullity then gives:

> **Corollary.** If $V$ is finite-dimensional, $\dim(V/W) = \dim V - \dim W$.

**Quotient vs. complement.** If $V = U \oplus W$, then $\pi$ restricted to $U$ is an isomorphism $U \to V/W$ (kernel $U\cap W = 0$, and dimensions match). So every complement is a *model* of the quotient. But the quotient itself was built with no choices. In the $x$-axis example, all the different complementary lines are isomorphic to the one, canonical object $\mathbb{R}^2/(x\text{-axis})$, whose elements are horizontal lines, each labeled by its height. This distinction, **natural vs. requires a choice**, returns in S2E08 with $V \cong V^{**}$ vs. $V \cong V^*$, and becomes category theory in S3.

### 4. The payoff: the First Isomorphism Theorem

> **Theorem (First Isomorphism Theorem for vector spaces).** Let $T : V \to W$ be linear. Then
> $$\bar T : V/\ker T \to \operatorname{im}T, \qquad \bar T(v + \ker T) = T(v),$$
> is a well-defined isomorphism. Hence $T = \iota\circ\bar T\circ\pi$: every linear map factors as "collapse, then identify, then include."

*Proof.* Write $K = \ker T$.
- *Well defined:* if $v + K = v' + K$ then $v - v' \in K$, so $T(v) - T(v') = T(v - v') = 0$, i.e. $T(v) = T(v')$.
- *Linear:* $\bar T((v + K) + (v'+K)) = \bar T(v + v' + K) = T(v + v') = T(v) + T(v')$, and similarly for scaling.
- *Injective:* if $\bar T(v + K) = 0$ then $T(v) = 0$, so $v \in K$, so $v + K = K$, the zero of $V/K$.
- *Surjective:* every element of $\operatorname{im}T$ is $T(v) = \bar T(v + K)$. $\blacksquare$

In finite dimensions, taking dimensions recovers rank–nullity: $\dim V - \dim\ker T = \dim\operatorname{im}T$. This is the same theorem as S1E17's $G/\ker\varphi \cong \operatorname{im}\varphi$, with the same proof: the map can't distinguish elements of the same fiber, so glue each fiber to a point and the map becomes injective.

**Payoff to the cold open.** Let $D : \mathcal{P}_3 \to \mathcal{P}_2$ be differentiation. Its kernel is the constants $\mathbb{R}\cdot 1$, its image is all of $\mathcal{P}_2$. So
$$\bar D : \mathcal{P}_3/\mathbb{R} \xrightarrow{\ \cong\ } \mathcal{P}_2$$
is an isomorphism. Its inverse is the antiderivative, and it is a genuine function, landing in the quotient: $\bar D^{-1}(2x) = x^2 + \mathbb{R}$. The "$+C$" was never a sloppy afterthought. It *is* the coset. Integration isn't the inverse of differentiation on polynomials; it is the inverse of differentiation *on polynomials modulo constants*.

### 5. Maps form a space: $\operatorname{Hom}(V, W)$

The set $\operatorname{Hom}(V, W)$ of all linear maps $V \to W$ is itself a vector space under pointwise operations:
$$(S + T)(v) = S(v) + T(v), \qquad (cT)(v) = c\,T(v).$$
(Check: $S + T$ is linear because $(S+T)(u + v) = S(u) + S(v) + T(u) + T(v) = (S+T)(u) + (S+T)(v)$, and similarly for scaling. The zero map is the zero vector.)

> **Theorem.** If $\dim V = n$ and $\dim W = m$, then $\operatorname{Hom}(V, W) \cong F^{m\times n}$, so $\dim \operatorname{Hom}(V, W) = mn$.

*Proof.* Fix bases $\mathcal{B}$ of $V$ and $\mathcal{C}$ of $W$. The map $T \mapsto [T]_{\mathcal{C}\leftarrow\mathcal{B}}$ (↩ S2E04) is linear (the matrix of $S + T$ has columns $[S(b_j) + T(b_j)]_{\mathcal{C}} = [S(b_j)]_{\mathcal{C}} + [T(b_j)]_{\mathcal{C}}$). It is injective (a map is determined by the images of a basis, ↩ S2E03) and surjective (any $m$-tuples of coordinates can be prescribed as images of the basis). The space $F^{m\times n}$ has the basis of matrices $E_{ij}$ with a single $1$ in position $(i,j)$, so its dimension is $mn$. $\blacksquare$

The map $E_{ij}$ corresponds to the linear map "send $b_j$ to $c_i$ and every other basis vector to $0$." Note the isomorphism depends on bases; the space $\operatorname{Hom}(V,W)$ does not. When $W = F$, $\operatorname{Hom}(V, F)$ is the space of linear *measurements* on $V$, with dimension $n\cdot 1 = n$. It is so important it gets its own act: the dual space $V^*$ (↪ S2E06).

**Zoom out (thread: glue things together).** Quotient spaces are Season 1's master tool one level up: $\mathbb{Z}/n\mathbb{Z}$, $\mathbb{Q}$ as fractions modulo equivalence, $\mathbb{R}$ as Cauchy sequences modulo "converging together" (↩ S1E08). Later in Season 2, $L^1$ is built by gluing functions that differ on a set of measure zero (↪ S2E22–23). In Season 3, cohomology is a quotient: closed forms modulo exact ones (↪ S3E09).

**Teaser.** $\operatorname{Hom}(V, F)$, the space of linear measurements on $V$, has the same dimension as $V$. Is it "the same" as $V$? Next episode: covectors, and why the answer is "yes, but only after a choice."

## Worked examples

### Example 1: Sums and intersections of planes in $\mathbb{R}^3$

(a) Let $U = \lbrace z = 0\rbrace$ (the $xy$-plane) and $W = \lbrace x = 0\rbrace$ (the $yz$-plane). Then $U \cap W = \lbrace x = z = 0\rbrace$ is the $y$-axis, dimension 1. The formula predicts $\dim(U + W) = 2 + 2 - 1 = 3$, so $U + W = \mathbb{R}^3$. Directly: $(x, y, z) = (x, y, 0) + (0, 0, z)$ with $(x,y,0) \in U$ and $(0,0,z) \in W$ ✓. The sum is **not** direct: $(0, 1, 0)$ can be written as $(0,1,0) + (0,0,0)$ or $(0,0,0) + (0,1,0)$.

(b) Let $U = \lbrace x + y + z = 0\rbrace$ and $W = \lbrace x - y = 0\rbrace$. Intersection: $x = y$ and $2x + z = 0$, so $z = -2x$; $U\cap W = \operatorname{span}\big((1, 1, -2)\big)$. Check: $1 + 1 - 2 = 0$ ✓, $1 - 1 = 0$ ✓. So $\dim(U + W) = 2 + 2 - 1 = 3$ and $U + W = \mathbb{R}^3$.

(c) $U = \lbrace z = 0\rbrace$ and $L = \operatorname{span}\big((1, 1, 1)\big)$: $U \cap L = 0$ (a multiple $t(1,1,1)$ has $z = t = 0$), and $2 + 1 = 3$, so $\mathbb{R}^3 = U \oplus L$. Decompose $v = (4, 5, 2)$: we need $v = (a, b, 0) + t(1,1,1)$; the $z$-coordinate gives $t = 2$, so $(a, b, 0) = (4 - 2, 5 - 2, 0) = (2, 3, 0)$. Check: $(2,3,0) + (2,2,2) = (4,5,2)$ ✓.

### Example 2: Even plus odd

Let $V = \mathbb{R}^{\mathbb{R}}$ (all functions), $E = \lbrace f : f(-x) = f(x)\rbrace$ (even), $O = \lbrace f : f(-x) = -f(x)\rbrace$ (odd). Both are subspaces. Claim: $V = E \oplus O$.

*Existence:* for any $f$, set $f_e(x) = \tfrac12\big(f(x) + f(-x)\big)$ and $f_o(x) = \tfrac12\big(f(x) - f(-x)\big)$. Then $f_e(-x) = \tfrac12(f(-x) + f(x)) = f_e(x)$, so $f_e \in E$; $f_o(-x) = \tfrac12(f(-x) - f(x)) = -f_o(x)$, so $f_o \in O$; and $f_e + f_o = f$.

*Uniqueness:* if $g \in E\cap O$ then $g(x) = g(-x) = -g(x)$, so $2g(x) = 0$ and $g = 0$.

Instances: $e^x = \cosh x + \sinh x$, where $\cosh x = \tfrac12(e^x + e^{-x})$ and $\sinh x = \tfrac12(e^x - e^{-x})$. And for the season's polynomial, $3x^2 - x + 2 = (3x^2 + 2) + (-x)$. (Over $\mathbb{F}_2$, where $\tfrac12$ doesn't exist and $-x = x$, this decomposition fails: the field matters.)

### Example 3: A quotient of $\mathbb{R}^3$, identified concretely

Let $W = \operatorname{span}\big((1,1,1)\big) \subset \mathbb{R}^3$. Cosets are lines parallel to $(1,1,1)$, and $\dim(\mathbb{R}^3/W) = 3 - 1 = 2$.

*Same coset?* Are $(1, 2, 3)$ and $(0, 1, 2)$ equivalent? Their difference is $(1, 1, 1) \in W$, so yes: $(1,2,3) + W = (0,1,2) + W$. Are $(1,2,3)$ and $(3,2,1)$? Difference $(-2, 0, 2)$, not a multiple of $(1,1,1)$: no.

*Identify the quotient.* Define $T : \mathbb{R}^3 \to \mathbb{R}^2$, $T(x, y, z) = (x - z,\ y - z)$. It is linear. Kernel: $x = z$ and $y = z$, i.e. $\ker T = \operatorname{span}((1,1,1)) = W$. Image: $T(a, b, 0) = (a, b)$, so $T$ is onto $\mathbb{R}^2$. By the First Isomorphism Theorem,
$$\bar T : \mathbb{R}^3/W \to \mathbb{R}^2, \qquad (x,y,z) + W \mapsto (x - z,\ y - z)$$
is an isomorphism. Check on the coset above: $T(1,2,3) = (-2, -1)$ and $T(0,1,2) = (-2, -1)$, the same, as they must be. And $T(3,2,1) = (2, 1) \ne (-2,-1)$, confirming the second pair lies in different cosets. Geometrically: "forget how far along the $(1,1,1)$ direction you are; remember only the differences between coordinates."

### Example 4: Differentiation modulo constants, with matrices

On $\mathcal{P}_3$ the quotient $\mathcal{P}_3/\mathbb{R}$ has dimension $4 - 1 = 3$. The cosets $x + \mathbb{R}$, $x^2 + \mathbb{R}$, $x^3 + \mathbb{R}$ form a basis: they span (any $a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \mathbb{R} = a_1(x + \mathbb{R}) + a_2(x^2 + \mathbb{R}) + a_3(x^3 + \mathbb{R})$, since $a_0 \in \mathbb{R}$), and there are $3 = \dim$ of them.

The induced map $\bar D$ sends $x + \mathbb{R} \mapsto 1$, $x^2 + \mathbb{R} \mapsto 2x$, $x^3 + \mathbb{R} \mapsto 3x^2$. In the basis $(1, x, x^2)$ of $\mathcal{P}_2$:
$$[\bar D] = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3\end{pmatrix},$$
which is invertible (determinant $6 \ne 0$), as the First Isomorphism Theorem promised. Compare the $4\times 4$ matrix of $D$ on $\mathcal{P}_3$ from S2E04: it had a zero column (the constant) and a zero row; the quotient removed exactly the zero column, and restricting the codomain to $\mathcal{P}_2$ removed the zero row. Inverse: $[\bar D]^{-1} = \operatorname{diag}(1, \tfrac12, \tfrac13)$, so $\bar D^{-1}(5 + 4x + 9x^2) = 5x + 2x^2 + 3x^3 + \mathbb{R}$. Check: $\tfrac{d}{dx}(5x + 2x^2 + 3x^3 + C) = 5 + 4x + 9x^2$ ✓.

### Example 5: $\operatorname{Hom}(\mathbb{R}^2, \mathbb{R}^3)$

By the theorem, $\dim\operatorname{Hom}(\mathbb{R}^2, \mathbb{R}^3) = 3\cdot 2 = 6$, with basis the six $3\times 2$ matrices $E_{ij}$. For instance $E_{31}$ is the map $(x, y) \mapsto (0, 0, x)$. The map $T(x, y) = (x + y,\ 2y,\ -x)$ has matrix $\begin{pmatrix} 1 & 1 \\ 0 & 2 \\ -1 & 0\end{pmatrix} = E_{11} + E_{12} + 2E_{22} - E_{31}$. Its coordinates in this basis are its six matrix entries. Note: we never needed $T$ to be "nice" to treat it as a vector; it is a single point of a 6-dimensional space.

## Visual and animation notes
1. **Cold open:** the graphs of $x^2 + C$ for many $C$, stacked vertically, glowing as one family; they blur together into a single glowing blob (S1E05 quotient motif). Callback stamp "↩ S1E05."
2. **Union vs. sum:** the two axes in $\mathbb{R}^2$; adding $(1,0) + (0,1)$ produces a point off both axes; then the sum $U + W$ floods the whole plane.
3. **Product:** a 2D plane and a 3D box "multiplying" into an abstract 5-slot strip.
4. **Complements are not unique:** the $x$-axis fixed; a second line through the origin swings around (y-axis, $y = x$, $y = -3x$), each time decomposing a vector differently; the decomposition arrows wiggle as the complement changes.
5. **Key visual (storyline):** in $\mathbb{R}^3$, a stack of parallel planes (cosets of a plane $W$) collapses: each plane shrinks to a single point, and the points line up along a single line, which is $V/W$. Repeat with parallel lines collapsing onto a plane (Example 3).
6. **Well-definedness:** two different representatives $v, \tilde v$ of the same coset are added to two representatives of another coset; the four sums all land in one coset (highlighted plane).
7. **First Isomorphism Theorem:** the factorization $V \xrightarrow{\pi} V/\ker T \xrightarrow{\bar T} \operatorname{im}T \hookrightarrow W$ drawn as a three-stage machine; side-by-side with S1E17's group diagram.
8. **"$+C$" payoff:** $\frac{d}{dx}$ arrow from the blob $x^2 + \mathbb{R}$ to $2x$; the reverse arrow (integration) now lands on the whole blob, a single point of the quotient.
9. **Hom as a space:** a $3\times 2$ grid of six dials (the $E_{ij}$ coordinates); turning dials morphs a grid transformation from $\mathbb{R}^2$ into $\mathbb{R}^3$.

## Common misconceptions
- **Misconception:** The union of two subspaces is a subspace. **Reality:** only if one contains the other. The sum is the right operation.
- **Misconception:** A subspace has a unique complement ("the" complement). **Reality:** complements are highly non-unique. The *orthogonal* complement is unique, but it requires an inner product (S2E17).
- **Misconception:** $V/W$ is a subspace of $V$. **Reality:** its elements are cosets (sets of vectors), not vectors of $V$. It is isomorphic to any complement of $W$, but not canonically equal to one.
- **Misconception:** Elements of $V/W$ are "vectors with $W$ deleted." **Reality:** they are whole parallel copies of $W$. Each coset has many representatives, and every construction must be checked to be independent of the representative.
- **Misconception:** $\dim(U + W) = \dim U + \dim W$. **Reality:** only for direct sums. In general subtract $\dim(U\cap W)$.
- **Misconception:** "$+C$" is a convention. **Reality:** it records that the antiderivative is a coset of the constants, an element of a quotient space.

## Exercises
- **Warm-up (computational):** Let $U = \operatorname{span}\big((1,0,1,0), (0,1,0,1)\big)$ and $W = \operatorname{span}\big((1,1,0,0), (0,0,1,1)\big)$ in $\mathbb{R}^4$. Compute $\dim(U\cap W)$ and $\dim(U + W)$.
- **Core (conceptual):** (a) In $\mathbb{R}^2/(x\text{-axis})$, what does the coset of $(3, 5)$ look like, and what is $2\cdot\big((3,5) + W\big) + \big((1,-4) + W\big)$? (b) Let $V$ be the space of convergent real sequences and $c_0$ the subspace of sequences converging to $0$. Show $V/c_0 \cong \mathbb{R}$. (Hint: the limit map.)
- **Stretch (proof):** (a) Show that if $W \subseteq U \subseteq V$ are subspaces, then $(V/W)/(U/W) \cong V/U$ (the Third Isomorphism Theorem). (b) Show that the space of symmetric $n\times n$ matrices and the space of antisymmetric ones are complements in $F^{n\times n}$ when $1 + 1 \neq 0$ in $F$, and compute their dimensions.

<details><summary>Hints and answers</summary>

**Warm-up.** $(1,1,1,1) = (1,0,1,0) + (0,1,0,1) = (1,1,0,0) + (0,0,1,1)$ lies in both. A general element of $U$ is $(a, b, a, b)$ and of $W$ is $(c, c, d, d)$; equal iff $a = b = c = d$, so $U\cap W = \operatorname{span}((1,1,1,1))$, dimension 1. Then $\dim(U + W) = 2 + 2 - 1 = 3$.

**Core.** (a) The coset of $(3,5)$ is the horizontal line $y = 5$. The combination is $(6, 10) + (1, -4) + W = (7, 6) + W$, the line $y = 6$: in the quotient only the height matters. (b) $\lim : V \to \mathbb{R}$ is linear (limit laws), surjective (constant sequences), with kernel $c_0$; apply the First Isomorphism Theorem.

**Stretch.** (a) The map $V/W \to V/U$, $v + W \mapsto v + U$, is well defined (since $W \subseteq U$), linear, surjective, with kernel $\lbrace v + W : v \in U\rbrace = U/W$. Apply the First Isomorphism Theorem. (b) $A = \tfrac12(A + A^{\mathsf T}) + \tfrac12(A - A^{\mathsf T})$, and a matrix both symmetric and antisymmetric satisfies $A = -A$, so $A = 0$. Dimensions $n(n+1)/2$ and $n(n-1)/2$, which sum to $n^2$. (Compare Example 2: this is "even plus odd" under $A \mapsto A^{\mathsf T}$.)
</details>

## Historical note
Quotient constructions entered algebra through number theory and group theory: Gauss's congruences (1801), the quotient groups of Jordan and Hölder, and Dedekind's ideals and quotient rings in the late nineteenth century. Quotients of vector spaces became routine only once the axiomatic viewpoint took hold in the 1920s, especially through Emmy Noether's school, which emphasized homomorphisms and isomorphism theorems over computations; Noether's 1927 paper on abstract ideal theory stated the isomorphism theorems in essentially their modern general form, and van der Waerden's *Moderne Algebra* (1930–31) made them standard. In analysis, quotient spaces appeared as Banach spaces were developed in the 1920s and 1930s; the Lebesgue spaces $L^p$ are quotients of spaces of functions by those that vanish almost everywhere. The notation $\operatorname{Hom}$ became standard through homological algebra, for example in Cartan and Eilenberg's *Homological Algebra* (1956).

## Connections
- **Callbacks:** ↩ S1E05 (equivalence classes, quotient sets: the blob motif), ↩ S1E17 (quotient groups and the First Isomorphism Theorem), ↩ S1E08 ($\mathbb{R}$ as a quotient of Cauchy sequences), ↩ S2E03 (rank–nullity), ↩ S2E04 (matrices of maps).
- **Sets up:** ↪ S2E06 ($V^* = \operatorname{Hom}(V, F)$), ↪ S2E08 (annihilators: $(V/W)^* \cong W^0$; natural vs. chosen), ↪ S2E10 ($\operatorname{Hom}(V,W) \cong V^*\otimes W$), ↪ S2E13 (invariant subspaces and quotient maps), ↪ S2E17 (the orthogonal complement as the canonical complement), ↪ S2E22–23 ($L^p$ as quotient spaces), ↪ S3E09 (de Rham cohomology: closed modulo exact), ↪ S3E12 (universal properties of products and quotients).
- **Side quests:** "Projective geometry" (attaches here): lines through the origin as points, another way of collapsing.

## References
- **Primary / historical**
  - Emmy Noether, "Abstrakter Aufbau der Idealtheorie in algebraischen Zahl- und Funktionenkörpern," *Mathematische Annalen* 96 (1927).
  - B. L. van der Waerden, *Moderne Algebra*, 2 vols., Springer, 1930–31 (English translation: *Algebra*).
- **Textbooks**
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (or 3rd ed., 2015), Chapter 1 (1C: sums of subspaces, direct sums), Chapter 2 (2C: dimension of a sum), Chapter 3 (3A: the vector space of linear maps; 3D: $\dim\mathcal{L}(V,W)$; 3E: products and quotients of vector spaces).
  - Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., 1958, Chapter I (direct sums, quotient spaces, dimension of a quotient space).
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., 1971, Chapter 2 (§2.2 Subspaces, sums) and Chapter 3 (§3.2 The Algebra of Linear Transformations; the space $L(V, W)$ and its dimension).
  - Sergei Treil, *Linear Algebra Done Wrong*, Chapter 1 (the section "Linear transformations as a vector space").
- **Accessible**
  - 3Blue1Brown, *Essence of Linear Algebra*, 2016: "Abstract vector spaces" (functions as vectors; differentiation as a linear map).
  - Gilbert Strang, *Introduction to Linear Algebra*, 5th ed., 2016, Chapter 3 (§3.5 Dimensions of the Four Subspaces).
