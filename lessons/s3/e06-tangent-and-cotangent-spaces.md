# S3E06: Tangent Vectors and Covectors: Linear Algebra at Every Point

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E01 ("calculus is local linearization"), S2E03–S2E04 (linear maps, matrices, change of basis), S2E06 (covectors, dual bases, opposite transformation laws), S2E08 (the dual map), S3E05 (charts, transition maps, smooth maps); multivariable calculus (partial derivatives, the Jacobian, the chain rule) ·
> **Builds toward:** S3E07 (differential forms and pullback), S3E08–S3E09 ($d$, closed vs. exact, Euler characteristic), S3E10 (the gradient via a metric), S3E11 (the Lie algebra as $T_IG$), S3E12 (the chain rule as functoriality)

## Learning objectives
By the end of this lesson the viewer can:
1. Define the tangent space $T_pM$ in two ways (velocities of curves, and derivations of functions), and prove that the two definitions give the same $n$-dimensional vector space.
2. Define the differential $dF_p: T_pM\to T_{F(p)}N$ of a smooth map, show that its matrix in coordinates is the Jacobian, and prove the chain rule as "the differential of a composite is the composite of the differentials."
3. Define the cotangent space $T_p^*M$ and the differential $df$ of a function as a covector field, and compute how its components transform under a change of coordinates.
4. Describe the tangent bundle, vector fields and their flows, and state the hairy ball theorem and the Poincaré–Hopf theorem.

## Cold open
*Narration draft.*

Right now, at every point on the surface of the Earth, the wind is blowing in some direction at some speed. Picture it: a little arrow planted at every spot on the globe.

Two questions. First, a puzzle: is there, right now, at least one place on Earth where the horizontal wind is exactly zero? Not probably: *necessarily*, whatever the weather?

Second, a stranger question: where does that arrow live? It isn't part of the Earth. It isn't really in three-dimensional space either: an ant on the surface, who knows nothing about "up," can still feel the wind. And an arrow on the rotation group, or on spacetime, has no surrounding space at all to point into.

In Season 2 we promised: "calculus is local linearization" (S2E01). Tonight we keep that promise literally: at every point of a curved space we build a genuine vector space of arrows, and right beside it, its dual space of measuring devices.

And the answer to the puzzle is yes. Somewhere on Earth, right now, the air is still.

## The story

### 1. The naive attempt: arrows in the ambient space
For a surface sitting in $\mathbb{R}^3$ there is an obvious answer. The unit sphere $S^2$ has, at each point $p$, a **tangent plane**: all velocities of curves on the sphere passing through $p$. If $\gamma(t)$ stays on the sphere with $\gamma(0)=p$, then differentiating $\gamma\cdot\gamma=1$ gives $2\gamma'(0)\cdot p=0$. So velocities are perpendicular to $p$, and $T_pS^2 = p^{\perp}$, a 2-dimensional subspace of $\mathbb{R}^3$.

This works, and we will use it in Example 1. But as a *definition* it fails three ways:
- **It needs an outside.** $\mathbb{RP}^2$ does not embed in $\mathbb{R}^3$, and spacetime is not embedded in anything (↩ S3E05).
- **It cannot subtract points.** On a sphere, "$q-p$" is a chord through the interior, invisible to the ant.
- **It hides the coordinates' behavior.** S2E06 taught us that vectors and covectors respond *oppositely* to a change of basis. Which one is a velocity? Which one is a derivative?

### 2. The crisis: what is a vector at a point, with nothing around it?
We need a definition of "a vector at $p$" that uses only the manifold. Two things an ant *can* do at $p$:
1. Walk along a curve through $p$ and note its **velocity**.
2. Measure how fast every function (temperature, altitude, pressure) is **changing** in that direction.

Each gives a definition, and remarkably they give the same vector space.

### 3. The construction: two definitions, one space
Fix a smooth $n$-manifold $M$, a point $p$, and write $C^\infty(M)$ for the smooth functions $M\to\mathbb{R}$.

> **Definition A (velocities).** Two smooth curves $\gamma_1,\gamma_2:(-\varepsilon,\varepsilon)\to M$ with $\gamma_1(0)=\gamma_2(0)=p$ are **tangent at $p$** if $(\varphi\circ\gamma_1)'(0)=(\varphi\circ\gamma_2)'(0)$ in some chart $\varphi$ around $p$. A **tangent vector** is an equivalence class $[\gamma]$.

The condition does not depend on the chart: in another chart $\psi$, $(\psi\circ\gamma)'(0)=D(\psi\circ\varphi^{-1})\big(\varphi(p)\big)\,(\varphi\circ\gamma)'(0)$ by the ordinary chain rule, and an invertible matrix sends equal vectors to equal vectors. This is the **quotient** move from S1E05: curves with the same velocity blur into one glowing blob, and the blob is the vector. The map $[\gamma]\mapsto(\varphi\circ\gamma)'(0)$ is a bijection onto $\mathbb{R}^n$ (the straight line $t\mapsto\varphi^{-1}(\varphi(p)+ta)$ hits every $a$), so we can transport $\mathbb{R}^n$'s addition and scaling. A different chart transports them through the *linear* map $D(\psi\circ\varphi^{-1})$, so the vector space structure is the same.

> **Definition B (derivations).** A **derivation at $p$** is a linear map $v: C^\infty(M)\to\mathbb{R}$ satisfying the Leibniz rule
> $$v(fg)=f(p)\,v(g)+g(p)\,v(f).$$
> The derivations at $p$ form a vector space $\operatorname{Der}_p(M)$, using pointwise operations.

Definition B is pure thesis: **a tangent vector is what it does to functions.** It never mentions charts, curves, or an ambient space. Example: in a chart with coordinates $x^1,\dots,x^n$, the partial derivative
$$\frac{\partial}{\partial x^i}\Big|_p : f\mapsto \frac{\partial (f\circ\varphi^{-1})}{\partial x^i}\big(\varphi(p)\big)$$
is a derivation at $p$, by the product rule.

> **Theorem 1 (the two definitions agree).** The map $\Phi:[\gamma]\mapsto v_\gamma$, where $v_\gamma(f)=(f\circ\gamma)'(0)$, is a linear isomorphism from velocities to derivations. Consequently $\dim T_pM=n$, with basis $\partial/\partial x^1|_p,\dots,\partial/\partial x^n|_p$.

**Proof.** Work in a chart $\varphi$ with $\varphi(p)=0$; write $\hat f=f\circ\varphi^{-1}$ and $a=(\varphi\circ\gamma)'(0)$.

*Well defined and linear.* By the chain rule in $\mathbb{R}^n$, $v_\gamma(f)=(\hat f\circ\varphi\circ\gamma)'(0)=\sum_i a^i\,\partial_i\hat f(0)$. This depends only on $a$, hence only on $[\gamma]$, and is linear in $a$. So $\Phi[\gamma]=\sum_i a^i\,\partial/\partial x^i|_p$. That is a derivation (the product rule), and $\Phi$ is linear.

*Two facts about any derivation $v$.* (i) $v$ kills constants: $v(1)=v(1\cdot1)=2v(1)$, so $v(1)=0$. (ii) $v$ is **local**: if $f=g$ on a neighborhood $U$ of $p$, then $v(f)=v(g)$. Choose a smooth bump function $\beta$ with $\beta(p)=1$ and support inside $U$. Then $\beta\,(f-g)=0$ everywhere, so $0=v\big(\beta(f-g)\big)=\beta(p)\,v(f-g)+(f-g)(p)\,v(\beta)=v(f-g)$. Locality lets us apply $v$ to functions defined only near $p$, such as the coordinate functions $x^i$ (multiply them by a bump; the value does not depend on the bump).

*Hadamard's lemma.* On a ball around $0$, every smooth $\hat f$ can be written
$$\hat f(x)=\hat f(0)+\sum_i x^i g_i(x),\qquad g_i(x)=\int_0^1\partial_i\hat f(tx)\,dt,\qquad g_i(0)=\partial_i\hat f(0).$$
(Differentiate $t\mapsto\hat f(tx)$ and integrate from $0$ to $1$.)

*Every derivation is a velocity.* Let $v$ be a derivation and put $a^i=v(x^i)$. Using (i), (ii) and Leibniz on Hadamard's formula, and $x^i(p)=0$,
$$v(f)=0+\sum_i\big(x^i(p)\,v(g_i)+g_i(p)\,v(x^i)\big)=\sum_i a^i\,\partial_i\hat f(0).$$
So $v=\Phi[\gamma]$ for the straight-line curve $\gamma(t)=\varphi^{-1}(ta)$: $\Phi$ is onto.

*Injective.* If $\Phi[\gamma]=0$, apply it to $x^i$: $0=v_\gamma(x^i)=a^i$ for every $i$, so $a=0$ and $[\gamma]$ is the zero class.

Hence $\Phi$ is an isomorphism, and since the $\partial/\partial x^i|_p$ are the images of the standard basis $e_i$, they form a basis. $\blacksquare$

**Build or Describe?** Velocities of curves are a *construction*: a quotient of a big set of curves. Derivations are a *description*: anything that differentiates functions according to the Leibniz rule. Theorem 1 says the description pins down exactly the object we built (compare Dedekind's theorem, ↩ S1E02). We write $T_pM$ for either.

**How components change.** If $y^1,\dots,y^n$ is a second chart, then applying both sides to a function and using the chain rule,
$$\frac{\partial}{\partial x^i}=\sum_j\frac{\partial y^j}{\partial x^i}\,\frac{\partial}{\partial y^j},\qquad\text{so}\qquad v_y^j=\sum_i\frac{\partial y^j}{\partial x^i}\,v_x^i .$$
The components of a vector are multiplied by the Jacobian $J=\partial y/\partial x$. Remember this; its mirror image is coming in Section 5.

### 4. The derivative is a linear map
Now the promise of S2E01 and the table at the head of this act: the derivative of a smooth map is a linear map between tangent spaces.

> **Definition (differential).** For a smooth map $F:M\to N$, the **differential** (or pushforward) at $p$ is
> $$dF_p:T_pM\to T_{F(p)}N,\qquad dF_p(v)(g)=v(g\circ F)\quad (g\in C^\infty(N)).$$
> In terms of curves: $dF_p[\gamma]=[F\circ\gamma]$. "Push the curve forward, take its velocity."

$dF_p(v)$ is a derivation at $F(p)$ (Leibniz for $v$ applied to $(g_1\circ F)(g_2\circ F)$), and $dF_p$ is linear in $v$.

**Its matrix is the Jacobian.** In coordinates $x$ near $p$ and $y$ near $F(p)$, write $F^i=y^i\circ F$. Then $dF_p(\partial/\partial x^j)$ applied to $y^i$ is $\partial F^i/\partial x^j$, so
$$dF_p\Big(\frac{\partial}{\partial x^j}\Big)=\sum_i\frac{\partial F^i}{\partial x^j}(p)\,\frac{\partial}{\partial y^i}.$$
Column $j$ holds the image of the $j$-th basis vector: exactly S2E04's recipe for the matrix of a linear map. The Jacobian matrix is the *shadow* of $dF_p$ in the coordinate bases, and changing charts changes the shadow, not the map (↩ S2E04).

> **Theorem 2 (chain rule).** If $F:M\to N$ and $G:N\to P$ are smooth, then for every $p\in M$
> $$d(G\circ F)_p=dG_{F(p)}\circ dF_p,\qquad\text{and}\qquad d(\mathrm{id}_M)_p=\mathrm{id}_{T_pM}.$$

**Proof.** Let $v\in T_pM$ and $h\in C^\infty(P)$. Unwinding the definition three times,
$$d(G\circ F)_p(v)(h)=v\big(h\circ G\circ F\big)=v\big((h\circ G)\circ F\big)=dF_p(v)(h\circ G)=dG_{F(p)}\big(dF_p(v)\big)(h).$$
Since this holds for every $h$, the two derivations are equal. For the identity, $d(\mathrm{id})_p(v)(h)=v(h\circ\mathrm{id})=v(h)$. $\blacksquare$

Taking matrices, Theorem 2 becomes the multivariable chain rule $J_{G\circ F}(p)=J_G(F(p))\,J_F(p)$: the composite of linear maps has the product matrix (↩ S2E04). The proof was three equal signs because the analysis was paid for in Theorem 1. In the curve picture it is even shorter: $(G\circ F)\circ\gamma=G\circ(F\circ\gamma)$. **The chain rule is associativity of composition**, once derivatives are linear maps between the right spaces.

A corollary that S3E05 took on faith: if $F$ is a diffeomorphism, then $dF_p\circ d(F^{-1})_{F(p)}=d(\mathrm{id})=\mathrm{id}$, so $dF_p$ is invertible and $\dim M=\dim N$.

### 5. Covectors at every point: $df$, once and for all
Every vector space has a dual (↩ S2E06), so every tangent space does.

> **Definition (cotangent space, differential of a function).** The **cotangent space** is $T_p^*M=(T_pM)^*$. For $f\in C^\infty(M)$, the **differential** $df_p\in T_p^*M$ is
> $$df_p(v)=v(f)\qquad(\text{for a curve: } df_p[\gamma]=(f\circ\gamma)'(0)).$$

$df_p$ eats a velocity and returns the rate of change of $f$ along it: linearly. It needs no metric, no notion of "perpendicular," no ambient space. In S2E06 we argued that $df$ was "naturally a covector"; now that statement is a definition.

> **Proposition.** In a chart, $dx^1_p,\dots,dx^n_p$ is the dual basis of $\partial/\partial x^1|_p,\dots,\partial/\partial x^n|_p$, and
> $$df=\sum_i\frac{\partial f}{\partial x^i}\,dx^i .$$

*Proof.* $dx^i(\partial/\partial x^j)=\partial x^i/\partial x^j=\delta^i_j$. By S2E06's formula $\varphi=\sum_i\varphi(b_i)\beta^i$, the coefficient of $dx^i$ in $df$ is $df(\partial/\partial x^i)=\partial f/\partial x^i$. $\blacksquare$

The formula you memorized in calculus, $df=f_x\,dx+f_y\,dy$, is the expansion of a covector in a dual basis. $dx$ is not an infinitely small number. It is the coordinate reader: the covector that returns a vector's $x$-component.

**The transformation law, mirrored.** In a second chart, $dy^j=\sum_i\frac{\partial y^j}{\partial x^i}\,dx^i$, so the components $a_i=\partial f/\partial x^i$ of $df$ change by
$$\frac{\partial f}{\partial x^i}=\sum_j\frac{\partial f}{\partial y^j}\,\frac{\partial y^j}{\partial x^i},\qquad\text{i.e.}\qquad [df]_x=[df]_y\,J .$$
Vector components: $v_y=J\,v_x$. Covector components: $a_x=a_y\,J$, i.e. $a_y=a_x J^{-1}$. They move oppositely, and the pairing $a_y v_y=a_xJ^{-1}Jv_x=a_xv_x$ is invariant. This is S2E06's market (prices and quantities scaling in opposite directions) at every point of a curved space, with the Jacobian playing the role of the change-of-basis matrix.

**Pullback.** Covectors move backward. For $F:M\to N$ and $\alpha\in T^*_{F(p)}N$, define $(F^*\alpha)=\alpha\circ dF_p\in T^*_pM$. This is the dual map of S2E08, $(dF_p)^*$. Applied to $dg$ it gives $F^*(dg)=d(g\circ F)$: the chain rule again, seen from the covector side. S3E07 builds the whole theory of integration on this one move.

**The gradient is not $df$.** The arrow $\nabla f$ is what you get by converting $df$ into a vector with an inner product (↩ S2E16). On a manifold that requires a choice of inner product on every tangent space, a Riemannian metric (↪ S3E10). Example 2 shows the difference concretely.

### 6. Fields, flows, and a sphere that cannot be combed
**The tangent bundle.** Put all tangent spaces together: $TM=\{(p,v):p\in M,\ v\in T_pM\}$. Charts $(x^i,v^i)$ with transition maps $(x,v)\mapsto\big(\psi\circ\varphi^{-1}(x),\ D(\psi\circ\varphi^{-1})(x)\,v\big)$ make $TM$ a $2n$-manifold. Likewise the **cotangent bundle** $T^*M$, the phase space of classical mechanics.

> **Definition (vector field, covector field).** A **vector field** is a smooth choice $X_p\in T_pM$ for every $p$; in coordinates $X=\sum_iX^i\,\partial/\partial x^i$ with smooth $X^i$. A **covector field** (a **1-form**) is a smooth choice $\alpha_p\in T_p^*M$; in coordinates $\alpha=\sum_i a_i\,dx^i$. Every $df$ is a 1-form.

A vector field acts on functions, $Xf=df(X)$, producing a new function. This is the derivation picture made global, and it is how S3E11's Lie bracket generalizes: $[X,Y]f=X(Yf)-Y(Xf)$ is again a vector field.

**Flows.** An **integral curve** of $X$ is a curve with $\gamma'(t)=X_{\gamma(t)}$: in coordinates, a system of ODEs. By ODE existence and uniqueness, on a **compact** manifold these curves exist for all time, and following them for time $t$ gives the **flow** $\theta_t:M\to M$, diffeomorphisms with $\theta_s\circ\theta_t=\theta_{s+t}$. Examples: on $\mathbb{R}^n$ the linear field $X(x)=Ax$ has flow $\theta_t=e^{tA}$ (↩ S2E13); on $S^2$ the field $X=(-y,x,0)$ has flow "rotate by angle $t$ about the $z$-axis," $e^{tL_z}$ (↪ S3E11).

**Can you comb a sphere?** The rotation field $(-y,x,0)$ vanishes at both poles. Every attempt to fix this seems to create a new bald spot somewhere else.

> **Theorem (hairy ball; Poincaré for $S^2$, Brouwer for $S^{2k}$).** Every continuous tangent vector field on an even-dimensional sphere $S^{2k}$ vanishes at some point.

*Proof sketch.* Suppose $v$ is a nowhere-zero tangent field on $S^n$. Normalize: $w(x)=v(x)/|v(x)|$, a unit vector perpendicular to $x$. Then
$$H(x,t)=\cos(\pi t)\,x+\sin(\pi t)\,w(x)$$
lies on the sphere ($|H|^2=\cos^2+\sin^2=1$, since $x\perp w$), and deforms the identity ($t=0$) continuously into the antipodal map $x\mapsto-x$ ($t=1$). Topology assigns to each continuous map $S^n\to S^n$ an integer, its **degree** (how many times it wraps the sphere around itself, with sign), which does not change under continuous deformation. The identity has degree $1$. The antipodal map is a composite of $n+1$ reflections, each of degree $-1$, so it has degree $(-1)^{n+1}$. If $n$ is even, that is $-1\neq1$: contradiction. $\square$

For odd spheres the theorem fails: $(x_1,x_2,x_3,x_4)\mapsto(-x_2,x_1,-x_4,x_3)$ is a nowhere-zero tangent field on $S^3$. The torus also has one ($\partial/\partial x$ on $\mathbb{R}^2/\mathbb{Z}^2$, ↩ S3E05). The difference between these spaces is counted by a single number:

> **Theorem (Poincaré–Hopf, stated).** If $X$ is a vector field with finitely many zeros on a compact manifold $M$, the sum of the **indices** of its zeros (in a chart around each zero, the number of times $X$ turns around while you walk once around a small circle) equals the Euler characteristic $\chi(M)$.

For the sphere, $\chi(S^2)=2\neq0$, so there must be zeros; for the torus, $\chi=0$ and there needn't be. Example 3 checks the count on two fields. The Euler characteristic comes back in S3E09 (as an alternating sum of dimensions) and S3E10 (as total curvature).

**Payoff.** The horizontal wind is a continuous tangent vector field on (essentially) a sphere. So at every instant the horizontal wind vanishes somewhere. And the arrow lives in $T_pS^2$, a vector space the sphere builds for itself: all ways of differentiating temperature, pressure and altitude at $p$.

**Zoom out (thread 6: duality, or measuring things).** At every point of a manifold, Season 2 Act II is replayed in full: vectors $T_pM$, measuring devices $T_p^*M$, dual bases $\partial_i$ and $dx^i$, opposite transformation laws, and the dual map $F^*$ running backward.

**Teaser.** We can now pair $df$ with a velocity. What do we get if we *add up* such pairings along a whole curve, or ask for something that eats two velocities and measures the area they span? (↪ S3E07)

## Worked examples

### Example 1: The tangent space of $S^2$ at $p=\left(\tfrac23,\tfrac13,\tfrac23\right)$, three ways
First check $p$ is on the sphere: $\tfrac49+\tfrac19+\tfrac49=1$. ✓

**(a) Ambient: velocities are perpendicular to $p$.** From Section 1, $T_pS^2=p^\perp=\{(a,b,c):2a+b+2c=0\}$. A basis: $(1,-2,0)$ and $(0,-2,1)$ (each satisfies $2a+b+2c=0$).

**(b) Kernel of a derivative.** $S^2=f^{-1}(1)$ for $f=x^2+y^2+z^2$, and $Df_p=2p^{\mathsf T}=\left(\tfrac43,\tfrac23,\tfrac43\right)$. A curve in $S^2$ keeps $f$ constant, so velocities lie in $\ker Df_p$. That kernel has dimension $3-1=2$ by rank–nullity (↩ S2E03), and $\dim T_pS^2=2$ by Theorem 1, so $T_pS^2=\ker Df_p$: the same plane as (a).

**(c) Intrinsic: the chart basis $\partial_u,\partial_v$.** Use the north-pole stereographic chart of S3E05, with inverse
$$X(u,v)=\left(\frac{2u}{r^2+1},\ \frac{2v}{r^2+1},\ \frac{r^2-1}{r^2+1}\right),\qquad r^2=u^2+v^2 .$$
Our point has $u=\frac{x}{1-z}=\frac{2/3}{1/3}=2$ and $v=\frac{1/3}{1/3}=1$. Check: $r^2=5$, $X(2,1)=\left(\tfrac46,\tfrac26,\tfrac46\right)=p$. ✓

The vector $\partial/\partial u|_p$ is the velocity of $t\mapsto X(2+t,1)$, which is $dX(\partial_u)$, the first column of the Jacobian. Differentiating, $\partial_u\!\left(\frac{2u}{r^2+1}\right)=\frac{2(r^2+1)-4u^2}{(r^2+1)^2}$, $\partial_u\!\left(\frac{2v}{r^2+1}\right)=\frac{-4uv}{(r^2+1)^2}$, $\partial_u\!\left(\frac{r^2-1}{r^2+1}\right)=\frac{4u}{(r^2+1)^2}$. At $(2,1)$, $(r^2+1)^2=36$:
$$\frac{\partial}{\partial u}\Big|_p=\left(\frac{12-16}{36},\ \frac{-8}{36},\ \frac{8}{36}\right)=\left(-\tfrac19,-\tfrac29,\tfrac29\right),\qquad \frac{\partial}{\partial v}\Big|_p=\left(-\tfrac29,\ \tfrac29,\ \tfrac19\right)$$
(the second from $\frac{-4uv}{36},\frac{2(r^2+1)-4v^2}{36},\frac{4v}{36}$).

**Check.** $p\cdot\partial_u=\tfrac23(-\tfrac19)+\tfrac13(-\tfrac29)+\tfrac23\cdot\tfrac29=\frac{-2-2+4}{27}=0$ ✓ and $p\cdot\partial_v=\frac{-4+2+2}{27}=0$ ✓. They are independent, so they span the plane from (a). Bonus: $\partial_u\cdot\partial_v=\frac{2-4+2}{81}=0$ and both have length $\tfrac13$, because stereographic projection preserves angles.

**As derivations.** Let $h=z$ (height). Then $\partial_u h=\tfrac29$ and $\partial_v h=\tfrac19$, the $z$-components above, so $dh_p=\tfrac29\,du+\tfrac19\,dv$ in this chart. An ant walking in the $\partial_u$ direction climbs twice as fast as one walking in the $\partial_v$ direction. (All values verified with sympy.)

### Example 2: $df$ for $f=x^2+y^2$ in polar coordinates
**Cartesian.** $df=2x\,dx+2y\,dy$, components $(2x,2y)$.

**Polar, directly.** In polar coordinates $f=r^2$, so $df=2r\,dr$, components $(2r,0)$.

**Polar, by transforming the covector.** Substitute $x=r\cos\theta$, $y=r\sin\theta$ and $dx=\cos\theta\,dr-r\sin\theta\,d\theta$, $dy=\sin\theta\,dr+r\cos\theta\,d\theta$:
$$\begin{aligned}2x\,dx+2y\,dy&=2r\cos\theta(\cos\theta\,dr-r\sin\theta\,d\theta)+2r\sin\theta(\sin\theta\,dr+r\cos\theta\,d\theta)\\&=2r(\cos^2\theta+\sin^2\theta)\,dr+2r^2(-\cos\theta\sin\theta+\sin\theta\cos\theta)\,d\theta=2r\,dr.\ \checkmark\end{aligned}$$
In matrix form, with $J=\dfrac{\partial(x,y)}{\partial(r,\theta)}=\begin{pmatrix}\cos\theta&-r\sin\theta\\ \sin\theta&r\cos\theta\end{pmatrix}$, the row of components is multiplied on the right: $(2x,\ 2y)\,J=(2r,\ 0)$. That is the covector law $[df]_{\text{polar}}=[df]_{\text{cart}}\,J$ from Section 5.

**Vectors go the other way.** At $(x,y)=(1,1)$, i.e. $r=\sqrt2$, $\theta=\pi/4$, take the vector $v=\partial_x$ (Cartesian components $(1,0)$). Its polar components are $J^{-1}(1,0)^{\mathsf T}=\left(\cos\theta,\ -\tfrac{\sin\theta}{r}\right)=\left(\tfrac{1}{\sqrt2},-\tfrac12\right)$. Pair:
- Cartesian: $df(v)=2\cdot1\cdot1+2\cdot1\cdot0=2$.
- Polar: $df(v)=2\sqrt2\cdot\tfrac1{\sqrt2}+0\cdot(-\tfrac12)=2$. ✓

**The gradient trap.** Now take $g=xy=\tfrac12r^2\sin2\theta$. Its differential has polar components $\big(\partial_rg,\ \partial_\theta g\big)=\big(r\sin2\theta,\ r^2\cos2\theta\big)$. The Euclidean *gradient* vector, written in the basis $\partial_r,\partial_\theta$, is $r\sin2\theta\,\partial_r+\cos2\theta\,\partial_\theta$: the second component is divided by $r^2$, because $\partial_\theta$ has length $r$. The components of $df$ and of $\nabla f$ agree in Cartesian coordinates only because the standard dot product makes the basis orthonormal there (↩ S2E16, ↪ S3E10).

### Example 3: Hairy ball, counted
**Field 1: rotation.** $X=(-y,x,0)$ on $S^2$. It is tangent ($p\cdot X=-xy+yx=0$) and vanishes exactly where $x=y=0$: the two poles. In the north-pole stereographic chart it is $-v\,\partial_u+u\,\partial_v$ (solve $dX_{(u,v)}(a,b)=(-y,x,0)$; checked with sympy), which near the origin of the chart (the south pole) circles once counterclockwise as you go once around: index $+1$. By symmetry the north pole also has index $+1$. Total: $1+1=2=\chi(S^2)$.

**Field 2: the "dipole."** Push the constant field $\partial_u$ on the chart plane onto the sphere. Using Example 1's formulas and $x=\frac{2u}{r^2+1}$, $1-z=\frac{2}{r^2+1}$, its components simplify to the polynomial field
$$W(x,y,z)=\big(1-z-x^2,\ -xy,\ x(1-z)\big).$$
*Tangent:* $x(1-z-x^2)-xy^2+zx(1-z)=x\big(1-(x^2+y^2+z^2)\big)=0$ on the sphere. ✓ *Zeros:* $x(1-z)=0$ forces $x=0$ or $z=1$; if $x=0$ the first component gives $z=1$; and $z=1$ on the sphere means $x=y=0$. So the only zero is the north pole $N$. Near $N$, use the south-pole chart $(s,t)$, related by the inversion $(s,t)=(u,v)/(u^2+v^2)$ of S3E05. Pushing $\partial_u$ through the inversion's Jacobian and simplifying gives the components
$$\big(t^2-s^2,\ -2st\big),\qquad\text{i.e. } -(s+it)^2\ \text{in complex notation}.$$
As $s+it$ goes once around $0$, $(s+it)^2$ goes around *twice*: index $2$. Total again $2=\chi(S^2)$. (Both computations verified with sympy.) One zero of index 2 or two of index 1: the sphere demands a total of 2.

## Visual and animation notes
1. **Cold open:** a rotating globe with animated wind arrows (blue, the *vectors* color) over a weather map. The camera hunts for and finds a calm point; a small glowing "0" marks it.
2. **Naive tangent plane:** a translucent plane touching the sphere at $p$, with arrows lying in it. Then the sphere's ambient space fades to black, leaving the ant on the surface: the plane flickers, "where does this live?" (**Tangent spaces** motif.)
3. **Velocities as a quotient:** many different curves through $p$ (different shapes, same velocity) blur into one glowing blob, which then crystallizes into a single blue arrow (**equivalence class** motif, ↩ S1E05).
4. **Derivations:** the same arrow shown as a machine with one slot: temperature, altitude and pressure maps go in, rates of change come out. Card: "A tangent vector is what it does to functions."
5. **Two definitions agree:** the curve-arrow and the machine-arrow connected by **threads**, sliding onto each other (**bijection / isomorphism** motif).
6. **$dF_p$ as a linear map:** a small grid on the tangent plane at $p$ is carried by $F$ to the tangent plane at $F(p)$, staying straight and parallel (**linear map** motif), while the surfaces themselves bend. The Jacobian appears as the **camera overlay**.
7. **Chain rule:** three manifolds in a row with tangent planes; two grid transforms compose into one. Caption: "chain rule = composition."
8. **$df$ as covector:** orange level-line stacks of $f$ on each tangent plane of a hilly surface (**covectors** motif); a blue arrow crosses some number of sheets. Switch to the polar overlay: the two sets of components churn in opposite directions while an **invariant badge** "$df(v)=2$" stays fixed.
9. **Tangent bundle and flows:** a circle with a line attached at each point sweeping into a cylinder ($TS^1\cong S^1\times\mathbb{R}$); particles drifting along the rotation field on a sphere, stalling at the poles.
10. **Hairy ball:** a fuzzy ball being combed; a cowlick appears and, when combed away, reappears elsewhere. Then the dipole field with its single double-cowlick at $N$, and the index counter reading "2" in both cases.

## Common misconceptions
- **Misconception:** "A tangent vector is an arrow sticking out into the surrounding space." **Reality:** it is intrinsic: a velocity class or a derivation. The ambient picture is one model of $T_pM$ for embedded manifolds.
- **Misconception:** "Tangent spaces at different points are the same space." **Reality:** $T_pM$ and $T_qM$ are different vector spaces with no canonical way to compare them. On $\mathbb{R}^n$ translation identifies them, which is why Season 2 never noticed; elsewhere one needs extra structure (a connection).
- **Misconception:** "$\partial/\partial x$ depends only on the coordinate $x$." **Reality:** it depends on the whole chart, just as a dual basis covector depends on the whole basis (↩ S2E06). With coordinates $(x,w)$ where $w=y-x$, the new $\partial/\partial x$ (holding $w$ fixed) equals $\partial_x+\partial_y$ in the old chart.
- **Misconception:** "$df$ and $\nabla f$ are the same thing." **Reality:** $df$ is a covector field defined with no extra structure; $\nabla f$ needs a metric, and their components differ in non-orthonormal coordinates (Example 2).
- **Misconception:** "The hairy ball theorem says there is somewhere with no wind at all." **Reality:** it concerns the *tangential* (horizontal) component, assumed continuous. Vertical air motion can be nonzero there.

## Exercises
- **Warm-up (computational):** (a) Find a basis of $T_pS^2$ at $p=\frac{1}{\sqrt2}(1,0,1)$. (b) For $F(x,y)=(x^2-y^2,\ 2xy)$ and $G(u,v)=u+v$, compute $J_F$ and $J_G$ at the appropriate points over $(1,1)$ and verify the chain rule against a direct computation of $d(G\circ F)$. (c) Write $d(x)$ for the function $x$ in polar coordinates.
- **Core (conceptual):** (a) Explain why a derivation at $p$ must send every constant function to $0$, and why the zero vector of $T_pM$ is the class of the constant curve. (b) Verify the claim in the misconceptions: in coordinates $(x,w)$ with $w=y-x$, $\partial/\partial x=\partial_x+\partial_y$. Then compute $dw$ and check $dw(\partial/\partial x)=0$. (c) The torus has a nowhere-zero vector field and $S^2$ does not. Use Poincaré–Hopf to predict $\chi(T^2)$, and give a nowhere-zero field on $S^3$.
- **Stretch (proof or exploration):** (a) Show that the tangent bundle $TS^1$ is diffeomorphic to $S^1\times\mathbb{R}$. (b) Prove that $TS^2$ is *not* isomorphic to $S^2\times\mathbb{R}^2$ as a bundle (a smooth family of isomorphisms $T_pS^2\to\mathbb{R}^2$), using the hairy ball theorem. (c) Explore: the hairy ball theorem implies that any continuous map $f:S^2\to S^2$ either has a fixed point or sends some point to its antipode. Prove it.

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) $p^\perp=\{a+c=0\}$: basis $(0,1,0)$, $(1,0,-1)$. (b) $J_F(1,1)=\begin{pmatrix}2&-2\\2&2\end{pmatrix}$, $J_G=(1\ \ 1)$, product $(4,\ 0)$. Directly, $G\circ F=x^2-y^2+2xy$ has gradient $(2x+2y,\ 2x-2y)=(4,0)$ at $(1,1)$. ✓ (c) $\cos\theta\,dr-r\sin\theta\,d\theta$.
- **Core:** (a) $v(1)=v(1\cdot1)=2v(1)$; and $(f\circ\text{const})'(0)=0$ for all $f$. (b) From $x=x$, $y=w+x$: $\partial/\partial x|_w=\frac{\partial x}{\partial x}\partial_x+\frac{\partial y}{\partial x}\partial_y=\partial_x+\partial_y$. $dw=dy-dx$, and $(dy-dx)(\partial_x+\partial_y)=1-1=0$. ✓ (c) $\chi(T^2)=0$ (the sum over an empty set of zeros). On $S^3$: $(-x_2,x_1,-x_4,x_3)$.
- **Stretch:** (a) $(p,v)\mapsto(p,\ v\cdot J p)$, where $J$ is rotation by $90^\circ$, so $Jp$ is the unit tangent at $p$. (b) If $\Phi_p:T_pS^2\to\mathbb{R}^2$ were such a family, $X_p=\Phi_p^{-1}(1,0)$ would be a nowhere-zero field. (c) If $f(x)\ne\pm x$ for all $x$, then $v(x)=f(x)-(f(x)\cdot x)\,x$ is a continuous tangent field with no zeros. Contradiction.

</details>

## Historical note
Tangent planes to surfaces were standard by the time of Gauss's *Disquisitiones generales circa superficies curvas* (1827), but always as planes in $\mathbb{R}^3$. The distinction between quantities that transform like displacements and like derivatives was systematized by Gregorio Ricci-Curbastro in his "absolute differential calculus" of the 1880s and 1890s, culminating in the memoir with Tullio Levi-Civita, "Méthodes de calcul différentiel absolu et leurs applications" (*Mathematische Annalen*, 1900), whose contravariant and covariant components are this episode's vectors and covectors. Henri Poincaré, studying curves defined by differential equations in the 1880s, discovered that the indices of the singular points of a vector field on a closed surface add up to a topological invariant, which yields the hairy ball theorem for $S^2$. L. E. J. Brouwer extended the nonexistence of nowhere-vanishing fields to all even-dimensional spheres in 1912, and Heinz Hopf proved the general index theorem in all dimensions in 1926–27. The intrinsic tangent space came with the abstract manifolds of Weyl and Whitney (↩ S3E05); the definition by derivations became standard in the mid-twentieth century, in part through Claude Chevalley's *Theory of Lie Groups* (1946).

## Connections
- **Callbacks:** ↩ S1E02 (a description that pins down one object), ↩ S1E05 (velocities as equivalence classes), ↩ S2E01 (calculus is local linearization: the promise kept), ↩ S2E03 (rank–nullity: tangent space of a level set), ↩ S2E04 (the Jacobian as the shadow of $dF_p$), ↩ S2E06 (dual bases, $df$ as a covector, opposite transformation laws), ↩ S2E08 (pullback as the dual map), ↩ S2E13 (flows of linear fields are $e^{tA}$), ↩ S2E16 (the gradient needs an inner product), ↩ S3E05 (charts, stereographic projection, transition maps).
- **Sets up:** ↪ S3E07 (1-forms as covector fields; pullback; integrating along curves), ↪ S3E08 ($d$ extends $f\mapsto df$), ↪ S3E09 (closed vs. exact 1-forms; Euler characteristic), ↪ S3E10 (Riemannian metric; gradient via Riesz; Gauss–Bonnet and $\chi$), ↪ S3E11 (Lie algebra $=T_IG$; flows $e^{tX}$; the bracket of vector fields), ↪ S3E12 (the chain rule says $T$ is a functor).
- **Side quests:** Fiber bundles and gauge theory (comparing tangent spaces at different points; $TS^2$ as a nontrivial bundle); Symplectic geometry ($T^*M$ as phase space); Morse theory (zeros of $df$ and the shape of a manifold).

## References
- **Primary / historical:** G. Ricci and T. Levi-Civita, "Méthodes de calcul différentiel absolu et leurs applications," *Mathematische Annalen* 54 (1900). L. E. J. Brouwer, "Über Abbildung von Mannigfaltigkeiten," *Mathematische Annalen* 71 (1912). H. Hopf, "Vektorfelder in $n$-dimensionalen Mannigfaltigkeiten," *Mathematische Annalen* 96 (1927).
- **Textbook:** John M. Lee, *Introduction to Smooth Manifolds*, 2nd ed. (Springer GTM 218, 2013), Ch. 3 "Tangent Vectors" (derivations, velocities, the differential), Ch. 8 "Vector Fields," Ch. 9 "Integral Curves and Flows," Ch. 11 "The Cotangent Bundle."
- **Textbook:** Loring W. Tu, *An Introduction to Manifolds*, 2nd ed. (Springer Universitext, 2011), the chapters on tangent vectors in $\mathbb{R}^n$ as derivations, the tangent space, the tangent bundle, vector fields, and differential 1-forms.
- **Textbook:** Michael Spivak, *Calculus on Manifolds* (1965), Ch. 2 "Differentiation" (the derivative as a linear map; the chain rule).
- **Accessible:** John Milnor, *Topology from the Differentiable Viewpoint* (University Press of Virginia, 1965), including degree, the hairy ball theorem, and the Poincaré–Hopf theorem. John Milnor, "Analytic proofs of the 'hairy ball theorem' and the Brouwer fixed point theorem," *American Mathematical Monthly* 85 (1978).
