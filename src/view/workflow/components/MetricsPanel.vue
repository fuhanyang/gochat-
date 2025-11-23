<template>
  <div class="metrics-panel card-effect">
    <h3 class="section-title">实时监控</h3>
    
    <div class="metrics-content">
      <!-- 指标列表 -->
      <div class="metrics-list">
        <div v-for="metric in metrics" :key="metric.name" class="metric-item">
          <div class="metric-header">
            <span class="metric-label">{{ metric.label }}</span>
            <span class="metric-value" :class="metric.colorClass">
              {{ metric.displayValue }}%
            </span>
          </div>
          <div class="metric-track">
            <div 
              class="metric-bar"
              :class="metric.colorClass"
              :style="{ width: metric.value + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 趋势图 -->
      <div class="trend-chart-card">
        <h4 class="chart-title">执行性能趋势</h4>
        <div class="chart-container">
          <!-- 简易 SVG 折线图 -->
          <svg viewBox="0 0 300 100" class="trend-svg" preserveAspectRatio="none">
            <!-- 网格线 -->
            <line x1="0" y1="25" x2="300" y2="25" stroke="#F3F4F6" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#F3F4F6" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#F3F4F6" />
            
            <!-- 折线 -->
            <polyline 
              :points="chartPoints" 
              fill="none" 
              stroke="#722ED1" 
              stroke-width="2"
              vector-effect="non-scaling-stroke"
              class="chart-line"
            />
            
            <!-- 渐变填充区域 (可选) -->
            <polygon 
              :points="`0,100 ${chartPoints} 300,100`" 
              fill="url(#gradient)" 
              opacity="0.1" 
            />
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#722ED1" />
                <stop offset="100%" stop-color="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>
          
          <!-- Tooltip 模拟 (实际项目中可能需要更复杂的交互) -->
          <div class="chart-tooltip" v-if="currentHoverValue">
            {{ currentHoverValue }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 模拟数据
const metrics = ref([
  { name: 'cpu', label: 'CPU 使用率', value: 45, displayValue: 45, colorClass: 'text-red' },
  { name: 'mem', label: '内存使用', value: 62, displayValue: 62, colorClass: 'text-orange' },
  { name: 'disk', label: '磁盘 I/O', value: 28, displayValue: 28, colorClass: 'text-blue' },
  { name: 'net', label: '网络吞吐', value: 75, displayValue: 75, colorClass: 'text-green' },
])

// 趋势图数据队列
const dataQueue = ref(Array(20).fill(0).map(() => 30 + Math.random() * 40))

const chartPoints = computed(() => {
  const width = 300
  const height = 100
  const step = width / (dataQueue.value.length - 1)
  
  return dataQueue.value.map((val, index) => {
    const x = index * step
    const y = height - (val / 100 * height) // 假设值为 0-100
    return `${x},${y}`
  }).join(' ')
})

const currentHoverValue = ref(null)

// 数字跳动动画
const animateValue = (metric, target) => {
  const start = metric.displayValue
  const diff = target - start
  const duration = 1000
  const startTime = performance.now()
  
  const step = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4)
    
    metric.displayValue = Math.round(start + diff * ease)
    
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  
  requestAnimationFrame(step)
}

onMounted(() => {
  // 每5秒更新一次数据
  setInterval(() => {
    metrics.value.forEach(m => {
      const newValue = Math.floor(Math.random() * 80) + 10
      m.value = newValue
      animateValue(m, newValue)
    })
  }, 5000)

  // 图表实时波动
  setInterval(() => {
    const last = dataQueue.value[dataQueue.value.length - 1]
    const next = Math.max(10, Math.min(90, last + (Math.random() - 0.5) * 20))
    dataQueue.value.shift()
    dataQueue.value.push(next)
  }, 1000)
})
</script>

<style scoped lang="scss">
.card-effect {
  background: #F9F6FC; /* Light purple background as requested */
  border-radius: 8px;
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

.metrics-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .metrics-content {
    grid-template-columns: 1fr;
  }
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.metric-label {
  color: #111827;
}

.metric-value {
  font-weight: 600;
  font-family: monospace;
}

.metric-track {
  height: 6px;
  background: #E5E7EB; // Or semi-transparent white if on dark bg, but here bg is F9F6FC
  border-radius: 3px;
  overflow: hidden;
}

.metric-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Colors */
.text-red { color: #EF4444; }
.metric-bar.text-red { background: #EF4444; }

.text-orange { color: #F59E0B; }
.metric-bar.text-orange { background: #F59E0B; }

.text-blue { color: #3B82F6; }
.metric-bar.text-blue { background: #3B82F6; }

.text-green { color: #10B981; }
.metric-bar.text-green { background: #10B981; }


/* Trend Chart */
.trend-chart-card {
  background: #FFFFFF;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.chart-title {
  font-size: 14px;
  color: #111827;
  margin-bottom: 12px;
  font-weight: 600;
}

.chart-container {
  position: relative;
  height: 120px;
  width: 100%;
}

.trend-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-line {
  transition: all 0.3s ease; /* Animation handled by Vue reactivity mostly, but CSS helps smooth */
}
</style>

