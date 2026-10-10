# S2E17: Projection and Least Squares

> **Season / Act:** Season 2, Part A, Act V (Geometry: Inner Products) · **Target runtime:** 18–22 min ·
> **Prerequisites:** S2E02 (bases, dimension), S2E05 (direct sums), S2E14 (inner products, Pythagoras, Cauchy–Schwarz), S2E16 (adjoints, $\ker A^* = (\operatorname{im}A)^\perp$); outside knowledge: solving linear systems ·
> **Builds toward:** S2E18 (spectral projections), S2E19 (pseudoinverse), S2E28 (projection theorem in Hilbert space), S2E29 (Fourier partial sums as projections), S2E31 (probabilities from projections), S2E32 (mean ergodic theorem)

## Learning objectives
By the end of this lesson the viewer can:
1. Define the orthogonal complement $U^\perp$ and prove $V = U \oplus U^\perp$ in finite dimensions.
2. Compute the orthogonal projection onto a subspace and prove that it is the unique closest point.
3. Run Gram–Schmidt and read off the QR factorization $A = QR$.
4. Explain least squares as "project $b$ onto the column space," derive the normal equations $A^{\mathsf T}A\hat x = A^{\mathsf T}b$, and fit a line to data by hand.
5. Recognize that the residual of a best fit is always perpendicular to everything the model can produce.

## Cold open
On the first night of 1801, the astronomer Giuseppe Piazzi spotted a faint dot moving against the stars. He tracked it for a few weeks: a new planet, perhaps, later named Ceres. Then it slipped into the glare of the Sun, and it was lost.

To find it again, someone had to compute its orbit from a handful of observations. And here's the problem. An orbit is pinned down by just a few numbers. Piazzi had more measurements than that, and every one of them was slightly wrong: a shaky telescope, a blurry night, a clock off by a second. Feed the data into the equations and they *contradict each other*. There is no orbit that fits all of them exactly.

So what do you do with a system of equations that has no solution?

A 24-year-old Carl Friedrich Gauss had an answer. Don't look for the orbit that fits perfectly; it doesn't exist. Look for the one that's *least wrong*: make the sum of the squared errors as small as possible. His prediction told astronomers where to point their telescopes, and at the end of 1801, Ceres was right there.

Today we'll see that "least wrong" has a picture. Your data is a single arrow in a high-dimensional space. Everything your model can produce is a flat plane. And the best fit is the shadow your arrow casts on that plane, with the error standing perfectly upright.

## The story

### 1. The naive attempt: solve $Ax = b$

Suppose we want a line $y = c + dt$ through the points $(0,1)$, $(1,3)$, $(2,4)$, $(3,4)$. Each point gives one equation:
$$\begin{pmatrix}1 & 0\\ 1 & 1\\ 1 & 2\\ 1 & 3\end{pmatrix}\begin{pmatrix}c\\ d\end{pmatrix} = \begin{pmatrix}1\\3\\4\\4\end{pmatrix}.$$
Four equations, two unknowns. The first two force $c = 1$, $d = 2$, and then the third says $1 + 4 = 4$. No solution. In the language of S2E03, $b$ is not in the image (column space) of $A$, which is a 2-dimensional plane inside $\mathbb{R}^4$.

**The crisis.** Algebra alone has nothing more to say: either $b \in \operatorname{im}A$ or not. To say "this $x$ is *almost* a solution" we need a way to measure how far $Ax$ is from $b$. That is exactly the extra structure an inner product provides (↩ S2E14). With it, the question becomes geometric:

> Find the point of the subspace $U = \operatorname{im}A$ that is closest to $b$.

### 2. Orthogonal complements

> **Definition.** For a subset $U$ of an inner product space $V$, the **orthogonal complement** is
> $$U^\perp = \{v \in V : \langle v, u\rangle = 0 \text{ for all } u \in U\}.$$

$U^\perp$ is always a subspace (it is the intersection of the kernels of the functionals $\langle\cdot, u\rangle$; ↩ S2E16). For example, in $\mathbb{R}^3$ the complement of a plane through the origin is its normal line, and the complement of a line is the perpendicular plane.

> **Theorem (orthogonal decomposition).** If $U$ is a subspace of a finite-dimensional inner product space $V$, then
> $$V = U \oplus U^\perp, \qquad \dim U + \dim U^\perp = \dim V, \qquad (U^\perp)^\perp = U.$$

*Proof.* Choose an orthonormal basis $e_1, \dots, e_m$ of $U$ (Gram–Schmidt, Section 4). For $v \in V$ define
$$p = \sum_{k=1}^m \langle v, e_k\rangle\,e_k \in U.$$
Then $v - p \in U^\perp$: for each $j$, $\langle v - p, e_j\rangle = \langle v, e_j\rangle - \langle v, e_j\rangle = 0$, and orthogonality to each basis vector implies orthogonality to all of $U$. So $v = p + (v - p)$ with $p \in U$, $v - p \in U^\perp$. The sum is direct: if $w \in U\cap U^\perp$ then $\langle w, w\rangle = 0$, so $w = 0$. The dimension formula follows from directness (↩ S2E05). Clearly $U \subseteq (U^\perp)^\perp$, and both have dimension $\dim V - \dim U^\perp = \dim U$, so they are equal. ∎

Compare S2E08's annihilator $U^0 \subseteq V^*$, which also satisfies $\dim U + \dim U^0 = \dim V$. The Riesz map of S2E16 carries $U^\perp$ exactly onto $U^0$: an orthogonal complement is an annihilator, converted from covectors to vectors.

### 3. Projection is the closest point

> **Definition.** The **orthogonal projection** onto $U$ is the map $P_U : V \to V$ sending $v$ to its $U$-component in $V = U \oplus U^\perp$. With an orthonormal basis $e_1, \dots, e_m$ of $U$:
> $$P_U v = \sum_{k=1}^m \langle v, e_k\rangle\,e_k .$$

Properties: $P_U$ is linear, $\operatorname{im}P_U = U$, $\ker P_U = U^\perp$, $P_U^2 = P_U$ (projecting twice changes nothing), and $P_U^* = P_U$ (self-adjoint). Conversely, any linear $P$ with $P^2 = P = P^*$ is the orthogonal projection onto its image. A map with $P^2 = P$ but $P^* \neq P$ is an *oblique* projection: it casts a slanted shadow.

> **Theorem (best approximation).** Let $U$ be a subspace of a finite-dimensional inner product space $V$, and $v \in V$. Then $P_Uv$ is the unique point of $U$ closest to $v$:
> $$\lVert v - P_Uv\rVert < \lVert v - u\rVert \qquad\text{for every } u \in U,\ u \neq P_Uv.$$
>
> *Proof.* Let $p = P_Uv$ and $u \in U$. Write
> $$v - u = (v - p) + (p - u).$$
> The first piece lies in $U^\perp$ (by construction) and the second lies in $U$ (both $p$ and $u$ do). So they are orthogonal, and the Pythagorean theorem (↩ S2E14) gives
> $$\lVert v - u\rVert^2 = \lVert v - p\rVert^2 + \lVert p - u\rVert^2 \ \ge\ \lVert v - p\rVert^2,$$
> with equality if and only if $\lVert p - u\rVert = 0$, i.e. $u = p$. ∎

The converse is also useful: if $p \in U$ and $v - p \perp U$, then $p = P_Uv$. **"Closest" and "the error is perpendicular" are the same condition.** Every least squares formula in this episode is a way of writing $v - p \perp U$.

The proof used only Pythagoras. What it quietly assumed was that the decomposition $V = U \oplus U^\perp$ exists, which we got from a finite orthonormal basis of $U$. In infinite dimensions this is the delicate part: the closest point exists when $U$ is closed and the space is complete (↪ S2E28).

### 4. Gram–Schmidt and QR

Projections need orthonormal bases. Gram–Schmidt manufactures them from any basis by projecting away the part you've already seen.

> **Gram–Schmidt.** Given linearly independent $a_1, \dots, a_n$, define recursively
> $$w_k = a_k - \sum_{j<k}\langle a_k, q_j\rangle\,q_j, \qquad q_k = \frac{w_k}{\lVert w_k\rVert}.$$
> Then $q_1, \dots, q_n$ are orthonormal, and $\operatorname{span}(q_1,\dots,q_k) = \operatorname{span}(a_1,\dots,a_k)$ for each $k$.

*Proof sketch.* By induction: $w_k = a_k - P_{U_{k-1}}a_k$ where $U_{k-1} = \operatorname{span}(q_1,\dots,q_{k-1})$, so $w_k \perp U_{k-1}$. And $w_k \neq 0$ because $a_k \notin U_{k-1} = \operatorname{span}(a_1, \dots, a_{k-1})$ by independence.

Reading the recursion backwards, $a_k = \lVert w_k\rVert\,q_k + \sum_{j<k}\langle a_k, q_j\rangle q_j$: each $a_k$ is a combination of $q_1, \dots, q_k$ only. In matrix form, this is the **QR factorization**:
$$A = QR,$$
where $A = [a_1 \cdots a_n]$ is $m \times n$ with independent columns, $Q = [q_1 \cdots q_n]$ has orthonormal columns ($Q^*Q = I_n$), and $R$ is $n\times n$ upper triangular with positive diagonal $r_{kk} = \lVert w_k\rVert$ and $r_{jk} = \langle a_k, q_j\rangle$. In this language, $P_{\operatorname{im}A} = QQ^*$.

(In floating point the textbook recursion loses orthogonality; numerical libraries use *modified* Gram–Schmidt or Householder reflections, which compute the same $Q$ and $R$ more stably. See Trefethen & Bau, Lectures 7–10.)

### 5. Least squares is a projection

Return to $Ax = b$ with no solution. We seek $\hat x$ minimizing $\lVert Ax - b\rVert$. As $x$ ranges over all inputs, $Ax$ ranges over $U = \operatorname{im}A$. By the best approximation theorem, the minimum is attained exactly when $A\hat x = P_Ub$, i.e. when the residual $b - A\hat x$ is perpendicular to $\operatorname{im}A$. By S2E16, $(\operatorname{im}A)^\perp = \ker A^*$. So:

> **Theorem (normal equations).** $\hat x$ minimizes $\lVert Ax - b\rVert$ if and only if
> $$A^*A\,\hat x = A^*b \qquad (A^{\mathsf T}A\,\hat x = A^{\mathsf T}b \text{ over } \mathbb{R}).$$
> A minimizer always exists. It is unique if and only if the columns of $A$ are independent, in which case
> $$\hat x = (A^*A)^{-1}A^*b, \qquad P_{\operatorname{im}A} = A(A^*A)^{-1}A^*.$$

*Proof.* $b - A\hat x \in \ker A^*$ ⇔ $A^*(b - A\hat x) = 0$ ⇔ the normal equations. Existence: $P_Ub \in \operatorname{im}A$, so some $\hat x$ has $A\hat x = P_Ub$. For uniqueness, note $\ker A^*A = \ker A$: if $A^*Ax = 0$ then $0 = \langle A^*Ax, x\rangle = \lVert Ax\rVert^2$, so $Ax = 0$. Hence $A^*A$ (square, $n\times n$) is invertible iff $\ker A = 0$ iff the columns are independent. ∎

The name "normal" is literal: the equations say the error is normal (perpendicular) to the column space.

**Computing it well.** Forming $A^{\mathsf T}A$ squares the condition number of the problem. With $A = QR$ the normal equations become $R^{\mathsf T}Q^{\mathsf T}QR\hat x = R^{\mathsf T}Q^{\mathsf T}b$, i.e.
$$R\,\hat x = Q^{\mathsf T}b,$$
a triangular system solved by back substitution. This is what `numpy.linalg.lstsq`-style routines do in spirit (often via QR or SVD, ↪ S2E19).

**Different perspective.** In a statistics course, linear regression is presented as calculus: differentiate $\sum(y_i - c - dt_i)^2$ with respect to $c$ and $d$, set to zero. Here the same equations appear with no calculus at all. Setting the derivative to zero *is* the statement that the residual is perpendicular to the directions you can move in. The data vector lives in $\mathbb{R}^{(\text{number of data points})}$, the model is a subspace, and the fit is a shadow.

**Zoom out (thread 6, duality).** The residual $r = b - A\hat x$ is in $\ker A^*$: every *measurement* the model could make of the error, $\langle r, Ae_j\rangle$, reads zero. Least squares makes the error invisible to the model's own measuring devices.

**Teaser.** Fourier coefficients are $\langle f, e_n\rangle$ for orthonormal functions $e_n$; so the $N$-th partial Fourier sum is the projection of $f$ onto $\operatorname{span}\{e_{-N},\dots,e_N\}$, the best approximation by those tones (↪ S2E29). With infinitely many basis vectors, does the projection still exist, and do the shadows converge to $f$? That needs completeness (↪ S2E28). And in S2E32, von Neumann's ergodic theorem will turn time averages into a projection onto the invariant functions.

## Worked examples

### Example 1: Projecting onto a plane in $\mathbb{R}^3$
Project $v = (1, 2, 3)$ onto the plane $U = \{x + y + z = 0\}$.

$U^\perp$ is the line spanned by $n = (1,1,1)$, and projecting onto a line is easy: $P_{U^\perp}v = \frac{\langle v, n\rangle}{\langle n, n\rangle}n = \frac{1+2+3}{3}n = 2n = (2,2,2)$. Since $v = P_Uv + P_{U^\perp}v$,
$$P_Uv = (1,2,3) - (2,2,2) = (-1, 0, 1).$$
**Checks.** $P_Uv \in U$: $-1 + 0 + 1 = 0$ ✓. Residual $v - P_Uv = (2,2,2) \perp U$ ✓. Distance from $v$ to $U$: $\lVert(2,2,2)\rVert = 2\sqrt3$. Pythagoras: $\lVert v\rVert^2 = 14 = \lVert(-1,0,1)\rVert^2 + \lVert(2,2,2)\rVert^2 = 2 + 12$ ✓.

### Example 2: Gram–Schmidt, QR, and a projection matrix
Let
$$B = \begin{pmatrix}1 & 1\\ 0 & 1\\ 1 & 0\end{pmatrix}, \qquad a_1 = (1,0,1),\ a_2 = (1,1,0).$$
**Gram–Schmidt.**
- $\lVert a_1\rVert = \sqrt2$, so $q_1 = \tfrac{1}{\sqrt2}(1,0,1)$.
- $\langle a_2, q_1\rangle = \tfrac{1}{\sqrt2}(1 + 0 + 0) = \tfrac{1}{\sqrt2}$, so $w_2 = a_2 - \tfrac{1}{\sqrt2}q_1 = (1,1,0) - \tfrac12(1,0,1) = (\tfrac12, 1, -\tfrac12)$.
- $\lVert w_2\rVert^2 = \tfrac14 + 1 + \tfrac14 = \tfrac32$, so $q_2 = \sqrt{\tfrac23}\,(\tfrac12, 1, -\tfrac12) = \tfrac{1}{\sqrt6}(1, 2, -1)$.

Check: $\langle q_1, q_2\rangle = \tfrac{1}{\sqrt{12}}(1 + 0 - 1) = 0$ ✓.

**QR.** $r_{11} = \sqrt2$, $r_{12} = \tfrac{1}{\sqrt2}$, $r_{22} = \sqrt{3/2}$:
$$B = \underbrace{\begin{pmatrix}\tfrac{1}{\sqrt2} & \tfrac{1}{\sqrt6}\\ 0 & \tfrac{2}{\sqrt6}\\ \tfrac{1}{\sqrt2} & -\tfrac{1}{\sqrt6}\end{pmatrix}}_{Q}\underbrace{\begin{pmatrix}\sqrt2 & \tfrac{1}{\sqrt2}\\ 0 & \sqrt{3/2}\end{pmatrix}}_{R}.$$
Check column 2: $\tfrac{1}{\sqrt2}q_1 + \sqrt{\tfrac32}q_2 = \tfrac12(1,0,1) + \tfrac12(1,2,-1) = (1,1,0)$ ✓.

**Projection matrix.** $P = QQ^{\mathsf T} = q_1q_1^{\mathsf T} + q_2q_2^{\mathsf T}$:
$$\frac12\begin{pmatrix}1&0&1\\0&0&0\\1&0&1\end{pmatrix} + \frac16\begin{pmatrix}1&2&-1\\2&4&-2\\-1&-2&1\end{pmatrix} = \frac13\begin{pmatrix}2 & 1 & 1\\ 1 & 2 & -1\\ 1 & -1 & 2\end{pmatrix}.$$
Checks: $P$ is symmetric ✓; $\operatorname{tr}P = 2 = \dim U$ ✓; the normal to the column space is $a_1\times a_2 = (-1, 1, 1)$ and $P(-1,1,1) = \tfrac13(-2+1+1,\ -1+2-1,\ -1-1+2) = 0$ ✓.

**Least squares with $B$.** Solve $Bx \approx b = (1,2,3)$. Normal equations: $B^{\mathsf T}B = \begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}$, $B^{\mathsf T}b = (1 + 3,\ 1 + 2) = (4, 3)$. With $(B^{\mathsf T}B)^{-1} = \tfrac13\begin{pmatrix}2 & -1\\ -1 & 2\end{pmatrix}$:
$$\hat x = \tfrac13(8 - 3,\ -4 + 6) = (\tfrac53, \tfrac23).$$
Then $B\hat x = (\tfrac73, \tfrac23, \tfrac53) = Pb$ ✓ and the residual is $b - B\hat x = (-\tfrac43, \tfrac43, \tfrac43) = \tfrac43(-1,1,1)$, a multiple of the normal ✓. Via QR instead: $Q^{\mathsf T}b = (\tfrac{4}{\sqrt2}, \tfrac{1 + 4 - 3}{\sqrt6}) = (2\sqrt2, \tfrac{2}{\sqrt6})$; back substitution in $R\hat x = Q^{\mathsf T}b$ gives $\hat x_2 = \tfrac{2/\sqrt6}{\sqrt{3/2}} = \tfrac23$ and $\sqrt2\,\hat x_1 = 2\sqrt2 - \tfrac{1}{\sqrt2}\cdot\tfrac23$, so $\hat x_1 = 2 - \tfrac13 = \tfrac53$ ✓. (This $\hat x$ reappears as $B^+b$ in S2E19.)

### Example 3: The best-fit line
Data: $(t_i, y_i) = (0,1), (1,3), (2,4), (3,4)$. Model $y = c + dt$, so $A = \begin{pmatrix}1&0\\1&1\\1&2\\1&3\end{pmatrix}$, $b = (1,3,4,4)$.
- $A^{\mathsf T}A = \begin{pmatrix}4 & 0+1+2+3\\ 0+1+2+3 & 0+1+4+9\end{pmatrix} = \begin{pmatrix}4 & 6\\ 6 & 14\end{pmatrix}$.
- $A^{\mathsf T}b = (1+3+4+4,\ 0 + 3 + 8 + 12) = (12, 23)$.
- $\det A^{\mathsf T}A = 56 - 36 = 20$, so $(A^{\mathsf T}A)^{-1} = \tfrac{1}{20}\begin{pmatrix}14 & -6\\ -6 & 4\end{pmatrix}$ and
$$\begin{pmatrix}\hat c\\ \hat d\end{pmatrix} = \frac{1}{20}\begin{pmatrix}168 - 138\\ -72 + 92\end{pmatrix} = \begin{pmatrix}1.5\\ 1\end{pmatrix}.$$

Best line: $y = 1.5 + t$. Projection $p = A\hat x = (1.5, 2.5, 3.5, 4.5)$; residual $e = b - p = (-0.5, 0.5, 0.5, -0.5)$.

**Checks.** $A^{\mathsf T}e = (-0.5 + 0.5 + 0.5 - 0.5,\ 0 + 0.5 + 1 - 1.5) = (0, 0)$ ✓: the residual sums to zero (perpendicular to the "constant" column) and is uncorrelated with $t$ (perpendicular to the $t$ column). Sum of squared errors $\lVert e\rVert^2 = 4\times0.25 = 1$, and Pythagoras: $\lVert b\rVert^2 = 42 = \lVert p\rVert^2 + \lVert e\rVert^2 = (2.25 + 6.25 + 12.25 + 20.25) + 1 = 41 + 1$ ✓. No other line has squared error below 1.

### Example 4: Gram–Schmidt on polynomials gives Legendre
On polynomials with $\langle p, q\rangle = \int_{-1}^1 p(x)q(x)\,dx$, orthogonalize $1, x, x^2, x^3$ (we skip normalizing to keep fractions small).
- $w_0 = 1$, $\langle 1, 1\rangle = 2$.
- $w_1 = x - \frac{\langle x, 1\rangle}{\langle 1,1\rangle}1 = x$, since $\int_{-1}^1 x\,dx = 0$. $\langle x, x\rangle = \tfrac23$.
- $w_2 = x^2 - \frac{\langle x^2, 1\rangle}{2}\cdot 1 - \frac{\langle x^2, x\rangle}{2/3}x = x^2 - \frac{2/3}{2} - 0 = x^2 - \tfrac13$.
- $w_3 = x^3 - 0\cdot 1 - \frac{\langle x^3, x\rangle}{\langle x,x\rangle}x - \frac{\langle x^3, x^2 - 1/3\rangle}{\cdots}(x^2 - \tfrac13) = x^3 - \frac{2/5}{2/3}x - 0 = x^3 - \tfrac35x$.

Up to scaling these are the **Legendre polynomials** $P_0 = 1$, $P_1 = x$, $P_2 = \tfrac12(3x^2 - 1)$, $P_3 = \tfrac12(5x^3 - 3x)$.

**A best approximation.** The best approximation of $x^2$ by polynomials of degree $\le 1$ (in this $L^2$ sense) is its projection onto $\operatorname{span}(1, x)$: $\frac{\langle x^2,1\rangle}{2}\cdot1 + \frac{\langle x^2, x\rangle}{2/3}x = \tfrac13$. The best "line" is the constant $\tfrac13$, and the error is $x^2 - \tfrac13$, which is exactly $w_2$. The squared error is $\int_{-1}^1(x^2 - \tfrac13)^2dx = \tfrac25 - \tfrac49 + \tfrac29 = \tfrac{8}{45}$. Likewise the best quadratic approximation of $x^3$ is $\tfrac35x$, with error $w_3$. Gram–Schmidt *is* repeated least squares: each new orthogonal vector is the error of approximating the next input by the previous ones. These polynomials return in S2E29 as an orthonormal basis of $L^2[-1,1]$.

## Visual and animation notes
1. **Cold open:** night sky, a dot moving for a few frames and vanishing into the Sun's glare; then scattered observation points with a family of candidate curves that each miss some points.
2. **The data arrow:** collapse the four data points into a single blue arrow $b \in \mathbb{R}^4$, rendered as a 3D cartoon (caption: "one data set = one vector"). The column space appears as a translucent plane; $b$ floats above it.
3. **The shadow:** a light directly "above" the plane; $b$ drops its shadow $p$ onto the plane, and the residual $e$ appears as a vertical red segment. A small right-angle marker snaps into place. (Key visual from the storyline.)
4. **Closest point proof:** a second point $u$ in the plane, with the right triangle $v, p, u$ drawn; the hypotenuse $\lVert v - u\rVert$ visibly longer than the leg $\lVert v - p\rVert$. Callback stamp ↩ S2E14 (Pythagoras).
5. **Back to the data:** the same shadow translated back to the $(t, y)$ plot: the fitted line, with residuals drawn as vertical segments that "sum to zero" (balance-scale animation for $A^{\mathsf T}e = 0$).
6. **Gram–Schmidt:** vectors $a_1, a_2, a_3$ in 3D; each new vector has its shadow on the previous span peeled off, leaving a perpendicular stub, which is then scaled to unit length. A staircase matrix $R$ fills in beside it.
7. **Legendre:** the curves $1, x, x^2, x^3$ morphing into $P_0, \dots, P_3$, each new one wiggling once more.
8. **Teaser:** the shadow animation repeated with infinitely many axes (a fan of directions), error shrinking term by term (↪ S2E28's key visual).

## Common misconceptions
- **Misconception:** Least squares minimizes the perpendicular distance from the points to the line. **Reality:** It minimizes the *vertical* errors $y_i - (c + dt_i)$. The "perpendicular" is in data space $\mathbb{R}^m$, not in the $(t, y)$ plane. Minimizing perpendicular distances in the plane is a different problem (total least squares, solved by the SVD).
- **Misconception:** Any $P$ with $P^2 = P$ is an orthogonal projection. **Reality:** Idempotent maps are projections along *some* complement; they are orthogonal projections iff also self-adjoint.
- **Misconception:** To solve least squares you should compute $(A^{\mathsf T}A)^{-1}$. **Reality:** That's fine for hand calculations, but numerically one solves $R\hat x = Q^{\mathsf T}b$ (or uses the SVD); forming $A^{\mathsf T}A$ squares the condition number, and inverting is never needed.
- **Misconception:** $U^\perp$ is "everything not in $U$." **Reality:** It is a subspace of vectors perpendicular to all of $U$; most vectors are in neither $U$ nor $U^\perp$.
- **Misconception:** If $A^{\mathsf T}A$ is singular, least squares has no solution. **Reality:** A minimizer always exists (the projection always exists); singularity only means it is not unique. The SVD picks out the shortest one (↪ S2E19).

## Exercises
- **Warm-up (computational):**
  1. Project $v = (3, 1, 2)$ onto the line spanned by $(1, 1, 1)$ and onto the plane $x + y + z = 0$. Check that the two projections add to $v$.
  2. Find the least squares line through $(-1, 0), (0, 1), (1, 3)$.
  3. Apply Gram–Schmidt to $(1, 1, 0), (1, 0, 1), (0, 1, 1)$ in $\mathbb{R}^3$.
- **Core (conceptual):**
  4. Show that if $P$ is an orthogonal projection then $I - P$ is the orthogonal projection onto $(\operatorname{im}P)^\perp$.
  5. Explain why fitting a constant $y = c$ by least squares gives the mean $c = \frac1m\sum y_i$, using only "the residual is perpendicular to $(1,\dots,1)$."
  6. Show that the eigenvalues of an orthogonal projection are 0 and 1, and that its trace is the dimension of its image.
- **Stretch (proof or exploration):**
  7. Prove that among all solutions of the normal equations, exactly one lies in $(\ker A)^\perp = \operatorname{im}A^*$, and that it has the smallest norm.
  8. Find the best approximation of $e^x$ on $[-1,1]$ by polynomials of degree $\le 1$ in the $L^2$ sense. (Answer involves $\sinh 1$ and $e^{-1}$.)

<details><summary>Hints and answers</summary>

1. Onto the line: $\frac{6}{3}(1,1,1) = (2,2,2)$. Onto the plane: $(3,1,2) - (2,2,2) = (1, -1, 0)$. Sum $= (3,1,2)$ ✓.
2. $A^{\mathsf T}A = \begin{pmatrix}3 & 0\\ 0 & 2\end{pmatrix}$, $A^{\mathsf T}b = (4, 3)$, so $y = \tfrac43 + \tfrac32 t$. Residuals $(\tfrac16, -\tfrac13, \tfrac16)$ sum to 0 ✓.
3. $q_1 = \tfrac{1}{\sqrt2}(1,1,0)$, $q_2 = \tfrac{1}{\sqrt6}(1,-1,2)$, $q_3 = \tfrac{1}{\sqrt3}(-1,1,1)$.
4. $I - P$ is idempotent and self-adjoint, with image $\ker P = (\operatorname{im}P)^\perp$.
5. $\langle y - c\mathbf 1, \mathbf 1\rangle = 0$ gives $\sum y_i - mc = 0$.
6. $Pv = \lambda v$ gives $\lambda^2 v = \lambda v$. In an orthonormal basis adapted to $U \oplus U^\perp$, $P = \operatorname{diag}(1,\dots,1,0,\dots,0)$.
7. Solutions form $\hat x + \ker A$. Decompose $\hat x = x_0 + k$ with $x_0 \in (\ker A)^\perp$; Pythagoras shows $x_0$ is shortest. This $x_0$ is $A^+b$ (↪ S2E19).
8. Project onto $1, x$: coefficient of $1$ is $\frac12\int_{-1}^1e^x = \sinh 1$; coefficient of $x$ is $\frac{3}{2}\int_{-1}^1 xe^x = \frac32\cdot 2e^{-1} = 3e^{-1}$. So $\sinh 1 + 3e^{-1}x \approx 1.1752 + 1.1036x$.
</details>

## Historical note
Adrien-Marie Legendre published the method of least squares in 1805, in an appendix to his work on determining the orbits of comets. Carl Friedrich Gauss published it in 1809 in *Theoria motus corporum coelestium*, claiming he had used it since 1795, which led to a famous priority dispute. Gauss's use of his methods to predict the position of Ceres, found by Piazzi on 1 January 1801 and recovered on 31 December 1801 and 1 January 1802 by Franz Xaver von Zach and Heinrich Olbers close to Gauss's predicted position, made him famous. Gauss later (1821–1823) justified least squares statistically: among linear unbiased estimators it has the smallest variance (now the Gauss–Markov theorem). The orthogonalization process is named after Jørgen Pedersen Gram (1883) and Erhard Schmidt (1907), though Laplace had used a version of it earlier; Schmidt's work was part of the Hilbert-school development of infinite-dimensional geometry.

## Connections
- **Callbacks:** ↩ S2E03 (image of a linear map), ↩ S2E05 (direct sums), ↩ S2E08 (annihilators; $\dim U + \dim U^0 = \dim V$), ↩ S2E14 (inner products, Pythagoras), ↩ S2E15 (Gram–Schmidt works verbatim over ℂ), ↩ S2E16 (adjoints; $\ker A^* = (\operatorname{im}A)^\perp$).
- **Sets up:** ↪ S2E18 (the spectral theorem writes a self-adjoint map as a sum of projections $\sum\lambda_kP_k$), ↪ S2E19 (pseudoinverse $A^+$ and minimum-norm least squares), ↪ S2E28 (projection theorem in Hilbert space; needs completeness), ↪ S2E29 (Fourier partial sums and Legendre polynomials), ↪ S2E31 (quantum probabilities as $\lVert P\psi\rVert^2$), ↪ S2E32 (mean ergodic theorem as a projection).
- **Side quests:** *Linear algebra in machine learning* (linear regression, ridge regression as a modified projection; attaches after S2E19); *Convex duality and optimization* (projection onto convex sets; attaches after S2E25).

## References
- **Primary / historical:**
  - A.-M. Legendre, *Nouvelles méthodes pour la détermination des orbites des comètes*, Paris, 1805 (appendix "Sur la méthode des moindres quarrés").
  - C. F. Gauss, *Theoria motus corporum coelestium in sectionibus conicis solem ambientium*, Hamburg, 1809.
  - E. Schmidt, "Zur Theorie der linearen und nichtlinearen Integralgleichungen. I," *Mathematische Annalen* 63 (1907).
- **Textbooks:**
  - G. Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016: Ch. 4 (Orthogonality: 4.2 Projections, 4.3 Least squares approximations, 4.4 Orthonormal bases and Gram–Schmidt).
  - L. N. Trefethen and D. Bau III, *Numerical Linear Algebra*, SIAM, 1997: Lectures 6–8 (projectors, QR factorization, Gram–Schmidt orthogonalization) and Lecture 11 (least squares problems).
  - S. Axler, *Linear Algebra Done Right*, 3rd ed., Springer, 2015: Ch. 6 (6.B Gram–Schmidt; 6.C orthogonal complements and minimization problems).
  - G. H. Golub and C. F. Van Loan, *Matrix Computations*, 4th ed., Johns Hopkins University Press, 2013: Ch. 5 (orthogonalization and least squares).
- **Accessible:**
  - G. Strang, MIT OpenCourseWare 18.06 *Linear Algebra* (Spring 2010 lectures): Lecture 15 (projections onto subspaces), Lecture 16 (projection matrices and least squares), Lecture 17 (orthogonal matrices and Gram–Schmidt).
  - S. M. Stigler, *The History of Statistics: The Measurement of Uncertainty before 1900*, Harvard University Press, 1986: Ch. 1 (least squares and the Legendre–Gauss story).
