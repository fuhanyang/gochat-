# GitHub Actions 工作流说明

本项目包含两个 GitHub Actions 工作流：

## 1. CI 工作流 (`ci.yml`)

**触发条件：**
- 推送到 `main` 或 `dev` 分支
- 向 `main` 或 `dev` 分支创建 Pull Request

**功能：**
- 安装依赖 (`npm ci`)
- 根据分支选择构建模式：
  - `main` 分支 → 生产模式 (`build:prod`)
  - `dev` 分支 → 开发模式 (`build:dev`)
- 验证构建结果
- 上传构建产物 (`dist/`) 作为 artifact（保留7天）

**用途：** 快速验证代码能否成功构建，适合在 PR 阶段检查。

## 2. CD 工作流 (`cd.yml`)

**触发条件：**
- 推送到 `main` 或 `dev` 分支
- 创建版本标签 (`v*`)

**功能：**
- 使用多阶段 Docker 构建：
  - 阶段1：在 Node.js 环境中构建 Vue 应用
  - 阶段2：将构建产物复制到 nginx:alpine 镜像
- 根据分支设置镜像标签：
  - `main` 分支 → `cyglowflow-frontend:latest`
  - `dev` 分支 → `cyglowflow-frontend:dev`
- 上传 Docker 镜像作为 artifact（保留30天）

**用途：** 构建完整的 Docker 镜像，包含 nginx 反向代理配置，可直接用于部署。

## 部署说明

### 使用 Docker Compose（开发环境）

```bash
# 构建 dist 目录
npm run build:dev  # 或 build:prod

# 启动 nginx 容器
docker-compose up -d
```

### 使用 Docker 镜像（生产环境）

```bash
# 从 GitHub Actions 下载镜像 artifact，或从构建服务器获取
docker load -i image.tar

# 运行容器
docker run -d -p 80:80 \
  --name cyglowflow-frontend \
  cyglowflow-frontend:latest
```

### Nginx 配置

nginx 配置文件位于 `deploy/nginx/nginx.conf`，包含：
- 静态资源服务（`/`）
- 后端 API 代理（`/api/v1/` → 后端服务）
- Gzip 压缩
- CORS 支持

**注意：** 当前 nginx 配置中，后端代理指向 `host.docker.internal:8080`，这是用于 Docker 容器访问宿主机服务的配置。在生产环境中，可能需要根据实际情况修改后端地址。

## 环境变量

确保在构建前创建相应的环境变量文件：
- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.test` - 测试环境

这些文件通常不应该提交到 Git 仓库中。在生产 CI/CD 中，建议使用 GitHub Secrets 或 CI 环境变量来配置。

