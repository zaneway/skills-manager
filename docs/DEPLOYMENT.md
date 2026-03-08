# Skills Manager Web UI - 部署指南

## 目录
1. [本地开发部署](#1-本地开发部署)
2. [生产环境部署](#2-生产环境部署)
3. [Docker部署](#3-docker部署)
4. [云平台部署](#4-云平台部署)

---

## 1. 本地开发部署

### 快速启动

```bash
# 进入项目目录
cd /Users/zhangzhenwei/code-space/skills-manager

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

服务启动后访问: http://localhost:5173

### 开发模式特性
- 热重载 (HMR)
- 详细的编译错误提示
- Source maps 支持

---

## 2. 生产环境部署

### 2.1 构建

```bash
# 构建生产版本
npm run build
```

构建产物输出到 `dist/` 目录：
```
dist/
├── index.html
└── assets/
    ├── index-XXXX.js
    └── index-XXXX.css
```

### 2.2 本地预览构建结果

```bash
# 预览生产构建
npm run preview
```

### 2.3 静态服务器部署

任何静态文件服务器都可以托管：

```bash
# 使用 serve
npx serve dist

# 使用 http-server
npx http-server dist -p 8080

# 使用 Python
cd dist && python3 -m http.server 8080

# 使用 Nginx
# 配置 nginx.conf 将 root 指向 dist 目录
```

---

## 3. Docker部署

### 3.1 创建 Dockerfile

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制源代码
COPY . .

# 构建
RUN npm run build

# 运行阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3.2 创建 nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### 3.3 构建和运行

```bash
# 构建镜像
docker build -t skills-manager .

# 运行容器
docker run -d -p 8080:80 --name skills-manager skills-manager

# 访问
# http://localhost:8080
```

### 3.4 Docker Compose 部署

```yaml
version: '3.8'

services:
  skills-manager:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
```

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

---

## 4. 云平台部署

### 4.1 Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或连接 GitHub 仓库进行自动部署。

### 4.2 Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

或连接 GitHub 仓库进行自动部署。

**netlify.toml 配置**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 4.3 Cloudflare Pages

1. 登录 Cloudflare Dashboard
2. 创建 Pages 项目
3. 连接 GitHub 仓库
4. 配置：
   - Build command: `npm run build`
   - Build output directory: `dist`

### 4.4 GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4.5 阿里云 OSS + CDN

```bash
# 安装 ossutil
# 配置 ossutil

# 上传构建产物
ossutil cp -r dist/ oss://your-bucket-name/

# 刷新 CDN
ossutil刷新CDN
```

### 4.6 自建服务器 (Nginx)

```bash
# 1. 构建
npm run build

# 2. 上传构建产物到服务器
scp -r dist/* user@your-server:/usr/share/nginx/html/

# 3. Nginx 配置
server {
    listen 80;
    server_name skills.yourdomain.com;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 可选：配置 SSL
}
```

---

## 5. 环境配置

### 5.1 修改端口

Vite 默认端口 5173，可通过以下方式修改：

```bash
# 命令行
npm run dev -- --port 3000

# 或 vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    host: true  // 允许外部访问
  }
})
```

### 5.2 修改基础路径

如果部署在子目录：

```typescript
// vite.config.ts
export default defineConfig({
  base: '/skills-manager/'
})
```

---

## 6. 部署检查清单

- [ ] 运行 `npm run build` 无错误
- [ ] 所有页面正常加载
- [ ] 路由正常工作
- [ ] 静态资源正确加载
- [ ] 移动端适配正常
- [ ] SSL 证书配置（如使用 HTTPS）
- [ ] 域名解析正确

---

## 7. 监控和维护

### 7.1 性能监控
- 使用 Vercel Analytics
- 或集成 Google Analytics

### 7.2 错误追踪
- Sentry
- LogRocket

### 7.3 自动更新
- 配置 CI/CD 自动部署
- 使用 Webhook 触发部署
