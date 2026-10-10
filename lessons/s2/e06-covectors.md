# S2E06: Covectors: Measuring Devices

> **Season / Act:** Season 2, Part A, Act II: Linear Functionals and Duality · **Target runtime:** 18–25 min ·
> **Prerequisites:** S2E02 (bases, coordinates), S2E03 (linear maps, rank–nullity), S2E04 (change of basis), S2E05 ($\operatorname{Hom}(V, W)$ as a vector space); partial derivatives for the gradient section ·
> **Builds toward:** S2E07 (functionals on function spaces), S2E08 (transpose, double dual), S2E09–10 (forms and tensors), S2E16 (gradient as an arrow via an inner product), S2E24 (continuous duals), S2E33 (distributions), S3E06 (cotangent spaces, $df$)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a linear functional and the dual space $V^*$, and give examples (coordinate readers, price lists, directional derivatives).
2. Construct the dual basis of a given basis, prove $\dim V^* = \dim V$, and compute dual bases with a matrix inverse.
3. Picture a covector as a stack of evenly spaced level hyperplanes and explain "how many sheets does the arrow cross."
4. Prove that a nonzero functional is determined up to scale by its kernel, a hyperplane.
5. Explain why vector components and covector components change in opposite ways under a change of basis, and why the gradient $df$ is naturally a covector.

## Cold open
"Three things. A weather map, with temperature contour lines drawn across the country. A price list at a market: apples 3 dollars a kilo, flour 2, sugar 5. And a row of numbers, $(3\ \ 2\ \ 5)$, the kind of row vector you met in a matrix class and were told is 'just a column lying on its side.'

"Here's a strange experiment. Take your shopping basket: 2 kilos of apples, 1 of flour, half a kilo of sugar. Cost: 6 plus 2 plus 2.5 is 10.50. Now the market switches to grams. Your basket becomes 2000, 1000, 500: the numbers got a thousand times *bigger*. The prices become 0.003, 0.002, 0.005 dollars per gram: a thousand times *smaller*. The bill, of course, is still 10.50.

"So the basket and the price list are both 'lists of three numbers.' But when you change units, they change in *opposite* directions. They can't be the same kind of object.

"The basket is a vector: a thing. The price list is something else: a *measuring device*. You feed it a basket, it hands you a number. Today we give measuring devices their own name, their own space, and their own picture. Not arrows, but stacks of parallel sheets. And we'll find that the most famous 'arrow' in calculus, the gradient, was a stack of sheets all along."

## The story

### 1. The naive attempt: a row is a column on its side

In a matrix course, a row vector $(a_1\ \cdots\ a_n)$ and a column vector are the same list of numbers, written differently, and the "dot product" $\sum a_i x_i$ combines them. If that were the whole story, transposing would be a cosmetic act.

The cold-open experiment shows it isn't. Let's make it precise with S2E04's change of basis. Suppose the new basis vectors are $b'_j = \sum_i P_{ij} b_i$ (columns of $P$ are new basis vectors in old coordinates). Then vector coordinates change by
$$[v]_{\mathcal{B}'} = P^{-1}[v]_{\mathcal{B}}.$$
In the market, the new basis vector "one gram of apples" is $0.001\times$"one kilo of apples," so $P = 0.001\,I$ and coordinates get multiplied by $1000$. The prices, however, got multiplied by $0.001$, i.e. by $P$, not $P^{-1}$. Rows and columns respond to the same change of basis with *inverse* matrices. They're different species.

### 2. The construction: functionals and the dual space

> **Definition (linear functional, dual space).** A **linear functional** (or **covector**, or **linear form**) on a vector space $V$ over $F$ is a linear map $\varphi : V \to F$. The **dual space** is $V^* = \operatorname{Hom}(V, F)$, the space of all linear functionals, with pointwise addition and scaling (↩ S2E05).

A functional is a **measurement**: it eats a vector and returns a number, and it respects superposition (measuring a sum gives the sum of the measurements).

Examples:
- On $\mathbb{R}^3$: $\varphi(x, y, z) = 3x + 2y + 5z$ (the price list). Every functional on $F^n$ has this form: $\varphi(x) = \sum a_i x_i$ with $a_i = \varphi(e_i)$, by linear extension (↩ S2E03).
- On $\mathcal{P}_2$: $p \mapsto p(2)$ (evaluation), $p \mapsto p'(0)$, $p \mapsto \int_0^1 p(x)\,dx$. (These are the stars of ↪ S2E07.)
- On $F^{n\times n}$: the trace $A \mapsto \operatorname{tr}A$.
- On $\mathbb{F}_2^n$: the parity check $x \mapsto x_1 + \dots + x_n$ (↪ S3E02).
- **Coordinate readers.** Given a basis $\mathcal{B} = (b_1, \dots, b_n)$, the map "read off the $i$-th coordinate," $v \mapsto c_i$ where $v = \sum_j c_j b_j$, is linear.

The coordinate readers deserve a name.

> **Theorem (dual basis).** Let $b_1, \dots, b_n$ be a basis of $V$. There are unique functionals $\beta^1, \dots, \beta^n \in V^*$ with
> $$\beta^i(b_j) = \delta_{ij} = \begin{cases} 1 & i = j \\ 0 & i \neq j.\end{cases}$$
> They form a basis of $V^*$, the **dual basis**, and every $\varphi \in V^*$ satisfies $\varphi = \sum_i \varphi(b_i)\,\beta^i$. In particular $\dim V^* = \dim V$.

*Proof.* Existence and uniqueness of each $\beta^i$: a linear map is freely and uniquely determined by its values on a basis (↩ S2E03). Explicitly, $\beta^i$ is the $i$-th coordinate reader: if $v = \sum_j c_j b_j$ then $\beta^i(v) = c_i$.

*Spanning:* let $\varphi \in V^*$ and set $\psi = \sum_i \varphi(b_i)\beta^i$. Then $\psi(b_j) = \sum_i \varphi(b_i)\delta_{ij} = \varphi(b_j)$ for each $j$. Two linear maps agreeing on a basis are equal, so $\psi = \varphi$.

*Independence:* if $\sum_i a_i \beta^i = 0$ (the zero functional), apply both sides to $b_j$: $\sum_i a_i\delta_{ij} = a_j = 0$. $\blacksquare$

The formula $\varphi = \sum_i \varphi(b_i)\beta^i$ says: **the coordinates of a covector in the dual basis are its values on the basis vectors.** And the formula $v = \sum_i \beta^i(v)\, b_i$ says: **the coordinates of a vector are the readings of the dual covectors.** Coordinates *are* measurements.

**Caution: $\beta^i$ depends on the whole basis**, not just on $b_i$. To read "how much $b_1$ is in $v$," you must know which other directions you're *not* counting. Change $b_2$ and $\beta^1$ changes even though $b_1$ didn't (Example 2). There is no such thing as "the dual of a single vector" until we have an inner product (↪ S2E16).

**The transformation law.** With components $[\varphi]_{\mathcal{B}} = (\varphi(b_1), \dots, \varphi(b_n))$ written as a row, the new components are $\varphi(b'_j) = \sum_i P_{ij}\varphi(b_i)$, so
$$[\varphi]_{\mathcal{B}'} = [\varphi]_{\mathcal{B}}\,P, \qquad [v]_{\mathcal{B}'} = P^{-1}[v]_{\mathcal{B}},$$
and the pairing is invariant: $[\varphi]_{\mathcal{B}'}[v]_{\mathcal{B}'} = [\varphi]_{\mathcal{B}}PP^{-1}[v]_{\mathcal{B}} = \varphi(v)$. Covector components transform *with* the basis (covariantly); vector components transform *against* it (contravariantly). That's the cold open's bill staying at 10.50.

In $F^n$ with the standard basis, if $B$ is the matrix whose columns are $b_1, \dots, b_n$, then the **dual basis covectors are the rows of $B^{-1}$**: the equation $B^{-1}B = I$ says exactly that row $i$ of $B^{-1}$ applied to column $j$ of $B$ is $\delta_{ij}$.

### 3. The picture: stacks of sheets

How do you *draw* a covector on $\mathbb{R}^2$? Not as an arrow. Draw its **level sets**: the lines $\varphi = 0, \pm 1, \pm 2, \dots$. Because $\varphi$ is linear, these are parallel, evenly spaced lines (planes in $\mathbb{R}^3$, hyperplanes in general), with $\varphi = 0$ through the origin. Mark which side is "uphill."

Then $\varphi(v)$ = **the number of sheets the arrow $v$ crosses**, going from its tail at the origin to its tip, counted with sign (positive going uphill) and with fractions (an arrow ending halfway between sheets 2 and 3 reads 2.5).

This picture makes the algebra visible:
- **Scaling** $\varphi$ by 2 doubles the *density* of sheets (they get closer together). A "bigger" covector has *more tightly packed* sheets: the opposite of an arrow, which gets longer. This is the cold open's opposite scaling, seen geometrically.
- **Adding** covectors: $\varphi + \psi$ has as level sets the lines through the intersection points of the two stacks (the "diagonals" of the grid they form).
- **The kernel** $\ker\varphi$ is the sheet through the origin: the directions the device cannot see.
- **The dual basis** $\beta^1, \beta^2$: $\beta^1$'s sheets are *parallel to $b_2$* and spaced so that $b_1$ crosses exactly one. Change $b_2$ and the sheets tilt: that's the Caution, drawn.

> **Theorem (kernels of functionals).** Let $V$ be finite-dimensional, $\dim V = n$.
> 1. If $\varphi \in V^*$ is nonzero, $\ker\varphi$ is a **hyperplane**: a subspace of dimension $n - 1$.
> 2. Every hyperplane is the kernel of some nonzero functional.
> 3. If $\varphi \ne 0$ and $\ker\psi \supseteq \ker\varphi$ (in particular if $\ker\psi = \ker\varphi$), then $\psi = c\,\varphi$ for some scalar $c$.

*Proof.* (1) The image of $\varphi \neq 0$ is a nonzero subspace of $F$, hence all of $F$; rank–nullity gives $\dim\ker\varphi = n - 1$.

(2) If $H$ has dimension $n - 1$, extend a basis $h_1, \dots, h_{n-1}$ of $H$ to a basis of $V$ with one more vector $b$. The functional with $\varphi(h_i) = 0$, $\varphi(b) = 1$ has kernel containing $H$, and by (1) of dimension $n - 1$, so equal to $H$.

(3) Since $\varphi \ne 0$, pick $v_0$ with $\varphi(v_0) = 1$ (take any $u$ with $\varphi(u) \ne 0$ and rescale). For any $v \in V$, write
$$v = \big(v - \varphi(v)\,v_0\big) + \varphi(v)\,v_0.$$
The first term is in $\ker\varphi$, since $\varphi(v - \varphi(v)v_0) = \varphi(v) - \varphi(v)\cdot 1 = 0$, hence in $\ker\psi$. So $\psi(v) = 0 + \varphi(v)\psi(v_0)$. With $c = \psi(v_0)$, $\psi = c\,\varphi$. $\blacksquare$

(Part 3 holds verbatim in infinite dimensions; parts 1–2 hold with "hyperplane" meaning a subspace $H$ with $\dim V/H = 1$.)

So a covector is "a hyperplane plus a scale": the orientation of the sheets is set by the kernel, and the density is set by one number. This is the geometric meaning of a linear equation $a_1x_1 + \dots + a_nx_n = b$: a single sheet of the stack $\varphi = a\cdot x$.

### 4. The payoff: the gradient is a covector

Let $f : \mathbb{R}^n \to \mathbb{R}$ be differentiable at a point $p$. The derivative of $f$ at $p$ is the linear map that best approximates $f$ near $p$:
$$f(p + v) \approx f(p) + df_p(v), \qquad df_p(v) = \frac{d}{dt}\Big|_{t=0} f(p + tv) = \sum_i \frac{\partial f}{\partial x_i}(p)\,v_i.$$
So $df_p$ eats a displacement $v$ (a vector) and returns a number (the rate of change of $f$ in that direction). It is a **linear functional**, an element of $(\mathbb{R}^n)^*$. In the dual basis $dx_1, \dots, dx_n$ (where $dx_i$ reads off the $i$-th component of a displacement),
$$df_p = \frac{\partial f}{\partial x_1}(p)\,dx_1 + \dots + \frac{\partial f}{\partial x_n}(p)\,dx_n.$$
That is the honest meaning of the familiar formula: the $dx_i$ are the dual basis of $V^*$, and the partial derivatives are the covector's components.

The picture matches perfectly. Zoom in on a contour map of $f$ near $p$: the contour lines become straight, parallel, evenly spaced. That stack is $df_p$. Crowded contours mean a steep slope (a "big" covector), and the change in $f$ along a small step is the number of contours crossed.

And the components of $df$ transform like covectors (Example 3): change units on the $x$-axis from meters to centimeters, and $\partial f/\partial x$ gets *divided* by 100 while displacements get *multiplied* by 100. The usual "gradient arrow" $\nabla f = (\partial f/\partial x_1, \dots)$ is what you get when you convert the covector into a vector using the dot product. That conversion depends on the choice of inner product, i.e. on what you declare "perpendicular" to mean (↪ S2E14, ↪ S2E16). The covector $df$ needs no such choice. In Season 3, $df$ becomes a covector field on a curved space (↪ S3E06).

### 5. Zoom out, and the infinite-dimensional catch

**Thread: duality, or measuring things.** From now on, two colors: **blue arrows** are vectors, things; **orange stacks** are covectors, measurements. A number appears when an arrow pierces a stack. This pairing $\langle\varphi, v\rangle = \varphi(v)$ will be everywhere: rows of matrices are covectors (row $i$ of $[T]$ is $\gamma^i\circ T$, "measure the $i$-th output coordinate"); bilinear forms are machines turning vectors into covectors (↪ S2E09); tensors have vector slots and covector slots (↪ S2E10).

**Is $V^*$ the same as $V$?** In finite dimensions they have the same dimension, so they're isomorphic. But every isomorphism we've built depends on a basis (send $b_i \mapsto \beta^i$), and the Caution shows different bases give *different* isomorphisms. There is no natural one. In infinite dimensions it's worse: for $\mathcal{P}(\mathbb{R})$ with basis $1, x, x^2, \dots$, the coordinate readers $\beta^k$ do **not** span the dual. The functional "evaluate at 1," $p \mapsto p(1) = \sum_k \beta^k(p)$, would need infinitely many of them. In fact $\mathcal{P}(\mathbb{R})^*$ is isomorphic to the space of *all* real sequences (a functional is determined by its arbitrary values on $1, x, x^2, \dots$), which has uncountable dimension while $\mathcal{P}(\mathbb{R})$ has countable dimension.

**Teaser.** Functionals on spaces of functions are everywhere: "value at 0," "area under the curve," "slope at 1." Next episode, we'll measure polynomials with them, and find that interpolation and numerical integration are nothing but change of basis in $V^*$.

## Worked examples

### Example 1: Prices and baskets under a change of units

Basis $\mathcal{B}$: $b_1$ = 1 kg apples, $b_2$ = 1 kg flour, $b_3$ = 1 kg sugar. Basket $v = 2b_1 + 1b_2 + 0.5b_3$, so $[v]_{\mathcal{B}} = (2, 1, 0.5)$. Price functional $\pi$ with $\pi(b_1) = 3$, $\pi(b_2) = 2$, $\pi(b_3) = 5$, so $[\pi]_{\mathcal{B}} = (3\ \ 2\ \ 5)$.
$$\pi(v) = 3\cdot 2 + 2 \cdot 1 + 5\cdot 0.5 = 6 + 2 + 2.5 = 10.5.$$
New basis $\mathcal{B}'$: $b'_i = 0.001\,b_i$ (one gram each). Then $P = 0.001\,I$ and $P^{-1} = 1000\,I$.
- $[v]_{\mathcal{B}'} = P^{-1}[v]_{\mathcal{B}} = (2000, 1000, 500)$.
- $[\pi]_{\mathcal{B}'} = [\pi]_{\mathcal{B}}P = (0.003\ \ 0.002\ \ 0.005)$; directly, $\pi(b'_1) = 0.001\cdot 3$ dollars per gram ✓.
- $\pi(v) = 0.003 \cdot 2000 + 0.002\cdot 1000 + 0.005\cdot 500 = 6 + 2 + 2.5 = 10.5$ ✓.

### Example 2: Computing a dual basis, and watching it shift

In $\mathbb{R}^2$ let $b_1 = (1, 1)$, $b_2 = (1, 2)$. Put them as columns: $B = \begin{pmatrix} 1 & 1 \\ 1 & 2\end{pmatrix}$, $\det B = 2 - 1 = 1$, so
$$B^{-1} = \begin{pmatrix} 2 & -1 \\ -1 & 1\end{pmatrix}.$$
The rows give $\beta^1(x, y) = 2x - y$ and $\beta^2(x, y) = -x + y$. Check all four pairings: $\beta^1(b_1) = 2 - 1 = 1$, $\beta^1(b_2) = 2 - 2 = 0$, $\beta^2(b_1) = -1 + 1 = 0$, $\beta^2(b_2) = -1 + 2 = 1$ ✓.

Use them: the coordinates of $v = (4, 7)$ are $\beta^1(v) = 8 - 7 = 1$ and $\beta^2(v) = -4 + 7 = 3$. Check: $1\cdot(1,1) + 3\cdot(1,2) = (4, 7)$ ✓.

Now keep $b_1 = (1,1)$ but change $b_2$ to $\tilde b_2 = (0, 1)$. Then $\tilde B = \begin{pmatrix} 1 & 0 \\ 1 & 1\end{pmatrix}$, $\tilde B^{-1} = \begin{pmatrix} 1 & 0 \\ -1 & 1\end{pmatrix}$, so $\tilde\beta^1(x,y) = x$ and $\tilde\beta^2(x, y) = -x + y$. Check: $\tilde\beta^1(1,1) = 1$, $\tilde\beta^1(0,1) = 0$, $\tilde\beta^2(1,1) = 0$, $\tilde\beta^2(0,1) = 1$ ✓.

Observe: $b_1$ didn't change, but its dual $\beta^1$ changed from $2x - y$ to $x$, because $\beta^1$ must vanish on the *other* basis vector, which moved. Meanwhile $\beta^2$ stayed $-x + y$ even though $b_2$ changed: $\beta^2$ is pinned down by "kill $b_1$" (its sheets are parallel to $(1,1)$) and "read 1 on the second vector," and $\tilde b_2 - b_2 = (-1, -1)$ lies along $b_1$, so $\beta^2(\tilde b_2) = \beta^2(b_2) = 1$. In the picture: $\beta^1$'s sheets rotate to stay parallel to the new $\tilde b_2$, while $\beta^2$'s sheets don't move.

### Example 3: The gradient as a covector, and a change of units

Let $f(x, y) = x^2 + 3y$ and $p = (1, 2)$. Partial derivatives: $\partial f/\partial x = 2x = 2$, $\partial f/\partial y = 3$. So
$$df_p = 2\,dx + 3\,dy.$$
Apply it to $v = (1, -1)$: $df_p(v) = 2\cdot 1 + 3\cdot(-1) = -1$. Check by differentiating along the line: $f(p + tv) = (1 + t)^2 + 3(2 - t) = 1 + 2t + t^2 + 6 - 3t = 7 - t + t^2$, whose derivative at $t = 0$ is $-1$ ✓.

Change units: measure $x$ in centimeters, $x' = 100x$ (and keep $y$). The new basis vector for the $x'$-direction is a 1 cm step, $b'_1 = 0.01\,e_1$, so $P = \operatorname{diag}(0.01, 1)$.
- Vector: $[v]' = P^{-1}[v] = (100\cdot 1,\ -1) = (100, -1)$ (one meter is 100 cm).
- Covector: $[df_p]' = (2\ \ 3)P = (0.02\ \ 3)$. Directly: $f = (x'/100)^2 + 3y$, so $\partial f/\partial x' = 2x'/10^4 = 2\cdot 100/10^4 = 0.02$ at $x' = 100$ ✓.
- Pairing: $0.02\cdot 100 + 3\cdot(-1) = 2 - 3 = -1$ ✓, unchanged.

If we had naively treated the gradient as an arrow $(2, 3)$ and transformed it like a vector, we'd get $(200, 3)$ in new units, and "$\nabla f \cdot v$" would become $200\cdot 100 - 3 = 19997$: nonsense. The gradient's components transform like a covector's.

### Example 4: A functional from its kernel

Find all functionals on $\mathbb{R}^3$ whose kernel is the plane $H = \lbrace x + 2y - z = 0\rbrace$ (from S2E01, Example 2), and the one with $\varphi(1, 0, 0) = 5$.

$\varphi_0(x, y, z) = x + 2y - z$ is nonzero with kernel $H$. By part 3 of the theorem, every functional with kernel containing $H$ is $c\,\varphi_0$. For instance $\psi(x,y,z) = 3x + 6y - 3z$ has the same kernel, and indeed $\psi = 3\varphi_0$. Imposing $\varphi(1, 0, 0) = 5$: $c\cdot\varphi_0(1,0,0) = c \cdot 1 = 5$, so $\varphi = 5x + 10y - 5z$.

Level sets: $\varphi = k$ are the parallel planes $x + 2y - z = k/5$, spaced $1/5$ as far apart (in the coordinate $x + 2y - z$) as those of $\varphi_0$: five times denser, as befits a five-times-bigger covector. The vector $(1, 0, 0)$ runs from the sheet $\varphi = 0$ to the sheet $\varphi = 5$, crossing five sheets ✓.

## Visual and animation notes
1. **Cold open:** a contour map with temperature lines; a market price board; the row $(3\ 2\ 5)$. Then the basket/price unit-change: the basket's numbers balloon ×1000 while prices shrink ×1000; a fixed "bill: \$10.50" badge stays put (invariants motif).
2. **Color code (introduce and lock in):** vectors are blue arrows; covectors are orange stacks of evenly spaced parallel lines (2D) or translucent planes (3D), with a small "uphill" chevron. Callback to this color code in every later episode.
3. **Measurement:** a blue arrow from the origin pierces an orange stack; a counter ticks 1, 2, 2.5 as the tip moves through the sheets; reversing the arrow ticks negative.
4. **Scaling contrast:** doubling an arrow (it lengthens) vs. doubling a covector (sheets crowd together). Text: "bigger measurement = denser sheets."
5. **Adding covectors:** two stacks overlaid form a grid of parallelograms; the sum's sheets are drawn through the grid's diagonal intersection points.
6. **Dual basis:** basis arrows $b_1, b_2$ and their dual stacks; $\beta^1$'s sheets run parallel to $b_2$, with $b_1$ crossing exactly one. Animate $b_2$ swinging from $(1,2)$ to $(0,1)$: $\beta^1$'s sheets rotate and respace; $\beta^2$'s sheets stay still (Example 2).
7. **Kernel as hyperplane:** in 3D, the sheet through the origin glows; a functional is shown as "this plane + a density dial."
8. **Gradient payoff:** a hilly landscape's contour map; zoom in at a point until contours become a straight, evenly spaced orange stack labeled $df_p$; a blue displacement arrow crosses it and the "change in $f$" counter reads off. Then a dashed "gradient arrow" appears only after a dot-product "converter" box is plugged in (teaser for S2E16).
9. **Units change for the gradient:** stretch the $x$-axis by 100; blue arrows stretch, orange sheets spread apart; the crossing count stays $-1$.

## Common misconceptions
- **Misconception:** A row vector is just a column vector written sideways. **Reality:** rows are covectors (measurements), columns are vectors. They transform by inverse matrices under a change of basis. Identifying them silently uses the standard dot product.
- **Misconception:** The dual basis vector $\beta^i$ depends only on $b_i$. **Reality:** it depends on the entire basis: it must vanish on all $b_j$ with $j \neq i$.
- **Misconception:** The gradient is an arrow. **Reality:** the derivative $df$ is a covector. The gradient arrow $\nabla f$ exists only after choosing an inner product, and it changes if the inner product changes.
- **Misconception:** A "large" covector has long sheets or widely spaced sheets. **Reality:** a larger covector has *more closely spaced* sheets: it counts more crossings per unit of travel.
- **Misconception:** $V^*$ is the same as $V$. **Reality:** they are isomorphic in finite dimensions, but only after a choice (a basis or an inner product). In infinite dimensions, the algebraic dual is strictly larger.

## Exercises
- **Warm-up (computational):** Find the dual basis of $b_1 = (1, 0, 0)$, $b_2 = (1, 1, 0)$, $b_3 = (1, 1, 1)$ in $\mathbb{R}^3$, and use it to find the coordinates of $(3, 5, 2)$.
- **Core (conceptual):** (a) Is $\varphi(p) = p(0)\,p(1)$ a linear functional on $\mathcal{P}_2$? Is $\psi(p) = p(0) + p'(1)$? (b) Draw (or describe) the level-line stacks of $\varphi(x,y) = x$ and $\psi(x,y) = x + y$. Which arrows $v$ satisfy $\varphi(v) = \psi(v)$?
- **Stretch (proof):** Let $\varphi_1, \dots, \varphi_k, \psi \in V^*$. Prove that $\psi$ is a linear combination of $\varphi_1, \dots, \varphi_k$ if and only if $\ker\psi \supseteq \ker\varphi_1\cap\dots\cap\ker\varphi_k$. (This generalizes part 3 of the kernel theorem and underlies Lagrange multipliers.)

<details><summary>Hints and answers</summary>

**Warm-up.** $B = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1\end{pmatrix}$, $B^{-1} = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ 0 & 0 & 1\end{pmatrix}$. So $\beta^1 = x - y$, $\beta^2 = y - z$, $\beta^3 = z$. Coordinates of $(3,5,2)$: $(3 - 5,\ 5 - 2,\ 2) = (-2, 3, 2)$. Check: $-2(1,0,0) + 3(1,1,0) + 2(1,1,1) = (3, 5, 2)$ ✓.

**Core.** (a) $\varphi$ is not linear ($\varphi(2p) = 4\varphi(p)$). $\psi$ is linear (a sum of two linear functionals). (b) $\varphi$: vertical lines $x = k$. $\psi$: lines $x + y = k$, slanted at $-45^\circ$. $\varphi(v) = \psi(v)$ iff $(\psi - \varphi)(v) = v_2 = 0$: the horizontal axis, the kernel of the difference.

**Stretch.** (⇒) is immediate. (⇐) Consider $\Phi : V \to F^k$, $v \mapsto (\varphi_1(v), \dots, \varphi_k(v))$, with kernel $K = \bigcap\ker\varphi_i \subseteq \ker\psi$. Then $\psi$ factors through $V/K \cong \operatorname{im}\Phi$ (↩ S2E05): define $\ell$ on $\operatorname{im}\Phi$ by $\ell(\Phi(v)) = \psi(v)$ (well defined since $K \subseteq \ker\psi$). Extend $\ell$ linearly to all of $F^k$ (extend a basis); then $\ell(y) = \sum c_i y_i$ for some $c_i$, and $\psi = \ell\circ\Phi = \sum c_i\varphi_i$.
</details>

## Historical note
Linear functionals were first studied seriously in analysis, not algebra. Jacques Hadamard (1903) and Frigyes Riesz (1909) studied linear "operations" that assign a number to each continuous function on an interval; Riesz showed every continuous one is given by a Stieltjes integral. (A sister result, the Riesz–Fréchet representation theorem of 1907 for Hilbert spaces, returns in ↪ S2E28.) In geometry and physics, the distinction between quantities that transform like displacements and those that transform like gradients was made systematic by Gregorio Ricci-Curbastro and Tullio Levi-Civita in their 1900 memoir on the "absolute differential calculus," with upper (contravariant) and lower (covariant) indices; Einstein used their calculus for general relativity. The picture of a covector (a "one-form") as a stack of surfaces pierced by arrows was popularized by Misner, Thorne, and Wheeler's textbook *Gravitation* (1973), which this series' orange-stack motif borrows.

## Connections
- **Callbacks:** ↩ S2E03 (linear extension from a basis; rank–nullity), ↩ S2E04 (change of basis; rows of matrices), ↩ S2E05 ($V^* = \operatorname{Hom}(V,F)$, $\dim = n\cdot 1$), ↩ S2E02 (countable vs. uncountable dimension), ↩ S1E12 (uncountability).
- **Sets up:** ↪ S2E07 (functionals on function spaces; Lagrange and Taylor dual bases), ↪ S2E08 (dual map and transpose; $V \cong V^{**}$ naturally vs. $V \cong V^*$ by choice), ↪ S2E09 (a bilinear form is a map $V \to V^*$), ↪ S2E10 (covariant vs. contravariant slots), ↪ S2E16 (the gradient arrow via an inner product; Riesz in finite dimensions), ↪ S2E24–25 (continuous duals; Hahn–Banach), ↪ S2E33 (distributions as functionals), ↪ S3E06 ($df$ as a covector field), ↪ S3E02 (parity checks over $\mathbb{F}_2$).
- **Side quests:** "Convex duality and optimization" (attaches after S2E25; prices as covectors, Lagrange multipliers); "Linear algebra over $\mathbb{F}_2$" (parity checks).

## References
- **Primary / historical**
  - G. Ricci and T. Levi-Civita, "Méthodes de calcul différentiel absolu et leurs applications," *Mathematische Annalen* 54 (1900).
  - F. Riesz, "Sur les opérations fonctionnelles linéaires," *Comptes Rendus de l'Académie des Sciences, Paris* 149 (1909).
- **Textbooks**
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (or 3rd ed., 2015), Chapter 3, section 3F (Duality: dual space, dual basis).
  - Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., 1958, Chapter I (the sections on linear functionals and dual bases).
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., 1971, Chapter 3, §3.5 (Linear Functionals).
  - Sergei Treil, *Linear Algebra Done Wrong*, Chapter 8 (Dual spaces and tensors).
  - Charles W. Misner, Kip S. Thorne, and John A. Wheeler, *Gravitation*, W. H. Freeman, 1973, Chapter 2 (one-forms pictured as families of surfaces; gradients as one-forms).
- **Accessible**
  - 3Blue1Brown, *Essence of Linear Algebra*, 2016: "Dot products and duality."
  - Bernard F. Schutz, *A First Course in General Relativity*, Cambridge University Press (1st ed. 1985; 2nd ed. 2009), Chapter 3 (one-forms, their pictures, and the gradient as a one-form).
