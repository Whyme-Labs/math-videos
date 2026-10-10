# S2E29: Fourier: Functions as Infinite Vectors

> **Season / Act:** Season 2, Part B, Act VIII (Hilbert Spaces and Operators) · **Target runtime:** 20–25 min ·
> **Prerequisites:** eigenvectors (↩ S2E12), unitary spaces and the DFT (↩ S2E15), projections and Gram–Schmidt (↩ S2E17), the Big Three and Fourier divergence (↩ S2E26), Hilbert spaces, Bessel and Parseval (↩ S2E28); integration by parts, complex exponentials (↩ S1E10) ·
> **Builds toward:** compact operators and Sturm–Liouville (↪ S2E30), spectrum of multiplication and translation operators (↪ S2E31), Koopman eigenfunctions of rotations and Weyl equidistribution (↪ S2E32), distributions and Green's functions (↪ S2E33), Fourier is duality (↪ S3E04)

## Learning objectives
By the end of this lesson the viewer can:
1. Show that $\{e^{inx}\}_{n \in \mathbb{Z}}$ is an orthonormal set in $L^2[-\pi,\pi]$ (with normalized measure), compute Fourier coefficients as inner products, and explain why Fourier partial sums are orthogonal projections.
2. State the Riesz–Fischer and Parseval theorems in the form "the Fourier map $L^2 \to \ell^2(\mathbb{Z})$ is unitary," and use Parseval to sum series such as $\sum 1/n^2 = \pi^2/6$.
3. Distinguish convergence in $L^2$ (always) from pointwise convergence (not always), and describe the Gibbs phenomenon.
4. Explain why differentiation is diagonal in the Fourier basis, and use this to solve the heat equation on a circle.
5. Produce other orthonormal bases (Legendre polynomials by Gram–Schmidt; Hermite functions; the Haar wavelet basis) and say what each is good for.

## Cold open
*Narration draft.*

Play a single note on a violin, then the same note on a flute. Same pitch, different sound. Your ear can tell them apart instantly, and it does so by doing something remarkable: it splits each sound into pure tones, a fundamental plus overtones, and hears the *recipe*, how much of each pure tone is in the mix.

In 1807 Joseph Fourier claimed that *every* function can be split this way, as a sum of sines and cosines. The leading mathematicians of the day didn't believe him. A square wave, with its sharp corners, built out of perfectly smooth waves? It sounded absurd. And they had a point: if you actually add up the sines, something strange happens near the corners. The sum overshoots, by about nine percent of the jump, and no matter how many terms you add, the overshoot never goes away.

So is Fourier right or wrong? Both, depending on what you mean by "equals." Today we'll see that the right meaning comes straight from the last episode. Pure tones are perpendicular unit vectors in a Hilbert space. A sound's recipe is its list of coordinates. And splitting a sound into tones is exactly what we did in S2E17: drop a perpendicular shadow onto each axis, infinitely many times.

## The story

### 1. The naive attempt: "every function is a sum of sines"

Fourier's claim, in modern form, is that a $2\pi$-periodic function $f$ can be written as
$$f(x) = \sum_{n=-\infty}^{\infty} c_n e^{inx}, \qquad c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x) e^{-inx}\,dx .$$
Using $e^{inx} = \cos nx + i \sin nx$ (↩ S1E10), the terms with $\pm n$ combine to $a_n \cos nx + b_n \sin nx$.

Where did the formula for $c_n$ come from? Fourier's trick: multiply both sides by $e^{-imx}$ and integrate; all terms with $n \neq m$ vanish. That is the move of S2E17, reading off a coordinate in an orthonormal basis by taking an inner product. Fourier was doing linear algebra in infinite dimensions a century before anyone had the words.

But "$=$" is ambiguous. The naive reading is pointwise: for each $x$, the series of numbers converges to $f(x)$. That reading runs into trouble immediately.

### 2. The crisis: pointwise convergence is the wrong question

Three facts make pointwise convergence a poor foundation.

- **Corners and jumps.** At a jump, every partial sum of the square wave equals 0, the midpoint, not either side. Near the jump, partial sums overshoot to about $1.179$ when the function jumps from $-1$ to $1$ (the **Gibbs phenomenon**). The overshoot moves closer to the jump as $N$ grows, but its height doesn't shrink.
- **Continuous functions can fail.** Du Bois-Reymond (1873) built a continuous function whose Fourier series diverges at a point. In S2E26 we got the same conclusion without building anything, from the uniform boundedness principle: the partial-sum functionals $f \mapsto S_N f(0)$ on $C[-\pi,\pi]$ have norms (the Lebesgue constants) growing like $\frac{4}{\pi^2}\log N$, so they cannot all be bounded at every $f$ (↩ S2E26).
- **Integrable functions can fail badly.** Kolmogorov (1923, 1926) found an $L^1$ function whose Fourier series diverges almost everywhere, and then one that diverges everywhere.

So we change the question. Instead of asking "does the series converge at each point?", ask "does it converge **in energy**?" That is, does $\int |f - S_N f|^2 \to 0$? This is convergence in the $L^2$ norm, and the Hilbert space machinery of S2E28 answers it completely.

### 3. The construction: Fourier as an orthonormal basis

We work in $L^2(\mathbb{T})$, the square-integrable $2\pi$-periodic functions (equivalently $L^2[-\pi,\pi]$), with the **normalized** inner product
$$\langle f, g\rangle = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,\overline{g(x)}\,dx .$$
(With the unnormalized measure $dx$, use $e^{inx}/\sqrt{2\pi}$ instead; nothing else changes.) Write $e_n(x) = e^{inx}$.

> **Lemma (orthonormality).** $\langle e_n, e_m\rangle = \delta_{nm}$ for all $n, m \in \mathbb{Z}$.

**Proof.** $\langle e_n, e_m\rangle = \frac{1}{2\pi}\int_{-\pi}^{\pi} e^{i(n-m)x}\,dx$. If $n = m$ the integrand is 1 and the result is 1. If $k = n - m \neq 0$, the integral is $\left[\frac{e^{ikx}}{ik}\right]_{-\pi}^{\pi} = \frac{e^{ik\pi} - e^{-ik\pi}}{ik} = \frac{2i\sin(k\pi)}{ik} = 0$. $\blacksquare$

> **Definition.** The **Fourier coefficients** of $f \in L^2(\mathbb T)$ are $\hat f(n) = \langle f, e_n\rangle = \frac1{2\pi}\int_{-\pi}^{\pi} f(x)e^{-inx}\,dx$, and the **$N$-th partial sum** is $S_N f = \sum_{|n| \le N} \hat f(n) e_n$.

> **Theorem (partial sums are projections).** $S_N f$ is the orthogonal projection of $f$ onto the space $\mathcal T_N$ of trigonometric polynomials of degree $\le N$. In particular, among all $p \in \mathcal{T}_N$, $\|f - p\|$ is smallest exactly when $p = S_N f$, and
> $$\|f - S_N f\|^2 = \|f\|^2 - \sum_{|n| \le N} |\hat f(n)|^2 .$$

**Proof.** For $|k| \le N$, $\langle f - S_N f, e_k\rangle = \hat f(k) - \sum_{|n| \le N}\hat f(n)\langle e_n, e_k\rangle = \hat f(k) - \hat f(k) = 0$, so $f - S_N f \perp \mathcal T_N$. For any $p \in \mathcal T_N$, $S_N f - p \in \mathcal T_N$, so by Pythagoras
$$\|f - p\|^2 = \|f - S_N f\|^2 + \|S_N f - p\|^2 \ge \|f - S_N f\|^2,$$
with equality iff $p = S_N f$. Taking $p = 0$ gives $\|f\|^2 = \|f - S_N f\|^2 + \|S_N f\|^2$, and $\|S_N f\|^2 = \sum_{|n|\le N}|\hat f(n)|^2$ by orthonormality. $\blacksquare$

So Fourier's partial sums are **least-squares fits** by finitely many tones (↩ S2E17), and Bessel's inequality (↩ S2E28) gives $\sum_n |\hat f(n)|^2 \le \|f\|^2$. As an immediate bonus, $\hat f(n) \to 0$ as $|n| \to \infty$ (the Riemann–Lebesgue lemma, in its $L^2$ form).

### 4. Completeness of the basis, Riesz–Fischer and Parseval

Orthonormal is not enough; we need the $e_n$ to be a *basis*, i.e. their span must be dense.

> **Theorem (completeness of the trigonometric system).** Trigonometric polynomials are dense in $L^2(\mathbb T)$. Equivalently, if $\hat f(n) = 0$ for all $n$, then $f = 0$ almost everywhere.

*Proof sketch.* Continuous periodic functions are dense in $L^2(\mathbb T)$ (S2E23's completion picture: $L^2$ is the completion of $C$). For continuous $f$, **Fejér's theorem** says the averages $\sigma_N f = \frac{1}{N+1}\sum_{k=0}^N S_k f$ converge to $f$ *uniformly*. The averaging works because $\sigma_N f = f * F_N$ for the Fejér kernel $F_N(x) = \frac{1}{N+1}\left(\frac{\sin((N+1)x/2)}{\sin(x/2)}\right)^2$, which is nonnegative, has mean 1 and concentrates at 0, whereas the Dirichlet kernel behind $S_N$ is not positive. Uniform convergence implies $L^2$ convergence on a finite interval, and each $\sigma_N f$ is a trigonometric polynomial. (Alternatively: Stone–Weierstrass.)

Combining with S2E28's equivalences:

> **Theorem (Parseval and Riesz–Fischer).** For every $f \in L^2(\mathbb T)$,
> $$S_N f \to f \ \text{in } L^2, \qquad \frac1{2\pi}\int_{-\pi}^{\pi} |f|^2\,dx = \sum_{n \in \mathbb Z}|\hat f(n)|^2, \qquad \langle f, g\rangle = \sum_n \hat f(n)\overline{\hat g(n)} .$$
> Conversely, for every $(c_n) \in \ell^2(\mathbb Z)$ there is a unique $f \in L^2(\mathbb T)$ with $\hat f(n) = c_n$. Hence the **Fourier map**
> $$\mathcal F : L^2(\mathbb T) \to \ell^2(\mathbb Z), \qquad f \mapsto (\hat f(n))_{n \in \mathbb Z}$$
> is a unitary isomorphism.

"Unitary" is S2E15's word: it preserves inner products, so it preserves energy. The total energy of a sound equals the sum of the energies of its pure tones. The finite version of this was the unitary DFT matrix (↩ S2E15).

**Back to pointwise convergence.** The $L^2$ theory doesn't say $S_N f(x) \to f(x)$ for any particular $x$. Some positive results:
- **Dirichlet's theorem:** if $f$ is piecewise $C^1$, then $S_N f(x) \to \tfrac12\big(f(x^+) + f(x^-)\big)$ at every $x$.
- If $f$ is continuous and $\sum |\hat f(n)| < \infty$ (true, e.g., if $f$ is $C^1$), convergence is uniform.
- **Carleson's theorem (1966):** for $f \in L^2$, $S_N f(x) \to f(x)$ for almost every $x$. (Hunt extended this to $L^p$, $p > 1$.) This is one of the deepest results in analysis, and it shows that Kolmogorov's $L^1$ counterexample cannot be improved to $L^2$.

### 5. Payoff: differentiation is diagonal

Why did Fourier care? He wanted to solve the **heat equation**. The reason his method works is S2E12's eigenvector idea:
$$\frac{d}{dx} e^{inx} = in\, e^{inx}.$$
Each $e_n$ is an eigenvector of $\frac{d}{dx}$, with eigenvalue $in$. In the Fourier basis, the derivative is an infinite diagonal matrix $\mathrm{diag}(\dots, -2i, -i, 0, i, 2i, \dots)$, and $\frac{d^2}{dx^2}$ is $\mathrm{diag}(-n^2)$.

> **Theorem.** If $f$ is $2\pi$-periodic and $C^1$, then $\widehat{f'}(n) = in\,\hat f(n)$ for all $n$.

**Proof.** Integrate by parts:
$$\widehat{f'}(n) = \frac1{2\pi}\int_{-\pi}^{\pi} f'(x)e^{-inx}\,dx = \frac1{2\pi}\Big[f(x)e^{-inx}\Big]_{-\pi}^{\pi} + \frac{in}{2\pi}\int_{-\pi}^{\pi} f(x)e^{-inx}\,dx .$$
The boundary term vanishes because $f(\pi) = f(-\pi)$ and $e^{-in\pi} = e^{in\pi}$. The remaining term is $in\hat f(n)$. $\blacksquare$

So a linear differential equation with constant coefficients becomes **infinitely many decoupled scalar equations**, one per frequency. This is diagonalization (↩ S2E12) applied to calculus. Notice also what this says about size: $\|f'\|^2 = \sum n^2 |\hat f(n)|^2$, which can be infinite even when $\|f\|^2 = \sum |\hat f(n)|^2$ is finite. That's the unboundedness of $\frac{d}{dx}$ from S2E21, now visible as eigenvalues $in$ running off to infinity. It will matter in S2E31.

**Why translation-invariant problems love Fourier.** The deeper reason $e^{inx}$ diagonalizes $d/dx$ is that it diagonalizes every **translation** $\tau_a f(x) = f(x - a)$: $\tau_a e_n = e^{-ina} e_n$. Any linear operator that commutes with all translations (derivatives, convolutions, the heat flow) is diagonal in the same basis. The functions $e^{inx}$ are the *characters* of the circle group, and that is the beginning of S3E04 (↪ S3E04).

### 6. Other orthonormal bases

Fourier's basis is one choice among many. Each is suited to a different operator or domain.
- **Legendre polynomials** on $L^2[-1,1]$: Gram–Schmidt on $1, x, x^2, \dots$ (↩ S2E17). Polynomials are dense (Weierstrass), so the result is a basis. They are eigenfunctions of the Legendre operator $\frac{d}{dx}\big((1-x^2)\frac{d}{dx}\big)$ and appear in gravity and electrostatics on spheres.
- **Hermite functions** $h_n(x) = c_n H_n(x)e^{-x^2/2}$ on $L^2(\mathbb R)$: eigenfunctions of the quantum harmonic oscillator $-\frac{d^2}{dx^2} + x^2$ (eigenvalues $2n + 1$), and also of the Fourier transform on $\mathbb R$ (eigenvalues $(-i)^n$).
- **Wavelets:** the Haar system $\mathbf 1_{[0,1]}$ together with $\psi_{j,k}(x) = 2^{j/2}\psi(2^j x - k)$ ($j \ge 0$, $0 \le k < 2^j$), where $\psi = \mathbf 1_{[0,1/2)} - \mathbf 1_{[1/2,1)}$, is an orthonormal basis of $L^2[0,1]$ whose elements are localized in both position and scale. Daubechies (1988) constructed smooth, compactly supported wavelet bases; they are behind JPEG 2000.

**Answer to the cold open.** Fourier was right in the sense that matters for sound: every finite-energy signal is the $L^2$ limit of its tone decomposition, and the recipe (the coefficients) determines the signal and preserves its energy. He was wrong, or at least too quick, about pointwise equality, which needs extra hypotheses, and which really fails at jumps (Gibbs) and can fail for continuous functions (↩ S2E26).

**Zoom out (thread 1, extend to repair a defect; and thread 3, bijections).** Pointwise convergence was the defect; the repair was to measure convergence in a complete inner product space. The result is a *bijection that keeps all the structure*: $L^2(\mathbb T) \cong \ell^2(\mathbb Z)$, a function and its spectrum are the same vector in two coordinate systems.

## Worked examples

### Example 1: The square wave, and $\sum 1/n^2 = \pi^2/6$

Let $f(x) = -1$ on $(-\pi, 0)$ and $f(x) = 1$ on $(0, \pi)$, extended $2\pi$-periodically.

**Coefficients.** $\hat f(0) = \frac1{2\pi}\left(\int_{-\pi}^0 (-1)\,dx + \int_0^\pi 1\,dx\right) = 0$. For $n \neq 0$:
$$\hat f(n) = \frac1{2\pi}\left(-\int_{-\pi}^0 e^{-inx}dx + \int_0^\pi e^{-inx}dx\right).$$
Compute $\int_0^\pi e^{-inx}dx = \frac{1 - e^{-in\pi}}{in} = \frac{1 - (-1)^n}{in}$ and $\int_{-\pi}^0 e^{-inx}dx = \frac{e^{in\pi} - 1}{in} = \frac{(-1)^n - 1}{in}$. So
$$\hat f(n) = \frac{1}{2\pi}\cdot\frac{2(1 - (-1)^n)}{in} = \begin{cases} \dfrac{2}{i\pi n} = -\dfrac{2i}{\pi n}, & n \text{ odd},\\[4pt] 0, & n \text{ even}.\end{cases}$$
Pairing $\pm n$: $\hat f(n)e^{inx} + \hat f(-n)e^{-inx} = -\frac{2i}{\pi n}(e^{inx} - e^{-inx}) = -\frac{2i}{\pi n}\cdot 2i\sin nx = \frac{4}{\pi n}\sin nx$. So
$$f(x) \sim \frac4\pi\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \cdots\right).$$
(Checked symbolically with sympy: $\hat f(1) = -2i/\pi$, $\hat f(2) = 0$, $\hat f(3) = -2i/(3\pi)$.)

**Parseval.** $\|f\|^2 = \frac1{2\pi}\int_{-\pi}^\pi 1\,dx = 1$. On the other side, $\sum_{n}|\hat f(n)|^2 = \sum_{n \text{ odd}, \, n \in \mathbb Z}\frac{4}{\pi^2 n^2} = \frac{8}{\pi^2}\sum_{k \ge 0}\frac{1}{(2k+1)^2}$. Setting them equal:
$$\sum_{k\ge0}\frac1{(2k+1)^2} = 1 + \frac19 + \frac1{25} + \cdots = \frac{\pi^2}{8}.$$
Let $S = \sum_{n \ge 1} 1/n^2$. The even terms contribute $\sum 1/(2m)^2 = S/4$, so the odd terms contribute $\frac34 S$. Hence $\frac34 S = \frac{\pi^2}8$, i.e.
$$\sum_{n=1}^\infty \frac1{n^2} = \frac{\pi^2}{6}.$$
**Numerical check (python3):** the odd sum up to $n = 200001$ is $1.233698$ vs. $\pi^2/8 = 1.233701$; the full sum is $1.644929$ vs. $\pi^2/6 = 1.644934$ (the gap is the tail $\approx 1/N$).

**Energy left over.** By the projection theorem, $\|f - S_N f\|^2 = 1 - \frac{8}{\pi^2}\sum_{n \text{ odd} \le N}\frac1{n^2}$:

| $N$ | 1 | 3 | 5 | 9 | 99 |
|---|---|---|---|---|---|
| $\lVert f - S_N f\rVert^2$ | 0.1894 | 0.0994 | 0.0669 | 0.0404 | 0.0041 |

The error goes to 0 in energy, even though the Gibbs overshoot (Example 3) never disappears.

### Example 2: $f(x) = x$, Parseval again, and the Leibniz series

On $(-\pi, \pi)$ let $f(x) = x$. Then $\hat f(0) = 0$ (odd function), and for $n \neq 0$, by parts with $u = x$, $dv = e^{-inx}dx$:
$$\int_{-\pi}^{\pi} x e^{-inx}dx = \left[\frac{x e^{-inx}}{-in}\right]_{-\pi}^{\pi} + \frac1{in}\int_{-\pi}^\pi e^{-inx}dx = \frac{\pi(-1)^n + \pi(-1)^n}{-in} + 0 = \frac{2\pi(-1)^n i}{n}.$$
So $\hat f(n) = \frac{i(-1)^n}{n}$. (Check: $\hat f(1) = -i$, $\hat f(2) = i/2$; matches sympy.) Pairing $\pm n$ gives $\frac{i(-1)^n}{n}\cdot 2i\sin nx = \frac{2(-1)^{n+1}}{n}\sin nx$, so
$$x \sim 2\left(\sin x - \frac{\sin 2x}2 + \frac{\sin 3x}3 - \cdots\right).$$
**Parseval:** $\frac1{2\pi}\int_{-\pi}^\pi x^2 dx = \frac{\pi^2}{3}$ and $\sum_{n \neq 0}\frac1{n^2} = 2S$. So $2S = \pi^2/3$, again $S = \pi^2/6$. Two different vectors, same identity.

**Pointwise (Dirichlet).** $f$ is smooth near $x = \pi/2$, so the series converges there: $\frac\pi2 = 2\left(1 - \frac13 + \frac15 - \frac17 + \cdots\right)$, which is Leibniz's series $\frac\pi4 = 1 - \frac13 + \frac15 - \cdots$. At $x = \pi$ every term is 0, which is the average of the one-sided limits $\pi$ and $-\pi$ of the periodic extension, as Dirichlet's theorem predicts.

### Example 3: The Gibbs overshoot, measured

For the square wave, $S_N f(x) = \frac4\pi\sum_{n \text{ odd} \le N}\frac{\sin nx}{n}$. Its first maximum to the right of 0 is at $x = \frac{\pi}{N+1}$ (differentiate: $S_N f'(x) = \frac4\pi\sum_{n\text{ odd}\le N}\cos nx = \frac{2\sin((N+1)x)}{\pi\sin x}$, whose first positive zero is $x = \pi/(N+1)$). Numerically:

| $N$ | location of max | $\max S_N f$ |
|---|---|---|
| 9 | $0.3142 = \pi/10$ | 1.1823 |
| 49 | $0.0628 = \pi/50$ | 1.1791 |
| 199 | $0.0157 = \pi/200$ | 1.1790 |

As $N \to \infty$ the maximum tends to $\frac2\pi\int_0^\pi \frac{\sin t}{t}\,dt \approx 1.17898$. The overshoot is $\approx 0.179$, about $8.9\%$ of the jump of size 2. In $L^2$, the overshoot region has width $\sim \pi/N$, so its energy goes to 0. That's how both statements are true at once.

### Example 4: Solving the heat equation on a ring

A thin insulated ring has temperature $u(x, t)$ with $u_t = u_{xx}$ and initial temperature $u(x, 0) = f(x)$, the square wave. Expand $u(\cdot, t) = \sum_n \hat u(n, t) e^{inx}$. Since $\partial_x^2$ is diagonal with entries $-n^2$, the PDE becomes, for each $n$ separately,
$$\frac{d}{dt}\hat u(n,t) = -n^2\,\hat u(n,t), \qquad \hat u(n, 0) = \hat f(n) \quad\Longrightarrow\quad \hat u(n,t) = e^{-n^2 t}\hat f(n).$$
So
$$u(x,t) = \frac4\pi\sum_{n\text{ odd}}\frac{e^{-n^2 t}}{n}\sin nx .$$
High frequencies die fastest: corners round off first. At $t = 1$, $x = \pi/2$: $u = \frac4\pi\left(e^{-1} - \frac{e^{-9}}3 + \frac{e^{-25}}5 - \cdots\right) \approx \frac4\pi(0.367879 - 0.000041) \approx 0.46835$. Energy check: $\|u(\cdot,t)\|^2 = \sum |\hat f(n)|^2 e^{-2n^2 t}$ is strictly decreasing, so heat flow dissipates energy, whereas the wave equation $u_{tt} = u_{xx}$ gives $\hat u(n,t) = \hat f(n)\cos(nt) + \frac{\hat g(n)}{n}\sin(nt)$ (for $n \ne 0$, with $g = u_t(\cdot, 0)$), which oscillates forever.

### Example 5: Legendre polynomials by Gram–Schmidt

In $L^2[-1,1]$ with $\langle f, g\rangle = \int_{-1}^1 f g\,dx$, orthogonalize $1, x, x^2, x^3$:
- $p_0 = 1$, $\|p_0\|^2 = 2$.
- $p_1 = x - \frac{\langle x, 1\rangle}{2}\cdot 1 = x$ (since $\int_{-1}^1 x = 0$), $\|p_1\|^2 = \frac23$.
- $p_2 = x^2 - \frac{\langle x^2, 1\rangle}{2} - \frac{\langle x^2, x\rangle}{2/3}x = x^2 - \frac{2/3}{2} - 0 = x^2 - \frac13$, $\|p_2\|^2 = \int_{-1}^1(x^4 - \frac23x^2 + \frac19) = \frac25 - \frac49 + \frac29 = \frac{8}{45}$.
- $p_3 = x^3 - \frac{\langle x^3, x\rangle}{2/3}x = x^3 - \frac{2/5}{2/3}x = x^3 - \frac35 x$ (the even ones drop out by symmetry), $\|p_3\|^2 = \frac{8}{175}$.

The classical Legendre polynomials are rescaled so that $P_n(1) = 1$: $P_2 = \frac32 x^2 - \frac12 = \frac32 p_2$ and $P_3 = \frac52 x^3 - \frac32 x = \frac52 p_3$. (All values verified with sympy.)

## Visual and animation notes
1. **Cold open:** a violin and a flute waveform side by side, each decomposing into a stack of pure sine waves with bars showing amplitudes (the "recipe"). Then a square wave appears and partial sums build up with visible Gibbs "ears" at the corners.
2. **Orthonormality:** two sinusoids multiplied pointwise; the product's positive and negative areas shaded in two colours and cancelling exactly.
3. **Partial sums as projections (key visual):** reuse S2E17's shadow-on-a-plane motif. The square wave is a blue arrow; its shadow onto $\mathrm{span}\{e_{\pm1}\}$, then $\mathrm{span}\{e_{\pm1}, e_{\pm3}\}$, and so on. A side bar shows the residual energy from Example 1's table shrinking.
4. **Unitary map:** **Bijection** motif. The function graph on the left and a "lollipop" plot of $|\hat f(n)|$ on the right, joined by threads; an energy meter shows the same value on both sides.
5. **Gibbs:** zoom on the corner as $N = 9, 49, 199$; the overshoot squeezes toward the jump while its height stays put; the shaded area under the overshoot shrinks to 0.
6. **Differentiation is diagonal:** **Linear map** grid motif in a new form: an infinite diagonal matrix with entries $in$, beside a single $e^{inx}$ wave that only scales and phase-shifts under $d/dx$. Then the heat equation: each coefficient bar decays at rate $n^2$; the square wave rounds off.
7. **Other bases:** a quick gallery: Legendre polynomials on $[-1,1]$, Hermite functions, Haar wavelets (boxes at shrinking scales), each labelled "an orthonormal basis of the same Hilbert space" (callback to S2E28's "only one ℓ²").

## Common misconceptions
- **Misconception:** The Fourier series of a continuous function converges to it at every point. **Reality:** not necessarily (du Bois-Reymond; S2E26). It converges in $L^2$, and almost everywhere by Carleson's theorem, and its Fejér means converge uniformly.
- **Misconception:** The Gibbs overshoot means the Fourier series doesn't converge to the square wave. **Reality:** it converges in $L^2$ and at every point (to $f(x)$ away from jumps, to 0 at them). What fails is *uniform* convergence near a jump.
- **Misconception:** "$f = \sum \hat f(n) e^{inx}$" is an equation between numbers at each $x$. **Reality:** for general $f \in L^2$ it's an equation in $L^2$: a norm limit, valid up to a null set.
- **Misconception:** Sines and cosines are the only orthonormal basis worth using. **Reality:** every separable Hilbert space has infinitely many orthonormal bases. You choose the one that diagonalizes your operator (Fourier for translation-invariant ones, Legendre for the sphere, Hermite for the harmonic oscillator, wavelets for localized features).
- **Misconception:** If $\hat f(n) \to 0$, then $f \in L^2$. **Reality:** you need $\sum |\hat f(n)|^2 < \infty$; e.g. $c_n = 1/\sqrt{|n|}$ tends to 0 but is not in $\ell^2$.

## Exercises
- **Warm-up (computational).** Compute the Fourier series of $f(x) = |x|$ on $(-\pi, \pi)$ and use it (pointwise at $x = 0$) to show $\sum_{k \ge 0} \frac{1}{(2k+1)^2} = \frac{\pi^2}{8}$. Then use Parseval to compute $\sum_{n\ge1} 1/n^4$.
- **Core (conceptual).** Explain why the Fourier coefficients of a $C^2$ periodic function satisfy $|\hat f(n)| \le C/n^2$, and why that implies uniform convergence of its Fourier series. What does the decay rate of $\hat f(n)$ say about the smoothness of $f$?
- **Stretch (exploration).** Show that the Haar system on $[0,1]$ is orthonormal, and that its partial sums up to level $j$ are the averages of $f$ over dyadic intervals of length $2^{-j-1}$. Deduce completeness from the fact that step functions on dyadic intervals are dense in $L^2[0,1]$.

<details><summary>Hints and answers</summary>

- **Warm-up.** $|x| \sim \frac\pi2 - \frac4\pi\sum_{k\ge0}\frac{\cos(2k+1)x}{(2k+1)^2}$. At $x = 0$: $0 = \frac\pi2 - \frac4\pi\sum\frac1{(2k+1)^2}$. Parseval: $\frac1{2\pi}\int x^2 = \frac{\pi^2}3 = \frac{\pi^2}4 + 2\sum_{k}\frac{4}{\pi^2(2k+1)^4}$, so $\sum_{\text{odd}} 1/n^4 = \pi^4/96$ and $\sum 1/n^4 = \frac{16}{15}\cdot\frac{\pi^4}{96} = \frac{\pi^4}{90}$.
- **Core.** Integrate by parts twice: $\hat f(n) = \frac{\widehat{f''}(n)}{(in)^2}$ and $|\widehat{f''}(n)| \le \max|f''|$. Then $\sum |\hat f(n)| < \infty$ and the Weierstrass M-test gives uniform convergence to a continuous function with the same coefficients, which must be $f$. Faster decay ↔ more derivatives.
- **Stretch.** Two Haar functions at different levels: one is constant on the support of the other, and the other has mean zero there. At the same level, supports are disjoint.

</details>

## Historical note
Fourier presented his heat-conduction memoir to the Paris Academy in 1807; Lagrange objected to the claim that arbitrary functions could be expanded in trigonometric series, and the work appeared in full only as *Théorie analytique de la chaleur* (1822). Dirichlet gave the first rigorous convergence theorem in 1829. Riemann's study of trigonometric series (1854) led him to define his integral, and Cantor's study of where such series can fail led him to set theory (↩ S1E11). Du Bois-Reymond's 1873 divergent example, Fejér's 1900 summability theorem, the Riesz–Fischer theorem of 1907, Kolmogorov's $L^1$ counterexamples (1923, 1926), and Carleson's 1966 almost-everywhere theorem trace a century-long effort to say exactly in what sense Fourier was right. Gibbs described the overshoot in letters to *Nature* in 1898–1899, though Wilbraham had observed it in 1848.

## Connections
- **Callbacks:** ↩ S1E10 ($e^{i\theta}$ as rotation), ↩ S1E11 (Cantor's road from Fourier series to set theory), ↩ S2E12 (eigenvectors diagonalize), ↩ S2E15 (unitary maps, the DFT), ↩ S2E17 (projection, Gram–Schmidt), ↩ S2E21 (differentiation is unbounded), ↩ S2E23 (completion), ↩ S2E26 (divergence via uniform boundedness), ↩ S2E28 (orthonormal bases, Bessel, Parseval)
- **Sets up:** ↪ S2E30 (Sturm–Liouville: $\sin(n\pi x)$ as eigenfunctions of a compact operator), ↪ S2E31 (the Fourier transform diagonalizes momentum), ↪ S2E32 ($e^{2\pi i n x}$ as Koopman eigenfunctions; Weyl equidistribution), ↪ S2E33 (Fourier series of $\delta$; Green's functions), ↪ S3E04 (characters, Pontryagin duality, Plancherel)
- **Side quests:** Wavelets; Graphs as matrices (the graph Laplacian's eigenvectors as "Fourier modes" on a graph).

## References
- **Primary / historical**
  - J. Fourier, *Théorie analytique de la chaleur*, Paris, 1822.
  - L. Carleson, "On convergence and growth of partial sums of Fourier series," *Acta Mathematica* 116 (1966).
  - A. N. Kolmogorov, "Une série de Fourier–Lebesgue divergente presque partout," *Fundamenta Mathematicae* 4 (1923).
- **Textbooks**
  - E. M. Stein and R. Shakarchi, *Fourier Analysis: An Introduction* (Princeton Lectures in Analysis I), 2003, Ch. 2 (basic properties, Fejér), Ch. 3 (mean-square convergence, Parseval, a continuous function with divergent Fourier series), Ch. 4 (applications).
  - Y. Katznelson, *An Introduction to Harmonic Analysis*, 3rd ed., Cambridge University Press, 2004, Ch. I.
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978, Ch. 3 (orthonormal sets, Legendre, Hermite and Laguerre polynomials).
  - I. Daubechies, *Ten Lectures on Wavelets*, SIAM, 1992.
- **Accessible**
  - T. W. Körner, *Fourier Analysis*, Cambridge University Press, 1988 (historical, story-driven chapters on Gibbs, heat and convergence).
  - H. Dym and H. P. McKean, *Fourier Series and Integrals*, Academic Press, 1972.
  - 3Blue1Brown, "But what is a Fourier series? From heat flow to drawing with circles" (YouTube, 2019).
