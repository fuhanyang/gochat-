// src/config/index.js
/**
 * 应用配置管理
 * 精简版本，优先使用环境变量
 */

// 基础配置（环境变量优先，其次为默认值）
const config = {
  // API配置
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080' : (() => {
      if (import.meta.env.PROD) {
        console.error('❌ 生产环境必须设置 VITE_API_BASE_URL 环境变量');
        throw new Error('生产环境必须设置 VITE_API_BASE_URL 环境变量');
      }
      return '';
    })()),
    timeout: import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 10000,
    basePath: '/api'
  },
  
  // WebSocket配置
  websocket: {
    baseURL: import.meta.env.VITE_WS_BASE_URL || (import.meta.env.DEV ? 'ws://localhost:9090' : (() => {
      if (import.meta.env.PROD) {
        console.error('❌ 生产环境必须设置 VITE_WS_BASE_URL 环境变量');
        throw new Error('生产环境必须设置 VITE_WS_BASE_URL 环境变量');
      }
      return '';
    })()),
    reconnectInterval: 5000,
    maxReconnectAttempts: 10
  },
  
  // 应用配置
  app: {
    title: import.meta.env.VITE_APP_TITLE || 
          (import.meta.env.PROD ? 'GoChat' : 'GoChat (开发环境)'),
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development'
  }
}

export const getConfig = () => config

export const getCurrentEnvironment = () => config.app.environment

// 导出配置对象
export default config
