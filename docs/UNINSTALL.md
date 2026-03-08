# Skills Manager Web UI - 卸载指南

## 目录
1. [本地开发环境卸载](#1-本地开发环境卸载)
2. [Docker卸载](#2-docker卸载)
3. [云平台卸载](#3-云平台卸载)
4. [数据清理](#4-数据清理)
5. [常见问题](#5-常见问题)

---

## 1. 本地开发环境卸载

### 步骤 1: 停止服务

如果开发服务器正在运行，按以下方式停止：

```bash
# 查看运行中的进程
lsof -i :5173

# 或者使用 pkill
pkill -f "vite"

# 或者在终端按 Ctrl + C
```

### 步骤 2: 删除项目目录

```bash
# 完整删除项目目录及所有文件
rm -rf /Users/zhangzhenwei/code-space/skills-manager

# 验证删除
ls /Users/zhangzhenwei/code-space/
```

### 步骤 3: 清理全局缓存 (可选)

如果不再需要 Node.js 全局包：

```bash
# 查看 npm 全局包
npm list -g --depth=0

# 移除相关全局包 (如有必要)
npm uninstall -g vercel
```

---

## 2. Docker卸载

### 2.1 停止并删除容器

```bash
# 查看运行中的容器
docker ps -a | grep skills-manager

# 停止容器
docker stop skills-manager

# 删除容器
docker rm skills-manager

# 或使用 docker-compose
docker-compose down
```

### 2.2 删除镜像

```bash
# 查看镜像
docker images | grep skills-manager

# 删除镜像
docker rmi skills-manager

# 或删除构建缓存
docker builder prune
```

### 2.3 清理数据卷 (可选)

```bash
# 查看 volumes
docker volume ls | grep skills-manager

# 删除 volume
docker volume rm skills-manager_data
```

### 2.4 完整清理命令

```bash
# 一条命令完成所有清理
docker stop skills-manager 2>/dev/null
docker rm skills-manager 2>/dev/null
docker rmi skills-manager 2>/dev/null
docker system prune -f
```

---

## 3. 云平台卸载

### 3.1 Vercel

```bash
# 安装 Vercel CLI (如未安装)
npm i -g vercel

# 登录
vercel login

# 删除项目
vercel remove skills-manager

# 或在 Vercel Dashboard 中删除
# Settings -> General -> Delete Project
```

### 3.2 Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 删除站点
netlify sites:delete skills-manager

# 或在 Netlify Dashboard 中删除
# Site settings -> Delete site
```

### 3.3 Cloudflare Pages

1. 登录 Cloudflare Dashboard
2. 进入 Pages
3. 选择项目
4. 点击 "Delete project"

### 3.4 GitHub Pages

GitHub Pages 是通过 GitHub Actions 部署的：

```bash
# 删除 GitHub 仓库
# 仓库设置 -> Danger Zone -> Delete this repository
```

或在 GitHub 网站上操作：
1. 进入仓库 Settings
2. 滚动到 Danger Zone
3. 点击 "Delete this repository"

### 3.5 自建服务器

```bash
# SSH 登录服务器
ssh user@your-server

# 停止 Nginx (如配置了 systemd)
sudo systemctl stop nginx

# 删除部署目录
sudo rm -rf /usr/share/nginx/html/skills-manager

# 删除 Nginx 配置
sudo rm /etc/nginx/sites-available/skills-manager
sudo rm /etc/nginx/sites-enabled/skills-manager

# 重载 Nginx
sudo systemctl reload nginx
```

---

## 4. 数据清理

### 4.1 清理浏览器数据

如果使用过部署的网站，建议清理：

```bash
# 清理 LocalStorage (浏览器控制台)
localStorage.clear()
sessionStorage.clear()

# 清理 cookies
# 浏览器设置 -> 隐私 -> 清除浏览数据
```

### 4.2 清理系统临时文件

```bash
# macOS
rm -rf ~/Library/Caches/Vite
rm -rf ~/.npm/_cacache

# Linux
rm -rf ~/.cache/vite
rm -rf ~/.npm/_cacache
```

---

## 5. 常见问题

### Q1: 删除后技能文件还在吗？
A: 技能文件存储在您的 Agent 配置目录中（如 `~/.claude/skills/`），删除 Web UI 不会影响已安装的技能。

### Q2: 如何完全卸载技能？
A: 需要手动删除各 Agent 的 skills 目录：

```bash
# 查看所有 Agent 的技能目录
ls ~/.claude/skills/
ls ~/.cursor/skills/
ls ~/.openclaw/skills/

# 删除特定技能
rm -rf ~/.claude/skills/frontend-design

# 或删除所有技能
rm -rf ~/.claude/skills/*
```

### Q3: Docker 卸载后数据还在？
A: 如果使用了 volume，数据会保留。如需完全删除：

```bash
docker volume rm skills-manager_data
```

### Q4: 云平台删除后可以恢复吗？
A: 
- **Vercel/Netlify**: 可以通过部署历史恢复
- **GitHub Pages**: 可以从 Git 仓库恢复
- **自建服务器**: 取决于是否有备份

### Q5: 如何检查是否完全卸载？

```bash
# 检查端口占用
lsof -i :5173
lsof -i :80

# 检查进程
ps aux | grep skills-manager
ps aux | grep vite
ps aux | grep nginx

# 检查 Docker
docker ps -a | grep skills-manager
```

---

## 6. 卸载检查清单

- [ ] 开发服务器已停止
- [ ] 项目目录已删除
- [ ] Docker 容器/镜像已删除
- [ ] 云平台项目已删除
- [ ] 服务器配置已清理
- [ ] 浏览器缓存已清理
- [ ] 端口已释放

---

## 7. 重新安装

如需重新安装：

```bash
# 克隆项目
git clone <your-repo-url> /Users/zhangzhenwei/code-space/skills-manager

# 进入目录
cd /Users/zhangzhenwei/code-space/skills-manager

# 安装依赖
npm install

# 启动
npm run dev
```
