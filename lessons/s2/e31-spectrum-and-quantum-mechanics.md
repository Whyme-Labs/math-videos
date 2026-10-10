# S2E31: Spectrum Beyond Eigenvalues, and Quantum Mechanics

> **Season / Act:** Season 2, Part B, Act VIII (Hilbert Spaces and Operators) · **Target runtime:** 22–25 min ·
> **Prerequisites:** tensor products (↩ S2E10), eigenvalues and the role of the field (↩ S2E12), Jordan form (↩ S2E13), unitary spaces (↩ S2E15), the spectral theorem (↩ S2E18), what breaks (↩ S2E20), bounded operators (↩ S2E21), Hahn–Banach (↩ S2E25), closed graph theorem (↩ S2E26), Hilbert spaces (↩ S2E28), Fourier (↩ S2E29), compact operators (↩ S2E30); for one step, Liouville's theorem from complex analysis ·
> **Builds toward:** Koopman spectra and ergodic theory (↪ S2E32), distributions as generalized eigenvectors (↪ S2E33), Lie groups and representations on Hilbert spaces (↪ S3E11, ↪ S3E04), the operator algebras and quantum computing side quests

## Learning objectives
By the end of this lesson the viewer can:
1. Define the spectrum of a bounded operator, split it into point, continuous and residual parts, and explain why it can be much larger than the set of eigenvalues.
2. Prove that the right shift on $\ell^2$ has no eigenvalues, and compute that its spectrum is the closed unit disk; compute that multiplication by $x$ on $L^2[0,1]$ has spectrum $[0,1]$ and no eigenvalues.
3. Sketch why the spectrum of a bounded operator on a complex Banach space is nonempty and compact.
4. Prove the Hellinger–Toeplitz theorem and the Wintner–Wielandt theorem, and explain why they force position and momentum to be unbounded, densely defined operators.
5. State the spectral theorem in multiplication-operator form and use the quantum-mechanics dictionary (states, observables, outcomes, probabilities, composite systems) on concrete examples.

## Cold open
*Narration draft.*

Back in S2E20 we met an operator that broke the rules. Take a function on the interval from 0 to 1 and multiply it by $x$. It's linear, it's symmetric, it's as simple as an operator can be. And it has no eigenvectors. None. If $x \cdot f(x) = \lambda f(x)$, then $f$ has to vanish everywhere except at the single point $x = \lambda$, and a function that lives at a single point is the zero function.

Here's why that's alarming. In quantum mechanics, "multiply by $x$" is the *position* of a particle. The rules of quantum theory, as taught in every first course, say that the possible results of a measurement are the eigenvalues of the operator, and that after the measurement the system sits in an eigenvector. Position has no eigenvalues and no eigenvectors. Yet every detector in every physics lab records positions, all day long.

Something has to give. Either physics is wrong, or "eigenvalue" was never the right idea in infinite dimensions. Today we'll find the replacement: the *spectrum*, the set of numbers where an operator fails to be invertible. It is never empty, it can be a whole interval or a whole disk, and it is exactly what a detector sees. Along the way we'll prove that the most famous equation in quantum mechanics, $XP - PX = i\hbar$, cannot be satisfied by any bounded operators whatsoever.

## The story

### 1. The naive attempt: look for eigenvalues

In finite dimensions, for an operator $T$ and a scalar $\lambda$, there are only two possibilities: $T - \lambda I$ is invertible, or it has a nonzero kernel ($\lambda$ is an eigenvalue). That's rank–nullity. Over $\mathbb C$ eigenvalues always exist (↩ S2E12), and the Jordan form (↩ S2E13) classifies every operator.

In infinite dimensions, injective no longer implies surjective (↩ S2E20), so a third possibility opens up. Two operators show what goes wrong.

**The right shift.** $S(x_1, x_2, x_3, \dots) = (0, x_1, x_2, \dots)$ on $\ell^2$.

> **Proposition.** The right shift $S$ has no eigenvalues.

**Proof.** Suppose $Sx = \lambda x$. Comparing coordinates, $(0, x_1, x_2, \dots) = (\lambda x_1, \lambda x_2, \lambda x_3, \dots)$.
- If $\lambda = 0$: then $Sx = 0$, i.e. $x_1 = x_2 = \cdots = 0$, so $x = 0$.
- If $\lambda \neq 0$: the first coordinate gives $\lambda x_1 = 0$, so $x_1 = 0$. The second gives $\lambda x_2 = x_1 = 0$, so $x_2 = 0$. Inductively, $\lambda x_{k+1} = x_k = 0$ gives $x_{k+1} = 0$ for all $k$. So $x = 0$. $\blacksquare$

**Multiplication by $x$.** $(M f)(x) = x f(x)$ on $L^2[0,1]$. If $Mf = \lambda f$ then $(x - \lambda)f(x) = 0$ for almost every $x$, so $f(x) = 0$ for every $x \neq \lambda$, a set of full measure. Hence $f = 0$ in $L^2$: no eigenvalues.

Yet neither operator is "invertible at every $\lambda$." $S$ itself (that's $\lambda = 0$) is injective but not onto: $e_1$ is not in its range. And $M - \lambda$ for $\lambda \in [0,1]$ would need to be inverted by multiplication by $\frac{1}{x - \lambda}$, which is unbounded.

### 2. The crisis, and the definition of the spectrum

The right question is not "is $T - \lambda I$ injective?" but "is $T - \lambda I$ invertible with a bounded inverse?"

> **Definition.** Let $T$ be a bounded operator on a complex Banach space $X$. The **resolvent set** $\rho(T)$ is the set of $\lambda \in \mathbb C$ such that $T - \lambda I$ is a bijection $X \to X$ (its inverse is then automatically bounded, by the open mapping theorem, ↩ S2E26). The **spectrum** is $\sigma(T) = \mathbb C \setminus \rho(T)$. It splits into:
> - the **point spectrum** $\sigma_p(T)$: $T - \lambda I$ is not injective (eigenvalues);
> - the **continuous spectrum** $\sigma_c(T)$: $T - \lambda I$ is injective with dense range, but not onto;
> - the **residual spectrum** $\sigma_r(T)$: $T - \lambda I$ is injective and its range is not dense.
>
> A number $\lambda$ is an **approximate eigenvalue** if there are unit vectors $x_n$ with $\|(T - \lambda I)x_n\| \to 0$. Approximate eigenvalues are in $\sigma(T)$.

In finite dimensions $\sigma(T) = \sigma_p(T)$. In infinite dimensions all three parts can occur.

> **Theorem (basic properties).** For a bounded operator $T$ on a complex Banach space $X \neq \{0\}$:
> 1. $\sigma(T)$ is a closed subset of the disk $\{|\lambda| \le \|T\|\}$, hence compact;
> 2. $\sigma(T)$ is **nonempty**;
> 3. (Gelfand) $\max_{\lambda \in \sigma(T)} |\lambda| = \lim_{n\to\infty}\|T^n\|^{1/n}$.

*Proof sketch.* (1) If $|\lambda| > \|T\|$, the **Neumann series** $-\sum_{n\ge0}\lambda^{-n-1}T^n$ converges (geometric series in a complete space, ↩ S2E23) and inverts $T - \lambda I$. If $\lambda_0 \in \rho(T)$ and $|\lambda - \lambda_0| < \|(T - \lambda_0)^{-1}\|^{-1}$, the same series argument inverts $T - \lambda I = (T - \lambda_0)\big(I - (\lambda - \lambda_0)(T - \lambda_0)^{-1}\big)$. So $\rho(T)$ is open.
(2) Suppose $\sigma(T) = \varnothing$. For any $\varphi \in X^*$ and $x \in X$, the function $\lambda \mapsto \varphi\big((T - \lambda)^{-1}x\big)$ is then holomorphic on all of $\mathbb C$, and by the Neumann series it tends to 0 as $|\lambda| \to \infty$. By **Liouville's theorem** it is identically 0. Since this holds for every $\varphi$, Hahn–Banach (↩ S2E25) gives $(T - \lambda)^{-1}x = 0$ for every $x$, which is absurd for an invertible operator.

Step (2) is where the field matters, just as in S2E12: over $\mathbb R$, the rotation by $90°$ has empty real spectrum. Complex analysis "sneaks in" because $\mathbb C$ is algebraically closed (↩ S1E10).

**Special classes.** If $T$ is self-adjoint on a Hilbert space, then $\sigma(T) \subseteq [m, M]$ with $m = \inf_{\|x\|=1}\langle Tx, x\rangle$ and $M = \sup_{\|x\|=1}\langle Tx, x\rangle$, both $m$ and $M$ belong to $\sigma(T)$, $\sigma_r(T) = \varnothing$, and every point of $\sigma(T)$ is an approximate eigenvalue. If $U$ is unitary, $\sigma(U)$ lies on the unit circle (↩ S2E15).

### 3. The two examples, solved

> **Theorem.** The right shift $S$ on $\ell^2$ has $\sigma(S) = \{\lambda : |\lambda| \le 1\}$, the closed unit disk, and $\sigma_p(S) = \varnothing$.

**Proof.** We showed $\sigma_p(S) = \varnothing$. Since $\|S\| = 1$, $\sigma(S)$ lies in the closed unit disk. Now let $|\lambda| < 1$. The adjoint of $S$ is the left shift $L(x_1, x_2, \dots) = (x_2, x_3, \dots)$, and the vector $v = (1, \bar\lambda, \bar\lambda^2, \dots)$ is in $\ell^2$ (since $\sum|\lambda|^{2k} = \frac1{1 - |\lambda|^2} < \infty$) with $Lv = (\bar\lambda, \bar\lambda^2, \dots) = \bar\lambda v$. For every $x$,
$$\langle (S - \lambda)x, v\rangle = \langle x, (L - \bar\lambda)v\rangle = 0,$$
so the range of $S - \lambda$ is orthogonal to $v \neq 0$ and is not dense. Thus every $|\lambda| < 1$ is in $\sigma_r(S)$. The spectrum is closed, so it contains the closure of the open disk, which is the closed disk. $\blacksquare$

(Worked Example 1 shows directly that points on the unit circle are approximate eigenvalues, i.e. continuous spectrum.)

> **Theorem.** Multiplication by $x$ on $L^2[0,1]$ has $\sigma(M) = [0,1]$, all of it continuous spectrum, and no eigenvalues.

**Proof sketch** (full details in Worked Example 2). For $\lambda \notin [0,1]$, $\frac{1}{x - \lambda}$ is bounded on $[0,1]$ by $\frac1{\mathrm{dist}(\lambda, [0,1])}$, so multiplication by it is a bounded inverse. For $\lambda \in [0,1]$, the normalized bumps $f_n = \sqrt n\,\mathbf 1_{I_n}$ on intervals $I_n \ni \lambda$ of length $\frac1n$ satisfy $\|(M - \lambda)f_n\| \le \frac1n$, so $\lambda$ is an approximate eigenvalue. $\blacksquare$

More generally, for a bounded measurable $g$ on a measure space, the multiplication operator $M_g f = gf$ on $L^2$ has spectrum equal to the **essential range** of $g$, and $\lambda$ is an eigenvalue iff $\{g = \lambda\}$ has positive measure.

**The picture.** The approximate eigenvectors $f_n$ for $M$ are tall thin bumps that concentrate at $\lambda$: they are trying to become "$\delta(x - \lambda)$", which is not in $L^2$. In the finale (↪ S2E33) the delta becomes a legitimate *distribution*, a "generalized eigenvector" living outside the Hilbert space.

### 4. Unbounded operators: why position and momentum can't be bounded

On $L^2(\mathbb R)$ quantum mechanics uses position $(X\psi)(x) = x\psi(x)$ and momentum $(P\psi)(x) = -i\hbar\,\psi'(x)$. Neither is bounded: a wave packet far from the origin makes $\|X\psi\|$ huge, and a rapidly oscillating one makes $\|P\psi\|$ huge (↩ S2E21). Could a cleverer choice of operators be bounded? Two theorems say no.

> **Theorem (Hellinger–Toeplitz, 1910).** If $A : H \to H$ is defined on **all** of a Hilbert space $H$ and is symmetric, $\langle Ax, y\rangle = \langle x, Ay\rangle$ for all $x, y \in H$, then $A$ is bounded.

**Proof.** By the closed graph theorem (↩ S2E26) it suffices to show the graph is closed. Let $x_n \to x$ and $Ax_n \to z$. For every $y \in H$,
$$\langle z, y\rangle = \lim_n \langle Ax_n, y\rangle = \lim_n\langle x_n, Ay\rangle = \langle x, Ay\rangle = \langle Ax, y\rangle .$$
Hence $z = Ax$. $\blacksquare$

So an unbounded symmetric operator like $X$ or $P$ **cannot be defined on the whole Hilbert space**. It lives on a dense **domain**: $D(X) = \{\psi : x\psi \in L^2\}$, $D(P) = \{\psi \in L^2 : \psi' \in L^2\}$ (the Sobolev space $H^1$, ↪ S2E33).

> **Theorem (Wintner 1947, Wielandt 1949).** There are no bounded operators $X, P$ on a nonzero Banach space with $XP - PX = cI$ for a scalar $c \neq 0$.

**Proof.** In finite dimensions this is a trace argument: $\mathrm{tr}(XP - PX) = 0$ but $\mathrm{tr}(cI) = cn \neq 0$. In general, first show by induction that
$$XP^n - P^nX = nc\,P^{n-1} \qquad (n \ge 1).$$
For $n = 1$ this is the hypothesis. If it holds for $n$, then
$$XP^{n+1} - P^{n+1}X = (XP^n - P^nX)P + P^n(XP - PX) = nc\,P^{n} + c\,P^{n} = (n+1)c\,P^n .$$
Taking norms, $n|c|\,\|P^{n-1}\| \le 2\|X\|\,\|P\|\,\|P^{n-1}\|$.
- If $P^{n-1} \neq 0$ for every $n$, divide: $n|c| \le 2\|X\|\|P\|$ for all $n$, impossible.
- Otherwise let $m \ge 1$ be least with $P^m = 0$. Then $mc\,P^{m-1} = XP^m - P^mX = 0$, so $P^{m-1} = 0$, contradicting minimality (if $m = 1$, then $P^0 = I = 0$, impossible on a nonzero space). $\blacksquare$

With $c = i\hbar$, the canonical commutation relation $[X, P] = i\hbar$ cannot hold for bounded operators. Physics *forces* unbounded operators on us. Check that it does hold on nice functions:
$$XP\psi - PX\psi = x(-i\hbar\psi') - \big(-i\hbar(x\psi)'\big) = -i\hbar x\psi' + i\hbar\psi + i\hbar x\psi' = i\hbar\,\psi .$$

**Self-adjoint vs. symmetric.** For unbounded $A$, symmetric ($\langle A\psi, \phi\rangle = \langle\psi, A\phi\rangle$ on the domain) is not enough; the theory needs **self-adjoint**: $D(A^*) = D(A)$. Example: $-i\frac{d}{dx}$ on $L^2[0,1]$ with domain "$C^1$ functions vanishing at both ends" is symmetric but not self-adjoint; adding the boundary condition $\psi(1) = e^{i\theta}\psi(0)$ gives a family of different self-adjoint versions, with different spectra $\{\theta + 2\pi n\}$. Domains are physics: they encode boundary conditions.

### 5. The spectral theorem: the classification tool that replaces Jordan form

> **Theorem (spectral theorem, multiplication form).** Let $A$ be a self-adjoint operator (bounded, or unbounded and densely defined) on a separable Hilbert space $H$. Then there are a $\sigma$-finite measure space $(\Omega, \mu)$, a real-valued measurable function $g$ on $\Omega$, and a unitary $U : H \to L^2(\Omega, \mu)$ such that
> $$UAU^{-1} = M_g, \qquad \text{with } D(A) = \{\psi : g\cdot U\psi \in L^2\}.$$
> The spectrum of $A$ is the essential range of $g$.

Every self-adjoint operator *is* a multiplication operator, viewed in the right coordinates. S2E18 said "a symmetric matrix is diagonal in the right basis," i.e. multiplication by $\lambda_k$ on $\ell^2(\{1, \dots, n\})$. Now the "basis" can be continuous. Equivalent forms: $A = \int_{\sigma(A)}\lambda\,dE(\lambda)$ with a projection-valued measure $E$ (von Neumann); and the **functional calculus** $f(A) = U^{-1}M_{f\circ g}U$ for any bounded Borel $f$, e.g. the time evolution $e^{-itA}$, which is unitary (Stone's theorem says every strongly continuous unitary group arises this way).

**Examples.** $X$ on $L^2(\mathbb R)$ is already $M_x$, with spectrum $\mathbb R$. For momentum, the Fourier transform (unitary on $L^2(\mathbb R)$ by Plancherel, ↩ S2E29, ↪ S3E04) turns $-i\hbar\frac{d}{dx}$ into multiplication by $\hbar k$, so $\sigma(P) = \mathbb R$, purely continuous. A compact self-adjoint operator (S2E30) corresponds to $\Omega = \mathbb N$ with counting measure. The harmonic oscillator $H = \frac{P^2}{2m} + \frac{m\omega^2}{2}X^2$ has compact resolvent and discrete spectrum $\hbar\omega(n + \frac12)$, with the Hermite functions (↩ S2E29) as eigenvectors. The hydrogen atom's Hamiltonian has both: eigenvalues $-\frac{13.6\text{ eV}}{n^2}$ (bound states) and continuous spectrum $[0, \infty)$ (ionized electrons).

**Payoff for Act IV.** In finite dimensions the Jordan form classifies all operators up to similarity. In infinite dimensions no such classification of all operators exists. But self-adjoint (and, more generally, normal) operators are classified up to unitary equivalence by their spectral data, the measure class and multiplicity (Hahn–Hellinger theory). The spectrum, not the Jordan form, is the invariant (thread 5).

### 6. Payoff: the quantum mechanics dictionary

| Physics | Mathematics |
|---|---|
| state | unit vector $\psi \in H$ (up to a phase $e^{i\theta}$) |
| observable | self-adjoint operator $A$ |
| possible outcomes | the spectrum $\sigma(A)$ |
| probability that the outcome lies in $B$ | $\lVert E_A(B)\psi\rVert^2 = \langle \psi, E_A(B)\psi\rangle$ |
| expected value | $\langle \psi, A\psi\rangle$ |
| time evolution | unitary $e^{-itH/\hbar}$, $H$ the Hamiltonian |
| composite system of $H_1$ and $H_2$ | tensor product $H_1 \otimes H_2$ (↩ S2E10) |

For an observable with eigenbasis $(u_k)$ and eigenvalues $\lambda_k$, the probability of outcome $\lambda_k$ is $|\langle\psi, u_k\rangle|^2$ (Born's rule), and these add to 1 by Parseval (↩ S2E28). For position, $E_X(B)$ is multiplication by $\mathbf 1_B$, so
$$\mathrm{Prob}(X \in [a,b]) = \int_a^b |\psi(x)|^2\,dx .$$

**Answer to the cold open.** A detector never reports "exactly $x = 0.3$"; it reports "in a pixel $[a, b]$." That question is answered by a spectral *projection*, not an eigenvector. Position has spectrum $\mathbb R$ and no eigenvalues, and that's fine: probabilities come from the projection-valued measure. Eigenvectors were only ever the discrete special case.

**Uncertainty principle.** For self-adjoint $A, B$ and a unit $\psi$ in the right domains, $|\langle\psi, [A, B]\psi\rangle| = |\langle A\psi, B\psi\rangle - \langle B\psi, A\psi\rangle| = 2|\mathrm{Im}\langle A\psi, B\psi\rangle| \le 2\|A\psi\|\|B\psi\|$ by Cauchy–Schwarz. Applying this to $A = X - \langle X\rangle$, $B = P - \langle P\rangle$, whose commutator is still $i\hbar$, gives
$$\Delta X\,\Delta P \ge \frac\hbar2 .$$

**Zoom out (thread 6, duality, and thread 7).** We stopped asking what an operator's eigenvectors *are* and started asking where the operator *fails to invert*: a description by behaviour, in the spirit of the whole series. And the dictionary's last line, composite systems as tensor products, is where entanglement lives (the Quantum computing side quest).

## Worked examples

### Example 1: Approximate eigenvectors of the shift on the unit circle

Let $|\lambda| = 1$ and $x_n = \frac{1}{\sqrt n}\sum_{k=1}^n \lambda^{-k}e_k$, so $\|x_n\|^2 = \frac1n\sum_{k=1}^n|\lambda|^{-2k} = 1$. Then
$$Sx_n = \frac1{\sqrt n}\sum_{k=1}^n\lambda^{-k}e_{k+1} = \frac1{\sqrt n}\sum_{j=2}^{n+1}\lambda^{-(j-1)}e_j, \qquad \lambda x_n = \frac1{\sqrt n}\sum_{j=1}^{n}\lambda^{-(j-1)}e_j .$$
The terms $j = 2, \dots, n$ cancel, leaving
$$(S - \lambda)x_n = \frac{1}{\sqrt n}\big(\lambda^{-n}e_{n+1} - e_1\big), \qquad \|(S - \lambda)x_n\| = \sqrt{\frac2n} \to 0 .$$
So every $\lambda$ on the unit circle is an approximate eigenvalue of $S$ but not an eigenvalue. One can check that $S - \lambda$ has dense range there (its orthogonal complement would be an eigenvector of $L$ for $\bar\lambda$, and $(1, \bar\lambda, \bar\lambda^2, \dots) \notin \ell^2$ when $|\lambda| = 1$). Summary for $S$: $\sigma_p = \varnothing$, $\sigma_r = $ open disk, $\sigma_c = $ unit circle. For the left shift $L = S^*$, by contrast, every $|\mu| < 1$ is a genuine eigenvalue with eigenvector $(1, \mu, \mu^2, \dots)$.

### Example 2: Multiplication by $x$, in full

**Resolvent outside $[0,1]$.** Let $\lambda \in \mathbb C \setminus [0,1]$ and $d = \mathrm{dist}(\lambda, [0,1]) > 0$. Define $(Rf)(x) = \frac{f(x)}{x - \lambda}$. Then $|Rf(x)| \le \frac{|f(x)|}{d}$, so $\|R\| \le \frac1d$, and $(M - \lambda)Rf = Rf\cdot(x - \lambda) = f$, $R(M - \lambda)f = f$. So $\lambda \in \rho(M)$ and $\|(M - \lambda)^{-1}\| = \frac{1}{d}$ (equality by testing on bumps near the closest point).

**Approximate eigenvectors on $[0,1]$.** Fix $\lambda \in [0,1]$, and for $n \ge 1$ choose an interval $I_n \subseteq [0,1]$ of length $\frac1n$ containing $\lambda$. Put $f_n = \sqrt n\,\mathbf 1_{I_n}$, so $\|f_n\|^2 = n\cdot\frac1n = 1$. Then
$$\|(M - \lambda)f_n\|^2 = n\int_{I_n}(x - \lambda)^2\,dx \le n\cdot\frac1n\cdot\frac1{n^2} = \frac{1}{n^2} .$$
So $\|(M - \lambda)f_n\| \le \frac1n \to 0$. If $M - \lambda$ had a bounded inverse $R$, then $1 = \|f_n\| = \|R(M - \lambda)f_n\| \le \frac{\|R\|}{n} \to 0$, a contradiction.

**Which part of the spectrum?** $M - \lambda$ is injective (no eigenvalues), and it is self-adjoint, so its range is dense (the orthogonal complement of the range is the kernel of the adjoint, which is 0). Hence $\sigma(M) = \sigma_c(M) = [0,1]$. Notice $\langle Mf, f\rangle = \int_0^1 x|f|^2 \in [0, 1]$ for unit $f$, so $m = 0$, $M = 1$, matching the bound $\sigma \subseteq [m, M]$.

### Example 3: A two-level measurement (a qubit)

Let $H = \mathbb C^2$, the observable $A = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$ (spin along $x$, in units of $\hbar/2$), and the state $\psi = (\cos\theta, \sin\theta)$.
- **Spectrum.** $\det(A - \lambda I) = \lambda^2 - 1$, so $\sigma(A) = \{+1, -1\}$, with unit eigenvectors $u_\pm = \frac1{\sqrt2}(1, \pm1)$.
- **Probabilities (Born).** $\langle\psi, u_+\rangle = \frac{\cos\theta + \sin\theta}{\sqrt2}$, so $P(+1) = \frac{(\cos\theta + \sin\theta)^2}{2} = \frac{1 + \sin 2\theta}{2}$; similarly $P(-1) = \frac{1 - \sin2\theta}{2}$. They sum to 1 (Parseval in $\mathbb C^2$).
- **Expectation.** $\langle \psi, A\psi\rangle = \langle(\cos\theta, \sin\theta), (\sin\theta, \cos\theta)\rangle = 2\sin\theta\cos\theta = \sin2\theta$, which matches $(+1)P(+1) + (-1)P(-1) = \sin 2\theta$. ✓
- **Special cases.** $\theta = 0$ ($\psi = e_1$, "spin up along $z$"): each outcome has probability $\frac12$. $\theta = \frac\pi4$: $\psi = u_+$ and the outcome $+1$ is certain.
- **Two qubits.** The composite space is $\mathbb C^2 \otimes \mathbb C^2 \cong \mathbb C^4$ (↩ S2E10). The state $\frac1{\sqrt2}(e_1\otimes e_1 + e_2 \otimes e_2)$ is not a pure tensor $v\otimes w$ (its coefficient matrix $\frac{1}{\sqrt2}I$ has rank 2): it is **entangled**.

### Example 4: A Gaussian wave packet saturates the uncertainty bound

Let $\psi(x) = (2\pi s^2)^{-1/4}e^{-x^2/(4s^2)}$ on $L^2(\mathbb R)$, with $s > 0$.
- **Normalization.** $|\psi|^2 = \frac{1}{\sqrt{2\pi}s}e^{-x^2/(2s^2)}$ is the normal density with mean 0 and variance $s^2$, so $\|\psi\| = 1$.
- **Position.** $\langle X\rangle = 0$ by symmetry, and $(\Delta X)^2 = \int x^2|\psi|^2 = s^2$. The probability of detecting the particle in $[-s, s]$ is $\int_{-s}^s|\psi|^2 \approx 0.6827$.
- **Momentum.** $\psi' = -\frac{x}{2s^2}\psi$, and $\psi$ is real, so $\langle P\rangle = -i\hbar\int\psi\psi'\,dx = -i\hbar\left[\tfrac{\psi^2}{2}\right]_{-\infty}^{\infty} = 0$. Then $(\Delta P)^2 = \langle P\psi, P\psi\rangle = \hbar^2\int|\psi'|^2 = \hbar^2\int\frac{x^2}{4s^4}|\psi|^2 = \frac{\hbar^2 s^2}{4s^4} = \frac{\hbar^2}{4s^2}$.
- **Product.** $\Delta X\,\Delta P = s\cdot\frac{\hbar}{2s} = \frac\hbar2$: the Gaussian achieves equality in the uncertainty principle. Squeezing it ($s \to 0$) makes it look more like an "eigenvector of $X$" and spreads its momentum without bound.

## Visual and animation notes
1. **Cold open:** a function graph multiplied by $x$ (tilting), then the eigen-equation $xf = \lambda f$ forcing $f$ to collapse onto a single vertical line that vanishes. Cut to a detector screen collecting dots one by one, forming an interference-like histogram.
2. **Spectrum motif (storyline):** the complex plane with a scanning probe $\lambda$; each point lights up when $T - \lambda I$ fails to invert. For $S$: the whole disk fills in, while a separate "eigenvalue" layer stays dark. For $M$: only the segment $[0,1]$ lights up. Colour-code point / continuous / residual spectrum.
3. **Right shift proof:** a conveyor belt of coordinates; the equation $Sx = \lambda x$ forces each box to empty, domino-style, starting from the first.
4. **Approximate eigenvectors:** bumps $f_n$ narrowing around $\lambda$ while a meter shows $\|(M - \lambda)f_n\| \to 0$; the bump's limit glows as a ghostly spike labelled "δ (not in $L^2$; see S2E33)".
5. **Liouville step:** a "resolvent landscape" $|\varphi((T - \lambda)^{-1}x)|$ over the plane that would have to be flat and zero if the spectrum were empty; a red pin appears where the spectrum must be.
6. **Wintner–Wielandt:** the identity $XP^n - P^nX = ncP^{n-1}$ written as a growing stack, its left side capped by $2\|X\|\|P\|$, its right side growing linearly in $n$, until the bar breaks through the cap.
7. **Spectral theorem:** the S2E18 ellipse-aligning visual, then the axes multiply into a continuum: a "diagonal matrix with continuous index", i.e. a graph of $g$ over $\Omega$.
8. **Dictionary card**, then a two-qubit tensor-product grid (**Multilinear map** motif) for entanglement.

## Common misconceptions
- **Misconception:** The spectrum is the set of eigenvalues. **Reality:** only in finite dimensions. The right shift has no eigenvalues and spectrum equal to the closed disk; $M_x$ has no eigenvalues and spectrum $[0,1]$.
- **Misconception:** An injective operator is invertible. **Reality:** in infinite dimensions $T - \lambda$ can be injective but not surjective, or surjective onto a dense non-closed range with an unbounded inverse.
- **Misconception:** Quantum observables are Hermitian matrices, so $X$ and $P$ are just very large matrices. **Reality:** by Wintner–Wielandt no bounded operators (in particular, no matrices) satisfy $[X, P] = i\hbar$; by Hellinger–Toeplitz, $X$ and $P$ can't be defined on all of $L^2$.
- **Misconception:** "Hermitian" (symmetric) and "self-adjoint" are synonyms. **Reality:** for unbounded operators they differ; only self-adjoint operators have a spectral theorem, real spectrum, and generate unitary time evolution. Choosing a self-adjoint extension is choosing boundary conditions.
- **Misconception:** A position measurement leaves the particle in a position eigenstate $\delta(x - x_0)$. **Reality:** $\delta(x - x_0)$ is not a state (not in $L^2$); a real measurement with finite resolution projects onto $\mathbf 1_{[a,b]}\psi$ (suitably normalized).

## Exercises
- **Warm-up (computational).** Compute the spectrum of the diagonal operator $De_n = \frac1n e_n$ on $\ell^2$. Which points are eigenvalues and which are not?
- **Core (conceptual).** Show that if $U$ is unitary then $\sigma(U)$ lies on the unit circle. (Hint: for $|\lambda| < 1$ write $U - \lambda = U(I - \lambda U^*)$; for $|\lambda| > 1$ use the Neumann series.) Then show that the bilateral shift on $\ell^2(\mathbb Z)$ has spectrum exactly the unit circle and no eigenvalues.
- **Stretch (exploration).** Let $A = -\frac{d^2}{dx^2}$ on $L^2[0,\pi]$ with Dirichlet conditions. Using S2E30, show $\sigma(A) = \{1, 4, 9, \dots\}$. Then argue that $-\frac{d^2}{dx^2}$ on $L^2(\mathbb R)$ has spectrum $[0, \infty)$ with no eigenvalues, using the Fourier transform.

<details><summary>Hints and answers</summary>

- **Warm-up.** $\sigma(D) = \{1, \frac12, \frac13, \dots\} \cup \{0\}$. Each $\frac1n$ is an eigenvalue; 0 is not (D is injective) but is in the spectrum because the spectrum is closed (and $D^{-1}$ would be unbounded). Since $D$ is self-adjoint and injective, 0 is in the continuous spectrum.
- **Core.** $\|\lambda U^*\| = |\lambda| < 1$, so $I - \lambda U^*$ is invertible. For the bilateral shift $W$, $\|W^n\| = \|W^{-n}\| = 1$ forces the spectrum onto the circle; it's the whole circle because the Fourier series map $\ell^2(\mathbb Z) \to L^2(\mathbb T)$ turns $W$ into multiplication by $e^{i\theta}$ (↩ S2E29), whose essential range is the circle.
- **Stretch.** The inverse is the compact Green's operator with eigenvalues $\frac1{n^2}$. On $\mathbb R$, Fourier turns $-\frac{d^2}{dx^2}$ into multiplication by $k^2$, whose essential range is $[0,\infty)$ and whose level sets $\{k^2 = \lambda\}$ have measure zero.

</details>

## Historical note
Heisenberg's matrix mechanics (1925) and Schrödinger's wave mechanics (1926) looked like rival theories until it became clear that they were the same theory in two coordinate systems, $\ell^2$ and $L^2$ (↩ S2E28). Dirac's *Principles of Quantum Mechanics* (1930) worked fluently with eigenvectors of position, deltas and all. John von Neumann, working in Göttingen with Hilbert, insisted on rigour: in 1929–1932 he developed the theory of unbounded self-adjoint operators, proved the spectral theorem for them, and wrote *Mathematische Grundlagen der Quantenmechanik* (1932), where states are vectors in Hilbert space and observables are self-adjoint operators. Marshall Stone proved the corresponding theorem on unitary groups (1932). Hellinger and Toeplitz had shown in 1910 that symmetric everywhere-defined operators are bounded; Aurel Wintner (1947) and Helmut Wielandt (1949) proved that the canonical commutation relations have no bounded solutions. Israel Gelfand's 1941 theory of normed rings gave the spectral radius formula and made the spectrum a central object of algebra.

## Connections
- **Callbacks:** ↩ S1E10 (ℂ is algebraically closed), ↩ S2E10 (tensor products), ↩ S2E12 (eigenvalues depend on the field), ↩ S2E13 (Jordan form as classification), ↩ S2E15 (unitary operators), ↩ S2E18 (spectral theorem), ↩ S2E20 (shift and multiplication by $x$), ↩ S2E21 (unbounded differentiation), ↩ S2E23 (Neumann series needs completeness), ↩ S2E25 (Hahn–Banach), ↩ S2E26 (closed graph, open mapping), ↩ S2E28 (Parseval for Born probabilities), ↩ S2E29 (Fourier diagonalizes momentum; Hermite functions), ↩ S2E30 (compact resolvent, discrete spectrum)
- **Sets up:** ↪ S2E32 (spectral properties of unitary Koopman operators characterize ergodicity and mixing), ↪ S2E33 ($\delta(x - \lambda)$ as a generalized eigenvector; Sobolev domains), ↪ S3E04 (Plancherel; unitary representations), ↪ S3E11 (Lie groups acting by unitary operators; Stone's theorem)
- **Side quests:** Operator algebras (C*-algebras and Gelfand duality); Quantum computing (qubits, tensor products, unitary gates).

## References
- **Primary / historical**
  - J. von Neumann, *Mathematische Grundlagen der Quantenmechanik*, Springer, 1932; English translation *Mathematical Foundations of Quantum Mechanics*, Princeton University Press, 1955.
  - E. Hellinger and O. Toeplitz, "Grundlagen für eine Theorie der unendlichen Matrizen," *Mathematische Annalen* 69 (1910).
  - A. Wintner, "The unboundedness of quantum-mechanical matrices," *Physical Review* 71 (1947); H. Wielandt, "Über die Unbeschränktheit der Operatoren der Quantenmechanik," *Mathematische Annalen* 121 (1949).
  - M. H. Stone, *Linear Transformations in Hilbert Space and Their Applications to Analysis*, AMS Colloquium Publications 15, 1932.
  - P. A. M. Dirac, *The Principles of Quantum Mechanics*, Oxford, 1930.
- **Textbooks**
  - B. C. Hall, *Quantum Theory for Mathematicians*, Graduate Texts in Mathematics 267, Springer, 2013 (position and momentum operators; the spectral theorem for bounded and unbounded self-adjoint operators; the canonical commutation relations).
  - M. Reed and B. Simon, *Methods of Modern Mathematical Physics I: Functional Analysis*, Academic Press, 1972 (rev. 1980), Ch. VI (spectrum), Ch. VII (the spectral theorem), Ch. VIII (unbounded operators, self-adjointness, Stone's theorem).
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978, Ch. 7 (spectral theory in normed spaces) and Ch. 10–11 (unbounded operators and their application in quantum mechanics).
- **Accessible**
  - P. R. Halmos, "What does the spectral theorem say?", *American Mathematical Monthly* 70 (1963).
  - N. Young, *An Introduction to Hilbert Space*, Cambridge University Press, 1988.
