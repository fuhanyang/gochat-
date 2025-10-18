// src/config/index.js
/**
 * 应用配置管理
 * 支持开发环境和生产环境的灵活配置
 */

// 默认配置
const defaultConfig = {
  // API配置
  api: {
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    basePath: '/api'
  },
  
  // WebSocket配置
  websocket: {
    baseURL: 'ws://localhost:9090',
    reconnectInterval: 5000,
    maxReconnectAttempts: 10
  },
  
  // 应用配置
  app: {
    title: 'GoChat',
    version: '1.0.0',
    environment: 'development'
  }
}

// 环境特定配置
const environmentConfigs = {
  development: {
    api: {
      baseURL: 'http://localhost:8080',
      timeout: 10000
    },
    websocket: {
      baseURL: 'ws://localhost:9090'
    },
    app: {
      title: 'GoChat (开发环境)',
      environment: 'development'
    }
  },
  
  production: {
    api: {
      baseURL: 'http://8.137.19.65:8080',
      timeout: 15000
    },
    websocket: {
      baseURL: 'ws://8.137.19.65:9090'
    },
    app: {
      title: 'GoChat',
      environment: 'production'
    }
  },
  
  test: {
    api: {
      baseURL: 'http://test.example.com:8080',
      timeout: 8000
    },
    websocket: {
      baseURL: 'ws://test.example.com:9090'
    },
    app: {
      title: 'GoChat (测试环境)',
      environment: 'test'
    }
  }
}

/**
 * 获取当前环境
 */
function getCurrentEnvironment() {
  // 优先使用Vite环境变量
  if (import.meta.env.MODE) {
    return import.meta.env.MODE
  }
  
  // 使用NODE_ENV
  if (import.meta.env.NODE_ENV) {
    return import.meta.env.NODE_ENV
  }
  
  // 默认开发环境
  return 'development'
}

/**
 * 合并配置
 */
function mergeConfig(defaultConfig, envConfig) {
  const merged = JSON.parse(JSON.stringify(defaultConfig))
  
  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {}
        deepMerge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  
  deepMerge(merged, envConfig)
  return merged
}

/**
 * 从环境变量获取配置
 */
function getConfigFromEnv() {
  const envConfig = {}
  
  // API配置
  if (import.meta.env.VITE_API_BASE_URL) {
    envConfig.api = {
      ...envConfig.api,
      baseURL: import.meta.env.VITE_API_BASE_URL
    }
  }
  
  if (import.meta.env.VITE_API_TIMEOUT) {
    envConfig.api = {
      ...envConfig.api,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT)
    }
  }
  
  // WebSocket配置
  if (import.meta.env.VITE_WS_BASE_URL) {
    envConfig.websocket = {
      ...envConfig.websocket,
      baseURL: import.meta.env.VITE_WS_BASE_URL
    }
  }
  
  // 应用配置
  if (import.meta.env.VITE_APP_TITLE) {
    envConfig.app = {
      ...envConfig.app,
      title: import.meta.env.VITE_APP_TITLE
    }
  }
  
  return envConfig
}

/**
 * 获取最终配置
 */
function getConfig() {
  const currentEnv = getCurrentEnvironment()
  const envConfig = environmentConfigs[currentEnv] || environmentConfigs.development
  const envVarConfig = getConfigFromEnv()
  
  // 合并配置：默认配置 -> 环境配置 -> 环境变量配置
  let config = mergeConfig(defaultConfig, envConfig)
  config = mergeConfig(config, envVarConfig)
  
  return config
}

// 导出配置
export const config = getConfig()

// 导出工具函数
export {
  getCurrentEnvironment,
  getConfig,
  mergeConfig
}

// 导出配置对象
export default config
