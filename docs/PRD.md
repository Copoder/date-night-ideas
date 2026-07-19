# PRD：Date Night Ideas（约会灵感决策站）

| 字段 | 内容 |
|------|------|
| 产品名 | Date Night Ideas |
| 域名 | **date-night-ideas.com**（用户自行注册） |
| 对标站 | [dinner-ideas.net](https://dinner-ideas.net) |
| 主打关键词 | `date night ideas` |
| 代码 | **全新独立仓库**；不复用 `dinner-ideas` 的代码、内容或设计资产 |
| 文档版本 | **v1.1.4（主题与视觉审计口径）** |
| 日期 | 2026-07-19 |
| 状态 | **产品定义已确认 · 功能通过 · 视觉素材待逐条验收** |

---

## 0. 已确认产品决策（定稿）

| # | 议题 | 决策 |
|---|------|------|
| 1 | 域名 | **date-night-ideas.com**（用户注册中） |
| 2 | 代码仓 | **全新仓库** |
| 3 | 图片 | 可使用 **AI 生成图**，并补充 **免费、无版权风险** 的真实图（如明确免费授权的图库/公共领域等，**不是付费商用图**）；须记录生成信息或来源与许可 |
| 4 | 广告 | **准备接广告**，有稳定流量后再开；首发不挡决策流 |
| 5 | 交付形态 | **完整项目**；分类主题库 ≥ 300 条高质量 published 内容 |
| 6 | Step 1 Parents | **保留**独立选项 |
| 7 | Step 6 硬限制 | **可跳过**（跳过 = 无硬限制） |
| 8 | 结果数量 | **固定 3 条**；支持 **刷新/再抽一组**（同筛选条件下换一批） |
| 9 | 内容来源 | 以网络调研、允许的自动采集与人工编辑增值为主；AI 仅作归纳、结构化、质检和部分写作辅助，不批量生成低价值内容 |
| 10 | 工程复用 | 独立设计与实现；不复用 `dinner-ideas` 的代码、内容或设计资产 |
| 11 | 采集架构 | **广泛发现 + 白名单受控抓取**；抓取材料仅作内部调研输入，不直接进入发布字段 |
| 12 | 图片交接 | 所有待生成或待寻找的图片统一登记在 `assets/image-requirements.json`；即使执行 Agent 无图片生成能力，也必须完成用途、位置、Prompt、尺寸、Alt 和验收条件 |
| 13 | 文案风格 | 文案要抓住用户、具体自然、有决策感；禁止模板化 AI 腔，统一遵循 `docs/editorial-guidelines.md` |
| 14 | SEO 主攻 | 全站第一优先级为精确主题 `date night ideas`；首页是唯一裸主词权威页，其余页面承接修饰词并通过内链集中权重，避免关键词内耗 |
| 15 | Date Night 主题门禁 | 每条 Idea 必须有明确两人约会意图、共同参与、约会形状和关系回报；家务、工作休息、跑腿和抽象设计练习不得作为已发布约会 |
| — | 问答全文 | 见 [research-picker-qa.md](./research-picker-qa.md)（已定稿） |

---

## 1. 背景与问题

### 1.1 用户痛点

搜 `date night ideas` 的人要的是：

> **今晚（或这周末）到底选哪一个约会？**

SERP 以大媒体 listicle 为主，过载、同质；决策成本高。

### 1.2 产品模型（对齐 dinner-ideas.net）

1. **Tap, don’t type** — 全程点选  
2. **约 30–60 秒** — 5 步主问题 + 1 步可选硬限制  
3. **结果限量** — 固定 **3** 条图文建议 + Why it fits；可刷新再抽一组  
4. **SEO Spoke = 同一 Picker + 预填** — 全站为一个决策工具服务  
5. **分类主题库** — 内容按 taxonomy 组织，支撑过滤、Spoke、浏览

### 1.3 为何值得做

| 维度 | 判断 |
|------|------|
| 需求 | 主词月搜约 6 万（US），长尾主题树大 |
| 差异化 | 决策产品 + 经网络调研和人工编辑的图文短名单，对比纯文章站 |
| 变现 | 流量起来后 AdSense；可配 Amazon（games/礼盒等） |

### 1.4 域名选择：date-night-ideas.com vs datenight-ideas.com

| 维度 | date-night-ideas.com | datenight-ideas.com |
|------|----------------------|---------------------|
| 与主词「date night ideas」对齐 | ✅ 三词清晰，SERP 链接可读性最好 | ⚠️ datenight 合成词，ideas 才拆开 |
| SEO 惩罚 | 无（连字符不降权） | 无 |
| 口述/记忆 | 「date night ideas」自然对应，但用户可能漏打连字符 | 更接近 dinner-ideas 的 `{topic}-ideas` 命名；口述「datenight ideas」稍顺 |
| 连字符数量 | 2 个（略易打错） | 1 个 |
| 品牌观感 | 关键词站更「所见即所得」 | 更产品名一点 |

**已选定：`date-night-ideas.com`（用户自行注册）。**

理由：三词主词在 SERP 链接中可读性最好；连字符本身不构成 SEO 惩罚。备选 `datenight-ideas.com` 仅在主域无法获得时再议；注册成功后可将备选做 301（可选）。

---

## 2. 目标与非目标

### 2.1 Goals（完整交付范围）

1. **决策产品**：点选问答 → **3** 条图文约会建议；支持 **刷新再抽一组**、重来、分享。  
2. **分类主题库（厚）**：按分类体系入库（见 §4.3）；**上线目标 ≥ 300 条高质量 published 内容**，并持续可扩。每条须有来源记录、人工编辑增值和质量审核，数量不能替代质量。  
3. **SEO**：首页主攻 `date night ideas`；全站 Spoke + 分类浏览 + 内链把权重集中到主词。  
4. **图文体验**：每条结果必须有主图（AI 生成或有明确免费许可的实拍）+ 标题 + 摘要 + Why it fits。  
5. **广告就绪**：布局预留广告位与 CMP/隐私合规，**默认关闭**，流量达标后再开。  
6. **新仓工程**：独立 repo、独立设计与实现，不复用 `dinner-ideas` 的代码、内容或设计资产；可部署、可索引、可维护内容库。

### 2.2 Non-Goals

- 真实地点预订 / Google Maps POI 深度集成  
- 账号体系 / 原生 App  
- 线上实时 LLM 生成主推荐文案（入库内容为准；AI 用于生产与配图）  
- 批量发布未经网络调研和人工编辑增值的纯 AI 内容  
- 复制、拼接或近义改写单一来源内容  
- 首发就开广告刷屏  
- Dating app CPA 作为主变现  

---

## 3. 用户与场景

| 画像 | 场景 | 成功标准 |
|------|------|----------|
| 情侣 / 夫妻 | 今晚/周末不知道干嘛 | 60 秒内锁定 1 个可执行想法 |
| 第一次约会 | 要安全、好聊、不尴尬 | 结果偏 public-friendly |
| 有娃父母 | 时间窗短、可能出不了门 | parents / at-home / short 命中 |
| SEO 访客 | 搜 at home / cheap / fall… | Spoke 预填进 Picker |

```
落地（首页或分类/Spoke）
  → 点选 5 步（+ 可选硬限制）
  → 结果页：3 条图文 + Why
  → 刷新再抽一组 / 分享 / 浏览同分类更多
```

---

## 4. 产品方案

### 4.1 信息架构

```
/                                 ← Hub：date night ideas + Picker
/results?...                      ← 可分享结果
/categories                       ← 分类总览（可选）
/categories/[category]            ← 分类着陆（浏览 + 预填入口）
/ideas/[slug]                     ← 单想法详情（完整项目包含）
/{spoke-slug}                     ← SEO Spoke（预填 Picker + 可索引文案）
/about /privacy /terms            ← 合规（广告预留需要）
```

### 4.2 Picker（问答）— 定稿

完整文案与调研依据 → **[docs/research-picker-qa.md](./research-picker-qa.md)**

| Step | 问题 | 类型 | 定稿说明 |
|------|------|------|----------|
| 1 | Who is this for? | 单选：first / dating / longterm / **parents** | **保留 Parents** |
| 2 | Stay in or go out? | 单选：home / out / either | — |
| 3 | What’s the budget? | 单选：free / low / mid / high | — |
| 4 | What vibe? | 单选：chill / playful / romantic / adventurous | — |
| 5 | How much time? | 单选：short / medium / long | — |
| 6 | Any hard limits? | 多选；**可跳过** | 跳过 = 无硬限制 |

另：**Surprise me**；Spoke / 分类页可预填并允许修改。

### 4.2.1 结果页行为（定稿）

- 每次展示 **恰好 3 条**  
- 提供 **Refresh / New set（刷新）**：在**同一组答案**下重新抽样 3 条（尽量不与上一组完全重复）  
- 提供 Start over（回到 Step 1）与 Share

### 4.3 分类主题库（Content Taxonomy）

内容必须**分类**，不是扁平 50 条列表。

#### 4.3.1 主分类（Category · 用于导航 / Spoke / 入库配额）

| Category ID | 名称 | 说明 | 上线建议条数 |
|-------------|------|------|----------------|
| `at-home` | At Home | 不出门 | ≥ 40 |
| `cheap-free` | Cheap & Free | 低成本 | ≥ 30 |
| `romantic` | Romantic | 浪漫向 | ≥ 25 |
| `playful-games` | Playful & Games | 游戏/互动 | ≥ 25 |
| `outdoors` | Outdoors & Adventure | 户外 | ≥ 20 |
| `first-date` | First Date | 安全、好聊 | ≥ 20 |
| `married-longterm` | Married & Long-term | 长期关系 | ≥ 20 |
| `parents` | Parents / After Bedtime | 有娃场景 | ≥ 15 |
| `creative-diy` | Creative & DIY | 动手/创作 | ≥ 20 |
| `food-drink` | Food & Drink | 吃喝向（含无酒） | ≥ 20 |
| `seasonal-fall` | Fall | 秋季 | ≥ 12 |
| `seasonal-winter` | Winter | 冬季 | ≥ 12 |
| `seasonal-spring-summer` | Spring & Summer | 春夏 | ≥ 13 |
| `daytime` | Daytime Dates | 白天约会 | ≥ 13 |
| `unique` | Unique & Bucket-list | 少见玩法 | ≥ 15 |

> 一条 Idea 可属于 **1 个主分类 + 多个 tags**；过滤仍靠 §Schema 字段。  
> **合计上线目标：≥ 300 published**。上表下限合计为 300；一条 Idea 仅按其主分类计入一次配额。

#### 4.3.2 条目字段

见 [spec/spec-data-date-idea-schema.md](../spec/spec-data-date-idea-schema.md)（将同步升级：增加 `primaryCategory`、图源元数据、广告无关）。

每条至少：`title` / `summary` / `image` / 过滤枚举 / `primaryCategory` / `tags` / `sourceReferences` / `editorialReview` / `status`。

#### 4.3.3 内容调研与编辑流水线（完整项目内建）

```text
搜索词与分类任务
  → 广泛发现候选来源
  → 白名单与站点规则检查
  → 受控抓取
  → 去重聚类
  → 逐条编辑增值
  → 原创/安全审核
  → 发布
```

1. 按分类 brief 发现公开网页来源；仅采集站点规则、robots、访问频率和使用条款允许的内容，不绕过登录、付费墙或技术限制  
2. 保存来源 URL、标题、发布者、访问时间与调研笔记；抓取收据另存 HTTP 状态、页面标题、响应体积、可见字数和 SHA-256，不保存来源正文  
3. 跨来源去重和主题聚类，识别同一创意的常见做法、执行条件、风险与变化方式  
4. 由编辑形成独立条目：重写结构，补充可执行步骤、预算、时长、适用场景和 Why it fits；禁止复制、拼接或对单一来源做近义改写  
5. AI 可辅助归纳、结构化、重复检测、语言润色和部分草稿，但不得成为 Idea 的唯一来源；每条发布记录必须经过来源核验、独立约束编辑和唯一 review ID 审核  
6. AI 配图（统一视觉风格指南）或导入 **免费无版权风险** 实拍（记录来源与许可）  
7. 发布前校验：字段完整、硬限制自洽、来源可追溯、内容有编辑增值、相似度与安全检查通过  
8. 覆盖率报告：按 category × 关键 filter 组合检查空桶  

### 4.4 推荐逻辑

1. 硬过滤（deal-breakers、明显不匹配）  
2. 软打分（budget / vibe / duration / stage / location / season）  
3. 多样性（3 条 tag/主分类尽量分散）  
4. 不足 3 条时放宽软条件，不放宽硬条件；会导致少于 3 条的可选硬限制不得在正常 Picker 中提供  
5. 分享链接或手工 URL 仍可能产生 0/1/2 条，此时显示真实数量、原因和修改条件入口，不伪装成 3 条  

### 4.5 SEO：「全站打主词」

**主词治理规则：** `/` 是 `date night ideas` 的唯一主目标 URL。首页 Title、H1、首屏解释、WebSite/WebPage Schema 与主要外链落点围绕该词；分类、Spoke 和 Idea 页使用更具体的搜索意图，不与首页重复相同 Title/H1。全站关键面包屑、正文 CTA 和相关推荐区自然回链首页，锚文本以 `date night ideas` 及自然变体为主，禁止机械重复。

| 层级 | 做什么 |
|------|--------|
| Hub `/` | Title/H1 主打 Date Night Ideas；首屏 Picker |
| Spoke | 每个主分类/高搜长尾一页；预填 + 内链回 Hub |
| Category | 仅为没有对应 Spoke 的分类生成；同一搜索意图不得同时存在 Spoke 与 Category 两个可索引 URL |
| Idea 详情 | 可索引，向 Hub/Category 内链 |
| 技术 | SSR/可抓取、sitemap、canonical、FAQ Schema |

**首发 Spoke 最低集（与分类对齐，可多于 6）：**  
at-home、cheap、romantic、first-date、married、games、parents、fall（或当前季节）、outdoor、unique…

### 4.6 图片策略（定稿）

| 优先级 | 策略 |
|--------|------|
| 主 | AI 生成或有明确免费许可的实拍；按内容适配选择，AI 图遵循统一风格指南 |
| 辅 | **免费、无版权风险** 的真实图片（例如明确免费授权 / 公共领域的图库资源）；**不是付费商用图库采购**；须记录 `imageSource`、许可类型与来源 URL |
| 禁 | 不明来源爬图、品牌水印图、未核实授权的图片、默认假设「能商用就行」的付费素材 |

所有图片需求以 [`assets/image-requirements.json`](../assets/image-requirements.json) 为站点级交接清单；每条 Idea 的逐条写实图片 brief 以 [`assets/idea-image-generation-plan.json`](../assets/idea-image-generation-plan.json) 为准。记录至少包括：稳定 ID、用途、使用页面与槽位、宽高比/尺寸、视觉 brief、生成 Prompt、负面 Prompt、Alt、来源/生成信息、目标路径、状态和验收条件。图片只有在逐条对照 Idea 文案完成视觉审核后才能标记 `approved`。

### 4.6.1 文案与编辑风格

全站文案遵循 [`docs/editorial-guidelines.md`](./editorial-guidelines.md)：先抓住用户当下的情绪或限制，再给具体、可执行的画面和选择理由。禁止空泛的浪漫形容词、批量模板句式和明显 AI 腔；所有发布文案须经过人工朗读检查与编辑审核。

### 4.7 广告策略

- **首发：广告位代码/槽位预留，默认不渲染广告**  
- 结果页：决策区下方预留；禁止打断 Step 1–6  
- 有稳定流量（如 AdSense 门槛或自定时指标）后再开启  
- 同步准备 Privacy / cookies 说明，避免后补合规

### 4.8 变现路径（阶段）

1. 有机流量 → 开展示广告  
2. 结果/详情中按 tag 嵌 Amazon（games、礼盒等）  
3. 可选：邮箱 + printable  

---

## 5. 功能需求（完整项目）

### 5.1 产品

| ID | 需求 |
|----|------|
| FR-01 | 首页 Hub + 启动 Picker |
| FR-02 | 完整 5+1 步问答、进度、Back、Start over、Surprise me |
| FR-03 | 结果页固定 3 条图文 + Why it fits + **Refresh 再抽一组**（同筛选） |
| FR-04 | 分享 URL 可复现筛选结果 |
| FR-05 | 分类体系导航 + 分类页 |
| FR-06 | 单想法详情页 |
| FR-07 | 全量 Spoke 页（主分类/高搜长尾，预填） |
| FR-08 | 主题库 ≥ 300 条高质量 published 内容，按分类配额可验收 |
| FR-09 | 来源采集、去重聚类、编辑审核、内容校验与覆盖率脚本/报告 |
| FR-09A | 图片需求清单可追踪每张图的用途、Prompt、状态、来源和目标路径 |
| FR-10 | 广告槽位预留 + 开关（默认关） |
| FR-11 | Privacy / Terms / 基础分析（开始率、完成率） |

### 5.2 工程与 SEO

| ID | 需求 |
|----|------|
| FR-12 | 新仓库、可部署生产环境 |
| FR-13 | 可索引渲染、sitemap、robots、meta、canonical |
| FR-14 | 移动优先、核心 CWV 达标 |
| FR-15 | 图片 CDN/优化（WebP 等） |

---

## 6. 非功能需求

| ID | 要求 |
|----|------|
| NFR-01 | 无需注册即可完成决策 |
| NFR-02 | 空结果有兜底与解释 |
| NFR-03 | 内容库可批量更新（JSON/MD/CMS 任一，需文档化） |
| NFR-04 | 广告开关不改业务逻辑即可切换 |

---

## 7. 验收标准（AC）

- **AC-01** Given 首页，When 走完主流程，Then 得到恰好 3 条带图建议且含 Why it fits  
- **AC-02** Given 用户跳过 Step 6，When 出结果，Then 不应用任何硬限制过滤  
- **AC-03** Given 用户勾选硬限制，When 出结果，Then 无一违反  
- **AC-04** Given 结果页，When 点击 Refresh，Then 在同一答案下给出新的 3 条（尽可能与上一组不完全相同）  
- **AC-05** Given Hub，When 看 title/h1，Then 主打 date night ideas 且可启动 Picker  
- **AC-06** Given 任一 Spoke，When 打开 Picker，Then 预填正确且可改  
- **AC-07** Given 分享链接，When 新开，Then 筛选语义可复现  
- **AC-08** Given 内容库，When 跑分类配额报告，Then 总 published = 300 且各主分类达到 §4.3.1 下限；每条均有至少 2 个有效来源、研究说明、独立编辑说明和唯一 review ID  
- **AC-09** Given 广告开关=off，When 浏览全站，Then 无广告请求；开关=on 时仅在预留位展示  
- **AC-10** Given 任意 published 配图，When 检查元数据，Then 为 AI 生成或已记录的免费无版权风险来源（非付费商用采购）  
- **AC-11** Given 任一需要但尚未产出的图片，When 检查图片需求清单，Then 已记录 Prompt、用途、位置、规格、Alt、状态和验收条件  
- **AC-12** Given 任一 published 页面，When 做编辑审核，Then 开头有明确吸引点、内容具体可执行、Why it fits 对应真实输入，且不含文案规范列出的模板化 AI 表达  
- **AC-13** Given 全站可索引页面，When 执行 SEO 审计，Then 仅首页以裸词 `date night ideas` 为主要 Title/H1 目标；其他页面使用修饰词且均有合理路径回链首页  
- **AC-14** Given 当前答案，When 某硬限制会令候选少于 3 条，Then 正常 Picker 禁用该限制；Given 分享链接只有 0/1/2 条，Then 页面显示真实数量和恢复路径  
- **AC-15** Given 生产构建，When 比较 sitemap 与页面 canonical，Then 两者集合完全相等、统一尾斜杠、无 noindex URL、无可索引孤页  

---

## 8. 成功指标（上线后）

| 指标 | 方向 |
|------|------|
| 主词/相关词展示与点击 | 上升 |
| Picker 开始率 / 完成率 | 高（对标 dinner 体验） |
| 分类/Spoke 获索引 | 主分类页均有覆盖 |
| 广告 | 达标后再开，看 RPM 与体验投诉 |

---

## 9. 交付与工期（非 MVP 切片，按完整模块）

| 模块 | 内容 |
|------|------|
| A. 基础站 | 新仓、布局、Hub、Picker、结果、分享 |
| B. 内容系统 | Schema、分类、来源采集、去重、编辑审核与校验流水线 |
| C. 内容填充 | 网络调研、编辑审核、≥ 300 条高质量内容 + 配图 |
| D. SEO | Spoke + 分类 + 详情 + sitemap/Schema |
| E. 商业就绪 | 广告位开关、Privacy、分析 |

各模块并行：工程与内容生产可同时推进；**以 AC-01–13 全过为完成**。300 条是上线标准，不能用未经调研与审核的批量 AI 内容补足。开工程序须用户明确授权（当前：已开工）。

---

## 10. 技术建议

| 项 | 建议 |
|----|------|
| 框架 | Next.js（SSR/SSG）或等价可索引方案 |
| 仓 | 全新 Git repo |
| 内容 | 初期结构化 JSON/MD 分目录按 category；量大再 CMS |
| 图 | 生成管线 + CDN |
| 部署 | Vercel / Cloudflare 等 |

---

## 11. 风险

| 风险 | 缓解 |
|------|------|
| 主词竞争高 | Spoke/分类先积权重，内容质量与内链 |
| 300 条内容同质或近似搬运 | 多源调研 + 聚类去重 + 人工编辑增值 + 发布审核 |
| 自动采集违反站点规则或版权边界 | 来源白名单、robots/条款检查、限速、禁止绕过访问限制、保留来源与删除流程 |
| AI 图风格乱 | 强制 style guide |
| 版权 | 实拍仅限免费无版权风险来源并留档；AI 图遵守所用平台条款 |
| 广告伤体验 | 默认关；开后远离决策步骤 |

---

## 12. 定稿状态与开工门槛

- **PRD v1.1.4 已按 SEO、产品、主题和 QA 审计口径收口。**  
- 用户侧：完成 `date-night-ideas.com` 注册。  
- 开工时以本 PRD + `research-picker-qa.md` + Schema 为准，不再回头改核心决策（除非书面变更）。

---

## 13. 文档索引

| 文档 | 路径 |
|------|------|
| 本 PRD（产品定义已确认） | `docs/PRD.md` |
| 问答市场调研（定稿） | `docs/research-picker-qa.md` |
| 文案规范 | `docs/editorial-guidelines.md` |
| 数据 Schema | `spec/spec-data-date-idea-schema.md` |
| 图片需求清单 | `assets/image-requirements.json` |
| 内容研究收据 | `assets/content-research-sources.json` |
| 逐条图片计划 | `assets/idea-image-generation-plan.json` |
| 图片导入目录 | `assets/generated-idea-images/` |

---

## 变更记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v0.1 | 2026-07-19 | 初稿 |
| v0.2 | 2026-07-19 | 吸收域名/新仓/配图/广告/完整项目与分类库；问答外置调研文档；取消 50 条 MVP 叙事 |
| v1.0 | 2026-07-19 | 定稿：Parents / 硬限制可跳过 / 3 条可刷新 / 域名确认；图片改为免费无版权风险（非付费商用）；暂不开工 |
| v1.1 | 2026-07-19 | 产品审查：上线标准改为 300 条高质量内容；网络调研与人工编辑增值为主；限制 AI 批量内容；明确不复用 dinner-ideas 资产 |
| v1.1.1 | 2026-07-19 | 增加图片需求清单与文案规范；要求无图片能力的执行 Agent 也必须完成 Prompt 和使用位置交接 |
| v1.1.2 | 2026-07-19 | 开工；明确全站第一优先级为 `date night ideas`，首页作为唯一裸主词权威页 |
| v1.1.3 | 2026-07-19 | 上线审计整改：研究收据与逐条 review ID；Spoke/Category 去重；首页 300 条目录；canonical/sitemap 一致；硬限制可用性与诚实空状态 |
| v1.1.4 | 2026-07-19 | Date Night 主题审查：替换家务、工作、跑腿和元设计偏题内容；加入偏题门禁；改为每条 Idea 独立写实图片 brief，逐条视觉验收后方可上线 |
