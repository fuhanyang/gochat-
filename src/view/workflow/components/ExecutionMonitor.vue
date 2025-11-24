<template>
  <div class="execution-monitor">
    <!-- 顶部状态卡片 -->
    <StatusCard 
      :execution="executionData" 
      @terminate="$emit('terminate')"
      @pause="$emit('pause')"
    />

    <!-- 执行进度区域 -->
    <ProgressList :steps="steps" />

    <!-- 实时监控区域 -->
    <MetricsPanel />
  </div>
</template>

<script setup>
import StatusCard from './StatusCard.vue'
import ProgressList from './ProgressList.vue'
import MetricsPanel from './MetricsPanel.vue'

defineProps({
  executionData: Object,
  steps: Array
})

defineEmits(['terminate', 'pause'])
</script>

<style scoped>
.execution-monitor {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>

