<!-- src/view/config/index.vue -->
<template>
  <div class="config-page">
    <div class="config-container">
      <h1 class="page-title">环境配置管理</h1>
      
      <!-- 配置切换组件 -->
      <div class="config-section">
        <h2>快速切换</h2>
        <ConfigSwitcher />
      </div>
      
      <!-- 当前配置信息 -->
      <div class="config-section">
        <h2>当前配置</h2>
        <div class="config-info-card">
          <div class="info-item">
            <label>API地址:</label>
            <span>{{ config.api.baseURL }}</span>
          </div>
          <div class="info-item">
            <label>WebSocket地址:</label>
            <span>{{ config.websocket.baseURL }}</span>
          </div>
          <div class="info-item">
            <label>请求超时:</label>
            <span>{{ config.api.timeout }}ms</span>
          </div>
          <div class="info-item">
            <label>当前环境:</label>
            <span class="env-badge" :class="config.app.environment">
              {{ config.app.environment }}
            </span>
          </div>
          <div class="info-item">
            <label>应用版本:</label>
            <span>{{ config.app.version }}</span>
          </div>
        </div>
      </div>
      
      <!-- 配置操作 -->
      <div class="config-section">
        <h2>配置操作</h2>
        <div class="action-buttons">
          <el-button type="primary" @click="saveConfig">
            <el-icon><Download /></el-icon>
            保存配置
          </el-button>
          <el-button type="success" @click="loadConfig">
            <el-icon><Upload /></el-icon>
            加载配置
          </el-button>
          <el-button type="warning" @click="resetConfig">
            <el-icon><Refresh /></el-icon>
            重置配置
          </el-button>
          <el-button type="info" @click="exportConfig">
            <el-icon><Document /></el-icon>
            导出配置
          </el-button>
        </div>
      </div>
      
      <!-- 配置历史 -->
      <div class="config-section">
        <h2>配置历史</h2>
        <div class="history-list">
          <div 
            v-for="(item, index) in configHistory" 
            :key="index"
            class="history-item"
          >
            <div class="history-time">{{ item.time }}</div>
            <div class="history-config">{{ item.config }}</div>
            <el-button size="small" @click="restoreConfig(item)">恢复</el-button>
          </div>
        </div>
      </div>
      
      <!-- 返回按钮 -->
      <div class="back-section">
        <el-button type="primary" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Download, Upload, Refresh, Document, ArrowLeft } from '@element-plus/icons-vue'
import ConfigSwitcher from '@/components/ConfigSwitcher.vue'
import configManager from '@/utils/configManager'

const router = useRouter()
const config = ref(configManager.getConfig())
const configHistory = ref([])

// 监听配置变更
onMounted(() => {
  configManager.addListener((newConfig) => {
    config.value = newConfig
    addToHistory(newConfig)
  })
  
  // 加载配置历史
  loadConfigHistory()
})

// 保存配置
const saveConfig = () => {
  configManager.saveToStorage()
  ElMessage.success('配置已保存')
}

// 加载配置
const loadConfig = () => {
  const loaded = configManager.loadFromStorage()
  if (loaded) {
    ElMessage.success('配置已加载')
  } else {
    ElMessage.warning('没有找到保存的配置')
  }
}

// 重置配置
const resetConfig = () => {
  configManager.resetToDefault()
  ElMessage.success('配置已重置')
}

// 导出配置
const exportConfig = () => {
  const configData = JSON.stringify(config.value, null, 2)
  const blob = new Blob([configData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `config-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('配置已导出')
}

// 添加到历史记录
const addToHistory = (newConfig) => {
  const historyItem = {
    time: new Date().toLocaleString(),
    config: `${newConfig.api.baseURL} (${newConfig.app.environment})`
  }
  
  configHistory.value.unshift(historyItem)
  
  // 限制历史记录数量
  if (configHistory.value.length > 10) {
    configHistory.value = configHistory.value.slice(0, 10)
  }
  
  // 保存到本地存储
  localStorage.setItem('config_history', JSON.stringify(configHistory.value))
}

// 加载配置历史
const loadConfigHistory = () => {
  try {
    const saved = localStorage.getItem('config_history')
    if (saved) {
      configHistory.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('加载配置历史失败:', error)
  }
}

// 恢复配置
const restoreConfig = (item) => {
  // 这里可以根据需要实现配置恢复逻辑
  ElMessage.info('配置恢复功能待实现')
}

// 返回
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.config-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.config-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
}

.config-section {
  margin-bottom: 30px;
  
  h2 {
    color: #409eff;
    margin-bottom: 15px;
    font-size: 18px;
  }
}

.config-info-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
  
  label {
    font-weight: bold;
    color: #666;
  }
  
  span {
    color: #333;
  }
}

.env-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  
  &.development {
    background: #e1f5fe;
    color: #0277bd;
  }
  
  &.production {
    background: #f3e5f5;
    color: #7b1fa2;
  }
  
  &.test {
    background: #fff3e0;
    color: #ef6c00;
  }
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.history-list {
  max-height: 300px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  
  .history-time {
    font-size: 12px;
    color: #666;
    min-width: 120px;
  }
  
  .history-config {
    flex: 1;
    margin: 0 15px;
    color: #333;
  }
}

.back-section {
  text-align: center;
  margin-top: 30px;
}

// 响应式设计
@media (max-width: 768px) {
  .config-container {
    margin: 10px;
    padding: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
