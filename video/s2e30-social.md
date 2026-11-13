# S2E30 posting kit: Compact Operators / 紧算子

Season 2, episode 30 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e30-compact-operators.mp4` (4:05, 16:9)
- Chinese edition: `out/s2e30-zh-jin-suan-zi.mp4` (4:28, 16:9). It has a scene the English edition
  doesn't: Zhu Zaiyu's equal temperament, from 朱载堉《律学新说》(1584).
- Thumbnails: `thumbnails/png/S2E30-EN.png` and `S2E30-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E30-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E30-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E29 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Compact Operators: The Spectral Theorem Survives | Spaces, Maps, and Measurements S2E30
2. Why a Guitar String Has Discrete Notes | Spaces, Maps, and Measurements S2E30
3. Infinite Matrices That Behave Like Finite Ones | Spaces, Maps, and Measurements S2E30

**Description**

```
Pluck a guitar string and it vibrates in halves, thirds and quarters all at once, each mode a sine with its own pitch. Episode 18 proved symmetric matrices have perpendicular eigenvectors. A string has infinitely many modes. Does the spectral theorem still hold? Not for every operator, but for the almost-finite ones it does.

Season 2, episode 30 of Whyme Labs' math series. The finite proof maximises ⟨Tx, x⟩ on the unit sphere and peels off the top eigenvector. In infinite dimensions the sphere isn't compact: multiplication by x on L²[0, 1] pushes bumps toward x = 1 without ever reaching a maximum. Compact operators fix this: they send bounded sequences to sequences with convergent subsequences, like diag(1, ½, ⅓, …) squashing the unit ball, and they are exactly the limits of finite-rank operators. For a compact self-adjoint operator the maximising sequence converges, so eigenvectors exist, the eigenvalues march to 0, and Tx = Σ λₖ⟨x, uₖ⟩uₖ. The Fredholm alternative rescues rank–nullity for u − λKu = f. For the string, −d²/dx² is unbounded but its inverse G is compact, with eigenfunctions sin(nπx), and the trace of G gives Σ 1/n² = π²/6 once more. Self-adjointness matters: the Volterra operator is compact with no eigenvalues at all.

0:00 A guitar string and the spectral theorem
0:48 Why the finite proof fails
1:20 Compact operators
1:56 The spectral theorem for compact operators
2:32 The Fredholm alternative
3:01 The vibrating string
3:31 The Volterra operator
3:49 Next: spectrum and quantum mechanics

Previous episode: Fourier <S2E29 link>
Next: Spectrum and quantum mechanics. Beyond eigenvalues.

Also in Chinese (中文版): <YouTube ZH link>

Sources: D. Hilbert (1904–1910); F. Riesz (1918); E. I. Fredholm, Sur une classe d'équations fonctionnelles (1903); V. Volterra (1896); E. Kreyszig, Introductory Functional Analysis, ch. 8.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #functionalanalysis #spectraltheorem
```

**Tags:** compact operator, spectral theorem, self-adjoint operator, eigenvalues, finite rank, Fredholm alternative, Green's function, vibrating string, Sturm-Liouville, Volterra operator, Basel problem, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 紧算子：谱定理活下来了 | 空间、映射与度量 S2E30
2. 琴弦为什么只发离散的音 | 空间、映射与度量 S2E30
3. 像有限维一样乖的无穷矩阵 | 空间、映射与度量 S2E30

**简介**

```
拨一下吉他弦，它同时整体振、对半振、三段振、四段振，每种振型都是正弦，各有音高。第 18 集证明了对称矩阵有互相垂直的特征向量。弦有无穷多个振型，谱定理还成立吗？不是对所有算子都成立，但对“几乎有限维”的算子成立。

Whyme Labs 数学系列第二季第 30 集。有限维的证明在单位球面上让 ⟨Tx, x⟩ 最大，剥掉第一个特征向量。到了无穷维，球面不紧：L²[0, 1] 上乘以 x，鼓包挤向 x = 1，却永远到不了最大点。紧算子解决了这个问题：它把有界序列变成有收敛子列的序列，比如 diag(1, ½, ⅓, …) 把单位球压扁；紧算子恰好是有限秩算子的极限。对紧的自伴算子，求最大的序列会收敛，所以特征向量存在，特征值向 0 靠拢，Tx = Σ λₖ⟨x, uₖ⟩uₖ。弗雷德霍姆二择一在 u − λKu = f 上救回了秩–零化度定理。对琴弦，−d²/dx² 无界，可它的逆 G 是紧的，特征函数是 sin(nπx)，G 的迹又给出 Σ 1/n² = π²/6。自伴很重要：沃尔泰拉算子是紧的，却一个特征值都没有。中文版另加朱载堉十二平均律。

0:00 琴弦与谱定理
0:48 有限维的证明为何失效
1:20 紧算子
1:56 紧算子的谱定理
2:32 朱载堉十二平均律
2:55 弗雷德霍姆二择一
3:24 振动的弦
3:55 沃尔泰拉算子
4:13 下一集：谱与量子力学

上一集：傅里叶 <S2E29 链接>
下一集：谱与量子力学。超越特征值。

English version: <YouTube EN link>

出处：朱载堉《律学新说》(1584)；希尔伯特 (1904–1910)；里斯 (1918)；弗雷德霍姆 (1903)；沃尔泰拉 (1896)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #泛函分析 #谱定理
```

---

## X (x.com), English

**Single post** (with a clip of the eigenvalue dots marching toward 0):

```
The string's Green's operator G has eigenvalues 1/(n²π²) and trace ∫ x(1 − x) dx = 1/6.

Sum of eigenvalues = trace, so Σ 1/n² = π²/6. Basel, from a guitar string.

<YouTube link>
```

**Thread** (4 posts):

1. `Compact operators: the spectral theorem survives 🧵`
2. `In infinite dimensions the unit sphere isn't compact, and the finite proof breaks.`
3. `Compact operators squash the unit ball. For compact self-adjoint T: an eigenbasis, eigenvalues → 0.`
4. `But self-adjointness matters: Volterra is compact with no eigenvalues. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 30 of Season 2, Spaces, Maps, and Measurements: compact operators.

The episode shows why the finite-dimensional proof of the spectral theorem fails, defines compact operators as limits of finite-rank ones, proves the spectral theorem for compact self-adjoint operators, states the Fredholm alternative, applies it all to the vibrating string, and ends with the Volterra operator, compact but without eigenvalues.

The Chinese edition adds Zhu Zaiyu's equal temperament (1584).

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `The spectral theorem survives`

**Caption:**

```
Infinitely many modes, and the spectral theorem still works, if the operator is compact. Season 2, part 30.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Σ 1/n² = π²/6 from a guitar string`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E30】紧算子：谱定理活下来了
2. 【线性代数·第二季第30集】琴弦为什么只发离散的音
3. 【S2E30】朱载堉的十二平均律与谱

**简介**

```
Whyme Labs 数学系列第二季第 30 集。
无穷维里，谱定理还成立吗？对紧算子成立。
有限维证明为何失效、紧算子、有限秩逼近、紧自伴算子的谱定理、弗雷德霍姆二择一、振动的弦与格林算子、沃尔泰拉算子。
中文版另加朱载堉《律学新说》十二平均律。

00:00 琴弦与谱定理
00:48 有限维的证明为何失效
01:20 紧算子
01:56 紧算子的谱定理
02:32 朱载堉十二平均律
02:55 弗雷德霍姆二择一
03:24 振动的弦
03:55 沃尔泰拉算子
04:13 下一集：谱与量子力学

上一集：傅里叶 <B 站 S2E29 链接>
下一集：谱与量子力学

出处：朱载堉《律学新说》(1584)；希尔伯特 (1904–1910)；里斯 (1918)；弗雷德霍姆 (1903)；沃尔泰拉 (1896)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 泛函分析, 紧算子, 谱定理, 自伴算子, 特征值, 弗雷德霍姆, 振动的弦, 沃尔泰拉算子, 朱载堉, 十二平均律, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 30 集）
**封面：** `thumbnails/png/S2E30-ZH.png`（三条琴弦振型叠在一起，下方一串向 0 聚拢的特征值点，大字“谱定理 活下来了”）

**动态：** `第二季第 30 集：紧算子。弦有无穷多个振型，谱定理还活着吗？顺带看朱载堉算 2 的十二次方根。`

---

## 抖音

**画面首秒文字：** `谱定理活下来了`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E30-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E30-ZH.png`

**标题 / 文案**（任选其一）

1. `琴弦为什么只发离散的音 #数学 #涨知识 #泛函分析`
2. `无穷矩阵也能对角化 #数学 #科普 #谱定理`
3. `朱载堉算出十二平均律 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
