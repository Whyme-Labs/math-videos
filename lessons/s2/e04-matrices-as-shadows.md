# S2E04: Matrices: Shadows of Maps

> **Season / Act:** Season 2, Part A, Act I: What Is Linear? · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E02 (bases, coordinates), S2E03 (linear maps, kernel, image, rank–nullity) ·
> **Builds toward:** S2E05 ($\operatorname{Hom}(V,W)$ as $m \times n$ matrices), S2E08 (the transpose), S2E09 (forms change by congruence, not similarity), S2E11 (determinant), S2E12–13 (eigenvalues, Jordan form), S2E19 (SVD)

## Learning objectives
By the end of this lesson the viewer can:
1. Write down the matrix of a linear map with respect to chosen bases ("column $j$ is where basis vector $j$ goes"), including for maps on polynomial spaces.
2. Derive the matrix multiplication rule from composition of linear maps, and explain why matrix multiplication is not commutative.
3. Compute the matrix of a map in a new basis using $P^{-1}AP$, and identify quantities (trace, determinant, rank) that do not depend on the basis.
4. Describe the solution set of $A\mathbf{x} = \mathbf{b}$ as a particular solution plus the kernel, and compute it.

## Cold open
"Here's a rule every student learns and almost nobody is told the reason for. To multiply two matrices, you take a *row* of the first and a *column* of the second, multiply entry by entry, and add.

"Why? Why not multiply entry by entry, like you'd add matrices? That would be simpler. Why rows of one and columns of the other? Who decided?

"Here's a second puzzle. Take a square, rotate it 90 degrees, then squash it flat onto the horizontal axis. Now do it in the other order: squash first, then rotate. You get different results, one shadow lying flat, one standing up. In matrix language, $AB \neq BA$. Teachers present that as a strange exception. It's not strange at all. Putting on socks then shoes is different from shoes then socks.

"The answer to both puzzles is the same, and it's the thesis of this episode: **a matrix is not a thing in itself.** It's a shadow. A linear map is a real object, and a matrix is the shadow it casts when you shine a light from one particular angle, a basis. Move the light, and the shadow changes while the object stays put. Matrix multiplication is the only rule that makes shadows of combined maps match combined shadows. Nobody chose it. It was forced."

## The story

### 1. The naive attempt: a matrix is a grid of numbers that acts on columns

In a first course, a matrix $A$ is an array and "$A\mathbf{x}$" is defined by a formula. That's a valid starting point, but it puts the cart before the horse: it makes the grid fundamental and leaves its rules looking arbitrary. Worse, it hides that most linear maps we care about (differentiation, rotation of a physical object, a change of variables) aren't given to us as grids at all. They become grids only after we choose bases.

### 2. The construction: the matrix of a map in chosen bases

Let $T : V \to W$ be linear, with $\mathcal{B} = (b_1, \dots, b_n)$ a basis of $V$ and $\mathcal{C} = (c_1, \dots, c_m)$ a basis of $W$. By the extension theorem (↩ S2E03), $T$ is determined by $T(b_1), \dots, T(b_n)$. Each $T(b_j)$ has coordinates in $\mathcal{C}$:
$$T(b_j) = a_{1j}\,c_1 + a_{2j}\,c_2 + \dots + a_{mj}\,c_m.$$

> **Definition (matrix of a linear map).** The **matrix of $T$ with respect to $\mathcal{B}$ and $\mathcal{C}$** is the $m \times n$ array $[T]_{\mathcal{C}\leftarrow\mathcal{B}} = (a_{ij})$. **Column $j$ is the $\mathcal{C}$-coordinate vector of $T(b_j)$: where basis vector $j$ goes.** When $V = W$ and $\mathcal{B} = \mathcal{C}$, we write $[T]_{\mathcal{B}}$.

> **Proposition (the matrix computes the map in coordinates).** For every $v \in V$,
> $$[T(v)]_{\mathcal{C}} = [T]_{\mathcal{C}\leftarrow\mathcal{B}}\;[v]_{\mathcal{B}},$$
> where the right side is the usual matrix–column product $(A\mathbf{x})_i = \sum_j a_{ij}x_j$.

*Proof.* If $v = \sum_j x_j b_j$, then $T(v) = \sum_j x_j T(b_j) = \sum_j x_j \sum_i a_{ij} c_i = \sum_i \big(\sum_j a_{ij} x_j\big) c_i$. The $i$-th coordinate is $\sum_j a_{ij}x_j$. $\blacksquare$

So "matrix times vector" is not an arbitrary rule either: $A\mathbf{x} = x_1(\text{column } 1) + \dots + x_n(\text{column } n)$, the combination of the images of the basis vectors with the coordinates of $v$ as weights. Matrix–vector multiplication *is* linear extension.

### 3. The payoff: composition forces "row times column"

Now take two maps, $T : U \to V$ and $S : V \to W$, with bases $\mathcal{A} = (a_1, \dots, a_p)$ of $U$, $\mathcal{B} = (b_1, \dots, b_n)$ of $V$, $\mathcal{C} = (c_1, \dots, c_m)$ of $W$. Let $[S]_{\mathcal{C}\leftarrow\mathcal{B}} = (s_{ik})$ and $[T]_{\mathcal{B}\leftarrow\mathcal{A}} = (t_{kj})$. What is the matrix of the composite $S \circ T : U \to W$?

> **Theorem (composition is multiplication).** $[S\circ T]_{\mathcal{C}\leftarrow\mathcal{A}} = [S]_{\mathcal{C}\leftarrow\mathcal{B}}\,[T]_{\mathcal{B}\leftarrow\mathcal{A}}$, where the product of an $m\times n$ and an $n \times p$ matrix is the $m \times p$ matrix with entries
> $$(ST)_{ij} = \sum_{k=1}^{n} s_{ik}\,t_{kj}.$$

*Proof.* Column $j$ of the matrix of $S\circ T$ is the $\mathcal{C}$-coordinates of $S(T(a_j))$. Compute:
$$S(T(a_j)) = S\Big(\sum_{k} t_{kj}\, b_k\Big) = \sum_k t_{kj}\, S(b_k) = \sum_k t_{kj} \sum_i s_{ik}\, c_i = \sum_i \Big(\sum_k s_{ik} t_{kj}\Big) c_i.$$
The coefficient of $c_i$ is $\sum_k s_{ik}t_{kj}$: row $i$ of $[S]$ against column $j$ of $[T]$. $\blacksquare$

That's the whole reason. The index $k$ runs over the *middle* basis $\mathcal{B}$: $T$ sends $a_j$ out into $V$ (column $j$ of $[T]$ tells how much of each $b_k$ it produces), and then $S$ converts each $b_k$ into $W$ (row $i$ of $[S]$ tells how much $c_i$ each $b_k$ contributes). Row times column = "sum over all the routes through the middle space."

Consequences come for free:
- **Associativity** $(RS)T = R(ST)$, because composition of functions is associative. No index juggling required.
- **Shape rule:** you can multiply an $m\times n$ by an $n \times p$ matrix because the middle space must match.
- **Non-commutativity:** $S\circ T$ and $T\circ S$ are different processes, so there's no reason for $ST = TS$. Rotate-then-project differs from project-then-rotate (Example 1).
- **Identity and inverses:** the identity map has matrix $I$ (in the same basis on both sides), and $T$ is invertible iff its matrix is.

### 4. The crisis: one map, many matrices

A matrix depends on the bases. So a single map $T : V \to V$ casts many different shadows. How are they related?

Let $\mathcal{B}$ and $\mathcal{B}'$ be two bases of $V$. Define the **change-of-basis matrix** $P = [I]_{\mathcal{B}\leftarrow\mathcal{B}'}$: its columns are the new basis vectors $b'_j$ written in old coordinates. By the Proposition of §2, $[v]_{\mathcal{B}} = P\,[v]_{\mathcal{B}'}$: $P$ translates new coordinates into old ones, and $P^{-1}$ translates old into new.

> **Theorem (change of basis).** If $A = [T]_{\mathcal{B}}$ and $A' = [T]_{\mathcal{B}'}$, then
> $$A' = P^{-1} A P.$$

*Proof.* $T = I\circ T\circ I$, so by the composition theorem,
$[T]_{\mathcal{B}'} = [I]_{\mathcal{B}'\leftarrow\mathcal{B}}\,[T]_{\mathcal{B}}\,[I]_{\mathcal{B}\leftarrow\mathcal{B}'} = P^{-1} A P.$
Read right to left: translate new coordinates to old ($P$), apply the map in old coordinates ($A$), translate back ($P^{-1}$). $\blacksquare$

> **Definition.** Square matrices $A, A'$ are **similar** if $A' = P^{-1}AP$ for some invertible $P$. Similarity is an equivalence relation (↩ S1E05), and its equivalence classes are exactly "all shadows of one operator."

The central question of Part A now has a precise form: **which properties of a matrix are shared by every matrix in its similarity class?** Those are properties of the *map*. The rest are artifacts of the camera angle. First examples:
- **Rank** is invariant: it's $\dim\operatorname{im}T$, defined without coordinates.
- **Trace** is invariant: $\operatorname{tr}(XY) = \sum_{i,k} x_{ik}y_{ki} = \operatorname{tr}(YX)$, so $\operatorname{tr}(P^{-1}AP) = \operatorname{tr}(APP^{-1}) = \operatorname{tr}A$.
- **Determinant** is invariant: $\det(P^{-1}AP) = \det(P)^{-1}\det(A)\det(P) = \det A$ (using the product rule, explained properly in ↪ S2E11).
- **Individual entries are not invariant.** "The top-left entry is 2" is a fact about the shadow.

For maps between *different* spaces $T : V \to W$, changing both bases gives $A' = Q^{-1}AP$ with independent $P$ and $Q$. Then much more can be simplified: choosing bases cleverly (extend a basis of $\ker T$ as in the rank–nullity proof, ↩ S2E03) turns any matrix into $\begin{pmatrix} I_r & 0 \\ 0 & 0\end{pmatrix}$ with $r = \operatorname{rank}T$. With two independent cameras, rank is the *only* invariant. With one camera ($V = W$, same basis on both sides), the problem is much richer, and it occupies Acts IV and V.

### 5. Solving $A\mathbf{x} = \mathbf{b}$: particular solution plus kernel

The map viewpoint also clarifies linear systems. $A\mathbf{x} = \mathbf{b}$ asks: which inputs does $T$ send to $\mathbf{b}$?

> **Theorem (structure of solutions).** Let $T : V \to W$ be linear and $b \in W$.
> - If $b \notin \operatorname{im}T$, there are no solutions.
> - If $x_p$ is one solution ($T(x_p) = b$), then the set of all solutions is $x_p + \ker T = \lbrace x_p + k : k \in \ker T\rbrace$.

*Proof.* If $T(k) = 0$ then $T(x_p + k) = b + 0 = b$. Conversely if $T(x) = b$ then $T(x - x_p) = b - b = 0$, so $x - x_p \in \ker T$. $\blacksquare$

The solution set is an **affine subspace**: a copy of the kernel shifted away from the origin. The same structure appears for linear ODEs ("general solution = particular + homogeneous," ↩ S2E01, Example 1). The solution is unique iff $\ker T = 0$; rank–nullity tells us the solution set, when nonempty, has dimension $n - \operatorname{rank}A$.

**Zoom out (thread: symmetry means what stays fixed).** In Season 1, cardinality was what survives a bijection. Here, rank, trace, and determinant are what survive a change of basis. The visual motif: a **badge** (the invariant) stays put on screen while the coordinates churn underneath.

**Teaser.** Is there a camera angle in which a given map's matrix is as simple as possible, say diagonal? Sometimes yes (Example 3). Sometimes no. The quest for that best angle is the story of eigenvectors (↪ S2E12–13).

## Worked examples

### Example 1: Rotate-then-project vs. project-then-rotate

In $\mathbb{R}^2$ with the standard basis $e_1 = (1,0)$, $e_2 = (0,1)$:
- $R$ = rotation by $90^\circ$ counterclockwise: $R(e_1) = e_2 = (0,1)$, $R(e_2) = -e_1 = (-1,0)$. Columns: $R = \begin{pmatrix} 0 & -1 \\ 1 & 0\end{pmatrix}$.
- $P$ = projection onto the $x$-axis: $P(e_1) = e_1$, $P(e_2) = 0$. So $P = \begin{pmatrix} 1 & 0 \\ 0 & 0\end{pmatrix}$.

*Rotate first, then project* is $P\circ R$, matrix $PR$:
$$PR = \begin{pmatrix} 1\cdot 0 + 0\cdot 1 & 1\cdot(-1) + 0\cdot 0 \\ 0\cdot 0 + 0\cdot 1 & 0\cdot(-1) + 0 \cdot 0\end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 0 & 0\end{pmatrix}.$$
*Project first, then rotate* is $R\circ P$:
$$RP = \begin{pmatrix} 0\cdot 1 + (-1)\cdot 0 & 0 \cdot 0 + (-1)\cdot 0 \\ 1\cdot 1 + 0 \cdot 0 & 1\cdot 0 + 0\cdot 0\end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 1 & 0\end{pmatrix}.$$
Check geometrically with $e_1$: rotate gives $e_2$, project gives $0$, and column 1 of $PR$ is $0$ ✓. Project gives $e_1$, rotate gives $e_2$, and column 1 of $RP$ is $(0,1)$ ✓. The image of $PR$ is the $x$-axis ("lying flat"); the image of $RP$ is the $y$-axis ("standing up"). $PR \ne RP$ because the processes differ.

### Example 2: The matrix of differentiation, in two bases

$D : \mathcal{P}_3 \to \mathcal{P}_3$, basis $\mathcal{M} = (1, x, x^2, x^3)$. Images: $D(1) = 0$, $D(x) = 1$, $D(x^2) = 2x$, $D(x^3) = 3x^2$. Their coordinates become the columns:
$$[D]_{\mathcal{M}} = \begin{pmatrix} 0 & 1 & 0 & 0 \\ 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 3 \\ 0 & 0 & 0 & 0\end{pmatrix}.$$
*Test:* $p = 2 - x + 3x^2$ has $[p]_{\mathcal{M}} = (2, -1, 3, 0)$. Then
$[D]_{\mathcal{M}}(2,-1,3,0)^{\mathsf T} = (0\cdot 2 + 1\cdot(-1),\; 2\cdot 3,\; 3\cdot 0,\; 0) = (-1, 6, 0, 0)$, i.e. $-1 + 6x$. Indeed $p' = -1 + 6x$. ✓

*Composition:* $D^2 = D\circ D$ (second derivative) has matrix $[D]^2$:
$$[D]_{\mathcal{M}}^2 = \begin{pmatrix} 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 6 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0\end{pmatrix},$$
matching $D^2(x^2) = 2$ and $D^2(x^3) = 6x$. Also $[D]^4 = 0$, since four derivatives kill any cubic.

*New camera:* use $\mathcal{M}' = (1, x, x^2/2, x^3/6)$. Now $D(1) = 0$, $D(x) = 1$, $D(x^2/2) = x$, $D(x^3/6) = x^2/2$: each basis vector goes to the previous one. So
$$[D]_{\mathcal{M}'} = \begin{pmatrix} 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0\end{pmatrix}.$$
Check with the formula: $P = [I]_{\mathcal{M}\leftarrow\mathcal{M}'} = \operatorname{diag}(1, 1, \tfrac12, \tfrac16)$, $P^{-1} = \operatorname{diag}(1,1,2,6)$, and $P^{-1}[D]_{\mathcal{M}}P$ has $(i,j)$ entry $p_i^{-1} d_{ij} p_j$: entry $(2,3)$ is $1\cdot 2 \cdot \tfrac12 = 1$, entry $(3,4)$ is $2 \cdot 3\cdot\tfrac16 = 1$, entry $(1,2)$ is $1\cdot 1\cdot 1 = 1$. ✓ This "pure shift" shadow is the Jordan form of $D$ (↪ S2E13). Both matrices have trace $0$, determinant $0$, and rank $3$: the badges stay put.

### Example 3: A symmetric matrix that is secretly diagonal

Let $T : \mathbb{R}^2 \to \mathbb{R}^2$ have standard matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2\end{pmatrix}$. Try the basis $\mathcal{B}' = (b_1, b_2)$ with $b_1 = (1, 1)$, $b_2 = (1,-1)$.

Direct computation: $T(b_1) = (2 + 1, 1 + 2) = (3, 3) = 3b_1$; $T(b_2) = (2 - 1, 1 - 2) = (1, -1) = 1\cdot b_2$. So $[T]_{\mathcal{B}'} = \begin{pmatrix} 3 & 0 \\ 0 & 1\end{pmatrix}$.

Via the formula: $P = \begin{pmatrix} 1 & 1 \\ 1 & -1\end{pmatrix}$ (columns $b_1, b_2$), $\det P = -1 - 1 = -2$, so $P^{-1} = \frac{1}{-2}\begin{pmatrix} -1 & -1 \\ -1 & 1\end{pmatrix} = \begin{pmatrix} \tfrac12 & \tfrac12 \\ \tfrac12 & -\tfrac12\end{pmatrix}$. Then
$$AP = \begin{pmatrix} 2 + 1 & 2 - 1 \\ 1 + 2 & 1 - 2\end{pmatrix} = \begin{pmatrix} 3 & 1 \\ 3 & -1\end{pmatrix}, \qquad P^{-1}(AP) = \begin{pmatrix} \tfrac32 + \tfrac32 & \tfrac12 - \tfrac12 \\ \tfrac32 - \tfrac32 & \tfrac12 + \tfrac12\end{pmatrix} = \begin{pmatrix} 3 & 0 \\ 0 & 1\end{pmatrix}.$$
This matches the direct computation. ✓
Invariants: $\operatorname{tr} A = 4 = 3 + 1$, $\det A = 4 - 1 = 3 = 3\cdot 1$. In the new camera the map is visibly "stretch by 3 along the diagonal, leave the anti-diagonal alone." The original matrix hid that.

### Example 4: Solving a system as particular solution plus kernel

Solve $A\mathbf{x} = \mathbf{b}$ with $A = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3\end{pmatrix}$, $\mathbf{b} = (6, 14)$.

Equations: $x + y + z = 6$ and $x + 2y + 3z = 14$. Subtract the first from the second: $y + 2z = 8$, so $y = 8 - 2z$. Substitute: $x = 6 - y - z = 6 - 8 + 2z - z = -2 + z$. With $z = t$ free:
$$\mathbf{x} = (-2 + t,\; 8 - 2t,\; t) = \underbrace{(-2, 8, 0)}_{\text{particular}} + t\,\underbrace{(1, -2, 1)}_{\text{kernel}}.$$
Checks: $A(-2,8,0) = (-2 + 8 + 0,\; -2 + 16 + 0) = (6, 14)$ ✓. $A(1,-2,1) = (1 - 2 + 1,\; 1 - 4 + 3) = (0, 0)$ ✓. Rank–nullity: $\operatorname{rank} A = 2$ (the rows aren't proportional), so $\dim\ker A = 3 - 2 = 1$ ✓. The solution set is a line in $\mathbb{R}^3$ parallel to $(1,-2,1)$, not through the origin. Because $\operatorname{rank}A = 2 = \dim\mathbb{R}^2$, $A$ is surjective, so *every* $\mathbf{b}$ gives a nonempty solution line.

## Visual and animation notes
1. **Cold open:** the row-times-column rule animated as a "zipper" (row slides along column), captioned "Why?". Then a unit square: rotate-then-squash vs. squash-then-rotate side by side, ending as a horizontal vs. a vertical segment.
2. **Key visual (storyline): the camera.** A single 3D object representing the map (a translucent grid transformation) sits center stage. A camera labeled "basis $\mathcal{B}$" orbits it; on a wall behind, the "shadow" is a $2 \times 2$ grid of numbers that changes continuously as the camera moves. The map never moves. Use the basis/camera overlay motif.
3. **Column $j$ = where $b_j$ goes:** two blue basis arrows move under the map; their landing coordinates fly up and slot into column 1 and column 2 of a matrix frame.
4. **Composition proof as routes:** three columns of dots ($U$, $V$, $W$ basis vectors); arrows from $a_j$ to each $b_k$ labeled $t_{kj}$, then from each $b_k$ to $c_i$ labeled $s_{ik}$; all routes from $a_j$ to $c_i$ light up and their products sum to $(ST)_{ij}$. The row of $S$ and column of $T$ highlight in sync.
5. **Change of basis:** the grid motif: standard grid morphs into the $(1,1),(1,-1)$ grid; the map $A$ acting on the new grid is seen as pure stretching along its lines. "Badges" for trace $= 4$ and det $= 3$ stay pinned in a corner while entries churn.
6. **Differentiation shadows:** the $4\times4$ matrix with $1, 2, 3$ on the superdiagonal morphs into all 1s as the basis rescales to $x^k/k!$.
7. **Particular + kernel:** in 3D, the kernel line through the origin (glowing), and a parallel line through $(-2, 8, 0)$; a slider $t$ moves a point along it while $A\mathbf{x}$ stays pinned at $(6, 14)$.

## Common misconceptions
- **Misconception:** A matrix *is* a linear map. **Reality:** it is a linear map *plus a choice of bases*. Change the bases and the matrix changes; the map doesn't.
- **Misconception:** Matrix multiplication is defined row-times-column by convention. **Reality:** it is forced by requiring that the matrix of a composition be the product of the matrices.
- **Misconception:** $AB \ne BA$ is a weird pathology. **Reality:** it reflects that doing two processes in different orders usually gives different results.
- **Misconception:** The change-of-basis formula is $PAP^{-1}$, always. **Reality:** whether you see $P^{-1}AP$ or $PAP^{-1}$ depends on whether $P$ converts new coordinates to old or old to new. Always ask which way $P$ translates.
- **Misconception:** Similar matrices have the same entries "up to rearrangement." **Reality:** similar matrices can look completely different; what they share are invariants like rank, trace, determinant, and (later) eigenvalues.
- **Misconception:** A system with more unknowns than equations always has infinitely many solutions. **Reality:** it has either none or infinitely many. It can be inconsistent (e.g. $x + y = 1$, $x + y = 2$).

## Exercises
- **Warm-up (computational):** (a) Find the matrix of reflection across the line $y = x$ in the standard basis of $\mathbb{R}^2$, and of the map $p \mapsto p(x + 1)$ on $\mathcal{P}_2$ in the basis $1, x, x^2$. (b) Verify by multiplying matrices that rotation by $90^\circ$ applied four times is the identity.
- **Core (conceptual):** (a) Show that $\begin{pmatrix} 1 & 1 \\ 0 & 1\end{pmatrix}$ and $\begin{pmatrix} 1 & 0 \\ 0 & 1\end{pmatrix}$ have the same trace, determinant, and rank, yet are not similar. (b) Explain why $\operatorname{tr}(AB) = \operatorname{tr}(BA)$ even when $AB \ne BA$, but $\operatorname{tr}(ABC)$ need not equal $\operatorname{tr}(BAC)$.
- **Stretch (exploration):** Prove that for any linear $T : V \to W$ between finite-dimensional spaces, there are bases in which $[T] = \begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix}$, $r = \operatorname{rank}T$. Conclude that two $m \times n$ matrices are related by $A' = Q^{-1}AP$ iff they have the same rank.

<details><summary>Hints and answers</summary>

**Warm-up.** (a) Reflection: $e_1 \mapsto e_2$, $e_2 \mapsto e_1$, so $\begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}$. Shift $p(x) \mapsto p(x+1)$: $1 \mapsto 1$, $x \mapsto 1 + x$, $x^2 \mapsto 1 + 2x + x^2$, so the matrix is $\begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \\ 0 & 0 & 1\end{pmatrix}$ (Pascal's triangle appears). (b) $R^2 = \begin{pmatrix} -1 & 0 \\ 0 & -1\end{pmatrix}$ and $R^4 = (R^2)^2 = I$.

**Core.** (a) Both have trace 2, determinant 1, rank 2. But $P^{-1}IP = I$ for every $P$, so the only matrix similar to $I$ is $I$ itself. (The shear is the star of S2E13.) (b) $\operatorname{tr}(AB) = \sum_{i,k} a_{ik}b_{ki} = \sum_{k,i} b_{ki}a_{ik} = \operatorname{tr}(BA)$. Only *cyclic* permutations preserve trace; try $A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$, $B = A^{\mathsf T}$, $C = \begin{pmatrix} 1 & 0 \\ 0 & 0\end{pmatrix}$: $\operatorname{tr}(ABC) = 1$ but $\operatorname{tr}(BAC) = 0$.

**Stretch.** Take a basis $u_1, \dots, u_k$ of $\ker T$, extend to $v_1, \dots, v_r, u_1, \dots, u_k$ of $V$ (list the $v$'s first). The rank–nullity proof shows $T(v_1), \dots, T(v_r)$ is a basis of $\operatorname{im}T$; extend it to a basis of $W$. In these bases, column $j \le r$ is $e_j$ and the remaining columns are $0$. Two matrices of equal rank are both equivalent to the same normal form, hence to each other.
</details>

## Historical note
Arrays of coefficients are ancient: Chapter 8 of the Chinese *Nine Chapters on the Mathematical Art* (compiled by around the first century CE) solves systems of linear equations by elimination on a counting board, in essentially the way we row-reduce today. The word "matrix" was introduced by James Joseph Sylvester in 1850 (as the "womb" from which determinants, i.e. minors, are born). Arthur Cayley's "A memoir on the theory of matrices" (1858) defined matrix multiplication by exactly the logic of this episode: a matrix represents a linear substitution of variables, and the product represents doing one substitution after another. Cayley noted that multiplication is not commutative and stated the Cayley–Hamilton theorem (↪ S2E13). The geometric view of a matrix as a camera-dependent picture of a map was made explicit in the twentieth century, in texts like Halmos's *Finite-Dimensional Vector Spaces* (1942), which systematically put linear transformations before matrices.

## Connections
- **Callbacks:** ↩ S2E02 (coordinates as a language), ↩ S2E03 (linear extension; rank–nullity), ↩ S1E05 (similarity as an equivalence relation), ↩ S2E01 (particular + homogeneous solutions of ODEs).
- **Sets up:** ↪ S2E05 ($\operatorname{Hom}(V,W) \cong F^{m\times n}$), ↪ S2E06 (row vectors as covectors), ↪ S2E08 (the transpose as the dual map; row rank = column rank), ↪ S2E09 (forms change as $P^{\mathsf T}BP$, not $P^{-1}AP$), ↪ S2E11 (determinant), ↪ S2E12–13 (the best camera angle: eigenbases, Jordan form), ↪ S2E17 (least squares when $A\mathbf{x} = \mathbf{b}$ has no solution), ↪ S2E19 (SVD: two cameras, but rigid ones).
- **Side quests:** "Linear algebra over $\mathbb{F}_2$" (Lights Out as $A\mathbf{x} = \mathbf{b}$ over $\mathbb{F}_2$), "Linear algebra in machine learning" (layers as matrices).

## References
- **Primary / historical**
  - Arthur Cayley, "A memoir on the theory of matrices," *Philosophical Transactions of the Royal Society of London* 148 (1858).
  - *The Nine Chapters on the Mathematical Art: Companion and Commentary*, trans. Shen Kangshen, John N. Crossley, and Anthony W.-C. Lun, Oxford University Press, 1999, Chapter 8 ("Rectangular Arrays").
- **Textbooks**
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (or 3rd ed., 2015), Chapter 3, sections 3C (matrices; matrix multiplication motivated by composition) and 3D (invertibility and isomorphisms).
  - Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., 1958, Chapter II (matrices, change of basis, similarity).
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., 1971, Chapter 3, §3.4 (Representation of Transformations by Matrices).
  - Gilbert Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016, Chapter 2 (solving linear equations; elimination; matrix multiplication), Chapter 3 (the complete solution to $A\mathbf{x} = \mathbf{b}$), and Chapter 8 (linear transformations; the matrix of a linear transformation).
- **Accessible**
  - 3Blue1Brown, *Essence of Linear Algebra*, 2016: "Linear transformations and matrices," "Matrix multiplication as composition," and "Change of basis."
  - Gilbert Strang, MIT OpenCourseWare 18.06 *Linear Algebra* video lectures (Spring 2010), lectures on multiplication and the complete solution of $A\mathbf{x} = \mathbf{b}$.
