# companion-mcp 🦆

一个给 **Claude Code**（以及任何支持 MCP 的客户端）用的终端**桌宠系统**。

每个人会根据自己的 seed **确定性**地抽到一只独一无二的小生物：物种、稀有度、帽子、眼睛、属性全部由 seed 哈希决定，改配置文件也伪造不出传说级。灵感来自本仓库对某 Agent CLI 泄露源码的分析（`buddy/` Companion 系统），**全部代码为独立重写实现**。

```
    __
  <(· )___
   (  ._>
    `--´
duck  —  ★ common
```

## 特性

- 🎲 **确定性抽卡**：同一个 seed 永远是同一只。稀有度权重 common 60 / uncommon 25 / rare 10 / epic 4 / legendary 1。
- ✨ **1% 闪光（shiny）**几率。
- 🐾 **18 种物种**：duck、goose、blob、cat、dragon、octopus、owl、penguin、turtle、snail、ghost、axolotl、capybara、cactus、robot、rabbit、mushroom、chonk。
- 🎩 帽子（crown / tophat / wizard / halo …）、眼睛样式、5 项属性（DEBUGGING / PATIENCE / CHAOS / WISDOM / SNARK）。
- 🖼️ 多帧 idle 动画的 ASCII 精灵。
- 💾 本地持久化（名字 / 性格 / 抚摸次数），数据只存在你本机。

## 安装与构建

```powershell
cd companion-mcp
npm install
npm run build
```

构建产物在 `dist/`，入口是 `dist/index.js`。

## 在 Claude Code 中接入

### 方式 A：npx（推荐，免克隆 / 免构建）

发布到 npm 后，任何人都可以直接用：

```powershell
claude mcp add companion -- npx -y companion-mcp
```

或在项目根目录的 `.mcp.json` 中：

```jsonc
{
  "mcpServers": {
    "companion": {
      "command": "npx",
      "args": ["-y", "companion-mcp"]
    }
  }
}
```

也可以直接从 GitHub 仓库运行（无需发布 npm）：

```powershell
claude mcp add companion -- npx -y github:kk-fenglai/CLI_pets
```

### 方式 B：本地路径（开发调试）

在你的项目根目录创建 `.mcp.json`：

```jsonc
{
  "mcpServers": {
    "companion": {
      "command": "node",
      "args": ["绝对路径/companion-mcp/dist/index.js"]
    }
  }
}
```

或命令行添加：

```powershell
claude mcp add companion -- node "绝对路径/companion-mcp/dist/index.js"
```

加好后在 Claude Code 里直接说：

- “看看我的宠物” → 调用 `companion_get`
- “给它取名叫 Ducky，性格毒舌” → `companion_hatch`
- “摸摸它” → `companion_pet`
- “看它的属性” → `companion_stats`

## 提供的工具（MCP Tools）

| 工具 | 作用 |
|------|------|
| `companion_get` | 显示宠物的精灵图、物种、稀有度、属性 |
| `companion_hatch` | 给宠物起名字 / 设定性格 |
| `companion_pet` | 抚摸宠物，返回爱心动画与反应 |
| `companion_stats` | 详细属性条与总分 |
| `companion_render` | 渲染指定动画帧（自建动画用） |
| `companion_reroll` | 更换 seed，重抽一只新生物（会重置名字） |
| `companion_info` | 查看配置路径与当前 seed |

## 配置

| 环境变量 | 说明 |
|----------|------|
| `COMPANION_MCP_DIR` | 配置目录，默认 `~/.companion-mcp` |

seed 默认取 `用户名@主机名`，保证每台机器每个用户稳定且唯一。想换一只就用 `companion_reroll`，可传自定义 seed。

## 项目结构

```
companion-mcp/
├── package.json
├── tsconfig.json
└── src/
    ├── types.ts       # 稀有度 / 物种 / 帽子 / 属性 类型与权重
    ├── sprites.ts     # 18 种 ASCII 精灵 + 渲染/脸部函数
    ├── companion.ts   # 确定性生成（seeded PRNG + 抽卡）
    ├── store.ts       # 本地持久化
    └── index.ts       # MCP 服务器入口（stdio）
```

## 许可

MIT。ASCII 造型与玩法设计参考自公开的源码分析资料，代码为独立实现，仅供学习与个人使用。
