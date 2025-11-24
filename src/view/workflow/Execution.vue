<template>
  <div class="execution-page">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="sidebar__brand" @click="goHome">
        <div class="brand-icon">
          <el-icon><Monitor /></el-icon>
        </div>
        <span class="brand-text">FlowMaster</span>
      </div>
      
      <nav class="sidebar__nav">
        <div 
          v-for="item in navItems" 
          :key="item.key"
          class="nav-item"
          :class="{ active: activeNav === item.key }"
          @click="handleNavClick(item)"
        >
          <el-icon class="nav-icon"><component :is="item.icon" /></el-icon>
          <span class="nav-text">{{ item.label }}</span>
          <div class="active-indicator" v-if="activeNav === item.key"></div>
        </div>
      </nav>

      <div class="sidebar__footer">
        <div class="nav-item" @click="goBackList">
          <el-icon class="nav-icon"><Back /></el-icon>
          <span class="nav-text">返回列表</span>
        </div>
        <div class="user-profile">
          <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="user-name">Admin</span>
        </div>
      </div>
    </aside>

    <!-- 右侧主内容 -->
    <main class="main-content">
      <component 
        :is="currentComponent" 
        :executionData="executionData"
        :steps="steps"
        @terminate="handleTerminate"
        @pause="handlePause"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Monitor, Connection, Odometer, DataLine, Setting, Back } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ExecutionMonitor from './components/ExecutionMonitor.vue'
import WorkflowDetails from './components/WorkflowDetails.vue'
import ExecutionSettings from './components/ExecutionSettings.vue'

const router = useRouter()
const route = useRoute()

// 模拟从路由参数获取ID
const executionId = route.params.id || 'WF-20231123-8721'

const activeNav = ref('dashboard')

const navItems = [
  { key: 'dashboard', label: '执行监控', icon: DataLine },
  { key: 'workflow', label: '流程详情', icon: Connection },
  { key: 'settings', label: '运行配置', icon: Setting },
]

const currentComponent = computed(() => {
  const map = {
    dashboard: ExecutionMonitor,
    workflow: WorkflowDetails,
    settings: ExecutionSettings
  }
  return map[activeNav.value] || ExecutionMonitor
})

const handleNavClick = (item) => {
  activeNav.value = item.key
}

const goHome = () => {
  router.push('/')
}

const goBackList = () => {
  router.push('/dashboard')
}

const executionData = ref({
  id: executionId,
  name: '每周数据备份与分析',
  status: 'running', 
  description: '自动化执行全量数据备份，并进行初步的数据清洗与关键指标分析报告生成。',
  startTime: '2023-11-23 10:00:00',
  estimatedEnd: '2023-11-23 10:15:00'
})

const steps = ref([
  { id: 1, name: '数据备份', status: 'success', description: '从主数据库全量备份用户数据', duration: '2m 30s' },
  { id: 2, name: '数据清洗', status: 'running', description: '去除无效字段与重复记录', duration: 'Running...', progress: 45 },
  { id: 3, name: '生成报告', status: 'pending', description: '基于清洗数据生成分析报表', duration: '-' },
  { id: 4, name: '发送通知', status: 'pending', description: '邮件通知管理员备份结果', duration: '-' },
])

const handleTerminate = () => {
  ElMessage.warning('正在终止任务...')
  setTimeout(() => {
    executionData.value.status = 'failed'
    steps.value[1].status = 'failed'
    ElMessage.error('任务已终止')
  }, 1000)
}

const handlePause = () => {
  if (executionData.value.status === 'running') {
    executionData.value.status = 'paused'
    ElMessage.info('任务已暂停')
  } else if (executionData.value.status === 'paused') {
    executionData.value.status = 'running'
    ElMessage.success('任务已恢复')
  }
}

// 模拟实时更新
onMounted(() => {
  const interval = setInterval(() => {
    if (executionData.value.status !== 'running') return
    
    const runningStep = steps.value.find(s => s.status === 'running')
    if (runningStep && runningStep.progress < 100) {
      runningStep.progress += Math.floor(Math.random() * 5)
      if (runningStep.progress >= 100) {
        runningStep.progress = 100
        runningStep.status = 'success'
        runningStep.duration = '1m 20s'
        
        // Move to next step
        const nextStep = steps.value.find(s => s.status === 'pending')
        if (nextStep) {
          nextStep.status = 'running'
          nextStep.progress = 0
        } else {
          executionData.value.status = 'success'
          clearInterval(interval)
        }
      }
    }
  }, 1000)
})
</script>

<style scoped lang="scss">
.execution-page {
  display: flex;
  min-height: 100vh;
  background-color: #F3F4F6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* 左侧导航栏 */
.sidebar {
  width: 240px;
  background: #FFFFFF;
  border-right: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.02);
  z-index: 10;
}

.sidebar__brand {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #722ED1 0%, #9254DE 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  box-shadow: 0 2px 6px rgba(114, 46, 209, 0.3);
}

.brand-text {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.5px;
}

.sidebar__nav {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s ease;
  position: relative;
  font-weight: 500;
}

.nav-item:hover {
  background: #F9FAFB;
  color: #111827;
}

.nav-item.active {
  background: #F9F6FC;
  color: #722ED1;
  font-weight: 600;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: #722ED1;
  border-radius: 0 4px 4px 0;
}

.nav-icon {
  margin-right: 12px;
  font-size: 20px;
  transition: color 0.2s;
}

.nav-item.active .nav-icon {
  color: #722ED1;
}

.nav-text {
  font-size: 14px;
}

.sidebar__footer {
  padding: 16px;
  border-top: 1px solid #F3F4F6;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-top: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-profile:hover {
  background: #F9FAFB;
}

.user-name {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 32px 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>

