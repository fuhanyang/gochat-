<template>
  <div class="progress-list card-effect">
    <h3 class="section-title">执行进度</h3>
    
    <div class="step-list">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="step-item"
        :class="step.status"
      >
        <!-- 步骤图标 -->
        <div class="step-icon">
          <div v-if="step.status === 'success'" class="icon-success">
            <svg viewBox="0 0 24 24" class="check-svg">
              <circle cx="12" cy="12" r="10" class="check-circle" />
              <path d="M7 13l3 3 7-7" class="check-path" />
            </svg>
          </div>
          <div v-else-if="step.status === 'running'" class="icon-running">
            <div class="spinner"></div>
          </div>
          <div v-else class="icon-pending">
            <span>{{ step.id }}</span>
          </div>
        </div>

        <!-- 步骤内容 -->
        <div class="step-content">
          <div class="step-header">
            <div class="header-main">
              <span class="step-name">{{ step.name }}</span>
              <span class="status-tag" :class="step.status">{{ getStatusLabel(step.status) }}</span>
            </div>
            <div class="step-time">耗时：{{ step.duration }}</div>
          </div>
          
          <p class="step-desc">{{ step.description }}</p>
          
          <!-- 进度条 (仅运行中或有进度时显示) -->
          <div v-if="step.status === 'running' || step.progress !== undefined" class="progress-container">
            <div class="progress-track">
              <div 
                class="progress-bar" 
                :style="{ width: (step.progress || 0) + '%' }"
              ></div>
            </div>
            <span class="progress-text" v-if="step.status === 'running'">{{ step.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => []
  }
})

const getStatusLabel = (status) => {
  const map = {
    success: '成功完成',
    running: '运行中',
    pending: '等待执行',
    failed: '执行失败'
  }
  return map[status] || status
}
</script>

<style scoped lang="scss">
.card-effect {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px 24px;
  transition: all 0.2s ease;
}

.card-effect:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  gap: 16px;
}

.step-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Success Icon */
.icon-success {
  width: 24px;
  height: 24px;
  background: #ECFDF5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #10B981;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.check-path {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: drawCheck 0.5s ease forwards;
}

.check-circle {
  stroke: transparent; /* Optional: show circle border */
}

/* Running Icon */
.icon-running {
  width: 24px;
  height: 24px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: #722ED1;
  border-right-color: #722ED1;
  border-bottom-color: #722ED1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Pending Icon */
.icon-pending {
  width: 24px;
  height: 24px;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 12px;
  font-weight: 500;
}

.step-content {
  flex: 1;
}

.step-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}

.status-tag {
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 4px;
}

.status-tag.success { color: #10B981; background: #ECFDF5; }
.status-tag.running { color: #3B82F6; background: #DBEAFE; } // 描述说运行中是蓝色
.status-tag.pending { color: #9CA3AF; background: #F3F4F6; }

.step-time {
  font-size: 13px;
  color: #6B7280;
}

.step-desc {
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 8px;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #722ED1 0%, #A06CD5 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
  /* Simple fill animation happens via transition on width change */
}

.progress-text {
  font-size: 12px;
  color: #722ED1;
  width: 32px;
  text-align: right;
}

@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

