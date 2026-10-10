# S2E15: Unitary Spaces: Geometry over ℂ

> **Season / Act:** Season 2, Part A, Act V (Geometry: Inner Products) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E10 (ℂ as rotations), S2E09 (bilinear forms), S2E12 (eigenvectors), S2E14 (real inner products); outside knowledge: complex numbers, $\lvert z\rvert^2 = z\bar z$, $e^{i\theta} = \cos\theta + i\sin\theta$ ·
> **Builds toward:** S2E16 (adjoints), S2E18 (spectral theorem), S2E19 (SVD), S2E28 (Hilbert spaces), S2E29 (Fourier), S2E31 (quantum mechanics), S2E32 (Koopman operators)

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why a positive definite inner product on a complex vector space *cannot* be bilinear, and why the complex conjugate in $\langle u, v\rangle = \sum_k u_k\overline{v_k}$ is forced rather than chosen.
2. State the axioms of a unitary (complex inner product) space and compute lengths, angles, and orthogonality in $\mathbb{C}^n$ and in function spaces.
3. Recognize unitary matrices ($U^*U = I$), prove that their eigenvalues lie on the unit circle, and verify that the scaled DFT matrix is unitary.
4. State and prove Schur's theorem (every complex matrix is upper triangular in some orthonormal basis) and use it to show that normal matrices are exactly the unitarily diagonalizable ones.
5. Use the "matrix land" dictionary: Hermitian ↔ real numbers, unitary ↔ unit circle, positive ↔ positive reals.

## Cold open
Last episode we learned to measure length: take the dot product of a vector with itself and take a square root. It worked beautifully in the plane, in space, even for functions. So let's do the obvious thing and try it on a complex vector.

Here's the vector $(1, i)$ in $\mathbb{C}^2$. Dot it with itself: $1\cdot 1 + i\cdot i = 1 + (-1) = 0$.

Zero.

A vector that is clearly not the zero vector, with one coordinate equal to 1, has length zero. Not "small." Zero. And it gets worse: try $(1, 2i)$ and you get $1 - 4 = -3$. A negative squared length. The square root of the length of this arrow is imaginary.

Something has gone badly wrong, and it isn't a typo. Remember that in Season 1 we learned what complex numbers really are: a 1 in the first slot is a point on the real axis, and an $i$ is that same point *rotated a quarter turn*. Rotating a point doesn't move it closer to the origin. So the second coordinate of $(1, i)$ is a perfectly honest unit of length, just pointing sideways. The dot product somehow let it cancel the first coordinate.

Today we repair the dot product for complex numbers. The fix is one bar over one letter. But that bar turns out to be the doorway to Fourier analysis, quantum computing, and every Hilbert space in the rest of this season.

## The story

### 1. The naive attempt, and why it cannot be rescued

Over $\mathbb{R}$ (↩ S2E14) an inner product is a symmetric, positive definite bilinear form (↩ S2E09). The obvious move over $\mathbb{C}$ is to keep the same formula, $u\cdot v = \sum_k u_k v_k$. The cold open showed it fails: $(1,i)\cdot(1,i) = 0$.

Could some *other* bilinear form do the job? No, and the reason takes one line.

> **Proposition.** On a complex vector space $V \neq 0$, no bilinear form $B$ satisfies $B(v,v) > 0$ for all $v \neq 0$.
>
> *Proof.* Take $v \neq 0$ with $B(v,v) > 0$. Bilinearity gives $B(iv, iv) = i\cdot i\cdot B(v,v) = -B(v,v) < 0$, yet $iv \neq 0$. ∎

So if we want lengths (real, positive numbers) on a complex space, we must give up bilinearity in one slot. The fix comes straight from Season 1 (↩ S1E10): for a single complex number, the squared length is not $z^2$ but
$$\lvert z\rvert^2 = z\,\overline{z} = a^2 + b^2 \qquad (z = a + bi).$$
Multiplication by $\overline{z}$ "undoes the rotation" of $z$ and leaves only the stretch. The complex conjugate is not a convention we adopt to make formulas pretty; it is the only way to turn a complex number into its (squared) size.

### 2. Unitary spaces

> **Definition (complex inner product).** Let $V$ be a vector space over $\mathbb{C}$. A *complex inner product* is a function $\langle\cdot,\cdot\rangle : V \times V \to \mathbb{C}$ such that for all $u, v, w \in V$ and $\lambda \in \mathbb{C}$:
> 1. **Linear in the first slot:** $\langle u + w, v\rangle = \langle u, v\rangle + \langle w, v\rangle$ and $\langle \lambda u, v\rangle = \lambda\langle u, v\rangle$.
> 2. **Hermitian symmetry:** $\langle v, u\rangle = \overline{\langle u, v\rangle}$.
> 3. **Positive definite:** $\langle v, v\rangle > 0$ for every $v \neq 0$.
>
> A complex vector space with a complex inner product is a **unitary space** (also: complex inner product space, or pre-Hilbert space).

Axioms 1 and 2 together force the second slot to be **conjugate-linear**: $\langle u, \lambda v\rangle = \overline{\langle \lambda v, u\rangle} = \overline{\lambda}\,\langle u, v\rangle$. A form that is linear in one slot and conjugate-linear in the other is called **sesquilinear** ("one and a half linear"). Axiom 2 also makes $\langle v,v\rangle = \overline{\langle v,v\rangle}$, so $\langle v, v\rangle$ is automatically real, and axiom 3 says it is positive.

**Convention warning.** Mathematicians usually make the first slot linear, as above. Physicists (and Nielsen & Chuang) make the *second* slot linear and write $\langle u \vert v\rangle$. Both conventions describe the same geometry; just check which one a book uses before conjugating.

**The standard examples.**
- On $\mathbb{C}^n$: $\displaystyle \langle u, v\rangle = \sum_{k=1}^n u_k\,\overline{v_k}$, so $\langle v, v\rangle = \sum_k \lvert v_k\rvert^2$.
- On continuous complex-valued functions on $[a,b]$: $\displaystyle \langle f, g\rangle = \int_a^b f(x)\,\overline{g(x)}\,dx$.

Everything from S2E14 carries over with small edits. The norm is $\lVert v\rVert = \sqrt{\langle v,v\rangle}$. The **Cauchy–Schwarz inequality** $\lvert\langle u,v\rangle\rvert \le \lVert u\rVert\,\lVert v\rVert$ still holds, so the triangle inequality holds and $\lVert\cdot\rVert$ is a genuine norm. Orthogonality means $\langle u, v\rangle = 0$, and orthonormal bases still exist (Gram–Schmidt works verbatim, ↪ S2E17). The **complex polarization identity** recovers the inner product from the norm:
$$\langle u, v\rangle = \frac14\sum_{k=0}^{3} i^k\,\lVert u + i^k v\rVert^2 .$$
One genuine change: the "angle" between two complex vectors is less useful, because $\langle u,v\rangle$ is a complex number with its own phase. What survives cleanly is orthogonality and the size $\lvert\langle u, v\rangle\rvert$.

**Inside every unitary space hides a real one.** If $V = \mathbb{C}^n$ and we view it as $\mathbb{R}^{2n}$ (each $z_k = a_k + i b_k$ gives two real coordinates), then $\operatorname{Re}\langle u, v\rangle$ is exactly the ordinary real dot product on $\mathbb{R}^{2n}$. So $\lVert (1, i)\rVert^2 = 1^2 + 0^2 + 0^2 + 1^2 = 2$: the length a real-geometry viewer would have expected all along. The imaginary part $\operatorname{Im}\langle u, v\rangle$ is new information: an alternating form (↩ S2E09), the symplectic form of Hamiltonian mechanics in disguise.

### 3. Unitary maps: rotations that respect phases

> **Definition.** For a complex matrix $A$, the **conjugate transpose** is $A^* = \overline{A}^{\,\mathsf T}$, i.e. $(A^*)_{jk} = \overline{A_{kj}}$. It satisfies $\langle Au, v\rangle = \langle u, A^*v\rangle$ for the standard inner product. (S2E16 explains this as the *adjoint* and makes it coordinate-free.)

> **Definition.** A linear map $U : V \to V$ on a finite-dimensional unitary space is **unitary** if $\langle Uu, Uv\rangle = \langle u, v\rangle$ for all $u, v$. A square matrix $U$ is unitary if $U^*U = I$.

**Theorem (equivalent descriptions).** For a square complex matrix $U$, the following are equivalent:
1. $U^*U = I$ (so $U^{-1} = U^*$, and also $UU^* = I$);
2. $\langle Uu, Uv\rangle = \langle u, v\rangle$ for all $u, v$;
3. $\lVert Uv\rVert = \lVert v\rVert$ for all $v$;
4. the columns of $U$ form an orthonormal basis of $\mathbb{C}^n$.

*Proof sketch.* (1 ⇒ 2): $\langle Uu, Uv\rangle = \langle u, U^*Uv\rangle = \langle u, v\rangle$. (2 ⇒ 3): set $u = v$. (3 ⇒ 2): polarization expresses $\langle\cdot,\cdot\rangle$ through norms. (1 ⇔ 4): the $(j,k)$ entry of $U^*U$ is $\langle u_k, u_j\rangle$ where $u_j$ is the $j$-th column, so $U^*U = I$ says exactly that the columns are orthonormal. Finally, a one-sided inverse of a square matrix is two-sided, so $UU^* = I$ too. ∎

> **Theorem (eigenvalues of a unitary map lie on the unit circle).** If $U$ is unitary and $Uv = \lambda v$ with $v \neq 0$, then $\lvert\lambda\rvert = 1$. Moreover, eigenvectors for distinct eigenvalues are orthogonal, and $\lvert\det U\rvert = 1$.
>
> *Proof.* Using that $U$ preserves inner products, then sesquilinearity,
> $$\langle v, v\rangle = \langle Uv, Uv\rangle = \langle \lambda v, \lambda v\rangle = \lambda\overline{\lambda}\,\langle v, v\rangle = \lvert\lambda\rvert^2\langle v, v\rangle.$$
> Since $v \neq 0$, $\langle v, v\rangle > 0$, and we can divide: $\lvert\lambda\rvert^2 = 1$.
>
> For orthogonality, let $Uv = \lambda v$, $Uw = \mu w$ with $\lambda \neq \mu$. Then $\langle v, w\rangle = \langle Uv, Uw\rangle = \lambda\overline{\mu}\langle v, w\rangle$. Since $\lvert\mu\rvert = 1$ we have $\overline{\mu} = 1/\mu$, so $\lambda\overline{\mu} = \lambda/\mu \neq 1$, which forces $\langle v, w\rangle = 0$.
>
> Finally, $1 = \det(U^*U) = \overline{\det U}\,\det U = \lvert\det U\rvert^2$. ∎

Note the bar in the proof. With the naive bilinear "dot product" the middle step would read $\lambda^2\langle v,v\rangle$, which proves nothing. The conjugate is doing real work.

**The unitary group.** The unitary $n \times n$ matrices form a group $U(n)$ under multiplication (↩ S1E16): products and inverses of isometries are isometries. Some landmarks:
- $U(1) = \{e^{i\theta}\}$ is the circle of phases. Multiplying a complex number by $e^{i\theta}$ is a rotation by $\theta$ (↩ S1E10), and it preserves $\lvert z\rvert$. A $1\times 1$ unitary matrix is *exactly* a rotation of the complex line.
- The real unitary matrices are the orthogonal matrices: $U(n) \cap M_n(\mathbb{R}) = O(n)$. So $O(n) \subset U(n)$.
- $SU(n) = \{U \in U(n) : \det U = 1\}$. The group $SU(2)$ will double-cover the 3D rotations in S3E11.
- Diagonal unitary matrices $\operatorname{diag}(e^{i\theta_1}, \dots, e^{i\theta_n})$ rotate the phase of each complex axis independently: the picture to keep in mind for *every* unitary map, once we have the right basis (Section 5).

### 4. Schur's theorem: what ℂ always gives you

In S2E12 we saw that a rotation of $\mathbb{R}^2$ has no real eigenvectors, and in S2E13 that some maps (like the shear) cannot be diagonalized even over $\mathbb{C}$. Jordan form handles every map, but its change of basis can be badly skewed. With an inner product we can ask for something more geometric: *how simple can a map look if we only allow orthonormal bases?*

> **Theorem (Schur, 1909).** Let $T$ be a linear map on a finite-dimensional unitary space $V$. Then there is an orthonormal basis of $V$ in which the matrix of $T$ is upper triangular. In matrix form: for every $A \in M_n(\mathbb{C})$ there is a unitary $Q$ with
> $$Q^*AQ = R \quad\text{upper triangular},$$
> and the diagonal entries of $R$ are the eigenvalues of $A$ (with algebraic multiplicity).
>
> *Proof (induction on $n = \dim V$).* For $n = 1$ every matrix is upper triangular. Suppose $n > 1$. By the Fundamental Theorem of Algebra (↩ S1E10) the characteristic polynomial of $A$ has a root $\lambda_1$, so there is an eigenvector, which we normalize: $Aq_1 = \lambda_1 q_1$, $\lVert q_1\rVert = 1$. Extend $q_1$ to an orthonormal basis $q_1, \dots, q_n$ (Gram–Schmidt) and let $Q_1$ be the unitary matrix with these columns. The first column of $Q_1^*AQ_1$ is $Q_1^*(\lambda_1 q_1) = \lambda_1 e_1$, so
> $$Q_1^*AQ_1 = \begin{pmatrix}\lambda_1 & * \\ 0 & A_2\end{pmatrix}, \qquad A_2 \in M_{n-1}(\mathbb{C}).$$
> By induction there is a unitary $Q_2'$ with $Q_2'^*A_2Q_2'$ upper triangular. Put $Q_2 = \begin{pmatrix}1 & 0\\ 0 & Q_2'\end{pmatrix}$ and $Q = Q_1Q_2$; a product of unitaries is unitary, and $Q^*AQ$ is upper triangular. Similar matrices have the same characteristic polynomial, and a triangular matrix's eigenvalues are its diagonal entries. ∎

**Why this needs ℂ.** The only nontrivial input was "every polynomial has a root." Over $\mathbb{R}$ the rotation $R_\theta$ ($0 < \theta < \pi$) has no eigenvector, and an upper triangular real matrix in an orthonormal basis $(q_1, q_2)$ would make $q_1$ an eigenvector. So real Schur form fails; the best one can do over $\mathbb{R}$ is block upper triangular with $2\times 2$ blocks (the "real Schur form" used by numerical software). This is thread 1 again: extend the field to repair a defect.

**Why numerical analysts love it.** Unitary changes of basis never amplify rounding errors (they preserve lengths), whereas the change of basis to Jordan form can be arbitrarily ill-conditioned. The QR algorithm that every eigenvalue routine uses (Golub & Van Loan, Ch. 7) computes a Schur form, not a Jordan form.

### 5. Normal operators: exactly the ones with perpendicular eigen-axes

> **Definition.** A matrix (or operator) $N$ is **normal** if $N^*N = NN^*$.

Unitary matrices ($U^*U = I = UU^*$), Hermitian matrices ($H^* = H$), and skew-Hermitian matrices ($K^* = -K$) are all normal. The shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ is not.

> **Theorem (complex spectral theorem).** A matrix $N \in M_n(\mathbb{C})$ is normal if and only if $N = QDQ^*$ for some unitary $Q$ and diagonal $D$, i.e. iff $\mathbb{C}^n$ has an orthonormal basis of eigenvectors of $N$.
>
> *Proof.* (⇐) If $N = QDQ^*$ then $N^*N = Q\overline{D}DQ^* = QD\overline{D}Q^* = NN^*$, since diagonal matrices commute.
>
> (⇒) By Schur, $N = QRQ^*$ with $R$ upper triangular, and $R$ is normal because $R^*R = Q^*N^*NQ = Q^*NN^*Q = RR^*$. Compare the $(1,1)$ entries: $(R^*R)_{11} = \lvert r_{11}\rvert^2$, while $(RR^*)_{11} = \sum_{j=1}^n \lvert r_{1j}\rvert^2$. Equality forces $r_{12} = \dots = r_{1n} = 0$. Now compare the $(2,2)$ entries: $(R^*R)_{22} = \lvert r_{12}\rvert^2 + \lvert r_{22}\rvert^2 = \lvert r_{22}\rvert^2$ and $(RR^*)_{22} = \sum_{j\ge 2}\lvert r_{2j}\rvert^2$, so $r_{23} = \dots = r_{2n} = 0$. Continuing row by row, $R$ is diagonal. ∎

S2E18 returns to this theorem from the self-adjoint side and proves the *real* version, where the existence of eigenvalues is less obvious.

**The rotation, finally diagonal.** The rotation $R_\theta$ of S2E12 has no real eigenvectors, but it is a real orthogonal matrix, hence unitary, hence normal. Over $\mathbb{C}$ it must be unitarily diagonalizable, with eigenvalues on the unit circle. Indeed (Example 4 below) its eigenvalues are $e^{\pm i\theta}$ with orthogonal eigenvectors $(1, \mp i)/\sqrt2$. The vector $(1,i)$ from the cold open, the one the dot product said had length zero, is one of the two "eigen-axes" of every rotation of the plane.

### 6. Matrix land: real numbers, the unit circle, and positive numbers

Complex numbers have three famous subsets: the real line, the unit circle, and the positive reals. Each has a matrix analogue, and the analogy is precise because of the spectral theorem:

| Numbers | Defining property | Matrices | Defining property | Spectrum lies in |
|---|---|---|---|---|
| real $x$ | $\bar x = x$ | Hermitian $H$ | $H^* = H$ | $\mathbb{R}$ |
| unit $e^{i\theta}$ | $\bar z z = 1$ | unitary $U$ | $U^*U = I$ | unit circle |
| positive $r > 0$ | $r = \bar s s$, $s \neq 0$ | positive definite $P$ | $P = S^*S$, $S$ invertible | $(0,\infty)$ |

All three classes are normal, so each is $Q\,\operatorname{diag}(\lambda_1,\dots,\lambda_n)\,Q^*$ with the $\lambda_k$ in the stated set. (That Hermitian eigenvalues are real is a two-line computation like the unitary one: $\lambda\langle v,v\rangle = \langle Hv, v\rangle = \langle v, Hv\rangle = \overline{\lambda}\langle v,v\rangle$.)

The analogy goes further. Just as $e^{i\theta}$ turns a real number into a unit complex number, **$U = e^{iH}$ turns a Hermitian matrix into a unitary one**, and every unitary arises this way: if $U = Q\operatorname{diag}(e^{i\theta_k})Q^*$, take $H = Q\operatorname{diag}(\theta_k)Q^*$. In quantum mechanics this is the statement that time evolution $e^{-iHt/\hbar}$ generated by a Hermitian Hamiltonian $H$ is unitary, so total probability is conserved (↪ S2E31). And just as $z = e^{i\theta}r$, every square matrix factors as (unitary) × (positive semidefinite): the **polar decomposition**, which falls out of the SVD in S2E19.

**Payoff.** From here on, every space in Part B that carries an inner product is a unitary space: $L^2$ of complex functions, $\ell^2$ of complex sequences, the state spaces of quantum mechanics. A **Hilbert space** will be defined in S2E28 as a unitary (or real inner product) space that is *complete*, the same repair as $\mathbb{Q} \to \mathbb{R}$ (↩ S1E08).

## Worked examples

### Example 1: Lengths and orthogonality in $\mathbb{C}^2$
Let $u = (1, i)$ and $w = (1, -i)$.

- Naive dot product: $u\cdot u = 1\cdot 1 + i\cdot i = 1 - 1 = 0$.
- Hermitian inner product: $\langle u, u\rangle = 1\cdot\overline{1} + i\cdot\overline{i} = 1 + i(-i) = 1 + 1 = 2$, so $\lVert u\rVert = \sqrt2$.
- $\langle u, w\rangle = 1\cdot\overline{1} + i\cdot\overline{(-i)} = 1 + i\cdot i = 1 - 1 = 0$. So $u \perp w$.
- Hermitian symmetry check with $v = (2, 1+i)$: $\langle u, v\rangle = 1\cdot 2 + i\cdot\overline{(1+i)} = 2 + i(1-i) = 2 + i + 1 = 3 + i$, and $\langle v, u\rangle = 2\cdot 1 + (1+i)\cdot\overline{i} = 2 + (1+i)(-i) = 2 - i + 1 = 3 - i = \overline{3+i}$. ✓
- Conjugate-linearity in slot 2: $\langle u, iv\rangle = \overline{i}\,\langle u, v\rangle = -i(3+i) = 1 - 3i$. Directly: $iv = (2i, -1 + i)$, so $\langle u, iv\rangle = 1\cdot\overline{2i} + i\cdot\overline{(-1+i)} = -2i + i(-1-i) = -2i - i + 1 = 1 - 3i$. ✓

So $\{u/\sqrt2,\ w/\sqrt2\}$ is an orthonormal basis of $\mathbb{C}^2$, built from the very vector that "had length zero."

### Example 2: The DFT matrix is unitary (and energy is preserved)
For $n = 4$ let $\omega = e^{-2\pi i/4} = -i$ and $F_{jk} = \tfrac{1}{\sqrt4}\,\omega^{jk} = \tfrac12(-i)^{jk}$ for $j,k = 0,1,2,3$:
$$F = \frac12\begin{pmatrix} 1 & 1 & 1 & 1\\ 1 & -i & -1 & i\\ 1 & -1 & 1 & -1\\ 1 & i & -1 & -i\end{pmatrix}.$$
**Unitarity.** The $(j,k)$ entry of $F^*F$ is $\langle f_k, f_j\rangle$ where $f_k$ is column $k$. Each column has four entries of modulus $\tfrac12$, so $\lVert f_k\rVert^2 = 4\cdot\tfrac14 = 1$. For $j \neq k$,
$$\langle f_k, f_j\rangle = \frac14\sum_{m=0}^{3}\omega^{mk}\,\overline{\omega^{mj}} = \frac14\sum_{m=0}^{3}\omega^{m(k-j)} = \frac14\cdot\frac{1 - \omega^{4(k-j)}}{1 - \omega^{k-j}} = 0,$$
because $\omega^4 = 1$ while $\omega^{k-j} \neq 1$ for $0 < \lvert k - j\rvert < 4$. (Here we used $\overline{\omega} = \omega^{-1}$, true because $\lvert\omega\rvert = 1$.) The same computation works for every $n$, so the scaled DFT matrix $F_n = \frac{1}{\sqrt n}(\omega^{jk})$ is unitary.

For instance, columns 1 and 3: $\langle f_1, f_3\rangle = \tfrac14\big(1\cdot 1 + (-i)\overline{(i)} + (-1)\overline{(-1)} + (i)\overline{(-i)}\big) = \tfrac14(1 + (-i)(-i) + 1 + i\cdot i) = \tfrac14(1 - 1 + 1 - 1) = 0$. ✓

**Energy preservation.** Take $x = (1, 2, 0, -1)$. Then
- $X_0 = \tfrac12(1 + 2 + 0 - 1) = 1$,
- $X_1 = \tfrac12(1 + 2(-i) + 0\cdot(-1) + (-1)(i)) = \tfrac12(1 - 3i)$,
- $X_2 = \tfrac12(1 - 2 + 0 + 1) = 0$,
- $X_3 = \tfrac12(1 + 2i + 0 + (-1)(-i)) = \tfrac12(1 + 3i)$.

Energies: $\lVert x\rVert^2 = 1 + 4 + 0 + 1 = 6$ and $\lVert Fx\rVert^2 = 1 + \tfrac{10}{4} + 0 + \tfrac{10}{4} = 6$. ✓ This is the finite version of Parseval's theorem (↪ S2E29). Since $F$ is unitary its eigenvalues are on the unit circle; in fact $F^4 = I$, so they lie in $\{1, -1, i, -i\}$ (for this $F$: $1, 1, -1, -i$).

### Example 3: A quantum gate, its eigenvalues, and its Hermitian logarithm
Let $U = \frac{1}{\sqrt2}\begin{pmatrix}1 & i\\ i & 1\end{pmatrix}$.

**Unitary?** $U^* = \frac{1}{\sqrt2}\begin{pmatrix}1 & -i\\ -i & 1\end{pmatrix}$, and
$$U^*U = \frac12\begin{pmatrix}1\cdot 1 + (-i)(i) & 1\cdot i + (-i)\cdot 1\\ (-i)\cdot 1 + 1\cdot i & (-i)(i) + 1\cdot 1\end{pmatrix} = \frac12\begin{pmatrix}2 & 0\\ 0 & 2\end{pmatrix} = I. \checkmark$$

**Eigenvalues.** $U\binom{1}{1} = \frac{1}{\sqrt2}\binom{1+i}{1+i} = \frac{1+i}{\sqrt2}\binom11$ and $U\binom{1}{-1} = \frac{1}{\sqrt2}\binom{1-i}{i-1} = \frac{1-i}{\sqrt2}\binom{1}{-1}$. So the eigenvalues are $\frac{1\pm i}{\sqrt2} = e^{\pm i\pi/4}$, both of modulus $\sqrt{\tfrac12 + \tfrac12} = 1$, as the theorem promises, with orthogonal eigenvectors $(1,\pm1)/\sqrt2$.

**Hermitian logarithm.** With $Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ (itself the Hadamard gate), $U = Q\operatorname{diag}(e^{i\pi/4}, e^{-i\pi/4})Q^*$. So $U = e^{iH}$ with
$$H = Q\operatorname{diag}(\tfrac\pi4, -\tfrac\pi4)Q^* = \frac\pi4\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix},$$
which is $\tfrac\pi4$ times the Pauli $X$ gate, a Hermitian matrix. In quantum-computing language, $U$ is the rotation $R_x(-\pi/2) = e^{i(\pi/4)X}$ about the $x$-axis of the Bloch sphere.

### Example 4: The rotation, diagonalized by a unitary
Let $R_\theta = \begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$ and $q_\pm = \frac{1}{\sqrt2}(1, \mp i)$.
$$R_\theta\begin{pmatrix}1\\ -i\end{pmatrix} = \begin{pmatrix}\cos\theta + i\sin\theta\\ \sin\theta - i\cos\theta\end{pmatrix} = e^{i\theta}\begin{pmatrix}1\\ -i\end{pmatrix},$$
since $e^{i\theta}\cdot(-i) = -i\cos\theta + \sin\theta$. Similarly $R_\theta(1, i) = e^{-i\theta}(1, i)$. The vectors are orthonormal (Example 1). With $W = [\,q_+\ q_-\,]$ we get $W^*R_\theta W = \operatorname{diag}(e^{i\theta}, e^{-i\theta})$. Over $\mathbb{C}$, a rotation of the plane is "multiply one complex axis by $e^{i\theta}$ and the other by $e^{-i\theta}$."

### Example 5: A Schur decomposition of a non-diagonalizable matrix
Let $A = \begin{pmatrix}1 & 1\\ -1 & 3\end{pmatrix}$. Characteristic polynomial: $(1-\lambda)(3-\lambda) + 1 = \lambda^2 - 4\lambda + 4 = (\lambda - 2)^2$. Eigenvectors: $A - 2I = \begin{pmatrix}-1 & 1\\ -1 & 1\end{pmatrix}$ has kernel spanned by $(1,1)$. Only one eigen-direction, so $A$ is not diagonalizable (it is not normal: $A^*A = \begin{pmatrix}2 & -2\\ -2 & 10\end{pmatrix}$, while $AA^* = \begin{pmatrix}2 & 2\\ 2 & 10\end{pmatrix}$).

Schur's recipe: $q_1 = (1,1)/\sqrt2$, completed by $q_2 = (1,-1)/\sqrt2$. Then $Aq_1 = (2,2)/\sqrt2 = 2q_1$ and $Aq_2 = (0, -4)/\sqrt2$, so
- $\langle Aq_2, q_1\rangle = \tfrac12\,(0\cdot 1 + (-4)\cdot 1) = -2$,
- $\langle Aq_2, q_2\rangle = \tfrac12\,(0\cdot 1 + (-4)(-1)) = 2$.

Therefore
$$Q^*AQ = \begin{pmatrix}2 & -2\\ 0 & 2\end{pmatrix}, \qquad Q = \frac{1}{\sqrt2}\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix}.$$
The diagonal shows the eigenvalue 2 twice; the off-diagonal $-2$ is the "shear" that no orthonormal basis can remove. Compare Jordan form $\begin{pmatrix}2&1\\0&2\end{pmatrix}$ (↩ S2E13), which needs a non-orthogonal basis to make that entry 1.

## Visual and animation notes
1. **Cold open:** the vector $(1, i)$ drawn as two complex planes side by side (one per coordinate), a blue dot at 1 in the first and at $i$ in the second. The naive dot product animates $1\cdot1$ and $i\cdot i$ as arrows that cancel; the number 0 lands with a thud.
2. **"Why the bar":** a single complex number $z$ spinning around a circle. Show $z^2$ spinning at double speed (its "length" oscillates in sign when you take the real part), while $z\bar z$ stays fixed at $\lvert z\rvert^2$. Caption: *the conjugate undoes the spin*. (Callback stamp ↩ S1E10.)
3. **The forced-conjugate proof:** a vector $v$, then $iv$ drawn as a quarter-turn. A bilinear "length meter" swings from $+$ to $-$; a sesquilinear meter stays still.
4. **Unitary map:** three complex planes (axes of $\mathbb{C}^3$) stacked in depth, each with a blue dot. A diagonal unitary rotates each dot around its own circle at a different speed. Then a "basis camera" overlay (the basis/coordinates motif) tilts, and the same map now looks like a dense matrix while the three circles of rotation stay put.
5. **Invariant badge:** $\lvert\lambda\rvert = 1$ pinned on screen while the matrix entries churn under random unitary changes of basis.
6. **Schur's induction:** a matrix with its first column turning to $(\lambda_1, 0, \dots, 0)$, then the lower-right block shrinking and repeating; a staircase of zeros builds below the diagonal.
7. **Normal ⇒ diagonal:** row 1 of an upper triangular normal matrix lights up; the identity $\lvert r_{11}\rvert^2 = \sum_j\lvert r_{1j}\rvert^2$ wipes the rest of the row to zero, then row 2, and so on.
8. **Matrix land table:** the complex plane with the real line, unit circle, and positive ray highlighted, morphing into three "matrix" icons (Hermitian, unitary, positive), each with eigenvalue dots landing on the corresponding set.
9. **DFT teaser:** a short signal and its four Fourier coefficients as bars; the total area of squared bars (energy) shown as a constant badge.

## Common misconceptions
- **Misconception:** The conjugate in $\sum u_k\overline{v_k}$ is a convention, like choosing which slot is linear. **Reality:** *Which* slot is conjugated is a convention; *that* one slot is conjugated is forced. No bilinear form on a complex space can be positive definite, since $B(iv, iv) = -B(v,v)$.
- **Misconception:** A unitary matrix has entries of modulus at most 1, so it's "small." **Reality:** The true statement is that columns are orthonormal; entries do satisfy $\lvert u_{jk}\rvert \le 1$, but that alone is far from sufficient (the all-ones $2\times2$ matrix has small entries and isn't unitary).
- **Misconception:** Unitary means "complex orthogonal," i.e. $U^{\mathsf T}U = I$. **Reality:** Complex matrices with $U^{\mathsf T}U = I$ (complex orthogonal) do *not* preserve the Hermitian inner product in general. Unitary means $U^*U = I$ with the conjugate transpose.
- **Misconception:** Schur's theorem is just a weaker Jordan form. **Reality:** They answer different questions. Jordan form allows any basis and gets an almost-diagonal matrix; Schur allows only orthonormal bases and gets a triangular one. Schur is numerically stable and is what software computes.
- **Misconception:** Every diagonalizable complex matrix is normal. **Reality:** $\begin{pmatrix}1 & 1\\ 0 & 2\end{pmatrix}$ is diagonalizable (distinct eigenvalues) but its eigenvectors $(1,0)$ and $(1,1)$ aren't orthogonal, so it is not normal.
- **Misconception:** The eigenvalues of a real orthogonal matrix are $\pm1$. **Reality:** They lie on the unit circle; for rotations they are $e^{\pm i\theta}$, which is real only for $\theta \in \{0, \pi\}$.

## Exercises
- **Warm-up (computational):**
  1. Compute $\langle u, v\rangle$, $\langle v, u\rangle$, $\lVert u\rVert$, $\lVert v\rVert$ for $u = (2i, 1)$, $v = (1+i, 3)$, and verify Cauchy–Schwarz.
  2. Show that the Pauli matrices $X = \begin{pmatrix}0&1\\1&0\end{pmatrix}$, $Y = \begin{pmatrix}0&-i\\ i&0\end{pmatrix}$, $Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}$ are both Hermitian and unitary, and find their eigenvalues.
  3. Write out the $3\times3$ scaled DFT matrix and check that its first two columns are orthogonal.
- **Core (conceptual):**
  4. Show that $\langle f, g\rangle = \int_0^{1} f(x)\overline{g(x)}\,dx$ makes $\{e^{2\pi i k x}\}_{k\in\mathbb{Z}}$ an orthonormal set.
  5. Prove that the eigenvalues of a Hermitian matrix are real, and that eigenvectors for distinct eigenvalues are orthogonal.
  6. Explain why a real matrix that has a non-real eigenvalue cannot be upper triangularized by a *real* orthogonal matrix.
- **Stretch (proof or exploration):**
  7. Prove that $N$ is normal iff $\lVert Nv\rVert = \lVert N^*v\rVert$ for all $v$. Deduce that $\ker N = \ker N^*$ for normal $N$.
  8. Show that if $K$ is skew-Hermitian then $e^{K}$ is unitary, and that the Cayley transform $(I - K)(I + K)^{-1}$ is unitary as well.

<details><summary>Hints and answers</summary>

1. $\langle u, v\rangle = 2i\,\overline{(1+i)} + 1\cdot 3 = 2i(1-i) + 3 = 2i + 2 + 3 = 5 + 2i$; $\langle v,u\rangle = 5 - 2i$. $\lVert u\rVert^2 = 4 + 1 = 5$, $\lVert v\rVert^2 = 2 + 9 = 11$. Check: $\lvert 5 + 2i\rvert^2 = 29 \le 55$.
2. Each satisfies $M^* = M$ and $M^2 = I$, so $M^*M = I$. Eigenvalues $\pm1$ for all three (real, *and* on the unit circle).
3. $\omega = e^{-2\pi i/3}$; $F_3 = \frac{1}{\sqrt3}\begin{pmatrix}1&1&1\\1&\omega&\omega^2\\1&\omega^2&\omega^4\end{pmatrix}$ with $\omega^4 = \omega$. Columns 0 and 1: $\frac13(1 + \bar\omega + \bar\omega^2) = 0$ since $1 + \omega + \omega^2 = 0$.
4. $\int_0^1 e^{2\pi i(j-k)x}dx = 1$ if $j = k$, else $\big[e^{2\pi i(j-k)x}/(2\pi i(j-k))\big]_0^1 = 0$.
5. Same pattern as the unitary proof: $\lambda\lVert v\rVert^2 = \langle Hv, v\rangle = \langle v, Hv\rangle = \bar\lambda\lVert v\rVert^2$. For orthogonality: $\lambda\langle v, w\rangle = \langle Hv, w\rangle = \langle v, Hw\rangle = \mu\langle v,w\rangle$ (with $\mu$ real).
6. The first vector of such a basis would be a real eigenvector, whose eigenvalue would be real; then the remaining block gives more real eigenvalues, so all eigenvalues would be real.
7. $\lVert Nv\rVert^2 - \lVert N^*v\rVert^2 = \langle (N^*N - NN^*)v, v\rangle$; a Hermitian matrix $M$ with $\langle Mv, v\rangle = 0$ for all $v$ is zero (diagonalize it).
8. $(e^K)^* = e^{K^*} = e^{-K}$, and $e^{-K}e^{K} = I$ because $K$ commutes with $-K$. For the Cayley transform, $I + K$ is invertible since $K$'s eigenvalues are purely imaginary, and the factors commute.
</details>

## Historical note
Charles Hermite studied what we now call Hermitian forms, $\sum a_{jk}z_j\overline{z_k}$ with $a_{kj} = \overline{a_{jk}}$, in the 1850s in connection with number theory, and showed that such forms have real eigenvalues, extending Cauchy's 1829 result for real symmetric matrices. Issai Schur proved his triangularization theorem in a 1909 paper in *Mathematische Annalen* on the characteristic roots of linear substitutions, with an application to integral equations: already the motivation was the infinite-dimensional theory being built by Hilbert and his school. The word "unitary" and the systematic use of complex inner product spaces became standard with quantum mechanics: John von Neumann's *Mathematische Grundlagen der Quantenmechanik* (1932) placed quantum states in a complex Hilbert space and required symmetries and time evolution to be unitary. Meanwhile the unitarity of the discrete Fourier transform became an industrial fact after Cooley and Tukey's 1965 fast Fourier transform paper (an algorithm Gauss had essentially found around 1805 but never published).

## Connections
- **Callbacks:** ↩ S1E10 (ℂ as rotations; $\lvert z\rvert^2 = z\bar z$; the Fundamental Theorem of Algebra), ↩ S1E16 (groups: $U(n)$, $O(n)$, $U(1)$), ↩ S2E09 (bilinear forms, alternating forms), ↩ S2E12 (rotations have no real eigenvectors), ↩ S2E13 (Jordan form; the shear), ↩ S2E14 (real inner products, Cauchy–Schwarz, polarization), ↩ S1E08 (completeness, for the Hilbert space preview).
- **Sets up:** ↪ S2E16 (the adjoint $T^*$ as a coordinate-free conjugate transpose), ↪ S2E17 (Gram–Schmidt and QR in unitary spaces), ↪ S2E18 (spectral theorem, real case), ↪ S2E19 (polar decomposition, SVD), ↪ S2E28 (Hilbert space = complete unitary space), ↪ S2E29 (Fourier transform as a unitary map, Parseval), ↪ S2E31 (quantum mechanics: unitary time evolution), ↪ S2E32 (Koopman operators are unitary), ↪ S3E11 (Lie groups $U(n)$, $SU(2)$).
- **Side quests:** *Quantum computing* (qubits in $\mathbb{C}^2$, gates as unitary matrices; attaches after S2E10); *Cayley–Dickson* (what conjugation does in ℍ and 𝕆; attaches after S1E10).

## References
- **Primary / historical:**
  - I. Schur, "Über die charakteristischen Wurzeln einer linearen Substitution mit einer Anwendung auf die Theorie der Integralgleichungen," *Mathematische Annalen* 66 (1909).
  - J. von Neumann, *Mathematische Grundlagen der Quantenmechanik*, Springer, 1932 (English translation: *Mathematical Foundations of Quantum Mechanics*, Princeton University Press, 1955).
  - J. W. Cooley and J. W. Tukey, "An algorithm for the machine calculation of complex Fourier series," *Mathematics of Computation* 19 (1965).
- **Textbooks:**
  - S. Axler, *Linear Algebra Done Right*, 3rd ed., Springer, 2015: Ch. 6 (Inner Product Spaces, including Schur's theorem) and Ch. 7 (Operators on Inner Product Spaces: normal operators, the complex spectral theorem, isometries).
  - R. A. Horn and C. R. Johnson, *Matrix Analysis*, 2nd ed., Cambridge University Press, 2013: Ch. 2 (Unitary similarity and unitary equivalence: unitary matrices, Schur's theorem, normal matrices).
  - G. H. Golub and C. F. Van Loan, *Matrix Computations*, 4th ed., Johns Hopkins University Press, 2013: Ch. 7 (the unsymmetric eigenvalue problem; Schur decomposition and the QR algorithm).
  - L. N. Trefethen and D. Bau III, *Numerical Linear Algebra*, SIAM, 1997: Lecture 2 (orthogonal vectors and matrices) and Lecture 24 (eigenvalue problems, Schur factorization).
- **Accessible:**
  - M. A. Nielsen and I. L. Chuang, *Quantum Computation and Quantum Information*, Cambridge University Press, 2000 (10th anniversary ed. 2010): Ch. 2 (linear algebra and the postulates of quantum mechanics) and Ch. 4 (quantum circuits; single-qubit gates as unitaries).
