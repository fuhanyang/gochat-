// src/utils/configManager.js
/**
 * 配置管理工具
 * 提供动态配置切换功能
 */

import { config } from '@/config'

class ConfigManager {
  constructor() {
    this.currentConfig = { ...config }
    this.listeners = []
    this.isDevelopmentMode = this.checkDevelopmentMode()
  }

  /**
   * 检查是否为开发模式
   */
  checkDevelopmentMode() {
    // 检查环境变量
    if (import.meta.env.MODE === 'development') {
      return true
    }
    
    // 检查是否为本地开发
    if (import.meta.env.DEV) {
      return true
    }
    
    // 检查域名是否为localhost
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '0.0.0.0') {
      return true
    }
    
    // 检查是否有开发标识
    if (import.meta.env.VITE_ENABLE_CONFIG_SWITCH === 'true') {
      return true
    }
    
    return false
  }

  /**
   * 检查是否允许配置切换
   */
  isConfigSwitchAllowed() {
    return this.isDevelopmentMode
  }

  /**
   * 获取当前配置
   */
  getConfig() {
    return this.currentConfig
  }

  /**
   * 更新配置
   * @param {object} newConfig - 新配置
   */
  updateConfig(newConfig) {
    this.currentConfig = { ...this.currentConfig, ...newConfig }
    this.notifyListeners()
  }

  /**
   * 切换环境
   * @param {string} environment - 环境名称
   */
  switchEnvironment(environment) {
    // 检查是否允许配置切换
    if (!this.isConfigSwitchAllowed()) {
      console.warn('配置切换功能仅在开发环境中可用')
      return false
    }

    const envConfigs = {
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

    const envConfig = envConfigs[environment]
    if (envConfig) {
      this.updateConfig(envConfig)
      console.log(`已切换到${environment}环境`)
      return true
    } else {
      console.error(`未知环境: ${environment}`)
      return false
    }
  }

  /**
   * 动态设置API地址
   * @param {string} host - 主机地址
   * @param {number} port - 端口号
   */
  setApiEndpoint(host, port) {
    // 检查是否允许配置切换
    if (!this.isConfigSwitchAllowed()) {
      console.warn('配置切换功能仅在开发环境中可用')
      return false
    }

    this.updateConfig({
      api: {
        ...this.currentConfig.api,
        baseURL: `http://${host}:${port}`
      }
    })
    console.log(`API地址已更新为: http://${host}:${port}`)
    return true
  }

  /**
   * 动态设置WebSocket地址
   * @param {string} host - 主机地址
   * @param {number} port - 端口号
   */
  setWebSocketEndpoint(host, port) {
    // 检查是否允许配置切换
    if (!this.isConfigSwitchAllowed()) {
      console.warn('配置切换功能仅在开发环境中可用')
      return false
    }

    this.updateConfig({
      websocket: {
        ...this.currentConfig.websocket,
        baseURL: `ws://${host}:${port}`
      }
    })
    console.log(`WebSocket地址已更新为: ws://${host}:${port}`)
    return true
  }

  /**
   * 添加配置变更监听器
   * @param {function} listener - 监听器函数
   */
  addListener(listener) {
    this.listeners.push(listener)
  }

  /**
   * 移除配置变更监听器
   * @param {function} listener - 监听器函数
   */
  removeListener(listener) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }

  /**
   * 通知所有监听器
   */
  notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentConfig)
      } catch (error) {
        console.error('配置监听器执行失败:', error)
      }
    })
  }

  /**
   * 保存配置到本地存储
   */
  saveToStorage() {
    try {
      localStorage.setItem('app_config', JSON.stringify(this.currentConfig))
      console.log('配置已保存到本地存储')
    } catch (error) {
      console.error('保存配置失败:', error)
    }
  }

  /**
   * 从本地存储加载配置
   */
  loadFromStorage() {
    try {
      const savedConfig = localStorage.getItem('app_config')
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig)
        this.updateConfig(parsedConfig)
        console.log('已从本地存储加载配置')
        return true
      }
    } catch (error) {
      console.error('加载配置失败:', error)
    }
    return false
  }

  /**
   * 重置为默认配置
   */
  resetToDefault() {
    this.currentConfig = { ...config }
    this.notifyListeners()
    localStorage.removeItem('app_config')
    console.log('已重置为默认配置')
  }
}

// 创建全局实例
const configManager = new ConfigManager()

export default configManager
export { ConfigManager }
