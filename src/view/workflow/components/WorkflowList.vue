<template>
  <div class="wf-panel surface">
    <el-row :gutter="16">
      <el-col v-for="item in workflows" :key="item.id" :xs="24" :sm="12" :md="8" :lg="8">
        <WorkflowCard :workflow="item" v-model="favMap[item.id]" @invoke="$emit('invoke', item)" />
      </el-col>
    </el-row>
    <div class="wf-more">
      <el-button class="btn-load-more" :loading="loadingMore" @click="$emit('loadMore')" :disabled="disabledMore">加载更多</el-button>
    </div>
  </div>
</template>

<script setup>
import WorkflowCard from '@/view/workflow/components/WorkflowCard.vue'

const props = defineProps({
  workflows: {
    type: Array,
    default: () => []
  },
  favMap: {
    type: Object,
    default: () => ({})
  },
  loadingMore: Boolean,
  disabledMore: Boolean
})
</script>

<style scoped>
 .wf-panel {
  padding: 16px 16px 8px;
  position: relative;
}
.wf-more {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.btn-load-more {
  background: #fff;
  border: 1px solid var(--brand-primary);
  border-radius: 4px;
  color: var(--brand-primary);
  transition: all .2s ease-in-out;
}
.btn-load-more:hover {
  background: var(--brand-light);
}
/* 卡片入场动画（首屏 12 张） */
:deep(.el-row) {
  margin-left: -12px !important;
  margin-right: -12px !important;
}
:deep(.el-row) > .el-col {
  padding-left: 12px !important;
  padding-right: 12px !important;
  opacity: 0;
  transform: translateY(10px);
  animation: cardFadeUp .3s ease forwards;
}
:deep(.el-row) > .el-col:nth-child(1) { animation-delay: 0.0s; }
:deep(.el-row) > .el-col:nth-child(2) { animation-delay: 0.1s; }
:deep(.el-row) > .el-col:nth-child(3) { animation-delay: 0.2s; }
:deep(.el-row) > .el-col:nth-child(4) { animation-delay: 0.3s; }
:deep(.el-row) > .el-col:nth-child(5) { animation-delay: 0.4s; }
:deep(.el-row) > .el-col:nth-child(6) { animation-delay: 0.5s; }
:deep(.el-row) > .el-col:nth-child(7) { animation-delay: 0.6s; }
:deep(.el-row) > .el-col:nth-child(8) { animation-delay: 0.7s; }
:deep(.el-row) > .el-col:nth-child(9) { animation-delay: 0.8s; }
:deep(.el-row) > .el-col:nth-child(10) { animation-delay: 0.9s; }
:deep(.el-row) > .el-col:nth-child(11) { animation-delay: 1.0s; }
:deep(.el-row) > .el-col:nth-child(12) { animation-delay: 1.1s; }
@keyframes cardFadeUp {
  to { opacity: 1; transform: translateY(0); }
}
</style>


