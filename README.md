# 手绘素描风皮肤 · dsh-handdrawn-skin

> 给 **DeepSeek Harness** Web 界面换上「纸 + 墨」的单色素描观感。
> A hand-drawn ink-on-paper skin for the DeepSeek Harness Web UI.

<!-- 预览图：把截图放到 preview/light.png（深色主题放 preview/dark.png），
     然后取消下面这行的注释即可 -->
<!-- ![预览 / Preview](preview/light.png) -->

---

## 特点

- **纸** — 中性暖白纸底。宿主原本是纯白（`#fff`），这里按**同明度暖化**只偏色相、明度压低约 2%，所以层次、对比度、留白观感全部保持原样。
- **墨** — 宿主用品牌蓝 `#4176e6` 做所有强调色（发送按钮、标签下划线、链接、"deep diving" 状态、气泡高亮…），本皮肤一律换成**墨黑**，得到纸墨素描的黑白观感。
- **质感** — 3.5% 牛皮纸颗粒、0.15px 马克笔轻描边、铅笔细线、楷体标题。全部调淡，有质感但不抢戏。
- **克制** — 不碰布局：圆角、间距、字号、字重基准、阴影全部交给宿主。**零实心边框**，细线是靠加深宿主原有的 `.5px` 线得到的。
- **兼容** — 只覆盖 `--dsw-alias-*` 设计令牌，不改任何元素结构，因此不会和宿主或其它插件抢样式。浅色 / 深色主题均已适配。
- 功能状态色（错误红 / 成功绿 / 警告琥珀）保持宿主默认，不做改动。

---

## 安装

### 方式一：`dsh plugin`（推荐）

```bash
git clone https://github.com/dd598/dsh-handdrawn-skin.git
dsh plugin --profile <你的 profile> add ./dsh-handdrawn-skin
```

### 方式二：手动放进 profile

```bash
# 1) 复制到目标 profile 的 node_modules
cp -r dsh-handdrawn-skin ~/.dsh/profiles/<profile>/node_modules/

# 2) 在该 profile 的 package.json 里登记两处：
#    dependencies:            "dsh-handdrawn-skin": "file:<绝对路径>/dsh-handdrawn-skin"
#    dsh.profile.bundles 末尾: "dsh-handdrawn-skin"
```

> **profile 别选错**：Desktop 客户端读的是 `~/.dsh/profiles/desktop`，
> `dsh --profile web` 读的是 `~/.dsh/profiles/web`。装到客户端不读的那个 profile 不会生效。
> 客户端用哪个 profile 写在它的启动命令行里（`...dsh-desktop-host/lib/index.js ... <profile 路径> ...`）。

**重启客户端**后生效 —— 组合树在启动时构建。

---

## 实现方式

皮肤是一个标准的 DSH bundle 插件：`dsh.bundle.patch` 指向 `cordis.patch.yml`，把自己 insert 进组合树；浏览器半部通过 lazy-CJS 协议注入一段 CSS，且所有样式都挂在 `body[data-dsh-handdrawn]` 之下，禁用时整块摘掉、可完全还原。

覆盖的 30 个设计令牌（浅色 / 深色各一套）：

| 分组 | 令牌 |
| :-- | :-- |
| 纸张 | `bg-base` / `bg-layer-1..3` / `bg-overlay` / `specific-sidebar-fill` / `specific-input-major` / `specific-selector` / `specific-bubble` |
| 墨色文字 | `label-primary` / `label-secondary` / `label-tertiary` / `brand-primary` |
| 细线 | `border-l1..l4` / `border-l2-darkmode-thin` |
| 手绘墨黑 | `state-business-primary` / `-hover` / `-tertiary` / `button-info-fill` / `-hover` / `link` / `label-primary-bluish` / `label-deep-diving` / `-shimmer` / `specific-bubble-highlight` / `specific-sidebar-nav-item-active-accent` / `bg-document-selection` |

元素级规则只有 4 条，且都走宿主公开契约（不用 CSS-module 的构建哈希）：

| 效果 | 选择器 |
| :-- | :-- |
| 牛皮纸颗粒 | `body[data-dsh-handdrawn]::after`（固定覆盖层） |
| 马克笔轻描边 | `:is(p,span,li,h1…,button,a)` |
| 楷体标题 | `[class*="headline"]` |
| 输入卡片墨线 | `[data-composer-card]` 的 `--dsw-elevation-stroke-color` |

---

## 想调手感

都在 `client/client.js` 顶部：

| 想要 | 改哪里 |
| :-- | :-- |
| 纸色更暖 / 更白 | `${S}` 块里的 `--dsw-alias-bg-base`（`#FBF9F4` 更暖，`#FEFEFC` 几乎纯白） |
| 纸纹浓淡 | `GRAIN` 里的 `opacity='0.035'` |
| 描边粗细 | `-webkit-text-stroke:.15px` |
| 细线深浅 | `--dsw-alias-border-l1..l4` 的末两位十六进制（透明度） |
| 墨色浓淡 | `--dsw-alias-state-business-primary` / `button-info-fill`（当前 `#26221C`） |

改完同步进 profile 再重启即可：

```bash
cp client/client.js ~/.dsh/profiles/<profile>/node_modules/dsh-handdrawn-skin/client/client.js
```

---

## 兼容性

- 需要带 Web UI 的 DSH（Desktop 客户端或 `dsh web` 均可）。
- 依赖宿主的 `--dsw-alias-*` 设计令牌层。若宿主大版本改动令牌命名或语义，需要相应更新。
- 皮肤作用域为 `body[data-dsh-handdrawn]`，卸载 / 停用后可完全还原，不留残留。

## License

[MIT](LICENSE)
