# S1E12: The Diagonal Argument

> **Season / Act:** Season 1, Act III (Infinity and the Foundations Crisis) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E04 (sets; Russell's paradox in naive form), S1E08 (ℝ), S1E09 (decimals and their double names), S1E11 (bijections, countable sets) ·
> **Builds toward:** S1E13 (an infinite ladder of sizes, and orderings beyond ω), S1E14 (Russell's paradox and Berry's paradox as diagonal arguments), S1E15 (Gödel's incompleteness; the Continuum Hypothesis), S2E22 (measure zero; the Cantor set)

## Learning objectives
By the end of this lesson the viewer can:
1. Carry out Cantor's diagonal argument to show that the real numbers are uncountable, including the care needed with numbers that have two decimal names.
2. State and prove Cantor's theorem $|S| < |\mathcal{P}(S)|$ for every set $S$, and explain why it gives an endless ladder of infinities.
3. Recognize the same diagonal pattern in Russell's paradox, the Liar paradox, the halting problem, and (in outline) Gödel's incompleteness theorem.
4. Explain why only countably many real numbers can be described or computed, so that "most" real numbers can never be named.

## Cold open
*Narrator, back at Hotel Infinity; the manager is smug:*

Last episode, the manager of Hotel Infinity became unbeatable. One extra guest? Shift everyone down. A busload? Send everyone to double their room number. Infinitely many buses? Zig-zag through the grid. Even every fraction, every last one, got its own room.

So the manager gets cocky and puts up a sign: *No crowd too large.*

Tonight a new bus arrives. Each passenger wears a badge with an infinite string of digits on it, like 0.1415926… or 0.5000…, and every possible string is on board. One passenger for every real number between 0 and 1.

The manager starts assigning rooms. Room 0 gets this passenger, room 1 gets that one, and so on down an infinite list. And then a young woman at the back raises her hand. She has done something very simple: she read the list, and she built a badge that differs from room 0's guest in the first digit, from room 1's guest in the second digit, from room 2's guest in the third, and so on forever.

Her badge is different from every badge in the hotel. She has no room. And no matter how the manager rearranges the list, she can do it again.

This is the diagonal argument. It is about ten lines long, and it changed mathematics forever. It also turns out to be the same trick behind a paradox that broke logic, and a theorem about what computers can never do.

## The story

### 1. The naive attempt: list everything

After ↩ S1E11, a reasonable conjecture is: *every infinite set is countable.* ℤ, ℕ × ℕ, ℚ, the algebraic numbers: one by one, sets that looked bigger than ℕ turned out to be listable. Each time, the trick was to find a clever order of visiting the elements so that each one gets reached after finitely many steps.

So let's try ℝ, or just the interval $(0, 1)$. Any listing $r_0, r_1, r_2, \ldots$ would have to include every real number between 0 and 1.

### 2. The crisis: the diagonal

Write each listed number in decimal:

$$\begin{aligned}
r_0 &= 0.\,\mathbf{d_{00}}\,d_{01}\,d_{02}\,d_{03}\ldots \\
r_1 &= 0.\,d_{10}\,\mathbf{d_{11}}\,d_{12}\,d_{13}\ldots \\
r_2 &= 0.\,d_{20}\,d_{21}\,\mathbf{d_{22}}\,d_{23}\ldots \\
r_3 &= 0.\,d_{30}\,d_{31}\,d_{32}\,\mathbf{d_{33}}\ldots \\
&\ \ \vdots
\end{aligned}$$

Now build a new number $x = 0.e_0\,e_1\,e_2\ldots$ by walking down the diagonal and changing each digit:

$$e_n = \begin{cases} 5 & \text{if } d_{nn} \neq 5, \\ 4 & \text{if } d_{nn} = 5. \end{cases}$$

Then $x$ differs from $r_n$ in the $n$-th digit, for every $n$. So $x$ is not on the list.

> **Theorem (Cantor, 1874; diagonal proof 1891).** The interval $(0, 1)$, and hence ℝ, is uncountable.

**Proof.** Suppose $f : \mathbb{N} \to (0, 1)$ is any function; we show it is not surjective. For each $n$, write $f(n)$ in decimal, choosing the expansion that does not end in all 9s (by ↩ S1E09, each real has at most two expansions and exactly one of them avoids a tail of 9s). Let $d_{nn}$ be its $n$-th digit after the point (counting from 0), and define $x = 0.e_0 e_1 e_2 \ldots$ with $e_n$ as above.

Every digit of $x$ is 4 or 5, so $x \in (0, 1)$, and $x$ has no tail of 0s or 9s. By ↩ S1E09, a number has two decimal names only if one of them ends in all 0s and the other in all 9s; so $x$ has exactly one decimal expansion, namely $0.e_0e_1e_2\ldots$. For each $n$, the chosen expansion of $f(n)$ differs from that unique expansion of $x$ in position $n$, so $f(n) \neq x$. Hence $x$ is not in the image of $f$, and no function from ℕ onto $(0, 1)$ exists. Since $(0,1) \subseteq \mathbb{R}$ and ℝ is infinite, ℝ is uncountable too. ∎

The care with digits is not pedantry. If we used the rule "add 1 to each diagonal digit, wrapping 9 to 0," the new number could be $0.1999\ldots$ while the list contains $0.2000\ldots$: the "new" number would be an old number in disguise. Using only the digits 4 and 5 dodges every double name.

Notice the *shape* of the argument. We never needed to know anything about the list. Any proposed listing produces its own counterexample. That is what makes the argument so strong.

### 3. The idea in general: Cantor's theorem

Decimals are a distraction. Here is the argument in its purest form, for any set at all.

> **Definition (power set).** The **power set** $\mathcal{P}(S)$ of a set $S$ is the set of all subsets of $S$.

For a finite set with $n$ elements, $|\mathcal{P}(S)| = 2^n$, which is bigger than $n$. Cantor showed this persists for every set, finite or not.

> **Theorem (Cantor's theorem, 1891).** For every set $S$, there is no surjection $S \to \mathcal{P}(S)$. Since $x \mapsto \{x\}$ is an injection $S \to \mathcal{P}(S)$, it follows that $|S| < |\mathcal{P}(S)|$.

**Proof.** Let $f : S \to \mathcal{P}(S)$ be any function. Each element $x$ is sent to a subset $f(x)$, and $x$ either belongs to its own subset or it doesn't. Define the "diagonal" set

$$D = \{\, x \in S : x \notin f(x) \,\}.$$

Suppose $D = f(a)$ for some $a \in S$. Ask whether $a \in D$:
- If $a \in D$, then by definition of $D$, $a \notin f(a) = D$. Contradiction.
- If $a \notin D$, then $a \notin f(a)$, so $a$ satisfies the condition defining $D$, and $a \in D$. Contradiction.

Either way we have a contradiction, so $D$ is not $f(a)$ for any $a$. Hence $f$ is not surjective. ∎

Why "diagonal"? Picture an infinite table with rows labeled by $x \in S$ (the subsets $f(x)$) and columns labeled by $y \in S$, and a checkmark in cell $(x, y)$ when $y \in f(x)$. The diagonal cells $(x, x)$ record whether $x \in f(x)$. The set $D$ is the diagonal with every entry flipped, read as a row. It disagrees with row $x$ at column $x$, for every $x$.

**The endless ladder.** Applying the theorem again and again:
$$|\mathbb{N}| < |\mathcal{P}(\mathbb{N})| < |\mathcal{P}(\mathcal{P}(\mathbb{N}))| < \cdots$$
There is no largest infinity. And the first step of this ladder is exactly the size of ℝ:

> **Theorem.** $|\mathbb{R}| = |\mathcal{P}(\mathbb{N})|$.

**Proof sketch.** An injection $\mathcal{P}(\mathbb{N}) \to \mathbb{R}$: send $A \subseteq \mathbb{N}$ to the decimal $0.a_0a_1a_2\ldots$ with $a_n = 2$ if $n \in A$ and $a_n = 0$ otherwise. (Digits 0 and 2 never create a double name, so different sets give different numbers.) An injection $\mathbb{R} \to \mathcal{P}(\mathbb{Q})$: send $x$ to its Dedekind cut $\{q \in \mathbb{Q} : q < x\}$ (↩ S1E08); and $\mathcal{P}(\mathbb{Q})$ matches $\mathcal{P}(\mathbb{N})$ because ℚ matches ℕ (↩ S1E11). With injections both ways, the Cantor–Schröder–Bernstein theorem gives a bijection. ∎

### 4. One trick, many costumes

The diagonal argument is the fourth recurring thread of the series. Here are its most famous appearances. In each one, a system tries to "list" or "talk about" all of its own objects, and the flipped diagonal produces something the list cannot contain.

| Setting | The "table" | The flipped diagonal | Conclusion |
|---|---|---|---|
| Cantor (1891) | $x \in f(x)$? | $D = \{x : x \notin f(x)\}$ | no surjection $S \to \mathcal{P}(S)$ |
| Russell's paradox (1901) | $x \in y$? for all sets | $R = \{x : x \notin x\}$ | there is no set of all sets (↩ S1E04, ↪ S1E14) |
| The Liar | sentence $s$ says "$s$ is true"? | "this sentence is false" | a language can't define its own truth predicate (Tarski) |
| Halting problem (Turing, 1936) | does program $P_m$ halt on input $n$? | "halt iff $P_n$ doesn't halt on $n$" | no program decides halting |
| Gödel (1931) | does formula $\psi_m$ hold of number $n$, provably? | "I am not provable" | consistent strong enough systems are incomplete (↪ S1E15) |
| Berry's paradox | which number does description $d$ name? | "the least number not nameable in under nineteen syllables" | "nameable" can't be defined inside the language (↪ S1E14) |

**Russell's paradox is Cantor's theorem with $S$ = everything.** If there were a set $V$ of all sets, then $\mathcal{P}(V) \subseteq V$, and the identity-like map $f(x) = x$ (for sets $x$) would hit every subset of $V$. Cantor's diagonal set becomes $D = \{x : x \notin x\}$, which is exactly Russell's set $R$, and the proof of Cantor's theorem becomes the proof of Russell's paradox. Russell said he found his paradox by thinking about Cantor's proof that there is no largest cardinal.

**The halting problem.** Suppose a program $H(P, n)$ always halts and correctly answers whether program $P$ halts on input $n$. Build a program $D$: on input $n$, run $H(P_n, n)$, where $P_n$ is the $n$-th program in a fixed listing of all programs; if the answer is "halts," loop forever; if "doesn't halt," halt. Then $D$ is itself some program $P_k$. Does $D$ halt on input $k$? It halts if and only if $H$ says $P_k = D$ doesn't halt on $k$. Contradiction, so $H$ can't exist.

(One unifying theorem behind all of these is Lawvere's fixed-point theorem from category theory, 1969. The series finale, ↪ S3E12, is a natural place to mention it.)

### 5. Payoff: most numbers can never be named

Here is the most unsettling consequence. A **description** of a real number, in English, in mathematical notation, or as a computer program, is a finite string of symbols from a finite alphabet.

> **Theorem.** For any finite alphabet Σ, the set Σ* of all finite strings over Σ is countable.

**Proof.** For each length $k$, there are $|\Sigma|^k$ strings of length $k$, a finite number. List all strings of length 0, then all of length 1 (in alphabetical order), then all of length 2, and so on. Every string has some finite length, so it appears after finitely many steps. ∎

So there are only countably many descriptions, and therefore only countably many real numbers that any description singles out. Since ℝ is uncountable, **almost every real number has no description at all.** In particular (Turing, 1936), the **computable** real numbers, those whose digits some program can print one after another, form a countable set, so almost every real number is uncomputable.

Countable sets are also "negligible" in a precise sense (Example 3 below): they can be covered by intervals of arbitrarily small total length. In the language of ↪ S2E22, the describable reals have measure zero. If you throw a dart at the number line, it hits an indescribable number with probability 1.

Careful phrasing matters here. "Describable" has to be relative to a fixed language; the notion "definable in the language of set theory" cannot itself be defined inside set theory without running into Berry's paradox. The robust statement is: *for any fixed system of descriptions, only countably many reals are described.*

**Teaser.** We now know $|\mathbb{N}| < |\mathbb{R}|$. Is there a set of some size strictly in between? Cantor spent years trying to prove there isn't (the **Continuum Hypothesis**). In ↪ S1E15 we'll see why he couldn't: the standard axioms of set theory can neither prove it nor refute it.

## Worked examples

### Example 1: The diagonal, by hand

Suppose someone claims this is the start of a complete list of $(0, 1)$:

| $n$ | $r_n$ | diagonal digit $d_{nn}$ | new digit $e_n$ |
|---|---|---|---|
| 0 | 0.**5**000000… | 5 | 4 |
| 1 | 0.3**3**33333… | 3 | 5 |
| 2 | 0.14**1**5926… | 1 | 5 |
| 3 | 0.718**2**818… | 2 | 5 |
| 4 | 0.4142**1**35… | 1 | 5 |
| 5 | 0.61803**3**9… | 3 | 5 |

(Positions are counted from 0 after the decimal point: for $r_3 = 0.7182818\ldots$ the digits are $7, 1, 8, 2, \ldots$, so $d_{33} = 2$.)

The diagonal number begins $x = 0.455555\ldots$. Check against each row:
- $r_0$: first digit 5 vs. 4. Different.
- $r_1$: second digit 3 vs. 5. Different.
- $r_2$: third digit 1 vs. 5. Different.
- $r_3$: fourth digit 2 vs. 5. Different.
- $r_4$: fifth digit 1 vs. 5. Different.
- $r_5$: sixth digit 3 vs. 5. Different.

And the construction continues forever. Because $x$ uses only the digits 4 and 5, it has a single decimal name, so differing in one digit really means being a different number. (Contrast: $0.5000\ldots$ and $0.4999\ldots$ differ in *every* digit yet are the same number.)

### Example 2: Cantor's theorem on a three-element set

Let $S = \{1, 2, 3\}$ and define $f : S \to \mathcal{P}(S)$ by
$$f(1) = \{1, 2\},\qquad f(2) = \{1, 3\},\qquad f(3) = \varnothing.$$

The membership table (✓ means $y \in f(x)$):

| $x$ \ $y$ | 1 | 2 | 3 |
|---|---|---|---|
| $f(1)$ | **✓** | ✓ | |
| $f(2)$ | ✓ | **·** | ✓ |
| $f(3)$ | | | **·** |

Diagonal: $1 \in f(1)$ (yes), $2 \in f(2)$ (no), $3 \in f(3)$ (no). Flip it: $1 \notin D$, $2 \in D$, $3 \in D$. So
$$D = \{\, x : x \notin f(x) \,\} = \{2, 3\}.$$
Check that $D$ is missed: $D \neq f(1)$ (they disagree about 1), $D \neq f(2)$ (they disagree about 2), $D \neq f(3)$ (they disagree about 3). ✓

Of course, for a 3-element set we already knew no surjection exists ($2^3 = 8 > 3$). The point is that the recipe for the missing subset never used finiteness.

### Example 3: Countable sets have "length zero"

**Claim.** For any $\varepsilon > 0$, the rationals in $[0, 1]$ can be covered by intervals of total length at most $\varepsilon$.

List them as $q_0, q_1, q_2, \ldots$ (↩ S1E11). Around $q_n$ place an interval $I_n$ of length $\varepsilon / 2^{n+1}$. Every rational is covered, and the total length is
$$\sum_{n=0}^{\infty} \frac{\varepsilon}{2^{n+1}} = \varepsilon\left(\frac12 + \frac14 + \frac18 + \cdots\right) = \varepsilon.$$

With $\varepsilon = 0.01$: the first interval has length 0.005, the next 0.0025, then 0.00125, and so on. A dense set, sitting everywhere in $[0, 1]$, fits inside a cover totaling 1% of the interval.

The same argument works for *any* countable subset of ℝ, such as the computable reals or the describable reals. Since $[0, 1]$ itself cannot be covered by countably many intervals of total length less than 1 (a fact that needs the completeness of ℝ, via the Heine–Borel theorem), this gives a *second* proof that $[0, 1]$ is uncountable, and it shows the countable part is negligible.

### Example 4: The halting diagonal as a table

List all programs $P_0, P_1, P_2, \ldots$ (programs are finite strings, so this is possible by the theorem in Section 5). Make a table whose entry $(m, n)$ is H if $P_m$ halts on input $n$ and L if it loops forever:

| | input 0 | input 1 | input 2 | input 3 | … |
|---|---|---|---|---|---|
| $P_0$ | **H** | L | H | H | |
| $P_1$ | L | **L** | H | L | |
| $P_2$ | H | H | **H** | L | |
| $P_3$ | L | H | L | **L** | |

(The entries here are illustrative; the point is the shape.) The diagonal reads H, L, H, L, …. The program $D$ from Section 4 behaves like the *flipped* diagonal: L, H, L, H, …. Its row differs from row $m$ in column $m$, for every $m$, so $D$ is none of the $P_m$. But $D$ is a program, so it must be in the list, *if* it can be built. The only ingredient of $D$ that might not exist is the halting decider $H$. So $H$ does not exist.

## Visual and animation notes
1. **Cold open:** Hotel Infinity's lobby. The "No crowd too large" sign goes up. A bus with passengers wearing infinite-decimal badges pulls in. The manager assigns rooms down a scrolling list.
2. **Key visual, the diagonal (recurring motif):** the list becomes an infinite table of digits. The diagonal cells light up one by one, top-left to bottom-right; each lit digit flips (to 4 or 5) and drops into a new row at the bottom: the challenger's badge. Use this exact animation as the series' "diagonal argument" motif.
3. **Rearranging fails:** the manager shuffles the rows; the diagonal re-lights, flips, and a *new* challenger appears. Speed this up to show that every list loses.
4. **Twin trap:** briefly show the bad rule ("add 1 mod 10") producing 0.1999… while 0.2000… sits in the list; the two badges are tied by a thread to the same point (callback to S1E09's "two names, one point" graphic). Then switch to the 4/5 rule.
5. **Cantor's theorem:** a membership grid of checkmarks for $f : S \to \mathcal{P}(S)$; the diagonal lights and flips, forming the row $D$; $D$ slides up along the table and fails to match each row, with a red cell at the mismatch.
6. **The ladder:** an infinite staircase labeled $|\mathbb{N}|$, $|\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$, $|\mathcal{P}(\mathcal{P}(\mathbb{N}))|$, … rising out of frame.
7. **Costume change:** the diagonal table re-skins itself four times: sets ($x \in y$?), sentences (true/false), programs (halts/loops), formulas (provable?). Each time the same diagonal lights and flips. Name cards: Russell, the Liar, Turing, Gödel.
8. **Most numbers are unnamed:** the number line, with describable numbers drawn as tiny glowing points, each wrapped in a shrinking interval (Example 3). The intervals add up to a sliver; the rest of the line goes dark: "the unnameable majority."
9. **Teaser:** a question mark hovers between the steps $|\mathbb{N}|$ and $|\mathbb{R}|$ on the staircase. Caption: "↪ S1E15."

## Common misconceptions
- **Misconception:** "Just add the diagonal number to the list." **Reality:** you can, but the new list has its own diagonal number. The theorem is not "this list misses something"; it is "every list misses something."
- **Misconception:** "The diagonal number is 'at the end' of the list." **Reality:** an infinite list has no end. The diagonal number is not *anywhere* on the list: for each finite position $n$, it differs from entry $n$.
- **Misconception:** "The argument would also show ℚ is uncountable." **Reality:** the diagonal number built from a list of rationals is generally irrational, so it isn't a missing *rational*. The argument shows only that the list misses some real number.
- **Misconception:** "Uncountable just means 'very infinite'." **Reality:** it is a precise statement: no surjection from ℕ exists. And there is a whole hierarchy above it.
- **Misconception:** "Some particular real number is 'undescribable', and here it is: …" **Reality:** naming one would describe it. The theorem guarantees undescribable numbers exist (in abundance) without exhibiting any, and "describable" must be relative to a fixed language.
- **Misconception:** "The halting problem says we can never tell whether a program halts." **Reality:** for many specific programs we can. It says no *single* program can decide it correctly for *all* programs and inputs.

## Exercises
- **Warm-up (computational):** Apply the 4/5 diagonal rule to the list $r_0 = 0.123456\ldots$, $r_1 = 0.555555\ldots$, $r_2 = 0.909090\ldots$, $r_3 = 0.271828\ldots$, $r_4 = 0.333333\ldots$, and write the first five digits of the diagonal number. Then, for $S = \{a, b, c, d\}$ and $f(a) = \{b\}$, $f(b) = \{a, b, c\}$, $f(c) = \{d\}$, $f(d) = \{a, c, d\}$, compute $D$.
- **Core (conceptual):** Explain why the diagonal argument does not show that the set of *finite* decimals (like 0.25 or 0.7) is uncountable, even though each finite decimal can be padded with 0s to an infinite one.
- **Stretch (proof):** Prove that the set of all functions $f : \mathbb{N} \to \{0, 1\}$ (infinite binary sequences) is uncountable using a diagonal argument, and show that it is in bijection with $\mathcal{P}(\mathbb{N})$. Then prove: the set of *eventually zero* binary sequences is countable.

<details><summary>Hints and answers</summary>

- **Warm-up:** diagonal digits: $r_0$ position 0 is 1; $r_1$ position 1 is 5; $r_2$ position 2 is 9; $r_3$ position 3 is 8; $r_4$ position 4 is 3. Flipped: 5, 4, 5, 5, 5, so $x = 0.54555\ldots$. For the sets: $a \notin f(a) = \{b\}$, so $a \in D$; $b \in f(b)$, so $b \notin D$; $c \notin f(c) = \{d\}$, so $c \in D$; $d \in f(d)$, so $d \notin D$. Thus $D = \{a, c\}$, which differs from each $f(x)$ at $x$.
- **Core:** the diagonal number built from a list of finite decimals has infinitely many nonzero digits (all 4s and 5s), so it is not a finite decimal. The argument only shows the list misses some real number, not some finite decimal. In fact finite decimals are countable: they are the numbers $k/10^n$.
- **Stretch:** given a list $s_0, s_1, \ldots$ of binary sequences, define $t(n) = 1 - s_n(n)$; then $t \neq s_n$ for all $n$. The bijection with $\mathcal{P}(\mathbb{N})$ sends $A$ to its indicator function. An eventually zero sequence is determined by a finite initial segment, i.e. a finite string over $\{0, 1\}$, and those are countable.

</details>

## Historical note
Georg Cantor proved that the real numbers cannot be listed in an 1874 paper, but that first proof used nested intervals, not diagonals (↩ S1E11). The diagonal argument appeared in his short 1891 paper "Über eine elementare Frage der Mannigfaltigkeitslehre" ("On an elementary question in the theory of manifolds"). There he worked with infinite sequences of two symbols, *m* and *w*, rather than decimals, and in the same paper used the argument to show that for any set there is one of strictly greater power.

Cantor's ideas met fierce resistance, most famously from Leopold Kronecker (see the history interlude "Cantor vs. Kronecker"). A decade later the argument boomeranged: in 1901 Bertrand Russell, thinking about Cantor's theorem applied to the collection of all sets, found the paradox that bears his name (↪ S1E14). Kurt Gödel's 1931 incompleteness theorems and Alan Turing's 1936 paper "On Computable Numbers, with an Application to the Entscheidungsproblem," which introduced Turing machines, the uncomputability of the halting problem (in his formulation, of whether a machine is "circle-free"), and the countability of computable numbers, both used diagonal constructions at their core. In 1969 William Lawvere showed that many of these arguments are instances of a single fixed-point theorem in category theory.

## Connections
- **Callbacks:** ↩ S1E04 (Russell's paradox, first seen informally), ↩ S1E08 (ℝ and Dedekind cuts, used for $|\mathbb{R}| \le |\mathcal{P}(\mathbb{Q})|$), ↩ S1E09 (double decimal names, which the diagonal must dodge), ↩ S1E11 (countable sets; the hotel)
- **Sets up:** ↪ S1E13 (infinity as positions as well as sizes; the first uncountable ordinal), ↪ S1E14 (Russell's and Berry's paradoxes as diagonal arguments; types as a way to block self-application), ↪ S1E15 (Gödel's incompleteness via a diagonal sentence; the Continuum Hypothesis between $|\mathbb{N}|$ and $|\mathbb{R}|$), ↪ S2E22 (countable sets have measure zero; the uncountable Cantor set has measure zero too), ↪ S3E12 (category theory: Lawvere's fixed-point theorem)
- **Side quests:** *Computable reals* (attaches here: only countably many reals are computable; Chaitin's Ω is precisely defined but uncomputable)

## References
- **Primary / historical**
  - Georg Cantor, "Über eine elementare Frage der Mannigfaltigkeitslehre," *Jahresbericht der Deutschen Mathematiker-Vereinigung* 1 (1891). (The diagonal argument.)
  - Georg Cantor, "Über eine Eigenschaft des Inbegriffes aller reellen algebraischen Zahlen," *Journal für die reine und angewandte Mathematik* 77 (1874).
  - Alan M. Turing, "On Computable Numbers, with an Application to the Entscheidungsproblem," *Proceedings of the London Mathematical Society* (2) 42 (1936–37).
  - F. William Lawvere, "Diagonal Arguments and Cartesian Closed Categories," in *Category Theory, Homology Theory and their Applications II*, Lecture Notes in Mathematics 92 (1969).
- **Textbooks**
  - Herbert B. Enderton, *Elements of Set Theory* (1977), Chapter 6 (cardinal numbers; Cantor's theorem).
  - Michael Sipser, *Introduction to the Theory of Computation*, Chapter 4 (decidability; the diagonalization method and the undecidability of the halting/acceptance problem).
  - Thomas Jech, *Set Theory*, 3rd millennium ed. (2003), Chapter 3 (cardinal numbers).
- **Accessible**
  - Noson S. Yanofsky, "A Universal Approach to Self-Referential Paradoxes, Incompleteness and Fixed Points," *The Bulletin of Symbolic Logic* 9 (2003).
  - Douglas R. Hofstadter, *Gödel, Escher, Bach: An Eternal Golden Braid* (1979).
  - Stanford Encyclopedia of Philosophy, "Russell's Paradox" and "The Early Development of Set Theory."
