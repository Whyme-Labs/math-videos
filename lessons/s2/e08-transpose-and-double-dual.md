# S2E08: The Transpose and the Double Dual

> **Season / Act:** Season 2, Part A, Act II (Linear Functionals and Duality) · **Target runtime:** 15–25 min ·
> **Prerequisites:** ↩ S2E03 (kernel, image, rank–nullity), ↩ S2E04 (matrices in a basis), ↩ S2E06 (covectors, the dual space, dual bases), ↩ S2E07 (evaluation functionals); for the infinite-dimensional aside, ↩ S1E12 (the diagonal argument) ·
> **Builds toward:** ↪ S2E09 (bilinear forms as maps V → V*), ↪ S2E11 (det Aᵀ = det A), ↪ S2E16 (the adjoint), ↪ S2E24 (reflexivity), ↪ S3E07 (pullback of forms), ↪ S3E12 (natural transformations)

## Learning objectives
By the end of this lesson the viewer can:
1. Define the dual map $T^*: W^* \to V^*$ of a linear map $T: V \to W$, explain it as "measure after mapping," and prove that its matrix in dual bases is the transpose $A^{\mathsf T}$.
2. Compute annihilators, state $\dim U + \dim U^0 = \dim V$, and use $\ker T^* = (\operatorname{im} T)^0$ to prove that row rank equals column rank.
3. Construct the canonical map $V \to V^{**}$, prove it is an isomorphism in finite dimensions, and explain precisely why $V \cong V^*$ "requires a choice" while $V \cong V^{**}$ does not.
4. Explain why, for an infinite-dimensional space, the algebraic dual is strictly bigger than the space itself.

## Cold open
Every student learns the transpose in the first week of a matrix course: flip the grid across its diagonal. Rows become columns. Columns become rows. It takes three seconds, and then it shows up *everywhere*: in least squares, in the formula $(AB)^{\mathsf T} = B^{\mathsf T}A^{\mathsf T}$, in the definition of a symmetric matrix, in the fact that a matrix and its transpose always have the same rank.

That last one is strange, if you stop and think. The columns of a $2 \times 100$ matrix are a hundred vectors living in the plane. The rows are two vectors living in a hundred-dimensional space. Different numbers of vectors, different spaces, nothing obviously in common. Yet the number of independent columns *always* equals the number of independent rows. Why should a geometric fact survive a bookkeeping trick like flipping a table?

Here's the thing: flipping a table isn't a geometric operation. It depends on how you wrote the table down. So if "transpose" is meaningful, if it shows up in physics and statistics and geometry, it must be the shadow of something that doesn't need a table at all.

Today we find that something. And along the way we meet a space that is *naturally* the same as the one we started with, with no choices made. That word, "naturally," turns out to be one of the deepest ideas in mathematics.

## The story

### 1. Naive attempt: transpose as a grid operation

In ↩ S2E04 we learned that a matrix is a picture of a linear map taken in a chosen basis. If $T: V \to W$ has matrix $A$ in bases $(e_1,\dots,e_n)$ of $V$ and $(f_1,\dots,f_m)$ of $W$, then $A$ is $m \times n$ and column $j$ holds the coordinates of $T e_j$.

The transpose $A^{\mathsf T}$ is $n \times m$. If it is the matrix of a map, that map must go *from* an $m$-dimensional space *to* an $n$-dimensional space. Backwards. But $T$ goes from $V$ to $W$, and in general there is no way back: $T$ might not be invertible, might not be square, might crush half of $V$ to zero.

**The crisis.** Try the naive guess "$A^{\mathsf T}$ is the matrix of some map $W \to V$." Change bases in $V$ by $P$ and in $W$ by $Q$. Then $A$ becomes $Q^{-1}AP$ and its transpose becomes $P^{\mathsf T}A^{\mathsf T}(Q^{-1})^{\mathsf T}$. If $A^{\mathsf T}$ were the matrix of a map $W \to V$, it would change as $P^{-1}A^{\mathsf T}Q$. These agree only when $P^{\mathsf T} = P^{-1}$ and $Q^{\mathsf T} = Q^{-1}$, that is, for *orthogonal* changes of basis. But our vector spaces have no notion of orthogonality yet (that arrives in ↪ S2E14). So $A^{\mathsf T}$ is *not* the matrix of any well-defined map $W \to V$. It must be a map between some *other* pair of spaces.

### 2. The construction: measure after mapping

Recall from ↩ S2E06 that a covector $\psi \in W^*$ is a measuring device on $W$: a linear map $\psi: W \to F$. Given $T: V \to W$ and a measuring device on $W$, there is exactly one obvious way to build a measuring device on $V$: first map, then measure.

> **Definition (dual map).** For a linear map $T: V \to W$, the **dual map** (or **transpose**) $T^*: W^* \to V^*$ is
> $$T^*(\psi) = \psi \circ T, \qquad\text{i.e.}\qquad (T^*\psi)(v) = \psi(Tv).$$

Check that it lands in the right place: $\psi \circ T$ is a composition of linear maps, so it is linear $V \to F$, an element of $V^*$. And $T^*$ is itself linear: $(a\psi_1 + b\psi_2)\circ T = a(\psi_1\circ T) + b(\psi_2 \circ T)$.

Notice that **no basis was used**. The arrow reverses not by magic but because composition does: a measurement on the target becomes a measurement on the source. Two quick rules follow immediately from the definition:
- $(ST)^* = T^* S^*$, since $\psi \circ (S \circ T) = (\psi\circ S)\circ T$. This is the coordinate-free reason why $(AB)^{\mathsf T} = B^{\mathsf T}A^{\mathsf T}$: the order flips because measuring after two maps means peeling them off from the outside in.
- $(\mathrm{id}_V)^* = \mathrm{id}_{V^*}$, and so if $T$ is invertible then $(T^{-1})^* = (T^*)^{-1}$.

> **Theorem 1 (the transpose is the dual map in coordinates).** Let $T: V\to W$ have matrix $A$ in bases $(e_j)$ of $V$ and $(f_i)$ of $W$. Let $(e^j)$ and $(f^i)$ be the dual bases. Then the matrix of $T^*$ in the bases $(f^i)$ of $W^*$ and $(e^j)$ of $V^*$ is $A^{\mathsf T}$.

*Proof.* Column $i$ of the matrix of $T^*$ holds the coordinates of $T^* f^i$ in the basis $(e^j)$. A covector $\varphi \in V^*$ has coordinates $\varphi(e_1),\dots,\varphi(e_n)$ in the dual basis, because $\varphi = \sum_j \varphi(e_j)\,e^j$ (both sides agree on every $e_k$). So the $j$-th coordinate of $T^*f^i$ is
$$(T^*f^i)(e_j) = f^i(Te_j) = f^i\Big(\sum_k A_{kj} f_k\Big) = A_{ij}.$$
So entry $(j, i)$ of the matrix of $T^*$ is $A_{ij}$. That is exactly the transpose. $\blacksquare$

This resolves the crisis of Section 1. $A^{\mathsf T}$ changes as $P^{\mathsf T}A^{\mathsf T}(Q^{-1})^{\mathsf T}$ because changing the basis of $V$ by $P$ changes the dual basis of $V^*$ by $(P^{-1})^{\mathsf T}$, and similarly for $W^*$. The transpose was never a map $W \to V$. It is a map $W^* \to V^*$, and it transforms exactly as such a map should.

**The different perspective.** In the row/column language of ↩ S2E06, a row vector is a covector and "row times column" is "measurement applied to vector." Then $\psi A$ (a row times a matrix) is literally $\psi \circ T$: you pass a row through $A$ from the left. The transpose just rewrites that row as a column so that it can sit on the right of $A^{\mathsf T}$.

### 3. Annihilators, and why row rank equals column rank

To use $T^*$, we need to talk about the covectors that "can't see" a subspace.

> **Definition (annihilator).** For a subspace $U \subseteq V$, its **annihilator** is $U^0 = \{\varphi \in V^* : \varphi(u) = 0 \text{ for all } u \in U\}$.

Picture: in the stack-of-planes picture of a covector (↩ S2E06), $\varphi \in U^0$ means that $U$ lies entirely inside the zero level of $\varphi$. The measuring device is blind to $U$.

> **Lemma 2.** If $V$ is finite-dimensional and $U \subseteq V$ is a subspace, then $\dim U + \dim U^0 = \dim V$.

*Proof.* Choose a basis $u_1,\dots,u_k$ of $U$ and extend it to a basis $u_1,\dots,u_n$ of $V$ (↩ S2E02). Let $u^1,\dots,u^n$ be the dual basis. A covector $\varphi = \sum_i c_i u^i$ kills $U$ iff $\varphi(u_j) = c_j = 0$ for $j\le k$. So $U^0 = \operatorname{span}(u^{k+1},\dots,u^n)$, which has dimension $n - k$. $\blacksquare$

> **Lemma 3.** For $T: V \to W$: $\ker T^* = (\operatorname{im} T)^0$.

*Proof.* $T^*\psi = 0$ means $\psi(Tv) = 0$ for every $v \in V$, which says exactly that $\psi$ vanishes on $\operatorname{im} T$. $\blacksquare$

In words: a measurement on $W$ becomes the zero measurement on $V$ precisely when it is blind to everything $T$ can reach. A symmetric argument (using Lemma 2 and a dimension count) gives the companion fact $\operatorname{im} T^* = (\ker T)^0$ in finite dimensions.

> **Theorem 4 (row rank = column rank).** For $T: V \to W$ between finite-dimensional spaces, $\operatorname{rank} T^* = \operatorname{rank} T$. Consequently, for every matrix $A$, the dimension of the span of its rows equals the dimension of the span of its columns.

*Proof.* Apply rank–nullity (↩ S2E03) to $T^*: W^* \to V^*$, then Lemma 3, then Lemma 2 with $U = \operatorname{im} T \subseteq W$:
$$\operatorname{rank} T^* = \dim W^* - \dim\ker T^* = \dim W - \dim(\operatorname{im}T)^0 = \dim W - (\dim W - \dim \operatorname{im} T) = \operatorname{rank} T.$$
For a matrix $A$, the column rank is $\operatorname{rank}T$. By Theorem 1, the matrix of $T^*$ is $A^{\mathsf T}$, whose columns are the rows of $A$, so the row rank of $A$ is $\operatorname{rank}T^*$. $\blacksquare$

The answer to the cold open: the row space of $A$ is not a random set of vectors in a big space. It is the image of the dual map, the set of all measurements on $V$ that can be obtained as "map, then measure." It equals $(\ker T)^0$, the measurements that can't see the kernel. Its dimension is forced to be $\dim V - \dim \ker T$, which is the column rank. Two different-looking spaces have the same dimension because one is the shadow of the other under duality.

### 4. The double dual: a space that is naturally the same

Take duals twice. $V^{**} = (V^*)^*$ is the space of linear functions *on measurements*. Here is one way to make an element of $V^{**}$ out of a vector $v$: let it "measure the measurers."

> **Definition (evaluation map).** For $v \in V$ define $\operatorname{ev}_v \in V^{**}$ by $\operatorname{ev}_v(\varphi) = \varphi(v)$. The map $\iota_V : V \to V^{**}$, $v \mapsto \operatorname{ev}_v$, is the **canonical map** to the double dual.

This is the same move as the evaluation functionals of ↩ S2E07 ("evaluate a polynomial at $a$"), one level up: now the "points" are vectors and the "functions" are covectors. The pairing $\varphi(v)$ is symmetric in spirit: you can read it as $\varphi$ measuring $v$, or as $v$ testing $\varphi$.

> **Theorem 5.** $\iota_V$ is linear and injective. If $V$ is finite-dimensional, it is an isomorphism $V \cong V^{**}$.

*Proof.* Linearity: $\operatorname{ev}_{av+bw}(\varphi) = \varphi(av+bw) = a\varphi(v) + b\varphi(w)$. Injectivity: if $v \neq 0$, extend $v$ to a basis and let $\varphi$ be the first dual basis covector; then $\varphi(v) = 1 \ne 0$, so $\operatorname{ev}_v \ne 0$. (In infinite dimensions this step still works, using a basis extension that relies on the Axiom of Choice, ↩ S1E15.) If $\dim V = n$, then $\dim V^{**} = \dim V^* = n$, and an injective linear map between spaces of the same finite dimension is an isomorphism (rank–nullity). $\blacksquare$

The definition of $\iota_V$ mentions **no basis**. Contrast this with $V \cong V^*$. Both spaces have dimension $n$, so they are isomorphic, but every isomorphism you can write down needs extra data: a basis (send $e_i \mapsto e^i$), or a nondegenerate bilinear form (↪ S2E09), or an inner product (↪ S2E16). Worked Example 3 below shows that the basis recipe gives *different answers* for different bases, so it is genuinely a choice.

### 5. "Natural" versus "requires a choice"

What exactly makes $\iota$ special? Not just that it avoids bases in its definition, but that it is *compatible with every linear map*.

> **Naturality.** For every linear map $T: V \to W$, the square
> $$\begin{array}{ccc} V & \xrightarrow{\ \iota_V\ } & V^{**} \\ {\scriptstyle T}\downarrow & & \downarrow{\scriptstyle T^{**}} \\ W & \xrightarrow{\ \iota_W\ } & W^{**}\end{array}$$
> commutes: $T^{**}\circ\iota_V = \iota_W \circ T$.

*Proof.* For $v \in V$ and $\psi \in W^*$: $(T^{**}\operatorname{ev}_v)(\psi) = \operatorname{ev}_v(T^*\psi) = (\psi\circ T)(v) = \psi(Tv) = \operatorname{ev}_{Tv}(\psi)$. $\blacksquare$

Try to do the same for $V \to V^*$. A map $V \to V^*$ would have to be compared with $T: V \to W$, but the dual map goes the wrong way ($W^* \to V^*$), so there is not even a square to draw. No family of isomorphisms $V \to V^*$ can be compatible with all linear maps. That is the precise meaning of "requires a choice."

Eilenberg and Mac Lane invented category theory in 1945 largely to make sentences like this one precise. The double dual is their first motivating example of a **natural transformation** (↪ S3E12). For now we keep only the slogan:

> A **natural** isomorphism is one you could describe to someone who has not chosen any coordinates, and which every linear map respects.

### 6. Payoff and crack in the wall: infinite dimensions

Everything in Section 4 used $\dim V^{**} = \dim V$, which comes from counting a dual basis. In infinite dimensions that count fails.

Let $V = F[x]$, the polynomials, with basis $1, x, x^2, \dots$ (↩ S2E02). A covector $\varphi$ is determined by its values on the basis, and those values can be **any** sequence $(\varphi(1), \varphi(x), \varphi(x^2),\dots)$, since a polynomial is a *finite* combination of powers. So $V^* \cong F^{\mathbb N}$, the space of *all* sequences. The would-be dual basis $e^0, e^1, e^2, \dots$ spans only the sequences with finitely many nonzero terms: the functional "sum of all coefficients" $p \mapsto p(1)$ is not a finite combination of the $e^k$.

How much bigger? Take $F = \mathbb Q$. Then $V = \mathbb Q[x]$ is a countable set, while $V^* \cong \mathbb Q^{\mathbb N}$ is uncountable by Cantor's diagonal argument (↩ S1E12): list countably many sequences, change the $n$-th entry of the $n$-th one, and you have a sequence not on the list. So $V$ and $V^*$ can't even be in bijection, let alone isomorphic. (For general fields, the Erdős–Kaplansky theorem says that if $V$ has infinite dimension then $\dim V^* = |F|^{\dim V}$, which is always strictly larger than $\dim V$.) The canonical map $V \to V^{**}$ is still injective, but it is no longer onto.

This is a seed for Part B. In ↪ S2E24 we will restrict to *continuous* functionals on normed spaces. Then for some spaces (the "reflexive" ones, like $\ell^2$) the canonical map onto the double dual is restored, and for others (like $\ell^1$) it isn't.

## Worked examples

### Example 1: The dual map of a concrete map, and the row space as an annihilator
Let $T: \mathbb R^3 \to \mathbb R^2$ be $T(x, y, z) = (x + 2y + 3z,\ 4x + 5y + 6z)$, with matrix
$$A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6\end{pmatrix}.$$

**Compute $T^*$ on the dual basis.** Let $f^1, f^2$ be the coordinate covectors on $\mathbb R^2$. Then
$$(T^* f^1)(x,y,z) = f^1(T(x,y,z)) = x + 2y + 3z, \quad\text{so}\quad T^*f^1 = e^1 + 2e^2 + 3e^3,$$
$$(T^* f^2)(x,y,z) = 4x + 5y + 6z, \quad\text{so}\quad T^*f^2 = 4e^1 + 5e^2 + 6e^3.$$
The coordinate columns $(1,2,3)$ and $(4,5,6)$ are the columns of $A^{\mathsf T} = \begin{pmatrix}1&4\\2&5\\3&6\end{pmatrix}$, as Theorem 1 predicts. The rows of $A$ *are* the measurements $T^*f^i$.

**Kernel.** Solve $x + 2y + 3z = 0$ and $4x + 5y + 6z = 0$. Subtract 4 times the first from the second: $-3y - 6z = 0$, so $y = -2z$, then $x = -2y - 3z = 4z - 3z = z$. So $\ker T = \operatorname{span}\{(1,-2,1)\}$, and $\operatorname{rank}T = 3 - 1 = 2$.

**Check $\operatorname{im}T^* = (\ker T)^0$.** Both rows kill the kernel vector: $1 - 4 + 3 = 0$ and $4 - 10 + 6 = 0$. The rows are independent (neither is a multiple of the other), so they span a 2-dimensional subspace of $(\ker T)^0$, which has dimension $3 - 1 = 2$ by Lemma 2. Hence $\operatorname{im}T^* = (\ker T)^0$ and the row rank is $2$, equal to the column rank. Also $\ker T^* = (\operatorname{im}T)^0 = (\mathbb R^2)^0 = 0$, consistent with $A^{\mathsf T}$ having independent columns.

### Example 2: The dual of differentiation, measured by evaluation
Let $V = \mathcal P_2$ (polynomials of degree $\le 2$) with basis $1, x, x^2$, and let $D = d/dx: V \to V$. Since $D(1) = 0$, $D(x) = 1$, $D(x^2) = 2x$, the matrix is
$$[D] = \begin{pmatrix} 0 & 1 & 0\\ 0 & 0 & 2 \\ 0 & 0 & 0\end{pmatrix}.$$
Let $\varepsilon^0, \varepsilon^1, \varepsilon^2$ be the dual basis: $\varepsilon^k$ reads off the coefficient of $x^k$ (the Taylor-coefficient functionals of ↩ S2E07). Consider the evaluation functional $\delta_1(p) = p(1)$.

**Coordinate-free.** $D^*\delta_1 = \delta_1 \circ D$, which is $p \mapsto p'(1)$: "the slope at 1." Measure after mapping.

**In coordinates.** For $p = a_0 + a_1x + a_2x^2$, $\delta_1(p) = a_0 + a_1 + a_2$, so $\delta_1 = \varepsilon^0 + \varepsilon^1 + \varepsilon^2$ has coordinates $(1,1,1)$. Apply the transpose:
$$[D]^{\mathsf T}\begin{pmatrix}1\\1\\1\end{pmatrix} = \begin{pmatrix}0&0&0\\1&0&0\\0&2&0\end{pmatrix}\begin{pmatrix}1\\1\\1\end{pmatrix} = \begin{pmatrix}0\\1\\2\end{pmatrix}.$$
So $D^*\delta_1 = \varepsilon^1 + 2\varepsilon^2$, i.e. $p \mapsto a_1 + 2a_2$.

**Check.** $p'(x) = a_1 + 2a_2 x$, so $p'(1) = a_1 + 2a_2$. The coordinate-free answer and the transpose computation agree.

### Example 3: $V \cong V^*$ depends on the basis; $V \cong V^{**}$ does not
Work in $V = \mathbb R^2$ and write covectors as rows.

**Basis 1:** $e_1 = (1,0)$, $e_2 = (0,1)$. The dual basis is $e^1 = (1\ \ 0)$, $e^2 = (0\ \ 1)$. The recipe "$e_i \mapsto e^i$" sends $v = (1,0) = e_1$ to the covector $(1\ \ 0)$.

**Basis 2:** $b_1 = (1,0)$, $b_2 = (1,1)$. The dual basis $b^1, b^2$ is defined by $b^i(b_j) = \delta_{ij}$. Writing $b^1 = (p\ \ q)$: $b^1(b_1) = p = 1$ and $b^1(b_2) = p + q = 0$, so $b^1 = (1\ \ {-1})$. Similarly $b^2 = (r\ \ s)$ with $r = 0$, $r + s = 1$, so $b^2 = (0\ \ 1)$. (Equivalently, the rows of $P^{-1}$ where $P = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ has columns $b_1, b_2$: $P^{-1} = \begin{pmatrix}1&-1\\0&1\end{pmatrix}$.) The recipe "$b_i \mapsto b^i$" sends the **same** vector $v = (1,0) = b_1$ to $(1\ \ {-1})$.

**Conclusion.** Same vector, same recipe, two different covectors: $(1\ \ 0)$ versus $(1\ \ {-1})$. The first measures "the $x$-coordinate"; the second measures "$x - y$," which, for instance, gives $(1,1)$ the value $0$ instead of $1$. The isomorphism $V \to V^*$ was an artifact of the camera.

**The double dual doesn't care.** $\operatorname{ev}_v$ sends any covector $(p\ \ q)$ to $p\cdot 1 + q \cdot 0 = p$. No basis was consulted. In Basis 1 coordinates of $V^{**}$ (the dual basis of $(e^1, e^2)$), $\operatorname{ev}_v$ has coordinates $(\operatorname{ev}_v(e^1), \operatorname{ev}_v(e^2)) = (1, 0)$, the same as $v$. In Basis 2, $(\operatorname{ev}_v(b^1), \operatorname{ev}_v(b^2)) = (1, 0)$, which are again the coordinates of $v = 1\cdot b_1 + 0\cdot b_2$. Whatever basis you use, $\iota$ is "the identity in coordinates."

### Example 4: An annihilator in $\mathbb R^3$
Let $U = \operatorname{span}\{(1,0,1), (0,1,1)\}$. A covector $(a\ \ b\ \ c)$ lies in $U^0$ iff $a + c = 0$ and $b + c = 0$, so $a = b = -c$. Taking $c = -1$: $U^0 = \operatorname{span}\{(1\ \ 1\ \ {-1})\}$. Dimensions: $2 + 1 = 3$. Geometrically, $U$ is a plane, and $U^0$ is the line of covectors whose level planes are parallel to $U$: the one "direction of measurement" that can't see $U$. In equation form, $U = \{x + y - z = 0\}$, and we have recovered the equation of the plane.

## Visual and animation notes
1. **Cold open.** A $2 \times 7$ matrix appears; its seven columns fly out as arrows in a plane (blue), its two rows fly out as stacks of hyperplanes in a 7-dimensional "suggested" space (orange). A counter over each reads "rank 2." Question mark.
2. **Grid-flip fail.** The matrix flips across its diagonal; a camera (basis overlay, motif: *Basis / coordinates*) rotates and shears; the flipped grid and "the matrix of a map $W\to V$" diverge, with numbers turning red where they disagree.
3. **Measure after mapping.** Left: space $V$ with a blue arrow $v$. Middle: the grid-transform animation for $T$ (motif: *Linear map*) carries $v$ to $Tv$ in $W$. Right: an orange level-line stack $\psi$ sits in $W$. Then the stack is "pulled back": its level lines are dragged through $T$ in reverse and land in $V$ as a new orange stack $T^*\psi$. Counting crossings gives the same number on both sides.
4. **Annihilator.** A plane $U$ in 3D glows; orange stacks rotate until one stack's level planes are parallel to $U$; $U$ sits flat in the zero level. Label $U^0$.
5. **Row rank = column rank.** Rank–nullity bar diagram (from S2E03) on the left for $T$, and its "mirror" for $T^*$ on the right; the kernel bar of $T^*$ lights up as "$(\operatorname{im} T)^0$" and the two rank bars slide to equal length.
6. **Double dual.** A blue arrow $v$ walks along a row of orange stacks, "testing" each one and printing a number above it. Caption: *a vector is a way of measuring measurements.*
7. **Natural vs. choice.** Split screen: on the left, the commuting square for $\iota$ with a bijection-threads motif (*Bijection / isomorphism*) connecting $V$ to $V^{**}$; the threads stay put while a camera overlay changes. On the right, threads from $V$ to $V^*$ snap and re-tie every time the camera changes (Example 3 numbers on screen).
8. **Infinite-dimensional crack.** The diagonal-argument table (motif: *Diagonal argument*) appears with rows = countably many functionals on $\mathbb Q[x]$; the diagonal lights up and flips, producing a functional not on the list.
9. **Callback stamps:** ↩ S2E06 at shot 3, ↩ S2E03 at shot 5, ↩ S2E07 at shot 6, ↩ S1E12 at shot 8.

## Common misconceptions
- **Misconception:** The transpose of $T: V \to W$ is a map $W \to V$. **Reality:** It is a map $W^* \to V^*$. Only after an inner product identifies $V$ with $V^*$ (↪ S2E16) does it become a map $W \to V$, the adjoint, and that map depends on the inner product.
- **Misconception:** Since $V$ and $V^*$ have the same dimension, they are "the same space." **Reality:** They are isomorphic, but there is no preferred isomorphism. Different bases give different identifications (Example 3), and covectors transform differently from vectors under change of basis.
- **Misconception:** $V \cong V^{**}$ is just another case of "same dimension implies isomorphic." **Reality:** The point is that the isomorphism is canonical and commutes with every linear map. And in infinite dimensions the dimensions are *not* the same, yet the canonical map still exists (and is injective).
- **Misconception:** Row rank = column rank is a computational accident of Gaussian elimination. **Reality:** It is the statement $\operatorname{rank} T^* = \operatorname{rank} T$, a consequence of $\ker T^* = (\operatorname{im}T)^0$.
- **Misconception:** The dual basis vector $e^1$ depends only on $e_1$. **Reality:** It depends on the whole basis (Example 3: $b_1 = e_1$ but $b^1 \ne e^1$).

## Exercises
- **Warm-up (computational).** Let $T: \mathbb R^2 \to \mathbb R^3$, $T(x, y) = (x + y,\ 2x,\ x - y)$. Write the matrix of $T$, compute $T^*$ applied to each dual basis covector of $\mathbb R^3$, and verify that the resulting matrix is the transpose. Find $\ker T^*$ and check that it equals $(\operatorname{im} T)^0$.
- **Core (conceptual).** Show that $T$ is injective if and only if $T^*$ is surjective, and $T$ is surjective if and only if $T^*$ is injective (finite dimensions). Interpret both in the language of measurements.
- **Stretch (proof).** Let $U \subseteq V$ (finite-dimensional). Construct a natural isomorphism $(V/U)^* \cong U^0$ (↩ S2E05) and a natural isomorphism $V^*/U^0 \cong U^*$. Use them to give a second proof of Lemma 2.

<details><summary>Hints and answers</summary>

- **Warm-up.** $A = \begin{pmatrix}1&1\\2&0\\1&-1\end{pmatrix}$. $T^*f^1 = e^1 + e^2$, $T^*f^2 = 2e^1$, $T^*f^3 = e^1 - e^2$, so the matrix of $T^*$ is $\begin{pmatrix}1&2&1\\1&0&-1\end{pmatrix} = A^{\mathsf T}$. $\ker T^*$: solve $a + 2b + c = 0$, $a - c = 0$, giving $(a, b, c) = (1, -1, 1)$ up to scale. Check $(1\ \ {-1}\ \ 1)$ kills both columns of $A$: $1 - 2 + 1 = 0$ and $1 - 0 - 1 = 0$.
- **Core.** $T^*$ injective $\iff \ker T^* = 0 \iff (\operatorname{im}T)^0 = 0 \iff \operatorname{im}T = W$ (Lemma 2). For the other, use rank equality: $T$ injective $\iff \operatorname{rank}T = \dim V \iff \operatorname{rank}T^* = \dim V^*$. Meaning: $T$ is onto iff no nonzero measurement on $W$ is blind to everything $T$ hits; $T$ is one-to-one iff every measurement on $V$ can be realized as "map, then measure."
- **Stretch.** A functional on $V/U$ composed with the quotient map $V \to V/U$ is a functional on $V$ that kills $U$; conversely, a functional killing $U$ factors through the quotient. Restriction $V^* \to U^*$ is onto (extend a basis) with kernel $U^0$, then apply the First Isomorphism Theorem. Dimensions: $\dim U^0 = \dim (V/U)^* = \dim V - \dim U$.

</details>

## Historical note
The transpose of a matrix appears in Arthur Cayley's 1858 *A Memoir on the Theory of Matrices*, one of the founding documents of matrix algebra, where Cayley already notes that transposition reverses the order of a product. The notion of the rank of a matrix was systematized by Georg Frobenius in the late 1870s. The modern, coordinate-free view of the dual space and the transpose as a map between duals grew up with abstract linear algebra in the early twentieth century and was made standard by textbooks such as Halmos's *Finite-Dimensional Vector Spaces* (1942), which treats duality, annihilators, and "reflexivity" ($V \cong V^{**}$) before matrices. The most famous historical role of the double dual is philosophical: in their 1945 paper *General Theory of Natural Equivalences*, Samuel Eilenberg and Saunders Mac Lane pointed out that $V \cong V^{**}$ "is natural" while $V \cong V^*$ "is not," and they built category theory precisely to say what this means. Mac Lane later recalled that they invented categories in order to define functors, and functors in order to define natural transformations.

## Connections
- **Callbacks:** ↩ S2E02 (extending a basis, dimension), ↩ S2E03 (rank–nullity), ↩ S2E04 (matrices, change of basis), ↩ S2E05 (quotients, used in the stretch exercise), ↩ S2E06 (dual space and dual basis), ↩ S2E07 (evaluation functionals), ↩ S1E12 (Cantor's diagonal argument for the infinite-dimensional dual), ↩ S1E15 (Axiom of Choice for bases in infinite dimensions)
- **Sets up:** ↪ S2E09 (a bilinear form is a map $V \to V^*$, which is why forms change by $P^{\mathsf T}BP$), ↪ S2E11 ($\det T^* = \det T$), ↪ S2E16 (the adjoint is the dual map, transported by an inner product), ↪ S2E17 ($\ker A^{\mathsf T}$ and the normal equations), ↪ S2E24 (reflexive Banach spaces), ↪ S3E07 (pullback of differential forms is the dual map at every point), ↪ S3E12 (natural transformations)
- **Side quests:** Convex duality and optimization (attaches after S2E25; linear-programming duality is the transpose at work); Projective geometry (attaches after S2E05; points and hyperplanes are dual)

## References
- **Primary / historical:** Arthur Cayley, "A Memoir on the Theory of Matrices," *Philosophical Transactions of the Royal Society of London* 148 (1858).
- **Primary / historical:** Samuel Eilenberg and Saunders Mac Lane, "General Theory of Natural Equivalences," *Transactions of the American Mathematical Society* 58 (1945).
- **Textbook:** Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer (2024), Section 3F "Duality" (dual maps, annihilators, the matrix of the dual map, row rank = column rank).
- **Textbook:** Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., Van Nostrand (1958; Springer UTM reprint 1974), Chapter I (dual spaces, reflexivity, annihilators) and Chapter II (adjoints).
- **Textbook:** Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., Prentice-Hall (1971), Chapter 3, sections on linear functionals, the double dual, and the transpose of a linear transformation.
- **Textbook:** Steven Roman, *Advanced Linear Algebra*, 3rd ed., Springer GTM 135 (2008), chapter on the isomorphism theorems (dual spaces, annihilators, operator adjoints, and dimension of the algebraic dual in infinite dimensions).
- **Accessible:** Saunders Mac Lane, *Categories for the Working Mathematician*, 2nd ed., Springer GTM 5 (1998), Chapter I (the double-dual example of a natural transformation).
- **Accessible:** 3Blue1Brown (Grant Sanderson), *Essence of Linear Algebra* (2016), chapter 9 "Dot products and duality."
