# S2E12: Eigenvectors: The Map's Own Coordinates

> **Season / Act:** Season 2, Part A, Act IV (Invariants: What Coordinates Can't Change) · **Target runtime:** 15–25 min ·
> **Prerequisites:** ↩ S2E03 (kernels), ↩ S2E04 (change of basis, similarity), ↩ S2E11 (the determinant, coordinate-free); ↩ S1E10 (ℂ and the fundamental theorem of algebra) ·
> **Builds toward:** ↪ S2E13 (Jordan form), ↪ S2E15 (unitary diagonalization), ↪ S2E18 (the spectral theorem), ↪ S2E31 (spectrum in infinite dimensions), ↪ S3E03 (characters as traces)

## Learning objectives
By the end of this lesson the viewer can:
1. Define eigenvalues, eigenvectors, and eigenspaces of a linear map, and explain diagonalization as choosing the basis the map "prefers."
2. Compute eigenvalues via the characteristic polynomial $\det(\lambda I - T)$, explain why it is coordinate-free, and use it to show that trace and determinant are the sum and product of the eigenvalues (over ℂ, with multiplicity).
3. Prove that eigenvectors for distinct eigenvalues are linearly independent, and that every linear map on a nonzero finite-dimensional complex space has an eigenvalue.
4. Apply diagonalization to closed formulas and long-run behavior: Fibonacci numbers, Markov chains, and normal modes.

## Cold open
Here's a sequence everybody knows: $0, 1, 1, 2, 3, 5, 8, 13, 21, \dots$ Each number is the sum of the two before it. To get the hundredth Fibonacci number, you just... add, ninety-nine times.

But in the 1840s a French mathematician named Jacques Binet wrote down a formula that jumps straight to the answer:
$$F_n = \frac{1}{\sqrt5}\left[\left(\frac{1+\sqrt5}{2}\right)^n - \left(\frac{1-\sqrt5}{2}\right)^n\right].$$
Look at it. There are square roots of five everywhere. Irrational numbers, raised to powers, subtracted, divided by another irrational number. And out comes, every single time, a whole number. $F_{10} = 55$. $F_{30} = 832{,}040$. Exactly.

Where could such a formula come from? Nobody would guess it. The secret is that "add the last two numbers" is a *linear map*, and every linear map has a hidden set of directions that it doesn't turn, only stretches. Look at the map along those directions and it becomes as simple as multiplication. Those directions are called eigenvectors, and the golden ratio is hiding in one of them.

Today: how to find the coordinates a map chooses for itself.

## The story

### 1. Naive attempt: hunt for a good basis

Act IV opens with the central question planted in ↩ S2E04: *which properties of a matrix belong to the map, and which are artifacts of the camera angle?* The matrix of $T: V\to V$ depends on the basis; different bases give similar matrices $P^{-1}AP$. So let's turn the question around: **is there a basis in which $T$ is as simple as possible?**

The simplest possible matrix is diagonal:
$$\begin{pmatrix}\lambda_1&&\\&\ddots&\\&&\lambda_n\end{pmatrix}.$$
In such a basis $v_1,\dots,v_n$, the map does nothing but stretch: $Tv_i = \lambda_iv_i$. No mixing, no rotating. Each basis direction is mapped to itself. Computing $T^{100}$ is trivial (raise each $\lambda_i$ to the 100th power), and so is solving $Tx = b$.

The naive approach would be to try bases at random. That's hopeless. We need to know what we're looking for.

### 2. The construction: directions a map only stretches

> **Definition.** Let $T: V\to V$ be linear over a field $F$. A scalar $\lambda\in F$ is an **eigenvalue** of $T$ if there is a **nonzero** $v\in V$ with $Tv = \lambda v$; such a $v$ is an **eigenvector**. The **eigenspace** of $\lambda$ is $E_\lambda = \ker(T - \lambda I)$, which consists of the eigenvectors and $0$.

("Eigen" is German for "own" or "characteristic": these are the map's *own* vectors.) Note that the definition makes no reference to a basis. Eigenvalues are properties of the map, and so the eigenvalues of $A$ and of $P^{-1}AP$ coincide: they are the same map photographed twice.

An eigenvector spans a line that $T$ maps into itself: an **invariant line**. On that line, $T$ is just multiplication by $\lambda$. If $|\lambda| > 1$ the line is stretched, if $0 < |\lambda| < 1$ it is shrunk, if $\lambda < 0$ it is flipped, and if $\lambda = 0$ it is crushed (so $E_0 = \ker T$).

> **Definition.** $T$ is **diagonalizable** if $V$ has a basis of eigenvectors of $T$. Equivalently, in matrix terms, $A = PDP^{-1}$ with $D$ diagonal; the columns of $P$ are the eigenvectors.

Eigenvectors are the map's own coordinates: diagonalization is choosing the basis the map prefers.

> **Theorem 1.** Eigenvectors $v_1,\dots,v_k$ of $T$ with distinct eigenvalues $\lambda_1,\dots,\lambda_k$ are linearly independent. In particular, if $\dim V = n$ and $T$ has $n$ distinct eigenvalues, then $T$ is diagonalizable.

*Proof.* Suppose not, and let $k$ be the smallest number for which there is a counterexample: a dependence $c_1v_1 + \dots + c_kv_k = 0$ with not all $c_i = 0$. By minimality, all $c_i\ne0$ (otherwise drop a term), and $k\ge2$ (a single eigenvector is nonzero). Apply $T - \lambda_kI$:
$$c_1(\lambda_1 - \lambda_k)v_1 + \dots + c_{k-1}(\lambda_{k-1} - \lambda_k)v_{k-1} = 0.$$
The $v_k$ term is gone. The remaining coefficients $c_i(\lambda_i - \lambda_k)$ are nonzero because the eigenvalues are distinct. That is a dependence among $k - 1$ eigenvectors with distinct eigenvalues, contradicting the minimality of $k$. $\blacksquare$

### 3. Finding eigenvalues: the characteristic polynomial

How do we find the $\lambda$'s? We need $T - \lambda I$ to have a nonzero kernel, i.e. to be non-invertible. By ↩ S2E11, that happens exactly when its determinant vanishes:
$$\lambda\text{ is an eigenvalue}\iff\det(\lambda I - T) = 0.$$

> **Definition.** The **characteristic polynomial** of $T$ is $\chi_T(\lambda) = \det(\lambda I - T)$.

Because ↩ S2E11 defined $\det$ as a property of a *map* (its action on the one-dimensional space $\Lambda^nV$), $\chi_T$ is coordinate-free. In matrix language: $\det(\lambda I - P^{-1}AP) = \det\big(P^{-1}(\lambda I - A)P\big) = \det(\lambda I - A)$, by the product rule.

For an $n\times n$ matrix, $\chi_A$ is a monic polynomial of degree $n$, and two of its coefficients are famous:
$$\chi_A(\lambda) = \lambda^n - (\operatorname{tr}A)\,\lambda^{n-1} + \dots + (-1)^n\det A.$$
(The constant term is $\chi_A(0) = \det(-A) = (-1)^n\det A$. In the Leibniz expansion of $\det(\lambda I - A)$, only the diagonal product $\prod(\lambda - a_{ii})$ can contribute $\lambda^{n-1}$, since any other permutation misses at least two diagonal entries; that product's $\lambda^{n-1}$ coefficient is $-\sum a_{ii}$.)

Now suppose $\chi_T$ splits into linear factors, $\chi_T(\lambda) = (\lambda - \lambda_1)\cdots(\lambda - \lambda_n)$, listing each root as often as it occurs (its **algebraic multiplicity**). Expanding and comparing coefficients:
$$\operatorname{tr}T = \lambda_1 + \dots + \lambda_n,\qquad\det T = \lambda_1\cdots\lambda_n.$$
So the trace and determinant, which look like accidents of a particular matrix, are symmetric functions of the eigenvalues, and that's *why* they don't change with the basis. These are the "badges that stay put while the coordinates churn."

**Two multiplicities.** The algebraic multiplicity of $\lambda$ is its multiplicity as a root of $\chi_T$; the **geometric multiplicity** is $\dim E_\lambda$. Always $1\le\text{geometric}\le\text{algebraic}$. A map is diagonalizable exactly when $\chi_T$ splits and the two multiplicities agree for every eigenvalue (then the eigenspaces fill $V$, by a version of Theorem 1). When they *disagree*, diagonalization fails; that's ↪ S2E13.

### 4. The field matters: rotations and ℂ

Rotate the real plane by $90°$: $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$. Every nonzero vector is turned; no line is mapped to itself. So $R$ has **no real eigenvectors** at all. The algebra agrees: $\chi_R(\lambda) = \lambda^2 + 1$, which has no real roots.

This is the "extend to repair a defect" thread from Season 1. In ↩ S1E10, ℝ couldn't solve $x^2 + 1 = 0$, so we built ℂ, where multiplication by $i$ *is* a $90°$ rotation. Over ℂ, $R$ has eigenvalues $\pm i$, and a rotation by $\theta$ has eigenvalues $e^{\pm i\theta}$ (Worked Example 3). The rotation was always "multiplication by a unit complex number"; we just couldn't see it over ℝ.

Over ℂ, this never fails:

> **Theorem 2.** Every linear map $T$ on a finite-dimensional complex vector space $V\ne\{0\}$ has an eigenvalue.

*Proof (without determinants).* Let $n = \dim V$ and pick any $v\ne0$. The $n + 1$ vectors $v, Tv, T^2v,\dots,T^nv$ live in an $n$-dimensional space, so they are linearly dependent: there are complex numbers $a_0,\dots,a_n$, not all zero, with
$$a_0v + a_1Tv + \dots + a_nT^nv = 0.$$
Let $p(z) = a_0 + a_1z + \dots + a_nz^n$. This polynomial is not constant: if it were, the equation would say $a_0v = 0$ with $a_0\ne0$, impossible since $v\ne0$. By the fundamental theorem of algebra (↩ S1E10: ℂ is algebraically closed), $p$ factors as
$$p(z) = c\,(z - \mu_1)(z - \mu_2)\cdots(z - \mu_m),\qquad c\neq0,\ m\ge1.$$
Because polynomials in the single map $T$ multiply like polynomials in $z$,
$$0 = p(T)v = c\,(T - \mu_1I)(T - \mu_2I)\cdots(T - \mu_mI)\,v.$$
A product of maps that sends the nonzero vector $v$ to $0$ can't consist entirely of injective maps. So some $T - \mu_jI$ is not injective, which means $\mu_j$ is an eigenvalue. $\blacksquare$

The proof uses exactly one fact about ℂ: every nonconstant polynomial has a root. That is the whole content of "algebraic closure," and it is what guarantees eigenvalues exist. Over ℝ, the same argument only shows that every map on a nonzero real space has an invariant line *or an invariant plane* (from an irreducible quadratic factor), which is exactly what the rotation has.

A different perspective: an eigenvector is a measuring device run in reverse. Instead of asking "how much of $v$ is along a direction?", it asks "which directions does the *map* leave alone?" The answer is intrinsic to $T$, which is why eigenvalues sit on the "invariants" side of the ledger.

### 5. Payoff: powers, long-run behavior, vibrations

If $A = PDP^{-1}$, then $A^k = PD^kP^{-1}$: the middle factors cancel. So the long-run behavior of $x_{k+1} = Ax_k$ is controlled by the eigenvalues: write the starting vector in the eigenbasis, $x_0 = \sum c_iv_i$, and then
$$x_k = A^kx_0 = \sum_ic_i\lambda_i^k\,v_i.$$
As $k$ grows, the term with the largest $|\lambda_i|$ dominates. Four applications:
- **Fibonacci** (Worked Example 2): the dominant eigenvalue is the golden ratio $\varphi\approx1.618$, so $F_n$ grows like $\varphi^n/\sqrt5$.
- **Markov chains** (Worked Example 4): a column-stochastic matrix always has eigenvalue $1$; the matching eigenvector is the **stationary distribution**, and the other eigenvalues (when smaller than 1 in absolute value) decay away.
- **PageRank:** Google's original ranking (Brin and Page, 1998) models a random web surfer as a Markov chain on web pages and ranks pages by the entries of the stationary eigenvector of an enormous stochastic matrix.
- **Normal modes:** two equal masses joined to walls and to each other by three identical springs obey $x'' = -Kx$ with $K = \begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ (units with $k/m = 1$). The eigenvectors of $K$ are $(1,1)$ with eigenvalue 1 (both masses swing together, frequency $1$) and $(1,-1)$ with eigenvalue 3 (they swing against each other, frequency $\sqrt3$). Every motion is a superposition of these two modes. The same idea, with infinitely many modes, gives the harmonics of a violin string (↪ S2E29).

Diagonalization also works on infinite-dimensional spaces in special cases: $\frac{d}{dx}e^{\lambda x} = \lambda e^{\lambda x}$ says exponentials are eigenvectors ("eigenfunctions") of differentiation. That's why exponentials solve linear ODEs, and it is the seed of Fourier analysis (↪ S2E29).

**Teaser.** The shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has $\chi(\lambda) = (\lambda - 1)^2$, an eigenvalue in ℂ (even in ℝ), so Theorem 2 is satisfied. But its only eigenvectors are multiples of $(1,0)$. One direction is not enough for a basis. Algebraic closure guarantees eigen*values*; it does not guarantee enough eigen*vectors*. What's the best we can do then? ↪ S2E13.

## Worked examples

### Example 1: A full diagonalization
Let $A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$.

**Characteristic polynomial.** $\det(\lambda I - A) = (\lambda - 4)(\lambda - 3) - (1)(2) = \lambda^2 - 7\lambda + 12 - 2 = \lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)$. Eigenvalues $5$ and $2$. Check: $\operatorname{tr}A = 7 = 5 + 2$ ✓, $\det A = 12 - 2 = 10 = 5\cdot2$ ✓.

**Eigenvectors.**
- $\lambda = 5$: $A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}$. The first row gives $-x + y = 0$, so $v_1 = (1,1)$. Check: $A(1,1) = (5,5) = 5(1,1)$ ✓.
- $\lambda = 2$: $A - 2I = \begin{pmatrix}2&1\\2&1\end{pmatrix}$. The row $2x + y = 0$ gives $v_2 = (1,-2)$. Check: $A(1,-2) = (4 - 2,\ 2 - 6) = (2,-4) = 2(1,-2)$ ✓.

**Diagonalize.** $P = \begin{pmatrix}1&1\\1&-2\end{pmatrix}$, $\det P = -3$, $P^{-1} = \tfrac{1}{-3}\begin{pmatrix}-2&-1\\-1&1\end{pmatrix} = \tfrac13\begin{pmatrix}2&1\\1&-1\end{pmatrix}$. Then
$$AP = \begin{pmatrix}5&2\\5&-4\end{pmatrix},\qquad P^{-1}AP = \tfrac13\begin{pmatrix}2&1\\1&-1\end{pmatrix}\begin{pmatrix}5&2\\5&-4\end{pmatrix} = \tfrac13\begin{pmatrix}15&0\\0&6\end{pmatrix} = \begin{pmatrix}5&0\\0&2\end{pmatrix}.\ ✓$$

**Use it.** $A^k = P\begin{pmatrix}5^k&0\\0&2^k\end{pmatrix}P^{-1}$. For example, $A^k(1,0)$: write $(1,0) = \tfrac23(1,1) + \tfrac13(1,-2)$ (the first column of $P^{-1}$), so $A^k(1,0) = \tfrac23 5^k(1,1) + \tfrac13 2^k(1,-2)$. For $k = 1$: $\tfrac23(5,5) + \tfrac13(2,-4) = (\tfrac{10 + 2}{3}, \tfrac{10 - 4}{3}) = (4, 2)$, the first column of $A$ ✓.

### Example 2: Fibonacci in closed form
The recurrence $F_{n+1} = F_n + F_{n-1}$ is the linear map
$$\begin{pmatrix}F_{n+1}\\F_n\end{pmatrix} = \underbrace{\begin{pmatrix}1&1\\1&0\end{pmatrix}}_{M}\begin{pmatrix}F_n\\F_{n-1}\end{pmatrix},\qquad\text{so}\qquad\begin{pmatrix}F_{n+1}\\F_n\end{pmatrix} = M^n\begin{pmatrix}1\\0\end{pmatrix}$$
(starting from $F_1 = 1$, $F_0 = 0$).

**Eigenvalues.** $\chi_M(\lambda) = (\lambda - 1)\lambda - 1 = \lambda^2 - \lambda - 1$, with roots
$$\varphi = \frac{1 + \sqrt5}{2}\approx1.618,\qquad\psi = \frac{1 - \sqrt5}{2}\approx-0.618.$$
Useful facts: $\varphi + \psi = 1$, $\varphi\psi = -1$, $\varphi - \psi = \sqrt5$, and each root satisfies $\lambda^2 = \lambda + 1$.

**Eigenvectors.** $M\begin{pmatrix}\lambda\\1\end{pmatrix} = \begin{pmatrix}\lambda + 1\\\lambda\end{pmatrix} = \begin{pmatrix}\lambda^2\\\lambda\end{pmatrix} = \lambda\begin{pmatrix}\lambda\\1\end{pmatrix}$, using $\lambda^2 = \lambda + 1$. So $(\varphi,1)$ and $(\psi,1)$ are eigenvectors.

**Decompose the start.** $(\varphi,1) - (\psi,1) = (\sqrt5, 0)$, so $(1,0) = \tfrac1{\sqrt5}\big[(\varphi,1) - (\psi,1)\big]$.

**Apply $M^n$.** $M^n(1,0) = \tfrac{1}{\sqrt5}\big[\varphi^n(\varphi,1) - \psi^n(\psi,1)\big]$. The second coordinate is $F_n$:
$$F_n = \frac{\varphi^n - \psi^n}{\sqrt5}.$$
**Check.** $n = 1$: $(\varphi - \psi)/\sqrt5 = 1$ ✓. $n = 2$: $(\varphi^2 - \psi^2)/\sqrt5 = (\varphi - \psi)(\varphi + \psi)/\sqrt5 = 1\cdot1 = 1$ ✓. $n = 10$: $\varphi^{10}\approx122.992$ and $\psi^{10}\approx0.008$, so $F_{10}\approx(122.992 - 0.008)/2.23607\approx55.000$; indeed $F_{10} = 55$. (Verified by computer for $n\le24$ exactly and $F_{30} = 832{,}040$.) Since $|\psi| < 1$, $|\psi^n/\sqrt5| < \tfrac12$ for all $n\ge0$, so $F_n$ is simply $\varphi^n/\sqrt5$ rounded to the nearest integer. The irrational parts cancel because $\varphi$ and $\psi$ are conjugates: swapping $\sqrt5\leftrightarrow-\sqrt5$ swaps them and changes the sign of both numerator and denominator, so the expression is fixed by that symmetry and therefore rational (↩ S1E20's Galois-style reasoning, in miniature).

### Example 3: Rotations have complex eigenvalues
Let $R_\theta = \begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$, $0 < \theta < \pi$.

**Characteristic polynomial.** $(\lambda - \cos\theta)^2 + \sin^2\theta = \lambda^2 - 2\cos\theta\,\lambda + 1$. Discriminant $4\cos^2\theta - 4 = -4\sin^2\theta < 0$: no real roots. Over ℂ:
$$\lambda = \cos\theta\pm i\sin\theta = e^{\pm i\theta}.$$
Check: sum $2\cos\theta = \operatorname{tr}R_\theta$ ✓, product $\cos^2\theta + \sin^2\theta = 1 = \det R_\theta$ ✓.

**Eigenvector for $e^{i\theta}$.** Try $(1,-i)$: $R_\theta(1,-i) = (\cos\theta + i\sin\theta,\ \sin\theta - i\cos\theta)$. The first entry is $e^{i\theta}$. The second is $-i(\cos\theta + i\sin\theta) = -i\cos\theta + \sin\theta$ ✓. So $R_\theta(1,-i) = e^{i\theta}(1,-i)$. Similarly $(1, i)$ has eigenvalue $e^{-i\theta}$.

For $\theta = 90°$: eigenvalues $\pm i$, matching $\chi = \lambda^2 + 1$. In the complex eigenbasis, the rotation is $\operatorname{diag}(e^{i\theta}, e^{-i\theta})$: it multiplies one complex coordinate by $e^{i\theta}$ and the other by its conjugate. (↪ S2E15 makes this basis orthonormal.)

### Example 4: A two-state Markov chain
Weather model: if today is sunny, tomorrow is sunny with probability $0.9$; if rainy, tomorrow is sunny with probability $0.5$. With state vector (P(sunny), P(rainy)),
$$M = \begin{pmatrix}0.9&0.5\\0.1&0.5\end{pmatrix}\quad(\text{columns sum to }1).$$
**Eigenvalues.** $\operatorname{tr}M = 1.4$, $\det M = 0.45 - 0.05 = 0.4$. So $\chi(\lambda) = \lambda^2 - 1.4\lambda + 0.4 = (\lambda - 1)(\lambda - 0.4)$. Eigenvalues $1$ and $0.4$.

**Eigenvectors.** $\lambda = 1$: $M - I = \begin{pmatrix}-0.1&0.5\\0.1&-0.5\end{pmatrix}$ gives $-0.1x + 0.5y = 0$, so $(5,1)$; normalized to a probability vector, $(\tfrac56, \tfrac16)$. Check: $0.9\cdot\tfrac56 + 0.5\cdot\tfrac16 = \tfrac{4.5 + 0.5}{6} = \tfrac56$ ✓. $\lambda = 0.4$: $M - 0.4I = \begin{pmatrix}0.5&0.5\\0.1&0.1\end{pmatrix}$ gives $(1,-1)$.

**Long run.** Start rainy: $(0,1) = \tfrac16(5,1) + \tfrac56(-1,1)$ (check: $\tfrac56 - \tfrac56 = 0$, $\tfrac16 + \tfrac56 = 1$ ✓). Then
$$M^k(0,1) = \tfrac16(5,1) + \tfrac56(0.4)^k(-1,1)\ \longrightarrow\ \left(\tfrac56,\tfrac16\right).$$
After 50 days the correction is about $10^{-20}$. In the long run it is sunny $5/6$ of the time, whatever the starting weather, and the second eigenvalue $0.4$ is the rate at which the past is forgotten.

## Visual and animation notes
1. **Cold open.** Fibonacci numbers tick upward; Binet's formula assembles itself from $\sqrt5$'s; the irrational digits churn and then snap to the integer 55.
2. **Grid with invariant lines.** The key visual: a grid transforms under $A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$ (motif: *Linear map*); most blue arrows rotate off their lines, while arrows on the lines through $(1,1)$ and $(1,-2)$ stay on their lines, stretching by 5 and 2. Those two lines glow.
3. **Switching cameras.** A basis overlay (motif: *Basis / coordinates*) snaps from the standard grid to the eigen-grid; the matrix "shadow" on screen becomes $\operatorname{diag}(5,2)$. Badges for trace (7), det (10), and eigenvalues ({5, 2}) remain fixed through the snap (motif: *Invariants*).
4. **Proof of Theorem 2.** Vectors $v, Tv, T^2v, \dots$ pile up in a small space until they "collide" (a dependency flashes); the polynomial $p$ appears and factors into linear pieces on the complex plane; one factor turns red: "not injective."
5. **Rotation.** A real plane rotates; no line stays fixed. Then the scene lifts to $\mathbb C^2$, drawn as two complex planes; in the eigenbasis each complex coordinate spins by $e^{\pm i\theta}$ (callback to the S1E10 "multiplication rotates" animation).
6. **Fibonacci dynamics.** The vector $(F_{n+1},F_n)$ hops along a staircase that bends toward the line through $(\varphi, 1)$; the $(\psi,1)$ component visibly shrinks and alternates sign.
7. **Markov.** Two buckets labeled Sunny and Rainy with flowing water; whatever the starting levels, they settle at 5:1.
8. **Normal modes.** Two masses and three springs; the in-phase and out-of-phase modes play separately, then superpose into a messy-looking motion.
9. **Teaser.** The shear grid: only one line stays put. A question mark over the missing second direction.
10. **Callback stamps:** ↩ S2E11 at the characteristic polynomial, ↩ S1E10 at shots 4–5, ↩ S2E04 at shot 3.

## Common misconceptions
- **Misconception:** The zero vector is an eigenvector of every map. **Reality:** Eigenvectors are nonzero by definition; otherwise every $\lambda$ would be an eigenvalue. (The eigenvalue $0$ is allowed and means a nontrivial kernel.)
- **Misconception:** Every matrix can be diagonalized. **Reality:** Over ℝ, rotations have no eigenvectors at all; even over ℂ, the shear has too few (↪ S2E13).
- **Misconception:** Row reduction preserves eigenvalues. **Reality:** Row operations multiply by elementary matrices on one side only ($EA$), which is not a similarity. Eigenvalues are preserved by $P^{-1}AP$, not by elimination.
- **Misconception:** The eigenvalues of $A + B$ are the sums of eigenvalues of $A$ and $B$, and those of $AB$ are the products. **Reality:** Not in general; that works when $A$ and $B$ share an eigenbasis. Only trace is additive ($\operatorname{tr}(A + B) = \operatorname{tr}A + \operatorname{tr}B$) and only determinant is multiplicative.
- **Misconception:** "Trace = sum of eigenvalues" holds for every real matrix with its real eigenvalues. **Reality:** Count complex eigenvalues too, with algebraic multiplicity. The $90°$ rotation has trace $0 = i + (-i)$ and no real eigenvalues.

## Exercises
- **Warm-up (computational).** Diagonalize $A = \begin{pmatrix}1&2\\2&1\end{pmatrix}$ and compute $A^{10}$ in closed form.
- **Core (conceptual).** Show that $A$ and $A^{\mathsf T}$ have the same eigenvalues, but generally different eigenvectors. Interpret the eigenvectors of $A^{\mathsf T}$ in terms of the dual map (↩ S2E08). Then show that if $T$ is diagonalizable with eigenvalues $\lambda_i$, then $p(T)$ is diagonalizable with eigenvalues $p(\lambda_i)$ for any polynomial $p$.
- **Stretch (proof).** Let the sequence $a_n$ satisfy $a_{n+2} = a_{n+1} + 2a_n$ with $a_0 = 0$, $a_1 = 1$ (Jacobsthal numbers). Find a closed formula by diagonalization. Then prove: if a $k$-term linear recurrence has a characteristic polynomial with $k$ distinct roots $r_1,\dots,r_k$, every solution has the form $a_n = \sum c_ir_i^n$.

<details><summary>Hints and answers</summary>

- **Warm-up.** $\chi = (\lambda - 1)^2 - 4 = (\lambda - 3)(\lambda + 1)$; eigenvectors $(1,1)$ for $3$ and $(1,-1)$ for $-1$. $A^{10} = \tfrac12\begin{pmatrix}3^{10} + 1&3^{10} - 1\\3^{10} - 1&3^{10} + 1\end{pmatrix} = \begin{pmatrix}29525&29524\\29524&29525\end{pmatrix}$ (using $(-1)^{10} = 1$ and $3^{10} = 59049$).
- **Core.** $\det(\lambda I - A^{\mathsf T}) = \det((\lambda I - A)^{\mathsf T}) = \det(\lambda I - A)$. Eigenvectors of $A^{\mathsf T}$ are covectors $\psi$ with $\psi\circ T = \lambda\psi$ ("left eigenvectors"): measurements that $T$ rescales. For $p(T)$: in the eigenbasis, $p(D) = \operatorname{diag}(p(\lambda_i))$.
- **Stretch.** Matrix $\begin{pmatrix}1&2\\1&0\end{pmatrix}$, $\chi = \lambda^2 - \lambda - 2 = (\lambda - 2)(\lambda + 1)$, giving $a_n = \frac{2^n - (-1)^n}{3}$: $0, 1, 1, 3, 5, 11, 21,\dots$. General case: the companion matrix has $k$ distinct eigenvalues, so it is diagonalizable (Theorem 1).

</details>

## Historical note
Eigenvalue problems appeared long before the word. Euler and Lagrange met them in the eighteenth century studying the principal axes of rotating bodies and the small vibrations of mechanical systems, and d'Alembert and Lagrange used them to decouple systems of differential equations. Augustin-Louis Cauchy proved in 1829 that a real symmetric matrix has only real eigenvalues ("characteristic roots"), giving the "characteristic equation" its name. The Fibonacci closed form was known to Abraham de Moivre in the early eighteenth century, and is named after Jacques Binet, who published it in 1843. The prefix "eigen" comes from David Hilbert's work on integral equations around 1904, where he wrote of *Eigenfunktionen* and *Eigenwerte*; English absorbed the half-German "eigenvalue," while older texts say "characteristic value," "latent root," or "proper value." The fundamental theorem of algebra, which Theorem 2 rests on, was first proved in an essentially complete form in the late eighteenth and early nineteenth centuries, with famous proofs by Gauss (1799 onward) and Argand (1806).

## Connections
- **Callbacks:** ↩ S1E10 (ℂ, rotations as multiplication, algebraic closure), ↩ S1E20 (symmetry between conjugate roots), ↩ S2E03 (kernels), ↩ S2E04 (change of basis; "which properties belong to the map?"), ↩ S2E08 (dual map; left eigenvectors), ↩ S2E11 (determinant, coordinate-free)
- **Sets up:** ↪ S2E13 (when eigenvectors are too few: Jordan form), ↪ S2E15 (unitary diagonalization, Schur), ↪ S2E18 (spectral theorem for symmetric maps), ↪ S2E19 (singular values), ↪ S2E29 (eigenfunctions and Fourier modes), ↪ S2E31 (spectrum beyond eigenvalues), ↪ S3E03 (characters of representations are traces)
- **Side quests:** Graphs as matrices (attaches after S2E12: adjacency and Laplacian eigenvalues, counting walks, spectral clustering)

## References
- **Primary / historical:** Augustin-Louis Cauchy, "Sur l'équation à l'aide de laquelle on détermine les inégalités séculaires des mouvements des planètes" (1829), the paper proving real eigenvalues for symmetric matrices.
- **Primary / historical:** Sergey Brin and Lawrence Page, "The Anatomy of a Large-Scale Hypertextual Web Search Engine," *Computer Networks and ISDN Systems* 30 (1998).
- **Textbook:** Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer (2024), Chapter 5 "Eigenvalues and Eigenvectors" (including the determinant-free existence proof over ℂ). See also Axler, "Down with Determinants!", *American Mathematical Monthly* 102 (1995).
- **Textbook:** Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., Prentice-Hall (1971), Chapter 6 "Elementary Canonical Forms" (characteristic values, diagonalization).
- **Textbook:** Gilbert Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press (2016), Chapter 6 "Eigenvalues and Eigenvectors" (diagonalization, Fibonacci, Markov matrices); MIT OpenCourseWare 18.06 (Spring 2010), lectures on eigenvalues and on diagonalization and powers of $A$.
- **Accessible:** 3Blue1Brown (Grant Sanderson), *Essence of Linear Algebra* (2016), chapter 14 "Eigenvectors and eigenvalues"; also "A quick trick for computing eigenvalues" (2021).
- **Accessible:** Kurt Bryan and Tanya Leise, "The $25,000,000,000 Eigenvector: The Linear Algebra behind Google," *SIAM Review* 48(3) (2006).
