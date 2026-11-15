# S3E04 posting kit: Fourier Is Duality / 傅里叶就是对偶

Season 3, episode 4 of *Where the Roads Meet* (《殊途同归》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s3e04-fourier-duality.mp4` (4:26, 16:9)
- Chinese edition: `out/s3e04-zh-fu-li-ye-dui-ou.mp4` (4:50, 16:9). It has a scene the English edition
  doesn't: 《庄子·徐无鬼》's two zithers, "鼓宫宫动，鼓角角动", sympathetic
  resonance as a Fourier coefficient. Last episode of Act I.
- Thumbnails: `thumbnails/png/S3E04-EN.png` and `S3E04-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S3E04-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S3E04-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 3 playlist on YouTube and the Season 3 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S3E03 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Why Fourier Uses Waves | Where the Roads Meet S3E04
2. Fourier Is Duality | Where the Roads Meet S3E04
3. The FFT Is Group Theory | Where the Roads Meet S3E04

**Description**

```
Why do we always break signals into waves? Your phone does it to music thousands of times a second, and there are endless orthonormal bases. Slide a bump to the right and you get a new function; slide a parabola, another new function. Slide the helix e^(iωt) and you get the same helix times one number. It is an eigenvector of every shift at once.

Season 3, episode 4 of Whyme Labs' math series. Shifts form a group, and the functions that every shift only rescales satisfy f(x + y) = f(x) f(y): they are characters, homomorphisms to the unit circle. On ℤ/8, χₖ(j) = ωʲᵏ is a pointer walking k steps at a time. Add up a nontrivial character over the group, shift the sum, and it gets multiplied by χ(h) ≠ 1 while staying the same sum, so it is 0: characters are orthogonal, n of them, a basis, and the Fourier transform is the coordinates in that basis. Written as rows, they make the DFT matrix, a grid of little clock hands; divided by √n it is unitary, every shift becomes diagonal, and convolution becomes multiplication. The FFT splits samples into even and odd and glues two half-size DFTs with a butterfly: n log n steps instead of n², which for n = 2²⁰ takes a trillion steps down to twenty million. Characters form a dual group Ĝ, like V and V*: ℤ/n matches its dual only after choosing ω, but the double dual needs no choice. Circle ↔ integers, integers ↔ circle, ℝ ↔ ℝ, and Pontryagin says every such group is its dual's dual. On ℝ, e^(2πiξx) never fades and isn't in L², sums become integrals, and Plancherel makes the transform unitary; a Gaussian maps to itself.

0:00 Why waves?
0:53 What shifts want: characters
1:22 Orthogonality by shifting the sum
1:51 The DFT matrix
2:20 The FFT butterfly
2:44 A group and its dual
3:19 ℝ, L² and Plancherel
3:48 Act I montage
4:08 Next: manifolds

Previous episode: Representations: Groups Acting by Matrices <S3E03 link>
Next: Leave flat space behind: manifolds.

Also in Chinese (中文版): <YouTube ZH link>

Sources: J. Fourier, Théorie analytique de la chaleur (1822); J. Cooley and J. Tukey (1965); M. Plancherel (1910); L. Pontryagin (1934); A. Terras, Fourier Analysis on Finite Groups and Applications; G. Folland, A Course in Abstract Harmonic Analysis.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #fourier #linearalgebra
```

**Tags:** Fourier transform, DFT, FFT, characters, dual group, Pontryagin duality, convolution theorem, Plancherel theorem, unitary, roots of unity, shift operator, eigenvector, harmonic analysis, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 傅里叶为什么用波 | 殊途同归 S3E04
2. 傅里叶就是对偶 | 殊途同归 S3E04
3. FFT 其实是群论 | 殊途同归 S3E04

**简介**

```
为什么拆信号总是拆成波？手机每秒都要对音乐做上几千次，而标准正交基有无数组。把鼓包右移，得到一个新函数；把抛物线右移，又是新函数。把螺旋 e^(iωt) 右移，却还是同一条螺旋，只乘了一个数。它是所有平移共同的特征向量。

Whyme Labs 数学系列第三季第 4 集。平移成群，被每个平移都只缩放的函数满足 f(x + y) = f(x) f(y)：它们就是特征标，到单位圆的同态。在 ℤ/8 上，χₖ(j) = ωʲᵏ，指针每次走 k 步。把非平凡特征标在群上求和，再平移一下，和乘上了 χ(h) ≠ 1，可它还是同一个和，所以是 0：特征标两两正交，n 个正好一组基，傅里叶变换就是这组基下的坐标。把特征标排成行，就是 DFT 矩阵，一格格小钟表的指针；除以 √n 是酉矩阵，每个平移都变成对角的，卷积变成逐点相乘。FFT 把样本分成偶数位和奇数位，用蝴蝶把两个一半大小的 DFT 拼起来：n log n 步而不是 n² 步，n = 2²⁰ 时从一万亿步降到两千万步。特征标自己也成群，对偶群 Ĝ，就像 V 和 V*：ℤ/n 和它的对偶同构要先选 ω，对偶的对偶却什么都不用选。圆 ↔ 整数，整数 ↔ 圆，ℝ ↔ ℝ；庞特里亚金说这类群都是对偶的对偶。在 ℝ 上，e^(2πiξx) 永不衰减，不在 L² 里，求和变成积分，普朗歇尔定理让变换成为酉的，高斯函数变回它自己。中文版另加《庄子·徐无鬼》“鼓宫宫动，鼓角角动”。

0:00 为什么是波？
0:53 平移想要什么：特征标
1:22 平移求和得正交
1:51 DFT 矩阵
2:20 FFT 蝴蝶
2:44 鼓宫宫动
3:07 群与它的对偶
3:42 ℝ、L² 与普朗歇尔
4:12 第一幕回顾
4:32 下一集：流形

上一集：表示论：群用矩阵来作用 <S3E03 链接>
下一集：离开平直空间：流形。

English version: <YouTube EN link>

出处：《庄子·徐无鬼》“为之调瑟，废一于堂，废一于室，鼓宫宫动，鼓角角动，音律同矣”；傅里叶 (1822)；库利与图基 (1965)；普朗歇尔 (1910)；庞特里亚金 (1934)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #傅里叶 #线性代数
```

---

## X (x.com), English

**Single post** (with a clip of the bump, the parabola and the helix sliding, and only the helix landing on itself):

```
Why Fourier uses waves: slide e^(iωt) and you get the same function times one number.

It's an eigenvector of every shift at once. Fourier analysis is the representation theory of shifts.

<YouTube link>
```

**Thread** (4 posts):

1. `Fourier is duality 🧵`
2. `Functions that every shift only rescales satisfy f(x + y) = f(x) f(y): characters.`
3. `Shift a sum of a character over the group: it gets multiplied by χ(h) ≠ 1 and stays the same. So it's 0. Orthogonality.`
4. `The DFT is the table of characters of ℤ/n, and Pontryagin: every such group is its dual's dual. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Season 3, Episode 4 of Where the Roads Meet: Fourier is duality.

The episode derives characters as the common eigenvectors of shifts, proves their orthogonality by shifting a sum, builds the DFT matrix and the FFT butterfly, sets the dual group beside the dual space with its natural double dual, and ends with Plancherel on L²(ℝ). It closes Act I of Season 3.

The Chinese edition adds Zhuangzi's two zithers, where plucking 宫 on one sets 宫 moving on the other.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Why Fourier uses waves`

**Caption:**

```
Slide e^(iωt) and you get the same function times one number: an eigenvector of every shift. Season 3, part 4.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `The FFT is group theory`

---

## bilibili（中文）

**标题**（任选其一）

1. 【殊途同归 S3E04】傅里叶就是对偶
2. 【线性代数·第三季第4集】傅里叶为什么用波
3. 【S3E04】鼓宫宫动：傅里叶系数就是共振

**简介**

```
Whyme Labs 数学系列第三季第 4 集。
第三季第 4 集：傅里叶就是对偶，第一幕收尾。
特征标是平移的共同特征向量、平移求和证正交、DFT 矩阵、FFT 蝴蝶、对偶群与二次对偶、普朗歇尔定理。
中文版另加《庄子·徐无鬼》鼓宫宫动。

00:00 为什么是波？
00:53 平移想要什么：特征标
01:22 平移求和得正交
01:51 DFT 矩阵
02:20 FFT 蝴蝶
02:44 鼓宫宫动
03:07 群与它的对偶
03:42 ℝ、L² 与普朗歇尔
04:12 第一幕回顾
04:32 下一集：流形

上一集：表示论：群用矩阵来作用 <B 站 S3E03 链接>
下一集：流形

出处：《庄子·徐无鬼》“为之调瑟，废一于堂，废一于室，鼓宫宫动，鼓角角动，音律同矣”；傅里叶 (1822)；库利与图基 (1965)；普朗歇尔 (1910)；庞特里亚金 (1934)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 傅里叶变换, 线性代数, 特征标, DFT, FFT, 对偶群, 庞特里亚金对偶, 卷积, 普朗歇尔, 庄子, 殊途同归

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 殊途同归（第三季，第 4 集）
**封面：** `thumbnails/png/S3E04-ZH.png`（一个 8 × 8 的小钟表指针格子，大字“傅里叶 就是对偶”）

**动态：** `第三季第 4 集：傅里叶就是对偶。为什么拆信号总拆成波？因为螺旋是所有平移的特征向量。`

---

## 抖音

**画面首秒文字：** `傅里叶为什么用波`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S3E04-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S3E04-ZH.png`

**标题 / 文案**（任选其一）

1. `傅里叶为什么用波 #数学 #涨知识 #信号处理`
2. `FFT 其实是群论 #数学 #科普 #线性代数`
3. `鼓宫宫动就是傅里叶 #数学 #传统文化 #知识科普`

**合集：** 殊途同归（第三季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
