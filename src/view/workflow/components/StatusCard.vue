<template>
  <div class="status-card card-effect">
    <div class="card-header">
      <div class="header-left">
        <h1 class="page-title">工作流执行状态</h1>
        <span class="status-badge" :class="execution.status">
          {{ statusText }}
        </span>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" @click="$emit('pause')">
          <el-icon><VideoPause /></el-icon>
          暂停
        </button>
        <button class="btn btn-danger shake-on-hover" @click="$emit('terminate')">
          <el-icon><SwitchButton /></el-icon>
          终止
        </button>
        <el-dropdown trigger="click">
          <button class="btn btn-icon">
            <el-icon><MoreFilled /></el-icon>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>查看日志</el-dropdown-item>
              <el-dropdown-item>重试失败步骤</el-dropdown-item>
              <el-dropdown-item divided>删除记录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="workflow-info">
      <div class="info-main">
        <span class="workflow-name">{{ execution.name }}</span>
        <span class="workflow-id">{{ execution.id }}</span>
      </div>
      <p class="workflow-desc">{{ execution.description }}</p>
    </div>

    <div class="info-row">
      <div class="info-item">
        <span class="label">开始时间：</span>
        <span class="value">{{ execution.startTime }}</span>
      </div>
      <div class="info-item">
        <span class="label">预计结束：</span>
        <span class="value">{{ execution.estimatedEnd }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { VideoPause, SwitchButton, MoreFilled } from '@element-plus/icons-vue'

const props = defineProps({
  execution: {
    type: Object,
    required: true
  }
})

defineEmits(['pause', 'terminate'])

const statusText = computed(() => {
  const map = {
    running: '运行中',
    success: '成功完成',
    failed: '执行失败',
    paused: '已暂停'
  }
  return map[props.execution.status] || props.execution.status
})
</script>

<style scoped lang="scss">
.card-effect {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px 24px; /* Inner padding 16px requested, adjusted slightly for better breathing room */
  transition: all 0.2s ease;
}

.card-effect:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  background: #9CA3AF; // default
}

.status-badge.running {
  background: #10B981;
}
.status-badge.success {
  background: #10B981;
}
.status-badge.failed {
  background: #EF4444;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Custom Button Styles */
.btn {
  height: 32px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  outline: none;
}

.btn-outline {
  background: white;
  border-color: #E5E7EB;
  color: #4B5563;
}

.btn-outline:hover {
  border-color: #722ED1;
  color: #722ED1;
}

.btn-danger {
  background: #EF4444;
  color: white;
}

.btn-danger:hover {
  background: #DC2626;
}

.shake-on-hover:hover {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

.btn-icon {
  padding: 0;
  width: 32px;
  justify-content: center;
  background: transparent;
  color: #9CA3AF;
}

.btn-icon:hover {
  color: #722ED1;
  background: #F9F6FC;
}

.workflow-info {
  margin-bottom: 16px;
}

.info-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 4px;
}

.workflow-name {
  font-size: 16px;
  font-weight: 700;
  color: #722ED1;
}

.workflow-id {
  font-size: 14px;
  color: #6B7280;
}

.workflow-desc {
  font-size: 14px;
  color: #9CA3AF;
  margin: 0;
}

.info-row {
  display: flex;
  gap: 24px;
  border-top: 1px solid #F3F4F6;
  padding-top: 16px;
}

.info-item {
  font-size: 13px;
  color: #6B7280;
}

.info-item .value {
  color: #4B5563;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>

