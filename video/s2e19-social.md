# S2E19 posting kit: The Singular Value Decomposition / 奇异值分解

Season 2, episode 19 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e19-svd.mp4` (DUR_EN, 16:9)
- Chinese edition: `out/s2e19-zh-qi-yi-zhi-fen-jie.mp4` (DUR_ZH, 16:9). It has a scene the English edition
  doesn't: 沈括's pinhole in 《梦溪笔谈》 (鸢东则影西), an image turned round and shrunk.
- Thumbnails: `thumbnails/png/S2E19-EN.png` and `S2E19-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E19-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E19-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E18 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. The SVD: Every Matrix Is Turn, Stretch, Turn | Spaces, Maps, and Measurements S2E19
2. Why Every Matrix Turns a Circle Into an Ellipse | Spaces, Maps, and Measurements S2E19
3. The Singular Value Decomposition (Part A Finale) | Spaces, Maps, and Measurements S2E19

**Description**

```
Pick any four numbers, put them in a 2 × 2 matrix, and apply it to a circle. You get an ellipse, always, with its axes at right angles. Shears, flips, squashes: still an ellipse. So some perpendicular pair always lands on another perpendicular pair, and every map is secretly simple: turn, stretch, turn.

Season 2, episode 19 of Whyme Labs' math series. Eigenvectors use one basis for both sides, which can't work for a 3 × 2 matrix. The SVD uses two perpendicular bases, one in and one out, with Avᵢ = σᵢuᵢ. The proof comes straight from last episode: AᵀA is symmetric with non-negative stretches, its eigen-axes are the v's, and their images stay perpendicular. On a 3D sphere, Vᵀ turns, Σ stretches, U turns, and out comes an ellipsoid. The worked example [3 0; 4 5] gives σ = √45 and √5: the size of A, its area scale |det A| = 15, and the error amplification 3. Rectangular maps float a disc in 3D or crush a ball flat along the kernel. A picture is rebuilt from a real SVD layer by layer (Eckart–Young: the first k layers are the best rank-k copy), PCA finds the main trend of a cloud, and Part A ends on the question Part B answers: what happens with infinitely many dimensions?

0:00 Every circle becomes an ellipse
0:42 Two bases, not one
1:05 The proof from AᵀA
1:32 Rotate, stretch, rotate
1:55 A worked example
2:23 Rectangular maps
2:41 Eckart–Young, layer by layer
3:11 Principal component analysis
3:28 The end of Part A
3:48 Next: Part B

Previous episode: The spectral theorem <S2E18 link>
Next: Part B. What breaks in infinite dimensions.

Also in Chinese (中文版): <YouTube ZH link>

Sources: E. Beltrami (1873); C. Jordan (1874); C. Eckart and G. Young, The approximation of one matrix by another of lower rank, Psychometrika 1 (1936); G. W. Stewart, On the early history of the singular value decomposition, SIAM Review 35 (1993).
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #linearalgebra #machinelearning
```

**Tags:** singular value decomposition, SVD, singular values, Eckart-Young, low rank approximation, image compression, PCA, principal component analysis, operator norm, condition number, pseudoinverse, linear algebra, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 奇异值分解：每个矩阵都是转、伸缩、再转 | 空间、映射与度量 S2E19
2. 为什么每个矩阵都把圆变成椭圆 | 空间、映射与度量 S2E19
3. 奇异值分解（上篇完结） | 空间、映射与度量 S2E19

**简介**

```
随便挑四个数排成 2 × 2 矩阵，用它去变一个圆。得到的永远是椭圆，两根轴互相垂直。错切、翻转、压扁，还是椭圆。所以总有一对垂直方向被送到另一对垂直方向上：每个映射其实都很简单，转、伸缩、再转。

Whyme Labs 数学系列第二季第 19 集。特征向量两边用同一组基，3 × 2 矩阵根本用不了。奇异值分解用两组垂直基，一组进一组出，Avᵢ = σᵢuᵢ。证明直接来自上一集：AᵀA 对称、伸缩倍数非负，它的特征轴就是 v，它们的像仍然互相垂直。在三维球面上，Vᵀ 转、Σ 伸缩、U 再转，出来一个椭球。例子 [3 0; 4 5] 给出 σ = √45 和 √5：A 的大小、面积缩放 |det A| = 15、误差最多放大 3 倍。长方形矩阵把圆盘放进三维，或沿着核把球压扁。用真实的奇异值分解一层层重建一张图（埃卡特–杨：前 k 层就是最好的秩 k 近似），主成分分析找出一团数据的主要走向，上篇以一个问题收尾：维数无穷时会怎样？中文版另加沈括《梦溪笔谈》的小孔成像。

0:00 每个圆都变成椭圆
0:42 两组基，而不是一组
1:05 从 AᵀA 出发的证明
1:32 转、伸缩、再转
1:55 一个例子
2:23 长方形的矩阵
2:41 沈括的小孔成像
3:00 埃卡特–杨：一层层重建
3:30 主成分分析
3:47 上篇结束
4:07 下一集：下篇

上一集：谱定理 <S2E18 链接>
下一集：下篇：无限维里什么会坏掉。

English version: <YouTube EN link>

出处：沈括《梦溪笔谈·辨证一》“鸢东则影西，鸢西则影东”；埃卡特、杨 (1936)；斯图尔特《奇异值分解早期史》(1993)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #线性代数 #机器学习
```

---

## X (x.com), English

**Single post** (with a clip of the unit sphere turning, stretching and turning into an ellipsoid):

```
Write any four numbers in a 2 × 2 matrix and apply it to a circle. You always get an ellipse with perpendicular axes.

That's the SVD: every linear map is a turn, then a stretch along the axes, then another turn.

<YouTube link>
```

**Thread** (4 posts):

1. `Every matrix is turn, stretch, turn. 🧵`
2. `Eigenvectors use one basis for input and output. The SVD uses two perpendicular bases: Avᵢ = σᵢuᵢ.`
3. `Where the v's come from: AᵀA is symmetric, so the spectral theorem gives perpendicular eigen-axes, and their images stay perpendicular.`
4. `Keep the first k layers σᵢuᵢvᵢᵀ and you have the best rank-k copy of A. That's image compression and PCA. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 19 of Season 2, Spaces, Maps, and Measurements, and the finale of Part A: the singular value decomposition.

Every matrix, square or rectangular, factors as A = UΣVᵀ: a rotation, a stretch along the axes, and another rotation. The episode proves it from the spectral theorem for AᵀA, reads off the norm, determinant and condition number from the singular values, rebuilds a picture from a real SVD to show the Eckart–Young theorem behind low-rank approximation, and connects it to principal component analysis.

The Chinese edition adds Shen Kuo's 11th-century description of the pinhole camera.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Every matrix: turn, stretch, turn`

**Caption:**

```
Any matrix turns a circle into an ellipse. Here's why. Season 2, part 19.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `How SVD compresses a picture`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E19】奇异值分解：转、伸缩、再转
2. 【线性代数·第二季第19集】为什么每个矩阵都把圆变成椭圆
3. 【S2E19】沈括小孔成像与奇异值分解（上篇完结）

**简介**

```
Whyme Labs 数学系列第二季第 19 集。
随便一个矩阵都把圆变成椭圆，轴互相垂直：每个映射都是转、伸缩、再转。
两组垂直基、从 AᵀA 出发的证明、三维球面变椭球、[3 0; 4 5] 的奇异值、长方形矩阵与核、用真实奇异值分解一层层重建图片（埃卡特–杨）、主成分分析。上篇在这里结束。
中文版另加沈括《梦溪笔谈》的小孔成像。

00:00 每个圆都变成椭圆
00:42 两组基，而不是一组
01:05 从 AᵀA 出发的证明
01:32 转、伸缩、再转
01:55 一个例子
02:23 长方形的矩阵
02:41 沈括的小孔成像
03:00 埃卡特–杨：一层层重建
03:30 主成分分析
03:47 上篇结束
04:07 下一集：下篇

上一集：谱定理 <B 站 S2E18 链接>
下一集：无限维里什么会坏掉

出处：沈括《梦溪笔谈·辨证一》“鸢东则影西，鸢西则影东”；埃卡特、杨 (1936)；斯图尔特《奇异值分解早期史》(1993)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 线性代数, 奇异值分解, SVD, 奇异值, 低秩近似, 图像压缩, 主成分分析, PCA, 条件数, 机器学习, 沈括, 梦溪笔谈, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 19 集）
**封面：** `thumbnails/png/S2E19-ZH.png`（一个虚线单位圆和它变成的斜椭圆，两根垂直的轴，大字“每个矩阵 都是转·伸·转”）

**动态：** `第二季第 19 集，上篇完结：奇异值分解。每个矩阵都是转、伸缩、再转。顺带看沈括笔下的小孔成像。`

---

## 抖音

**画面首秒文字：** `每个矩阵都是转、伸缩、再转`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E19-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E19-ZH.png`

**标题 / 文案**（任选其一）

1. `为什么每个矩阵都把圆变成椭圆 #数学 #涨知识 #线性代数`
2. `一张图只留五十层 #数学 #科普 #机器学习`
3. `沈括：鸢东则影西 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
