# S1E03 posting kit: Arithmetic from Scratch / 从零开始的算术

Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s1e03-arithmetic-from-scratch.mp4` (2:06, 16:9)
- Chinese edition: `out/s1e03-zh-cong-ling-kai-shi-de-suan-shu.mp4` (2:06,
  16:9). It opens with the Qin-dynasty multiplication table from Liye
  (里耶秦简九九表), which the English edition doesn't have.
- Before posting anywhere: confirm the background-music licence covers that
  platform. Fill in `<YouTube link>`, `<S1E02 link>` and `<bilibili link>`
  once the uploads are live.
- Chapters: YouTube needs every chapter to be at least 10 s, so
  cancellation shares a chapter with multiplication, and the end card is
  part of the last chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Can You Prove 2 + 2 = 4? | What Is a Number? S1E03
2. Why Is 3 + 5 the Same as 5 + 3? A Proof from Scratch | What Is a Number? S1E03
3. Building Plus and Times from "Next" Alone | What Is a Number? S1E03

**Description**

```
Can you prove that 2 + 2 = 4 using nothing but zero and "next"? And why is 3 + 5 the same as 5 + 3, when the definition of plus treats its two numbers completely differently?

Episode 3 of "What Is a Number?". We define plus and times by recursion, watch a machine peel 2 + 2 down to 4 one rule at a time, prove that order doesn't matter with three inductions, see why cancellation needs Peano's fourth rule, and get "less than" for free.

0:00 Can you prove 2 + 2 = 4?
0:17 Defining plus
0:37 3 + 0 versus 0 + 3
0:50 Why order doesn't matter: three inductions
1:10 Cancellation, and times
1:34 Less than, from plus
1:45 Every rule is a theorem, and what's next

Previous episode: Peano: Zero and "Next" <S1E02 link>
Next: Sets: The Universal Building Material. What is "next" made of?

Also in Chinese (中文版): <YouTube ZH link>

Sources: H. Grassmann, Lehrbuch der Arithmetik (1861); R. Dedekind, Was sind und was sollen die Zahlen? (1888); G. Peano, Arithmetices principia (1889). Try the proofs yourself in Kevin Buzzard's Natural Number Game (Lean).
Made by Whyme Labs.
Music: "We Never" (instrumental), used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #proof #peanoaxioms
```

**Tags:** prove 2+2=4, Peano arithmetic, recursion, commutativity of addition, proof by induction, natural numbers, foundations of mathematics, cancellation law, natural number game, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 你能证明 2 + 2 = 4 吗？| 数是什么？第 3 集
2. 三加五为什么等于五加三？从零开始证明 | 第一季 第 3 集
3. 九九表背了两千年，能从“下一个”推出来吗？| 数是什么？第 3 集

**简介**

```
只用零和“下一个”，你能证明 2 + 2 = 4 吗？加法的定义把两个数区别对待，那三加五凭什么等于五加三？

《数是什么？》第一季第 3 集。从湖南里耶出土的秦代九九表说起，用递归定义加法和乘法；看一台“剥壳机”按规则一步步把 2 + 2 算成 4；用三次归纳证明交换律；看消去律为什么离不开皮亚诺的第四条规则；最后连“小于等于”也白送。

0:00 秦代的九九表
0:15 能证明 2 + 2 = 4 吗？
0:27 定义加法
0:44 三加零与零加三
0:55 交换律：三次归纳
1:13 消去律与乘法
1:36 由加法得到大小
1:46 全是定理，以及下一集

上一集：零，与“下一个”<S1E02 链接>
下一集：集合：万物的积木。“下一个”本身是用什么做的？

English version: <YouTube EN link>

出处：里耶秦简九九表（湖南里耶出土，秦代）；Grassmann《算术教程》(1861)；Dedekind《数是什么，应该是什么？》(1888)；Peano《算术原理》(1889)。
Whyme Labs 出品
音乐：We Never（纯音乐），已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #数学证明 #皮亚诺公理
```

---

## X (x.com), English

**Single post** (with a 30–60 s clip of the peeling machine):

```
Can you prove 2 + 2 = 4 with nothing but zero and "next"?

Two rules: a + 0 = a, and a + next(b) = next(a + b). Peel one "next" off the right, wrap it around the outside, repeat until the right side is 0.

Episode 3: <YouTube link>
```

**Thread** (4 posts):

1. `Why is 3 + 5 the same as 5 + 3? The usual definition of + treats its two inputs completely differently, so it isn't obvious at all. 🧵`
2. `Plus is defined by recursion on the second number: a + 0 = a, a + S(b) = S(a + b). So 3 + 0 takes one step, and 0 + 3 takes three. Same answer, different work.`
3. `Proving a + b = b + a takes three inductions: 0 + a = a, then S(a) + b = S(a + b), then the theorem itself, which only goes through because the first two are done.`
4. `Cancellation (a + c = b + c ⇒ a = b) needs Peano's rule that different numbers have different successors. Without it, 1 + 1 and 1 + 3 can both equal 2. Episode 3: <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 3 of our math series: arithmetic built from nothing but zero and "next".

Everyone knows 2 + 2 = 4 and 3 + 5 = 5 + 3. This episode asks how you would prove them if all you had were Peano's five rules. The answer is recursion and induction. A small "peeling machine" moves one "next" at a time from the second number to the result, and the proof that order doesn't matter is drawn as three lines of dominoes, where the last line can only fall once the first two are down.

The Chinese edition opens with the multiplication table found on Qin-dynasty tablets at Liye, Hunan, which Chinese students still recite more than two thousand years later. Then it asks whether every line of it can be derived from "next".

Watch it here: <YouTube link>

Which "obvious" fact did you take for granted longest before you saw it proved?

#Mathematics #Education #STEM #EdTech #Proof
```

---

## TikTok, English

**On-screen text, first second:** `Prove 2 + 2 = 4. Only "next" allowed.`

**Caption:**

```
Two rules and a lot of peeling. Then the hard part: why 3 + 5 = 5 + 3 needs three inductions. Part 3 of What Is a Number?
#math #mathtok #proof #learnontiktok
```

**Alternative hook:** `3 + 0 takes one step. 0 + 3 takes three. So why do they always agree?`

---

## bilibili（中文）

**标题**（任选其一）

1. 【数是什么？S1E03】你能证明 2 + 2 = 4 吗？从零开始的算术
2. 【数是什么？第3集】九九表背了两千年，能从“下一个”推出来吗？
3. 【数是什么？第3集】三加五为什么等于五加三：三次归纳证明交换律

**简介**

```
只用零和“下一个”，你能证明 2 + 2 = 4 吗？
加法的定义只看第二个数：三加零一步就完，零加三要算三步。答案一样，功夫不同，那凭什么顺序永远不重要？

《数是什么？》第一季第 3 集。从湖南里耶出土的秦代九九表（“九九八十一”）说起，用递归定义加法和乘法，用一台“剥壳机”把 2 + 2 一步步算成 4；用三排多米诺骨牌看懂交换律的三次归纳；回到上一集的合流世界，看消去律为什么需要皮亚诺第四条；再把长方形转个身，看 2 × 3 = 3 × 2。

00:00 秦代的九九表
00:15 能证明 2 + 2 = 4 吗？
00:27 定义加法
00:44 三加零与零加三
00:55 交换律：三次归纳
01:13 消去律与乘法
01:36 由加法得到大小
01:46 全是定理，以及下一集

上一集：零，与“下一个”<B 站 S1E02 链接>
下一集：集合：万物的积木。

出处：里耶秦简九九表（秦代）；Grassmann《算术教程》(1861)；Dedekind《数是什么，应该是什么？》(1888)；Peano《算术原理》(1889)。
想亲手证一遍：Kevin Buzzard 的 Natural Number Game（Lean 证明助手）。
音乐：We Never（纯音乐），已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 数学证明, 皮亚诺公理, 数学归纳法, 交换律, 九九乘法表, 里耶秦简, 数是什么

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 数是什么？第一季（第 3 集）
**封面：** 紫色舞台背景，左边一块秦简九九表，右边大字“2 + 2 = 4，你能证明吗？”，下方小字“数是什么？第 3 集”

**动态：** `《数是什么？》第 3 集上线：从秦代九九表讲起，只用“下一个”证明 2 + 2 = 4 和三加五等于五加三。`

---

## 抖音

**画面首秒文字：** `你能证明 2 + 2 = 4 吗？`

**标题 / 文案**（任选其一）

1. `九九表背了两千年，能只从“下一个”推出来吗？#数学 #涨知识 #九九乘法表`
2. `三加零一步算完，零加三要三步，凭什么它们永远相等？#数学 #科普 #数学证明`
3. `交换律要三次归纳才证得出来 #数学 #数学归纳法 #知识科普`

**合集：** 数是什么？第一季
**评论区置顶：** `完整版和前两集都在 B 站，搜“数是什么 Whyme Labs”`
