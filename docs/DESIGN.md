# Skills Manager Web UI - 设计文档

## 1. 项目概述

### 1.1 项目背景
Skills Manager Web UI 是为 [vercel-labs/skills](https://github.com/vercel-labs/skills) CLI 工具开发的图形化管理界面。该CLI是开源的Agent技能管理系统，支持多种编码代理（Claude Code、Codex、Cursor等）。

### 1.2 项目目标
通过Web界面的方式，让用户能够通过点击操作完成原本需要命令行执行的技能管理操作，降低使用门槛，提升用户体验。

### 1.3 核心功能
- 查看已安装的技能列表
- 安装新技能（支持GitHub、npm、本地路径）
- 搜索技能库
- 检查技能更新
- 更新所有技能
- 创建新技能模板
- 移除已安装的技能

---

## 2. 技术架构

### 2.1 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 7.x | 构建工具 |
| Tailwind CSS | 4.x | 样式框架 |
| Lucide React | latest | 图标库 |

### 2.2 项目结构
```
skills-manager/
├── src/
│   ├── components/
│   │   └── ui/              # UI组件库
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── badge.tsx
│   ├── lib/
│   │   └── utils.ts         # 工具函数
│   ├── App.tsx              # 主应用
│   ├── main.tsx             # 入口
│   └── index.css            # 全局样式
├── public/
│   └── vite.svg
├── dist/                    # 构建输出
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
├── package-lock.json
├── eslint.config.js
└── README.md
```

### 2.3 组件设计

#### UI组件库
采用原子化设计理念，构建基础UI组件：

- **Button** - 按钮组件
  - variants: default, destructive, outline, secondary, ghost, link
  - sizes: default, sm, lg, icon

- **Card** - 卡片组件
  - 包含 CardHeader, CardTitle, CardDescription, CardContent, CardFooter

- **Input** - 输入框组件
  - 支持所有标准HTML input属性

- **Badge** - 标签组件
  - variants: default, secondary, destructive, outline

#### 页面组件
主应用 App.tsx 包含7个功能页面，通过状态切换实现SPA体验。

---

## 3. 功能模块设计

### 3.1 侧边栏导航
- 固定左侧宽度 256px
- 包含Logo和版本信息
- 7个导航项，对应7个功能
- 当前激活项高亮显示

### 3.2 功能页面

#### List Skills（技能列表）
- 显示已安装的技能
- 每项显示：名称、描述、所属Agent、作用域
- 提供删除快捷入口

#### Add Skills（添加技能）
- 输入框：支持多种来源格式
  - GitHub简写: `owner/repo`
  - GitHub完整URL
  - 子路径: `owner/repo/tree/main/skills/xxx`
  - GitLab URL
  - 任意Git URL
  - 本地路径: `./my-local-skills`
- Agent多选
- 全局安装选项
- 命令预览
- 执行按钮

#### Find Skills（搜索技能）
- 搜索输入框
- 支持关键词搜索
- 留空进行交互式搜索

#### Check Updates（检查更新）
- 单一按钮操作
- 显示检查进度
- 列出可更新的技能

#### Update All（更新全部）
- 确认提示
- 批量更新所有技能

#### Create Skill（创建技能）
- 技能名称输入（可选）
- 创建SKILL.md模板

#### Remove Skills（移除技能）
- 技能多选
- 输入框手动指定
- 全局/项目作用域选择

### 3.3 终端输出面板
- 显示命令执行结果
- 模拟终端样式
- 实时输出展示

---

## 4. 样式设计

### 4.1 配色方案
采用深色主题，参考现代IDE风格：

| 变量 | 值 | 用途 |
|------|------|------|
| --background | #0f172a | 背景色 |
| --foreground | #f8fafc | 文字色 |
| --card | #1e293b | 卡片背景 |
| --primary | #3b82f6 | 主色调 |
| --secondary | #334155 | 次要色 |
| --muted | #334155 | 弱化色 |
| --destructive | #ef4444 | 危险操作 |
| --border | #334155 | 边框色 |

### 4.2 布局
- 侧边栏 + 主内容区布局
- 主内容区最大宽度 768px 居中
- 间距使用 4px 基数系统
- 卡片圆角 8px

---

## 5. 扩展性设计

### 5.1 后端集成
当前版本为UI演示，要实现真正的CLI执行，需要：

1. **方案A：后端API服务**
   - 创建Node.js后端服务
   - 暴露REST API
   - 前端通过fetch调用

2. **方案B：Electron桌面应用**
   - 集成Node.js运行时
   - 直接调用本地CLI

3. **方案C：Serverless函数**
   - 部署到Vercel/Netlify
   - 通过API路由执行命令

### 5.2 Agent支持
当前支持以下Agent，可轻松扩展：
- openclaw, claude-code, codex, cursor, opencode
- windsurf, roo, continue, cline
- 以及更多...

---

## 6. 构建与部署

### 6.1 开发模式
```bash
npm run dev
```

### 6.2 生产构建
```bash
npm run build
```

### 6.3 部署
构建产物位于 `dist/` 目录，可部署到任意静态托管服务。

---

## 7. 未来规划

- [ ] 集成后端服务实现真正的CLI执行
- [ ] 添加用户认证
- [ ] 技能详情页面
- [ ] 批量操作支持
- [ ] 主题切换（亮色/暗色）
- [ ] 移动端适配
- [ ] 国际化支持
