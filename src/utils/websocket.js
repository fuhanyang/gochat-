// src/utils/websocket.js
import config from '@/config'

/**
 * WebSocket连接管理类
 * 支持多用户连接、自动重连、消息队列等功能
 */
class WebSocketManager {
  constructor() {
    this.connections = new Map() // 存储每个用户的WebSocket连接
    this.reconnectTimers = new Map() // 存储重连定时器
    this.retryCounts = new Map() // 存储重试次数
    this.messageQueues = new Map() // 存储离线消息队列
    this.maxRetries = config.websocket.maxReconnectAttempts
    this.reconnectInterval = config.websocket.reconnectInterval
  }

  /**
   * 建立WebSocket连接
   * @param {string} userId - 用户ID
   * @param {string} token - JWT Token
   * @param {function} onMessage - 消息处理回调
   * @param {function} onError - 错误处理回调
   */
  connect(userId, token, onMessage, onError) {
    if (!userId || !token) {
      console.error('WebSocket连接失败: 缺少用户ID或Token')
      return null
    }

    // 如果已存在连接，先关闭
    this.disconnect(userId)

    const wsUrl = `${config.websocket.baseURL}/api/v1/chat/ws?token=${token}`
    console.log(`尝试连接WebSocket: ${wsUrl}`)

    try {
      const ws = new WebSocket(wsUrl)
      
      // 存储连接
      this.connections.set(userId, ws)
      this.retryCounts.set(userId, 0)

      // 连接成功
      ws.onopen = (event) => {
        console.log(`WebSocket连接成功: ${userId}`)
        this.retryCounts.set(userId, 0) // 重置重试次数
        
        // 发送队列中的消息
        this.sendQueuedMessages(userId)
      }

      // 接收消息
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          console.log(`收到WebSocket消息:`, message)
          
          if (onMessage) {
            onMessage(message)
          }
        } catch (error) {
          console.error('解析WebSocket消息失败:', error)
        }
      }

      // 连接关闭
      ws.onclose = (event) => {
        console.log(`WebSocket连接关闭: ${userId}`, event)
        this.connections.delete(userId)
        
        // 正常关闭时不重连
        if (event.code === 1000) {
          console.log('正常关闭，不进行重连')
          return
        }
        
        // 被踢出时不重连
        if (event.reason && event.reason.includes('被踢出')) {
          console.log('被踢出，不进行重连')
          return
        }
        
        // 其他情况触发重连
        this.scheduleReconnect(userId, token, onMessage, onError)
      }

      // 连接错误
      ws.onerror = (error) => {
        console.error(`WebSocket连接错误: ${userId}`, error)
        
        if (onError) {
          onError(error)
        }
        
        // 错误时触发重连
        if (ws.readyState !== WebSocket.CLOSED) {
          ws.close(1011, '连接错误')
        }
      }

      return ws
    } catch (error) {
      console.error('创建WebSocket连接失败:', error)
      if (onError) {
        onError(error)
      }
      return null
    }
  }

  /**
   * 断开WebSocket连接
   * @param {string} userId - 用户ID
   */
  disconnect(userId) {
    // 关闭WebSocket连接
    const ws = this.connections.get(userId)
    if (ws) {
      ws.close(1000, '用户主动断开')
      this.connections.delete(userId)
    }
    
    // 清除重连定时器
    const timer = this.reconnectTimers.get(userId)
    if (timer) {
      clearTimeout(timer)
      this.reconnectTimers.delete(userId)
    }
    
    // 清除重试计数
    this.retryCounts.delete(userId)
    
    console.log(`已断开WebSocket连接: ${userId}`)
  }

  /**
   * 发送消息
   * @param {string} userId - 用户ID
   * @param {object} message - 消息对象
   */
  sendMessage(userId, message) {
    const ws = this.connections.get(userId)
    
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(message))
        console.log(`发送WebSocket消息:`, message)
        return true
      } catch (error) {
        console.error('发送WebSocket消息失败:', error)
        return false
      }
    } else {
      console.warn('WebSocket未连接，消息加入队列')
      this.queueMessage(userId, message)
      return false
    }
  }

  /**
   * 将消息加入队列
   * @param {string} userId - 用户ID
   * @param {object} message - 消息对象
   */
  queueMessage(userId, message) {
    if (!this.messageQueues.has(userId)) {
      this.messageQueues.set(userId, [])
    }
    
    const queue = this.messageQueues.get(userId)
    queue.push({
      ...message,
      timestamp: Date.now()
    })
    
    // 限制队列大小
    if (queue.length > 100) {
      queue.shift()
    }
  }

  /**
   * 发送队列中的消息
   * @param {string} userId - 用户ID
   */
  sendQueuedMessages(userId) {
    const queue = this.messageQueues.get(userId)
    if (!queue || queue.length === 0) {
      return
    }
    
    console.log(`发送队列中的${queue.length}条消息`)
    
    const ws = this.connections.get(userId)
    if (ws && ws.readyState === WebSocket.OPEN) {
      queue.forEach(message => {
        try {
          ws.send(JSON.stringify(message))
        } catch (error) {
          console.error('发送队列消息失败:', error)
        }
      })
      
      // 清空队列
      this.messageQueues.delete(userId)
    }
  }

  /**
   * 安排重连
   * @param {string} userId - 用户ID
   * @param {string} token - JWT Token
   * @param {function} onMessage - 消息处理回调
   * @param {function} onError - 错误处理回调
   */
  scheduleReconnect(userId, token, onMessage, onError) {
    const currentRetryCount = this.retryCounts.get(userId) || 0
    
    // 检查是否超过最大重试次数
    if (currentRetryCount >= this.maxRetries) {
      console.error(`已达到最大重试次数（${this.maxRetries}次），停止重连: ${userId}`)
      return
    }
    
    const newRetryCount = currentRetryCount + 1
    this.retryCounts.set(userId, newRetryCount)
    
    console.log(`第${newRetryCount}次重连将在${this.reconnectInterval/1000}秒后进行: ${userId}`)
    
    // 设置重连定时器
    const timer = setTimeout(() => {
      this.connect(userId, token, onMessage, onError)
    }, this.reconnectInterval)
    
    this.reconnectTimers.set(userId, timer)
  }

  /**
   * 获取连接状态
   * @param {string} userId - 用户ID
   * @returns {string} - 连接状态
   */
  getConnectionState(userId) {
    const ws = this.connections.get(userId)
    if (!ws) {
      return 'DISCONNECTED'
    }
    
    switch (ws.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING'
      case WebSocket.OPEN:
        return 'CONNECTED'
      case WebSocket.CLOSING:
        return 'CLOSING'
      case WebSocket.CLOSED:
        return 'CLOSED'
      default:
        return 'UNKNOWN'
    }
  }

  /**
   * 获取所有连接的用户
   * @returns {Array} - 用户ID数组
   */
  getConnectedUsers() {
    return Array.from(this.connections.keys())
  }

  /**
   * 断开所有连接
   */
  disconnectAll() {
    this.connections.forEach((ws, userId) => {
      this.disconnect(userId)
    })
  }
}

// 创建全局实例
const websocketManager = new WebSocketManager()

export default websocketManager
export { WebSocketManager }