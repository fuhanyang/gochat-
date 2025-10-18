<!-- src/view/env-test/index.vue -->
<template>
  <div class="env-test-page">
    <div class="env-container">
      <h1>环境变量测试页面</h1>
      
      <!-- 环境信息 -->
      <div class="env-section">
        <h2>🌍 当前环境信息</h2>
        <div class="env-info">
          <div class="info-item">
            <label>MODE:</label>
            <span :class="envModeClass">{{ envMode }}</span>
          </div>
          <div class="info-item">
            <label>DEV:</label>
            <span :class="envDevClass">{{ envDev }}</span>
          </div>
          <div class="info-item">
            <label>PROD:</label>
            <span :class="envProdClass">{{ envProd }}</span>
          </div>
          <div class="info-item">
            <label>BASE_URL:</label>
            <span>{{ envBaseUrl }}</span>
          </div>
        </div>
      </div>
      
      <!-- 自定义环境变量 -->
      <div class="env-section">
        <h2>⚙️ 自定义环境变量</h2>
        <div class="env-info">
          <div class="info-item">
            <label>VITE_API_BASE_URL:</label>
            <span>{{ viteApiBaseUrl }}</span>
          </div>
          <div class="info-item">
            <label>VITE_WS_BASE_URL:</label>
            <span>{{ viteWsBaseUrl }}</span>
          </div>
          <div class="info-item">
            <label>VITE_ENABLE_CONFIG_SWITCH:</label>
            <span :class="configSwitchClass">{{ viteEnableConfigSwitch }}</span>
          </div>
          <div class="info-item">
            <label>VITE_APP_ENV:</label>
            <span>{{ viteAppEnv }}</span>
          </div>
        </div>
      </div>
      
      <!-- 域名信息 -->
      <div class="env-section">
        <h2>🌐 域名信息</h2>
        <div class="env-info">
          <div class="info-item">
            <label>Hostname:</label>
            <span>{{ hostname }}</span>
          </div>
          <div class="info-item">
            <label>Port:</label>
            <span>{{ port }}</span>
          </div>
          <div class="info-item">
            <label>Protocol:</label>
            <span>{{ protocol }}</span>
          </div>
          <div class="info-item">
            <label>Full URL:</label>
            <span>{{ fullUrl }}</span>
          </div>
        </div>
      </div>
      
      <!-- 配置切换权限 -->
      <div class="env-section">
        <h2>🔒 配置切换权限</h2>
        <div class="env-info">
          <div class="info-item">
            <label>允许配置切换:</label>
            <span :class="configSwitchAllowedClass">{{ configSwitchAllowed }}</span>
          </div>
          <div class="info-item">
            <label>检测原因:</label>
            <span>{{ detectionReason }}</span>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="env-section">
        <h2>🎮 测试操作</h2>
        <div class="action-buttons">
          <el-button type="primary" @click="testConfigSwitch">
            测试配置切换
          </el-button>
          <el-button type="success" @click="refreshEnvInfo">
            刷新环境信息
          </el-button>
          <el-button type="warning" @click="showAllEnvVars">
            显示所有环境变量
          </el-button>
        </div>
      </div>
      
      <!-- 返回按钮 -->
      <div class="back-section">
        <el-button @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import configManager from '@/utils/configManager'

const router = useRouter()

// 环境变量
const envMode = ref('')
const envDev = ref(false)
const envProd = ref(false)
const envBaseUrl = ref('')
const viteApiBaseUrl = ref('')
const viteWsBaseUrl = ref('')
const viteEnableConfigSwitch = ref('')
const viteAppEnv = ref('')

// 域名信息
const hostname = ref('')
const port = ref('')
const protocol = ref('')
const fullUrl = ref('')

// 配置切换权限
const configSwitchAllowed = ref(false)
const detectionReason = ref('')

// 计算属性
const envModeClass = computed(() => ({
  'env-development': envMode.value === 'development',
  'env-production': envMode.value === 'production'
}))

const envDevClass = computed(() => ({
  'env-true': envDev.value === true,
  'env-false': envDev.value === false
}))

const envProdClass = computed(() => ({
  'env-true': envProd.value === true,
  'env-false': envProd.value === false
}))

const configSwitchClass = computed(() => ({
  'env-true': viteEnableConfigSwitch.value === 'true',
  'env-false': viteEnableConfigSwitch.value === 'false'
}))

const configSwitchAllowedClass = computed(() => ({
  'env-true': configSwitchAllowed.value === true,
  'env-false': configSwitchAllowed.value === false
}))

// 加载环境信息
const loadEnvInfo = () => {
  // Vite内置环境变量
  envMode.value = import.meta.env.MODE || 'unknown'
  envDev.value = import.meta.env.DEV || false
  envProd.value = import.meta.env.PROD || false
  envBaseUrl.value = import.meta.env.BASE_URL || '/'
  
  // 自定义环境变量
  viteApiBaseUrl.value = import.meta.env.VITE_API_BASE_URL || '未设置'
  viteWsBaseUrl.value = import.meta.env.VITE_WS_BASE_URL || '未设置'
  viteEnableConfigSwitch.value = import.meta.env.VITE_ENABLE_CONFIG_SWITCH || '未设置'
  viteAppEnv.value = import.meta.env.VITE_APP_ENV || '未设置'
  
  // 域名信息
  hostname.value = window.location.hostname
  port.value = window.location.port || '80/443'
  protocol.value = window.location.protocol
  fullUrl.value = window.location.href
  
  // 配置切换权限
  configSwitchAllowed.value = configManager.isConfigSwitchAllowed()
  
  // 检测原因
  if (import.meta.env.MODE === 'development') {
    detectionReason.value = 'Vite环境变量: MODE === development'
  } else if (import.meta.env.DEV) {
    detectionReason.value = 'Vite环境变量: DEV === true'
  } else if (window.location.hostname === 'localhost') {
    detectionReason.value = '域名检测: localhost'
  } else if (window.location.hostname === '127.0.0.1') {
    detectionReason.value = '域名检测: 127.0.0.1'
  } else if (import.meta.env.VITE_ENABLE_CONFIG_SWITCH === 'true') {
    detectionReason.value = '手动标识: VITE_ENABLE_CONFIG_SWITCH === true'
  } else {
    detectionReason.value = '未满足任何开发环境条件'
  }
}

// 测试配置切换
const testConfigSwitch = () => {
  const success = configManager.switchEnvironment('test')
  if (success) {
    ElMessage.success('配置切换测试成功')
  } else {
    ElMessage.warning('配置切换功能被禁用')
  }
}

// 刷新环境信息
const refreshEnvInfo = () => {
  loadEnvInfo()
  ElMessage.success('环境信息已刷新')
}

// 显示所有环境变量
const showAllEnvVars = () => {
  const allEnvVars = Object.keys(import.meta.env)
  console.log('所有环境变量:', allEnvVars)
  console.log('环境变量详情:', import.meta.env)
  ElMessage.success('环境变量已输出到控制台')
}

// 返回
const goBack = () => {
  router.go(-1)
}

// 组件挂载时加载环境信息
onMounted(() => {
  loadEnvInfo()
})
</script>

<style scoped lang="scss">
.env-test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.env-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.env-section {
  margin-bottom: 30px;
  
  h2 {
    color: #409eff;
    margin-bottom: 15px;
    font-size: 18px;
  }
}

.env-info {
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
    min-width: 200px;
  }
  
  span {
    color: #333;
    font-family: monospace;
  }
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.back-section {
  text-align: center;
  margin-top: 30px;
}

// 环境状态样式
.env-development {
  color: #67c23a;
  font-weight: bold;
}

.env-production {
  color: #f56c6c;
  font-weight: bold;
}

.env-true {
  color: #67c23a;
  font-weight: bold;
}

.env-false {
  color: #f56c6c;
  font-weight: bold;
}

// 响应式设计
@media (max-width: 768px) {
  .env-container {
    margin: 10px;
    padding: 20px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
