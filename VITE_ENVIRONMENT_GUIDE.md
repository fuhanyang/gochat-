# Vite环境变量机制详解

## 🚀 启动命令与环境判断

### 1. **npm scripts 命令**

```json
{
  "scripts": {
    "serve": "vite",           // 开发环境
    "build": "vite build",     // 生产环境构建
    "preview": "vite preview"  // 生产环境预览
  }
}
```

### 2. **Vite自动环境检测**

Vite会根据启动命令自动设置以下环境变量：

#### **开发环境** (`npm run serve` 或 `vite`)
```javascript
import.meta.env.MODE === 'development'
import.meta.env.DEV === true
import.meta.env.PROD === false
```

#### **生产环境** (`npm run build`)
```javascript
import.meta.env.MODE === 'production'
import.meta.env.DEV === false
import.meta.env.PROD === true
```

### 3. **环境配置文件**

Vite会自动加载对应的环境配置文件：

#### **开发环境**
- `.env.development`
- `.env.local` (优先级更高)

#### **生产环境**
- `.env.production`
- `.env.local` (优先级更高)

#### **所有环境**
- `.env`

### 4. **环境变量命名规则**

只有以 `VITE_` 开头的环境变量才会暴露给客户端：

```bash
# ✅ 会被暴露给客户端
VITE_API_BASE_URL=http://localhost:8080
VITE_ENABLE_CONFIG_SWITCH=true

# ❌ 不会暴露给客户端（服务端专用）
API_SECRET_KEY=secret123
DATABASE_URL=postgres://...
```

## 🔧 实际使用示例

### 1. **创建环境配置文件**

#### `.env.development`
```bash
# 开发环境配置
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_BASE_URL=ws://localhost:9090
VITE_ENABLE_CONFIG_SWITCH=true
VITE_APP_ENV=development
VITE_DEBUG=true
```

#### `.env.production`
```bash
# 生产环境配置
VITE_API_BASE_URL=http://8.137.19.65:8080
VITE_WS_BASE_URL=ws://8.137.19.65:9090
VITE_ENABLE_CONFIG_SWITCH=false
VITE_APP_ENV=production
VITE_DEBUG=false
```

### 2. **在代码中使用**

```javascript
// 获取环境变量
const apiUrl = import.meta.env.VITE_API_BASE_URL
const isDev = import.meta.env.DEV
const mode = import.meta.env.MODE

// 环境判断
if (import.meta.env.DEV) {
  console.log('开发环境')
} else if (import.meta.env.PROD) {
  console.log('生产环境')
}
```

## 🎯 我们的安全检测机制

### 1. **多重检测**

```javascript
checkDevelopmentMode() {
  // 1. Vite内置环境变量
  if (import.meta.env.MODE === 'development') return true
  if (import.meta.env.DEV) return true
  
  // 2. 域名检测（额外安全层）
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return true
  }
  
  // 3. 手动标识（允许强制启用）
  if (import.meta.env.VITE_ENABLE_CONFIG_SWITCH === 'true') {
    return true
  }
  
  return false
}
```

### 2. **检测优先级**

1. **Vite环境变量** (最高优先级)
2. **域名检测** (安全层)
3. **手动标识** (可配置)

## 🚀 启动方式对比

### 开发环境
```bash
# 方式1：npm script
npm run serve

# 方式2：直接命令
npx vite

# 方式3：指定模式
npx vite --mode development
```

### 生产环境
```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🔒 安全考虑

### 1. **为什么需要多重检测？**

- **Vite环境变量**：可能被恶意修改
- **域名检测**：额外的安全层
- **手动标识**：允许特殊情况下的配置

### 2. **生产环境保护**

```javascript
// 生产环境下的行为
if (!this.isConfigSwitchAllowed()) {
  console.warn('配置切换功能仅在开发环境中可用')
  return false
}
```

## 📋 总结

环境判断主要来源于：

1. **Vite启动命令** (`npm run serve` vs `npm run build`)
2. **环境配置文件** (`.env.development` vs `.env.production`)
3. **Vite内置环境变量** (`import.meta.env.DEV`, `import.meta.env.MODE`)
4. **额外安全检测** (域名检测、手动标识)

这样确保了配置切换功能只在真正的开发环境中可用！
