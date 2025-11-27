<template>
  <div class="workflow-stats-wrapper">
    <!-- 顶部统计概览 -->
    <div class="stats-overview-card">
      <div class="stats-header">
        <h3>工作流概览</h3>
        <div class="stats-date">本周</div>
      </div>
      
      <div class="stats-grid-refined">
        <div class="stat-item-refined primary">
          <div class="stat-icon-box">⚡</div>
          <div class="stat-info-box">
            <div class="stat-value-refined">{{ workflowStats.totalExecutions }}</div>
            <div class="stat-label-refined">总执行</div>
          </div>
        </div>
        <div class="stat-item-refined success">
          <div class="stat-icon-box">✅</div>
          <div class="stat-info-box">
            <div class="stat-value-refined">{{ workflowStats.successRate }}%</div>
            <div class="stat-label-refined">成功率</div>
          </div>
        </div>
        <div class="stat-item-refined info">
          <div class="stat-icon-box">⏱️</div>
          <div class="stat-info-box">
            <div class="stat-value-refined">{{ workflowStats.savedTime }}h</div>
            <div class="stat-label-refined">节省时间</div>
          </div>
        </div>
      </div>

      <!-- 简易图表 -->
      <div class="mini-chart-area">
        <div class="chart-bar" v-for="(val, index) in [40, 70, 30, 85, 60, 90, 50]" :key="index" :style="{ height: val + '%' }">
          <div class="bar-tooltip">周{{ ['一','二','三','四','五','六','日'][index] }}: {{ val }}</div>
        </div>
      </div>
    </div>

    <!-- 列表区域 (带背景容器) -->
    <div class="workflow-list-panel">
      <!-- 粒子效果 -->
      <div class="particles-container">
        <div class="particle" v-for="n in 5" :key="`wf-particle-${n}`"></div>
      </div>

      <!-- 列表头部 (固定) -->
      <div class="list-section-header">
         <span>最近执行记录</span>
         <div class="header-line"></div>
      </div>

      <!-- 可滚动列表区域 -->
      <div class="scrollable-list-wrapper">
        <div class="execution-list-container">
          <div 
            class="execution-card compact-card" 
            v-for="(record, index) in paginatedRecords" 
            :key="record.id"
            @click="viewExecutionDetail(record)"
          >
            <div class="exec-left-section">
              <div class="exec-status-dot-large" :class="record.status"></div>
              <div class="exec-info-group">
                <span class="exec-name-compact">{{ record.name }}</span>
                <span class="exec-tag-mini" :class="record.status">{{ record.statusText }}</span>
                <span class="exec-duration-mini">⏱ {{ record.duration }}</span>
              </div>
            </div>
            
            <div class="exec-right-section">
              <span class="exec-time-compact">{{ record.time }}</span>
              <div class="exec-arrow-compact">›</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页控件 -->
      <div class="pagination-controls" v-if="totalPages > 1">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          &lt;
        </button>
        <div class="page-numbers">
          <span 
            v-for="page in displayedPages" 
            :key="page"
            class="page-number"
            :class="{ active: currentPage === page, dots: page === '...' }"
            @click="page !== '...' && changePage(page)"
          >
            {{ page }}
          </span>
        </div>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          &gt;
        </button>
      </div>

      <!-- 底部入口按钮 (固定在底部) -->
      <div class="workflow-entry-section">
        <button class="workflow-center-btn" @click="goToWorkflow">
          <div class="btn-content">
            <i class="icon-rocket">🚀</i>
            <span>进入工作流中心</span>
          </div>
          <div class="btn-glow"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 分页相关
const currentPage = ref(1)
const pageSize = 5

// 工作流统计数据
const workflowStats = ref({
  totalExecutions: 1258,
  successRate: 98.5,
  savedTime: 420,
  recentRecords: Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: ['日报自动生成', '客户数据同步', '周报邮件分发', '服务器资源监控', '舆情分析报告', '数据库备份', '日志清理', 'API健康检查', '用户行为分析', '销售数据汇总'][i % 10] + (i > 9 ? ` ${i+1}` : ''),
    time: ['10分钟前', '2小时前', '5小时前', '昨天', '昨天', '昨天', '前天', '前天', '3天前', '3天前'][i % 10],
    duration: ['2s', '45s', '1.2s', '5s', '120s', '15m', '3s', '1s', '5m', '30s'][i % 10],
    status: ['success', 'success', 'failed', 'success', 'success', 'success', 'success', 'failed', 'success', 'success'][i % 10],
    statusText: ['成功', '成功', '失败', '成功', '成功', '成功', '成功', '失败', '成功', '成功'][i % 10]
  }))
})

// 分页计算
const totalPages = computed(() => Math.ceil(workflowStats.value.recentRecords.length / pageSize))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return workflowStats.value.recentRecords.slice(start, start + pageSize)
})

// 显示的页码
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (total > 1) {
    range.push(total)
  }

  return range
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 跳转到工作流中心
const goToWorkflow = () => {
  router.push('/workflow')
}

// 跳转到执行详情
const viewExecutionDetail = (record) => {
  router.push({
    name: 'workflowExecution',
    params: { id: record.id }
  })
}
</script>

<style lang="scss" scoped>
.workflow-stats-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 列表容器背景 */
.workflow-list-panel {
  flex: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(248, 250, 252, 0.7));
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.workflow-list-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
}

.list-section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  padding-left: 5px;
  flex-shrink: 0;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(107, 114, 128, 0.2), transparent);
}

/* 可滚动列表区域 */
.scrollable-list-wrapper {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  min-height: 0;
  padding-right: 0;
  margin-right: 0;
  display: flex;
  flex-direction: column;
}

.scrollable-list-wrapper::-webkit-scrollbar {
  display: none;
}

.execution-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 执行记录卡片 */
.execution-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.4));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.1);
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  flex-shrink: 0;
}

.execution-card:hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.exec-left-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.exec-status-dot-large {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.exec-status-dot-large::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  opacity: 0.3;
}

.exec-status-dot-large.success { background: #4ade80; box-shadow: 0 0 8px rgba(74, 222, 128, 0.6); }
.exec-status-dot-large.success::after { background: #4ade80; animation: pulse 2s infinite; }

.exec-status-dot-large.failed { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); }
.exec-status-dot-large.failed::after { background: #ef4444; animation: pulse 2s infinite; }

.exec-status-dot-large.running { background: #667eea; box-shadow: 0 0 8px rgba(102, 126, 234, 0.6); }
.exec-status-dot-large.running::after { background: #667eea; animation: pulse 2s infinite; }

.exec-info-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.exec-name-compact {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
}

.exec-tag-mini {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.exec-tag-mini.success { background: rgba(74, 222, 128, 0.15); color: #16a34a; }
.exec-tag-mini.failed { background: rgba(239, 68, 68, 0.15); color: #dc2626; }
.exec-tag-mini.running { background: rgba(102, 126, 234, 0.15); color: #4f46e5; }

.exec-duration-mini {
  font-size: 11px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 2px;
}

.exec-right-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
  flex-shrink: 0;
}

.exec-time-compact {
  font-size: 12px;
  color: #9ca3af;
}

.exec-arrow-compact {
  font-size: 16px;
  color: #cbd5e1;
  transition: transform 0.3s ease;
}

.execution-card:hover .exec-arrow-compact {
  transform: translateX(3px);
  color: #667eea;
}

/* 底部入口 */
.workflow-entry-section {
  margin-top: auto;
  flex-shrink: 0;
  padding-top: 5px;
}

.workflow-center-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.workflow-center-btn .btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.workflow-center-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.5);
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  border-radius: 12px;
  animation: glow 2s infinite ease-in-out;
  z-index: -1;
}

/* 顶部概览卡片 */
.stats-overview-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.8));
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.stats-overview-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stats-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1f2937;
  font-weight: 600;
}

.stats-date {
  font-size: 12px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.stats-grid-refined {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.stat-item-refined {
  flex: 1;
  background: rgba(255, 255, 255, 0.6);
  padding: 12px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.stat-item-refined:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-item-refined.primary { border-bottom: 2px solid #667eea; }
.stat-item-refined.success { border-bottom: 2px solid #4ade80; }
.stat-item-refined.info { border-bottom: 2px solid #f59e0b; }

.stat-icon-box { font-size: 20px; }
.stat-info-box { text-align: center; }
.stat-value-refined { font-size: 16px; font-weight: 700; color: #1f2937; }
.stat-label-refined { font-size: 11px; color: #6b7280; }

.mini-chart-area {
  height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(0,0,0,0.03);
}

.chart-bar {
  flex: 1;
  background: linear-gradient(180deg, #818cf8, #c4b5fd);
  border-radius: 6px 6px 2px 2px;
  position: relative;
  transition: all 0.3s ease;
  min-height: 4px;
}

.chart-bar:hover {
  background: linear-gradient(180deg, #6366f1, #a78bfa);
  transform: scaleY(1.05);
}

.bar-tooltip {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
  pointer-events: none;
}

.chart-bar:hover .bar-tooltip { opacity: 1; }

/* 分页控件 */
.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px;
}

.page-btn {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #667eea;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #6b7280;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.page-number:hover:not(.dots) {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.page-number.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.page-number.dots {
  cursor: default;
  color: #9ca3af;
}

/* 粒子效果 */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4), rgba(102, 126, 234, 0.2));
  border-radius: 50%;
  animation: floatParticle 8s infinite ease-in-out;
  box-shadow: 0 0 12px rgba(102, 126, 234, 0.3);
}

@keyframes floatParticle {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
  25% { transform: translateY(-15px) translateX(10px) scale(1.2); opacity: 0.8; }
  50% { transform: translateY(-25px) translateX(-5px) scale(0.8); opacity: 1; }
  75% { transform: translateY(-10px) translateX(15px) scale(1.1); opacity: 0.7; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
</style>

