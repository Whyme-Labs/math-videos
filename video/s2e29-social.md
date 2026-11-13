# S2E29 posting kit: Fourier / 傅里叶

Season 2, episode 29 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e29-fourier.mp4` (4:03, 16:9)
- Chinese edition: `out/s2e29-zh-fu-li-ye.mp4` (4:28, 16:9). It has a scene the English edition
  doesn't: the guqin's thirteen hui and its harmonics, from 嵇康《琴赋》.
- Thumbnails: `thumbnails/png/S2E29-EN.png` and `S2E29-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E29-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E29-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E28 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Fourier Series: A Function Is a Vector of Tones | Spaces, Maps, and Measurements S2E29
2. Why a Square Wave Is Made of Sines | Spaces, Maps, and Measurements S2E29
3. Fourier: Functions as Infinite Vectors | Spaces, Maps, and Measurements S2E29

**Description**

```
A violin and a flute play the same note and still sound different. The difference is the recipe: how much of each pure tone goes in. Write a function as a list of tone amounts and something odd happens. The function becomes a vector, the tones become perpendicular axes, and calculus turns into multiplication.

Season 2, episode 29 of Whyme Labs' math series. The pure tones e^(inx) are orthonormal in L²[−π, π], so the Fourier coefficient cₙ = ⟨f, eₙ⟩ is just a projection, as in Episode 28. Partial sums Sₙ f are the best approximations from the first tones, and the energy left over ‖f − Sₙ f‖² shrinks to 0 for every square-integrable f. Parseval says the energy of the function equals the energy of its recipe; for the square wave that gives 1 + 1/9 + 1/25 + … = π²/8 and then Σ 1/n² = π²/6. Pointwise convergence is subtler: at a jump the partial sums overshoot by about 9% however many tones you add (the Gibbs phenomenon), even though the overshoot's energy goes to 0. Differentiation is diagonal in this basis, d/dx eⁱⁿˣ = in·eⁱⁿˣ, so the heat equation splits into one tiny equation per tone and high tones die first. Other operators have their own bases: Legendre, Hermite, Haar.

0:00 Violin, flute and a square wave
0:53 Pure tones are orthonormal
1:28 Convergence in energy, and Parseval
2:12 The Gibbs overshoot
2:37 Differentiation is diagonal
3:16 Other orthonormal bases
3:46 Next: compact operators

Previous episode: Hilbert spaces <S2E28 link>
Next: Compact operators. The spectral theorem survives.

Also in Chinese (中文版): <YouTube ZH link>

Sources: J. Fourier, Théorie analytique de la chaleur (1822); J. W. Gibbs, letters to Nature (1898–99); M.-A. Parseval (1799); E. M. Stein and R. Shakarchi, Fourier Analysis, ch. 2–3.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #fourier #functionalanalysis
```

**Tags:** Fourier series, orthonormal basis, L2, Parseval identity, Gibbs phenomenon, square wave, heat equation, Basel problem, Legendre polynomials, Hermite functions, Haar wavelet, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 傅里叶级数：函数是纯音的向量 | 空间、映射与度量 S2E29
2. 方波为什么由正弦波组成 | 空间、映射与度量 S2E29
3. 傅里叶：函数是无穷维向量 | 空间、映射与度量 S2E29

**简介**

```
小提琴和长笛拉同一个音，听起来还是不一样。差别在配方：每种纯音放多少。把函数写成一张“纯音用量表”，怪事就来了：函数变成了向量，纯音成了互相垂直的坐标轴，微积分变成了乘法。

Whyme Labs 数学系列第二季第 29 集。纯音 e^(inx) 在 L²[−π, π] 里标准正交，傅里叶系数 cₙ = ⟨f, eₙ⟩ 就是投影，和第 28 集一样。部分和 Sₙ f 是用前几个纯音能做到的最佳逼近，剩下的能量 ‖f − Sₙ f‖² 对每个平方可积的 f 都趋于 0。帕塞瓦尔：函数的能量等于配方的能量；方波给出 1 + 1/9 + 1/25 + … = π²/8，进而 Σ 1/n² = π²/6。逐点收敛更微妙：在跳跃处，不管加多少纯音，部分和都会冲过头约 9%（吉布斯现象），可冲过头那块的能量趋于 0。在这组基下求导是对角的，d/dx eⁱⁿˣ = in·eⁱⁿˣ，热方程拆成每个纯音一个小方程，高音先消失。别的算子有自己的基：勒让德、埃尔米特、哈尔。中文版另加古琴十三徽。

0:00 小提琴、长笛与方波
0:53 纯音标准正交
1:28 按能量收敛，帕塞瓦尔
2:12 吉布斯过冲
2:37 古琴十三徽
3:02 求导是对角的
3:41 别的标准正交基
4:11 下一集：紧算子

上一集：希尔伯特空间 <S2E28 链接>
下一集：紧算子。谱定理活了下来。

English version: <YouTube EN link>

出处：嵇康《琴赋》“徽以钟山之玉”；傅里叶《热的解析理论》(1822)；吉布斯 (1898–99)；帕塞瓦尔 (1799)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #傅里叶 #泛函分析
```

---

## X (x.com), English

**Single post** (with a clip of the square wave's partial sums and the Gibbs ears):

```
Apply Parseval to a square wave and 1 = (8/π²)(1 + 1/9 + 1/25 + …).

So the odd squares sum to π²/8, and all squares to π²/6. Energy of a function = energy of its recipe of tones.

<YouTube link>
```

**Thread** (4 posts):

1. `Fourier series: a function is a vector of tones 🧵`
2. `The tones e^(inx) are perpendicular axes. A Fourier coefficient is a projection.`
3. `Square wave: the partial sums converge in energy, but overshoot every jump by ~9%. Gibbs.`
4. `And d/dx becomes diagonal: one tiny equation per tone. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 29 of Season 2, Spaces, Maps, and Measurements: Fourier.

The episode treats pure tones as an orthonormal basis of L², shows convergence in energy and Parseval's identity (with π²/8 and π²/6 as by-products), the Gibbs overshoot, how differentiation becomes diagonal and solves the heat equation, and other orthonormal bases: Legendre, Hermite, Haar.

The Chinese edition adds the guqin's thirteen hui and its harmonics.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `A function is a vector of tones`

**Caption:**

```
Every sound is a recipe of pure tones, and the tones are perpendicular. Season 2, part 29.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Why a square wave overshoots by 9%`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E29】傅里叶：函数是纯音的向量
2. 【线性代数·第二季第29集】方波为什么由正弦组成
3. 【S2E29】古琴的泛音与傅里叶级数

**简介**

```
Whyme Labs 数学系列第二季第 29 集。
函数是无穷维向量，纯音是互相垂直的坐标轴。
标准正交、部分和与最佳逼近、按能量收敛、帕塞瓦尔恒等式、吉布斯现象、求导是对角的、热方程、勒让德/埃尔米特/哈尔基。
中文版另加古琴十三徽与泛音。

00:00 小提琴、长笛与方波
00:53 纯音标准正交
01:28 按能量收敛，帕塞瓦尔
02:12 吉布斯过冲
02:37 古琴十三徽
03:02 求导是对角的
03:41 别的标准正交基
04:11 下一集：紧算子

上一集：希尔伯特空间 <B 站 S2E28 链接>
下一集：紧算子

出处：嵇康《琴赋》“徽以钟山之玉”；傅里叶《热的解析理论》(1822)；吉布斯 (1898–99)；帕塞瓦尔 (1799)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 泛函分析, 傅里叶级数, 标准正交基, 帕塞瓦尔恒等式, 吉布斯现象, 方波, 热方程, 古琴, 泛音, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 29 集）
**封面：** `thumbnails/png/S2E29-ZH.png`（方波由几条正弦叠出来，旁边是配方柱状图，大字“函数是 纯音的向量”）

**动态：** `第二季第 29 集：傅里叶。函数怎么成了向量？顺带看古琴十三徽上的泛音。`

---

## 抖音

**画面首秒文字：** `函数是纯音的向量`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E29-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E29-ZH.png`

**标题 / 文案**（任选其一）

1. `方波竟是正弦波拼的 #数学 #涨知识 #傅里叶`
2. `函数就是无穷维向量 #数学 #科普 #泛函分析`
3. `古琴泛音里的数学 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
