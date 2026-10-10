# S2E10: Multilinear Maps and the Tensor Product

> **Season / Act:** Season 2, Part A, Act III (Multilinear Algebra) · **Target runtime:** 15–25 min ·
> **Prerequisites:** ↩ S2E05 (quotient spaces, $\operatorname{Hom}(V,W)$), ↩ S2E06 (covectors), ↩ S2E08 (dual maps), ↩ S2E09 (bilinear forms, congruence) ·
> **Builds toward:** ↪ S2E11 (exterior powers as a quotient of tensors), ↪ S2E15 (quantum states in $\mathbb C^2\otimes\mathbb C^2$), ↪ S3E02 (tensor products of modules), ↪ S3E06–S3E07 (tensor fields and forms on manifolds), ↪ S3E10 (the metric tensor), ↪ S3E12 (universal properties)

## Learning objectives
By the end of this lesson the viewer can:
1. Define multilinear maps and state the universal property of the tensor product $V\otimes W$; prove that it determines $V\otimes W$ up to a unique isomorphism.
2. Construct $V\otimes W$ concretely, write down its basis $\{e_i\otimes f_j\}$, and conclude $\dim(V\otimes W) = \dim V\cdot\dim W$.
3. Distinguish pure tensors from general tensors, compute the rank of a tensor in $V\otimes W$ as a matrix rank, and recognize entangled states.
4. Use the identifications $\operatorname{Hom}(V,W)\cong V^*\otimes W$ and $\{\text{bilinear forms}\}\cong V^*\otimes V^*$ to *derive* the "transforms like a tensor" rules, including covariant and contravariant indices.

## Cold open
Ask a physicist what a tensor is, and there's a decent chance you'll hear this: "A tensor is something that transforms like a tensor."

It sounds like a joke. It is a definition that uses the word it's defining. But physicists aren't being silly. They mean something real: a tensor is a grid of numbers, maybe with two indices, maybe with five, and when you change coordinates the grid changes according to a very specific rule. Some indices get one factor of the change-of-basis matrix; others get its inverse. Get the rule right and you've got a tensor. Get it wrong and your physics depends on which way you were facing when you wrote it down.

We've already met two grids that look identical but transform differently: maps, which change as $P^{-1}AP$, and bilinear forms, which change as $P^{\mathsf T}BP$. That was Episode 9. A three-index grid would have even more options. Where do these rules come from? Who decided?

Today we're going to do better than "transforms like a tensor." We're going to define a tensor by what it *does*, by a single sentence about what kinds of maps can come out of it. From that one sentence, the space of tensors will build itself, its dimension will fall out, and every one of those transformation rules will be forced. Nobody decided. The rules decide themselves.

## The story

### 1. Many inputs, one linear output

Act III's slogan: *a multilinear map is a measurement that takes several vectors at once and is linear in each one separately.*

> **Definition.** Let $V_1,\dots,V_k, U$ be vector spaces over $F$. A map $M: V_1\times\dots\times V_k\to U$ is **multilinear** ($k$-linear) if it is linear in each argument when the others are held fixed.

Examples: the dot product and every bilinear form of ↩ S2E09 ($k = 2$, $U = F$). The determinant of an $n\times n$ matrix as a function of its $n$ columns ($k = n$; ↪ S2E11). Matrix multiplication $\operatorname{Hom}(V,W)\times\operatorname{Hom}(U,V)\to\operatorname{Hom}(U,W)$. The cross product $\mathbb R^3\times\mathbb R^3\to\mathbb R^3$. The "outer product" $F^m\times F^n\to F^{m\times n}$, $(x, y)\mapsto xy^{\mathsf T}$.

**Naive attempt.** Multilinear maps are not linear maps out of $V\times W$. The space $V\times W$ (the direct sum $V\oplus W$) has dimension $\dim V + \dim W$, and a linear map on it satisfies $L(2v, 2w) = 2L(v,w)$, while a bilinear one satisfies $B(2v,2w) = 4B(v,w)$. So all of the linear algebra we have built (kernels, images, rank, matrices, duals) doesn't apply directly.

**The crisis.** We would like a space $X$ and a single "universal" bilinear map $V\times W\to X$ such that *every* bilinear map out of $V\times W$ becomes an ordinary linear map out of $X$. Then multilinear algebra would reduce to linear algebra. Does such an $X$ exist? Is it unique?

### 2. Describe it, don't build it: the universal property

> **Definition (universal property).** A **tensor product** of $V$ and $W$ is a vector space $V\otimes W$ together with a bilinear map $\otimes: V\times W\to V\otimes W$, $(v,w)\mapsto v\otimes w$, such that: for every vector space $U$ and every bilinear map $B: V\times W\to U$, there is **exactly one** linear map $\tilde B: V\otimes W\to U$ with
> $$\tilde B(v\otimes w) = B(v,w)\quad\text{for all } v\in V,\ w\in W.$$

In a picture:
$$\begin{array}{ccc} V\times W & \xrightarrow{\ \otimes\ } & V\otimes W\\ & {\scriptstyle B}\searrow & \downarrow{\scriptstyle \exists!\,\tilde B} \\ & & U\end{array}$$

Read it as: "Bilinear maps out of $V\times W$ are the same thing as linear maps out of $V\otimes W$." In symbols, $\operatorname{Bil}(V\times W, U)\cong\operatorname{Hom}(V\otimes W, U)$. The map $\otimes$ is the most general bilinear thing you can do to a pair $(v,w)$: anything else bilinear factors through it.

Notice what this definition doesn't say. It doesn't say what elements of $V\otimes W$ *are*. It is a job description, not a construction. This is S1's "Build or Describe?" tension (↩ S1E02, Peano versus von Neumann), now with vector spaces. The first thing a job description must do is prove that it describes only one candidate.

> **Theorem 1 (uniqueness).** If $(X, \otimes)$ and $(X', \otimes')$ both satisfy the universal property for $V$ and $W$, there is a unique linear isomorphism $\Phi: X\to X'$ with $\Phi(v\otimes w) = v\otimes' w$.

*Proof.* Apply the universal property of $X$ to the bilinear map $\otimes': V\times W\to X'$: there is a unique linear $\Phi: X\to X'$ with $\Phi(v\otimes w) = v\otimes'w$. Symmetrically, the universal property of $X'$ applied to $\otimes$ gives a unique linear $\Psi: X'\to X$ with $\Psi(v\otimes'w) = v\otimes w$.

Now $\Psi\circ\Phi: X\to X$ is linear and satisfies $(\Psi\circ\Phi)(v\otimes w) = v\otimes w$. But the identity map $\mathrm{id}_X$ is also linear and satisfies the same equation. Apply the universal property of $X$ to the bilinear map $\otimes: V\times W\to X$ itself: there is *exactly one* linear map $X\to X$ sending every $v\otimes w$ to $v\otimes w$. Both $\Psi\circ\Phi$ and $\mathrm{id}_X$ are such maps, so $\Psi\circ\Phi = \mathrm{id}_X$. The same argument in $X'$ gives $\Phi\circ\Psi = \mathrm{id}_{X'}$. So $\Phi$ is an isomorphism, and it is unique by construction. $\blacksquare$

The proof uses nothing about vector spaces except "there is exactly one map." The same argument proves uniqueness for every universal property in mathematics (products, quotients, free groups, completions), which is why category theory (↪ S3E12) can treat them all at once.

### 3. Build it anyway: existence and dimension

Uniqueness is worthless without existence. Here are two constructions.

**Construction A (with bases).** Choose bases $e_1,\dots,e_m$ of $V$ and $f_1,\dots,f_n$ of $W$. Let $X$ be a vector space with a basis of $mn$ symbols $e_i\otimes f_j$, and define
$$\Big(\sum_i a_ie_i\Big)\otimes\Big(\sum_j b_jf_j\Big) = \sum_{i,j}a_ib_j\,(e_i\otimes f_j).$$
This is bilinear (each coefficient $a_ib_j$ is bilinear in $(a,b)$). Given bilinear $B: V\times W\to U$, a linear map $\tilde B$ on $X$ is determined by its values on the basis, and $\tilde B(e_i\otimes f_j) = B(e_i,f_j)$ is forced; conversely, this choice works by bilinearity of $B$. So $X$ satisfies the universal property.

> **Corollary.** $\dim(V\otimes W) = \dim V\cdot\dim W$, with basis $\{e_i\otimes f_j\}$.

Compare $\dim(V\oplus W) = \dim V + \dim W$. Direct sums add dimensions; tensor products multiply them.

**Construction B (basis-free).** Let $\mathcal F$ be the vector space with one basis element $[v,w]$ for *every* pair $(v,w)\in V\times W$ (a huge space). Let $R$ be the subspace spanned by all the "bilinearity relations"
$$[v+v',w] - [v,w] - [v',w],\quad [v,w+w'] - [v,w] - [v,w'],\quad [av,w] - a[v,w],\quad [v,aw] - a[v,w].$$
Set $V\otimes W = \mathcal F/R$ and $v\otimes w = $ the class of $[v,w]$. This is the quotient construction of ↩ S2E05 (and ↩ S1E05): we glue together exactly the things bilinearity says must be equal, and nothing more. It works for modules over any commutative ring (↪ S3E02), where bases may not exist.

By Theorem 1, the two constructions give the "same" space, related by a unique isomorphism. From now on we forget how it was built and use only the universal property and the basis.

### 4. Pure tensors, general tensors, and rank

An element of the form $v\otimes w$ is a **pure** (or simple, decomposable) tensor. A general element of $V\otimes W$ is a *sum* of pure tensors. Most tensors are not pure.

Make this concrete with $V = F^m$, $W = F^n$. The coordinates of a tensor $t = \sum t_{ij}\,e_i\otimes f_j$ form an $m\times n$ array $(t_{ij})$, and
$$v\otimes w\ \longleftrightarrow\ vw^{\mathsf T} = (v_iw_j)_{ij},$$
the outer product. An outer product $vw^{\mathsf T}$ is a matrix of rank $\le 1$, and every rank-1 matrix is one. So:

> **Proposition 2.** The **tensor rank** of $t\in V\otimes W$, the least number of pure tensors summing to $t$, equals the rank of the coefficient matrix $(t_{ij})$. In particular $t$ is pure iff that matrix has rank $\le 1$.

*Proof.* A sum of $r$ outer products has rank $\le r$ (rank is subadditive). Conversely a rank-$r$ matrix is a sum of $r$ rank-1 matrices (e.g. column times row, using a basis of its column space). $\blacksquare$

For tensors with **three or more** slots, $V_1\otimes V_2\otimes V_3$, the coordinates form a 3D array and "rank" is defined the same way (fewest pure tensors $u\otimes v\otimes w$). But there is no Gaussian elimination for 3D arrays, and the analogy breaks badly: the rank can depend on the field (some real $2\times2\times2$ tensors have rank 3 over $\mathbb R$ but rank 2 over $\mathbb C$), the set of tensors of rank $\le r$ need not be closed, and computing tensor rank is NP-hard (Håstad 1990 for finite fields; Hillar and Lim 2013 over $\mathbb R$ and $\mathbb C$). A famous instance: the bilinear map "multiply two $2\times2$ matrices" is a tensor in a 64-dimensional space; the schoolbook algorithm writes it as a sum of 8 pure tensors (8 multiplications), Strassen (1969) found 7, and 7 is the minimum.

### 5. The great identifications, and where "transforms like a tensor" comes from

With the universal property, many familiar objects turn out to *be* tensors. (All spaces finite-dimensional.)

> **Theorem 3.** There are natural isomorphisms
> 1. $V^*\otimes W\ \xrightarrow{\ \cong\ }\ \operatorname{Hom}(V,W)$, $\quad\varphi\otimes w\ \mapsto\ (v\mapsto\varphi(v)\,w)$.
> 2. $V^*\otimes V^*\ \xrightarrow{\ \cong\ }\ \{\text{bilinear forms on }V\}$, $\quad\varphi\otimes\psi\ \mapsto\ ((u,v)\mapsto\varphi(u)\psi(v))$.
> 3. $V^*\otimes W^*\cong(V\otimes W)^*$.

*Proof of 1.* The rule $(\varphi,w)\mapsto[v\mapsto\varphi(v)w]$ is bilinear, so by the universal property it induces a linear map $\Theta: V^*\otimes W\to\operatorname{Hom}(V,W)$. In bases, $\Theta(e^j\otimes f_i)$ is the map sending $e_j\mapsto f_i$ and the other $e_k\mapsto 0$: its matrix is the matrix unit $E_{ij}$. These $mn$ matrix units form a basis of $\operatorname{Hom}(V,W)$ (↩ S2E05), so $\Theta$ sends a basis to a basis. $\blacksquare$ (2 and 3 are the same argument.)

So a linear map is a sum of "measure, then output a vector" pieces; a rank-1 map is a single piece $\varphi\otimes w$ (measure with $\varphi$, output that many copies of $w$). And a bilinear form is a sum of "measure the first input, measure the second, multiply." Even the **trace** becomes coordinate-free: it is the linear map $V^*\otimes V\to F$ induced by the bilinear map $(\varphi,v)\mapsto\varphi(v)$. This operation, plugging a vector slot into a covector slot, is called **contraction**.

**Covariant and contravariant slots.** Every tensor lives in some $V^{\otimes p}\otimes(V^*)^{\otimes q}$: $p$ vector-like slots (the blue arrows of ↩ S2E06) and $q$ covector-like slots (the orange stacks). Physicists call vector slots **contravariant** (upper indices, $t^i$) and covector slots **covariant** (lower indices, $t_j$). Now derive the transformation rule. Change basis by $P$ (new $e'_j = \sum_iP_{ij}e_i$):
- a **vector**'s coordinates change by $P^{-1}$ (they move *against* the basis: contra-variant);
- a **covector**'s coordinates, $\varphi(e'_j) = \sum_i\varphi(e_i)P_{ij}$, change by $P$ itself, as a row: $\varphi\mapsto\varphi P$ (they move *with* the basis: co-variant);
- a tensor's coordinates change by one factor for each slot.

So a tensor in $V^*\otimes V$ (a map, one slot of each kind) changes as $P^{-1}AP$, and a tensor in $V^*\otimes V^*$ (a form, two covector slots) changes as $P^{\mathsf T}BP$. The two rules of ↩ S2E09 are not two arbitrary conventions. They are the *same* rule, applied to tensors with different slot types. "Transforms like a tensor" means exactly this: the coordinates of an element of $V^{\otimes p}\otimes(V^*)^{\otimes q}$ transform with $p$ copies of $P^{-1}$ and $q$ copies of $P$. The physicist's definition is a *theorem* about our definition.

**Symmetric tensors and polynomials.** A tensor in $V^*\otimes V^*$ is symmetric if it is unchanged by swapping the slots. Symmetric tensors in $(V^*)^{\otimes k}$ correspond to homogeneous polynomials of degree $k$ on $V$ (when $k!\neq 0$ in $F$): plug the same vector into every slot. For $k = 2$ this is the quadratic-form/polarization dictionary of ↩ S2E09.

### 6. Payoff: tensors in the wild

- **Quantum entanglement.** A qubit's state lives in $\mathbb C^2$. Two qubits live in $\mathbb C^2\otimes\mathbb C^2$, of dimension $4$, not $\mathbb C^2\oplus\mathbb C^2$. Pure tensors $\psi_1\otimes\psi_2$ are **product states**, where each particle has its own state. Non-pure tensors are **entangled**: the pair has a state, but neither particle does (Worked Example 2). Dimensions multiply, so $n$ qubits need $2^n$ complex numbers, which is why quantum systems are hard to simulate classically. (↪ S2E15; side quest *Quantum computing*.)
- **The metric tensor.** A symmetric positive definite element of $V^*\otimes V^*$ (an inner product, ↪ S2E14), placed on every tangent space of a curved space (↪ S3E10).
- **Data arrays.** A color video is a 4-index array (height × width × color × time); tensor decompositions (CP, Tucker) look for low-rank structure, with all the difficulties of Section 4.

**Payoff for the cold open.** A tensor is an element of a tensor product of copies of $V$ and $V^*$. The tensor product is *described* (universal property), then *built* (basis or quotient), and its transformation law is *derived*. Describe it, don't build it, and the formulas take care of themselves.

## Worked examples

### Example 1: Pure versus non-pure in $F^2\otimes F^2$
**(a) A pure tensor.** $v = (1,2)$, $w = (3,-1)$. Then
$$v\otimes w = (e_1 + 2e_2)\otimes(3f_1 - f_2) = 3\,e_1\otimes f_1 - e_1\otimes f_2 + 6\,e_2\otimes f_1 - 2\,e_2\otimes f_2,$$
using bilinearity to expand. Coefficient matrix:
$$\begin{pmatrix}3&-1\\6&-2\end{pmatrix} = \begin{pmatrix}1\\2\end{pmatrix}\begin{pmatrix}3&-1\end{pmatrix},$$
determinant $-6 - (-6) = 0$, rank 1. ✓

**(b) A non-pure tensor.** $t = e_1\otimes f_1 + e_2\otimes f_2$. Suppose $t = (a_1e_1 + a_2e_2)\otimes(b_1f_1 + b_2f_2)$. Comparing coefficients: $a_1b_1 = 1$, $a_1b_2 = 0$, $a_2b_1 = 0$, $a_2b_2 = 1$. From the first, $a_1\ne0$ and $b_1\neq 0$; then the second forces $b_2 = 0$ and the third forces $a_2 = 0$, contradicting $a_2b_2 = 1$. So $t$ is not pure. Its coefficient matrix is $I$, of rank 2, so $t$ has tensor rank exactly 2.

**(c) Same tensor, different-looking decomposition.** Rank-2 tensors have many decompositions. Writing $e_if_j$ for $e_i\otimes f_j$ and expanding by bilinearity,
$$\tfrac12(e_1+e_2)\otimes(f_1+f_2) = \tfrac12\big[e_1f_1 + e_1f_2 + e_2f_1 + e_2f_2\big],\qquad \tfrac12(e_1-e_2)\otimes(f_1-f_2) = \tfrac12\big[e_1f_1 - e_1f_2 - e_2f_1 + e_2f_2\big].$$
Adding, the cross terms cancel and we get $e_1f_1 + e_2f_2 = t$ again. A tensor is not "a list of the vectors it was made from."

### Example 2: An entangled two-qubit state
Write the basis of $\mathbb C^2$ as $|0\rangle, |1\rangle$ and $|ab\rangle$ for $|a\rangle\otimes|b\rangle$. The Bell state is
$$|\Phi^+\rangle = \tfrac{1}{\sqrt2}\big(|00\rangle + |11\rangle\big).$$
Its coefficient matrix is $\tfrac1{\sqrt2}I$, of rank 2, so by Proposition 2 it is not a product state. Directly: if $(\alpha|0\rangle+\beta|1\rangle)\otimes(\gamma|0\rangle+\delta|1\rangle) = |\Phi^+\rangle$, then $\alpha\gamma = \tfrac1{\sqrt2}$, $\alpha\delta = 0$, $\beta\gamma = 0$, $\beta\delta = \tfrac1{\sqrt2}$. Multiply the outer two equations: $\alpha\beta\gamma\delta = \tfrac12$. Multiply the inner two: $\alpha\beta\gamma\delta = 0$. Contradiction.

Contrast $\tfrac12(|00\rangle + |01\rangle + |10\rangle + |11\rangle)$, whose coefficient matrix $\tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ has rank 1: it equals $\tfrac1{\sqrt2}(|0\rangle+|1\rangle)\otimes\tfrac1{\sqrt2}(|0\rangle+|1\rangle)$, a product state, even though it "looks" more mixed up.

### Example 3: A matrix as an element of $V^*\otimes W$, and the trace as contraction
Let $A = \begin{pmatrix}1&2\\3&4\end{pmatrix}$, a map $F^2\to F^2$. Its columns are $Ae_1 = (1,3)$ and $Ae_2 = (2,4)$. Since $v = e^1(v)e_1 + e^2(v)e_2$,
$$Av = e^1(v)\,(1,3) + e^2(v)\,(2,4),\qquad\text{so}\qquad A = e^1\otimes(1,3) + e^2\otimes(2,4)$$
under Theorem 3. Each term is "measure one coordinate, output a column." Since $\det A = 4 - 6 = -2\neq 0$, $A$ has rank 2 and cannot be written with fewer than 2 pure tensors.

**Trace by contraction.** Contraction sends $\varphi\otimes w\mapsto\varphi(w)$. So
$$\operatorname{tr}A = e^1\big((1,3)\big) + e^2\big((2,4)\big) = 1 + 4 = 5.$$
That is the sum of the diagonal entries, as expected, but notice that the definition of contraction used no basis. That is the real reason the trace is basis-independent. As a check of a property that's mysterious in matrix language: with $B = \begin{pmatrix}0&1\\5&-2\end{pmatrix}$, $AB = \begin{pmatrix}10&-3\\20&-5\end{pmatrix}$ and $BA = \begin{pmatrix}3&4\\-1&2\end{pmatrix}$, and $\operatorname{tr}(AB) = 10 - 5 = 5 = 3 + 2 = \operatorname{tr}(BA)$.

### Example 4: Covariant versus contravariant, with numbers
In $\mathbb R^2$ take the new basis $b_1 = (1,0)$, $b_2 = (1,1)$, so $P = \begin{pmatrix}1&1\\0&1\end{pmatrix}$, $P^{-1} = \begin{pmatrix}1&-1\\0&1\end{pmatrix}$.

- **Vector** $v = (3,2)$: new coordinates $P^{-1}v = (3-2,\ 2) = (1,2)$. Check: $1\cdot(1,0) + 2\cdot(1,1) = (3,2)$. ✓
- **Covector** $\varphi = (1\ \ 1)$ (i.e. $\varphi(x,y) = x+y$): new coordinates $\varphi P = (1\cdot1 + 1\cdot0,\ 1\cdot1 + 1\cdot1) = (1\ \ 2)$. Check: $\varphi(b_1) = 1$, $\varphi(b_2) = 2$. ✓
- **The pairing is invariant:** old $\varphi(v) = 3 + 2 = 5$; new $1\cdot1 + 2\cdot2 = 5$. ✓ The vector's coordinates were hit by $P^{-1}$ and the covector's by $P$, and they cancel in the contraction $\varphi P\,P^{-1}v$.
- **Two-slot tensors:** a map ($V^*\otimes V$) gets one $P^{-1}$ and one $P$: $P^{-1}AP$. A bilinear form ($V^*\otimes V^*$) gets two $P$'s, one written as a transpose: $P^{\mathsf T}BP$. These are exactly the similarity and congruence rules of ↩ S2E09.

## Visual and animation notes
1. **Cold open.** A blackboard with "a tensor is something that transforms like a tensor" in chalk; the sentence loops back into itself as an ouroboros.
2. **The machine.** The multilinear-map machine (motif: *Multilinear map*) with two blue slots. A "funnel" labeled $\otimes$ appears in front of it: every pair $(v,w)$ goes through the funnel first and comes out as a single object $v\otimes w$, and the machine is replaced by a simpler *linear* machine. Caption: "bilinear out of $V\times W$ = linear out of $V\otimes W$."
3. **Uniqueness proof.** Two candidate spaces $X$ and $X'$ with threads $\Phi$, $\Psi$ between them (motif: *Bijection / isomorphism*); going around the loop $X\to X'\to X$ lights up the uniqueness clause and the loop collapses to the identity.
4. **Build it.** Construction B: a cloud of formal symbols $[v,w]$; relations glow and blobs merge (motif: *Equivalence class / quotient*, ↩ S1E05). What's left is a neat $m\times n$ grid of basis tensors $e_i\otimes f_j$.
5. **Dimension count.** Bars for $\dim V$ and $\dim W$: stacked end to end for $\oplus$ ($m + n$), arranged as a rectangle for $\otimes$ ($mn$).
6. **Pure vs. non-pure.** A $2\times2$ heatmap; rank-1 arrays shown as a column times a row (the array "factors" visibly); the identity array refuses to factor, splitting into two rank-1 layers instead.
7. **Entanglement.** Two qubit spheres side by side; for a product state each has its own arrow; for the Bell state the arrows dissolve and a single glowing link between the spheres remains.
8. **Transformation law.** A tensor drawn as a node with blue (vector) and orange (covector) legs. Changing the camera (motif: *Basis / coordinates*) sends a $P^{-1}$ along every blue leg and a $P$ along every orange leg; when a blue leg plugs into an orange leg (contraction) the two factors annihilate with a flash.
9. **Callback stamps:** ↩ S2E09 when $P^{-1}AP$ and $P^{\mathsf T}BP$ reappear; ↩ S2E05 at shot 4; ↩ S1E02 at the "Build or Describe?" segment.

## Common misconceptions
- **Misconception:** Every element of $V\otimes W$ has the form $v\otimes w$. **Reality:** Only the pure tensors do; a general tensor is a *sum* of them (Example 1b). In $F^m\otimes F^n$ the pure ones are exactly the rank-$\le1$ matrices, a thin subset.
- **Misconception:** $V\otimes W$ is the same as $V\times W$. **Reality:** $\dim(V\times W) = m + n$ while $\dim(V\otimes W) = mn$, and $(v,w)\mapsto v\otimes w$ is bilinear, not linear: $(2v)\otimes(2w) = 4(v\otimes w)$, and $v\otimes 0 = 0$ for every $v$.
- **Misconception:** A tensor is a multidimensional array. **Reality:** An array is a tensor's coordinates in a basis, just as a matrix is a map's (↩ S2E04). The same array represents different tensors depending on which slots are vectors and which are covectors.
- **Misconception:** Tensor rank behaves like matrix rank for every number of slots. **Reality:** For three or more slots, rank depends on the field, can't be computed by elimination, and is NP-hard in general.
- **Misconception:** "Covariant" and "contravariant" are arbitrary labels. **Reality:** They record which way coordinates move under a change of basis: covector components move with the basis ($P$), vector components against it ($P^{-1}$).

## Exercises
- **Warm-up (computational).** Decide whether $t = 2\,e_1\otimes f_1 + 4\,e_1\otimes f_2 + 3\,e_2\otimes f_1 + 6\,e_2\otimes f_2$ is a pure tensor in $F^2\otimes F^2$; if so, find $v, w$ with $t = v\otimes w$. Then find the tensor rank of $e_1\otimes f_1 + e_1\otimes f_2 + e_2\otimes f_1$.
- **Core (conceptual).** Use the universal property (not bases) to construct a natural linear map $V\otimes W\to W\otimes V$ with $v\otimes w\mapsto w\otimes v$, and show it is an isomorphism. Then explain why the trace map $V^*\otimes V\to F$ gives the usual trace of a matrix in every basis.
- **Stretch (proof).** Given linear maps $S: V\to V'$ and $T: W\to W'$, construct $S\otimes T: V\otimes W\to V'\otimes W'$ via the universal property. Show that if $S$ and $T$ have matrices $A$ ($m'\times m$) and $B$ ($n'\times n$), then $S\otimes T$, in the bases $e_i\otimes f_j$ ordered lexicographically, has the Kronecker product matrix $A\otimes B$ (the block matrix $(A_{ik}B)$). Prove $\operatorname{tr}(S\otimes T) = \operatorname{tr}S\cdot\operatorname{tr}T$ when $V = V'$ and $W = W'$.

<details><summary>Hints and answers</summary>

- **Warm-up.** The matrix $\begin{pmatrix}2&4\\3&6\end{pmatrix}$ has determinant $12 - 12 = 0$, so $t$ is pure: $t = (2e_1 + 3e_2)\otimes(f_1 + 2f_2)$. Check: $2\cdot1 = 2$, $2\cdot 2 = 4$, $3\cdot1 = 3$, $3\cdot2 = 6$. ✓ The second tensor has matrix $\begin{pmatrix}1&1\\1&0\end{pmatrix}$ with determinant $-1\ne0$, so rank 2.
- **Core.** $(v,w)\mapsto w\otimes v$ is bilinear, so it induces a linear map; the map in the other direction is built the same way, and both composites fix pure tensors, so by uniqueness they are identities. For the trace: contraction sends $e^j\otimes e_i\mapsto\delta_{ij}$, and $A = \sum_{i,j}A_{ij}\,e^j\otimes e_i$, so the contraction is $\sum_iA_{ii}$ in *every* basis.
- **Stretch.** $(v,w)\mapsto Sv\otimes Tw$ is bilinear. $(S\otimes T)(e_k\otimes f_l) = \sum_{i,j}A_{ik}B_{jl}\,e'_i\otimes f'_j$, which is the $(i,j),(k,l)$ entry of the Kronecker product. The trace sums $A_{ii}B_{jj}$ over all $i,j$, which factors as $(\sum A_{ii})(\sum B_{jj})$.

</details>

## Historical note
The word "tensor" has a winding history. William Rowan Hamilton used it in the 1840s for the magnitude of a quaternion. The modern sense comes from physics: Woldemar Voigt used "tensor" in 1898 for the stress-like quantities of crystal physics, and Gregorio Ricci-Curbastro and Tullio Levi-Civita's 1900 memoir *Méthodes de calcul différentiel absolu et leurs applications* developed the "absolute differential calculus," with indices up and down and precise transformation rules. That calculus became the language of Einstein's general relativity (1915), and Einstein's summation convention made the indices easier to write. Meanwhile, Hermann Grassmann's 1844 *Ausdehnungslehre* had already contained products of vectors in a coordinate-free spirit. The abstract tensor product of modules was introduced by Hassler Whitney in 1938 (*Tensor products of abelian groups*), and the "universal property" style of definition was popularized by Bourbaki's *Algèbre* and by the category theory of Eilenberg and Mac Lane. So the physicist's slogan and the mathematician's universal property are two descriptions, half a century apart, of the same object.

## Connections
- **Callbacks:** ↩ S1E02 and ↩ S1E05 (build vs. describe; quotients), ↩ S2E04 (an array is coordinates, not the object), ↩ S2E05 ($\operatorname{Hom}(V,W)$ and its dimension), ↩ S2E06 (vector and covector colors), ↩ S2E08 (dual maps), ↩ S2E09 (similarity vs. congruence)
- **Sets up:** ↪ S2E11 ($\Lambda^kV$ as a quotient of $V^{\otimes k}$; the determinant as a contraction-free invariant), ↪ S2E14 (inner products as symmetric tensors), ↪ S2E15 (multi-qubit states), ↪ S3E02 (tensor products of modules over rings), ↪ S3E06 (tensor fields), ↪ S3E10 (the metric tensor and curvature tensor), ↪ S3E12 (universal properties in category theory)
- **Side quests:** Quantum computing (attaches after S2E10: qubits, tensor products, entanglement); Linear algebra in machine learning (attaches after S2E19: tensors as data arrays)

## References
- **Primary / historical:** Gregorio Ricci-Curbastro and Tullio Levi-Civita, "Méthodes de calcul différentiel absolu et leurs applications," *Mathematische Annalen* 54 (1900).
- **Primary / historical:** Hassler Whitney, "Tensor products of abelian groups," *Duke Mathematical Journal* 4 (1938).
- **Textbook:** David S. Dummit and Richard M. Foote, *Abstract Algebra*, 3rd ed., Wiley (2004), Section 10.4 "Tensor Products of Modules" and Section 11.5 "Tensor Algebras. Symmetric and Exterior Algebras."
- **Textbook:** Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer (2024), Section 9D "Tensor Products."
- **Textbook:** Steven Roman, *Advanced Linear Algebra*, 3rd ed., Springer GTM 135 (2008), chapter on tensor products (universal property, construction, $\operatorname{Hom}$ and duals, contraction, covariant and contravariant tensors).
- **Textbook:** Serge Lang, *Algebra*, revised 3rd ed., Springer GTM 211 (2002), Chapter XVI "The Tensor Product."
- **Accessible:** Michael A. Nielsen and Isaac L. Chuang, *Quantum Computation and Quantum Information*, Cambridge University Press (2000), Chapter 2 (tensor products and entanglement).
- **Further reading:** Tamara G. Kolda and Brett W. Bader, "Tensor Decompositions and Applications," *SIAM Review* 51(3) (2009); Christopher J. Hillar and Lek-Heng Lim, "Most Tensor Problems Are NP-Hard," *Journal of the ACM* 60(6) (2013); Volker Strassen, "Gaussian elimination is not optimal," *Numerische Mathematik* 13 (1969).
