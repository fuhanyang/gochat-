# 多阶段构建：构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建参数，默认为production
ARG BUILD_MODE=production
ARG BUILD_CMD=build:prod
ENV NODE_ENV=${BUILD_MODE}

# 构建应用（vite.config.js 已处理 .env 文件不存在的情况）
RUN npm run ${BUILD_CMD}

# 生产阶段：nginx镜像
FROM nginx:alpine

# 从构建阶段复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置文件
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]

