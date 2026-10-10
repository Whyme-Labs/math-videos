# S2E19: SVD: Every Map Is Rotate–Stretch–Rotate (Part A Finale)

> **Season / Act:** Season 2, Part A finale, Act V (Geometry: Inner Products) · **Target runtime:** 22–25 min ·
> **Prerequisites:** S2E03 (rank–nullity), S2E15 (unitary and orthogonal matrices, polar form of complex numbers), S2E16 (adjoints, four fundamental subspaces), S2E17 (least squares), S2E18 (spectral theorem, positive semidefinite matrices) ·
> **Builds toward:** S2E20 (what breaks in infinite dimensions), S2E21 (operator norm), S2E30 (compact operators and their singular values), side quest *Linear algebra in machine learning*

## Learning objectives
By the end of this lesson the viewer can:
1. State the singular value decomposition $A = U\Sigma V^{\mathsf T}$ for any $m\times n$ matrix and prove it exists, using the spectral theorem for $A^{\mathsf T}A$.
2. Compute the SVD of small matrices by hand and interpret it as rotate–stretch–rotate (unit sphere → ellipsoid).
3. Read off rank, the four fundamental subspaces, the operator norm $\lVert A\rVert = \sigma_1$, the Frobenius norm, and the condition number from the singular values.
4. State and prove the Eckart–Young theorem (best rank-$k$ approximation) in the operator norm, and apply it to image compression.
5. Use the pseudoinverse $A^+ = V\Sigma^+U^{\mathsf T}$ for minimum-norm least squares, and explain PCA as an SVD of a data matrix.

## Cold open
Take any linear map of the plane you like. Write down four random numbers in a $2\times2$ matrix. Now apply it to a circle.

You get an ellipse. Always. Not some wobbly blob, not a lopsided egg: a perfect ellipse, every time, with a longest axis and a shortest axis at right angles. Shear the plane, squash it, reflect it, do something horrible to it, and circles still go to ellipses.

That's suspicious. It means that hiding inside your random matrix there's a pair of perpendicular directions that the map sends to another pair of perpendicular directions, just stretched. And that means your "horrible" map was secretly simple all along: turn the plane, stretch along the axes, turn again.

Last episode's spectral theorem promised that kind of simplicity only for special maps: symmetric ones, from a space to itself. Today we find out that *every* linear map, square or rectangular, symmetric or not, between any two inner product spaces, is rotate–stretch–rotate. This decomposition is how your phone compresses photos, how Netflix-style recommenders find taste profiles, how statisticians find the main trends in a cloud of data, and how numerical software decides whether a system of equations can be trusted.

It is also the right ending for Part A. Up to rotations on each side, a linear map is nothing but a list of stretch factors.

## The story

### 1. The naive attempt: eigenvectors for every map

Eigenvectors ask for directions with $Av = \lambda v$: the output is parallel to the input. That question only makes sense when input and output live in the same space. For a $3\times2$ matrix, $Av \in \mathbb{R}^3$ and $v \in \mathbb{R}^2$ can't be parallel. Even for square matrices, the spectral theorem (↩ S2E18) needs symmetry; a shear has only one eigen-direction, and a rotation has none.

**The crisis.** Eigenvectors use *one* basis for both the input and the output. That's too strict for a map between two different spaces.

**The idea.** Use two orthonormal bases: $v_1, \dots, v_n$ for the input space and $u_1, \dots, u_m$ for the output space, and ask that
$$Av_i = \sigma_iu_i, \qquad \sigma_i \ge 0.$$
Each input axis goes to a (possibly different) output axis, scaled. Geometrically: the unit sphere's orthogonal axes $v_i$ are sent to the orthogonal semi-axes $\sigma_iu_i$ of an ellipsoid.

How do we find such $v_i$? If $Av_i = \sigma_iu_i$ and $Av_j = \sigma_ju_j$ with $u_i \perp u_j$, then $0 = \langle Av_i, Av_j\rangle = \langle A^{\mathsf T}Av_i, v_j\rangle$. So we need an orthonormal basis that $A^{\mathsf T}A$ keeps orthogonal. The matrix $A^{\mathsf T}A$ is symmetric, and the spectral theorem hands us exactly that: its eigenvectors.

### 2. The theorem and its proof

> **Theorem (Singular Value Decomposition).** Let $A$ be a real $m\times n$ matrix (or a linear map between finite-dimensional real inner product spaces). Then there are orthogonal matrices $U$ ($m\times m$) and $V$ ($n\times n$) and an $m\times n$ matrix $\Sigma$ with nonnegative entries $\sigma_1 \ge \sigma_2 \ge \cdots \ge \sigma_p \ge 0$ ($p = \min(m,n)$) on its diagonal and zeros elsewhere, such that
> $$A = U\Sigma V^{\mathsf T}.$$
> The $\sigma_i$ are the **singular values** of $A$; they are uniquely determined (they are the square roots of the eigenvalues of $A^{\mathsf T}A$). The columns $v_i$ of $V$ are **right singular vectors**, the columns $u_i$ of $U$ **left singular vectors**. Over ℂ the same holds with $U, V$ unitary and $V^{\mathsf T}$ replaced by $V^*$.

*Proof.* **Step 1 (input axes).** $A^{\mathsf T}A$ is $n\times n$ and symmetric, and positive semidefinite because $\langle A^{\mathsf T}Ax, x\rangle = \langle Ax, Ax\rangle = \lVert Ax\rVert^2 \ge 0$. By the spectral theorem it has an orthonormal eigenbasis $v_1, \dots, v_n$ with eigenvalues $\lambda_1 \ge \cdots \ge \lambda_n \ge 0$. Put $\sigma_i = \sqrt{\lambda_i}$, and let $r$ be the number of positive $\lambda_i$.

**Step 2 (output axes).** The images $Av_i$ are mutually orthogonal, with lengths $\sigma_i$:
$$\langle Av_i, Av_j\rangle = \langle A^{\mathsf T}Av_i, v_j\rangle = \lambda_i\langle v_i, v_j\rangle = \lambda_i\delta_{ij}.$$
For $i \le r$ set $u_i = Av_i/\sigma_i$; these are orthonormal. For $i > r$, $\lVert Av_i\rVert^2 = \lambda_i = 0$, so $Av_i = 0$.

**Step 3 (complete).** Extend $u_1, \dots, u_r$ to an orthonormal basis $u_1, \dots, u_m$ of $\mathbb{R}^m$ (Gram–Schmidt, ↩ S2E17). Now $Av_i = \sigma_iu_i$ for all $i \le p$ (with $\sigma_i = 0$ for $i > r$) and $Av_i = 0$ for $i > m$. In matrix form $AV = U\Sigma$, and since $V$ is orthogonal, $A = U\Sigma V^{\mathsf T}$.

**Uniqueness of the $\sigma_i$.** From $A = U\Sigma V^{\mathsf T}$ we get $A^{\mathsf T}A = V(\Sigma^{\mathsf T}\Sigma)V^{\mathsf T}$, so the $\sigma_i^2$ are the eigenvalues of $A^{\mathsf T}A$, whichever SVD we started from. ∎

**Rotate–stretch–rotate.** Read $A = U\Sigma V^{\mathsf T}$ right to left: $V^{\mathsf T}$ rotates (or reflects) the input so the $v_i$ line up with the coordinate axes; $\Sigma$ stretches axis $i$ by $\sigma_i$ (and drops or pads dimensions if $m \neq n$); $U$ rotates the result into place. The unit sphere becomes an ellipsoid with semi-axes $\sigma_iu_i$. That is the cold open's ellipse, explained.

**Compact form.** Dropping the zero parts gives the **reduced SVD** and the **outer-product expansion**
$$A = \sum_{i=1}^r\sigma_i\,u_iv_i^{\mathsf T},$$
a sum of $r$ rank-one pieces, ordered by importance.

### 3. Everything you can read off

Let $A = U\Sigma V^{\mathsf T}$ with $r$ nonzero singular values.
- **Rank** $= r$. The SVD is how software computes rank: count singular values above a tolerance.
- **Four fundamental subspaces** (↩ S2E16): $\operatorname{im}A = \operatorname{span}(u_1..u_r)$, $\ker A^{\mathsf T} = \operatorname{span}(u_{r+1}..u_m)$, $\operatorname{im}A^{\mathsf T} = \operatorname{span}(v_1..v_r)$, $\ker A = \operatorname{span}(v_{r+1}..v_n)$. All with orthonormal bases at once.
- **Frobenius norm:** $\lVert A\rVert_F^2 = \sum_{j,k}a_{jk}^2 = \sum_i\sigma_i^2$ (orthogonal matrices don't change it).
- **Determinant** (square $A$): $\lvert\det A\rvert = \sigma_1\cdots\sigma_n$, the volume scaling factor of S2E11.
- **Condition number** (square, invertible): $\kappa(A) = \sigma_1/\sigma_n$, how much relative errors in $b$ can be amplified when solving $Ax = b$.
- **Operator norm.** The maximum stretch is the largest singular value:

> **Proposition.** $\displaystyle\lVert A\rVert := \max_{x\neq0}\frac{\lVert Ax\rVert}{\lVert x\rVert} = \sigma_1.$
>
> *Proof.* Write $x = \sum c_iv_i$, so $\lVert x\rVert^2 = \sum c_i^2$ and $Ax = \sum\sigma_ic_iu_i$, hence $\lVert Ax\rVert^2 = \sum\sigma_i^2c_i^2 \le \sigma_1^2\sum c_i^2 = \sigma_1^2\lVert x\rVert^2$. Equality at $x = v_1$. ∎

Plant this firmly: in S2E21 the **operator norm** $\sup\lVert Tx\rVert/\lVert x\rVert$ becomes the central quantity for maps between infinite-dimensional spaces, where it may be infinite.

- **Polar decomposition.** For square $A$, insert $V^{\mathsf T}V = I$:
$$A = U\Sigma V^{\mathsf T} = \underbrace{(UV^{\mathsf T})}_{\text{orthogonal}}\ \underbrace{(V\Sigma V^{\mathsf T})}_{\text{positive semidefinite}}.$$
This is the matrix version of $z = e^{i\theta}r$ promised in S2E15: every map is a "pure stretch" (positive semidefinite, $\sqrt{A^{\mathsf T}A}$) followed by a "pure rotation."

### 4. Eckart–Young: the best low-rank approximation

Truncate the outer-product expansion after $k$ terms:
$$A_k = \sum_{i=1}^k\sigma_iu_iv_i^{\mathsf T}.$$

> **Theorem (Eckart–Young, 1936; Mirsky, 1960 for the operator norm and general unitarily invariant norms).** For every matrix $B$ of rank at most $k$,
> $$\lVert A - B\rVert \ge \sigma_{k+1} = \lVert A - A_k\rVert \quad\text{and}\quad \lVert A - B\rVert_F \ge \Big(\sum_{i>k}\sigma_i^2\Big)^{1/2} = \lVert A - A_k\rVert_F.$$
> So $A_k$ is a best rank-$k$ approximation in both norms.

*Proof (operator norm).* First, $A - A_k = \sum_{i>k}\sigma_iu_iv_i^{\mathsf T}$ has largest singular value $\sigma_{k+1}$, so $\lVert A - A_k\rVert = \sigma_{k+1}$.

Now let $\operatorname{rank}B \le k$. By rank–nullity (↩ S2E03), $\dim\ker B \ge n - k$. The space $W = \operatorname{span}(v_1, \dots, v_{k+1})$ has dimension $k+1$. Since $(n - k) + (k + 1) > n$, the two subspaces intersect nontrivially: pick a unit vector $x \in \ker B\cap W$, say $x = \sum_{i\le k+1}c_iv_i$ with $\sum c_i^2 = 1$. Then
$$\lVert(A - B)x\rVert = \lVert Ax\rVert = \Big(\sum_{i\le k+1}\sigma_i^2c_i^2\Big)^{1/2} \ge \sigma_{k+1}\Big(\sum c_i^2\Big)^{1/2} = \sigma_{k+1}.$$
So $\lVert A - B\rVert \ge \sigma_{k+1}$. ∎

(The Frobenius case uses Weyl's inequalities for singular values; see Horn & Johnson, Ch. 7, or Golub & Van Loan, §2.4.)

**Image compression.** A grayscale image is an $m\times n$ matrix of brightness values. Storing $A_k$ takes $k$ vectors $u_i$, $k$ vectors $v_i$, and $k$ numbers $\sigma_i$: $k(m + n + 1)$ numbers instead of $mn$. For a $1000\times1000$ image and $k = 50$ that's $50\cdot2001 = 100{,}050$ numbers, about 10% of the original 1,000,000, and for natural images the singular values decay quickly enough that $A_{50}$ is visually close to $A$. (Real formats like JPEG use other transforms; SVD compression is the cleanest demonstration of the *idea*.) The same theorem justifies low-rank adaptation of large neural networks and latent-factor recommender systems (side quest *Linear algebra in machine learning*).

### 5. The pseudoinverse and PCA

**Pseudoinverse.** Define $\Sigma^+$ ($n\times m$) by inverting the nonzero singular values and transposing the shape, and
$$A^+ = V\Sigma^+U^{\mathsf T} = \sum_{i=1}^r\frac{1}{\sigma_i}v_iu_i^{\mathsf T}.$$
> **Proposition.** For any $b$, $x^+ = A^+b$ is the least squares solution of $Ax \approx b$ (↩ S2E17) of smallest norm.

*Sketch.* In the singular bases, $\lVert Ax - b\rVert^2 = \sum_{i\le r}(\sigma_iy_i - \beta_i)^2 + \sum_{i>r}\beta_i^2$ where $y = V^{\mathsf T}x$, $\beta = U^{\mathsf T}b$. The first sum is minimized (to zero) by $y_i = \beta_i/\sigma_i$ for $i \le r$; the $y_i$ for $i > r$ don't matter, and setting them to 0 minimizes $\lVert x\rVert = \lVert y\rVert$. That's $x = V\Sigma^+U^{\mathsf T}b$. When $A$ has independent columns, $A^+ = (A^{\mathsf T}A)^{-1}A^{\mathsf T}$, the normal-equations formula; when $A$ is invertible, $A^+ = A^{-1}$.

**PCA (principal component analysis).** Put $N$ data points in $\mathbb{R}^d$ as the rows of an $N\times d$ matrix $X$, centered so each column has mean 0. The sample covariance matrix is $C = \frac{1}{N-1}X^{\mathsf T}X$. If $X = U\Sigma V^{\mathsf T}$, then $C = V\frac{\Sigma^{\mathsf T}\Sigma}{N-1}V^{\mathsf T}$: the right singular vectors $v_i$ are the **principal directions**, and $\sigma_i^2/(N-1)$ is the variance of the data along $v_i$. Projecting onto $v_1, \dots, v_k$ (↩ S2E17) gives the $k$-dimensional subspace that best fits the cloud, in the sense of minimizing total squared perpendicular distance, which is Eckart–Young again.

### 6. Payoff: a map is its singular values

S2E12–S2E13 asked which properties of a map $T : V \to V$ survive a change of basis $A \mapsto P^{-1}AP$; the complete answer over ℂ was Jordan form. Here the question changes. For a map between *two* inner product spaces, the natural changes of coordinates are orthonormal changes on each side independently, $A \mapsto U_1AV_1^{\mathsf T}$. The SVD gives the complete answer:

> **Two $m\times n$ matrices are related by $A' = U_1AV_1^{\mathsf T}$ (orthogonal $U_1, V_1$) if and only if they have the same singular values.**

*Up to rotations on both sides, a linear map is just its list of singular values.* That is the "invariants" badge of the whole of Part A, in its final form. And the singular values are robust in a way that eigenvalues are not: adding a perturbation $E$ with $\lVert E\rVert \le \varepsilon$ moves each $\sigma_i$ by at most $\varepsilon$ (Weyl), whereas eigenvalues of non-normal matrices can jump wildly.

**Part A in one picture.** Linear maps (Act I) were measured by covectors (Act II) and multilinear machines (Act III), classified by invariants (Act IV), and finally given geometry (Act V): orthogonal projections, the spectral theorem, and now the SVD.

**Cliffhanger.** Look back at what made every theorem in Part A work. The spectral theorem needed an eigenvalue to exist, via a polynomial root or a maximum on a compact sphere. Rank–nullity needed finite dimension. The SVD needed the spectral theorem. *Every theorem in Part A quietly assumed finite dimension.* What if the "vectors" are all continuous functions on $[0,1]$, or all audio signals? Then differentiation is a linear map that turns tiny functions into huge ones, the unit sphere has infinitely many points all $\sqrt2$ apart, and "multiply by $x$" has no eigenvectors at all. Welcome to Part B (↪ S2E20).

## Worked examples

### Example 1: SVD of $A = \begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix}$
**Step 1.** $A^{\mathsf T}A = \begin{pmatrix}3 & 4\\ 0 & 5\end{pmatrix}\begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix} = \begin{pmatrix}9 + 16 & 20\\ 20 & 25\end{pmatrix} = \begin{pmatrix}25 & 20\\ 20 & 25\end{pmatrix}$.
Eigenvalues: $(25 - \lambda)^2 = 400$, so $\lambda = 45$ or $5$. Eigenvectors: $v_1 = \tfrac{1}{\sqrt2}(1, 1)$ for 45, $v_2 = \tfrac{1}{\sqrt2}(-1, 1)$ for 5.
Singular values: $\sigma_1 = \sqrt{45} = 3\sqrt5 \approx 6.708$, $\sigma_2 = \sqrt5 \approx 2.236$.

**Step 2.** $Av_1 = \tfrac{1}{\sqrt2}(3, 9)$, so $u_1 = \frac{Av_1}{3\sqrt5} = \frac{(3,9)}{3\sqrt{10}} = \tfrac{1}{\sqrt{10}}(1, 3)$.
$Av_2 = \tfrac{1}{\sqrt2}(-3, 1)$, so $u_2 = \frac{Av_2}{\sqrt5} = \tfrac{1}{\sqrt{10}}(-3, 1)$. Check $u_1 \perp u_2$: $-3 + 3 = 0$ ✓.

**Result.**
$$\begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix} = \underbrace{\frac{1}{\sqrt{10}}\begin{pmatrix}1 & -3\\ 3 & 1\end{pmatrix}}_{U}\underbrace{\begin{pmatrix}3\sqrt5 & 0\\ 0 & \sqrt5\end{pmatrix}}_{\Sigma}\underbrace{\frac{1}{\sqrt2}\begin{pmatrix}1 & 1\\ -1 & 1\end{pmatrix}}_{V^{\mathsf T}}.$$
**Check** the $(2,1)$ entry: row 2 of $U\Sigma$ is $\tfrac{1}{\sqrt{10}}(9\sqrt5, \sqrt5) = \tfrac{1}{\sqrt2}(9, 1)$; times column 1 of $V^{\mathsf T}$, $\tfrac{1}{\sqrt2}(1, -1)$: $\tfrac12(9 - 1) = 4$ ✓.

**Read-offs.** $\lvert\det A\rvert = 15 = 3\sqrt5\cdot\sqrt5$ ✓. $\lVert A\rVert = 3\sqrt5$. $\lVert A\rVert_F^2 = 9 + 16 + 25 = 50 = 45 + 5$ ✓. Condition number $\kappa = 3\sqrt5/\sqrt5 = 3$. The unit circle goes to an ellipse with semi-axes $3\sqrt5$ along $(1,3)$ and $\sqrt5$ along $(-3, 1)$.

### Example 2: SVD and pseudoinverse of a $3\times2$ matrix
Let $B = \begin{pmatrix}1 & 1\\ 0 & 1\\ 1 & 0\end{pmatrix}$ (the matrix of S2E17, Example 2).

**Step 1.** $B^{\mathsf T}B = \begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}$, eigenvalues $3$ and $1$, eigenvectors $v_1 = \tfrac{1}{\sqrt2}(1,1)$, $v_2 = \tfrac{1}{\sqrt2}(1,-1)$. So $\sigma_1 = \sqrt3$, $\sigma_2 = 1$.

**Step 2.** $Bv_1 = \tfrac{1}{\sqrt2}(2, 1, 1)$, so $u_1 = \frac{1}{\sqrt3}\cdot\frac{1}{\sqrt2}(2,1,1) = \tfrac{1}{\sqrt6}(2,1,1)$. $Bv_2 = \tfrac{1}{\sqrt2}(0, -1, 1)$, so $u_2 = \tfrac{1}{\sqrt2}(0,-1,1)$.

**Step 3.** Complete with a unit vector orthogonal to both: $u_3 = \tfrac{1}{\sqrt3}(-1, 1, 1)$ (check: $-2 + 1 + 1 = 0$ and $0 - 1 + 1 = 0$ ✓). This spans $\ker B^{\mathsf T}$, the normal to the column space found in S2E17.

**Pseudoinverse.** $B^+ = \frac{1}{\sqrt3}v_1u_1^{\mathsf T} + \frac11v_2u_2^{\mathsf T}$:
$$\frac{1}{\sqrt3}\cdot\frac{1}{\sqrt2}\cdot\frac{1}{\sqrt6}\begin{pmatrix}2 & 1 & 1\\ 2 & 1 & 1\end{pmatrix} + \frac{1}{\sqrt2}\cdot\frac{1}{\sqrt2}\begin{pmatrix}0 & -1 & 1\\ 0 & 1 & -1\end{pmatrix} = \frac16\begin{pmatrix}2 & 1 & 1\\ 2 & 1 & 1\end{pmatrix} + \frac12\begin{pmatrix}0 & -1 & 1\\ 0 & 1 & -1\end{pmatrix} = \frac13\begin{pmatrix}1 & -1 & 2\\ 1 & 2 & -1\end{pmatrix}.$$
Check against $(B^{\mathsf T}B)^{-1}B^{\mathsf T} = \tfrac13\begin{pmatrix}2 & -1\\ -1 & 2\end{pmatrix}\begin{pmatrix}1 & 0 & 1\\ 1 & 1 & 0\end{pmatrix} = \tfrac13\begin{pmatrix}1 & -1 & 2\\ 1 & 2 & -1\end{pmatrix}$ ✓.

For $b = (1,2,3)$: $B^+b = \tfrac13(1 - 2 + 6,\ 1 + 4 - 3) = (\tfrac53, \tfrac23)$, the least squares solution found in S2E17 ✓.

### Example 3: Best rank-one approximation (Eckart–Young)
For $A = \begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix}$ from Example 1:
$$A_1 = \sigma_1u_1v_1^{\mathsf T} = 3\sqrt5\cdot\frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}\cdot\frac{1}{\sqrt2}\begin{pmatrix}1 & 1\end{pmatrix} = \frac{3\sqrt5}{\sqrt{20}}\begin{pmatrix}1 & 1\\ 3 & 3\end{pmatrix} = \frac32\begin{pmatrix}1 & 1\\ 3 & 3\end{pmatrix} = \begin{pmatrix}1.5 & 1.5\\ 4.5 & 4.5\end{pmatrix}.$$
Error: $A - A_1 = \begin{pmatrix}1.5 & -1.5\\ -0.5 & 0.5\end{pmatrix} = \sigma_2u_2v_2^{\mathsf T}$, a rank-one matrix with $\lVert A - A_1\rVert = \lVert A - A_1\rVert_F = \sqrt{2.25 + 2.25 + 0.25 + 0.25} = \sqrt5 = \sigma_2$ ✓. By Eckart–Young no rank-one matrix is closer. For comparison, the "obvious" rank-one guess $\begin{pmatrix}0 & 0\\ 4 & 5\end{pmatrix}$ (keep the big row) has error $\lVert\begin{pmatrix}3 & 0\\ 0 & 0\end{pmatrix}\rVert = 3 > \sqrt5 \approx 2.236$.

### Example 4: Polar decomposition
From Example 1, $A = (UV^{\mathsf T})(V\Sigma V^{\mathsf T})$:
- $UV^{\mathsf T} = \frac{1}{\sqrt{10}}\begin{pmatrix}1 & -3\\ 3 & 1\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1 & 1\\ -1 & 1\end{pmatrix} = \frac{1}{\sqrt{20}}\begin{pmatrix}4 & -2\\ 2 & 4\end{pmatrix} = \frac{1}{\sqrt5}\begin{pmatrix}2 & -1\\ 1 & 2\end{pmatrix}$, a rotation by $\arctan\tfrac12 \approx 26.6°$.
- $V\Sigma V^{\mathsf T} = \frac12\begin{pmatrix}1 & -1\\ 1 & 1\end{pmatrix}\begin{pmatrix}3\sqrt5 & 0\\ 0 & \sqrt5\end{pmatrix}\begin{pmatrix}1 & 1\\ -1 & 1\end{pmatrix} = \frac{\sqrt5}{2}\begin{pmatrix}4 & 2\\ 2 & 4\end{pmatrix} = \sqrt5\begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}$, symmetric positive definite.

Check: $\frac{1}{\sqrt5}\begin{pmatrix}2 & -1\\ 1 & 2\end{pmatrix}\cdot\sqrt5\begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix} = \begin{pmatrix}4 - 1 & 2 - 2\\ 2 + 2 & 1 + 4\end{pmatrix} = \begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix}$ ✓. First stretch (by $3\sqrt5$ and $\sqrt5$ along the diagonals), then rotate by $26.6°$.

### Example 5: PCA on four points
Data (already centered): $(2,2), (-2,-2), (1,-1), (-1,1)$, so $X = \begin{pmatrix}2 & 2\\ -2 & -2\\ 1 & -1\\ -1 & 1\end{pmatrix}$.
- $X^{\mathsf T}X = \begin{pmatrix}10 & 6\\ 6 & 10\end{pmatrix}$ (diagonal entries $4 + 4 + 1 + 1$, off-diagonal $4 + 4 - 1 - 1$), eigenvalues $16$ and $4$, eigenvectors $\tfrac{1}{\sqrt2}(1,1)$ and $\tfrac{1}{\sqrt2}(1,-1)$.
- Singular values of $X$: $\sigma_1 = 4$, $\sigma_2 = 2$. Variances along the principal directions: $16/3$ and $4/3$.
- PC1 is the diagonal direction $(1,1)/\sqrt2$, explaining $16/(16 + 4) = 80\%$ of the total variance. Projected onto PC1, the points have coordinates $2\sqrt2, -2\sqrt2, 0, 0$; the best-fit line through the cloud is $y = x$, and the total squared perpendicular distance to it is $\sigma_2^2 = 4$ (each of the last two points is at distance $\sqrt2$) ✓.

## Visual and animation notes
1. **Cold open:** a unit circle with a few colored radii; a random $2\times2$ matrix is applied (linear-map motif: grid deforming, lines staying straight). The circle becomes an ellipse. Repeat with three more random matrices, quickly: always an ellipse.
2. **Key visual (from the storyline):** a unit sphere in 3D turning into an ellipsoid, then decomposed into three moves played in sequence: $V^{\mathsf T}$ (rotate the sphere so the special axes align with $x, y, z$), $\Sigma$ (stretch along axes), $U$ (rotate into final position). The input axes $v_i$ in blue, output axes $u_i$ in a matching lighter blue.
3. **Two cameras:** the "basis camera" motif doubled, one camera on the input space and one on the output; in these cameras the matrix becomes diagonal.
4. **Rectangular case:** a 2D disk mapped into 3D as a flat ellipse floating in space ($3\times2$ matrix), and a 3D ball crushed onto a 2D ellipse ($2\times3$ matrix), with the crushed direction ($\ker A$) highlighted.
5. **Invariant badge:** the singular values pinned on screen as bars while random rotations act on both sides and the matrix entries churn.
6. **Eckart–Young / image compression:** a grayscale photo rebuilt layer by layer from $\sigma_1u_1v_1^{\mathsf T}$, $+\sigma_2u_2v_2^{\mathsf T}$, ..., with a counter showing storage $k(m+n+1)$ and a plot of the singular values decaying. Freeze at $k = 1, 5, 20, 50$.
7. **PCA:** a tilted cloud of points; its covariance ellipse; the principal axes drawn; the cloud projected onto PC1 as a shadow (↩ S2E17 motif).
8. **Part A montage:** quick callbacks (arrows, covector stacks, tensors, eigen-directions, tilted ellipse) assembling into the rotate–stretch–rotate sphere.
9. **Cliffhanger:** the ellipsoid's axes multiply: 4, 5, 10, infinitely many, receding into the distance, with the caption "what if dimension is infinite?"

## Common misconceptions
- **Misconception:** Singular values are the absolute values of the eigenvalues. **Reality:** Only for normal matrices. For $\begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$ the eigenvalues are $0, 0$ but the singular values are $1, 0$.
- **Misconception:** $U$ and $V$ are the same matrix (or inverses of each other). **Reality:** They live on different spaces (output and input) and are generally unrelated; $U = V$ holds for symmetric positive semidefinite matrices.
- **Misconception:** The SVD is unique. **Reality:** The singular values are unique. Singular vectors are unique up to sign when the singular values are distinct and nonzero, and only up to rotations within a subspace when values repeat.
- **Misconception:** Low-rank approximation means deleting rows or columns of the matrix. **Reality:** It means keeping the top singular *directions*, which mix all rows and columns; Example 3 shows that dropping a row does worse.
- **Misconception:** The pseudoinverse is the inverse whenever it exists, so $AA^+ = I$ always. **Reality:** $AA^+$ is the orthogonal projection onto $\operatorname{im}A$ and $A^+A$ the projection onto $\operatorname{im}A^{\mathsf T}$; they equal $I$ only when $A$ is invertible (or has full row/column rank, respectively).

## Exercises
- **Warm-up (computational):**
  1. Find the SVD of $\begin{pmatrix}0 & 2\\ 1 & 0\end{pmatrix}$ and of the row vector $(3, 4)$.
  2. Compute the singular values of $\begin{pmatrix}1 & 1\\ 0 & 1\end{pmatrix}$ (the shear). Compare with its eigenvalues.
  3. Find the best rank-one approximation of $\begin{pmatrix}2 & 0\\ 0 & 1\end{pmatrix}$ and its error.
- **Core (conceptual):**
  4. Show that the nonzero singular values of $A$ and $A^{\mathsf T}$ coincide.
  5. Show that the singular values of a symmetric matrix are the absolute values of its eigenvalues.
  6. Show that an $n\times n$ matrix is orthogonal iff all its singular values equal 1.
- **Stretch (proof or exploration):**
  7. Prove that $\min_{\lVert x\rVert = 1}\lVert Ax\rVert = \sigma_n$ for an $m\times n$ matrix with $m \ge n$, and deduce $\kappa(A) = \sigma_1/\sigma_n$ is the ratio of the largest to smallest stretch.
  8. Show that $A^+$ satisfies the four Penrose equations $AA^+A = A$, $A^+AA^+ = A^+$, $(AA^+)^{\mathsf T} = AA^+$, $(A^+A)^{\mathsf T} = A^+A$.

<details><summary>Hints and answers</summary>

1. $\begin{pmatrix}0&2\\1&0\end{pmatrix} = \begin{pmatrix}1&0\\0&1\end{pmatrix}\begin{pmatrix}2&0\\0&1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}$. For $(3,4)$: $U = (1)$, $\Sigma = (5\ \ 0)$, $v_1 = (3,4)/5$.
2. $A^{\mathsf T}A = \begin{pmatrix}1&1\\1&2\end{pmatrix}$, eigenvalues $\frac{3\pm\sqrt5}{2}$, so $\sigma = \frac{1 + \sqrt5}{2} \approx 1.618$ and $\frac{\sqrt5 - 1}{2} \approx 0.618$ (the golden ratio and its reciprocal!). The eigenvalues are $1, 1$.
3. $\operatorname{diag}(2, 0)$, error 1 in both norms.
4. $AA^{\mathsf T}$ and $A^{\mathsf T}A$ have the same nonzero eigenvalues ($A^{\mathsf T}Av = \lambda v$ ⇒ $AA^{\mathsf T}(Av) = \lambda Av$, and $Av \neq 0$ if $\lambda \neq 0$).
5. $A = QDQ^{\mathsf T}$; write $D = \lvert D\rvert S$ with $S$ a diagonal sign matrix; then $A = (QS)\lvert D\rvert Q^{\mathsf T}$.
6. $A^{\mathsf T}A = I$ iff all eigenvalues of $A^{\mathsf T}A$ are 1 (it is symmetric, so diagonalizable).
7. Same expansion as the operator-norm proof, with $\sum\sigma_i^2c_i^2 \ge \sigma_n^2\sum c_i^2$.
8. Substitute $A = U\Sigma V^{\mathsf T}$, $A^+ = V\Sigma^+U^{\mathsf T}$, and check the four identities for $\Sigma$ and $\Sigma^+$.
</details>

## Historical note
The SVD was discovered independently by Eugenio Beltrami (1873) and Camille Jordan (1874), both working on the simultaneous reduction of bilinear forms; James Joseph Sylvester rediscovered it in 1889. Erhard Schmidt (1907) developed the infinite-dimensional analogue for integral operators, and proved the approximation theorem for them; Hermann Weyl (1912) studied the perturbation of singular values. Carl Eckart and Gale Young (1936), motivated by psychometrics, proved the matrix low-rank approximation theorem that now bears their names; Leon Mirsky (1960) extended it to all unitarily invariant norms. Principal component analysis goes back to Karl Pearson (1901, "lines and planes of closest fit") and Harold Hotelling (1933). The pseudoinverse was introduced by E. H. Moore (1920) and independently by Roger Penrose (1955). The SVD became a practical tool only after Gene Golub and William Kahan (1965) found a stable way to compute it; G. W. Stewart's 1993 survey tells the whole story.

## Connections
- **Callbacks:** ↩ S2E03 (rank–nullity), ↩ S2E11 (determinant as volume scaling), ↩ S2E12–S2E13 (eigenvalues; invariants under similarity), ↩ S2E15 (unitary matrices; polar form $z = e^{i\theta}r$), ↩ S2E16 (four fundamental subspaces), ↩ S2E17 (least squares; the same $B$ and $b$), ↩ S2E18 (spectral theorem; positive semidefinite square roots).
- **Sets up:** ↪ S2E20 (finite dimension was assumed everywhere), ↪ S2E21 (operator norm $\lVert T\rVert$; boundedness), ↪ S2E27 (weak compactness, the replacement for "maximize on the unit sphere"), ↪ S2E30 (compact operators have singular values tending to 0; Schmidt's infinite-dimensional SVD).
- **Side quests:** *Linear algebra in machine learning* (attaches here: low-rank adaptation as Eckart–Young, embeddings, attention); *Graphs as matrices* (spectral clustering).

## References
- **Primary / historical:**
  - C. Eckart and G. Young, "The approximation of one matrix by another of lower rank," *Psychometrika* 1 (1936), no. 3.
  - G. Golub and W. Kahan, "Calculating the singular values and pseudo-inverse of a matrix," *SIAM Journal on Numerical Analysis* 2 (1965).
  - R. Penrose, "A generalized inverse for matrices," *Proceedings of the Cambridge Philosophical Society* 51 (1955).
  - K. Pearson, "On lines and planes of closest fit to systems of points in space," *Philosophical Magazine* (6) 2 (1901).
- **Textbooks:**
  - L. N. Trefethen and D. Bau III, *Numerical Linear Algebra*, SIAM, 1997: Lecture 4 (the singular value decomposition) and Lecture 5 (more on the SVD: rank, norms, low-rank approximation).
  - G. H. Golub and C. F. Van Loan, *Matrix Computations*, 4th ed., Johns Hopkins University Press, 2013: §2.4 (the SVD) and Ch. 8 (computing it).
  - R. A. Horn and C. R. Johnson, *Matrix Analysis*, 2nd ed., Cambridge University Press, 2013: §2.6 (the singular value decomposition) and Ch. 7 (polar form, singular value inequalities).
  - S. Axler, *Linear Algebra Done Right*, 3rd ed., Springer, 2015: §7.D (polar decomposition and singular value decomposition).
  - G. Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016: Ch. 7 (the singular value decomposition, image compression, PCA).
- **Accessible:**
  - G. W. Stewart, "On the early history of the singular value decomposition," *SIAM Review* 35 (1993), no. 4.
  - G. Strang, MIT OpenCourseWare 18.06 *Linear Algebra* (Spring 2010 lectures): Lecture 29 (singular value decomposition).
