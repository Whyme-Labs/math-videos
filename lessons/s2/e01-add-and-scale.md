# S2E01: Anything You Can Add and Scale

> **Season / Act:** Season 2 (Spaces, Maps, and Measurements), Part A, Act I: What Is Linear? · **Target runtime:** 15–25 min ·
> **Prerequisites:** S1E19 (fields), S1E16 (groups, especially abelian groups); high-school algebra; a first look at derivatives helps for the ODE example ·
> **Builds toward:** S2E02 (basis and dimension), S2E03 (linear maps), S2E20 (what breaks in infinite dimensions), S2E28–29 (Hilbert spaces, Fourier), S3E01 (fields as vector spaces), S3E06 (tangent spaces)

## Learning objectives
By the end of this lesson the viewer can:
1. State the axioms of a vector space over a field $F$ and explain each axiom in plain words.
2. Recognize vector spaces in unfamiliar places (polynomials, functions, solutions of linear ODEs, sequences, bit strings over $\mathbb{F}_2$) and check the axioms, or the faster subspace test, for each.
3. Explain precisely why the positive reals under ordinary addition and the points of a sphere are *not* vector spaces, and find which axiom fails.
4. Prove basic consequences of the axioms (uniqueness of $0$, $0\cdot v = 0$, $(-1)v = -v$) from the axioms alone.
5. State the superposition principle and explain why linearity is the first approximation to everything else.

## Cold open
Four things appear on screen, side by side.

An arrow in the plane, pointing up and to the right. The polynomial $3x^2 - x + 2$. A two-second audio clip of a violin note, drawn as a wiggling waveform. And a family of curves: every solution of the equation $y'' + y = 0$, a whole fan of waves.

"These four things have nothing in common. One is geometry. One is algebra from school. One is sound. One is a differential equation from physics.

"And yet I'm going to claim they are the *same kind of thing*.

"Here's a hint. Take two arrows: you can put them tip to tail and get a new arrow. Take two polynomials: add them, and you get a polynomial. Play two sounds at once: the waveforms add. Take two solutions of $y'' + y = 0$ and add them: still a solution. And every one of these can be *scaled*: double the arrow, triple the polynomial, turn up the volume, stretch the wave.

"Season 1 ended with a lesson: forget what a thing *is*, keep what it *does*. So let's do that. Let's forget what arrows, polynomials, sounds, and waves are made of, and keep only two moves: **add** and **scale**.

"What we get is the most useful structure in all of applied mathematics. By the end of this season, that violin clip will live in an infinite-dimensional space with angles and lengths, and 'the value of the sound at one instant' will turn out to be a surprisingly delicate thing to measure. Today we start with one question: what does it take to be a vector?"

## The story

### 1. The naive attempt: a vector is an arrow, or a list of numbers

The first definition most people meet is geometric: a vector is an arrow with a length and a direction. The second, from a matrix course, is algebraic: a vector is a column of numbers $(x_1, \dots, x_n)$.

Both are fine for $\mathbb{R}^2$ and $\mathbb{R}^3$. Both break the moment we look at our four objects.

- A polynomial is not an arrow. What is the "direction" of $3x^2 - x + 2$?
- A polynomial *can* be written as a list of coefficients $(2, -1, 3)$, but which list? If we expand in powers of $(x-1)$ instead, the same polynomial becomes $4 + 5(x-1) + 3(x-1)^2$, with list $(4, 5, 3)$. The list depends on a choice; the polynomial doesn't.
- An audio clip, viewed as a function of time, is not a finite list at all.
- The solutions of $y'' + y = 0$ are functions like $\cos x$, $\sin x$, $2\cos x - 5\sin x$. They are not lists, and nobody would call them arrows.

So "arrow" is too geometric and "list" is too dependent on choices. Both definitions describe what a vector is *made of*. The Season 1 lesson (↩ S1E16, ↩ S1E19) says to look instead at what you can *do*.

### 2. The crisis: what exactly do all four have in common?

Write down every operation we used on all four objects:

1. Add two of them and get another one of the same kind.
2. Multiply one of them by a number and get another one of the same kind.

And the operations behave the way we expect: addition doesn't care about order or grouping; there is a "nothing" object (the zero arrow, the zero polynomial, silence, the zero solution $y = 0$); every object has an opposite; scaling distributes over addition.

What kind of "number" are we scaling by? For arrows and audio, real numbers. But nothing in the list above needs the numbers to be real. We need to add them, multiply them, and divide by nonzero ones (to undo a scaling). That is exactly a **field** (↩ S1E19). So the scalars can be $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$, or even the two-element field $\mathbb{F}_2 = \lbrace 0, 1\rbrace$ where $1 + 1 = 0$.

### 3. The construction: the definition of a vector space

> **Definition (vector space).** Let $F$ be a field. A **vector space over $F$** is a set $V$ together with two operations,
> - **addition** $V \times V \to V$, written $(u, v) \mapsto u + v$, and
> - **scalar multiplication** $F \times V \to V$, written $(c, v) \mapsto c\,v$,
>
> such that for all $u, v, w \in V$ and all $a, b \in F$:
> 1. $(u + v) + w = u + (v + w)$ (associativity of addition);
> 2. $u + v = v + u$ (commutativity of addition);
> 3. there is an element $0 \in V$ with $v + 0 = v$ for all $v$ (zero vector);
> 4. for every $v$ there is $-v \in V$ with $v + (-v) = 0$ (additive inverses);
> 5. $a(b\,v) = (ab)\,v$ (compatibility of scalings);
> 6. $1\,v = v$, where $1$ is the multiplicative identity of $F$;
> 7. $a(u + v) = a\,u + a\,v$ (distributivity over vector addition);
> 8. $(a + b)\,v = a\,v + b\,v$ (distributivity over scalar addition).
>
> Elements of $V$ are called **vectors**; elements of $F$ are called **scalars**.

In Season 1 language: axioms 1–4 say that $(V, +)$ is an **abelian group** (↩ S1E16). Axioms 5–8 say that the field $F$ *acts* on that group in a way compatible with both of its operations. A vector space is "an abelian group that a field can act on."

Notice what the definition does *not* mention: lengths, angles, arrows, coordinates, dimension, or "perpendicular." None of those are part of being a vector space. Lengths and angles will be *extra structure* that we choose to add (↪ S2E14). Coordinates will be a *language* that a basis lets us speak (↪ S2E02).

**The first consequences.** Before we believe a definition, we should check it doesn't leave out something obvious. For instance, is $0 \cdot v = 0$? That isn't an axiom. It had better be a theorem.

> **Proposition.** In any vector space $V$ over $F$:
> 1. The zero vector is unique.
> 2. Each $v$ has a unique additive inverse.
> 3. $0\,v = 0$ for every $v \in V$ (the scalar zero times any vector is the zero vector).
> 4. $c\,0 = 0$ for every $c \in F$.
> 5. $(-1)\,v = -v$.
> 6. If $c\,v = 0$, then $c = 0$ or $v = 0$.

*Proof.*
1. Suppose $0$ and $0'$ both satisfy axiom 3. Then $0' = 0' + 0 = 0 + 0' = 0$, using axiom 3 for $0$, then axiom 2, then axiom 3 for $0'$.
2. If $w$ and $w'$ are both inverses of $v$, then $w = w + 0 = w + (v + w') = (w + v) + w' = 0 + w' = w'$.
3. By axiom 8, $0\,v = (0 + 0)\,v = 0\,v + 0\,v$. Add $-(0\,v)$ to both sides and use associativity: $0 = 0\,v$.
4. By axiom 7, $c\,0 = c(0 + 0) = c\,0 + c\,0$; cancel as in (3).
5. $v + (-1)v = 1\,v + (-1)\,v = (1 + (-1))\,v = 0\,v = 0$ by axioms 6, 8, and part (3). By uniqueness of inverses (part 2), $(-1)v = -v$.
6. Suppose $c\,v = 0$ and $c \neq 0$. Because $F$ is a field, $c^{-1}$ exists, so $v = 1\,v = (c^{-1}c)\,v = c^{-1}(c\,v) = c^{-1}\,0 = 0$ by axioms 6, 5, and part (4). $\blacksquare$

Part 6 is the first place we used that $F$ is a *field*. Over a ring with zero divisors, it can fail: in $\mathbb{Z}/6$ acting on itself, $2 \cdot 3 = 0$ although neither factor is $0$ (↩ S1E18). That is a first hint of what "modules over a ring" lose (↪ S3E02).

**A shortcut: subspaces.** Most vector spaces we meet live inside a bigger one we already trust. Then we don't need to check eight axioms.

> **Definition (subspace).** A subset $U$ of a vector space $V$ is a **subspace** if it contains $0$, and is closed under addition ($u, w \in U \Rightarrow u + w \in U$) and under scalar multiplication ($u \in U, c \in F \Rightarrow c\,u \in U$).

> **Subspace test.** A subspace is itself a vector space under the same operations.

*Proof sketch.* Closure means the operations land back in $U$. Axioms 1, 2, 5–8 are equations that hold for all vectors of $V$, so in particular for those in $U$. The zero is in $U$ by assumption, and for $u \in U$ we have $-u = (-1)u \in U$ by closure under scaling and part (5) of the proposition. $\blacksquare$

### 4. The zoo: one stamp, many objects

Now we stamp "vector space" on wildly different objects. In each case, say what the vectors are, what the scalars are, how to add, how to scale, and what zero is.

| Space | Vectors | Addition / scaling | Zero |
|---|---|---|---|
| $F^n$ | lists $(x_1, \dots, x_n)$ with $x_i \in F$ | entrywise | $(0, \dots, 0)$ |
| $\mathcal{P}(F)$, $\mathcal{P}_n(F)$ | polynomials (of degree $\le n$) | add and scale coefficients | the zero polynomial |
| $F^S$, e.g. $\mathbb{R}^{\mathbb{R}}$ | all functions $S \to F$ | pointwise: $(f+g)(x) = f(x)+g(x)$, $(cf)(x) = c\,f(x)$ | the function $x \mapsto 0$ |
| $\lbrace y : y'' + y = 0\rbrace$ | twice-differentiable solutions | pointwise | $y = 0$ |
| $F^{\infty}$ | sequences $(a_1, a_2, \dots)$ | entrywise | $(0, 0, \dots)$ |
| $\mathbb{F}_2^n$ | bit strings of length $n$ | bitwise XOR / multiply by 0 or 1 | $00\cdots0$ |
| $M_{m\times n}(F)$ | $m \times n$ matrices | entrywise | zero matrix |

The function space $F^S$ is the mother of them all: $F^n$ is functions $\lbrace 1, \dots, n\rbrace \to F$, sequences are functions $\lbrace 1, 2, 3, \dots\rbrace \to F$, and an audio clip is a function from a time interval to $\mathbb{R}$. Polynomials and ODE solutions are *subspaces* of $\mathbb{R}^{\mathbb{R}}$.

**Bits.** In $\mathbb{F}_2^n$, the rule $1 + 1 = 0$ means every vector is its own negative: $v + v = (1 + 1)v = 0\,v = 0$. Addition is XOR. This is the vector space of error-correcting codes and of the "Lights Out" puzzle (↪ side quest "Linear algebra over $\mathbb{F}_2$"). It is a reminder that "vector space" does not mean "geometric": $\mathbb{F}_2^3$ has exactly 8 vectors.

**Non-examples.** Just as important is seeing the stamp *bounce off*.

- **The positive reals under ordinary addition and multiplication by real scalars.** Not closed under scaling: $(-1)\cdot 2 = -2$ is not positive. There is also no zero vector ($0$ is not positive) and no additive inverses.
- **Points on the unit sphere $S^2 \subset \mathbb{R}^3$.** Not closed under addition: $(1,0,0) + (0,1,0) = (1,1,0)$ has length $\sqrt{2}$. Not closed under scaling. And the origin, which would have to be the zero vector, isn't on the sphere. (The sphere is curved; it only looks like a vector space up close. That idea becomes manifolds and tangent spaces in ↪ S3E05–06.)
- **A line not through the origin**, such as $\lbrace (x, y) : y = 2x + 1\rbrace$. It does not contain $0$. Adding two of its points gives $y = 2x + 2$, which is off the line.
- **Solutions of a nonlinear equation**, such as $y' = y^2$. Both $y = 0$ and $y = -1/(x - 1)$ are solutions on $x < 1$, but $2y$ is not a solution when $y \neq 0$: $(2y)' = 2y^2 \ne (2y)^2 = 4y^2$.

### 5. The payoff: superposition, and why linear is everywhere

Why are all four cold-open objects vector spaces? Arrows and polynomials are vector spaces by construction. But the solutions of $y'' + y = 0$ being a vector space is a *fact about the equation*. The reason is that the operator $L(y) = y'' + y$ respects adding and scaling:

$$L(y_1 + y_2) = L(y_1) + L(y_2), \qquad L(c\,y) = c\,L(y).$$

If $L(y_1) = 0$ and $L(y_2) = 0$, then $L(a y_1 + b y_2) = a\cdot 0 + b \cdot 0 = 0$. This is the **superposition principle**: *for a linear equation, any combination of solutions is a solution.* It is why two sound waves can pass through each other unchanged, why the electric fields of two charges simply add, and why quantum states can be superposed. Sound in air, small vibrations of a string, electromagnetism in a vacuum, and the Schrödinger equation are all (to excellent approximation) linear.

And when the world *isn't* linear, linearity is still the first approximation. The derivative of a function at a point is the best *linear* approximation to it there: $f(a + h) \approx f(a) + f'(a)\,h$. Calculus is local linearization. In Season 3 we make this literal: at every point of a curved surface sits a flat **tangent space**, a genuine vector space (↪ S3E06). So linear algebra is not one topic among many. It is the language in which the first-order behavior of *everything* is written.

### 6. Zoom out: build vs. describe

**Build or Describe?** We could *build* a vector space as $\mathbb{R}^n$: lists of numbers. Or we can *describe* one: any set with addition and scaling satisfying eight laws. The description is the season's stance. It is what lets one theorem apply simultaneously to arrows, polynomials, sounds, and differential equations, and it is why we will be careful, all season, to separate what is true about *the space* from what is true about *a particular way of writing it down*. (Teaser: we will see in ↪ S2E02 that every finite-dimensional real vector space secretly *is* $\mathbb{R}^n$, but only after making a choice, and the choice is never unique.)

**Teaser.** Polynomials of degree at most 2 seem to need three numbers to describe. Solutions of $y'' + y = 0$ seem to need two. Functions $\mathbb{R} \to \mathbb{R}$ seem to need infinitely many. Is "how many numbers you need" a real property of the space, or an artifact of how we chose to write it? Next episode: dimension.

## Worked examples

### Example 1: The solutions of $y'' + y = 0$ form a vector space

Let $S = \lbrace y : \mathbb{R} \to \mathbb{R} \mid y \text{ is twice differentiable and } y'' + y = 0\rbrace$. We show $S$ is a subspace of $\mathbb{R}^{\mathbb{R}}$.

- **Zero:** the function $y = 0$ has $y'' = 0$, so $y'' + y = 0 + 0 = 0$. So $0 \in S$.
- **Addition:** let $y_1, y_2 \in S$. The sum of twice-differentiable functions is twice differentiable and $(y_1 + y_2)'' = y_1'' + y_2''$. So
  $(y_1 + y_2)'' + (y_1 + y_2) = (y_1'' + y_1) + (y_2'' + y_2) = 0 + 0 = 0.$
- **Scaling:** let $y \in S$, $c \in \mathbb{R}$. Then $(cy)'' = c\,y''$ and $(cy)'' + cy = c(y'' + y) = c \cdot 0 = 0$.

By the subspace test, $S$ is a vector space. Concretely: $\cos x$ and $\sin x$ are in $S$ (since $\cos'' = -\cos$, $\sin'' = -\sin$), so $2\cos x - 5\sin x \in S$. Check directly: $y = 2\cos x - 5 \sin x$, $y' = -2\sin x - 5\cos x$, $y'' = -2\cos x + 5\sin x$, and $y'' + y = 0$. ✓

Contrast: for the *inhomogeneous* equation $y'' + y = 1$, the solution set does not contain $0$ (since $0'' + 0 = 0 \ne 1$), so it is not a subspace. It is a shifted copy of $S$ (every solution is $1 + y$ with $y \in S$), an "affine subspace." We'll meet this pattern again in ↪ S2E04 as "particular solution plus kernel."

### Example 2: A plane is a subspace; a parallel plane is not

Let $U = \lbrace (x, y, z) \in \mathbb{R}^3 : x + 2y - z = 0\rbrace$ and $U' = \lbrace (x, y, z) : x + 2y - z = 1\rbrace$.

For $U$:
- $(0,0,0)$: $0 + 0 - 0 = 0$ ✓.
- If $(x_1,y_1,z_1)$ and $(x_2,y_2,z_2)$ are in $U$, their sum has $(x_1+x_2) + 2(y_1+y_2) - (z_1+z_2) = (x_1 + 2y_1 - z_1) + (x_2 + 2y_2 - z_2) = 0 + 0 = 0$ ✓.
- $c(x,y,z)$ has $cx + 2cy - cz = c(x + 2y - z) = 0$ ✓.

So $U$ is a subspace. For example, $(1, 0, 1)$ and $(0, 1, 2)$ are in $U$, and so is their sum $(1, 1, 3)$: $1 + 2 - 3 = 0$ ✓.

For $U'$: $(0,0,0)$ gives $0 \ne 1$, so $U'$ is not a subspace. Also, $(1,0,0) \in U'$ and $(0,0,-1)\in U'$, but their sum $(1,0,-1)$ gives $1 + 0 + 1 = 2 \ne 1$.

The lesson: a linear condition "$= 0$" cuts out a subspace; "$= 1$" cuts out a parallel copy that misses the origin.

### Example 3: A strange vector space hiding in the positive reals

The positive reals $\mathbb{R}_{>0}$ are *not* a vector space under ordinary $+$. But we can define *different* operations:

$$x \oplus y := xy, \qquad c \odot x := x^c \qquad (x, y > 0,\; c \in \mathbb{R}).$$

Check the axioms. Let $x, y, z > 0$ and $a, b \in \mathbb{R}$.
1. $(x \oplus y) \oplus z = (xy)z = x(yz) = x \oplus (y \oplus z)$ ✓
2. $x \oplus y = xy = yx = y \oplus x$ ✓
3. Zero vector: we need $x \oplus 0_V = x$, i.e. $x \cdot 0_V = x$, so $0_V = 1$. ✓ (The "zero vector" is the number $1$.)
4. Inverse: $x \oplus (1/x) = 1 = 0_V$, so $-x$ is $1/x$ ✓
5. $a \odot (b \odot x) = (x^b)^a = x^{ab} = (ab)\odot x$ ✓
6. $1 \odot x = x^1 = x$ ✓
7. $a \odot (x \oplus y) = (xy)^a = x^a y^a = (a\odot x) \oplus (a \odot y)$ ✓
8. $(a + b)\odot x = x^{a+b} = x^a x^b = (a \odot x)\oplus(b\odot x)$ ✓

So $(\mathbb{R}_{>0}, \oplus, \odot)$ *is* a real vector space. The non-example earlier was about a specific choice of operations, not about the set. In fact the logarithm translates this space perfectly into $(\mathbb{R}, +, \cdot)$: $\log(x \oplus y) = \log x + \log y$ and $\log(c \odot x) = c \log x$. This is our first isomorphism of vector spaces (↪ S2E03), and it's why slide rules worked.

### Example 4: Bit strings and parity

In $\mathbb{F}_2^3$, compute $(1,0,1) + (1,1,0)$: entrywise, $1 + 1 = 0$, $0 + 1 = 1$, $1 + 0 = 1$, giving $(0,1,1)$. And $(1,0,1) + (1,0,1) = (0,0,0)$, so every vector is its own negative.

Let $E = \lbrace v \in \mathbb{F}_2^3 : v_1 + v_2 + v_3 = 0\rbrace$, the "even parity" bit strings. Listing all 8 vectors of $\mathbb{F}_2^3$ and keeping those with an even number of 1s gives
$E = \lbrace 000, 110, 101, 011 \rbrace.$
Subspace test: $000 \in E$; the scalars are only $0$ and $1$, and $0\,v = 000$, $1\,v = v$, so closure under scaling is automatic; for addition, $110 + 101 = 011$, $110 + 011 = 101$, $101 + 011 = 110$, and adding $000$ or a vector to itself stays in $E$. So $E$ is a subspace with 4 elements. A single flipped bit moves a vector out of $E$, which is how a parity bit detects one error.

## Visual and animation notes
1. **Cold open:** four panels (arrow in blue, polynomial graph, audio waveform, fan of sinusoids). Each panel performs "add two of them" and "scale one," with identical on-screen captions "+" and "×c" in each panel, synchronized.
2. **The stamp:** a rubber stamp reading "VECTOR SPACE over F" thuds onto each panel. Use the consistent vector color (blue) for the stamped objects.
3. **Axiom board:** the eight axioms appear as a checklist; axioms 1–4 group under a bracket labeled "abelian group (↩ S1E16)"; 5–8 under "the field acts." Callback stamp "↩ S1E19" when the field $F$ appears.
4. **Proof of $0\,v = 0$:** animate $0\,v = (0+0)v = 0v + 0v$, then a "$-0v$" token slides in on both sides and cancels.
5. **The zoo:** the stamp lands on bit strings (a row of lit/unlit squares), matrices, sequences (a scrolling infinite strip), functions. For $\mathbb{F}_2^n$, show XOR as squares toggling.
6. **Non-examples:** the stamp *bounces* off the positive half-line (a scaling by $-1$ throws a point off the line into a red "forbidden" region) and off a sphere (adding two points produces a point floating off the surface). Then a line not through the origin: two points add and land off the line.
7. **Superposition:** two waves on a string travel toward each other, overlap (sum shown live), and pass through unchanged.
8. **Local linearization:** zoom into a curve until it looks straight; a tangent line labeled "the linear part" appears. Brief flash-forward: tangent planes on a sphere (S3 visual style).
9. **Example 3:** the positive half-line with a logarithmic ruler; $\oplus$ animated as sliding rulers (slide rule nod), mapped by $\log$ onto an ordinary number line, illustrating the isomorphism threads motif.
10. **Teaser:** three objects ($\mathcal{P}_2$, ODE solutions, all functions) with a "how many numbers?" counter showing 3, 2, ∞, and a question mark.

## Common misconceptions
- **Misconception:** A vector is an arrow (or a list of numbers). **Reality:** a vector is any element of a vector space. Arrows and lists are particular vector spaces, and lists are coordinates that depend on a choice of basis.
- **Misconception:** Vectors have lengths and angles. **Reality:** nothing in the axioms mentions length or angle. Those are extra structure (an inner product, a norm) chosen later (S2E14).
- **Misconception:** The zero vector is always the number $0$ or the origin. **Reality:** it is whatever element satisfies $v + 0 = v$. In Example 3 it is the number $1$; in a function space it is the constant zero function.
- **Misconception:** Any set with an addition is a vector space. **Reality:** closure, a zero, inverses, and compatibility with scaling are all required. The set of solutions of $y'' + y = 1$ is closed under neither addition nor scaling.
- **Misconception:** $0\,v = 0$ is an axiom. **Reality:** it is a theorem, proved from distributivity and cancellation.
- **Misconception:** The scalars must be real numbers. **Reality:** any field works, including $\mathbb{C}$, $\mathbb{Q}$, and $\mathbb{F}_2$.

## Exercises
- **Warm-up (computational):** Decide which of these are subspaces of $\mathbb{R}^3$: (a) $\lbrace (x,y,z): x = 3z\rbrace$; (b) $\lbrace (x,y,z): xy = 0\rbrace$; (c) $\lbrace (x,y,z): x + y + z = 0 \text{ and } x = y\rbrace$; (d) $\lbrace (x,y,z) : x \ge 0\rbrace$.
- **Core (conceptual):** Which of these are real vector spaces under pointwise operations? (a) polynomials of degree *exactly* 3; (b) functions $f:\mathbb{R}\to\mathbb{R}$ with $f(5) = 0$; (c) functions with $f(5) = 1$; (d) sequences that converge to $0$; (e) sequences that are eventually $0$; (f) solutions of $y' = 3y$.
- **Stretch (proof):** (i) Show that the commutativity axiom $u + v = v + u$ follows from the other seven. (Hint: expand $(1 + 1)(u + v)$ in two ways.) (ii) Show that $\mathbb{C}$ is a vector space over $\mathbb{R}$, and $\mathbb{R}$ is a vector space over $\mathbb{Q}$. In general, if $F \subseteq K$ are fields, $K$ is a vector space over $F$.

<details><summary>Hints and answers</summary>

**Warm-up.** (a) Yes: it is the kernel of the linear condition $x - 3z = 0$. (b) No: $(1,0,0)$ and $(0,1,0)$ are in it but $(1,1,0)$ is not. (c) Yes: intersection of two subspaces (both conditions are "$= 0$" linear conditions). (d) No: $(1,0,0)$ is in it, $(-1)(1,0,0)$ is not.

**Core.** (a) No: $x^3 + (-x^3 + x) = x$ has degree 1, and $0$ is missing. (b) Yes. (c) No: $0 \notin$ it. (d) Yes: limits of sums and scalar multiples. (e) Yes. (f) Yes: $y' - 3y = 0$ is linear and homogeneous (the solutions are $c\,e^{3x}$).

**Stretch.** (i) $(1+1)(u+v) = (1+1)u + (1+1)v = u + u + v + v$ by axioms 7, 8, 6, while also $(1+1)(u+v) = (u+v) + (u+v) = u + v + u + v$. So $u + u + v + v = u + v + u + v$; add $-u$ on the left and $-v$ on the right of both sides (in a group, a right inverse is also a left inverse, a fact that uses only associativity) to get $u + v = v + u$. (ii) Use the field's own addition for vector addition and its multiplication, restricted to $F \times K$, for scaling; every axiom is a field axiom of $K$. This is the starting point of S3E01: "fields are vector spaces over fields."
</details>

## Historical note
The abstract vector space had a slow birth. Hermann Grassmann, a German secondary-school teacher, published *Die lineale Ausdehnungslehre* ("The Theory of Linear Extension") in 1844. It contained, in a philosophical and very difficult style, the ideas of linear combination, linear independence, dimension, subspaces, and even the exterior product (↪ S2E11). It was almost entirely ignored; Grassmann rewrote it in 1862, again with little success, and turned to Sanskrit studies, where he became better known in his lifetime.

Meanwhile, Hamilton's quaternions (1843) and the vector analysis of Gibbs and Heaviside in the 1880s made arrows in $\mathbb{R}^3$ standard tools in physics. The first axiomatic definition of a vector space (Peano called it a "linear system") appeared in Giuseppe Peano's 1888 book *Calcolo geometrico secondo l'Ausdehnungslehre di H. Grassmann*, written explicitly to make Grassmann's ideas accessible. Peano's definition is essentially the modern one, and he gave examples beyond geometry, including spaces of polynomial functions, noting that some linear systems have infinite dimension. It too was not widely adopted at first. The axioms became standard only in the 1920s, through the work of Banach, Hahn, Wiener, and the rise of abstract algebra in the school of Emmy Noether, and through textbooks such as van der Waerden's *Moderne Algebra* (1930–31).

## Connections
- **Callbacks:** ↩ S1E19 (fields: the scalars), ↩ S1E16 (abelian groups: axioms 1–4), ↩ S1E18 (rings with zero divisors, where part 6 of the proposition fails), ↩ S1E10 ($\mathbb{C}$ as a possible field of scalars).
- **Sets up:** ↪ S2E02 (dimension), ↪ S2E03 (linear maps, isomorphisms like $\log$), ↪ S2E04 (solution sets as particular + kernel), ↪ S2E14 (lengths and angles as extra structure), ↪ S2E20 and ↪ S2E28–29 (function spaces, Hilbert spaces, the audio clip), ↪ S3E01 (fields as vector spaces over subfields), ↪ S3E02 (modules: vector spaces over rings), ↪ S3E06 (tangent spaces: local linearization made literal).
- **Side quests:** "Linear algebra over $\mathbb{F}_2$: codes and puzzles" (attaches after S2E03); history interlude "Grassmann's ignored *Ausdehnungslehre*."

## References
- **Primary / historical**
  - Hermann Grassmann, *Die lineale Ausdehnungslehre, ein neuer Zweig der Mathematik*, Leipzig: Otto Wigand, 1844. English translation by Lloyd C. Kannenberg, *A New Branch of Mathematics: The Ausdehnungslehre of 1844 and Other Works*, Open Court, 1995.
  - Giuseppe Peano, *Calcolo geometrico secondo l'Ausdehnungslehre di H. Grassmann, preceduto dalle operazioni della logica deduttiva*, Turin: Fratelli Bocca, 1888 (the chapter on linear systems contains the axiomatic definition). English translation by Lloyd C. Kannenberg, *Geometric Calculus*, Birkhäuser, 2000.
  - Gregory H. Moore, "The axiomatization of linear algebra: 1875–1940," *Historia Mathematica* 22 (1995).
- **Textbooks**
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (also 3rd ed., 2015), Chapter 1 (sections 1A–1C: $\mathbb{R}^n$ and $\mathbb{C}^n$, definition of vector space, subspaces).
  - Paul R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., Van Nostrand, 1958 (reprinted Springer UTM, 1974), Chapter I (§§1–3: fields, vector spaces, examples).
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., Prentice-Hall, 1971, Chapter 2 (§2.1 Vector Spaces, §2.2 Subspaces).
  - Sergei Treil, *Linear Algebra Done Wrong* (freely available from the author, Brown University), Chapter 1, §1 (vector spaces).
- **Accessible**
  - 3Blue1Brown (Grant Sanderson), *Essence of Linear Algebra* video series, 2016: the chapters "Vectors, what even are they?" and "Abstract vector spaces."
  - Michael J. Crowe, *A History of Vector Analysis: The Evolution of the Idea of a Vectorial System*, University of Notre Dame Press, 1967 (Dover reprint, 1994): Grassmann, Hamilton, Gibbs, and Heaviside.
