# S2E18: The Spectral Theorem

> **Season / Act:** Season 2, Part A, Act V (Geometry: Inner Products) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E09 (symmetric bilinear forms, Sylvester's law of inertia), S2E12 (eigenvectors, diagonalization), S2E15 (unitary spaces, normal matrices), S2E16 (adjoints, self-adjoint maps), S2E17 (orthogonal complements and projections); outside knowledge: partial derivatives and Taylor's theorem ·
> **Builds toward:** S2E19 (SVD), S2E20 (the unit sphere stops being compact), S2E30 (spectral theorem for compact operators), S2E31 (spectrum and quantum mechanics)

## Learning objectives
By the end of this lesson the viewer can:
1. Prove that a self-adjoint map has real eigenvalues and orthogonal eigenvectors, and that it leaves orthogonal complements of eigenvectors invariant.
2. State and prove the spectral theorem for self-adjoint maps (real and complex) by induction on dimension, and write $T = \sum_k\lambda_kP_k$.
3. Find the principal axes of a quadratic form and the axes of a tilted ellipse.
4. Test positive definiteness and use the eigenvalues of the Hessian to classify critical points of a function of several variables.
5. Place the theorem in the larger picture: normal operators over ℂ, and the question of whether the theorem survives in infinite dimensions.

## Cold open
Pick up a book, a phone, or a tennis racket, and toss it in the air with a spin. Most of the time it wobbles chaotically. But there are exactly three directions, all mutually perpendicular, around which it can spin cleanly. Every rigid object has them, no matter how lopsided: a potato, a wrench, a spaceship. Engineers call them the *principal axes*.

Why should a lumpy, asymmetric object have *any* special axes at all? And why perpendicular ones?

Here's a second puzzle that looks unrelated. Draw the curve $5x^2 + 4xy + 2y^2 = 1$. It's an ellipse, but a tilted one. Every ellipse has a longest and a shortest diameter, and they cross at right angles. Can you find them without plotting, and does this "perpendicular axes" business always happen, in any dimension?

Both puzzles have the same answer. The rotational inertia of the object, and the equation of the ellipse, are both described by a *symmetric* matrix. And symmetric matrices come with a guarantee that ordinary matrices don't: a full set of eigen-directions, and every one of them at right angles to the others. Today we prove that guarantee, and see why it is the single most useful theorem in linear algebra.

## The story

### 1. The naive attempt, and a necessary condition

In S2E12 we diagonalized maps by finding a basis of eigenvectors. Two things went wrong. Some maps (rotations of $\mathbb{R}^2$) have no real eigenvalues; others (shears) don't have enough eigenvectors (↩ S2E13). And even when an eigenbasis exists, it can be badly skewed: $\begin{pmatrix}1 & 100\\ 0 & 2\end{pmatrix}$ has eigenvectors $(1,0)$ and $(100, 1)$, nearly parallel.

With an inner product we can ask for the best possible outcome: **an orthonormal basis of eigenvectors.** Which maps have one?

Suppose a real matrix $A$ has an orthonormal eigenbasis. Collect it into an orthogonal matrix $Q$; then $A = QDQ^{\mathsf T}$ with $D$ real diagonal. Transposing, $A^{\mathsf T} = QD^{\mathsf T}Q^{\mathsf T} = QDQ^{\mathsf T} = A$. So:

> **An orthonormal real eigenbasis forces $A$ to be symmetric.**

Symmetry is necessary. The spectral theorem says it is also sufficient. That is surprising: a condition that is visible at a glance (the matrix equals its mirror image across the diagonal) controls something as subtle as the existence and geometry of all eigenvectors.

Coordinate-free, "symmetric" means **self-adjoint**: $\langle Tu, v\rangle = \langle u, Tv\rangle$ for all $u, v$ (↩ S2E16). In an orthonormal basis, self-adjoint maps have symmetric (real) or Hermitian (complex) matrices.

### 2. Three lemmas about self-adjoint maps

Let $T$ be self-adjoint on a finite-dimensional inner product space $V$ (real or complex).

> **Lemma 1 (real eigenvalues).** Every eigenvalue of $T$ is real.
>
> *Proof.* If $Tv = \lambda v$ with $v \neq 0$, then
> $$\lambda\langle v, v\rangle = \langle Tv, v\rangle = \langle v, Tv\rangle = \langle v, \lambda v\rangle = \overline{\lambda}\langle v, v\rangle.$$
> Since $\langle v,v\rangle > 0$, $\lambda = \overline\lambda$. ∎

> **Lemma 2 (orthogonal eigenvectors).** Eigenvectors of $T$ for distinct eigenvalues are orthogonal.
>
> *Proof.* If $Tv = \lambda v$, $Tw = \mu w$, $\lambda \neq \mu$ (both real by Lemma 1), then $\lambda\langle v, w\rangle = \langle Tv, w\rangle = \langle v, Tw\rangle = \mu\langle v, w\rangle$, so $(\lambda - \mu)\langle v, w\rangle = 0$. ∎

> **Lemma 3 (invariant complements).** If $U$ is a subspace with $T(U) \subseteq U$, then $T(U^\perp) \subseteq U^\perp$, and the restriction $T|_{U^\perp}$ is self-adjoint.
>
> *Proof.* Let $w \in U^\perp$ and $u \in U$. Then $\langle Tw, u\rangle = \langle w, Tu\rangle = 0$ because $Tu \in U$. So $Tw \perp U$. Self-adjointness of the restriction is inherited from $T$. ∎

Lemma 3 is the heart of the matter. For a general map, an invariant subspace need not have an invariant complement (the shear's eigenline $\operatorname{span}(e_1)$ has no invariant complement, which is exactly why it can't be diagonalized). For a self-adjoint map, the orthogonal complement is always invariant: *you can peel off one eigen-direction and the rest of the space doesn't get tangled with it.*

### 3. The theorem and its proof

> **Spectral Theorem (self-adjoint case).** Let $V$ be a finite-dimensional real or complex inner product space and $T : V \to V$ self-adjoint. Then $V$ has an orthonormal basis consisting of eigenvectors of $T$, and all eigenvalues are real. In matrix form:
> - every real symmetric $A$ is $A = QDQ^{\mathsf T}$ with $Q$ orthogonal and $D$ real diagonal;
> - every complex Hermitian $A$ is $A = UDU^*$ with $U$ unitary and $D$ real diagonal.

*Proof (induction on $n = \dim V$).* For $n = 1$ any unit vector works.

Let $n \ge 2$. **Step 1: $T$ has an eigenvector.** Over $\mathbb{C}$, the characteristic polynomial has a root by the Fundamental Theorem of Algebra (↩ S1E10), so there is an eigenvector. Over $\mathbb{R}$, this needs one more step: let $A$ be the (real symmetric) matrix of $T$ in an orthonormal basis. Viewed as a complex matrix, $A$ is Hermitian, so it has a complex eigenvalue $\lambda$, which is *real* by Lemma 1. Then $A - \lambda I$ is a real matrix with $\det(A - \lambda I) = 0$, so it has a nonzero *real* null vector $v$: a real eigenvector.

**Step 2: split off.** Normalize $v$ so $\lVert v\rVert = 1$. The line $U = \operatorname{span}(v)$ is invariant, so by Lemma 3, $U^\perp$ is invariant and $T|_{U^\perp}$ is self-adjoint. Since $\dim U^\perp = n - 1$ (↩ S2E17), the induction hypothesis gives an orthonormal eigenbasis $v_2, \dots, v_n$ of $U^\perp$ for $T|_{U^\perp}$.

**Step 3: assemble.** $v, v_2, \dots, v_n$ are orthonormal (the $v_k$ lie in $U^\perp$) and there are $n$ of them, so they form an orthonormal eigenbasis of $V$. ∎

**The rotation is not a counterexample.** A rotation of $\mathbb{R}^2$ is not symmetric (its transpose is the inverse rotation), so Step 1's trick fails: the complex eigenvalues $e^{\pm i\theta}$ are not real. Symmetry is exactly what lets us stay in $\mathbb{R}$.

**A second proof, and a warning for Part B.** There is a variational route to Step 1 for real symmetric $A$: maximize the quadratic form $q(x) = \langle Ax, x\rangle$ over the unit sphere $\{\lVert x\rVert = 1\}$. A maximum exists because the sphere is closed and bounded, hence compact, and a continuous function on a compact set attains its maximum. A Lagrange multiplier computation shows that the maximizer $x^*$ satisfies $Ax^* = \lambda x^*$ with $\lambda = q(x^*)$. So **the largest eigenvalue is the maximum of the Rayleigh quotient** $\langle Ax, x\rangle/\langle x, x\rangle$, and the eigenvector is where it is attained. This proof is beautiful, but it leans on compactness of the unit sphere. In S2E20 we'll see that in infinite dimensions the unit sphere is *not* compact, and this proof breaks. Rescuing it is the job of compact operators (↪ S2E30).

### 4. The spectral decomposition: a map is a weighted sum of projections

Group the orthonormal eigenbasis by eigenvalue. If $\lambda_1, \dots, \lambda_m$ are the distinct eigenvalues and $P_k$ is the orthogonal projection onto the eigenspace $E_k = \ker(T - \lambda_kI)$ (↩ S2E17), then
$$V = E_1 \oplus \cdots \oplus E_m \ (\text{mutually orthogonal}), \qquad I = \sum_{k=1}^m P_k, \qquad T = \sum_{k=1}^m \lambda_kP_k .$$
Here $P_jP_k = 0$ for $j \neq k$. This is the form of the theorem that survives into infinite dimensions (as an integral of projections, ↪ S2E31) and the form quantum mechanics uses: measuring the observable $T$ in the state $\psi$ gives outcome $\lambda_k$ with probability $\lVert P_k\psi\rVert^2$.

It also gives a **functional calculus**: for any function $f$ on the eigenvalues, define
$$f(T) = \sum_k f(\lambda_k)\,P_k .$$
This agrees with the obvious meaning when $f$ is a polynomial, and it defines things that are otherwise awkward: $\sqrt{T}$ for positive $T$, $e^{iT}$ (the unitary of S2E15), $T^{-1} = \sum\lambda_k^{-1}P_k$ when no $\lambda_k = 0$, and the "spectral projections" $\mathbf 1_{(a,b)}(T)$.

### 5. Quadratic forms: principal axes and positive definiteness

A **quadratic form** on $\mathbb{R}^n$ is $q(x) = x^{\mathsf T}Ax$ with $A$ symmetric (any square matrix can be replaced by its symmetric part without changing $q$). By the spectral theorem, $A = QDQ^{\mathsf T}$; put $y = Q^{\mathsf T}x$ (new coordinates along the orthonormal eigenvectors). Then
$$q(x) = x^{\mathsf T}QDQ^{\mathsf T}x = y^{\mathsf T}Dy = \lambda_1y_1^2 + \cdots + \lambda_ny_n^2 .$$
**The cross terms disappear in the eigenbasis.** The eigenvectors are the **principal axes** of $q$. Consequences:

- **Conics and quadrics.** If all $\lambda_k > 0$, the level set $q = 1$ is an ellipsoid with semi-axes $1/\sqrt{\lambda_k}$ along the eigenvectors. Mixed signs give hyperboloids. *An ellipse is a circle seen through a symmetric map*: $\{x : x^{\mathsf T}Ax = 1\} = A^{-1/2}(\text{unit sphere})$, with $A^{-1/2}$ from the functional calculus.
- **Sylvester's law of inertia, explained** (↩ S2E09). S2E09 classified symmetric forms by their signature (numbers of $+$, $-$, $0$) under *any* change of basis. The spectral theorem produces a specific diagonalizing basis that is also orthonormal, and the signature is just the count of positive, negative, and zero eigenvalues. (Under orthogonal changes of basis we keep the eigenvalues themselves; under arbitrary ones only their signs survive.)
- **Positive definiteness.** For symmetric $A$ the following are equivalent: (i) $x^{\mathsf T}Ax > 0$ for all $x \neq 0$; (ii) all eigenvalues are positive; (iii) $A = B^{\mathsf T}B$ for some invertible $B$; (iv) all leading principal minors are positive (Sylvester's criterion). (i)⇔(ii) is immediate from $q = \sum\lambda_ky_k^2$; for (ii)⇒(iii) take $B = \sqrt{A}$. Positive definite matrices are exactly the Gram matrices of inner products (↩ S2E14), which closes a loop: *the inner products on $\mathbb{R}^n$ are the positive definite symmetric matrices*.
- **The principal axes of a rigid body** are the eigenvectors of its (symmetric, positive definite) inertia tensor; the cold open's three perpendicular spin axes are guaranteed by this theorem.

### 6. The second-derivative test in many variables

Let $f : \mathbb{R}^n \to \mathbb{R}$ be twice continuously differentiable with $\nabla f(p) = 0$. Taylor's theorem gives
$$f(p + h) = f(p) + \tfrac12\,h^{\mathsf T}H\,h + o(\lVert h\rVert^2), \qquad H_{ij} = \frac{\partial^2 f}{\partial x_i\partial x_j}(p).$$
The Hessian $H$ is symmetric (equality of mixed partials), so in its eigenbasis $h^{\mathsf T}Hh = \sum\lambda_ky_k^2$:
- all $\lambda_k > 0$: **local minimum**;
- all $\lambda_k < 0$: **local maximum**;
- some positive and some negative: **saddle point** (up along some principal axes, down along others);
- otherwise (some $\lambda_k = 0$, the rest of one sign): the test is inconclusive.

The one-variable test "$f'' > 0$ means minimum" is the $1\times1$ case. In several variables "the second derivative" is a quadratic form, and the spectral theorem is what lets us read its sign.

### 7. Normal operators, and the seed for Part B

Over ℂ, S2E15 already proved the broadest version: **a complex matrix is unitarily diagonalizable iff it is normal** ($N^*N = NN^*$). Self-adjoint maps are the normal maps with real spectrum; unitary maps are the normal maps with spectrum on the unit circle. Over ℝ, a normal matrix is orthogonally similar to a block-diagonal matrix with $1\times1$ blocks (real eigenvalues) and $2\times2$ blocks $\begin{pmatrix}a & -b\\ b & a\end{pmatrix}$ (rotation-scalings, for the complex pairs $a \pm bi$). The self-adjoint case is the one where only $1\times1$ blocks occur.

**Payoff.** Every self-adjoint map is, in the right orthonormal coordinates, just "stretch axis $k$ by $\lambda_k$." The tilted ellipse rotates to align with the axes; the lopsided potato spins cleanly about three perpendicular axes.

**Seed for Part B.** Quantum mechanics needs this theorem for operators on *function spaces*: energy, position, and momentum are "self-adjoint" maps on spaces of wavefunctions. Does the theorem survive? Our induction needed a first eigenvector, and our variational proof needed a compact unit sphere. In S2E20 we'll meet the operator "multiply by $x$," which is self-adjoint and has no eigenvectors at all. The theorem survives in two different forms: for compact operators, eigenvalues and all (↪ S2E30), and for general self-adjoint operators, with "eigenvalues" replaced by the spectrum (↪ S2E31).

## Worked examples

### Example 1: The tilted ellipse $5x^2 + 4xy + 2y^2 = 1$
**Matrix.** $q(x,y) = 5x^2 + 4xy + 2y^2 = \begin{pmatrix}x & y\end{pmatrix}\begin{pmatrix}5 & 2\\ 2 & 2\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}$ (the $4xy$ splits as $2xy + 2yx$).

**Eigenvalues.** $\det\begin{pmatrix}5 - \lambda & 2\\ 2 & 2 - \lambda\end{pmatrix} = \lambda^2 - 7\lambda + 10 - 4 = \lambda^2 - 7\lambda + 6 = (\lambda - 6)(\lambda - 1)$. So $\lambda_1 = 6$, $\lambda_2 = 1$ (both positive: an ellipse).

**Eigenvectors.** For 6: $\begin{pmatrix}-1 & 2\\ 2 & -4\end{pmatrix}v = 0$ gives $v_1 = \tfrac{1}{\sqrt5}(2, 1)$. For 1: $\begin{pmatrix}4 & 2\\ 2 & 1\end{pmatrix}v = 0$ gives $v_2 = \tfrac{1}{\sqrt5}(1, -2)$. Orthogonal: $2 - 2 = 0$ ✓ (Lemma 2).

**Diagonalize.** With $Q = \tfrac{1}{\sqrt5}\begin{pmatrix}2 & 1\\ 1 & -2\end{pmatrix}$, $Q^{\mathsf T}AQ = \operatorname{diag}(6, 1)$, and in coordinates $(X, Y)$ along $v_1, v_2$ the ellipse is
$$6X^2 + Y^2 = 1.$$
Semi-axes: $1/\sqrt6 \approx 0.408$ along $(2,1)$ (the short axis) and $1$ along $(1,-2)$ (the long axis). Check a vertex: $\tfrac{1}{\sqrt6}v_1 = \tfrac{1}{\sqrt{30}}(2,1)$ gives $q = \tfrac{1}{30}(5\cdot4 + 4\cdot2 + 2\cdot1) = \tfrac{30}{30} = 1$ ✓. The other: $v_2 = \tfrac{1}{\sqrt5}(1,-2)$ gives $q = \tfrac15(5 - 8 + 8) = 1$ ✓. Area $= \pi\cdot\tfrac{1}{\sqrt6}\cdot1 = \pi/\sqrt{\det A}$.

### Example 2: A repeated eigenvalue
Let $B = \begin{pmatrix}2 & 1 & 1\\ 1 & 2 & 1\\ 1 & 1 & 2\end{pmatrix} = I + J$, where $J$ is the all-ones matrix.

**Eigenvalues.** $J$ has rank 1 with $J\mathbf 1 = 3\cdot\mathbf 1$ for $\mathbf 1 = (1,1,1)$, and $Jx = 0$ whenever $x_1 + x_2 + x_3 = 0$. So $B\mathbf 1 = 4\cdot\mathbf 1$, and $Bx = x$ on the plane $x_1 + x_2 + x_3 = 0$. Eigenvalues: $4, 1, 1$ (check: trace $= 6 = 4 + 1 + 1$ ✓, det $= 4 = 4\cdot1\cdot1$ ✓).

**Orthonormal eigenbasis.** $q_1 = \tfrac{1}{\sqrt3}(1,1,1)$. The eigenspace for $1$ is a plane; *any* basis of it consists of eigenvectors, but we need an orthonormal one, so apply Gram–Schmidt (↩ S2E17) to $(1,-1,0), (1,0,-1)$:
- $q_2 = \tfrac{1}{\sqrt2}(1,-1,0)$;
- $w = (1,0,-1) - \tfrac{1}{2}(1,-1,0) = (\tfrac12, \tfrac12, -1)$, so $q_3 = \tfrac{1}{\sqrt6}(1, 1, -2)$.

All three are orthonormal, and $Q^{\mathsf T}BQ = \operatorname{diag}(4,1,1)$ (verified numerically).

**Spectral decomposition.** $P_4 = q_1q_1^{\mathsf T} = \tfrac13J$ and $P_1 = I - \tfrac13J$, so
$$B = 4\cdot\tfrac13J + 1\cdot(I - \tfrac13J) = I + J. \ \checkmark$$
Lesson: with a repeated eigenvalue the eigen*vectors* aren't unique, but the eigen*space projections* are.

### Example 3: Classifying critical points with the Hessian
Let $f(x, y) = x^3 - 3xy + y^3$.

**Critical points.** $f_x = 3x^2 - 3y = 0$ and $f_y = -3x + 3y^2 = 0$ give $y = x^2$ and $x = y^2$, so $x = x^4$, i.e. $x = 0$ or $x = 1$. Critical points: $(0,0)$ and $(1,1)$.

**Hessian.** $H(x,y) = \begin{pmatrix}6x & -3\\ -3 & 6y\end{pmatrix}$.
- At $(0,0)$: $H = \begin{pmatrix}0 & -3\\ -3 & 0\end{pmatrix}$, eigenvalues $\pm3$ (eigenvectors $(1,-1)$ for $+3$ and $(1,1)$ for $-3$). Mixed signs: **saddle**. Along the diagonal $x = y = t$, $f = 2t^3 - 3t^2 \approx -3t^2$ (down); along $x = -y = t$, $f = 3t^2$ (up) ✓.
- At $(1,1)$: $H = \begin{pmatrix}6 & -3\\ -3 & 6\end{pmatrix}$, characteristic polynomial $(6 - \lambda)^2 - 9$, eigenvalues $3$ (along $(1,1)$) and $9$ (along $(1,-1)$). Both positive: **local minimum**, with $f(1,1) = 1 - 3 + 1 = -1$.

### Example 4: A Hermitian matrix and its square root
Let $C = \begin{pmatrix}2 & i\\ -i & 2\end{pmatrix}$, Hermitian since $\overline{C}^{\mathsf T} = C$.

**Eigenvalues.** $(2-\lambda)^2 - (i)(-i) = (2 - \lambda)^2 - 1$, so $\lambda = 1, 3$: real, as Lemma 1 promised, and positive, so $C$ is positive definite.

**Eigenvectors.** $C(1, -i) = (2 + i(-i),\ -i + 2(-i)) = (3, -3i) = 3(1,-i)$ and $C(1, i) = (2 + i\cdot i,\ -i + 2i) = (1, i)$. Orthogonal: $\langle(1,-i),(1,i)\rangle = 1 + (-i)\overline{i} = 1 + (-i)(-i) = 1 - 1 = 0$ ✓.

**Projections.** With $u = \tfrac{1}{\sqrt2}(1,-i)$: $P_3 = uu^* = \tfrac12\begin{pmatrix}1 & i\\ -i & 1\end{pmatrix}$ and $P_1 = I - P_3 = \tfrac12\begin{pmatrix}1 & -i\\ i & 1\end{pmatrix}$. Check: $3P_3 + P_1 = \tfrac12\begin{pmatrix}4 & 2i\\ -2i & 4\end{pmatrix} = C$ ✓.

**Square root.** $\sqrt C = \sqrt3\,P_3 + 1\cdot P_1 = \tfrac12\begin{pmatrix}\sqrt3 + 1 & (\sqrt3 - 1)i\\ -(\sqrt3 - 1)i & \sqrt3 + 1\end{pmatrix}$. Check the $(1,1)$ entry of $(\sqrt C)^2$: $\tfrac14\big[(\sqrt3+1)^2 + (\sqrt3-1)i\cdot(-(\sqrt3-1)i)\big] = \tfrac14\big[(4 + 2\sqrt3) + (4 - 2\sqrt3)\big] = 2$ ✓; the $(1,2)$ entry: $\tfrac14\cdot 2(\sqrt3+1)(\sqrt3-1)i = \tfrac14\cdot 2\cdot 2i = i$ ✓.

## Visual and animation notes
1. **Cold open:** a tumbling book with chaotic wobble; then three perpendicular glowing axes appear inside it, and spinning about each in turn is clean. (Optional: the intermediate axis flips, the "tennis racket" effect, as a teaser for nonlinear dynamics.)
2. **Necessary condition:** an orthonormal "camera" (basis motif) aligned with the eigenvectors; the matrix shown in that camera is diagonal; swing the camera back to standard coordinates and the matrix fills in symmetrically, mirrored across the diagonal.
3. **Lemma 3:** a 3D space with one eigen-arrow; the perpendicular plane glows and the map visibly sends the plane into itself. Contrast: for a shear, the complementary line tilts out of itself.
4. **Induction:** peel off one eigen-arrow at a time, each time the remaining space shrinking to the orthogonal complement, until a full orthonormal frame is built.
5. **Key visual (from the storyline):** the tilted ellipse $5x^2 + 4xy + 2y^2 = 1$ rotating to align with the axes, becoming $6X^2 + Y^2 = 1$; the unit circle then stretching into it, "an ellipse is a circle seen through a symmetric map." Linear map motif: the grid deforms with lines staying straight.
6. **Invariant badge:** eigenvalues $6$ and $1$ pinned on screen while the camera rotates and the matrix entries churn.
7. **Hessian:** a 3D surface plot of $x^3 - 3xy + y^3$ with the saddle at the origin (principal axes drawn as up- and down-curving slices) and the bowl at $(1,1)$.
8. **Spectral decomposition:** $T$ shown as a stack of projections, each scaled by its eigenvalue, recombining into $T$; the same picture labeled "measurement outcomes" for the quantum teaser.
9. **Seed for Part B:** the Rayleigh-quotient maximizer on a sphere; then the sphere becomes infinite-dimensional (a fan of axes $e_1, e_2, \dots$) and the maximizing point "escapes" (↪ S2E20).

## Common misconceptions
- **Misconception:** Every diagonalizable real matrix has orthogonal eigenvectors. **Reality:** Only normal ones; for real matrices with real eigenvalues, exactly the symmetric ones.
- **Misconception:** A symmetric matrix with a repeated eigenvalue might fail to be diagonalizable. **Reality:** The spectral theorem guarantees the full eigenspace; repetition only means the eigenvectors are not unique within it.
- **Misconception:** "Positive definite" means all entries are positive. **Reality:** $\begin{pmatrix}1 & 2\\ 2 & 1\end{pmatrix}$ has positive entries and eigenvalue $-1$; $\begin{pmatrix}2 & -1\\ -1 & 2\end{pmatrix}$ has a negative entry and is positive definite.
- **Misconception:** If the Hessian has a zero eigenvalue, the point is a saddle. **Reality:** The test is inconclusive; $x^4 + y^2$ (minimum) and $x^3 + y^2$ (neither) both have Hessian $\operatorname{diag}(0, 2)$ at the origin.
- **Misconception:** The spectral theorem is about symmetric matrices. **Reality:** It is about self-adjoint *maps* relative to an inner product. With a different inner product, a different set of maps is self-adjoint, and their matrices in a non-orthonormal basis need not be symmetric.

## Exercises
- **Warm-up (computational):**
  1. Orthogonally diagonalize $\begin{pmatrix}3 & 4\\ 4 & -3\end{pmatrix}$ and describe the curve $3x^2 + 8xy - 3y^2 = 1$.
  2. Decide whether $\begin{pmatrix}2 & -1 & 0\\ -1 & 2 & -1\\ 0 & -1 & 2\end{pmatrix}$ is positive definite using leading minors, then confirm with its eigenvalues $2 - \sqrt2, 2, 2 + \sqrt2$.
  3. Classify the critical points of $f(x,y) = x^2 + 4xy + y^2 - 6y$.
- **Core (conceptual):**
  4. Show that the largest eigenvalue of a real symmetric $A$ equals $\max_{\lVert x\rVert = 1}x^{\mathsf T}Ax$, using the eigenbasis expansion of $x$.
  5. Show that if $T$ is self-adjoint and $T^k = 0$ for some $k$, then $T = 0$. Why does this fail for non-self-adjoint maps?
  6. Explain why two self-adjoint maps that commute can be diagonalized by the *same* orthonormal basis. (Hint: each eigenspace of one is invariant under the other.)
- **Stretch (proof or exploration):**
  7. Complete the Lagrange-multiplier step of the variational proof: if $x^*$ maximizes $x^{\mathsf T}Ax$ on the unit sphere, show $Ax^* = \lambda x^*$. Then show that the next eigenvalue is the maximum over the unit sphere of $x^{*\perp}$.
  8. (Courant–Fischer) Show that the $k$-th largest eigenvalue of a symmetric $A$ is $\max_{\dim W = k}\ \min_{x\in W,\ \lVert x\rVert = 1}x^{\mathsf T}Ax$.

<details><summary>Hints and answers</summary>

1. Eigenvalues $\pm5$ with eigenvectors $\tfrac{1}{\sqrt5}(2,1)$ for $5$ and $\tfrac{1}{\sqrt5}(1,-2)$ for $-5$. In those coordinates $5X^2 - 5Y^2 = 1$: a hyperbola.
2. Minors $2$, $3$, $4$: all positive, so positive definite; the eigenvalues are all positive ✓.
3. $\nabla f = (2x + 4y,\ 4x + 2y - 6) = 0$ gives $(x,y) = (2, -1)$. Hessian $\begin{pmatrix}2 & 4\\ 4 & 2\end{pmatrix}$, eigenvalues $6$ and $-2$: a saddle.
4. $x = \sum c_kq_k$ with $\sum c_k^2 = 1$ gives $x^{\mathsf T}Ax = \sum\lambda_kc_k^2 \le \lambda_{\max}$, with equality at the top eigenvector.
5. Diagonalize: $T^k = Q\operatorname{diag}(\lambda_i^k)Q^{\mathsf T} = 0$ forces each $\lambda_i = 0$. The shear minus the identity is a nonzero nilpotent, not self-adjoint.
6. If $ST = TS$ and $Tv = \lambda v$ then $T(Sv) = \lambda Sv$; restrict $S$ to each eigenspace of $T$ (still self-adjoint) and diagonalize there.
7. Gradient of $x^{\mathsf T}Ax$ is $2Ax$, of $\lVert x\rVert^2$ is $2x$; at a constrained maximum they are parallel. The complement of $x^*$ is invariant (Lemma 3), so repeat there.
8. Any $k$-dimensional $W$ meets the span of the bottom $n - k + 1$ eigenvectors; there $x^{\mathsf T}Ax \le \lambda_k$. The span of the top $k$ eigenvectors achieves $\lambda_k$.
</details>

## Historical note
The spectral theorem grew out of mechanics and geometry. Euler identified the principal axes of rotating rigid bodies in the 1750s–1760s, and Lagrange used principal-axis transformations of quadratic forms. In 1829 Augustin-Louis Cauchy, studying the equation that determines the secular perturbations of planetary orbits, proved that the roots of the characteristic equation of a real symmetric matrix are real, and showed how to reduce quadratic forms to sums of squares by an orthogonal change of variables. Charles Hermite extended the reality of eigenvalues to Hermitian forms in the 1850s, and James Joseph Sylvester proved his law of inertia in 1852. The word "spectrum" was introduced by David Hilbert in his work on integral equations (1904–1910), where he extended the theorem to infinite-dimensional "quadratic forms in infinitely many variables." It was a happy accident: twenty years later, in quantum mechanics, the spectra of operators turned out to be exactly the frequencies seen in atomic spectral lines.

## Connections
- **Callbacks:** ↩ S1E10 (Fundamental Theorem of Algebra), ↩ S2E09 (symmetric forms, Sylvester's law of inertia), ↩ S2E12 (diagonalization; rotations), ↩ S2E13 (shears are not diagonalizable), ↩ S2E14 (Gram matrices are positive definite), ↩ S2E15 (Hermitian matrices, normal matrices, $e^{iH}$), ↩ S2E16 (self-adjoint maps), ↩ S2E17 (orthogonal complements, projections, Gram–Schmidt).
- **Sets up:** ↪ S2E19 (SVD from the spectral theorem for $A^{\mathsf T}A$), ↪ S2E20 (the unit sphere loses compactness; "multiply by $x$" has no eigenvectors), ↪ S2E30 (spectral theorem for compact self-adjoint operators), ↪ S2E31 (spectral theorem in multiplication-operator form; quantum measurement), ↪ S3E10 (curvature via the eigenvalues of the shape operator).
- **Side quests:** *Graphs as matrices* (the graph Laplacian is symmetric positive semidefinite; its second eigenvalue measures connectivity; attaches after S2E12); *Special relativity* (signature of the Minkowski form; attaches after S2E09).

## References
- **Primary / historical:**
  - A.-L. Cauchy, "Sur l'équation à l'aide de laquelle on détermine les inégalités séculaires des mouvements des planètes," *Exercices de mathématiques* 4 (1829).
  - D. Hilbert, *Grundzüge einer allgemeinen Theorie der linearen Integralgleichungen*, Teubner, 1912 (collecting his papers of 1904–1910).
- **Textbooks:**
  - S. Axler, *Linear Algebra Done Right*, 3rd ed., Springer, 2015: Ch. 7 (7.A self-adjoint and normal operators; 7.B the spectral theorem; 7.C positive operators).
  - R. A. Horn and C. R. Johnson, *Matrix Analysis*, 2nd ed., Cambridge University Press, 2013: Ch. 4 (Hermitian matrices, Rayleigh quotients, Courant–Fischer) and Ch. 7 (positive definite matrices).
  - G. Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016: Ch. 6 (6.4 symmetric matrices; 6.5 positive definite matrices).
  - G. H. Golub and C. F. Van Loan, *Matrix Computations*, 4th ed., Johns Hopkins University Press, 2013: Ch. 8 (the symmetric eigenvalue problem).
- **Accessible:**
  - G. Strang, MIT OpenCourseWare 18.06 *Linear Algebra* (Spring 2010 lectures): Lecture 25 (symmetric matrices and positive definiteness) and Lecture 27 (positive definite matrices and minima).
  - T. Hawkins, "Cauchy and the spectral theory of matrices," *Historia Mathematica* 2 (1975).
