# S3E02: One Theorem, Two Classifications

> **Season / Act:** Season 3, Act I (Algebra Meets Linear Algebra) · **Target runtime:** 22–25 min ·
> **Prerequisites:** S1E16–S1E18 (groups, quotient groups, rings and ideals), S3E01 (fields as vector spaces), S2E01–S2E06 (vector spaces through covectors), S2E12–S2E13 (eigenvectors, Jordan form, minimal polynomial); outside knowledge: the Euclidean algorithm ·
> **Builds toward:** S3E03 (representations are modules over a group algebra), S3E09 (cohomology groups and their torsion), S3E12 (category theory: modules as the prototypical "category of linear objects")

## Learning objectives
By the end of this lesson the viewer can:
1. Encode and decode with the Hamming(7,4) code, explaining each parity check as a linear functional on $\mathbb{F}_2^7$ and the code as a kernel.
2. Define a module over a ring, prove that $\mathbb{Z}$-modules are exactly abelian groups, and prove that $\mathbb{Z}/2\mathbb{Z}$ has no basis as a $\mathbb{Z}$-module.
3. State the structure theorem for finitely generated modules over a PID in both invariant-factor and elementary-divisor form, and compute it via Smith normal form.
4. Read the same theorem twice: as the classification of finitely generated abelian groups (over $\mathbb{Z}$), and as the rational and Jordan canonical forms of a linear operator (over $F[x]$).

## Cold open
*(Narrator. Split screen. On the left, a blackboard from Season 1; on the right, one from Season 2.)*

Two puzzles, from two different seasons.

On the left: how many essentially different abelian groups have 144 elements? Clock arithmetic $\mathbb{Z}/144$ is one. $\mathbb{Z}/12 \times \mathbb{Z}/12$ is another. Are there more? How would you ever be sure you'd listed them all?

On the right: take every $3 \times 3$ matrix whose only eigenvalue is 2. Some are diagonalizable, like $2I$. Some are not, like the shear-ish ones from Season 2. How many genuinely different linear maps are hiding in there, once you're allowed to change basis?

These look like they have nothing to do with each other. One is about counting symmetries. The other is about stretching space.

Tonight they're going to turn out to be the same question, with the same answer, proved by the same algorithm. To see it, we have to do something we've been carefully avoiding for two seasons. We have to let the scalars stop being a field. And when we do, the very first casualty will be the thing Season 2 was built on: the basis.

## The story

### 1. Warm-up: change the scalars to $\mathbb{F}_2$
Season 2 insisted that scalars come from a field, any field (↩ S2E01). Let's take that seriously with the smallest one, $\mathbb{F}_2 = \{0, 1\}$ with $1 + 1 = 0$ (↩ S1E19). Vectors in $\mathbb{F}_2^7$ are 7-bit strings, and adding is bitwise XOR.

**The engineering problem.** Send 4 bits over a noisy channel that may flip one bit. Repeating each bit three times works but triples the cost. Hamming's 1950 solution is a subspace.

Define three linear functionals (↩ S2E06) $\phi_1, \phi_2, \phi_4 : \mathbb{F}_2^7 \to \mathbb{F}_2$ by
$$\phi_1(c) = c_1 + c_3 + c_5 + c_7,\quad \phi_2(c) = c_2 + c_3 + c_6 + c_7,\quad \phi_4(c) = c_4 + c_5 + c_6 + c_7.$$
Each is a **parity check**: it measures whether a certain set of bits has an even number of 1s. Stack them into a matrix (rows are covectors):
$$H = \begin{pmatrix} 0&0&0&1&1&1&1\\ 0&1&1&0&0&1&1 \\ 1&0&1&0&1&0&1\end{pmatrix} \quad\begin{matrix}\leftarrow \phi_4\\ \leftarrow\phi_2 \\ \leftarrow\phi_1\end{matrix}$$
Column $j$ of $H$ is the number $j$ written in binary (top row = 4s bit). The **Hamming(7,4) code** is
$$C = \ker H = \{c \in \mathbb{F}_2^7 : Hc = 0\},$$
the set of words passing all three checks. $H$ has rank 3 (its columns 1, 2 and 4 are the three standard basis vectors of $\mathbb{F}_2^3$), so by rank–nullity (↩ S2E03) $\dim C = 7 - 3 = 4$: exactly $2^4 = 16$ codewords, one per 4-bit message.

**Decoding is linear algebra.** If codeword $c$ is sent and bit $j$ is flipped, we receive $r = c + e_j$, and
$$Hr = Hc + He_j = 0 + (\text{column } j \text{ of } H) = j \text{ in binary}.$$
The **syndrome** $Hr$ literally spells out the address of the error. Because no column of $H$ is zero and no two are equal, every nonzero codeword has weight at least 3 (a codeword of weight 1 or 2 would mean one column is zero or two columns are equal), so any two codewords differ in at least 3 places. Counting: the 16 codewords, each with its 7 one-bit corruptions, account for $16 \times 8 = 128 = 2^7$ words, all of $\mathbb{F}_2^7$. The code is **perfect**: no wasted space. Worked Example 1 runs it.

Everything worked because $\mathbb{F}_2$ is a field: rank–nullity, bases, dimension. Now let's push further and see what breaks.

### 2. Modules: vector spaces over a ring
> **Definition (module).** Let $R$ be a commutative ring with $1$ (↩ S1E18). An **$R$-module** is an abelian group $(M, +)$ with a scalar multiplication $R \times M \to M$ such that, for all $r, s \in R$ and $m, n \in M$:
> $$r(m + n) = rm + rn,\quad (r + s)m = rm + sm,\quad (rs)m = r(sm),\quad 1m = m.$$

These are word-for-word the vector-space axioms. A module over a field *is* a vector space. The only change is that scalars may fail to have inverses. Linear maps carry over unchanged (now called **$R$-module homomorphisms**), as do submodules, quotient modules $M/N$ (↩ S2E05, S1E17), kernels, images, and the first isomorphism theorem.

Two examples will carry the episode.

> **Proposition.** A $\mathbb{Z}$-module is the same thing as an abelian group.

**Proof.** Every $\mathbb{Z}$-module is in particular an abelian group. Conversely, let $A$ be an abelian group. The axioms *force* the scalar multiplication: $1 \cdot a = a$, and then $n \cdot a = (1 + \dots + 1)a = a + \dots + a$ ($n$ times) for $n > 0$, $0 \cdot a = 0$, and $(-n)a = -(na)$. So there is at most one $\mathbb{Z}$-module structure, and the formulas define one: the four axioms are the familiar exponent laws $n(a+b) = na + nb$, $(m+n)a = ma + na$, $(mn)a = m(na)$, $1a = a$, which hold in any abelian group (commutativity is needed for the first). Group homomorphisms are automatically $\mathbb{Z}$-linear, since $f(na) = nf(a)$ follows from additivity. $\blacksquare$

So all of the group theory of abelian groups from S1E16–17 is "linear algebra over $\mathbb{Z}$."

> **Proposition.** Let $V$ be a vector space over a field $F$ and $T: V \to V$ a linear map. Then $V$ becomes an $F[x]$-module via $p(x)\cdot v = p(T)v$. Conversely, every $F[x]$-module is a vector space $V$ with a chosen linear map $T$ (namely, "multiplication by $x$").

This is the seed planted in S2E13 (↩ S2E13): **the operator $T$ acts like the variable $x$**. Submodules are exactly $T$-invariant subspaces; module isomorphisms $V \to W$ are invertible linear maps $P$ with $PT = T'P$, i.e., **change of basis**. So classifying $F[x]$-modules up to isomorphism *is* classifying linear operators up to similarity.

### 3. The crisis: what fields were silently giving us
**"What did we lose?"** In a vector space, every spanning set contains a basis, every independent set extends to a basis, and every subspace has a complement. Over a ring, all three fail.

> **Definition.** A subset $\{m_1, \dots, m_k\}$ of an $R$-module is **linearly independent** if $r_1m_1 + \dots + r_km_k = 0$ implies all $r_i = 0$, and a **basis** if it is independent and spans. A module with a basis is **free**; a free module with a basis of size $n$ is isomorphic to $R^n$.

> **Proposition.** The $\mathbb{Z}$-module $\mathbb{Z}/2\mathbb{Z}$ has no basis.

**Proof.** The module has two elements, $\bar0$ and $\bar1$. The empty set spans only $\{\bar0\}$, so it is not a basis. Any nonempty subset contains $\bar0$ or $\bar1$. A set containing $\bar0$ is dependent ($1\cdot\bar0 = \bar0$ with $1 \ne 0$). The set $\{\bar1\}$ is dependent too: $2 \cdot \bar1 = \bar0$ with the scalar $2 \ne 0$ in $\mathbb{Z}$. So no subset is both independent and spanning. $\blacksquare$

The culprit is **torsion**: a nonzero element killed by a nonzero scalar. In a vector space, $rv = 0$ with $r \ne 0$ forces $v = r^{-1}rv = 0$. That one line, *dividing by a scalar*, is what fields were silently giving us in every proof of Season 2.

More losses:
- **No complements.** The submodule $2\mathbb{Z} \subset \mathbb{Z}$ has no complement: any nonzero submodule $n\mathbb{Z}$ meets $2\mathbb{Z}$ in $2n\mathbb{Z} \ne 0$.
- **Spanning sets don't shrink to bases.** $\{2, 3\}$ spans $\mathbb{Z}$ (since $3 - 2 = 1$), but it is dependent ($3 \cdot 2 - 2 \cdot 3 = 0$), and neither $\{2\}$ nor $\{3\}$ spans.

What survives? Over a **principal ideal domain** (PID: an integral domain in which every ideal is generated by one element, such as $\mathbb{Z}$ and $F[x]$), a remarkable amount, and the replacement for "dimension" is the subject of the main theorem.

### 4. The structure theorem
> **Theorem (Structure theorem for finitely generated modules over a PID).** Let $R$ be a PID and $M$ a finitely generated $R$-module.
>
> **(Invariant factor form)** There are a unique integer $r \ge 0$ and nonzero non-units $d_1 \mid d_2 \mid \dots \mid d_k$ in $R$, unique up to multiplication by units, with
> $$M \cong R^r \oplus R/(d_1) \oplus R/(d_2) \oplus \dots \oplus R/(d_k).$$
> **(Elementary divisor form)** Equivalently, $M \cong R^r \oplus \bigoplus_{i} R/(p_i^{a_i})$, where the $p_i$ are primes of $R$ (not necessarily distinct) and the list of prime powers $p_i^{a_i}$ is unique up to order and units.

$r$ is the **rank** (the free part, a genuine "dimension"); the $d_i$ are the **invariant factors**; the $p_i^{a_i}$ are the **elementary divisors**. The two forms are translated by the Chinese Remainder Theorem: if $a, b$ are coprime then $R/(ab) \cong R/(a) \oplus R/(b)$. So each $d_i$ splits into its prime-power pieces, and conversely you rebuild the $d_i$ by taking the largest power of each prime for $d_k$, the next largest for $d_{k-1}$, and so on.

**How to compute it: presentations and Smith normal form.** Pick generators $g_1, \dots, g_n$ of $M$; this gives a surjection $R^n \to M$. Its kernel $K$ is the module of **relations**. Over a PID, $K$ is again finitely generated (submodules of $R^n$ are free of rank $\le n$; we take this from the references), so we can list relations as the columns of an $n \times m$ matrix $A$, and
$$M \cong R^n / A R^m.$$

> **Theorem (Smith normal form).** If $R$ is a Euclidean domain (such as $\mathbb{Z}$ or $F[x]$) and $A$ is an $n \times m$ matrix over $R$, there are invertible matrices $P$ ($n\times n$) and $Q$ ($m \times m$) over $R$ with
> $$PAQ = \begin{pmatrix} d_1 & & & \\ & \ddots & & \\ & & d_s & \\ & & & 0 \end{pmatrix}, \qquad d_1 \mid d_2 \mid \dots \mid d_s,\ d_i\neq 0.$$
> The $d_i$ are unique up to units: $d_1d_2\cdots d_j = D_j(A)$, the gcd of all $j \times j$ minors of $A$.

**Proof sketch.** Allowed moves are invertible row and column operations: swap, add an $R$-multiple of one row (column) to another, multiply by a unit. Row operations are left multiplication by invertible matrices (a change of generators of $M$), column operations are right multiplication (a change of the list of relations). Choose a nonzero entry of smallest "size" ($|\cdot|$ on $\mathbb{Z}$, degree on $F[x]$) and move it to the corner. Divide every other entry of its row and column by it, and subtract; any nonzero remainder is smaller, so move it to the corner and repeat. Size is a nonnegative integer, so this terminates with the corner entry $d_1$ alone in its row and column. If $d_1$ fails to divide some other entry, add that row to the first row and repeat (the corner then gets strictly smaller). Recurse on the remaining block. Uniqueness: an elementary row or column operation does not change the gcd $D_j$ of the $j\times j$ minors (each new minor is an $R$-combination of old ones, and the operation is reversible), and for a diagonal matrix with $d_1\mid\dots\mid d_s$ one checks $D_j = d_1\cdots d_j$. $\blacksquare$

Since $P$ and $Q$ are invertible, $P$ maps $A R^m$ onto $PAQ\,R^m$, so
$$M \cong R^n/AR^m \cong R^n / (PAQ)R^m \cong R/(d_1) \oplus \dots \oplus R/(d_s) \oplus R^{n - s},$$
where factors with $d_i$ a unit are zero and can be dropped. That is the existence half of the structure theorem, delivered by an algorithm. Worked Example 2 carries it out completely.

### 5. Reading 1: $R = \mathbb{Z}$, finitely generated abelian groups
Over $\mathbb{Z}$, primes are primes, and the theorem says: **every finitely generated abelian group is**
$$\mathbb{Z}^r \oplus \mathbb{Z}/d_1 \oplus \dots \oplus \mathbb{Z}/d_k, \qquad d_1 \mid d_2 \mid \dots \mid d_k,$$
**in exactly one way.** The cold-open question becomes arithmetic. A finite abelian group of order 144 $= 2^4 \cdot 3^2$ is determined by a partition of 4 (how to split the 2-power) and a partition of 2 (how to split the 3-power). There are $p(4) \cdot p(2) = 5 \cdot 2 = 10$ abelian groups of order 144, up to isomorphism. Two of them are $\mathbb{Z}/144$ (partitions $4$ and $2$) and $\mathbb{Z}/12 \oplus \mathbb{Z}/12$ (partitions $2+2$ and $1+1$).

### 6. Reading 2: $R = F[x]$, canonical forms
Let $V$ be a finite-dimensional vector space over $F$ with operator $T$, viewed as an $F[x]$-module. It is finitely generated (a basis generates it) and it is torsion ($r = 0$): Cayley–Hamilton says $\chi_T(x)$ kills every vector. So
$$V \cong F[x]/(d_1) \oplus \dots \oplus F[x]/(d_k), \qquad d_1 \mid \dots \mid d_k \text{ monic}.$$
Now read each summand as a linear map.

**A cyclic summand is a companion matrix.** On $F[x]/(d)$ with $d = x^n + a_{n-1}x^{n-1} + \dots + a_0$, multiplication by $x$ sends the basis $1, x, \dots, x^{n-1}$ to $x, x^2, \dots, x^n = -a_0 - a_1x - \dots - a_{n-1}x^{n-1}$. Its matrix is the companion matrix
$$C(d) = \begin{pmatrix} 0 & & & -a_0 \\ 1 & 0 & & -a_1 \\ & \ddots & \ddots & \vdots \\ & & 1 & -a_{n-1}\end{pmatrix}.$$
(We met one in S3E01: multiplication by $\theta$ in $\mathbb{F}_8$.) Stacking these gives the **rational canonical form** $C(d_1) \oplus \dots \oplus C(d_k)$, which exists over *any* field. The last invariant factor $d_k$ is the **minimal polynomial**, and the product $d_1\cdots d_k$ is the **characteristic polynomial**.

**A primary summand is a Jordan block.** On $F[x]/((x - \lambda)^k)$, use the basis
$$v_1 = (x-\lambda)^{k-1},\ v_2 = (x-\lambda)^{k-2},\ \dots,\ v_k = 1.$$
Then $(x - \lambda)v_1 = (x-\lambda)^k = 0$ and $(x - \lambda)v_j = v_{j-1}$ for $j \ge 2$. So $x v_1 = \lambda v_1$ and $x v_j = \lambda v_j + v_{j-1}$: the matrix of $x$ is the Jordan block
$$J_k(\lambda) = \begin{pmatrix} \lambda & 1 & & \\ & \lambda & \ddots & \\ & & \ddots & 1 \\ & & & \lambda\end{pmatrix}.$$
When $F$ is algebraically closed (e.g. $\mathbb{C}$, ↩ S1E10), every prime of $F[x]$ is $x - \lambda$, so the elementary-divisor form is exactly the **Jordan normal form** of S2E13, and it is unique up to the order of blocks. To compute it, take the Smith normal form of the matrix $xI - A$ over $F[x]$; its diagonal entries are the invariant factors of $T$ (because $xI - A$ is a relation matrix for the $F[x]$-module $V$: we take this standard fact from Dummit & Foote, §12.2).

### 7. Payoff: the dictionary
The two columns from the cold open merge into one statement.

| Over $\mathbb{Z}$ (Season 1) | Over $F[x]$ (Season 2) |
|---|---|
| abelian group $A$ | vector space $V$ with operator $T$ |
| prime $p$ | irreducible polynomial, e.g. $x - \lambda$ |
| cyclic group $\mathbb{Z}/n$ | cyclic subspace, companion matrix $C(d)$ |
| $\mathbb{Z}/p^k$ | Jordan block $J_k(\lambda)$ |
| order $\lvert A\rvert = d_1\cdots d_k$ | characteristic polynomial $= d_1\cdots d_k$ |
| exponent of $A$ (largest order) $= d_k$ | minimal polynomial $= d_k$ |
| $\mathbb{Z}/4 \oplus \mathbb{Z}/9 \cong \mathbb{Z}/36$ (CRT) | $J_2(1) \oplus J_2(2)$ is cyclic with $d = (x-1)^2(x-2)^2$ |
| $\mathbb{Z}/2 \oplus \mathbb{Z}/2 \not\cong \mathbb{Z}/4$ | $2I_2 \not\sim J_2(2)$ (diagonalizable vs. not) |
| isomorphism of groups | similarity $P^{-1}AP$ |

One more entry shows how tight the match is: an operator is diagonalizable exactly when its minimal polynomial $d_k$ is a product of *distinct* linear factors, and a finite abelian group is a product of cyclic groups of *prime* order exactly when its exponent $d_k$ is squarefree. **Jordan form is the classification of abelian groups, with polynomials in place of integers.**

## Worked examples

### Example 1: Hamming(7,4) encoding and one-bit error correction
Put the 4 data bits $d_1d_2d_3d_4$ in positions $3, 5, 6, 7$ and choose the parity bits in positions $1, 2, 4$ so that each check passes.

**Encode $1011$.** Set $c_3 = 1, c_5 = 0, c_6 = 1, c_7 = 1$. Then
- $c_1 = c_3 + c_5 + c_7 = 1 + 0 + 1 = 0$
- $c_2 = c_3 + c_6 + c_7 = 1 + 1 + 1 = 1$
- $c_4 = c_5 + c_6 + c_7 = 0 + 1 + 1 = 0$

The codeword is $c = 0110011$. Check: $Hc$ has entries $\phi_4 = c_4 + c_5 + c_6 + c_7 = 0+0+1+1 = 0$, $\phi_2 = c_2 + c_3 + c_6 + c_7 = 1 + 1 + 1 + 1 = 0$, $\phi_1 = c_1 + c_3 + c_5 + c_7 = 0 + 1 + 0 + 1 = 0$. ✓

**Corrupt bit 6.** Receive $r = 0110001$. Syndrome:
- $\phi_4(r) = r_4 + r_5 + r_6 + r_7 = 0 + 0 + 0 + 1 = 1$
- $\phi_2(r) = r_2 + r_3 + r_6 + r_7 = 1 + 1 + 0 + 1 = 1$
- $\phi_1(r) = r_1 + r_3 + r_5 + r_7 = 0 + 1 + 0 + 1 = 0$

Reading top to bottom, $110_2 = 6$. Flip bit 6 back to recover $0110011$, and read off the data bits in positions 3, 5, 6, 7: $1011$. ✓ (All 16 codewords were checked in Python to satisfy $Hc = 0$, with minimum nonzero weight 3.)

A generator matrix (rows are the encodings of $1000, 0100, 0010, 0001$) is
$$G = \begin{pmatrix} 1&1&1&0&0&0&0\\ 1&0&0&1&1&0&0\\ 0&1&0&1&0&1&0\\ 1&1&0&1&0&0&1\end{pmatrix},\qquad HG^{\mathsf T} = 0.$$
The row space of $G$ is the code; $H$ is a basis of its annihilator in the dual space (↩ S2E08).

### Example 2: an abelian group from its relations, via Smith normal form
Let $G$ be the abelian group with generators $a, b, c$ and relations given by the columns of
$$A = \begin{pmatrix} 2 & 4 & 4 \\ -6 & 6 & 12 \\ 10 & -4 & -16\end{pmatrix},$$
i.e. $2a - 6b + 10c = 0$, $4a + 6b - 4c = 0$, $4a + 12b - 16c = 0$. So $G = \mathbb{Z}^3 / A\mathbb{Z}^3$. Every step below was checked in Python.

**Step 1.** The corner entry $2$ divides every entry of $A$ (all entries are even), so it will be $d_1$. Clear its column: $R_2 \leftarrow R_2 + 3R_1$, $R_3 \leftarrow R_3 - 5R_1$:
$$\begin{pmatrix} 2 & 4 & 4 \\ 0 & 18 & 24 \\ 0 & -24 & -36\end{pmatrix}.$$
**Step 2.** Clear its row: $C_2 \leftarrow C_2 - 2C_1$, $C_3 \leftarrow C_3 - 2C_1$:
$$\begin{pmatrix} 2 & 0 & 0 \\ 0 & 18 & 24 \\ 0 & -24 & -36\end{pmatrix}.$$
**Step 3.** In the block $\begin{pmatrix}18 & 24\\-24 & -36\end{pmatrix}$ the gcd of entries is 6, but no entry equals $\pm 6$. Create one: $R_3 \leftarrow R_3 + R_2$ gives row 3 $= (0, -6, -12)$:
$$\begin{pmatrix} 2 & 0 & 0 \\ 0 & 18 & 24 \\ 0 & -6 & -12\end{pmatrix}.$$
**Step 4.** Swap $R_2 \leftrightarrow R_3$, then $R_3 \leftarrow R_3 + 3R_2$ (row 3 becomes $(0, 18 - 18, 24 - 36) = (0, 0, -12)$):
$$\begin{pmatrix} 2 & 0 & 0 \\ 0 & -6 & -12 \\ 0 & 0 & -12\end{pmatrix}.$$
**Step 5.** $C_3 \leftarrow C_3 - 2C_2$, then multiply rows 2 and 3 by the unit $-1$:
$$\begin{pmatrix} 2 & 0 & 0 \\ 0 & 6 & 0 \\ 0 & 0 & 12\end{pmatrix}, \qquad 2 \mid 6 \mid 12.$$
**Conclusion.**
$$G \cong \mathbb{Z}/2 \oplus \mathbb{Z}/6 \oplus \mathbb{Z}/12, \qquad |G| = 144 = |\det A|.$$
**Cross-check with determinantal divisors.** $D_1 = \gcd(\text{entries}) = 2 = d_1$. ✓ $D_3 = |\det A| = 144 = 2 \cdot 6 \cdot 12$. ✓
**Elementary divisors.** $2 = 2$; $6 = 2 \cdot 3$; $12 = 4 \cdot 3$. So
$$G \cong \mathbb{Z}/2 \oplus \mathbb{Z}/2 \oplus \mathbb{Z}/4 \oplus \mathbb{Z}/3 \oplus \mathbb{Z}/3.$$
The 2-part corresponds to the partition $4 = 1 + 1 + 2$ and the 3-part to $2 = 1 + 1$: this is one of the 10 groups of order 144 from §5. It is neither $\mathbb{Z}/144$ nor $\mathbb{Z}/12 \oplus \mathbb{Z}/12$.

### Example 3: Jordan and rational forms of a matrix, via Smith normal form over $\mathbb{Q}[x]$
Let
$$A = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{pmatrix}, \qquad xI - A = \begin{pmatrix} x-2 & -1 & -1 \\ 0 & x-2 & 0 \\ 0 & 0 & x-2\end{pmatrix}.$$
It is not in Jordan form (the $1$ in the corner), and it is not diagonalizable: $A - 2I$ has rank 1, so the eigenspace for $2$ is only 2-dimensional. We reduce $xI - A$ over $\mathbb{Q}[x]$.

**Step 1.** Swap $C_1 \leftrightarrow C_2$ to bring the unit $-1$ to the corner, then multiply $R_1$ by $-1$:
$$\begin{pmatrix} 1 & 2-x & 1 \\ x-2 & 0 & 0 \\ 0 & 0 & x-2\end{pmatrix}.$$
**Step 2.** $R_2 \leftarrow R_2 - (x-2)R_1$. Row 2 becomes $(0,\ -(x-2)(2-x),\ -(x-2)) = (0,\ (x-2)^2,\ -(x-2))$:
$$\begin{pmatrix} 1 & 2-x & 1 \\ 0 & (x-2)^2 & -(x-2) \\ 0 & 0 & x-2\end{pmatrix}.$$
**Step 3.** Clear row 1: $C_2 \leftarrow C_2 - (2-x)C_1$ and $C_3 \leftarrow C_3 - C_1$ (column 1 is zero below the corner, so nothing else changes):
$$\begin{pmatrix} 1 & 0 & 0 \\ 0 & (x-2)^2 & -(x-2) \\ 0 & 0 & x-2\end{pmatrix}.$$
**Step 4.** In the $2\times2$ block, swap $C_2 \leftrightarrow C_3$: $\begin{pmatrix} -(x-2) & (x-2)^2 \\ x-2 & 0\end{pmatrix}$. Then $C_3 \leftarrow C_3 + (x-2)C_2$: $\begin{pmatrix} -(x-2) & 0 \\ x-2 & (x-2)^2\end{pmatrix}$. Then $R_3 \leftarrow R_3 + R_2$ and $R_2 \leftarrow -R_2$:
$$\begin{pmatrix} 1 & 0 & 0 \\ 0 & x-2 & 0 \\ 0 & 0 & (x-2)^2\end{pmatrix}.$$
(`sympy`'s `smith_normal_form` over `QQ[x]` agrees.)

**Read it off.**
- Invariant factors: $x - 2 \mid (x-2)^2$. Minimal polynomial $(x-2)^2$; characteristic polynomial $(x-2)^3$.
- $V \cong \mathbb{Q}[x]/(x-2) \oplus \mathbb{Q}[x]/((x-2)^2)$.
- Jordan form: $J_1(2) \oplus J_2(2) = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 2 & 1 \\ 0 & 0 & 2\end{pmatrix}$ (up to block order).
- Rational canonical form: $C(x-2) \oplus C(x^2 - 4x + 4) = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 0 & -4 \\ 0 & 1 & 4\end{pmatrix}$.

**Sanity check without Smith form.** $(A - 2I)^2 = 0$ but $A - 2I \ne 0$, so the minimal polynomial is $(x-2)^2$; the largest Jordan block has size 2, and $\dim\ker(A - 2I) = 2$ says there are two blocks. Sizes $2 + 1 = 3$. ✓ The group-theory twin: $\mathbb{Z}/p \oplus \mathbb{Z}/p^2$.

### Example 4: the same classification, read in both languages
Let $T$ on $\mathbb{Q}^4$ have Jordan form $J = J_1(1) \oplus J_1(2) \oplus J_2(2)$.

**Elementary divisors:** $(x-1),\ (x-2),\ (x-2)^2$.

**Invariant factors.** Build $d_k$ from the highest power of each prime: $d_2 = (x-1)(x-2)^2 = x^3 - 5x^2 + 8x - 4$. Then $d_1$ from what's left: $d_1 = x - 2$. Check divisibility: $(x - 2) \mid (x-1)(x-2)^2$. ✓ Check degrees: $1 + 3 = 4$. ✓

**Rational canonical form.** With $d_2 = x^3 - 5x^2 + 8x - 4$, i.e. $a_0 = -4, a_1 = 8, a_2 = -5$, the companion matrix has last column $(-a_0, -a_1, -a_2) = (4, -8, 5)$:
$$R = \begin{pmatrix} 2 & & & \\ & 0 & 0 & 4 \\ & 1 & 0 & -8 \\ & 0 & 1 & 5\end{pmatrix}.$$
`sympy` confirms that $xI - J$ and $xI - R$ have the same Smith form $\operatorname{diag}(1, 1, x-2, x^3 - 5x^2 + 8x - 4)$, so $J \sim R$.

**The group-theory twin.** Replace $x - 1 \mapsto 2$ and $x - 2 \mapsto 3$: elementary divisors $2, 3, 9$, i.e. $\mathbb{Z}/2 \oplus \mathbb{Z}/3 \oplus \mathbb{Z}/9$; invariant factors $3 \mid 18$, i.e. $\mathbb{Z}/3 \oplus \mathbb{Z}/18$. Same bookkeeping, same CRT. The cyclic summand $\mathbb{Z}/18 \cong \mathbb{Z}/2 \oplus \mathbb{Z}/9$ corresponds to the cyclic subspace on which $T$ acts by the $3\times 3$ companion matrix of $(x-1)(x-2)^2$, which splits as $J_1(1) \oplus J_2(2)$.

## Visual and animation notes
1. **Cold open split screen:** left, a ring of 144 clock positions and a $12\times12$ torus grid; right, a grid being sheared by different matrices with eigenvalue 2. A faint seam down the middle.
2. **Hamming code:** a 7-bit string as 7 lamps arranged in a Venn diagram of three circles (the three parity checks, drawn as orange covector "stacks" from S2). Flip one lamp; exactly the circles containing it light up red, and their binary label (4, 2, 1) sums to the lamp's address.
3. **"Change the scalars":** the S2 "vector space" stamp tries to land on $\mathbb{Z}/2$ and bounces off; a "What did we lose?" ledger appears: *bases, complements, dimension*.
4. **Torsion:** an arrow in $\mathbb{Z}/2$ is scaled by 2 and collapses to the origin, with a "÷2 not allowed" sign over the scalar line $\mathbb{Z}$.
5. **Smith normal form:** the $3\times3$ integer matrix with entries animating through each row/column operation; row operations tinted blue (change of generators), column operations tinted orange (change of relations). Final diagonal $2, 6, 12$ glows; the group decomposes into three clock faces of sizes 2, 6, 12, which then split (CRT) into clocks of sizes 2, 2, 4, 3, 3.
6. **Jordan side:** the polynomial matrix $xI - A$ reducing the same way; the diagonal $1, x-2, (x-2)^2$ glows and becomes Jordan blocks on a grid transformation (the "linear map" grid motif).
7. **The merge:** the two columns of the dictionary table slide together; matching rows fuse ("prime $p$" with "$x - \lambda$", "$\mathbb{Z}/p^k$" with "$J_k(\lambda)$"). This is the "aha" shot of the series: hold it.
8. **Invariant badges:** the invariant factors as a badge that stays put while the camera (basis/generators) churns underneath.

## Common misconceptions
- **Misconception:** "A module is just a vector space with a worse scalar ring; all the same theorems hold." **Reality:** bases, complements and the exchange lemma all fail in general. $\mathbb{Z}/2$ has no basis; $2\mathbb{Z} \subset \mathbb{Z}$ has no complement.
- **Misconception:** "A minimal spanning set is a basis." **Reality:** $\{2, 3\}$ minimally spans $\mathbb{Z}$ (remove either element and it no longer spans) but is dependent. Over a ring, "minimal spanning" and "maximal independent" no longer coincide.
- **Misconception:** "Invariant factors and elementary divisors are different invariants." **Reality:** they carry exactly the same information, translated by the Chinese Remainder Theorem.
- **Misconception:** "Jordan form needs eigenvectors; the module story is a different theory." **Reality:** Jordan blocks are the primary cyclic modules $F[x]/((x-\lambda)^k)$, and eigenvectors are the elements killed by $x - \lambda$.
- **Misconception:** "Rational canonical form is only for rational matrices." **Reality:** "rational" means it uses only field operations, so it exists over *any* field without needing roots of the characteristic polynomial; Jordan form needs the characteristic polynomial to split.

## Exercises
- **Warm-up (computational):** Find the Smith normal form of $\begin{pmatrix} 4 & 6 \\ 6 & 4\end{pmatrix}$ over $\mathbb{Z}$, and identify the abelian group $\mathbb{Z}^2/A\mathbb{Z}^2$ in both invariant-factor and elementary-divisor form.
- **Core (conceptual):** (a) List all abelian groups of order 72 and, in parallel, all possible Jordan forms of a $5 \times 5$ complex matrix with characteristic polynomial $(x-1)^3(x-2)^2$. Explain why the two lists have the same length. (b) Show that the Hamming code corrects any single error but cannot always correct two.
- **Stretch (proof or exploration):** Prove that $\mathbb{Q}$, as a $\mathbb{Z}$-module, is torsion-free but not free, and not finitely generated. Then explore: why does the structure theorem not contradict this?

<details><summary>Hints and answers</summary>

- **Warm-up:** $D_1 = \gcd(4, 6, 6, 4) = 2$; $D_2 = |\det A| = |16 - 36| = 20$. So the Smith form is $\operatorname{diag}(2, 10)$, and the group is $\mathbb{Z}/2 \oplus \mathbb{Z}/10 \cong \mathbb{Z}/2 \oplus \mathbb{Z}/2 \oplus \mathbb{Z}/5$. (Row ops: $R_2 \leftarrow R_2 - R_1$ gives $(2, -2)$; swap rows; clear.)
- **Core (a):** $72 = 2^3 \cdot 3^2$: partitions of 3 (three: $3$, $2+1$, $1+1+1$) times partitions of 2 (two), so 6 groups. Jordan forms: block sizes for eigenvalue 1 form a partition of 3, for eigenvalue 2 a partition of 2: also 6. Same count because it is the same theorem with $2 \leftrightarrow x-1$, $3 \leftrightarrow x-2$. **(b):** Two errors at positions $i \ne j$ give syndrome $i \oplus j$ (bitwise XOR), which is nonzero and points to a third position; e.g. errors at 1 and 2 give syndrome $3$, and "correcting" bit 3 produces a wrong codeword.
- **Stretch:** Torsion-free: $n q = 0$ with $n\ne0$ forces $q = 0$. Not finitely generated: finitely many fractions have a common denominator $N$, and $\frac{1}{2N}$ is not a $\mathbb{Z}$-combination of them. Not free: any two nonzero rationals $p/q, r/s$ satisfy the nontrivial relation $(rq)\cdot\frac{p}{q} - (ps)\cdot\frac{r}{s} = 0$, so a basis has at most one element, and $\mathbb{Z}\cdot\frac{p}{q} \ne \mathbb{Q}$. No contradiction: the theorem is only about finitely generated modules.

</details>

## Historical note
The two halves of this episode were discovered separately and only recognized as one theorem in the 1920s. On the integer side, Henry J. S. Smith introduced what we now call the Smith normal form in 1861 while studying systems of linear Diophantine equations; Kronecker (1870) and Frobenius and Stickelberger (1879) proved the decomposition of finite abelian groups into cyclic groups. On the linear-algebra side, Camille Jordan published his canonical form in the *Traité des substitutions et des équations algébriques* (1870), and Frobenius developed the "rational" version in the late 1870s. The unifying point of view, that both are statements about modules over a principal ideal domain, grew out of Emmy Noether's school in Göttingen in the 1920s and became standard through B. L. van der Waerden's *Moderne Algebra* (1930–31), which was based on lectures by Noether and Emil Artin. Hamming's codes came from a different world entirely: frustrated by weekend computer runs at Bell Labs that halted on detected-but-uncorrectable errors, Richard Hamming designed codes that could fix them, published in 1950.

## Connections
- **Callbacks:** ↩ S1E16 (abelian groups), ↩ S1E17 (quotient groups, first isomorphism theorem), ↩ S1E18 (rings, ideals, PIDs, quotient rings), ↩ S1E19 ($\mathbb{F}_2$), ↩ S1E10 ($\mathbb{C}$ is algebraically closed), ↩ S2E01 (vector space axioms), ↩ S2E02 (bases, exchange lemma), ↩ S2E03 (rank–nullity), ↩ S2E04 (similarity $P^{-1}AP$), ↩ S2E05 (quotient spaces), ↩ S2E06 (parity checks as covectors), ↩ S2E08 (annihilators), ↩ S2E12 (characteristic polynomial), ↩ S2E13 (Jordan form, minimal polynomial, Cayley–Hamilton, "$T$ acts like $x$"), ↩ S3E01 (companion matrix of $x^3+x+1$).
- **Sets up:** ↪ S3E03 (a representation of $G$ is a module over the group algebra $\mathbb{C}[G]$; Maschke's theorem says these modules *do* always have complements), ↪ S3E04 (finite abelian groups are products of cyclic groups, so their characters are products of DFT characters), ↪ S3E09 (homology and cohomology groups of spaces are finitely generated abelian groups; torsion appears for the projective plane), ↪ S3E12 (modules and their homomorphisms as a category).
- **Side quests:** "Linear algebra over $\mathbb{F}_2$: codes and puzzles" (Lights Out, Hamming codes); "Emmy Noether and the birth of abstract algebra" (history interlude).

## References
- **Primary / historical:** R. W. Hamming, "Error Detecting and Error Correcting Codes," *Bell System Technical Journal* 29 (1950). H. J. S. Smith, "On Systems of Linear Indeterminate Equations and Congruences," *Philosophical Transactions of the Royal Society of London* 151 (1861). C. Jordan, *Traité des substitutions et des équations algébriques* (Gauthier-Villars, 1870). B. L. van der Waerden, *Moderne Algebra* (Springer, 1930–31), the chapters on modules/elementary divisors.
- **Textbooks:** D. S. Dummit and R. M. Foote, *Abstract Algebra*, 3rd ed. (Wiley, 2004), Ch. 10 "Introduction to Module Theory" and Ch. 12 "Modules over Principal Ideal Domains" (§12.1 basic theory, §12.2 rational canonical form, §12.3 Jordan canonical form). M. Artin, *Algebra*, 2nd ed. (Pearson, 2011), Ch. 14 "Linear Algebra in a Ring" (integer matrices, Smith normal form, structure of abelian groups). F. J. MacWilliams and N. J. A. Sloane, *The Theory of Error-Correcting Codes* (North-Holland, 1977), Ch. 1 (linear codes, Hamming codes).
- **Accessible:** 3Blue1Brown (Grant Sanderson), "But what are Hamming codes? The origin of error correction" (YouTube, 2020). S. Axler, *Linear Algebra Done Right*, 3rd ed. (Springer, 2015), Ch. 8 (generalized eigenvectors and Jordan form, without modules: a good contrast).
