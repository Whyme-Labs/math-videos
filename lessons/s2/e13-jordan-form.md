# S2E13: When Diagonalization Fails

> **Season / Act:** Season 2, Part A, Act IV (Invariants: What Coordinates Can't Change) · **Target runtime:** 15–25 min ·
> **Prerequisites:** ↩ S2E05 (quotient spaces, direct sums), ↩ S2E11 (determinant of a triangular map), ↩ S2E12 (eigenvalues, characteristic polynomial, existence over ℂ); a first look at $e^x$ as a power series and at linear ODEs ·
> **Builds toward:** ↪ S2E15 (Schur triangularization), ↪ S2E18 (when the nilpotent part vanishes), ↪ S2E31 (spectrum in infinite dimensions), ↪ S3E02 (Jordan form as the structure theorem for $F[x]$-modules), ↪ S3E11 (the matrix exponential and Lie groups)

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why some maps are not diagonalizable (geometric multiplicity < algebraic multiplicity), and define invariant subspaces and generalized eigenvectors.
2. State the Jordan normal form theorem over ℂ, read off Jordan blocks from the dimensions of $\ker(T - \lambda I)^k$, and compute a Jordan basis for a small matrix.
3. Define the minimal polynomial, prove the Cayley–Hamilton theorem, and use the minimal polynomial to test diagonalizability.
4. Compute matrix exponentials $e^{tA}$ via "diagonal plus nilpotent" and use them to solve linear ODEs, including the resonant $te^{t}$ terms.

## Cold open
Take a deck of cards and push the top of the deck sideways so the cards slide over each other. That's a shear. In the plane it's the map
$$S = \begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad (x, y)\mapsto(x + y,\ y).$$
Last episode we learned the trick for understanding any linear map: find the directions it only stretches, the eigenvectors, and use them as coordinates. So let's look for them.

The horizontal direction works: $(1,0)$ goes to itself. Eigenvalue 1. Good. We need one more. The characteristic polynomial is $(\lambda - 1)^2$, so the only possible eigenvalue is $1$ again. We need another vector with $S v = v$. But $S(x, y) = (x, y)$ forces $y = 0$. Every eigenvector is horizontal. There *is* no second one.

This isn't a problem with the real numbers. Go to the complex numbers, and the shear still has only one eigen-direction. Our beautiful theory, "every map has its own coordinates," just broke on a deck of cards.

So what *is* the simplest form of a map like this? Is there some other kind of special direction we've been missing? There is. And when we find it, we'll be able to write down, for every linear map on a complex space without exception, its complete fingerprint. Diagonal, plus a little nudge.

## The story

### 1. Naive attempt and crisis: not enough eigenvectors

From ↩ S2E12, $T$ is diagonalizable iff its eigenvectors span $V$. For the shear, $\chi_S(\lambda) = (\lambda - 1)^2$: the eigenvalue 1 has **algebraic multiplicity 2**, but $E_1 = \ker(S - I) = \operatorname{span}\{(1,0)\}$ has **geometric multiplicity 1**. The eigenspaces fill only a line.

Algebraic closure (↩ S1E10, ↩ S2E12) repaired one defect: over ℂ, eigen*values* always exist. But it can't repair this one. The defect isn't missing numbers; it's missing *directions*. We need a new structure.

What's missing, precisely? An eigenvector spans an invariant line. Maybe the right building blocks are bigger **invariant subspaces**: subspaces $U$ with $T(U)\subseteq U$. If $V = U_1\oplus\dots\oplus U_k$ with each $U_i$ invariant, then in a basis adapted to the decomposition $T$ is **block diagonal**, and we can study each block separately. Our job is to find the smallest, simplest invariant pieces.

### 2. The construction: generalized eigenvectors

Look again at the shear. $N = S - I = \begin{pmatrix}0&1\\0&0\end{pmatrix}$ satisfies $Ne_2 = e_1$, $Ne_1 = 0$. So $e_2$ is not killed by $S - I$, but it *is* killed by $(S - I)^2$. It is an eigenvector "after two steps."

> **Definition.** A nonzero $v$ is a **generalized eigenvector** of $T$ for $\lambda$ if $(T - \lambda I)^kv = 0$ for some $k\ge1$. The **generalized eigenspace** is $G_\lambda = \bigcup_k\ker(T - \lambda I)^k = \ker(T - \lambda I)^n$ where $n = \dim V$.

(The kernels $\ker(T - \lambda I)^k$ increase with $k$ and must stabilize by $k = n$, since dimensions can only increase $n$ times.) Each $G_\lambda$ is invariant under $T$, because $T$ commutes with $(T - \lambda I)^k$.

> **Theorem 1 (generalized eigenspace decomposition).** Let $V$ be a finite-dimensional complex vector space and $T: V\to V$ linear with distinct eigenvalues $\lambda_1,\dots,\lambda_r$. Then
> $$V = G_{\lambda_1}\oplus\dots\oplus G_{\lambda_r},$$
> and $\dim G_{\lambda_i}$ equals the algebraic multiplicity of $\lambda_i$.

*Proof sketch.* Write $\chi_T(x) = \prod_i(x - \lambda_i)^{m_i}$. The polynomials $q_i = \chi_T/(x - \lambda_i)^{m_i}$ have no common root, so (Euclid's algorithm for polynomials, as for integers in ↩ S1E18) there are polynomials $a_i$ with $\sum_ia_iq_i = 1$. Set $E_i = a_i(T)q_i(T)$. Then $\sum_iE_i = I$, and by Cayley–Hamilton (Theorem 3 below) $(T - \lambda_iI)^{m_i}E_i = a_i(T)\chi_T(T) = 0$, so $E_i$ maps into $G_{\lambda_i}$. Thus the $G$'s span $V$; independence follows because $(T - \mu I)$ is invertible on $G_\lambda$ for $\mu\ne\lambda$. On $G_{\lambda_i}$, the only eigenvalue is $\lambda_i$, so the characteristic polynomial of $T|_{G_{\lambda_i}}$ is $(x - \lambda_i)^{\dim G_{\lambda_i}}$; multiplying over $i$ gives $\chi_T$, so $\dim G_{\lambda_i} = m_i$. $\blacksquare$

So every map on a complex space splits into pieces, one per eigenvalue, and on the piece $G_\lambda$:
$$T|_{G_\lambda} = \lambda I + N,\qquad N = (T - \lambda I)|_{G_\lambda}\ \text{ is nilpotent}\ (N^k = 0\text{ for some }k).$$
"Diagonal plus a nilpotent nudge." It remains to understand nilpotent maps.

### 3. Nilpotent maps and Jordan chains

Pick $v$ with $N^{k-1}v\ne0$ but $N^kv = 0$. The vectors
$$N^{k-1}v\ \xleftarrow{N}\ \cdots\ \xleftarrow{N}\ Nv\ \xleftarrow{N}\ v$$
form a **Jordan chain** of length $k$: each step down the chain is one application of $N$, and the bottom vector $N^{k-1}v$ is an honest eigenvector. They are linearly independent (apply $N^{k-1}$ to a dependence to kill all but one coefficient, and repeat), and their span is invariant. In the basis $(N^{k-1}v,\dots,Nv,v)$, $N$ is the matrix with 1's just above the diagonal, and $T = \lambda I + N$ is a **Jordan block**:
$$J_k(\lambda) = \begin{pmatrix}\lambda&1&&\\&\lambda&\ddots&\\&&\ddots&1\\&&&\lambda\end{pmatrix}\quad(k\times k).$$
The shear is $J_2(1)$, with chain $e_1\leftarrow e_2$.

> **Theorem 2 (Jordan normal form).** Let $T$ be a linear map on a finite-dimensional complex vector space. There is a basis of $V$ in which the matrix of $T$ is block diagonal,
> $$J = \begin{pmatrix}J_{k_1}(\mu_1)&&\\&\ddots&\\&&J_{k_s}(\mu_s)\end{pmatrix},$$
> where the $\mu_j$ are eigenvalues of $T$ (not necessarily distinct). The blocks are uniquely determined by $T$ up to their order. Two complex matrices are similar if and only if they have the same Jordan form (up to the order of blocks).

*Proof sketch.* By Theorem 1 it suffices to treat one $G_\lambda$, i.e. a nilpotent $N$. Existence: induct on dimension. $N(V)$ is a smaller invariant space, so by induction it has a basis of chains; each chain in $N(V)$ ends (at the top) in some $Nv_i$, so extend it upward by $v_i$; finally, add vectors from $\ker N$ to complete a basis, each forming a chain of length 1. (Axler, §8C, or Hoffman–Kunze, Ch. 7, carry this out in full.) Uniqueness: the numbers
$$d_k = \dim\ker(T - \lambda I)^k$$
are properties of $T$, and in Jordan form, $(T - \lambda I)^k$ kills exactly $\min(k, \text{size})$ basis vectors from each $\lambda$-block. So
$$d_k - d_{k-1} = \#\{\lambda\text{-blocks of size}\ge k\},$$
and the block sizes can be read off from the $d_k$, which don't depend on any basis. $\blacksquare$

This is the payoff of Act IV: **over ℂ, a linear map on a finite-dimensional space is classified, up to change of basis, by its Jordan form.** The eigenvalues say how much the map stretches; the block sizes say how the generalized eigenvectors are chained; nothing else is left.

Over ℝ, the same story holds if $\chi_T$ splits into real linear factors. Otherwise complex eigenvalues come in conjugate pairs, and you get "real Jordan blocks" built from $2\times2$ rotation-scaling blocks. Over a general field, the right version is the rational canonical form, and the best way to see both is to view $V$ as a **module over the polynomial ring $F[x]$**, where $x$ acts as $T$. The Jordan form is then a special case of the same structure theorem that classifies finitely generated abelian groups (↪ S3E02).

### 4. The minimal polynomial and Cayley–Hamilton

Polynomials in $T$ make sense: $p(T) = a_0I + a_1T + \dots + a_mT^m$. Since $\operatorname{Hom}(V,V)$ has dimension $n^2$ (↩ S2E05), the $n^2 + 1$ maps $I, T, \dots, T^{n^2}$ are dependent, so some nonzero polynomial kills $T$.

> **Definition.** The **minimal polynomial** $\mu_T$ is the monic polynomial of least degree with $\mu_T(T) = 0$. Every polynomial $p$ with $p(T) = 0$ is a multiple of $\mu_T$ (divide $p$ by $\mu_T$; the remainder also kills $T$ and has smaller degree, so it is 0).

In fact the degree is at most $n$, not $n^2$:

> **Theorem 3 (Cayley–Hamilton).** Every linear map $T$ on an $n$-dimensional space satisfies its own characteristic polynomial: $\chi_T(T) = 0$. Hence $\mu_T$ divides $\chi_T$.

*Proof (over ℂ).* **Step 1: triangularize.** We show there is a basis $v_1,\dots,v_n$ in which $T$ is upper triangular, i.e. each $V_k = \operatorname{span}(v_1,\dots,v_k)$ is invariant. Induct on $n$. By ↩ S2E12 there is an eigenvector $v_1$. The map $T$ induces a map $\bar T$ on the quotient $V/\operatorname{span}(v_1)$ (↩ S2E05), well-defined because $\operatorname{span}(v_1)$ is invariant. By induction $\bar T$ is upper triangular in some basis $\bar v_2,\dots,\bar v_n$; lift these to $v_2,\dots,v_n\in V$. Then $Tv_k\in\operatorname{span}(v_1,\dots,v_k)$ for every $k$.

**Step 2: walk down the flag.** Let $\lambda_1,\dots,\lambda_n$ be the diagonal entries, so $Tv_k = \lambda_kv_k + (\text{something in }V_{k-1})$. Then $(T - \lambda_kI)v_k\in V_{k-1}$, and since $V_{k-1}$ is invariant, $(T - \lambda_kI)V_k\subseteq V_{k-1}$. The determinant of a triangular map is the product of its diagonal entries (↩ S2E11), so $\chi_T(x) = \prod_k(x - \lambda_k)$. The factors $(T - \lambda_kI)$ commute, so
$$\chi_T(T)V = (T - \lambda_1I)\cdots(T - \lambda_{n-1}I)\underbrace{(T - \lambda_nI)V_n}_{\subseteq V_{n-1}}\subseteq(T - \lambda_1I)\cdots(T - \lambda_{n-2}I)V_{n-2}\subseteq\dots\subseteq(T - \lambda_1I)V_1\subseteq V_0 = \{0\}.$$
So $\chi_T(T) = 0$. $\blacksquare$

*Other fields.* For an $n\times n$ matrix $A$ over any field $F$, the statement "$\chi_A(A) = 0$" is a list of polynomial identities in the entries of $A$. Every field sits inside an algebraically closed field (↩ S1E19), where the proof above applies; the identity computed there is the same identity in $F$. So Cayley–Hamilton holds over every field.

A tempting wrong proof is "$\chi_A(A) = \det(A I - A) = \det(0) = 0$." The problem: in $\chi_A(\lambda) = \det(\lambda I - A)$, $\lambda$ is a scalar; substituting a matrix for it inside the determinant produces a scalar, but $\chi_A(A)$ is a matrix.

**The minimal polynomial from the Jordan form.** On a block $J_k(\lambda)$, $(J - \lambda I)^j = N^j\ne0$ for $j < k$ and $= 0$ for $j = k$. So
$$\mu_T(x) = \prod_{\lambda}(x - \lambda)^{(\text{size of the largest }\lambda\text{-block})},\qquad\chi_T(x) = \prod_\lambda(x - \lambda)^{(\text{sum of the }\lambda\text{-block sizes})}.$$
> **Corollary.** $T$ is diagonalizable if and only if $\mu_T$ has no repeated roots.

### 5. Payoff: the matrix exponential and linear ODEs

The system $x'(t) = Ax(t)$, $x(0) = x_0$, has the solution $x(t) = e^{tA}x_0$, where
$$e^{tA} = \sum_{k\ge0}\frac{t^kA^k}{k!}$$
(the series converges for every matrix). Why does Jordan form help? Because if $A = \lambda I + N$ with $N$ nilpotent, then $\lambda I$ and $N$ **commute**, so $e^{t(\lambda I + N)} = e^{\lambda t}e^{tN}$, and the series for $e^{tN}$ **stops**:
$$e^{tJ_k(\lambda)} = e^{\lambda t}\Big(I + tN + \frac{t^2}{2!}N^2 + \dots + \frac{t^{k-1}}{(k-1)!}N^{k-1}\Big).$$
For example $e^{tJ_2(\lambda)} = e^{\lambda t}\begin{pmatrix}1&t\\0&1\end{pmatrix}$.

This explains a classic mystery from ODE courses. For $y'' - 2y' + y = 0$, the characteristic equation $r^2 - 2r + 1 = 0$ has the double root $r = 1$, and "you also need $te^t$." Where does the $t$ come from? From the nilpotent nudge: the companion matrix of the ODE is a single $2\times2$ Jordan block, not diagonalizable, and $e^{tN} = I + tN$ produces the factor $t$ (Worked Example 3). Physically, this is the borderline case of **critical damping**; with a forcing term at the natural frequency it becomes **resonance**, where amplitudes grow like $t\cos t$.

**Teaser for Part B.** In infinite dimensions there is nothing this clean. Some operators have no eigenvalues at all, not even over ℂ (the right shift on sequences of ↩ S2E03 is one). The replacement for "the list of eigenvalues" will be the **spectrum**: all $\lambda$ for which $T - \lambda I$ fails to be invertible, in any of several ways (↪ S2E31).

## Worked examples

### Example 1: The shear, completely
$S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$, $\chi_S = (\lambda - 1)^2$.
- $d_1 = \dim\ker(S - I) = 1$ (the matrix $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ has rank 1).
- $d_2 = \dim\ker(S - I)^2 = 2$ since $(S - I)^2 = 0$.
- Blocks of size $\ge1$: $d_1 - d_0 = 1$. Blocks of size $\ge2$: $d_2 - d_1 = 1$. So one block of size 2: $J_2(1)$, which is $S$ itself.
- Jordan chain: $e_2\mapsto(S - I)e_2 = e_1\mapsto0$.
- $\mu_S = \chi_S = (x - 1)^2$, which has a repeated root, confirming that $S$ is not diagonalizable.
- Powers: $S^k = (I + N)^k = I + kN = \begin{pmatrix}1&k\\0&1\end{pmatrix}$ (binomial theorem, with $N^2 = 0$). The shear's powers grow *linearly*, not exponentially: a signature of a nontrivial Jordan block with $|\lambda| = 1$.

### Example 2: A $3\times3$ Jordan form from scratch
Let
$$A = \begin{pmatrix}2&1&0\\-1&2&1\\-1&1&3\end{pmatrix}.$$
**Characteristic polynomial.** Expand $\det(A - \lambda I)$ along the first row:
$$(2 - \lambda)\big[(2 - \lambda)(3 - \lambda) - 1\big] - 1\cdot\big[(-1)(3 - \lambda) - (1)(-1)\big] + 0.$$
The first bracket is $\lambda^2 - 5\lambda + 5$. The second is $-3 + \lambda + 1 = \lambda - 2$. So
$$\det(A - \lambda I) = (2 - \lambda)(\lambda^2 - 5\lambda + 5) - (\lambda - 2) = (2 - \lambda)(\lambda^2 - 5\lambda + 6) = (2 - \lambda)(\lambda - 2)(\lambda - 3),$$
i.e. $\chi_A(\lambda) = (\lambda - 2)^2(\lambda - 3)$. Check: $\operatorname{tr}A = 7 = 2 + 2 + 3$ ✓; $\det A = 2(6 - 1) - 1(-3 + 1) = 10 + 2 = 12 = 2\cdot2\cdot3$ ✓.

**Eigenvalue 2.** $A - 2I = \begin{pmatrix}0&1&0\\-1&0&1\\-1&1&1\end{pmatrix}$. Row 1 gives $y = 0$; row 2 gives $-x + z = 0$; row 3 is then $-x + 0 + x = 0$ ✓. So $E_2 = \operatorname{span}\{(1,0,1)\}$: geometric multiplicity 1 < algebraic multiplicity 2. **Not diagonalizable.** Since $d_1 = 1$ and $\dim G_2 = 2$, there is one block $J_2(2)$.

**Generalized eigenvector.** $(A - 2I)^2 = \begin{pmatrix}-1&0&1\\-1&0&1\\-2&0&2\end{pmatrix}$, with kernel $\{-x + z = 0\} = \operatorname{span}\{(1,0,1),(0,1,0)\}$, of dimension 2 ✓. Choose $v_2 = (0,1,0)$, which is in $\ker(A - 2I)^2$ but not in $\ker(A - 2I)$. Then
$$v_1 = (A - 2I)v_2 = (\text{column 2 of }A - 2I) = (1, 0, 1),$$
which is the eigenvector, as it must be. Chain: $v_2\mapsto v_1\mapsto0$.

**Eigenvalue 3.** $A - 3I = \begin{pmatrix}-1&1&0\\-1&-1&1\\-1&1&0\end{pmatrix}$. Row 1: $y = x$. Row 2: $-x - x + z = 0$, so $z = 2x$. So $v_3 = (1,1,2)$.

**Check $AP = PJ$** with $P = [v_1\ v_2\ v_3] = \begin{pmatrix}1&0&1\\0&1&1\\1&0&2\end{pmatrix}$ and $J = \begin{pmatrix}2&1&0\\0&2&0\\0&0&3\end{pmatrix}$:
- $Av_1 = (2, -1 + 1, -1 + 3) = (2,0,2) = 2v_1$ ✓ (column 1 of $PJ$ is $2v_1$).
- $Av_2 = (1,2,1) = v_1 + 2v_2$ ✓ (column 2 of $PJ$ is $v_1 + 2v_2$).
- $Av_3 = (2 + 1,\ -1 + 2 + 2,\ -1 + 1 + 6) = (3,3,6) = 3v_3$ ✓.

$\det P = 1(2 - 0) - 0 + 1(0 - 1) = 1$, so $P$ is invertible, and $P^{-1}AP = J$.

**Cayley–Hamilton and the minimal polynomial.** $\chi_A(A) = (A - 2I)^2(A - 3I) = 0$ (it kills $v_1, v_2$ via the first factor, which commutes past, and $v_3$ via the second). Is the smaller polynomial $(x - 2)(x - 3)$ enough? Compute $(A - 2I)(A - 3I)$, row by row (row $i$ of the product is the combination of the rows of $A - 3I$ given by row $i$ of $A - 2I$):
- row 1 $= 1\cdot(\text{row 2}) = (-1,-1,1)$;
- row 2 $= -(\text{row 1}) + (\text{row 3}) = (1,-1,0) + (-1,1,0) = (0,0,0)$;
- row 3 $= -(\text{row 1}) + (\text{row 2}) + (\text{row 3}) = (1,-1,0) + (-1,-1,1) + (-1,1,0) = (-1,-1,1)$.

Nonzero. So $\mu_A = (x - 2)^2(x - 3) = \chi_A$, consistent with the largest 2-block having size 2.

**Contrast.** $D = \operatorname{diag}(2,2,3)$ has the *same* characteristic polynomial, trace, determinant, and eigenvalues as $A$. But $\mu_D = (x - 2)(x - 3)$, so $D$ and $A$ are **not similar**. The characteristic polynomial is not a complete invariant; the Jordan form is.

### Example 3: Solving $y'' - 2y' + y = 0$ with a nilpotent nudge
Let $x = (y, y')$. Then $x' = Cx$ with the companion matrix
$$C = \begin{pmatrix}0&1\\-1&2\end{pmatrix},\qquad\chi_C(\lambda) = \lambda(\lambda - 2) + 1 = (\lambda - 1)^2.$$
Write $C = I + N$ with $N = C - I = \begin{pmatrix}-1&1\\-1&1\end{pmatrix}$. Check nilpotency: $N^2 = \begin{pmatrix}1 - 1&-1 + 1\\1 - 1&-1 + 1\end{pmatrix} = 0$ ✓, and $N\neq0$, so $C$ is similar to $J_2(1)$ and not diagonalizable. Since $I$ and $N$ commute,
$$e^{tC} = e^{t}e^{tN} = e^t(I + tN) = e^t\begin{pmatrix}1 - t&t\\-t&1 + t\end{pmatrix}.$$
So $y(t) = (1 - t)e^t\,y(0) + te^t\,y'(0)$.

**Check** with $y(0) = 1$, $y'(0) = 0$: $y = (1 - t)e^t$, $y' = -e^t + (1 - t)e^t = -te^t$, $y'' = -e^t - te^t$. Then $y'' - 2y' + y = (-e^t - te^t) + 2te^t + (e^t - te^t) = 0$ ✓, and $y(0) = 1$, $y'(0) = 0$ ✓. The $te^t$ is exactly the $tN$ term.

### Example 4: Differentiation is one big Jordan block
Let $V = \mathcal P_3$ (polynomials of degree $\le3$) and $D = d/dx$. Then $D^4 = 0$ (four derivatives kill a cubic) but $D^3x^3 = 6\ne0$, so $D$ is nilpotent with $\mu_D = x^4 = \chi_D$. Its only eigenvalue is 0, with eigenspace $\ker D$ = constants, of dimension 1, so there is a single block $J_4(0)$.

A Jordan chain: start at the top with $v = x^3/6$:
$$\frac{x^3}{6}\ \xrightarrow{D}\ \frac{x^2}{2}\ \xrightarrow{D}\ x\ \xrightarrow{D}\ 1\ \xrightarrow{D}\ 0.$$
In the basis $\big(1,\ x,\ \tfrac{x^2}{2},\ \tfrac{x^3}{6}\big)$, each basis vector maps to the previous one, so
$$[D] = \begin{pmatrix}0&1&0&0\\0&0&1&0\\0&0&0&1\\0&0&0&0\end{pmatrix} = J_4(0).$$
The "Taylor basis" $x^k/k!$ is the map's own Jordan basis. And $e^{tD}p(x) = p(x) + tp'(x) + \tfrac{t^2}{2}p''(x) + \dots = p(x + t)$: the exponential of differentiation is translation (Taylor's theorem, exact for polynomials).

## Visual and animation notes
1. **Cold open.** A deck of cards shears; the grid version follows (motif: *Linear map*). Horizontal arrows stay put and glow; every other arrow tilts. A search beam sweeps for a second eigen-direction and finds nothing.
2. **The crisis ledger.** "What did we lose?" card: ℂ gave us eigenvalues; it did not give us enough eigenvectors.
3. **Generalized eigenvector.** $e_2$ under $S - I$ drops to $e_1$, which under $S - I$ drops to $0$: a two-step staircase. Caption: "an eigenvector after two steps."
4. **Block diagonal.** $V$ splits into colored invariant pieces $G_\lambda$; the matrix shadow rearranges into blocks; inside each block, a diagonal $\lambda$ stripe plus a thin superdiagonal "nudge" stripe.
5. **Jordan chains as ladders.** Each block drawn as a ladder of vectors; $N$ moves every rung down one step; the bottom rung falls into $0$. The dimension counts $d_k$ appear as "how many rungs have fallen after $k$ steps."
6. **Invariant badge.** A badge showing the Jordan form (block sizes and eigenvalues) stays put while the camera (motif: *Basis / coordinates*) churns the matrix entries of $A$ underneath (motif: *Invariants*). A second matrix $D = \operatorname{diag}(2,2,3)$ with the same $\chi$ appears next to it; their $\chi$ badges match, their Jordan badges don't.
7. **Cayley–Hamilton.** A flag of nested subspaces $V_1\subset V_2\subset V_3$; each factor $(T - \lambda_kI)$ pushes the current subspace down one level until it collapses to the origin.
8. **Matrix exponential.** Phase portrait of $x' = Cx$: trajectories of a degenerate node, each one bending once toward the single eigen-direction. A slider for damping passes from an underdamped spiral through critical damping (Jordan block) to overdamped (two eigen-directions).
9. **Taylor ladder.** $x^3/6\to x^2/2\to x\to1\to0$ falling down the ladder.
10. **Callback stamps:** ↩ S2E12 at shot 1, ↩ S2E05 at the quotient step in shot 7, ↩ S2E11 at "det of triangular."

## Common misconceptions
- **Misconception:** A repeated eigenvalue means the matrix is not diagonalizable. **Reality:** $I$ has a repeated eigenvalue and is diagonal. What matters is whether geometric multiplicity equals algebraic multiplicity (equivalently, whether $\mu_T$ has distinct roots).
- **Misconception:** Two matrices with the same eigenvalues (with multiplicity) are similar. **Reality:** $A$ and $\operatorname{diag}(2,2,3)$ in Example 2 share their characteristic polynomial but have different Jordan forms.
- **Misconception:** Cayley–Hamilton is trivial: substitute $A$ into $\det(\lambda I - A)$. **Reality:** That substitution mixes a scalar variable with a matrix; the real proof needs triangularization (or adjugates).
- **Misconception:** Jordan form is a good numerical tool. **Reality:** It is discontinuous in the entries: $\begin{pmatrix}1&1\\\varepsilon&1\end{pmatrix}$ is diagonalizable for $\varepsilon > 0$ (eigenvalues $1\pm\sqrt\varepsilon$) but jumps to a Jordan block at $\varepsilon = 0$. Numerical software prefers Schur form (↪ S2E15) or the SVD (↪ S2E19).
- **Misconception:** The exponential of a sum is the product of exponentials. **Reality:** $e^{A + B} = e^Ae^B$ requires $AB = BA$. It works for $\lambda I + N$ precisely because scalars commute with everything.

## Exercises
- **Warm-up (computational).** Find the Jordan form and a Jordan basis of $A = \begin{pmatrix}3&1\\-1&1\end{pmatrix}$, and compute $e^{tA}$.
- **Core (conceptual).** A $4\times4$ complex matrix has $\chi(x) = (x - 5)^4$ and $\dim\ker(A - 5I) = 2$. List all possible Jordan forms. Which additional piece of information (a single number) would determine it?
- **Stretch (proof).** Prove that a nilpotent map $N$ on an $n$-dimensional space satisfies $N^n = 0$. Then prove that $T$ is diagonalizable if and only if $\mu_T$ has distinct roots, using Theorem 1 and the Jordan form.

<details><summary>Hints and answers</summary>

- **Warm-up.** $\chi = (\lambda - 3)(\lambda - 1) + 1 = \lambda^2 - 4\lambda + 4 = (\lambda - 2)^2$. $N = A - 2I = \begin{pmatrix}1&1\\-1&-1\end{pmatrix}$, $N^2 = 0$, $N\ne0$, so $J = J_2(2)$. Chain: $v_2 = (1,0)$, $v_1 = Nv_2 = (1,-1)$. $e^{tA} = e^{2t}(I + tN) = e^{2t}\begin{pmatrix}1 + t&t\\-t&1 - t\end{pmatrix}$.
- **Core.** Two blocks (since $d_1 = 2$) with sizes summing to 4: $J_3(5)\oplus J_1(5)$ or $J_2(5)\oplus J_2(5)$. The degree of the minimal polynomial (3 or 2), or equivalently $\dim\ker(A - 5I)^2$ (3 or 4), decides it.
- **Stretch.** The kernels $\ker N\subsetneq\ker N^2\subsetneq\cdots$ strictly increase until they stabilize, and if they stabilize at $\ker N^k\ne V$, then $N$ would be injective on $V/\ker N^k$, contradicting nilpotency; so $\ker N^n = V$. For the second part: $\mu_T = \prod(x - \lambda)^{(\text{largest block})}$, which has distinct roots iff every block has size 1.

</details>

## Historical note
The normal form is named for Camille Jordan, who presented it in his *Traité des substitutions et des équations algébriques* (1870), a book mainly about Galois theory and permutation groups. Jordan worked over finite fields $\mathbb F_p$, where he needed canonical forms for linear substitutions as part of his study of groups. Two years earlier, in 1868, Karl Weierstrass had published his theory of **elementary divisors** for pairs of bilinear forms, which contains an equivalent classification over ℂ. The two approaches led to a public quarrel in 1874 between Jordan and Leopold Kronecker (a defender of Weierstrass's approach) over priority and over what a "canonical form" should be. Arthur Cayley stated the Cayley–Hamilton theorem in his 1858 memoir on matrices, checked it for $2\times2$ matrices, said he had verified the $3\times3$ case, and wrote that he had "not thought it necessary to undertake the labour of a formal proof." William Rowan Hamilton had proved a version for quaternions (as linear maps of $\mathbb R^4$) in the 1850s, and Georg Frobenius gave the first general proof in 1878, introducing the minimal polynomial along the way.

## Connections
- **Callbacks:** ↩ S1E10 (ℂ is algebraically closed), ↩ S1E18 (Euclid's algorithm and Bézout-style identities for polynomials), ↩ S1E19 (every field embeds in an algebraically closed one), ↩ S2E03 (the right shift has no eigenvalues), ↩ S2E05 (quotient spaces, $\dim\operatorname{Hom}(V,V) = n^2$), ↩ S2E11 (det of a triangular map), ↩ S2E12 (eigenvalues, characteristic polynomial)
- **Sets up:** ↪ S2E15 (Schur: triangularization in an orthonormal basis), ↪ S2E18 (self-adjoint maps never need the nilpotent nudge), ↪ S2E19 (SVD as the numerically stable alternative), ↪ S2E31 (spectrum replaces eigenvalues), ↪ S3E02 (Jordan form = structure theorem for modules over $F[x]$), ↪ S3E11 (the exponential map of a Lie group)
- **Side quests:** Graphs as matrices (attaches after S2E12: defective adjacency matrices of directed graphs)

## References
- **Primary / historical:** Camille Jordan, *Traité des substitutions et des équations algébriques*, Gauthier-Villars, Paris (1870).
- **Primary / historical:** Arthur Cayley, "A Memoir on the Theory of Matrices," *Philosophical Transactions of the Royal Society of London* 148 (1858).
- **Textbook:** Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer (2024), Chapter 8 "Operators on Complex Vector Spaces" (generalized eigenvectors, nilpotent operators, generalized eigenspace decomposition, Cayley–Hamilton, Jordan form).
- **Textbook:** Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., Prentice-Hall (1971), Chapter 6 "Elementary Canonical Forms" (minimal polynomial, Cayley–Hamilton, primary decomposition) and Chapter 7 "The Rational and Jordan Forms."
- **Textbook:** David S. Dummit and Richard M. Foote, *Abstract Algebra*, 3rd ed., Wiley (2004), Chapter 12, Section 12.3 "The Jordan Canonical Form" (via modules over $F[x]$).
- **Accessible:** Cleve Moler and Charles Van Loan, "Nineteen Dubious Ways to Compute the Exponential of a Matrix, Twenty-Five Years Later," *SIAM Review* 45(1) (2003).
- **Historical:** Thomas Hawkins, "Weierstrass and the Theory of Matrices," *Archive for History of Exact Sciences* 17 (1977).
