<template>
  <el-card v-if="lastRun" class="wf-invoke__result surface-card">
    <template #header>
      <div class="card-header">
        <span>最近一次执行</span>
        <el-button link type="primary" @click="viewDetails">查看详情</el-button>
      </div>
    </template>
    <div>Run ID: {{ lastRun.runId }}</div>
    <div>状态: {{ lastRun.status }}</div>
    <div v-if="lastRun.error">错误: {{ lastRun.error }}</div>
  </el-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  lastRun: Object
})

const router = useRouter()

const viewDetails = () => {
  if (props.lastRun?.runId) {
    router.push({
      name: 'workflowExecution',
      params: { id: props.lastRun.runId }
    })
  }
}
</script>

<style scoped>
.wf-invoke__result {
  margin-top: 16px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


