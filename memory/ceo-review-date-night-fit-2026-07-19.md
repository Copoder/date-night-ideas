# CEO 产品审查：是否真的属于 Date Night Ideas

日期：2026-07-19  
模式：SELECTIVE EXPANSION  
结论：**当前 300 条不是全部合格；内容大盘可保留，但需要一轮主题清洗后，才能把逐条图片生成计划视为最终交付。**

## 判断标准

每条 Idea 必须同时满足：

1. **明确的两人约会意图**：不是把普通家务、工作或办事加上“together”。
2. **共同参与**：两个人都在做、选择、交换或回应，而不是一人做事另一人陪同。
3. **约会形状**：有开始、过程和收尾，能形成“今晚我们做了这件事”的记忆点。
4. **关系回报**：产生亲密、好笑、发现、合作或共同故事中的至少一种结果。

`daytime`、`parents`、`cheap-free`、`first-date` 可以保留；“date night”在这里描述的是约会场景与意图，不强制要求晚上或消费。

## 需要下线或重写的硬问题

这些不是图片问题，而是产品定义问题，必须先处理：

| 当前 Idea | 问题 | 建议 |
|---|---|---|
| Fold Laundry, Ask Better Questions | 核心动作是家务，约会只是附加对话 | 删除，替换为不带家务前提的 Question Walk / Porch Conversation |
| Spring Cleaning Reward Date | 核心动作是清洁，奖励才是约会 | 删除，替换为季节性户外约会 |
| Library Work-Break Date | 核心动作是工作/各自阅读，约会感弱 | 重写为共同选书、共读或读后散步 |
| Create a Date for Strangers | 是设计练习，不是用户今晚可以执行的约会 | 删除，替换为真实的约束型约会 |
| Separate Errands, Shared Finish | 核心动作是分头办事 | 重写为 Secret Surprise Swap，去掉 errands 语义 |
| Home Project With a Finish Line | 容易退化为装修/家务任务 | 重写为一次小型共同创作，并明确只做一个可展示成果 |

## Date-adjacent，需要加强文案而非全部删除

以下方向可以保留，但必须在标题、hook、步骤和图片中表达两人关系与约会收尾：

- Beach or River Cleanup Walk
- Volunteer Skill Swap
- Free Outdoor Workout Swap
- Coupon Date Challenge
- Grocery Store World Tour
- Community Calendar Roulette
- Free Trial Class Date
- One-Room Makeover Sprint
- Design Your Dream Sunday
- Home Weather Station Date
- Photo-Free Family Story Night
- Tiny Awards Ceremony
- Museum of Your Future Home
- Transit Line Adventure
- Library Surprise Picks

它们的共同问题是“活动本身成立，但约会叙事不够”。保留时要补一个明确的 couple payoff，例如共同选择、互相准备、最后的一杯饮料/甜点、一个只属于两人的小纪念物或下一次约会承诺。

## 产品结构判断

### 当前状态

`at-home`、`romantic`、`playful-games`、`food-drink`、`creative-diy`、季节类和大部分 outdoors 内容符合核心定位。`cheap-free`、`first-date`、`parents`、`daytime` 是有效的场景切片，不应因为不够“浪漫晚餐”而删除。

### 主要风险

如果不清理上述边界内容，用户会形成两个负面判断：

- 搜索结果看起来像普通活动清单，不像真正懂约会的产品。
- 图片即使精准描述活动，也会把“家务/工作/办事”放大，进一步削弱情侣感。

因此，图片生成必须在内容主题审查之后执行。当前 300 条图片 prompt 可以作为草稿，但不能把 300 条全部标为最终 approved。

## 可选处理路径

### A. 最小修复（S）

删除/替换 6 条硬问题，给约 15 条 date-adjacent 补约会收尾。最快，但无法系统防止后续内容漂移。

### B. 推荐：选择性扩展（M）

保留 300 条上线数量，逐条打四项主题分数；硬问题替换，边界内容重写；把主题分数加入内容审计，并要求图片 prompt 引用最终版标题与行动。这样不扩大数量，但提升整站一致性。

### C. 理想架构（L）

把内容拆成“约会意图 + 活动载体 + 关系回报”三层，每条至少有一个显式 couple payoff，并按关系阶段生成不同版本。长期质量最高，但会扩大当前编辑与 QA 工作量。

当前建议采用 **B**。这与此前确认的“选择性拓展”一致。

## 其他审查项

1. 架构：图片计划应依赖最终 Idea slug；内容先定、图片后生，顺序正确。
2. 错误与恢复：图片缺失或审核拒绝时必须继续使用临时活动组图，不能出现 broken image。
3. 安全：外部生成图需要检查未成年人、危险运动、酒精和地点可达性，不得只检查文件格式。
4. 数据流：标题/动作变更后，旧图片 prompt 必须失效并重新生成，避免文图再次漂移。
5. 代码质量：当前临时组图映射已是过渡方案，不应继续扩充更多泛化图片组。
6. 测试：新增主题分数门禁，至少覆盖硬问题词、无 couple payoff 和纯家务/工作动作。
7. 观测：上线后记录详情页图片点击、图片加载失败和用户返回 Picker 的比例，判断图文是否仍不匹配。
8. 状态：将图片状态区分为 brief、generated、visually_reviewed、approved，不能用“文件存在”代替视觉验收。
9. API：无新增 API；外部生成服务只产生文件，不应直接写入发布目录。
10. 性能：300 张逐条图应继续懒加载，不得把完整图片集放进首页首屏。
11. UX：详情页图必须让用户在看标题前就能认出活动；认不出的图应退回，不用“情侣感”掩盖活动不相关。

## CEO 结论

**不是全部符合。** 当前产品骨架是对的，但需要先完成 B 路径的主题清洗，再批准对应图片。图像问题和主题问题不能分别处理：如果活动本身不是约会，生成更写实、更有情侣感的图片只会把错误放大。
