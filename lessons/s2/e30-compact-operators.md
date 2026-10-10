# S2E30: Compact Operators: The Spectral Theorem Survives

> **Season / Act:** Season 2, Part B, Act VIII (Hilbert Spaces and Operators) · **Target runtime:** 20–25 min ·
> **Prerequisites:** the spectral theorem (↩ S2E18), SVD and low-rank approximation (↩ S2E19), what breaks in infinite dimensions (↩ S2E20), bounded operators and Riesz's lemma (↩ S2E21), weak convergence (↩ S2E27), Hilbert spaces (↩ S2E28), Fourier series (↩ S2E29); solving $-u'' = f$ by integrating twice ·
> **Builds toward:** spectrum of non-compact operators (↪ S2E31), quantum harmonic oscillator and the hydrogen atom's discrete levels (↪ S2E31), Green's functions as distributions (↪ S2E33), Hodge theory side quest (↪ S3E09)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a compact operator, recognize the main examples (finite rank, diagonal with entries tending to 0, Hilbert–Schmidt integral operators), and explain why the identity on an infinite-dimensional space is not compact.
2. State the spectral theorem for compact self-adjoint operators and prove that their nonzero eigenvalues have finite multiplicity and can accumulate only at 0.
3. State the Fredholm alternative and solve a concrete integral equation using it.
4. Turn the Dirichlet problem $-u'' = \lambda u$ on $[0,1]$ into an eigenvalue problem for a compact self-adjoint integral operator, and read off the harmonics of a vibrating string.
5. Explain why self-adjointness (or normality) is essential, using the Volterra operator.

## Cold open
*Narration draft.*

Pluck a guitar string. You hear one note, but the string is doing infinitely many things at once: vibrating as a whole, in halves, in thirds, in quarters. Each of those shapes is a sine curve, and each one vibrates at its own frequency, $1, 2, 3, 4, \dots$ times the fundamental. Physicists call them normal modes. A linear algebra student would call them eigenvectors.

In S2E18 we proved that every symmetric matrix has a full set of perpendicular eigenvectors. That's the spectral theorem, and it's why a vibrating drum or a wobbling molecule can always be broken into independent modes. But a guitar string isn't a matrix. Its "state" is a function, a point in an infinite-dimensional space. And in S2E20 we saw an operator, multiply-by-$x$, that is perfectly symmetric yet has no eigenvectors at all.

So which is it? Does the spectral theorem survive in infinite dimensions, or not? The answer is: it survives for exactly the operators that are "almost finite-dimensional." Those are the compact operators, and the guitar string is secretly one of them. Today we find out why its harmonics have to exist, and why their frequencies have to march off in a neat, discrete list instead of smearing into a continuum.

## The story

### 1. The naive attempt: copy the proof from S2E18

Recall one proof of the finite-dimensional spectral theorem. For a self-adjoint $T$ on $\mathbb C^n$, maximize the **Rayleigh quotient** $\langle Tx, x\rangle$ over the unit sphere. The unit sphere is compact, so a maximizer $x_1$ exists, and a Lagrange-multiplier argument shows $Tx_1 = \lambda_1 x_1$. Then restrict $T$ to $x_1^\perp$, which $T$ maps into itself, and repeat.

In an infinite-dimensional Hilbert space we can try the same thing. It fails at step one: **the unit sphere is not compact** (↩ S2E20, ↩ S2E21). Take $T = M_x$, multiplication by $x$ on $L^2[0,1]$. Then $\langle M_x f, f\rangle = \int_0^1 x|f(x)|^2dx$, and its supremum over unit vectors is 1: concentrate $f$ near $x = 1$, e.g. $f_n = \sqrt n\,\mathbf 1_{[1-1/n,1]}$ gives $\int_{1-1/n}^1 nx\,dx = 1 - \frac{1}{2n}$. But the supremum is never attained, because that would require $|f|^2$ to live entirely at the single point $x = 1$, a set of measure zero. The maximizing sequence has no convergent subsequence; it converges weakly to 0 (↩ S2E27). Without a maximizer, there's no first eigenvector.

### 2. The crisis: what we really used was compactness

The finite-dimensional proof needed a maximizing sequence $x_n$ to have a convergent subsequence. In infinite dimensions bounded sequences don't have to. But we don't need $x_n$ itself to converge; we need **$Tx_n$** to converge. That suggests asking for operators that *create* compactness.

> **Definition (compact operator).** A linear operator $T : X \to Y$ between Banach spaces is **compact** if it maps bounded sets to relatively compact sets. Equivalently, for every bounded sequence $(x_n)$, the sequence $(Tx_n)$ has a convergent subsequence.

Compact operators are automatically bounded. Intuitively, a compact operator squashes the infinite-dimensional unit ball into something that is "nearly finite-dimensional": a set that, for every $\varepsilon > 0$, lies within $\varepsilon$ of a finite-dimensional piece.

**Key facts** (for operators on a Hilbert space $H$):
1. **Finite rank** operators (with finite-dimensional range) are compact, since bounded sets in $\mathbb{C}^n$ are relatively compact.
2. **Norm limits of compact operators are compact.** If $\|T - T_k\| \to 0$ and each $T_k$ is compact, then $T$ is compact (a diagonal-subsequence argument, ↩ S1E12).
3. **In Hilbert space, compact = norm limit of finite rank.** If $T$ is compact and $P_N$ is the projection onto the first $N$ vectors of an orthonormal basis, then $\|T - P_N T\| \to 0$. (This is the infinite-dimensional Eckart–Young of ↩ S2E19.)
4. Compact operators form a closed two-sided ideal: $AT$ and $TA$ are compact whenever $T$ is compact and $A$ bounded. The adjoint of a compact operator is compact.
5. **Compact operators turn weak convergence into norm convergence:** if $x_n \rightharpoonup x$ then $Tx_n \to Tx$ in norm (↩ S2E27). For example, $e_n \rightharpoonup 0$ in $\ell^2$, so $Te_n \to 0$.
6. **The identity on an infinite-dimensional space is not compact:** the orthonormal sequence $(e_n)$ is bounded, but $\|e_n - e_m\| = \sqrt2$, so no subsequence converges.

**Main examples.**
- **Diagonal operators** $D e_n = \lambda_n e_n$ with $\lambda_n \to 0$ (Worked Example 1).
- **Hilbert–Schmidt integral operators.** If $K \in L^2([a,b]\times[a,b])$, then
$$(T_K f)(x) = \int_a^b K(x,y) f(y)\,dy$$
is compact. *Sketch:* Cauchy–Schwarz in $y$ gives $|T_Kf(x)|^2 \le \int|K(x,y)|^2dy\,\|f\|^2$, so $\|T_K\| \le \|K\|_{L^2}$. If $\{\varphi_i\}$ is an orthonormal basis of $L^2[a,b]$, then the products $\varphi_i(x)\overline{\varphi_j(y)}$ form an orthonormal basis of $L^2$ of the square. Truncating the expansion of $K$ to $i, j \le N$ gives a kernel $K_N$ with finite-rank $T_{K_N}$ and $\|T_K - T_{K_N}\| \le \|K - K_N\|_{L^2} \to 0$. By Fact 2, $T_K$ is compact. Moreover $T_K$ is self-adjoint iff $K(x,y) = \overline{K(y,x)}$.

### 3. The construction: the spectral theorem for compact self-adjoint operators

> **Theorem (Hilbert–Schmidt spectral theorem).** Let $T$ be a compact self-adjoint operator on a Hilbert space $H$. Then there is an orthonormal sequence $(u_k)$ (finite or infinite) and real numbers $\lambda_k \neq 0$ with $|\lambda_1| \ge |\lambda_2| \ge \cdots$ and $\lambda_k \to 0$ if the sequence is infinite, such that
> $$Tx = \sum_k \lambda_k \langle x, u_k\rangle u_k \quad \text{for all } x \in H .$$
> The $u_k$ together with an orthonormal basis of $\ker T$ form an orthonormal basis of $H$. Each nonzero eigenvalue has finite multiplicity.

Compare with S2E18: $T = \sum_k \lambda_k P_k$, a sum of eigenvalues times orthogonal projections onto eigenspaces. The only new feature is the **infinite sum**, and the forced behaviour $\lambda_k \to 0$.

**Step 1 (eigenvalues are real, eigenvectors for different eigenvalues orthogonal).** Same as S2E18: if $Tu = \lambda u$ with $\|u\| = 1$ then $\lambda = \langle Tu, u\rangle = \langle u, Tu\rangle = \bar\lambda$; and if $Tu = \lambda u$, $Tv = \mu v$, $\lambda \neq \mu$, then $\lambda\langle u, v\rangle = \langle Tu, v\rangle = \langle u, Tv\rangle = \mu\langle u, v\rangle$, so $\langle u, v\rangle = 0$.

**Step 2 (a largest eigenvalue exists).** For self-adjoint $T$, $\|T\| = \sup_{\|x\|=1}|\langle Tx, x\rangle|$. Pick unit vectors $x_n$ with $\langle Tx_n, x_n\rangle \to \lambda$, where $\lambda = \pm\|T\|$, and assume $T \neq 0$. Then
$$\|Tx_n - \lambda x_n\|^2 = \|Tx_n\|^2 - 2\lambda\langle Tx_n, x_n\rangle + \lambda^2 \le 2\lambda^2 - 2\lambda\langle Tx_n, x_n\rangle \to 0 .$$
**Here compactness enters:** a subsequence $Tx_{n_j} \to y$. Then $\lambda x_{n_j} \to y$ as well, so $x_{n_j} \to x := y/\lambda$, a unit vector, and by continuity $Tx = \lambda x$. The maximizer that was missing for $M_x$ now exists.

**Step 3 (induct).** If $Tu = \lambda u$, then $T$ maps $u^\perp$ to itself (since $\langle Tv, u\rangle = \langle v, Tu\rangle = \lambda\langle v, u\rangle = 0$), and the restriction is still compact and self-adjoint. Repeat Step 2 on $u^\perp$ to get $u_2$, and so on. If at some stage the restriction is 0, stop.

**Step 4 (the eigenvalues go to 0).** This is the theorem below.

**Step 5 (completeness).** Let $M$ be the closed span of the $u_k$. Then $T$ maps $M^\perp$ to itself, and the restricted operator has norm $\le |\lambda_k|$ for every $k$, hence norm 0. So $M^\perp \subseteq \ker T$.

> **Theorem (eigenvalues of a compact operator accumulate only at 0).** Let $T$ be compact and self-adjoint on $H$, and let $\varepsilon > 0$. Then the eigenspaces of $T$ for eigenvalues $\lambda$ with $|\lambda| \ge \varepsilon$ together span a finite-dimensional space. In particular, each nonzero eigenvalue has finite multiplicity, there are at most countably many eigenvalues, and if there are infinitely many they converge to 0.

**Proof.** Suppose not. Then there are infinitely many orthonormal eigenvectors $u_1, u_2, \dots$ with $Tu_k = \lambda_k u_k$ and $|\lambda_k| \ge \varepsilon$. (If infinitely many distinct eigenvalues occur, pick one unit eigenvector for each; they are orthonormal by Step 1. If some eigenspace is infinite-dimensional, pick an orthonormal sequence inside it.) The sequence $(u_k)$ is bounded, so by compactness $(Tu_k)$ has a convergent, hence Cauchy, subsequence. But for $j \neq k$, by orthonormality and Pythagoras,
$$\|Tu_j - Tu_k\|^2 = \|\lambda_j u_j - \lambda_k u_k\|^2 = |\lambda_j|^2 + |\lambda_k|^2 \ge 2\varepsilon^2 .$$
So no subsequence of $(Tu_k)$ is Cauchy, a contradiction. $\blacksquare$

The same proof (with a Riesz-lemma twist) works for compact operators on Banach spaces that aren't self-adjoint: nonzero eigenvalues still have finite multiplicity and accumulate only at 0. That's the content of Riesz's 1918 theory.

**Key visual:** eigenvalues as dots on the real line, marching toward 0 from both sides, with a "forbidden zone" outside $[-\varepsilon, \varepsilon]$ that contains only finitely many dots.

### 4. The Fredholm alternative: rank–nullity's heir

In finite dimensions, rank–nullity says a square matrix is injective iff it is surjective. S2E20 showed this fails in infinite dimensions: the right shift is injective but not surjective. For operators of the form "identity minus compact," it comes back.

> **Theorem (Fredholm alternative).** Let $K$ be compact on a Hilbert space $H$ and $\lambda \neq 0$. Then:
> 1. $\ker(K - \lambda I)$ and $\ker(K^* - \bar\lambda I)$ are finite-dimensional, of the **same dimension**;
> 2. the range of $K - \lambda I$ is closed and equals $\ker(K^* - \bar\lambda I)^\perp$.
>
> Consequently, **exactly one** of the following holds: either $(K - \lambda I)u = f$ has a unique solution for every $f \in H$; or the homogeneous equation $(K - \lambda I)u = 0$ has a nonzero solution, in which case $(K - \lambda I)u = f$ is solvable iff $f \perp \ker(K^* - \bar\lambda I)$.

"Uniqueness implies existence" is the slogan. In particular every nonzero point of the spectrum of a compact operator is an eigenvalue: if $K - \lambda I$ is injective, it's automatically bijective, and the open mapping theorem gives a bounded inverse (↩ S2E26). Worked Example 3 shows the alternative at work.

### 5. Payoff: the vibrating string

A string of length 1, fixed at both ends, vibrates in modes $u(x)\cos(\omega t)$ where
$$-u'' = \lambda u, \qquad u(0) = u(1) = 0, \qquad \lambda = \omega^2 .$$
The operator $A = -\frac{d^2}{dx^2}$ is **unbounded** (↩ S2E21), so the theorem above doesn't apply to it directly. The trick is to **invert it**. For $f \in L^2[0,1]$, the boundary value problem $-u'' = f$, $u(0) = u(1) = 0$ has the unique solution
$$u(x) = (Gf)(x) = \int_0^1 G(x,y)\,f(y)\,dy, \qquad G(x,y) = \begin{cases} y(1-x), & 0 \le y \le x,\\ x(1-y), & x \le y \le 1,\end{cases}$$
i.e. $G(x,y) = \min(x,y)\,\big(1 - \max(x,y)\big)$. This $G$ is the **Green's function** (↪ S2E33 will reveal it as the response to a point force, $-\partial_x^2 G(\cdot, y) = \delta_y$). It is continuous, symmetric and real, so $G$ is a compact self-adjoint Hilbert–Schmidt operator.

Now $-u'' = \lambda u$ with the boundary conditions is equivalent to $Gu = \frac1\lambda u$. The spectral theorem says:
- $G$ has an orthonormal eigenbasis (since $\ker G = 0$, the eigenvectors alone are a basis);
- the eigenvalues $\mu_n = 1/\lambda_n$ tend to 0, so $\lambda_n = \omega_n^2 \to \infty$: the frequencies form a **discrete** list going to infinity.

Worked Example 2 computes them: $u_n(x) = \sqrt2\sin(n\pi x)$ and $\lambda_n = n^2\pi^2$, so $\omega_n = n\pi$: the harmonic series of the cold open. As a corollary we get a new **proof** that $\{\sqrt2\sin(n\pi x)\}_{n\ge1}$ is an orthonormal basis of $L^2[0,1]$, the Fourier sine basis of S2E29.

**Sturm–Liouville theory** generalizes this. For $-(p u')' + q u = \lambda w u$ on $[a,b]$ with $p, w > 0$ and separated boundary conditions, the same inversion gives a compact self-adjoint operator (on $L^2$ with weight $w$), hence an orthonormal basis of eigenfunctions with eigenvalues $\lambda_n \to \infty$. Legendre polynomials, Bessel functions, and the hydrogen atom's radial functions all come from this one theorem.

**Side note: Mercer and machine learning.** **Mercer's theorem (1909):** if $K$ is continuous on $[a,b]^2$, symmetric, and positive semidefinite, then $K(x,y) = \sum_n \mu_n \varphi_n(x)\varphi_n(y)$ with $\mu_n \ge 0$, converging absolutely and uniformly. Hence $K(x,y) = \langle \Phi(x), \Phi(y)\rangle_{\ell^2}$ with $\Phi(x) = (\sqrt{\mu_n}\varphi_n(x))_n$: a kernel *is* an inner product of feature vectors in a Hilbert space. That is the "kernel trick" behind support vector machines and Gaussian processes (see the Kernel methods and RKHS side quest).

**Answer to the cold open.** The spectral theorem survives for compact self-adjoint operators. The string's operator $-d^2/dx^2$ is not compact, but its inverse is, and inverting turns "eigenvalues march to 0" into "frequencies march to infinity." That's why a string, a drum or an atom in a box has a discrete ladder of modes.

**Zoom out (thread 5, symmetry means what stays fixed; and the build/describe lens).** Eigenvectors are the directions an operator leaves fixed (up to scale). Compactness is precisely the hypothesis that lets us find them by the same maximization as in Part A. Where compactness fails, as for $M_x$, the eigenvectors vanish and something new has to replace them: the spectrum (↪ S2E31).

## Worked examples

### Example 1: A diagonal operator is compact; the identity is not

On $\ell^2$ let $De_n = \frac1n e_n$, i.e. $D(x_1, x_2, x_3, \dots) = (x_1, \frac{x_2}2, \frac{x_3}3, \dots)$. Let $D_N$ keep the first $N$ entries and zero the rest (finite rank). Then
$$\|(D - D_N)x\|^2 = \sum_{n > N}\frac{|x_n|^2}{n^2} \le \frac{1}{(N+1)^2}\sum_{n>N}|x_n|^2 \le \frac{\|x\|^2}{(N+1)^2},$$
with equality at $x = e_{N+1}$. So $\|D - D_N\| = \frac1{N+1} \to 0$, and $D$ is compact by Facts 1–2. Its eigenvalues $1, \frac12, \frac13, \dots$ march to 0, as the theorem demands. Note $D$ is injective but **not** surjective: $(1, \frac12, \frac13, \dots) \in \ell^2$ would need preimage $(1, 1, 1, \dots) \notin \ell^2$. So $0 \in \sigma(D)$ without being an eigenvalue (↪ S2E31).

By contrast, for $I$ on $\ell^2$: $I_N$ (the same truncation) has $\|I - I_N\| = 1$ for all $N$ (test on $e_{N+1}$), consistent with $I$ not being compact. An eigenvalue (1) of infinite multiplicity is exactly what the accumulation theorem forbids for compact operators.

### Example 2: The string's Green's operator: eigenvalues, trace, and $\zeta(2)$ again

**Verifying the Green's function.** Take $f \equiv 1$. Then
$$Gf(x) = (1-x)\int_0^x y\,dy + x\int_x^1 (1-y)\,dy = (1-x)\frac{x^2}{2} + x\frac{(1-x)^2}{2} = \frac{x(1-x)}{2}\big(x + (1 - x)\big) = \frac{x(1-x)}{2}.$$
Check: $u = \frac{x - x^2}{2}$ has $u'' = -1$, so $-u'' = 1 = f$, and $u(0) = u(1) = 0$. ✓

**Eigenfunctions.** Let $f_n(x) = \sin(n\pi x)$. The function $v = \frac{\sin(n\pi x)}{n^2\pi^2}$ satisfies $-v'' = \sin(n\pi x) = f_n$ and $v(0) = v(1) = 0$. The boundary value problem has a unique solution (the difference of two solutions is linear and vanishes at both ends), so
$$G f_n = \frac{1}{n^2\pi^2} f_n .$$
(Also confirmed symbolically: sympy evaluates $\int_0^1 G(x,y)\sin(\pi y)\,dy = \sin(\pi x)/\pi^2$.) Normalizing, $\|\sin(n\pi\cdot)\|^2 = \int_0^1 \sin^2(n\pi x)\,dx = \frac12$, so $u_n = \sqrt2\sin(n\pi x)$. The eigenvalues $\mu_n = \frac{1}{n^2\pi^2}$: $0.10132, 0.02533, 0.01126, \dots$ A numerical check (discretizing $G$ on an 800-point grid and computing eigenvalues with numpy) gives $0.101321, 0.025330, 0.011258, 0.006333, 0.004053$, matching $1/(n^2\pi^2)$ to five digits.

**Trace (Mercer).** For a continuous positive kernel, $\sum_n \mu_n = \int_0^1 G(x,x)\,dx$. Here $G(x,x) = x(1-x)$ and $\int_0^1 x(1-x)\,dx = \frac12 - \frac13 = \frac16$. So
$$\sum_{n\ge1}\frac{1}{n^2\pi^2} = \frac16 \quad\Longrightarrow\quad \sum_{n\ge1}\frac1{n^2} = \frac{\pi^2}{6},$$
a third proof of S2E29's identity, this time from the trace of an operator (↩ S2E12: trace = sum of eigenvalues).

**Hilbert–Schmidt norm.** $\sum_n \mu_n^2 = \iint G(x,y)^2\,dx\,dy$. By symmetry this is $2\int_0^1\int_x^1 x^2(1-y)^2\,dy\,dx = 2\int_0^1 x^2\frac{(1-x)^3}{3}\,dx = \frac23 B(3,4) = \frac23\cdot\frac{2!\,3!}{6!} = \frac23\cdot\frac{12}{720} = \frac1{90}$. Hence $\sum 1/(n^4\pi^4) = 1/90$, i.e. $\sum 1/n^4 = \pi^4/90$. (Numerically: $0.0111112$ vs. $1/90 = 0.0111111$.)

### Example 3: The Fredholm alternative for a rank-one kernel

On $L^2[0,1]$ let $(Ku)(x) = \int_0^1 xy\,u(y)\,dy = x\,\langle u, y\rangle$, where $\langle u, y \rangle$ means $\int_0^1 y\,u(y)\,dy$. $K$ is rank one, self-adjoint, and $Kx = x\int_0^1 y^2\,dy = \frac13 x$, so its only nonzero eigenvalue is $\frac13$, with eigenvector $x$.

Solve $u - \lambda Ku = f$, i.e. $u(x) = f(x) + \lambda c\,x$ with $c = \int_0^1 y\,u(y)\,dy$. Multiply by $x$ and integrate:
$$c = \int_0^1 x f(x)\,dx + \lambda c\int_0^1 x^2\,dx = F + \frac{\lambda c}3, \qquad F := \int_0^1 x f(x)\,dx .$$
- **If $\lambda \neq 3$:** $c = \frac{F}{1 - \lambda/3} = \frac{3F}{3 - \lambda}$, and the unique solution is $u = f + \frac{3\lambda F}{3-\lambda}\,x$. For instance $f \equiv 1$, $\lambda = 1$: $F = \frac12$, $c = \frac34$, $u = 1 + \frac34 x$. Check: $\int_0^1 y(1 + \frac34 y)\,dy = \frac12 + \frac14 = \frac34 = c$ ✓.
- **If $\lambda = 3$** (i.e. $\frac1\lambda$ is the eigenvalue $\frac13$): the equation for $c$ reads $c = F + c$, so it's solvable **iff** $F = \int_0^1 x f(x)\,dx = 0$, i.e. $f \perp x = \ker(K^* - \frac13 I)$. When solvable, $c$ is arbitrary: $u = f + 3c\,x$, a one-parameter family, the kernel of $I - 3K$ being $\mathrm{span}\{x\}$.

Exactly the dichotomy of the theorem: unique solvability for all $f$, or a nontrivial kernel together with an orthogonality condition on $f$.

### Example 4: The Volterra operator: compact, no eigenvalues at all

On $L^2[0,1]$ let $(Vf)(x) = \int_0^x f(y)\,dy$. Its kernel $\mathbf 1_{y \le x}$ is in $L^2$ of the square, so $V$ is compact (Hilbert–Schmidt). It is not self-adjoint ($V^*f(x) = \int_x^1 f$).

**Claim: $V$ has no eigenvalues.** If $Vf = 0$, then $\int_0^x f = 0$ for all $x$, so $f = 0$ a.e. (Lebesgue differentiation). If $Vf = \lambda f$ with $\lambda \neq 0$, then $f = \lambda^{-1}Vf$ is continuous, hence (by the fundamental theorem of calculus) $C^1$, with $f' = \lambda^{-1}f$ and $f(0) = \lambda^{-1}(Vf)(0) = 0$. The unique solution is $f(x) = f(0)e^{x/\lambda} = 0$.

By the Fredholm alternative, every $\lambda \neq 0$ then lies outside the spectrum, so $\sigma(V) = \{0\}$. A compact operator with no eigenvectors whatsoever: the spectral theorem genuinely needs self-adjointness (or normality), just as in S2E18 the shear needed it.

## Visual and animation notes
1. **Cold open:** a guitar string vibrating; split screen shows the first four sine modes oscillating at frequencies 1, 2, 3, 4. Overlay the S2E18 ellipse aligning with its axes, then a question mark over an "∞-dimensional ellipsoid."
2. **Naive attempt:** the Rayleigh-quotient landscape over a sphere. For $M_x$, an animation of $f_n = \sqrt n\,\mathbf 1_{[1-1/n,1]}$ squeezing toward $x = 1$ while the value $\langle M_x f_n, f_n\rangle$ climbs to 1, and the bump vanishes into a point (reuse the **Weak convergence** motif: probes read 0).
3. **Compactness:** the infinite-dimensional unit ball drawn as a ball with infinitely many axes; $D = \mathrm{diag}(1/n)$ squashes it into a "Hilbert cube" ellipsoid whose axes shrink. Show it fitting inside an $\varepsilon$-tube around a finite-dimensional slice.
4. **Key visual (storyline):** eigenvalues plotted as dots marching toward 0; a shaded band $|\lambda| \ge \varepsilon$ containing finitely many dots, with a counter. Then the inversion: the dots $\mu_n = 1/(n^2\pi^2)$ map to frequencies $\omega_n = n\pi$ marching off to infinity.
5. **Proof animation:** orthonormal eigenvectors $u_j, u_k$ as perpendicular arrows; their images $\lambda_j u_j, \lambda_k u_k$ stay at distance $\ge \sqrt2\,\varepsilon$; a "Cauchy?" stamp fails.
6. **Fredholm alternative:** a fork in the road: "unique solution for every $f$" vs. "kernel ≠ 0, and $f$ must be ⟂ to the cokernel." Use the **Linear map** grid motif for $I - \lambda K$ collapsing one direction exactly at $\lambda = 3$.
7. **Volterra:** a function being integrated repeatedly ($V^n$), shrinking like $1/n!$; caption "spectral radius 0."

## Common misconceptions
- **Misconception:** Every bounded self-adjoint operator has an orthonormal eigenbasis. **Reality:** only compact ones are guaranteed one; $M_x$ on $L^2[0,1]$ has no eigenvectors at all (↪ S2E31).
- **Misconception:** Compact operators are invertible if injective. **Reality:** on an infinite-dimensional space a compact operator is **never** boundedly invertible (otherwise $I = T^{-1}T$ would be compact). It's $I - K$ that obeys "injective ⇔ surjective."
- **Misconception:** Compact means "bounded with small norm." **Reality:** compactness is about the *shape* of the image of the unit ball, not its size; $100\,D$ is compact, while a projection of norm 1 onto an infinite-dimensional subspace is not.
- **Misconception:** Every compact operator has an eigenvalue. **Reality:** the Volterra operator has none. Self-adjointness (or normality) is what forces eigenvalues.
- **Misconception:** The differential operator $-d^2/dx^2$ is compact because the string has discrete frequencies. **Reality:** it is unbounded; its *inverse* (the Green's operator) is compact. Discrete spectrum of $A$ comes from compactness of $A^{-1}$ ("compact resolvent").

## Exercises
- **Warm-up (computational).** Find the eigenvalues and eigenfunctions of the integral operator on $L^2[0,1]$ with kernel $K(x,y) = \min(x,y)$. (Hint: $u = Kf$ solves $-u'' = f$ with $u(0) = 0$, $u'(1) = 0$.) Use the trace to compute $\sum_{k \ge 0}\frac{1}{(2k+1)^2}$.
- **Core (conceptual).** Show that if $T$ is compact and $(e_n)$ is orthonormal, then $Te_n \to 0$. Use this to show that the right shift $S$ on $\ell^2$ is not compact, and that no isometry on an infinite-dimensional space is compact.
- **Stretch (proof).** Prove that the Volterra operator satisfies $\|V^n\| \le \frac{1}{n!}$, and deduce from Gelfand's spectral radius formula $r(V) = \lim\|V^n\|^{1/n}$ that $\sigma(V) = \{0\}$, independently of the eigenvalue argument.

<details><summary>Hints and answers</summary>

- **Warm-up.** Eigenfunctions $\sqrt2\sin\big((k + \tfrac12)\pi x\big)$, eigenvalues $\mu_k = \frac{1}{(k+\frac12)^2\pi^2} = \frac{4}{(2k+1)^2\pi^2}$, $k \ge 0$. Trace: $\int_0^1 \min(x,x)\,dx = \frac12 = \frac4{\pi^2}\sum\frac1{(2k+1)^2}$, so the sum is $\frac{\pi^2}{8}$.
- **Core.** $e_n \rightharpoonup 0$ and compact operators map weakly convergent sequences to norm convergent ones. For $S$, $\|Se_n\| = \|e_{n+1}\| = 1$. For an isometry $U$, $\|Ue_n\| = 1$.
- **Stretch.** By induction, $(V^n f)(x) = \int_0^x \frac{(x-y)^{n-1}}{(n-1)!}f(y)\,dy$. The operator norm is at most the Hilbert–Schmidt norm: $\|V^n\|^2 \le \frac{1}{((n-1)!)^2}\int_0^1\!\int_0^x (x-y)^{2n-2}\,dy\,dx = \frac{1}{((n-1)!)^2\,(2n-1)(2n)}$, and since $n^2 \le 2n(2n-1)$ this is $\le \frac{1}{(n!)^2}$. Then $\|V^n\|^{1/n} \le (n!)^{-1/n} \to 0$, so the spectral radius is 0 and $\sigma(V) = \{0\}$ (the spectrum is nonempty, ↪ S2E31).

</details>

## Historical note
Ivar Fredholm's 1903 paper in *Acta Mathematica* solved integral equations $u - \lambda\int K u = f$ by treating them as limits of finite linear systems, with determinants and all, and discovered the alternative that bears his name. Hilbert, fascinated, spent 1904–1910 recasting Fredholm's theory as the theory of quadratic forms in infinitely many variables, and found the spectral theorem for what we now call compact self-adjoint operators; his student Erhard Schmidt simplified the proofs geometrically (and gave us Gram–Schmidt in its modern form). James Mercer's 1909 theorem on positive kernels came out of the same programme. In 1918 Frigyes Riesz extracted the abstract notion of compactness ("complete continuity") and proved the spectral properties of compact operators on normed spaces without any inner product. The Sturm–Liouville theory those results justified dates back to Charles Sturm and Joseph Liouville in the 1830s.

## Connections
- **Callbacks:** ↩ S1E12 (diagonal subsequence arguments), ↩ S2E12 (trace = sum of eigenvalues), ↩ S2E13 (when diagonalization fails), ↩ S2E18 (spectral theorem via maximization), ↩ S2E19 (low-rank approximation, operator norm), ↩ S2E20 (non-compact unit ball, shift, multiplication by $x$), ↩ S2E21 (Riesz's lemma, unbounded differentiation), ↩ S2E26 (open mapping), ↩ S2E27 (weak convergence), ↩ S2E28 (orthogonal decomposition), ↩ S2E29 (sine series, $\zeta(2)$)
- **Sets up:** ↪ S2E31 (what replaces eigenvalues when compactness fails), ↪ S2E33 (Green's functions as solutions of $LG = \delta$; Sobolev spaces and compact embeddings), ↪ S3E09 and the Hodge theory side quest (compactness of the inverse Laplacian on a compact manifold gives finite-dimensional cohomology)
- **Side quests:** Kernel methods and RKHS (Mercer's theorem); Graphs as matrices (the graph Laplacian's eigenvalues).

## References
- **Primary / historical**
  - I. Fredholm, "Sur une classe d'équations fonctionnelles," *Acta Mathematica* 27 (1903).
  - D. Hilbert, *Grundzüge einer allgemeinen Theorie der linearen Integralgleichungen*, Teubner, 1912.
  - F. Riesz, "Über lineare Funktionalgleichungen," *Acta Mathematica* 41 (1918).
  - J. Mercer, "Functions of positive and negative type, and their connection with the theory of integral equations," *Philosophical Transactions of the Royal Society A* 209 (1909).
- **Textbooks**
  - H. Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations*, Springer, 2011, Ch. 6 (compact operators, Fredholm alternative, spectral decomposition of compact self-adjoint operators) and Ch. 8 (boundary value problems and eigenfunction expansions in one dimension).
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978, Ch. 8 (compact operators and their spectrum) and Ch. 9 (spectral properties of bounded self-adjoint operators).
  - M. Reed and B. Simon, *Methods of Modern Mathematical Physics I: Functional Analysis*, Academic Press, 1972 (rev. 1980), Ch. VI (bounded operators, including compact operators and the Fredholm alternative).
  - E. M. Stein and R. Shakarchi, *Real Analysis* (Princeton Lectures in Analysis III), 2005, Ch. 4 (compact operators and the spectral theorem).
- **Accessible**
  - R. Courant and D. Hilbert, *Methods of Mathematical Physics*, Vol. I, Interscience, 1953 (English edition), the chapters on vibration and eigenvalue problems.
  - N. Young, *An Introduction to Hilbert Space*, Cambridge University Press, 1988 (compact operators and Sturm–Liouville systems).
