# Skills Manager Web UI - 使用手册

## 目录
1. [快速开始](#1-快速开始)
2. [界面介绍](#2-界面介绍)
3. [功能操作指南](#3-功能操作指南)
4. [常见问题](#4-常见问题)

---

## 1. 快速开始

### 环境要求
- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装步骤

```bash
# 1. 进入项目目录
cd /Users/zhangzhenwei/code-space/skills-manager

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
http://localhost:5173
```

### 构建生产版本

```bash
npm run build

# 构建产物在 dist/ 目录
```

---

## 2. 界面介绍

### 2.1 整体布局

```
┌─────────────────────────────────────────────────────────┐
│  侧边栏 (256px)    │        主内容区                    │
│                    │                                    │
│  ┌──────────────┐  │  ┌────────────────────────────┐  │
│  │   Logo       │  │  │                            │  │
│  │  Skills      │  │  │      功能卡片区域           │  │
│  │  Manager     │  │  │                            │  │
│  └──────────────┘  │  │                            │  │
│                    │  └────────────────────────────┘  │
│  ┌──────────────┐  │                                    │
│  │ List Skills  │  │  ┌────────────────────────────┐  │
│  │ Add Skills   │  │  │    终端输出面板 (可选)      │  │
│  │ Find Skills  │  │  └────────────────────────────┘  │
│  │ Check Update │  │                                    │
│  │ Update All   │  │                                    │
│  │ Create Skill │  │                                    │
│  │ Remove       │  │                                    │
│  └──────────────┘  │                                    │
└─────────────────────────────────────────────────────────┘
```

### 2.2 侧边栏功能

| 功能 | 图标 | 说明 |
|------|------|------|
| List Skills | 📋 | 查看已安装的技能 |
| Add Skills | ➕ | 安装新技能 |
| Find Skills | 🔍 | 搜索技能库 |
| Check Updates | ✅ | 检查更新 |
| Update All | 🔄 | 更新所有技能 |
| Create Skill | 📝 | 创建技能模板 |
| Remove Skills | 🗑️ | 移除技能 |

---

## 3. 功能操作指南

### 3.1 查看已安装技能 (List Skills)

**位置**: 侧边栏第一个选项

**操作**:
1. 点击 "List Skills"
2. 系统显示所有已安装的技能列表
3. 每项显示：技能名称、描述、所属Agent、作用域
4. 可点击删除图标快速移除

**示例**:
```
┌────────────────────────────────────────┐
│ frontend-design                        │
│ Create production-grade frontend...   │
│ [claude-code] [project]        [🗑️]  │
├────────────────────────────────────────┤
│ github                                 │
│ Interact with GitHub using gh CLI     │
│ [openclaw] [global]            [🗑️]  │
└────────────────────────────────────────┘
```

### 3.2 添加技能 (Add Skills)

**位置**: 侧边栏 "Add Skills"

**支持的输入格式**:
| 格式 | 示例 |
|------|------|
| GitHub简写 | `vercel-labs/agent-skills` |
| GitHub URL | `https://github.com/vercel-labs/agent-skills` |
| 子路径 | `https://github.com/vercel-labs/skills/tree/main/skills/web-design-guidelines` |
| GitLab | `https://gitlab.com/org/repo` |
| 任意Git | `git@github.com:vercel-labs/agent-skills.git` |
| 本地路径 | `./my-local-skills` |

**操作步骤**:
1. 在输入框中输入技能来源
2. 可选：点击Agent标签选择目标代理（支持多选）
3. 可选：勾选 "Install globally" 安装到全局
4. 查看命令预览
5. 点击 "Install Skills" 执行安装

**选项说明**:
| 选项 | 说明 |
|------|------|
| -g, --global | 安装到用户目录而非项目 |
| -a, --agent | 指定目标Agent |
| -s, --skill | 指定要安装的技能名称 |
| -y, --yes | 跳过确认提示 |

### 3.3 搜索技能 (Find Skills)

**位置**: 侧边栏 "Find Skills"

**操作**:
1. 在搜索框输入关键词（如 `typescript`、`frontend`）
2. 点击 "Search" 或按回车
3. 查看搜索结果
4. 留空可进入交互式搜索模式

**示例命令**:
```bash
# 关键词搜索
npx skills find typescript

# 交互式搜索
npx skills find
```

### 3.4 检查更新 (Check Updates)

**位置**: 侧边栏 "Check Updates"

**操作**:
1. 点击 "Check for Updates"
2. 系统检查所有已安装技能的更新
3. 在终端面板显示可更新的技能列表

### 3.5 更新所有技能 (Update All)

**位置**: 侧边栏 "Update All"

**操作**:
1. 点击 "Update All Skills"
2. 系统更新所有技能到最新版本
3. 在终端面板显示更新结果

**注意**: 此操作会更新所有已安装的技能，请确保了解更新的内容。

### 3.6 创建新技能 (Create Skill)

**位置**: 侧边栏 "Create Skill"

**操作**:
1. 可选：输入技能名称（如 `my-awesome-skill`）
2. 点击 "Create SKILL.md"
3. 系统在当前目录创建 SKILL.md 模板文件

**输出**:
创建的模板文件包含：
- 技能名称
- 技能描述
- 技能位置
- 使用说明

### 3.7 移除技能 (Remove Skills)

**位置**: 侧边栏 "Remove Skills"

**操作方式**:

**方式一：多选移除**
1. 点击已安装技能的标签进行选择
2. 选择一个或多个技能
3. 点击 "Remove Skills"

**方式二：手动输入**
1. 在输入框输入技能名称
2. 可选：勾选 "Remove from global" 移除全局技能
3. 点击 "Remove Skills"

**常用命令**:
```bash
# 移除单个技能
npx skills remove web-design-guidelines

# 移除多个技能
npx skills remove frontend-design web-design-guidelines

# 移除全局技能
npx skills remove --global my-skill

# 移除所有技能
npx skills remove --all
```

---

## 4. 常见问题

### Q1: 如何确定要安装到哪个Agent？
A: 取决于您使用的编码代理。您可以：
- 查看您的Agent配置文件
- 选择多个Agent以支持不同的编辑器

### Q2: 项目作用域 vs 全局作用域有什么区别？
| 作用域 | 位置 | 适用场景 |
|--------|------|----------|
| 项目 | `./<agent>/skills/` | 团队共享，与项目一起提交 |
| 全局 | `~/<agent>/skills/` | 个人配置，所有项目可用 |

### Q3: 安装失败怎么办？
A: 检查以下几点：
1. 网络连接是否正常
2. GitHub仓库是否存在
3. Agent目录是否有写入权限

### Q4: 如何查看完整的命令行帮助？
A: 在侧边栏底部显示快速命令：
```
npx skills --help
```

### Q5: 当前版本是完整功能吗？
A: 当前版本是**UI演示版本**，界面和交互已经完整，但要真正执行CLI命令需要：
1. 部署后端服务
2. 或使用Electron桌面应用方案

### Q6: 支持哪些Agent？
A: 支持所有vercel-labs/skills CLI支持的Agent，包括但不限于：
- OpenClaw
- Claude Code
- Codex
- Cursor
- OpenCode
- Windsurf
- Roo Code
- Continue
- Cline

---

## 技术支持

- 项目地址: https://github.com/vercel-labs/skills
- 问题反馈: 请提交Issue
