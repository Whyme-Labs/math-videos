# S1E03: Arithmetic from Scratch

> **Season / Act:** Season 1 ("What Is a Number?"), Act I: Counting from Nothing · **Target runtime:** 18–22 min ·
> **Prerequisites:** S1E02 (the Peano axioms, induction, the recursion theorem) ·
> **Builds toward:** S1E04 (the same arithmetic on sets), S1E06 (ℤ and ℚ built from ℕ's arithmetic), S1E13 (ordinal arithmetic, where + stops being commutative), S1E15 (Gödel), S1E16 and S1E18 (monoids, groups, rings)

## Learning objectives
By the end of this lesson the viewer can:
1. Write the recursive definitions of addition and multiplication on a Peano structure, and explain why the recursion theorem makes them legitimate.
2. Compute small sums and products such as $2 + 2$ and $2 \cdot 3$ by unwinding the definitions, citing a rule at every step.
3. Prove by induction that addition is associative and commutative, including the two lemmas that commutativity needs.
4. Define $a \le b$ as "some $c$ satisfies $a + c = b$," and verify instances of it.
5. Explain which Peano axioms are used where (for example, why cancellation needs injectivity of $S$).

## Cold open
Last time we pinned down the natural numbers with five sentences. There's a zero. Every number has a "next." Zero comes after nothing. Different numbers have different "nexts." And induction: nothing else sneaks in.

Notice what's *not* on that list. There's no plus sign. No times sign. No "less than." Our whole world is one starting point and one arrow.

So here's the puzzle. From "next" alone, can you get 2 + 2 = 4? Not by looking it up, not by counting on your fingers, but by *proving* it from those five sentences?

And it gets harder. You've known since you were six that 3 + 5 = 5 + 3. Order doesn't matter when you add. But *why*? Our definition of "+" will treat its two inputs completely differently. One of them gets counted up, the other just sits there. Why on earth should swapping them give the same answer?

Today we build arithmetic from scratch. We'll see that the proof of 3 + 5 = 5 + 3, in full generality, takes two lemmas and three inductions. That's not a sign we're doing it wrong. It's a sign of how much the "obvious" facts were hiding.

## The story

### 1. The naive attempt: "+ means counting on"

Intuitively, $a + b$ means "start at $a$ and press *next* $b$ times." That's a fine description, but "press next $b$ times" uses the number $b$ to count how many presses, and counting is what we're trying to explain. We need a definition that uses only $0$ and $S$.

The trick is to define $a + b$ **by recursion on $b$**: say what $a + 0$ is, and say how to get $a + S(b)$ from $a + b$.

> **Definition (addition).** For all $a, b \in \mathbb{N}$:
> $$\text{(A1)}\quad a + 0 = a, \qquad \text{(A2)}\quad a + S(b) = S(a + b).$$

In words: adding zero changes nothing, and adding "one more than $b$" gives "one more than $a + b$."

Why is this a legitimate definition and not just a hopeful pair of equations? Fix $a$. By the **recursion theorem** (↩ S1E02), applied with starting value $a$ and step function $S$, there is exactly one function $f_a : \mathbb{N} \to \mathbb{N}$ with $f_a(0) = a$ and $f_a(S(b)) = S(f_a(b))$. We *define* $a + b := f_a(b)$. Doing this for every $a$ defines + on all pairs.

Multiplication is "repeated addition," defined by recursion in exactly the same way:

> **Definition (multiplication).** For all $a, b \in \mathbb{N}$:
> $$\text{(M1)}\quad a \cdot 0 = 0, \qquad \text{(M2)}\quad a \cdot S(b) = a \cdot b + a.$$

Recall the names $1 := S(0)$, $2 := S(1)$, $3 := S(2)$, $4 := S(3)$, and so on. One immediate fact connects $S$ to +:

> **Lemma 0.** $a + 1 = S(a)$ for every $a$.

*Proof.* $a + 1 = a + S(0) \overset{\text{A2}}{=} S(a + 0) \overset{\text{A1}}{=} S(a)$. ∎

So "next" really is "add one." From now on we may write $n + 1$ for $S(n)$.

### 2. The crisis: the definition is lopsided

Look at (A1) and (A2) again. They recurse on the **second** argument only. The first argument, $a$, just rides along. As a result:

- $3 + 0 = 3$ is true **by definition** (A1), one step.
- $0 + 3 = 3$ is **not** an instance of any rule. To show it you have to unwind: $0 + 3 = S(0 + 2) = S(S(0 + 1)) = S(S(S(0 + 0))) = S(S(S(0))) = 3$.

And that only handles 3. To show $0 + a = a$ for *every* $a$, no amount of unwinding will do, because there are infinitely many $a$. We need induction. The same goes for every "obvious" law: associativity, commutativity, distributivity, cancellation. None of them is an axiom. Each one has to be proved.

This is exactly the right situation. If we had to *assume* commutativity, our five axioms wouldn't really be capturing arithmetic. The fact that commutativity can be *derived* from "next" and induction is the payoff of this episode.

### 3. The construction: proving the laws of addition

Throughout, "induction on $c$" means: let $A$ be the set of $c$ for which the claim holds, check $0 \in A$ and $c \in A \Rightarrow S(c) \in A$, and conclude $A = \mathbb{N}$ by (P5).

> **Theorem 1 (associativity).** $(a + b) + c = a + (b + c)$ for all $a, b, c$.

*Proof.* Induction on $c$, with $a, b$ fixed.
- **Base $c = 0$:** $(a + b) + 0 \overset{\text{A1}}{=} a + b \overset{\text{A1}}{=} a + (b + 0)$.
- **Step:** assume $(a + b) + c = a + (b + c)$. Then
$$(a+b) + S(c) \overset{\text{A2}}{=} S((a+b)+c) \overset{\text{IH}}{=} S(a + (b+c)) \overset{\text{A2}}{=} a + S(b+c) \overset{\text{A2}}{=} a + (b + S(c)).$$
(The last step reads (A2) backward, with $b$ in the role of $a$.) ∎

Now for commutativity. We need two lemmas that say "the first argument behaves like the second."

> **Lemma 1 (zero on the left).** $0 + a = a$ for all $a$.

*Proof.* Induction on $a$.
- **Base:** $0 + 0 = 0$ by (A1).
- **Step:** assume $0 + a = a$. Then $0 + S(a) \overset{\text{A2}}{=} S(0 + a) \overset{\text{IH}}{=} S(a)$. ∎

> **Lemma 2 (successor on the left).** $S(a) + b = S(a + b)$ for all $a, b$.

*Proof.* Induction on $b$, with $a$ fixed.
- **Base:** $S(a) + 0 \overset{\text{A1}}{=} S(a) \overset{\text{A1}}{=} S(a + 0)$.
- **Step:** assume $S(a) + b = S(a + b)$. Then
$$S(a) + S(b) \overset{\text{A2}}{=} S(S(a) + b) \overset{\text{IH}}{=} S(S(a+b)) \overset{\text{A2}}{=} S(a + S(b)). \;∎$$

> **Theorem 2 (commutativity).** $a + b = b + a$ for all $a, b$.

*Proof.* Induction on $b$, with $a$ fixed.
- **Base $b = 0$:** $a + 0 \overset{\text{A1}}{=} a \overset{\text{L1}}{=} 0 + a$.
- **Step:** assume $a + b = b + a$. Then
$$a + S(b) \overset{\text{A2}}{=} S(a+b) \overset{\text{IH}}{=} S(b+a) \overset{\text{L2}}{=} S(b) + a. \;∎$$

That's the full proof: three inductions (Lemma 1, Lemma 2, and the theorem itself), each a few lines. Every step cites an axiom, a definition, or an earlier result. Nothing is "obvious."

**Cancellation, and where (P4) enters.**

> **Theorem 3 (cancellation).** If $a + c = b + c$, then $a = b$.

*Proof.* Induction on $c$. For $c = 0$: $a + 0 = b + 0$ gives $a = b$ by (A1). Step: suppose the statement holds for $c$, and $a + S(c) = b + S(c)$. By (A2), $S(a + c) = S(b + c)$. By **(P4)**, $S$ is injective, so $a + c = b + c$, and by the induction hypothesis $a = b$. ∎

This is where injectivity earns its keep. In the "merge" structure from ↩ S1E02, where (P4) fails, cancellation fails too.

**A fact that uses (P3).** If $a + b = 0$ then $a = b = 0$. *Proof:* if $b \ne 0$, then $b = S(d)$ for some $d$ (↩ S1E02, §3), so $a + b = S(a + d) \ne 0$ by (P3). So $b = 0$, and then $a = a + 0 = 0$. ∎

### 4. Multiplication and order

With addition in hand, the laws of multiplication follow the same pattern, each by induction, using the laws already proved:

> **Theorem 4.** For all $a, b, c \in \mathbb{N}$:
> - $0 \cdot a = 0$ and $1 \cdot a = a = a \cdot 1$;
> - **distributivity:** $a \cdot (b + c) = a\cdot b + a \cdot c$;
> - **associativity:** $(a \cdot b) \cdot c = a \cdot (b \cdot c)$;
> - **commutativity:** $a \cdot b = b \cdot a$.

*Proof sketch.* Prove them roughly in the order listed. Distributivity is by induction on $c$: $a\cdot(b + S(c)) = a \cdot S(b+c) = a\cdot(b+c) + a = (a \cdot b + a\cdot c) + a = a \cdot b + (a \cdot c + a) = a \cdot b + a \cdot S(c)$, using (A2), (M2), the induction hypothesis, associativity of +, and (M2) again. Commutativity of × needs an analogue of Lemma 2, namely $S(a) \cdot b = a \cdot b + b$, proved by induction on $b$. (See the Stretch exercise.)

Now **order.** We don't need a new primitive; "less than or equal" is definable from +.

> **Definition (order).** $a \le b$ means: there exists $c \in \mathbb{N}$ with $a + c = b$. We write $a < b$ for "$a \le b$ and $a \ne b$."

> **Theorem 5.** $\le$ is a **total order** on ℕ:
> - **reflexive:** $a \le a$ (take $c = 0$);
> - **transitive:** if $a + c = b$ and $b + d = e$, then $a + (c + d) = e$ by associativity;
> - **antisymmetric:** if $a + c = b$ and $b + d = a$, then $a + (c + d) = a = a + 0$, so $c + d = 0$ by cancellation (and commutativity), so $c = d = 0$ (by the (P3) fact above), so $a = b$;
> - **total:** for any $a, b$, either $a \le b$ or $b \le a$ (by induction on $b$).
>
> Moreover, $\le$ is compatible with arithmetic: $a \le b$ implies $a + c \le b + c$ and $a\cdot c \le b \cdot c$.

One more property of the order deserves a name, because it's special to ℕ and will be lost in ℤ:

> **Well-ordering principle.** Every nonempty subset of ℕ has a least element.

It's equivalent to induction (given the other axioms). It's the reason "pick the smallest counterexample" arguments work in ℕ, and the proof of the irrationality of √2 in ↪ S1E07 can be phrased this way.

### 5. Payoff: five axioms, all of arithmetic

Everything you learned about whole-number arithmetic in school, from times tables to "you can add in any order" to "if $a < b$ then $a + c < b + c$," is now a **theorem**. Each follows from the five Peano axioms plus the two recursive definitions. Arithmetic didn't need to be assumed; it was hiding inside "next."

In the language of later episodes: $(\mathbb{N}, +, 0)$ is a **commutative monoid** (an associative operation with an identity, and commutative), and the same is true of $(\mathbb{N}, \cdot, 1)$, with distributivity linking them. What ℕ lacks is **inverses**: $3 + x = 0$ has no solution. Repairing that is ↪ S1E06.

**A note on first-order arithmetic.** In second-order Peano arithmetic, the recursion theorem lets us *define* + and × from $S$, as we did. First-order logic can't run that argument (it can't quantify over the functions $f_a$). That's why first-order PA takes + and × as primitive symbols and adopts (A1), (A2), (M1), (M2) as **axioms** (↩ S1E02, §5). The difference has striking consequences. Mojżesz Presburger proved in 1929 that the first-order theory of $(\mathbb{N}, 0, S, +)$, with no multiplication, is complete and decidable: there's an algorithm that settles every statement. Add multiplication and that's lost. First-order PA is incomplete (↪ S1E15).

## Worked examples

### Example 1: 2 + 2 = 4, unwound completely
Recall $2 = S(S(0))$ and $4 = S(S(S(S(0))))$.
$$
\begin{aligned}
2 + 2 &= S(S(0)) + S(S(0)) \\
&= S\big(S(S(0)) + S(0)\big) && \text{(A2), with } b = S(0) \\
&= S\big(S\big(S(S(0)) + 0\big)\big) && \text{(A2), with } b = 0 \\
&= S(S(S(S(0)))) && \text{(A1)} \\
&= 4. && \text{(definition of the name 4)}
\end{aligned}
$$
Notice that the first argument, $S(S(0))$, was never taken apart. The recursion "peels" an $S$ off the second argument and wraps it around the outside, until the second argument is $0$.

### Example 2: 2 · 3 = 6, unwound completely
We need some sums along the way, so compute those first.

- $0 + 2 = 2$: $\;0 + S(S(0)) \overset{\text{A2}}{=} S(0 + S(0)) \overset{\text{A2}}{=} S(S(0 + 0)) \overset{\text{A1}}{=} S(S(0)) = 2$.
- $2 + 2 = 4$: Example 1.
- $4 + 2 = 6$: $\;4 + S(S(0)) \overset{\text{A2}}{=} S(4 + S(0)) \overset{\text{A2}}{=} S(S(4 + 0)) \overset{\text{A1}}{=} S(S(4)) = 6$.

Now the product, peeling the second factor $3 = S(2)$, $2 = S(1)$, $1 = S(0)$:
$$
\begin{aligned}
2 \cdot 3 &= 2 \cdot S(2) = 2 \cdot 2 + 2 && \text{(M2)} \\
2 \cdot 2 &= 2 \cdot S(1) = 2 \cdot 1 + 2 && \text{(M2)} \\
2 \cdot 1 &= 2 \cdot S(0) = 2 \cdot 0 + 2 = 0 + 2 = 2. && \text{(M2), (M1), above}
\end{aligned}
$$
Substituting back up: $2 \cdot 2 = 2 + 2 = 4$, and $2 \cdot 3 = 4 + 2 = 6$. ✓

Compare $3 \cdot 2 = 3 \cdot 1 + 3 = (3 \cdot 0 + 3) + 3 = (0 + 3) + 3 = 3 + 3 = 6$. The two computations take different routes (three additions of 2 versus two additions of 3) and land in the same place, which is commutativity of × in a single instance. (These unwindings were also checked mechanically by a short program implementing (A1), (A2), (M1), (M2) on nested $S(\cdot)$ terms.)

### Example 3: deciding order by finding a witness
**(a) Show $2 \le 5$.** We need $c$ with $2 + c = 5$. Try $c = 3$:
$2 + 3 = S(2 + 2) = S(4) = 5$, using (A2) and Example 1. So $c = 3$ is a witness, and $2 \le 5$. Since $3 \ne 0$, in fact $2 < 5$.

**(b) Show $5 \not\le 2$.** Suppose $5 + c = 2$ for some $c$. Unwind: $5 = S(4) = S(S(3)) = S(S(S(2)))$, so by Lemma 2 three times, $5 + c = S(S(S(2 + c)))$. So $S(S(S(2 + c))) = S(S(0))$. Applying (P4) twice, $S(2 + c) = 0$. But (P3) says $0$ is not a successor. Contradiction. So $5 \not\le 2$.

**(c) Show that $a < b$ iff $S(a) \le b$.** If $a + c = b$ with $c \ne 0$, write $c = S(d)$. Then $S(a) + d = S(a + d) = a + S(d) = b$, so $S(a) \le b$ (Lemma 2, then (A2)). Conversely, if $S(a) + d = b$, then $a + S(d) = b$, so $a \le b$ with witness $S(d) \ne 0$; and $a \ne b$, because $a = a + S(d)$ would give $0 = S(d)$ by cancellation. This is why there's nothing strictly between $a$ and $S(a)$: ℕ is **discrete**. (That's another property we'll lose when we build ℚ in ↪ S1E06.)

### Example 4: an induction proof in full (distributivity on the left of a sum)
**Claim.** $a \cdot (b + c) = a \cdot b + a \cdot c$ for all $a, b, c$.

*Proof.* Fix $a, b$ and induct on $c$.
- **Base $c = 0$:** LHS $= a \cdot (b + 0) \overset{\text{A1}}{=} a \cdot b$. RHS $= a \cdot b + a \cdot 0 \overset{\text{M1}}{=} a\cdot b + 0 \overset{\text{A1}}{=} a \cdot b$. Equal. ✓
- **Step:** assume $a(b + c) = ab + ac$. Then
$$
\begin{aligned}
a \cdot (b + S(c)) &= a \cdot S(b + c) && \text{(A2)} \\
&= a \cdot (b + c) + a && \text{(M2)} \\
&= (ab + ac) + a && \text{(IH)} \\
&= ab + (ac + a) && \text{(associativity of +, Theorem 1)} \\
&= ab + a \cdot S(c). && \text{(M2), read backward}
\end{aligned}
$$
By induction, the claim holds for all $c$. ∎

**Sanity check with numbers:** $2 \cdot (1 + 2) = 2 \cdot 3 = 6$ and $2 \cdot 1 + 2 \cdot 2 = 2 + 4 = 6$. ✓

## Visual and animation notes
1. **Cold open:** the single arrow "next" from E02, with a "+" sign trying to pop into existence and fizzling.
2. **The recursion machine** (key visual): a conveyor belt with two input trays. The left tray holds $S(S(0))$ as nested boxes. The right tray holds $S(S(0))$. Each tick, the machine peels one $S$-layer off the right input and wraps it around the output. When the right tray reads 0, a bell rings and the output shows $S(S(S(S(0))))$, relabeled "4."
3. **Lopsidedness:** two machines side by side, computing $3 + 0$ (bell rings immediately) and $0 + 3$ (three ticks). Caption: "Same answer. Different work. Why?"
4. **Commutativity proof as a flowchart:** three domino lines labeled "Lemma 1," "Lemma 2," "Theorem 2." Each line falls in turn, and the last one only starts once the first two are down.
5. **Cancellation and (P4):** the merge-shaped "ρ" from E02 reappears; two different inputs produce the same output; a red stamp "P4 needed here."
6. **Multiplication as stacked additions:** $2 \cdot 3$ as three rows of 2 dots and $3 \cdot 2$ as two rows of 3 dots. The rectangle rotates by 90°, a picture of commutativity of × (with a caption: the picture is intuition; the proof is induction).
7. **Order as a number-line gap:** $2 \le 5$ shown as a jump of length $c = 3$ from 2 to 5. Then the same jump from 5 to 2 is attempted and the arrow breaks.
8. **Number tower** (recurring motif): the ground floor ℕ gets a plaque, "commutative monoid under + and ×," and the ledger notes "missing: inverses (3 + x = 0)."
9. **Teaser:** a box with a question mark: "Our numbers are built from 'next.' But what is 'next' made of?"

## Common misconceptions
- **Misconception:** "Commutativity of + is an axiom." **Reality:** In Peano arithmetic it's a theorem, proved by induction from the recursive definition. (In some textbook axiom systems for ℤ or ℝ it *is* an axiom, which is a different, characterization-style approach.)
- **Misconception:** "A recursive definition is circular, since + appears on both sides of $a + S(b) = S(a + b)$." **Reality:** The right-hand side uses $+$ only at a *smaller* second argument. The recursion theorem guarantees exactly one function satisfies both equations.
- **Misconception:** "These proofs are pointless because everyone knows $a + b = b + a$." **Reality:** The point is to check that five axioms really capture arithmetic. Also, commutativity of + genuinely *fails* for ordinal numbers: $1 + \omega = \omega \ne \omega + 1$ (↪ S1E13). So it's a real property of ℕ, not a law of logic.
- **Misconception:** "$\le$ has to be added as a new primitive." **Reality:** It's defined from +: $a \le b$ iff $a + c = b$ for some $c$.
- **Misconception:** "1 + 1 = 2 takes hundreds of pages to prove." **Reality:** Here it's two lines: $1 + 1 = 1 + S(0) = S(1 + 0) = S(1) = 2$. The famous long derivation in *Principia Mathematica* (↪ S1E14) starts from pure logic, without Peano's axioms, so it has to build the numbers first.

## Exercises
- **Warm-up (computational):** Using only (A1), (A2), (M1), (M2), compute $3 + 2$ and $3 \cdot 2$, citing a rule at each step. Then define exponentiation by $a^0 = 1$, $a^{S(b)} = a^b \cdot a$ and compute $2^3$.
- **Core (conceptual):** (a) Prove $a + 1 = 1 + a$ directly by induction on $a$, without using Theorem 2. (b) Explain where (P3), (P4), and (P5) were used in the proof that $\le$ is antisymmetric.
- **Stretch (proof):** Prove that multiplication is commutative. First prove $0 \cdot a = 0$, then $S(a) \cdot b = a \cdot b + b$ (both by induction on the right-hand argument), then mimic the proof of Theorem 2.

<details><summary>Hints and answers</summary>

- **Warm-up:** $3 + 2 = S(3 + 1) = S(S(3 + 0)) = S(S(3)) = 5$. $3 \cdot 2 = 3 \cdot 1 + 3 = (3 \cdot 0 + 3) + 3 = (0 + 3) + 3 = 3 + 3 = 6$ (with $0 + 3 = 3$ by Lemma 1 and $3 + 3 = S(S(S(3))) = 6$). $2^3 = 2^2 \cdot 2 = (2^1 \cdot 2) \cdot 2 = ((2^0 \cdot 2)\cdot 2) \cdot 2 = ((1 \cdot 2) \cdot 2)\cdot 2 = (2 \cdot 2) \cdot 2 = 4 \cdot 2 = 8$.
- **Core:** (a) Base: $0 + 1 = 1 = 1 + 0$ (Lemma 1 for the left side is fine, or unwind). Step: $S(a) + 1 = S(S(a)) = S(a + 1) = S(1 + a) = 1 + S(a)$. (b) Cancellation used (P4); "$c + d = 0 \Rightarrow c = d = 0$" used (P3) and the "every nonzero number is a successor" theorem, which used (P5); and every induction used (P5).
- **Stretch:** For $S(a) \cdot b = ab + b$, the step is $S(a) \cdot S(b) = S(a) \cdot b + S(a) = (ab + b) + S(a) = ab + S(b + a) = ab + S(a + b) = (ab + a) + S(b) = a\cdot S(b) + S(b)$, using associativity and commutativity of + freely. Then $a \cdot S(b) = ab + a = ba + a$ and $S(b) \cdot a = ba + a$.

</details>

## Historical note
The idea of defining + and × by recursion from "add one," and proving their laws by induction, goes back to Hermann Grassmann's *Lehrbuch der Arithmetik* (1861), a textbook that was little noticed at the time. Dedekind's *Was sind und was sollen die Zahlen?* (1888) supplied what Grassmann had taken for granted: a proof that recursive definitions actually define functions (the recursion theorem). Peano's *Arithmetices principia* (1889) wrote the definitions in his new symbolism.

The most famous presentation of this material for students is Edmund Landau's *Grundlagen der Analysis* (1930; English translation *Foundations of Analysis*, 1951). Landau starts from Peano's axioms (beginning, as Peano did, with 1) and proves everything, theorem by numbered theorem, in a deliberately terse "Satz–Beweis" style, before going on to fractions, cuts, real and complex numbers. Landau's preface famously begs the reader to forget what they know and accept only what is proved.

In 1929 Mojżesz Presburger, then a student in Warsaw, proved that arithmetic with addition alone is decidable. Kurt Gödel's incompleteness theorem two years later showed that adding multiplication changes everything (↪ S1E15).

## Connections
- **Callbacks:** ↩ S1E02 (Peano axioms, the recursion theorem, the broken "merge" model, first- vs. second-order PA); ↩ S1E01 (the promise to earn every fact)
- **Sets up:**
  - ↪ S1E04: the same arithmetic, now with numbers built from sets
  - ↪ S1E06: ℤ is built from pairs of naturals using + and cancellation; ℚ from pairs of integers using ×
  - ↪ S1E07: well-ordering gives a "smallest counterexample" proof that √2 is irrational
  - ↪ S1E13: ordinal addition, where commutativity fails ($1 + \omega \ne \omega + 1$)
  - ↪ S1E14: the long road to 1 + 1 = 2 in *Principia Mathematica*
  - ↪ S1E15: Gödel's incompleteness for first-order PA (with ×), versus Presburger's decidable arithmetic (without ×)
  - ↪ S1E16, S1E18: monoids, groups, and rings; ℕ as a commutative monoid
- **Side quests:** Proof assistants (after S1E14): the proofs in §3 are exactly the first levels of Kevin Buzzard's *Natural Number Game* in Lean.

## References
- **Primary / historical**
  - Hermann Grassmann, *Lehrbuch der Arithmetik für höhere Lehranstalten* (1861).
  - Richard Dedekind, *Was sind und was sollen die Zahlen?* (1888); English in *Essays on the Theory of Numbers*, trans. W. W. Beman (1901). The recursion theorem and the definitions of addition and multiplication.
  - Giuseppe Peano, *Arithmetices principia, nova methodo exposita* (1889); partial English translation in van Heijenoort (ed.), *From Frege to Gödel* (1967).
- **Textbooks**
  - Edmund Landau, *Foundations of Analysis* (German original *Grundlagen der Analysis*, 1930; English trans. F. Steinhardt, 1951), Chapter 1 ("Natural Numbers").
  - Terence Tao, *Analysis I* (3rd ed., 2016), Chapter 2, §2.2 ("Addition") and §2.3 ("Multiplication").
  - Paul R. Halmos, *Naive Set Theory* (1960), §13 ("Arithmetic") and §14 ("Order").
- **Accessible**
  - Kevin Buzzard, *The Natural Number Game*, an interactive online game (Imperial College London) in which you prove the laws of ℕ in the Lean proof assistant from Peano's axioms.
  - Stanford Encyclopedia of Philosophy, entry "Dedekind's Contributions to the Foundations of Mathematics."
