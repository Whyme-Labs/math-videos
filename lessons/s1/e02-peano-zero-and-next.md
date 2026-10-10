# S1E02: Peano: Zero and "Next"

> **Season / Act:** Season 1 ("What Is a Number?"), Act I: Counting from Nothing · **Target runtime:** 18–22 min ·
> **Prerequisites:** S1E01; comfort with the idea of a function; having seen a proof by induction helps but isn't required ·
> **Builds toward:** S1E03 (arithmetic from the axioms), S1E04 (a set-theoretic model), S1E13 (non-standard models and Goodstein), S1E15 (Gödel), S1E16 (ℤ as a free group)

## Learning objectives
By the end of this lesson the viewer can:
1. State the five Peano axioms for a structure $(N, 0, S)$.
2. For each of the axioms other than induction, describe a "broken" structure that satisfies the remaining axioms but not that one, and explain which of the remaining axioms rules out "ghost numbers."
3. Use the induction axiom to prove a simple statement, such as "every number other than 0 is a successor."
4. State Dedekind's categoricity theorem (any two models of second-order Peano arithmetic are isomorphic) and sketch its proof.
5. Explain the difference between second-order induction (one axiom about *all* subsets) and first-order induction (a schema, one axiom per formula), and why the first-order version allows non-standard models.

## Cold open
Imagine you have to explain counting to a machine that knows nothing. No digits, no "three apples," no number line. What is the *least* you could tell it so that it could count forever, without ever getting stuck, looping, or wandering off?

Try it. You'd probably say: "There's a starting point. Call it zero." Then: "Every number has a next one." Is that enough?

It isn't. A machine that only knows those two rules might count 0, 1, 2, and then "next" brings it back to 0. A clock does that. Or its "next" might merge two paths: 0 to 1 to 2 to 3, then back to 2, stuck forever in a little loop. Or, strangest of all, alongside the real numbers there might be a second, ghostly chain of "numbers" that you can never reach by counting up from zero.

Each of those is a broken world of numbers, and each is ruled out by one sentence. In 1889 Giuseppe Peano wrote down the sentences you need. There are five. Today we find out why each one is there, and why, with all five in place, there's only one world left: ours.

## The story

### 1. The naive attempt: a start and a "next"

To count you need a place to start and a way to move on. So let's try to capture the natural numbers with just two ingredients.

> **Definition (successor structure).** A **successor structure** is a triple $(N, 0, S)$ where $N$ is a set, $0 \in N$ is a chosen element, and $S : N \to N$ is a function, called the **successor**.

The intended example is $(\mathbb{N}, 0, n \mapsto n+1)$. We write $1 := S(0)$, $2 := S(S(0))$, and so on. We are *not* allowed to use + yet. "$S(n)$" is just a name for the element that comes after $n$, and addition will be defined from $S$ in ↪ S1E03.

The trouble is that lots of structures fit this description. Here are three.

- **The loop.** $N = \lbrace 0, 1, 2 \rbrace$, with $S(0) = 1$, $S(1) = 2$, $S(2) = 0$. Counting goes around in a circle, like a 3-hour clock.
- **The merge (a "ρ" shape).** $N = \lbrace 0, 1, 2, 3 \rbrace$, with $S(0) = 1$, $S(1) = 2$, $S(2) = 3$, $S(3) = 2$. Counting goes 0, 1, 2, 3, 2, 3, 2, 3, … forever.
- **The ghost chain.** $N = \lbrace 0, 1, 2, \dots \rbrace \cup \lbrace 0', 1', 2', \dots \rbrace$, two disjoint copies of the counting numbers, with $S(n) = n+1$ and $S(n') = (n+1)'$. Starting from $0$, you never reach $0'$.

None of these is the natural numbers. Our job is to find axioms that rule each of them out.

### 2. The crisis, and Peano's five axioms

Look at what goes wrong in each broken structure.

- In the **loop**, $0$ is the successor of something ($S(2) = 0$). Real counting never returns to the start.
- In the **merge**, two different numbers have the same successor ($S(1) = S(3) = 2$). Real counting never merges two paths.
- In the **ghost chain**, there are elements you can't reach from $0$ by applying $S$ finitely many times.

Each defect suggests an axiom. Together with the two we started with, they give Peano's axioms.

> **Definition (Peano axioms).** A **Peano structure** (or **model of Peano arithmetic**) is a successor structure $(N, 0, S)$ satisfying:
> - **(P1)** $0 \in N$.
> - **(P2)** For every $n \in N$, $S(n) \in N$. (That is, $S$ is a function $N \to N$.)
> - **(P3)** $0$ is not a successor: $S(n) \ne 0$ for every $n \in N$.
> - **(P4)** $S$ is injective: if $S(m) = S(n)$ then $m = n$.
> - **(P5) Induction.** If $A \subseteq N$ is a subset with $0 \in A$, and $n \in A$ implies $S(n) \in A$ for every $n$, then $A = N$.

(P1) and (P2) are already built into the definition of a successor structure. The interesting ones are (P3), (P4), and (P5).

The induction axiom is the one that deserves a picture. Think of $N$ as a line of dominoes. "$0 \in A$" says the first domino falls. "$n \in A \Rightarrow S(n) \in A$" says each falling domino knocks over the next. (P5) says that then *every* domino falls. Equivalently: **the only elements of $N$ are the ones you reach from 0 by applying $S$ over and over.** There's nothing else.

Here is how the axioms deal with the broken structures:

| Broken structure | Satisfies | Violates |
|---|---|---|
| Loop $0 \to 1 \to 2 \to 0$ | P4, P5 | P3 ($S(2) = 0$) |
| Merge $0 \to 1 \to 2 \to 3 \to 2$ | P3, P5 | P4 ($S(1) = S(3)$) |
| Ghost chain $\mathbb{N} \sqcup \mathbb{N}'$ | P3, P4 | P5 |

To see that the ghost chain violates (P5), take $A = \lbrace 0, 1, 2, \dots \rbrace$, the "real" part. It contains $0$ and is closed under $S$, yet $A \ne N$ because $0' \notin A$. Induction deletes the ghosts.

It's worth checking the loop and the merge against (P5) too, since it's easy to think induction fails there. In the loop, a set $A$ containing $0$ and closed under $S$ must contain $S(0) = 1$ and $S(1) = 2$, so $A = N$; induction holds. The same argument works for the merge. Those structures are small enough that everything is reachable from 0. What breaks them is (P3) or (P4).

There are subtler ghosts too. Take $\mathbb{N}$ together with a two-element loop $\lbrace a, b \rbrace$, $S(a) = b$, $S(b) = a$. This satisfies (P3) (neither $a$ nor $b$ is 0) and (P4) ($S$ is still injective). Again, (P5) is the only axiom that removes it.

### 3. Using induction: a first proof

Here's a fact that looks too obvious to need proof, but which isn't one of the axioms: **every number except 0 comes right after some number.** Nothing in (P1)–(P4) says that; the ghost chain is a counterexample, since $0'$ is not a successor and isn't $0$. So it has to come from (P5).

> **Theorem.** In any Peano structure, every $n \ne 0$ is a successor: there is some $m$ with $n = S(m)$.

*Proof.* Let
$$A = \lbrace n \in N : n = 0 \text{ or } n = S(m) \text{ for some } m \in N \rbrace .$$
- $0 \in A$ by definition.
- Suppose $n \in A$. Then $S(n)$ is a successor (of $n$), so $S(n) \in A$.

By (P5), $A = N$. So every $n \in N$ is either $0$ or a successor. ∎

Notice that the inductive step didn't even use the hypothesis $n \in A$. That's fine. Induction still did the real work: it guaranteed that there's nothing in $N$ besides what the "dominoes" reach.

Combining this with (P4): every nonzero $n$ has *exactly one* predecessor. So we can define $\operatorname{pred}(n)$ as the unique $m$ with $S(m) = n$, for $n \neq 0$.

### 4. Payoff: the axioms pin down ℕ (Dedekind's theorem)

We removed every broken model we could think of. Did we get them all? Could there be a strange structure satisfying all five axioms that isn't "really" the natural numbers? Dedekind proved that the answer is no.

To say "is really ℕ" precisely, we need the notion of two structures being the same up to relabeling.

> **Definition (isomorphism).** An **isomorphism** between successor structures $(N, 0_N, S_N)$ and $(M, 0_M, S_M)$ is a bijection $h : N \to M$ with $h(0_N) = 0_M$ and $h(S_N(n)) = S_M(h(n))$ for all $n \in N$.

An isomorphism is a perfect dictionary: it renames every element, and every true statement about zero and successor in one structure translates into a true statement in the other.

> **Theorem (Dedekind, 1888: categoricity).** Any two Peano structures are isomorphic.

*Proof sketch.* Let $(N, 0_N, S_N)$ and $(M, 0_M, S_M)$ be Peano structures.

1. **Define $h$ by recursion.** Set $h(0_N) = 0_M$ and $h(S_N(n)) = S_M(h(n))$. That this defines a function on all of $N$ is the **recursion theorem**, which Dedekind proved from the axioms: given a set $X$, an element $x_0 \in X$, and a function $g: X \to X$, there is exactly one function $f : N \to X$ with $f(0_N) = x_0$ and $f(S_N(n)) = g(f(n))$. Its proof is a careful induction: one builds $f$ as the union of all "partial attempts" defined on initial segments. (The Stretch exercise shows why induction alone, without (P3) and (P4), isn't enough.)
2. **$h$ is surjective.** Let $B = h(N) \subseteq M$, the image of $h$. Then $0_M = h(0_N) \in B$, and if $y = h(n) \in B$ then $S_M(y) = h(S_N(n)) \in B$. By (P5) *in $M$*, $B = M$.
3. **$h$ is injective.** Let $A = \lbrace n \in N : \text{for all } n' \in N,\ h(n') = h(n) \Rightarrow n' = n \rbrace$. Show $0_N \in A$: if $h(n') = 0_M$ and $n' \ne 0_N$, then $n' = S_N(m)$ for some $m$ (the theorem in §3), so $0_M = h(n') = S_M(h(m))$, contradicting (P3) in $M$. For the inductive step: suppose $n \in A$ and $h(n') = h(S_N(n)) = S_M(h(n))$. Then $n' \ne 0_N$ (else $0_M$ would be a successor), so $n' = S_N(m)$ and $S_M(h(m)) = S_M(h(n))$. By (P4) in $M$, $h(m) = h(n)$, so $m = n$ because $n \in A$, and therefore $n' = S_N(n)$. By (P5) in $N$, $A = N$. ∎

So, up to relabeling, **there is only one Peano structure.** We call it ℕ. This is the season's first big instance of "describe beats build": we never said what 0 or 1 *is made of*. We only said how they *behave*, and that was enough to determine the structure completely. In ↪ S1E04 we'll *build* a Peano structure out of sets. Dedekind's theorem guarantees that whatever we build will be "the same" ℕ.

### 5. The fine print: first-order versus second-order induction

There's a subtlety in (P5) that matters a great deal later in the season.

(P5) talks about **every subset** $A$ of $N$. Quantifying over all subsets is called **second-order** logic. Dedekind's theorem depends on this: in steps 2 and 3, we applied (P5) to the sets $h(N)$ and $A$, which are arbitrary sets, not sets described by some formula about numbers.

Logicians usually prefer **first-order** logic, where you may only quantify over *elements* (numbers), not over sets of them. First-order logic has excellent properties: every first-order consequence of a set of axioms can be derived by a mechanical proof system (Gödel's completeness theorem, 1929/1930). But it cannot say "for every subset." Instead, first-order Peano arithmetic, usually called **PA**, replaces (P5) by an **induction schema**: one axiom for each formula $\varphi(n)$ in the language of arithmetic,
$$\big(\varphi(0) \land \forall n\,(\varphi(n) \to \varphi(S(n)))\big) \to \forall n\, \varphi(n).$$
(First-order PA also takes $+$ and $\times$ as basic symbols with their recursive defining equations as axioms, because in first-order logic they can't be defined from $S$ alone. We'll meet those equations in ↪ S1E03.)

There are only countably many formulas, but (in the standard ℕ) uncountably many subsets (↪ S1E12). So the schema covers only the subsets that can be *described by a formula*, and that's a much weaker requirement. The ghost-deleting set $A = \lbrace 0, 1, 2, \dots \rbrace$ in §2 was described from the *outside*; in a non-standard model there may be no formula that picks it out.

The consequence:

> **Fact.** First-order PA has **non-standard models**: structures satisfying every axiom of PA that are *not* isomorphic to ℕ. They contain the usual $0, 1, 2, \dots$ followed by "infinite" numbers larger than all of them.

Thoralf Skolem gave the first explicit construction of such a model in the early 1930s. A quick way to see that they exist uses the **compactness theorem** of first-order logic: add a new constant $c$ and the axioms $c \ne 0$, $c \ne 1$, $c \ne 2$, … Any finite batch of these is satisfied in ℕ (choose $c$ large), so by compactness the whole collection has a model, and there $c$ is a "number" different from every standard one. In a countable non-standard model, the order looks like a copy of ℕ followed by densely ordered copies of ℤ, which is very different from ℕ.

**Summary of the trade-off:**

| | Second-order Peano (P5 about all subsets) | First-order PA (induction schema) |
|---|---|---|
| Models | Exactly one, up to isomorphism (Dedekind) | Many, including non-standard ones |
| Proof system | No complete mechanical proof system exists | Complete proof system (Gödel 1929/30), but PA is incomplete (Gödel 1931) |

We'll return to the non-standard models in ↪ S1E13, where they explain why Goodstein's theorem is true but unprovable in PA, and to Gödel's theorems in ↪ S1E15.

## Worked examples

### Example 1: checking a loop against all five axioms
**Structure.** $N = \lbrace 0, 1, 2 \rbrace$ with $S(0) = 1$, $S(1) = 2$, $S(2) = 0$.

- **(P1)** $0 \in N$. ✓
- **(P2)** $S$ sends each of $0, 1, 2$ into $N$. ✓
- **(P3)** Is $0$ a successor? $S(2) = 0$. ✗ Fails.
- **(P4)** The values $S(0), S(1), S(2)$ are $1, 2, 0$: all different, so $S$ is injective. ✓
- **(P5)** Let $A \subseteq N$ with $0 \in A$ and closed under $S$. Then $S(0) = 1 \in A$ and $S(1) = 2 \in A$, so $A = \lbrace 0, 1, 2\rbrace = N$. ✓

**Conclusion.** The loop satisfies every axiom except (P3). So (P3) is *independent* of the other four: it can't be proved from them, because here they hold and it fails. This is the general method for showing an axiom is needed: exhibit a model of the others in which it fails.

### Example 2: the merge, and why injectivity matters
**Structure.** $N = \lbrace 0, 1, 2, 3 \rbrace$ with $S(0) = 1$, $S(1) = 2$, $S(2) = 3$, $S(3) = 2$.

- **(P3)** The values of $S$ are $1, 2, 3, 2$. None is $0$. ✓
- **(P4)** $S(1) = 2 = S(3)$ but $1 \ne 3$. ✗ Fails.
- **(P5)** If $0 \in A$ and $A$ is closed under $S$, then $1, 2, 3 \in A$, so $A = N$. ✓

**What goes wrong for arithmetic.** Suppose we define addition by $a + 0 = a$ and $a + S(b) = S(a+b)$ (↪ S1E03). Then $1 + 1 = S(1) = 2$ and $1 + 3 = S(1 + 2) = S(S(1+1)) = S(S(2)) = S(3) = 2$. So $1 + 1 = 1 + 3$ with $1 \ne 3$: cancellation fails. The proof of cancellation in ↪ S1E03 uses (P4) at exactly this point.

### Example 3: the ghost chain, and the set that deletes it
**Structure.** $N = \lbrace 0, 1, 2, \dots \rbrace \cup \lbrace 0', 1', 2', \dots \rbrace$, with $S(n) = n+1$ and $S(n') = (n+1)'$.

- **(P3)** Is $0 = S(x)$ for some $x$? Every $S(n)$ is $n+1 \ge 1$, and every $S(n')$ is primed. So no. ✓
- **(P4)** If $S(x) = S(y)$, then both are unprimed (so $x+1 = y+1$, $x = y$) or both primed (so $x = y$ similarly). ✓
- **(P5)** Take $A = \lbrace 0, 1, 2, \dots \rbrace$. Then $0 \in A$, and $n \in A \Rightarrow n+1 \in A$. But $0' \in N \setminus A$, so $A \ne N$. ✗ Fails.

**Remark.** The theorem of §3 fails here too: $0'$ is neither $0$ nor a successor. That's consistent, since the theorem's proof used (P5).

### Example 4: an induction proof with every step shown
**Claim.** In any Peano structure, $S(n) \ne n$ for every $n$. (No number is its own successor.)

*Proof.* Let $A = \lbrace n \in N : S(n) \ne n \rbrace$.
- **Base:** $S(0) \ne 0$ by (P3). So $0 \in A$.
- **Step:** suppose $n \in A$, i.e. $S(n) \ne n$. We want $S(S(n)) \ne S(n)$. Suppose instead $S(S(n)) = S(n)$. By (P4) (injectivity), applied to the elements $S(n)$ and $n$, we get $S(n) = n$, contradicting $n \in A$. So $S(n) \in A$.

By (P5), $A = N$. ∎

**Which axioms were used?** (P3), (P4), and (P5). Check against the broken models: in the loop $\lbrace 0,1,2\rbrace$, no element is its own successor, but in a one-element loop $N = \lbrace 0 \rbrace$, $S(0) = 0$ (P3 fails). In the merge, no element is its own successor either, but in the variant $0 \to 1 \to 1$ we get $S(1) = 1$ (P4 fails, since $S(0) = S(1)$). And in $\mathbb{N}$ plus a ghost point $g$ with $S(g) = g$, (P3) and (P4) hold but the claim fails, so induction is needed too.

## Visual and animation notes
1. **Cold open:** a little robot on a blank plane, holding a single glowing dot labeled 0. An arrow labeled "next" appears. The robot steps forward, creating dots 1, 2, 3.
2. **Three broken worlds, side by side:** (a) the arrow from 2 bends back to 0, forming a triangle (the loop); (b) the chain 0→1→2→3 with an arrow from 3 curling back into 2 (the "ρ"); (c) the real chain at the bottom, and above it a faint, flickering second chain $0' \to 1' \to 2' \to \dots$ (the ghost numbers).
3. **Axiom stamps:** as each axiom is stated, a stamp lands on the world it destroys. (P3) shatters the loop's returning arrow; (P4) splits the merging arrows apart; (P5) dissolves the ghost chain.
4. **Dominoes for induction:** an infinite line of dominoes labeled 0, 1, 2, …. The first is pushed; each knocks over the next. Then the camera pans up to the ghost chain's dominoes, which are on a separate table and never fall. A voice-over: "Induction says: there is no second table."
5. **Proof of "every nonzero number is a successor":** dots light up in green as they join the set $A$; a ghost point $0'$ blinks red in the ghost model and isn't there in a true Peano structure.
6. **Dedekind's theorem** (recurring motif **Bijection / isomorphism**): two chains drawn in different styles (one of dots, one of tally marks). Threads connect $0 \leftrightarrow 0$, $1 \leftrightarrow 1$, …; then the chains slide onto each other and merge.
7. **"Build or Describe?" segment (30 s):** left panel, "Describe: the five axioms"; right panel greyed out, "Build: coming in E04."
8. **First- vs. second-order:** a spotlight labeled "formulas" sweeps across the subsets of ℕ, lighting only some of them. In the dark, a non-standard model appears: the familiar chain, then, far to the right, ℤ-shaped chains with no beginning and no end.
9. **Teaser:** the arrow "next" with a "+" sign trying to appear and failing: "Where does addition come from?"

## Common misconceptions
- **Misconception:** "Induction is a method of proof, not an axiom." **Reality:** It is both. As a method, it's justified by the axiom (P5), which says ℕ contains nothing beyond what you reach from 0 by "next." Without (P5), there are structures (like the ghost chain) where induction proofs give false conclusions.
- **Misconception:** "The loop fails because induction fails there." **Reality:** Induction holds in the loop. It fails (P3), not (P5) (Example 1).
- **Misconception:** "The Peano axioms define ℕ, so every structure satisfying them *is* ℕ." **Reality:** They define ℕ *up to isomorphism*: every model is a relabeled copy. And that's only for second-order induction. With the first-order schema there are non-standard models.
- **Misconception:** "Non-standard models are a flaw in Peano's axioms." **Reality:** They're a feature of first-order logic itself: by the compactness and Löwenheim–Skolem theorems, no first-order theory with an infinite model can pin ℕ down up to isomorphism.
- **Misconception:** "Peano started at 0." **Reality:** Peano's 1889 version started at 1. Starting at 0 is a later convention, and either choice gives an equivalent theory.

## Exercises
- **Warm-up (computational):** For each structure, say which of (P3), (P4), (P5) hold. (a) $N = \lbrace 0 \rbrace$, $S(0) = 0$. (b) $N = \mathbb{N}$, $S(n) = n + 2$. (c) $N = \mathbb{Z}$, $0$ as usual, $S(n) = n+1$. (d) $N = \mathbb{N}$, $S(0) = 1$ and $S(n) = n$ for $n \ge 1$.
- **Core (conceptual):** Show that (P5) can't be proved from (P1)–(P4), and that (P4) can't be proved from the others. Then explain in one sentence each why the theorem "every $n \ne 0$ is a successor" needs (P5), and why the statement "$S(n) \ne n$" needs (P4).
- **Stretch (proof):** The recursion theorem says that given $x_0 \in X$ and $g: X \to X$, there is a unique $f: N \to X$ with $f(0) = x_0$ and $f(S(n)) = g(f(n))$. (a) Prove uniqueness by induction. (b) Show that existence *fails* in the loop $\lbrace 0, 1, 2 \rbrace$: find $X$, $x_0$, $g$ for which no such $f$ exists. (This is why (P3) and (P4) are needed for Dedekind's theorem, not only (P5).)

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) P3 fails ($S(0) = 0$); P4 holds (only one element); P5 holds. (b) P3, P4 hold; P5 fails: the evens $\lbrace 0, 2, 4, \dots\rbrace$ contain 0 and are closed under $S$ but aren't all of $N$. (c) P3 fails ($S(-1) = 0$); P4 holds; P5 fails (take $A = \mathbb{N}$). (d) P3 holds (no $S(n)$ equals 0); P4 fails ($S(0) = S(1) = 1$); P5 fails too: starting from 0 you only ever reach 0 and 1, so $A = \lbrace 0, 1\rbrace$ contains 0 and is closed under $S$ but isn't all of $N$.
- **Core:** The ghost chain satisfies (P1)–(P4) but not (P5); the merge satisfies (P1)–(P3) and (P5) but not (P4). "Every $n \ne 0$ is a successor" fails in the ghost chain at $0'$. "$S(n) \ne n$" fails in $0 \to 1 \to 1$, where everything but (P4) holds.
- **Stretch:** (a) If $f_1, f_2$ both work, let $A = \lbrace n : f_1(n) = f_2(n) \rbrace$; then $0 \in A$ and $A$ is closed under $S$. (b) Take $X = \mathbb{N}$, $x_0 = 0$, $g(x) = x + 1$. Then $f(0) = 0$, $f(1) = 1$, $f(2) = 2$, and $f(0) = f(S(2)) = g(f(2)) = 3$, contradicting $f(0) = 0$.

</details>

## Historical note
Hermann Grassmann, in his *Lehrbuch der Arithmetik* (1861), was among the first to define addition and multiplication recursively from "add one" and to prove the familiar laws by induction. Charles Sanders Peirce published an axiomatization of the natural numbers in 1881. The decisive treatment was Richard Dedekind's *Was sind und was sollen die Zahlen?* (1888). Dedekind defined a "simply infinite system" (essentially a Peano structure), proved that definitions by recursion are legitimate, and proved that any two simply infinite systems are isomorphic.

A year later Giuseppe Peano published *Arithmetices principia, nova methodo exposita* (1889), a short pamphlet written in Latin, using a new symbolic notation of his own. Peano acknowledged Dedekind's work. His axioms started at 1 rather than 0, and his induction axiom talked about classes, so it was effectively second-order. The axioms now carry Peano's name largely because of his crisp symbolic presentation.

The distinction between first-order and second-order versions came later, with the development of mathematical logic. Gödel's incompleteness theorem (1931) showed that first-order PA can't prove every true arithmetic statement, and Thoralf Skolem constructed non-standard models of arithmetic in the early 1930s.

## Connections
- **Callbacks:** ↩ S1E01 (build vs. describe; the promise to define numbers)
- **Sets up:**
  - ↪ S1E03: + and × defined by recursion from $S$, and proofs of their laws by induction
  - ↪ S1E04: a set-theoretic construction of a Peano structure (von Neumann), and a rival one (Zermelo); Dedekind's theorem says they're isomorphic
  - ↪ S1E05, S1E06: the next floors are built on top of ℕ
  - ↪ S1E11: bijections, the idea behind isomorphism, become the definition of "same size"
  - ↪ S1E12: the uncountability of the set of subsets of ℕ, which is why the schema can't cover every subset
  - ↪ S1E13: non-standard models return; Goodstein's theorem is unprovable in first-order PA
  - ↪ S1E15: Gödel's incompleteness theorems
  - ↪ S1E16: ℤ under + as the group freely generated by one element: "next" again
  - ↪ S2E04: "same up to isomorphism" returns as "the same linear map in different bases"
- **Side quests:** Proof assistants (after S1E14): Peano's axioms are exactly how natural numbers are defined in Lean (an inductive type with constructors `zero` and `succ`).

## References
- **Primary / historical**
  - Richard Dedekind, *Was sind und was sollen die Zahlen?* (1888). English: "The Nature and Meaning of Numbers," in *Essays on the Theory of Numbers*, trans. W. W. Beman (1901). The simply infinite systems, the recursion theorem, and the categoricity theorem are in the later sections of the essay.
  - Giuseppe Peano, *Arithmetices principia, nova methodo exposita* (1889). Partial English translation in Jean van Heijenoort (ed.), *From Frege to Gödel: A Source Book in Mathematical Logic, 1879–1931* (1967).
- **Textbooks**
  - Paul R. Halmos, *Naive Set Theory* (1960), §11 ("Numbers") and §12 ("The Peano Axioms"), including the recursion theorem.
  - Terence Tao, *Analysis I* (3rd ed., 2016), Chapter 2 ("Starting at the beginning: the natural numbers"), §2.1.
  - Herbert B. Enderton, *A Mathematical Introduction to Logic* (2nd ed., 2001), for first-order logic, the compactness theorem, and first-order arithmetic.
  - Richard Kaye, *Models of Peano Arithmetic* (1991), for the structure of non-standard models.
- **Accessible**
  - Stanford Encyclopedia of Philosophy, entry "Dedekind's Contributions to the Foundations of Mathematics."
  - Bertrand Russell, *Introduction to Mathematical Philosophy* (1919), Chapter 1 ("The Series of Natural Numbers") and Chapter 3 ("Finitude and Mathematical Induction"), a beautifully clear discussion of Peano's axioms.
