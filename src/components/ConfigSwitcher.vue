<!-- src/components/ConfigSwitcher.vue -->
<template>
  <div class="config-switcher" v-if="isConfigSwitchAllowed">
    <!-- 环境切换按钮 -->
    <el-dropdown @command="handleEnvironmentChange" trigger="click">
      <el-button type="primary" size="small">
        <el-icon><Setting /></el-icon>
        环境切换 ({{ currentEnvironment }})
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="development">开发环境</el-dropdown-item>
          <el-dropdown-item command="production">生产环境</el-dropdown-item>
          <el-dropdown-item command="test">测试环境</el-dropdown-item>
          <el-dropdown-item command="custom" divided>自定义配置</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 自定义配置对话框 -->
    <el-dialog
      v-model="showCustomDialog"
      title="自定义配置"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="customConfig" label-width="120px">
        <el-form-item label="API主机地址">
          <el-input v-model="customConfig.apiHost" placeholder="例如: localhost" />
        </el-form-item>
        <el-form-item label="API端口">
          <el-input-number v-model="customConfig.apiPort" :min="1" :max="65535" />
        </el-form-item>
        <el-form-item label="WebSocket主机">
          <el-input v-model="customConfig.wsHost" placeholder="例如: localhost" />
        </el-form-item>
        <el-form-item label="WebSocket端口">
          <el-input-number v-model="customConfig.wsPort" :min="1" :max="65535" />
        </el-form-item>
        <el-form-item label="请求超时">
          <el-input-number v-model="customConfig.timeout" :min="1000" :max="60000" />
          <span class="ml-2 text-gray-500">毫秒</span>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="showCustomDialog = false">取消</el-button>
        <el-button type="primary" @click="applyCustomConfig">应用配置</el-button>
      </template>
    </el-dialog>

    <!-- 配置信息显示 -->
    <el-popover
      placement="bottom"
      title="当前配置信息"
      :width="300"
      trigger="hover"
    >
      <template #reference>
        <el-button type="info" size="small" circle>
          <el-icon><InfoFilled /></el-icon>
        </el-button>
      </template>
      
      <div class="config-info">
        <p><strong>API地址:</strong> {{ config.api.baseURL }}</p>
        <p><strong>WebSocket:</strong> {{ config.websocket.baseURL }}</p>
        <p><strong>超时时间:</strong> {{ config.api.timeout }}ms</p>
        <p><strong>环境:</strong> {{ config.app.environment }}</p>
        <p><strong>版本:</strong> {{ config.app.version }}</p>
        <p><strong>模式:</strong> <span class="dev-mode">开发模式</span></p>
      </div>
    </el-popover>
  </div>
  
  <!-- 生产环境提示 -->
  <div class="production-notice" v-else>
    <el-tooltip content="配置切换功能仅在开发环境中可用" placement="bottom">
      <el-button type="info" size="small" disabled>
        <el-icon><Lock /></el-icon>
        生产环境
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, InfoFilled, Lock } from '@element-plus/icons-vue'
import configManager from '@/utils/configManager'

// 响应式数据
const currentEnvironment = ref('development')
const showCustomDialog = ref(false)
const config = ref(configManager.getConfig())

// 检查是否允许配置切换
const isConfigSwitchAllowed = computed(() => {
  return configManager.isConfigSwitchAllowed()
})

const customConfig = reactive({
  apiHost: 'localhost',
  apiPort: 8080,
  wsHost: 'localhost',
  wsPort: 9090,
  timeout: 10000
})

// 监听配置变更
onMounted(() => {
  configManager.addListener((newConfig) => {
    config.value = newConfig
    currentEnvironment.value = newConfig.app.environment
  })
})

// 处理环境切换
const handleEnvironmentChange = (command) => {
  if (command === 'custom') {
    showCustomDialog.value = true
    // 填充当前配置
    const currentConfig = configManager.getConfig()
    customConfig.apiHost = currentConfig.api.baseURL.split('://')[1].split(':')[0]
    customConfig.apiPort = parseInt(currentConfig.api.baseURL.split(':')[2])
    customConfig.wsHost = currentConfig.websocket.baseURL.split('://')[1].split(':')[0]
    customConfig.wsPort = parseInt(currentConfig.websocket.baseURL.split(':')[2])
    customConfig.timeout = currentConfig.api.timeout
  } else {
    const success = configManager.switchEnvironment(command)
    if (success) {
      ElMessage.success(`已切换到${command}环境`)
    } else {
      ElMessage.warning('配置切换功能仅在开发环境中可用')
    }
  }
}

// 应用自定义配置
const applyCustomConfig = () => {
  try {
    // 更新API配置
    const apiSuccess = configManager.setApiEndpoint(customConfig.apiHost, customConfig.apiPort)
    
    // 更新WebSocket配置
    const wsSuccess = configManager.setWebSocketEndpoint(customConfig.wsHost, customConfig.wsPort)
    
    // 更新超时配置
    configManager.updateConfig({
      api: {
        ...configManager.getConfig().api,
        timeout: customConfig.timeout
      }
    })
    
    if (apiSuccess && wsSuccess) {
      // 保存配置
      configManager.saveToStorage()
      showCustomDialog.value = false
      ElMessage.success('自定义配置已应用')
    } else {
      ElMessage.warning('配置切换功能仅在开发环境中可用')
    }
  } catch (error) {
    ElMessage.error('配置应用失败: ' + error.message)
  }
}
</script>

<style scoped>
.config-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
}

.production-notice {
  display: flex;
  align-items: center;
}

.config-info p {
  margin: 8px 0;
  font-size: 14px;
}

.config-info strong {
  color: #409eff;
}

.dev-mode {
  color: #67c23a;
  font-weight: bold;
}
</style>
