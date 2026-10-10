# S3E04: Fourier Is Duality

> **Season / Act:** Season 3, Act I (Algebra Meets Linear Algebra), finale of the act · **Target runtime:** 22–25 min ·
> **Prerequisites:** S1E10 (complex numbers as rotations), S1E16 (groups), S2E06 (covectors), S2E08 (the double dual), S2E12 (eigenvectors), S2E24 (continuous duals), S2E28–S2E29 (Hilbert spaces, Fourier series), S3E03 (characters) ·
> **Builds toward:** S3E11 (Lie groups and their representations), S3E12 (natural isomorphisms; Pontryagin duality as a functor); side quests on wavelets and quantum computing

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why sines, cosines and complex exponentials are forced on us: they are the characters of the translation groups $\mathbb{Z}/n$, the circle $\mathbb{T}$, and $\mathbb{R}$.
2. Define the dual group $\widehat G$ of a finite abelian group, prove the orthogonality of its characters, and derive the Fourier inversion formula, Plancherel's identity and the convolution theorem.
3. Identify the DFT matrix as the character table of $\mathbb{Z}/n$, compute a DFT by hand, and explain the FFT as a factorization of that matrix.
4. State Pontryagin duality ($\mathbb{Z}/n \leftrightarrow \mathbb{Z}/n$, $\mathbb{Z}\leftrightarrow\mathbb{T}$, $\mathbb{R}\leftrightarrow\mathbb{R}$) and compare it to $V \cong V^{**}$, and state Plancherel's theorem on $L^2(\mathbb{R})$.

## Cold open
*(Narrator. A guitar string vibrates; an audio waveform scrolls; a JPEG image dissolves into a checkerboard of little wave patterns.)*

Why waves?

Every time we take a signal apart, a sound, an image, the temperature along a metal bar, we break it into sines and cosines. Your phone does it thousands of times a second to compress music. Fourier did it in 1807 to understand heat. In Season 2 we said these waves form an orthonormal basis, and that's true. But there are infinitely many orthonormal bases. Why do engineers, physicists and mathematicians all reach for *this* one?

Here's a hint. Take a sine wave and slide it to the right. You get... a sine wave, the same shape, just shifted in phase. Take a complex exponential $e^{i\omega t}$ and slide it: you get the same function multiplied by a single number. Try that with almost any other function, a bump, a parabola, a square wave, and the slid version is a genuinely new function.

So complex exponentials are the functions that *don't care where you start*. In the language of Season 2, they are eigenvectors of every shift at once. In the language of last episode, they are **characters**, of the group of translations.

Today we'll see that Fourier analysis isn't a trick about waves. It's representation theory for the simplest groups there are, and the Fourier transform is a duality, the same kind as vectors and covectors, played out on a group.

## The story

### 1. The naive attempt: Fourier as "a nice basis"
In S2E29 we expanded a function on $[-\pi,\pi]$ as $f = \sum_n \hat f(n)e^{inx}$ and justified it with Hilbert-space geometry: $\{e^{inx}/\sqrt{2\pi}\}$ is an orthonormal basis of $L^2[-\pi,\pi]$ and the coefficients are inner products (↩ S2E29). We also noticed that differentiation is diagonal in this basis. But the basis seemed to come from nowhere, and the discrete version used in computers, the DFT, looked like a separate recipe with a mysterious matrix of roots of unity.

### 2. The crisis: what do shifts want?
The common feature of all these settings is a **group of translations** acting on functions:
$$(\tau_a f)(x) = f(x - a).$$
On $\mathbb{Z}/n$ (signals of length $n$, wrapped around), $\mathbb{T} = \mathbb{R}/2\pi\mathbb{Z}$ (periodic functions), and $\mathbb{R}$ (signals on a line), each $\tau_a$ is a linear operator, and $\tau_a\tau_b = \tau_{a+b}$: a representation of the group on a space of functions (↩ S3E03). Physical laws like the heat equation commute with translation (the bar behaves the same everywhere). Season 2's advice for any operator is: find its eigenvectors (↩ S2E12). Here we need **simultaneous eigenvectors of every translation**.

> **Lemma.** Let $G$ be an abelian group and $f: G \to \mathbb{C}$ a function with $f(0) = 1$ that is an eigenvector of every translation, $f(x - a) = \lambda(a) f(x)$ for all $x, a$. Then $f(x+y) = f(x)f(y)$.

**Proof.** Put $x = 0$: $f(-a) = \lambda(a)$. So $f(x - a) = f(-a)f(x)$ for all $x, a$; rename $-a = y$. $\blacksquare$

So the simultaneous eigenvectors of translations, normalized by $f(0)=1$, are exactly the **homomorphisms $G \to \mathbb{C}^\times$**. For a finite group, every value is a root of unity (because $f(g)^{|G|} = f(|G|g) = f(0) = 1$), so these land in the circle $U(1) = \{z : |z| = 1\}$.

> **Definition (dual group).** A **character** of an abelian group $G$ is a homomorphism $\chi: G \to U(1)$ (continuous, when $G$ is $\mathbb{T}$ or $\mathbb{R}$). The characters form a group $\widehat G$ under pointwise multiplication, $(\chi\psi)(g) = \chi(g)\psi(g)$, called the **dual group**.

These are exactly last episode's irreducible characters for an abelian group, all of degree 1 (S3E03, Exercise 2). For $G = \mathbb{Z}/n$: a character is fixed by $\chi(1)$, which must satisfy $\chi(1)^n = 1$. So, with $\omega = e^{2\pi i/n}$,
$$\widehat{\mathbb{Z}/n} = \{\chi_0, \dots, \chi_{n-1}\}, \qquad \chi_k(j) = \omega^{jk}.$$

### 3. The construction: Fourier analysis on a finite abelian group
> **Theorem (orthogonality).** For a finite abelian group $G$ and $\chi, \psi \in \widehat G$,
> $$\sum_{g\in G}\chi(g)\overline{\psi(g)} = \begin{cases}|G| & \chi = \psi\\ 0 & \chi\ne\psi.\end{cases}$$

**Proof.** Since $|\psi(g)| = 1$, $\overline{\psi(g)} = \psi(g)^{-1}$, so the sum is $S = \sum_g \eta(g)$ with $\eta = \chi\psi^{-1} \in \widehat G$. If $\chi = \psi$, $\eta = 1$ and $S = |G|$. Otherwise pick $h$ with $\eta(h)\ne1$. Reindexing $g \mapsto g + h$ permutes $G$, so
$$S = \sum_g \eta(g + h) = \eta(h)\sum_g\eta(g) = \eta(h)S,$$
and $(1 - \eta(h))S = 0$ forces $S = 0$. $\blacksquare$

(This is the same "sum over the group" trick as Maschke's theorem, and a special case of S3E03's orthogonality theorem.)

There are $|G|$ characters (true for $\mathbb{Z}/n$ by the count above, and for any finite abelian group because it is a product of cyclic groups, ↩ S3E02). Being orthogonal and nonzero, they are linearly independent, hence a **basis** of the $|G|$-dimensional space of functions $G \to \mathbb{C}$. Expanding in this basis is Fourier analysis:

> **Definition and theorem (Fourier transform on $G$).** For $f: G\to\mathbb{C}$ define $\hat f : \widehat G \to \mathbb{C}$ by
> $$\hat f(\chi) = \sum_{g\in G} f(g)\overline{\chi(g)}.$$
> Then:
> - **Inversion:** $f = \frac{1}{|G|}\sum_{\chi\in\widehat G}\hat f(\chi)\,\chi$.
> - **Plancherel:** $\sum_g |f(g)|^2 = \frac1{|G|}\sum_\chi|\hat f(\chi)|^2$.
> - **Convolution:** with $(f * h)(g) = \sum_{a\in G} f(a)h(g - a)$, we have $\widehat{f*h} = \hat f\,\hat h$.

**Proof.** Inversion: writing $f = \sum_\chi c_\chi\chi$ (the characters are a basis) and pairing with $\psi$ by orthogonality gives $\hat f(\psi) = c_\psi|G|$. Plancherel: $\sum_g|f|^2 = \sum_g\big|\frac1{|G|}\sum_\chi\hat f(\chi)\chi(g)\big|^2$; expand and apply orthogonality to the cross terms. Convolution: substitute $b = g - a$:
$$\widehat{f*h}(\chi) = \sum_g\sum_a f(a)h(g-a)\overline{\chi(g)} = \sum_a\sum_b f(a)h(b)\overline{\chi(a)}\,\overline{\chi(b)} = \hat f(\chi)\hat h(\chi),$$
using $\chi(a + b) = \chi(a)\chi(b)$. $\blacksquare$

The convolution theorem is *why* the characters are the right basis: convolution commutes with translation, so it is diagonal in the common eigenbasis of the translations.

Notice that each map $f \mapsto \hat f(\chi)$ is a **linear functional** on the space of signals (↩ S2E06): "measure how much of frequency $\chi$ is present." The Fourier transform is a complete set of such measurements, chosen to be compatible with the group.

### 4. The DFT is the character table of $\mathbb{Z}/n$
For $G = \mathbb{Z}/n$, $\hat f(k) = \sum_{j=0}^{n-1} f(j)\omega^{-jk}$. As a matrix,
$$\hat f = F_nf, \qquad (F_n)_{kj} = \omega^{-jk} = \overline{\chi_k(j)}.$$
Row $k$ of $F_n$ is the conjugate of the character $\chi_k$; this is the **discrete Fourier transform**, exactly as computed by `numpy.fft.fft`. Orthogonality says $F_n\overline{F_n}^{\mathsf T} = nI$, so $\frac{1}{\sqrt n}F_n$ is **unitary** (↩ S2E15): the DFT is a rotation of $\mathbb{C}^n$ into the basis of characters. Translation becomes diagonal: if $(\tau f)(j) = f(j-1)$, then $\widehat{\tau f}(k) = \omega^{-k}\hat f(k)$, i.e. $F_n\tau F_n^{-1} = \operatorname{diag}(1, \omega^{-1}, \dots, \omega^{-(n-1)})$.

**The FFT as a clever factorization.** Computing $F_nf$ directly costs about $n^2$ multiplications. If $n = 2m$, split $f$ into even and odd samples. With $E = F_m(f(0), f(2), \dots)$ and $O = F_m(f(1), f(3),\dots)$, and since $\omega_n^2 = \omega_m$,
$$\hat f(k) = E_k + \omega_n^{-k}O_k, \qquad \hat f(k + m) = E_k - \omega_n^{-k}O_k \qquad (0\le k<m).$$
In matrix form, $F_n = B_n\,(F_m\oplus F_m)\,P_n$, where $P_n$ sorts even entries before odd ones and $B_n = \begin{pmatrix} I & D \\ I & -D\end{pmatrix}$ with $D = \operatorname{diag}(1, \omega_n^{-1}, \dots, \omega_n^{-(m-1)})$. Repeating when $n = 2^r$ factors $F_n$ into $r = \log_2 n$ sparse layers with about $n$ operations each: $O(n\log n)$ instead of $O(n^2)$. For $n = 2^{20}$, that is the difference between about $10^{12}$ and $2\times10^{7}$ operations. Group-theoretically, the FFT exploits the subgroup $2\mathbb{Z}/n\mathbb{Z}\cong\mathbb{Z}/m$ and its cosets.

### 5. Duality: a group and its dual
Pairing $G$ with $\widehat G$ looks just like pairing $V$ with $V^*$ (↩ S2E06, S2E08):

| Linear algebra | Abelian groups |
|---|---|
| $V^* = $ linear maps $V \to F$ | $\widehat G = $ homomorphisms $G \to U(1)$ |
| $V \cong V^*$, but only after choosing a basis | $\widehat{\mathbb{Z}/n}\cong\mathbb{Z}/n$, but only after choosing $\omega$ (send $\chi_k \mapsto k$; a different primitive root gives a different isomorphism) |
| $V \to V^{**}$, $v\mapsto(\varphi\mapsto\varphi(v))$, natural | $G\to\widehat{\widehat G}$, $g\mapsto(\chi\mapsto\chi(g))$, natural |
| iso in finite dimensions | iso for finite abelian groups |
| fails for algebraic duals in infinite dimensions; survives for reflexive spaces (↩ S2E24) | survives for locally compact abelian groups (Pontryagin) |

> **Theorem (Pontryagin duality, stated).** For every locally compact abelian group $G$, the dual $\widehat G$ (continuous characters, with the compact-open topology) is again locally compact abelian, and the natural map $G \to \widehat{\widehat G}$ is an isomorphism of topological groups.

The basic examples are the three Fourier theories:

| $G$ | $\widehat G$ | characters | Fourier theory |
|---|---|---|---|
| $\mathbb{Z}/n$ | $\mathbb{Z}/n$ | $j\mapsto e^{2\pi ijk/n}$ | DFT |
| $\mathbb{T} = \mathbb{R}/2\pi\mathbb{Z}$ | $\mathbb{Z}$ | $\theta\mapsto e^{in\theta}$ | Fourier series |
| $\mathbb{Z}$ | $\mathbb{T}$ | $m\mapsto e^{im\theta}$ | discrete-time Fourier transform |
| $\mathbb{R}$ | $\mathbb{R}$ | $x\mapsto e^{2\pi i\xi x}$ | Fourier transform |

**Why the characters of the circle are $e^{in\theta}$ (sketch).** A continuous homomorphism $\chi:\mathbb{R}\to U(1)$ is automatically smooth. Since $\chi(0) = 1$ and $\chi$ is continuous, we can pick a smooth bump $\phi$ supported near $0$ with $c = \int\phi(y)\chi(y)\,dy \ne 0$. Then $c\,\chi(x) = \int\phi(y)\chi(x + y)\,dy = \int\phi(t - x)\chi(t)\,dt$, and the right side is smooth in $x$. Differentiating $\chi(x + y) = \chi(x)\chi(y)$ in $y$ at $0$ gives $\chi' = \chi'(0)\chi$, so $\chi(x) = e^{ax}$, and $|\chi| = 1$ forces $a = i\lambda$ with $\lambda$ real. A character of $\mathbb{T}$ is a character of $\mathbb{R}$ that is $2\pi$-periodic, so $e^{2\pi i\lambda} = 1$ and $\lambda = n\in\mathbb{Z}$. The dual of the circle is the integers: frequencies of a periodic signal are whole numbers. Compact groups have discrete duals, and vice versa.

### 6. Payoff: $\mathbb{R}$, Hilbert space, and Plancherel
For $G = \mathbb{R}$ the characters $e_\xi(x) = e^{2\pi i\xi x}$ are not square integrable, $\int|e_\xi|^2 = \infty$. They are not vectors in $L^2(\mathbb{R})$ at all. This is where Season 2 Part B earns its keep.

The translation operators $\tau_a$ act on the Hilbert space $L^2(\mathbb{R})$ (↩ S2E28) as **unitary** operators: $\|\tau_af\| = \|f\|$. So $a\mapsto\tau_a$ is a unitary representation of $\mathbb{R}$, but it has no eigenvectors in $L^2(\mathbb{R})$: its spectrum is continuous (↩ S2E31), and the characters $e_\xi$ behave like "generalized eigenvectors" that live outside the space, much as $\delta$ lives outside the space of functions (↩ S2E33). The fix is to replace the sum over characters by an integral:
$$\hat f(\xi) = \int_{\mathbb{R}} f(x)e^{-2\pi i\xi x}\,dx, \qquad f(x) = \int_{\mathbb{R}}\hat f(\xi)e^{2\pi i\xi x}\,d\xi.$$
For $f \in L^1(\mathbb{R})$, $\hat f(\xi)$ is the measurement "$\langle f, e_\xi\rangle$," a perfectly good continuous linear functional of $f$ (↩ S2E24); the trouble is only that the $e_\xi$ themselves are not in $L^2$.

> **Theorem (Plancherel, 1910).** The Fourier transform, defined on $L^1(\mathbb{R})\cap L^2(\mathbb{R})$, satisfies $\|\hat f\|_2 = \|f\|_2$ and extends uniquely to a **unitary** operator $\mathcal F: L^2(\mathbb{R})\to L^2(\mathbb{R})$, with inverse given by the conjugate formula.

This is the continuous version of "$\frac1{\sqrt n}F_n$ is unitary," and the analogue of S2E29's statement that the Fourier-series map $L^2(\mathbb{T})\to\ell^2(\mathbb{Z})$ is a unitary isomorphism (↩ S2E29). In every case: **functions on $G$ correspond unitarily to functions on $\widehat G$.**

The thesis of the act lands here. Fields are vector spaces (S3E01); abelian groups and linear operators are modules over a PID (S3E02); groups act by matrices (S3E03); and Fourier analysis is the duality between a group and its characters, the same duality as vectors and covectors (S2E06), the same naturality as $V\cong V^{**}$ (S2E08), and the same Hilbert-space unitarity as Parseval (S2E29). **Build or Describe?** The DFT matrix can be *built* as a grid of roots of unity, or *described* as "the unique change of basis that diagonalizes every shift." The description explains every property the construction has.

## Worked examples

### Example 1: characters of $\mathbb{Z}/4$ and a DFT by hand
Here $\omega = e^{2\pi i/4} = i$. The characters are $\chi_k(j) = i^{jk}$:

| | $j=0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| $\chi_0$ | 1 | 1 | 1 | 1 |
| $\chi_1$ | 1 | $i$ | −1 | $-i$ |
| $\chi_2$ | 1 | −1 | 1 | −1 |
| $\chi_3$ | 1 | $-i$ | −1 | $i$ |

The DFT matrix has the conjugates as rows:
$$F_4 = \begin{pmatrix}1&1&1&1\\1&-i&-1&i\\1&-1&1&-1\\1&i&-1&-i\end{pmatrix}.$$
**Orthogonality check** (rows 1 and 3): $\chi_1\cdot\overline{\chi_3} = 1\cdot1 + i\cdot\overline{(-i)} + (-1)(-1) + (-i)\cdot\overline{i} = 1 + i\cdot i + 1 + (-i)(-i) = 1 - 1 + 1 - 1 = 0$. ✓

**Transform $f = (1, 2, 3, 4)$:**
- $\hat f(0) = 1 + 2 + 3 + 4 = 10$
- $\hat f(1) = 1 + 2(-i) + 3(-1) + 4(i) = (1 - 3) + (-2 + 4)i = -2 + 2i$
- $\hat f(2) = 1 - 2 + 3 - 4 = -2$
- $\hat f(3) = 1 + 2(i) + 3(-1) + 4(-i) = -2 - 2i$

**Plancherel:** $\sum|f|^2 = 1 + 4 + 9 + 16 = 30$, and $\frac14\sum|\hat f|^2 = \frac14(100 + 8 + 4 + 8) = \frac{120}{4} = 30$. ✓

**Inversion at $j = 1$:** $\frac14\sum_k\hat f(k)i^k = \frac14\big(10 + (-2+2i)i + (-2)(-1) + (-2-2i)(-i)\big) = \frac14\big(10 + (-2i - 2) + 2 + (2i - 2)\big) = \frac14(8) = 2 = f(1)$. ✓ (All values agree with `numpy.fft.fft`.)

### Example 2: the convolution theorem on $\mathbb{Z}/4$
Let $f = (1, 2, 3, 4)$ and $h = (1, 1, 0, 0)$, so $(f*h)(j) = \sum_a f(a)h(j - a) = f(j) + f(j-1)$ (indices mod 4): a two-tap moving sum.

**Direct:** $(f*h)(0) = f(0) + f(3) = 5$; $(f*h)(1) = f(1) + f(0) = 3$; $(f*h)(2) = 5$; $(f*h)(3) = 7$. So $f*h = (5, 3, 5, 7)$.

**Via Fourier:** $\hat h(k) = 1 + \omega^{-k} = 1 + (-i)^k$, giving $\hat h = (2,\ 1 - i,\ 0,\ 1 + i)$. Multiply pointwise by $\hat f = (10, -2+2i, -2, -2-2i)$:
- $k=0$: $10\cdot2 = 20$
- $k=1$: $(-2+2i)(1-i) = -2 + 2i + 2i - 2i^2 = -2 + 4i + 2 = 4i$
- $k=2$: $(-2)\cdot 0 = 0$
- $k=3$: $(-2-2i)(1+i) = -2 - 2i - 2i - 2i^2 = -4i$

**Check against the direct DFT of $(5, 3, 5, 7)$:** $\hat{}(0) = 20$; $\hat{}(1) = 5 - 3i - 5 + 7i = 4i$; $\hat{}(2) = 5 - 3 + 5 - 7 = 0$; $\hat{}(3) = 5 + 3i - 5 - 7i = -4i$. ✓

Note $\hat h(2) = 0$: the moving sum completely kills the alternating frequency $(1,-1,1,-1)$, which is the whole idea of a filter.

### Example 3: the FFT for $n = 4$
Split $f = (1, 2, 3, 4)$ into even samples $(1, 3)$ and odd samples $(2, 4)$. With $F_2 = \begin{pmatrix}1&1\\1&-1\end{pmatrix}$:
- $E = F_2(1, 3) = (4, -2)$
- $O = F_2(2, 4) = (6, -2)$

Twiddle factors $\omega_4^{-k} = (-i)^k$ for $k = 0, 1$: $1$ and $-i$. Then
- $\hat f(0) = E_0 + O_0 = 4 + 6 = 10$
- $\hat f(1) = E_1 + (-i)O_1 = -2 + 2i$
- $\hat f(2) = E_0 - O_0 = -2$
- $\hat f(3) = E_1 - (-i)O_1 = -2 - 2i$

matching Example 1. The matrix identity
$$F_4 = \begin{pmatrix}1&0&1&0\\0&1&0&-i\\1&0&-1&0\\0&1&0&i\end{pmatrix}\begin{pmatrix}1&1&0&0\\1&-1&0&0\\0&0&1&1\\0&0&1&-1\end{pmatrix}\begin{pmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{pmatrix}$$
was verified numerically. The two right-hand factors cost 4 additions; the left factor costs 4 additions and one multiplication by $-i$ (a swap and sign change). Compare 16 complex multiplications for the dense matrix.

### Example 4: a character of $\mathbb{R}$ that is its own transform
Let $f(x) = e^{-\pi x^2}$. Then $\hat f(\xi) = e^{-\pi\xi^2}$.

**Step 1 (an ODE for $f$).** $f'(x) = -2\pi x f(x)$.

**Step 2 (differentiate $\hat f$).** Differentiating under the integral (justified by the rapid decay of $f$),
$$\hat f'(\xi) = \int(-2\pi ix)f(x)e^{-2\pi i\xi x}\,dx = i\int f'(x)e^{-2\pi i\xi x}\,dx.$$
**Step 3 (integrate by parts).** Boundary terms vanish, so $\int f'(x)e^{-2\pi i\xi x}dx = -\int f(x)\cdot(-2\pi i\xi)e^{-2\pi i\xi x}dx = 2\pi i\xi\hat f(\xi)$. Hence
$$\hat f'(\xi) = i\cdot 2\pi i\xi\,\hat f(\xi) = -2\pi\xi\,\hat f(\xi).$$
**Step 4 (solve).** $\hat f$ satisfies the same ODE as $f$, so $\hat f(\xi) = Ce^{-\pi\xi^2}$ with $C = \hat f(0) = \int e^{-\pi x^2}dx = 1$.

**Step 5 (Plancherel check).** $\|f\|_2^2 = \int e^{-2\pi x^2}dx = \frac{1}{\sqrt2}$, and $\|\hat f\|_2^2$ is the same integral. ✓ Translation by $a$ multiplies $\hat f$ by the character value $e^{-2\pi ia\xi}$, so $|\widehat{\tau_af}| = |\hat f|$: shifting a signal never changes its power spectrum. That is the cold open's "don't care where you start," seen from the dual side.

## Visual and animation notes
1. **Cold open:** a bump, a parabola and a complex exponential (a helix around the time axis) each slide right; only the helix lands on itself, rotated by a constant phase. Caption: "eigenvector of every shift."
2. **Characters of $\mathbb{Z}/n$:** $n$ points on a circle (a clock, ↩ S1E16); each character is a pointer that walks around the unit circle $k$ steps at a time (multiplication = rotation, ↩ S1E10).
3. **The DFT matrix:** a grid of tiny clock hands (the $\omega^{-jk}$); rows light up one at a time as the characters; "rotation" of $\mathbb{C}^n$ into the character basis shown as the basis "camera" motif.
4. **Convolution theorem:** a signal smeared by a moving sum on the left; on the right, the same operation as pointwise multiplication of bar charts. A "diagonal matrix" icon glows.
5. **FFT butterfly:** the classic butterfly diagram assembling itself from the matrix factorization; a counter compares $n^2$ with $n\log_2 n$ as $n$ grows.
6. **Duality table:** $\mathbb{Z}/n\leftrightarrow\mathbb{Z}/n$, $\mathbb{T}\leftrightarrow\mathbb{Z}$, $\mathbb{R}\leftrightarrow\mathbb{R}$ as pairs of shapes (a dotted circle, a solid circle and a dotted line, a solid line) connected by isomorphism "threads." Next to it, the S2 picture of $V$ and $V^*$ with arrows (blue) and covector stacks (orange). A second set of threads shows $G\to\widehat{\widehat G}$ snapping back onto $G$, labeled "natural."
7. **$\mathbb{R}$ and Hilbert space:** a character $e^{2\pi i\xi x}$ stretching forever, refusing to fit inside the finite-energy "ball" of $L^2$; a Gaussian fits and maps to itself.
8. **Act finale montage:** fields, modules, representations, Fourier, each stamped with its Season 2 ancestor (dimension, Jordan form, trace, dual space).

## Common misconceptions
- **Misconception:** "The dual group $\widehat G$ is the dual vector space." **Reality:** $\widehat G$ is a group of homomorphisms into $U(1)$, not a space of linear functionals. The analogy is structural: both are "measurements compatible with the structure," and both have a natural map into their double dual.
- **Misconception:** "$\widehat{\mathbb{Z}/n} = \mathbb{Z}/n$, so the dual is the same as the original." **Reality:** they are isomorphic, but the isomorphism requires choosing a primitive root of unity, just as $V\cong V^*$ requires a basis. Only $G\cong\widehat{\widehat G}$ is natural.
- **Misconception:** "$e^{2\pi i\xi x}$ is an orthonormal basis of $L^2(\mathbb{R})$." **Reality:** these functions are not in $L^2(\mathbb{R})$ at all. The continuous Fourier transform is a unitary map onto $L^2$ of the dual, not an expansion in a countable basis.
- **Misconception:** "The FFT is an approximation to the DFT." **Reality:** it computes the DFT exactly (up to floating-point rounding); it is a factorization of the same matrix.
- **Misconception:** "Fourier analysis needs sines and cosines." **Reality:** it needs characters. On $\mathbb{F}_2^n$ the characters are $x\mapsto(-1)^{a\cdot x}$, giving the Walsh–Hadamard transform with no trigonometry at all.

## Exercises
- **Warm-up (computational):** Compute the DFT of $f = (1, 0, -1, 0)$ on $\mathbb{Z}/4$ and verify Plancherel. Which characters does $f$ contain?
- **Core (conceptual):** Show that the characters of $\mathbb{F}_2^n$ (as an additive group) are $\chi_a(x) = (-1)^{a\cdot x}$ for $a\in\mathbb{F}_2^n$. Write down the $4\times4$ transform matrix for $n = 2$ and show that it is $\begin{pmatrix}1&1\\1&-1\end{pmatrix}\otimes\begin{pmatrix}1&1\\1&-1\end{pmatrix}$.
- **Stretch (proof or exploration):** Prove that $F_n^2 = nR$, where $R$ is the reversal $f(j)\mapsto f(-j)$, and deduce $F_n^4 = n^2I$. Conclude that the eigenvalues of the unitary DFT $\frac1{\sqrt n}F_n$ lie in $\{1, -1, i, -i\}$. (Compare: the Gaussian of Example 4 is an eigenvector of $\mathcal F$ with eigenvalue 1.)

<details><summary>Hints and answers</summary>

- **Warm-up:** $\hat f(k) = 1\cdot\omega^{0} + (-1)\cdot\omega^{-2k} = 1 - (-1)^k$ (since $\omega^{-2} = i^{-2} = -1$), so $\hat f = (0, 2, 0, 2)$. Plancherel: $\sum|f|^2 = 2$ and $\frac14(4 + 4) = 2$. ✓ It contains only $\chi_1$ and $\chi_3$: indeed $f(j) = \cos(\pi j/2) = \frac12(\chi_1(j) + \chi_3(j))$.
- **Core:** A homomorphism $\chi:\mathbb{F}_2^n\to U(1)$ has $\chi(x)^2 = \chi(2x) = 1$, so $\chi(e_i) = \pm1 = (-1)^{a_i}$, and $\chi(x) = \prod\chi(e_i)^{x_i} = (-1)^{a\cdot x}$. The matrix for $n=2$ (order $00, 01, 10, 11$) has rows $(1,1,1,1), (1,-1,1,-1), (1,1,-1,-1), (1,-1,-1,1)$, which is the Kronecker product shown; this reflects $\widehat{G\times H}=\widehat G\times\widehat H$.
- **Stretch:** $(F_n^2)_{kl} = \sum_j\omega^{-j(k+l)}$, which is $n$ if $k + l\equiv0$ and $0$ otherwise (orthogonality). So $F_n^2 = nR$, and $R^2 = I$ gives $F_n^4 = n^2I$. Then $U = F_n/\sqrt n$ satisfies $U^4 = I$, so its eigenvalues are fourth roots of unity. (Checked numerically for $n = 4$: eigenvalues $1, 1, -1, -i$.)

</details>

## Historical note
Joseph Fourier presented his theory of heat to the Paris Academy in 1807 and published *Théorie analytique de la chaleur* in 1822, claiming, to the skepticism of Lagrange, that arbitrary functions could be expanded in trigonometric series. The fast algorithm is older than electronic computers: Gauss used an equivalent divide-and-conquer scheme around 1805 to interpolate the orbits of the asteroids Pallas and Juno, but it appeared only in his posthumously published works. James Cooley and John Tukey rediscovered it in 1965, and the FFT became one of the most important algorithms of the century. Michel Plancherel proved his $L^2$ theorem in 1910. The group-theoretic picture came in the 1930s: Lev Pontryagin proved the duality theorem for locally compact abelian groups (under countability assumptions) in 1934, Egbert van Kampen extended it in 1935, and André Weil's *L'intégration dans les groupes topologiques et ses applications* (1940) set Fourier analysis on general locally compact groups. Pontryagin, blind from an accident at age 14, did all of this work without sight.

## Connections
- **Callbacks:** ↩ S1E10 (multiplying by a unit complex number is a rotation), ↩ S1E16 ($\mathbb{Z}/n$, $\mathbb{Z}$, the circle as groups), ↩ S2E06 (Fourier coefficients as covectors), ↩ S2E08 (natural double dual vs. non-natural $V\cong V^*$), ↩ S2E12 (simultaneous eigenvectors), ↩ S2E15 (unitary matrices), ↩ S2E24 (continuous duals, reflexivity), ↩ S2E28 (Hilbert spaces), ↩ S2E29 (Fourier series as a unitary map $L^2\to\ell^2$), ↩ S2E31 (continuous spectrum), ↩ S2E33 (generalized functions), ↩ S3E02 (finite abelian groups are products of cyclic groups), ↩ S3E03 (characters, orthogonality, averaging over the group).
- **Sets up:** ↪ S3E11 (compact Lie groups: Fourier analysis on $SU(2)$ and spherical harmonics on $SO(3)$; the Peter–Weyl theorem as the non-abelian Fourier series), ↪ S3E12 (Pontryagin duality as a contravariant functor whose square is naturally isomorphic to the identity).
- **Side quests:** "Wavelets" (bases localized in time and frequency, which are *not* characters); "Quantum computing" (the quantum Fourier transform is $\frac{1}{\sqrt n}F_n$ as a unitary gate); "Linear algebra over $\mathbb{F}_2$" (the Walsh–Hadamard transform).

## References
- **Primary / historical:** J. Fourier, *Théorie analytique de la chaleur* (Paris, 1822). J. W. Cooley and J. W. Tukey, "An Algorithm for the Machine Calculation of Complex Fourier Series," *Mathematics of Computation* 19 (1965). L. Pontryagin, "The Theory of Topological Commutative Groups," *Annals of Mathematics* 35 (1934). M. T. Heideman, D. H. Johnson and C. S. Burrus, "Gauss and the History of the Fast Fourier Transform," *IEEE ASSP Magazine* 1 (1984).
- **Textbooks:** E. M. Stein and R. Shakarchi, *Fourier Analysis: An Introduction*, Princeton Lectures in Analysis I (Princeton University Press, 2003), Ch. 7 "Finite Fourier Analysis" (characters of $\mathbb{Z}/N$ and finite abelian groups, the FFT) and Ch. 5 (the Fourier transform on $\mathbb{R}$, the Gaussian, Plancherel). A. Terras, *Fourier Analysis on Finite Groups and Applications*, London Mathematical Society Student Texts 43 (Cambridge University Press, 1999), Part I (finite abelian groups). W. Rudin, *Fourier Analysis on Groups* (Interscience, 1962), Ch. 1 (locally compact abelian groups, Pontryagin duality). G. B. Folland, *A Course in Abstract Harmonic Analysis* (CRC Press, 1995), Ch. 4 (Pontryagin duality and the Plancherel theorem).
- **Accessible:** 3Blue1Brown (Grant Sanderson), "But what is the Fourier Transform? A visual introduction" (YouTube, 2018). T. W. Körner, *Fourier Analysis* (Cambridge University Press, 1988), a leisurely, story-rich tour of Fourier series, the Fourier transform, and their history.
